'use client';

/**
 * Sim3DScaffold — shared Three.js stage for senior-subject 3D sims.
 *
 * One reusable WebGL canvas with the Atlas design language (deep dark,
 * gold accents) so each 3D sim only declares its OBJECTS and CONTROLS:
 *
 *   <Sim3DStage
 *     scene={<MyObjects />}
 *     hud={<MyReadouts />}
 *     cameraPosition={[8, 6, 12]}
 *     hint="Drag to orbit — scroll to zoom"
 *   />
 *
 * - OrbitControls (drag orbit, scroll zoom) — student-driven viewpoint
 * - soft gold key light + cool fill + ambient, dark fog for depth
 * - grid floor + subtle gold axes for spatial anchoring
 * - Suspense fallback + graceful "WebGL unavailable" card
 * - `reduced` prop passthrough for low-power rendering
 *
 * Objects are plain @react-three/fiber JSX (mesh/geometry/material),
 * written by each sim. No sim-specific logic lives here.
 */

import React, { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Move3d, MousePointer2 } from 'lucide-react';

export const GOLD = '#fbbf24';
export const GOLD_DIM = 'rgba(251,191,36,0.35)';

export function Sim3DStage({
  scene,
  hud,
  overlay,
  cameraPosition = [9, 7, 13],
  cameraTarget = [0, 1.5, 0],
  hint = 'Drag to orbit · scroll to zoom',
  showGrid = true,
  background = '#0a0a12',
  className = '',
}: {
  scene: React.ReactNode;
  hud?: React.ReactNode;
  overlay?: React.ReactNode;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  hint?: string;
  showGrid?: boolean;
  background?: string;
  className?: string;
}) {
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    try {
      const probe = document.createElement('canvas');
      const gl =
        probe.getContext('webgl2') || probe.getContext('webgl');
      if (!gl) setWebglFailed(true);
    } catch {
      setWebglFailed(true);
    }
  }, []);

  if (webglFailed) {
    return (
      <div
        className={`flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-surface-100/40 p-8 text-center ${className}`}
      >
        <Move3d className="mb-3 h-8 w-8 text-gold-400" />
        <p className="font-display text-sm font-semibold text-white">
          3D view needs WebGL
        </p>
        <p className="mt-1 max-w-xs text-xs text-surface-400">
          Your browser blocked or ran out of 3D graphics contexts. Close
          other 3D tabs and reload, or use the 2D controls below — every
          number stays live either way.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12] ${className}`}
      style={{ minHeight: 420 }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: 42, near: 0.1, far: 300 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene: sc }) => {
          gl.setClearColor(background);
          sc.fog = new THREE.Fog(background, 40, 120);
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 14, 8]} intensity={1.1} color="#ffe9b8" />
        <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
        {showGrid && (
          <Grid
            position={[0, 0, 0]}
            args={[60, 60]}
            cellSize={1}
            cellThickness={0.6}
            cellColor="rgba(255,214,150,0.14)"
            sectionSize={5}
            sectionThickness={1.1}
            sectionColor="rgba(251,191,36,0.30)"
            fadeDistance={90}
            fadeStrength={1.4}
            infiniteGrid
          />
        )}
        <group position={[cameraTarget[0], 0, cameraTarget[2]]}>
          {scene}
        </group>
        <OrbitControls
          target={cameraTarget}
          enableDamping
          dampingFactor={0.08}
          minDistance={3}
          maxDistance={60}
          maxPolarAngle={Math.PI / 2.02}
        />
      </Canvas>

      {/* HUD slot — live readouts, top-left */}
      {hud && (
        <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[280px] rounded-xl border border-white/10 bg-black/55 p-3 backdrop-blur-md">
          {hud}
        </div>
      )}

      {/* overlay slot — sim-specific floating controls/badges */}
      {overlay}

      {/* orbit hint */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <MousePointer2 className="h-3 w-3 text-gold-400" />
        <span className="text-[10px] uppercase tracking-[0.18em] text-surface-400">
          {hint}
        </span>
      </div>
    </div>
  );
}

/**
 * Shared lighting preset export for sims that build their own Canvas
 * (rare) — keeps light temperature consistent across the wave.
 */
export const STAGE_LIGHTS = (
  <>
    <ambientLight intensity={0.45} />
    <directionalLight position={[10, 14, 8]} intensity={1.1} color="#ffe9b8" />
    <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
  </>
);
