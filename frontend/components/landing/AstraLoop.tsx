"use client";

/**
 * AstraLoop — cinematic, self-running product demo loop (Google Astra launch
 * aesthetic). A dark void stage with a living spiral galaxy at the centre:
 * a canvas-2D particle disc — ~2,300 precomputed stars in four logarithmic
 * spiral arms around a warm-gold core, rotating with differential speed
 * (inner stars orbit faster), twinkling per-star, tinted with cool blue-violet
 * nebula zones, tilted to ~57° inclination so the disc reads as an ellipse,
 * with the occasional shooting star. Four glass chips ride a visible elliptical
 * orbit around the disc — scaling/blurring by depth (front larger and crisp,
 * back smaller and blurred) — while a thin gold progress arc sweeps the orbit
 * ellipse once per ~6s segment. The centre glass panel crossfades between four
 * auto-playing product payloads:
 *
 *   01 VERIFIED — student asks a physics question, typing dots, 3 solution
 *                 steps stamp in, gold "VERIFIED — 0 hallucinations" seal pops.
 *   02 SIMULATE — canvas atom/gyroscope render (rAF), caption "945 interactive sims".
 *   03 SPEAK    — Hinglish voice exchange: waveform pulses, tutor line types out,
 *                 mastery ring fills.
 *   04 ADAPT    — question cards cycle warm-up → grade → challenge while the
 *                 mastery bar climbs 30 → 60 → 85. "the tutor adapts to YOU".
 *
 * Engineering: ONE master rAF clock drives segment state + the gold dash-offset
 * arc + the chip orbit (per-frame attribute/style writes only — no per-frame
 * React re-renders). The galaxy canvas runs its own rAF (paused off-screen),
 * same pattern as the SIMULATE canvas. Segment transitions use framer-motion
 * AnimatePresence. Respects prefers-reduced-motion (opacity-only fades, a
 * single static galaxy frame, static chips, no shooting stars).
 */

import { useEffect, useRef, useState, type ComponentType, type ReactNode, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Atom, AudioLines, Mic, ShieldCheck, Target } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Clock + galaxy / orbit geometry
// ─────────────────────────────────────────────────────────────

const SEGMENT_MS = 6000;
const ORBIT_MS = 24000; // one full chip lap per 4-segment loop
const TAU = Math.PI * 2;

// Elliptical orbit (SVG viewBox units) — chips + progress arc ride this ellipse.
const GAL_CX = 380;
const GAL_CY = 212;
const GAL_RX = 352;
const GAL_RY = 186;

// Galaxy disc projection.
const INCL_Y = 0.55; // ~57° inclination → vertical squash of the disc
const AZIMUTH = -0.1; // slight roll of the whole disc for depth
const COS_A = Math.cos(AZIMUTH);
const SIN_A = Math.sin(AZIMUTH);

type IconType = ComponentType<{ className?: string }>;

const SEGMENTS: { id: string; label: string; icon: IconType; blurb: string }[] = [
  {
    id: "verified",
    label: "VERIFIED",
    icon: ShieldCheck,
    blurb:
      "Verified: a student asks a physics question, three solution steps stamp in and a gold seal reads VERIFIED — 0 hallucinations.",
  },
  {
    id: "simulate",
    label: "SIMULATE",
    icon: Atom,
    blurb:
      "Simulate: a live atom simulation orbits on canvas — one of 945 interactive sims.",
  },
  {
    id: "speak",
    label: "SPEAK",
    icon: AudioLines,
    blurb:
      "Speak: a Hinglish voice exchange — the tutor types 'Chalo isko samajh lete hain — agla tumse hoga, pakka.' and the mastery ring fills.",
  },
  {
    id: "adapt",
    label: "ADAPT",
    icon: Target,
    blurb:
      "Adapt: question cards cycle warm-up, grade-level, challenge while the mastery bar climbs 30 to 60 to 85 — the tutor adapts to YOU.",
  },
];

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const ASTRA_CSS = `
@keyframes astra-float-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(42px,-26px) scale(1.12); } }
@keyframes astra-float-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-38px,30px) scale(1.08); } }
@keyframes astra-grain {
  0%,100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); }
  20% { transform: translate(-4%,2%); } 30% { transform: translate(3%,-4%); }
  40% { transform: translate(2%,3%); } 50% { transform: translate(-3%,4%); }
  60% { transform: translate(4%,1%); } 70% { transform: translate(-1%,-2%); }
  80% { transform: translate(2%,-3%); } 90% { transform: translate(-4%,1%); }
}
@media (prefers-reduced-motion: reduce) {
  .astra-stage *, .astra-stage { animation: none !important; }
}
`;

/** Per-chip placement on the orbit ellipse (parametric angle, depth-scaled). */
function chipTransform(angle: number): { transform: string; opacity: string; zIndex: string; filter: string } {
  const x = GAL_RX * Math.cos(angle);
  const y = GAL_RY * Math.sin(angle);
  const depth = Math.sin(angle); // -1 far (top of ellipse) … +1 near (bottom)
  const s = 0.86 + ((depth + 1) / 2) * 0.3;
  return {
    transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`,
    opacity: (0.6 + ((depth + 1) / 2) * 0.4).toFixed(3),
    zIndex: depth > 0 ? "30" : "12",
    filter: depth < 0 ? `blur(${(Math.min(1, -depth) * 2.4).toFixed(2)}px)` : "none",
  };
}

// SSR / first-paint placement: chips start spread on the ellipse (top/right/bottom/left).
const CHIP_INIT = [-Math.PI / 2, 0, Math.PI / 2, Math.PI].map(chipTransform);

// ─────────────────────────────────────────────────────────────
// Segment 01 — VERIFIED (chat mock with stamped steps + gold seal)
// ─────────────────────────────────────────────────────────────

const VERIFIED_STEPS = [
  { text: "From rest → u = 0 m/s. Given: v = 20 m/s, t = 5 s.", final: false },
  { text: "Uniform acceleration → apply v = u + a·t.", final: false },
  { text: "a = (20 − 0) / 5 = 4 m/s² — checked numerically.", final: true },
] as const;

function VerifiedSegment({ reduced }: { reduced: boolean }) {
  const tr = (delay: number, spring = false) =>
    reduced ? { delay, duration: 0.2 } : spring ? { delay, type: "spring" as const, stiffness: 240, damping: 16 } : { delay, type: "spring" as const, stiffness: 260, damping: 20 };

  return (
    <div className="flex min-h-[320px] flex-col gap-2.5 px-5 py-5 text-left">
      {/* student question */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={tr(0.25)}
        className="flex justify-end"
      >
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-2.5 text-[13px] leading-relaxed text-white shadow-lg shadow-indigo-500/25">
          A car accelerates from rest to 20 m/s in 5 s — acceleration kya hui?
        </div>
      </motion.div>

      {/* typing dots (appear, then dissolve as the steps start stamping) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.95, duration: 0.85, times: [0, 0.18, 0.82, 1] }}
        className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-700/60 bg-slate-900/80 px-4 py-3"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-indigo-400"
            animate={reduced ? undefined : { y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
          />
        ))}
      </motion.div>

      {/* solution steps stamp in one-by-one */}
      {VERIFIED_STEPS.map((s, i) => (
        <motion.div
          key={s.text}
          initial={{ opacity: 0, scale: 1.16, rotate: -2.4, y: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={tr(1.75 + i * 0.7, true)}
          className="flex items-start gap-2.5"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
              s.final
                ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                : "border-indigo-500/30 bg-indigo-500/15 text-indigo-300"
            }`}
          >
            {i + 1}
          </span>
          <div
            className={`rounded-2xl rounded-bl-md border px-3.5 py-2 text-[13px] leading-relaxed ${
              s.final
                ? "border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-300"
                : "border-slate-700/60 bg-slate-900/80 text-slate-300"
            }`}
          >
            {s.text}
          </div>
        </motion.div>
      ))}

      {/* gold VERIFIED seal — pops + rotates in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={reduced ? { delay: 4.15, duration: 0.25 } : { delay: 4.15, type: "spring", stiffness: 220, damping: 11 }}
        className="relative mx-auto mt-1 flex w-fit items-center gap-2.5 rounded-full border border-amber-300/50 bg-gradient-to-r from-amber-400/15 via-amber-300/10 to-transparent px-4 py-2 shadow-[0_0_34px_rgba(251,191,36,0.3)]"
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-dashed border-amber-300/70"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
          />
          <ShieldCheck className="h-4 w-4 text-amber-300" />
        </span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-amber-200">
          Verified — 0 hallucinations
        </span>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Segment 02 — SIMULATE (canvas atom / gyroscope, rAF)
// ─────────────────────────────────────────────────────────────

function SimulateSegment({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 360;
    const H = 210;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const orbits = [
      { rx: 128, ry: 42, tilt: 0.08, speed: 1.5, color: "#818cf8" },
      { rx: 116, ry: 52, tilt: 1.15, speed: -1.05, color: "#a78bfa" },
      { rx: 120, ry: 38, tilt: -1.02, speed: 0.82, color: "#38bdf8" },
    ];

    let t = reduced ? 2.2 : 0;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduced) t += dt;

      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;

      // pulsing nucleus glow
      const pulse = reduced ? 0.6 : 0.55 + 0.18 * Math.sin(t * 2.4);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48);
      g.addColorStop(0, `rgba(199,210,254,${0.45 + pulse * 0.3})`);
      g.addColorStop(0.35, "rgba(99,102,241,0.32)");
      g.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e0e7ff";
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();

      for (const o of orbits) {
        // orbit path
        ctx.strokeStyle = `${o.color}55`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, o.rx, o.ry, o.tilt, 0, Math.PI * 2);
        ctx.stroke();

        const a = t * o.speed * 2;
        const px = o.rx * Math.cos(a);
        const py = o.ry * Math.sin(a);
        const cosT = Math.cos(o.tilt);
        const sinT = Math.sin(o.tilt);

        // fading trail
        for (let k = 1; k <= 5; k++) {
          const aa = a - k * 0.15 * Math.sign(o.speed || 1);
          const tx = o.rx * Math.cos(aa);
          const ty = o.ry * Math.sin(aa);
          ctx.fillStyle = `${o.color}${Math.max(8, 42 - k * 8).toString(16).padStart(2, "0")}`;
          ctx.beginPath();
          ctx.arc(cx + tx * cosT - ty * sinT, cy + tx * sinT + ty * cosT, 2.6 - k * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        // electron
        ctx.shadowColor = o.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = o.color;
        ctx.beginPath();
        ctx.arc(cx + px * cosT - py * sinT, cy + px * sinT + py * cosT, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div className="min-h-[320px] px-5 py-5">
      <div className="mb-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        <span>sim · hydrogen atom</span>
        <span className="flex items-center gap-1.5 text-sky-300">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          live render
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
        <canvas ref={canvasRef} className="h-auto w-full" style={{ aspectRatio: "360 / 210" }} />
      </div>
      <div className="mt-3 rounded-2xl border border-sky-400/20 bg-sky-400/5 px-4 py-2.5 text-center">
        <span className="font-mono text-xs font-bold tracking-[0.14em] text-sky-300">945 interactive sims</span>
        <span className="ml-2 text-xs text-slate-400">— physics you can grab, not memorise</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Segment 03 — SPEAK (Hinglish voice exchange + mastery ring)
// ─────────────────────────────────────────────────────────────

const TUTOR_LINE = "Chalo isko samajh lete hain — agla tumse hoga, pakka.";
const SPEAK_RING_R = 27;
const SPEAK_RING_C = 2 * Math.PI * SPEAK_RING_R;

function SpeakSegment({ reduced }: { reduced: boolean }) {
  const [chars, setChars] = useState(reduced ? TUTOR_LINE.length : 0);

  useEffect(() => {
    if (reduced) {
      setChars(TUTOR_LINE.length);
      return;
    }
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= TUTOR_LINE.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 55);
    return () => clearInterval(id);
  }, [reduced]);

  const done = chars >= TUTOR_LINE.length;
  const mastery = 0.86;

  return (
    <div className="flex min-h-[320px] flex-col gap-3 px-5 py-5 text-left">
      {/* student voice chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0.2 } : { type: "spring", stiffness: 220, damping: 20 }}
        className="flex items-center gap-2 self-end rounded-full border border-slate-700/60 bg-slate-900/80 px-3.5 py-1.5 text-xs text-slate-300"
      >
        <Mic className="h-3.5 w-3.5 text-violet-300" />
        <span className="italic">&ldquo;Ball hawa mein curve kyun hota hai?&rdquo;</span>
      </motion.div>

      {/* waveform */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex h-10 items-center justify-center gap-[3px]"
        aria-hidden
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className={`w-[3px] origin-center rounded-full ${
              i % 7 === 3
                ? "bg-gradient-to-t from-amber-500 to-amber-300"
                : "bg-gradient-to-t from-indigo-500 via-violet-400 to-fuchsia-300"
            }`}
            style={{ height: `${9 + ((i * 37) % 23)}px` }}
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.4, 0.85, 0.3] }}
            transition={
              reduced
                ? undefined
                : { repeat: Infinity, duration: 0.85 + ((i * 53) % 40) / 100, delay: i * 0.045, ease: "easeInOut" }
            }
          />
        ))}
      </motion.div>

      {/* tutor line typing out in Hinglish */}
      <div className="rounded-2xl rounded-bl-md border border-indigo-500/25 bg-indigo-500/5 px-4 py-3">
        <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-300/80">
          <AudioLines className="h-3.5 w-3.5" />
          tutor · hinglish voice
        </div>
        <p className="min-h-[44px] text-sm leading-relaxed text-indigo-100">
          {TUTOR_LINE.slice(0, chars)}
          {!done && !reduced && (
            <motion.span
              className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-indigo-300"
              animate={{ opacity: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          )}
        </p>
      </div>

      {/* mastery ring fills after the line lands */}
      <div className="mt-auto flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90 shrink-0">
          <circle cx="32" cy="32" r={SPEAK_RING_R} strokeWidth="6" className="fill-none stroke-slate-800" />
          <motion.circle
            cx="32"
            cy="32"
            r={SPEAK_RING_R}
            strokeWidth="6"
            strokeLinecap="round"
            className="fill-none stroke-indigo-400"
            strokeDasharray={SPEAK_RING_C}
            initial={{ strokeDashoffset: SPEAK_RING_C }}
            animate={{ strokeDashoffset: done ? SPEAK_RING_C * (1 - mastery) : SPEAK_RING_C }}
            transition={reduced ? { duration: 0.3 } : { type: "spring", stiffness: 50, damping: 16 }}
          />
        </svg>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Mastery · Circular Motion</div>
          <div className="text-2xl font-bold text-slate-100">
            86<span className="text-base text-indigo-400">%</span>
          </div>
          <div className="text-xs text-emerald-400">voice se samjha — concept locked</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Segment 04 — ADAPT (difficulty cards cycle, mastery bar climbs)
// ─────────────────────────────────────────────────────────────

const ADAPT_CARDS = [
  { tier: "WARM-UP", tone: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300", q: "State the SI unit of acceleration — one line, no panic.", m: 30 },
  { tier: "GRADE 9", tone: "border-indigo-400/40 bg-indigo-400/10 text-indigo-300", q: "A bike goes 0 → 15 m/s in 6 s. Find its acceleration.", m: 60 },
  { tier: "CHALLENGE", tone: "border-amber-400/40 bg-amber-400/10 text-amber-300", q: "It then brakes to rest in 30 m. Total time of the trip?", m: 85 },
] as const;

function AdaptSegment({ reduced }: { reduced: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((v) => (v + 1) % ADAPT_CARDS.length), 1800);
    return () => clearInterval(id);
  }, []);

  const card = ADAPT_CARDS[idx];

  return (
    <div className="flex min-h-[320px] flex-col justify-center px-5 py-5">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        <span>difficulty engine</span>
        <span className="text-slate-400">live tuning</span>
      </div>

      <div className="relative min-h-[104px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={idx}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 44, rotate: 1.6 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, rotate: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -44, rotate: -1.6 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.16em] ${card.tone}`}>
                {card.tier}
              </span>
              <span className="font-mono text-[10px] text-slate-500">Q{21 + idx}</span>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-200">{card.q}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* mastery bar climbing 30 → 60 → 85 */}
      <div className="mt-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          <span>Mastery · Motion</span>
          <motion.span
            key={card.m}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-bold text-indigo-300"
          >
            {card.m}%
          </motion.span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-amber-300"
            animate={{ width: `${card.m}%` }}
            transition={reduced ? { duration: 0.2 } : { type: "spring", stiffness: 110, damping: 20 }}
          />
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        the tutor adapts to <span className="font-bold tracking-wide text-amber-300">YOU</span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Scenery — spiral-galaxy canvas, orbit ellipse, aurora
// ─────────────────────────────────────────────────────────────

type GalaxyStar = {
  r: number; // disc radius (px)
  a0: number; // base angle (rad)
  om: number; // angular speed (rad/s) — differential, inner faster
  z: number; // disc thickness offset
  sz: number; // base size
  al: number; // base alpha
  tw: number; // twinkle speed
  ph: number; // twinkle phase
  sp: number; // sprite index
};

type NebulaBlob = { r: number; a0: number; rad: number; col: string; al: number };

/** Soft round star sprite: bright core → coloured halo → transparent. */
function makeStarSprite(core: string, halo: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 32;
  c.height = 32;
  const g2 = c.getContext("2d");
  if (g2) {
    const g = g2.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, core);
    g.addColorStop(0.25, halo);
    g.addColorStop(1, halo.replace(/[\d.]+\)$/, "0)"));
    g2.fillStyle = g;
    g2.fillRect(0, 0, 32, 32);
  }
  return c;
}

/**
 * The Milky Way core: ~2,300 precomputed stars in four logarithmic spiral
 * arms + a warm bulge, drawn per-frame on canvas 2D with device-pixel
 * scaling. Differential rotation (inner stars orbit faster), per-star
 * twinkle, cool blue-violet nebula tints along the arms, warm gold core,
 * ~57° inclination (elliptical projection with slight roll) and the
 * occasional shooting star. Reduced motion → one static frame.
 */
function GalaxyCanvas({ reduced }: { reduced: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inView = useInView(wrapRef, { amount: 0.05 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let R = 0;
    let sizeK = 1;

    const SPRITES = [
      makeStarSprite("rgba(255,255,255,1)", "rgba(205,222,255,0.9)"), // white-blue
      makeStarSprite("rgba(240,246,255,1)", "rgba(150,182,255,0.85)"), // blue-white
      makeStarSprite("rgba(255,250,240,1)", "rgba(255,216,152,0.85)"), // warm gold
      makeStarSprite("rgba(228,236,255,1)", "rgba(126,146,255,0.8)"), // deep blue
    ];

    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

    let stars: GalaxyStar[] = [];
    let nebs: NebulaBlob[] = [];

    const build = () => {
      W = wrap.clientWidth || 420;
      H = wrap.clientHeight || 300;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W * 0.46, (H * 0.5) / INCL_Y);
      sizeK = R / 230;

      // ── stars: bulge + four spiral arms + scattered field ──
      stars = [];
      const N = 2300;
      for (let i = 0; i < N; i++) {
        const roll = Math.random();
        let r: number;
        let phi: number;
        let z: number;
        let kind: number;
        let bright = 0.92;
        if (roll < 0.15) {
          // central bulge — warm gold/white, thicker disc
          r = Math.abs(gauss()) * R * 0.17 + Math.random() * R * 0.06;
          phi = Math.random() * TAU;
          z = gauss() * R * 0.055;
          kind = 2;
          bright = 1.05;
        } else if (roll < 0.9) {
          // four logarithmic spiral arms (two major, two minor)
          const major = Math.random() < 0.62;
          const arm = major ? (Math.random() < 0.5 ? 0 : 1) : Math.random() < 0.5 ? 2 : 3;
          r = R * (0.13 + 0.87 * Math.sqrt(Math.random()));
          const pitch = major ? 2.55 : 2.9;
          phi =
            arm * (Math.PI / 2) +
            Math.log(1 + r / (R * 0.085)) * pitch +
            gauss() * (major ? 0.24 : 0.34) * (0.45 + (r / R) * 0.85);
          z = gauss() * R * 0.024;
          const cr = Math.random();
          kind = cr < 0.42 ? 1 : cr < 0.72 ? 0 : 3;
        } else {
          // sparse field stars across the disc
          r = R * (0.08 + 0.92 * Math.sqrt(Math.random()));
          phi = Math.random() * TAU;
          z = gauss() * R * 0.03;
          kind = Math.random() < 0.6 ? 0 : 1;
        }
        stars.push({
          r,
          a0: phi,
          om: 0.05 + 0.2 * Math.pow(Math.max(0, 1 - r / R), 1.45),
          z,
          sz: 0.6 + Math.pow(Math.random(), 3) * 2.6,
          al: (0.35 + Math.random() * 0.6) * bright,
          tw: 0.4 + Math.random() * 2.2,
          ph: Math.random() * TAU,
          sp: kind,
        });
      }

      // ── nebula tint zones riding the arms (cool blue-violet + faint warm inner) ──
      nebs = [];
      const cool = ["rgba(93,108,242,", "rgba(139,92,246,", "rgba(56,189,248,"];
      for (let i = 0; i < 10; i++) {
        const major = i < 7;
        const arm = major ? i % 2 : 2 + (i % 2);
        const rr = R * (0.22 + 0.72 * (((i % 5) + 1) / 5));
        const a0 =
          arm * (Math.PI / 2) + Math.log(1 + rr / (R * 0.085)) * (major ? 2.55 : 2.9) + gauss() * 0.2;
        nebs.push({
          r: rr,
          a0,
          rad: R * (major ? 0.18 + Math.random() * 0.14 : 0.12 + Math.random() * 0.1),
          col: cool[major ? i % 2 : 2],
          al: major ? 0.1 : 0.07,
        });
      }
      nebs.push({ r: R * 0.15, a0: 0.7, rad: R * 0.17, col: "rgba(251,191,36,", al: 0.06 });
      nebs.push({ r: R * 0.19, a0: 3.9, rad: R * 0.14, col: "rgba(255,214,150,", al: 0.05 });
    };

    const project = (dx: number, dy: number, extraY: number): [number, number, number] => {
      const ey = dy * INCL_Y + extraY;
      const x = W / 2 + dx * COS_A - ey * SIN_A;
      const y = H / 2 + dx * SIN_A + ey * COS_A;
      return [x, y, dy];
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      ctx.globalCompositeOperation = "lighter";

      // faint disc haze — the galaxy body
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(AZIMUTH);
      ctx.scale(1, INCL_Y);
      const haze = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.95);
      haze.addColorStop(0, "rgba(110,130,235,0.10)");
      haze.addColorStop(0.55, "rgba(90,100,210,0.045)");
      haze.addColorStop(1, "rgba(90,100,210,0)");
      ctx.fillStyle = haze;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.95, 0, TAU);
      ctx.fill();
      ctx.restore();

      // warm core — outer halo + bright nucleus (white-gold, never orange)
      const pulse = 1 + 0.05 * Math.sin(t * 0.7);
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.38 * pulse);
      halo.addColorStop(0, "rgba(255,224,164,0.20)");
      halo.addColorStop(0.45, "rgba(255,198,124,0.07)");
      halo.addColorStop(1, "rgba(255,198,124,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.38 * pulse, 0, TAU);
      ctx.fill();
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.16 * pulse);
      core.addColorStop(0, "rgba(255,250,235,0.95)");
      core.addColorStop(0.35, "rgba(255,220,150,0.4)");
      core.addColorStop(1, "rgba(255,210,130,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.16 * pulse, 0, TAU);
      ctx.fill();

      // nebula tints — rotate slowly at pattern speed
      for (const nb of nebs) {
        const pa = nb.a0 + t * 0.045;
        const [x, y] = project(Math.cos(pa) * nb.r, Math.sin(pa) * nb.r, 0);
        const g = ctx.createRadialGradient(x, y, 0, x, y, nb.rad);
        g.addColorStop(0, `${nb.col}${nb.al})`);
        g.addColorStop(1, `${nb.col}0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, nb.rad, 0, TAU);
        ctx.fill();
      }

      // stars — additive sprites, twinkle + depth scaling
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const a = s.a0 + t * s.om;
        const [x, y, depth] = project(Math.cos(a) * s.r, Math.sin(a) * s.r, s.z * 0.5);
        const dN = depth / R; // −1 far (top of the tilted disc) … +1 near (bottom)
        const tw = 0.55 + 0.45 * Math.sin(t * s.tw + s.ph);
        let al = s.al * tw * (1 + dN * 0.22);
        if (al > 1) al = 1;
        else if (al < 0.04) continue;
        const sz = Math.min(3.4, s.sz * sizeK * (1 + dN * 0.2));
        ctx.globalAlpha = al;
        ctx.drawImage(SPRITES[s.sp], x - sz * 2, y - sz * 2, sz * 4, sz * 4);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    // ── shooting star: occasional streak across the disc ──
    let ss: { x0: number; y0: number; ang: number; len: number; t0: number; dur: number } | null = null;
    let ssNext = 2.2 + Math.random() * 3;
    const drawShooting = (t: number) => {
      if (!ss && t > ssNext) {
        const fromLeft = Math.random() < 0.5;
        ss = {
          x0: fromLeft ? W * (0.02 + Math.random() * 0.2) : W * (0.78 + Math.random() * 0.2),
          y0: H * (0.1 + Math.random() * 0.3),
          ang: (fromLeft ? 1 : -1) * (0.18 + Math.random() * 0.4),
          len: 90 + Math.random() * 70,
          t0: t,
          dur: 0.9 + Math.random() * 0.7,
        };
      }
      if (!ss) return;
      const p = (t - ss.t0) / ss.dur;
      if (p >= 1) {
        ss = null;
        ssNext = t + 3.5 + Math.random() * 6.5;
        return;
      }
      const dist = Math.hypot(W, H) * 0.9;
      const hx = ss.x0 + Math.cos(ss.ang) * dist * p;
      const hy = ss.y0 + Math.sin(ss.ang) * dist * p;
      const al = Math.sin(p * Math.PI);
      const tail = ss.len * (0.6 + 0.4 * al);
      const gx = hx - Math.cos(ss.ang) * tail;
      const gy = hy - Math.sin(ss.ang) * tail;
      ctx.globalCompositeOperation = "lighter";
      const lg = ctx.createLinearGradient(gx, gy, hx, hy);
      lg.addColorStop(0, "rgba(200,220,255,0)");
      lg.addColorStop(0.7, `rgba(220,232,255,${(0.5 * al).toFixed(3)})`);
      lg.addColorStop(1, `rgba(255,255,255,${(0.95 * al).toFixed(3)})`);
      ctx.strokeStyle = lg;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.globalAlpha = al;
      ctx.drawImage(SPRITES[0], hx - 6, hy - 6, 12, 12);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let last = performance.now();
    let t = 3.0; // start mid-twinkle so the first frame is already alive
    const frame = (now: number) => {
      t += Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(t);
      drawShooting(t);
      raf = requestAnimationFrame(frame);
    };

    build();
    if (!reduced && inView) raf = requestAnimationFrame(frame);
    else draw(3.0); // reduced motion (or hidden): one static frame

    const ro = new ResizeObserver(() => {
      build();
      if (reduced || !inView) draw(3.0);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced, inView]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-[4] h-[300px] w-[420px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[520px] lg:h-[400px] lg:w-[600px]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

/** Elliptical orbit: faint dashed track + gold dash-offset progress arc + comet head. */
function OrbitRing({
  arcRef,
  cometRef,
}: {
  arcRef: RefObject<SVGPathElement | null>;
  cometRef: RefObject<SVGGElement | null>;
}) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[424px] w-[760px] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] scale-[0.58] sm:scale-[0.78] lg:scale-100">
      <svg viewBox="0 0 760 424" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="astraGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <ellipse
          cx={GAL_CX}
          cy={GAL_CY}
          rx={GAL_RX}
          ry={GAL_RY}
          fill="none"
          stroke="rgba(148,163,184,0.13)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        {/* full ellipse path starting at the top, clockwise — pathLength normalised to 1 */}
        <path
          ref={arcRef}
          d={`M ${GAL_CX} ${GAL_CY - GAL_RY} A ${GAL_RX} ${GAL_RY} 0 1 1 ${GAL_CX} ${GAL_CY + GAL_RY} A ${GAL_RX} ${GAL_RY} 0 1 1 ${GAL_CX} ${GAL_CY - GAL_RY}`}
          fill="none"
          stroke="url(#astraGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1}
          style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.55))" }}
        />
        <g ref={cometRef} transform={`translate(${GAL_CX} ${GAL_CY - GAL_RY})`}>
          <circle r="10" fill="rgba(251,191,36,0.14)" />
          <circle r="3.5" fill="#fde68a" style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.9))" }} />
        </g>
      </svg>
    </div>
  );
}

function Aurora() {
  // far-background whisper — never more than ~8-10% peak alpha
  return (
    <>
      <div
        className="astra-float-a pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full opacity-80 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10), transparent 65%)" }}
      />
      <div
        className="astra-float-b pointer-events-none absolute -right-28 bottom-4 h-80 w-80 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.09), transparent 65%)" }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// AstraLoop
// ─────────────────────────────────────────────────────────────

export default function AstraLoop() {
  const reduced = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGPathElement | null>(null);
  const cometRef = useRef<SVGGElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const elapsedRef = useRef(0);
  const segRef = useRef(0);
  const [seg, setSeg] = useState(0);
  const inView = useInView(stageRef, { amount: 0.25 });

  // mouse spotlight (a whisper) + gentle 3D parallax
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const smx = useSpring(mx, { stiffness: 140, damping: 22 });
  const smy = useSpring(my, { stiffness: 140, damping: 22 });
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 90, damping: 20 });
  const spy = useSpring(py, { stiffness: 90, damping: 20 });
  const ry = useMotionValue(0);
  const rx = useMotionValue(0);
  const sry = useSpring(ry, { stiffness: 80, damping: 20 });
  const srx = useSpring(rx, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${smx}px ${smy}px, rgba(148,163,184,0.05), transparent 70%)`;

  // ── the ONE master clock: segment state + gold progress arc + chip orbit ──
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      elapsedRef.current += dt;

      const p = (elapsedRef.current % SEGMENT_MS) / SEGMENT_MS;
      const idx = Math.floor(elapsedRef.current / SEGMENT_MS) % SEGMENTS.length;

      // per-frame attribute/style writes — no React re-render until the segment flips
      if (arcRef.current) arcRef.current.style.strokeDashoffset = `${1 - p}`;
      if (cometRef.current) {
        const a = ((-90 + p * 360) * Math.PI) / 180;
        cometRef.current.setAttribute(
          "transform",
          `translate(${(GAL_CX + GAL_RX * Math.cos(a)).toFixed(2)} ${(GAL_CY + GAL_RY * Math.sin(a)).toFixed(2)})`
        );
      }
      // chips ride the ellipse — one lap per full 4-segment loop
      if (!reduced) {
        const op = (elapsedRef.current % ORBIT_MS) / ORBIT_MS;
        for (let i = 0; i < chipRefs.current.length; i++) {
          const el = chipRefs.current[i];
          if (!el) continue;
          const st = chipTransform(((-90 + i * 90) * Math.PI) / 180 + op * TAU);
          el.style.transform = st.transform;
          el.style.opacity = st.opacity;
          el.style.zIndex = st.zIndex;
          el.style.filter = st.filter;
        }
      }
      if (idx !== segRef.current) {
        segRef.current = idx;
        setSeg(idx);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  // reduced motion: freeze the chips on the ellipse (top/right/bottom/left)
  useEffect(() => {
    if (!reduced) return;
    [-Math.PI / 2, 0, Math.PI / 2, Math.PI].forEach((angle, i) => {
      const el = chipRefs.current[i];
      if (!el) return;
      const st = chipTransform(angle);
      el.style.transform = st.transform;
      el.style.opacity = st.opacity;
      el.style.zIndex = st.zIndex;
      el.style.filter = st.filter;
    });
  }, [reduced]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    px.set(nx * -7);
    py.set(ny * -6);
    ry.set(nx * 1.6);
    rx.set(ny * -1.4);
  };

  const onMouseLeave = () => {
    mx.set(-600);
    my.set(-600);
    px.set(0);
    py.set(0);
    rx.set(0);
    ry.set(0);
  };

  const active = SEGMENTS[seg];
  const ActiveIcon = active.icon;

  return (
    <div
      ref={stageRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-astra-loop=""
      className="astra-stage relative mx-auto mt-10 h-[600px] w-full max-w-5xl select-none overflow-hidden rounded-[2rem] border border-white/10 bg-[#05060f] shadow-[0_50px_140px_-40px_rgba(76,81,191,0.35)] sm:h-[620px]"
    >
      <style dangerouslySetInnerHTML={{ __html: ASTRA_CSS }} />

      {/* deep-space base + faint far aurora */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0b0e22_0%,#05060f_60%)]" />
      <Aurora />

      {/* the living spiral galaxy */}
      <GalaxyCanvas reduced={reduced} />

      {/* elliptical orbit track with gold progress arc */}
      <OrbitRing arcRef={arcRef} cometRef={cometRef} />

      {/* centre panel — AnimatePresence crossfade/scale between segment payloads */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={reduced ? undefined : { x: spx, y: spy, transformPerspective: 1200, rotateX: srx, rotateY: sry }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={seg}
            data-astra-panel={active.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12, filter: "blur(8px)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.03, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-[min(88%,400px)] rounded-3xl border border-white/10 bg-slate-950/55 shadow-2xl shadow-indigo-950/50 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <ActiveIcon className="h-3.5 w-3.5 text-amber-300" />
              seg 0{seg + 1} · {active.label}
              <span className="ml-auto flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                auto
              </span>
            </div>
            {seg === 0 && <VerifiedSegment reduced={reduced} />}
            {seg === 1 && <SimulateSegment reduced={reduced} />}
            {seg === 2 && <SpeakSegment reduced={reduced} />}
            {seg === 3 && <AdaptSegment reduced={reduced} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* orbiting glass chips — ride the galaxy ellipse, scale/blur by depth, active lights gold */}
      <div aria-hidden className="absolute left-1/2 top-1/2 rotate-[-6deg] scale-[0.58] sm:scale-[0.78] lg:scale-100">
        {SEGMENTS.map((s, i) => {
          const ChipIcon = s.icon;
          const isActive = i === seg;
          return (
            <div
              key={s.id}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              data-astra-chip={s.id}
              className="absolute left-0 top-0 will-change-transform"
              style={CHIP_INIT[i]}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: isActive ? 1.1 : 1 }}
                transition={
                  reduced
                    ? { duration: 0.3, delay: i * 0.06 }
                    : isActive
                      ? { type: "spring", stiffness: 260, damping: 16 }
                      : { type: "spring", stiffness: 200, damping: 18, delay: i * 0.08 }
                }
                className={`flex items-center gap-2 rounded-full border px-3.5 py-2 backdrop-blur-md transition-colors duration-500 ${
                  isActive
                    ? "border-amber-300/60 bg-amber-400/10 shadow-[0_0_32px_rgba(251,191,36,0.3)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <ChipIcon className={`h-3.5 w-3.5 transition-colors duration-500 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                <span
                  className={`font-mono text-[10px] font-bold tracking-[0.18em] transition-colors duration-500 ${
                    isActive ? "text-amber-200" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* HUD */}
      <div className="absolute left-5 top-5 z-40 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <span className="flex items-center gap-1.5 text-amber-300">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-amber-300"
            animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          live
        </span>
        <span>
          0{seg + 1} / 04
        </span>
        <span className="hidden sm:inline">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={seg}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-slate-300"
            >
              {active.label}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <div className="absolute right-5 top-5 z-40 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 sm:block">
        astra loop · autoplay
      </div>

      {/* mouse spotlight — a whisper */}
      <motion.div className="pointer-events-none absolute inset-0 z-[45]" style={reduced ? undefined : { background: spotlight }} />

      {/* film grain */}
      <div
        className="astra-grain pointer-events-none absolute -inset-[10%] z-50 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, animation: reduced ? undefined : "astra-grain 7s steps(10) infinite" }}
      />

      {/* screen-reader description of the auto-playing demo */}
      <p className="sr-only">
        Auto-playing product demo, no input needed. It cycles four segments about every six seconds:{" "}
        {SEGMENTS.map((s) => s.blurb).join(" ")}
      </p>
    </div>
  );
}
