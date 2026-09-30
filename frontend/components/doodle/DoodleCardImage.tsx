'use client';

/**
 * DoodleCardImage — renders a node's exported hand-drawn card PNG
 * (public/doodle_cards/class{N}/{node_id}.webp, produced by
 * frontend/scripts/export_doodle_cards.mjs from authored node content —
 * zero-wrong layering: every string in the image is verbatim node text).
 *
 * Renders nothing until the image proves it exists (honest absence —
 * no broken-image chrome, no placeholder fakery). Click opens full size.
 *
 * FOLDER RESOLUTION (pillar-4 fix): the export pipeline shelves cards by the
 * node's syllabus grade ("class 6 corpus chapter" can be taught on a class-8
 * shelf), so the node-id prefix does not always match the folder. When the
 * caller passes an explicit classLevel we use it directly; when it doesn't
 * (today / study session), we resolve the shelf from the small generated
 * doodle_home_map.json (node_id -> class, module-cached, one fetch per
 * session) instead of guessing the prefix — a wrong guess served a stale or
 * missing card.
 */

import React, { useState } from 'react';

/* module-level home map cache: one fetch per session, shared by every card */
let homeMap: Record<string, string> | null = null;
let homeMapLoad: Promise<void> | null = null;

function loadHomeMap(): Promise<void> {
  if (!homeMapLoad) {
    homeMapLoad = fetch('/doodle_cards/doodle_home_map.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((doc) => {
        if (doc && typeof doc === 'object') homeMap = doc;
      })
      .catch(() => {
        /* map unavailable — prefix fallback stays */
      });
  }
  return homeMapLoad;
}

export default function DoodleCardImage({
  nodeId,
  classLevel,
}: {
  nodeId: string;
  classLevel?: number | string | null;
}) {
  const [state, setState] = useState<'loading' | 'shown' | 'missing'>('loading');
  const [src, setSrc] = useState<string | null>(null);

  const prefix = nodeId.match(/^c(\d+)_/)?.[1] ?? '';
  const explicit =
    classLevel != null && String(classLevel).match(/^\d+$/)
      ? String(classLevel)
      : '';

  /* Resolve the folder once per (nodeId, classLevel). Explicit band wins;
     otherwise consult the generated home map, falling back to the prefix
     folder when the map is unavailable or the node is unmapped. */
  React.useEffect(() => {
    let cancelled = false;
    const resolve = (folder: string) => {
      if (cancelled) return;
      setState('loading');
      setSrc(folder ? `/doodle_cards/class${folder}/${nodeId}.webp` : null);
    };
    const fallback = explicit || prefix;
    if (explicit || !prefix) {
      resolve(fallback);
      return;
    }
    loadHomeMap().then(() => {
      if (cancelled) return;
      resolve((homeMap && homeMap[nodeId]) || fallback);
    });
    return () => {
      cancelled = true;
    };
  }, [nodeId, explicit, prefix]);

  if (!src) return null;

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
          width={720}
          height={900}
          loading="lazy"
          className="w-full h-auto rounded-xl border border-surface-300/30 shadow-lg transition-transform duration-200 group-hover:scale-[1.01]"
        />
      </a>
    </div>
  );
}
