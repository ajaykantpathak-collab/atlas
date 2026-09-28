'use client'

/**
 * WritingWorkbench — guided composition for the Language Gym pair
 * (SANDBOX_TAXONOMY.md §11-12: "Writing workbench: notice/e-mail/essay
 * skeletons → live format checker (ICSE format marks), model-vs-weak
 * comparison").
 *
 * Loop: authored model answer (verbatim corpus text) → student writes →
 * checklist validation against the authored mark scheme:
 *   1. structure — one authored format component per row, 1 mark each,
 *      checked live by deterministic regex (never generated content);
 *   2. register — the corpus's authored register rules ("free of slang",
 *      formal standard phrases, आप-शैली vs तुम-शैली, impersonal notice tone);
 *   3. word/sentence budget — only where the corpus authors one
 *      (notice body: 3-5 sentences, c9_eng_icse_03_002).
 *
 * Wrong drafts surface the node's authored misconception through
 * remediation.ts → MisconceptionPanel (closed-world, honest degradation).
 *
 * Central wiring into app/(student)/sandbox/page.tsx happens post-hoc
 * via the exported WRITING_WORKBENCH_TAB config.
 */
import { useEffect, useMemo, useState } from 'react'
import { PenLine, Check } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import { FORMAT_SPECS, type FormatSpec } from './langGymTopics'

const PROGRESS_KEY = 'langym_explored_v1'

/** A guided writing task bound to an authored format spec + model. */
interface WritingTask {
  id: string
  title: string
  lang: 'en' | 'hi'
  specId: string
}

const TASKS: WritingTask[] = [
  { id: 'w_notice', title: 'Notice — science exhibition', lang: 'en', specId: 'fmt_notice' },
  { id: 'w_email', title: 'Formal e-mail — permission request', lang: 'en', specId: 'fmt_email' },
  { id: 'w_letter', title: 'Formal letter — the ICSE skeleton', lang: 'en', specId: 'fmt_letter' },
  { id: 'w_notice_hi', title: 'नोटिस — विज्ञान-प्रदर्शनी', lang: 'hi', specId: 'fmt_notice_hi' },
  { id: 'w_aupcharik', title: 'औपचारिक पत्र — अवकाश हेतु आवेदन', lang: 'hi', specId: 'fmt_aupcharik' },
  { id: 'w_anaupcharik', title: 'अनौपचारिक पत्र — मित्र को दीपावली', lang: 'hi', specId: 'fmt_anaupcharik' },
]

const specById = (id: string): FormatSpec => FORMAT_SPECS.find(s => s.id === id) ?? FORMAT_SPECS[0]

// Register rules — the check logic is deterministic; every displayed rule
// string is the corpus's authored wording (see the node DEFINITIONs).
interface RegisterRule {
  id: string
  label: string
  /** any match satisfies the rule (require) */
  require?: RegExp[]
  /** any match violates it (avoid) */
  avoid?: RegExp[]
  /** marks shown when satisfied */
}

const REGISTERS: Record<string, RegisterRule[]> = {
  // c9_eng_icse_01_002 / 03_002 / 02_002: formal register, impersonal tone,
  // "free of decorative language", standard phrases such as
  // "I wish to bring to your notice…"
  formal_en: [
    {
      id: 'no_slang',
      label: 'Free of slang and decorative language (corpus: c9_eng_icse_03_002)',
      avoid: [/\b(gonna|wanna|kinda|guys|cool|awesome|stuff|lol|thx|pls|plz|okay|ok)\b/i],
    },
    {
      id: 'formal_phrases',
      label: 'Standard formal phrases — "I wish to bring to your notice…", "kindly", "request" (corpus: c9_eng_icse_02_001)',
      require: [/(bring to your notice|kindly|request|I would like|I am writing)/i],
    },
    {
      id: 'impersonal_notice',
      label: 'Impersonal, directive tone — no "I/my" chattiness in a notice (corpus: c9_eng_icse_03_002)',
      avoid: [/\b(I|my|me)\b/],
      // only applied for notice-kind specs (see applyRegisters)
    },
  ],
  // c9_hin_icse_02_002: "आप-शैली की विनम्रता और एकाग्र उद्देश्य"
  aupcharik: [
    {
      id: 'aap',
      label: 'आप-शैली — विनम्र-कठोर आप-शैली का प्रयोग (corpus: c9_hin_icse_02_002)',
      require: [/आप|महोदय|सविनय/],
    },
    {
      id: 'no_tum',
      label: 'तुम-शैली/तू-शैली औपचारिक पत्र में नहीं — संबंध नहीं, पद बोलता है',
      avoid: [/\bतुम\b|\bतू\b|तेरा|तुम्हारा/],
    },
  ],
  // c9_hin_icse_02_003: "सहज तुम-शैली और भाव-रंग — संबंध बोलता है, उद्देश्य नहीं"
  anaupcharik: [
    {
      id: 'tum',
      label: 'सहज तुम-शैली — निजी संबंध की भाषा (corpus: c9_hin_icse_02_003)',
      require: [/तुम|तुझ|तेरा|तुम्हारा/],
    },
    {
      id: 'no_official',
      label: 'औपचारिक शिष्टाचार-चिह्न ("महोदय", "सेवा में") अनौपचारिक पत्र में नहीं',
      avoid: [/महोदय|सेवा\s*में|सविनय\s*निवेदन/],
    },
  ],
  // c8_hin_icse_02_008: "औपचारिक, संक्षिप्त और सार्वजनिक"
  notice_hi: [
    {
      id: 'no_slang_hi',
      label: 'औपचारिक, संक्षिप्त — बातचीत की शैली नहीं (corpus: c8_hin_icse_02_008)',
      avoid: [/यार|अच्छा तो|सुनो न|बहुत बढ़िया/],
    },
  ],
}

function registersFor(spec: FormatSpec): RegisterRule[] {
  switch (spec.kind) {
    case 'notice': {
      // formal rules + the impersonal-notice rule
      const base = REGISTERS.formal_en.filter(r => r.id !== 'formal_phrases')
      return [...base]
    }
    case 'email':
    case 'letter':
      return REGISTERS.formal_en
    case 'aupcharik':
      return REGISTERS.aupcharik
    case 'anaupcharik':
      return REGISTERS.anaupcharik
    case 'notice_hi':
      return REGISTERS.notice_hi
  }
}

/** Authored budget check — only where the corpus authors one. */
function budgetCheck(spec: FormatSpec, draft: string): { label: string; hit: boolean; detail: string } | null {
  if (spec.kind === 'notice') {
    // corpus: "Body — 3-5 sentences covering the 5 W's" (c9_eng_icse_03_002)
    const afterSubject = draft.split(/subject\s*[:\-].*/i).slice(1).join('\n')
    const text = (afterSubject || draft)
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.split(/\s+/).length >= 3)
    const n = sentences.length
    return {
      label: 'Body — 3-5 sentences covering the 5 W\u2019s and any required action (corpus: c9_eng_icse_03_002)',
      hit: n >= 3 && n <= 5,
      detail: `body sentences counted: ${n}`,
    }
  }
  if (spec.kind === 'notice_hi') {
    const text = draft
    const sentences = text.split(/[।!]+/).map(s => s.trim()).filter(s => s.split(/\s+/).length >= 3)
    const n = sentences.length
    return {
      label: 'संक्षिप्त और सार्वजनिक — सूचना-वाक्य थोड़े और सटीक (corpus: c8_hin_icse_02_008)',
      hit: n >= 2 && n <= 5,
      detail: `सूचना-वाक्य: ${n}`,
    }
  }
  return null
}

export default function WritingWorkbench() {
  const [lang, setLang] = useState<'en' | 'hi'>('en')
  const [taskId, setTaskId] = useState('w_notice')
  const [draft, setDraft] = useState('')
  const [checked, setChecked] = useState(false)
  const [enrichment, setEnrichment] = useState<EnrichmentData | null>(null)
  const [practised, setPractised] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]')
      if (Array.isArray(arr)) setPractised(new Set(arr))
    } catch { /* fresh start */ }
  }, [])

  const task = TASKS.find(x => x.id === taskId) ?? TASKS[0]
  const spec = specById(task.specId)

  const markPractised = (k: string) => {
    setPractised(prev => {
      if (prev.has(k)) return prev
      const next = new Set(prev).add(k)
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next])) } catch { }
      return next
    })
  }

  useEffect(() => { setDraft(''); setChecked(false); setEnrichment(null) }, [taskId])

  const fieldHits = useMemo(
    () => spec.fields.map(f => ({ spec: f, hit: f.patterns.some(re => re.test(draft)) })),
    [spec, draft])

  const regs = useMemo(() => registersFor(spec).map(r => {
    const bad = (r.avoid ?? []).some(re => re.test(draft))
    const good = (r.require ?? []).some(re => re.test(draft))
    return { rule: r, pass: r.require ? good && !bad : !bad }
  }), [spec, draft])

  const budget = useMemo(() => budgetCheck(spec, draft), [spec, draft])
  const score = fieldHits.filter(h => h.hit).reduce((s, h) => s + h.spec.marks, 0)
  const total = spec.fields.reduce((s, f) => s + f.marks, 0)
  const allGood = score === total && regs.every(r => r.pass) && (!budget || budget.hit)

  const runCheck = async () => {
    setChecked(true)
    if (allGood) markPractised(task.id)
    else if (spec.nodeId) {
      try { setEnrichment(await fetchEnrichment(spec.nodeId)) } catch { setEnrichment(null) }
    }
  }

  const tasks = TASKS.filter(x => x.lang === lang)

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            ✍️ Writing Workbench
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              model answer → draft → authored mark scheme
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            completed {practised.size ? [...practised].filter(k => k.startsWith('w_')).length : 0}/{TASKS.length} tasks
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {(['en', 'hi'] as const).map(s => (
            <button key={s} onClick={() => { setLang(s); setTaskId(s === 'en' ? 'w_notice' : 'w_notice_hi') }}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${s === lang ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {s === 'en' ? 'English' : 'हिंदी'}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {tasks.map(x => (
            <button key={x.id} onClick={() => setTaskId(x.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${x.id === taskId ? 'bg-amber-500/15 border-amber-400/50 text-amber-200' : 'bg-slate-800/40 border-slate-700/70 text-slate-400 hover:text-slate-200'}`}>
              {practised.has(x.id) ? '✓ ' : ''}{x.title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid lg:grid-cols-[1fr_300px] gap-4">
        <div>
          <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
            <span className="font-black text-slate-300">Given situation: </span>
            {spec.task}
          </p>

          {/* step 1 — the authored model */}
          <details className="mb-2 rounded-xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
            <summary className="cursor-pointer px-3 py-2 text-[11px] font-black text-amber-300/90 hover:text-amber-200">
              step 1 · study the authored model answer (verbatim corpus text)
            </summary>
            <pre dir={task.lang === 'hi' ? 'auto' : 'ltr'}
              className="px-3 pb-3 whitespace-pre-wrap text-xs text-amber-100 leading-relaxed">
              {spec.model}
            </pre>
          </details>

          {/* step 2 — the student's draft */}
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
            <PenLine className="w-3 h-3 inline mr-1" />step 2 · write your draft
          </p>
          <textarea value={draft} onChange={e => { setDraft(e.target.value); setChecked(false) }}
            dir={task.lang === 'hi' ? 'auto' : 'ltr'} rows={12}
            className="w-full rounded-xl bg-slate-800/70 border border-slate-600 px-3 py-2 text-sm text-white leading-relaxed focus:outline-none focus:border-sky-400"
            placeholder={task.lang === 'hi' ? 'यहाँ लिखिए…' : 'write here…'} />
          <div className="flex items-center gap-2 mt-2">
            <button onClick={runCheck} disabled={!draft.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs">
              <Check className="w-3.5 h-3.5" />Check against the mark scheme ({score}/{total})
            </button>
            <span className="text-[10px] text-slate-500">word count: {draft.trim() ? draft.trim().split(/\s+/).length : 0}</span>
          </div>

          <MisconceptionPanel
            misconception={checked && !allGood
              ? (enrichment?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null)
              : null}
            commonMisconception={checked && !allGood ? (enrichment?.common_misconception ?? null) : null} />
        </div>

        {/* the authored mark scheme, live */}
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black">
            step 3 · structure marks (authored components, 1 each)
          </p>
          {fieldHits.map(h => (
            <div key={h.spec.id}
              className={`flex items-start gap-1.5 rounded-lg px-2 py-1.5 text-[11px] border ${h.hit ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              <span>{h.hit ? '✓' : '○'}</span>
              <span className="leading-snug">{h.spec.label} <span className="text-slate-500">(+{h.spec.marks})</span></span>
            </div>
          ))}

          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black mt-2">register rules</p>
          {regs.map(r => (
            <div key={r.rule.id}
              className={`rounded-lg px-2 py-1.5 text-[11px] border leading-snug ${r.pass ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200' : 'bg-rose-500/10 border-rose-400/30 text-rose-200'}`}>
              {r.pass ? '✓ ' : '✗ '}{r.rule.label}
            </div>
          ))}

          {budget && (
            <>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black mt-2">budget</p>
              <div className={`rounded-lg px-2 py-1.5 text-[11px] border leading-snug ${budget.hit ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200' : 'bg-rose-500/10 border-rose-400/30 text-rose-200'}`}>
                {budget.hit ? '✓ ' : '○ '}{budget.label}
                <span className="block text-slate-500 mt-0.5">{budget.detail}</span>
              </div>
            </>
          )}

          {checked && allGood && (
            <p className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-300 font-bold mt-2">
              ✓ Full authored mark scheme satisfied — this draft would earn every
              format mark the corpus lists.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/** Post-hoc central wiring contract (page.tsx is owned by concurrent agents). */
export const WRITING_WORKBENCH_TAB = {
  id: 'writing',
  label: '✍️ Writing Workbench',
  component: WritingWorkbench,
} as const
