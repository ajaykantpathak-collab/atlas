'use client';

/**
 * AuditTrail — the collapsed "Why this verdict?" panel.
 *
 * Renders the honest provenance the backend attached to this answer
 * (api/practice.py /submit → trail, built by services/answer_trail.py):
 *   mode     VERIFIED (authored answer key) | RUBRIC (marking scheme)
 *   source   topic / subtopic / past-paper year / marks
 *   checks   the matching rule that actually ran + result
 *   coaching which extra machinery fired (marking scheme, misconception)
 *
 * Zero-wrong rule: a field that is absent or null renders as nothing —
 * the panel never invents a value, never shows the internal node id as
 * text (that stays a fetch param, per platform rule).
 */

export interface AuditTrailData {
  mode?: 'VERIFIED' | 'RUBRIC' | 'SOLVED' | 'FALLBACK' | string | null;
  mode_note?: string | null;
  source?: {
    topic?: string | null;
    subtopic?: string | null;
    past_paper_year?: string | null;
    marks?: number | null;
  } | null;
  checks?: {
    method?: string | null;
    passed?: boolean | null;
    tolerance?: number | null;
    steps_shown?: number | null;
  } | null;
  coaching?: {
    marking_scheme?: boolean | null;
    misconception_targeted?: boolean | null;
  } | null;
  family?: string | null;
}

const MODE_STYLES: Record<string, string> = {
  VERIFIED: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  SOLVED: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  RUBRIC: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
  GUIDED: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  FALLBACK: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === null || children === undefined || children === '') return null;
  return (
    <div className="flex gap-2 text-xs leading-relaxed">
      <span className="w-20 shrink-0 text-slate-500">{label}</span>
      <span className="text-slate-300">{children}</span>
    </div>
  );
}

export default function AuditTrail({ trail }: { trail?: AuditTrailData | null }) {
  if (!trail || !trail.mode) return null;
  const mode = String(trail.mode);
  const chip = MODE_STYLES[mode] ?? 'bg-slate-500/10 text-slate-300 border-slate-500/30';
  const src = trail.source ?? {};
  const hasSource = src.topic || src.past_paper_year || src.marks != null;
  return (
    <details className="group mt-3 rounded-xl border border-slate-700/60 bg-slate-900/50 open:bg-slate-900/80">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200">
        <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${chip}`}>
          {mode}
        </span>
        Why this verdict?
        <span className="ml-auto text-slate-600 transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="space-y-1.5 border-t border-slate-700/60 px-3 py-2.5">
        {trail.mode_note && (
          <p className="text-xs text-slate-400">{trail.mode_note}</p>
        )}
        {hasSource && (
          <Row label="Source">
            {[src.topic, src.subtopic].filter(Boolean).join(' · ') || null}
            {src.past_paper_year ? ` — real ${src.past_paper_year} board paper question` : ''}
            {src.marks != null ? ` · ${src.marks} mark${Number(src.marks) === 1 ? '' : 's'}` : ''}
          </Row>
        )}
        {trail.checks?.method && (
          <Row label="Check">
            {trail.checks.method}
            {trail.checks.passed != null
              ? ` — ${trail.checks.passed ? 'matched' : 'did not match'}`
              : ''}
            {trail.checks.tolerance != null
              ? ` (tolerance ±${trail.checks.tolerance})`
              : ''}
          </Row>
        )}
        {trail.family && <Row label="Family">{trail.family}</Row>}
        {trail.coaching?.marking_scheme && (
          <Row label="Coaching">per-step marking-scheme breakdown shown above</Row>
        )}
        {trail.coaching?.misconception_targeted && (
          <Row label="Coaching">remediation targets the known trap for this question</Row>
        )}
      </div>
    </details>
  );
}
