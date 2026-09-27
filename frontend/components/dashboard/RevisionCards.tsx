"use client";

/**
 * RevisionCards — "My revision cards" (EXAMREADY).
 *
 * The localStorage library the "Today I learned" card at the end of every
 * story writes into. Fully device-local: nothing here touches the backend,
 * and the section hides entirely when the library is empty (no empty-state
 * upsell, no placeholder counts — the library either exists or it doesn't).
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  listRevisionCards, removeRevisionCard, type RevisionCard,
} from "@/lib/examReady";

export default function RevisionCards() {
  // Read after mount — localStorage is browser-only, and the honest first
  // paint is "no library" rather than a flash of content.
  const [cards, setCards] = useState<RevisionCard[] | null>(null);

  useEffect(() => {
    setCards(listRevisionCards());
  }, []);

  if (cards === null || cards.length === 0) return null;

  return (
    <section className="glass-card rounded-2xl p-6" data-testid="revision-cards" aria-label="My revision cards">
      <div className="flex items-end justify-between gap-3 mb-1">
        <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-400" />
          My revision cards
        </h2>
        <span className="text-[11px] text-surface-600">
          {cards.length} {cards.length === 1 ? "card" : "cards"} kept
        </span>
      </div>
      <p className="text-xs text-surface-600 mb-4">
        The cards you kept at the end of your stories — eli5, the way through, and the trap to dodge.
      </p>

      <motion.ul variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="show" className="space-y-2.5">
        {cards.map((card) => (
          <motion.li
            key={card.nodeId}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 hover:border-gold-500/30 transition-colors group"
            data-testid="revision-card"
          >
            {/* Revisit — the whole row links back into the story. */}
            <Link href={`/learn/${card.nodeId}/story`} className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-gold-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{card.title}</p>
                <p className="text-[11px] text-surface-600 truncate">
                  {[card.subject, typeof card.classLevel === 'number' || typeof card.classLevel === 'string' ? `Class ${card.classLevel}` : null]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <span className="text-[11px] font-medium text-gold-300 flex items-center gap-1 shrink-0">
                Revisit
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => {
                removeRevisionCard(card.nodeId);
                setCards(listRevisionCards());
              }}
              aria-label={`Remove ${card.title} from your revision cards`}
              data-testid="revision-card-remove"
              className="shrink-0 p-1.5 rounded-lg text-surface-600 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
