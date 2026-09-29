'use client';

/**
 * DoodleCard — hand-drawn-style educational card ("same notebook" family).
 *
 * ZERO-WRONG LAYERING: every string rendered here comes verbatim from the
 * node's authored content via the card-data object (built by
 * backend/tools/build_doodle_content.py). No AI-generated text, no generated
 * facts. All decorative art is hand-coded inline SVG / deterministic CSS.
 *
 * Canvas is a fixed 1080x1350 (4:5) page — matching the PNG export pipeline
 * (frontend/scripts/export_doodle_cards.mjs + doodle_card_template.html,
 * which mirror this exact structure and styling).
 */
import React, { useEffect, useRef, useState } from 'react';
import './DoodleCard.css';

export interface DoodleCardData {
  node_id: string;
  title: string;
  subject: string;
  classLevel: number | string;
  chapter?: string;
  definition: string;
  steps: string[];
  misconception?: string | null;
  remember: string[];
}

/* ---------- deterministic helpers ---------- */

/** Longest alphabetic token (earliest on tie) — mechanical key-term pick.
 * Explicit ranges (no `u` flag: project TS target is es5) — covers Latin,
 * Cyrillic, Devanagari, CJK, Hangul. */
const TOKEN_START = /[A-Za-z0-9\u00C0-\u024F\u0370-\u04FF\u0900-\u097F\u0E00-\u0E7F\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;
const TOKEN_BODY = /[A-Za-z0-9\u00C0-\u024F\u0370-\u04FF\u0900-\u097F\u0E00-\u0E7F\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF''\u2019-]/;

function keyTerm(text: string): { pre: string; term: string; post: string } {
  let best: { term: string; start: number } | null = null;
  let i = 0;
  while (i < text.length) {
    if (TOKEN_START.test(text[i])) {
      let j = i + 1;
      while (j < text.length && TOKEN_BODY.test(text[j])) j += 1;
      if (j - i >= 5 && (!best || j - i > best.term.length)) {
        best = { term: text.slice(i, j), start: i };
      }
      i = j;
    } else {
      i += 1;
    }
  }
  if (!best) return { pre: text, term: '', post: '' };
  return {
    pre: text.slice(0, best.start),
    term: best.term,
    post: text.slice(best.start + best.term.length),
  };
}

/** Highlight-marker on the key term of a remember line. */
function HighlightedPoint({ text }: { text: string }) {
  const { pre, term, post } = keyTerm(text);
  if (!term) return <>{text}</>;
  return (
    <>
      {pre}
      <mark className="dc-hl">{term}</mark>
      {post}
    </>
  );
}

/* ---------- hand-coded inline SVG doodles ---------- */

function StarDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path
        d="M30 4 L36.5 21.5 L55 22.5 L40.5 34 L45.5 52 L30 41.5 L14.5 52 L19.5 34 L5 22.5 L23.5 21.5 Z"
        fill="#F7D98A"
        stroke="#3B322C"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M24 28 L28.5 33 L37 22" stroke="#3B322C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function SparkDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M22 3 C23 12 26 17 34 19 C26 22 23 27 22 39 C21 27 18 22 9 19 C18 17 21 12 22 3 Z"
        fill="#2A9D8F" stroke="#3B322C" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteMarkDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M10 26 C10 15 16 9 24 7 L25 12 C20 14 17 17 17 22 L24 22 L24 36 L10 36 Z"
        fill="#E8A020" stroke="#3B322C" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function SquiggleDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 14" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M3 9 C14 3 22 12 34 7 C46 2 54 11 66 7 C78 3 86 11 98 7 C110 3 118 10 127 6"
        stroke="#E76F51" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 50 30" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M25 2 C18 8 14 14 16 24" stroke="#2A9D8F" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M9 18 C12 21 14 23 16 26 C19 23 22 21 25 19"
        stroke="#2A9D8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CheckDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 13 C7 15 9 18 10 20 C13 14 17 8 21 4" stroke="#2A9D8F" strokeWidth="3.4"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function SpiralDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <path d="M23 23 C23 20 27 20 27 24 C27 29 20 30 17 25 C13 19 20 12 27 15 C35 18 34 30 26 33 C22 35 17 34 14 31"
        stroke="#E8A020" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}

/* ---------- auto-fit (deterministic shrink loop) ---------- */

const FIT_MIN = 55;
const FIT_STEP = 5;

/**
 * Shrinks --dc-fit in fixed steps until the card body fits 1350px.
 * Purely deterministic for identical content + fonts (same fixed ladder).
 * `dataVersion` re-runs the fit when content changes; fonts.ready re-runs
 * it once webfonts finish loading so measurements are final.
 */
function useCardFit(dataVersion: string) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(100);

  useEffect(() => {
    let cancelled = false;
    const runFit = () => {
      const el = cardRef.current;
      if (!el || cancelled) return;
      const steps = el.querySelector<HTMLElement>('.dc-steps');
      el.style.setProperty('--dc-fit', '1');
      const over = () => {
        if (el.scrollHeight > el.clientHeight + 1) return true;
        return !!(steps && steps.scrollHeight > steps.clientHeight + 1);
      };
      let f = 100;
      let guard = 0;
      while (over() && f > FIT_MIN && guard < 24) {
        f -= FIT_STEP;
        el.style.setProperty('--dc-fit', String(f / 100));
        guard += 1;
      }
      setFit(f);
    };
    runFit();
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    if (fonts && fonts.ready) {
      fonts.ready.then(() => { if (!cancelled) runFit(); });
    }
    return () => { cancelled = true; };
  }, [dataVersion]);

  return { cardRef, fit };
}

/* ---------- component ---------- */

export default function DoodleCard({ data }: { data: DoodleCardData }) {
  const { cardRef, fit } = useCardFit(
    data.node_id + '|' + data.definition.length + '|' + data.steps.length
  );
  const rememberPoints = (data.remember || []).slice(0, 3);

  return (
    <div
      ref={cardRef}
      className="dc-card"
      style={{ '--dc-fit': String(fit / 100) } as React.CSSProperties}
      data-node-id={data.node_id}
    >
      <div className="dc-inner">
        {/* title banner */}
        <header className="dc-banner">
          <StarDoodle className="dc-banner-star" />
          <SparkDoodle className="dc-banner-spark" />
          <p className="dc-banner-kicker">Concept Card</p>
          <h1 className="dc-title">{data.title}</h1>
        </header>

        {/* definition quote box */}
        <section className="dc-quote">
          <QuoteMarkDoodle className="dc-quote-mark" />
          <h2 className="dc-quote-label">What it means</h2>
          <p className="dc-quote-text">{data.definition}</p>
        </section>

        {/* how it works — numbered steps with arrows */}
        <div className="dc-section-head">
          <h2 className="dc-section-title">HOW IT WORKS</h2>
          <span className="dc-section-sub">
            {data.steps.length} step{data.steps.length === 1 ? '' : 's'}
          </span>
          <SquiggleDoodle className="dc-squiggle" />
        </div>
        <div className="dc-steps">
          {data.steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="dc-step">
                <span className="dc-step-num">{i + 1}</span>
                <p className="dc-step-text">{step}</p>
              </div>
              {i < data.steps.length - 1 && (
                <div className="dc-step-arrow">
                  <ArrowDoodle className="dc-arrow-svg" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* remember box — misconception correction first, then key points */}
        {(data.misconception || rememberPoints.length > 0) && (
          <section className="dc-remember">
            <div className="dc-remember-head">
              <StarDoodle className="dc-remember-star" />
              <h2 className="dc-remember-title">REMEMBER</h2>
            </div>
            <ul className="dc-remember-list">
              {data.misconception && (
                <li className="dc-remember-item">
                  <CheckDoodle className="dc-check" />
                  <p className="dc-remember-text">
                    <span className="dc-mis-label">Common mistake:{' '}</span>
                    <span className="dc-mis-text">{data.misconception}</span>
                  </p>
                </li>
              )}
              {rememberPoints.map((point, i) => (
                <li className="dc-remember-item" key={i}>
                  <CheckDoodle className="dc-check" />
                  <p className="dc-remember-text">
                    <HighlightedPoint text={point} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* footer chip */}
        <footer className="dc-footer">
          <span className="dc-chip">
            <span className="dc-chip-dot" />
            Class {data.classLevel} · {data.subject}
          </span>
          {/* node id intentionally NOT rendered — internal-only per platform rule;
              it lives in data-node-id for fetch/provenance use */}
        </footer>
      </div>
      <SpiralDoodle className="dc-corner-spiral" />
    </div>
  );
}
