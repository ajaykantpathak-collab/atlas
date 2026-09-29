'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC SYLLABUS NODE LITERALS (MANDATORY VERIFICATION CONSTANTS) ───
const NODE_C12_HIST_051 = 'c12_hist_051';
const NODE_C12_HIST_052 = 'c12_hist_052';
const NODE_C12_HIST_053 = 'c12_hist_053';
const NODE_C12_HIST_054 = 'c12_hist_054';
const NODE_C12_HIST_055 = 'c12_hist_055';
const NODE_C12_HIST_056 = 'c12_hist_056';
const NODE_C12_HIST_057 = 'c12_hist_057';
const NODE_C12_HIST_058 = 'c12_hist_058';
const NODE_C12_HIST_059 = 'c12_hist_059';
const NODE_C12_HIST_060 = 'c12_hist_060';
const NODE_C12_HIST_061 = 'c12_hist_061';

const ALL_NODE_IDS = [
  NODE_C12_HIST_051,
  NODE_C12_HIST_052,
  NODE_C12_HIST_053,
  NODE_C12_HIST_054,
  NODE_C12_HIST_055,
  NODE_C12_HIST_056,
  NODE_C12_HIST_057,
  NODE_C12_HIST_058,
  NODE_C12_HIST_059,
  NODE_C12_HIST_060,
  NODE_C12_HIST_061,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Global Struggle for Civil Rights & Self-Determination (1945–1995)',
  intro: 'You are an investigative diplomatic historian analysing twentieth-century freedom struggles across three global epicentres: African American Civil Rights & Second-Wave Feminism in the United States, the Anti-Apartheid movement in South Africa, and the Arab-Israeli conflict in the Levant.',
  context: 'Explore how grassroots direct action, strategic nonviolent civil disobedience, geopolitical Cold War pressures, and imperial betrayals shaped modern constitutional democracy and international diplomacy.',
};

// ─── DISCOVERY HOOK QUESTION (Curiosity-building, non-graded) ───
const DISCOVERY_QUESTION = {
  question: 'In May 1963, televised broadcasts in Birmingham, Alabama, showed Police Chief "Bull" Connor unleashing attack dogs and firehoses on children. Why did this directly panic President John F. Kennedy into drafting federal civil rights legislation?',
  options: [
    'Purely out of a private moral conversion after watching evening television.',
    'Soviet diplomats immediately displayed the horrific photographs at the UN to destroy US moral claims to lead the "Free World".',
    'The US Supreme Court threatened to impeach the President unless he acted within 48 hours.',
    'Southern segregationist governors requested federal troops to enforce school integration.',
  ],
  correctIndex: 1,
  hintAfter: 'Geopolitics and visual media intersected! The Cold War forced Washington to confront domestic apartheid to preserve its international legitimacy.',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall - c12_hist_051
  {
    id: 'ch_051_1',
    nodeId: NODE_C12_HIST_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which landmark 1954 US Supreme Court ruling overturned the 1896 "separate but equal" doctrine of Plessy v. Ferguson in public education?',
    options: [
      'Brown v. Board of Education of Topeka',
      'Browder v. Gayle',
      'Dred Scott v. Sandford',
      'Roe v. Wade',
    ],
    correctIndex: 0,
    explanation: 'Brown v. Board of Education (1954), argued by Thurgood Marshall, unanimously declared that separate educational facilities are inherently unequal under the 14th Amendment.',
    hints: [
      'Think of the pivotal school desegregation case from Topeka, Kansas.',
      'It was led by Chief Justice Earl Warren and NAACP counsel Thurgood Marshall.',
      'The case is Brown v. Board of Education (1954).',
    ],
    misconceptionIndex: 5,
  },
  // 2. Foundation - Understanding - c12_hist_053
  {
    id: 'ch_053_1',
    nodeId: NODE_C12_HIST_053,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each foundational Apartheid pillar statute with its specific repressive mechanism.',
    dragItems: [
      { label: 'Population Registration Act (1950)', targetId: 'target_four_races' },
      { label: 'Group Areas Act (1950)', targetId: 'target_forced_removals' },
      { label: 'Bantu Education Act (1953)', targetId: 'target_menial_labour' },
    ],
    correctMapping: {
      target_four_races: 'Population Registration Act (1950)',
      target_forced_removals: 'Group Areas Act (1950)',
      target_menial_labour: 'Bantu Education Act (1953)',
    },
    explanation: 'The 1950 Population Registration Act classified four rigid races; Group Areas Act engineered forced urban removals (e.g. District Six); Bantu Education Act aimed to prepare Black South Africans only for menial manual labour.',
    hints: [
      'Which act sorted citizens into White, Black, Coloured, and Indian on ID cards?',
      'Which act bulldozed suburbs like District Six to create segregated residential zones?',
      'Verwoerd designed Bantu Education specifically to restrict Black career aspirations to manual work.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Recall - c12_hist_055
  {
    id: 'ch_055_1',
    nodeId: NODE_C12_HIST_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was "the problem that has no name" identified in Betty Friedan\'s 1963 bestseller "The Feminine Mystique"?',
    options: [
      'The denial of women\'s voting rights under the 19th Amendment',
      'The pervasive, unarticulated dissatisfaction of educated middle-class suburban housewives confined exclusively to domesticity',
      'The lack of maternity benefits for female agricultural labourers in the American South',
      'The military draft of women during the Vietnam War',
    ],
    correctIndex: 1,
    explanation: 'Betty Friedan surveyed Smith College graduates and diagnosed the psychological emptiness experienced by post-war suburban housewives trapped in prescribed domestic roles.',
    hints: [
      'Consider post-WWII suburban culture and media advertising targeted at American homemakers.',
      'It affected educated women told that marriage and childcare were their sole life goals.',
      'Friedan described the quiet despair of middle-class housewives in Levittown-style suburbs.',
    ],
    misconceptionIndex: 4,
  },
  // 4. Foundation - Understanding - c12_hist_057
  {
    id: 'ch_057_1',
    nodeId: NODE_C12_HIST_057,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How did the 1917 Balfour Declaration refer to the Arab majority (approx. 90%) living in Palestine at the time?',
    options: [
      'As the sovereign Arab nation entitled to self-determination',
      'As equal co-founders of a binational democratic state',
      'As "existing non-Jewish communities" granted civil and religious safeguards, but denied national or political rights',
      'As Ottoman prisoners of war requiring League of Nations repatriation',
    ],
    correctIndex: 2,
    explanation: 'Foreign Secretary Balfour deliberately reduced the 90% Arab majority to "existing non-Jewish communities," recognising only civil and religious rights while omitting any political or national self-determination.',
    hints: [
      'Look at how the text defines the majority by what they are NOT.',
      'Did the letter grant Arabs political/national rights or merely civil/religious ones?',
      'The exact quote is "civil and religious rights of existing non-Jewish communities in Palestine."',
    ],
    misconceptionIndex: 4,
  },
  // 5. Foundation - Recall - c12_hist_058
  {
    id: 'ch_058_1',
    nodeId: NODE_C12_HIST_058,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What percentage of Mandate Palestine did the 1947 UN Partition Plan (Res 181) allocate to the Jewish state, despite Jews constituting approximately 33% of the population?',
    correctAnswer: 56,
    tolerance: 1,
    unit: '%',
    explanation: 'UN Resolution 181 allocated ~56% of Palestine to the proposed Jewish state, ~43% to the Arab state, and designated Jerusalem as an international corpus separatum.',
    hints: [
      'The allocation was over half the total territory.',
      'It gave the Jewish minority 56% of the land area.',
      'Enter 56.',
    ],
  },
  // 6. Foundation - Recall - c12_hist_060
  {
    id: 'ch_060_1',
    nodeId: NODE_C12_HIST_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who convened the Palestine Liberation Organisation (PLO) in January 1964, and who served as its first Chairman?',
    options: [
      'Yasser Arafat and Fatah guerrillas in Kuwait',
      'The Arab League Cairo Summit, appointing diplomat Ahmed Shukeiri',
      'The United Nations General Assembly in Geneva',
      'Hamas founder Sheikh Ahmed Yassin in Gaza',
    ],
    correctIndex: 1,
    explanation: 'The PLO was created top-down by the Arab League at its January 1964 Cairo Summit to control Palestinian militancy, with Ahmed Shukeiri appointed as its first Chairman.',
    hints: [
      'It was not originally a grassroots organisation but created by Arab heads of state.',
      'Its first leader was a seasoned diplomat, not a fedayeen commander.',
      'The Arab League selected Ahmed Shukeiri in 1964.',
    ],
    misconceptionIndex: 0,
  },
  // 7. Foundation - Understanding - c12_hist_059
  {
    id: 'ch_059_1',
    nodeId: NODE_C12_HIST_059,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange these four pivotal Middle Eastern conflicts and peace milestones in strict chronological sequence.',
    sortItems: [
      'Suez Crisis (Tripartite Aggression)',
      'Six Day War (Operation Focus)',
      'Yom Kippur War (Crossing the Bar Lev Line)',
      'Camp David Peace Treaty (Begin & Sadat)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The unbroken causal chain runs: Suez Crisis (1956) → Six Day War (1967) → Yom Kippur War (1973) → Camp David Peace Treaty (1979).',
    hints: [
      'Nasser nationalised the Suez Canal in 1956.',
      'Israel captured Sinai, Golan, and the West Bank in 1967.',
      'Sadat surprise-attacked on Yom Kippur in 1973 before signing peace in 1979.',
    ],
  },
  // 8. Standard - Analysis - c12_hist_052
  {
    id: 'ch_052_1',
    nodeId: NODE_C12_HIST_052,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyse the fundamental legal and structural distinction between the Civil Rights Act of 1964 and the Voting Rights Act of 1965.',
    options: [
      '1964 addressed private housing loans; 1965 desegregated interstate transport.',
      '1964 dismantled de jure segregation in public accommodations & employment (Titles II/VII); 1965 abolished literacy tests & mandated federal election preclearance (Section 5).',
      '1964 applied only to northern industrial cities; 1965 applied solely to Mississippi.',
      '1964 established the Black Panther Party; 1965 established the SCLC under Dr. King.',
    ],
    correctIndex: 1,
    explanation: 'The Civil Rights Act of 1964 targeted public accommodation segregation and hiring discrimination (EEOC); the Voting Rights Act of 1965 dismantled disenfranchisement mechanisms via federal registrars and Section 5 preclearance.',
    hints: [
      'One act dealt with public lunch counters and job applications; the other with polling booths and literacy tests.',
      'Notice the difference between ending physical segregation vs guaranteeing the ballot.',
      'The 1964 Act banned accommodation/job bias; the 1965 Act banned literacy tests and enforced preclearance.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Application - c12_hist_053
  {
    id: 'ch_053_2',
    nodeId: NODE_C12_HIST_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Following the 21 March 1960 Sharpeville Massacre (69 peaceful anti-pass protesters killed), what crucial strategic transition did Nelson Mandela make in December 1961?',
    options: [
      'He abandoned all political activity and went into permanent European exile.',
      'He formed the Black Consciousness Movement alongside Steve Biko.',
      'He co-founded Umkhonto we Sizwe ("Spear of the Nation") to launch targeted sabotage against state infrastructure.',
      'He accepted the Bantustan self-government constitution for the Transkei.',
    ],
    correctIndex: 2,
    explanation: 'Sharpeville proved that the apartheid regime would shoot unarmed protesters; with the ANC banned in April 1960, Mandela founded MK on 16 Dec 1961 to conduct sabotage against government property as a last resort.',
    hints: [
      'When lawful, nonviolent protest was criminalised by lethal state violence, the ANC went underground.',
      'Mandela explained this strategic pivot from the dock in his 1964 Rivonia Trial speech.',
      'He co-founded Umkhonto we Sizwe (MK) for sabotage.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Analysis - c12_hist_054
  {
    id: 'ch_054_1',
    nodeId: NODE_C12_HIST_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did President F.W. de Klerk unban the ANC and release Nelson Mandela on 11 February 1990?',
    options: [
      'Solely due to a sudden spiritual awakening within the Dutch Reformed Church.',
      'A pragmatic strategic retreat caused by internal ungovernability (township revolts), economic sanctions/capital flight, and the loss of anti-communist justification after the USSR collapsed.',
      'Because the South African military was completely defeated on the battlefield by MK guerrillas.',
      'Because the United Nations threatened a direct military invasion under Chapter VII.',
    ],
    correctIndex: 1,
    explanation: 'De Klerk acted out of pragmatic necessity: corporate disinvestment, UN Resolution 418 arms embargo, township insurrections, and the 1989 fall of the Berlin Wall removed Pretoria\'s anti-communist pretext.',
    hints: [
      'Consider the convergence of economic bankruptcy, township revolts, and global Cold War shifts.',
      'Was it moral magnanimity or structural sustainability?',
      'It was a pragmatic strategic retreat to negotiate while the regime still held bargaining power.',
    ],
    misconceptionIndex: 2,
  },
  // 11. Standard - Application - c12_hist_055
  {
    id: 'ch_055_2',
    nodeId: NODE_C12_HIST_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did Phyllis Schlafly\'s STOP ERA campaign successfully halt the ratification of the Equal Rights Amendment by the 1982 deadline?',
    options: [
      'By challenging the amendment\'s constitutionality in the US Supreme Court.',
      'By framing the ERA as a direct threat that would strip women of protective labour laws, subject them to the military draft, and mandate unisex public toilets.',
      'By convincing NOW leaders to merge with the Black Panther Party.',
      'By proving that Title VII of the 1964 Civil Rights Act was unconstitutional.',
    ],
    correctIndex: 1,
    explanation: 'Schlafly mobilised conservative suburban and religious women by arguing the ERA would eliminate female privileges: alimony, exemptions from military combat, and protective labour legislation.',
    hints: [
      'Look at how Schlafly reframed "equal rights" as "losing special protections".',
      'She warned about drafting mothers into combat and losing financial alimony.',
      'STOP ERA argued the amendment would abolish protective laws and mandate the draft for women.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard - Analysis - c12_hist_056
  {
    id: 'ch_056_1',
    nodeId: NODE_C12_HIST_056,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Lebanese Christian writer Najib Azoury predict in 1905 that Arab nationalism and Zionism were structurally destined to clash over Palestine?',
    options: [
      'Because both movements were strictly fundamentalist Islamic organisations.',
      'Because Zionism required demographic transformation through Jewish immigration (aliyah) to build a state, while Arab nationalism required preserving the existing Arab continuous majority.',
      'Because both movements were secretly funded by the Ottoman Sultan Abdul Hamid II.',
      'Because the British government had already signed the Sykes-Picot Agreement in 1905.',
    ],
    correctIndex: 1,
    explanation: 'The clash was structurally zero-sum: Zionism could only succeed by altering Palestine\'s demographics via immigration, while Arab nationalism demanded self-determination for the centuries-old indigenous Arab majority.',
    hints: [
      'Focus on demography: what does building a new nation-state require if you start as a 5% minority?',
      'One movement needed mass immigration; the other depended on existing residents remaining the majority.',
      'Zionism required demographic change through aliyah; Arab nationalism required preserving the existing majority.',
    ],
  },
  // 13. Standard - Analysis - c12_hist_057
  {
    id: 'ch_057_2',
    nodeId: NODE_C12_HIST_057,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyse the three conflicting British promises (1915–1917). Which promise secretly replaced the promised Arab independence with Anglo-French colonial spheres?',
    options: [
      'Husain-McMahon Correspondence (1915–16)',
      'Sykes-Picot Agreement (16 May 1916)',
      'Balfour Declaration (2 November 1917)',
      'Treaty of Versailles Mandate Article 22',
    ],
    correctIndex: 1,
    explanation: 'The Sykes-Picot Agreement (May 1916), negotiated secretly by Mark Sykes and François Georges-Picot, carved the Ottoman Levant into French Blue (Syria/Lebanon) and British Red (Mesopotamia) colonial zones.',
    hints: [
      'It was a secret Anglo-French pact kept hidden from Sharif Husayn.',
      'Bolshevik revolutionaries leaked its text in November 1917.',
      'It was the Sykes-Picot Agreement.',
    ],
    misconceptionIndex: 2,
  },
  // 14. Standard - Application - c12_hist_059
  {
    id: 'ch_059_2',
    nodeId: NODE_C12_HIST_059,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What foundational diplomatic formula did UN Security Council Resolution 242 establish following the 1967 Six Day War?',
    options: [
      'Unconditional Palestinian right of immediate military return to 1948 borders',
      'The "Land for Peace" principle: Israeli withdrawal from occupied territories in exchange for recognized boundaries and mutual non-belligerency',
      'Immediate annexation of the West Bank and Gaza Strip by the United Nations Trusteeship Council',
      'A permanent tripartite military administration by Britain, France, and Israel',
    ],
    correctIndex: 1,
    explanation: 'UN Res 242 established "Land for Peace": Israeli armed forces withdrawing from territories occupied in the recent conflict in return for termination of all claims of belligerency and respect for sovereignty.',
    hints: [
      'Think of the fundamental trade-off: territory in exchange for security recognition.',
      'The English text omitted "the", creating deliberate diplomatic ambiguity ("from territories").',
      'It is the "Land for Peace" principle.',
    ],
    misconceptionIndex: 4,
  },
  // 15. Standard - Analysis - c12_hist_060
  {
    id: 'ch_060_2',
    nodeId: NODE_C12_HIST_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Yasser Arafat\'s Fatah successfully take over the leadership of the PLO in 1968–1969?',
    options: [
      'The 1967 Six Day War shattered the military credibility of conventional Arab state armies, making Fatah\'s guerrilla self-reliance (exemplified at Karameh) the heroic alternative.',
      'The United States government appointed Arafat to negotiate the Camp David accords.',
      'Fatah signed an immediate military alliance with the Israeli Defence Forces.',
      'Ahmed Shukeiri was elected President of Egypt.',
    ],
    correctIndex: 0,
    explanation: 'The catastrophic defeat of Egypt, Syria, and Jordan in June 1967 discredited conventional Arab armies. Fatah\'s resistance at the Battle of Karameh (1968) won mass popular acclaim, allowing Arafat to become PLO Chairman in Feb 1969.',
    hints: [
      'What happened to Arab state prestige when their armies lost in just six days in 1967?',
      'Fatah preached that Palestinians must liberate themselves rather than waiting for Cairo or Damascus.',
      'Conventional armies were discredited; Fatah\'s Karameh resistance made guerrilla self-reliance popular.',
    ],
    misconceptionIndex: 4,
  },
  // 16. Standard - Evaluation - c12_hist_061
  {
    id: 'ch_061_1',
    nodeId: NODE_C12_HIST_061,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'How did the Oslo II Accord (1995) administratively divide the West Bank, and what was its fatal geographic flaw?',
    options: [
      'It created an independent, fully sovereign Palestinian state across 100% of the West Bank.',
      'It divided the West Bank into Areas A (PA civil/security), B (PA civil, Israeli security), and C (full Israeli control over 60% of land), creating fragmented non-contiguous enclaves ("Bantustans").',
      'It handed the entire West Bank to King Hussein of Jordan.',
      'It placed Jerusalem under complete United Nations military administration.',
    ],
    correctIndex: 1,
    explanation: 'Oslo II partitioned the West Bank into Areas A, B, and C. Because Area C (60%) remained under complete Israeli military control and settlement expansion doubled, Palestinian population islands were left non-contiguous.',
    hints: [
      'Think of the three-tier letter system: Area A, Area B, Area C.',
      'Which area covered 60% of the land containing roads, borders, and Israeli settlements?',
      'It created fragmented Areas A, B, and C, leaving 60% under Israeli military control.',
    ],
    misconceptionIndex: 0,
  },
  // 17. Advanced - Evaluation - c12_hist_051
  {
    id: 'ch_051_2',
    nodeId: NODE_C12_HIST_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate Dr. Martin Luther King Jr.\'s philosophical synthesis of Gandhian Satyagraha and the prophetic Black Christian tradition.',
    options: [
      'Nonviolence was a passive, submissive acceptance of Jim Crow suffering to avoid legal arrest.',
      'Nonviolence was an active, confrontational direct-action strategy designed to provoke crises that dramatised injustice before national and international television audiences.',
      'King rejected Gandhi\'s methods in favour of armed insurrection after the 1955 Montgomery Bus Boycott.',
      'King argued that only Northern white liberals should conduct protest marches.',
    ],
    correctIndex: 1,
    explanation: 'In "Letter from Birmingham Jail," King explained that nonviolent direct action is NOT passive: it creates creative tension and moral crisis, forcing a reluctant power structure to negotiate.',
    hints: [
      'Review King\'s "Letter from Birmingham Jail".',
      'Nonviolence sought to make hidden tension open and visible on television screens.',
      'It was an active, confrontational direct-action strategy that forced negotiations.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced - Analysis - c12_hist_054
  {
    id: 'ch_054_2',
    nodeId: NODE_C12_HIST_054,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the multi-causal framework that forced the negotiated end of Apartheid (1990–1994).',
    availableParts: [
      'Township Ungovernability (1984-86)',
      '+',
      'Corporate Disinvestment & UN Arms Embargo',
      '+',
      'Fall of Soviet Union (1989)',
      '+',
      'CODESA Multi-Party Bargaining',
    ],
    targetState: 'Township Ungovernability (1984-86) + Corporate Disinvestment & UN Arms Embargo + Fall of Soviet Union (1989) + CODESA Multi-Party Bargaining',
    validationHint: 'Assemble all four structural pillars: internal revolt, economic pressure, geopolitical window, and institutional negotiations.',
    explanation: 'Apartheid collapsed due to internal ungovernability + international financial strangulation + loss of the Cold War anti-communist pretext + CODESA multi-party bargaining.',
    hints: [
      'Click all parts in order: Township Revolt, Economic Sanctions, Soviet Collapse, CODESA Talks.',
      'Make sure you include the "+" connectors between each historical pillar.',
      'Complete the equation for transition.',
    ],
  },
  // 19. Advanced - Evaluation - c12_hist_055
  {
    id: 'ch_055_3',
    nodeId: NODE_C12_HIST_055,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did Black feminist theorists (such as bell hooks and the Combahee River Collective) critique Betty Friedan\'s Second-Wave liberal feminism?',
    options: [
      'They argued Friedan was excessively radical and demanded the complete abolition of marriage.',
      'They demonstrated that Friedan\'s "feminine mystique" centred white, middle-class, college-educated women, ignoring that Black and working-class women had always laboured outside the home under dual racial-economic exploitation.',
      'They joined Phyllis Schlafly\'s STOP ERA campaign to preserve traditional domesticity.',
      'They argued that women had already achieved complete economic equality through the 1963 Equal Pay Act.',
    ],
    correctIndex: 1,
    explanation: 'In "Feminist Theory: From Margin to Center" (1984), bell hooks showed that Friedan universalised the plight of affluent white housewives, ignoring Black women who worked menial jobs to survive.',
    hints: [
      'Look at the sample of women Friedan interviewed (Smith College alumnae).',
      'Did working-class women or women of colour have the luxury of being trapped "only" as housewives?',
      'They critiqued its racial and class blindness, highlighting intersectional oppression.',
    ],
    misconceptionIndex: 4,
  },
  // 20. Advanced - Analysis - c12_hist_058
  {
    id: 'ch_058_2',
    nodeId: NODE_C12_HIST_058,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the historiographical debate between Benny Morris and Ilan Pappé regarding the 1948 Palestinian Nakba (~700,000 refugees).',
    options: [
      'Both agree that all Arab residents evacuated voluntarily following radio broadcasts from Damascus.',
      'Morris argues the exodus was born of war circumstances with regional expulsions (e.g. Lydda/Ramle) but no pre-existing master plan; Pappé argues Plan Dalet was a systematic blueprint for ethnic cleansing.',
      'Both argue that the British army directly carried out the forced expulsions.',
      'Both claim that UN Resolution 181 was fully implemented without any military conflict.',
    ],
    correctIndex: 1,
    explanation: 'Benny Morris\'s archival research found mixed causes (war combat, local commander expulsions, fear of Deir Yassin) without a single central master plan; Ilan Pappé argues Plan Dalet functioned as a deliberate policy of demographic expulsion.',
    hints: [
      'Think of the "New Historians" debate over intention vs outcome.',
      'One emphasizes emergent war chaos + local expulsions; the other emphasizes systematic doctrine in Plan Dalet.',
      'Morris sees an exodus born of war with expulsions; Pappé sees deliberate ethnic cleansing.',
    ],
    misconceptionIndex: 1,
  },
  // 21. Advanced - Evaluation - c12_hist_061
  {
    id: 'ch_061_2',
    nodeId: NODE_C12_HIST_061,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Synthesise the multi-causal collapse of the Oslo Peace Process (1993–1996) into its logical sequence of breakdown.',
    sortItems: [
      'Structural deferral of core issues (Jerusalem, refugees, borders) and unconstrained settlement growth',
      'Assassination of Prime Minister Yitzhak Rabin by Israeli extremist Yigal Amir (4 Nov 1995)',
      'Hamas suicide bombing campaigns in Jerusalem and Tel Aviv (early 1996) destroying Israeli public trust',
      'Election of Benjamin Netanyahu (May 1996) campaigning against territorial concessions',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The peace collapse was multi-causal: structural deferral & settlements → Rabin\'s assassination → Hamas bus bombings → Netanyahu\'s right-wing election victory.',
    hints: [
      'Start with the structural flaw in the 1993 treaty design.',
      'Who was killed on 4 November 1995?',
      'How did rejectionist bombings in 1996 swing the Israeli election to Netanyahu?',
    ],
    misconceptionIndex: 2,
  },
  // 22. Advanced - Creativity - c12_hist_057
  {
    id: 'ch_057_3',
    nodeId: NODE_C12_HIST_057,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'As a diplomatic analyst, what overarching structural lesson does the 1915–1917 British imperial double-dealing provide for contemporary international conflict resolution?',
    options: [
      'Secret overlapping wartime promises to competing national groups create structural time-bombs that convert diplomatic expediency into generational warfare.',
      'Imperial powers should always divide contested territories into at least three zones.',
      'Bilateral declarations to private individuals should override multilateral treaties.',
      'Nationalist movements should avoid demanding written guarantees from global powers.',
    ],
    correctIndex: 0,
    explanation: 'The British promises proved that wartime imperial expediency—promising the same land to Arabs, French, and Zionists—created an irreconcilable diplomatic contradiction that generated a century of conflict.',
    hints: [
      'Consider the consequence of promising one piece of cake to three different people simultaneously.',
      'When imperial powers make secret contradictory promises, what happens to trust and stability?',
      'Secret conflicting promises create structural time-bombs resulting in generational warfare.',
    ],
  },
];

// ─── COMPONENT PROPS INTERFACE ───
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

// ─── DEFAULT ENRICHED PROPS (CLASS 12 ISC HISTORY) ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_HIST_051,
  title: 'Civil Rights, Anti-Apartheid & The Middle East (1945–1995)',
  definition: 'An integrated study of twentieth-century mass mobilisations for racial equality, national self-determination, and gender justice across the United States, South Africa, and the Middle East, examining how constitutional direct action, armed struggle, and imperial diplomacy reshaped global politics.',
  eli5: 'Think of human history as different groups of people demanding their fair share of freedom. In America, Black citizens and women broke unfair laws peacefully to force the government to protect them. In South Africa, Nelson Mandela and his people fought a cruel system called Apartheid until global boycotts and township protests ended it. In the Middle East, Britain made conflicting promises to Arabs and Jews over the same land, leading to wars and peace treaties that struggled to bring lasting fairness.',
  misconceptions: [
    {
      misconception: 'Apartheid was simply identical to US Jim Crow segregation.',
      correction: 'Apartheid was far more totalising: it created a rigid 4-tier racial registry, stripped Black South Africans of national citizenship into ten impoverished "Bantustans", and was justified by Afrikaner Calvinist theology.',
    },
    {
      misconception: 'The 1964 Civil Rights Act and 1965 Voting Rights Act solved all racial discrimination.',
      correction: 'They dismantled Southern de jure segregation and voting tests, but left Northern de facto discrimination in housing (redlining) and policing untouched, sparking the Black Power movement and urban riots.',
    },
    {
      misconception: 'The 1978 Camp David Accord and 1993 Oslo Accords created an independent Palestinian state.',
      correction: 'Neither created a state. Camp David produced a bilateral Egypt-Israel treaty deferring Palestinians; Oslo created the limited Palestinian Authority and fragmented the West Bank into Areas A, B, and C.',
    },
    {
      misconception: 'Nelson Mandela and Dr. King were always nonviolent pacifists who opposed all confrontation.',
      correction: 'King utilised confrontational nonviolent direct action to provoke crises; Mandela used civil disobedience from 1944–1960, but co-founded Umkhonto we Sizwe for armed sabotage after Sharpeville.',
    },
    {
      misconception: 'The Equal Rights Amendment (ERA) was ratified into the US Constitution in 1982.',
      correction: 'The ERA fell three states short (35 of 38) by the 30 June 1982 deadline, largely due to Phyllis Schlafly\'s STOP ERA conservative mobilisation.',
    },
    {
      misconception: 'Brown v. Board of Education immediately desegregated all American schools in 1954.',
      correction: 'Southern states engaged in "Massive Resistance" and delay tactics under the vague 1955 Brown II ruling ("all deliberate speed"), requiring federal troops and a decade of court battles.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What did Brown v. Board of Education (1954) declare?', options: ['Segregated schools are inherently unequal', 'Busing is unconstitutional', 'Poll taxes are illegal', 'Affirmative action is mandatory'], correctIndex: 0 },
    { question: 'What did the 1950 Group Areas Act enforce in South Africa?', options: ['Equal voting rights', 'Forced physical relocation of non-white communities into segregated zones', 'Bilingual education', 'Free trade unions'], correctIndex: 1 },
    { question: 'Who founded the National Organisation for Women (NOW) in 1966?', options: ['Phyllis Schlafly', 'Betty Friedan and co-founders', 'Rosa Parks', 'Margaret Thatcher'], correctIndex: 1 },
    { question: 'What was the 1916 Sykes-Picot Agreement?', options: ['A public treaty for Arab independence', 'A secret Anglo-French pact partitioning the Ottoman Arab provinces', 'A peace treaty between Egypt and Israel', 'A UN refugee charter'], correctIndex: 1 },
    { question: 'What percentage of Palestine did Israel control after the 1949 Armistice?', options: ['56%', '43%', '78%', '100%'], correctIndex: 2 },
    { question: 'What was the immediate catalyst for the 1965 Voting Rights Act?', options: ['Montgomery Bus Boycott', 'Bloody Sunday on Edmund Pettus Bridge in Selma', 'The Suez Crisis', 'The founding of NOW'], correctIndex: 1 },
    { question: 'On what date did F.W. de Klerk unban the ANC and PAC?', options: ['16 June 1976', '2 February 1990', '27 April 1994', '11 February 1990'], correctIndex: 1 },
    { question: 'What did UN Resolution 242 establish following the 1967 Six Day War?', options: ['The Land for Peace formula', 'Immediate creation of a Palestinian state', 'Expulsion of Egypt from the UN', 'Sanctions on South Africa'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery of US Civil Rights (Brown, Birmingham, Selma, 1964/65 Acts), South African Anti-Apartheid (Pillars, Sharpeville, MK, Soweto, 1994 Transition), Second-Wave Feminism (Friedan, NOW, ERA), and the Arab-Israeli conflict (1915-17 Promises, 1948 War, 1967/73 Wars, Camp David, PLO, Oslo Accords).',
};

// ─── INTERACTIVE EXPLORATION LABS (Brilliant.org Style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Pressure Dynamics of Civil Rights (1963)',
    instruction: 'Manipulate the Public Outrage and Cold War Geopolitical Sliders to see when Federal Legislative Action becomes politically unavoidable.',
    interactionType: 'slider-pressure',
    nodeId: NODE_C12_HIST_052,
  },
  {
    title: 'Lab 2: The Multi-Causal Collapse of Apartheid (1976–1994)',
    instruction: 'Activate the four structural levers—Township Uprising, Economic Sanctions, Soviet Collapse, and CODESA Bargaining—to dismantle the Apartheid state.',
    interactionType: 'toggle-levers',
    nodeId: NODE_C12_HIST_054,
  },
  {
    title: 'Lab 3: The 1915–1917 Contradictory British Promises Map',
    instruction: 'Select each secret British promise to inspect its conflicting territorial allocation over Palestine and the Levant.',
    interactionType: 'map-promises',
    nodeId: NODE_C12_HIST_057,
  },
  {
    title: 'Lab 4: The Territorial Transformation of 1948 & 1967',
    instruction: 'Drag the timeline slider between 1947, 1949, and 1967 to watch the borders of Israel, the West Bank, Gaza, Sinai, and the Golan Heights transform.',
    interactionType: 'slider-borders',
    nodeId: NODE_C12_HIST_059,
  },
  {
    title: 'Lab 5: Oslo II Partition Matrix (Areas A, B, and C)',
    instruction: 'Click each territorial classification to analyse civil vs security control and understand why non-contiguous enclaves prevented a viable state.',
    interactionType: 'click-areas',
    nodeId: NODE_C12_HIST_061,
  },
];

// ─── PREDICTION CHALLENGES ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If international banks refuse to roll over loans and corporate disinvestment hits South Africa in 1985, what will happen to the Apartheid regime\'s capacity to maintain its military-police apparatus?',
    options: [
      'The regime will expand its territory into neighbouring countries.',
      'Severe capital flight and negative economic growth will force the regime into strategic negotiations.',
      'The white minority population will triple within five years.',
      'The United Nations will lift the arms embargo.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now activate the Economic Sanctions lever in the Apartheid lab to verify how capital flight forced F.W. de Klerk to the negotiating table.',
    nodeId: NODE_C12_HIST_054,
  },
  {
    question: 'Predict: If the 1993 Oslo Accords defer the final status of Jerusalem, refugees, and borders for 5 years without halting Jewish settlement expansion, what will occur?',
    options: [
      'Settlement populations will double, fragmenting the West Bank and destroying trust.',
      'A fully independent Palestinian state will automatically emerge in 1998.',
      'Hamas will permanently dissolve its military wing.',
      'Israel will cede all of West Jerusalem to the Palestinian Authority.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Inspect the Oslo lab to see how Area C settlement growth doubled between 1993 and 2000, undermining territorial contiguity.',
    nodeId: NODE_C12_HIST_061,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between televised police violence and federal legislation in the 1960s US Civil Rights lab?',
    observableOptions: [
      'Public outrage and Soviet UN propaganda created a crisis where federal inaction was more costly than action.',
      'Federal legislation was passed before any protests took place.',
      'Television broadcasts had no measurable effect on Northern public opinion.',
      'Southern governors voluntarily drafted the Civil Rights Act.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HIST_052,
  },
  {
    question: 'What do you notice about the territory of Mandate Palestine across the 1947 UN plan (56%), 1949 Armistice (78%), and 1967 Six Day War?',
    observableOptions: [
      'Territorial boundaries remained completely static for 50 years.',
      'Each war expanded Israeli military control while leaving Palestinian self-determination unfulfilled.',
      'An independent Palestinian state was established in the West Bank in 1948.',
      'Egypt permanently annexed all of Jerusalem in 1967.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_HIST_059,
  },
];

// ─── REAL-WORLD ACTIVITY ARC ───
const REAL_WORLD_ACTIVITY = {
  title: 'Global Constitutional & Diplomatic Analyst Task',
  description: 'Apply the lessons of 20th-century freedom struggles to contemporary democratic transitions. Compare the negotiated South African transition (CODESA 1991–94) with India\'s transfer of power (1947) to evaluate why South Africa maintained territorial unity while India suffered Partition.',
  steps: [
    'Identify the core difference between the ANC\'s non-racial single-state vision and the Muslim League\'s Two-Nation Theory.',
    'Analyse how international economic sanctions accelerated the end of minority rule.',
    'Formulate three essential constitutional safeguards needed to protect minority and majority rights in post-conflict democracies.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
export function C12_HistoryCivilRightsMovementSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Phase Management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org Interactive Exploration & Lab States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab 1 Interactive Sliders
  const [mediaOutrage, setMediaOutrage] = useState(30);
  const [coldWarPressure, setColdWarPressure] = useState(40);
  const [southernResistance, setSouthernResistance] = useState(70);

  // Lab 2 Apartheid Levers
  const [apartheidLevers, setApartheidLevers] = useState({
    townshipRevolt: false,
    economicSanctions: false,
    sovietCollapse: false,
    codesaNegotiations: false,
  });

  // Lab 3 Imperial Promises
  const [selectedPromise, setSelectedPromise] = useState<'husain' | 'sykes' | 'balfour' | null>('husain');

  // Lab 4 Middle East Map Year Slider
  const [mapYear, setMapYear] = useState<1947 | 1949 | 1967 | 1979 | 1995>(1947);

  // Lab 5 Oslo Areas
  const [selectedArea, setSelectedArea] = useState<'A' | 'B' | 'C' | null>('A');

  // Multi-Representation & View Mode
  const [activeTab, setActiveTab] = useState<'simulation' | 'timeline' | 'document' | 'comparison'>('simulation');
  const [highlightedText, setHighlightedText] = useState<string | null>(null);

  // Challenge & Evaluation State
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

  // Drag-and-Drop & Interactive Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual Feedback & Audio Alerts
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception Tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref (Persists across challenge evaluations)
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineSvgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Difficulty Challenges Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Subject Config styling
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '📜', color: 'amber' };

  // ─── MOUNT MASTERY INITIALIZATION ───
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
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
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
    if (activeTab === 'timeline' && timelineSvgRef.current) {
      gsap.fromTo(
        timelineSvgRef.current.querySelectorAll('.timeline-node'),
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.7)' }
      );
    }
  }, [activeTab]);

  // ─── CANVAS 2D PARTICLE / PULSE LOOP ───
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6366f1';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Question ${currentChallenge + 1} of ${filteredChallenges.length} (${challenge.competencyLevel.toUpperCase()})`, 10, 18);
      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = difficulty === 'foundation' ? '#22c55e' : difficulty === 'standard' ? '#eab308' : '#ef4444';
      ctx.fill();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length, challenge, difficulty]);

  // ─── USECALLBACK HANDLERS (AT LEAST 14 EXTRACTED HANDLERS) ───

  // 1. Discovery Answer
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate! Geopolitical pressure forced federal action.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 2. Navigation to Exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Experiment with historical variables.');
  }, []);

  // 3. Navigation to Sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Test all historical models without scoring pressure.');
  }, []);

  // 4. Navigation to Challenges
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked. Apply your historical analysis.');
  }, []);

  // 5. Prediction Verification
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now interact with the visualization to test your hypothesis!');
  }, []);

  // 6. Observation Question Handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great analytical observation!' : 'Review the visualization gauges carefully.');
  }, []);

  // 7. Escalating Hints
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
      speechManager.speak('Let us review the step-by-step historical explanation.');
    }
  }, [hintCount, challenge]);

  // 8. Inactivity Auto-Hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 9. Completion Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered this Class 12 History chapter.');
  }, [errors, onComplete]);

  // 10. Next Challenge Advance
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

  // 11. Master Answer Submission & Validation
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;
    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Outstanding! Correct analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Review the step-by-step resolution.');
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

  // 12. Drag & Drop Handlers
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

  // 13. Drag Sort Reordering
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

  // 14. Lab Toggle & Slider Manipulations
  const handleApartheidToggle = useCallback((key: keyof typeof apartheidLevers) => {
    setApartheidLevers(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      audioManager.play('tap');
      return updated;
    });
  }, []);

  const handleTabSwitch = useCallback((tab: 'simulation' | 'timeline' | 'document' | 'comparison') => {
    setActiveTab(tab);
    audioManager.play('tap');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Calculate Real-Time Civil Rights Legislation Probability (Lab 1)
  const civilRightsPressureScore = useMemo(() => {
    const score = (mediaOutrage * 0.45) + (coldWarPressure * 0.45) - (southernResistance * 0.3);
    return Math.max(0, Math.min(100, Math.round(score)));
  }, [mediaOutrage, coldWarPressure, southernResistance]);

  // Calculate Apartheid System Collapse Index (Lab 2)
  const apartheidCollapseProgress = useMemo(() => {
    let count = 0;
    if (apartheidLevers.townshipRevolt) count += 25;
    if (apartheidLevers.economicSanctions) count += 35;
    if (apartheidLevers.sovietCollapse) count += 20;
    if (apartheidLevers.codesaNegotiations) count += 20;
    return count;
  }, [apartheidLevers]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">ISC Class 12 History • World Affairs</span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['simulation', 'timeline', 'document', 'comparison'] as const).map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabSwitch(tab)}
              aria-label={`Switch to ${tab} view`}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-xl">
            <span className="px-2.5 py-1 bg-gold-500/20 text-gold-300 text-xs font-bold rounded-lg border border-gold-400/30">
              Curiosity Hook • Historical Catalyst
            </span>
            <h2 className="text-xl font-bold text-gold-200 mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4">❓ Pre-Lab Inquiry: {DISCOVERY_QUESTION.question}</h3>
            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700/40'
                      : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">[{String.fromCharCode(65 + i)}]</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-gold-950/40 rounded-xl border border-gold-800/50">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on!' : '💡 Historical Insight:'} {DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive labs"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION / LABS PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Header Stepper */}
          <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-gold-500 w-8' : i < currentSlide ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 <strong>Student Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* DYNAMIC LAB VISUALIZATIONS */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 min-h-[380px]">
            {/* LAB 1: Civil Rights Political Pressure Simulator */}
            {currentSlide === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700">
                    <label htmlFor="media-slider" className="text-xs font-bold text-slate-300 block mb-2">
                      📺 Televised Outrage (Birmingham 1963): {mediaOutrage}%
                    </label>
                    <input
                      id="media-slider"
                      type="range"
                      min={0}
                      max={100}
                      value={mediaOutrage}
                      aria-label="Televised Outrage level slider"
                      onChange={e => setMediaOutrage(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">NBC/CBS broadcast children attacked with hoses & police dogs.</p>
                  </div>

                  <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700">
                    <label htmlFor="cw-slider" className="text-xs font-bold text-slate-300 block mb-2">
                      🌐 Soviet UN Propaganda Pressure: {coldWarPressure}%
                    </label>
                    <input
                      id="cw-slider"
                      type="range"
                      min={0}
                      max={100}
                      value={coldWarPressure}
                      aria-label="Soviet UN Propaganda Pressure level slider"
                      onChange={e => setColdWarPressure(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Moscow distributes Jim Crow photos to non-aligned African delegates.</p>
                  </div>

                  <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700">
                    <label htmlFor="filibuster-slider" className="text-xs font-bold text-slate-300 block mb-2">
                      🏛️ Southern Senate Filibuster: {southernResistance}%
                    </label>
                    <input
                      id="filibuster-slider"
                      type="range"
                      min={0}
                      max={100}
                      value={southernResistance}
                      aria-label="Southern Senate Filibuster resistance level slider"
                      onChange={e => setSouthernResistance(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Strom Thurmond and Dixiecrats resist federal legislation.</p>
                  </div>
                </div>

                {/* Pressure Outcome Gauge */}
                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Calculated Federal Legislative Pressure Index
                  </span>
                  <div className="text-3xl font-black text-white mt-1 mb-2">{civilRightsPressureScore} / 100</div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${civilRightsPressureScore}%` }}
                      style={{
                        backgroundColor: civilRightsPressureScore >= 70 ? '#22c55e' : civilRightsPressureScore >= 45 ? '#eab308' : '#ef4444',
                      }}
                    />
                  </div>
                  <p className="text-xs mt-3 font-semibold text-slate-300">
                    {civilRightsPressureScore >= 70
                      ? '🟢 [HIGH PRESSURE ✓] CRISIS POINT: Inaction is more politically costly than action! JFK proposes Civil Rights Bill (June 1963) & LBJ signs 1964 Act.'
                      : civilRightsPressureScore >= 45
                      ? '🟡 [MODERATE PRESSURE] CAUTIOUS DELAY: White House hesitates, fearing loss of Southern Democratic electoral support.'
                      : '🔴 [LOW PRESSURE ✗] PARALYSIS: Southern filibuster blocks all civil rights reform.'}
                  </p>
                </div>
              </div>
            )}

            {/* LAB 2: Apartheid Collapse Multi-Causal Levers */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Toggle each historical pressure point to model the negotiated transition to democracy (1990–1994):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: 'townshipRevolt' as const, title: '🔥 Township Insurrections (1984–86)', desc: 'Youth ungovernability rooted in Soweto generation makes apartheid unworkable.' },
                    { key: 'economicSanctions' as const, title: '📉 UN Arms Embargo & Disinvestment (1977–85)', desc: '200+ US corporations withdraw; banks refuse debt roll-overs, sparking currency crisis.' },
                    { key: 'sovietCollapse' as const, title: '🧱 Fall of Berlin Wall & USSR (1989)', desc: 'Deprives Pretoria of its "anti-communist bulwark" excuse to Western allies.' },
                    { key: 'codesaNegotiations' as const, title: '🤝 CODESA Multi-Party Talks (1991–93)', desc: 'Mandela & De Klerk negotiate non-racial democracy & 1993 interim constitution.' },
                  ].map(lever => (
                    <motion.button
                      key={lever.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApartheidToggle(lever.key)}
                      aria-label={`Toggle ${lever.title} lever`}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        apartheidLevers[lever.key]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100 shadow-lg'
                          : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{lever.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                          {apartheidLevers[lever.key] ? 'ACTIVE ✓' : 'INACTIVE ✗'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{lever.desc}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Progress toward 1994 Elections */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                    <span>Transition Progress to Non-Racial Democracy (1994)</span>
                    <span>{apartheidCollapseProgress}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                      animate={{ width: `${apartheidCollapseProgress}%` }}
                    />
                  </div>
                  {apartheidCollapseProgress === 100 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-emerald-400 mt-2 text-center">
                      🎉 27 April 1994: First universal suffrage elections held! ANC wins 62.6% & Nelson Mandela is inaugurated President.
                    </motion.p>
                  )}
                </div>
              </div>
            )}

            {/* LAB 3: Conflicting British Promises Map (1915–1917) */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'husain' as const, label: '1. Husain-McMahon (1915–16)', desc: 'Promised Arab Kingdom spanning Levant & Arabia' },
                    { id: 'sykes' as const, label: '2. Sykes-Picot Agreement (1916)', desc: 'Secret French Blue / British Red colonial partition' },
                    { id: 'balfour' as const, label: '3. Balfour Declaration (1917)', desc: 'Promised Jewish National Home in Palestine' },
                  ].map(p => (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelectedPromise(p.id); audioManager.play('tap'); }}
                      aria-label={`Select British promise map: ${p.label}`}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedPromise === p.id ? 'bg-gold-600 text-white border-gold-400 shadow-md' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {p.label}
                    </motion.button>
                  ))}
                </div>

                {/* SVG Visual Levant Map */}
                <svg viewBox="0 0 600 240" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2" aria-label="Middle East historical promises map">
                  {/* Outline boundaries */}
                  <rect x="20" y="20" width="160" height="200" rx="8" fill="#1e293b" stroke="#334155" />
                  <text x="100" y="45" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Syria & Lebanon</text>
                  
                  <rect x="200" y="20" width="160" height="200" rx="8" fill="#1e293b" stroke="#334155" />
                  <text x="280" y="45" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Palestine / Jerusalem</text>

                  <rect x="380" y="20" width="180" height="200" rx="8" fill="#1e293b" stroke="#334155" />
                  <text x="470" y="45" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Mesopotamia (Iraq)</text>

                  {/* Highlights based on selected promise */}
                  {selectedPromise === 'husain' && (
                    <g>
                      <rect x="25" y="60" width="530" height="150" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                      <text x="290" y="140" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">
                        Promised Independent Arab State (Aleppo to Indian Ocean)
                      </text>
                    </g>
                  )}
                  {selectedPromise === 'sykes' && (
                    <g>
                      <rect x="25" y="60" width="150" height="150" rx="6" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                      <text x="100" y="140" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">French Blue Zone</text>
                      
                      <rect x="205" y="60" width="150" height="150" rx="6" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
                      <text x="280" y="140" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">International Admin</text>

                      <rect x="385" y="60" width="170" height="150" rx="6" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />
                      <text x="470" y="140" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">British Red Zone</text>
                    </g>
                  )}
                  {selectedPromise === 'balfour' && (
                    <g>
                      <rect x="205" y="60" width="150" height="150" rx="6" fill="#a855f7" fillOpacity="0.35" stroke="#c084fc" strokeWidth="2.5" />
                      <text x="280" y="130" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">"Jewish National Home"</text>
                      <text x="280" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">(Omitted Arab Political Rights)</text>
                    </g>
                  )}
                </svg>
                <p className="text-xs text-slate-300 italic text-center">
                  Notice how the same territory of Palestine was promised for Arab independence (1915), assigned to international partition (1916), and designated a Jewish National Home (1917).
                </p>
              </div>
            )}

            {/* LAB 4: Middle East Territorial Shift Timeline (1947–1979) */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Select Era:</span>
                  <div className="flex gap-2">
                    {([1947, 1949, 1967, 1979] as const).map(year => (
                      <button
                        key={year}
                        onClick={() => { setMapYear(year); audioManager.play('tap'); }}
                        aria-label={`Select year ${year}`}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          mapYear === year ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <h3 className="text-base font-bold text-gold-300">
                      {mapYear === 1947 && '1947: UN Partition Plan (Resolution 181)'}
                      {mapYear === 1949 && '1949: Rhodes Armistice (The Green Line)'}
                      {mapYear === 1967 && '1967: Six Day War (Triple Territory Capture)'}
                      {mapYear === 1979 && '1979: Camp David Accord (Sinai Return)'}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {mapYear === 1947 && 'UN allocates 56% to Jewish state, 43% to Arab state, Jerusalem corpus separatum. Rejected by Arab states.'}
                      {mapYear === 1949 && 'Israel expands to 78% of Palestine; Egypt occupies Gaza; Transjordan occupies West Bank & East Jerusalem. ~700,000 Palestinian refugees (Nakba).'}
                      {mapYear === 1967 && 'Israel pre-emptively captures Sinai & Gaza (from Egypt), West Bank & East Jerusalem (from Jordan), and Golan (from Syria). UN Res 242 "Land for Peace".'}
                      {mapYear === 1979 && 'Egypt recognizes Israel in exchange for full Israeli withdrawal from Sinai. Palestinian autonomy deferred.'}
                    </p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-center">
                    <span className="text-xs text-slate-400 font-bold block mb-1">Territory Division Metric</span>
                    <div className="text-2xl font-black text-amber-400">
                      {mapYear === 1947 && 'Israel: 56% • Arab: 43%'}
                      {mapYear === 1949 && 'Israel: 78% • Egypt/Jordan: 22%'}
                      {mapYear === 1967 && 'Israel Tripled Control (+Sinai, Golan, WB)'}
                      {mapYear === 1979 && 'Sinai Returned (Bilateral Peace)'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: Oslo II West Bank Partition Matrix */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'A' as const, title: 'Area A (~18%)', sub: 'Palestinian Civil & Security Control (Major Cities)' },
                    { id: 'B' as const, title: 'Area B (~22%)', sub: 'Palestinian Civil, Israeli Joint Security Control' },
                    { id: 'C' as const, title: 'Area C (~60%)', sub: 'Full Israeli Control (Settlements, Roads, Borders)' },
                  ].map(area => (
                    <motion.button
                      key={area.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelectedArea(area.id); audioManager.play('tap'); }}
                      aria-label={`Select Oslo West Bank ${area.title}`}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedArea === area.id ? 'bg-gold-900/60 border-gold-400 text-white' : 'bg-slate-800/70 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs md:text-sm">{area.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{area.sub}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-amber-300">
                    {selectedArea === 'A' && 'Area A: Islands of Palestinian Administration (Ramallah, Nablus, Jericho, Gaza)'}
                    {selectedArea === 'B' && 'Area B: Shared Security Dilemma (Rural Palestinian Villages)'}
                    {selectedArea === 'C' && 'Area C: The Structural Blocker (60% of West Bank under IDF & Settlements)'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {selectedArea === 'A' && 'Encompassed urban population hubs. However, surrounded entirely by Area C, preventing independent external borders or free transit.'}
                    {selectedArea === 'B' && 'Palestinian Authority ran schools and municipal services, but Israeli military retained veto security power.'}
                    {selectedArea === 'C' && 'Contained all Israeli settlements, military bases, water aquifers, and bypass roads. Because settlement population doubled between 1993 and 2000, Area C fragmented Areas A & B into isolated enclaves.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Bottom Controls */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              aria-label="Previous lab"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-bold text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('tap'); }}
                aria-label="Next lab"
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Free Sandbox Mode"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX / FREE PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Free Exploration Sandbox</span>
            <h2 className="text-xl font-bold text-white mt-1">Experiment Across All Historical Eras</h2>
            <p className="text-xs text-slate-400 mt-1">Interact with any parameter with zero penalty. When confident, proceed to the graded challenges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-gold-300 mb-2">US Civil Rights Pressure Test</h3>
              <label htmlFor="sb-outrage" className="text-xs text-slate-400 block">Outrage: {mediaOutrage}% | Cold War: {coldWarPressure}%</label>
              <input id="sb-outrage" type="range" min={0} max={100} value={mediaOutrage} onChange={e => setMediaOutrage(Number(e.target.value))} aria-label="Media Outrage test slider" className="w-full mt-2" />
              <div className="text-xs font-bold text-amber-400 mt-2">Legislation Likelihood: {civilRightsPressureScore}%</div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-gold-300 mb-2">Apartheid Breakdown Matrix</h3>
              <div className="flex flex-wrap gap-2">
                {(['townshipRevolt', 'economicSanctions', 'sovietCollapse', 'codesaNegotiations'] as const).map(k => (
                  <button
                    key={k}
                    onClick={() => handleApartheidToggle(k)}
                    aria-label={`Toggle sandbox lever ${k}`}
                    className={`px-2.5 py-1 text-xs rounded-lg font-bold ${apartheidLevers[k] ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {apartheidLevers[k] ? '✓ ' : '✗ '} {k}
                  </button>
                ))}
              </div>
              <div className="text-xs font-bold text-emerald-400 mt-3">Transition: {apartheidCollapseProgress}%</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            aria-label="Proceed to graded challenges"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-2xl shadow-xl text-center block"
          >
            Ready for Challenges (NEP 2020 / Board Exam Practice) →
          </motion.button>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Metric & 2D Canvas Status */}
          <canvas ref={canvasRef} width={500} height={30} className="w-full bg-slate-900/60 rounded-xl border border-slate-800" aria-label="Simulation challenge status canvas" />

          {/* Difficulty & Progress Banner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Difficulty:</span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  difficulty === 'standard' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-[11px] px-2 py-0.5 bg-gold-500/20 text-gold-300 rounded border border-gold-500/30 font-bold">
                Level: {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Score: {Math.max(0, 100 - errors * 5)}% • Mistakes: {errors}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-amber-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* CHALLENGE CARD CONTAINER */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ TYPE (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">[{String.fromCharCode(65 + i)}]</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Drag item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 text-white text-xs font-bold rounded-lg cursor-grab shadow focus:outline-none focus:ring-2 focus:ring-gold-400"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { targetId: 'target_four_races', label: 'Four Rigid Racial Registries' },
                    { targetId: 'target_forced_removals', label: 'Forced Group Areas & District Six Demolitions' },
                    { targetId: 'target_menial_labour', label: 'Education Restricted to Menial Labour' },
                  ].map(target => (
                    <div
                      key={target.targetId}
                      role="region"
                      aria-label={`Drop target for: ${target.label}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center"
                    >
                      <span className="text-xs text-slate-400 block mb-1">{target.label}</span>
                      <span className="text-xs font-bold text-amber-300">
                        {droppedLabels[target.targetId] ? `✓ ${droppedLabels[target.targetId]}` : 'Drop Statute Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify statute matching"
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Matching
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    draggable
                    aria-label={`Drag chronological item ${idx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 rounded-xl text-xs md:text-sm text-slate-200 border border-slate-700 cursor-grab flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gold-400"
                  >
                    <span><strong>Step {idx + 1}:</strong> {item}</span>
                    <span className="text-slate-500 text-xs">↕ Drag</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check historical order"
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl shadow mt-2"
                >
                  Check Historical Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE TYPE */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  aria-label="Enter percentage answer"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm w-36"
                />
                <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  aria-label="Submit numeric answer"
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Submit Answer
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <button
                      key={i}
                      onClick={() => setConstructParts(p => [...p, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-600 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                      {part}
                      <button onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} aria-label={`Remove part ${part}`} className="text-red-300 font-black ml-1">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-500 text-xs">Click parts above to assemble the equation</span>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate construction equation"
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Validate Construction
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step Historical Breakdown:</h4>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-200 leading-relaxed">
                    <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}
                
                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal next explanation sentence"
                    className="px-4 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Sentence →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment' : 'Proceed to next question'}
                    className="block px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg mt-3"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Question →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white mt-2">Historical Simulation Complete!</h2>
            <div className="text-3xl font-extrabold text-amber-400 mt-2">
              Final Score: {Math.max(0, 100 - errors * 5)}%
            </div>
            <p className="text-xs text-slate-400 mt-1">Demonstrated Mastery Tier: <strong className="text-emerald-400 uppercase">{masteryLevel}</strong></p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/60">
            <p className="text-xs md:text-sm font-bold text-emerald-300">
              {errors === 0
                ? '🌟 PERFECT SCORE! You demonstrated flawless analytical command across all Class 12 ISC History modules!'
                : errors >= 1 && errors <= 3
                ? '👏 Great work! Excellent command of civil rights, apartheid, and Middle Eastern geopolitical causality.'
                : errors >= 4 && errors <= 7
                ? '📈 Good effort! Keep practicing to master all historical distinctions.'
                : '💪 Do not give up — You WILL get this! Review the concepts and try again.'}
            </p>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-3">
                Identified Misconception Profile & Corrections:
              </h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Prompts */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/60">
            <h3 className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2">Reflective Historical Inquiry:</h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Why was visual television broadcast decisive in both US Civil Rights (1963) and the South African township revolts (1976/1984)?</li>
              <li>• How did the Cold War superpower rivalry shape the outcomes of the 1956 Suez Crisis and the 1973 Yom Kippur War?</li>
              <li>• What constitutional lessons can modern democracies draw from the failure of the 1972–1982 Equal Rights Amendment ratification?</li>
            </ul>
          </div>

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/60 text-xs text-slate-300">
            <strong>📅 Spaced Repetition (SM-2):</strong> Based on your score, this chapter is scheduled for review in{' '}
            <span className="text-amber-300 font-bold">
              {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </span>
            .
          </div>

          {/* Real-World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 mt-1">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="mt-3 space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx}>[{idx + 1}] {step}</div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── MULTI-REPRESENTATION MODAL / TAB VIEWS ─── */}
      {activeTab === 'timeline' && (
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 mt-6">
          <h3 className="text-sm font-bold text-amber-300 mb-3">📜 Master Interactive Chronology (1945–1995)</h3>
          <svg ref={timelineSvgRef} viewBox="0 0 700 220" className="w-full bg-slate-950 rounded-xl p-3 border border-slate-800" aria-label="Chronology timeline graph">
            <line x1="40" y1="110" x2="660" y2="110" stroke="#475569" strokeWidth="3" />
            {[
              { year: '1948', label: 'Israel Formed / Apartheid Begins', x: 70 },
              { year: '1954', label: 'Brown v. Board', x: 160 },
              { year: '1960', label: 'Sharpeville Massacre', x: 250 },
              { year: '1964', label: 'Civil Rights Act & PLO', x: 340 },
              { year: '1967', label: 'Six Day War (Res 242)', x: 430 },
              { year: '1979', label: 'Camp David Accord', x: 520 },
              { year: '1994', label: 'Mandela Inauguration', x: 610 },
            ].map((node, i) => (
              <g key={i} className="timeline-node">
                <circle cx={node.x} cy="110" r="8" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
                <text x={node.x} y="85" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">{node.year}</text>
                <text x={node.x} y="138" textAnchor="middle" fill="#cbd5e1" fontSize="8" width="60">{node.label}</text>
              </g>
            ))}
          </svg>
        </div>
      )}

      {activeTab === 'document' && (
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 mt-6 space-y-4">
          <h3 className="text-sm font-bold text-gold-300">📄 Primary Source Document Analyser</h3>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-serif text-xs text-slate-300 leading-relaxed">
            <p className="italic text-amber-200 mb-2">
              "His Majesty\'s Government view with favour the establishment in Palestine of a national home for the Jewish people... it being clearly understood that nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities in Palestine."
            </p>
            <span className="text-[11px] font-sans font-bold text-slate-400">— Arthur James Balfour to Lord Rothschild, 2 November 1917</span>
          </div>
          <div className="text-xs text-slate-300">
            <strong>Analytical Annotation:</strong> Notice the deliberate diplomatic omission of the word <em>"state"</em> and the euphemistic phrase <em>"non-Jewish communities"</em> to describe the 90% Arab majority, stripping them of national self-determination.
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 mt-6 overflow-x-auto">
          <h3 className="text-sm font-bold text-emerald-300 mb-3">⚖️ Comparative Framework: US Civil Rights vs South African Apartheid</h3>
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 uppercase">
                <th className="p-2">Dimension</th>
                <th className="p-2">US Civil Rights Movement</th>
                <th className="p-2">South African Anti-Apartheid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-2 font-bold text-white">Demographic Status</td>
                <td className="p-2">African Americans were a numerical minority (~11%).</td>
                <td className="p-2">Black South Africans were the overwhelming majority (~75%).</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-white">Legal Structure</td>
                <td className="p-2">Jim Crow (Southern de jure laws) + Northern de facto bias.</td>
                <td className="p-2">Grand Apartheid (4-tier racial registry + Bantustans).</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-white">Strategic Arc</td>
                <td className="p-2">Constitutional direct action → 1964/65 federal legislation.</td>
                <td className="p-2">Nonviolence (1952) → Armed Sabotage (MK 1961) → 1994 CODESA.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ─── FEEDBACK SYSTEM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HistoryCivilRightsMovementSim;