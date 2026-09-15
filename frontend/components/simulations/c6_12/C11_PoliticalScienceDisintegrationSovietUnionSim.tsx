'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import gsap from 'gsap';

// ─── ISC SYLLABUS NODE LITERAL CONSTANTS ─────────────────────────────────────
const NODE_C11_POL_021 = 'c11_pol_021'; // Disintegration of USSR — Causes
const NODE_C11_POL_022 = 'c11_pol_022'; // Impact of Disintegration — Cold War End & 15 States
const NODE_C11_POL_023 = 'c11_pol_023'; // US Unilateralism — Iraq (Desert Storm & Iraqi Freedom)
const NODE_C11_POL_024 = 'c11_pol_024'; // US Unilateralism — Afghanistan & India-US Relations
const NODE_C11_POL_025 = 'c11_pol_025'; // Regional Cooperation — ASEAN & European Union
const NODE_C11_POL_026 = 'c11_pol_026'; // Regional Cooperation — SAARC, BRICS, QUAD
const NODE_C11_POL_027 = 'c11_pol_027'; // India-Pakistan Relations (1965, Tashkent, 1971, Shimla, Lahore, Kargil)
const NODE_C11_POL_028 = 'c11_pol_028'; // India-Bangladesh & India-China Relations

const ALL_NODE_IDS = [
  NODE_C11_POL_021,
  NODE_C11_POL_022,
  NODE_C11_POL_023,
  NODE_C11_POL_024,
  NODE_C11_POL_025,
  NODE_C11_POL_026,
  NODE_C11_POL_027,
  NODE_C11_POL_028,
];

// ─── NARRATIVE CRISIS SCENARIO ────────────────────────────────────────────────
const SCENARIO = {
  title: 'Diplomatic Crisis Room: 1985 to the Present Day',
  intro:
    'You are the Special Strategic Advisor to the Foreign Secretary of India in the Ministry of External Affairs (MEA), South Block. The global order is undergoing seismic shifts: the Soviet superpower collapses into 15 independent republics, the United States asserts unipolar power in the Gulf and Afghanistan, new regional architectures emerge, and India faces nuclear and border tensions across its immediate neighbourhood.',
  context:
    'Navigate the disintegration of the USSR, analyze American hegemony vs multilateralism, evaluate regional blocs (ASEAN, EU, SAARC, BRICS, QUAD), and negotiate crucial diplomatic settlements across the LoC, the Ganga, and the Himalayas.',
};

// ─── BRILLIANT.ORG PREDICT-THEN-CHECK QUESTIONS ──────────────────────────────
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_soviet_collapse',
    nodeId: NODE_C11_POL_021,
    question:
      'Predict: If Soviet central planners maintain military spending at 20% of GDP while granting complete political speech freedom (Glasnost), what structural outcome will occur first?',
    options: [
      'The Union will rapidly destabilize because lifting censorship unleashes pent-up nationalist dissent before economic shortages can be resolved',
      'Soviet consumer goods will flood the markets due to instant industrial restructuring',
      'All 15 republics will unanimously surrender local sovereignty to central Moscow authorities',
      'The Warsaw Pact will absorb Western Europe into a unified communist customs union',
    ],
    correctIndex: 0,
    explanation:
      'Glasnost (political transparency) desynchronized reforms: speech was liberated while consumer shelves remained empty, triggering uncontrollable republican secession movements.',
    verifyInstruction:
      'Adjust the Brezhnev Stagnation slider above 70% and Glasnost slider above 60% in Lab 1 to observe the Union integrity collapse below 30%!',
  },
  {
    id: 'pred_saarc_deadlock',
    nodeId: NODE_C11_POL_026,
    question:
      'Predict: If a regional organisation (like SAARC) strictly prohibits bilateral disputes from summit agendas while requiring unanimous consensus, what will happen to regional trade integration?',
    options: [
      'Unresolved bilateral conflicts will spill over, leading to frequent summit boycotts and keeping intra-regional trade suppressed below 5%',
      'Trade will automatically surge to over 50% because political disputes are completely ignored',
      'The bloc will immediately merge currencies into a single South Asian central bank like the Eurozone',
      'Member states will form an automatic mutual military defense coalition like NATO',
    ],
    correctIndex: 0,
    explanation:
      'Article X of the SAARC Charter bans contentious bilateral issues. As a result, cross-border tensions between India and Pakistan have repeatedly frozen summitry and stalled SAFTA.',
    verifyInstruction:
      'Switch to the Regional Multilateral Architecture lab (Lab 3) and compare SAARC integration depth against ASEAN and the EU!',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ('WHAT DO YOU NOTICE?') ─────────────
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_soviet_clusters',
    nodeId: NODE_C11_POL_022,
    question:
      'Observation: Looking at the Soviet Dissolution Architecture diagram in Lab 1, which peripheral cluster detaches first as central authority drops below 70%?',
    observableOptions: [
      'The Baltic 3 (Estonia, Latvia, Lithuania)',
      'The Central Asian 5 (Kazakhstan, Uzbekistan, etc.)',
      'The Slavic Core (Russia, Belarus, Ukraine)',
      'The Trans-Siberian corridor',
    ],
    options: [
      'The Baltic 3 (Estonia, Latvia, Lithuania)',
      'The Central Asian 5 (Kazakhstan, Uzbekistan, etc.)',
      'The Slavic Core (Russia, Belarus, Ukraine)',
      'The Trans-Siberian corridor',
    ],
    correctIndex: 0,
    explanation:
      'The Baltic states (Estonia, Latvia, Lithuania) initiated the "Singing Revolution" and declared sovereignty first (1988–1990), severing ties well before the Slavic or Central Asian republics.',
  },
  {
    id: 'obs_integration_matrix',
    nodeId: NODE_C11_POL_025,
    question:
      'Observation: In the Regional Cooperation Network graph (Lab 3), what unique institutional characteristic places the European Union (EU) at the apex of supranational pooling?',
    observableOptions: [
      'Supranational pooling of sovereignty with common courts (ECJ), central bank (ECB), and single currency (Euro)',
      'Complete reliance on the informal "ASEAN Way" of non-binding consensus',
      'An absolute prohibition against member states adopting common environmental or trade laws',
      'A strict military pact with an automatic draft across all continents',
    ],
    options: [
      'Supranational pooling of sovereignty with common courts (ECJ), central bank (ECB), and single currency (Euro)',
      'Complete reliance on the informal "ASEAN Way" of non-binding consensus',
      'An absolute prohibition against member states adopting common environmental or trade laws',
      'A strict military pact with an automatic draft across all continents',
    ],
    correctIndex: 0,
    explanation:
      'The EU is unique because sovereign member nations surrendered powers over monetary policy, border control (Schengen), and legal adjudication to supranational EU institutions.',
  },
];

// ─── DISCOVERY HOOK QUESTION ──────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question:
    'In December 1991, the Soviet hammer-and-sickle flag was lowered over the Kremlin. What was the single most immediate structural shock to India’s grand strategy?',
  options: [
    'India lost its primary defence supplier, rupee-rouble trade buffer, and UN veto counterweight overnight',
    'India immediately declared a military alliance with NATO to replace Soviet protection',
    'The Non-Aligned Movement (NAM) doubled its global membership and became the sole world superpower',
    'The United Nations Security Council permanently dissolved due to the loss of a superpower',
  ],
  correctIndex: 0,
  hintAfter:
    'The end of the Cold War destroyed the bipolar balance India had navigated for 40 years, forcing emergency economic liberalisation and foreign policy recalibration!',
};

// ─── CHALLENGE INTERFACE (NEP 2020 + CISCE 2026 Mandates) ──────────────────────
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

// ─── 24 PROGRESSIVE CHALLENGES (ALL 8 NODES) ──────────────────────────────────
const CHALLENGES: Challenge[] = [
  // ── Tier 1: Foundation (8 challenges) ──
  {
    id: 'ch_pol_001_f',
    nodeId: NODE_C11_POL_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Mikhail Gorbachev introduced two famous reform policies in 1985 to revive the USSR. Which pair correctly identifies Glasnost and Perestroika?',
    options: [
      'Glasnost = Openness (political transparency); Perestroika = Restructuring (economic/party reform)',
      'Glasnost = Military Expansion; Perestroika = Collectivisation of farms',
      'Glasnost = State Censorship; Perestroika = Dissolution of the KGB',
      'Glasnost = Nuclear Modernisation; Perestroika = Complete privatisation of heavy industry',
    ],
    correctIndex: 0,
    explanation:
      'Glasnost (openness) lifted censorship and freed political prisoners. Perestroika (restructuring) introduced limited market mechanisms and decentralised economic decision-making.',
    hints: [
      'Think of what lifting censorship and allowing free speech represents in Russian.',
      'Perestroika shares its root with the English word "structure".',
      'Glasnost represents political transparency; Perestroika represents economic restructuring.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_pol_002_f',
    nodeId: NODE_C11_POL_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Group the successor republics of the USSR into their correct geopolitical clusters.',
    dragItems: [
      { label: 'Estonia, Latvia, Lithuania', targetId: 'reg_baltic' },
      { label: 'Kazakhstan, Uzbekistan, Tajikistan', targetId: 'reg_central_asia' },
      { label: 'Georgia, Armenia, Azerbaijan', targetId: 'reg_caucasus' },
      { label: 'Russia, Ukraine, Belarus', targetId: 'reg_slavic' },
    ],
    correctMapping: {
      reg_baltic: 'Estonia, Latvia, Lithuania',
      reg_central_asia: 'Kazakhstan, Uzbekistan, Tajikistan',
      reg_caucasus: 'Georgia, Armenia, Azerbaijan',
      reg_slavic: 'Russia, Ukraine, Belarus',
    },
    explanation:
      'The 15 successor republics divide into 3 Baltic states, 5 Central Asian states, 3 Caucasus states, and 4 European/Slavic states (including Moldova).',
    hints: [
      'Estonia, Latvia, and Lithuania border the Baltic Sea and joined the EU/NATO in 2004.',
      'Kazakhstan and Uzbekistan are large landlocked republics in Central Asia.',
      'Georgia, Armenia, and Azerbaijan are nestled in the Caucasus mountain corridor.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_pol_003_f',
    nodeId: NODE_C11_POL_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which UN Security Council Resolution explicitly authorised "all necessary means" to liberate Kuwait in Operation Desert Storm (1991)?',
    options: ['UNSC Resolution 678', 'UNSC Resolution 1441', 'UNSC Resolution 242', 'UNSC Resolution 1368'],
    correctIndex: 0,
    explanation:
      'UNSC Resolution 678 (29 Nov 1990) authorised coalition force under Chapter VII if Iraq did not withdraw by 15 January 1991. Resolution 1441 (2002) only warned of serious consequences.',
    hints: [
      'It was adopted in late November 1990 right before the January 1991 deadline.',
      'Resolution 1441 was in 2002 regarding WMD inspections, not the 1991 Gulf War.',
      'Resolution 678 provided the explicit multilateral mandate under Chapter VII.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_pol_004_f',
    nodeId: NODE_C11_POL_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What was the primary immediate objective and trigger of US Operation Enduring Freedom launched on 7 October 2001?',
    options: [
      'Dismantling al-Qaeda and ousting the Taliban regime following the 9/11 attacks',
      'Seizing Iraqi oilfields in Kirkuk and Basra following the Gulf War',
      'Annexing northern Afghanistan to build a trans-Caspian gas pipeline',
      'Enforcing maritime blockades against Iranian nuclear enrichment facilities',
    ],
    correctIndex: 0,
    explanation:
      'Operation Enduring Freedom was launched on 7 October 2001 after the 9/11 attacks when the Taliban refused to surrender Osama bin Laden.',
    hints: [
      'Think about the catastrophic terrorist attacks on the World Trade Center in New York.',
      'The operation took place in the mountains of Afghanistan, targeting the Taliban.',
      'It focused on dismantling al-Qaeda and overthrowing the Taliban regime in Kabul.',
    ],
  },
  {
    id: 'ch_pol_005_f',
    nodeId: NODE_C11_POL_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Where and when was ASEAN founded, and which historic declaration brought it into existence?',
    options: [
      'Bangkok (1967) by 5 founding members via the Bangkok Declaration',
      'Jakarta (1975) by 10 members via the ASEAN Charter',
      'Singapore (1992) by 7 members via the AFTA Treaty',
      'Manila (1954) via the SEATO Collective Defence Pact',
    ],
    correctIndex: 0,
    explanation:
      'ASEAN was founded on 8 August 1967 in Bangkok by Indonesia, Malaysia, Philippines, Singapore, and Thailand through the Bangkok Declaration.',
    hints: [
      'It was signed in the capital of Thailand in the late 1960s.',
      'The original founding group consisted of 5 Southeast Asian states.',
      'The document is officially named the Bangkok Declaration of 1967.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_pol_006_f',
    nodeId: NODE_C11_POL_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'At which historic summit was the BRICS New Development Bank (NDB) established with USD 100 billion authorized capital?',
    options: [
      '6th BRICS Summit at Fortaleza, Brazil (2014)',
      '1st BRIC Summit at Yekaterinburg, Russia (2009)',
      '8th BRICS Summit at Goa, India (2016)',
      '15th BRICS Summit at Johannesburg, South Africa (2023)',
    ],
    correctIndex: 0,
    explanation:
      'The NDB (headquartered in Shanghai, first president K.V. Kamath of India) and the CRA were established at the 2014 Fortaleza Summit in Brazil.',
    hints: [
      'It happened in Brazil alongside the Contingent Reserve Arrangement (CRA).',
      'The year was 2014 during the 6th annual gathering.',
      'The Fortaleza Summit in 2014 founded both the NDB and CRA.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_pol_007_f',
    nodeId: NODE_C11_POL_027,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Arrange these landmark India-Pakistan conflicts and agreements in correct chronological sequence.',
    sortItems: [
      '1965 War & Tashkent Agreement (Soviet mediated)',
      '1971 Liberation War & Shimla Agreement (Bilateral LoC)',
      'Lahore Declaration (Bus diplomacy & nuclear CBMs)',
      'Kargil Conflict & Operation Vijay (Recapturing heights)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Chronology: 1965 war/Tashkent (1966) -> 1971 war/Shimla (1972) -> Lahore Declaration (Feb 1999) -> Kargil War/Operation Vijay (May-July 1999).',
    hints: [
      'Tashkent followed the 1965 war; Shimla followed the 1971 creation of Bangladesh.',
      'Vajpayee took the bus to Lahore in early 1999 right before the Kargil intrusion.',
      'The chronological sequence is 1965/66 -> 1971/72 -> Feb 1999 -> May-July 1999.',
    ],
  },
  {
    id: 'ch_pol_008_f',
    nodeId: NODE_C11_POL_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What are the Five Principles of Peaceful Coexistence signed between India and China on 29 April 1954 known as?',
    options: ['Panchsheel', 'Panchayat', 'Bandung Consensus', 'Look East Doctrine'],
    correctIndex: 0,
    explanation:
      'Panchsheel (Five Principles of Peaceful Coexistence) was codified in the 1954 Agreement on Trade and Intercourse between Tibet Region of China and India.',
    hints: [
      'It comes from the Sanskrit words for "five" (panch) and "virtues/conduct" (sheel).',
      'It was championed by Jawaharlal Nehru and Zhou Enlai.',
      'The term is Panchsheel.',
    ],
  },

  // ── Tier 2: Standard (8 challenges) ──
  {
    id: 'ch_pol_009_s',
    nodeId: NODE_C11_POL_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why did Brezhnev-era economic stagnation make Gorbachev’s reforms both urgently necessary yet fatally volatile?',
    options: [
      'Central planning absorbed 15-20% of GDP on defence while consumer shelves emptied; opening speech (Glasnost) before fixing goods (Perestroika) unleashed pent-up grievances',
      'Soviet agriculture was hyper-privatised, creating excessive food surpluses that depressed world market prices',
      'The USSR was deeply indebted to Western capitalist banks and was forced to adopt IMF structural adjustment in 1985',
      'The Warsaw Pact members invaded Moscow to overthrow the Communist Party leadership',
    ],
    correctIndex: 0,
    explanation:
      'Brezhnev-era "zastoy" wasted vast resources on military parity. When Glasnost lifted political terror without Perestroika delivering food and goods, republican nationalism exploded.',
    hints: [
      'Consider the massive percentage of Soviet GDP devoted to the military (15-20%).',
      'Notice the mismatch in timing: political freedom arrived before economic prosperity.',
      'Lifting censorship allowed people to openly criticise the regime before economic reforms could succeed.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_pol_010_s',
    nodeId: NODE_C11_POL_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why do international relations scholars emphasize that the Cold War ended through a "structural disappearance" rather than an allied military victory?',
    options: [
      'The Cold War dissolved because one of the two systemic poles collapsed from internal contradictions, not because NATO militarily conquered Moscow',
      'The United States signed a formal peace treaty in Geneva conceding global territory to the Russian Federation',
      'The United Nations General Assembly voted by two-thirds majority to abolish all nuclear weapons globally',
      'A direct superpower war in Central Europe resulted in the unconditional surrender of the Red Army',
    ],
    correctIndex: 0,
    explanation:
      'The Cold War was a bipolar systemic equilibrium. It ended because the USSR dissolved from within (Belovezha & Alma-Ata Accords, Dec 1991), leaving the US as the sole superpower in a unipolar moment.',
    hints: [
      'Did US and Soviet armies ever fight a direct, declared war on each other’s homeland?',
      'Think about the structural concept of "poles" in the international system.',
      'The USSR disintegrated from within due to economic decay and nationalism.',
    ],
  },
  {
    id: 'ch_pol_011_s',
    nodeId: NODE_C11_POL_023,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Contrast Operation Desert Storm (1991) and Operation Iraqi Freedom (2003) regarding international law and UN legitimacy.',
    options: [
      'Desert Storm had explicit UNSC Resolution 678 mandate and 34-nation coalition for Kuwait’s liberation; 2003 invasion lacked UNSC authorization and unseated a regime on disproven WMD claims',
      'Desert Storm was illegal under international law, whereas Iraqi Freedom was formally endorsed by all five permanent members of the UNSC',
      'Both operations were conducted strictly by NATO without any United Nations Security Council debate or involvement',
      'Desert Storm aimed at regime change in Baghdad, while Operation Iraqi Freedom was solely confined to maritime peacekeeping',
    ],
    correctIndex: 0,
    explanation:
      'Desert Storm (1991) was a textbook multilateral action enforcing UN collective security to free Kuwait. Iraqi Freedom (2003) bypassed the Security Council, invaded Iraq unilaterally, and failed to find WMDs.',
    hints: [
      'Check which operation had UNSC Resolution 678 authorizing "all necessary means".',
      'Look at whether weapons of mass destruction (WMDs) were ever discovered after 2003.',
      'Desert Storm had clear UN authorization; 2003 Iraqi Freedom was unilateral regime change.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_pol_012_s',
    nodeId: NODE_C11_POL_024,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Trace the foundational milestones in India-US Strategic Relations from 1991 to 2022 in chronological order.',
    sortItems: [
      '1991 Economic Liberalisation & Post-Cold War Rapprochement',
      '2008 Indo-US Civil Nuclear Agreement & NSG Waiver',
      '2016 Major Defence Partner status & LEMOA Logistics Pact',
      '2020 BECA Geospatial Agreement & 2022 iCET Initiative',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Milestones: 1991 Liberalisation -> 2008 123 Nuclear Deal -> 2016 Major Defence Partner/LEMOA -> 2020 BECA (completing LEMOA, COMCASA, BECA) -> 2022 iCET.',
    hints: [
      'The relationship began re-anchoring after the USSR collapse and 1991 budget reforms.',
      'The nuclear deal under Manmohan Singh and George W. Bush occurred in 2008.',
      'The foundational defence agreements culminated with BECA in 2020 and iCET in 2022.',
    ],
  },
  {
    id: 'ch_pol_013_s',
    nodeId: NODE_C11_POL_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Compare the structural integration of the European Union with ASEAN. What distinguishes their institutional designs?',
    options: [
      'EU features supranational pooling of sovereignty (Euro currency for 20 states, ECJ, Schengen); ASEAN operates on the "ASEAN Way" of strict non-interference and consensus without supranational courts',
      'EU is a collective military alliance under Article 5, whereas ASEAN is a unified federal state with one parliament',
      'ASEAN has adopted a single regional currency across all 10 members, whereas the EU abolished the Euro in 2020',
      'Both groupings require member states to surrender complete control over national defence and foreign policy',
    ],
    correctIndex: 0,
    explanation:
      'The EU possesses supranational institutions (European Commission, European Court of Justice, ECB). ASEAN preserves national sovereignty through informal consensus and non-interference.',
    hints: [
      'Does ASEAN have a single currency or a regional supreme court?',
      'Think about the "ASEAN Way" which emphasizes consensus and non-interference.',
      'The EU pools sovereignty (Euro, Schengen), while ASEAN maintains non-interference.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_pol_014_s',
    nodeId: NODE_C11_POL_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why has SAARC intra-regional trade remained below ~5% while groupings like ASEAN exceed 25% and BRICS expanded institutions?',
    options: [
      'Article X of the SAARC Charter excludes bilateral disputes, allowing India-Pakistan political-military standoffs to freeze summit diplomacy and stall SAFTA implementation',
      'South Asian nations have completely identical export economies with zero demand for neighbouring goods',
      'The United Nations Security Council prohibited trade agreements between South Asian states under Chapter VII',
      'SAARC countries share no common maritime or land borders, making transport impossible',
    ],
    correctIndex: 0,
    explanation:
      'SAARC requires total consensus, and Article X bans bilateral issues. Consequently, cross-border terrorism and Indo-Pak standoffs (e.g. Uri 2016, Pulwama 2019) have frozen summits since 2014.',
    hints: [
      'Recall what happened to the 2016 Islamabad SAARC Summit after the Uri attack.',
      'Look at Article X of the SAARC Charter regarding contentious bilateral topics.',
      'Indo-Pak bilateral conflicts paralyze consensus-based decision-making in SAARC.',
    ],
  },
  {
    id: 'ch_pol_015_s',
    nodeId: NODE_C11_POL_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How does the Shimla Agreement (1972) fundamentally differ from the Tashkent Agreement (1966) in Indian diplomatic doctrine?',
    options: [
      'Tashkent was mediated by a third-party superpower (Soviet Premier Kosygin); Shimla established strictly bilateral dispute resolution and converted the Ceasefire Line into the Line of Control (LoC)',
      'Tashkent created the Line of Control, whereas Shimla invited the United Nations to oversee Kashmir plebiscite',
      'Tashkent was signed after India lost East Pakistan, while Shimla followed a stalemate in Punjab',
      'Shimla permanently ceded the entire Kashmir valley to Pakistan in exchange for prisoner releases',
    ],
    correctIndex: 0,
    explanation:
      'Tashkent (1966) was Soviet-brokered. Shimla (1972), signed by Indira Gandhi and Zulfikar Bhutto, established the bedrock principle that Indo-Pak disputes must be settled bilaterally without third-party mediation.',
    hints: [
      'Who mediated the Tashkent talks in Soviet Uzbekistan?',
      'What is India’s consistent stance today when third countries offer to mediate Kashmir?',
      'Shimla made relations strictly bilateral and established the formal Line of Control.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_pol_016_s',
    nodeId: NODE_C11_POL_028,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Match the landmark bilateral water/territorial issue with its specific diplomatic settlement mechanism.',
    options: [
      'Farakka Barrage -> Ganga Water Treaty 1996; Dahagram Enclave Access -> Teen Bhiga Corridor (LBA 2015); Tibet Trade -> Panchsheel 1954',
      'Farakka Barrage -> Indus Water Treaty 1960; Dahagram Enclave -> Tashkent Pact; Tibet Trade -> Shimla Accord',
      'Farakka Barrage -> SAFTA Agreement; Dahagram Enclave -> McMahon Treaty; Tibet Trade -> Treaty of Rome',
      'Farakka Barrage -> Durand Protocol; Dahagram Enclave -> Bangkok Declaration; Tibet Trade -> ASEAN Free Trade',
    ],
    correctIndex: 0,
    explanation:
      'The Ganga Water Treaty (1996) governs 30-year lean-season water sharing at Farakka. The 2015 Land Boundary Agreement resolved Teen Bhiga and 162 enclaves. Panchsheel (1954) governed Tibet trade.',
    hints: [
      'Farakka is on the Ganga river near the West Bengal-Bangladesh border.',
      'Teen Bhiga corridor connects the Dahagram-Angarpota enclave to mainland Bangladesh.',
      'Panchsheel was signed in 1954 for India-Tibet border trade.',
    ],
  },

  // ── Tier 3: Advanced & Competency-Based (8 challenges) ──
  {
    id: 'ch_pol_017_a',
    nodeId: NODE_C11_POL_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Construct the causal chain of Soviet disintegration by arranging the 4 structural catalysts in order.',
    availableParts: [
      'Brezhnev Gerontocracy & Economic Stagnation',
      'Glasnost & Perestroika Reform Gap',
      'Baltic & Republican Nationalist Mobilisation',
      'August 1991 Hardline Coup & Belovezha Accords',
    ],
    targetState:
      'Brezhnev Gerontocracy & Economic Stagnation Glasnost & Perestroika Reform Gap Baltic & Republican Nationalist Mobilisation August 1991 Hardline Coup & Belovezha Accords',
    validationHint:
      'Assemble from underlying background condition -> policy catalyst -> republican mobilisation -> terminal political collapse.',
    explanation:
      'Causal Chain: 1. Brezhnev stagnation (1964-82) -> 2. Gorbachev reforms (1985) opened speech before fixing shortages -> 3. Baltic singing revolution & republican secession -> 4. August 1991 coup and Belovezha dissolution.',
    hints: [
      'Start with the 1964-1982 period of zastoy (stagnation) under Brezhnev.',
      'Next came Gorbachev’s 1985 dual reforms that unintendedly sparked open dissent.',
      'Nationalist uprisings in Estonia, Latvia, Lithuania, and Ukraine preceded the August 1991 coup.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_pol_018_a',
    nodeId: NODE_C11_POL_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate how India’s constitutional architecture (Article 1 & Seventh Schedule) avoided the centrifugal collapse that fractured the multi-national USSR.',
    options: [
      'India was established as an indestructible Union of destructible States with democratic linguistic accommodation (1956) and no constitutional right of secession, unlike the Soviet treaty-based republic exit right',
      'India maintained a one-party military dictatorship with mandatory single-language imposition across all states',
      'The Indian Constitution gave every individual state a sovereign nuclear arsenal and separate foreign ministry',
      'India completely dismantled its central government in 1950, functioning solely as a loose customs union',
    ],
    correctIndex: 0,
    explanation:
      'Dr. B.R. Ambedkar designed India as a "Union of States" (indestructible union). Democratic elections, linguistic reorganisation (1956), and federal dispute resolution accommodated sub-national identities without secession.',
    hints: [
      'Recall Dr. Ambedkar’s argument on Article 1: "India is an indestructible Union of destructible states".',
      'The Soviet Constitution of 1977 technically preserved a republican right of secession.',
      'Democratic accommodation of linguistic diversity through elections prevented separatist fragmentation.',
    ],
  },
  {
    id: 'ch_pol_019_a',
    nodeId: NODE_C11_POL_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'You are advising Prime Minister A.B. Vajpayee in April 2003. Parliament must adopt a resolution regarding the US invasion of Iraq. What principled stance should India take under Article 51 of the Constitution?',
    options: [
      'Deplore the unilateral military action, reject troop deployment without UN mandate, and urge UN primacy in post-war reconstruction and humanitarian relief',
      'Deploy two Indian army divisions under US central command to secure Iraqi oil refineries in exchange for loan waivers',
      'Sever all diplomatic and economic relations with the United States and withdraw from the United Nations',
      'Declare immediate recognition of the military regime and support pre-emptive strike doctrines globally',
    ],
    correctIndex: 0,
    explanation:
      'In April 2003, the Indian Parliament passed a unanimous resolution deploring the US military action in Iraq, emphasizing respect for sovereignty and the primacy of the UN Charter under Article 51.',
    hints: [
      'Consider India’s long-standing Non-Aligned commitment to international law and the UN Charter.',
      'Did India send combat troops to Iraq in 2003?',
      'India opposed unilateral regime change and called for UN-led humanitarian reconstruction.',
    ],
  },
  {
    id: 'ch_pol_020_a',
    nodeId: NODE_C11_POL_024,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'India-US bilateral trade grew from ~$19 Billion in 2000 to ~$190 Billion in 2023. By what factor (multiplier) did bilateral trade expand over this period?',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: 'x (fold)',
    explanation:
      '190 / 19 = 10-fold expansion. The strategic partnership witnessed explosive growth across information technology, aerospace, defence procurement, and pharmaceuticals.',
    hints: [
      'Divide 190 billion by 19 billion.',
      '19 * 10 = 190.',
      'The multiplier is exactly 10x.',
    ],
  },
  {
    id: 'ch_pol_021_a',
    nodeId: NODE_C11_POL_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate why the UK’s 2020 exit (Brexit) from the European Union illustrates the inherent tension in deep supranational integration compared to flexible partnerships.',
    options: [
      'Supranational pooling of sovereignty over borders, budgets, and courts can provoke domestic political backlashes over national self-determination when economic shocks occur',
      'The EU had completely banned all agricultural trade between the United Kingdom and continental Europe',
      'The European Court of Justice ordered the immediate abolition of the British Parliament in London',
      'The European Union declared war on the Commonwealth of Nations in 2016',
    ],
    correctIndex: 0,
    explanation:
      'Brexit demonstrated that deep supranational integration (Schengen, ECJ jurisprudence, budget contributions) creates sovereignty tensions that do not arise in looser consensus-based bodies.',
    hints: [
      'Consider the slogan of the Brexit campaign: "Take back control" of laws, borders, and money.',
      'Deep supranational bodies limit national parliamentary autonomy.',
      'Pooling sovereignty creates domestic backlashes over national control when crises hit.',
    ],
  },
  {
    id: 'ch_pol_022_a',
    nodeId: NODE_C11_POL_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'As an Indian strategist designing a resilient Indo-Pacific architecture, how should India balance its memberships in BRICS and QUAD?',
    options: [
      'Pursue strategic autonomy: utilize QUAD for Indo-Pacific maritime security & high-tech supply chains with democracies, while using BRICS for Global South voice & Bretton Woods financial reform',
      'Immediately resign from BRICS and convert QUAD into an offensive nuclear military pact with automatic war triggers',
      'Abandon QUAD, join the Chinese Belt and Road Initiative, and adopt the Yuan as India’s sovereign legal tender',
      'Boycott all international summits and isolate the Indian economy from maritime trade completely',
    ],
    correctIndex: 0,
    explanation:
      'India practices "multi-alignment" and strategic autonomy: engaging the Quad for Indo-Pacific stability and tech resilience, while engaging BRICS for Global South financial architecture and multipolarity.',
    hints: [
      'Does India follow single-alliance dogmas or issue-based multi-alignment?',
      'Think about how India engages both Washington and Moscow/Global South platforms simultaneously.',
      'Strategic autonomy balances QUAD for maritime security and BRICS for financial multipolarity.',
    ],
  },
  {
    id: 'ch_pol_023_a',
    nodeId: NODE_C11_POL_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why did India’s strategic decision NOT to cross the Line of Control during the 1999 Kargil Conflict (Operation Vijay) prove decisive diplomatically?',
    options: [
      'It preserved the moral high ground, upheld the Shimla Agreement, and compelled the US Clinton administration to pressure Pakistan into unconditional withdrawal without risking nuclear escalation',
      'It demonstrated that Indian fighter jets lacked the fuel capacity to fly past the Himalayan ridgelines',
      'The United Nations Security Council ordered the Indian Army to disarm completely in Kashmir',
      'Pakistan’s military surrendered its entire nuclear arsenal to India on the first day of combat',
    ],
    correctIndex: 0,
    explanation:
      'India’s strict restraint in not crossing the LoC won overwhelming global diplomatic backing, isolated Islamabad internationally, and forced Prime Minister Nawaz Sharif to accept the Washington declaration.',
    hints: [
      'Think about international sympathy when a nation defends its own territory without invading across borders.',
      'Recall the role of President Bill Clinton meeting Nawaz Sharif on 4 July 1999 in Washington.',
      'Respecting the LoC preserved India’s legitimacy under international law and isolated Pakistan.',
    ],
  },
  {
    id: 'ch_pol_024_a',
    nodeId: NODE_C11_POL_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate the breakdown of the 1954 Panchsheel Agreement leading to the 1962 Sino-Indian War. What were the root geopolitical triggers?',
    options: [
      'Unresolved colonial borders (McMahon Line & Aksai Chin), the 1950 Chinese takeover of Tibet, the 1959 asylum granted to the Dalai Lama, and divergent forward military posturing',
      'Disputes over the maritime boundaries of the Indian Ocean and the Malacca Strait',
      'India’s formal accession to the US-led SEATO military alliance in 1958',
      'A dispute over tea export tariffs between Assam and Yunnan province',
    ],
    correctIndex: 0,
    explanation:
      'The 1962 war stemmed from competing interpretations of the McMahon Line, China building a highway through Aksai Chin (Ladakh), Chinese suppression in Tibet, and the Dalai Lama’s asylum in India in 1959.',
    hints: [
      'Look at the Himalayan frontier in Ladakh (Aksai Chin) and Arunachal Pradesh (McMahon Line).',
      'What event happened in 1959 involving the spiritual leader of Tibet fleeing to Dharamshala?',
      'Border ambiguity combined with the Tibet crisis and the Dalai Lama’s asylum caused the breakdown.',
    ],
    misconceptionIndex: 6,
  },
];

// ─── EXPLORATION STEPS ────────────────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Superpower Dissolution & Bipolar Breakdown',
    instruction:
      'Adjust the Economic Stagnation and Republican Dissent sliders. Observe how the USSR structural power drops until 15 independent nations emerge!',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_POL_021,
  },
  {
    title: 'US Hegemony & Unilateralism: Iraq to Kabul',
    instruction:
      'Toggle between Desert Storm (1991) and Iraqi Freedom (2003). Compare UN Security Council authorization, coalition sizes, and international legality!',
    interactionType: 'click-toggle',
    nodeId: NODE_C11_POL_023,
  },
  {
    title: 'Regional Multilateral Architecture',
    instruction:
      'Click and explore regional groupings (ASEAN, EU, SAARC, BRICS, QUAD). Compare depth of sovereignty pooling and trade integration!',
    interactionType: 'click-matrix',
    nodeId: NODE_C11_POL_025,
  },
  {
    title: 'Indo-Pak Conflict & Diplomacy Dynamics',
    instruction:
      'Move through the chronological timeline nodes (1965 Tashkent -> 1971 Shimla -> 1999 Lahore -> 1999 Kargil). Notice the bilateral vs third-party shifts!',
    interactionType: 'timeline-scrub',
    nodeId: NODE_C11_POL_027,
  },
  {
    title: 'Eastern Frontiers: Panchsheel & Water Treaties',
    instruction:
      'Simulate the lean-season water discharge at Farakka Barrage (1996 Ganga Treaty) and examine the 5 Principles of Panchsheel along the Line of Actual Control!',
    interactionType: 'water-slider',
    nodeId: NODE_C11_POL_028,
  },
];

// ─── REAL-WORLD EXPERT DIPLOMAT ACTIVITY ──────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Diplomat: Drafting India’s Strategic White Paper',
  description:
    'Synthesize your understanding of post-1991 international relations to author a high-level briefing note for India’s National Security Council Secretariat (NSCS).',
  steps: [
    'Evaluate India’s strategic partnership with the US (iCET, Quad) while maintaining critical defence ties with Russia.',
    'Formulate an institutional reform proposal for SAARC or BIMSTEC to revive South Asian regional trade from 5% to 20%.',
    'Outline a bilateral border management protocol for the Line of Actual Control (LAC) applying Panchsheel principles in a nuclearised context.',
    'Present your recommendations to the Parliamentary Standing Committee on External Affairs.',
  ],
};

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_POL_021,
  title: 'Disintegration of the Soviet Union & Contemporary World Order',
  definition:
    'The dissolution of the USSR in December 1991 ended the Cold War bipolar order, establishing a unipolar moment of US unilateralism, spurring regional cooperation (ASEAN, EU, BRICS, QUAD), and reshaping India’s strategic diplomacy across South Asia.',
  eli5:
    'Imagine two giant captains who led competing teams for 40 years. Suddenly, one captain’s team falls apart into 15 smaller players. The remaining captain acts as the sole boss, while other countries team up in regional clubs to protect their own interests.',
  misconceptions: [
    {
      misconception: 'Gorbachev’s reforms collapsed the USSR because they were too radical.',
      correction:
        'The reforms were contradictory and desynchronised: lifting political control (Glasnost) before fixing the economy (Perestroika) unleashed pent-up nationalist dissent the centre could not contain.',
    },
    {
      misconception: 'The Cold War ended because the US defeated the Soviet Union in a military war.',
      correction:
        'The Cold War ended because one of the two structural poles dissolved from internal economic, political, and nationalist contradictions — not through military conquest.',
    },
    {
      misconception: 'Operation Desert Storm (1991) and Operation Iraqi Freedom (2003) had the same legal authority.',
      correction:
        'Desert Storm had explicit UNSC Resolution 678 Chapter VII authorization; the 2003 invasion lacked a fresh UNSC mandate and was disproven regarding WMD stockpiles.',
    },
    {
      misconception: 'ASEAN is a collective military defence alliance like NATO.',
      correction:
        'ASEAN is an economic, social, and cultural association based on the "ASEAN Way" of consensus and strict non-interference, not mutual military defence.',
    },
    {
      misconception: 'The Shimla Agreement was mediated by the Soviet Union.',
      correction:
        'Tashkent (1966) was Soviet-brokered; Shimla (1972) was strictly bilateral between Indira Gandhi and Z.A. Bhutto, establishing bilateralism as India’s core doctrine.',
    },
    {
      misconception: 'The 1962 Sino-Indian War was caused purely by the McMahon Line.',
      correction:
        'The war had multi-layered triggers: Aksai Chin road construction, the 1950 Tibet annexation, the Dalai Lama’s 1959 asylum in India, and forward policy friction.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which date marks the formal dissolution of the Soviet Union?',
      options: ['31 December 1991', '15 August 1989', '26 January 1993', '11 September 2001'],
      correctIndex: 0,
    },
  ],
};

// ─── MAIN SIMULATION COMPONENT ─────────────────────────────────────────────────
export function C11_PoliticalScienceDisintegrationSovietUnionSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_POL_021,
    title = DEFAULT_PROPS.title || 'Disintegration of the Soviet Union & Contemporary World Order',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['polscience'] || {
    name: 'Political Science',
    emoji: '⚖️',
    color: 'indigo',
  };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Pedagogical State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Prediction & Observation Interactive States
  const [activePredictionIndex, setActivePredictionIndex] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionChecked, setPredictionChecked] = useState(false);

  const [activeObservationIndex, setActiveObservationIndex] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);
  const [observationChecked, setObservationChecked] = useState(false);

  // Interactive Exploration & Sandbox Variables
  const [sovietStagnationLevel, setSovietStagnationLevel] = useState(70);
  const [glasnostFreedomLevel, setGlasnostFreedomLevel] = useState(65);
  const [nationalistSurgeLevel, setNationalistSurgeLevel] = useState(60);
  const [selectedOperation, setSelectedOperation] = useState<'desert_storm' | 'iraqi_freedom' | 'enduring_freedom'>('desert_storm');
  const [selectedBloc, setSelectedBloc] = useState<'asean' | 'eu' | 'saarc' | 'brics' | 'quad'>('asean');
  const [selectedTimelineNode, setSelectedTimelineNode] = useState<'1965' | '1971' | '1999_lahore' | '1999_kargil'>('1971');
  const [farakkaDischarge, setFarakkaDischarge] = useState(40000); // cusecs
  const [panchsheelPrincipleIndex, setPanchsheelPrincipleIndex] = useState(0);
  const [unipolarPowerBalance, setUnipolarPowerBalance] = useState(85);

  // Challenge & Adaptive Mastery Engine State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag & Sort & Input Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Micro-Interactions
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Additional Interactive Explorer Tabs
  const [activeTab, setActiveTab] = useState<'simulator' | 'treaties' | 'constitution' | 'dossier'>('simulator');

  // Reflection responses
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineSvgRef = useRef<SVGSVGElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── SPACED REPETITION SCHEDULE CALCULATION ─────────────────────────────────
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  const srsNextDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + srsIntervalDays);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }, [srsIntervalDays]);

  // ─── LOAD INITIAL MASTERY ON MOUNT ──────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY UPDATE ───────────────────────────────────
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

  // ─── GSAP ANIMATION EFFECT FOR TIMELINE ─────────────────────────────────────
  useEffect(() => {
    if (timelineSvgRef.current) {
      gsap.fromTo(
        timelineSvgRef.current.querySelectorAll('.timeline-node'),
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }
      );
    }
  }, [selectedTimelineNode, currentSlide]);

  // ─── 2D CANVAS RADAR / DIPLOMATIC TENSION MONITOR ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) - 15;

      // Draw radar background circles
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      for (let r = 20; r <= radius; r += 20) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweeping radar beam
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + 0.4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.fill();
      ctx.restore();

      // Draw active tension signal pulse
      const pulse = Math.sin(angle * 2) * 5;
      const signalRadius = (sovietStagnationLevel / 100) * (radius - 10) + pulse;

      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(5, signalRadius), 0, Math.PI * 2);
      ctx.strokeStyle = sovietStagnationLevel > 60 ? '#f43f5e' : '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text status overlay
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`GEO-STRESS: ${sovietStagnationLevel}%`, 10, canvas.height - 10);
      ctx.fillText(`UNIPOLARITY: ${unipolarPowerBalance}%`, canvas.width - 110, canvas.height - 10);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [sovietStagnationLevel, unipolarPowerBalance]);

  // ─── ESCALATING HINTS HANDLER ───────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      const hintText = currentChallengeObj.hints[nextLevel - 1];
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
  }, [hintCount, currentChallengeObj]);

  // ─── AUTO-HINT INACTIVITY TIMER ────────────────────────────────��────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── COMPLETION HANDLER ─────────────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered the contemporary world order simulation.');
  }, [errors, onComplete]);

  // ─── DISCOVERY ANSWER HANDLER ───────────────────────────────────────���───────
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! The end of the Cold War fundamentally transformed India’s foreign policy.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── PHASE ADVANCEMENT CALLBACKS ────────────────────────────────────────────
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the causes and consequences of Soviet disintegration.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked! Test any geopolitical variable freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Apply your strategic diplomatic knowledge!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // ─── DRAG & DROP HANDLERS (DRAG-LABEL) ──────────────────────────────────────
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, currentChallengeObj]
  );

  // ─── DRAG-SORT HANDLERS ────────────────────────────────────────────────────��
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, []);

  // ─── ANSWER SUBMISSION ENGINE ───────────────────────────────────────────────
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        currentChallengeObj.type === 'classify' ||
        currentChallengeObj.type === 'distinguish' ||
        currentChallengeObj.type === 'match'
      ) {
        isCorrect = answer === currentChallengeObj.correctIndex;
      } else if (currentChallengeObj.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
      } else if (currentChallengeObj.type === 'drag-sort') {
        const checkArr = (answer as number[]).length > 0 ? (answer as number[]) : [0, 1, 2, 3];
        isCorrect = JSON.stringify(checkArr) === JSON.stringify(currentChallengeObj.correctOrder);
      } else if (currentChallengeObj.type === 'numeric') {
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(val - (currentChallengeObj.correctAnswer || 0)) <=
          (currentChallengeObj.tolerance || 0);
      } else if (currentChallengeObj.type === 'construct') {
        isCorrect = (answer as string).trim() === (currentChallengeObj.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent diplomatic analysis.');
        setShowConfetti(true);
        setShowExplanation(true);
        setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        setShowSparkle(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          currentChallengeObj.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)
        ) {
          setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete strategic reasoning together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentChallengeObj, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── NEXT CHALLENGE ADVANCEMENT ─────────────────────────────────────────────
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

  // ─── CLEANUP ON UNMOUNT ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED SOVIET DISSOLUTION METRICS ─────────────────────────────────────
  const calculatedUnionIntegrity = useMemo(() => {
    const pressure = sovietStagnationLevel * 0.4 + glasnostFreedomLevel * 0.3 + nationalistSurgeLevel * 0.5;
    return Math.max(0, Math.min(100, Math.round(100 - pressure * 0.8)));
  }, [sovietStagnationLevel, glasnostFreedomLevel, nationalistSurgeLevel]);

  // ─── MOTIVATIONAL FEEDBACK STRING ──────────────────────────────────────────
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Outstanding Strategic Acumen!';
    if (errors >= 1 && errors <= 3) return 'Great work! Excellent grasp of global affairs.';
    if (errors >= 4 && errors <= 7) return 'Good effort! Review key treaties and reform sequences.';
    return 'Do not give up — You WILL master global diplomacy!';
  }, [errors]);

  // ─── RENDER MAIN UI ──────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans selection:bg-indigo-500 selection:text-white">
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800">
                ISC Class 11 Section B
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1 ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                    : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                }`}
              >
                <span>{difficulty === 'foundation' ? '✓' : difficulty === 'advanced' ? '★' : '⚡'}</span>
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto" role="tablist">
          {(['simulator', 'treaties', 'constitution', 'dossier'] as const).map(tab => (
            <motion.button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-label={`Switch to ${tab} tab`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 md:p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2.5 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
              Strategic Situation Briefing
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-indigo-300 flex items-start gap-2">
              <span className="text-base" aria-hidden="true">📌</span>
              <span>{SCENARIO.context}</span>
            </div>
          </div>

          <div className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Curiosity Challenge</span>
              <span className="text-xs text-slate-500">Ungraded Discovery</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-start gap-3 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-950/70 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0 mt-0.5">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <p className={`text-sm flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : '💡'}</span>
                  <span>{discoveryCorrect ? 'Spot on analysis!' : DISCOVERY_QUESTION.hintAfter}</span>
                </p>
                <motion.button
                  aria-label="Enter Interactive Exploration Lab"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Exploration Lab</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-300 font-medium">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
              </span>
            </div>
            <div className="flex gap-1" aria-label={`Step ${currentSlide + 1} of ${EXPLORATION_STEPS.length}`}>
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-indigo-500 scale-125' : idx < currentSlide ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── PREDICT-THEN-CHECK INTERACTIVE CARD ── */}
          <div className="p-4 md:p-5 bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 rounded-2xl border border-purple-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>🔮</span> Prediction & Verification (Question {activePredictionIndex + 1} of {PREDICTION_QUESTIONS.length})
              </span>
              <div className="flex gap-1">
                {PREDICTION_QUESTIONS.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      setActivePredictionIndex(pIdx);
                      setPredictionSelected(null);
                      setPredictionChecked(false);
                      audioManager.play('tap');
                    }}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      activePredictionIndex === pIdx ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Pred {pIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            <h4 className="text-sm md:text-base font-bold text-white leading-snug">
              {PREDICTION_QUESTIONS[activePredictionIndex].question}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {PREDICTION_QUESTIONS[activePredictionIndex].options.map((pOpt, pI) => (
                <button
                  key={pI}
                  onClick={() => {
                    setPredictionSelected(pI);
                    setPredictionChecked(true);
                    audioManager.play(pI === PREDICTION_QUESTIONS[activePredictionIndex].correctIndex ? 'success' : 'pop');
                  }}
                  className={`text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                    predictionChecked
                      ? pI === PREDICTION_QUESTIONS[activePredictionIndex].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : predictionSelected === pI
                        ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : predictionSelected === pI
                      ? 'bg-indigo-900/70 border-indigo-500 text-indigo-100'
                      : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-1.5">{String.fromCharCode(65 + pI)}.</span>
                  {pOpt}
                </button>
              ))}
            </div>

            {predictionChecked && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-purple-300 font-bold">
                  {predictionSelected === PREDICTION_QUESTIONS[activePredictionIndex].correctIndex ? '✓ Correct Prediction!' : '💡 Strategic Insight:'}
                </p>
                <p className="text-slate-300">{PREDICTION_QUESTIONS[activePredictionIndex].explanation}</p>
                <p className="text-amber-400 font-medium mt-1">
                  🔍 Verification Task: {PREDICTION_QUESTIONS[activePredictionIndex].verifyInstruction}
                </p>
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-amber-400 text-sm mt-1 flex items-center gap-1.5">
                    <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>
                <div className="hidden md:block">
                  <canvas ref={canvasRef} width={180} height={70} className="rounded-xl border border-slate-800 bg-slate-950" aria-label="Diplomatic tension radar monitor" />
                </div>
              </div>

              {/* Step 0: Soviet Breakdown Simulation (SVG 1) */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Brezhnev Economic Stagnation (Military/GDP %)</span>
                        <span className="text-rose-400 font-bold">{sovietStagnationLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={95}
                        aria-label="Adjust Soviet economic stagnation level"
                        value={sovietStagnationLevel}
                        onChange={e => {
                          setSovietStagnationLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Glasnost (Political Openness & Speech Freedom)</span>
                        <span className="text-indigo-400 font-bold">{glasnostFreedomLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        aria-label="Adjust Glasnost freedom level"
                        value={glasnostFreedomLevel}
                        onChange={e => {
                          setGlasnostFreedomLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Republican Nationalism (Baltic/Caucasus/Ukraine)</span>
                        <span className="text-amber-400 font-bold">{nationalistSurgeLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        aria-label="Adjust Republican nationalism surge level"
                        value={nationalistSurgeLevel}
                        onChange={e => {
                          setNationalistSurgeLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-400">Union Central Authority:</span>
                        <span className={calculatedUnionIntegrity > 40 ? 'text-emerald-400' : 'text-rose-400'}>
                          {calculatedUnionIntegrity > 40 ? '✓ ' : '✗ '}
                          {calculatedUnionIntegrity}% ({calculatedUnionIntegrity > 40 ? 'Surviving Federation' : 'Dissolution Imminent!'})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${calculatedUnionIntegrity > 40 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          animate={{ width: `${calculatedUnionIntegrity}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TOPIC SPECIFIC SVG 1: Soviet Dissolution Architecture */}
                  <div className="lg:col-span-7 flex flex-col justify-center items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-label="Diagram showing Soviet central authority and 4 republican clusters">
                      <circle cx="180" cy="100" r={calculatedUnionIntegrity > 30 ? '34' : '22'} fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
                      <text x="180" y="98" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        {calculatedUnionIntegrity > 30 ? 'USSR (Moscow)' : 'Kremlin (1991)'}
                      </text>
                      <text x="180" y="112" textAnchor="middle" fill="#a5b4fc" fontSize="8">
                        {calculatedUnionIntegrity > 30 ? 'CPSU Centre' : 'Dissolved!'}
                      </text>

                      {[
                        { name: 'Baltic 3', cx: 80, cy: 50, color: '#38bdf8', detached: calculatedUnionIntegrity < 70 },
                        { name: 'Slavic (Ukr/Bel)', cx: 280, cy: 50, color: '#f59e0b', detached: calculatedUnionIntegrity < 50 },
                        { name: 'Caucasus 3', cx: 80, cy: 150, color: '#ec4899', detached: calculatedUnionIntegrity < 40 },
                        { name: 'Central Asia 5', cx: 280, cy: 150, color: '#10b981', detached: calculatedUnionIntegrity < 30 },
                      ].map((grp, i) => (
                        <g key={i}>
                          <line
                            x1="180"
                            y1="100"
                            x2={grp.cx}
                            y2={grp.cy}
                            stroke={grp.detached ? '#334155' : '#6366f1'}
                            strokeDasharray={grp.detached ? '4,4' : 'none'}
                            strokeWidth="1.5"
                          />
                          <circle cx={grp.cx} cy={grp.cy} r="22" fill={grp.detached ? '#0f172a' : grp.color} stroke={grp.color} strokeWidth="2" />
                          <text x={grp.cx} y={grp.cy + 3} textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                            {grp.name}
                          </text>
                        </g>
                      ))}
                    </svg>
                    <span className="text-xs text-slate-400 mt-2 text-center">
                      {calculatedUnionIntegrity < 30
                        ? '⚡ Belovezha Accords (8 Dec 1991) & Alma-Ata Protocol: 15 independent nations established!'
                        : 'Drag sliders to simulate Brezhnev stagnation + Glasnost surge.'}
                    </span>
                  </div>
                </div>
              )}

              {/* Step 1: US Unilateralism Lab */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'desert_storm', label: 'Operation Desert Storm (1991)', tag: 'Multilateral' },
                      { id: 'iraqi_freedom', label: 'Operation Iraqi Freedom (2003)', tag: 'Unilateral' },
                      { id: 'enduring_freedom', label: 'Operation Enduring Freedom (2001)', tag: 'Afghanistan' },
                    ].map(op => (
                      <motion.button
                        key={op.id}
                        aria-label={`Select ${op.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedOperation(op.id as any);
                          audioManager.play('tap');
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedOperation === op.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {op.label} <span className="opacity-70 text-[10px]">({op.tag})</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">UNSC Legal Mandate</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {selectedOperation === 'desert_storm'
                          ? '✓ UNSC Res 678 (Chapter VII "all necessary means")'
                          : selectedOperation === 'iraqi_freedom'
                          ? '✗ No fresh UNSC authorization (Res 1441 only warned)'
                          : '✓ UNSC Res 1368 & 1373 (Right to Self-Defence)'}
                      </p>
                    </div>
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Coalition Composition</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {selectedOperation === 'desert_storm'
                          ? '34 Nations (incl. Arab League members Syria & Egypt)'
                          : selectedOperation === 'iraqi_freedom'
                          ? 'US, UK, Australia (Opposed by France, Germany, Russia, India)'
                          : 'US, NATO Allies (Article 5 invoked), Northern Alliance'}
                      </p>
                    </div>
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Indian Official Stance</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {selectedOperation === 'desert_storm'
                          ? 'Supported UN action; evacuated 1.7 lakh citizens from Kuwait'
                          : selectedOperation === 'iraqi_freedom'
                          ? 'Parliament deplored unilateral action; rejected troop dispatch'
                          : 'Supported Karzai interim authority; invested $3B in infrastructure'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Regional Blocs Architecture (SVG 2) */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {(['asean', 'eu', 'saarc', 'brics', 'quad'] as const).map(b => (
                        <motion.button
                          key={b}
                          aria-label={`Select regional bloc ${b.toUpperCase()}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedBloc(b);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            selectedBloc === b
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      {selectedBloc === 'asean' && (
                        <div>
                          <h4 className="text-sm font-bold text-purple-300">ASEAN (Association of Southeast Asian Nations)</h4>
                          <p className="text-xs text-slate-300 mt-1">
                            Founded 8 August 1967 (Bangkok Declaration) with 5 founders, now 10 members. Key achievements: AFTA (1992), AEC (2015), and India-ASEAN FTA. Principle: "The ASEAN Way" (consensus & non-interference).
                          </p>
                        </div>
                      )}
                      {selectedBloc === 'eu' && (
                        <div>
                          <h4 className="text-sm font-bold text-purple-300">European Union (EU)</h4>
                          <p className="text-xs text-slate-300 mt-1">
                            Evolved from 1957 Treaty of Rome to 1992 Maastricht Treaty (27 members post-Brexit). Key achievements: Single currency (Euro in 20 states), Schengen border-free travel, Common Market of 440M citizens.
                          </p>
                        </div>
                      )}
                      {selectedBloc === 'saarc' && (
                        <div>
                          <h4 className="text-sm font-bold text-purple-300">SAARC (South Asian Association for Regional Cooperation)</h4>
                          <p className="text-xs text-slate-300 mt-1">
                            Established 8 Dec 1985 (Dhaka Charter). Key trade mechanisms: SAPTA (1993) & SAFTA (2004/06). Constraint: Article X bans bilateral issues, freezing summits after Uri (2016).
                          </p>
                        </div>
                      )}
                      {selectedBloc === 'brics' && (
                        <div>
                          <h4 className="text-sm font-bold text-purple-300">BRICS (Brazil, Russia, India, China, South Africa)</h4>
                          <p className="text-xs text-slate-300 mt-1">
                            Launched 2009 at Yekaterinburg. Key financial architecture: New Development Bank ($100B capital, Shanghai) & Contingent Reserve Arrangement established at Fortaleza (2014).
                          </p>
                        </div>
                      )}
                      {selectedBloc === 'quad' && (
                        <div>
                          <h4 className="text-sm font-bold text-purple-300">QUAD (Quadrilateral Security Dialogue)</h4>
                          <p className="text-xs text-slate-300 mt-1">
                            Maritime democracies: India, Australia, Japan, USA. Revived 2017. Mission: Free and open Indo-Pacific, supply chain resilience, and maritime domain awareness.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TOPIC SPECIFIC SVG 2: Regional Cooperation Network & Integration Depth */}
                  <div className="lg:col-span-7 flex flex-col justify-center items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-label="Diagram of regional multilateral organizations compared by integration depth">
                      <rect x="10" y="10" width="340" height="180" rx="12" fill="#0b0f19" stroke="#334155" strokeWidth="1" />
                      {/* Depth Axis */}
                      <line x1="40" y1="160" x2="330" y2="160" stroke="#475569" strokeWidth="1.5" />
                      <line x1="40" y1="160" x2="40" y2="30" stroke="#475569" strokeWidth="1.5" />
                      <text x="330" y="175" textAnchor="end" fill="#94a3b8" fontSize="8">Economic & Trade Integration →</text>
                      <text x="45" y="35" textAnchor="start" fill="#94a3b8" fontSize="8">↑ Supranational Pooling</text>

                      {/* Nodes */}
                      {[
                        { id: 'eu', name: 'EU (Supranational)', cx: 290, cy: 55, r: 24, fill: '#6366f1' },
                        { id: 'asean', name: 'ASEAN (Consensus)', cx: 220, cy: 110, r: 20, fill: '#8b5cf6' },
                        { id: 'brics', name: 'BRICS (Multipolar)', cx: 160, cy: 125, r: 18, fill: '#ec4899' },
                        { id: 'quad', name: 'QUAD (Indo-Pacific)', cx: 120, cy: 135, r: 16, fill: '#06b6d4' },
                        { id: 'saarc', name: 'SAARC (South Asia)', cx: 75, cy: 145, r: 14, fill: '#f59e0b' },
                      ].map(item => (
                        <g key={item.id} className={selectedBloc === item.id ? 'opacity-100 scale-105' : 'opacity-70'}>
                          <circle cx={item.cx} cy={item.cy} r={item.r} fill={item.fill} stroke={selectedBloc === item.id ? '#ffffff' : '#1e293b'} strokeWidth={selectedBloc === item.id ? '2.5' : '1'} />
                          <text x={item.cx} y={item.cy + 3} textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                            {item.name.split(' ')[0]}
                          </text>
                        </g>
                      ))}
                    </svg>
                    <span className="text-[11px] text-slate-400 mt-2 text-center">
                      Comparison of Supranational Pooling (EU highest) vs Sovereign Intergovernmental Dialogue (ASEAN/BRICS/QUAD).
                    </span>
                  </div>
                </div>
              )}

              {/* Step 3: Indo-Pak Conflict & Treaties Timeline */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: '1965', label: '1965 War & Tashkent' },
                      { id: '1971', label: '1971 War & Shimla' },
                      { id: '1999_lahore', label: '1999 Lahore Bus Yatra' },
                      { id: '1999_kargil', label: '1999 Kargil Vijay' },
                    ].map(t => (
                      <motion.button
                        key={t.id}
                        aria-label={`Select timeline event ${t.label}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedTimelineNode(t.id as any);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedTimelineNode === t.id
                            ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    {selectedTimelineNode === '1965' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">1965 War & Tashkent Agreement (10 Jan 1966)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Triggered by Pakistan’s Operation Gibraltar. Shastri counter-attacked across Punjab towards Lahore. The Tashkent Agreement was mediated by Soviet Premier Alexei Kosygin — restoring status quo ante. Shastri tragically passed away hours later.
                        </p>
                      </div>
                    )}
                    {selectedTimelineNode === '1971' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">1971 Bangladesh Liberation & Shimla Agreement (2 July 1972)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Pakistan’s Operation Searchlight forced 10M refugees into India. India intervened; 93,000 Pakistani soldiers surrendered on 16 Dec 1971. Indira Gandhi & Z.A. Bhutto signed the Shimla Agreement, establishing the Line of Control (LoC) and strict bilateralism.
                        </p>
                      </div>
                    )}
                    {selectedTimelineNode === '1999_lahore' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">Lahore Declaration (21 Feb 1999)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Prime Minister A.B. Vajpayee rode the historic Delhi-Lahore peace bus to meet Nawaz Sharif. Both nuclear-armed states signed landmark confidence-building measures (CBMs) and pledged mutual security.
                        </p>
                      </div>
                    )}
                    {selectedTimelineNode === '1999_kargil' && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-300">Kargil Conflict & Operation Vijay (May-July 1999)</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Pakistani Northern Light Infantry infiltrated heights in Dras, Kargil, and Batalik. India launched Operation Vijay & IAF Operation Safed Sagar. India restrained forces from crossing the LoC, securing total victory by 26 July 1999 (Kargil Vijay Diwas).
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Eastern Frontiers & Panchsheel (SVG 3) */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-sky-400 uppercase">Farakka Barrage (1996 Ganga Treaty)</span>
                        <span className="text-xs text-white font-mono">{farakkaDischarge.toLocaleString()} cusecs</span>
                      </div>
                      <input
                        type="range"
                        min={20000}
                        max={75000}
                        step={1000}
                        aria-label="Simulate Ganga river water discharge at Farakka Barrage"
                        value={farakkaDischarge}
                        onChange={e => {
                          setFarakkaDischarge(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-sky-500 cursor-pointer"
                      />

                      {/* TOPIC SPECIFIC SVG 3: Farakka Barrage & Ganga Water Sharing Hydro-Diagram */}
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <svg viewBox="0 0 300 80" className="w-full h-auto" aria-label="Hydrographic flow split at Farakka Barrage into Bhagirathi-Hooghly and Padma rivers">
                          <path d="M 20 40 Q 90 40 140 40" stroke="#38bdf8" strokeWidth="8" fill="none" />
                          <circle cx="140" cy="40" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                          <text x="140" y="43" textAnchor="middle" fill="#f59e0b" fontSize="7" fontWeight="bold">BARRAGE</text>
                          {/* Hooghly branch */}
                          <path d="M 148 35 Q 200 20 280 15" stroke="#0ea5e9" strokeWidth="4" fill="none" />
                          <text x="280" y="10" textAnchor="end" fill="#bae6fd" fontSize="7">Hooghly (Kolkata Port)</text>
                          {/* Padma branch */}
                          <path d="M 148 45 Q 200 60 280 65" stroke="#0284c7" strokeWidth="6" fill="none" />
                          <text x="280" y="75" textAnchor="end" fill="#bae6fd" fontSize="7">Padma (Bangladesh Agriculture)</text>
                        </svg>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        The 1996 Ganga Water Treaty guarantees 30-year formula-based lean season flows (Jan-May) between West Bengal and Bangladesh.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400 uppercase">Panchsheel (29 April 1954)</span>
                        <span className="text-xs text-slate-400">Principle {panchsheelPrincipleIndex + 1}/5</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-bold text-emerald-300">
                        {[
                          '1. Mutual respect for territorial integrity and sovereignty',
                          '2. Mutual non-aggression',
                          '3. Mutual non-interference in each other’s internal affairs',
                          '4. Equality and mutual benefit',
                          '5. Peaceful coexistence',
                        ][panchsheelPrincipleIndex]}
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        {[0, 1, 2, 3, 4].map(idx => (
                          <button
                            key={idx}
                            aria-label={`Select Panchsheel principle ${idx + 1}`}
                            onClick={() => {
                              setPanchsheelPrincipleIndex(idx);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-1 text-[10px] font-bold rounded-md ${
                              panchsheelPrincipleIndex === idx ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            P{idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── OBSERVATION CHECK ('WHAT DO YOU NOTICE?') ── */}
              <div className="p-4 bg-gradient-to-r from-sky-950/60 via-slate-900 to-slate-950 rounded-2xl border border-sky-800/60 space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>👁️</span> Observation Challenge: What do you notice? (Question {activeObservationIndex + 1} of {OBSERVATION_QUESTIONS.length})
                  </span>
                  <div className="flex gap-1">
                    {OBSERVATION_QUESTIONS.map((_, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setActiveObservationIndex(oIdx);
                          setObservationSelected(null);
                          setObservationChecked(false);
                          audioManager.play('tap');
                        }}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          activeObservationIndex === oIdx ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Obs {oIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs md:text-sm font-bold text-white">
                  {OBSERVATION_QUESTIONS[activeObservationIndex].question}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[activeObservationIndex].observableOptions.map((obsOpt, obsI) => (
                    <button
                      key={obsI}
                      onClick={() => {
                        setObservationSelected(obsI);
                        setObservationChecked(true);
                        audioManager.play(obsI === OBSERVATION_QUESTIONS[activeObservationIndex].correctIndex ? 'success' : 'pop');
                      }}
                      className={`text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                        observationChecked
                          ? obsI === OBSERVATION_QUESTIONS[activeObservationIndex].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : observationSelected === obsI
                            ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          : observationSelected === obsI
                          ? 'bg-sky-900/70 border-sky-500 text-sky-100'
                          : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + obsI)}.</span>
                      {obsOpt}
                    </button>
                  ))}
                </div>

                {observationChecked && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <p className="text-sky-300 font-bold mb-0.5">
                      {observationSelected === OBSERVATION_QUESTIONS[activeObservationIndex].correctIndex ? '✓ Spot-on Observation!' : '🔍 Strategic Observation:'}
                    </p>
                    <p className="text-slate-300">{OBSERVATION_QUESTIONS[activeObservationIndex].explanation}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-bold text-slate-500">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Launch sandbox mode"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Launch Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: UNGRADED SANDBOX / FREE PLAY ───────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-emerald-800/60">
            <h3 className="text-lg font-bold text-emerald-300">Geopolitical Sandbox & Strategic War Room</h3>
            <p className="text-slate-300 text-xs mt-1">
              Feel free to adjust systemic variables with zero grading pressure. Observe how unipolarity, regionalism, and bilateral friction interact!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Global Unipolar Concentration Index (US Hegemony)</span>
                  <span className="text-indigo-400 font-bold">{unipolarPowerBalance}%</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={100}
                  aria-label="Adjust Global Unipolar Concentration Index"
                  value={unipolarPowerBalance}
                  onChange={e => {
                    setUnipolarPowerBalance(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 font-bold uppercase">Systemic Prediction:</span>
                <p className="text-indigo-200">
                  {unipolarPowerBalance > 75
                    ? '⚡ High Unipolar Hegemony: Middle powers form regional coalitions (EU, ASEAN, BRICS) to protect strategic autonomy.'
                    : '🌐 Multi-polar Balance: Fragmented alliances with high issue-based flexibility (India multi-aligning across QUAD and BRICS).'}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-3xl mb-2" aria-hidden="true">{unipolarPowerBalance > 75 ? '🦅' : '🌍'}</span>
              <h4 className="text-sm font-bold text-white">
                {unipolarPowerBalance > 75 ? 'Unipolar Moment (1991–2008)' : 'Emerging Multipolarity (Present)'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                India balances strategic autonomy under Article 51 through Quad, BRICS, and Act East Policy.
              </p>
            </div>
          </div>

          <motion.button
            aria-label="Ready for Challenges"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            Ready for Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE CHALLENGES (24 QUESTIONS) ──────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-indigo-400 font-mono uppercase tracking-wider">
                NEP: {currentChallengeObj.competencyLevel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Errors: {errors}</span>
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden" aria-label={`Progress: ${currentChallenge + 1} of ${filteredChallenges.length}`}>
                <motion.div
                  className="h-full bg-indigo-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Challenge Box */}
          <motion.div
            key={currentChallengeObj.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.3 }}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800">
                Node {currentChallengeObj.nodeId}
              </span>
              <span className="text-xs text-slate-500 capitalize">{currentChallengeObj.type} question</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed mb-4">
              {currentChallengeObj.question}
            </h3>

            {/* MCQ / Classify / Distinguish / Match */}
            {(currentChallengeObj.type === 'classify' ||
              currentChallengeObj.type === 'distinguish' ||
              currentChallengeObj.type === 'match') &&
              currentChallengeObj.options && (
                <div className="space-y-2.5">
                  {currentChallengeObj.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-start gap-3 border ${
                        showExplanation
                          ? i === currentChallengeObj.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-950/70 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0 mt-0.5">
                        {showExplanation && i === currentChallengeObj.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Challenge */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-sm"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'reg_baltic', title: '1. Baltic Cluster' },
                    { id: 'reg_central_asia', title: '2. Central Asian Cluster' },
                    { id: 'reg_caucasus', title: '3. Caucasus Corridor' },
                    { id: 'reg_slavic', title: '4. Slavic/European Heart' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      aria-label={`Target container for ${target.title}`}
                      className="p-3.5 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[75px]"
                    >
                      <span className="text-xs font-bold text-slate-400">{target.title}</span>
                      <div className="text-xs font-bold text-indigo-300 mt-1">
                        {droppedLabels[target.id] ? (
                          <span className="text-emerald-400">✓ {droppedLabels[target.id]}</span>
                        ) : (
                          <span className="text-slate-600 italic">[Drop matching cluster here]</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged mapping"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Mapping
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click arrows to reorder chronologically:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeObj.sortItems.length
                    ? sortArrangement.map(idx => currentChallengeObj.sortItems![idx])
                    : currentChallengeObj.sortItems
                  ).map((item, displayIdx) => (
                    <div
                      key={displayIdx}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="font-bold text-indigo-400 mr-2">{displayIdx + 1}.</span>
                      <span className="flex-1">{item}</span>
                      <div className="flex gap-1">
                        <button
                          aria-label={`Move item ${displayIdx + 1} up`}
                          onClick={() => handleSortMove(displayIdx, Math.max(0, displayIdx - 1))}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                        >
                          ▲
                        </button>
                        <button
                          aria-label={`Move item ${displayIdx + 1} down`}
                          onClick={() =>
                            handleSortMove(
                              displayIdx,
                              Math.min(currentChallengeObj.sortItems!.length - 1, displayIdx + 1)
                            )
                          }
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  aria-label="Verify chronological order"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(sortArrangement)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Chronology
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Enter numerical factor"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter multiplier value"
                    className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <span className="text-xs text-slate-400 font-bold">{currentChallengeObj.unit}</span>
                  <motion.button
                    aria-label="Submit calculated factor"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('tap');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-200 border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Assembled Causal Chain:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {constructParts.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 text-indigo-300 text-xs rounded-md flex items-center gap-1.5"
                      >
                        <span>{idx + 1}. {p}</span>
                        <button
                          aria-label={`Remove part ${p}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600 italic">Click parts above to assemble sequence</span>
                    )}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify assembled causal model"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-40"
                >
                  Verify Causal Model
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 md:p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Step-by-Step Strategic Analysis
                  </span>
                  <span className="text-xs text-amber-400/70">
                    Step {revealedSteps + 1} of{' '}
                    {
                      currentChallengeObj.explanation
                        .split('. ')
                        .filter(s => s.trim().length > 0).length
                    }
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentChallengeObj.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  currentChallengeObj.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0).length -
                    1 ? (
                    <motion.button
                      aria-label="Reveal next explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >=
                    currentChallengeObj.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0).length -
                      1 && (
                    <motion.button
                      aria-label="Proceed to next strategic challenge"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment 🏆' : 'Next Strategic Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTIONS ───────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-800 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-3xl mx-auto"
              aria-hidden="true"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Strategic Simulation Complete!</h2>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div>
                <span className="text-slate-400 block text-xs">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400 block text-xs">BKT Mastery Status</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className={`p-4 md:p-5 rounded-2xl border text-sm font-bold flex items-center gap-2 ${
            errors === 0
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
              : errors <= 3
              ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300'
              : errors <= 7
              ? 'bg-amber-950/60 border-amber-500 text-amber-300'
              : 'bg-rose-950/60 border-rose-500 text-rose-300'
          }`}>
            <span>{errors === 0 ? '🌟' : errors <= 3 ? '✨' : errors <= 7 ? '👍' : '💪'}</span>
            <span>{motivationalMessage}</span>
          </div>

          {/* ── SPACED REPETITION VISIBILITY SCHEDULE ── */}
          <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 rounded-2xl border border-indigo-700/60 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>📅</span> Spaced Repetition Memory Retention Schedule (SM-2 SRS)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-900 border border-indigo-600 font-mono text-indigo-200">
                SRS Interval: {srsIntervalDays} {srsIntervalDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Recommended Next Review</span>
                <p className="text-sm md:text-base font-black text-emerald-400 mt-0.5">
                  Review in {srsIntervalDays} {srsIntervalDays === 1 ? 'day' : 'days'} ({srsNextDateStr})
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {errors === 0
                    ? '0 errors: Optimal 7-day retention interval for long-term memory!'
                    : errors <= 3
                    ? '1–3 errors: 3-day review suggested to solidify treaty distinctions.'
                    : '4+ errors: 1-day quick revisit advised to eliminate foundational misconceptions.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">SM-2 Ease Factor</span>
                <p className="text-sm md:text-base font-black text-indigo-400 mt-0.5">
                  {errors === 0 ? '2.60 (High Stability)' : errors <= 3 ? '2.50 (Standard)' : '2.35 (Reinforcing)'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tracks neural decay rate across USSR disintegration, US hegemony, and South Asian bilateral treaties.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Targeted Nodes Tracked</span>
                <p className="text-sm md:text-base font-black text-purple-400 mt-0.5">
                  8 / 8 Syllabus Topics
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  All 8 ISC nodes updated in your personal spaced repetition study queue.
                </p>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <span>💭</span> Reflection & Critical Thinking
            </h3>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding of international diplomacy and grand strategy:
            </p>

            <div className="space-y-4 pt-1">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={e => setReflections(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How lifting censorship without economic reform accelerated Soviet collapse, or the strict bilateral doctrine of the Shimla Agreement..."
                  aria-label="Reflection on the most surprising thing you learned"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={e => setReflections(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g., International order is like a balance of power: when one superpower fell, new regional teams formed to balance influence..."
                  aria-label="Reflection on how to explain this topic to a friend"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={e => setReflections(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., Analyzing modern news regarding QUAD maritime drills, UN resolutions, and Indo-Pacific supply chains..."
                  aria-label="Reflection on real life applications"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold">✗ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium mt-1">✓ Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm md:text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-indigo-400 mr-1.5">{idx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── GLOBAL FEEDBACK OVERLAYS ─────────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PoliticalScienceDisintegrationSovietUnionSim;