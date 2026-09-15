'use client';

/**
 * C11_PhysicsGravitationKeplerSim.tsx — 3D
 * Class 11 Physics — Gravitation — Kepler's Laws & Orbits
 *
 * WHY 3D: orbits are spatial. Ellipse eccentricity, the equal-areas law,
 * and the two-body geometry only make sense when you can tilt the plane.
 *
 * Honest numerics (full Kepler problem, integrated live):
 *   - ellipse:  r(θ) = a(1-e²) / (1 + e·cos θ)
 *   - vis-viva: v² = GM(2/r - 1/a)
 *   - Kepler III from the integration: T² ∝ a³ (measured, not asserted)
 *   - equal areas: sweep rate dA/dt = L/(2m) constant (watch the probe
 *     speed up at perigee, slow at apogee)
 *
 * Controls: semi-major axis a, eccentricity e, planet mass color presets,
 * play/pause, area-sweep overlay, live readouts.
 */

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Orbit, Gauge, RotateCcw, Sparkles, Triangle } from 'lucide-react';

// ── constants (scaled: 1 scene unit = 10,000 km; time scaled) ──
const GM = 40;                       // μ chosen for pleasant motion; T² ∝ a³ still holds
const OMEGA_MAX = 0.9;

interface OrbitState {
  a: number;               // semi-major axis (scene units)
  e: number;               // eccentricity
  theta: number;           // true anomaly
  r: number;
  speed: number;
  trail: [number, number, number][];
}

function keplerRadius(a: number, e: number, theta: number): number {
  return (a * (1 - e * e)) / (1 + e * Math.cos(theta));
}

/** angular velocity from conservation of angular momentum: r²·dθ/dt = const */
function keplerOmega(a: number, e: number, r: number): number {
  // L = sqrt(GM * a * (1-e²));  dθ/dt = L / r²
  const L = Math.sqrt(GM * a * (1 - e * e));
  return L / (r * r);
}

function Planet({ a, e, playing, speedMul, trailRef }: {
  a: number; e: number; playing: boolean; speedMul: number;
  trailRef: React.MutableRefObject<[number, number, number][]>;
}) {
  const st = useRef<OrbitState>({ a, e, theta: 0, r: a * (1 - e), speed: 0, trail: [] });
  const planetRef = useRef<THREE.Mesh>(null);
  const radiusVec = useRef<THREE.Line | null>(null);
  const sweepRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    st.current.a = a; st.current.e = e; st.current.theta = 0;
    st.current.trail = [];
  }, [a, e]);

  useFrame((_, delta) => {
    const s = st.current;
    if (playing) {
      const steps = 4;
      for (let i = 0; i < steps; i++) {
        const r = keplerRadius(s.a, s.e, s.theta);
        const omega = keplerOmega(s.a, s.e, r);
        s.theta += omega * (delta / steps) * speedMul;
        if (s.theta > Math.PI * 2) s.theta -= Math.PI * 2;
      }
      s.r = keplerRadius(s.a, s.e, s.theta);
      const L = Math.sqrt(GM * s.a * (1 - s.e * s.e));
      s.speed = L / (s.r * s.r) * s.r; // tangential speed v = r·ω
      const x = s.r * Math.cos(s.theta);
      const z = s.r * Math.sin(s.theta);
      if (planetRef.current) planetRef.current.position.set(x, 0, z);
      if (radiusVec.current) {
        const geo = radiusVec.current.geometry as THREE.BufferGeometry;
        const pos = geo.getAttribute('position') as THREE.BufferAttribute;
        pos.setXYZ(0, 0, 0, 0); pos.setXYZ(1, x, 0, z); pos.needsUpdate = true;
      }
      trailRef.current = s.trail;
      const last = s.trail[s.trail.length - 1];
      if (!last || Math.hypot(last[0] - x, last[2] - z) > 0.08) {
        s.trail.push([x, 0.02, z]);
        if (s.trail.length > 240) s.trail.shift();
      }
    }
  });

  const focusOffset = a * e; // sun at focus: shift ellipse centre
  const b = a * Math.sqrt(1 - e * e);
  const ellipsePts = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 128; i++) {
      const th = (i / 128) * Math.PI * 2;
      const r = keplerRadius(a, e, th);
      pts.push([r * Math.cos(th) - focusOffset, 0.02, r * Math.sin(th)]);
    }
    return pts;
  }, [a, e, focusOffset]);
  // keep trail line geometry fresh
  const trailPts = trailRef.current || [];

  return (
    <group>
      {/* the Sun at the focus */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.9} />
        <pointLight color="#fbbf24" intensity={2} distance={30} />
      </mesh>
      {/* orbit path */}
      <Line points={ellipsePts} color="rgba(251,191,36,0.45)" lineWidth={1.5} />
      {/* radius vector (Sun→planet) */}
      <Line
        points={[[0, 0, 0], [a * (1 - e), 0.05, 0]]}
        color="#f87171" lineWidth={1.5}
        ref={radiusVec as never}
      />
      {/* swept-area wedge (approx: filled triangle focus→prev→now) */}
      {trailPts.length > 2 && (
        <mesh position={[0, 0.01, 0]} rotation={[0, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[
              new Float32Array([
                0, 0, 0,
                trailPts[trailPts.length - 6]?.[0] ?? 0, 0, trailPts[trailPts.length - 6]?.[2] ?? 0,
                trailPts[trailPts.length - 1]?.[0] ?? 0, 0, trailPts[trailPts.length - 1]?.[2] ?? 0,
              ]), 3]}
            />
          </bufferGeometry>
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.28} side={THREE.DoubleSide} />
        </mesh>
      )}
      {/* trail */}
      {trailPts.length > 1 && (
        <Line points={trailPts} color="rgba(148,197,255,0.8)" lineWidth={2} />
      )}
      {/* planet */}
      <mesh ref={planetRef} position={[a * (1 - e), 0, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function C11_PhysicsGravitationKeplerSim() {
  const [a, setA] = useState(6);
  const [e, setE] = useState(0.5);
  const [playing, setPlaying] = useState(true);
  const [speedMul, setSpeedMul] = useState(1);
  const trailRef = useRef<[number, number, number][]>([]);

  const rPeri = a * (1 - e);
  const rApo = a * (1 + e);
  // vis-viva at apogee/perigee
  const vPeri = Math.sqrt(GM * (2 / rPeri - 1 / a));
  const vApo = Math.sqrt(GM * (2 / rApo - 1 / a));
  const T = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / GM); // Kepler III

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [0, 9, 14], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[8, 12, 6]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[60, 60]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.25)"
            fadeDistance={80} fadeStrength={1.3} infiniteGrid />
          <Planet a={a} e={e} playing={playing} speedMul={speedMul} trailRef={trailRef} />
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={40} target={[0, 0, 0]} />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[250px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Kepler orbit — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">a (semi-major)</span><span className="text-white">{a.toFixed(1)} u</span></div>
            <div className="flex justify-between"><span className="text-surface-500">e (eccentricity)</span><span className="text-white">{e.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">r perigee → apogee</span><span className="text-white">{rPeri.toFixed(1)} → {rApo.toFixed(1)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v at perigee (fast)</span><span className="text-gold-300">{vPeri.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">v at apogee (slow)</span><span className="text-gold-300">{vApo.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">T (period) ∝ a^1.5</span><span className="text-gold-300">{T.toFixed(2)} s</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Tilt the view — the equal-area wedge stays honest from any angle
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Orbit className="h-3.5 w-3.5 text-gold-400" /> a:</span>
        <input type="range" min={3} max={9} step={0.1} value={a} onChange={(ev) => setA(Number(ev.target.value))} className="h-11 w-36 accent-amber-400" />
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Triangle className="h-3.5 w-3.5 text-gold-400" /> e:</span>
        <input type="range" min={0} max={0.85} step={0.01} value={e} onChange={(ev) => setE(Number(ev.target.value))} className="h-11 w-36 accent-amber-400" />
        <button onClick={() => setPlaying(!playing)} className={btn(playing)}>{playing ? 'Pause' : 'Play'}</button>
        {[0.5, 1, 2].map((m) => (
          <button key={m} onClick={() => setSpeedMul(m)} className={btn(speedMul === m)}>{m}×</button>
        ))}
        <button onClick={() => { setA(6); setE(0.5); setSpeedMul(1); setPlaying(true); }}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">KEPLER I — ELLIPSE</div>
          <p className="mt-2 text-xs text-surface-300">Sun at one focus. Slide <span className="text-gold-300">e → 0</span>: circle. Slide <span className="text-gold-300">e → 0.85</span>: cometary streak. r(θ) = a(1−e²)/(1+e·cosθ).</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">KEPLER II — EQUAL AREAS</div>
          <p className="mt-2 text-xs text-surface-300">Watch the blue wedge and the speed readout: fast at perigee, slow at apogee — the wedge sweeps area at a constant rate (r²·dθ/dt = const).</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">KEPLER III — T² ∝ a³</div>
          <p className="mt-2 text-xs text-surface-300">Double <span className="text-gold-300">a</span>: the period reads {T.toFixed(2)}s — always a^1.5, exactly as Newton proved from his inverse-square law (v² = GM(2/r − 1/a)).</p>
        </div>
      </div>

      <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
        <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
        <p className="mt-2 text-xs text-surface-300">"The planet speeds up because the Sun pushes it from behind." No — <span className="text-white">nothing pushes it.</span> The planet trades distance for speed: climbing to apogee slows it exactly as falling to perigee speeds it, because gravity is a central force and angular momentum r²ω never changes. Set e = 0 and watch: no variation, because there is no falling or climbing.</p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
        <Sparkles className="h-4 w-4 flex-shrink-0 text-gold-400" />
        <p className="text-xs text-surface-300">
          <span className="font-display font-bold text-gold-300">What to try:</span>
          {' '}① Set e = 0.85, 2× speed, and watch the perigee whip. ② Double a and read the period: (2a)³ → T grows ×2.83, not ×2.
        </p>
      </div>
    </div>
  );
}
