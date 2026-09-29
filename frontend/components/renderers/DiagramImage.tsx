'use client';

/**
 * DiagramImage — renders a node's open-licensed educational diagram
 * (public/diagrams/class{N}/{node_id}.{svg|png|jpg}, sourced from
 * Wikimedia Commons / OpenStax per DIAGRAM_SPEC.md; maps in
 * diagrams/diagrams_index.json, attributions in
 * diagrams/diagram_attributions.json).
 *
 * Renders nothing until the image proves it exists (honest absence —
 * the DoodleCardImage pattern: no broken-image chrome, no placeholder
 * fakery, no "not available yet" chatter). Click opens the full-size
 * image. Every rendering carries the image's license credit line —
 * Wikimedia/CC licenses require attribution, so the credit is part of
 * the component contract, never optional decoration.
 */

import React, { useEffect, useState } from 'react';

interface DiagramIndexEntry {
  file: string;
  title?: string;
}
type DiagramIndex = Record<string, DiagramIndexEntry>;

interface Attribution {
  title?: string;
  source_url?: string;
  artist?: string;
  license?: string;
  credit?: string;
}
type AttributionMap = Record<string, Attribution>;

/* module-level caches: one fetch per session, shared by every card */
let indexCache: DiagramIndex | null = null;
let indexLoad: Promise<DiagramIndex> | null = null;
let attrCache: AttributionMap | null = null;
let attrLoad: Promise<AttributionMap> | null = null;

function loadIndex(): Promise<DiagramIndex> {
  if (!indexLoad) {
    indexLoad = fetch('/diagrams/diagrams_index.json')
      .then((res) => (res.ok ? (res.json() as Promise<DiagramIndex>) : ({} as DiagramIndex)))
      .then((doc) => {
        indexCache = doc && typeof doc === 'object' ? doc : {};
        return indexCache;
      })
      .catch(() => {
        indexCache = {};
        return indexCache;
      });
  }
  return indexLoad;
}

function loadAttributions(): Promise<AttributionMap> {
  if (!attrLoad) {
    attrLoad = fetch('/diagrams/diagram_attributions.json')
      .then((res) => (res.ok ? (res.json() as Promise<AttributionMap>) : ({} as AttributionMap)))
      .then((doc) => {
        attrCache = doc && typeof doc === 'object' ? doc : {};
        return attrCache;
      })
      .catch(() => {
        attrCache = {};
        return attrCache;
      });
  }
  return attrLoad;
}

export default function DiagramImage({
  nodeId,
  classLevel,
  renderFallback,
}: {
  nodeId: string;
  classLevel?: number | string | null;
  /** Rendered in place of the card when this node has no diagram in the
   *  index (honest absence chain — e.g. the story scene's beat cards). */
  renderFallback?: () => React.ReactNode;
}) {
  const [file, setFile] = useState<string | null>(null);
  const [credit, setCredit] = useState<string>('');
  const [state, setState] = useState<'loading' | 'shown' | 'missing'>('loading');

  /* Resolve the entry once per nodeId — the index is the ONLY presence
     signal; a node missing from it simply never renders. */
  useEffect(() => {
    let cancelled = false;
    loadIndex().then((index) => {
      if (cancelled) return;
      const entry = index[nodeId];
      if (!entry || !entry.file) {
        setFile(null);
        return;
      }
      // the manifest shelves by syllabus class; trust it, fall back to prefix
      setFile(entry.file);
      loadAttributions().then((attrs) => {
        if (!cancelled) setCredit((attrs[nodeId] && attrs[nodeId].credit) || '');
      });
    });
    return () => {
      cancelled = true;
    };
  }, [nodeId, classLevel]);

  if (!file) return <>{renderFallback ? renderFallback() : null}</>;

  const src = `/diagrams/${file}`;
  const alt = credit ? `Labelled diagram of this topic (${credit})` : 'Labelled diagram of this topic';

  /* Until the image proves it exists, nothing renders — no empty shell. */
  if (state !== 'shown') {
    return (
      <div style={{ lineHeight: 0 }} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden
          className="hidden"
          onLoad={() => setState('shown')}
          onError={() => setState('missing')}
        />
      </div>
    );
  }

  return (
    <div className="glass-card p-5" data-testid="diagram-image">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-brand-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <circle cx="9" cy="9.5" r="1.6" />
          <path d="M4.5 17.5 10 11.5l4 4 3-3 3.5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="font-display text-lg font-semibold text-white">Diagram</h3>
      </div>
      <a href={src} target="_blank" rel="noopener noreferrer" className="block group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto rounded-xl bg-white/95 border border-surface-300/30 shadow-lg transition-transform duration-200 group-hover:scale-[1.01]"
        />
      </a>
      {credit && (
        <p className="mt-3 text-[11px] leading-snug text-surface-600">
          {credit}
        </p>
      )}
    </div>
  );
}
