'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ────────────────────��───────────────────────────────────
const NODE_C10_HISTCIV_041 = 'c10_histciv_041';
const NODE_C10_HISTCIV_042 = 'c10_histciv_042';
const NODE_C10_HISTCIV_043 = 'c10_histciv_043';
const NODE_C10_HISTCIV_044 = 'c10_histciv_044';
const NODE_C10_HISTCIV_045 = 'c10_histciv_045';
const NODE_C10_HISTCIV_046 = 'c10_histciv_046';
const NODE_C10_HISTCIV_047 = 'c10_histciv_047';
const NODE_C10_HISTCIV_048 = 'c10_histciv_048';

const ALL_NODE_IDS = [
  NODE_C10_HISTCIV_041,
  NODE_C10_HISTCIV_042,
  NODE_C10_HISTCIV_043,
  NODE_C10_HISTCIV_044,
  NODE_C10_HISTCIV_045,
  NODE_C10_HISTCIV_046,
  NODE_C10_HISTCIV_047,
  NODE_C10_HISTCIV_048,
];

// ─── NARRATIVE SCENARIO ─────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Diplomatic Crisis & World Orders: 1919 – 1961',
  intro: 'You are an international historian and senior diplomatic advisor. The interwar peace has collapsed, totalitarian regimes have risen, a catastrophic world war has redrawn the globe, and two atomic superpowers threaten nuclear annihilation. Meanwhile, newly independent nations led by India seek a sovereign third path.',
  context: 'Investigate the causes of dictatorships, trace the escalation to WWII, explore the architecture of the United Nations, and test how Non-Alignment guided the Global South.',
};

// ─── DISCOVERY HOOK ─────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'Both Italy and Germany established brutal totalitarian regimes in the interwar years. What was the critical ideological distinction that set Nazi Germany apart from Fascist Italy?',
  options: [
    'Italy had a secret police (OVRA) while Germany had no surveillance network',
    'Nazism was built upon a foundational core of biological Aryan supremacy and anti-Semitism',
    'Fascist Italy completely abolished the monarchy, while Germany retained Emperor Kaiser Wilhelm II',
    'Italy allied with the Soviet Union, whereas Germany remained strictly non-communist',
  ],
  correctIndex: 1,
  hintAfter: 'Think about the Nuremberg Laws of 1935 and why Nazism led directly to state-sponsored genocide.',
};

// ─── CHALLENGE INTERFACE ────────────────────────────────────────────────────
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

// ─── CHALLENGES ARRAY (20 Items: Balanced Tiers & NEP 2020 Competencies) ────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall - c10_histciv_041
  {
    id: 'ch_041_1',
    nodeId: NODE_C10_HISTCIV_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In what year was Adolf Hitler appointed Chancellor of Germany by President Paul von Hindenburg?',
    options: ['October 1922', '30 January 1933', '1 September 1939', '24 October 1945'],
    correctIndex: 1,
    explanation: 'Adolf Hitler was appointed Chancellor on 30 January 1933 by President Hindenburg. October 1922 marks Mussolini’s rise following the March on Rome.',
    hints: [
      'It happened 6 years before WWII broke out in 1939.',
      'Mussolini rose in 1922; Hitler rose in the early 1930s following the Great Depression.',
      'The exact date is 30 January 1933.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label - c10_histciv_042
  {
    id: 'ch_042_1',
    nodeId: NODE_C10_HISTCIV_042,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the totalitarian terms with their respective regime in the comparative matrix.',
    dragItems: [
      { label: 'Il Duce & OVRA', targetId: 'box_italy' },
      { label: 'Der Führer & Gestapo', targetId: 'box_germany' },
      { label: 'Opera Nazionale Balilla', targetId: 'box_italy_youth' },
      { label: 'Hitler Youth & Nuremberg Laws', targetId: 'box_germany_laws' },
    ],
    correctMapping: {
      box_italy: 'Il Duce & OVRA',
      box_germany: 'Der Führer & Gestapo',
      box_italy_youth: 'Opera Nazionale Balilla',
      box_germany_laws: 'Hitler Youth & Nuremberg Laws',
    },
    explanation: 'Mussolini held the title Il Duce with the OVRA secret police and Balilla youth; Hitler was Der Führer with the Gestapo, Hitler Youth, and the 1935 Nuremberg Laws.',
    hints: [
      'Il Duce is Italian for The Leader; OVRA was the Italian secret police.',
      'Der Führer is German; Gestapo was the Geheime Staatspolizei.',
      'Nuremberg Laws (1935) codified Nazi racial anti-Semitism.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - Recall - c10_histciv_043
  {
    id: 'ch_043_1',
    nodeId: NODE_C10_HISTCIV_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which event served as the immediate trigger for the outbreak of World War II in Europe?',
    options: [
      'Japanese attack on Pearl Harbour on 7 December 1941',
      'German invasion of Poland on 1 September 1939',
      'The Munich Agreement on 30 September 1938',
      'Italy’s invasion of Abyssinia in October 1935',
    ],
    correctIndex: 1,
    explanation: 'Germany invaded Poland on 1 September 1939. Britain and France honoured their guarantee and declared war on 3 September 1939.',
    hints: [
      'Pearl Harbour brought the US in two years later in 1941.',
      'The Munich Agreement was appeasement in 1938, not the direct outbreak.',
      'The invasion of Poland on 1 September 1939 started the European war.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation - Numeric - c10_histciv_046
  {
    id: 'ch_046_1',
    nodeId: NODE_C10_HISTCIV_046,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many total member states comprise the United Nations Security Council (5 Permanent + Non-Permanent)?',
    correctAnswer: 15,
    tolerance: 0,
    unit: 'members',
    explanation: 'The UN Security Council consists of 15 members: 5 permanent members (P5: USA, UK, France, Russia, China) and 10 non-permanent members elected for 2-year terms.',
    hints: [
      'Remember the formula: 5 permanent + 10 non-permanent.',
      'Do not confuse it with 5 + 5.',
      '5 + 10 = 15 total members.',
    ],
    misconceptionIndex: 5,
  },
  // 5. Foundation - Match - c10_histciv_047
  {
    id: 'ch_047_1',
    nodeId: NODE_C10_HISTCIV_047,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the correct headquarters for UNICEF, WHO, and UNESCO respectively?',
    options: [
      'UNICEF: Geneva | WHO: Paris | UNESCO: New York',
      'UNICEF: New York | WHO: Geneva | UNESCO: Paris',
      'UNICEF: Paris | WHO: New York | UNESCO: Geneva',
      'UNICEF: New York | WHO: Paris | UNESCO: The Hague',
    ],
    correctIndex: 1,
    explanation: 'UNICEF is headquartered in New York City alongside the UN; WHO is in Geneva, Switzerland; UNESCO is in Paris, France.',
    hints: [
      'UNICEF is beside the main UN headquarters in the USA.',
      'WHO operates from the international health hub in Switzerland.',
      'UNESCO is based in the cultural capital of France.',
    ],
    misconceptionIndex: 6,
  },
  // 6. Foundation - Drag Sort - c10_histciv_044
  {
    id: 'ch_044_1',
    nodeId: NODE_C10_HISTCIV_044,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Sort these pivotal Pacific Theatre events into their exact chronological sequence.',
    sortItems: [
      'Attack on Pearl Harbour (7 Dec 1941)',
      'Atomic Bombing of Hiroshima (6 Aug 1945)',
      'Atomic Bombing of Nagasaki (9 Aug 1945)',
      'Formal Surrender on USS Missouri (2 Sep 1945)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Pearl Harbour (7 Dec 1941) opened US entry; Hiroshima was bombed on 6 Aug 1945, Nagasaki 3 days later on 9 Aug 1945; and surrender was signed on 2 Sep 1945.',
    hints: [
      'Pearl Harbour opened the Pacific conflict in 1941.',
      'Hiroshima (6 Aug) was struck before Nagasaki (9 Aug).',
      'The formal surrender aboard USS Missouri concluded the sequence on 2 September 1945.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Classify - c10_histciv_048
  {
    id: 'ch_048_1',
    nodeId: NODE_C10_HISTCIV_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where and in what year was the first formal summit of the Non-Aligned Movement (NAM) held?',
    options: [
      'Bandung in 1955',
      'New Delhi in 1954',
      'Belgrade in September 1961',
      'San Francisco in 1945',
    ],
    correctIndex: 2,
    explanation: 'The Non-Aligned Movement was formally founded at the Belgrade Summit in September 1961 with 25 member states. Bandung (1955) was its Afro-Asian precursor.',
    hints: [
      'Panchsheel was 1954; Bandung was 1955.',
      'The formal first NAM summit took place in Yugoslavia.',
      'It was held in Belgrade in September 1961.',
    ],
    misconceptionIndex: 7,
  },
  // 8. Standard - Application (NEP) - c10_histciv_041
  {
    id: 'ch_041_2',
    nodeId: NODE_C10_HISTCIV_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Italian war veteran in 1920 denounces the peace settlement as a "mutilated victory" (vittoria mutilata). Which treaty specifically generated this grievance, and why?',
    options: [
      'Treaty of Versailles (1919) — because Germany took Italian territory',
      'Treaty of St. Germain (1919) — because Italy was denied Dalmatian lands & Fiume despite the 1915 Treaty of London',
      'Treaty of Brest-Litovsk (1918) — because Russia ceded Ukraine to Italy',
      'Treaty of Lausanne (1923) — because Turkey annexed Rome',
    ],
    correctIndex: 1,
    explanation: 'The Treaty of St. Germain (1919) redistributed Austro-Hungarian lands without fulfilling the secret promises made to Italy in the 1915 Treaty of London (Dalmatia and Fiume), causing intense Italian nationalist outrage.',
    hints: [
      'Versailles was Germany’s grievance treaty; Italy’s concerned former Austro-Hungarian lands.',
      'Italy had been promised Dalmatia in the secret 1915 Treaty of London.',
      'The Treaty of St. Germain (1919) failed to deliver these territories.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Analysis (NEP) - c10_histciv_043
  {
    id: 'ch_043_2',
    nodeId: NODE_C10_HISTCIV_043,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did British Prime Minister Neville Chamberlain’s policy of appeasement at the Munich Agreement (1938) backfire and accelerate war?',
    options: [
      'It forged a permanent military alliance between Britain and the Soviet Union',
      'It conceded the Sudetenland to Hitler, proving to him that threats would be rewarded, leading to the full takeover of Czechoslovakia in March 1939',
      'It forced France to demilitarise its borders completely',
      'It triggered the immediate atomic bombing of Berlin',
    ],
    correctIndex: 1,
    explanation: 'Appeasement was active concession, not an alliance. By giving Hitler the Sudetenland without Czech consent, it convinced Hitler that Western democracies lacked the resolve to fight, prompting him to annex the rest of Czechoslovakia in March 1939.',
    hints: [
      'Appeasement was not a friendship pact; it was conceding to avoid war.',
      'Think about what happened to Czechoslovakia 6 months after Munich.',
      'Hitler seized the rest of Czechoslovakia in March 1939.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard - Application (NEP) - c10_histciv_045
  {
    id: 'ch_045_1',
    nodeId: NODE_C10_HISTCIV_045,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Compare the two dominant Cold War military blocs: which pair correctly identifies their formation year, leading superpower, and ideology?',
    options: [
      'NATO (1955, USSR, Communist) vs Warsaw Pact (1949, USA, Capitalist)',
      'NATO (4 April 1949, USA, Capitalist) vs Warsaw Pact (14 May 1955, USSR, Communist)',
      'NATO (1945, UK, Socialist) vs Warsaw Pact (1961, China, Maoist)',
      'NATO (1950, UN, Neutral) vs Warsaw Pact (1950, Non-Aligned, Independent)',
    ],
    correctIndex: 1,
    explanation: 'NATO was formed on 4 April 1949 by 12 Western capitalist states led by the USA. The Warsaw Pact was formed on 14 May 1955 by 8 Eastern European communist states led by the USSR.',
    hints: [
      'NATO was founded first in 1949 as an American-led collective defence.',
      'The Warsaw Pact was created 6 years later in 1955 after West Germany joined NATO.',
      'NATO = USA/Capitalist (1949); Warsaw Pact = USSR/Communist (1955).',
    ],
    misconceptionIndex: 8,
  },
  // 11. Standard - Construct - c10_histciv_048
  {
    id: 'ch_048_2',
    nodeId: NODE_C10_HISTCIV_048,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the Five Principles of Peaceful Coexistence (Panchsheel) by assembling the 5 key pillars signed on 29 April 1954.',
    availableParts: [
      'Mutual respect for sovereignty',
      'Mutual non-aggression',
      'Mutual non-interference',
      'Equality & mutual benefit',
      'Peaceful coexistence',
      'Military intervention pact',
      'Nuclear deterrence pledge',
    ],
    targetState: 'Mutual respect for sovereignty Mutual non-aggression Mutual non-interference Equality & mutual benefit Peaceful coexistence',
    validationHint: 'Select all 5 non-military principles of peaceful coexistence.',
    explanation: 'Panchsheel (29 April 1954) established: (1) Mutual respect for sovereignty and territorial integrity, (2) Mutual non-aggression, (3) Mutual non-interference in domestic affairs, (4) Equality and mutual benefit, and (5) Peaceful coexistence.',
    hints: [
      'Panchsheel contains 5 principles, signed between Nehru and Zhou Enlai.',
      'It completely rejects military alliances or nuclear guarantees.',
      'Add all five principles that focus on sovereignty, non-aggression, non-interference, equality, and coexistence.',
    ],
    misconceptionIndex: 7,
  },
  // 12. Standard - Analysis (NEP) - c10_histciv_046
  {
    id: 'ch_046_2',
    nodeId: NODE_C10_HISTCIV_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does a resolution passed by a 95% majority in the UN General Assembly carry less legal weight than a resolution passed by the UN Security Council?',
    options: [
      'General Assembly resolutions are recommendatory, whereas Security Council decisions under Chapter VII are legally binding on all member states',
      'The General Assembly only represents European nations, while the Security Council represents the entire world',
      'General Assembly votes require approval from the International Court of Justice before taking effect',
      'The Security Council has 193 members who can overrule the General Assembly’s 15 members',
    ],
    correctIndex: 0,
    explanation: 'The General Assembly is the universal deliberative body whose resolutions express moral recommendations. The Security Council bears primary responsibility for international peace and holds binding enforcement powers under Chapter VII.',
    hints: [
      'Consider the difference between a recommendation and an enforceable command.',
      'Chapter VII of the UN Charter grants binding authority to one specific organ.',
      'General Assembly = recommendatory; Security Council = binding enforcement.',
    ],
    misconceptionIndex: 5,
  },
  // 13. Standard - Evaluation (NEP) - c10_histciv_047
  {
    id: 'ch_047_2',
    nodeId: NODE_C10_HISTCIV_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'How did the Universal Declaration of Human Rights (UDHR, 10 Dec 1948) influence the Constitution of independent India (26 Jan 1950)?',
    options: [
      'It made the Indian Constitution legally subordinate to the International Court of Justice',
      'Its principles of equality, liberty, and protection against torture directly inspired the Fundamental Rights in Part III of the Indian Constitution',
      'It forced India to adopt a one-party governance model similar to post-war Europe',
      'It mandated that UNICEF oversee all Indian parliamentary elections',
    ],
    correctIndex: 1,
    explanation: 'The UDHR, drafted under Eleanor Roosevelt and adopted in Paris in 1948, provided the philosophical and moral blueprint for the Fundamental Rights codified in Part III (Articles 12–35) of India’s 1950 Constitution.',
    hints: [
      'Look at the timing: UDHR in Dec 1948, Indian Constitution adopted in 1949/1950.',
      'Think of Part III of the Indian Constitution.',
      'Articles on equality (Art 14), freedom (Art 19), and protection against arbitrary detention (Art 22) mirror the UDHR.',
    ],
    misconceptionIndex: 6,
  },
  // 14. Standard - Match - c10_histciv_048
  {
    id: 'ch_048_3',
    nodeId: NODE_C10_HISTCIV_048,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly pairs the five founding architects of the Non-Aligned Movement with their respective nations?',
    options: [
      'Nehru (India), Tito (Yugoslavia), Nasser (Egypt), Nkrumah (Ghana), Sukarno (Indonesia)',
      'Nehru (India), Churchill (UK), Stalin (USSR), Roosevelt (USA), De Gaulle (France)',
      'Nehru (India), Mao Zedong (China), Ho Chi Minh (Vietnam), Castro (Cuba), Tito (Yugoslavia)',
      'Nehru (India), Gandhi (India), Patel (India), Bose (India), Ambedkar (India)',
    ],
    correctIndex: 0,
    explanation: 'The five founding architects of NAM were: Jawaharlal Nehru (India), Josip Broz Tito (Yugoslavia), Gamal Abdel Nasser (Egypt), Kwame Nkrumah (Ghana), and Sukarno (Indonesia).',
    hints: [
      'Do not include Cold War bloc leaders like Churchill or Stalin.',
      'All five represented nations seeking independence from superpower domination.',
      'Tito (Yugoslavia), Nasser (Egypt), Nehru (India), Nkrumah (Ghana), Sukarno (Indonesia).',
    ],
    misconceptionIndex: 7,
  },
  // 15. Advanced - Analysis (NEP) - c10_histciv_041
  {
    id: 'ch_041_3',
    nodeId: NODE_C10_HISTCIV_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why was the Wall Street Crash of October 1929 decisive in propelling Hitler to power in Germany, but had no role in Mussolini’s initial seizure of power in Italy?',
    options: [
      'Mussolini was already appointed Prime Minister in October 1922 (7 years prior), whereas Germany’s Dawes Plan recovery collapsed in 1929, creating ~6 million unemployed by 1932',
      'Italy was an isolated agricultural economy completely unaffected by international banking',
      'Hitler was living in the United States and directly lost his wealth on Wall Street in 1929',
      'Germany was completely immune to the Great Depression because of reparations',
    ],
    correctIndex: 0,
    explanation: 'Mussolini came to power in October 1922 following post-WWI inflation and the March on Rome. Hitler exploited the 1929 depression, which evaporated US Dawes Plan loans and generated 6 million unemployed Germans by 1932.',
    hints: [
      'Check the timeline: 1922 for Mussolini vs 1933 for Hitler.',
      'German recovery under the Weimar Republic relied heavily on US American loans.',
      'Mussolini had already been dictator for 7 years before the 1929 Crash.',
    ],
    misconceptionIndex: 0,
  },
  // 16. Advanced - Evaluation (NEP) - c10_histciv_046
  {
    id: 'ch_046_3',
    nodeId: NODE_C10_HISTCIV_046,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the structural compromise behind the UN Security Council Veto Power (Article 27). Why was it included despite being undemocratic?',
    options: [
      'To guarantee that smaller nations could outvote major nuclear powers on economic policies',
      'To ensure the victorious great powers (P5) remained committed to the UN rather than abandoning it as the USA did with the League of Nations',
      'To allow the International Court of Justice to overturn any military intervention',
      'To make sure that only African and Asian countries held permanent seats',
    ],
    correctIndex: 1,
    explanation: 'The League of Nations failed because major powers abandoned or never joined it. The UN founders granted veto power to the P5 to ensure great-power participation and prevent binding actions that could trigger direct superpower war.',
    hints: [
      'Remember why the League of Nations failed in the 1930s.',
      'Without veto power, a superpower might simply leave the UN when outvoted.',
      'The veto was the price for keeping great powers at the negotiating table.',
    ],
    misconceptionIndex: 5,
  },
  // 17. Advanced - Application (NEP) - c10_histciv_048
  {
    id: 'ch_048_4',
    nodeId: NODE_C10_HISTCIV_048,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In 1956, a Western critic claimed India’s non-alignment was "immoral neutrality." How did Nehru’s foreign policy disprove this accusation in practical diplomacy?',
    options: [
      'India maintained complete isolation and shut down all foreign embassies',
      'India actively mediated in international crises (Korea, Suez), traded with both blocs, and opposed colonialism while refusing subservience to military pacts',
      'India secretly joined the Warsaw Pact in 1955 while taking money from NATO',
      'India declared war on both the United States and the Soviet Union simultaneously',
    ],
    correctIndex: 1,
    explanation: 'Non-alignment is active independent foreign policy, not passive neutrality or isolation. India engaged with both superpowers, received food aid from the US, bought defense hardware from the USSR, and championed decolonisation.',
    hints: [
      'Neutrality means not participating; Non-Alignment means independent engagement.',
      'India traded with and received assistance from both the USA and the USSR.',
      'India actively took stands on global issues like apartheid and Suez.',
    ],
    misconceptionIndex: 7,
  },
  // 18. Advanced - Drag Sort - c10_histciv_043
  {
    id: 'ch_043_3',
    nodeId: NODE_C10_HISTCIV_043,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the causal chain of escalation leading to the Second World War in Europe from 1919 to 1939.',
    sortItems: [
      'Treaty of Versailles imposes harsh terms & War Guilt Clause (1919)',
      'Hitler appointed Chancellor of Germany (30 Jan 1933)',
      'Munich Agreement cedes Sudetenland in failed appeasement (Sep 1938)',
      'Nazi-Soviet Non-Aggression Pact secures German eastern flank (23 Aug 1939)',
      'German invasion of Poland sparks WWII (1 Sep 1939)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The Versailles Treaty (1919) created resentment; Hitler rose in 1933; appeasement culminated at Munich in 1938; the Nazi-Soviet Pact on 23 Aug 1939 enabled the Polish invasion on 1 Sep 1939.',
    hints: [
      'Versailles begins the chain in 1919.',
      'Hitler gained power in 1933 before the Munich crisis of 1938.',
      'The Nazi-Soviet Pact was signed just 9 days before Poland was invaded.',
    ],
    misconceptionIndex: 3,
  },
  // 19. Advanced - Creativity (NEP) - c10_histciv_046
  {
    id: 'ch_046_4',
    nodeId: NODE_C10_HISTCIV_046,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'India has advocated for UN Security Council reform as part of the G4 (India, Brazil, Germany, Japan). Which core argument best justifies India’s claim to a permanent seat?',
    options: [
      'India is the world’s most populous democracy, the 5th largest economy, and the largest cumulative troop contributor to UN Peacekeeping operations',
      'India was the only country that voted against the creation of the United Nations in 1945',
      'India has signed military mutual defense treaties with all 5 permanent members',
      'The UN Charter requires that the Security Council permanent members rotate alphabetically every year',
    ],
    correctIndex: 0,
    explanation: 'India’s permanent membership bid rests on objective criteria: 1.4+ billion citizens (1/6th of humanity), 5th largest global economy, democratic continuity since 1947, and deploying over 200,000 peacekeepers across 40+ missions.',
    hints: [
      'Focus on India’s democratic credentials and peacekeeping contributions.',
      'India represents roughly one-sixth of the entire world population.',
      'India is the largest cumulative contributor of personnel to UN blue helmets.',
    ],
    misconceptionIndex: 5,
  },
  // 20. Advanced - Drag Label - c10_histciv_047
  {
    id: 'ch_047_3',
    nodeId: NODE_C10_HISTCIV_047,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Label each real-world historical milestone with the corresponding UN Specialized Agency or Institution.',
    dragItems: [
      { label: 'Smallpox Eradication (1980)', targetId: 'box_who' },
      { label: 'Taj Mahal World Heritage (1983)', targetId: 'box_unesco' },
      { label: 'Rural Child Immunisation in India', targetId: 'box_unicef' },
      { label: 'Palais de Chaillot Declaration (1948)', targetId: 'box_udhr' },
    ],
    correctMapping: {
      box_who: 'Smallpox Eradication (1980)',
      box_unesco: 'Taj Mahal World Heritage (1983)',
      box_unicef: 'Rural Child Immunisation in India',
      box_udhr: 'Palais de Chaillot Declaration (1948)',
    },
    explanation: 'WHO certified smallpox eradication in 1980; UNESCO inscribed the Taj Mahal in 1983; UNICEF delivers child health/vaccines; the UDHR was adopted in Paris in 1948.',
    hints: [
      'Smallpox is a global public health milestone led from Geneva.',
      'Taj Mahal is a cultural preservation site.',
      'Child immunisation belongs to the Children’s Fund.',
    ],
    misconceptionIndex: 6,
  },
];

// ─── PROPS INTERFACE ────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ───────────────���──────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_HISTCIV_041,
  title: 'Rise of Dictatorships, WWII, United Nations & Non-Aligned Movement',
  definition: 'An integrated study of interwar totalitarian dictatorships in Italy and Germany, the multi-causal outbreak and consequences of World War II, the architecture of the United Nations system, and the emergence of the Non-Aligned Movement during the Cold War.',
  eli5: 'After World War I, anger and economic collapse created harsh dictators in Italy (Mussolini) and Germany (Hitler). Their aggression sparked World War II. After immense devastation and atomic bombs in 1945, the world built the United Nations to keep peace, while newly free countries like India formed the Non-Aligned Movement to stay independent from Cold War superpower rivalry.',
  misconceptions: [
    {
      misconception: 'Hitler and Mussolini came to power in 1939 when WWII began.',
      correction: 'Mussolini came to power in October 1922 (March on Rome); Hitler was appointed Chancellor on 30 January 1933 — years before WWII began on 1 September 1939.',
    },
    {
      misconception: 'Italy and Germany shared the exact same grievance from the Treaty of Versailles.',
      correction: 'Germany resented the Treaty of Versailles (1919), while Italy was outraged by the Treaty of St. Germain (1919) which denied it promised lands under the 1915 Treaty of London (mutilated victory).',
    },
    {
      misconception: 'Fascism and Nazism were identical ideologies under different names.',
      correction: 'Nazism was rooted in biological Aryan racial supremacy and anti-Semitism (Nuremberg Laws 1935); Italian Fascism was statist and nationalist without founding racial dogma.',
    },
    {
      misconception: 'The Second World War began with the attack on Pearl Harbour in 1941.',
      correction: 'WWII began on 1 September 1939 when Germany invaded Poland. Pearl Harbour (7 Dec 1941) brought the USA into an existing global war.',
    },
    {
      misconception: 'The atomic bombings of Hiroshima and Nagasaki happened on the same day in 1944.',
      correction: 'Hiroshima was bombed on 6 August 1945 and Nagasaki on 9 August 1945 (3 days apart) leading to surrender on 14 August 1945.',
    },
    {
      misconception: 'The UN Security Council has 5 permanent and 5 non-permanent members (10 total).',
      correction: 'The Security Council consists of 5 Permanent members (P5) + 10 Non-Permanent members = 15 total members.',
    },
    {
      misconception: 'UNICEF, WHO, and UNESCO share the same headquarters in Geneva.',
      correction: 'UNICEF is headquartered in New York City, WHO in Geneva (Switzerland), and UNESCO in Paris (France).',
    },
    {
      misconception: 'Non-Alignment means passive neutrality, isolation, or not having a foreign policy.',
      correction: 'NAM was an active, independent foreign policy based on Panchsheel (1954) allowing diplomatic and trade relations with both Cold War blocs without signing military alliances.',
    },
    {
      misconception: 'The Cold War was a direct military shooting war between the USA and USSR.',
      correction: 'The Cold War was an ideological, diplomatic, economic, and proxy conflict without direct military fighting between the two nuclear superpowers.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'When was Hitler appointed Chancellor of Germany?',
      options: ['1922', '30 January 1933', '1939', '1945'],
      correctIndex: 1,
    },
    {
      question: 'Which treaty disappointed Italy after WWI?',
      options: ['Treaty of Versailles', 'Treaty of St. Germain', 'Treaty of Rome', 'Treaty of Paris'],
      correctIndex: 1,
    },
    {
      question: 'What immediate trigger caused WWII in Europe?',
      options: ['Pearl Harbour', 'Invasion of Poland', 'Munich Pact', 'Fall of Paris'],
      correctIndex: 1,
    },
    {
      question: 'On what date was the atomic bomb dropped on Hiroshima?',
      options: ['7 December 1941', '6 August 1945', '9 August 1945', '2 September 1945'],
      correctIndex: 1,
    },
    {
      question: 'How many total members sit on the UN Security Council?',
      options: ['10', '15', '25', '193'],
      correctIndex: 1,
    },
    {
      question: 'Where is the headquarters of UNESCO located?',
      options: ['New York', 'Geneva', 'Paris', 'The Hague'],
      correctIndex: 2,
    },
    {
      question: 'In what year was the bilateral Panchsheel agreement signed?',
      options: ['1947', '1950', '29 April 1954', 'September 1961'],
      correctIndex: 2,
    },
    {
      question: 'Who among the following was NOT one of the 5 architects of NAM?',
      options: ['Jawaharlal Nehru', 'Josip Broz Tito', 'Winston Churchill', 'Kwame Nkrumah'],
      correctIndex: 2,
    },
  ],
  masteryCriteria: 'Mastery requires demonstrating 80%+ accuracy across all 8 nodes: interwar dictatorships, WWII triggers/consequences, UN organs/agencies, and the Non-Aligned Movement.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Totalitarian Regime Diagnostic',
    instruction: 'Select Italy or Germany and manipulate the Dictatorship Gauge to inspect leader cults, secret police, and racial doctrines.',
    interactionType: 'dictatorship-inspector',
    nodeId: NODE_C10_HISTCIV_041,
  },
  {
    title: 'Lab 2: Ideology Venn Explorer',
    instruction: 'Click intersection and exclusive zones to discover shared totalitarian tools versus Nazi racial anti-Semitism.',
    interactionType: 'venn-explorer',
    nodeId: NODE_C10_HISTCIV_042,
  },
  {
    title: 'Lab 3: WWII Escalation Simulator',
    instruction: 'Drag the Timeline Slider from 1919 to 1945 to simulate how appeasement and pacts led to global atomic war.',
    interactionType: 'escalation-timeline',
    nodeId: NODE_C10_HISTCIV_043,
  },
  {
    title: 'Lab 4: UN Security Council & Veto Sim',
    instruction: 'Simulate a Security Council resolution vote. Toggle P5 votes to observe how a single Veto paralyzes binding action.',
    interactionType: 'un-veto-sim',
    nodeId: NODE_C10_HISTCIV_046,
  },
  {
    title: 'Lab 5: Cold War & NAM Diplomatic Compass',
    instruction: 'Adjust India’s foreign policy alignment slider between the US NATO bloc and USSR Warsaw Pact to observe Non-Alignment.',
    interactionType: 'nam-compass',
    nodeId: NODE_C10_HISTCIV_048,
  },
];

// ─── PREDICTION QUESTIONS ───────────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If a permanent Security Council member votes "No" on a peace enforcement resolution backed by all 14 other members, what happens?',
    options: [
      'The resolution passes by a two-thirds democratic majority',
      'The resolution is completely blocked due to the Veto Power (Article 27)',
      'The International Court of Justice automatically overrules the veto',
      'The General Assembly immediately sends troops',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now open the UN Security Council Simulator in Lab 4 and test casting a P5 Veto to verify your prediction!',
    nodeId: NODE_C10_HISTCIV_046,
  },
  {
    question: 'Prediction: What was the primary economic trigger that caused German unemployment to soar to 6 million by 1932, paving the way for Hitler?',
    options: [
      'The Treaty of London of 1915',
      'The Wall Street Stock Market Crash of October 1929',
      'The establishment of the United Nations in 1945',
      'The formation of NATO in 1949',
    ],
    correctIndex: 1,
    verifyInstruction: 'Move the timeline slider in Lab 3 to 1929 and observe the unemployment spike leading to 30 January 1933!',
    nodeId: NODE_C10_HISTCIV_041,
  },
];

// ─── OBSERVATION QUESTIONS ──────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the structure of the UN Security Council when testing resolution voting?',
    observableOptions: [
      'All 193 nations must vote unanimously for every single decision',
      'A resolution can pass only if none of the 5 Permanent Members (P5) cast a veto',
      'Non-permanent members hold stronger veto rights than permanent members',
      'The Secretary-General casts the final deciding vote',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_HISTCIV_046,
  },
  {
    question: 'When adjusting the Cold War Alignment slider toward Non-Alignment, what happens to India’s diplomatic autonomy?',
    observableOptions: [
      'India is completely banned from trading with any foreign nation',
      'India maintains sovereign freedom to engage and trade with both superpowers on merit',
      'India is forced to sign the Warsaw Pact',
      'India loses its seat at the United Nations',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_HISTCIV_048,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Global Diplomatic Architect: Draft a UN Reform & NAM Whitepaper',
  description: 'Apply your understanding of 20th-century geopolitical structures to write a brief policy proposal advocating for India’s permanent membership in a reformed UN Security Council while upholding Panchsheel principles in modern diplomacy.',
  steps: [
    'Articulate India’s historic role as a founding UN member (1945) and leading contributor to UN Peacekeeping operations.',
    'Explain why the 1945 P5 structure is outdated for a multipolar 21st-century world of 193 member states.',
    'Incorporate the 5 Panchsheel principles (1954) as a moral code for settling contemporary border and trade disputes.',
    'Share and discuss your whitepaper framework with your peers or teacher for ICSE board project credit.',
  ],
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
function C10_HistoryCivicsRiseDictatorshipsCausesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_HISTCIV_041,
  title = DEFAULT_PROPS.title || 'Rise of Dictatorships, WWII & Global Governance',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Subject config
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Simulator States
  const [selectedRegime, setSelectedRegime] = useState<'italy' | 'germany'>('italy');
  const [dictatorControlLevel, setDictatorControlLevel] = useState(65);
  const [vennActiveTab, setVennActiveTab] = useState<'shared' | 'italy' | 'germany'>('shared');
  const [simYear, setSimYear] = useState(1939);
  const [p5Votes, setP5Votes] = useState({
    usa: true,
    uk: true,
    france: true,
    russia: true,
    china: true,
  });
  const [nonPermVotes, setNonPermVotes] = useState(9); // out of 10
  const [namAlignment, setNamAlignment] = useState(50); // 0 = West, 50 = Non-Aligned, 100 = East
  const [selectedArchitect, setSelectedArchitect] = useState<string | null>('nehru');
  const [selectedAgency, setSelectedAgency] = useState<'unicef' | 'who' | 'unesco' | 'udhr'>('unicef');

  // Adaptive difficulty & score tracking
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

  // Drag-and-drop & construct challenge state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection states
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentCh = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ─────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ──────────────────────────────────────────
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

  // ─── GSAP ANIMATION EFFECT ────────────────────────────────────────────────
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase, simYear]);

  // ─── CANVAS PULSE ANIMATION EFFECT ────────────────────────────────────────
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
      ctx.strokeStyle = phase === 'challenge' ? '#f59e0b' : '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + frame * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ────────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentCh.hints && currentCh.hints[nextLevel - 1]) {
      const hintText = currentCh.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Hints completed. Let us examine the step-by-step historical explanation.');
    }
  }, [hintCount, currentCh]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && currentCh.hints.length > 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, currentCh, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on! Nazism was distinctively rooted in racial anti-Semitism and Aryan supremacy.');
    } else {
      audioManager.play('error');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Discover the mechanisms of 20th century global history.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode activated. Test any geopolitical variable freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting adaptive challenges. Prove your historical mastery.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator below to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical observation!' : 'Check the UN voting rules carefully.');
  }, []);

  const handleRegimeToggle = useCallback((regime: 'italy' | 'germany') => {
    setSelectedRegime(regime);
    audioManager.play('tap');
    speechManager.speak(regime === 'italy' ? 'Inspecting Fascist Italy under Mussolini.' : 'Inspecting Nazi Germany under Hitler.');
  }, []);

  const handleSimYearChange = useCallback((year: number) => {
    setSimYear(year);
    audioManager.play('count');
  }, []);

  const handleP5VoteToggle = useCallback((country: keyof typeof p5Votes) => {
    setP5Votes(prev => {
      const updated = { ...prev, [country]: !prev[country] };
      audioManager.play(updated[country] ? 'tap' : 'balance');
      return updated;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete! You attained a mastery score of ${finalScore} percent.`);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') {
      isCorrect = answer === currentCh.correctIndex;
    } else if (currentCh.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctMapping);
    } else if (currentCh.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctOrder);
    } else if (currentCh.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (currentCh.correctAnswer || 0)) <= (currentCh.tolerance || 0);
    } else if (currentCh.type === 'construct') {
      isCorrect = answer === currentCh.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct analysis! Excellent work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentCh.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${currentCh.nodeId}`, JSON.stringify(getMasteryLevel(bktStateRef.current.pKnown)));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentCh.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentCh.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentCh.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the historical facts and analysis.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${currentCh.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentCh, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentCh.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentCh]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && currentCh.sortItems ? currentCh.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentCh]);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : currentCh.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, currentCh, handleAnswer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // UN Security Council Resolution calculation
  const isResolutionPassed = useMemo(() => {
    const allP5Yes = Object.values(p5Votes).every(v => v === true);
    const totalYes = Object.values(p5Votes).filter(Boolean).length + nonPermVotes;
    return allP5Yes && totalYes >= 9;
  }, [p5Votes, nonPermVotes]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans relative overflow-hidden">
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              ICSE Class 10 • {subjectConfig.name}
            </span>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-300">
            Mastery: <strong className="text-amber-300 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ──────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
              <span>📜</span>
              <span>HISTORICAL INVESTIGATION HOOK</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-300/80 bg-amber-950/60 p-3 rounded-xl border border-amber-800/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + i)}
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
                className="mt-6 p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  {discoveryCorrect ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-2">
                      ✓ Accurate deduction! Nazism uniquely codified biological racism in the Nuremberg Laws (1935).
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold flex items-center gap-2">
                      ⚠️ {DISCOVERY_QUESTION.hintAfter}
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration Labs"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-sm tracking-wide"
                >
                  Enter Interactive Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (5 INTERACTIVE BRILLIANT LABS) ─────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Navigation Header */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex items-center gap-1">
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

          {/* Interactive Lab Workspace */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 font-medium flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 0: DICTATORSHIP INSPECTOR & TOTALITARIAN PYRAMID SVG ── */}
              {currentSlide === 0 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRegimeToggle('italy')}
                      aria-label="Inspect Fascist Italy"
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                        selectedRegime === 'italy'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      🇮🇹 Fascist Italy (Mussolini • 1922)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRegimeToggle('germany')}
                      aria-label="Inspect Nazi Germany"
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                        selectedRegime === 'germany'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      🇩🇪 Nazi Germany (Hitler • 1933)
                    </motion.button>
                  </div>

                  {/* SVG 1: Totalitarian Control Hierarchy Architecture */}
                  <div className="w-full bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
                      Totalitarian State Architecture: {selectedRegime === 'italy' ? 'Fascist Corporate State' : 'Nazi Third Reich State'}
                    </span>
                    <svg viewBox="0 0 600 160" className="w-full h-36">
                      <polygon points="300,15 390,60 210,60" fill="#f59e0b" fillOpacity="0.85" stroke="#fbbf24" strokeWidth="2" />
                      <text x="300" y="45" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
                        {selectedRegime === 'italy' ? 'Il Duce (Mussolini)' : 'Der Führer (Hitler)'}
                      </text>
                      <polygon points="210,65 390,65 440,110 160,110" fill="#3b82f6" fillOpacity="0.65" stroke="#60a5fa" strokeWidth="1.5" />
                      <text x="300" y="92" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {selectedRegime === 'italy' ? 'Secret Police: OVRA & Blackshirts' : 'Gestapo, SS & Party Apparatus'}
                      </text>
                      <polygon points="160,115 440,115 490,155 110,155" fill="#1e293b" fillOpacity="0.9" stroke="#475569" strokeWidth="1.5" />
                      <text x="300" y="140" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                        {selectedRegime === 'italy' ? 'Youth (Balilla) • Censored Press • Corporate Guilds' : 'Hitler Youth • Nuremberg Laws (1935) • Total War'}
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-semibold uppercase">Leader & Party</span>
                      <p className="text-base font-bold text-white mt-1">
                        {selectedRegime === 'italy'
                          ? 'Benito Mussolini ("Il Duce")'
                          : 'Adolf Hitler ("Der Führer")'}
                      </p>
                      <p className="text-xs text-amber-400/90 mt-1">
                        {selectedRegime === 'italy'
                          ? 'Fasci di Combattimento (1919) • Oct 1922 March on Rome'
                          : 'NSDAP • Appointed Chancellor on 30 Jan 1933'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-semibold uppercase">Secret Police & Youth</span>
                      <p className="text-base font-bold text-white mt-1">
                        {selectedRegime === 'italy' ? 'OVRA & Balilla' : 'Gestapo & Hitler Youth'}
                      </p>
                      <p className="text-xs text-slate-300 mt-1">
                        {selectedRegime === 'italy'
                          ? 'Opera Nazionale Balilla (Boys) / Piccole Italiane (Girls)'
                          : 'Hitlerjugend / Bund Deutscher Mädel'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-semibold uppercase">Primary Grievance Treaty</span>
                      <p className="text-base font-bold text-white mt-1">
                        {selectedRegime === 'italy'
                          ? 'Treaty of St. Germain (1919)'
                          : 'Treaty of Versailles (1919)'}
                      </p>
                      <p className="text-xs text-slate-300 mt-1">
                        {selectedRegime === 'italy'
                          ? '"Mutilated Victory" — denied Dalmatia & Fiume promised in 1915'
                          : 'Crushing £6,600M reparations, 100k army cap, War Guilt Clause'}
                      </p>
                    </div>
                  </div>

                  {/* Dictatorship Control Level Gauge Slider */}
                  <div className="space-y-2 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Totalitarian State Consolidation:</span>
                      <span className="text-amber-400 font-bold">{dictatorControlLevel}% Absolute Power</span>
                    </div>
                    <button
                      onClick={() => setDictatorControlLevel(65)}
                      aria-label="Reset consolidation gauge"
                      className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 self-start"
                    >
                      ↺ Reset gauge (65%)
                    </button>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={dictatorControlLevel}
                      onChange={e => setDictatorControlLevel(Number(e.target.value))}
                      aria-label="Adjust Totalitarian State Consolidation percentage"
                      className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="text-xs text-slate-400 italic">
                      {dictatorControlLevel > 75
                        ? '⚠️ Total suppression of civil liberties, press censorship, and one-party dictatorship enacted.'
                        : 'Democracy dismantled; state cult expanding.'}
                    </div>
                    {/* Live derived metrics: what the consolidation % does to real quantities */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500">Opposition vote (managed election)</p>
                        <p className="font-mono font-bold text-rose-300">{(Math.max(0, (100 - dictatorControlLevel) * 0.8)).toFixed(1)}%</p>
                      </div>
                      <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500">Independent press (1928 = 100 papers)</p>
                        <p className="font-mono font-bold text-sky-300">{Math.max(0, Math.round((100 - dictatorControlLevel) * 1.2))} papers</p>
                      </div>
                      <div className="bg-slate-950 rounded-lg p-2 border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500">Opposition seats (per 100)</p>
                        <p className="font-mono font-bold text-amber-300">{Math.max(0, Math.round((100 - dictatorControlLevel) * 0.9))} seats</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Misconception killer: dictators did not seize 100% on day one — each crisis (1929 Depression,
                      Reichstag fire) moved the dial. Drag it to 40, then 90, and watch the opposition vote collapse
                      non-linearly before the press even hits zero.
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB 1: IDEOLOGY VENN EXPLORER & SVG 2 ── */}
              {currentSlide === 1 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setVennActiveTab('italy')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        vennActiveTab === 'italy'
                          ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      🇮🇹 Fascist Italy Only
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setVennActiveTab('shared')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        vennActiveTab === 'shared'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      ⭐ 5+ Shared Core Features (Intersection)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setVennActiveTab('germany')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        vennActiveTab === 'germany'
                          ? 'bg-red-500/20 border-red-500 text-red-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      🇩🇪 Nazi Germany Only (Racial Core)
                    </motion.button>
                  </div>

                  {/* SVG 2: Venn Diagram Visual SVG */}
                  <div className="relative w-full h-56 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 600 240" className="w-full h-full">
                      <circle
                        cx="240"
                        cy="120"
                        r="95"
                        fill="#1e3a8a"
                        fillOpacity={vennActiveTab === 'italy' ? 0.6 : 0.25}
                        stroke="#3b82f6"
                        strokeWidth={vennActiveTab === 'italy' ? 3 : 1}
                        className="cursor-pointer transition-all"
                        onClick={() => setVennActiveTab('italy')}
                      />
                      <circle
                        cx="360"
                        cy="120"
                        r="95"
                        fill="#7f1d1d"
                        fillOpacity={vennActiveTab === 'germany' ? 0.6 : 0.25}
                        stroke="#ef4444"
                        strokeWidth={vennActiveTab === 'germany' ? 3 : 1}
                        className="cursor-pointer transition-all"
                        onClick={() => setVennActiveTab('germany')}
                      />
                      <text x="180" y="125" fill="#93c5fd" fontSize="13" fontWeight="bold" textAnchor="middle">
                        Fascism (Italy)
                      </text>
                      <text x="300" y="115" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
                        5+ Shared
                      </text>
                      <text x="300" y="135" fill="#fde68a" fontSize="10" textAnchor="middle">
                        Totalitarian Traits
                      </text>
                      <text x="420" y="125" fill="#fca5a5" fontSize="13" fontWeight="bold" textAnchor="middle">
                        Nazism (Germany)
                      </text>
                    </svg>
                  </div>

                  {/* Tab Detail Card */}
                  <motion.div
                    key={vennActiveTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm"
                  >
                    {vennActiveTab === 'shared' && (
                      <div className="space-y-2">
                        <p className="font-bold text-amber-300">
                          Key ICSE Checklist — 5 Minimum Shared Features:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                          <li>• 1. One-party dictatorship (Abolition of democracy)</li>
                          <li>• 2. Leader personality cult (Il Duce / Der Führer)</li>
                          <li>• 3. Secret Police surveillance (OVRA / Gestapo)</li>
                          <li>• 4. Extreme glorification of militarism and war</li>
                          <li>• 5. Violent anti-communism & state-controlled propaganda</li>
                        </ul>
                      </div>
                    )}
                    {vennActiveTab === 'italy' && (
                      <div className="space-y-1 text-xs text-blue-200">
                        <p className="font-bold text-blue-400 text-sm">Fascist Italy Distinctive Features:</p>
                        <p>• Arose from St. Germain (1919) territorial disappointment & inflation.</p>
                        <p>• Primacy of the State ("Everything in the State, nothing outside").</p>
                        <p>• No foundational racial anti-Semitism until 1938 German pressure.</p>
                      </div>
                    )}
                    {vennActiveTab === 'germany' && (
                      <div className="space-y-1 text-xs text-red-200">
                        <p className="font-bold text-red-400 text-sm">Nazism Distinctive Critical Difference:</p>
                        <p>• Biological Aryan racial supremacy as founding dogma.</p>
                        <p>• Systematic anti-Semitism codified in Nuremberg Laws (1935).</p>
                        <p>• Direct catalyst was the 1929 Depression (6M unemployed by 1932).</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ── LAB 2: ESCALATION SIMULATOR & PREDICTION ── */}
              {currentSlide === 2 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/50">
                      <p className="text-xs font-bold text-indigo-400 uppercase mb-1">
                        🤔 PREDICT-THEN-CHECK (NEP 2020)
                      </p>
                      <p className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Predict: ${opt}`}
                            className="text-left p-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 flex items-center justify-between text-xs">
                      <span className="text-emerald-300">
                        Prediction recorded! Verify below by manipulating the chronological timeline.
                      </span>
                      <span className="font-bold text-emerald-400">Step 2: Inspect Timeline</span>
                    </div>
                  )}

                  {/* Interactive Timeline Slider */}
                  <div className="space-y-3 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Historic Milestone Year:</span>
                      <span className="text-xl font-bold text-amber-400">{simYear}</span>
                    </div>
                    <input
                      type="range"
                      min={1919}
                      max={1945}
                      step={1}
                      value={simYear}
                      onChange={e => handleSimYearChange(Number(e.target.value))}
                      aria-label="Timeline Year Slider from 1919 to 1945"
                      className="w-full accent-amber-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
                    />

                    {/* Timeline Event Card */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      {simYear === 1919 && (
                        <div>
                          <span className="text-xs font-bold text-blue-400">1919 • Post-WWI Treaties</span>
                          <p className="text-sm text-white font-semibold mt-1">
                            Treaty of Versailles (Germany) & Treaty of St. Germain (Italy)
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Versailles imposes War Guilt clause & reparations; St. Germain denies Italy Dalmatia.
                          </p>
                        </div>
                      )}
                      {simYear >= 1920 && simYear <= 1928 && (
                        <div>
                          <span className="text-xs font-bold text-amber-400">October 1922 • Rise of Fascism</span>
                          <p className="text-sm text-white font-semibold mt-1">
                            Mussolini’s March on Rome & Italian Fascist Consolidation
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            King Victor Emmanuel III appoints Mussolini Prime Minister; OVRA secret police formed.
                          </p>
                        </div>
                      )}
                      {simYear >= 1929 && simYear <= 1932 && (
                        <div>
                          <span className="text-xs font-bold text-rose-400">
                            October 1929 • Wall Street Crash & Great Depression
                          </span>
                          <p className="text-sm text-white font-semibold mt-1">
                            6 Million German Workers Unemployed by 1932
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            American Dawes Plan loans evaporate; mass despair destroys the Weimar Republic’s credibility.
                          </p>
                        </div>
                      )}
                      {simYear >= 1933 && simYear <= 1937 && (
                        <div>
                          <span className="text-xs font-bold text-red-400">30 January 1933 • Hitler Takes Power</span>
                          <p className="text-sm text-white font-semibold mt-1">
                            Appointed Chancellor by President Paul von Hindenburg
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Rearmament begins, Nuremberg Laws enacted in 1935, Japan invades China (Marco Polo Bridge, July 1937).
                          </p>
                        </div>
                      )}
                      {simYear === 1938 && (
                        <div>
                          <span className="text-xs font-bold text-amber-400">30 September 1938 • Munich Agreement</span>
                          <p className="text-sm text-white font-semibold mt-1">
                            Appeasement Peak: Sudetenland Conceded to Hitler
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Chamberlain claims "peace in our time"; Hitler seizes the rest of Czechoslovakia in March 1939.
                          </p>
                        </div>
                      )}
                      {simYear >= 1939 && simYear <= 1940 && (
                        <div>
                          <span className="text-xs font-bold text-red-500">
                            1 September 1939 • Outbreak of World War II
                          </span>
                          <p className="text-sm text-white font-semibold mt-1">
                            German Invasion of Poland (Enabled by Nazi-Soviet Pact, 23 Aug 1939)
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Britain and France declare war on 3 September 1939.
                          </p>
                        </div>
                      )}
                      {simYear >= 1941 && simYear <= 1944 && (
                        <div>
                          <span className="text-xs font-bold text-blue-400">
                            7 December 1941 • Attack on Pearl Harbour
                          </span>
                          <p className="text-sm text-white font-semibold mt-1">
                            Japan Strikes Hawaii; United States Enters WWII
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            US industrial power enters the global conflict; Axis begins losing momentum.
                          </p>
                        </div>
                      )}
                      {simYear === 1945 && (
                        <div>
                          <span className="text-xs font-bold text-emerald-400">
                            1945 • Axis Defeat, Atomic Bombings & UN Formation
                          </span>
                          <p className="text-sm text-white font-semibold mt-1">
                            Hiroshima (6 Aug), Nagasaki (9 Aug), Surrender (2 Sep), UN Charter (24 Oct)
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            VE Day (7-8 May); 51 nations establish United Nations in San Francisco to replace failed League.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: UN SECURITY COUNCIL & VETO SIMULATOR & SVG 3 ── */}
              {currentSlide === 3 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">Security Council Resolution Simulator</h4>
                      <p className="text-xs text-slate-400">
                        Formula: 5 Permanent (P5) with VETO + 10 Non-Permanent (2-yr terms) = 15 Total
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                        isResolutionPassed
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/80 border-rose-500 text-rose-300'
                      }`}
                    >
                      Status: {isResolutionPassed ? 'PASSED (BINDING UNDER CH. VII)' : 'BLOCKED / VETOED'}
                    </div>
                  </div>

                  {/* SVG 3: UN Security Council Chamber Diagram */}
                  <div className="w-full bg-slate-900/80 rounded-2xl border border-slate-800 p-3 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      UN Security Council Chamber Horseshoe Voting Matrix
                    </span>
                    <svg viewBox="0 0 600 150" className="w-full h-32">
                      <path d="M 120 120 A 180 180 0 0 1 480 120" fill="none" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
                      {/* P5 Seats */}
                      {(['usa', 'uk', 'france', 'russia', 'china'] as (keyof typeof p5Votes)[]).map((c, i) => {
                        const angle = Math.PI * (0.2 + i * 0.15);
                        const cx = 300 - Math.cos(angle) * 180;
                        const cy = 135 - Math.sin(angle) * 100;
                        const votedYes = p5Votes[c];
                        return (
                          <g key={c}>
                            <circle cx={cx} cy={cy} r="14" fill={votedYes ? '#10b981' : '#ef4444'} stroke="#ffffff" strokeWidth="1.5" />
                            <text x={cx} y={cy + 4} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                              {c.substring(0, 3).toUpperCase()}
                            </text>
                          </g>
                        );
                      })}
                      <text x="300" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Presidential Dais & Secretary-General
                      </text>
                      <text x="300" y="135" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        10 Non-Permanent Member Seats ({nonPermVotes}/10 Voting Yes)
                      </text>
                    </svg>
                  </div>

                  {/* P5 Toggle Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase">
                      Permanent 5 (P5) Veto Powers:
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {(['usa', 'uk', 'france', 'russia', 'china'] as (keyof typeof p5Votes)[]).map(country => (
                        <motion.button
                          key={country}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleP5VoteToggle(country)}
                          aria-label={`Toggle vote for P5 member ${country.toUpperCase()}`}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            p5Votes[country]
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                              : 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold'
                          }`}
                        >
                          <div className="text-xs uppercase tracking-wider font-bold">{country}</div>
                          <div className="text-sm font-bold mt-1">{p5Votes[country] ? '✓ YES' : '⛔ VETO'}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Non-Permanent Slider */}
                  <div className="space-y-2 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Non-Permanent Member Votes (Elected for 2-year terms):</span>
                      <span className="text-amber-400 font-bold">{nonPermVotes} / 10 Supporting</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={nonPermVotes}
                      onChange={e => setNonPermVotes(Number(e.target.value))}
                      aria-label="Set number of supporting non-permanent member votes"
                      className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl"
                    >
                      <p className="text-xs font-bold text-amber-400 uppercase mb-1">
                        👀 BRILLIANT OBSERVATION CHECK
                      </p>
                      <p className="text-xs font-semibold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation option: ${opt}`}
                            className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 4: COLD WAR & NON-ALIGNED MOVEMENT (NAM) COMPASS & SVG 4 ── */}
              {currentSlide === 4 && (
                <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* SVG 4: Cold War Bipolar vs Non-Aligned Movement Diagram */}
                  <div className="w-full bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
                      Cold War Geopolitical Triad: Western Bloc • NAM Third World • Eastern Bloc
                    </span>
                    <svg viewBox="0 0 600 140" className="w-full h-32">
                      <rect x="30" y="25" width="150" height="90" rx="10" fill="#1e3a8a" fillOpacity="0.7" stroke="#3b82f6" strokeWidth="2" />
                      <text x="105" y="60" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">USA & NATO (1949)</text>
                      <text x="105" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">Capitalist Democracy</text>

                      <rect x="225" y="15" width="150" height="110" rx="10" fill="#78350f" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="2" />
                      <text x="300" y="55" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">NAM (Belgrade 1961)</text>
                      <text x="300" y="75" fill="#ffffff" fontSize="9" textAnchor="middle">Panchsheel (1954)</text>
                      <text x="300" y="95" fill="#fed7aa" fontSize="9" textAnchor="middle">Independent Sovereignty</text>

                      <rect x="420" y="25" width="150" height="90" rx="10" fill="#7f1d1d" fillOpacity="0.7" stroke="#ef4444" strokeWidth="2" />
                      <text x="495" y="60" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">USSR & Warsaw (1955)</text>
                      <text x="495" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">Communist Bloc</text>

                      <path d="M 180 70 L 225 70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                      <path d="M 375 70 L 420 70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                    </svg>
                  </div>

                  <div className="space-y-2 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-400 font-bold">Western Bloc (NATO • 1949)</span>
                      <span className="text-amber-400 font-bold">
                        {namAlignment === 50 ? '⭐ Non-Aligned Movement (Belgrade 1961)' : `Alignment: ${namAlignment}%`}
                      </span>
                      <span className="text-red-400 font-bold">Eastern Bloc (Warsaw Pact • 1955)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={namAlignment}
                      onChange={e => setNamAlignment(Number(e.target.value))}
                      aria-label="Adjust foreign policy alignment between NATO, NAM, and Warsaw Pact"
                      className="w-full accent-amber-500 bg-slate-800 h-3 rounded-lg cursor-pointer"
                    />
                    <p className="text-xs text-slate-400 text-center italic mt-1">
                      {namAlignment === 50
                        ? 'India under Nehru: Active diplomatic engagement with both superpowers without joining military alliances.'
                        : namAlignment < 40
                        ? 'Tilted towards American/NATO capitalist bloc.'
                        : 'Tilted towards Soviet/Warsaw Pact communist bloc.'}
                    </p>
                  </div>

                  {/* 5 Architects of NAM Interactive Cards */}
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      The 5 Founding Architects of NAM (Belgrade Summit 1961):
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                      {[
                        { id: 'nehru', name: 'Jawaharlal Nehru', country: '🇮🇳 India', role: 'Panchsheel & Foreign Policy Pioneer' },
                        { id: 'tito', name: 'Josip Broz Tito', country: '🇷🇸 Yugoslavia', role: 'Convened Belgrade 1961' },
                        { id: 'nasser', name: 'Gamal Abdel Nasser', country: '🇪🇬 Egypt', role: 'Arab Sovereignty & Anti-Imperialism' },
                        { id: 'nkrumah', name: 'Kwame Nkrumah', country: '🇬🇭 Ghana', role: 'African Decolonisation Champion' },
                        { id: 'sukarno', name: 'Sukarno', country: '🇮🇩 Indonesia', role: 'Hosted Bandung Conference 1955' },
                      ].map(arch => (
                        <motion.button
                          key={arch.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedArchitect(arch.id)}
                          aria-label={`View architect ${arch.name}`}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedArchitect === arch.id
                              ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{arch.name}</div>
                          <div className="text-[11px] text-amber-400 mt-0.5">{arch.country}</div>
                          <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{arch.role}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between p-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Exploration Lab"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs disabled:opacity-40 hover:bg-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-bold">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next Exploration Lab"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Advance to Free Sandbox"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY BEFORE CHALLENGES) ─────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-xl">🎛️</span> Geopolitical Sandbox & Document Archive
              </h3>
              <p className="text-xs text-slate-400">
                Explore any agency, compare treaties, and inspect historical primary documents with zero penalty.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready to start graded challenges"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20"
            >
              Ready for Challenges! 🎯 →
            </motion.button>
          </div>

          {/* Sandbox Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'unicef' as const, label: 'UNICEF (New York • 1946)' },
              { id: 'who' as const, label: 'WHO (Geneva • 1948)' },
              { id: 'unesco' as const, label: 'UNESCO (Paris • 1945)' },
              { id: 'udhr' as const, label: 'UDHR (Paris • 10 Dec 1948)' },
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAgency(tab.id)}
                aria-label={`Select ${tab.label}`}
                className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedAgency === tab.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Agency Deep-Dive Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {selectedAgency === 'unicef' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
                  <span>👶</span> UNICEF • United Nations Children’s Fund
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Headquartered in New York City. Established on 11 December 1946. Delivers child immunisation drives, nutritional support, safe drinking water, and basic education in over 190 countries.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  🇮🇳 <strong>India Impact:</strong> Supported universal childhood immunisation, rural maternal health, and combating child malnutrition across Indian states.
                </div>
              </div>
            )}
            {selectedAgency === 'who' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <span>🏥</span> WHO • World Health Organization
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Headquartered in Geneva, Switzerland. Founded on 7 April 1948 (World Health Day). Serves as the directing and coordinating authority for international public health, setting standards and leading epidemic containment.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  🌍 <strong>Historic Milestones:</strong> Certified global eradication of smallpox (1980); supported India’s National Polio Surveillance Project resulting in India being certified polio-free in 2014.
                </div>
              </div>
            )}
            {selectedAgency === 'unesco' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-400 text-sm font-bold">
                  <span>🏛️</span> UNESCO • UN Educational, Scientific and Cultural Organization
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Headquartered in Paris, France. Founded on 16 November 1945. Promotes global peace through international cooperation in education, scientific research, cultural heritage, and freedom of expression.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  🇮🇳 <strong>World Heritage in India:</strong> Inscribed the Taj Mahal at Agra (1983), Monuments of Hampi (1986), Ajanta Caves (1983), and Kaziranga National Park (1985).
                </div>
              </div>
            )}
            {selectedAgency === 'udhr' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                  <span>📜</span> Universal Declaration of Human Rights (UDHR)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Adopted by the UN General Assembly at the Palais de Chaillot, Paris, on 10 December 1948 (celebrated annually as Human Rights Day). Drafted by a committee chaired by Eleanor Roosevelt.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  ⚖️ <strong>Legal Nature & Indian Constitution:</strong> A moral declaration of principles (not a legally binding treaty). Directly inspired the Fundamental Rights in Part III of India’s 1950 Constitution (Articles 14, 19, 21, 22).
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (ADAPTIVE BKT ENGINE) ────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={20} className="w-full rounded-lg bg-slate-900/50" />

          {/* Progress & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-amber-400 font-bold">
                Competency: <span className="uppercase text-white">{currentCh.competencyLevel}</span>
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentCh.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl bg-slate-900 border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">
                {currentCh.nodeId}
              </span>
              <span className="text-xs text-slate-400 capitalize">• {currentCh.type}</span>
            </div>

            <p className="text-base md:text-lg font-bold text-white leading-relaxed mb-6">
              {currentCh.question}
            </p>

            {/* MCQ Types (classify, distinguish, match) */}
            {(currentCh.type === 'classify' ||
              currentCh.type === 'distinguish' ||
              currentCh.type === 'match') &&
              currentCh.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentCh.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                        showExplanation && i === currentCh.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== currentCh.correctIndex
                          ? 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Type */}
            {currentCh.type === 'drag-label' && currentCh.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="w-full text-xs text-slate-400 font-semibold mb-1">
                    Drag items to the corresponding target zones:
                  </span>
                  {currentCh.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      className="px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/50 text-amber-300 rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(currentCh.correctMapping || {}).map(targetKey => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 font-semibold uppercase">
                        Target Zone: {targetKey.replace('box_', '').replace('_', ' ')}
                      </span>
                      <div className="mt-2 text-sm font-bold text-amber-300">
                        {droppedLabels[targetKey] ? (
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            ✓ {droppedLabels[targetKey]}
                          </span>
                        ) : (
                          <span className="text-slate-600 italic">Drop corresponding item here...</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Submit Drag Label Mapping"
                  className="mt-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Matrix Mapping ✓
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {currentCh.type === 'drag-sort' && currentCh.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-semibold">
                  Drag or reorder steps into correct historical sequence:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === currentCh.sortItems.length
                    ? sortArrangement.map(idx => currentCh.sortItems![idx])
                    : currentCh.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sequence step ${displayIdx + 1}: ${item}`}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200 flex items-center justify-between cursor-grab"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-400 text-[10px]">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-600 text-xs">↕ Drag to move</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Verify Chronological Sequence"
                  className="mt-3 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Sequence ✓
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {currentCh.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value..."
                    aria-label="Numeric input value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 w-44 font-bold"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{currentCh.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric calculation"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                  >
                    Check Number ✓
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {currentCh.type === 'construct' && currentCh.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{currentCh.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentCh.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      disabled={constructParts.includes(part) || showExplanation}
                      aria-label={`Add part: ${part}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        constructParts.includes(part)
                          ? 'bg-slate-900 border-slate-800 text-slate-600 opacity-50'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                      }`}
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-1 font-bold"
                        aria-label={`Remove part: ${part}`}
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs italic">
                      Click parts above to construct the complete principle framework...
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Framework"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Framework ✓
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/50 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    ICSE Syllabus Explanation & Breakdown:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {currentCh.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {currentCh.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                      >
                        <strong className="text-amber-400">{idx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps <
                    currentCh.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    currentCh.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to Next Challenge"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Simulation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl border border-amber-500/40 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              ICSE Simulation Complete!
            </h2>
            <div className="flex justify-center items-center gap-4 text-sm font-semibold">
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Final Score: {Math.max(0, 100 - errors * 5)}%
              </span>
              <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 capitalize">
                Mastery Level: {masteryLevel}
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {errors === 0
                ? 'Outstanding historic precision! You have mastered the causes of dictatorships, WWII escalation, UN governance, and the Non-Aligned Movement.'
                : errors <= 3
                ? 'Excellent understanding! Review the specific misconception corrections below to solidify a perfect examination score.'
                : 'Good effort! Review the historical timeline, UN Security Council veto rules, and NAM architects before re-attempting.'}
            </p>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Targeted Misconception Diagnostic Profile:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1.5">
                      <p className="text-rose-400 font-bold">❌ Common Mistake: {m.misconception}</p>
                      <p className="text-emerald-300">✓ ICSE Examiner Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Visibility */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                📅 Spaced Repetition (SM-2 Schedule)
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Based on your response performance, this topic should be reviewed in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>{' '}
                to ensure permanent long-term retention.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 bg-slate-800 rounded-lg text-slate-400">
              SM-2 Quality: {errors === 0 ? '5/5' : errors <= 3 ? '4/5' : '2/5'}
            </span>
          </div>

          {/* ─── REFLECTION SECTION (NEP 2020) ──────────────────────────────── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-amber-500/30 space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>💭</span> Historical Synthesis & Self-Reflection
            </h3>
            <p className="text-xs text-slate-400">
              Reflect upon the geopolitical mechanisms and diplomatic lessons explored across these historical eras.
            </p>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={e => setReflections(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How the 1929 Wall Street Crash directly enabled Hitler's rise, or how the UN Security Council veto functions..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={e => setReflections(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g., Non-alignment wasn't neutrality, but sovereign freedom for newly independent nations to choose their own foreign policy..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={e => setReflections(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., Analysing contemporary United Nations Security Council voting, international treaty negotiations, or multilateral foreign policy..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {!reflectionSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                    speechManager.speak('Your historical reflections have been recorded.');
                  }}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                >
                  Submit Reflections ✓
                </motion.button>
              ) : (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                  ✓ Reflections recorded! Excellent critical synthesis.
                </div>
              )}
            </div>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <span>✍️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM SIM-ENGINE FEEDBACK OVERLAYS ─────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_HistoryCivicsRiseDictatorshipsCausesSim;