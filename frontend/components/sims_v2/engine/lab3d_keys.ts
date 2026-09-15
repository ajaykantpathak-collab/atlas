/**
 * lab3d_keys.ts — light companion to lab3d.tsx. Holds the set of scene
 * names that have a 3D implementation, plus the WebGL-fallback plumbing —
 * everything canvasLab needs WITHOUT statically importing the three.js
 * module graph (lab3d.tsx is loaded via next/dynamic only when a 3D
 * scene actually mounts).
 *
 * IMPORTANT: keep HAS_3D in sync with the LABS3D registry in lab3d.tsx.
 */
import React from 'react';

/** scene names backed by a real R3F scene in lab3d.tsx */
export const HAS_3D = new Set<string>([
    'efield', 'circuit', 'prism', 'wave', 'gas', 'pendulum', 'orbit', 'atom',
    'lens', 'titrate', 'vector', 'emag', 'cell', 'moon', 'dna', 'projectile',
    'heart', 'conic', 'spectrum', 'mitosis', 'equilibrium', 'nephron',
    'reflex', 'digest', 'supply', 'ph', 'balance', 'pour', 'grow',
    'molecule', 'solid', 'unitcircle', 'graph', 'globe', 'electric',
    'weigh', 'fraction', 'cycle', 'jump', 'stretch', 'flow', 'timeline',
]);

/* ── WebGL availability + crash fallback ─────────────────────
   School laptops can lack WebGL (disabled GPU, remote desktop,
   ancient drivers). If the context can't be created — or the
   scene throws at runtime — CanvasLab drops back to the 2D
   painter so the sim never hard-blocks a student. */
let webgl: boolean | null = null;
export function webglSupported(): boolean {
    if (webgl !== null) return webgl;
    try {
        const c = document.createElement('canvas');
        webgl = !!(c.getContext('webgl2') ?? c.getContext('webgl'));
    } catch { webgl = false; }
    return webgl;
}

export class Lab3DBoundary extends React.Component<
    { onFail: () => void; children: React.ReactNode }, { failed: boolean }
> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    componentDidCatch() { this.props.onFail(); }
    render() { return this.state.failed ? null : this.props.children; }
}
