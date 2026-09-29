"use client";

/**
 * InternalDemoBadge — the honest label for surfaces that are NOT product.
 *
 * P5 audit gap 2, disposition (c): a handful of legacy surfaces stay
 * reachable by URL but are internal demos (hardcoded data, no backend, or
 * pure visual showcases). They are kept — never deleted — but each now
 * carries this badge and a noindex metadata layout so nothing pretends to
 * be a student-facing product surface. See
 * _cisce_build/pillar5_finish_manifest.md for the full disposition list.
 */

import { FlaskConical } from "lucide-react";

export default function InternalDemoBadge({ what }: { what?: string }) {
  return (
    <div className="flex justify-center px-4 pt-3">
      <div
        role="note"
        aria-label="Internal demo surface"
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-200"
      >
        <FlaskConical className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="truncate">
          Internal demo{what ? ` — ${what}` : ""} · not a student surface
        </span>
      </div>
    </div>
  );
}
