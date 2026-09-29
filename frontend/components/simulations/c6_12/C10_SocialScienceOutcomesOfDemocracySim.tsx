'use client';
/**
 * C10_SocialScienceOutcomesOfDemocracySim (Class 10 Social Science)
 *
 * ELI5: Democracy's special outcome is ACCOUNTABILITY: citizens can throw out
 * bad rulers without violence. Run 30 years side by side -- a democracy with
 * elections and a regime without them -- same corruption starting point.
 * Watch which system keeps welfare compounding.
 *
 * Depth layout (master-class, 6 tabs):
 *   1. Discover  -- prediction round + guided exploration steps
 *   2. Race Lab  -- the live 30-year race, corruption chart, event log
 *   3. Evidence  -- real historical records students can toggle through
 *   4. Challenge -- 3-tier quiz (foundation / standard / advanced) with hints
 *   5. Misconceptions -- the wrong ideas this chapter kills
 *   6. Summary   -- honest recap of what you did and found
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';

const YEARS = 30;

type TabKey = 'discovery' | 'race' | 'evidence' | 'challenges' | 'misconceptions' | 'summary';

// ==========================================
// DISCOVERY DATA
// ==========================================

const DISCOVERY_QUESTION = {
  question:
    'Predict: two countries start 2025 with equally corrupt rulers. One holds elections every 5 years, the other has not held one since 1995. By year 30, which system has the HIGHER average welfare for ordinary people, and why?',
  options: [
    'The no-elections regime -- a strong ruler never wastes time campaigning and pushes growth straight through.',
    'The democracy -- elections act as a reset button: corrupt rulers can be thrown out, so corruption never compounds for 30 straight years.',
    'Both end up identical -- corruption always wins no matter who rules.',
    'Neither grows -- welfare always falls when corruption starts high.',
  ],
  correctIndex: 1,
  hintAfter:
    'Elections do not guarantee good rulers. They guarantee BAD rulers can be REMOVED without a revolution. Watch the green line in the lab: it bends down whenever rulers fear voters.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Walk 1: Baseline race',
    instruction:
      'Open the Race Lab. Leave everything at defaults (corruption 50, elections every 4 years, free press ON). Run the 30 years and note which line finishes higher.',
    focus: 'the two welfare lines',
  },
  {
    title: 'Walk 2: Switch off the press',
    instruction:
      'Reset, then turn the free press OFF. Run again. The democracy still wins -- but by how much less? A press that exposes scandals makes the election threat credible between elections.',
    focus: 'the press toggle',
  },
  {
    title: 'Walk 3: Starve the elections',
    instruction:
      'Reset, set the election gap to 10 years. Run. Democracy still usually beats the regime, but find the gap where the green line stops reliably winning.',
    focus: 'the election-gap slider',
  },
  {
    title: 'Walk 4: Worst possible start',
    instruction:
      'Set starting corruption to 90, press ON, elections every 4. A democracy recovers from terrible rulers -- watch how many times rulers get changed.',
    focus: 'the ruler-change counter',
  },
];

// ==========================================
// EVIDENCE CARDS (real historical records)
// ==========================================

const EVIDENCE = [
  {
    id: 'famine',
    title: 'Famines: China 1958-61 vs independent India',
    tag: 'ACCOUNTABILITY IN A CRISIS',
    body:
      'China\u2019s Great Leap Forward famine killed an estimated 3 crore people. India\u2019s worst food crises after 1947 never became full famines -- a free press exposed shortages, opposition parties forced debates, and governments had to act or lose elections. Amartya Sen\u2019s famous claim: no famine has ever happened in a functioning democracy with a free press.',
    read: 'A hungry village with a newspaper can save itself. A hungry village that cannot complain, cannot be saved.',
  },
  {
    id: 'emergency',
    title: 'The Emergency, 1975-77: self-correction demonstrated',
    tag: 'DEMOCRACY FIXES ITSELF',
    body:
      'Indira Gandhi suspended civil liberties and jailed opponents. In 1977 the SAME voters who had elected her threw her party out -- the first time a sitting Indian government was voted out over rights. Power came back through the ballot, not bullets. And in 1980 voters gave her another chance: accountability, not revenge.',
    read: 'A bad decision was undone by voters. That is the outcome no other system guarantees.',
  },
  {
    id: 'growth',
    title: 'Growth rates: democracy is NOT slower',
    tag: 'THE DEVELOPMENT MYTH',
    body:
      'Comparing poor democracies and poor autocracies over decades, average economic growth is roughly similar. What differs: autocracies show BOTH the fastest booms AND the worst collapses (one bad dictator can burn decades). Democracies trade spectacular disasters for boring, steady compounding -- exactly what the race lab shows.',
    read: 'Democracy does not promise the fastest growth. It promises the smallest catastrophe.',
  },
  {
    id: 'dignity',
    title: 'Dignity: the vote as an equaliser',
    tag: 'OUTCOMES YOU CANNOT CHART',
    body:
      'When a Dalit woman in a village votes, her vote weighs exactly the same as the landlord\u2019s. Every election extends recognition to groups that were once invisible -- women got the vote everywhere eventually; reservations gave Scheduled Castes and Tribes a guaranteed voice. Expansion of choice is itself an outcome.',
    read: 'Each election adds people who refuse to be invisible. That is democracy working, slowly.',
  },
  {
    id: 'conflict',
    title: 'Conflict resolution: negotiation instead of war',
    tag: 'DISAGREEMENT WITHOUT VIOLENCE',
    body:
      'Every society has language, religion and caste differences. Democracies route those conflicts through legislatures, courts and elections. Belgium handled its French-Dutch tension by constitutional amendment; Sri Lanka\u2019s refusal to share power fairly fed a 26-year civil war. Same difference, different institutions, wildly different outcome.',
    read: 'Democracy does not remove conflict. It removes the need to kill over it.',
  },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS = [
  {
    id: 'misc_elections_slow',
    misconception: 'Elections waste time -- a dictatorship develops faster.',
    correction:
      'Average growth across decades is similar; the difference is variance. Autocracies produce both record booms and record collapses. Democracies never have the worst outcomes because bad rulers get replaced -- the race lab shows the compounding effect of that one difference.',
  },
  {
    id: 'misc_elections_equal',
    misconception: 'Holding elections automatically makes a country a democracy.',
    correction:
      'Democracy needs MORE than the vote: free press, independent courts, the right to criticise rulers, and one-person-one-vote. Election gap 10 in the lab still sometimes beats the regime -- but a country with elections and no press (press OFF) behaves far worse. Non-democratic regimes also hold elections; that does not make them democratic.',
  },
  {
    id: 'misc_equality_economic',
    misconception: 'Democracy must produce economic EQUALITY, so when the rich stay rich, democracy failed.',
    correction:
      'Political equality (one person, one vote) is what democracy delivers by design. Economic equality is not automatic anywhere on Earth. Democracies reduce the WORST deprivation (famines, unchecked exploitation) faster than they flatten income curves. Judge democracy on what it promises: accountable rulers, not equal bank balances.',
  },
  {
    id: 'misc_corruption_unique',
    misconception: 'Corruption is unique to democracies -- remove democracy, remove corruption.',
    correction:
      'Corruption exists in every system; the question is whether it COMPOUNDS. The lab\u2019s red regime lets corruption grow unchecked year after year (1.16x + drift). The democracy keeps resetting it via elections. Remove the mechanism for removal and you get MORE corruption, not less.',
  },
  {
    id: 'misc_best_rule',
    misconception: 'A good, honest dictator is better than any democracy.',
    correction:
      'Even granting the fantasy: what removes the THIRD ruler after the first two good ones? Democracy is not a claim that voters choose perfectly. It is a mechanism that limits the DAMAGE of choosing badly. The lab does not assume democratic rulers are wiser -- only that they can be fired.',
  },
];

// ==========================================
// CHALLENGES (3 tiers)
// ==========================================

export interface Challenge {
  id: string;
  tier: 'foundation' | 'standard' | 'advanced';
  skill: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  // --- foundation ---
  {
    id: 'ch_01',
    tier: 'foundation',
    skill: 'Definition recall',
    question: 'The single most distinctive OUTCOME of democracy, compared with any non-democratic system, is:',
    options: [
      'Faster economic growth in every five-year period',
      'Accountability: citizens can remove rulers without violence',
      'The absence of any corruption among officials',
      'Guaranteed equal incomes for every household',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 7\u2019s core claim: democracy\u2019s unique outcome is a government that can be changed peacefully by the people. Growth, honesty and equality all need more caveats.',
    hints: [
      'What can citizens of a democracy do every few years that nobody under a dictator can?',
      'It is not about how fast rulers act -- it is about who decides how long rulers STAY.',
      'Accountability -- the ability to throw out bad rulers without a revolution.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Non-democratic outcomes',
    question: 'In the race lab, the no-elections regime lets corruption compound at roughly 16% a year. What does the democracy do at each election that the regime never can?',
    options: [
      'It increases taxes to punish corrupt officials',
      'It can reset the ruler -- and with them the accumulated corruption -- via the vote',
      'It borrows money from other democracies',
      'It delays all government spending until corruption falls',
    ],
    correctIndex: 1,
    explanation:
      'The lab models an election as a chance to replace the ruler, dropping corruption sharply. The regime has no such reset, so its corruption only ever grows.',
    hints: [
      'Watch the "rulers changed" counter for the green system -- it ticks up at some elections.',
      'What happens to corruption in the lab exactly when rulers change?',
      'Elections reset the ruler, so corruption restarts from a lower level.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Free press role',
    question: 'Turning the free press OFF in the lab makes the democracy\u2019s advantage smaller. Why does a free press strengthen accountability BETWEEN elections?',
    options: [
      'The press counts the votes and announces winners',
      'Exposed scandals make rulers expect to be punished at the next election, so they behave before it arrives',
      'The press passes laws against corruption',
      'Newspapers directly arrest corrupt officials',
    ],
    correctIndex: 1,
    explanation:
      'Accountability only bites if rulers EXPECT to be caught. A press that exposes scandals raises the expected cost of corruption long before polling day.',
    hints: [
      'Elections are every few years -- what tells citizens what rulers did in between?',
      'The lab raises the chance of ruler change when the press is ON -- why would rulers fear that?',
      'Scandals in the press make the election threat credible.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Famine and accountability',
    question: 'Which historical comparison supports the claim that accountable governments prevent famine?',
    options: [
      'China 1958-61 (no elections, no free press) suffered history\u2019s worst famine; post-1947 democratic India never did',
      'Every democracy has had at least one famine since 1950',
      'Famines happened only in countries with a free press',
      'India\u2019s 1943 Bengal famine occurred under an accountable elected government',
    ],
    correctIndex: 0,
    explanation:
      'Sen\u2019s accountability argument, backed by the record: no substantial famine in a functioning democracy with a free press. China\u2019s famine happened precisely where no one could report or vote against the failed policy.',
    hints: [
      'The Evidence tab has a card on exactly this comparison.',
      'One of the two countries could not criticise its government during the crop failure.',
      'China 1958-61 vs independent India.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Interpreting the model',
    question: 'You set the election gap to 10 years and the democracy now sometimes LOSES the race. What does this honestly teach about democracy as an outcome?',
    options: [
      'Democracy only works with elections every single year',
      'Accountability works through the CHANCE to remove rulers; make that chance rare and the compounding has years to grow -- institutions need to be frequent and credible',
      'The lab is rigged against long election gaps',
      'Longer gaps always help because rulers get more time to implement plans',
    ],
    correctIndex: 1,
    explanation:
      'The lab is honest: the benefit of elections comes from the credible, regular threat of removal. Stretch the gap and corruption compounds nearly unchecked between resets -- matching real weakly-democratic states.',
    hints: [
      'Corruption grows 16% a year in the model. How much compounding fits in 10 years?',
      'Compare how often the green line gets its reset at gap=1 versus gap=10.',
      'Rare accountability is barely accountability.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Evaluating claims',
    question: 'A classmate says: "Our democracy is full of corruption and still the same party keeps winning, so democracy has no real outcome for us." What is the strongest counter?',
    options: [
      'He is right -- democracy only works when every party is honest',
      'Outcomes like the right to criticise, the press exposing scandals, courts checking rulers, and the ABILITY to change the party still exist -- they are outcomes even when one party keeps winning',
      'He should stop voting, since voting clearly changes nothing',
      'Democracy only shows outcomes in rich countries',
    ],
    correctIndex: 1,
    explanation:
      'Democracy\u2019s outcomes include the infrastructure of accountability (press, courts, free speech, the franchise itself), not only a change of ruler. One election result never erases them.',
    hints: [
      'List what the chapter calls "outcomes you cannot put on a chart".',
      'Dignity, conflict resolution, self-correction, expanding scope -- do any survive the classmate\u2019s example?',
      'The capacity to change rulers IS the outcome, even when it is not exercised.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Model mathematics',
    question: 'In the lab, regime corruption follows C(t+1) = 1.16\u00b7C(t) + 3 (capped at 98). Starting at 50, roughly what corruption does the regime reach after just 5 years?',
    options: ['About 65', 'About 80', 'About 105 (uncapped)', 'About 55'],
    correctIndex: 1,
    explanation:
      '50\u219264.2\u219277.5\u219293\u219298(cap) after 4-5 years. Even 3 years of unaccountable rule nearly saturates the scale -- which is why the democracy\u2019s frequent resets matter so much.',
    hints: [
      'Multiply by 1.16 and add 3, five times, capping at 98.',
      '50 \u00d7 1.16 = 58, +3 = 61. Keep going.',
      'By year 5 it is around 80 and climbing toward the 98 cap.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Institutional design',
    question: 'Belgium solved its language conflict by amending its constitution; Sri Lanka\u2019s majoritarian refusal fed a 26-year civil war. What does this contrast most precisely demonstrate?',
    options: [
      'Smaller countries resolve conflicts more easily than large ones',
      'Democracy is a METHOD for negotiating difference: outcomes depend on whether institutions actually give all groups a share in power',
      'Language differences always lead to civil war',
      'Sri Lanka was never a democracy at all',
    ],
    correctIndex: 1,
    explanation:
      'Both were formally democratic for much of the period. The outcome gap came from whether the democratic method -- power sharing, negotiated accommodation -- was actually used. Democracy\u2019s conflict-resolution outcome is conditional on institutional honesty.',
    hints: [
      'Both countries held elections -- so the difference is not election vs no election.',
      'What did Belgium DO with its democratic institutions that Sri Lanka refused to do?',
      'Democratic conflict resolution requires actually sharing power, not just holding votes.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'Which single sentence best captures the chapter\u2019s overall assessment of democracy\u2019s outcomes?',
    options: [
      'Democracy guarantees prosperity, equality and honesty within one generation',
      'Democracy\u2019s value lies in accountable, self-correcting rule that produces dignity and peaceful conflict resolution -- outcomes that are real but gradual, and strongest when institutions (elections, press, courts) stay strong',
      'Democracy\u2019s outcomes are identical to any other form of government in the long run',
      'Democracy only benefits the educated urban middle class',
    ],
    correctIndex: 1,
    explanation:
      'The chapter refuses both exaggerations: democracy is not a magic engine of wealth, nor is it meaningless. Its distinctive outcomes -- accountability, self-correction, dignity, expanded scope -- are slow, structural, and worth the wait.',
    hints: [
      'Eliminate the two extreme answers first.',
      'Which option mentions BOTH the strengths and their conditions?',
      'The middle option -- accountability plus gradual, institution-dependent outcomes.',
    ],
  },
  // ─── Class 10 board-depth additions: outcomes-of-democracy diagnostics ───
  {
    id: 'ch_depth_civ_accountability_garbage',
    tier: 'standard',
    skill: 'Analysis',
    question:
      'A municipal corporation fails to clear garbage for three months; the councillor blames the commissioner, the commissioner blames the state. In a democracy, who is finally ACCOUNTABLE, and how is a Minister in India (parliamentary) different from a Secretary in the USA (presidential)?',
    options: [
      'The elected government is accountable to VOTERS -- councillors face the ward, ministers face the legislature; in India the Minister is politically answerable to Parliament while the Secretary (civil servant) answers administratively; in the USA secretaries answer to the President, not to Congress -- accountability flows differently in the two systems',
      'Nobody is accountable; garbage is fate',
      'Only the commissioner is accountable; elections never touch services',
      'USA secretaries are elected by the people like Indian ministers'
    ],
    correctIndex: 0,
    explanation:
      'Accountability = answerability + enforcement. Citizen\'s charter clause design: "Every garbage complaint will be cleared within 48 hours; every pending complaint older than 72 hours is published weekly with the responsible officer named; citizens may escalate to the ward committee." That operationalises answerability (published), responsiveness (48-hour clock) and enforcement (named officer).',
    hints: [
      'Who can lose their JOB at the next election?',
      'Minister = political head; Secretary = permanent executive.',
      'A charter clause needs a deadline, publicity and a name.'
    ],
  },
  {
    id: 'ch_depth_civ_dpsp_inequality',
    tier: 'advanced',
    skill: 'Analysis',
    question:
      'Which part of the Constitution directs the State to minimise income inequality, what mechanism lets citizens act on a bad cash-transfer scheme, and is "democracy has failed because the Gini coefficient rose since 1991" a fair claim?',
    options: [
      'The Directive Principles (Article 38: minimise inequalities of income/status, Article 39: distribute material resources); citizens respond through elections, courts/PIL, media and pressure groups; the Gini claim is PARTLY fair -- rising inequality is a real failure signal, but a fair evaluation also weighs poverty reduction, social schemes and the fact that democracy is a continuing process, not a one-shot outcome',
      'Fundamental Rights order inequality reduction; nothing can be done about a bad scheme; the Gini claim proves democracy is worthless',
      'The Preamble alone fixes inequality; courts cannot review schemes',
      'Only income statistics define democracy entirely'
    ],
    correctIndex: 0,
    explanation:
      'Directive Principles are non-justiciable guidelines for the State (contrast justiciable Fundamental Rights). Gram Panchayat proposal draft: use the 50% women\'s reservation and Gram Sabha funds for (1) SHG credit lines to women workers, (2) skill training in the village itself, (3) public works with equal wages -- one paragraph, one instrument (the Gram Sabha), one measurable target.',
    hints: [
      'DPSP = directions to the State, not enforceable rights.',
      'Four citizen channels: vote, court, press, association.',
      'Evaluate = evidence both ways, then a verdict.'
    ],
  },
  {
    id: 'ch_depth_civ_minority_rights',
    tier: 'standard',
    skill: 'Recall',
    question:
      'Which two articles protect the cultural and educational rights of minorities, and why does the Constitution let linguistic minorities run their own schools? Then judge the 80%-domicile medical-college reservation.',
    options: [
      'Articles 29 (protection of language/script/culture of any section) and 30 (minorities\' right to establish and administer educational institutions); the aim is that majority rule must not erase minority identity -- culture survives best when the community teaches it; an 80% domicile reservation clashes with Article 14/15 equality norms and would face judicial review as unreasonable classification',
      'Articles 19 and 21; minority schools are banned; domicile quotas are always constitutional',
      'Article 32 alone; minority rights apply only to religion, never language',
      'The Constitution is silent on minorities'
    ],
    correctIndex: 0,
    explanation:
      'Draft a one-paragraph provision for a newly recognised linguistic minority: "The State shall recognise [community] as a linguistic minority; it may establish and administer educational institutions of its choice (Art. 30) with state aid on non-discriminatory terms, and government shall provide textbooks and teachers in the mother tongue at primary level (Art. 350A)." Recognition plus funding plus non-interference -- the three levers of cultural accommodation.',
    hints: [
      '29 protects identity; 30 protects institutions.',
      'Majority rule is exactly why minorities need guarantees.',
      'Judicial review tests quotas against equality articles.'
    ],
  },
  {
    id: 'ch_depth_civ_writs_protest',
    tier: 'foundation',
    skill: 'Recall',
    question:
      'Which article empowers the Supreme Court to issue writs for enforcing Fundamental Rights, and which right is hit when a state bans ALL public protests indefinitely citing law and order?',
    options: [
      'Article 32 (and Article 226 for High Courts); an indefinite blanket ban violates the freedom of assembly (Article 19(1)(b)) and speech (19(1)(a)) -- restrictions must be reasonable, specific and time-bound, not open-ended',
      'Article 21 only; protest has no constitutional protection',
      'Article 17; assemblies are privileges granted by the police',
      'Writs can be issued only against private individuals'
    ],
    correctIndex: 0,
    explanation:
      'Habeas corpus, mandamus, prohibition, certiorari, quo warranto -- Article 32 is called the "heart and soul" of the Constitution (Ambedkar) because it makes rights enforceable, not ornamental. Reasonable-restriction logic: authorities may regulate TIME, PLACE and MANNER of protests, but a permanent total ban fails the proportionality test in courts.',
    hints: [
      '32 for the Supreme Court, 226 for High Courts.',
      'Rights under 19(1) come WITH reasonable restrictions -- read the clause.',
      '"Indefinitely" is the word that fails the test.'
    ],
  },
  {
    id: 'ch_depth_civ_report_card',
    tier: 'advanced',
    skill: 'Evaluation',
    question:
      'A state reserves 50% of panchayat seats for women; female literacy rises from 38% to 61% in ten years. Distinguish accountability from responsiveness, and design a 4-indicator Democracy Report Card for your district.',
    options: [
      'Accountability = answering for decisions (can be removed); responsiveness = acting on needs (how well government listens and delivers); the reservation showed responsiveness (services shifted toward water, schooling) AND accountability (women leaders answerable locally). Report card: (1) % RTI applications answered in 30 days, (2) panchayat meeting attendance and minutes published, (3) school/hospital service audits by citizen committees, (4) complaint redressal time for civic issues',
      'The two words are synonyms; a report card needs no indicators',
      'Accountability means spending more money; responsiveness means winning elections',
      'Only economists can evaluate democracy'
    ],
    correctIndex: 0,
    explanation:
      'Example pairing: a government voted out over corruption shows accountability (it ANSWERED by losing); a government that pre-emptively fixed pothole complaints after citizen audits shows responsiveness. The women\'s-reservation example: panchayat women leaders invested more in drinking water and education -- a measurable responsiveness shift born from an accountability structure.',
    hints: [
      'Accountable to WHOM? Responsive to WHAT?',
      'One is about being judged; the other about acting.',
      'Pick indicators a citizen group can actually measure.'
    ],
  },
  {
    id: 'ch_depth_civ_rti_corruption',
    tier: 'standard',
    skill: 'Analysis',
    question:
      'What is the purpose of the RTI Act 2005, how does it expose a suspect waste-management contract, and how do CVC and Lokpal differ?',
    options: [
      'RTI lets any citizen demand government records within 30 days, shifting the burden from "show cause" to "show file" -- a citizen can ask for the tender documents, bid evaluations and ownership records of the contractor; CVC is an anti-corruption advisory body for central government employees (originating from the 1964 Santhanam committee), while Lokpal is a statutory ombudsman (2013) that can investigate complaints against the PM, ministers and senior officials',
      'RTI is only for journalists; CVC prosecutes ministers; Lokpal handles tax appeals',
      'RTI files must be answered within 5 years; the Lokpal predates independence',
      'RTI covers private companies; CVC and Lokpal are the same body'
    ],
    correctIndex: 0,
    explanation:
      'Complementary transparency measure draft: "Proactive disclosure" -- publish all contracts above Rs 10 lakh, with bid sheets and officer names, on the municipal website within 7 days of award; add an annual social audit by ward committees. RTI is reactive (you must ask); proactive disclosure removes the need to ask. Social audits (employed in MGNREGA) put ordinary citizens in the auditing chair.',
    hints: [
      'RTI flips secrecy: files are the default, secrecy the exception.',
      'Advisory (CVC) vs ombudsman with inquiry powers (Lokpal).',
      'The cheapest transparency is publishing BEFORE anyone asks.'
    ],
  }
];

// ==========================================
// SMALL UI HELPERS
// ==========================================

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discovery', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'race', label: '2 \u00b7 Race Lab', emoji: '\ud83c\udfc1' },
  { id: 'evidence', label: '3 \u00b7 Evidence', emoji: '\ud83d\udcc4' },
  { id: 'challenges', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'misconceptions', label: '5 \u00b7 Misconceptions', emoji: '\ud83e\udee0' },
  { id: 'summary', label: '6 \u00b7 Summary', emoji: '\ud83e\uddfe' },
];

function Chip({ children, tone = 'slate' }: { children: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    green: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    red: 'bg-rose-950 text-rose-300 border-rose-800',
    amber: 'bg-amber-950 text-amber-300 border-amber-800',
    indigo: 'bg-gold-950 text-gold-300 border-gold-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${tones[tone] ?? tones.slate}`}>
      {children}
    </span>
  );
}

function StatCard({
  label, value, sub, color,
}: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`font-mono text-lg font-bold ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-slate-500">{sub}</p>}
    </div>
  );
}

// ==========================================
// CHARTS
// ==========================================

function WelfareChart({
  dW, aW, year, elections, gap,
}: {
  dW: number[]; aW: number[]; year: number; elections: number[]; gap: number;
}) {
  const map = (w: number) => 140 - ((Math.max(80, Math.min(260, w)) - 80) / 180) * 122;
  const path = (arr: number[]) =>
    arr.map((w, i) => `${12 + (i / YEARS) * 316},${map(w)}`).join(' ');
  const dNow = dW[dW.length - 1];
  const aNow = aW[aW.length - 1];
  return (
    <svg viewBox="0 0 340 150" className="w-full" role="img" aria-label="welfare race chart">
      {/* gridlines every 5 years */}
      {[5, 10, 15, 20, 25].map((g) => (
        <line key={g} x1={12 + (g / YEARS) * 316} y1={15} x2={12 + (g / YEARS) * 316} y2={140}
          stroke="#1e293b" strokeWidth={1} />
      ))}
      <line x1="12" y1="140" x2="328" y2="140" stroke="#475569" />
      <line x1="12" y1="15" x2="12" y2="140" stroke="#475569" />
      {/* welfare-100 reference */}
      <line x1="12" y1={map(100)} x2="328" y2={map(100)} stroke="#334155" strokeWidth={1} strokeDasharray="3 4" />
      <text x="320" y={map(100) - 3} fontSize="7" fill="#475569" textAnchor="end">start = 100</text>
      {/* election ticks */}
      {elections.map((e) => (
        <line key={e} x1={12 + (e / YEARS) * 316} y1={136} x2={12 + (e / YEARS) * 316} y2={144}
          stroke="#34d399" strokeWidth={2} />
      ))}
      {year < YEARS && (
        <text x={12 + (year / YEARS) * 316} y={12} fontSize="8" fill="#fbbf24" textAnchor="middle">now</text>
      )}
      <polyline points={path(aW)} fill="none" stroke="#f43f5e" strokeWidth={2.5}
        style={{ transition: 'all 0.25s' }} />
      <polyline points={path(dW)} fill="none" stroke="#34d399" strokeWidth={2.5}
        style={{ transition: 'all 0.25s' }} />
      <text x="18" y="24" fontSize="9" fill="#34d399" fontWeight="bold">
        democracy (elections every {gap} yr)
      </text>
      <text x="18" y="36" fontSize="9" fill="#f43f5e" fontWeight="bold">no-elections regime</text>
      <text x="320" y="148" fontSize="8" fill="#64748b" textAnchor="end">years 0 to {YEARS}</text>
      <circle cx={12 + ((dW.length - 1) / YEARS) * 316} cy={map(dNow)} r={3.5} fill="#a7f3d0" />
      <circle cx={12 + ((aW.length - 1) / YEARS) * 316} cy={map(aNow)} r={3.5} fill="#fecdd3" />
    </svg>
  );
}

function CorruptionChart({ dC, aC }: { dC: number[]; aC: number[] }) {
  const map = (c: number) => 110 - (Math.min(100, c) / 100) * 92;
  const path = (arr: number[]) =>
    arr.map((c, i) => `${12 + (i / YEARS) * 316},${map(c)}`).join(' ');
  return (
    <svg viewBox="0 0 340 120" className="w-full" role="img" aria-label="corruption chart">
      <text x="10" y="12" fontSize="8" fill="#94a3b8" fontWeight="bold">corruption level of rulers (0-100)</text>
      {[0, 50, 100].map((g) => (
        <g key={g}>
          <line x1="12" y1={map(g)} x2="328" y2={map(g)} stroke="#1e293b" strokeWidth={1} />
          <text x="320" y={map(g) - 3} fontSize="7" fill="#475569" textAnchor="end">{g}</text>
        </g>
      ))}
      <polyline points={path(aC)} fill="none" stroke="#fb7185" strokeWidth={2} strokeDasharray="4 3" />
      <polyline points={path(dC)} fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
      <text x="18" y="26" fontSize="8" fill="#fbbf24">demo. rulers</text>
      <text x="80" y="26" fontSize="8" fill="#fb7185">regime rulers</text>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_SocialScienceOutcomesOfDemocracySim() {
  const [tab, setTab] = useState<TabKey>('discovery');

  // ── prediction round state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [showPredictHint, setShowPredictHint] = useState(false);

  // ── race lab state (original mechanics preserved) ──
  const [p, setP] = useState(50); // initial corruption level
  const [gap, setGap] = useState(4); // years between elections
  const [press, setPress] = useState(true);
  const [running, setRunning] = useState(false);
  const [year, setYear] = useState(0);
  const [series, setSeries] = useState({ dW: [100], aW: [100], dC: [p], aC: [p] });
  const [changes, setChanges] = useState(0);
  const [eventLog, setEventLog] = useState<{ year: number; kind: 'change' | 'held'; note: string }[]>([]);
  const raf = useRef(0);

  // ── challenge state ──
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});

  // ── misconception reveal state ──
  const [openMisc, setOpenMisc] = useState<string | null>(null);

  // ── evidence browser state ──
  const [evidenceIdx, setEvidenceIdx] = useState(0);

  useEffect(() => {
    let alive = true;
    let last = 0;
    const loop = (t: number) => {
      if (!alive) return;
      if (running && t - last > 260) {
        last = t;
        step();
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf.current);
    };
  });

  const step = () => {
    setSeries((s) => {
      if (s.dW.length > YEARS) return s;
      let dC = s.dC[s.dC.length - 1];
      let aC = s.aC[s.aC.length - 1];
      const y = s.dW.length; // year number being simulated
      dC = Math.min(95, dC * 1.12 + 2);
      if (y % gap === 0) {
        const chance = Math.min(0.95, 0.25 + dC / 130 + (press ? 0.25 : 0));
        const held = true;
        if (Math.random() < chance) {
          dC = Math.max(6, p * 0.35);
          setChanges((c) => c + 1);
          setEventLog((log) =>
            [...log, { year: y, kind: 'change' as const, note: `rulers voted out \u2014 corruption reset to ${Math.round(dC)}` }]
          );
        } else if (held) {
          setEventLog((log) =>
            [...log, { year: y, kind: 'held' as const, note: 'incumbent re-elected \u2014 voters gave them another chance' }]
          );
        }
      }
      aC = Math.min(98, aC * 1.16 + 3);
      const dW = s.dW[s.dW.length - 1] * (1 + (2.6 - dC * 0.045) / 100);
      const aW = s.aW[s.aW.length - 1] * (1 + (3.0 - aC * 0.075 - 0.3) / 100);
      return { dW: [...s.dW, dW], aW: [...s.aW, aW], dC: [...s.dC, dC], aC: [...s.aC, aC] };
    });
    setYear((y) => Math.min(YEARS, y + 1));
  };

  const reset = () => {
    setRunning(false);
    setYear(0);
    setChanges(0);
    setEventLog([]);
    setSeries({ dW: [100], aW: [100], dC: [p], aC: [p] });
  };

  const electionYears = useMemo(() => {
    const arr: number[] = [];
    for (let y = gap; y <= YEARS; y += gap) arr.push(y);
    return arr;
  }, [gap]);

  const dNow = series.dW[series.dW.length - 1];
  const aNow = series.aW[series.aW.length - 1];
  const dCNow = series.dC[series.dC.length - 1];
  const aCNow = series.aC[series.aC.length - 1];
  const dLead = dNow > aNow;
  const lead = Math.abs(dNow - aNow);

  // challenge bookkeeping
  const visibleChallenges = CHALLENGES.filter((c) => tierFilter === 'all' || c.tier === tierFilter);
  const score = useMemo(() => {
    let right = 0;
    let attempted = 0;
    Object.entries(answers).forEach(([id, choice]) => {
      const ch = CHALLENGES.find((c) => c.id === id);
      if (ch) {
        attempted += 1;
        if (choice === ch.correctIndex) right += 1;
      }
    });
    return { right, attempted };
  }, [answers]);

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((a) => ({ ...a, [id]: idx }));
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  const evidence = EVIDENCE[evidenceIdx];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ── header ── */}
      <header className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">\u2696\ufe0f</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Class 10 Civics \u2014 Outcomes of Democracy
          </p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">
            The Accountability Race: 30 Years, Two Systems
          </h1>
        </div>
        <div className="flex gap-2">
          <Chip tone="indigo">chapters 5-7</Chip>
          <button
            onClick={reset}
            className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all"
          >
            Reset race
          </button>
        </div>
      </header>

      {/* ── tab bar ── */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-gold-600 border-gold-500 text-white shadow-lg shadow-gold-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* TAB 1: DISCOVERY                                             */}
      {/* ============================================================ */}
      {tab === 'discovery' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-gold-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400 mb-2">
              Before you touch anything \u2014 predict
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">{DISCOVERY_QUESTION.question}</p>
            <div className="mt-3 space-y-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                let cls = 'border-slate-700 bg-slate-900 hover:border-gold-600';
                if (predicted !== null && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                else if (chosen && !isCorrect) cls = 'border-rose-600 bg-rose-950/40';
                return (
                  <button
                    key={i}
                    onClick={() => setPredicted(i)}
                    disabled={predicted !== null}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                  >
                    <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                    {opt}
                    {predicted !== null && isCorrect && (
                      <span className="ml-2 text-emerald-400 font-bold text-xs">\u2713</span>
                    )}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                {DISCOVERY_QUESTION.hintAfter}
                <p className="mt-1 text-amber-300 font-bold">
                  Now go to the Race Lab and make this same bet with the sliders.
                </p>
                <button
                  onClick={() => setTab('race')}
                  className="mt-2 min-h-9 px-4 rounded-lg bg-gold-600 hover:bg-gold-500 text-xs font-bold"
                >
                  Open the Race Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXPLORATION_STEPS.map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold-600 text-[10px] font-black mr-1.5">
                    {i + 1}
                  </span>
                  {s.title}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.instruction}</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-wider text-gold-400">
                  watch: {s.focus}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <p className="font-bold text-slate-300 mb-1">The question this whole chapter answers</p>
            <p>
              Democracy is not just a VALUE to admire \u2014 it is a machine with measurable OUTCOMES.
              This sim tests the biggest one: does the ability to remove rulers actually produce better
              lives over a generation? Keep your prediction in mind while the years tick past.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: RACE LAB (original sim, preserved + extended)         */}
      {/* ============================================================ */}
      {tab === 'race' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3 bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
            <WelfareChart dW={series.dW} aW={series.aW} year={year} elections={electionYears} gap={gap} />
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setRunning((r) => !r)}
                disabled={year >= YEARS}
                className={`flex-1 min-h-11 rounded-xl text-xs font-bold border transition-all disabled:opacity-40 ${
                  running
                    ? 'bg-amber-600 border-amber-500 text-white'
                    : 'bg-emerald-600 border-emerald-500 text-white'
                }`}
              >
                {running ? 'Pause' : year >= YEARS ? 'Race finished' : 'Run 30 years'}
              </button>
              <button
                onClick={step}
                disabled={running || year >= YEARS}
                className="flex-1 min-h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold disabled:opacity-40 transition-all"
              >
                Step 1 year
              </button>
            </div>

            {/* corruption chart */}
            <div className="mt-3 p-2 bg-slate-950 rounded-xl border border-slate-800">
              <CorruptionChart dC={series.dC} aC={series.aC} />
            </div>

            {/* event log */}
            <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
                election diary \u2014 democracy side
              </p>
              {eventLog.length === 0 && (
                <p className="text-[11px] text-slate-600">
                  No elections yet. Run the race and every {gap} years an entry appears here.
                </p>
              )}
              {eventLog
                .slice()
                .reverse()
                .map((e, i) => (
                  <p key={i} className="text-[11px] font-mono leading-relaxed">
                    <span className={e.kind === 'change' ? 'text-emerald-400' : 'text-slate-500'}>
                      yr {e.year}: {e.note}
                    </span>
                  </p>
                ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>Starting corruption of rulers</span>
                  <span className="font-mono text-rose-300">{p}/100</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  value={p}
                  aria-label="initial corruption"
                  onChange={(e) => {
                    setP(Number(e.target.value));
                    reset();
                  }}
                  className="w-full mt-1 min-h-11 accent-rose-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 flex justify-between">
                  <span>Election gap (democracy)</span>
                  <span className="font-mono text-gold-300">every {gap} yr</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={gap}
                  aria-label="election gap"
                  onChange={(e) => {
                    setGap(Number(e.target.value));
                    reset();
                  }}
                  className="w-full mt-1 min-h-11 accent-gold-500"
                />
              </div>
              <button
                onClick={() => {
                  setPress((x) => !x);
                  reset();
                }}
                className={`w-full min-h-11 rounded-xl text-xs font-bold border transition-all ${
                  press
                    ? 'bg-gold-600 border-gold-500 text-white'
                    : 'bg-slate-950 border-slate-700 text-slate-300'
                }`}
              >
                Free press exposing scandals: {press ? 'YES' : 'NO'}
              </button>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Every slider change resets the race \u2014 both systems always start from the SAME
                corruption ({p}/100) and welfare 100, so the only difference is the machine itself.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Year" value={`${year}/${YEARS}`} color="text-amber-300" />
              <StatCard label="Rulers changed (demo.)" value={`${changes} times`} color="text-gold-300" />
              <StatCard
                label="Welfare \u00b7 democracy"
                value={Math.round(dNow).toString()}
                color="text-emerald-300"
              />
              <StatCard
                label="Welfare \u00b7 no-elections"
                value={Math.round(aNow).toString()}
                color="text-rose-300"
              />
              <StatCard label="Corruption \u00b7 demo." value={`${Math.round(dCNow)}/100`} color="text-amber-300" />
              <StatCard label="Corruption \u00b7 regime" value={`${Math.round(aCNow)}/100`} color="text-rose-300" />
            </div>

            {year > 0 && (
              <div
                className={`p-3 rounded-2xl border text-xs font-bold leading-relaxed ${
                  dLead
                    ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/50 border-rose-800 text-rose-300'
                }`}
              >
                {dLead
                  ? `Democracy leads by ${Math.round(lead)} welfare points \u2014 and its rulers have been changed ${changes} time(s) without a single bullet.`
                  : `The regime leads by ${Math.round(lead)} points this run \u2014 rerun it a few times: with a long election gap the reset comes too rarely.`}
              </div>
            )}

            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-gold-300 mb-1">Outcomes you cannot put on a chart</p>
              <p>- Dignity: a Dalit woman\u2019s vote counts the same as a landlord\u2019s.</p>
              <p>- Conflict resolution: groups settle differences by negotiation, not war.</p>
              <p>- Self-correction: a bad decision (Emergency 1975-77) was undone by voters, not by violence.</p>
              <p>
                - Expanding scope: each election adds groups who refuse to be invisible -- that is
                democracy working, slowly.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
              <span className="font-bold">Misconception killer:</span> &quot;democracy is slower, so it
              develops less.&quot; Studies show average growth is similar -- the difference is that
              unaccountable rulers let corruption COMPOUND (red line bends down), while elections keep
              resetting it. Democracies also never have the worst famines: a free press forces action.
            </div>
          </div>

          <footer className="md:col-span-5 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
            <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
            <p>
              1. Start corruption at 90 and run with free press ON vs OFF -- how many extra points of
              welfare does the press save by year 30?
            </p>
            <p className="mt-1">
              2. Set elections every 10 years -- does democracy still beat the no-elections regime? Find
              the largest election gap that keeps the green line ahead.
            </p>
            <p className="mt-1">
              3. Run the same settings 5 times. Does the regime EVER win when elections come every 4
              years and the press is free? Why is the answer hard to get?
            </p>
          </footer>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: EVIDENCE                                              */}
      {/* ============================================================ */}
      {tab === 'evidence' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Chip tone="amber">{evidence.tag}</Chip>
              <span className="text-[10px] text-slate-500">
                record {evidenceIdx + 1} of {EVIDENCE.length}
              </span>
            </div>
            <h2 className="text-base font-extrabold text-white mb-2">{evidence.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{evidence.body}</p>
            <div className="mt-3 p-3 rounded-xl bg-gold-950/50 border border-gold-800 text-xs text-gold-200 italic leading-relaxed">
              {evidence.read}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setEvidenceIdx((i) => (i + EVIDENCE.length - 1) % EVIDENCE.length)}
                className="min-h-9 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold"
              >
                \u2190 previous
              </button>
              <button
                onClick={() => setEvidenceIdx((i) => (i + 1) % EVIDENCE.length)}
                className="min-h-9 px-3 rounded-lg bg-gold-600 hover:bg-gold-500 text-xs font-bold"
              >
                next record \u2192
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {EVIDENCE.map((ev, i) => (
              <button
                key={ev.id}
                onClick={() => setEvidenceIdx(i)}
                className={`p-2 rounded-xl border text-[10px] font-bold leading-tight transition-all ${
                  i === evidenceIdx
                    ? 'bg-gold-600 border-gold-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                {ev.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <p className="font-bold text-slate-300 mb-1">How to use these records</p>
            <p>
              Each record is real. For every one, ask: which SIDE of the race lab does it support --
              the green line (accountable rulers) or the red line (unaccountable rulers)? The model is
              a simplification; these five records are the evidence behind it.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CHALLENGES                                            */}
      {/* ============================================================ */}
      {tab === 'challenges' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-slate-400 mr-1">
              Score: <span className="font-mono font-bold text-emerald-300">{score.right}</span>
              /{score.attempted || 0}
            </p>
            <Chip tone="green">{score.right} correct</Chip>
            <Chip tone="slate">{CHALLENGES.length} questions total</Chip>
            <div className="ml-auto flex gap-1.5">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`min-h-9 px-3 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    tierFilter === t ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {visibleChallenges.map((ch, qi) => {
            const chosen = answers[ch.id];
            const isRevealed = revealed[ch.id];
            const hints = hintLevel[ch.id] ?? 0;
            return (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border ${
                  isRevealed
                    ? chosen === ch.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-800'
                      : 'bg-rose-950/30 border-rose-800'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Chip tone={ch.tier === 'foundation' ? 'green' : ch.tier === 'standard' ? 'amber' : 'red'}>
                    {ch.tier}
                  </Chip>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{ch.skill}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">Q{qi + 1}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-2.5">{ch.question}</p>
                <div className="space-y-1.5">
                  {ch.options.map((opt, i) => {
                    let cls = 'border-slate-700 bg-slate-950 hover:border-gold-600';
                    if (isRevealed && i === ch.correctIndex) cls = 'border-emerald-600 bg-emerald-950/60';
                    else if (isRevealed && i === chosen) cls = 'border-rose-600 bg-rose-950/60';
                    return (
                      <button
                        key={i}
                        onClick={() => pickAnswer(ch.id, i)}
                        disabled={isRevealed}
                        className={`w-full text-left px-3.5 py-2 rounded-xl border text-xs transition-all ${cls}`}
                      >
                        <span className="font-mono text-slate-500 mr-2">{'ABCD'[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!isRevealed && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setHintLevel((h) => ({ ...h, [ch.id]: Math.min(3, hints + 1) }))}
                      disabled={hints >= 3}
                      className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300 disabled:opacity-40"
                    >
                      {hints === 0 ? 'I need a hint' : `more (${hints}/3)`}
                    </button>
                    {hints > 0 && (
                      <p className="text-[11px] text-amber-200/90 leading-relaxed w-full px-1">
                        {ch.hints[hints - 1]}
                      </p>
                    )}
                  </div>
                )}
                {isRevealed && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className={chosen === ch.correctIndex ? 'font-bold text-emerald-400' : 'font-bold text-rose-400'}>
                      {chosen === ch.correctIndex ? 'Correct. ' : 'Not yet. '}
                    </span>
                    {ch.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {score.attempted === CHALLENGES.length && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800 text-sm text-emerald-200 font-bold text-center">
              All {CHALLENGES.length} attempted \u2014 {score.right} right. Anything below 7/9 means the
              Misconceptions tab is waiting for you.
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: MISCONCEPTIONS                                        */}
      {/* ============================================================ */}
      {tab === 'misconceptions' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed">
            Five wrong ideas about democracy\u2019s outcomes. Try to refute each one yourself, then open
            it \u2014 the refutation is the chapter.
          </p>
          {MISCONCEPTIONS.map((m) => (
            <div key={m.id} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
              <button
                onClick={() => setOpenMisc((cur) => (cur === m.id ? null : m.id))}
                className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
              >
                <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                <span className="text-sm font-bold text-rose-200 flex-1">{m.misconception}</span>
                <span className="text-slate-500 text-xs">{openMisc === m.id ? '\u25b2' : '\u25bc'}</span>
              </button>
              {openMisc === m.id && (
                <div className="px-4 pb-4">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                    <span className="font-bold text-emerald-300">The correction: </span>
                    {m.correction}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: SUMMARY                                               */}
      {/* ============================================================ */}
      {tab === 'summary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <StatCard label="Races run this session" value={String(changes > 0 || year > 0 ? 1 : 0)} sub="at least one" color="text-gold-300" />
            <StatCard label="Years simulated" value={`${year}`} color="text-amber-300" />
            <StatCard label="Peaceful ruler changes" value={String(changes)} color="text-emerald-300" />
            <StatCard
              label="Challenge score"
              value={`${score.right}/${CHALLENGES.length}`}
              color="text-slate-200"
            />
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
              What you now know that a textbook paragraph cannot show
            </p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>
                Accountability is a MECHANISM, not a mood: the regular, credible chance of losing an
                election is what keeps corruption from compounding.
              </li>
              <li>
                The free press is the amplifier that makes the mechanism bite between elections --
                switch it off in the lab and watch the advantage shrink.
              </li>
              <li>
                Democracy\u2019s promise is not the fastest growth; it is the smallest catastrophe
                (famines never in functioning democracies, bad decisions reversed at the ballot).
              </li>
              <li>
                Dignity, conflict resolution and expanding scope are outcomes too -- harder to chart,
                impossible to get from any unaccountable system.
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
              <p className="font-bold mb-1">If you remember one line</p>
              <p>
                A democracy is the only system where the worst ruler\u2019s error has an expiry date:
                the next election. Every other outcome in this chapter flows from that one fact.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-slate-200 mb-1">Where to go next</p>
              <p>
                Re-run the race with gap = 10 and press OFF \u2014 the closest a lab can come to a
                democracy that only holds elections. Then read the Sri Lanka evidence card again and
                ask what its institutions refused to do.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTab('race')}
              className="min-h-11 px-5 rounded-xl bg-gold-600 hover:bg-gold-500 text-sm font-bold"
            >
              Back to the race
            </button>
            <button
              onClick={() => {
                reset();
                setTab('race');
              }}
              className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold"
            >
              Fresh race
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_SocialScienceOutcomesOfDemocracySim;
