'use client';

/**
 * /3d-lab — the 3D concepts lab.
 *
 * Senior-subject sims where depth IS the third dimension: crystal
 * lattices, Kepler orbits, 3D geometry. Built on the shared Sim3DStage
 * pattern (WebGL canvas + Atlas dark/gold). Grows as the 3D wave
 * continues; each entry lists the chapter it serves.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Atom, Orbit, Move3d, ArrowLeft, ChevronRight, Layers, Wrench,
} from 'lucide-react';
import { SIM_LOADERS } from './simLoaders';
import agentSims from './agentSims.json';

const C12CrystalLattices = dynamic(
  () => import('@/components/simulations/three/C12_ChemistrySolidStateCrystalLatticesSim'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a12]">
        <div className="text-center">
          <Atom className="mx-auto mb-3 h-8 w-8 animate-pulse text-gold-400" />
          <p className="text-xs uppercase tracking-[0.2em] text-surface-500">Loading 3D lattice…</p>
        </div>
      </div>
    ),
  },
);

const KeplerOrbits = dynamic(
  () => import('@/components/simulations/three/C11_PhysicsGravitationKeplerSim'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a12]">
        <div className="text-center">
          <Orbit className="mx-auto mb-3 h-8 w-8 animate-pulse text-gold-400" />
          <p className="text-xs uppercase tracking-[0.2em] text-surface-500">Loading orbits…</p>
        </div>
      </div>
    ),
  },
);

const Geometry3D = dynamic(
  () => import('@/components/simulations/three/C11_Maths3DGeometryLinesSim'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[440px] items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a12]">
        <div className="text-center">
          <Move3d className="mx-auto mb-3 h-8 w-8 animate-pulse text-gold-400" />
          <p className="text-xs uppercase tracking-[0.2em] text-surface-500">Loading 3D space…</p>
        </div>
      </div>
    ),
  },
);

type SimEntry = {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  why3d: string;
  icon: React.ReactNode;
  Component?: React.ComponentType;
  Loader?: React.ComponentType;
};

const SIMS: SimEntry[] = [
  {
    id: 'crystal',
    title: 'Crystal Lattices & Unit Cells',
    subject: 'Chemistry · Class 12',
    chapter: 'Solid State',
    why3d:
      'Unit cells are spatial objects. Orbit an FCC lattice and watch the face diagonal become the close-packed direction — 4r = √2a stops being a formula.',
    icon: <Atom className="h-4 w-4" />,
    Component: C12CrystalLattices,
  },
  {
    id: 'kepler',
    title: 'Kepler’s Laws & Orbits',
    subject: 'Physics · Class 11',
    chapter: 'Gravitation',
    why3d:
      'Tilt the orbital plane and the equal-areas law stays true from every angle. Perigee whip and apogee drift are visible, not memorised.',
    icon: <Orbit className="h-4 w-4" />,
    Component: KeplerOrbits,
  },
  {
    id: 'geo3d',
    title: 'Introduction to 3D Geometry',
    subject: 'Maths · Class 11',
    chapter: '3D Geometry',
    why3d:
      'The chapter is space itself: octants, section formula, direction cosines — with two draggable points and a live l²+m²+n² = 1 proof.',
    icon: <Move3d className="h-4 w-4" />,
    Component: Geometry3D,
  },
  ...agentSims.map((e) => ({
    id: e.id,
    title: e.title,
    subject: e.subject,
    chapter: e.chapter,
    why3d: e.why3d,
    icon: <Atom className="h-4 w-4" />,
    Loader: SIM_LOADERS[e.id] as React.ComponentType | undefined,
  })),
];

export default function ThreeDLabPage() {
  const [active, setActive] = useState(SIMS[0].id);
  const sim = SIMS.find((s) => s.id === active) || SIMS[0];
  const Active = ('Component' in sim && sim.Component) ||
    (('Loader' in sim && sim.Loader) as React.ComponentType | undefined) ||
    Geometry3D;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/atlas" className="flex items-center gap-1.5 text-sm text-surface-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Atlas
            </Link>
            <span className="text-surface-700">/</span>
            <span className="flex items-center gap-2 font-display text-lg font-bold">
              <Layers className="h-5 w-5 text-gold-400" /> 3D Lab
            </span>
          </div>
          <div className="hidden items-center gap-2 text-xs text-surface-500 sm:flex">
            <Wrench className="h-3.5 w-3.5 text-gold-400" />
            WebGL · drag to orbit · scroll to zoom
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        {/* concept picker */}
        <div className="grid gap-3 md:grid-cols-3">
          {SIMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                s.id === active
                  ? 'border-gold-400/50 bg-gold-400/[0.07] shadow-lg shadow-gold-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25'
              }`}
            >
              <div className={`flex items-center gap-2 font-display text-sm font-bold ${s.id === active ? 'text-gold-300' : 'text-white'}`}>
                {s.icon} {s.title}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-surface-500">{s.subject}</div>
              <div className="mt-2 line-clamp-2 text-xs text-surface-400">{s.why3d}</div>
            </button>
          ))}
        </div>

        {/* active sim */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="font-display text-2xl font-bold">{sim.title}</h1>
            <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-gold-300">
              {sim.chapter}
            </span>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-surface-400">{sim.why3d}</p>
          <Active />
        </section>

        {/* footer note */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-surface-500">
          <span>
            Every 3D sim computes its numbers live from the same formulas the
            textbook uses — nothing here is a canned animation.
          </span>
          <Link href="/simulations" className="flex items-center gap-1 font-display font-semibold text-gold-300 hover:text-gold-200">
            All simulations <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
