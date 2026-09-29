/** Per-subject visual identity — the same sim skeleton reads as a different
 *  craft per discipline. Keyed on normalized subject strings. */

export interface SimTheme {
    chip: string;        // gradient for type chips
    card: string;        // border + shadow tint for beat cards
    bg: string;          // page background gradient
    accent: string;      // text accent
    icon: string;        // motif emoji
    labTint: string;     // lab frame gradient tint
}

const D = (chip: string, card: string, bg: string, accent: string, icon: string, labTint: string): SimTheme =>
    ({ chip, card, bg, accent, icon, labTint });

const THEMES: [RegExp, SimTheme][] = [
    [/phys|electricity|optic|mechanic/i, D('from-gold-500 to-gold-600', 'border-gold-400/60 shadow-gold-500/20', 'from-slate-950 via-gold-950 to-slate-950', 'text-gold-300', '⚡', 'from-slate-900 via-gold-950 to-gold-950')],
    [/chem|react|element|compound|acid/i, D('from-gold-500 to-purple-600', 'border-gold-400/60 shadow-gold-500/20', 'from-slate-950 via-gold-950 to-slate-950', 'text-gold-300', '🧪', 'from-slate-900 via-gold-950 to-purple-950')],
    [/bio|life|plant|animal|cell|body|health/i, D('from-emerald-500 to-teal-600', 'border-emerald-400/60 shadow-emerald-500/20', 'from-slate-950 via-emerald-950 to-slate-950', 'text-emerald-300', '🧬', 'from-slate-900 via-emerald-950 to-teal-950')],
    [/math|algebra|geometr|number|stat|prob/i, D('from-gold-500 to-gold-600', 'border-gold-400/60 shadow-gold-500/20', 'from-slate-950 via-gold-950 to-slate-950', 'text-gold-300', '📐', 'from-slate-900 via-gold-950 to-gold-950')],
    [/hist|ancient|medieval|empire|war/i, D('from-amber-500 to-orange-600', 'border-amber-400/60 shadow-amber-500/20', 'from-slate-950 via-amber-950 to-slate-950', 'text-amber-300', '📜', 'from-stone-900 via-amber-950 to-slate-950')],
    [/geo|earth|climate|map|soil|water/i, D('from-teal-500 to-gold-600', 'border-teal-400/60 shadow-teal-500/20', 'from-slate-950 via-teal-950 to-slate-950', 'text-teal-300', '🌍', 'from-slate-900 via-teal-950 to-gold-950')],
    [/civ|pol|gov|democra|constit/i, D('from-rose-500 to-red-600', 'border-rose-400/60 shadow-rose-500/20', 'from-slate-950 via-rose-950 to-slate-950', 'text-rose-300', '⚖️', 'from-slate-900 via-rose-950 to-red-950')],
    [/eco|business|account|market|money/i, D('from-green-500 to-emerald-600', 'border-green-400/60 shadow-green-500/20', 'from-slate-950 via-green-950 to-slate-950', 'text-green-300', '📈', 'from-slate-900 via-green-950 to-emerald-950')],
    [/eng|hindi|urdu|sanskr|lang|liter/i, D('from-fuchsia-500 to-pink-600', 'border-fuchsia-400/60 shadow-fuchsia-500/20', 'from-slate-950 via-fuchsia-950 to-slate-950', 'text-fuchsia-300', '📖', 'from-slate-900 via-fuchsia-950 to-pink-950')],
    [/comp|cs|ip|inform|program|code/i, D('from-gold-500 to-gold-600', 'border-gold-400/60 shadow-gold-500/20', 'from-slate-950 via-gold-950 to-slate-950', 'text-gold-300', '💻', 'from-slate-900 via-gold-950 to-gold-950')],
    [/soc|psych/i, D('from-orange-500 to-amber-600', 'border-orange-400/60 shadow-orange-500/20', 'from-slate-950 via-orange-950 to-slate-950', 'text-orange-300', '🧠', 'from-slate-900 via-orange-950 to-amber-950')],
];

export const DEFAULT_THEME: SimTheme = D('from-gold-500 to-gold-600', 'border-gold-400/60 shadow-gold-500/20',
    'from-slate-950 via-slate-900 to-slate-950', 'text-gold-300', '🎓', 'from-slate-900 via-gold-950 to-slate-950');

export function themeFor(subject: string): SimTheme {
    for (const [re, t] of THEMES) if (re.test(subject)) return t;
    return DEFAULT_THEME;
}
