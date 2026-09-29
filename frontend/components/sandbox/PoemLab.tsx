'use client'

/**
 * PoemLab — the Literature Lab tab of the Language Gym (wave H1,
 * HUMANITIES_COMMERCE_PLAN.md §B). Three deterministic engines, one rule:
 * every verdict carries its steps (per-line matra/syllable tables, foot
 * patterns, rubric beats) and every out-of-scope input is DECLINED with a
 * reason — never guessed.
 *
 *   en · poem scanner      scanEnglishPoem   (lib/lit/englishMeter)
 *   en · format check      checkWritingFormat (lib/lit/formatCheck)
 *   hi · छंद पहचान          scanHindiVerse     (lib/lit/chhand)
 *
 * Pure presentation over the engines; no LLM, no network, nothing invented.
 */

import { useMemo, useState } from 'react'
import {
  scanHindiVerse,
  scanEnglishPoem,
  checkWritingFormat,
  TAUGHT_FORMATS,
} from '@/lib/lit'

type Subject = 'en' | 'hi'

const SAMPLE_HI =
  'रहिमन निज संपत्ति बिना, दूजो उसको सून।\nलगकर नयनक सब जग में, ज्यों आग में वहु धून॥'
const SAMPLE_EN =
  'The way a crow\nShook down on me\nThe dust of snow\nFrom a hemlock tree'
const SAMPLE_FORMAT = `24, Rose Colony
Delhi

15 March 2026

The Editor
The Times of India
New Delhi

Subject: Broken streetlights in Rose Colony

Sir/Madam,

Through the columns of your esteemed newspaper, I wish to draw the
attention of the municipal authorities to the broken streetlights in
Rose Colony. Three main streets have been dark for two weeks, and
residents — especially children and the elderly — face real risk after
sunset.

I request the municipal corporation to repair the lights at the
earliest.

Yours truly
R. Sharma`
const HI_NOTE =
  'छंद के नियम केवल पाठ्यक्रम के पद्यों पर लागू होते हैं — जो छंद कॉर्पस में पढ़ाया नहीं गया, वह सही ढंग से अस्वीकृत किया जाएगा, अनुमान नहीं लगाया जाएगा।'

export default function PoemLab({ subject }: { subject: Subject }) {
  const [mode, setMode] = useState<'poem' | 'format'>('poem')
  const [text, setText] = useState('')
  const [format, setFormat] = useState('formal_letter')

  const hi = useMemo(
    () => (subject === 'hi' && text.trim() ? scanHindiVerse(text) : null),
    [subject, text],
  )
  const poem = useMemo(
    () => (subject === 'en' && mode === 'poem' && text.trim() ? scanEnglishPoem(text) : null),
    [subject, mode, text],
  )
  const fmt = useMemo(
    () =>
      subject === 'en' && mode === 'format' && text.trim()
        ? checkWritingFormat(text, format)
        : null,
    [subject, mode, text],
  )

  return (
    <div className="space-y-4">
      {subject === 'en' && (
        <div className="flex gap-2">
          {(['poem', 'format'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold ${mode === m ? 'bg-sky-500 text-slate-950' : 'border border-slate-600 text-slate-300'}`}
            >
              {m === 'poem' ? 'Verses · poem scanner' : 'Writing · format check'}
            </button>
          ))}
        </div>
      )}

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={7}
        dir={subject === 'hi' ? 'rtl' : 'ltr'}
        placeholder={
          subject === 'hi'
            ? 'यहाँ पद्य लिखें या पेस्ट करें…'
            : mode === 'poem'
              ? 'Paste a poem (2+ lines)…'
              : `Paste your ${format.replace('_', ' ')} here…`
        }
        className="w-full rounded-2xl border border-slate-600 bg-slate-950/70 p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-400 focus:outline-none"
      />
      <div className="flex flex-wrap gap-2 text-xs">
        {subject === 'hi' && (
          <button onClick={() => setText(SAMPLE_HI)} className="rounded-lg border border-slate-600 px-2.5 py-1 text-slate-300 hover:border-slate-400">
            नमूना दोहा भरें
          </button>
        )}
        {subject === 'en' && mode === 'poem' && (
          <button onClick={() => setText(SAMPLE_EN)} className="rounded-lg border border-slate-600 px-2.5 py-1 text-slate-300 hover:border-slate-400">
            Load a sample verse
          </button>
        )}
        {subject === 'en' && mode === 'format' && (
          <button onClick={() => setText(SAMPLE_FORMAT)} className="rounded-lg border border-slate-600 px-2.5 py-1 text-slate-300 hover:border-slate-400">
            Load a sample formal letter
          </button>
        )}
        {text && (
          <button onClick={() => setText('')} className="rounded-lg border border-slate-700 px-2.5 py-1 text-slate-500">
            Clear
          </button>
        )}
      </div>

      {subject === 'en' && mode === 'format' && (
        <select
          value={format}
          onChange={e => setFormat(e.target.value)}
          className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-200"
        >
          {TAUGHT_FORMATS.map(f => (
            <option key={f} value={f}>{f.replace(/_/g, ' ')}</option>
          ))}
        </select>
      )}

      {/* Hindi chhand verdict — per-line matra tables as steps */}
      {hi && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          {hi.declined_reason ? (
            <p className="text-sm text-amber-300">Declined — {hi.declined_reason}</p>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-300">
                छंद: {hi.chhand} <span className="text-slate-500">· confidence {Math.round((hi.confidence ?? 0) * 100)}%</span>
              </p>
              <table className="mt-3 w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-500">
                    <th className="pb-1">पंक्ति</th>
                    <th className="pb-1">मात्राएँ</th>
                    <th className="pb-1">गण</th>
                  </tr>
                </thead>
                <tbody>
                  {(hi.lines ?? []).map((l, i) => (
                    <tr key={i} className="border-t border-slate-800">
                      <td className="py-1.5 pr-3 text-slate-200">{l.text}</td>
                      <td className="py-1.5 pr-3 font-bold text-gold-200">{l.matras}</td>
                      <td className="py-1.5 text-slate-400">{l.ganas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <p className="mt-3 text-[11px] text-slate-500">{HI_NOTE}</p>
        </div>
      )}

      {/* English poem verdict — per-line syllables/pattern/foot */}
      {poem && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          {poem.declined ? (
            <p className="text-sm text-amber-300">Declined — {String(poem.declined).replace(/_/g, ' ')}.</p>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
                {String(poem.verdict).replace(/_/g, ' ')} · {String(poem.metre ?? poem.family ?? '')}
                {typeof poem.confidence === 'number' && (
                  <span className="text-slate-500"> · confidence {Math.round(poem.confidence * 100)}%</span>
                )}
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-500">
                      <th className="pb-1 pr-3">Line</th>
                      <th className="pb-1 pr-3">Syllables</th>
                      <th className="pb-1 pr-3">Pattern</th>
                      <th className="pb-1">Foot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(poem.stanzas ?? []).flatMap((st: any, si: number) =>
                      (st.lines ?? []).map((l: any, li: number) => (
                        <tr key={`${si}-${li}`} className="border-t border-slate-800">
                          <td className="py-1.5 pr-3 text-slate-300">{l.text ?? ''}</td>
                          <td className="py-1.5 pr-3 font-bold text-sky-200">{l.syllables}</td>
                          <td className="py-1.5 pr-3 font-mono text-slate-400">{l.pattern}</td>
                          <td className="py-1.5 text-slate-300">{l.foot ?? ''}</td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
              {poem.rhyme && (
                <p className="mt-2 text-xs text-slate-400">Rhyme scheme: {String(poem.rhyme)}</p>
              )}
            </>
          )}
          {Array.isArray(poem.notes) && poem.notes.length > 0 && (
            <p className="mt-3 text-[11px] text-slate-500">{poem.notes.join(' ')}</p>
          )}
        </div>
      )}

      {/* Format-check verdict — rubric beats only */}
      {fmt && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            {fmt.formatLabel} · {fmt.ok ? 'scaffold complete' : 'scaffold incomplete'} ·{' '}
            {fmt.presentCount}/{fmt.requiredCount} required beats · {fmt.wordCount} words
          </p>
          <ul className="mt-3 space-y-1.5 text-xs">
            {(fmt.beats ?? []).map((b: any, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className={
                    b.status === 'present'
                      ? 'text-emerald-400'
                      : b.status === 'absent_ok'
                        ? 'text-slate-500'
                        : 'text-red-400'
                  }
                >
                  {b.status === 'present' ? '✓' : b.status === 'absent_ok' ? '○' : '✗'}
                </span>
                <span className="text-slate-300">
                  {b.name}
                  {b.evidence ? <span className="text-slate-500"> — {b.evidence}</span> : null}
                  {b.status === 'missing' && b.rule ? (
                    <span className="text-red-300"> ({b.rule})</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
          {Array.isArray(fmt.missingRequired) && fmt.missingRequired.length > 0 && (
            <p className="mt-2 text-xs text-red-300">
              Add: {fmt.missingRequired.join('; ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
