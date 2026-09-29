"use client";

/**
 * MixupsCard — "Your mix-ups" (pedagogy audit §5/§7).
 *
 * Reads the device-local journal the practice feedback screen writes when a
 * child taps "What happened?" on a wrong answer (atlas-mixups-v1). It tallies
 * the recent traps so the child can SEE their own pattern — metacognition,
 * not a scoreboard — then names one honest next move.
 *
 * Fully device-local like the revision-cards library: nothing touches the
 * backend, the card hides entirely when the journal is empty, and a single
 * entry is described as one entry — never a "pattern" from one data point.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, ChevronRight } from "lucide-react";
import Link from "next/link";
import { friendlyNodeTitle } from "@/lib/nodeTitle";

interface MixupEntry {
  at: string;
  trap: "misread" | "wrong_rule" | "guessed" | string;
  topic: string;
}

const JOURNAL_KEY = "atlas-mixups-v1";
const WINDOW = 30; // last N entries form the pattern

const TRAP_LABEL: Record<string, string> = {
  misread: "Misread the question",
  wrong_rule: "Used the wrong rule",
  guessed: "Guessed",
};

const TRAP_TIP: Record<string, string> = {
  misread: "Slow down on the last line — the question usually hides its real ask there.",
  wrong_rule: "Before solving, say the rule out loud once. If it doesn't fit, that's the trap.",
  guessed: "Even a rough try beats a guess — write one step, then choose.",
};

function readJournal(): MixupEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is MixupEntry =>
        !!e && typeof e === "object" &&
        typeof (e as MixupEntry).trap === "string" &&
        typeof (e as MixupEntry).topic === "string",
    );
  } catch {
    return [];
  }
}

export default function MixupsCard() {
  const [entries, setEntries] = useState<MixupEntry[] | null>(null);

  useEffect(() => {
    setEntries(readJournal());
  }, []);

  if (entries === null || entries.length === 0) return null;

  const recent = entries.slice(-WINDOW);

  // Tally by trap, and find the topic where traps cluster.
  const byTrap = new Map<string, number>();
  const byTopic = new Map<string, number>();
  for (const e of recent) {
    byTrap.set(e.trap, (byTrap.get(e.trap) ?? 0) + 1);
    byTopic.set(e.topic, (byTopic.get(e.topic) ?? 0) + 1);
  }
  const topTrap = Array.from(byTrap.entries()).sort((a, b) => b[1] - a[1])[0];
  const topTopic = Array.from(byTopic.entries()).sort((a, b) => b[1] - a[1])[0];

  return (
    <section
      className="glass-card rounded-2xl p-6"
      data-testid="mixups-card"
      aria-label="Your mix-ups"
    >
      <div className="flex items-end justify-between gap-3 mb-1">
        <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-gold-300" />
          Your mix-ups
        </h2>
        <span className="text-[11px] text-surface-600">
          last {recent.length} {recent.length === 1 ? "tap" : "taps"}
        </span>
      </div>
      <p className="text-xs text-surface-600 mb-4">
        The traps you named after wrong answers — knowing your pattern is how you beat it.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2.5"
      >
        <div className="flex flex-wrap gap-2">
          {Array.from(byTrap.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([trap, n]) => (
              <span
                key={trap}
                className="text-xs px-2.5 py-1 rounded-full border border-gold-400/25 bg-gold-500/10 text-gold-200"
                data-testid={`mixup-tally-${trap}`}
              >
                {TRAP_LABEL[trap] ?? trap} ×{n}
              </span>
            ))}
        </div>

        {recent.length >= 3 && topTrap && topTopic && (
          <div className="rounded-xl px-3.5 py-3 bg-white/[0.03] border border-white/8">
            <p className="text-sm text-slate-200 leading-relaxed">
              <span className="text-gold-300 font-medium">Your pattern: </span>
              mostly {(TRAP_LABEL[topTrap[0]] ?? topTrap[0]).toLowerCase()}
              {" — "}
              and it shows up most in{" "}
              <span className="font-medium text-white">{friendlyNodeTitle(topTopic[0])}</span>.
            </p>
            <p className="text-xs text-surface-600 mt-1.5 leading-relaxed">
              {TRAP_TIP[topTrap[0]] ?? "Name the trap before you answer — it loses half its power."}
            </p>
          </div>
        )}

        <Link
          href="/practice"
          className="inline-flex items-center gap-1 text-xs font-medium text-gold-300 hover:text-gold-200 transition-colors"
          data-testid="mixups-practice-link"
        >
          Practice spotting it
          <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </section>
  );
}
