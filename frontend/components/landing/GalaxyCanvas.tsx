'use client';

/**
 * GalaxyCanvas — a LIVING, interactive canvas-2D spiral galaxy for the ATLAS
 * landing art.
 *
 *   · 2,400 disc stars in 4 logarithmic spiral arms (Milky-Way style) plus a
 *     dense golden central bulge and 150 near-field "sky" stars; differential
 *     rotation ω(r) = V/(rc + r) with per-star twinkle.
 *
 * Interaction model — the scene is ALIVE (all state in refs/typed arrays,
 * zero React re-renders, one rAF):
 *   · CURSOR MEMORY + GRAVITATIONAL LENS — the pointer leaves a lens behind:
 *     stars within its radius are attracted + swirled (tangential force) and
 *     brightened. The lens centre chases the cursor through a lagging spring
 *     and `presence` decays slowly after the cursor leaves, so the disc keeps
 *     swirling on underdamped springs before settling back.
 *   · CLICK = SHOCKWAVE — a click fires a radial ripple (visible ring) that
 *     kicks stars outward as its front passes; they spring-settle after.
 *   · CLICK = EVENT — clicking the core triggers a SUPERNOVA: the nucleus
 *     flares, a particle burst erupts, the arms compress then relax on a
 *     spring, and an `atlas:supernova` event fires so the Three.js core can
 *     flare in sync. Clicking empty space spawns a shooting star.
 *   · CONTINUOUS LIFE — shooting stars every 4–8 s, the disc roll wobbles
 *     ±2°, random stars flare up ~3× then fade.
 *   · SHARP CORE — layered small-radius gradients: hard-edged intense
 *     nucleus, thin 4-point diffraction spikes, and a rotating segmented
 *     accretion-disc ring with distinct edges. No blurry "sun".
 *
 * prefers-reduced-motion: one authored static frame, no listeners, no loop.
 */

import { useEffect, useRef } from 'react';

const STAR_COUNT = 2400;
const NF_COUNT = 150; // near-field sky stars
const ARMS = 4;
const TAU = Math.PI * 2;
const WIND = 4.6; // total winding of each arm (radians over the disc)
const SQUASH = 0.44; // depth tilt of the disc (1 = face-on)
const ROLL = -0.28; // cinematic diagonal, radians
const V = 0.075; // differential-rotation speed constant
const RC = 0.25; // rotation curve core radius (normalised)

// ── interaction tuning ──
const LENS_R = 0.24; // lens influence radius (× disc radius)
const LENS_PULL = 460; // radial attraction strength (px/s² at centre)
const LENS_SWIRL = 700; // tangential swirl strength (px/s² at centre)
const LENS_BRIGHT = 1.8; // brightness boost at lens centre
const SPRING_K = 30; // star-displacement spring constant
const SPRING_C = 4.6; // damping — underdamped on purpose (keeps swirling)
const WAVE_SPEED = 1.7; // shockwave front speed (× R per second)
const WAVE_BAND = 0.1; // shockwave band half-width (× R)
const WAVE_KICK = 2400; // outward acceleration while the front passes (px/s²)
const WOBBLE = 0.035; // disc roll wobble amplitude (±2°)
const CORE_HIT = 0.1; // core click hit radius (× R)
const PRESENCE_UP = 4.5; // lens presence ramp (1/s)
const PRESENCE_DOWN = 1.1; // lens presence decay — the "memory" (1/s)

const MAX_WAVES = 6;
const MAX_STREAKS = 10;
const MAX_PARTICLES = 130;

// warm-white, gold, ice-blue, violet — rgb triplets only (alpha via globalAlpha)
const COLORS = ['255,244,224', '245,166,35', '159,196,255', '196,148,255'];

/** Cheap bell-ish noise in [-1, 1]. */
function gauss(): number {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

interface Wave {
  x: number;
  y: number;
  t0: number;
}
interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  s: number;
  ci: number;
}

export default function GalaxyCanvas({ reduced = false }: { reduced?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── star parameter tables (all radii normalised 0..1) ──
    const r = new Float32Array(STAR_COUNT);
    const th = new Float32Array(STAR_COUNT);
    const w = new Float32Array(STAR_COUNT);
    const sz = new Float32Array(STAR_COUNT);
    const twS = new Float32Array(STAR_COUNT);
    const twP = new Float32Array(STAR_COUNT);
    const baseA = new Float32Array(STAR_COUNT);
    const zoff = new Float32Array(STAR_COUNT);
    const col = new Uint8Array(STAR_COUNT);
    // cursor-lens + shockwave physics (screen-space px, spring-lagged)
    const ox = new Float32Array(STAR_COUNT);
    const oy = new Float32Array(STAR_COUNT);
    const vx = new Float32Array(STAR_COUNT);
    const vy = new Float32Array(STAR_COUNT);
    // random star flare-ups (current boost, decays each frame)
    const fl = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const bulge = i < STAR_COUNT * 0.22;
      let rr: number;
      let baseAngle: number;
      let scatter: number;

      if (bulge) {
        // dense golden heart — quasi-spherical, loosely rotating
        rr = Math.abs(gauss()) * 0.15 + Math.random() * 0.05;
        baseAngle = Math.random() * TAU;
        scatter = gauss() * 0.9;
      } else {
        // logarithmic spiral arms, tighter near the core, feathery at the rim
        rr = 0.14 + Math.pow(Math.random(), 0.68) * 0.86;
        const arm = i % ARMS;
        baseAngle = arm * (TAU / ARMS) + rr * WIND;
        scatter = gauss() * (0.14 + 0.46 * rr);
      }

      r[i] = rr;
      th[i] = baseAngle + scatter;
      w[i] = V / (RC + rr); // differential rotation
      sz[i] = (0.5 + Math.random() * 1.35) * (Math.random() < 0.06 ? 2.3 : 1);
      twS[i] = 0.6 + Math.random() * 1.8;
      twP[i] = Math.random() * TAU;
      baseA[i] = 0.3 + Math.random() * 0.62;
      zoff[i] = gauss() * 0.035 * (1.1 - rr); // disc thickness, thinner at rim

      // colour: warm core → mixed arms
      const pick = Math.random();
      if (bulge) col[i] = pick < 0.55 ? 1 : pick < 0.92 ? 0 : 3;
      else col[i] = pick < 0.55 ? 0 : pick < 0.7 ? 1 : pick < 0.88 ? 2 : 3;
    }

    // near-field sky stars — slow uniform drift, outside the disc plane feel
    const nfx = new Float32Array(NF_COUNT);
    const nfy = new Float32Array(NF_COUNT);
    const nfa = new Float32Array(NF_COUNT);
    const nfs = new Float32Array(NF_COUNT);
    const nft = new Float32Array(NF_COUNT);
    const nox = new Float32Array(NF_COUNT);
    const noy = new Float32Array(NF_COUNT);
    const nvx = new Float32Array(NF_COUNT);
    const nvy = new Float32Array(NF_COUNT);
    for (let i = 0; i < NF_COUNT; i++) {
      let x = 0;
      let y = 0;
      do {
        x = gauss() * 1.25;
        y = gauss() * 1.25;
      } while (Math.hypot(x, y / SQUASH) < 0.3);
      nfx[i] = x;
      nfy[i] = y;
      nfa[i] = 0.12 + Math.random() * 0.4;
      nfs[i] = 0.5 + Math.random() * 1.1;
      nft[i] = Math.random() * TAU;
    }

    // ── sizing ──
    let wpx = 0;
    let hpx = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      wpx = parent.clientWidth;
      hpx = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(wpx * dpr));
      canvas.height = Math.max(1, Math.floor(hpx * dpr));
      canvas.style.width = `${wpx}px`;
      canvas.style.height = `${hpx}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // ── living state (refs, mutated only inside the rAF / handlers) ──
    const ptr = { x: 0, y: 0, active: false }; // raw pointer (canvas-local px)
    const lens = { x: 0, y: 0 }; // lagging lens centre — the cursor memory
    let presence = 0; // 0..1, decays slowly after the cursor leaves
    const waves: Wave[] = [];
    const streaks: Streak[] = [];
    const particles: Particle[] = [];
    let novaAge = 99; // seconds since supernova (large = idle)
    let compress = 0; // supernova arm-compression spring displacement
    let compressV = 0; // its velocity
    let streakTimer = 2.5; // first ambient shooting star
    let flareTimer = 1.2; // first random star flare
    let visible = true;
    let tNow = 7.3;

    const discR = () => Math.min(wpx, hpx) * 0.74;

    const spawnStreak = (x: number, y: number) => {
      if (streaks.length >= MAX_STREAKS) streaks.shift();
      const dir = Math.random() < 0.5 ? 1 : -1;
      const ang = (0.35 + Math.random() * 0.5) * dir; // shallow diagonal dive
      const sp = (0.55 + Math.random() * 0.45) * Math.max(wpx, 700);
      streaks.push({
        x,
        y,
        vx: Math.cos(ang) * sp,
        vy: Math.abs(Math.sin(ang)) * sp,
        age: 0,
        life: 0.75 + Math.random() * 0.5,
      });
    };

    const spawnNova = () => {
      novaAge = 0;
      compressV -= 4.2; // kick the arm-compression spring (compress → relax)
      particles.length = 0;
      const cx = wpx * 0.5;
      const cy = hpx * 0.46;
      const R = discR();
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const a = Math.random() * TAU;
        const sp = R * (0.35 + Math.random() * 1.35);
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp * (0.55 + Math.random() * 0.45),
          age: 0,
          life: 0.6 + Math.random() * 1.0,
          s: 0.8 + Math.random() * 1.8,
          ci: Math.random() < 0.6 ? 1 : 0,
        });
      }
      window.dispatchEvent(new CustomEvent('atlas:supernova'));
    };

    // ── event wiring — on WINDOW, because overlay layers sit above the
    //    canvas and would otherwise swallow every pointer event ──
    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      ptr.x = p.x;
      ptr.y = p.y;
      ptr.active = true;
    };
    const onLeave = () => {
      ptr.active = false;
    };
    const onDown = (e: PointerEvent) => {
      if (!visible || document.hidden) return;
      const el = e.target as Element | null;
      if (el && el.closest && el.closest('a,button,input,textarea,select')) return;
      const p = toLocal(e.clientX, e.clientY);
      if (p.x < 0 || p.y < 0 || p.x > wpx || p.y > hpx) return;
      const R = discR();
      if (Math.hypot(p.x - wpx * 0.5, p.y - hpx * 0.46) < R * CORE_HIT) {
        spawnNova(); // clicking the core = supernova
      } else {
        // clicking the disc = shockwave + shooting star from that point
        if (waves.length >= MAX_WAVES) waves.shift();
        waves.push({ x: p.x, y: p.y, t0: tNow });
        spawnStreak(p.x, p.y);
      }
    };

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      window.addEventListener('blur', onLeave);
    }

    // ── painters ──
    const drawHaze = (t: number, cx: number, cy: number, R: number, roll: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(roll);
      ctx.scale(1, SQUASH);

      // faint breathing golden bulge (the SHARP core is drawn separately)
      const breathe = 0.1 + 0.03 * Math.sin(t * 0.5);
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.26);
      core.addColorStop(0, `rgba(255,216,150,${breathe})`);
      core.addColorStop(0.5, 'rgba(245,166,35,0.05)');
      core.addColorStop(1, 'rgba(245,166,35,0)');
      ctx.fillStyle = core;
      ctx.fillRect(-R * 0.32, -R * 0.32, R * 0.64, R * 0.64);

      // faint cold disc haze
      const disc = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
      disc.addColorStop(0, 'rgba(126,138,214,0.065)');
      disc.addColorStop(0.55, 'rgba(126,138,214,0.035)');
      disc.addColorStop(1, 'rgba(126,138,214,0)');
      ctx.fillStyle = disc;
      ctx.fillRect(-R, -R, R * 2, R * 2);

      ctx.restore();
    };

    /** SHARP layered galactic core — hard nucleus, spikes, accretion ring. */
    const drawCore = (
      t: number,
      cx: number,
      cy: number,
      R: number,
      roll: number,
      nova: number
    ) => {
      // soft tight under-glow (small radius — supports the core, never blurs it)
      const g0 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.05);
      g0.addColorStop(0, `rgba(255,226,164,${0.4 + nova * 0.4})`);
      g0.addColorStop(0.35, 'rgba(255,206,124,0.12)');
      g0.addColorStop(1, 'rgba(255,206,124,0)');
      ctx.fillStyle = g0;
      ctx.fillRect(cx - R * 0.05, cy - R * 0.05, R * 0.1, R * 0.1);

      // hard-edged nucleus: tiny, intense, near-white falloff
      const nucR = R * 0.015 * (1 + 0.1 * Math.sin(t * 2.6)) * (1 + nova * 1.6);
      const nuc = ctx.createRadialGradient(cx, cy, 0, cx, cy, nucR * 2.1);
      nuc.addColorStop(0, 'rgba(255,253,246,1)');
      nuc.addColorStop(0.42, 'rgba(255,240,204,0.96)');
      nuc.addColorStop(0.72, 'rgba(255,214,140,0.4)');
      nuc.addColorStop(1, 'rgba(255,206,120,0)');
      ctx.fillStyle = nuc;
      ctx.beginPath();
      ctx.arc(cx, cy, nucR * 2.1, 0, TAU);
      ctx.fill();

      // 4-point diffraction spikes — thin, tapered, gradient fade
      const len = R * 0.1 * (1 + nova * 1.4);
      for (let k = 0; k < 4; k++) {
        const a = roll + (k * Math.PI) / 2;
        const dx = Math.cos(a);
        const dy = Math.sin(a);
        let grad = ctx.createLinearGradient(cx, cy, cx + dx * len, cy + dy * len);
        grad.addColorStop(0, `rgba(255,240,206,${0.5 + nova * 0.4})`);
        grad.addColorStop(0.25, 'rgba(255,226,164,0.22)');
        grad.addColorStop(1, 'rgba(255,226,164,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + dx * len, cy + dy * len);
        ctx.stroke();
        grad = ctx.createLinearGradient(cx, cy, cx + dx * len * 0.45, cy + dy * len * 0.45);
        grad.addColorStop(0, `rgba(255,250,232,${Math.min(1, 0.85 + nova * 0.15)})`);
        grad.addColorStop(1, 'rgba(255,240,206,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + dx * len * 0.45, cy + dy * len * 0.45);
        ctx.stroke();
      }

      // accretion-disc ring — segmented, rotating, distinct edges, in-plane
      const cosR = Math.cos(roll);
      const sinR = Math.sin(roll);
      const seg = 44;
      for (let k = 0; k < seg; k++) {
        const a0 = (k / seg) * TAU + t * 0.55;
        const a1 = a0 + ((TAU / seg) * 0.72);
        const shimmer = 0.5 + 0.5 * Math.sin(a0 * 3 - t * 1.3);
        const alpha = Math.min(1, (0.16 + 0.34 * shimmer) * (1 + nova));
        const rr = k % 2 === 0 ? R * 0.082 : R * 0.058;
        const x0 = cx + (Math.cos(a0) * rr * cosR - Math.sin(a0) * rr * SQUASH * sinR);
        const y0 = cy + (Math.cos(a0) * rr * sinR + Math.sin(a0) * rr * SQUASH * cosR);
        const x1 = cx + (Math.cos(a1) * rr * cosR - Math.sin(a1) * rr * SQUASH * sinR);
        const y1 = cy + (Math.cos(a1) * rr * sinR + Math.sin(a1) * rr * SQUASH * cosR);
        ctx.strokeStyle = `rgba(255,214,142,${alpha})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    };

    const draw = (t: number, dt: number) => {
      tNow = t;
      ctx.clearRect(0, 0, wpx, hpx);
      const cx = wpx * 0.5;
      const cy = hpx * 0.46;
      const R = discR();
      const diag = Math.hypot(wpx, hpx);

      // ── continuous life timers ──
      if (dt > 0) {
        streakTimer -= dt;
        if (streakTimer <= 0) {
          streakTimer = 4 + Math.random() * 4; // every 4–8 s
          spawnStreak(wpx * (0.06 + Math.random() * 0.88), hpx * (0.04 + Math.random() * 0.34));
        }
        flareTimer -= dt;
        if (flareTimer <= 0) {
          flareTimer = 1.6 + Math.random() * 2.8;
          fl[(Math.random() * STAR_COUNT) | 0] = 2.2 + Math.random() * 1.6; // ~3× flare
        }
      }

      // ── supernova arm-compression spring (compress → relax) ──
      if (novaAge < 6) novaAge += dt;
      if (compress !== 0 || compressV !== 0) {
        compressV += (-36 * compress - 7 * compressV) * dt;
        compress += compressV * dt;
        if (Math.abs(compress) < 0.001 && Math.abs(compressV) < 0.001) {
          compress = 0;
          compressV = 0;
        }
      }
      const novaEnv = novaAge < 4 ? Math.exp(-novaAge * 2.4) : 0;
      const squeeze = Math.min(1.2, Math.max(0, compress)) * 0.18;

      // ── cursor memory: lagging lens centre + decaying presence ──
      const rate = ptr.active ? PRESENCE_UP : PRESENCE_DOWN;
      presence += ((ptr.active ? 1 : 0) - presence) * (1 - Math.exp(-dt * rate));
      const lensActive = presence > 0.02;
      const lk = 1 - Math.exp(-dt * 7);
      lens.x += (ptr.x - lens.x) * lk;
      lens.y += (ptr.y - lens.y) * lk;

      // ── shockwave fronts ──
      const Rad = LENS_R * R;
      const Rad2 = Rad * Rad;
      const band = WAVE_BAND * R;
      const waveData: { x: number; y: number; front: number; alpha: number }[] = [];
      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i];
        const age = t - wv.t0;
        const front = age * WAVE_SPEED * R;
        const alpha = Math.exp(-age * 1.5);
        if (alpha < 0.02 || front > diag * 1.2) {
          waves.splice(i, 1);
          continue;
        }
        waveData.push({ x: wv.x, y: wv.y, front, alpha });
      }

      const roll = ROLL + WOBBLE * Math.sin(t * 0.31); // ±2° disc wobble
      const cosRoll = Math.cos(roll);
      const sinRoll = Math.sin(roll);
      const sizeScale = R / 560;
      const flDecay = Math.exp(-dt * 1.6);

      ctx.globalCompositeOperation = 'lighter';
      drawHaze(t, cx, cy, R, roll);

      // ── disc + bulge stars (per-frame physics + draw) ──
      for (let i = 0; i < STAR_COUNT; i++) {
        const a = th[i] + w[i] * t + t * 0.004; // differential + slow precession
        const rr = r[i] * (1 - squeeze * Math.min(1, r[i] * 3.2)); // supernova squeeze
        const px0 = Math.cos(a) * rr;
        const py0 = (Math.sin(a) * rr + zoff[i]) * SQUASH;
        let sx = cx + (px0 * cosRoll - py0 * sinRoll) * R;
        let sy = cy + (px0 * sinRoll + py0 * cosRoll) * R;

        let lensBoost = 0;
        let waveBoost = 0;
        if (dt > 0) {
          let fx = 0;
          let fy = 0;
          // gravitational lens: attract + swirl within radius, brightness boost
          if (lensActive) {
            const dxl = lens.x - sx;
            const dyl = lens.y - sy;
            const d2 = dxl * dxl + dyl * dyl;
            if (d2 < Rad2) {
              const fall = 1 - d2 / Rad2;
              const g = fall * fall * presence;
              const inv = 1 / (Math.sqrt(d2) + 1);
              fx += (dxl * inv * LENS_PULL - dyl * inv * LENS_SWIRL) * g;
              fy += (dyl * inv * LENS_PULL + dxl * inv * LENS_SWIRL) * g;
              lensBoost = g;
            }
          }
          // shockwaves: outward kick while a front passes over the star
          for (let k = 0; k < waveData.length; k++) {
            const wv = waveData[k];
            const dxs = sx - wv.x;
            const dys = sy - wv.y;
            const d = Math.sqrt(dxs * dxs + dys * dys) + 0.001;
            const q = d - wv.front;
            if (q < band && q > -band) {
              const edge = 1 - Math.abs(q) / band;
              const f = edge * edge * wv.alpha;
              fx += (dxs / d) * f * WAVE_KICK;
              fy += (dys / d) * f * WAVE_KICK;
              waveBoost += f;
            }
          }
          // underdamped spring back to rest — the lag/memory
          fx += -SPRING_K * ox[i] - SPRING_C * vx[i];
          fy += -SPRING_K * oy[i] - SPRING_C * vy[i];
          vx[i] += fx * dt;
          vy[i] += fy * dt;
          ox[i] += vx[i] * dt;
          oy[i] += vy[i] * dt;
          fl[i] *= flDecay;

          sx += ox[i];
          sy += oy[i];
        }

        const tw = 0.55 + 0.45 * Math.sin(t * twS[i] + twP[i]);
        const s = sz[i] * sizeScale * (1 + fl[i] * 0.3 + lensBoost * 0.4);
        ctx.globalAlpha = Math.min(
          1,
          baseA[i] * tw * (1 + LENS_BRIGHT * lensBoost + 1.4 * waveBoost + fl[i])
        );
        ctx.fillStyle = `rgb(${COLORS[col[i]]})`;
        if (s < 1.1) {
          ctx.fillRect(sx - s, sy - s, s * 2, s * 2);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, s, 0, TAU);
          ctx.fill();
        }
      }

      // ── near-field sky stars — the lens reaches them too ──
      for (let i = 0; i < NF_COUNT; i++) {
        const drift = t * 0.006;
        let sx = cx + (nfx[i] * Math.cos(drift) - nfy[i] * Math.sin(drift)) * R;
        let sy = cy + (nfx[i] * Math.sin(drift) + nfy[i] * Math.cos(drift)) * R;
        let boost = 0;
        if (dt > 0 && lensActive) {
          const dxl = lens.x - sx;
          const dyl = lens.y - sy;
          const d2 = dxl * dxl + dyl * dyl;
          if (d2 < Rad2) {
            const g = (1 - d2 / Rad2) * (1 - d2 / Rad2) * presence;
            boost = g;
            const inv = 1 / (Math.sqrt(d2) + 1);
            nvx[i] += (dxl * inv * LENS_PULL * 0.5 - dyl * inv * LENS_SWIRL * 0.5) * g * dt;
            nvy[i] += (dyl * inv * LENS_PULL * 0.5 + dxl * inv * LENS_SWIRL * 0.5) * g * dt;
          }
          nvx[i] += (-SPRING_K * nox[i] - SPRING_C * nvx[i]) * dt;
          nvy[i] += (-SPRING_K * noy[i] - SPRING_C * nvy[i]) * dt;
          nox[i] += nvx[i] * dt;
          noy[i] += nvy[i] * dt;
          sx += nox[i];
          sy += noy[i];
        }
        const tw = 0.6 + 0.4 * Math.sin(t * 0.9 + nft[i]);
        ctx.globalAlpha = Math.min(1, nfa[i] * tw * (1 + LENS_BRIGHT * boost));
        ctx.fillStyle = 'rgb(255,244,224)';
        const s = nfs[i] * sizeScale;
        if (s < 1.1) ctx.fillRect(sx - s, sy - s, s * 2, s * 2);
        else {
          ctx.beginPath();
          ctx.arc(sx, sy, s, 0, TAU);
          ctx.fill();
        }
      }

      // ── shockwave rings (the visible ripple) ──
      for (let k = 0; k < waveData.length; k++) {
        const wv = waveData[k];
        ctx.globalAlpha = 0.16 * wv.alpha;
        ctx.strokeStyle = 'rgb(255,226,170)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.front, 0, TAU);
        ctx.stroke();
      }

      // ── shooting stars (ambient + click-spawned) ──
      for (let i = streaks.length - 1; i >= 0; i--) {
        const st = streaks[i];
        st.age += dt;
        if (st.age >= st.life) {
          streaks.splice(i, 1);
          continue;
        }
        st.x += st.vx * dt;
        st.y += st.vy * dt;
        const env = Math.sin(Math.PI * (st.age / st.life));
        const tailX = st.x - st.vx * 0.1;
        const tailY = st.y - st.vy * 0.1;
        const grad = ctx.createLinearGradient(st.x, st.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,248,230,${0.95 * env})`);
        grad.addColorStop(0.4, `rgba(255,222,150,${0.45 * env})`);
        grad.addColorStop(1, 'rgba(255,222,150,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.globalAlpha = env;
        ctx.fillStyle = 'rgb(255,252,240)';
        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.6, 0, TAU);
        ctx.fill();
      }

      // ── supernova particle burst ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        if (p.age >= p.life) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 1 - dt * 0.9;
        p.vy *= 1 - dt * 0.9;
        const env = 1 - p.age / p.life;
        ctx.globalAlpha = env * 0.9;
        ctx.fillStyle = `rgb(${COLORS[p.ci]})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s * env + 0.4, 0, TAU);
        ctx.fill();
      }

      // ── SHARP core (last, on top) ──
      drawCore(t, cx, cy, R, roll, novaEnv);

      // faint lens halo — the cursor's gravity made visible
      if (presence > 0.05) {
        const halo = ctx.createRadialGradient(lens.x, lens.y, 0, lens.x, lens.y, Rad);
        halo.addColorStop(0, `rgba(255,226,164,${0.07 * presence})`);
        halo.addColorStop(1, 'rgba(255,226,164,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = halo;
        ctx.fillRect(lens.x - Rad, lens.y - Rad, Rad * 2, Rad * 2);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    // ── loop lifecycle: run only while visible ──
    let raf = 0;
    let running = false;
    let tPrev = 0;
    const t0 = performance.now();

    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      const dt = Math.min(0.05, Math.max(0.001, t - tPrev));
      tPrev = t;
      draw(t, dt);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const should = visible && !document.hidden && !reduced;
      if (should && !running) {
        running = true;
        tPrev = (performance.now() - t0) / 1000;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);
    document.addEventListener('visibilitychange', sync);

    if (reduced) draw(7.3, 0); // one authored static frame — arms fully spread
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      if (!reduced) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        document.documentElement.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('blur', onLeave);
      }
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />;
}
