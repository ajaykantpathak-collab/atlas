'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Civics -- Gender, Religion and Caste (Chapter 3)
 * Representation arithmetic lab: real-world baseline datasets on women's
 * representation, religious diversity and caste-based disadvantage, plus
 * sliders that show how reservation and secular design change computed
 * outcomes. Self-contained: react + tailwind only. Deterministic.
 */

export function C10_CivicsGenderReligionCasteSim() {
  // ── Gender lab ──
  const [womenMpShare, setWomenMpShare] = useState(9); // Lok Sabha ~9% (2004 era baseline: 14 in 1952, ~9-15% over decades)
  const [womenReservation, setWomenReservation] = useState(33); // Women's Reservation Bill proposal
  const [literacyGap, setLiteracyGap] = useState(17); // male 76% vs female 59% (2001-era census)

  // ── Religion lab ──
  const [hindu, setHindu] = useState(79.8);
  const [muslim, setMuslim] = useState(14.2);
  const [christian, setChristian] = useState(2.3);
  const [sikh, setSikh] = useState(1.7);
  const [otherR, setOtherR] = useState(2.0);
  const [communalPolicy, setCommunalPolicy] = useState<'secular' | 'majoritarian'>('secular');

  // ── Caste lab ──
  const [scStShare, setScStShare] = useState(24.5); // SC ~16.6% + ST ~8.6% (2011 approx 24.5 at GCSE simplification ~26)
  const [reservedSeats, setReservedSeats] = useState(24.5); // SC/ST reservation in Lok Sabha approximates population

  const genderJustice = useMemo(() => {
    const effective = womenReservation ? Math.min(50, (womenMpShare * (100 - womenReservation) + womenReservation * womenReservation) / 100 + womenReservation * 0.45) : womenMpShare;
    return Math.round(effective * 10) / 10;
  }, [womenMpShare, womenReservation]);

  const religionSum = hindu + muslim + christian + sikh + otherR;
  const communalism = useMemo(() => {
    let base = 0;
    base += communalPolicy === 'majoritarian' ? 70 : 8;
    base += Math.min(12, Math.abs(100 - religionSum) * 1.2);
    return Math.max(0, Math.min(100, Math.round(base)));
  }, [communalPolicy, religionSum]);

  const casteRepresentation = Math.min(100, Math.round((reservedSeats / scStShare) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-pink-950/80 rounded-2xl border border-pink-700">🧕</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Class 10 Civics -- Gender, Religion and Caste</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Representation Arithmetic of Social Divisions</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          {/* GENDER */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3">Lab 1: Gender and politics</p>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-3">
              <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-slate-500">Women MPs (Lok Sabha baseline)</p>
                <p className="font-mono font-black text-pink-300">{womenMpShare}%</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-slate-500">Women population share</p>
                <p className="font-mono font-black text-slate-200">48-49%</p>
              </div>
              <div className="bg-slate-950 rounded-xl p-2 border border-pink-800">
                <p className="text-slate-500">Effective share with reservation</p>
                <p className="font-mono font-black text-emerald-300">{genderJustice}%</p>
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400"><span>Women MPs share</span><span className="font-mono">{womenMpShare}%</span></div>
            <input type="range" min={5} max={33} value={womenMpShare} aria-label="women MP share"
              onChange={(e) => setWomenMpShare(Number(e.target.value))} className="w-full accent-pink-500" />
            <div className="flex justify-between text-[11px] text-slate-400"><span>Reservation for women in legislatures</span><span className="font-mono">{womenReservation}%</span></div>
            <input type="range" min={0} max={50} value={womenReservation} aria-label="women reservation"
              onChange={(e) => setWomenReservation(Number(e.target.value))} className="w-full accent-emerald-500" />
            <div className="flex justify-between text-[11px] text-slate-400"><span>Sex ratio of literacy (female vs male literacy gap)</span><span className="font-mono">{literacyGap} pts</span></div>
            <input type="range" min={5} max={30} value={literacyGap} aria-label="literacy gap"
              onChange={(e) => setLiteracyGap(Number(e.target.value))} className="w-full accent-sky-500" />
            <p className="text-[10px] text-slate-500 mt-1">Reality check (2001 census era): male literacy 76%, female 59% -- a {literacyGap}-point gap; sex ratio about 927-933 women per 1000 men; women&apos;s workforce share about one-third, most unpaid on family land. Kerala vs Nainital-style contrast: where girls&apos; education rose, maternal and infant mortality fell.</p>
          </div>

          {/* RELIGION */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-3">Lab 2: Religion and communalism (census shares, %)</p>
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: 'Hindus', v: hindu, set: setHindu, c: 'bg-orange-500' },
                { label: 'Muslims', v: muslim, set: setMuslim, c: 'bg-emerald-500' },
                { label: 'Christians', v: christian, set: setChristian, c: 'bg-sky-500' },
                { label: 'Sikhs', v: sikh, set: setSikh, c: 'bg-amber-400' },
                { label: 'Others', v: otherR, set: setOtherR, c: 'bg-slate-500' },
              ].map((r) => (
                <div key={r.label} className="text-center">
                  <div className={`h-24 ${r.c} rounded-t-lg`} style={{ height: `${Math.min(96, r.v * 1.1)}px` }} />
                  <span className="text-[9px] font-mono text-slate-300">{r.v.toFixed(1)}%</span>
                  <p className="text-[9px] text-slate-500">{r.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button onClick={() => setCommunalPolicy('secular')}
                className={`py-2 rounded-xl text-[11px] font-bold ${communalPolicy === 'secular' ? 'bg-indigo-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Secular design (no state religion)
              </button>
              <button onClick={() => setCommunalPolicy('majoritarian')}
                className={`py-2 rounded-xl text-[11px] font-bold ${communalPolicy === 'majoritarian' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Majoritarian design (one religion rules)
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
              Communalism stages: (1) people of one religion = one community with shared interests, (2) one community&apos;s interests differ from others, (3) one community&apos;s interests are opposed to others -- and if fused with political power it becomes majoritarian supremacy. Computed communalism index: <span className={`font-mono font-bold ${communalism > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>{communalism}/100</span> (sum check: {religionSum.toFixed(1)}%).
            </p>
          </div>

          {/* CASTE */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">Lab 3: Caste and reservation arithmetic</p>
            <div className="flex justify-between text-[11px] text-slate-400"><span>SC + ST population share</span><span className="font-mono">{scStShare}%</span></div>
            <input type="range" min={15} max={30} step={0.5} value={scStShare} aria-label="SC ST population share"
              onChange={(e) => setScStShare(Number(e.target.value))} className="w-full accent-amber-500" />
            <div className="flex justify-between text-[11px] text-slate-400"><span>Reserved Lok Sabha seats for SC/ST</span><span className="font-mono">{reservedSeats}%</span></div>
            <input type="range" min={0} max={30} step={0.5} value={reservedSeats} aria-label="reserved seats"
              onChange={(e) => setReservedSeats(Number(e.target.value))} className="w-full accent-emerald-500" />
            <p className="text-[11px] text-slate-500 mt-1">
              Representation coverage: <span className="font-mono font-bold text-emerald-300">{casteRepresentation}%</span> of population share covered by reserved seats.
              Note: seats are reserved for SC and ST -- but NO seat is reserved on religion, because India is secular. One-third of seats in panchayats and municipalities ARE reserved for women.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 text-xs text-slate-300 leading-relaxed space-y-3">
            <div>
              <p className="font-bold text-pink-300 mb-1">Feminist movements won</p>
              <p className="text-slate-400 text-[11px]">Equal political rights, more education and career opportunities, legal reform (equal wages, protection against harassment and dowry). Sexual division of labour: housework invisible, unpaid, taken for granted -- &quot;public/private&quot; divide.</p>
            </div>
            <div>
              <p className="font-bold text-violet-300 mb-1">Indian secularism (constitutional)</p>
              <p className="text-slate-400 text-[11px]">No official religion (unlike Sri Lanka&apos;s Buddhism or Pakistan&apos;s Islam); freedom to profess, practise and propagate; state may INTERVENE to ensure equality (banning untouchability, regulating personal laws to protect rights). Indian secularism = principled distance, not US-style strict wall.</p>
            </div>
            <div>
              <p className="font-bold text-amber-300 mb-1">Caste: hereditary, endogamous, ritual hierarchy</p>
              <p className="text-slate-400 text-[11px]">Casteism in politics is NOT new caste inequalities -- it is when caste alone alone alone decides: no seat reserved on religion; parties CHOOSE candidates from castes for winnability, caste groups become vote banks. But politics also GIVES disadvantaged castes voice (no parliamentary seat on religion, but SC/ST reservation exists).</p>
            </div>
            <div className="p-3 rounded-xl bg-pink-950/40 border border-pink-800/60 text-[11px] text-pink-200 leading-relaxed">
              <span className="font-bold">Misconception killer:</span> &quot;Talking about caste, gender or religion in politics always divides the nation.&quot; The three labs compute the honest version: every social division APPEARS in politics whether named or not (9% women MPs while nearly half the voters are women); expressing and bargaining over these identities THROUGH democratic institutions (reservation, secular intervention) lowers conflict -- suppressing them from discussion lets majoritarian designs (see the communalism index jump) drive it underground.
            </div>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

// ─── Class 10 board-depth drill bank (Chapter 3: Gender, Religion and Caste) ───
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_civ_cbse_03_001',
    q: 'A sexual division of labour means...',
    options: [
      'Housework and child-rearing are assigned to women and taken for granted as unpaid "private" work, while paid "public" work goes mostly to men -- feminist movements demand its abolition, not its glorification',
      'Men and women are paid identical wages everywhere',
      'All housework is done by men in India',
      'The division of labour is a biological law'
    ],
    answer: 0,
    why: 'The chapter opens with this: women do all housework, and an average Indian woman works more hours than an average man, but much of it is unpaid and invisible in GDP. Politics enters when women organise (feminist movements) to demand change in this division.',
  },
  {
    nodeId: 'c10_civ_cbse_03_002',
    q: 'Which figures expose under-representation of women in Indian legislatures?',
    options: [
      'Women are nearly half the population but under ~15% of Lok Sabha members (14 in 1952, single digits for decades), their literacy trails men by double-digit points, and about one-third of women are in the paid workforce',
      'Women are over-represented in Parliament relative to population',
      'India has had no women MPs ever',
      'Female literacy has always equaled male literacy'
    ],
    answer: 0,
    why: 'Representation arithmetic is the core skill: compare group share in population vs share in elected bodies. One-third seats reserved for women in panchayats/municipalities (73rd/74th) is the constitutional response; a similar national reservation took decades (passed 2023).',
  },
  {
    nodeId: 'c10_civ_cbse_03_003',
    q: 'Communalism, in its extreme form, leads people to believe that...',
    options: [
      'people of one religion belong to ONE community with common interests that are fundamentally OPPOSED to other communities -- so political power should rest with the majority religion alone',
      'all religions must be taxed equally',
      'religion is a private affair only',
      'every citizen votes as an individual, never as a group'
    ],
    answer: 0,
    why: 'The three-stage ladder: shared religious identity -> differing interests -> opposed interests demanding political supremacy. Communalism becomes fatal when fused with politics (majoritarianism). It has NO modern basis: people of one religion differ by caste, class, language and region.',
  },
  {
    nodeId: 'c10_civ_cbse_03_004',
    q: 'Indian secularism differs from the strict US separation of church and state because...',
    options: [
      'the Indian state practices PRINCIPLED DISTANCE: no state religion, equal protection for all, but the state MAY intervene in religion to secure equality -- banning untouchability, opening temples to all castes, protecting minority institutions',
      'India has an official state religion',
      'India bans all public expressions of religion',
      'Indian secularism means the PM must be non-religious'
    ],
    answer: 0,
    why: 'Constitution: no state religion (unlike Sri Lanka/Pakistan), freedom of religion (Articles 25-28), equality (14-16) -- plus positive intervention to end religious discrimination. That intervention is why Indian secularism is sometimes called "principled distance".',
  },
  {
    nodeId: 'c10_civ_cbse_03_005',
    q: 'Caste HEREDITARY occupational divisions persist today mostly as...',
    options: [
      'endogamous social groups (marry within) that continue to shape disadvantage in education, jobs and marriage -- even though the Constitution bans untouchability and caste discrimination',
      'a fully abolished system with no social traces',
      'a purely religious ritual with no social effect',
      'a legal classification the Census abolished in 1951'
    ],
    answer: 0,
    why: 'Caste has lost much of its ritual force and old occupations are changing -- but caste endogamy and continued disadvantage (SC/ST gaps in literacy, jobs) keep it alive, which is why reservation and anti-discrimination law remain constitutional policy.',
  },
  {
    nodeId: 'c10_civ_cbse_03_006',
    q: 'Which statement about caste IN politics is correct?',
    options: [
      'Caste appears in politics when parties pick candidates for caste arithmetic and caste groups campaign as vote banks -- but universal adult franchise and one-person-one-vote also give disadvantaged castes political power (no seat is reserved on religion; SC/ST seats are reserved)',
      'The Constitution reserves seats on religion for minorities in the Lok Sabha',
      'Caste has disappeared from election campaigns',
      'Only upper castes can contest elections in India'
    ],
    answer: 0,
    why: 'Two-sided truth: exclusive attention to caste is harmful (no parliamentary reservation by religion, parties should not nominate purely by caste), yet suppressed identity is worse -- politics of social justice (reservation, OBC mobilisation since Mandal) widened democracy. Universal adult franchise itself broke caste political hierarchies.',
  },
  {
    nodeId: 'c10_civ_cbse_03_007',
    q: 'Why does the textbook argue that social divisions do NOT disappear when we refuse to talk about them?',
    options: [
      'Democracy transforms social divisions into political voice: the US Black Civil Rights movement, Dalit politics and feminist campaigns show that expressing disadvantage democratically produces reform, while ignoring it entrenches it (gender lab: 9% women MPs without any naming)',
      'Because silence makes inequalities grow faster only in monsoons',
      'Because the law requires every citizen to discuss identity daily',
      'Because divisions exist only in politics, never in society'
    ],
    answer: 0,
    why: 'The honest normative claim: in a democracy, it is better to express social divisions through institutions than to pretend they do not exist -- democracy rewards voice with bargaining and coalition (the " combination of two identities" argument: no person has only ONE identity).',
  },
  {
    nodeId: 'c10_civ_cbse_03_004',
    q: 'What is the exact constitutional status of the words "secular" and "socialist" in the Preamble, and what does Indian secularism mean in practice?',
    options: [
      'Added by the 42nd Amendment (1976): the State has NO official religion, Articles 25-28 guarantee freedom of conscience and free profession/practice/propagation of religion, and the State may intervene IN religion to secure equality (abolishing untouchability, opening temples to all castes)',
      '"Secular" was in the original 1950 text; it means the state is anti-religion',
      'India has an official religion; the word is decorative',
      'Secularism bans religious expression in public'
    ],
    answer: 0,
    why: 'Evaluate the UCC (Uniform Civil Code) argument: it sits in Directive Principles (Article 44) -- one civil code for all citizens vs religious-freedom concerns of communities (Shah Bano case, 1985, showed the tension); both positions are constitutional arguments, not tests of patriotism. A 1980s-style communal mobilisation (Babri era) is the negative case: religion converted into political supremacy claims.',
  },
  {
    nodeId: 'c10_civ_cbse_03_004',
    q: 'Draft a one-paragraph "Secularism Charter" for a school. Which elements fit the constitutional design?',
    options: [
      'No religious observance made compulsory; festivals of all communities acknowledged equally; no religious gate-keeping of admissions; freedom to wear/practise within reasonable discipline; complaints of religious discrimination heard by a named authority',
      'Only the majority religion\'s festivals on the calendar; prayers compulsory',
      'A blanket ban on discussing any religion anywhere in school',
      'Religious instruction by the state in every classroom'
    ],
    answer: 0,
    why: 'The charter mirrors principled distance: equal respect (not hostile exclusion), freedom WITH equality, and an enforcement path. Compare the communalism stages: a charter blocks stage one (assigning fixed "interests" by religion) from hardening into stage three (political supremacy claims).',
  },
  {
    nodeId: 'c10_civ_cbse_03_008',
    q: 'Overlapping vs cross-cutting social differences: which pairing is right?',
    options: [
      'Overlapping: the same group is disadvantaged on multiple dimensions at once (e.g. Dalits disadvantaged in caste AND economy) -> sharper conflict; cross-cutting: divisions slice across each other (Netherlands: Catholics and Protestants each include rich and poor) -> easier accommodation',
      'Overlapping differences reduce conflict; cross-cutting ones cause civil wars',
      'India has no overlapping differences; every difference is cross-cutting',
      'The two terms are synonyms'
    ],
    answer: 0,
    why: 'The textbook comparison: Northern Ireland (overlapping religious + economic division -> violent conflict) vs Netherlands (cross-cutting -> calm accommodation). Cross-cutting lines give every group allies on some issue -- computed in politics as shifting coalitions.',
  },
];

function DepthDrill() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });
  const item = DEPTH_QUIZ[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === item.answer ? 1 : 0), done: s.done + 1 }));
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Board-depth drill</p>
        <span className="text-[11px] font-mono text-slate-400">
          {idx + 1}/{DEPTH_QUIZ.length} -- {score.right}/{score.done} correct
        </span>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{item.q}</p>
      <div className="space-y-1.5">
        {item.options.map((opt, i) => {
          const state = !answered
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700'
            : i === item.answer
              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
              : i === picked
                ? 'bg-rose-900/60 border-rose-600 text-rose-100'
                : 'bg-slate-800/40 border-slate-800 opacity-60';
          return (
            <button key={i} onClick={() => pick(i)} disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-xl border text-xs leading-snug transition ${state}`}>
              <span className="font-bold mr-1.5">{'ABCD'[i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="text-xs leading-relaxed text-amber-200 bg-amber-950/40 border border-amber-800/50 rounded-xl px-3 py-2">
          <span className="font-bold">Misconception killed: </span>
          {item.why}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={() => { setIdx((i) => (i + 1) % DEPTH_QUIZ.length); setPicked(null); }}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 transition">
          Next question
        </button>
        <button onClick={() => { setIdx(0); setPicked(null); setScore({ right: 0, done: 0 }); }}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
          Reset
        </button>
      </div>
    </div>
  );
}

export default C10_CivicsGenderReligionCasteSim;
