'use client';

/**
 * DoodleCardImage — renders a node's exported hand-drawn card PNG
 * (public/doodle_cards/class{N}/{node_id}.png, produced by
 * frontend/scripts/export_doodle_cards.mjs from authored node content —
 * zero-wrong layering: every string in the image is verbatim node text).
 *
 * Renders nothing until the image proves it exists (honest absence —
 * no broken-image chrome, no placeholder fakery). Click opens full size.
 */

import React, { useState } from 'react';

export default function DoodleCardImage({
  nodeId,
  classLevel,
}: {
  nodeId: string;
  classLevel?: number | string | null;
}) {
  const [state, setState] = useState<'loading' | 'shown' | 'missing'>('loading');

  const band =
    classLevel != null && String(classLevel).match(/^\d+$/)
      ? String(classLevel)
      : (nodeId.match(/^c(\d+)_/)?.[1] ?? '');
  if (!band) return null;

  const src = `/doodle_cards/class${band}/${nodeId}.png`;

  /* CHILD-LENS (CHILD_EXPERIENCE_GAPS.md fix 11): until the card proves it
     exists, the whole section stays invisible — no "checking for card…"
     pipeline chatter, no empty "Doodle Card" shell, and no "No doodle card
     exported for this node yet" reaching the child. */
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
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg" aria-hidden>✏️</span>
        <h3 className="font-display text-lg font-semibold text-white">Doodle Card</h3>
        <span className="badge ml-auto">
          notebook-style recap
        </span>
      </div>
      <a href={src} target="_blank" rel="noopener noreferrer" className="block group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Hand-drawn recap card for ${nodeId}`}
          width={1080}
          height={1350}
          loading="lazy"
          className="w-full h-auto rounded-xl border border-surface-300/30 shadow-lg transition-transform duration-200 group-hover:scale-[1.01]"
        />
      </a>
    </div>
  );
}
