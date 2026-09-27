'use client'

/**
 * AskBar — the unified "ask a question" control.
 *
 * Three input modes, one submit:
 *   TEXT   — type any question
 *   MATH   — symbol palette + live KaTeX preview of the typed text
 *   CAMERA — photo → /api/vision/extract (NVIDIA OCR) → prefills input
 *
 * Parent supplies onAsk(text) — this component owns only the input UX.
 */
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { Camera, Sigma, Send, Loader2, X, ImageIcon } from 'lucide-react'
import { api } from '@/lib/api'
import { sanitizeHtml } from '@/lib/sanitize'

const MATH_SYMBOLS = [
    { s: '√', ins: 'sqrt()' }, { s: '∫', ins: '∫ ' }, { s: 'Σ', ins: 'Σ ' },
    { s: 'π', ins: 'π' }, { s: 'θ', ins: 'θ' }, { s: 'α', ins: 'α' },
    { s: 'β', ins: 'β' }, { s: 'Δ', ins: 'Δ' }, { s: 'x²', ins: '^2' },
    { s: 'x³', ins: '^3' }, { s: 'xⁿ', ins: '^' }, { s: '½', ins: '/' },
    { s: '≤', ins: '<=' }, { s: '≥', ins: '>=' }, { s: '≠', ins: '!=' },
    { s: '±', ins: '±' }, { s: '÷', ins: '÷' }, { s: '×', ins: '×' },
    { s: '∞', ins: '∞' }, { s: '≈', ins: '≈' }, { s: '→', ins: '->' },
    { s: 'dy/dx', ins: 'd/dx ' }, { s: 'lim', ins: 'lim ' }, { s: 'log', ins: 'log ' },
]

/** crude text → LaTeX for live preview: ^n → ^{n}, sqrt(a) → \sqrt{a},
 *  a/b stays inline, greek names → commands. Preview only — the raw text
 *  is what gets submitted. */
function texify(t: string): string {
    let s = t
    s = s.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
    s = s.replace(/sqrt\s+(\w+)/g, '\\sqrt{$1}')
    s = s.replace(/(\w)\^(\d+)/g, '$1^{$2}')
    s = s.replace(/\^(\d+)/g, '^{$1}')
    s = s.replace(/(\w+)\s*\/\s*(\w+)/g, '\\frac{$1}{$2}')
    s = s.replace(/\b(pi|theta|alpha|beta|delta|lambda|mu|sigma|omega|phi|gamma)\b/gi, '\\$1')
    s = s.replace(/∫/g, '\\int ').replace(/Σ/g, '\\sum ').replace(/π/g, '\\pi ')
        .replace(/θ/g, '\\theta').replace(/α/g, '\\alpha').replace(/β/g, '\\beta')
        .replace(/Δ/g, '\\Delta').replace(/∞/g, '\\infty').replace(/≈/g, '\\approx')
        .replace(/±/g, '\\pm').replace(/÷/g, '\\div').replace(/×/g, '\\times')
    s = s.replace(/<=/g, '\\le ').replace(/>=/g, '\\ge ').replace(/!=/g, '\\ne ')
    s = s.replace(/->/g, '\\to ')
    s = s.replace(/d\/dx/g, '\\frac{d}{dx}')
    s = s.replace(/\blim\b/g, '\\lim')
    return s
}

function MathPreview({ text }: { text: string }) {
    let html = ''
    try {
        html = katex.renderToString(texify(text), { throwOnError: false, displayMode: true })
    } catch { html = '' }
    if (!html) return null
    return (
        <div className="px-4 py-3 rounded-xl bg-indigo-500/5 border border-indigo-500/20 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
    )
}

export default function AskBar({
    onAsk,
    loading = false,
    placeholder = 'Ask a doubt — type it, add math, or snap a photo…',
    accent = 'indigo',
}: {
    onAsk: (text: string) => void
    loading?: boolean
    placeholder?: string
    accent?: 'indigo' | 'mint' | 'pink'
}) {
    const [value, setValue] = useState('')
    const [mathMode, setMathMode] = useState(false)
    const [extracting, setExtracting] = useState(false)
    const [extractErr, setExtractErr] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const accents = {
        indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/20',
        mint: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
        pink: 'from-pink-500 to-pink-600 shadow-pink-500/20',
    }[accent]

    const submit = () => {
        const t = value.trim()
        if (!t || loading) return
        onAsk(t)
    }

    const insertSymbol = (ins: string) => {
        const el = inputRef.current
        if (!el) { setValue(v => v + ins); return }
        const start = el.selectionStart ?? value.length
        const end = el.selectionEnd ?? value.length
        setValue(value.slice(0, start) + ins + value.slice(end))
        requestAnimationFrame(() => { el.focus(); el.setSelectionRange(start + ins.length, start + ins.length) })
    }

    const onPhoto = async (file: File) => {
        setExtractErr('')
        setExtracting(true)
        try {
            const b64 = await new Promise<string>((res, rej) => {
                const r = new FileReader()
                r.onload = () => res(String(r.result))
                r.onerror = rej
                r.readAsDataURL(file)
            })
            const out = await api.post<{ text: string; source: string }>('/api/vision/extract', { image: b64 })
            const text = out?.text?.trim()
            if (text) setValue(v => (v ? v + '\n' : '') + text)
            else setExtractErr('Could not read the photo — try a clearer shot')
        } catch (e: any) {
            setExtractErr(e?.message?.includes('Not authenticated')
                ? 'Log in to use the camera solver'
                : 'Photo read failed — try again')
        } finally {
            setExtracting(false)
        }
    }

    const busy = loading || extracting

    return (
        <div className="w-full">
            {/* math palette */}
            <AnimatePresence>
                {mathMode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-wrap gap-1.5 p-3 mb-2 rounded-xl bg-white/[0.03] border border-white/10">
                            {MATH_SYMBOLS.map(({ s, ins }) => (
                                <button key={s} onClick={() => insertSymbol(ins)}
                                    className="min-w-[34px] px-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-200 text-surface-200 text-sm font-mono transition-colors">
                                    {s}
                                </button>
                            ))}
                            <button onClick={() => setMathMode(false)}
                                className="ml-auto p-1.5 rounded-lg text-surface-500 hover:text-surface-300">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* live KaTeX preview */}
            {mathMode && value.trim() && <div className="mb-2"><MathPreview text={value} /></div>}

            {/* extracted-error */}
            {extractErr && (
                <div className="mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                    {extractErr}
                </div>
            )}

            {/* input row */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setMathMode(m => !m)}
                    title="Math mode — symbols + preview"
                    className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${mathMode ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' : 'bg-white/5 border-white/10 text-surface-400 hover:text-surface-200'}`}
                >
                    <Sigma className="w-5 h-5" />
                </button>

                <input
                    ref={inputRef}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                    placeholder={mathMode ? 'x^2 + 5x + 6 = 0 — symbols insert at cursor' : placeholder}
                    disabled={busy}
                    className="flex-1 h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-surface-100 placeholder:text-surface-500 text-sm font-body focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all disabled:opacity-50"
                />

                <label className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${extracting ? 'bg-indigo-500/20 border-indigo-500/40' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    title="Snap a photo of the problem">
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={e => { const f = e.target.files?.[0]; if (f) onPhoto(f); e.target.value = '' }}
                    />
                    {extracting ? <Loader2 className="w-5 h-5 text-indigo-300 animate-spin" /> : <Camera className="w-5 h-5 text-surface-300" />}
                </label>

                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={submit}
                    disabled={busy || !value.trim()}
                    className={`shrink-0 h-11 px-5 rounded-xl bg-gradient-to-r ${accents} text-white text-sm font-semibold font-body disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2`}
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Ask
                </motion.button>
            </div>

            {extracting && (
                <div className="mt-2 flex items-center gap-2 text-xs text-indigo-300/80">
                    <ImageIcon className="w-3.5 h-3.5" /> Reading the photo…
                </div>
            )}
        </div>
    )
}
