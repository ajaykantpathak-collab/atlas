'use client';

/**
 * AskHelpPanel — the live rescue lane on question screens.
 *
 * "I don't get it" shows the node's authored simple-words hint; this panel is
 * for the student who still doesn't get it — or can't read English well
 * enough. They type (or just send the seeded question) in English, Hindi, or
 * Hinglish; the tutor's ask lane anchors the answer to the real corpus node
 * and already detects Hinglish ("nahi samajh aaya" → acknowledged warmly).
 * No fabricated content: the ask lane returns teach/verified/guided-refusal
 * responses only, and a real Story link when the doubt resolves to a node.
 */

import { useEffect, useRef, useState } from 'react';
import AskResponseCard from '@/components/tutor/AskResponseCard';
import { tutorStudentId, tutorUserClassLevel, type AskResponse } from '@/components/tutor/tutorShared';

export default function AskHelpPanel({
  seed,
  label,
}: {
  /** Pre-seeded context — typically the question stem + topic, so the ask
   *  lane can anchor to the right corpus node. Never a raw node id. */
  seed: string;
  /** Optional custom trigger label (default is the bilingual rescue line). */
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(seed);
  const [asking, setAsking] = useState(false);
  const [res, setRes] = useState<AskResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (open) setQ(seed); }, [open, seed]);
  useEffect(() => {
    const el = inputRef.current;
    if (open && el) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [open]);

  const ask = (hindi = false) => {
    const base = q.trim();
    if (!base || asking) return;
    setAsking(true);
    setFailed(false);
    setRes(null);
    fetch('/api/tutor-graph/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: tutorStudentId(),
        // The Hindi chip adds an explicit language request — the tutor's
        // Hinglish detection picks it up even when the stem is English.
        question: hindi ? `${base} — Hindi/Hinglish mein samjhao please` : base,
        class_level: tutorUserClassLevel(),
      }),
      signal: AbortSignal.timeout(90000),
    })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: AskResponse) => setRes(d))
      .catch(() => setFailed(true))
      .finally(() => setAsking(false));
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-violet-300/80 hover:text-violet-200 underline underline-offset-2 transition-colors"
        data-testid="ask-help-open"
      >
        {label || 'Still stuck? Ask — Hindi/Hinglish mein bhi'}
      </button>
    );
  }

  return (
    <div
      className="rounded-xl px-3.5 py-3 bg-violet-500/[0.07] border border-violet-400/25 text-left"
      data-testid="ask-help-panel"
    >
      <textarea
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        rows={2}
        aria-label="Your doubt"
        className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white/90 placeholder-white/30 focus:outline-none focus:border-violet-400/50 resize-none"
        placeholder="Type your doubt — English ya Hindi mein…"
      />
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={() => ask(false)}
          disabled={asking || !q.trim()}
          className="flex-1 py-2 rounded-lg bg-violet-500/20 border border-violet-400/40 text-violet-200 text-xs font-medium hover:bg-violet-500/30 transition disabled:opacity-50"
          data-testid="ask-help-send"
        >
          {asking ? 'Asking…' : 'Ask'}
        </button>
        <button
          type="button"
          onClick={() => ask(true)}
          disabled={asking || !q.trim()}
          className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white/70 text-xs font-medium hover:text-white transition disabled:opacity-50"
          data-testid="ask-help-send-hi"
        >
          {asking ? 'Asking…' : 'हिंदी में पूछो'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setRes(null); setFailed(false); }}
          className="px-3 py-2 rounded-lg text-white/40 text-xs hover:text-white/70 transition"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      {failed && (
        <p className="text-xs text-amber-300/80 mt-2" role="alert">
          Couldn't reach the tutor right now — try again.
        </p>
      )}
      {res && (
        <div className="mt-3" data-testid="ask-help-answer">
          <AskResponseCard res={res} />
        </div>
      )}
    </div>
  );
}
