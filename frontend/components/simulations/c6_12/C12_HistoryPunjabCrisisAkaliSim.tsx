'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE CONSTANTS ───
const NODE_C12_HIST_021 = 'c12_hist_021';
const NODE_C12_HIST_022 = 'c12_hist_022';
const NODE_C12_HIST_023 = 'c12_hist_023';
const NODE_C12_HIST_024 = 'c12_hist_024';
const NODE_C12_HIST_025 = 'c12_hist_025';
const NODE_C12_HIST_026 = 'c12_hist_026';
const NODE_C12_HIST_027 = 'c12_hist_027';
const NODE_C12_HIST_028 = 'c12_hist_028';
const NODE_C12_HIST_029 = 'c12_hist_029';
const NODE_C12_HIST_030 = 'c12_hist_030';

const ALL_NODE_IDS = [
  NODE_C12_HIST_021,
  NODE_C12_HIST_022,
  NODE_C12_HIST_023,
  NODE_C12_HIST_024,
  NODE_C12_HIST_025,
  NODE_C12_HIST_026,
  NODE_C12_HIST_027,
  NODE_C12_HIST_028,
  NODE_C12_HIST_029,
  NODE_C12_HIST_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Post-Independence Crises & Foreign Policy Masterclass (1947–1986)',
  intro: 'You are the Chief Historian and Strategic Policy Analyst examining post-colonial India’s greatest internal and external stress tests. From the turbulent Punjab crisis and North-East insurgencies to the wars of 1947, 1962, 1965, and 1971, and the watershed "Towards Equality" Report of 1974.',
  context: 'Deconstruct regional assertions, diplomatic tightropes, military escalations, and gender audits through primary document evidence and interactive geopolitical causal models.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In October 1973, the Akali Dal passed the famous Anandpur Sahib Resolution. What was its primary political constitutional demand?',
  options: [
    'An independent sovereign nation called Khalistan separate from India',
    'Greater state autonomy restricting the Centre strictly to defence, external affairs, communications & currency',
    'Immediate military merger with Jammu & Kashmir to secure river waters',
    'Abolition of all federal states in favour of a unitary presidential system',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Moderate regional movements initially sought federal restructuring within the Union, not outright secession!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_HIST_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When was Operation Bluestar launched by the Indian Army against fortified militants inside the Golden Temple?',
    options: ['3–6 June 1984', '15 August 1982', '31 October 1984', '26 January 1985'],
    correctIndex: 0,
    explanation: 'Operation Bluestar was executed between 3–6 June 1984 under the command of Lt. Gen. K.S. Sundarji and Maj. Gen. K.S. Brar. It resulted in heavy casualties and severe damage to the Akal Takht.',
    hints: [
      'It occurred during the martyrdom anniversary of Guru Arjan Dev in early summer.',
      'It preceded Indira Gandhi’s assassination in October of that same year.',
      'The exact dates are 3 to 6 June 1984.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_HIST_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the immediate trigger for the six-year Assam Agitation led by AASU in 1979?',
    options: [
      'The sudden revision of electoral rolls in the 1978 Mangaldoi by-election showing over 70,000 extra names',
      'The complete shutdown of tea garden operations across upper Assam',
      'The annexation of Sylhet district by the central government',
      'A boundary dispute between Assam and Meghalaya over Shillong',
    ],
    correctIndex: 0,
    explanation: 'The 1978 Mangaldoi Lok Sabha by-election revision revealed over 70,000 undocumented/foreign voter additions, sparking intense fears of demographic and political disenfranchisement among local Assamese.',
    hints: [
      'Think of a parliamentary by-election in 1978.',
      'It involved a massive jump of voter registrations on the electoral rolls.',
      'The constituency was Mangaldoi.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_HIST_023,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each North-Eastern accord/event to its corresponding landmark year.',
    dragItems: [
      { label: '16-Point Agreement (Nagaland)', targetId: 'box_1960' },
      { label: 'Shillong Accord (NNC)', targetId: 'box_1975' },
      { label: 'Mizoram Peace Accord', targetId: 'box_1986' },
      { label: 'Assam Accord (AASU)', targetId: 'box_1985' },
    ],
    correctMapping: {
      box_1960: '16-Point Agreement (Nagaland)',
      box_1975: 'Shillong Accord (NNC)',
      box_1985: 'Assam Accord (AASU)',
      box_1986: 'Mizoram Peace Accord',
    },
    explanation: 'The 16-Point Agreement (1960) led to Nagaland statehood (1963); Shillong Accord was 1975; Assam Accord was 15 Aug 1985; Mizoram Peace Accord was 30 June 1986.',
    hints: [
      'Nagaland’s 16-Point deal happened early in 1960.',
      'Shillong Accord took place during the Emergency in 1975.',
      'Assam was signed in 1985, followed by Mizoram in 1986 under Rajiv Gandhi.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_HIST_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What ecological disaster sparked the formation of the Mizo National Famine Front under Laldenga in 1959?',
    options: [
      'The Mautam famine triggered by bamboo flowering and rat population explosions',
      'A catastrophic Brahmaputra flood wiping out lush riverbanks',
      'A devastating earthquake destroying Shillong and Aizawl simultaneously',
      'A cyclonic tidal surge travelling inland from the Bay of Bengal',
    ],
    correctIndex: 0,
    explanation: 'The cyclical 48-year Mautam phenomenon caused bamboo seeds to multiply rats, destroying paddy fields. The Assam government’s delayed relief radicalised the Famine Front into the insurgent MNF.',
    hints: [
      'It involves a cyclical bamboo flowering event.',
      'Rats devoured the standing crops leading to famine.',
      'This famine is called the Mautam famine of 1959-60.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_HIST_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On what precise date did Maharaja Hari Singh legally sign the Instrument of Accession to India?',
    options: ['26 October 1947', '15 August 1947', '22 October 1947', '1 January 1949'],
    correctIndex: 0,
    explanation: 'Hari Singh signed the Instrument of Accession on 26 October 1947 following the Pashtun tribal invasion (launched 22 October). Indian troops were airlifted on 27 October only AFTER legal accession.',
    hints: [
      'The tribal invasion started on 22 October 1947.',
      'The Maharaja signed the accession document four days later.',
      'Troops were airlifted on 27 October, so accession happened on 26 October 1947.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_HIST_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was Pakistan’s covert military plan in August 1965 to infiltrate 30,000 armed guerrillas into Kashmir called?',
    options: ['Operation Gibraltar', 'Operation Grand Slam', 'Operation Searchlight', 'Operation Riddle'],
    correctIndex: 0,
    explanation: 'Operation Gibraltar was launched on 5 August 1965 under Maj. Gen. Akhtar Hussain Malik. It failed because local Kashmiris did not revolt and instead reported infiltrators to Indian security forces.',
    hints: [
      'Named after the famous rock/strait.',
      'It preceded Operation Grand Slam (the conventional armour thrust to Akhnur).',
      'The codename is Operation Gibraltar.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_HIST_027,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the milestones of the 1971 Bangladesh Liberation War in chronological sequence.',
    sortItems: [
      'Awami League sweeps 167 of 169 East Pakistan seats (Dec 1970)',
      'Pakistan Army launches genocidal Operation Searchlight (25 March 1971)',
      'Indo-Soviet Treaty of Peace & Friendship signed (August 1971)',
      'Pakistan pre-emptive air strikes & 13-day war begins (3 Dec 1971)',
      'Lt. Gen. A.A.K. Niazi signs surrender of 93,000 POWs in Dhaka (16 Dec 1971)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The timeline moves from democratic election denial in Dec 1970 → Operation Searchlight in March 1971 → Indo-Soviet Treaty in August → Pakistani airstrikes on 3 Dec → Dhaka surrender on 16 Dec 1971.',
    hints: [
      'Start with the democratic election in December 1970.',
      'Operation Searchlight unleashed mass atrocities in March 1971.',
      'The formal war started 3 December and concluded with surrender on 16 December 1971.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_HIST_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did Article IV of the 1954 Panchsheel Agreement fundamentally alter India’s diplomatic stance on Tibet?',
    options: [
      'It formally recognised the "Tibet Region of China", conceding full Chinese sovereignty rather than British-era suzerainty',
      'It declared Tibet a permanent neutral buffer state under United Nations peacekeeping supervision',
      'It granted India joint sovereign policing rights along the Tsangpo-Brahmaputra corridor',
      'It recognised Tibet as an independent member of the Non-Aligned Movement',
    ],
    correctIndex: 0,
    explanation: 'By recognising the "Tibet Region of China" in 1954, Nehru conceded de jure sovereignty to Beijing, relinquishing historical British extraterritorial rights in exchange for the Five Principles.',
    hints: [
      'Consider the difference between suzerainty (loose overlordship) and sovereignty (full legal power).',
      'Look for the phrase "Tibet Region of China".',
      'India gave up extraterritorial rights in the hope of securing goodwill on the border.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_HIST_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'According to the Towards Equality Report (1974), what did India’s female sex ratio decline to in the 1971 Census (females per 1000 males)?',
    correctAnswer: 930,
    tolerance: 0,
    unit: 'females per 1000 males',
    explanation: 'The sex ratio dropped from 946 in 1951 to 930 in 1971. This empirical proof of worsening survival was a central pillar of the "declining status thesis" of the CSWI.',
    hints: [
      'In 1951 it was 946.',
      'It dropped by 16 points over two decades.',
      'The exact census figure is 930.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_09_b',
    nodeId: NODE_C12_HIST_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the core strategic mistake of India’s "Forward Policy" initiated in late 1961 along the Himalayan frontier?',
    options: [
      'Establishing indefensible forward military outposts behind Chinese lines without backing them with logistics, artillery, or war readiness',
      'Launching an unprovoked heavy bombing raid on Lhasa that triggered Soviet retaliation',
      'Ceding Ladakh unilaterally to Pakistan in exchange for maritime access in Kutch',
      'Ordering the total withdrawal of all Indian mountain divisions from the McMahon Line',
    ],
    correctIndex: 0,
    explanation: 'The Forward Policy set up dozens of isolated, poorly supplied posts under the false assumption that China would not attack. China viewed these posts as encroachment and launched an overwhelming offensive on 20 Oct 1962.',
    hints: [
      'Think about posturing without military capability or logistical support.',
      'Henderson Brooks-Bhagat report severely criticized this disconnect.',
      'Outposts were placed without adequate supply lines or defensive depth.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_HIST_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the three-tier framework of the Assam Accord (15 Aug 1985), how were migrants who entered Assam between 1 Jan 1966 and 24 March 1971 treated?',
    options: [
      'They were granted regular citizenship but disenfranchised (stripped of voting rights) for a period of 10 years',
      'They were immediately rounded up and deported to Bangladesh across riverine borders',
      'They received automatic unconditional voting rights with full land titles',
      'They were permanently resettled in the Andaman & Nicobar Islands',
    ],
    correctIndex: 0,
    explanation: 'The three tiers were: pre-1966 (fully regularised), 1966–25 March 1971 (disenfranchised for 10 years, then restored), and post-25 March 1971 (to be detected and deported).',
    hints: [
      'Pre-1966 were regularised; post-25 March 1971 were to be deported.',
      'The middle tier had a temporary 10-year voting penalty.',
      'They were disenfranchised for 10 years before regaining full franchise.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_HIST_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does political scientist Paul Brass explain the rise of Jarnail Singh Bhindranwale prior to the Punjab crisis?',
    options: [
      'As a classic case of "ethnic outbidding" where Congress leaders patronised a radical preacher to split Akali votes, which spiralled out of control',
      'As a purely foreign-funded military invasion organised by NATO command',
      'As a grassroots economic strike by wheat farmers against Green Revolution mechanisation',
      'As a constitutional committee established by the Supreme Court to negotiate Chandigarh',
    ],
    correctIndex: 0,
    explanation: 'Paul Brass highlights ethnic outbidding: Congress factions initially promoted Bhindranwale to divide moderate Akali Dal support. Once armed and entrenched, he radicalised the agenda beyond anyone’s control.',
    hints: [
      'Focus on electoral maneuvering and competitive radicalisation.',
      'Congress sought to undercut the moderate Akali Dal vote base.',
      'This process is known in political science as ethnic outbidding.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_HIST_026,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the strategic causal chain explaining India’s victory/stalemate in the 1965 war.',
    availableParts: [
      'Op Gibraltar Infiltration',
      '→',
      'Op Grand Slam (Akhnur)',
      '→',
      'India Opens Punjab Front (Lahore)',
      '→',
      'Battle of Asal Uttar (Patton Graveyard)',
      '→',
      'Tashkent Declaration (Status Quo)',
    ],
    targetState: 'Op Gibraltar Infiltration → Op Grand Slam (Akhnur) → India Opens Punjab Front (Lahore) → Battle of Asal Uttar (Patton Graveyard) → Tashkent Declaration (Status Quo)',
    validationHint: 'Connect infiltration → Akhnur attack → Punjab counter-offensive → tank battle → Tashkent peace.',
    explanation: 'Pakistan’s Gibraltar led to Grand Slam; Shastri responded decisively on 6 Sept 1965 by threatening Lahore, causing the tank clash at Asal Uttar and leading to the Tashkent Declaration on 10 Jan 1966.',
    hints: [
      'Gibraltar came first in August.',
      'Shastri escalated by crossing the Punjab border on 6 September.',
      'The chain concludes with the Tashkent Declaration.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_HIST_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the 1971 Bangladesh Liberation War considered the ultimate empirical refutation of the "Two-Nation Theory"?',
    options: [
      'It proved that shared religious faith could not overcome deep linguistic, cultural, and political-economic subjugation between two distant wings',
      'It proved that princely states could successfully maintain sovereign neutrality under British common law',
      'It demonstrated that naval carrier strike groups could completely replace land-based armies in Asia',
      'It proved that the United Nations could enforce bilateral plebiscites without regional consent',
    ],
    correctIndex: 0,
    explanation: 'The Two-Nation Theory claimed religion alone defined nationhood. The secession of Bengali Muslims from West Pakistan proved that language, ethnic dignity, and economic equity superseded religious solidarity.',
    hints: [
      'Think about what held Pakistan together versus what divided East and West.',
      'Bengali identity and democratic rights proved stronger than religious bonding.',
      'It proved religion alone cannot sustain a nation without cultural and political justice.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_HIST_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the primary structural limitation of the Shimla Agreement signed on 2 July 1972 between Indira Gandhi and Z.A. Bhutto.',
    options: [
      'While it locked in bilateralism and renamed the CFL to the Line of Control, it failed to convert the LoC into an explicit, legally binding international border in writing',
      'It forced India to surrender all territory in Punjab and Bengal permanently',
      'It required the immediate dissolution of Bangladesh and re-annexation by Pakistan',
      'It placed Kashmir under permanent joint military administration of the Soviet Union and US',
    ],
    correctIndex: 0,
    explanation: 'The Shimla Agreement codified bilateral dispute resolution and created the LoC, but Bhutto’s alleged verbal promise to accept the LoC as a permanent border was never formalized in the text, leaving the core dispute open.',
    hints: [
      'Focus on the Line of Control and the absence of a final written border treaty.',
      'Bilateralism succeeded procedurally, but Kashmir’s status remained unresolved.',
      'The verbal understanding was never made an explicit written boundary treaty.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_HIST_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Comparing the Henderson Brooks-Bhagat Report (1963) with post-war strategic assessments, what was the primary political-military failure identified in 1962?',
    options: [
      'A dangerous gap between aggressive political posturing (Forward Policy) and genuine military logistical capability and high-altitude war preparedness',
      'The refusal of the Indian Air Force to execute humanitarian medical evacuations in Assam',
      'A secret military alliance signed between India and Taiwan that provoked Mao Zedong',
      'Over-reliance on French nuclear guarantees that were withdrawn during the Cuban Missile Crisis',
    ],
    correctIndex: 0,
    explanation: 'The Henderson Brooks-Bhagat Report concluded that civilian leadership (Nehru & Krishna Menon) mandated forward deployment without providing mountain gear, ammunition lines, or defensive depth, inviting a catastrophic offensive.',
    hints: [
      'Look for the disconnect between civilian political directives and army logistics.',
      'Deterrence without capability acts as a provocation.',
      'The Forward Policy outposts lacked logistics, reinforcements, and defensive readiness.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_HIST_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the Mizoram Peace Accord (1986) succeed in establishing lasting peace, whereas the Shillong Accord (1975) fractured the Naga movement?',
    options: [
      'Laldenga retained unified command over the entire MNF and was integrated directly as Chief Minister, whereas the Shillong Accord split the NNC, leading Muivah and Isak Swu to form the insurgent NSCN',
      'Mizoram was granted nuclear independence while Nagaland was placed under direct British Commonwealth trusteeship',
      'The MNF surrendered all its leaders to international courts while NNC cadres were absorbed into the Assam Police',
      'The Mizo accord banned all elections while Nagaland held immediate multi-party polls',
    ],
    correctIndex: 0,
    explanation: 'Mizoram’s accord succeeded because Laldenga had undisputed authority and was accommodated as Chief Minister. In Nagaland, the NNC splintered because Muivah and Isak Swu felt betrayed by the Shillong surrender and formed the NSCN in 1980.',
    hints: [
      'Compare organizational unity of command and political integration of the rebel leadership.',
      'The NNC split produced the NSCN in 1980.',
      'Laldenga held unified command and became Chief Minister of statehood Mizoram.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_HIST_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did Vina Mazumdar’s concept of the "Myth of Progress" summarise the diagnostic revelation of the 1974 "Towards Equality" Report?',
    options: [
      'It showed that formal constitutional guarantees (Articles 14-16) and planned modernization had masked an actual demographic and economic regression in women’s lived realities',
      'It argued that ancient Vedic society was completely egalitarian and modern technology caused all dowry deaths',
      'It demonstrated that literacy among urban women had exceeded male literacy across all northern states',
      'It proved that the Five-Year Plans had allocated 80% of industrial budgets exclusively to women-headed households',
    ],
    correctIndex: 0,
    explanation: 'The report shattered complacency by proving that legal equality on paper did not prevent plummeting work participation (31% in 1911 to 11.9% in 1971), adverse sex ratios (930 in 1971), and the commercialisation of dowry.',
    hints: [
      'Think about the illusion that laws on paper automatically improve real life.',
      'The report proved women were economically and demographically losing ground.',
      'It challenged the official narrative that post-1947 legislation had solved gender inequality.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_HIST_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why did the UN Security Council’s sequential precondition structure in the UNCIP resolutions prevent the holding of a plebiscite in Jammu & Kashmir?',
    options: [
      'Resolution of 13 Aug 1948 mandated Pakistan to first withdraw all troops and tribals from PoK before Indian reduction and a plebiscite; Pakistan’s refusal to withdraw froze the process',
      'The UN resolution required Maharaja Hari Singh to remain the absolute monarch of unified Pakistan',
      'The resolution required the International Court of Justice to hold a referendum in London instead of Srinagar',
      'India and Pakistan both mutually dissolved their armed forces in 1950 under UN supervision',
    ],
    correctIndex: 0,
    explanation: 'The UNCIP framework had three strict sequential stages: (1) Ceasefire, (2) Complete withdrawal of Pakistani troops/tribals, (3) Indian phased force reduction and plebiscite. Pakistan’s non-compliance with Stage 2 legally stalled Stage 3.',
    hints: [
      'Examine the sequential precondition: who had to withdraw first?',
      'Pakistan had to vacate Azad Kashmir / Gilgit-Baltistan first.',
      'Because Pakistan never withdrew its forces, the condition for holding the plebiscite was never met.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_HIST_029,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the 1962 border sector components to their geographic locations on the Himalayan map.',
    dragItems: [
      { label: 'Aksai Chin (Xinjiang-Tibet Road)', targetId: 'box_west' },
      { label: 'McMahon Line / Tawang Sector', targetId: 'box_east' },
      { label: 'Henderson Brooks Inquiry Focus', targetId: 'box_policy' },
      { label: 'Dharamshala Exile Center', targetId: 'box_tibet' },
    ],
    correctMapping: {
      box_west: 'Aksai Chin (Xinjiang-Tibet Road)',
      box_east: 'McMahon Line / Tawang Sector',
      box_policy: 'Henderson Brooks Inquiry Focus',
      box_tibet: 'Dharamshala Exile Center',
    },
    explanation: 'Western sector = Aksai Chin plateau; Eastern sector = McMahon Line in NEFA (Arunachal); Dharamshala = Dalai Lama government in exile; Henderson Brooks = internal army failure audit.',
    hints: [
      'Aksai Chin is in the western sector (Ladakh).',
      'McMahon Line defines the eastern frontier (NEFA/Arunachal).',
      'Dharamshala is in Himachal Pradesh where the Dalai Lama took refuge.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_HIST_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'According to the Towards Equality Report, what percentage had female work participation fallen to by 1971 (from 31% in 1911)? (Enter rounded to 1 decimal place)',
    correctAnswer: 11.9,
    tolerance: 0.2,
    unit: '%',
    explanation: 'Female work participation plummeted from ~31% in 1911 down to 11.9% in 1971, proving that industrialisation and Green Revolution mechanisation displaced women into unpaid or marginalised domestic roles.',
    hints: [
      'It dropped below 15%.',
      'It was between 11% and 12%.',
      'The exact census statistic cited in the report is 11.9%.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_HIST_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What crucial lesson does the Punjab Crisis of 1981–1984 offer regarding the management of federal centre-state disputes in India?',
    options: [
      'Legitimate regional autonomy demands must be accommodated early through institutional dialogue; stalling and weaponizing communal factions radicalises politics into violent insurgency',
      'The central government should dissolve all state police forces in favour of central paramilitaries during regional agitations',
      'All river waters must be centrally privatised to avoid state claims',
      'Regional political parties should be banned from contesting state legislative elections',
    ],
    correctIndex: 0,
    explanation: 'The trajectory from the 1973 Anandpur Sahib Resolution to Operation Bluestar demonstrates that ignoring moderate federal grievances and engaging in ethnic outbidding creates explosive vacuums that militant extremists exploit.',
    hints: [
      'Think about how early federal accommodation prevents extremist outbidding.',
      'Dialogue through the Inter-State Council preserves democratic stability.',
      'Ignoring legitimate federal demands empowers radical violent actors.',
    ],
    misconceptionIndex: 0,
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Anandpur Sahib to Operation Bluestar (c12_hist_021)',
    instruction: 'Adjust the Centre-State Tension Slider to see how moderate federal demands escalated into armed fortification.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HIST_021,
  },
  {
    title: 'North-East Accords Interactive Matrix (c12_hist_022–024)',
    instruction: 'Click each regional movement to inspect its trigger, leadership, accords, and lasting constitutional outcomes.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_HIST_022,
  },
  {
    title: 'Indo-Pak Wars & Strategic Doctrines (c12_hist_025–027)',
    instruction: 'Toggle between 1947, 1965, and 1971 to analyse military turning points, the Two-Nation Theory collapse, and the LoC.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HIST_027,
  },
  {
    title: 'Sino-Indian Border & Forward Policy Failure (c12_hist_028–029)',
    instruction: 'Simulate India’s 1961 Forward Policy deployment and observe why China launched the simultaneous 1962 offensive.',
    interactionType: 'drag-position',
    nodeId: NODE_C12_HIST_029,
  },
  {
    title: 'Towards Equality Audit 1974 (c12_hist_030)',
    instruction: 'Manipulate the demographic indicators to discover the "Myth of Progress" documented by Guha & Mazumdar.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HIST_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'PREDICT: If the Centre stalls on moderate federal demands like Chandigarh and river waters, what will happen to the regional leadership?',
    options: [
      'Moderates strengthen and peacefully dissolve their demands',
      'Radical militants outbid moderates, seizing moral and armed control of the agitation',
      'The entire population migrates to neighbouring states',
      'The state legislature voluntarily dissolves itself forever',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the "Centre-State Tension" slider above 75% to observe how Bhindranwale outbid the Akali moderates.',
    nodeId: NODE_C12_HIST_021,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice happens to the legitimacy of moderate political dialogue as tension hits maximum?',
    observableOptions: [
      'Moderate constitutional dialogue collapses completely as armed extremism takes over',
      'Moderates easily win full sovereignty through the Supreme Court',
      'The central government immediately grants all demands without debate',
      'No change occurs whatsoever',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HIST_021,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Strategic White Paper & Federal Audit',
  description: 'Select one major post-independence conflict (Punjab, Assam, Mizoram, or 1962 Sino-Indian War). Draft an executive summary detailing: (1) The structural root grievance, (2) The miscalculation of the Centre/Military, (3) The constitutional or accord mechanism that brought resolution, and (4) The enduring modern legacy in 2026.',
  steps: [
    'Choose your case study from the 10 syllabus nodes.',
    'Identify the specific primary source evidence (e.g. Anandpur Sahib Resolution, Assam Accord, Henderson Brooks Report, Towards Equality Report).',
    'Evaluate the causal links between policy posturing and ground outcomes.',
    'Present your policy audit to your teacher or peer review circle.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_HIST_021,
  title: 'Class 12 History: Punjab Crisis, Regional Movements & Strategic Wars (1947–1986)',
  definition: 'An integrated historical analysis of Centre-State regional conflicts, the 1947, 1965, 1971 Indo-Pak wars, the 1962 Sino-Indian war, North-Eastern accords, and the foundational 1974 Towards Equality Report.',
  eli5: 'Explore how post-colonial India handled border wars with Pakistan and China, resolved regional tensions in Punjab and the North-East through accords, and audited gender equality through hard data.',
  misconceptions: [
    { misconception: 'The Anandpur Sahib Resolution originally demanded an independent Khalistan.', correction: 'It demanded federal autonomy within the Indian Union (restricting the Centre to defence, foreign affairs, communications, currency).' },
    { misconception: 'The Assam Agitation was simply against all Bengali speakers.', correction: 'The movement demanded detection and deportation of post-25 March 1971 illegal immigrants, regularising pre-1966 settlers.' },
    { misconception: 'Operation Bluestar was a minor counter-terror raid without political roots.', correction: 'It was the tragic climax of prolonged Centre-State deadlock, ethnic outbidding, and heavy militarised fortification of the Akal Takht.' },
    { misconception: 'The 1971 War was fought primarily over Jammu & Kashmir.', correction: 'It was fought over the liberation of East Pakistan following the Pakistani military genocide (Operation Searchlight) and 10 million refugees.' },
    { misconception: 'Towards Equality Report celebrated post-independence gains for Indian women.', correction: 'It shocked the nation by documenting an empirical DECLINE in female sex ratio, infant survival, and work participation.' },
  ],
  diagnosticQuestions: [
    { question: 'What did the 1973 Anandpur Sahib Resolution specifically demand regarding the Centre’s powers?', options: ['Total elimination of the Centre', 'Restricting Centre to defence, external affairs, communications & currency', 'Full unitary control over Punjab agriculture', 'Immediate secession as Khalistan'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery across all 10 post-independence history nodes: Punjab crisis, Assam, Nagaland, Mizoram, 1947/1965/1971 wars, 1962 Sino-Indian conflict, and the Towards Equality Report.',
};

// ─── MAIN SIMULATION COMPONENT ───
export function C12_HistoryPunjabCrisisAkaliSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_HIST_021,
  title = DEFAULT_PROPS.title || 'Punjab Crisis, Regional Agitations & Strategic Wars',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '📜', color: 'amber' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');

  // Inquiry States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Exploration Interactive States
  const [punjabTension, setPunjabTension] = useState(30);
  const [selectedNEAccords, setSelectedNEAccords] = useState<'assam' | 'nagaland' | 'mizoram'>('assam');
  const [selectedWarYear, setSelectedWarYear] = useState<'1947' | '1965' | '1971'>('1971');
  const [forwardPolicyIntensity, setForwardPolicyIntensity] = useState(25);
  const [bhindranwaleMilitancy, setBhindranwaleMilitancy] = useState(20);
  const [akaliAutonomyScore, setAkaliAutonomyScore] = useState(60);
  const [borderSecurityStatus, setBorderSecurityStatus] = useState('Low to Moderate Posturing');
  const [selectedMapSector, setSelectedMapSector] = useState<'western' | 'eastern' | 'central'>('western');

  // Reflection Responses
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explainFriend: '',
    realLifeUse: '',
  });

  // Challenge states
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop / Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATES ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const m = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(m);
    const newDiff = (m === 'not-started' || m === 'beginner') ? 'foundation' : m === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION EFFECT ───
  useEffect(() => {
    if (gsapTimelineRef.current && phase === 'explore') {
      gsap.fromTo(
        gsapTimelineRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.6, ease: 'back.out(1.4)' }
      );
    }
  }, [currentSlide, phase]);

  // ─── 2D CANVAS RADAR / MAP ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle tactical radar grid
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(canvas.height, x);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw animated pulsing hotspot
      const pulse = Math.sin(frame * 0.05) * 6;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 14 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`GEO-STRATEGIC SECTOR: ${selectedMapSector.toUpperCase()} | STATUS: ACTIVE`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedMapSector]);

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
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
    speechManager.speak('Welcome to the interactive post-independence crisis analysis laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free historical sandbox mode. Test multiple geopolitical levers freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase initiated. Apply your historical reasoning.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in. Test your hypothesis on the simulation slider!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Insightful historical observation!' : 'Examine the causal link again.');
  }, []);

  // Real-time slider updates instantly driving visual state
  const handlePunjabTensionChange = useCallback((val: number) => {
    setPunjabTension(val);
    setBhindranwaleMilitancy(Math.min(100, Math.round(val * 1.2)));
    setAkaliAutonomyScore(Math.max(10, 100 - val));
    if (val > 70 && predictionMade && !predictionVerified) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleForwardPolicyChange = useCallback((val: number) => {
    setForwardPolicyIntensity(val);
    if (val > 65) {
      setBorderSecurityStatus('High Alert: Inevitable Confrontation');
    } else {
      setBorderSecurityStatus('Low to Moderate Posturing');
    }
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have mastered ISC Class 12 Post-Independence Crisis History.');
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

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    if (!challenge) return;
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct analysis! Outstanding historical deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the historical causal sequence together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

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
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">{title}</h1>
            <p className="text-xs text-amber-400/90 font-medium">ISC Class 12 Humanities • Comprehensive Crisis Simulation</p>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Phase: <strong className="text-amber-400 capitalize">{phase}</strong>
          </span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : difficulty === 'standard'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 shadow-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-700/50">
              Scenario Prologue
            </span>
            <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              📌 <strong>Historical Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-amber-400">❓ Curiosity Hook:</span> {DISCOVERY_QUESTION.question}
            </h3>
            <p className="text-xs text-slate-400 mb-4">Make your initial historical deduction (ungraded inquiry hook):</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>{' '}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! The resolution sought autonomy within the Union.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Launch Interactive Historical Lab"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 text-sm whitespace-nowrap"
                >
                  Launch Interactive Historical Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Interactive Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-800'}`} />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300/90 mt-1 flex items-center gap-1.5 font-medium">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── SLIDE 0: PUNJAB CRISIS SIMULATOR ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
                      <p className="text-sm font-bold text-amber-300 mb-2">🎯 Predict Before Interacting:</p>
                      <p className="text-xs text-slate-300 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Prediction Option: ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600/40 text-xs text-amber-300 animate-pulse">
                      ⚡ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Interactive Punjab Real-Time Slider & Visualizer */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400">Centre-State Escalation Tension Dial:</span>
                      <span className="font-mono text-amber-400 font-bold">{punjabTension}% Tension</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={punjabTension}
                      aria-label="Centre-State tension slider for Punjab crisis"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPunjabTension(val);
                        handlePunjabTensionChange(val);
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />

                    {/* SVG Tactical Map updated instantly as slider drags */}
                    <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-3">
                      <svg viewBox="0 0 500 220" className="w-full h-44" role="img" aria-label="Interactive tactical map of Golden Temple complex">
                        <rect x="120" y="30" width="260" height="150" rx="12" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" opacity="0.7" />
                        <text x="250" y="110" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">Amrit Sarovar (Holy Pool)</text>

                        <rect x="220" y="80" width="60" height="50" rx="4" fill="#eab308" stroke="#fef08a" strokeWidth="2" />
                        <text x="250" y="108" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">Harmandir Sahib</text>

                        <rect x="135" y="80" width="45" height="50" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                        <text x="157" y="108" textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="bold">Akal Takht</text>

                        {punjabTension > 40 && (
                          <g>
                            <rect x="130" y="65" width="55" height="10" rx="2" fill="#78350f" stroke="#b45309" />
                            <text x="157" y="73" textAnchor="middle" fill="#fef3c7" fontSize="6">Sandbag Fortifications</text>
                          </g>
                        )}
                        {punjabTension > 70 && (
                          <g>
                            <rect x="100" y="15" width="300" height="180" rx="16" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
                            <text x="250" y="205" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
                              ⚠️ Operation Bluestar Encirclement Perimeter (3–6 June 1984)
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Moderate Autonomy Viability:</span>
                          <span className="font-bold text-emerald-400">✓ {akaliAutonomyScore}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <motion.div className="bg-emerald-500 h-full rounded-full" animate={{ width: `${akaliAutonomyScore}%` }} />
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Armed Extremism Index:</span>
                          <span className="font-bold text-rose-400">✗ {bhindranwaleMilitancy}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <motion.div className="bg-rose-500 h-full rounded-full" animate={{ width: `${bhindranwaleMilitancy}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {punjabTension > 60 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-gold-500/30">
                      <p className="text-xs font-bold text-gold-400 mb-2">👁️ What do you observe from the causal dynamic?</p>
                      <p className="text-xs text-slate-300 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Observation answer: ${opt}`}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── SLIDE 1: NORTH-EAST ACCORDS ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['assam', 'nagaland', 'mizoram'] as const).map((reg) => (
                      <motion.button
                        key={reg}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Inspect ${reg} Movement and Accord`}
                        onClick={() => setSelectedNEAccords(reg)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          selectedNEAccords === reg
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {reg} Movement & Accord
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    {selectedNEAccords === 'assam' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <h4 className="font-bold text-amber-400">Assam Agitation (1979–1985)</h4>
                          <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">Assam Accord: 15 Aug 1985</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          <strong>Immediate Trigger:</strong> 1978 Mangaldoi by-election surge (+70,000 names). AASU & AGSP led strikes, oil blockades, and boycotted the 1983 election (Nellie massacre).
                        </p>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                          <strong>3-Tier Accord Framework:</strong>
                          <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-400">
                            <li>Pre-1 Jan 1966: Fully regularised as Indian citizens.</li>
                            <li>1 Jan 1966 – 24 March 1971: Disenfranchised for 10 years, then restored.</li>
                            <li>Post-25 March 1971: Detected and deported. Led to AGP victory & P.K. Mahanta as CM.</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {selectedNEAccords === 'nagaland' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <h4 className="font-bold text-amber-400">Nagaland Movement & Accords</h4>
                          <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">16-Pt Agreement (1960) / Shillong (1975)</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          <strong>The Divergence:</strong> A.Z. Phizo’s NNC declared independence on 14 Aug 1947. Moderate Naga People’s Convention negotiated the 16-Point Agreement (1960), creating Nagaland state (1 Dec 1963, Art 371A).
                        </p>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                          <strong>Why Shillong Accord Failed:</strong> Signed 11 Nov 1975 by NNC delegates accepting the Constitution. Rejected by Muivah and Isak Swu, who formed the <strong>NSCN (31 Jan 1980)</strong>.
                        </div>
                      </div>
                    )}

                    {selectedNEAccords === 'mizoram' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <h4 className="font-bold text-amber-400">Mizoram Movement (1959–1986)</h4>
                          <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">Peace Accord: 30 June 1986</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          <strong>Catalyst:</strong> Mautam famine of 1959. Laldenga formed MNF. IAF strafed Aizawl in March 1966.
                        </p>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                          <strong>Why Mizoram Accord Succeeded:</strong> Laldenga retained unified command over all MNF cadres. Over 780 weapons surrendered, and Laldenga became Chief Minister of 23rd state (20 Feb 1987).
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: INDO-PAK WARS ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['1947', '1965', '1971'] as const).map((yr) => (
                      <motion.button
                        key={yr}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Select ${yr} War Study`}
                        onClick={() => setSelectedWarYear(yr)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedWarYear === yr
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {yr} War
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    {selectedWarYear === '1947' && (
                      <div className="space-y-2 text-xs text-slate-300">
                        <h4 className="font-bold text-amber-400">1947–49 First Kashmir War</h4>
                        <p>• <strong>22 Oct 1947:</strong> Pashtun tribal lashkars backed by Pakistan Army invade Kashmir.</p>
                        <p>• <strong>26 Oct 1947:</strong> Hari Singh signs Instrument of Accession; troops airlifted 27 Oct.</p>
                        <p>• <strong>1 Jan 1949:</strong> UN Ceasefire creates Ceasefire Line (CFL).</p>
                      </div>
                    )}

                    {selectedWarYear === '1965' && (
                      <div className="space-y-2 text-xs text-slate-300">
                        <h4 className="font-bold text-amber-400">1965 War: Op Gibraltar to Tashkent</h4>
                        <p>• <strong>5 Aug 1965:</strong> Op Gibraltar infiltrates 30,000 guerrillas; Kashmiris do NOT revolt.</p>
                        <p>• <strong>6 Sept 1965:</strong> Shastri opens Punjab front threatening Lahore; Battle of Asal Uttar destroys Patton tanks.</p>
                        <p>• <strong>10 Jan 1966:</strong> Tashkent Declaration restores status quo ante bellum.</p>
                      </div>
                    )}

                    {selectedWarYear === '1971' && (
                      <div className="space-y-2 text-xs text-slate-300">
                        <h4 className="font-bold text-amber-400">1971 Bangladesh Liberation & Shimla Agreement</h4>
                        <p>• <strong>Root Cause:</strong> Awami League won 167 of 169 seats in Dec 1970; Pakistani military denied power.</p>
                        <p>• <strong>25 March 1971:</strong> Operation Searchlight genocide drives 10 million refugees into India.</p>
                        <p>• <strong>16 Dec 1971:</strong> 93,000 Pakistani soldiers surrender in Dhaka. Shimla Agreement (2 July 1972) renames CFL as Line of Control (LoC).</p>
                      </div>
                    )}

                    <div className="h-20 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                      <canvas ref={canvasRef} width={600} height={80} className="w-full h-full" aria-label="Tactical sector radar animation" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 3: SINO-INDIAN 1962 ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400">1961 Forward Policy Outpost Density:</span>
                      <span className="font-mono text-amber-400 font-bold">{forwardPolicyIntensity}% Outposts</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={forwardPolicyIntensity}
                      aria-label="1961 Forward Policy outpost density slider"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setForwardPolicyIntensity(val);
                        handleForwardPolicyChange(val);
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
                      <span className="text-slate-400">Status Assessment:</span>
                      <span className={`font-bold ${forwardPolicyIntensity > 65 ? 'text-rose-400' : 'text-amber-400'}`}>
                        {forwardPolicyIntensity > 65 ? '✗ ' : '✓ '} {borderSecurityStatus}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 500 180" className="w-full h-40" role="img" aria-label="Himalayan border sectors interactive map">
                      <polygon points="50,40 140,20 160,80 80,100" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
                      <text x="105" y="55" fill="#fecaca" fontSize="9" fontWeight="bold">Western Sector</text>
                      <text x="105" y="70" fill="#cbd5e1" fontSize="7">Aksai Chin (Road 1956-57)</text>

                      <polygon points="340,50 460,30 480,90 360,110" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" opacity="0.6" />
                      <text x="410" y="65" fill="#bbf7d0" fontSize="9" fontWeight="bold">Eastern Sector</text>
                      <text x="410" y="80" fill="#cbd5e1" fontSize="7">NEFA / McMahon Line</text>

                      {forwardPolicyIntensity > 60 && (
                        <g>
                          <path d="M 120 15 L 120 45" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrow)" />
                          <path d="M 420 20 L 420 50" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrow)" />
                          <text x="250" y="150" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                            ⚠️ 20 October 1962: Simultaneous Chinese Multi-Sector Assault
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: TOWARDS EQUALITY REPORT ── */}
              {currentSlide === 4 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-amber-400">CSWI Report: "Towards Equality" (1974)</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Chair: Phulrenu Guha • Member-Secretary: Vina Mazumdar</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Sex Ratio (1951 → 1971):</span>
                        <span className="font-mono font-bold text-rose-400">✗ 946 → 930</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div className="bg-rose-500 h-full rounded-full" animate={{ width: '65%' }} />
                      </div>
                      <p className="text-[11px] text-slate-400">Empirical proof of female survival neglect & missing women.</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Work Participation (1911 → 1971):</span>
                        <span className="font-mono font-bold text-amber-400">✗ 31.0% → 11.9%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div className="bg-amber-500 h-full rounded-full" animate={{ width: '38%' }} />
                      </div>
                      <p className="text-[11px] text-slate-400">Displacement of women by mechanisation & unpaid home labour.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-700/50 text-xs text-amber-200">
                    <strong>Core Analytical Insight:</strong> The report exposed the <em>"Myth of Progress"</em> — constitutional equality on paper (Articles 14–16) had failed to prevent structural regression on the ground.
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              aria-label="Previous lab step"
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-mono">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next lab step"
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-amber-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enter Sandbox Mode"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Historical Scenario Sandbox</h3>
                <p className="text-xs text-slate-400">Freely manipulate variables across internal accords, border disputes, and demographic audits.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Ready for challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/20 text-xs"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">1961 Forward Policy Pressure:</span>
                  <span className="font-mono text-amber-400 font-bold">{forwardPolicyIntensity}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={forwardPolicyIntensity}
                  aria-label="Sandbox forward policy intensity slider"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setForwardPolicyIntensity(val);
                    handleForwardPolicyChange(val);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-[11px] text-slate-500">Notice how outpost posturing without war preparedness triggers multi-sector offensive reactions.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Punjab Escalation Dial:</span>
                  <span className="font-mono text-amber-400 font-bold">{punjabTension}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={punjabTension}
                  aria-label="Sandbox Punjab escalation dial slider"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPunjabTension(val);
                    handlePunjabTensionChange(val);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-[11px] text-slate-500">Simulate how delay in federal autonomy accommodation feeds extremist ethnic outbidding.</p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 uppercase font-mono text-[10px]">Competency:</span>
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  {challenge.competencyLevel}
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">
                      {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>{' '}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag each card onto its corresponding target box below:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow-sm"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      aria-label={`Drop target ${targetKey.replace('box_', '')}`}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex flex-col justify-center transition-all ${
                        droppedLabels[targetKey]
                          ? 'border-emerald-500/80 bg-emerald-950/30 text-emerald-200'
                          : 'border-slate-700 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{targetKey.replace('box_', 'Target: ')}</span>
                      <span className="text-xs font-bold mt-1">
                        {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : '📥 Drop corresponding item here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Verify drag placements"
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20"
                >
                  Verify Drag Placements →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into strict chronological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Chronological item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-200 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Verify chronological order"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20"
                >
                  Verify Chronology Order →
                </motion.button>
              </div>
            )}

            {/* NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label="Enter numeric value answer"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter precise figure..."
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500 w-48"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit numeric answer"
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`Add part ${part}`}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md text-xs font-mono flex items-center gap-1">
                      {part}
                      <button aria-label={`Remove part ${part}`} onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 font-bold ml-1">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above to construct sequence...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Verify constructed sequence"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20"
                >
                  Verify Constructed Sequence →
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/30 rounded-2xl border border-amber-600/40 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">Historical Step-by-Step Breakdown:</h4>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-200/90 leading-relaxed">
                      <strong className="text-amber-400 font-mono mr-1.5">{idx + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Show next detailed step of explanation"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-600/60 hover:bg-amber-600 text-white font-bold rounded-xl text-xs border border-amber-500/50"
                    >
                      Show Next Detail Step →
                    </motion.button>
                  ) : (
                    <span className="text-[11px] text-emerald-400 font-bold">✓ Full Historical Causal Breakdown Revealed</span>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Advance to next challenge"
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Advance to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-3xl border border-amber-600/40 text-center space-y-4 shadow-2xl">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }} className="text-5xl" aria-hidden="true">
              🏆
            </motion.div>
            <h2 className="text-3xl font-black text-white">Mastery Assessment Complete!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully completed the ISC Class 12 Humanities simulation covering the Punjab Crisis, North-East Accords, Strategic Wars (1947–1971), and the Towards Equality Report.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Final Score</span>
                <p className="text-2xl font-black text-emerald-400 font-mono mt-1">{Math.max(0, 100 - errors * 4)}%</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Mastery Rank</span>
                <p className="text-2xl font-black text-amber-400 capitalize font-mono mt-1">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold">
                {errors === 0 && <span className="text-emerald-400">✓ PERFECT SCORE!</span>}
                {errors >= 1 && errors <= 3 && <span className="text-emerald-300">✓ Great work!</span>}
                {errors >= 4 && errors <= 7 && <span className="text-amber-400">⚡ Good effort!</span>}
                {errors >= 8 && <span className="text-rose-400">✗ Do not give up — You WILL get this!</span>}
              </span>
            </div>
            <p>
              {errors === 0 && '🌟 Flawless Mastery! You demonstrated exceptional recall, evaluation, and historiographical analysis across all 10 ISC syllabus nodes.'}
              {errors >= 1 && errors <= 3 && '👏 Excellent historical reasoning! You showed command over complex causal networks and accord frameworks. Review minor date sequences to solidify 100% precision.'}
              {errors >= 4 && errors <= 7 && '🌱 Solid attempt! You grasped core federal and diplomatic ideas. Spend extra time with the multi-sector maps and the 3-tier accord structure.'}
              {errors >= 8 && '💪 Persistence is key in history! Retrace the timelines, explore the causal dials in sandbox mode, and try the simulation again — you can master this!'}
            </p>
          </div>

          {/* ─── VISIBLE SPACED REPETITION (SRS) SCHEDULE CARD ─── */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 rounded-2xl border-2 border-gold-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">📅</span>
                <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">
                  Spaced Repetition Schedule (SM-2 Algorithm)
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                Optimal retention schedule based on your performance ({errors} error{errors === 1 ? '' : 's'}):{' '}
                <strong className="text-amber-300 font-bold">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-gold-600/30 border border-gold-400/50 rounded-xl text-center">
                <span className="text-[10px] text-gold-300 uppercase font-mono block">Recommended Target</span>
                <span className="text-sm font-black text-gold-200 font-mono">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <span>💭</span> Historical Reflection & Critical Synthesis
            </h3>
            <p className="text-xs text-slate-400">Consolidate your learning by answering these key conceptual questions:</p>

            <div className="space-y-4 pt-1">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-surprising" className="block text-xs font-bold text-amber-400">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-surprising"
                  rows={2}
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  aria-label="What was the most surprising thing you learned?"
                  placeholder="e.g. How the Towards Equality Report showed declining sex ratios and work participation, shattering the myth of steady progress..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-explain" className="block text-xs font-bold text-amber-400">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-explain"
                  rows={2}
                  value={reflectionResponses.explainFriend}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, explainFriend: e.target.value }))}
                  aria-label="How would you explain this to a friend?"
                  placeholder="e.g. Post-1947 India dealt with tough regional tensions by either accommodating federal demands through accords or risking escalation when dialogue stalled..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-real-life" className="block text-xs font-bold text-amber-400">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="ref-real-life"
                  rows={2}
                  value={reflectionResponses.realLifeUse}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, realLifeUse: e.target.value }))}
                  aria-label="Where in real life might you use this?"
                  placeholder="e.g. In public policy analysis, international diplomacy, civil service exams, and evaluating contemporary Centre-State river and autonomy disputes..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Historical Misconceptions to Review:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-semibold">✗ Misconception: "{m.misconception}"</p>
                      <p className="text-emerald-400 font-medium mt-1">✓ Historical Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>✍️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-amber-400 font-mono">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── FLOATING ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Strategic Assessment Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HistoryPunjabCrisisAkaliSim;