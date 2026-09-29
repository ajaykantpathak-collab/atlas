'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED NODE IDS (MANDATORY VERIFICATION) ────────────���────────────────────
const NODE_C12_HIST_041 = 'c12_hist_041'; // Ghana (1957-1966) - Nkrumah & Overthrow
const NODE_C12_HIST_042 = 'c12_hist_042'; // Kenya (1947-1964) - White Settlers & Kenyatta
const NODE_C12_HIST_043 = 'c12_hist_043'; // Comparative Decolonisation in Asia & Africa
const NODE_C12_HIST_044 = 'c12_hist_044'; // Yalta and Potsdam Conferences (1945)
const NODE_C12_HIST_045 = 'c12_hist_045'; // Truman Doctrine & Marshall Plan (1947)
const NODE_C12_HIST_046 = 'c12_hist_046'; // Molotov Plan, COMECON & Cominform
const NODE_C12_HIST_047 = 'c12_hist_047'; // Soviet Expansion & Czechoslovak Coup (1945-1948)
const NODE_C12_HIST_048 = 'c12_hist_048'; // Berlin Blockade, NATO & German Division (1948-1949)
const NODE_C12_HIST_049 = 'c12_hist_049'; // Cuban Missile Crisis (1962)
const NODE_C12_HIST_050 = 'c12_hist_050'; // Détente, End of Communism & USSR Breakup (1970s-1991)

const ALL_NODE_IDS = [
  NODE_C12_HIST_041,
  NODE_C12_HIST_042,
  NODE_C12_HIST_043,
  NODE_C12_HIST_044,
  NODE_C12_HIST_045,
  NODE_C12_HIST_046,
  NODE_C12_HIST_047,
  NODE_C12_HIST_048,
  NODE_C12_HIST_049,
  NODE_C12_HIST_050,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Winds of Change & The Global Iron Curtain (1945-1991)',
  intro: 'You are appointed Chief Archival Historian & Geopolitical Strategist for an international diplomatic academy in 1992. Decolonisation in Africa/Asia and the Cold War superpower confrontation transformed the modern world across four decades.',
  context: 'Trace how Kwame Nkrumah’s Ghana and Kenyatta’s Kenya navigated independence amidst colonial economic legacies, while Europe fractured into NATO and the Soviet Eastern Bloc, triggering the Berlin Airlift, the Cuban Missile Crisis, and finally Soviet dissolution in 1991.',
};

// ─── DISCOVERY HOOK ───────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'In 1957, Ghana became the first sub-Saharan colony to gain independence peacefully, while Kenya fought a bloody armed conflict (Mau Mau). What was the decisive structural difference?',
  options: [
    'Ghana was rich in gold while Kenya had no natural resources.',
    'Kenya had 60,000 European white settlers occupying fertile ancestral highlands (White Highlands), whereas Ghana had no settler land occupation.',
    'Kwame Nkrumah was an ally of the Soviet Union while Jomo Kenyatta backed the USA.',
    'The British army refused to send any troops to West Africa.',
  ],
  correctIndex: 1,
  hintAfter: 'Settler colonialism vs non-settler peasant trade fundamentally determined whether decolonisation was constitutional or violent!',
};

// ─── CHALLENGE INTERFACE ──────────────────────────────────────────────────────
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

// ─── CHALLENGES ARRAY (22 Progressive Challenges) ─────────────────────────────
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_HIST_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On what date did the British colony of the Gold Coast become independent as Ghana under Kwame Nkrumah?',
    options: ['15th August 1947', '6th March 1957', '12th December 1963', '1st October 1960'],
    correctIndex: 1,
    explanation: 'Ghana gained independence on 6th March 1957 as the first sub-Saharan African colony to break colonial rule, led by Kwame Nkrumah and the Convention People’s Party (CPP).',
    hints: [
      'It occurred in the late 1950s, exactly a decade after India’s independence.',
      'The date is celebrated on 6th March.',
      'Ghana declared independence on 6th March 1957 under the CPP slogan "Self-Government Now."',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_HIST_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which economic factor critically triggered the domestic collapse that led to Nkrumah’s 1966 military overthrow?',
    options: [
      'The discovery of vast offshore oil reserves crashing the currency',
      'The collapse of world cocoa prices combined with heavy foreign debt from prestige projects like the Akosombo Dam',
      'A complete British naval embargo preventing all gold shipments',
      'Hyperinflation caused by adopting the US Dollar',
    ],
    correctIndex: 1,
    explanation: 'Cocoa accounted for roughly 60% of Ghana’s foreign exchange. When world cocoa prices collapsed, revenue plummeted while debt repayments for prestige infrastructure (Akosombo Dam, Tema motorway) fell due.',
    hints: [
      'Think about Ghana’s colonial single cash crop monoculture.',
      'The crop makes chocolate, and large hydro dams incurred heavy foreign loans.',
      'A cocoa price collapse paired with debt servicing for the Volta River Project (Akosombo Dam) brought economic crisis.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_HIST_042,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is it historically inaccurate to state that Jomo Kenyatta personally led the Mau Mau armed guerrilla revolt?',
    options: [
      'Kenyatta was living in exile in Romania throughout the entire 1950s.',
      'Kenyatta was arrested on the first day of the 1952 State of Emergency and remained imprisoned/restricted until August 1961, while field generals like Dedan Kimathi led the insurgency.',
      'Kenyatta was the serving British colonial governor of Nairobi.',
      'Mau Mau was entirely a peaceful monastic movement without any military wing.',
    ],
    correctIndex: 1,
    explanation: 'Kenyatta advocated constitutional nationalism via KAU. He was imprisoned at Kapenguria (1952-1961) on perjured testimony from Rawson Macharia, while Mau Mau field commanders like Dedan Kimathi fought in the forests.',
    hints: [
      'Look at Kenyatta’s location during the State of Emergency from 1952 to 1961.',
      'He was in British colonial prisons (Lokitaung, Lodwar, Maralal) during the armed conflict.',
      'Kenyatta pursued constitutional negotiation, whereas Dedan Kimathi and General China led the Kenya Land and Freedom Army.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_HIST_044,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct wartime summit features to their respective conference: Yalta (Feb 1945) vs Potsdam (Jul-Aug 1945).',
    dragItems: [
      { label: 'Declaration on Liberated Europe (Roosevelt, Churchill, Stalin)', targetId: 'slot_yalta' },
      { label: 'Atomic Bomb Tested; Truman & Attlee replace FDR/Churchill', targetId: 'slot_potsdam' },
      { label: 'Agreement to divide Germany into 4 zones', targetId: 'slot_yalta_zones' },
      { label: 'Bitter disputes over Oder-Neisse border & zone reparations', targetId: 'slot_potsdam_dispute' },
    ],
    correctMapping: {
      slot_yalta: 'Declaration on Liberated Europe (Roosevelt, Churchill, Stalin)',
      slot_potsdam: 'Atomic Bomb Tested; Truman & Attlee replace FDR/Churchill',
      slot_yalta_zones: 'Agreement to divide Germany into 4 zones',
      slot_potsdam_dispute: 'Bitter disputes over Oder-Neisse border & zone reparations',
    },
    explanation: 'Yalta preserved wartime unity through compromise before Nazi defeat. Potsdam saw Truman replace the deceased FDR and Attlee replace Churchill, hardening stances amid atomic diplomacy.',
    hints: [
      'Roosevelt was alive at Yalta (Feb 1945); Truman represented the US at Potsdam (Jul 1945).',
      'The Declaration on Liberated Europe belongs to Yalta.',
      'Potsdam was marked by friction over reparations and Poland’s Oder-Neisse western border.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_HIST_045,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many billion dollars did the Marshall Plan (European Recovery Programme) disburse to 16 Western European nations between 1948 and 1952?',
    correctAnswer: 13,
    tolerance: 1,
    unit: 'billion USD',
    explanation: 'The Marshall Plan disbursed approximately $13 billion (about 5% of US GDP at the time) between 1948 and 1952, revitalising Western Europe and containing communist electoral growth.',
    hints: [
      'It is a two-digit number between 10 and 15 billion.',
      'The number is exactly 13.',
      'Type 13 for $13 billion.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_HIST_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What immediate geopolitical trigger prompted President Truman to announce the Truman Doctrine on 12 March 1947?',
    options: [
      'The Soviet detonation of an atomic bomb in Siberia',
      'Britain announcing in February 1947 that it could no longer afford military/financial aid to Greece and Turkey against communist insurgencies',
      'The construction of the Berlin Wall by East Germany',
      'The French withdrawal from NATO headquarters in Paris',
    ],
    correctIndex: 1,
    explanation: 'Britain’s financial exhaustion in February 1947 created a power vacuum in Greece and Turkey. Truman asked Congress for $400 million, pledging to support free peoples resisting subjugation.',
    hints: [
      'Which former imperial power went broke in early 1947 in the eastern Mediterranean?',
      'Greece was in a civil war and Turkey was under Soviet pressure for the Dardanelles straits.',
      'Britain’s official notification that it must terminate Greek and Turkish subsidies forced the US to step in.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_HIST_046,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How did the structure of the Molotov Plan (1947) fundamentally differ from the American Marshall Plan (1947)?',
    options: [
      'The Molotov Plan gave grants in gold bullion, while the Marshall Plan gave only weapons.',
      'The Molotov Plan was a series of separate bilateral trade pacts maximising Soviet leverage over each satellite, unlike the multilateral OEEC framework of the Marshall Plan.',
      'The Molotov Plan allowed free elections in recipient states, while the Marshall Plan prohibited them.',
      'The Molotov Plan was open only to Asian nations.',
    ],
    correctIndex: 1,
    explanation: 'Stalin rejected multilateral pooling (which could give satellites collective bargaining power). The Molotov Plan tied each state pairwise directly to Moscow in bilateral dependency.',
    hints: [
      'Consider Bilateral (pairwise) vs Multilateral (collective union) mechanisms.',
      'Stalin wanted each Eastern European capital to negotiate only with Moscow.',
      'Bilateral trade agreements allowed Moscow to exert direct control without collective satellite cooperation.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_HIST_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Which Soviet ideological doctrine, articulated in September 1947 at Cominform’s founding, divided the world into an "imperialist" camp and an "anti-imperialist" camp?',
    options: ['The Brezhnev Doctrine', 'The Zhdanov Two-Camps Doctrine', 'The Sinatra Doctrine', 'The Gerasimov Doctrine'],
    correctIndex: 1,
    explanation: 'Andrei Zhdanov formulated the "Two-Camps" doctrine at Szklarska Poręba in September 1947, demanding total ideological alignment from all European communist parties.',
    hints: [
      'Named after Stalin’s cultural and ideological commissar Andrei...',
      'Begins with "Zh".',
      'It is the Zhdanov Two-Camps Doctrine.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_HIST_047,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of Mátyás Rákosi’s "Salami Tactics" method of communist takeover in Eastern Europe (1945-1948):',
    sortItems: [
      'Join broad anti-fascist coalition government legitimately',
      'Seize control of the Interior Ministry and national police apparatus',
      'Use security forces to harass, arrest, or frame non-communist opposition leaders',
      'Manipulate or rig elections and establish a sole-party communist state',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Salami tactics sliced opposition away piece by piece: first joining coalitions, capturing police/interior ministries, intimidating rivals, and finally executing single-party control.',
    hints: [
      'They started inside lawful coalitions before taking over security forces.',
      'The police (Interior) was captured before mass arrests and election rigging.',
      'The order is: Coalitions -> Interior Ministry -> Police repression -> Single-party consolidation.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_HIST_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why was the Czechoslovak Coup of February 1948 a decisive psychological shock to Western democracies?',
    options: [
      'Czechoslovakia was an absolute monarchy with no communist supporters.',
      'Czechoslovakia was the last functioning parliamentary democracy in Central/Eastern Europe with free 1946 elections; its subversion directly accelerated NATO’s formation.',
      'Soviet nuclear weapons were immediately detonated in Prague.',
      'Czechoslovakia had already joined NATO in 1947.',
    ],
    correctIndex: 1,
    explanation: 'Czechoslovakia had a robust interwar democracy and a free 1946 election where communists won 38%. Gottwald’s armed militia takeover and Jan Masaryk’s suspicious death shattered Western illusions of coexistence.',
    hints: [
      'Think about Czechoslovakia���s pre-war democratic heritage compared to its neighbours.',
      'It proved that democratic coalitions could not stop Soviet-backed single-party coups.',
      'The loss of the last Central European democracy catalyzed the Brussels Pact and NATO.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_HIST_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the immediate catalyst for Stalin imposing the land blockade of West Berlin on 24 June 1948?',
    options: [
      'The assassination of General Lucius Clay in Munich',
      'The Western Allies introducing the new Deutsche Mark (DM) currency without Soviet agreement to unify Western zones',
      'The US deploying B-29 bombers to drop atomic weapons on Dresden',
      'The establishment of East Germany as a separate republic',
    ],
    correctIndex: 1,
    explanation: 'On 20 June 1948, the Western Allies launched the Deutsche Mark to revitalize Bizonia/Trizonia. Stalin viewed this unilateral currency reform as the birth of a separate capitalist West German state and blockaded Berlin 4 days later.',
    hints: [
      'It involved a monetary reform in the Western occupation zones.',
      'The introduction of the Deutsche Mark currency on 20 June 1948.',
      'Stalin reacted to the unilateral Western Deutsche Mark currency reform.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_HIST_048,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'How many founding member nations signed the North Atlantic Treaty in Washington on 4 April 1949 establishing NATO?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'nations',
    explanation: 'NATO was founded by 12 nations: USA, UK, Canada, France, Italy, Belgium, Netherlands, Luxembourg, Denmark, Norway, Iceland, and Portugal, anchored by Article 5 collective defence.',
    hints: [
      'A dozen countries signed in Washington.',
      'Between 10 and 15.',
      'Exactly 12 founding members.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_HIST_049,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Soviet Premier Nikita Khrushchev initiate Operation Anadyr (deploying nuclear missiles in Cuba in 1962)?',
    options: [
      'Purely to initiate an unprovoked nuclear first strike on Washington D.C.',
      'Twin motives: to deter a second US invasion of Cuba after the 1961 Bay of Pigs failure, and to redress the strategic imbalance caused by US Jupiter missiles deployed in Turkey.',
      'To force Cuba to join the Warsaw Pact against Fidel Castro’s wishes.',
      'To sell nuclear weapons to Latin American commercial corporations.',
    ],
    correctIndex: 1,
    explanation: 'Khrushchev sought to protect Castro’s socialist revolution after the CIA-backed Bay of Pigs invasion and counterbalance US Jupiter intermediate missiles stationed in Turkey right on the USSR’s southern border.',
    hints: [
      'Look at both the Caribbean context (Bay of Pigs) and NATO’s missile base in Turkey.',
      'It had a defensive deterrent aim and a strategic balancing aim.',
      'Deterring US invasion after the Bay of Pigs plus countering Jupiter missiles in Turkey.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_HIST_049,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'On "Black Saturday" (27 October 1962), what action by Soviet submarine officer Vasili Arkhipov prevented nuclear war?',
    options: [
      'He shot down an American U-2 spy plane using hand weapons.',
      'He exercised his required commander veto aboard the depth-charged B-59 submarine, refusing to authorize the launch of a 10-kiloton nuclear torpedo.',
      'He surrendered the Soviet fleet to President Kennedy in Miami.',
      'He decoded an encrypted surrender order from Nikita Khrushchev.',
    ],
    correctIndex: 1,
    explanation: 'Submarine B-59 was trapped and depth-charged by US warships. The captain and political officer voted to fire their nuclear torpedo; only Vasili Arkhipov’s veto averted a nuclear exchange.',
    hints: [
      'It occurred deep underwater aboard submarine B-59.',
      'Firing required unanimous consent of three senior officers.',
      'Arkhipov refused consent to fire the nuclear torpedo despite being under depth-charge pressure.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_HIST_050,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why did the "Third Basket" of the 1975 Helsinki Final Act prove to be a slow-acting poison for Soviet totalitarian control?',
    options: [
      'It forced the USSR to adopt the US Dollar as legal tender.',
      'It committed signatories to respect human rights and fundamental freedoms, legitimising dissident monitoring groups like Charter 77 and Solidarity.',
      'It banned all socialist trade unions across Europe.',
      'It required immediate NATO military bases in Moscow.',
    ],
    correctIndex: 1,
    explanation: 'Brezhnev signed Helsinki to secure recognition of WWII European borders, dismissing human rights clauses as toothless rhetoric. Dissidents used this binding international treaty to legally challenge state repression.',
    hints: [
      'What did Basket Three cover: borders, trade, or human rights?',
      'Dissidents like Havel (Charter 77) and Wałęsa (Solidarity) cited Helsinki.',
      'It gave moral and legal legitimacy to human rights monitoring groups inside the Soviet bloc.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_HIST_050,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the causal chain of the Fall of Communism in Poland (1980-1989):',
    availableParts: ['Gdańsk Strike & Solidarity Founded', 'Jaruzelski Imposes Martial Law', 'Round Table Talks', 'Solidarity Wins 99/100 Senate Seats'],
    targetState: 'Gdańsk Strike & Solidarity Founded -> Jaruzelski Imposes Martial Law -> Round Table Talks -> Solidarity Wins 99/100 Senate Seats',
    validationHint: 'Connect from 1980 shipyard strike through 1981 crackdown to 1989 negotiations and June 1989 ballot triumph.',
    explanation: 'Wałęsa’s Solidarity formed in 1980, survived 1981 martial law underground, negotiated the 1989 Round Table, and won 99/100 Senate seats in June 1989, ending communist monopoly.',
    hints: [
      'Start with Gdańsk Shipyard in 1980.',
      'Martial law in Dec 1981 came next.',
      'Round Table talks in early 1989 led directly to the June 1989 election victory.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_HIST_043,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Comparing China (1949), Ghana (1957), and Kenya (1963), what was the decisive variable shaping whether power was transferred peacefully or violently?',
    options: [
      'Whether the nationalist leaders were educated at American vs Soviet universities.',
      'The presence of European settler populations: absent in Ghana (peaceful transfer), dominant in Kenya’s White Highlands (armed Mau Mau revolt), and replaced by a domestic civil war in China.',
      'The percentage of Christian vs Muslim populations.',
      'The direct intervention of United Nations peacekeeping armies.',
    ],
    correctIndex: 1,
    explanation: 'Settler colonialism was the structural barrier. In Ghana, no settlers resisted African rule; in Kenya, 60,000 white settlers monopolising fertile land blocked constitutional paths until armed revolt forced British concessions.',
    hints: [
      'Consider who owned the fertile land in Kenya compared to peasant cocoa farms in Ghana.',
      'Settler demographics created entrenched political lobbies against majority rule.',
      'White settler presence in Kenya required armed struggle to break deadlock, unlike non-settler Ghana.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_HIST_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did Kwame Nkrumah’s concept of "Neo-Colonialism" (1965) explain the continued vulnerability of newly independent African states?',
    options: [
      'It argued that European armies never left African soil.',
      'It explained that despite political sovereignty and new national flags, economic control remained in foreign hands through cash-crop monocultures, foreign debt, and trade terms.',
      'It claimed that all African nations must adopt American capitalism.',
      'It stated that colonialism was completely harmless after 1960.',
    ],
    correctIndex: 1,
    explanation: 'Nkrumah defined neo-colonialism as "the last stage of imperialism" — political independence becomes an illusion when the state remains structurally dependent on world commodity markets and foreign corporate capital.',
    hints: [
      'Does changing the flag change the global commodity prices of cocoa or copper?',
      'Political freedom without economic diversification leaves the state captive to external markets.',
      'Neo-colonialism denotes political sovereignty masking persistent economic exploitation.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_HIST_049,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why was the resolution of the Cuban Missile Crisis a mutual diplomatic compromise rather than a unilateral American victory?',
    options: [
      'Castro was given the state of Florida in exchange for Havana.',
      'Kennedy secretly agreed to withdraw US Jupiter nuclear missiles from Turkey and pledged not to invade Cuba, in exchange for Khrushchev removing Soviet missiles.',
      'Khrushchev remained in complete command of US naval fleets.',
      'The United Nations took over sovereign control of both Washington and Moscow.',
    ],
    correctIndex: 1,
    explanation: 'While the public narrative highlighted Khrushchev’s retreat, declassified records proved Kennedy gave a secret quid pro quo: removing NATO Jupiter missiles from Turkey and guaranteeing Cuban non-invasion.',
    hints: [
      'What secret trade did Robert Kennedy make with Soviet Ambassador Anatoly Dobrynin?',
      'Missiles in Cuba were traded for missiles stationed in Turkey.',
      'The secret removal of Jupiter missiles from Turkey made it a mutual concession.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_HIST_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What was the core significance of Gennadi Gerasimov’s "Sinatra Doctrine" announced under Mikhail Gorbachev in 1989?',
    options: [
      'All Soviet citizens had to listen to American jazz music.',
      'The USSR officially repudiated the Brezhnev Doctrine, declaring that Warsaw Pact satellite states could decide their own internal political systems ("do it their way") without Soviet military intervention.',
      'The Soviet Union declared immediate war against East Germany.',
      'The Warsaw Pact was merged into NATO under Soviet command.',
    ],
    correctIndex: 1,
    explanation: 'Named after Frank Sinatra’s song "My Way," the Sinatra Doctrine signaled that the Red Army would not roll into Warsaw, Berlin, or Prague. This green light permitted the peaceful revolutions of 1989.',
    hints: [
      'Frank Sinatra sang "I did it My Way".',
      'It replaced the Brezhnev Doctrine of military intervention.',
      'It promised that the Soviet Union would not use military force to crush Eastern European self-determination.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_HIST_048,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Sort the chronological escalation that cemented the division of Germany (1947-1949):',
    sortItems: [
      'US and UK merge occupation zones into Bizonia (Jan 1947)',
      'Deutsche Mark introduced in Western zones (20 June 1948)',
      'Stalin imposes Berlin Blockade; Western Airlift begins (24-26 June 1948)',
      'NATO signed (4 April 1949); Federal Republic of Germany (FRG) established (23 May 1949)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'From Bizonia to the Deutsche Mark, to the Blockade/Airlift, to NATO and the establishment of West Germany (FRG) and East Germany (GDR) in 1949.',
    hints: [
      'Bizonia in 1947 came before the 1948 currency reform.',
      'The Blockade was the reaction to the Deutsche Mark.',
      'NATO and the creation of the FRG/GDR completed the division in 1949.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C12_HIST_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'recall',
    question: 'On 26 December 1991, the USSR formally dissolved into how many independent sovereign republics?',
    correctAnswer: 15,
    tolerance: 0,
    unit: 'republics',
    explanation: 'The dissolution of the Soviet Union produced 15 independent successor states: Russia, Ukraine, Belarus, 3 Baltic states (Estonia, Latvia, Lithuania), 3 Caucasus states, and 5 Central Asian states.',
    hints: [
      'Think of Russia plus 14 other former Soviet Republics.',
      'Between 14 and 16.',
      'Type 15 for fifteen independent republics.',
    ],
  },
];

// ─── PROPS INTERFACE ──────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ────────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_HIST_041,
  title: 'Decolonisation in Africa & Cold War Superpower Rivalry (1945-1991)',
  definition: 'The twin transformations of the post-WWII world: the collapse of European colonial empires in Africa/Asia under mass nationalist mobilisation, and the bipolar geopolitical struggle between the United States and the Soviet Union spanning proxy wars, nuclear brinkmanship, and ideological bloc formation.',
  eli5: 'Think of the post-1945 world as two giant rival schools (USA and USSR) building fortresses and alliances while older bullies (colonial empires) were forced to hand their keys back to the original homeowners. In places like Ghana, the keys were handed over after strikes; in Kenya, settlers fought bitterly before leaving.',
  misconceptions: [
    { misconception: 'Nkrumah was overthrown purely because he was an authoritarian dictator.', correction: 'The 1966 coup was triggered primarily by the collapse of world cocoa prices, massive foreign debt from prestige projects (Akosombo Dam), and army resentment over pay and favor for the presidential guard.' },
    { misconception: 'Ghana was always a one-party dictatorship from day one.', correction: 'Nkrumah was democratically elected in 1951, 1954, and 1956; the one-party state was declared only in 1964 as economic and political crises worsened.' },
    { misconception: 'Jomo Kenyatta personally directed the violent Mau Mau forest guerrilla war.', correction: 'Kenyatta was imprisoned from 1952 to 1961 throughout the State of Emergency on perjured charges; Mau Mau was led in the forests by field marshals like Dedan Kimathi.' },
    { misconception: 'The Yalta and Potsdam conferences were identical summits.', correction: 'Yalta (Feb 1945) preserved wartime compromise; Potsdam (Jul-Aug 1945) saw Truman and Attlee take power, exposing deep rifts over German reparations and Polish borders amid atomic diplomacy.' },
    { misconception: 'The Marshall Plan and the Molotov Plan were both multilateral economic recovery unions.', correction: 'The Marshall Plan was multilateral via the OEEC; the Molotov Plan was a series of bilateral pairwise trade deals designed to maximize Soviet leverage over each satellite.' },
    { misconception: 'The Berlin Blockade of 1948 is the same event as the Berlin Wall of 1961.', correction: 'The Blockade (1948-49) was Stalin cutting land transport, overcome by the Airlift; the Berlin Wall (1961) was a physical concrete barrier built 12 years later by East Germany to stop emigration.' },
    { misconception: 'The Cuban Missile Crisis was a unilateral American victory where the USSR surrendered.', correction: 'Kennedy made a vital secret deal: quietly withdrawing NATO Jupiter nuclear missiles from Turkey and promising never to invade Cuba.' },
  ],
  diagnosticQuestions: [
    { question: 'When did Ghana achieve independence as the first sub-Saharan colony?', options: ['1947', '1957', '1963', '1971'], correctIndex: 1 },
    { question: 'What crop accounted for 60% of Ghana’s export revenue at independence?', options: ['Rubber', 'Cocoa', 'Tea', 'Cotton'], correctIndex: 1 },
    { question: 'Why did Kenya’s independence involve armed conflict unlike Ghana?', options: ['Kenya had 60,000 white settlers on the White Highlands', 'Ghana had no British soldiers', 'Kenyatta declared war on the USA', 'Kenya had no political parties'], correctIndex: 0 },
    { question: 'Which US policy pledged aid to Greece and Turkey against communist subversion in 1947?', options: ['Monroe Doctrine', 'Truman Doctrine', 'Sinatra Doctrine', 'Eisenhower Doctrine'], correctIndex: 1 },
    { question: 'What was the secret US concession that resolved the Cuban Missile Crisis in 1962?', options: ['Ceding Florida to Cuba', 'Removing Jupiter missiles from Turkey', 'Leaving NATO immediately', 'Paying $1 billion to Moscow'], correctIndex: 1 },
    { question: 'What principle did Article 5 of the North Atlantic Treaty (NATO) establish in 1949?', options: ['Nuclear disarmament', 'Collective security (an attack on one is an attack on all)', 'Free trade in agricultural goods', 'Bilateral economic isolation'], correctIndex: 1 },
    { question: 'What trade union in Poland led the mass civil resistance against communism in 1980?', options: ['Bolsheviks', 'Solidarity (Solidarność)', 'Mensheviks', 'Charter 77'], correctIndex: 1 },
    { question: 'In what year did the Berlin Wall fall, signaling the end of the Cold War division?', options: ['1975', '1989', '1991', '1995'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student can analyze African decolonisation models (Ghana vs Kenya), Cold War bloc formation (Marshall/Molotov, NATO/Warsaw), nuclear brinkmanship (1962), and the collapse of the Soviet Union (1989-1991).',
};

// ─── INTERACTIVE EXPLORATION STEPS ────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Decolonisation Dynamics — Settler vs Non-Settler Models',
    instruction: 'Toggle between Ghana (Non-Settler) and Kenya (Settler) and manipulate the Land Dispossession slider to see how settler demographics forced armed conflict.',
    interactionType: 'toggle-compare',
    nodeId: NODE_C12_HIST_043,
  },
  {
    title: 'Lab 2: Ghana’s Monoculture Trap & Kwame Nkrumah’s Crisis',
    instruction: 'Adjust the World Cocoa Price slider and Infrastructure Debt level to observe the economic tipping point that led to the 1966 military coup.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HIST_041,
  },
  {
    title: 'Lab 3: Eastern Europe "Salami Tactics" & The Czechoslovak Coup (1948)',
    instruction: 'Click each stage of Rákosi’s "Salami Tactics" to systematically slice away democratic institutions until one-party communist control is locked.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_HIST_047,
  },
  {
    title: 'Lab 4: The Berlin Blockade & 1948-49 Air Corridor Logistics',
    instruction: 'Operate the Berlin Airlift logistics simulator: adjust daily supply tonnage across the 3 air corridors to prevent West Berlin from falling to Soviet siege.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HIST_048,
  },
  {
    title: 'Lab 5: Cuban Missile Crisis (1962) — The Brinkmanship Dilemma',
    instruction: 'Manipulate the Superpower Defcon Tension slider and activate the Secret Turkey Deal toggle to discover how nuclear annihilation was averted.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HIST_049,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If World Cocoa Prices drop below $200/ton while Ghana’s foreign loan servicing for the Akosombo Dam remains high, what happens to domestic stability?',
    options: [
      'The economy booms because cocoa is cheaper to eat at home.',
      'Foreign exchange reserves deplete, inflation surges, and public/military unrest triggers government overthrow.',
      'The British colonial government returns and cancels all national debts.',
      'Nkrumah voluntarily steps down and restores British rule.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Cocoa Price slider to lowest in Lab 2 to observe the reserve collapse and debt default warning!',
  },
  {
    question: 'Predict: If daily supply tonnage to West Berlin during the 1948 blockade drops below 2,500 tons/day, what is the imminent consequence for the civilian population?',
    options: [
      'West Berlin becomes completely self-sufficient in food and power within weeks.',
      'Critical starvation and fuel collapse threaten city capitulation to Soviet land forces.',
      'The Western Allies immediately agree to surrender all Western zones in Germany.',
      'The Soviet Union voluntarily lifts the blockade without any conditions.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Move the Daily Airlift Tonnage slider below 2500 tons/day in Lab 4 to observe the critical starvation status!',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe in Lab 1 when Settler Land Dispossession increases above 50% in Kenya?',
    observableOptions: [
      'Nationalist struggle shifts from peaceful petitions to armed guerrilla warfare (Mau Mau).',
      'The colonial government gives free land to all Kikuyu farmers.',
      'White settlers leave the country immediately.',
      'The economy becomes entirely socialist without conflict.',
    ],
    correctIndex: 0,
  },
  {
    question: 'What do you observe in Lab 5 when Brinkmanship tension reaches DEFCON 1 without activating the Secret Turkey Deal?',
    observableOptions: [
      'Diplomatic peace treaty is automatically signed in Geneva.',
      'Catastrophic escalation occurs with Submarine B-59 triggering potential thermonuclear war.',
      'Both superpowers dismantle all nuclear weapons immediately.',
      'Cuba declares neutrality and ends its alliance with the USSR.',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD ACTIVITY ──────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Diplomatic Archive Analysis: Decolonisation vs Superpower Proxy Conflicts',
  description: 'Evaluate a real historical decolonisation dilemma from an Indian foreign policy perspective in the 1960s Non-Aligned Movement (NAM).',
  steps: [
    'Analyze Jawaharlal Nehru, Kwame Nkrumah, and Gamal Abdel Nasser’s founding charter for the Non-Aligned Movement at the 1961 Belgrade Conference.',
    'Examine how newly independent nations tried to avoid becoming puppet satellite regimes of either NATO or the Warsaw Pact.',
    'Identify why economic sovereignty (breaking mono-crop export dependency) remains a challenge for modern Global South nations today.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ────────────────────────────────────────────────
export function C12_HistoryGhana19571966BackgroundSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant Patterns State
  const [predictionMade, setPredictionMade] = useState(false);
  const [selectedColonyModel, setSelectedColonyModel] = useState<'ghana' | 'kenya'>('ghana');
  const [landDispossession, setLandDispossession] = useState(10);
  const [cocoaPrice, setCocoaPrice] = useState(450); // £/ton
  const [infrastructureDebt, setInfrastructureDebt] = useState(60); // % of GDP
  const [salamiStep, setSalamiStep] = useState(0);
  const [airliftDailyTonnage, setAirliftDailyTonnage] = useState(4500); // tons/day
  const [defconTension, setDefconTension] = useState(50); // 0 to 100
  const [secretTurkeyDealActive, setSecretTurkeyDealActive] = useState(false);
  const [primarySourceTab, setPrimarySourceTab] = useState<'nkrumah' | 'kennan' | 'helsinki'>('nkrumah');

  // Adaptive & SRS / BKT State
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
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Visual effects
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistence refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ──────────────────────────────────���───────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ──────────────────────────────────────────────────────
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

  // ─── GSAP ANIMATION EFFECT FOR TIMELINE ──���──────────────────────────────────
  useEffect(() => {
    if (gsapTimelineRef.current) {
      gsap.fromTo(
        gsapTimelineRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── CANVAS ANIMATION (Logistics Radar & Escalation Pulse) ───────────────────
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Radar Grid Line
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Scanning blip (Cold War Radar simulation)
      const scanX = (frame * 2.5) % canvas.width;
      ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.beginPath();
      ctx.arc(scanX, canvas.height / 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing indicator
      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 15, pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`GEOPOLITICAL RADAR ACTIVE | 1945-1991 RECORD`, 15, 18);

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ──────────────────────────────────────────────────────
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
    speechManager.speak('Let us explore the interactive historical simulation labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free sandbox mode. Test all historical variables freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the analytical challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis logged. Now test the simulation variables to verify!');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery achieved across African Decolonisation and Cold War History.');
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
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
          speechManager.speak('Let us review the archival explanation step by step.');
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

  const handleCocoaChange = useCallback((val: number) => {
    setCocoaPrice(val);
    audioManager.play('count');
  }, []);

  const handleDebtChange = useCallback((val: number) => {
    setInfrastructureDebt(val);
    audioManager.play('count');
  }, []);

  const handleAirliftChange = useCallback((val: number) => {
    setAirliftDailyTonnage(val);
    audioManager.play('balance');
  }, []);

  const handleDefconChange = useCallback((val: number) => {
    setDefconTension(val);
    audioManager.play('count');
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Derived Ghana Economic Stability Status
  const ghanaSolvencyIndex = useMemo(() => {
    const revenue = (cocoaPrice / 500) * 100;
    const debtBurden = infrastructureDebt * 1.2;
    return Math.max(0, Math.min(100, Math.round(revenue - debtBurden + 50)));
  }, [cocoaPrice, infrastructureDebt]);

  // Derived Berlin Airlift Survival Status
  const berlinStatus = useMemo(() => {
    if (airliftDailyTonnage >= 4500) return { label: 'SUSTAINABLE (City Supplied)', color: '#22c55e', icon: '✓', pct: 100 };
    if (airliftDailyTonnage >= 2500) return { label: 'CRITICAL RATIONING (Shortages)', color: '#f59e0b', icon: '⚠️', pct: 60 };
    return { label: 'STARVATION RISK (City Capitulation)', color: '#ef4444', icon: '✗', pct: 25 };
  }, [airliftDailyTonnage]);

  // Motivational feedback determination
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) {
      return {
        badge: 'PERFECT SCORE!',
        text: 'Flawless historical reasoning with 0 errors across all syllabus challenges! Outstanding archival insight.',
        icon: '✓ 🌟',
        colorClass: 'text-emerald-300 border-emerald-500 bg-emerald-950/40',
      };
    }
    if (errors >= 1 && errors <= 3) {
      return {
        badge: 'Great work!',
        text: 'Strong grasp of complex Cold War escalation points and African decolonisation models.',
        icon: '✓ 👍',
        colorClass: 'text-emerald-300 border-emerald-500 bg-emerald-950/40',
      };
    }
    if (errors >= 4 && errors <= 7) {
      return {
        badge: 'Good effort!',
        text: 'Solid attempt at navigating the complexities of international post-war diplomacy. A quick review will cement your mastery.',
        icon: '✓ 📚',
        colorClass: 'text-amber-300 border-amber-500 bg-amber-950/40',
      };
    }
    return {
      badge: 'Do not give up — You WILL get this!',
      text: 'History is full of interconnected causes. Review the misconception notes below and try again to build your fluency!',
      icon: '✗ 💡',
      colorClass: 'text-rose-300 border-rose-500 bg-rose-950/40',
    };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ───────────────────────��──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/60 border border-amber-600/40 rounded-2xl" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight">{title}</h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 12 History • Decolonisation & Cold War Master Simulation</p>
          </div>
        </div>

        {/* Phase Badges & Difficulty Level */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                : 'bg-amber-950/70 border-amber-500 text-amber-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            Phase: {phase.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ─── DISCOVERY PHASE ─────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-700/50 rounded-2xl">
            <h2 className="text-lg font-black text-amber-300 flex items-center gap-2">
              <span aria-hidden="true">🌍</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              📌 <span className="text-amber-400 font-semibold">Archival Context:</span> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-500">Ungraded Exploration Hook</span>
            </div>
            <p className="text-base font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                      : discoveryAnswered
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-amber-500/50'
                  }`}
                >
                  <span className="font-bold text-amber-400 mr-2">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>{' '}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-600/40">
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ 🎯 Brilliant historical intuition!' : '✗ 💡 ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter interactive historical labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-900/30"
                >
                  Enter Interactive Historical Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION PHASE (5 INTERACTIVE LABS) ──────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between bg-slate-900/80 p-3 px-4 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 tracking-wider">
              LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
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
              className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6"
            >
              <div className="p-4 bg-amber-950/30 border border-amber-600/30 rounded-2xl">
                <p className="text-sm text-amber-200 font-medium leading-relaxed">
                  👉 <span className="font-bold text-amber-400">Interactive Objective:</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* LAB 1: Decolonisation Settler Model Simulation */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <motion.button
                      aria-label="Select Ghana Non-Settler Peasant Model"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedColonyModel('ghana');
                        setLandDispossession(5);
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                        selectedColonyModel === 'ghana'
                          ? 'bg-amber-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-900/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      🇬🇭 Ghana (Non-Settler Peasant Model)
                    </motion.button>
                    <motion.button
                      aria-label="Select Kenya Settler Model with 60,000 White Settlers"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedColonyModel('kenya');
                        setLandDispossession(75);
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                        selectedColonyModel === 'kenya'
                          ? 'bg-amber-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-900/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      🇰🇪 Kenya (60,000 Settlers & White Highlands)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="land-slider" className="text-xs text-slate-400 flex justify-between">
                          <span>Settler Land Dispossession Level:</span>
                          <span className="font-bold text-amber-400">{landDispossession}%</span>
                        </label>
                        <input
                          id="land-slider"
                          aria-label="Settler Land Dispossession Level Percentage"
                          type="range"
                          min={0}
                          max={100}
                          value={landDispossession}
                          onChange={e => setLandDispossession(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <p className="text-slate-300">
                          <strong className="text-white">Colonial Land Ordinance:</strong>{' '}
                          {selectedColonyModel === 'kenya' ? '1902 Crown Lands Ordinance (White Highlands reserved for Europeans)' : 'Native peasant cocoa farms intact under traditional chiefs'}
                        </p>
                        <p className="text-slate-300">
                          <strong className="text-white">Nationalist Strategy:</strong>{' '}
                          {landDispossession > 50
                            ? 'Armed Insurgency: Kenya Land and Freedom Army (Mau Mau) under Dedan Kimathi'
                            : 'Constitutional Mobilisation: CPP "Positive Action" strikes under Nkrumah'}
                        </p>
                        <p className="text-slate-300">
                          <strong className="text-white">British State Response:</strong>{' '}
                          {landDispossession > 50
                            ? '1952 State of Emergency, Kapenguria show trial of Kenyatta, detention of 1M+ Kikuyu'
                            : 'Negotiated constitutional elections (1951, 1954, 1956) and peaceful independence (1957)'}
                        </p>
                      </div>
                    </div>

                    {/* SVG Visualization for Settler vs Peasant Land Map */}
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 300 180" className="w-full max-w-xs" aria-label="Settler vs Peasant Land Allocation Diagram">
                        <rect x="20" y="20" width="260" height="140" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                        <rect
                          x="50"
                          y="40"
                          width="200"
                          height="100"
                          rx="8"
                          fill={selectedColonyModel === 'kenya' ? '#ef4444' : '#22c55e'}
                          fillOpacity={landDispossession / 100 + 0.15}
                          className="transition-all duration-300"
                        />
                        <text x="150" y="80" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {selectedColonyModel === 'kenya' ? 'White Highlands (Settler Owned)' : 'African Smallholder Cocoa Land'}
                        </text>
                        <text x="150" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          {selectedColonyModel === 'kenya' ? `${landDispossession}% Alienated to 60k Settlers` : '0% Settler Expropriation'}
                        </text>
                        <circle cx="240" cy="130" r="14" fill={landDispossession > 50 ? '#ef4444' : '#22c55e'} />
                        <text x="240" y="133" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                          {landDispossession > 50 ? 'WAR' : 'PEACE'}
                        </text>
                      </svg>
                      <p className="text-[11px] text-slate-400 mt-2 text-center">
                        {landDispossession > 50 ? '✗ ⚠️ High Settler Density blocked peaceful handover → Mau Mau War' : '✓ Non-settler structure enabled negotiated transfer to Nkrumah'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: Ghana Cocoa Monoculture & Debt Crash */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-amber-600/40 space-y-3">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict-Then-Check Investigation</p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cocoa-slider" className="text-xs text-slate-400 flex justify-between">
                          <span>World Cocoa Market Price:</span>
                          <span className="font-bold text-amber-400">£{cocoaPrice} / ton</span>
                        </label>
                        <input
                          id="cocoa-slider"
                          aria-label="World Cocoa Market Price per ton"
                          type="range"
                          min={100}
                          max={600}
                          value={cocoaPrice}
                          onChange={e => handleCocoaChange(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label htmlFor="debt-slider" className="text-xs text-slate-400 flex justify-between">
                          <span>Prestige Project Debt (Akosombo Dam, Tema Motorway):</span>
                          <span className="font-bold text-rose-400">{infrastructureDebt}% of GDP</span>
                        </label>
                        <input
                          id="debt-slider"
                          aria-label="Prestige Project Debt percentage of GDP"
                          type="range"
                          min={100}
                          max={100}
                          value={infrastructureDebt}
                          onChange={e => handleDebtChange(Number(e.target.value))}
                          className="w-full mt-2 accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                        <p className="text-slate-300">
                          <strong>National Solvency Index:</strong>{' '}
                          <span className={`font-bold ${ghanaSolvencyIndex > 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {ghanaSolvencyIndex > 50 ? '✓' : '✗'} {ghanaSolvencyIndex}% — {ghanaSolvencyIndex > 50 ? 'Solvent State' : 'Coup Vulnerability Zone'}
                          </span>
                        </p>
                        <p className="text-slate-400">
                          {cocoaPrice < 250
                            ? '✗ ⚠️ Cocoa revenue collapsed by 60%! Foreign reserves exhausted. Military strikes brewing.'
                            : '✓ Stable revenue allowing state-funded industrialisation.'}
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Gauges for Ghana Economy */}
                    <div className="flex flex-col justify-center space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Foreign Exchange Reserve (60% Cocoa Dependent)</span>
                          <span className="font-bold text-amber-300">{Math.round((cocoaPrice / 600) * 100)}%</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            animate={{ width: `${(cocoaPrice / 600) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Military & Public Unrest Pressure</span>
                          <span className="font-bold text-rose-400">{100 - ghanaSolvencyIndex}%</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-rose-500 rounded-full"
                            animate={{ width: `${100 - ghanaSolvencyIndex}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                        {ghanaSolvencyIndex < 35
                          ? '✗ 🚨 24 Feb 1966: General Kotoka & Col. Afrifa stage military coup while Nkrumah is in Hanoi.'
                          : '✓ Nkrumah government maintains civil control and proceeds with Pan-African initiatives.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: Salami Tactics in Eastern Europe */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {[
                      { step: 0, label: '1. Coalition Entry', desc: 'Join government lawfully (free 1946 vote)' },
                      { step: 1, label: '2. Interior Ministry', desc: 'Capture Police & State Security apparatus' },
                      { step: 2, label: '3. Slice Rivals', desc: 'Arrest & frame democratic leaders (Masaryk, Mikołajczyk)' },
                      { step: 3, label: '4. Total Dictatorship', desc: 'One-party communist satellite locked (Feb 1948)' },
                    ].map(item => (
                      <motion.button
                        key={item.step}
                        aria-label={`Salami tactic stage ${item.step + 1}: ${item.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSalamiStep(item.step);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          salamiStep === item.step
                            ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <p className="text-xs font-bold text-white">{item.label}</p>
                        <p className="text-[10px] text-slate-300 mt-1">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-3 max-w-md text-xs">
                      <p className="text-amber-400 font-bold uppercase tracking-wide">
                        Stage {salamiStep + 1} Mechanism (Mátyás Rákosi Formula):
                      </p>
                      <p className="text-slate-300 leading-relaxed">
                        {salamiStep === 0 && 'The Red Army liberation allows communists to join legitimate anti-fascist coalitions across Poland, Romania, Hungary, and Czechoslovakia.'}
                        {salamiStep === 1 && 'Crucial Step: By capturing the Ministry of the Interior, communists control the national police, security intelligence, and legal warrants.'}
                        {salamiStep === 2 && 'Security forces fabricate charges of treason/western espionage against democratic figures like Stanisław Mikołajczyk (Poland) and Jan Masaryk (Prague).'}
                        {salamiStep === 3 && 'The Czechoslovak Coup of 25 Feb 1948 completes the Iron Curtain. Klement Gottwald establishes one-party rule as Edvard Beneš capitulates.'}
                      </p>
                    </div>

                    {/* Salami Slice Graphic */}
                    <svg viewBox="0 0 240 120" className="w-56" aria-label="Salami tactics slice graphic">
                      <rect x="20" y="20" width="200" height="80" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                      <rect x="30" y="30" width="40" height="60" rx="4" fill={salamiStep >= 0 ? '#ef4444' : '#334155'} />
                      <rect x="75" y="30" width="40" height="60" rx="4" fill={salamiStep >= 1 ? '#ef4444' : '#334155'} />
                      <rect x="120" y="30" width="40" height="60" rx="4" fill={salamiStep >= 2 ? '#ef4444' : '#334155'} />
                      <rect x="165" y="30" width="45" height="60" rx="4" fill={salamiStep >= 3 ? '#ef4444' : '#334155'} />
                      <text x="120" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        {salamiStep === 3 ? 'DEMOCRACY DESTROYED (1948)' : `Stage ${salamiStep + 1} / 4 Sliced`}
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* LAB 4: Berlin Airlift Logistics Simulator */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="airlift-slider" className="text-xs text-slate-400 flex justify-between">
                          <span>Daily Airlift Tonnage (Tempelhof, Gatow, Tegel):</span>
                          <span className="font-bold text-amber-400">{airliftDailyTonnage} tons / day</span>
                        </label>
                        <input
                          id="airlift-slider"
                          aria-label="Daily Airlift Tonnage delivered to West Berlin"
                          type="range"
                          min={1000}
                          max={6000}
                          step={250}
                          value={airliftDailyTonnage}
                          onChange={e => handleAirliftChange(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                        <p className="text-slate-300">
                          <strong>West Berlin Population:</strong> 2.5 Million Civilians
                        </p>
                        <p className="text-slate-300">
                          <strong>Minimum Daily Requirement:</strong> 4,500 Tons (Coal, Flour, Medicine)
                        </p>
                        <p className="text-slate-300">
                          <strong>Status:</strong>{' '}
                          <span style={{ color: berlinStatus.color }} className="font-bold">
                            {berlinStatus.icon} {berlinStatus.label}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* SVG Air Corridors Map */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 300 160" className="w-full max-w-xs" aria-label="Berlin Air Corridors Map">
                        <rect x="20" y="10" width="260" height="140" rx="8" fill="#450a0a" stroke="#7f1d1d" />
                        <text x="150" y="30" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">
                          Soviet Occupation Zone (110 Miles Surrounding Berlin)
                        </text>
                        <circle cx="210" cy="80" r="22" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                        <text x="210" y="83" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                          West Berlin
                        </text>
                        <line x1="50" y1="50" x2="190" y2="75" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="50" y1="80" x2="190" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="50" y1="110" x2="190" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                        <text x="70" y="45" fill="#fde68a" fontSize="7">Hamburg Corridor</text>
                        <text x="70" y="75" fill="#fde68a" fontSize="7">Hanover Corridor</text>
                        <text x="70" y="115" fill="#fde68a" fontSize="7">Frankfurt Corridor</text>
                      </svg>
                      <p className="text-[10px] text-slate-400 mt-2">
                        Operation Vittles / Plane Fare: 278k flights, 2.3M tons delivered. Plane landed every 90 seconds.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: Cuban Missile Crisis Brinkmanship */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="defcon-slider" className="text-xs text-slate-400 flex justify-between">
                          <span>Superpower Brinkmanship Tension:</span>
                          <span className="font-bold text-rose-400">DEFCON {Math.round(5 - (defconTension / 100) * 4)} ({defconTension}%)</span>
                        </label>
                        <input
                          id="defcon-slider"
                          aria-label="Superpower Brinkmanship Tension slider"
                          type="range"
                          min={0}
                          max={100}
                          value={defconTension}
                          onChange={e => handleDefconChange(Number(e.target.value))}
                          className="w-full mt-2 accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-300 font-semibold">Secret Turkey Jupiter Missiles Deal:</span>
                        <motion.button
                          aria-label="Toggle secret Turkey Jupiter missiles deal"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSecretTurkeyDealActive(prev => !prev);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            secretTurkeyDealActive ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {secretTurkeyDealActive ? '✓ ACTIVE (Mutual Concession)' : '✗ INACTIVE'}
                        </motion.button>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="text-slate-300">
                          <strong>Outcome:</strong>{' '}
                          {defconTension > 80 && !secretTurkeyDealActive
                            ? '✗ 💥 THERMONUCLEAR WAR: Submarine B-59 launches nuclear torpedo.'
                            : secretTurkeyDealActive
                            ? '✓ 🕊️ DÉTENTE INITIATED: Missiles removed from Cuba & Turkey; Hotline & PTBT established.'
                            : '⚠️ Severe Standoff: Naval Quarantine in effect.'}
                        </p>
                      </div>
                    </div>

                    {/* Crisis Arc Card */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between text-xs">
                      <p className="text-amber-400 font-bold uppercase tracking-wider">Historical Declassification Key:</p>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        1. <strong>Bay of Pigs (1961)</strong> + <strong>Jupiter missiles in Turkey</strong> provoked Khrushchev’s deployment in Cuba.<br />
                        2. <strong>Black Saturday (27 Oct 1962):</strong> Major Anderson killed; Vasili Arkhipov vetoes nuclear torpedo on sub B-59.<br />
                        3. Resolution was <strong>NOT a unilateral Soviet surrender</strong>, but a negotiated mutual removal of missiles.
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                        Resulted in June 1963 Moscow-Washington Hotline & August 1963 Partial Test Ban Treaty (PTBT).
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Bar */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Previous laboratory experiment"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-400 font-medium">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next laboratory experiment"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-900/20"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to free sandbox mode"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-900/30"
                  >
                    Proceed to Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── FREE SANDBOX PHASE ──────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h2 className="text-lg font-black text-amber-300">Geopolitical Historical Sandbox</h2>
                <p className="text-xs text-slate-400">Freely manipulate the historical macroeconomic and Cold War sliders without test grading pressure.</p>
              </div>
              <motion.button
                aria-label="Proceed to assessment challenges"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-900/30 self-start sm:self-auto"
              >
                Ready for Assessment Challenges! →
              </motion.button>
            </div>

            {/* Primary Source Document Reader Tab */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex gap-2 border-b border-slate-800 pb-2">
                {[
                  { id: 'nkrumah', title: 'Nkrumah on Neo-Colonialism (1965)' },
                  { id: 'kennan', title: 'Kennan Long Telegram (1946)' },
                  { id: 'helsinki', title: 'Helsinki Final Act Basket III (1975)' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    aria-label={`Open primary source: ${tab.title}`}
                    onClick={() => {
                      setPrimarySourceTab(tab.id as any);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      primarySourceTab === tab.id ? 'bg-amber-600 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl text-xs text-slate-300 font-mono leading-relaxed">
                {primarySourceTab === 'nkrumah' && (
                  <p>
                    <span className="text-amber-400 font-bold font-sans">Kwame Nkrumah, Neo-Colonialism (1965):</span> "The essence of neo-colonialism is that the State which is subject to it is, in theory, independent and has all the outward trappings of international sovereignty. In reality its economic system and thus its political policy is directed from outside."
                  </p>
                )}
                {primarySourceTab === 'kennan' && (
                  <p>
                    <span className="text-amber-400 font-bold font-sans">George F. Kennan, Long Telegram (1946):</span> "Soviet power is impervious to logic of reason, and it is highly sensitive to logic of force. For this reason it can easily withdraw when strong resistance is encountered at any point."
                  </p>
                )}
                {primarySourceTab === 'helsinki' && (
                  <p>
                    <span className="text-amber-400 font-bold font-sans">Helsinki Final Act (1975):</span> "The participating States will respect human rights and fundamental freedoms, including the freedom of thought, conscience, religion or belief, for all without distinction."
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="sandbox-cocoa" className="text-xs font-bold text-amber-400 block">Ghana Cocoa Market</label>
                <input
                  id="sandbox-cocoa"
                  aria-label="Sandbox Ghana Cocoa Market Price"
                  type="range"
                  min={100}
                  max={600}
                  value={cocoaPrice}
                  onChange={e => handleCocoaChange(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <p className="text-[11px] text-slate-400">Price: £{cocoaPrice}/ton</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="sandbox-airlift" className="text-xs font-bold text-gold-400 block">Berlin Airlift Delivery</label>
                <input
                  id="sandbox-airlift"
                  aria-label="Sandbox Berlin Airlift Daily Supply Tonnage"
                  type="range"
                  min={1000}
                  max={6000}
                  step={250}
                  value={airliftDailyTonnage}
                  onChange={e => handleAirliftChange(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
                <p className="text-[11px] text-slate-400">Supply: {airliftDailyTonnage} tons/day</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="sandbox-defcon" className="text-xs font-bold text-rose-400 block">Cold War Nuclear Tension</label>
                <input
                  id="sandbox-defcon"
                  aria-label="Sandbox Cold War Nuclear Tension"
                  type="range"
                  min={0}
                  max={100}
                  value={defconTension}
                  onChange={e => handleDefconChange(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <p className="text-[11px] text-slate-400">Tension: {defconTension}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ──────────────��──────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Radar canvas strip */}
          <canvas ref={canvasRef} width={600} height={28} className="w-full rounded-xl bg-slate-900 border border-slate-800" aria-label="Cold War Geopolitical Radar Screen" />

          {/* Progress Bar & Difficulty Tag */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-amber-400 font-bold uppercase">Competency: {challenge.competencyLevel}</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Box */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-slate-800 border border-slate-700 text-amber-300">
                {challenge.type.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400">Node Ref: {challenge.nodeId}</span>
            </div>

            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-amber-500/50'
                    }`}
                  >
                    <span className="font-bold text-amber-400 mr-2">
                      {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>{' '}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable feature: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-amber-700 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(challenge.correctMapping || {}).map(slotId => (
                    <div
                      key={slotId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{slotId.replace('_', ' ')}</span>
                      <p className="text-xs font-semibold text-white mt-2">
                        {droppedLabels[slotId] ? `✓ ${droppedLabels[slotId]}` : 'Drop matching historic feature here...'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Confirm chronological sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                >
                  Confirm Chronological Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label={`Enter numeric answer in ${challenge.unit}`}
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Type number..."
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-sm w-44"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Check Figure →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-amber-100 rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <div key={i} className="px-3 py-1 bg-amber-600 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-2">
                      <span>{part}</span>
                      <button
                        aria-label={`Remove component ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-slate-950 hover:text-white font-black"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click pieces above to assemble sequence...</span>}
                </div>

                <motion.button
                  aria-label="Verify constructed causal sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' -> '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Construction →
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Archival Historical Analysis:</p>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-100 leading-relaxed">
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Reveal next step of historical explanation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize master assessment' : 'Advance to next challenge'}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="block mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-900/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 border border-amber-600/50 rounded-3xl text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl font-black text-amber-300">Class 12 History Master Certificate Earned</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              You have successfully completed the comprehensive analysis of African Decolonisation (Ghana & Kenya) and Cold War Superpower Rivalries (1945–1991).
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Final Mastery Score</p>
                <p className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">BKT Status</p>
                <p className="text-2xl font-black text-emerald-400 uppercase">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className={`p-5 rounded-2xl border ${motivationalFeedback.colorClass}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black">{motivationalFeedback.icon}</span>
              <p className="text-sm font-black uppercase tracking-wider">{motivationalFeedback.badge}</p>
            </div>
            <p className="text-xs mt-1.5 opacity-90 leading-relaxed">{motivationalFeedback.text}</p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Historical Synthesis & Personal Reflection
            </h3>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding by reflecting on these core questions:
            </p>

            <div className="space-y-4 pt-1">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-surprising" className="text-xs font-bold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflect-surprising"
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., The secret deal on US Jupiter missiles in Turkey during the Cuban Missile Crisis..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-explain" className="text-xs font-bold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="reflect-explain"
                  aria-label="Reflection: How would you explain this to a friend?"
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., Ghana could decolonise smoothly because it had no white settlers, whereas in Kenya..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label htmlFor="reflect-reallife" className="text-xs font-bold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="reflect-reallife"
                  aria-label="Reflection: Where in real life might you use this?"
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Understanding modern global trade dependencies, commodity inflation traps, or diplomatic deterrence..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/50 rounded-2xl space-y-3">
              <p className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Remediation Profile:</p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 mt-1">✓ Historical Reality: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition SRS Card */}
          <div className="p-5 bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-500/40 rounded-2xl text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">📅</span>
                <p className="font-bold text-gold-300 text-sm uppercase tracking-wider">Spaced Repetition Review Schedule (SM-2)</p>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Based on your performance ({errors} error{errors === 1 ? '' : 's'}), your optimal memory retention review is scheduled:
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-gold-900/60 border border-gold-400/50 rounded-xl">
                <span className="text-xs text-gold-200">Next Review:</span>
                <span className="text-sm font-black text-amber-300">
                  {errors === 0 ? 'Review in 7 Days (Optimal Retention)' : errors <= 3 ? 'Review in 3 Days (Reinforcement Needed)' : 'Review in 1 Day (Immediate Review Recommended)'}
                </span>
              </div>
            </div>
            <div className="text-right sm:self-center">
              <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[11px] font-mono text-slate-400">
                SRS Algorithm: SM-2 Active
              </span>
            </div>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <p key={idx} className="text-xs text-slate-400">
                  <strong className="text-amber-400">{idx + 1}.</strong> {step}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Assessment Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HistoryGhana19571966BackgroundSim;