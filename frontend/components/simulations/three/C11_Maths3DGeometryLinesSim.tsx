'use client';

/**
 * C11_Maths3DGeometryLinesSim.tsx — 3D
 * Class 11 Maths — Introduction to Three Dimensional Geometry
 *
 * WHY 3D: this chapter IS 3D space. Distance formula, section formula,
 * direction cosines — every exercise is a set of points floating in space.
 * Being able to orbit the axes and see the octants is the chapter.
 *
 * Honest numerics:
 *   distance  P₁P₂ = √(Δx² + Δy² + Δz²)
 *   section   R = ((m·x₂ + n·x₁)/(m+n), ...) for internal division m:n
 *   direction cosines  l² + m² + n² = 1  (shown live on the unit ray)
 *
 * Controls: drag two points P₁ P₂ along their axes, ratio m:n slider,
 * ray vs segment toggle, live readouts, octant label of each point.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Move3d, Ruler, Scissors, RotateCcw, Compass } from 'lucide-react';

const GOLD = '#fbbf24';
const BLUE = '#60a5fa';
const ROSE = '#fb7185';

function DraggablePoint({
  pos, color, label,
}: {
  pos: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.18, 28, 28]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} />
      </mesh>
      <Text position={[0, 0.45, 0]} fontSize={0.32} color={color} anchorX="center">
        {label}
      </Text>
    </group>
  );
}

function AxesWithLabels() {
  const axis = (pts: [number, number, number][], color: string) => (
    <Line points={pts} color={color} lineWidth={1.6} />
  );
  return (
    <group>
      {axis([[-8, 0, 0], [8, 0, 0]], 'rgba(255,255,255,0.5)')}
      {axis([[0, -0.01, 0], [0, 7, 0]], 'rgba(255,255,255,0.5)')}
      {axis([[0, 0, -8], [0, 0, 8]], 'rgba(255,255,255,0.5)')}
      <Text position={[8.4, 0, 0]} fontSize={0.4} color="#94a3b8">x</Text>
      <Text position={[0, 7.4, 0]} fontSize={0.4} color="#94a3b8">y</Text>
      <Text position={[0, 0, 8.4]} fontSize={0.4} color="#94a3b8">z</Text>
      {/* origin marker */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>
      <Text position={[0.3, -0.4, 0]} fontSize={0.3} color="#64748b">O</Text>
    </group>
  );
}

export default function C11_Maths3DGeometryLinesSim() {
  // P1, P2 coordinates (integers & halves so section maths stays exact)
  const [p1, setP1] = useState<[number, number, number]>([-3, 1, 2]);
  const [p2, setP2] = useState<[number, number, number]>([4, 5, -2]);
  const [m, setM] = useState(2);
  const [n, setN] = useState(3);
  const [showRay, setShowRay] = useState(false);

  const d = useMemo(() => {
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1], dz = p2[2] - p1[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }, [p1, p2]);

  const R = useMemo<[number, number, number]>(() => {
    const s = m + n;
    return [
      (m * p2[0] + n * p1[0]) / s,
      (m * p2[1] + n * p1[1]) / s,
      (m * p2[2] + n * p1[2]) / s,
    ];
  }, [p1, p2, m, n]);

  // direction vector and its direction cosines (unit ray from P1 toward P2)
  const dir = useMemo(() => {
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1], dz = p2[2] - p1[2];
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
    return { v: [dx, dy, dz], l: dx / len, mcos: dy / len, n: dz / len, len };
  }, [p1, p2]);

  const octant = (p: [number, number, number]) => {
    const [x, y, z] = p.map((v) => (v >= 0 ? '+' : '−'));
    if (x === '+' && y === '+' && z === '+') return 'I';
    if (x === '−' && y === '+' && z === '+') return 'II';
    if (x === '−' && y === '−' && z === '+') return 'III';
    if (x === '+' && y === '−' && z === '+') return 'IV';
    if (x === '+' && y === '+' && z === '−') return 'V';
    if (x === '−' && y === '+' && z === '−') return 'VI';
    if (x === '−' && y === '−' && z === '−') return 'VII';
    return 'VIII';
  };

  const reset = () => { setP1([-3, 1, 2]); setP2([4, 5, -2]); setM(2); setN(3); setShowRay(false); };

  const axisSlider = (
    label: string, value: number, set: (v: number) => void, color: string,
  ) => (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs font-display font-bold" style={{ color }}>{label}</span>
      <input type="range" min={-6} max={6} step={0.5} value={value}
        onChange={(e) => set(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
      <span className="w-10 text-xs text-white">{value % 1 === 0 ? value : value.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="relative h-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [9, 7, 12], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[30, 30]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.25)"
            fadeDistance={60} fadeStrength={1.2} />
          <AxesWithLabels />
          {/* segment P1→P2 */}
          <Line points={[p1, p2]} color="rgba(251,191,36,0.9)" lineWidth={2.5} />
          {/* direction ray from P1 (shows direction cosines) */}
          {showRay && (
            <Line
              points={[p1, [p1[0] + dir.v[0] * (6 / dir.len), p1[1] + dir.v[1] * (6 / dir.len), p1[2] + dir.v[2] * (6 / dir.len)]]}
              color="rgba(96,165,250,0.7)" lineWidth={1.5} dashed dashSize={0.25} gapSize={0.15}
            />
          )}
          {/* section point */}
          <group position={R}>
            <mesh>
              <sphereGeometry args={[0.16, 24, 24]} />
              <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.5} />
            </mesh>
            <Text position={[0, 0.42, 0]} fontSize={0.3} color="#34d399">
              R ({m}:{n})
            </Text>
          </group>
          <DraggablePoint pos={p1} color={ROSE} label={`P₁ (${p1[0]}, ${p1[1]}, ${p1[2]})`} />
          <DraggablePoint pos={p2} color={BLUE} label={`P₂ (${p2[0]}, ${p2[1]}, ${p2[2]})`} />
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={35} target={[0, 2, 0]} />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[250px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Live measurements</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between">
              <span className="text-surface-500">P₁P₂ distance</span>
              <span className="text-gold-300">√{(d * d).toFixed(1)} = {d.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">P₁ in octant</span><span className="text-white">{octant(p1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">P₂ in octant</span><span className="text-white">{octant(p2)}</span>
            </div>
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">direction cosines of P₁→P₂</div>
            <div className="flex justify-between"><span className="text-surface-500">l = cos α</span><span className="text-white">{dir.l.toFixed(3)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">m = cos β</span><span className="text-white">{dir.mcos.toFixed(3)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">n = cos γ</span><span className="text-white">{dir.n.toFixed(3)}</span></div>
            <div className="flex justify-between">
              <span className="text-surface-500">l²+m²+n²</span>
              <span className="text-emerald-300">{(dir.l ** 2 + dir.mcos ** 2 + dir.n ** 2).toFixed(2)} = 1 ✓</span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Orbit the axes · P₁ P₂ slide on their coordinates
        </div>
      </div>

      {/* controls */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: ROSE }}>POINT P₁</div>
          <div className="mt-2 space-y-1">
            {axisSlider('x', p1[0], (v) => setP1([v, p1[1], p1[2]]), ROSE)}
            {axisSlider('y', p1[1], (v) => setP1([p1[0], v, p1[2]]), ROSE)}
            {axisSlider('z', p1[2], (v) => setP1([p1[0], p1[1], v]), ROSE)}
          </div>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: BLUE }}>POINT P₂</div>
          <div className="mt-2 space-y-1">
            {axisSlider('x', p2[0], (v) => setP2([v, p2[1], p2[2]]), BLUE)}
            {axisSlider('y', p2[1], (v) => setP2([p2[0], v, p2[2]]), BLUE)}
            {axisSlider('z', p2[2], (v) => setP2([p2[0], p2[1], v]), BLUE)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Scissors className="h-3.5 w-3.5 text-gold-400" /> Section m : n</span>
        <input type="range" min={1} max={5} value={m} onChange={(e) => setM(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">m = {m}</span>
        <input type="range" min={1} max={5} value={n} onChange={(e) => setN(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">n = {n}</span>
        <span className="text-xs text-emerald-300">R = (({m}·{p2[0]}+{n}·{p1[0]})/{m + n}, …) = ({R.map((v) => v.toFixed(2)).join(', ')})</span>
        <button onClick={() => setShowRay(!showRay)}
          className={`ml-auto px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${showRay ? 'bg-gold-400/15 border-gold-400/60 text-gold-300' : 'bg-white/5 border-white/10 text-surface-300'}`}>
          <Compass className="mr-1 inline h-3.5 w-3.5" /> direction ray
        </button>
        <button onClick={reset} className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs text-surface-300">
            "Distance in 3D needs a special new formula." No — <span className="text-white">it's Pythagoras twice.</span>
            First in the floor plane (√(Δx²+Δz²)), then up the y pillar: √(Δx²+Δz²+Δy²). Slide P₁ and P₂ to share two coordinates and watch the 3D distance collapse to the 2D one.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs text-surface-300">
            ① Put P₁ at (−3,1,2) and P₂ at (4,5,−2): the octant labels flip between I/VII — orbit and see each octant.
            ② Set m = n: R is the midpoint. Then drag P₂ through the origin and watch the direction cosines keep l²+m²+n² = 1.
          </p>
        </div>
      </div>
    </div>
  );
}
