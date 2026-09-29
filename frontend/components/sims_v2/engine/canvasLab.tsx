/**
 * canvasLab.tsx — a real interactive LAB widget for juniors.
 * c6_12 parity: sliders drive a live canvas animation + computed readout.
 * Data-driven: a sim declares a LabSpec (canvas draw fn, sliders, output
 * formula) and this renders it — no per-lab component needed.
 *
 * Lab kinds:
 *   pour    — pour liquid into a container (capacity/volume)
 *   grow    — sun+water sliders grow a plant (cause/effect)
 *   stretch — stretch a measuring tape along a bar (length)
 *   jump    — number-line hops (counting/addition)
 *   balance — weights tip a seesaw (mass comparison)
 */
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { HAS_3D, Lab3DBoundary, webglSupported } from './lab3d_keys';
import { audioManager } from '../../../lib/sim-engine/audio';

// three.js lives in its own chunk — fetched only when a 3D lab mounts,
// so the sim route's module graph (and dev cold-compile) stays small.
const Lab3D = dynamic(() => import('./lab3d').then(m => m.Lab3D), { ssr: false });

export interface LabSlider { id: string; label: string; emoji: string; min: number; max: number; start: number; step?: number; }
export interface LabSpec {
    kind: 'pour' | 'grow' | 'stretch' | 'jump' | 'balance' | 'fraction' | 'cycle' | 'orbit' | 'weigh' | 'electric' | 'scene';
    title: string;
    /** bespoke senior scene key — from SCENES registry. Used when kind='scene'. */
    scene?: string;
    sliders: LabSlider[];
    /** computed readout — e.g. ({sun,water}) => `Growth: ${sun+water}` */
    output?: (vals: Record<string, number>) => string;
    unit?: string;
    /** PhET-style direct manipulation: pointer-down at canvas coords
     *  (x,y) returns the slider id to drag-control, or null. Dragging
     *  horizontally then scrubs that slider — grab the curve, not a rail. */
    draggable?: (x: number, y: number, vals: Record<string, number>) => string | null;
    /** linked representation — the key metric, plotted live as the student
     *  manipulates the scene (PhET's scene + graph + numbers triad). */
    trace?: { label: string; unit?: string; fn: (v: Record<string, number>) => number; max?: number };
    /** tap-to-explore (biology diagrams): hotspots are hit-tested on
     *  pointer-up (<6px move); `sel` becomes the tapped index (-1 = miss)
     *  so beats can validate "identify the nucleus" style challenges. */
    hotspots?: (v: Record<string, number>) => Array<{ id: string; label: string; fn?: string; x: number; y: number; r: number }>;
    /** CC-licensed figure under the hotspot layer (image-backed diagram labs) */
    image?: string;
    /** attribution line shown bottom-right (CC-BY requirement) */
    credit?: string;
}

// ─── the canvas painters ────────────────────────────────────
function paintPour(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const level = (v.fill ?? 0) / 100;
    ctx.clearRect(0, 0, w, h);
    // jug
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 4;
    ctx.strokeRect(w * 0.3, h * 0.15, w * 0.4, h * 0.75);
    // water fill
    const wh = (h * 0.75) * level;
    const grad = ctx.createLinearGradient(0, h * 0.9 - wh, 0, h * 0.9);
    grad.addColorStop(0, '#38bdf8'); grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.fillRect(w * 0.3 + 2, h * 0.9 - wh, w * 0.4 - 4, wh);
    // pour stream when filling
    if (v.fill > 0 && v.fill < 100) {
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.02); ctx.lineTo(w * 0.5, h * 0.9 - wh); ctx.stroke();
    }
}
function paintGrow(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const sun = v.sun ?? 0, water = v.water ?? 0;
    const growth = Math.min(1, (sun + water) / 200);
    ctx.clearRect(0, 0, w, h);
    // ground
    ctx.fillStyle = '#854d0e'; ctx.fillRect(0, h * 0.85, w, h * 0.15);
    // sun
    const sunR = 18 + (sun / 100) * 14;
    ctx.fillStyle = `rgba(253,224,71,${0.4 + sun / 140})`;
    ctx.beginPath(); ctx.arc(w * 0.85, h * 0.15, sunR, 0, Math.PI * 2); ctx.fill();
    // stem grows with growth
    const stemH = growth * h * 0.6;
    ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.85); ctx.lineTo(w * 0.5, h * 0.85 - stemH); ctx.stroke();
    // leaves + flower
    if (growth > 0.3) {
        ctx.fillStyle = '#22c55e';
        ctx.beginPath(); ctx.ellipse(w * 0.5 - 20, h * 0.85 - stemH * 0.5, 18, 9, -0.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(w * 0.5 + 20, h * 0.85 - stemH * 0.7, 18, 9, 0.5, 0, Math.PI * 2); ctx.fill();
    }
    if (growth > 0.7) {
        ctx.fillStyle = '#f472b6';
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            ctx.beginPath(); ctx.arc(w * 0.5 + Math.cos(a) * 12, h * 0.85 - stemH + Math.sin(a) * 12, 9, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(w * 0.5, h * 0.85 - stemH, 9, 0, Math.PI * 2); ctx.fill();
    }
}
function paintStretch(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const len = (v.length ?? 0) / 100;
    ctx.clearRect(0, 0, w, h);
    // object to measure
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(w * 0.1, h * 0.3, w * 0.8, h * 0.25);
    // measuring tape
    const tapeW = w * 0.8 * len;
    ctx.fillStyle = '#fde047'; ctx.fillRect(w * 0.1, h * 0.65, tapeW, h * 0.12);
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 2; ctx.strokeRect(w * 0.1, h * 0.65, tapeW, h * 0.12);
    // tick marks
    for (let i = 0; i <= len * 10; i++) {
        ctx.beginPath(); ctx.moveTo(w * 0.1 + tapeW * (i / 10), h * 0.65); ctx.lineTo(w * 0.1 + tapeW * (i / 10), h * 0.7); ctx.stroke();
    }
}
function paintJump(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const pos = v.pos ?? 0;
    ctx.clearRect(0, 0, w, h);
    // number line
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w * 0.05, h * 0.7); ctx.lineTo(w * 0.95, h * 0.7); ctx.stroke();
    for (let i = 0; i <= 10; i++) {
        const x = w * 0.05 + (w * 0.9) * (i / 10);
        ctx.beginPath(); ctx.moveTo(x, h * 0.7); ctx.lineTo(x, h * 0.76); ctx.stroke();
        ctx.fillStyle = '#334155'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(i), x, h * 0.9);
    }
    // frog at pos
    const fx = w * 0.05 + (w * 0.9) * (Math.min(10, pos) / 10);
    ctx.font = '34px serif'; ctx.textAlign = 'center';
    ctx.fillText('🐸', fx, h * 0.62);
}
function paintBalance(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const left = v.left ?? 0, right = v.right ?? 0;
    const tilt = Math.max(-0.4, Math.min(0.4, (left - right) * 0.04));
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w * 0.5, h * 0.5); ctx.rotate(tilt);
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-w * 0.35, 0); ctx.lineTo(w * 0.35, 0); ctx.stroke();
    ctx.restore();
    // pivot
    ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.moveTo(w * 0.5 - 14, h * 0.9); ctx.lineTo(w * 0.5, h * 0.55); ctx.lineTo(w * 0.5 + 14, h * 0.9); ctx.fill();
    // weights
    ctx.font = '28px serif'; ctx.textAlign = 'center';
    ctx.fillText('🏋️ ' + left, w * 0.15, h * 0.5 - tilt * w * 0.35);
    ctx.fillText('🏋️ ' + right, w * 0.85, h * 0.5 + tilt * w * 0.35);
}
function paintFraction(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const parts = Math.max(2, Math.round(v.parts ?? 4));
    const shaded = Math.min(parts, Math.round(v.shaded ?? 1));
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.36;
    for (let i = 0; i < parts; i++) {
        const a0 = (i / parts) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 1) / parts) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a0, a1); ctx.closePath();
        ctx.fillStyle = i < shaded ? '#f59e0b' : '#e2e8f0';
        ctx.fill();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();
    }
}
function paintCycle(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const heat = (v.heat ?? 0) / 100, time = (v.time ?? 0) / 100;
    ctx.clearRect(0, 0, w, h);
    // sea
    ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, h * 0.75, w, h * 0.25);
    // sun (brightens with heat)
    ctx.fillStyle = `rgba(253,224,71,${0.4 + heat * 0.6})`;
    ctx.beginPath(); ctx.arc(w * 0.85, h * 0.15, 20 + heat * 10, 0, Math.PI * 2); ctx.fill();
    // rising vapour with heat
    if (heat > 0.2) {
        ctx.fillStyle = 'rgba(226,232,240,0.8)';
        const rise = Math.min(1, time) * h * 0.4;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath(); ctx.arc(w * (0.3 + i * 0.15), h * 0.75 - rise - i * 8, 8 + i * 3, 0, Math.PI * 2); ctx.fill();
        }
    }
    // cloud forms when vapour reaches top
    if (heat > 0.5 && time > 0.5) {
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath(); ctx.arc(w * 0.4, h * 0.22, 16, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(w * 0.5, h * 0.18, 20, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(w * 0.6, h * 0.22, 16, 0, Math.PI * 2); ctx.fill();
    }
    // rain when full cycle
    if (heat > 0.6 && time > 0.8) {
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const x = w * (0.35 + i * 0.04);
            ctx.beginPath(); ctx.moveTo(x, h * 0.35); ctx.lineTo(x, h * 0.45); ctx.stroke();
        }
    }
}
function paintOrbit(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const speed = (v.speed ?? 30) / 100;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
    const t = Date.now() / 1000 * speed * 2;
    // 3 orbits
    const orbits = [40, 65, 90];
    const colors = ['#94a3b8', '#60a5fa', '#f97316'];
    orbits.forEach((r, i) => {
        ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        const a = t / (i + 1);
        ctx.fillStyle = colors[i];
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 8 - i, 0, Math.PI * 2); ctx.fill();
    });
}
function paintWeigh(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const grams = v.grams ?? 0;
    ctx.clearRect(0, 0, w, h);
    // scale dial
    ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(w / 2, h * 0.6, 60, Math.PI, 0); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(w / 2, h * 0.6, 60, Math.PI, 0); ctx.stroke();
    // needle
    const a = Math.PI + (Math.min(100, grams) / 100) * Math.PI;
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w / 2, h * 0.6); ctx.lineTo(w / 2 + Math.cos(a) * 50, h * 0.6 + Math.sin(a) * 50); ctx.stroke();
    // pan with weight
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(w / 2 - 30, h * 0.62, 60, 8);
    ctx.fillStyle = '#f97316';
    const wh = 10 + grams / 6;
    ctx.fillRect(w / 2 - wh / 2, h * 0.62 - wh / 2, wh, wh / 2);
}
function paintElectric(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const on = (v.power ?? 0) > 50;
    ctx.clearRect(0, 0, w, h);
    // wire loop
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.2, h * 0.3, w * 0.6, h * 0.5);
    // battery
    ctx.fillStyle = '#334155'; ctx.fillRect(w * 0.18, h * 0.5, 14, 24);
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(w * 0.18, h * 0.56, 14, 4);
    // bulb
    const bx = w * 0.72, by = h * 0.55;
    ctx.beginPath(); ctx.arc(bx, by, 16, 0, Math.PI * 2);
    ctx.fillStyle = on ? '#fde047' : '#475569'; ctx.fill();
    ctx.strokeStyle = '#1e293b'; ctx.stroke();
    if (on) { // glow
        ctx.strokeStyle = 'rgba(253,224,71,0.5)'; ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            ctx.beginPath(); ctx.moveTo(bx + Math.cos(a) * 20, by + Math.sin(a) * 20);
            ctx.lineTo(bx + Math.cos(a) * 30, by + Math.sin(a) * 30); ctx.stroke();
        }
    }
}
// ─── bespoke senior scene painters ──────────────────────────
// Real per-topic visuals — a beating heart, a live circuit, a cell,
// a nephron, an atom, a prism, a projectile. Sim declares scene via
// explore.scene = 'heart' etc. Each reads slider values for interactivity.
function paintHeart(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const rate = (v.rate ?? 60) / 60;      // beats per second-ish
    const beat = (Math.sin(t * 0.001 * rate * Math.PI) + 1) / 2;   // 0..1 pulse
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    // heart body — pulsing
    const s = 1 + beat * 0.12;
    ctx.save(); ctx.translate(w * 0.3, h * 0.5); ctx.scale(s, s);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.bezierCurveTo(-40, 0, -30, -40, 0, -15);
    ctx.bezierCurveTo(30, -40, 40, 0, 0, 30);
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    // ECG trace on the right — real PQRST-ish waveform scrolling
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
    ctx.strokeRect(w * 0.55, h * 0.2, w * 0.4, h * 0.6);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.beginPath();
    const phase = (t * 0.001 * rate) % 1;
    for (let x = 0; x < w * 0.4; x++) {
        const u = (x / (w * 0.4) + phase) % 1;
        let y = h * 0.5;
        if (u > 0.1 && u < 0.16) y -= 8;                      // P
        if (u > 0.2 && u < 0.24) y += 6;                      // Q dip
        if (u >= 0.24 && u < 0.30) y -= (u - 0.24) / 0.06 * 46; // R up
        if (u >= 0.30 && u < 0.34) y -= 46 - (u - 0.30) / 0.04 * 46;
        if (u >= 0.34 && u < 0.38) y += (u - 0.34) / 0.04 * 14; // S dip
        if (u > 0.42 && u < 0.52) y -= 10;                    // T
        if (x === 0) ctx.moveTo(w * 0.55 + x, y); else ctx.lineTo(w * 0.55 + x, y);
    }
    ctx.stroke();
}
function paintCircuit(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const closed = (v.switch ?? 0) > 0;
    const cur = closed ? (v.voltage ?? 0) : 0;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    // circuit loop
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.15, h * 0.2, w * 0.7, h * 0.6);
    // battery (left)
    ctx.fillStyle = '#0f172a'; ctx.fillRect(w * 0.12, h * 0.42, 12, 30);
    ctx.fillStyle = '#f8fafc'; ctx.fillRect(w * 0.12, h * 0.45, 12, 3);
    // resistor (top)
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const x = w * 0.4 + i * 8;
        ctx.lineTo(x, h * 0.2 + (i % 2 ? -8 : 0));
    }
    ctx.stroke();
    // bulb (right) — lights when closed
    const bx = w * 0.85, by = h * 0.5;
    ctx.beginPath(); ctx.arc(bx, by, 18, 0, Math.PI * 2);
    ctx.fillStyle = closed && cur > 0 ? `rgba(253,224,71,${0.4 + cur / 200})` : '#cbd5e1';
    ctx.fill(); ctx.strokeStyle = '#334155'; ctx.stroke();
    // switch (bottom) — open/closed lever
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(w * 0.35, h * 0.8);
    ctx.lineTo(w * 0.55, closed ? h * 0.8 : h * 0.66);   // lever up = open
    ctx.stroke();
    // current dots flowing when closed
    if (closed && cur > 0) {
        ctx.fillStyle = '#f59e0b';
        const n = Math.floor(cur / 20);
        for (let i = 0; i < n; i++) {
            const p = ((Date.now() / 500 + i / n) % 1);
            const x = w * 0.15 + p * w * 0.7;
            ctx.beginPath(); ctx.arc(x, h * 0.2, 3, 0, Math.PI * 2); ctx.fill();
        }
    }
}
function paintCell(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const zoom = (v.zoom ?? 0) / 100;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const cx = w / 2, cy = h / 2;
    // membrane
    ctx.fillStyle = 'rgba(134,239,172,0.3)'; ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(cx, cy, 90 * (0.8 + zoom * 0.3), 60 * (0.8 + zoom * 0.3), 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // nucleus
    const pulse = 1 + Math.sin(t * 0.003) * 0.05;
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath(); ctx.arc(cx - 10, cy, 22 * pulse * (0.8 + zoom * 0.4), 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4c1d95'; ctx.beginPath(); ctx.arc(cx - 10, cy, 10 * (0.8 + zoom * 0.4), 0, Math.PI * 2); ctx.fill();
    // mitochondria
    ctx.fillStyle = '#f97316';
    for (let i = 0; i < 3; i++) {
        const a = t * 0.001 + i * 2.1;
        const mx = cx + Math.cos(a) * 55, my = cy + Math.sin(a) * 35;
        ctx.beginPath(); ctx.ellipse(mx, my, 12, 6, a, 0, Math.PI * 2); ctx.fill();
    }
    // chloroplasts (plant) when zoom>0.5
    if (zoom > 0.4) {
        ctx.fillStyle = '#22c55e';
        for (let i = 0; i < 4; i++) {
            ctx.beginPath(); ctx.ellipse(cx - 40 + i * 22, cy - 30, 9, 5, 0.3, 0, Math.PI * 2); ctx.fill();
        }
    }
}
function paintNephron(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const flow = (v.flow ?? 50) / 100;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    // glomerulus ball
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.arc(w * 0.2, h * 0.3, 8 + i * 3, 0, Math.PI * 2); ctx.stroke();
    }
    // tubule — winding tube
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(w * 0.2, h * 0.35);
    ctx.bezierCurveTo(w * 0.5, h * 0.15, w * 0.5, h * 0.7, w * 0.8, h * 0.55);
    ctx.stroke();
    // collecting duct
    ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(w * 0.8, h * 0.55); ctx.lineTo(w * 0.8, h * 0.9); ctx.stroke();
    // filtrate droplets flowing when flow>0
    if (flow > 0) {
        ctx.fillStyle = '#38bdf8';
        for (let i = 0; i < 4; i++) {
            const p = (t * 0.0005 * flow + i / 4) % 1;
            ctx.beginPath(); ctx.arc(w * 0.8, h * 0.55 + p * h * 0.35, 4, 0, Math.PI * 2); ctx.fill();
        }
    }
}
function paintAtom(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const e = Math.round(v.electrons ?? 3);
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const cx = w / 2, cy = h / 2;
    // nucleus
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2); ctx.fill();
    // electron shells + orbiting electrons
    const shells = [30, 50, 70];
    shells.forEach((r, si) => {
        ctx.strokeStyle = 'rgba(100,116,139,0.5)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.5, si * 0.6, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.fillStyle = '#38bdf8';
    for (let i = 0; i < Math.min(e, 9); i++) {
        const si = Math.min(2, Math.floor(i / 3));
        const a = t * 0.002 + i * 2.1;
        const r = shells[si];
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.5, 5, 0, Math.PI * 2); ctx.fill();
    }
}
function paintPrism(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const spread = (v.angle ?? 50) / 100;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    // prism triangle
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.2); ctx.lineTo(w * 0.38, h * 0.75); ctx.lineTo(w * 0.62, h * 0.75); ctx.closePath(); ctx.stroke();
    // incident white ray
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w * 0.05, h * 0.45); ctx.lineTo(w * 0.45, h * 0.5); ctx.stroke();
    // dispersed spectrum fan
    const cols = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6'];
    cols.forEach((c, i) => {
        ctx.strokeStyle = c; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(w * 0.55, h * 0.5);
        ctx.lineTo(w * 0.98, h * (0.3 + i * 0.08 * spread)); ctx.stroke();
    });
}
function paintProjectile(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const speed = (v.speed ?? 50) / 100, angle = (v.angle ?? 45);
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    ctx.fillStyle = '#16a34a'; ctx.fillRect(0, h * 0.9, w, h * 0.1); // ground
    // trajectory arc
    ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.beginPath();
    const rad = angle * Math.PI / 180;
    for (let x = 0; x <= 1; x += 0.02) {
        const px = w * 0.1 + x * w * 0.8;
        const py = h * 0.9 - (Math.tan(rad) * x * 160 - 160 * x * x) * speed;
        if (x === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.setLineDash([]);
    // ball animating along the arc
    const p = (t * 0.0006 * speed) % 1;
    const bx = w * 0.1 + p * w * 0.8;
    const by = h * 0.9 - (Math.tan(rad) * p * 160 - 160 * p * p) * speed;
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(bx, Math.max(10, by), 8, 0, Math.PI * 2); ctx.fill();
}
function paintPendulum(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const len = 60 + (v.length ?? 50) / 100 * 60;
    const amp = 0.7;
    const a = Math.sin(t * 0.002 / Math.sqrt(len / 80)) * amp;   // period ∝ sqrt(len)
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const px = w / 2, py = h * 0.1;
    const bx = px + Math.sin(a) * len, by = py + Math.cos(a) * len;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke();
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
    // protractor arc
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(px, py, len, Math.PI / 2 - amp, Math.PI / 2 + amp); ctx.stroke();
}
function paintMitosis(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const stage = Math.floor((v.stage ?? 0) / 25);   // 0-3 -> 4 stages
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const cx = w / 2, cy = h / 2;
    // cell
    ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, 100, 70, 0, 0, Math.PI * 2); ctx.stroke();
    // chromosomes pull apart across stages
    ctx.strokeStyle = '#8b5cf6'; ctx.lineWidth = 3;
    const sep = stage * 22;
    for (let i = -2; i <= 2; i++) {
        const y = cy + i * 14;
        ctx.beginPath(); ctx.moveTo(cx - 14 - sep, y); ctx.quadraticCurveTo(cx - sep / 2, y + 6, cx - 4 - sep, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 14 + sep, y); ctx.quadraticCurveTo(cx + sep / 2, y + 6, cx + 4 + sep, y); ctx.stroke();
    }
    // spindle fibres
    ctx.strokeStyle = 'rgba(56,189,248,0.5)'; ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
        ctx.beginPath(); ctx.moveTo(cx - 90, cy); ctx.lineTo(cx - 4 - sep, cy + i * 14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 90, cy); ctx.lineTo(cx + 4 + sep, cy + i * 14); ctx.stroke();
    }
    // stage label
    const names = ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'];
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(names[Math.min(3, stage)] ?? 'Prophase', cx, h - 12);
}

// ─── senior scenes (v3): field / optics / wave / graph / gas / titrate / emag / vector / equilibrium ──
function paintEfield(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const q1 = (v.q1 ?? 50) / 50 - 1, q2 = (v.q2 ?? 50) / 50 - 1;   // −1..1
    const sep = (v.separation ?? 50) / 100;                       // 0..1
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const x1 = w * (0.5 - sep * 0.35), x2 = w * (0.5 + sep * 0.35), cy = h / 2;
    // field lines — density ∝ charge magnitude
    const lines = 10 + Math.round(Math.abs(q1 + q2) * 8);
    ctx.strokeStyle = 'rgba(56,189,248,0.5)'; ctx.lineWidth = 1;
    for (let i = 0; i < lines; i++) {
        const a = (i / lines) * Math.PI * 2 + t * 0.0002;
        ctx.beginPath(); ctx.moveTo(x1, cy);
        const mx = (x1 + x2) / 2 + Math.sin(a * 2) * sep * 30;
        ctx.quadraticCurveTo(mx, cy + Math.sin(a) * h * 0.6, x2, cy);
        ctx.stroke();
    }
    const draw = (x: number, q: number) => {
        ctx.fillStyle = q >= 0 ? '#ef4444' : '#3b82f6';
        ctx.beginPath(); ctx.arc(x, cy, 14 + Math.abs(q) * 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(q >= 0 ? '+' : '−', x, cy + 5);
    };
    draw(x1, q1); draw(x2, q2);
}
function paintLens(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const f = 30 + (v.focal ?? 50) * 0.8;                    // px focal length
    const objX = w * 0.15, cy = h * 0.55, lensX = w * 0.6;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    // axis + lens
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
    ctx.fillStyle = 'rgba(125,211,252,0.4)';
    ctx.beginPath(); ctx.ellipse(lensX, cy, 8, h * 0.42, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(lensX, cy, 8, h * 0.42, 0, 0, Math.PI * 2); ctx.stroke();
    // object arrow
    const oh = h * 0.28;
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(objX, cy); ctx.lineTo(objX, cy - oh); ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.moveTo(objX, cy - oh); ctx.lineTo(objX - 6, cy - oh + 12); ctx.lineTo(objX + 6, cy - oh + 12); ctx.fill();
    // ray through centre + parallel ray → image
    const d = lensX - objX, di = (f * d) / Math.max(1, d - f);  // thin lens 1/f=1/do+1/di
    const imgX = lensX + di, ih = -oh * (di / d);
    ctx.strokeStyle = '#34d399'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(objX, cy - oh); ctx.lineTo(lensX, cy - oh); ctx.lineTo(imgX, cy - ih); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(objX, cy - oh); ctx.lineTo(imgX, cy - ih); ctx.stroke();
    if (imgX < w && imgX > lensX) {
        ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(imgX, cy); ctx.lineTo(imgX, cy - ih); ctx.stroke();
        ctx.fillStyle = '#f472b6'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(ih < 0 ? 'image (inverted)' : 'image (upright)', imgX, cy - ih - 8);
    }
}
function paintWave(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const amp = (v.amplitude ?? 50) / 100, freq = 1 + (v.frequency ?? 50) / 25;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x / w) * freq * Math.PI * 4 + t * 0.004) * amp * h * 0.35;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // particles on the wave
    ctx.fillStyle = '#f59e0b';
    for (let i = 1; i < 8; i++) {
        const x = (i / 8) * w;
        const y = h / 2 + Math.sin((x / w) * freq * Math.PI * 4 + t * 0.004) * amp * h * 0.35;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    }
}
function paintGraph(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const m = (v.slope ?? 50) / 25 - 2, c = (v.intercept ?? 50) / 12.5 - 4;
    const px = (x: number) => w / 2 + x * (w / 12), py = (y: number) => h / 2 - y * (h / 10);
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    ctx.strokeStyle = '#e2e8f0';
    for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(px(i), 0); ctx.lineTo(px(i), h); ctx.stroke(); }
    for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(0, py(i)); ctx.lineTo(w, py(i)); ctx.stroke(); }
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
    ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = -6; x <= 6; x += 0.1) {
        const y = m * x + c;
        if (py(y) < 0 || py(y) > h) continue;
        ctx.lineTo(px(x), py(y));
    }
    ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`y = ${m.toFixed(1)}x ${c >= 0 ? '+' : '−'} ${Math.abs(c).toFixed(1)}`, 10, 18);
}
function paintGas(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const temp = (v.temperature ?? 50) / 100, vol = 1 - (v.compression ?? 0) / 140;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const boxW = w * 0.6 * vol + w * 0.2, boxH = h * 0.7, bx = w * 0.2, by = h * 0.15;
    ctx.fillStyle = `rgba(${Math.round(56 + temp * 199)},${Math.round(189 - temp * 100)},248,0.12)`;
    ctx.fillRect(bx, by, boxW, boxH);
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.strokeRect(bx, by, boxW, boxH);
    // piston
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(bx + boxW, by - 4, 10, boxH + 8);
    // particles — speed ∝ temperature
    const n = 22;
    for (let i = 0; i < n; i++) {
        const px = bx + ((Math.sin(i * 137.5 + t * 0.001 * (0.5 + temp * 3) + i) + 1) / 2) * (boxW - 12) + 6;
        const py = by + ((Math.cos(i * 97.3 + t * 0.0013 * (0.5 + temp * 3) + i * 2) + 1) / 2) * (boxH - 12) + 6;
        ctx.fillStyle = `rgba(59,130,246,${0.5 + temp * 0.5})`;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(`T ∝ kinetic energy · compress → pressure rises`, w / 2, h - 10);
}
function paintTitrate(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const drop = (v.drops ?? 0) / 100;                         // added titrant
    const pH = drop < 0.45 ? 2 + drop * 8 : drop < 0.55 ? 7 : 7 + (drop - 0.55) * 18;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    // burette
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(w * 0.45, 0, w * 0.08, h * 0.3);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.strokeRect(w * 0.45, 0, w * 0.08, h * 0.3);
    if (v.drops > 0) { ctx.fillStyle = '#38bdf8'; ctx.fillRect(w * 0.485, h * 0.3, w * 0.008, h * 0.1); }
    // flask — color shifts at endpoint
    ctx.fillStyle = pH < 6.5 ? '#fecaca' : pH > 7.5 ? '#f9a8d4' : '#fdf2f8';
    ctx.beginPath();
    ctx.moveTo(w * 0.42, h * 0.55); ctx.lineTo(w * 0.35, h * 0.9); ctx.lineTo(w * 0.65, h * 0.9); ctx.lineTo(w * 0.58, h * 0.55);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(`pH ≈ ${pH.toFixed(1)} ${pH >= 6.5 && pH <= 7.5 ? '· ENDPOINT!' : ''}`, w / 2, h - 8);
}
function paintEmag(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const speed = (v.speed ?? 50) / 100, turns = 3 + Math.round((v.turns ?? 50) / 20);
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const cx = w / 2, cy = h / 2, off = Math.sin(t * 0.002 * (0.3 + speed * 2)) * w * 0.18;
    // coil
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3;
    for (let i = 0; i < turns; i++) {
        ctx.beginPath(); ctx.ellipse(cx + i * 8 - turns * 4, cy, 10, h * 0.32, 0, 0, Math.PI * 2); ctx.stroke();
    }
    // magnet sweeping in/out
    ctx.fillStyle = '#ef4444'; ctx.fillRect(cx - 60 + off, cy - 14, 30, 28);
    ctx.fillStyle = '#3b82f6'; ctx.fillRect(cx - 30 + off, cy - 14, 30, 28);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('N', cx - 45 + off, cy + 4); ctx.fillText('S', cx - 15 + off, cy + 4);
    // induced current indicator
    const flux = Math.abs(Math.cos(t * 0.002 * (0.3 + speed * 2))) * speed;
    ctx.fillStyle = `rgba(56,189,248,${0.3 + flux * 0.7})`; ctx.font = 'bold 16px sans-serif';
    ctx.fillText(flux > 0.15 ? `⚡ induced current: ${Math.round(flux * 100)}%` : 'no motion → no current', w / 2, h - 12);
}
function paintVector(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const ax = (v.ax ?? 60) / 12 - 5, ay = (v.ay ?? 50) / 12 - 4;
    const bx = (v.bx ?? 40) / 12 - 4, by = (v.by ?? 60) / 12 - 5;
    const px = (x: number) => w / 2 + x * (w / 14), py = (y: number) => h / 2 - y * (h / 10);
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    ctx.strokeStyle = '#e2e8f0';
    for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(px(i), 0); ctx.lineTo(px(i), h); ctx.stroke(); }
    for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(0, py(i)); ctx.lineTo(w, py(i)); ctx.stroke(); }
    const arrow = (x1: number, y1: number, x2: number, y2: number, col: string, label: string) => {
        ctx.strokeStyle = col; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(px(x1), py(y1)); ctx.lineTo(px(x2), py(y2)); ctx.stroke();
        const ang = Math.atan2(py(y1) - py(y2), px(x2) - px(x1));
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.moveTo(px(x2), py(y2));
        ctx.lineTo(px(x2) - 10 * Math.cos(ang - 0.4), py(y2) + 10 * Math.sin(ang - 0.4));
        ctx.lineTo(px(x2) - 10 * Math.cos(ang + 0.4), py(y2) + 10 * Math.sin(ang + 0.4));
        ctx.fill();
        ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(label, px((x1 + x2) / 2) - 14, py((y1 + y2) / 2) - 6);
    };
    arrow(0, 0, ax, ay, '#6366f1', 'a');
    arrow(0, 0, bx, by, '#f59e0b', 'b');
    arrow(ax, ay, ax + bx, ay + by, '#f59e0b88', 'b');
    arrow(0, 0, ax + bx, ay + by, '#10b981', 'a+b');
}
function paintEquil(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const shift = (v.concentration ?? 50) / 100;               // 0 = more reactants, 1 = more products
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const n = 24, products = Math.round(n * shift);
    for (let i = 0; i < n; i++) {
        const x = w * 0.12 + (i % 8) * w * 0.095 + Math.sin(t * 0.001 + i * 3) * 4;
        const y = h * 0.25 + Math.floor(i / 8) * h * 0.22 + Math.cos(t * 0.0013 + i * 5) * 4;
        ctx.fillStyle = i < products ? '#f472b6' : '#38bdf8';
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(i < products ? 'B' : 'A', x, y + 3);
    }
    // equilibrium arrows — thickness ∝ direction
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(w * 0.38, h * 0.82); ctx.lineTo(w * 0.62, h * 0.82); ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.beginPath(); ctx.moveTo(w * 0.62, h * 0.82); ctx.lineTo(w * 0.56, h * 0.78); ctx.lineTo(w * 0.56, h * 0.86); ctx.fill();
    ctx.beginPath(); ctx.moveTo(w * 0.38, h * 0.82); ctx.lineTo(w * 0.44, h * 0.78); ctx.lineTo(w * 0.44, h * 0.86); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`A ⇌ B  ·  products: ${products}/${n}`, w / 2, h - 8);
}

// ─── humanities instruments: timeline + flow-map (honest worlds for
//     non-STEM chapters — temporal/process content, not fake physics) ──
function paintTimeline(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, labels?: string[]) {
    const pos = (v.year ?? 0) / 100;
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    // the strip
    const ty = h * 0.55;
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w * 0.06, ty); ctx.lineTo(w * 0.94, ty); ctx.stroke();
    // era markers
    ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    for (let i = 0; i <= 5; i++) {
        const x = w * 0.06 + (i / 5) * w * 0.88;
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath(); ctx.moveTo(x, ty - 6); ctx.lineTo(x, ty + 6); ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.fillText(i === 0 ? 'past' : i === 5 ? 'later' : '', x, ty + 18);
    }
    // event markers appear as the year scrubs past them
    const ev = [0.15, 0.35, 0.55, 0.75, 0.9];
    ev.forEach((e, i) => {
        const x = w * 0.06 + e * w * 0.88, on = pos >= e;
        ctx.fillStyle = on ? '#6366f1' : '#cbd5e1';
        ctx.beginPath(); ctx.arc(x, ty, on ? 8 : 5, 0, Math.PI * 2); ctx.fill();
        if (on) {
            ctx.fillStyle = '#312e81';
            ctx.fillText((labels?.[i] ?? `event ${i + 1}`).slice(0, 22), x, ty - 16);
        }
    });
    // the scrubber
    const sx = w * 0.06 + pos * w * 0.88;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.moveTo(sx, ty - 22); ctx.lineTo(sx - 7, ty - 34); ctx.lineTo(sx + 7, ty - 34); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`you are here — ${Math.round(pos * 100)}% through the timeline`, sx, ty - 40);
}
function paintFlow(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, plabels?: string[]) {
    const step = Math.min(5, Math.max(0, Math.floor((v.stage ?? 0) / 20)));
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    const labels = plabels?.length ? ['start', ...plabels.slice(0, 4).map(l => l.slice(0, 12)), 'done'] : ['start', 'stage 1', 'stage 2', 'stage 3', 'stage 4', 'done'];
    for (let i = 0; i <= 5; i++) {
        const x = w * 0.1 + i * w * 0.16, y = h * 0.5;
        const on = i <= step;
        ctx.fillStyle = on ? '#6366f1' : '#e2e8f0';
        ctx.beginPath(); ctx.roundRect(x - 26, y - 18, 52, 36, 8); ctx.fill();
        ctx.strokeStyle = on ? '#4f46e5' : '#94a3b8'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(x - 26, y - 18, 52, 36, 8); ctx.stroke();
        ctx.fillStyle = on ? '#fff' : '#64748b';
        ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, y + 3);
        if (i < 5) {
            ctx.strokeStyle = i < step ? '#6366f1' : '#cbd5e1'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x + 28, y); ctx.lineTo(x + w * 0.16 - 28, y); ctx.stroke();
            ctx.fillStyle = i < step ? '#6366f1' : '#cbd5e1';
            ctx.beginPath(); ctx.moveTo(x + w * 0.16 - 28, y);
            ctx.lineTo(x + w * 0.16 - 34, y - 4); ctx.lineTo(x + w * 0.16 - 34, y + 4); ctx.fill();
        }
    }
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`walk the process — stage ${step}/5`, w / 2, h - 14);
}

/** premium backdrop — radial gradient + faint dot-grid + horizon glow.
 *  'dark' for physics/chem scenes, 'light' for charts/graphs. */
function sceneBg(ctx: CanvasRenderingContext2D, w: number, h: number, mode: 'dark' | 'light' = 'dark') {
    const g = ctx.createRadialGradient(w / 2, h * 0.4, 10, w / 2, h / 2, Math.max(w, h) * 0.8);
    if (mode === 'dark') {
        g.addColorStop(0, '#1e293b'); g.addColorStop(0.6, '#0f172a'); g.addColorStop(1, '#020617');
    } else {
        g.addColorStop(0, '#ffffff'); g.addColorStop(0.7, '#f1f5f9'); g.addColorStop(1, '#e2e8f0');
    }
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // dot grid
    ctx.fillStyle = mode === 'dark' ? 'rgba(148,163,184,0.12)' : 'rgba(100,116,139,0.10)';
    for (let x = 15; x < w; x += 24) for (let y = 15; y < h; y += 24) {
        ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
    }
    // horizon glow
    const hg = ctx.createLinearGradient(0, h * 0.7, 0, h);
    hg.addColorStop(0, 'rgba(56,189,248,0)');
    hg.addColorStop(1, mode === 'dark' ? 'rgba(56,189,248,0.14)' : 'rgba(99,102,241,0.10)');
    ctx.fillStyle = hg; ctx.fillRect(0, h * 0.7, w, h * 0.3);
}

/** ambient polish — drifting particle field + vignette, applied to every
 *  bespoke scene so generated sims read as premium, not flat. */
function paintAmbience(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    // soft vignette
    const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(2,6,23,0.35)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    // drifting particles
    for (let i = 0; i < 14; i++) {
        const x = ((Math.sin(i * 137.5) + 1) / 2) * w + Math.sin(t * 0.0004 + i) * 8;
        const y = ((Math.cos(i * 97.3) + 1) / 2) * h + Math.cos(t * 0.0005 + i * 2) * 6;
        const tw = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.001 + i * 1.7));
        ctx.fillStyle = `rgba(125,211,252,${tw * 0.35})`;
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
    }
}

// ─── scene pack 2: senior masters-tier visuals ───────────────────────
function paintDNA(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const unzipped = (v.unzip ?? 0) / 100;
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const cy = h / 2, amp = h * 0.28;
    // two backbones as phase-shifted sines
    for (const [phase, col] of [[0, '#38bdf8'], [Math.PI, '#f472b6']] as const) {
        ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.shadowColor = col; ctx.shadowBlur = 10;
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
            const sep = 1 + unzipped * Math.max(0, (x - w * 0.3) / (w * 0.4));
            const y = cy + Math.sin(x * 0.05 + t * 0.001 + phase) * amp * sep;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    // base-pair rungs
    ctx.shadowBlur = 0;
    for (let i = 0; i < 20; i++) {
        const x = (i / 20) * w;
        const sep = 1 + unzipped * Math.max(0, (x - w * 0.3) / (w * 0.4));
        const y1 = cy + Math.sin(x * 0.05 + t * 0.001) * amp * sep;
        const y2 = cy + Math.sin(x * 0.05 + t * 0.001 + Math.PI) * amp * sep;
        ctx.strokeStyle = 'rgba(251,191,36,0.7)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(unzipped > 0.3 ? 'helicase unzipping…' : 'double helix — A·T, G·C pairs', w / 2, h - 10);
}
function paintSupply(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const supplyShift = ((v.supply ?? 50) - 50) / 50, demandShift = ((v.demand ?? 50) - 50) / 50;
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'light');
    const px = (x: number) => w * 0.15 + x * w * 0.75 / 10, py = (y: number) => h * 0.9 - y * h * 0.75 / 10;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px(0), py(0)); ctx.lineTo(px(10), py(0)); ctx.stroke();  // Q axis
    ctx.beginPath(); ctx.moveTo(px(0), py(0)); ctx.lineTo(px(0), py(10)); ctx.stroke();  // P axis
    ctx.fillStyle = '#64748b'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Quantity →', w / 2, h - 6); ctx.save(); ctx.translate(14, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Price →', 0, 0); ctx.restore();
    // supply up, demand down — shifts move curves horizontally
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#10b981';
    ctx.beginPath(); ctx.moveTo(px(1 + supplyShift * 2), py(1)); ctx.lineTo(px(9 + supplyShift * 2), py(9)); ctx.stroke();
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath(); ctx.moveTo(px(1 + demandShift * 2), py(9)); ctx.lineTo(px(9 + demandShift * 2), py(1)); ctx.stroke();
    // equilibrium: solve supply=demand → q: 1+s*2 + x*(8) = ... lines: supply y=x... use param
    const qe = 5 + (demandShift - supplyShift), pe = 5 - (demandShift - supplyShift) * 0.5;
    ctx.fillStyle = '#6366f1';
    ctx.beginPath(); ctx.arc(px(Math.min(9.5, Math.max(0.5, qe))), py(Math.min(9.5, Math.max(0.5, pe))), 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#6366f1'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(px(qe), py(0)); ctx.lineTo(px(qe), py(pe)); ctx.lineTo(px(0), py(pe)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#0f172a'; ctx.fillText(`equilibrium P≈${Math.round(pe)}  Q≈${Math.round(qe)}`, w / 2, h * 0.12);
    ctx.fillStyle = '#10b981'; ctx.fillText('S', px(9 + supplyShift * 2) + 10, py(9));
    ctx.fillStyle = '#ef4444'; ctx.fillText('D', px(1 + demandShift * 2) - 10, py(9));
}
function paintReflex(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const speed = (v.speed ?? 50) / 100;
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    // stimulus → receptor → spinal cord → motor → muscle path
    const pts = [[w * 0.08, h * 0.75], [w * 0.2, h * 0.4], [w * 0.5, h * 0.3], [w * 0.8, h * 0.4], [w * 0.92, h * 0.75]];
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (const [x, y] of pts.slice(1)) ctx.lineTo(x, y);
    ctx.stroke();
    // nodes
    const labels = ['stimulus 🔥', 'receptor', 'spinal cord', 'motor neuron', 'muscle 💪'];
    pts.forEach(([x, y], i) => {
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, y + 24);
    });
    // signal pulse travels the arc
    const p = (t * 0.0006 * (0.3 + speed * 2)) % 1;
    const seg = Math.min(3, Math.floor(p * 4)), f = p * 4 - seg;
    const sx = pts[seg][0] + (pts[seg + 1][0] - pts[seg][0]) * f;
    const sy = pts[seg][1] + (pts[seg + 1][1] - pts[seg][1]) * f;
    ctx.fillStyle = '#fbbf24'; ctx.shadowColor = '#fbbf24'; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
}
function paintDigest(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const prog = (v.progress ?? 0) / 100;
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'light');
    // organs down the tract
    const organs = [['mouth', 0.12, '#f59e0b'], ['oesophagus', 0.3, '#38bdf8'], ['stomach', 0.48, '#ef4444'],
        ['small intestine', 0.66, '#a78bfa'], ['large intestine', 0.84, '#10b981']];
    organs.forEach(([label, fy, col], i) => {
        const y = h * (fy as number), on = prog * 5 > i;
        ctx.fillStyle = on ? (col as string) : '#cbd5e1';
        ctx.beginPath(); ctx.roundRect(w * 0.35, y - 14, w * 0.3, 24, 10); ctx.fill();
        ctx.strokeStyle = on ? (col as string) : '#94a3b8'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(w * 0.35, y - 14, w * 0.3, 24, 10); ctx.stroke();
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(label as string, w * 0.5, y + 3);
        if (i < 4) {
            ctx.strokeStyle = prog * 5 > i + 0.5 ? '#64748b' : '#e2e8f0'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(w * 0.5, y + 12); ctx.lineTo(w * 0.5, h * ((organs[i + 1][1] as number)) - 16); ctx.stroke();
        }
    });
    // food bolus marker
    const bi = Math.min(4, Math.floor(prog * 5));
    if (prog > 0 && prog < 1) {
        const y = h * (organs[bi][1] as number);
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(w * 0.5 + 20, y, 7, 0, Math.PI * 2); ctx.fill();
    }
}
function paintPH(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const probe = (v.probe ?? 50) / 100;
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'light');
    // pH gradient strip
    const sx = w * 0.08, sw = w * 0.84, sy = h * 0.45, sh = h * 0.2;
    const grad = ctx.createLinearGradient(sx, 0, sx + sw, 0);
    const stops = ['#dc2626', '#f97316', '#fbbf24', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];
    stops.forEach((c, i) => grad.addColorStop(i / (stops.length - 1), c));
    ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, 10); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    for (let i = 0; i <= 14; i += 2) ctx.fillText(String(i), sx + (i / 14) * sw, sy + sh + 16);
    ctx.fillText('ACID', sx + sw * 0.1, sy - 8); ctx.fillText('NEUTRAL', sx + sw * 0.5, sy - 8); ctx.fillText('BASE', sx + sw * 0.9, sy - 8);
    // probe needle
    const nx = sx + probe * sw;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath(); ctx.moveTo(nx, sy - 14); ctx.lineTo(nx - 7, sy - 2); ctx.lineTo(nx + 7, sy - 2); ctx.fill();
    const pHv = probe * 14;
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`pH ${pHv.toFixed(1)} — ${pHv < 5 ? 'acid' : pHv < 6.5 ? 'weakly acidic' : pHv <= 7.5 ? 'neutral' : pHv < 10 ? 'weakly basic' : 'strong base'}`, w / 2, h * 0.85);
}
function paintMoon(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    const phase = (v.phase ?? 0) / 100;
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const cx = w * 0.5, cy = h * 0.45, r = 40;
    // stars
    for (let i = 0; i < 30; i++) {
        const x = ((Math.sin(i * 91.7) + 1) / 2) * w, y = ((Math.cos(i * 53.1) + 1) / 2) * h;
        ctx.fillStyle = `rgba(255,255,255,${0.3 + 0.4 * Math.abs(Math.sin(t * 0.001 + i))})`;
        ctx.fillRect(x, y, 1.5, 1.5);
    }
    // moon disc — lit fraction sweeps
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = '#fbbf24'; ctx.shadowColor = '#fbbf24'; ctx.shadowBlur = 20;
    const lit = Math.cos(phase * Math.PI * 2);
    ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(lit) * r, r, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore(); ctx.shadowBlur = 0;
    const names = ['new moon', 'crescent', 'quarter', 'gibbous', 'full moon'];
    const ni = Math.min(4, Math.floor(phase * 5));
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(names[ni], cx, h - 14);
}
function paintSpectrum(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const sel = (v.band ?? 40) / 100;
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const bands = [['radio', '#64748b'], ['micro', '#38bdf8'], ['infrared', '#f97316'], ['visible', '#fbbf24'],
        ['UV', '#a78bfa'], ['X-ray', '#f472b6'], ['gamma', '#ef4444']];
    const bw = (w * 0.8) / bands.length, bx0 = w * 0.1;
    bands.forEach(([name, col], i) => {
        const on = Math.abs(sel - i / 6) < 0.08;
        ctx.fillStyle = col as string;
        ctx.globalAlpha = on ? 1 : 0.35;
        ctx.beginPath(); ctx.roundRect(bx0 + i * bw, h * 0.35, bw - 4, h * 0.28, 6); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name as string, bx0 + i * bw + bw / 2 - 2, h * 0.72);
    });
    // wavelength annotation
    ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`λ: ${['km', 'm', 'mm', 'µm', 'nm', 'pm', 'fm'][Math.round(sel * 6)]}  ·  energy rises →`, w / 2, h * 0.2);
    // wave under selected band
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath();
    const fr = 0.5 + sel * 8;
    for (let x = bx0; x < bx0 + w * 0.8; x += 2) {
        const y = h * 0.85 + Math.sin(x * 0.05 * fr) * 8;
        x === bx0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
}
function paintConic(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const tilt = (v.tilt ?? 50) / 100;   // 0=horizontal slice..1=vertical
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const cx = w / 2, cy = h / 2;
    // double cone
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - w * 0.28, cy - h * 0.35); ctx.lineTo(cx + w * 0.28, cy - h * 0.35); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - w * 0.28, cy + h * 0.35); ctx.lineTo(cx + w * 0.28, cy + h * 0.35); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy - h * 0.35, w * 0.28, 12, 0, 0, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy + h * 0.35, w * 0.28, 12, 0, Math.PI, Math.PI * 2); ctx.stroke();
    // slicing plane
    const py = cy + (tilt - 0.5) * h * 0.5, ang = (tilt - 0.5) * 1.4;
    ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx - w * 0.4, py - Math.tan(ang) * w * 0.2); ctx.lineTo(cx + w * 0.4, py + Math.tan(ang) * w * 0.2); ctx.stroke();
    // the conic it makes — drawn at bottom-right
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
    const gx = w * 0.82, gy = h * 0.78, gr = 22;
    ctx.beginPath();
    if (tilt < 0.25) ctx.ellipse(gx, gy, gr, gr * 0.5, 0, 0, Math.PI * 2);          // ellipse/circle
    else if (tilt < 0.5) ctx.ellipse(gx, gy, gr, gr * 0.7, 0.3, 0, Math.PI * 2);   // ellipse
    else if (tilt < 0.75) { ctx.moveTo(gx - gr, gy); ctx.quadraticCurveTo(gx, gy - gr * 2, gx + gr, gy); }  // parabola
    else { ctx.moveTo(gx - gr, gy - 8); ctx.quadraticCurveTo(gx, gy - gr, gx - gr * 0.4, gy + gr); ctx.moveTo(gx + gr, gy - 8); ctx.quadraticCurveTo(gx, gy - gr, gx + gr * 0.4, gy + gr); } // hyperbola
    ctx.stroke();
    const names = ['circle', 'ellipse', 'parabola', 'hyperbola'];
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(names[Math.min(3, Math.floor(tilt * 4))], gx, gy + gr + 12);
}

// ═══════════════════════════════════════════════════════════════════
// SUBJECT-SHAPED LABS — humanities + commerce + CS. Real computed
// logic, not animation theater: every scene derives its drawing from
// the actual domain model (double-entry rules, linear S/D curves,
// vote→seat proportionality, LLN sampling, program trace).
// ═══════════════════════════════════════════════════════════════════

/** ledger — double-entry bookkeeping. post slider walks 6 transactions;
 *  each posts a Dr line (left, emerald) + Cr line (right, amber) into the
 *  journal; running per-account balances; trial-balance check at bottom. */
const LEDGER_TXNS: Array<{ dr: string; cr: string; amt: number; text: string }> = [
    { dr: 'Cash', cr: 'Capital', amt: 50000, text: 'Owner invests ₹50,000' },
    { dr: 'Purchases', cr: 'Cash', amt: 12000, text: 'Bought goods for cash ₹12,000' },
    { dr: 'Cash', cr: 'Sales', amt: 18000, text: 'Sold goods for cash ₹18,000' },
    { dr: 'Rent', cr: 'Cash', amt: 3000, text: 'Paid shop rent ₹3,000' },
    { dr: 'Purchases', cr: 'Creditors', amt: 8000, text: 'Bought goods on credit ₹8,000' },
    { dr: 'Debtors', cr: 'Sales', amt: 10000, text: 'Sold goods on credit ₹10,000' },
];
function paintLedger(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, labels?: string[]) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    const n = Math.min(6, Math.max(0, Math.round(v.post ?? 0)));
    // journal header
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(labels?.[0] ? `JOURNAL — ${labels[0].slice(0, 30)}` : 'JOURNAL', 10, 14);
    ctx.fillText('Dr ₹', w * 0.62, 14); ctx.fillText('Cr ₹', w * 0.82, 14);
    ctx.strokeStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(8, 18); ctx.lineTo(w - 8, 18); ctx.stroke();
    const bal: Record<string, { d: number; c: number }> = {};
    for (let i = 0; i < n; i++) {
        const t = LEDGER_TXNS[i], y = 30 + i * 16;
        ctx.fillStyle = '#334155'; ctx.font = '9px sans-serif';
        ctx.fillText(`Dr ${t.dr}   —   ${(labels?.[i + 1] ?? t.text).slice(0, 40)}`, 10, y);
        ctx.font = 'bold 9px sans-serif';
        ctx.fillStyle = '#059669'; ctx.fillText(t.amt.toLocaleString('en-IN'), w * 0.62, y);
        ctx.fillStyle = '#d97706'; ctx.fillText(t.amt.toLocaleString('en-IN'), w * 0.82, y);
        bal[t.dr] = { d: (bal[t.dr]?.d ?? 0) + t.amt, c: bal[t.dr]?.c ?? 0 };
        bal[t.cr] = { d: bal[t.cr]?.d ?? 0, c: (bal[t.cr]?.c ?? 0) + t.amt };
    }
    // trial balance strip
    const dr = Object.values(bal).reduce((s, b) => s + Math.max(0, b.d - b.c), 0);
    const cr = Object.values(bal).reduce((s, b) => s + Math.max(0, b.c - b.d), 0);
    const ok = dr === cr && n > 0;
    ctx.fillStyle = ok ? '#059669' : '#64748b'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(n === 0 ? 'post each transaction — watch both sides appear' : `trial balance  Dr ₹${dr.toLocaleString('en-IN')} = Cr ₹${cr.toLocaleString('en-IN')} ${ok ? '✓' : ''}`, w / 2, h - 12);
    // account balance chips
    ctx.textAlign = 'left'; ctx.font = '8px sans-serif';
    const keys = Object.keys(bal);
    keys.slice(0, 4).forEach((k, i) => {
        const b = bal[k], net = b.d - b.c;
        ctx.fillStyle = net >= 0 ? '#059669' : '#d97706';
        ctx.fillText(`${k} ${net >= 0 ? 'Dr' : 'Cr'} ₹${Math.abs(net).toLocaleString('en-IN')}`, 10 + i * (w - 20) / 4, h - 28);
    });
}

/** market — real linear S/D curves. P axis vs Q axis; demand
 *  P = 100 − Q shifted by demand slider; supply P = 10 + Q shifted by
 *  supply slider; equilibrium computed analytically; price slider shows
 *  surplus (teal) or shortage (rose) shaded band. */
function paintMarket(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, labels?: string[]) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    if (labels?.[0]) { ctx.fillStyle = '#475569'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(`market: ${labels[0].slice(0, 40)}`, w / 2, 11); }
    const dShift = ((v.demand ?? 50) - 50) * 0.6, sShift = ((v.supply ?? 50) - 50) * 0.6;
    // model: Qd = 60 - 0.6P + dShift*20 ... use P-intercepts for curves
    const Dint = 100 + dShift, Sint = 10 - sShift;         // P-intercepts
    const eqP = (Dint + Sint) / 2, eqQ = Dint - eqP;       // symmetric slopes ±1
    const px = (q: number) => 20 + q * (w - 60) / 100;
    const py = (p: number) => h - 24 - p * (h - 44) / 110;
    // axes
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(20, h - 24); ctx.lineTo(w - 20, h - 24); ctx.moveTo(20, h - 24); ctx.lineTo(20, 12); ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Q', w - 14, h - 24); ctx.fillText('P', 14, 10);
    // curves
    ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(px(0), py(Dint)); ctx.lineTo(px(Math.min(100, Dint)), py(Math.max(0, Dint - 100))); ctx.stroke();
    ctx.strokeStyle = '#0284c7'; ctx.beginPath();
    ctx.moveTo(px(0), py(Math.max(0, Sint))); ctx.lineTo(px(Math.min(100, 110 - Sint)), py(Math.min(110, Sint + 100))); ctx.stroke();
    ctx.fillStyle = '#e11d48'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('D', px(Math.min(96, Dint)) - 6, py(Math.max(4, Dint - Math.min(96, Dint))) - 6);
    ctx.fillStyle = '#0284c7'; ctx.fillText('S', px(Math.min(96, 110 - Sint)) - 4, py(Math.min(108, Sint + Math.min(96, 110 - Sint))) - 6);
    // equilibrium
    ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(px(eqQ), py(eqP)); ctx.lineTo(px(eqQ), h - 24); ctx.moveTo(20, py(eqP)); ctx.lineTo(px(eqQ), py(eqP)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(px(eqQ), py(eqP), 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(`P*₹${Math.round(eqP)}`, px(eqQ) + 24, py(eqP) - 8);
    ctx.fillText(`Q*${Math.round(eqQ)}`, px(eqQ), h - 10);
    // surplus / shortage band when price slider ≠ eq
    const pSet = 10 + (v.price ?? 0);
    if (Math.abs(pSet - eqP) > 3) {
        const qD = Dint - pSet, qS = pSet - Sint;
        const gap = Math.abs(qD - qS);
        ctx.fillStyle = pSet > eqP ? 'rgba(20,184,166,0.25)' : 'rgba(244,63,94,0.25)';
        const x1 = px(Math.max(0, Math.min(qD, qS))), x2 = px(Math.min(100, Math.max(qD, qS)));
        ctx.fillRect(x1, py(pSet) - 4, x2 - x1, 8);
        ctx.fillStyle = pSet > eqP ? '#0d9488' : '#e11d48'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText(`${pSet > eqP ? 'SURPLUS' : 'SHORTAGE'}: ${Math.round(gap)} units`, w / 2, py(pSet) - 8);
    }
}

/** maplab — stylised Indian subcontinent; era slider sweeps empires
 *  (Maurya → Gupta → Delhi Sultanate → Mughal → British) with shaded
 *  extent + capital pin. Teaches extent/change-over-time, not trivia. */
const INDIA_POLY: Array<[number, number]> = [
    [0.30, 0.12], [0.42, 0.06], [0.55, 0.08], [0.62, 0.16], [0.78, 0.14], [0.88, 0.22],
    [0.90, 0.30], [0.84, 0.36], [0.80, 0.42], [0.74, 0.46], [0.70, 0.55], [0.66, 0.66],
    [0.60, 0.78], [0.55, 0.90], [0.50, 0.96], [0.45, 0.88], [0.40, 0.78], [0.36, 0.68],
    [0.30, 0.58], [0.26, 0.48], [0.22, 0.40], [0.24, 0.30], [0.28, 0.20],
];
const ERAS = [
    { name: 'Maurya Empire ~322 BCE', cap: 'Pataliputra', cx: 0.62, cy: 0.38, ext: 0.85 },
    { name: 'Gupta Empire ~350 CE', cap: 'Pataliputra', cx: 0.62, cy: 0.38, ext: 0.60 },
    { name: 'Delhi Sultanate ~1200 CE', cap: 'Delhi', cx: 0.42, cy: 0.28, ext: 0.55 },
    { name: 'Mughal Empire ~1700 CE', cap: 'Agra', cx: 0.44, cy: 0.32, ext: 0.75 },
    { name: 'British Raj ~1900 CE', cap: 'Calcutta', cx: 0.72, cy: 0.44, ext: 0.92 },
];
function paintMaplab(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const era = ERAS[Math.min(4, Math.max(0, Math.floor((v.era ?? 0) / 20)))];
    const P = (p: [number, number]) => [p[0] * w, p[1] * h] as const;
    // extent shading (nested polygon scaled toward centroid)
    const cx = 0.5, cy = 0.45;
    ctx.beginPath();
    INDIA_POLY.forEach((p, i) => { const [x, y] = P([cx + (p[0] - cx) * era.ext, cy + (p[1] - cy) * era.ext]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.closePath();
    const g = ctx.createRadialGradient(cx * w, cy * h, 10, cx * w, cy * h, w * 0.5);
    g.addColorStop(0, 'rgba(245,158,11,0.55)'); g.addColorStop(1, 'rgba(245,158,11,0.15)');
    ctx.fillStyle = g; ctx.fill();
    // outline
    ctx.beginPath();
    INDIA_POLY.forEach((p, i) => { const [x, y] = P(p); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.closePath();
    ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2; ctx.stroke();
    // capital pin
    ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(era.cx * w, era.cy * h, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(era.cap, era.cx * w, era.cy * h - 8);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(era.name, w / 2, h - 14);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText(`extent ≈ ${Math.round(era.ext * 100)}% of the subcontinent`, w / 2, h - 2);
}

/** election — proportional seats horseshoe. Two sliders = vote share for
 *  party A and B (rest to C); 100 seats laid in arc rows; majority line. */
function paintElection(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, labels?: string[]) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    const a = Math.round((v.partyA ?? 40)), b = Math.round((v.partyB ?? 35));
    const c = Math.max(0, 100 - a - b);
    const seats = [Math.round(a), Math.round(b), c];
    const cols = ['#6366f1', '#f59e0b', '#10b981'];
    const names = [0, 1, 2].map(i => (labels?.[i] ?? String.fromCharCode(65 + i)).slice(0, 14));
    // horseshoe rows
    let idx = 0; const seatAt: Array<{ x: number; y: number; col: string }> = [];
    const partySeats = seats.map(s => Math.round(s));
    for (let p = 0; p < 3; p++) for (let i = 0; i < partySeats[p] && idx < 100; i++) { seatAt.push({ x: 0, y: 0, col: cols[p] }); idx++; }
    // lay out in 5 arc rows of 20
    for (let i = 0; i < seatAt.length; i++) {
        const row = Math.floor(i / 20), j = i % 20;
        const r = 30 + row * 16;
        const ang = Math.PI - (j + 0.5) * Math.PI / 20;
        seatAt[i].x = w / 2 + Math.cos(ang) * (r + 40);
        seatAt[i].y = h * 0.92 - Math.sin(ang) * (r + 20);
    }
    seatAt.forEach(s => { ctx.fillStyle = s.col; ctx.beginPath(); ctx.arc(s.x, s.y, 3.4, 0, Math.PI * 2); ctx.fill(); });
    // majority line marker
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    const win = seats[0] > 50 ? names[0] : seats[1] > 50 ? names[1] : seats[2] > 50 ? names[2] : null;
    ctx.fillText(`${names[0]}:${seats[0]}  ${names[1]}:${seats[1]}  ${names[2]}:${seats[2]}   ${win ? `— ${win} forms government!` : '— no majority (coalition)'}`, w / 2, h - 10);
}

/** sampler — probability/stats. trials slider 0..500; deterministic
 *  seeded coin flips accumulate; histogram of heads-count over 10-trial
 *  batches + running proportion converging on 0.5 — LLN made visible. */
function paintSampler(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, labels?: string[]) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    if (labels?.[0]) { ctx.fillStyle = '#475569'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(labels[0].slice(0, 44), w / 2, 11); }
    const n = Math.min(500, Math.max(0, Math.round(v.trials ?? 0)));
    // deterministic flips — LCG seeded by index (same every render)
    let heads = 0, run: number[] = [];
    for (let i = 0; i < n; i++) { const x = ((i * 2654435761) >>> 0) / 4294967296; heads += x < 0.5 ? 1 : 0; if (i % 10 === 9) run.push(heads / (i + 1)); }
    const p = n ? heads / n : 0;
    // axes
    ctx.strokeStyle = '#475569'; ctx.beginPath(); ctx.moveTo(24, h - 22); ctx.lineTo(w - 16, h - 22); ctx.stroke();
    // target line at 0.5
    ctx.strokeStyle = '#e11d48'; ctx.setLineDash([4, 4]); ctx.beginPath();
    ctx.moveTo(24, h - 22 - 0.5 * (h - 60)); ctx.lineTo(w - 16, h - 22 - 0.5 * (h - 60)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#e11d48'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('0.50', w - 30, h - 26 - 0.5 * (h - 60));
    // convergence path
    ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.beginPath();
    run.forEach((r, i) => { const x = 30 + i * (w - 60) / Math.max(1, run.length - 1), y = h - 22 - r * (h - 60); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(n === 0 ? 'run trials — watch the proportion settle' : `${n} flips → heads ${(p * 100).toFixed(1)}%  (target 50%)`, w / 2, h - 6);
}

/** codeflow — step-through trace of a loop program; step slider
 *  highlights the executing line and updates the variable table — the
 *  "debugger" mental model for CS/IP students. */
const CODE_PROG = ['i = 1', 'sum = 0', 'while i <= 5:', '    sum = sum + i', '    i = i + 1', 'print(sum)'];
const CODE_STEPS: Array<{ line: number; i: number; sum: number }> = [];
for (let it = 1; it <= 5; it++) {
    if (it === 1) { CODE_STEPS.push({ line: 0, i: 1, sum: 0 }, { line: 1, i: 1, sum: 0 }); }
    CODE_STEPS.push({ line: 2, i: it, sum: it === 1 ? 0 : CODE_STEPS[CODE_STEPS.length - 1].sum });
    CODE_STEPS.push({ line: 3, i: it, sum: CODE_STEPS[CODE_STEPS.length - 1].sum + it });
    CODE_STEPS.push({ line: 4, i: it + 1, sum: CODE_STEPS[CODE_STEPS.length - 1].sum });
}
CODE_STEPS.push({ line: 5, i: 6, sum: 15 });
function paintCodeflow(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, labels?: string[]) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const st = CODE_STEPS[Math.min(CODE_STEPS.length - 1, Math.max(0, Math.round(v.step ?? 0)))];
    const prog = labels?.length ? labels.slice(0, 6).map(l => `    ${l.slice(0, 26)}`) : CODE_PROG;
    // code pane
    prog.forEach((ln, i) => {
        const y = 20 + i * 22;
        if (i === (labels?.length ? Math.min(labels.length - 1, st.line) : st.line)) {
            ctx.fillStyle = 'rgba(56,189,248,0.25)'; ctx.fillRect(8, y - 13, w * 0.58, 20);
            ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.moveTo(4, y - 3); ctx.lineTo(10, y - 3); ctx.lineTo(7, y); ctx.fill();
        }
        ctx.fillStyle = i === st.line ? '#e0f2fe' : '#94a3b8'; ctx.font = '11px monospace'; ctx.textAlign = 'left';
        ctx.fillText(ln, 14, y);
    });
    // variable table
    ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(w * 0.64, 14, w * 0.32, 70, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#7dd3fc'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('VARIABLES', w * 0.8, 30);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 12px monospace';
    ctx.fillText(`i = ${st.i}`, w * 0.8, 50);
    ctx.fillText(`sum = ${st.sum}`, w * 0.8, 68);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('trace: follow each line like the CPU does', w / 2, h - 8);
}

/** demograph — population pyramid for sociology/home-science. shape
 *  slider morphs young→aging structure; real dependency ratio computed
 *  from the bars — the "demographic dividend" made tactile. */
function paintDemograph(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t?: number, labels?: string[]) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    if (labels?.[0]) { ctx.fillStyle = '#475569'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(labels[0].slice(0, 44), w / 2, 11); }
    const shape = (v.shape ?? 20) / 100;              // 0 = young/expansive, 1 = aging
    const groups = ['0–14', '15–29', '30–44', '45–59', '60–74', '75+'];
    const weights = groups.map((_, i) => {
        const youth = Math.max(0, 1 - i * 0.35) * (1 - shape);
        const mid = Math.max(0, 1 - Math.abs(i - 2.5) / 3) * shape * 0.9;
        const aged = i >= 4 ? shape * (i - 3) * 0.5 : 0;
        return Math.min(1, youth + mid + aged + 0.06);
    });
    const cx = w / 2;
    ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('male ◂', cx - w * 0.22, 12); ctx.fillText('▸ female', cx + w * 0.22, 12);
    groups.forEach((g, i) => {
        const y = 20 + i * ((h - 50) / 6), bw = weights[i] * (w * 0.32);
        ctx.fillStyle = '#60a5fa'; ctx.fillRect(cx - bw - 4, y, bw, (h - 50) / 6 - 4);
        ctx.fillStyle = '#f472b6'; ctx.fillRect(cx + 4, y, bw * 0.96, (h - 50) / 6 - 4);
        ctx.fillStyle = '#475569'; ctx.font = '8px sans-serif';
        ctx.fillText(g, cx, y + 9);
    });
    const young = weights[0] + weights[1] * 0.5, working = weights[2] + weights[3] + weights[1] * 0.5, old = weights[4] + weights[5];
    const dep = Math.round((young + old) / Math.max(0.3, working) * 100);
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`dependency ratio ≈ ${dep} — ${dep > 80 ? 'few workers support many' : dep > 55 ? 'dividend window — workers dominate' : 'aging society — workers strained'}`, w / 2, h - 8);
}

/** geolab — monsoon mechanics on the Indian map. season slider morphs
 *  SW-monsoon (June, arrows NE from Arabian Sea/Bay of Bengal, rain bands)
 *  to retreating NE monsoon (Oct–Dec, arrows SW, Coromandel rain). Real
 *  NCERT geography: pressure gradient + land-sea breeze, scaled up. */
function paintGeolab(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'dark');
    const season = Math.min(99, Math.max(0, v.season ?? 0)) / 99;  // 0=June SW … 1=Dec NE
    const P = (p: [number, number]) => [p[0] * w, p[1] * h] as const;
    // landmass
    ctx.beginPath();
    INDIA_POLY.forEach((p, i) => { const [x, y] = P(p); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.closePath();
    ctx.fillStyle = 'rgba(74,222,128,0.16)'; ctx.fill();
    ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2; ctx.stroke();
    // wind arrows — animate along direction
    const flow = 1 - season * 2;  // +1 June(SW→NE) … -1 Dec(NE→SW)
    const arrow = (x1: number, y1: number, x2: number, y2: number, phase: number) => {
        const prog = ((t / 1400 + phase) % 1);
        const x = x1 + (x2 - x1) * prog, y = y1 + (y2 - y1) * prog;
        ctx.strokeStyle = 'rgba(125,211,252,0.85)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + (x2 - x1) * Math.min(1, prog + 0.25), y1 + (y2 - y1) * Math.min(1, prog + 0.25)); ctx.stroke();
        const ang = Math.atan2(y2 - y1, x2 - x1);
        ctx.fillStyle = '#7dd3fc';
        ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * 8, y + Math.sin(ang) * 8);
        ctx.lineTo(x + Math.cos(ang + 2.5) * 5, y + Math.sin(ang + 2.5) * 5);
        ctx.lineTo(x + Math.cos(ang - 2.5) * 5, y + Math.sin(ang - 2.5) * 5); ctx.fill();
    };
    if (flow > 0.15) {   // SW monsoon — ocean → land, south-west to north-east
        arrow(w * 0.10, h * 0.85, w * 0.45, h * 0.45, 0.0);    // Arabian Sea branch
        arrow(w * 0.12, h * 0.70, w * 0.40, h * 0.40, 0.4);
        arrow(w * 0.95, h * 0.62, w * 0.68, h * 0.38, 0.2);    // Bay of Bengal branch
        arrow(w * 0.98, h * 0.50, w * 0.74, h * 0.32, 0.6);
    } else if (flow < -0.15) {  // retreating NE — land → sea, picks up Coromandel rain
        arrow(w * 0.55, h * 0.25, w * 0.30, h * 0.60, 0.1);
        arrow(w * 0.70, h * 0.30, w * 0.60, h * 0.70, 0.5);
        arrow(w * 0.75, h * 0.35, w * 0.72, h * 0.75, 0.8);
    }
    // rain bands over the right coast
    const rainAmt = flow > 0.15 ? 0.9 : flow < -0.15 ? 0.4 : 0;
    if (rainAmt > 0) {
        ctx.fillStyle = `rgba(96,165,250,${0.5 * rainAmt})`;
        for (let i = 0; i < 14; i++) {
            const rx = w * (0.35 + (i * 37 % 50) / 100), ry = h * (0.3 + (i * 23 % 45) / 100);
            ctx.fillRect(rx, ry + ((t / 12 + i * 17) % 12), 2, 6);
        }
    }
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(flow > 0.15 ? 'JUNE — SW monsoon: ocean → land, heavy rain' : flow < -0.15 ? 'OCT–DEC — retreating NE monsoon: Coromandel rain' : 'transition — winds reversing', w / 2, h - 12);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('low pressure over land pulls moist sea air — the land-sea breeze at continental scale', w / 2, h - 1);
}

// ─── flagship diagram painters (NCERT-spec, hand-authored) ─────────
// Each draws a labeled structure; `sel` (v.sel) highlights the tapped part.

function paintDiagramSel(ctx: CanvasRenderingContext2D, w: number, h: number,
    spots: Array<{ label: string; fn: string; x: number; y: number; r: number }>, sel: number) {
    if (sel < 0 || sel >= spots.length) return;
    const s = spots[sel];
    ctx.save();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r * w + 8, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    const lx = Math.min(w - 190, s.x * w + s.r * w + 14), ly = Math.max(30, s.y * h - 20);
    ctx.fillStyle = 'rgba(15,23,42,0.92)'; ctx.beginPath(); ctx.roundRect(lx - 8, ly - 18, 182, 46, 8); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(s.label, lx, ly - 2);
    ctx.fillStyle = '#cbd5e1'; ctx.font = '9px sans-serif';
    ctx.fillText(s.fn.slice(0, 42), lx, ly + 12);
    ctx.restore();
}

/** dgm_synapse — axon terminal + synapse (NCERT 18.3 spec): incoming axon,
 *  terminal knob with vesicles, cleft, post-synaptic membrane w/ receptors. */
function paintSynapse(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const cx = w * 0.5;
    // incoming axon (top-left tube)
    ctx.fillStyle = '#4ade80';
    ctx.beginPath(); ctx.moveTo(w * 0.18, 0); ctx.quadraticCurveTo(w * 0.24, h * 0.22, w * 0.36, h * 0.30);
    ctx.lineTo(w * 0.50, h * 0.28); ctx.quadraticCurveTo(w * 0.40, h * 0.16, w * 0.36, 0); ctx.closePath(); ctx.fill();
    // terminal knob (bulb)
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.ellipse(cx, h * 0.45, w * 0.20, h * 0.28, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2.5; ctx.stroke();
    // synaptic vesicles — drifting dots inside knob
    const pulse = 1 + Math.sin(t / 400) * 0.06;
    for (let i = 0; i < 14; i++) {
        const vx = cx + Math.cos(i * 1.7) * w * 0.10 * (0.4 + (i % 3) * 0.3);
        const vy = h * 0.45 + Math.sin(i * 2.3) * h * 0.14;
        ctx.fillStyle = '#fb923c';
        ctx.beginPath(); ctx.arc(vx, vy, 7 * pulse, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff7ed';
        ctx.beginPath(); ctx.arc(vx, vy, 3, 0, Math.PI * 2); ctx.fill();
    }
    // pre-synaptic membrane — knob's bottom edge
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(cx - w * 0.17, h * 0.70); ctx.quadraticCurveTo(cx, h * 0.78, cx + w * 0.17, h * 0.70); ctx.stroke();
    // released neurotransmitters in the cleft — animated fall
    for (let i = 0; i < 8; i++) {
        const p = ((t / 900 + i * 0.15) % 1);
        ctx.fillStyle = '#f472b6';
        ctx.beginPath(); ctx.arc(cx - w * 0.10 + i * w * 0.03, h * (0.72 + p * 0.09), 2.6, 0, Math.PI * 2); ctx.fill();
    }
    // post-synaptic membrane (blue) with receptor channels
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(cx - w * 0.22, h * 0.84); ctx.quadraticCurveTo(cx, h * 0.92, cx + w * 0.22, h * 0.84); ctx.stroke();
    for (let i = 0; i < 4; i++) {
        const rx = cx - w * 0.15 + i * w * 0.10;
        const ry = h * (0.855 + Math.sin((rx / w) * Math.PI) * 0.035);
        ctx.fillStyle = '#a78bfa';
        ctx.fillRect(rx - 4, ry - 10, 8, 20);
    }
    // label
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('signal jumps the gap — chemicals, not wires', w / 2, h - 8);
    paintDiagramSel(ctx, w, h, SYNAPSE_SPOTS, v.sel ?? -1);
}
const SYNAPSE_SPOTS = [
    { label: 'Axon', fn: 'carries the nerve signal down from the cell body', x: 0.30, y: 0.12, r: 0.10 },
    { label: 'Axon terminal', fn: 'the swollen end that passes the message on', x: 0.50, y: 0.42, r: 0.14 },
    { label: 'Synaptic vesicles', fn: 'sacs holding the chemical messengers', x: 0.50, y: 0.40, r: 0.10 },
    { label: 'Pre-synaptic membrane', fn: 'releases neurotransmitters into the gap', x: 0.50, y: 0.73, r: 0.08 },
    { label: 'Synaptic cleft', fn: 'the tiny gap the chemicals cross', x: 0.50, y: 0.79, r: 0.06 },
    { label: 'Post-synaptic membrane', fn: 'receives the signal on the next cell', x: 0.50, y: 0.88, r: 0.07 },
    { label: 'Receptors', fn: 'protein docks that catch the neurotransmitters', x: 0.60, y: 0.87, r: 0.05 },
    { label: 'Neurotransmitters', fn: 'the chemical message crossing the gap', x: 0.42, y: 0.78, r: 0.05 },
];

// ─── genetics diagram painters (hand-authored — NCERT figure spec) ─────────
/** dgm_gen_dihybrid — 4x4 Punnett square, RY cross, 9:3:3:1 phenotype colors. */
function paintDihybrid(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const gx = w * 0.14, gy = h * 0.12, cs = w * 0.19, cs2 = h * 0.20;
    const gams = ['RY', 'Ry', 'rY', 'ry'];
    ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    gams.forEach((g, i) => {
        ctx.fillStyle = '#93c5fd';
        ctx.fillText(g, gx + (i + 0.5) * cs, gy - 6);
        ctx.fillText(g, gx - 12, gy + (i + 0.5) * cs2 + 3);
    });
    // 9 R_Y_ (yellow round), 3 R_yy (yellow wrinkled), 3 rrY_ (green round), 1 rryy (green wrinkled)
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
        const R = (r < 2 ? 'R' : 'r') + (c < 2 ? 'R' : 'r');
        const Y = (r % 2 === 0 ? 'Y' : 'y') + (c % 2 === 0 ? 'Y' : 'y');
        const domR = R.includes('R'), domY = Y.includes('Y');
        ctx.fillStyle = domR && domY ? '#fde047' : domR ? '#fcd34d' : domY ? '#86efac' : '#4ade80';
        if (domR && domY) ctx.fillStyle = '#fde047';
        if (domR && !domY) ctx.fillStyle = '#fbbf24';
        if (!domR && domY) ctx.fillStyle = '#86efac';
        if (!domR && !domY) ctx.fillStyle = '#4ade80';
        ctx.fillRect(gx + c * cs + 1, gy + r * cs2 + 1, cs - 2, cs2 - 2);
        ctx.fillStyle = '#1e293b'; ctx.font = '8px sans-serif';
        ctx.fillText(R + Y, gx + (c + 0.5) * cs, gy + (r + 0.5) * cs2 + 3);
    }
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1;
    ctx.strokeRect(gx, gy, cs * 4, cs2 * 4);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('9 round-yellow : 3 wrinkled-yellow : 3 round-green : 1 wrinkled-green', w / 2, h - 8);
    paintDiagramSel(ctx, w, h, DIHYBRID_SPOTS, v.sel ?? -1);
}
const DIHYBRID_SPOTS = [
    { label: 'Gametes (top)', fn: 'RY, Ry, rY, ry — the F1 parent splits two traits', x: 0.52, y: 0.05, r: 0.10 },
    { label: 'Gametes (side)', fn: 'the other F1 parent — same four alleles', x: 0.07, y: 0.50, r: 0.08 },
    { label: 'R_Y_ — round yellow', fn: '9 boxes — both dominants show', x: 0.235, y: 0.22, r: 0.09 },
    { label: 'R_yy — wrinkled yellow', fn: '3 boxes — dominant shape, recessive colour', x: 0.615, y: 0.42, r: 0.08 },
    { label: 'rrY_ — round green', fn: '3 boxes — recessive shape, dominant colour', x: 0.235, y: 0.72, r: 0.08 },
    { label: 'rryy — wrinkled green', fn: 'the single double-recessive corner', x: 0.805, y: 0.82, r: 0.07 },
    { label: '9:3:3:1 ratio', fn: 'the F2 signature of independent assortment', x: 0.50, y: 0.95, r: 0.10 },
];
/** dgm_gen_sexdet — XX mother x XY father: sperm X/Y vs eggs X/X. */
function paintSexDet(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    // parents
    ctx.fillStyle = '#f9a8d4'; ctx.beginPath(); ctx.arc(w * 0.22, h * 0.16, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.arc(w * 0.78, h * 0.16, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('XX', w * 0.22, h * 0.165); ctx.fillText('XY', w * 0.78, h * 0.165);
    ctx.fillStyle = '#f9a8d4'; ctx.font = '8.5px sans-serif';
    ctx.fillText('mother', w * 0.22, h * 0.16 + 26);
    ctx.fillStyle = '#93c5fd'; ctx.fillText('father', w * 0.78, h * 0.16 + 26);
    // gametes: eggs X X ; sperm X Y
    ([['X', 0.14], ['X', 0.30]] as Array<[string, number]>).forEach(([g, x]) => {
        ctx.fillStyle = '#fbcfe8'; ctx.beginPath(); ctx.ellipse(w * x, h * 0.40, 13, 9, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#831843'; ctx.font = 'bold 9px sans-serif'; ctx.fillText(g, w * x, h * 0.405);
    });
    ([['X', 0.62], ['Y', 0.86]] as Array<[string, number]>).forEach(([g, x], i) => {
        ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.ellipse(w * x, h * 0.40, 10, 7, 0, 0, Math.PI * 2); ctx.fillStyle = '#bfdbfe'; ctx.fill();
        ctx.beginPath(); ctx.moveTo(w * x + 10, h * 0.40); ctx.lineTo(w * x + 20, h * 0.38 + i * 4); ctx.stroke();
        ctx.fillStyle = '#1e3a8a'; ctx.font = 'bold 9px sans-serif'; ctx.fillText(g, w * x, h * 0.405);
    });
    // offspring row
    const kids: Array<[string, number, string, string]> = [
        ['XX', 0.18, '#f9a8d4', 'daughter'], ['XX', 0.36, '#f9a8d4', 'daughter'],
        ['XY', 0.60, '#60a5fa', 'son'], ['XY', 0.82, '#60a5fa', 'son']];
    kids.forEach(([k, x, col, who]) => {
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(w * x, h * 0.70, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1e293b'; ctx.font = 'bold 9px sans-serif'; ctx.fillText(k, w * x, h * 0.705);
        ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif'; ctx.fillText(who, w * x, h * 0.70 + 22);
        ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(w * x, h * 0.44 + 10); ctx.lineTo(w * x, h * 0.70 - 14); ctx.stroke();
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the sperm decides — father supplies X or Y', w / 2, h - 8);
    paintDiagramSel(ctx, w, h, SEXDET_SPOTS, v.sel ?? -1);
}
const SEXDET_SPOTS = [
    { label: 'Mother (XX)', fn: 'homogametic — every egg carries X', x: 0.22, y: 0.16, r: 0.07 },
    { label: 'Father (XY)', fn: 'heterogametic — sperm carry X or Y', x: 0.78, y: 0.16, r: 0.07 },
    { label: 'Eggs', fn: 'all X — no choice from this side', x: 0.22, y: 0.40, r: 0.09 },
    { label: 'X sperm', fn: 'meets an egg → daughter', x: 0.62, y: 0.40, r: 0.06 },
    { label: 'Y sperm', fn: 'meets an egg → son', x: 0.86, y: 0.40, r: 0.06 },
    { label: 'Daughters', fn: 'XX — 50% of the outcomes', x: 0.27, y: 0.70, r: 0.10 },
    { label: 'Sons', fn: 'XY — the other 50%', x: 0.71, y: 0.70, r: 0.10 },
];
/** dgm_gen_pedigree — 3-generation chart, squares/circles, filled=affected. */
function paintPedigree(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const sym = (x: number, y: number, male: boolean, fill: number) => {
        ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.6;
        ctx.beginPath();
        if (male) ctx.rect(x - 9, y - 9, 18, 18);
        else ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
        if (fill) {
            ctx.fillStyle = '#f87171';
            ctx.beginPath();
            if (male) ctx.rect(x - 9, y - 9, 18 * fill, 18);
            else { ctx.moveTo(x, y); ctx.arc(x, y, 10, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * fill); }
            ctx.fill();
        }
    };
    const link = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    };
    // gen I: affected father + carrier mother (half-filled)
    sym(w * 0.28, h * 0.18, true, 1); sym(w * 0.42, h * 0.18, false, 0.5);
    link(w * 0.28 + 9, h * 0.18, w * 0.42 - 10, h * 0.18);
    link(w * 0.35, h * 0.18, w * 0.35, h * 0.40);
    // gen II sibship: affected son, carrier daughter, normal daughter
    sym(w * 0.18, h * 0.50, true, 1); sym(w * 0.35, h * 0.50, false, 0.5); sym(w * 0.52, h * 0.50, false, 0);
    link(w * 0.12, h * 0.40, w * 0.58, h * 0.40);
    link(w * 0.18, h * 0.40, w * 0.18, h * 0.50 - 9); link(w * 0.35, h * 0.40, w * 0.35, h * 0.50 - 10); link(w * 0.52, h * 0.40, w * 0.52, h * 0.50 - 10);
    // son's partner + gen III affected grandson
    sym(w * 0.74, h * 0.50, false, 0.5); link(w * 0.18 + 9, h * 0.50, w * 0.74 - 10, h * 0.50);
    link(w * 0.46, h * 0.50, w * 0.46, h * 0.68);
    sym(w * 0.38, h * 0.82, true, 1); sym(w * 0.54, h * 0.82, false, 0.5);
    link(w * 0.30, h * 0.68, w * 0.62, h * 0.68);
    link(w * 0.38, h * 0.68, w * 0.38, h * 0.82 - 9); link(w * 0.54, h * 0.68, w * 0.54, h * 0.82 - 10);
    // legend
    ctx.font = '8px sans-serif'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText('■ square = male   ● circle = female   filled = affected   half = carrier', 12, h - 8);
    paintDiagramSel(ctx, w, h, PEDIGREE_SPOTS, v.sel ?? -1);
}
const PEDIGREE_SPOTS = [
    { label: 'Affected male', fn: 'filled square — grandfather shows the trait', x: 0.28, y: 0.18, r: 0.05 },
    { label: 'Carrier female', fn: 'half-filled circle — has the allele, not the trait', x: 0.42, y: 0.18, r: 0.05 },
    { label: 'Mating line', fn: 'horizontal bar joining the parents', x: 0.35, y: 0.18, r: 0.04 },
    { label: 'Affected son', fn: 'inherited the allele — filled square, gen II', x: 0.18, y: 0.50, r: 0.05 },
    { label: 'Normal daughter', fn: 'empty circle — neither affected nor carrier', x: 0.52, y: 0.50, r: 0.05 },
    { label: 'Affected grandson', fn: 'the trait skips a generation — gen III', x: 0.38, y: 0.82, r: 0.05 },
    { label: 'Sibship line', fn: 'the horizontal bar of siblings', x: 0.35, y: 0.40, r: 0.04 },
];
/** dgm_gen_incdom — snapdragon: RR red x rr white → Rr pink → 1:2:1 F2. */
function paintIncDom(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const flower = (x: number, y: number, col: string, lbl: string) => {
        ctx.fillStyle = col;
        for (let i = 0; i < 5; i++) {
            const a = i * Math.PI * 2 / 5 - Math.PI / 2;
            ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * 8, y + Math.sin(a) * 8, 6, 4, a, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e2e8f0'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(lbl, x, y + 24);
    };
    // P generation
    flower(w * 0.25, h * 0.16, '#ef4444', 'RR red');
    flower(w * 0.75, h * 0.16, '#f8fafc', 'rr white');
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('×', w * 0.50, h * 0.16);
    ctx.fillStyle = '#94a3b8'; ctx.font = '8.5px sans-serif'; ctx.fillText('F1', w * 0.50, h * 0.44);
    // F1 all pink
    flower(w * 0.50, h * 0.42, '#fb7185', 'Rr pink — all of them');
    ctx.fillStyle = '#94a3b8'; ctx.font = '8.5px sans-serif'; ctx.fillText('F2  (Rr × Rr)', w * 0.50, h * 0.68);
    // F2: 1 red : 2 pink : 1 white
    flower(w * 0.22, h * 0.80, '#ef4444', '1 RR red');
    flower(w * 0.45, h * 0.80, '#fb7185', 'Rr pink');
    flower(w * 0.60, h * 0.80, '#fb7185', 'Rr pink');
    flower(w * 0.80, h * 0.80, '#f8fafc', '1 rr white');
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('neither allele dominates — the blend appears, 1:2:1', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, INCDOM_SPOTS, v.sel ?? -1);
}
const INCDOM_SPOTS = [
    { label: 'Red parent (RR)', fn: 'homozygous dominant — pure red', x: 0.25, y: 0.16, r: 0.06 },
    { label: 'White parent (rr)', fn: 'homozygous recessive — pure white', x: 0.75, y: 0.16, r: 0.06 },
    { label: 'F1 — all pink', fn: 'every hybrid is the blend — no pure colour', x: 0.50, y: 0.42, r: 0.07 },
    { label: 'F2 red (1)', fn: 'one quarter returns to pure red', x: 0.22, y: 0.80, r: 0.06 },
    { label: 'F2 pink (2)', fn: 'half the offspring stay the blend', x: 0.52, y: 0.80, r: 0.08 },
    { label: 'F2 white (1)', fn: 'one quarter returns to pure white', x: 0.80, y: 0.80, r: 0.06 },
    { label: '1:2:1 ratio', fn: 'the incomplete-dominance signature — same genotype and phenotype ratios', x: 0.50, y: 0.94, r: 0.09 },
];
/** dgm_gen_chromatin — DNA → nucleosome → solenoid → chromosome hierarchy. */
function paintChromatin(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    // level 1: DNA double helix (left)
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        const y = h * 0.08 + i * h * 0.028;
        const a = i * 0.9 + t / 800;
        const x1 = w * 0.08 + Math.sin(a) * w * 0.02, x2 = w * 0.08 - Math.sin(a) * w * 0.02;
        ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y + h * 0.014); ctx.stroke();
        ctx.strokeStyle = i % 2 ? '#f472b6' : '#60a5fa';
    }
    ctx.fillStyle = '#93c5fd'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('DNA (2 nm)', w * 0.08, h * 0.36);
    // arrow
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(w * 0.14, h * 0.18); ctx.lineTo(w * 0.20, h * 0.18); ctx.stroke();
    // level 2: beads on a string — nucleosomes
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(w * 0.21, h * 0.16); ctx.bezierCurveTo(w * 0.30, h * 0.08, w * 0.34, h * 0.26, w * 0.44, h * 0.16); ctx.stroke();
    for (let i = 0; i < 4; i++) {
        const x = w * (0.23 + i * 0.065), y = h * (0.15 + Math.sin(i * 1.2) * 0.03);
        ctx.fillStyle = '#c4b5fd'; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1; ctx.stroke();
    }
    ctx.fillStyle = '#c4b5fd'; ctx.fillText('nucleosome (11 nm)', w * 0.33, h * 0.32);
    // arrow
    ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(w * 0.46, h * 0.18); ctx.lineTo(w * 0.52, h * 0.18); ctx.stroke();
    // level 3: solenoid — coiled tube
    ctx.strokeStyle = '#fb923c'; ctx.lineWidth = 3;
    for (let i = 0; i < 7; i++) {
        const x = w * 0.54 + i * w * 0.012;
        ctx.beginPath(); ctx.arc(x, h * 0.16, 9, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = '#fdba74'; ctx.fillText('solenoid (30 nm)', w * 0.58, h * 0.32);
    // arrow down
    ctx.beginPath(); ctx.moveTo(w * 0.58, h * 0.36); ctx.lineTo(w * 0.58, h * 0.44); ctx.stroke();
    // level 4: chromosome — X shape
    ctx.fillStyle = '#f87171';
    ctx.beginPath(); ctx.roundRect(w * 0.52, h * 0.46, w * 0.05, h * 0.22, 6); ctx.fill();
    ctx.beginPath(); ctx.roundRect(w * 0.58, h * 0.46, w * 0.05, h * 0.22, 6); ctx.fill();
    ctx.fillStyle = '#dc2626';
    ctx.beginPath(); ctx.roundRect(w * 0.52, h * 0.55, w * 0.11, h * 0.05, 4); ctx.fill();
    ctx.fillStyle = '#fca5a5'; ctx.font = '8px sans-serif';
    ctx.fillText('chromosome (700 nm)', w * 0.575, h * 0.75);
    // packaging ratio note
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('2 m of DNA → 5 µm nucleus — the ~10,000× fold', w / 2, h - 8);
    paintDiagramSel(ctx, w, h, CHROMATIN_SPOTS, v.sel ?? -1);
}
const CHROMATIN_SPOTS = [
    { label: 'DNA double helix', fn: '2 nm wide — the raw thread', x: 0.08, y: 0.18, r: 0.07 },
    { label: 'Histone beads', fn: 'protein octamers the DNA wraps twice around', x: 0.30, y: 0.15, r: 0.07 },
    { label: 'Beads-on-a-string', fn: '11 nm fibre — the first fold', x: 0.38, y: 0.20, r: 0.07 },
    { label: 'Solenoid', fn: '30 nm fibre — beads packed into a coil', x: 0.58, y: 0.16, r: 0.08 },
    { label: 'Chromosome', fn: 'the final pack — metaphase, 700 nm across', x: 0.575, y: 0.56, r: 0.10 },
    { label: 'Centromere', fn: 'the pinch holding sister chromatids together', x: 0.575, y: 0.57, r: 0.04 },
    { label: '10,000× fold', fn: 'two metres of thread fits inside a cell', x: 0.50, y: 0.94, r: 0.10 },
];
/** dgm_gen_fingerprint — gel lanes comparing suspects to a crime-scene sample. */
function paintFingerprint(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    // gel frame
    ctx.fillStyle = '#0f172a'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(w * 0.12, h * 0.08, w * 0.76, h * 0.78, 6); ctx.fill(); ctx.stroke();
    const lanes: Array<[string, number, number[]]> = [
        ['ladder', 0.16, [0.14, 0.22, 0.30, 0.38, 0.46, 0.54, 0.62, 0.70, 0.78]],
        ['crime', 0.30, [0.18, 0.34, 0.50, 0.66]],
        ['suspect 1', 0.45, [0.18, 0.34, 0.50, 0.66]],
        ['suspect 2', 0.60, [0.20, 0.40, 0.58, 0.72]],
        ['suspect 3', 0.75, [0.18, 0.44, 0.50, 0.70]],
    ];
    lanes.forEach(([name, lx, bands]) => {
        ctx.fillStyle = '#334155';
        ctx.fillRect(w * lx - 10, h * 0.10, 20, 6);
        bands.forEach(b => {
            ctx.fillStyle = 'rgba(52,211,153,0.9)';
            ctx.fillRect(w * lx - 9, h * (0.12 + b * 0.78), 18, 4);
        });
        ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, w * lx, h * 0.93);
    });
    // match bracket crime↔suspect1
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.6; ctx.setLineDash([3, 3]);
    ctx.strokeRect(w * 0.30 - 12, h * 0.10, w * 0.17 + 12, h * 0.76);
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('MATCH', w * 0.37, h * 0.07);
    ctx.fillStyle = '#94a3b8'; ctx.font = '8.5px sans-serif';
    ctx.fillText('bands are VNTR fragments — each person cuts differently', w / 2, h - 6);
    paintDiagramSel(ctx, w, h, FINGERPRINT_SPOTS, v.sel ?? -1);
}
const FINGERPRINT_SPOTS = [
    { label: 'Marker ladder', fn: 'known-size ruler — measures every band', x: 0.16, y: 0.45, r: 0.06 },
    { label: 'Crime-scene DNA', fn: 'the sample recovered from the scene', x: 0.30, y: 0.45, r: 0.06 },
    { label: 'Suspect 1', fn: 'bands match the scene — the likely donor', x: 0.45, y: 0.45, r: 0.06 },
    { label: 'Suspect 2', fn: 'different bands — cleared', x: 0.60, y: 0.45, r: 0.06 },
    { label: 'Suspect 3', fn: 'close but shifted — cleared too', x: 0.75, y: 0.45, r: 0.06 },
    { label: 'VNTR bands', fn: 'repeat-count fragments — the fingerprint itself', x: 0.45, y: 0.72, r: 0.07 },
    { label: 'The match', fn: 'identical pattern = same source, odds 1 in billions', x: 0.37, y: 0.10, r: 0.07 },
];
/** dgm_gen_griffith — the 4-mouse transformation experiment. */
function paintGriffith(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const panel = (x: number, title: string, bug: string, outcome: string, dead: boolean) => {
        ctx.fillStyle = 'rgba(30,41,59,0.8)'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x - w * 0.10, h * 0.08, w * 0.20, h * 0.62, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 8.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(title, x, h * 0.15);
        // mouse — simple blob + ears + tail
        ctx.fillStyle = dead ? '#64748b' : '#e2e8f0';
        ctx.beginPath(); ctx.ellipse(x, h * 0.42, 16, 10, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x - 14, h * 0.38, 4, 0, Math.PI * 2); ctx.arc(x - 8, h * 0.35, 3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = dead ? '#64748b' : '#e2e8f0'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(x + 16, h * 0.42); ctx.quadraticCurveTo(x + 26, h * 0.40, x + 28, h * 0.32); ctx.stroke();
        // bacteria label
        ctx.fillStyle = bug.includes('S') ? '#f87171' : '#86efac';
        ctx.font = 'bold 9px sans-serif'; ctx.fillText(bug, x, h * 0.58);
        // outcome
        ctx.fillStyle = dead ? '#f87171' : '#86efac';
        ctx.font = 'bold 9px sans-serif'; ctx.fillText(outcome, x, h * 0.65);
        if (dead) {
            ctx.font = '13px sans-serif'; ctx.fillText('☠', x, h * 0.30);
        }
    };
    panel(w * 0.14, 'Live S strain', 'smooth + capsule', 'mouse DIES', true);
    panel(w * 0.38, 'Live R strain', 'rough, no capsule', 'mouse lives', false);
    panel(w * 0.62, 'Heat-killed S', 'dead smooth cells', 'mouse lives', false);
    panel(w * 0.86, 'R + dead S', 'rough + dead smooth', 'mouse DIES', true);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('living S cells recovered from the last mouse — something transferred', w / 2, h * 0.78);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the "transforming principle" — later proven to be DNA', w / 2, h - 8);
    paintDiagramSel(ctx, w, h, GRIFFITH_SPOTS, v.sel ?? -1);
}
const GRIFFITH_SPOTS = [
    { label: 'Live S strain', fn: 'smooth + capsule = virulent — kills the mouse', x: 0.14, y: 0.38, r: 0.09 },
    { label: 'Live R strain', fn: 'rough, no capsule = harmless — mouse survives', x: 0.38, y: 0.38, r: 0.09 },
    { label: 'Heat-killed S', fn: 'dead capsules are harmless alone — mouse survives', x: 0.62, y: 0.38, r: 0.09 },
    { label: 'R + dead S', fn: 'the fatal mix — live R became virulent', x: 0.86, y: 0.38, r: 0.09 },
    { label: 'Transforming principle', fn: 'whatever passed from dead S to live R — proven to be DNA', x: 0.50, y: 0.80, r: 0.10 },
    { label: 'Capsule', fn: 'the smooth coat — the virulence factor', x: 0.14, y: 0.58, r: 0.05 },
];
/** dgm_gen_codon — the codon wheel: 64 codons read centre-out. */
function paintCodon(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const cx = w * 0.42, cy = h * 0.52;
    const rings = [['U', 'C', 'A', 'G'], ['U', 'C', 'A', 'G'], ['U', 'C', 'A', 'G']];
    const radii = [w * 0.055, w * 0.11, w * 0.165];
    // three rings of letters (base 1, 2, 3 read outward)
    for (let r = 0; r < 3; r++) {
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, radii[r], 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 4; i++) {
            const a = -Math.PI / 2 + i * Math.PI / 2 + (r * Math.PI / 8);
            ctx.fillStyle = ['#f472b6', '#60a5fa', '#fbbf24', '#34d399'][i];
            ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(rings[r][i], cx + Math.cos(a) * (radii[r] - w * 0.02), cy + Math.sin(a) * (radii[r] - w * 0.02) + 3);
        }
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('1st', cx, cy - 4); ctx.fillText('base', cx, cy + 6);
    // right column — notable codons
    const notes: Array<[string, string, number, string]> = [
        ['AUG', 'START + Met', 0.14, '#34d399'],
        ['UAA UAG UGA', 'STOP signals', 0.30, '#f87171'],
        ['UUU UUC', 'Phenylalanine', 0.46, '#93c5fd'],
        ['GGU GGC GGA GGG', 'Glycine — code is degenerate', 0.62, '#fbbf24'],
        ['61 vs 3', '61 codons = amino acids, 3 = stops', 0.78, '#a78bfa'],
    ];
    notes.forEach(([code, name, y, col]) => {
        ctx.fillStyle = col; ctx.font = 'bold 9.5px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(code, w * 0.68, h * y);
        ctx.fillStyle = '#cbd5e1'; ctx.font = '8.5px sans-serif';
        ctx.fillText(name, w * 0.68, h * y + 11);
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('read centre-out: base 1 → 2 → 3', w / 2, h - 8);
    paintDiagramSel(ctx, w, h, CODON_SPOTS, v.sel ?? -1);
}
const CODON_SPOTS = [
    { label: 'Centre — first base', fn: 'read the wheel from inside out', x: 0.42, y: 0.52, r: 0.05 },
    { label: 'Second ring', fn: 'the middle letter of the triplet', x: 0.42, y: 0.40, r: 0.05 },
    { label: 'Outer ring', fn: 'the last letter — finishes the codon', x: 0.42, y: 0.28, r: 0.05 },
    { label: 'AUG', fn: 'the universal START — codes methionine too', x: 0.72, y: 0.14, r: 0.06 },
    { label: 'Stop codons', fn: 'UAA, UAG, UGA — no amino acid, chain ends', x: 0.72, y: 0.30, r: 0.06 },
    { label: 'Degenerate code', fn: 'several codons → one amino acid (61 for 20)', x: 0.72, y: 0.62, r: 0.07 },
    { label: 'Unambiguous', fn: 'each codon means exactly one thing', x: 0.72, y: 0.78, r: 0.06 },
];

/** dgm_biogas — a typical biogas plant (NCERT 8.8 spec): dung+water inlet,
 *  underground digester, floating gas-holder, gas outlet, sludge out. */
function paintBiogas(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const gy = h * 0.66;
    ctx.fillStyle = '#7c4a21'; ctx.fillRect(0, gy, w, h - gy);
    ctx.fillStyle = '#a16207'; ctx.fillRect(0, gy, w, 4);
    // inlet mixing tank (left, above ground)
    ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.roundRect(w * 0.06, gy - h * 0.20, w * 0.16, h * 0.16, 3); ctx.fill();
    // dung + water feed columns
    ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.roundRect(w * 0.09, gy - h * 0.34, w * 0.04, h * 0.13, 2); ctx.fill();
    ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.roundRect(w * 0.16, gy - h * 0.34, w * 0.04, h * 0.13, 2); ctx.fill();
    ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24'; ctx.fillText('Dung', w * 0.11, gy - h * 0.37);
    ctx.fillStyle = '#7dd3fc'; ctx.fillText('Water', w * 0.18, gy - h * 0.37);
    // slurry pipe inlet → digester
    ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth = 6; ctx.beginPath();
    ctx.moveTo(w * 0.22, gy - h * 0.05); ctx.lineTo(w * 0.44, gy + h * 0.14); ctx.stroke();
    // digester — underground tank
    ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.roundRect(w * 0.40, gy + h * 0.02, w * 0.24, h * 0.30, 4); ctx.fill();
    ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.roundRect(w * 0.40, gy + h * 0.14, w * 0.24, h * 0.18, 4); ctx.fill();
    // gas-holder — floating drum
    ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.roundRect(w * 0.43, gy - h * 0.22, w * 0.18, h * 0.26, 3); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.ellipse(w * 0.52, gy - h * 0.22, w * 0.09, h * 0.028, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#475569'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('CH₄+CO₂', w * 0.52, gy - h * 0.10);
    // gas pipe: holder top → up → right → out
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 5; ctx.beginPath();
    ctx.moveTo(w * 0.52, gy - h * 0.26); ctx.lineTo(w * 0.52, h * 0.13);
    ctx.lineTo(w * 0.80, h * 0.13); ctx.lineTo(w * 0.80, h * 0.19); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(w * 0.72, h * 0.13, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w * 0.83, h * 0.16); ctx.lineTo(w * 0.94, h * 0.16);
    ctx.lineTo(w * 0.90, h * 0.13); ctx.moveTo(w * 0.94, h * 0.16); ctx.lineTo(w * 0.90, h * 0.19); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('Gas', w * 0.84, h * 0.10);
    // sludge outlet tank (right)
    ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth = 6; ctx.beginPath();
    ctx.moveTo(w * 0.64, gy - h * 0.02); ctx.lineTo(w * 0.80, gy - h * 0.10); ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.roundRect(w * 0.78, gy - h * 0.22, w * 0.16, h * 0.16, 3); ctx.fill();
    ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.roundRect(w * 0.78, gy - h * 0.12, w * 0.16, h * 0.06, 2); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Sludge', w * 0.86, gy - h * 0.25);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('methanogens work in the dark — gas up top, fertiliser out the side', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, BIOGAS_SPOTS, v.sel ?? -1);
}
const BIOGAS_SPOTS = [
    { label: 'Dung', fn: 'the raw feed — cattle waste in', x: 0.11, y: 0.30, r: 0.035 },
    { label: 'Water', fn: 'mixed with dung into slurry', x: 0.18, y: 0.30, r: 0.035 },
    { label: 'Digester', fn: 'the sealed anaerobic chamber — methanogens at work', x: 0.52, y: 0.82, r: 0.06 },
    { label: 'Gas-holder', fn: 'the floating drum — rises as gas collects', x: 0.52, y: 0.50, r: 0.05 },
    { label: 'Gas', fn: 'CH₄ + CO₂ out — piped to kitchens', x: 0.72, y: 0.13, r: 0.04 },
    { label: 'Sludge', fn: 'the spent slurry — straight to fields as fertiliser', x: 0.86, y: 0.50, r: 0.045 },
];

/** dgm_fermentor — stirred-tank bioreactor (NCERT 9.7a spec): motor + shaft,
 *  impellers, foam breaker, pH & steam inlets, sterile air, culture broth. */
function paintFermentor(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const vx = w * 0.40, vw = w * 0.26, vy = h * 0.20, vh = h * 0.70;
    ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.roundRect(vx, vy, vw, vh, 12); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(vx, vy, vw, vh, 12); ctx.stroke();
    // culture broth
    ctx.fillStyle = 'rgba(251,191,36,0.32)'; ctx.beginPath(); ctx.roundRect(vx + 6, vy + vh * 0.15, vw - 12, vh * 0.82, 10); ctx.fill();
    ctx.fillStyle = 'rgba(251,191,36,0.7)';
    for (let i = 0; i < 16; i++) {
        ctx.beginPath(); ctx.arc(vx + 12 + ((i * 29) % (vw - 24)), vy + vh * 0.2 + ((i * 47) % (vh * 0.72)), 1.6, 0, Math.PI * 2); ctx.fill();
    }
    // motor
    ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.roundRect(w * 0.485, h * 0.05, w * 0.09, h * 0.10, 4); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('M', w * 0.53, h * 0.115);
    // shaft
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath();
    ctx.moveTo(w * 0.53, h * 0.15); ctx.lineTo(w * 0.53, vy + vh * 0.92); ctx.stroke();
    // foam breaker disc
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(w * 0.47, vy + vh * 0.08, w * 0.12, 3);
    // two flat-bladed impellers
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3;
    [0.45, 0.68].forEach(f => {
        const iy = vy + vh * f;
        ctx.beginPath(); ctx.moveTo(w * 0.44, iy); ctx.lineTo(w * 0.62, iy); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.fillRect(w * 0.43, iy - 6, 4, 12); ctx.fillRect(w * 0.615, iy - 6, 4, 12);
    });
    // pH + steam inlets
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(w * 0.30, vy + 4); ctx.lineTo(vx, vy + 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w * 0.26, vy + vh * 0.32); ctx.lineTo(vx, vy + vh * 0.32); ctx.stroke();
    ctx.fillStyle = '#fca5a5'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText('Acid/Base', w * 0.29, vy + 7);
    ctx.fillText('Steam', w * 0.25, vy + vh * 0.32 + 3);
    // sterile air pipe at bottom
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4; ctx.beginPath();
    ctx.moveTo(w * 0.53, h * 0.99); ctx.lineTo(w * 0.53, vy + vh); ctx.stroke();
    // air bubbles rising in broth
    ctx.strokeStyle = 'rgba(125,211,252,0.7)'; ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath(); ctx.arc(w * 0.50 + ((i * 13) % (w * 0.09)), vy + vh * 0.85 - ((i * 31 + t / 40) % (vh * 0.55)), 2, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('sterile air in — microbes churn — product out', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, FERMENTOR_SPOTS, v.sel ?? -1);
}
const FERMENTOR_SPOTS = [
    { label: 'Motor', fn: 'drives the shaft — the stirrer\'s muscle', x: 0.53, y: 0.10, r: 0.05 },
    { label: 'Acid/Base for pH control', fn: 'the pH dial — dosed in as needed', x: 0.33, y: 0.21, r: 0.05 },
    { label: 'Steam for sterilisation', fn: 'blasts the vessel clean between runs', x: 0.32, y: 0.42, r: 0.05 },
    { label: 'Foam breaker', fn: 'the disc that chops the froth down', x: 0.53, y: 0.28, r: 0.045 },
    { label: 'Flat bladed impeller', fn: 'the paddles mixing oxygen through', x: 0.53, y: 0.51, r: 0.05 },
    { label: 'Culture broth', fn: 'the living soup — microbes making product', x: 0.62, y: 0.72, r: 0.055 },
    { label: 'Sterile Air', fn: 'filtered oxygen piped to the bottom', x: 0.53, y: 0.93, r: 0.045 },
];

/** dgm_sewage — sewage treatment (NCERT §8.5 vocab): primary settling →
 *  aeration → secondary settling; activated sludge → anaerobic digester. */
function paintSewage(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const ty = h * 0.22, th = h * 0.40;
    const arr = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 7 * Math.cos(a - 0.5), y2 - 7 * Math.sin(a - 0.5));
        ctx.moveTo(x2, y2); ctx.lineTo(x2 - 7 * Math.cos(a + 0.5), y2 - 7 * Math.sin(a + 0.5)); ctx.stroke();
    };
    arr(w * 0.02, ty + th * 0.3, w * 0.09, ty + th * 0.3);
    arr(w * 0.32, ty + th * 0.3, w * 0.39, ty + th * 0.3);
    arr(w * 0.62, ty + th * 0.3, w * 0.69, ty + th * 0.3);
    arr(w * 0.92, ty + th * 0.15, w * 0.99, ty + th * 0.15);
    // three tanks
    [[0.10, '#475569'], [0.40, '#0ea5e9'], [0.70, '#475569']].forEach(([fx, col]) => {
        ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.roundRect(w * (fx as number), ty, w * 0.22, th, 4); ctx.fill();
        ctx.fillStyle = col as string; ctx.fillRect(w * (fx as number), ty + th * 0.55, w * 0.22, th * 0.45);
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(w * (fx as number), ty, w * 0.22, th, 4); ctx.stroke();
    });
    // settled solids — primary + secondary bottoms
    ctx.fillStyle = '#57534e';
    ctx.fillRect(w * 0.10, ty + th * 0.80, w * 0.22, th * 0.20);
    ctx.fillRect(w * 0.70, ty + th * 0.85, w * 0.22, th * 0.15);
    // aeration: stirrer + rising bubbles
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w * 0.51, ty - 6); ctx.lineTo(w * 0.51, ty + th * 0.5); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(w * 0.47, ty - 9, w * 0.08, 5);
    ctx.strokeStyle = 'rgba(125,211,252,0.8)'; ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
        ctx.beginPath(); ctx.arc(w * 0.42 + ((i * 19) % (w * 0.16)), ty + th * 0.78 - ((i * 23 + t / 30) % (th * 0.5)), 2, 0, Math.PI * 2); ctx.stroke();
    }
    // sludge pipes → anaerobic digester
    ctx.strokeStyle = '#a16207'; ctx.lineWidth = 4; ctx.beginPath();
    ctx.moveTo(w * 0.21, ty + th); ctx.lineTo(w * 0.21, h * 0.72); ctx.lineTo(w * 0.60, h * 0.72); ctx.stroke();
    ctx.moveTo(w * 0.81, ty + th); ctx.lineTo(w * 0.81, h * 0.66); ctx.lineTo(w * 0.60, h * 0.66); ctx.stroke();
    // digester
    ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.roundRect(w * 0.60, h * 0.78, w * 0.28, h * 0.17, 4); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Anaerobic sludge digester', w * 0.74, h * 0.875);
    ctx.fillStyle = '#38bdf8'; ctx.beginPath();
    ctx.moveTo(w * 0.74, h * 0.68); ctx.quadraticCurveTo(w * 0.71, h * 0.73, w * 0.74, h * 0.77);
    ctx.quadraticCurveTo(w * 0.77, h * 0.73, w * 0.74, h * 0.68); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('microbes do the cleaning — physics does the settling', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SEWAGE_SPOTS, v.sel ?? -1);
}
const SEWAGE_SPOTS = [
    { label: 'Primary settling tank', fn: 'grit and solids drop out first', x: 0.21, y: 0.42, r: 0.06 },
    { label: 'Aeration tank', fn: 'air pumped in — aerobic microbes feast', x: 0.51, y: 0.42, r: 0.06 },
    { label: 'Secondary settling tank', fn: 'the flocs settle — clean water leaves', x: 0.81, y: 0.42, r: 0.06 },
    { label: 'Activated sludge', fn: 'the hungry biomass — part recycled back', x: 0.81, y: 0.57, r: 0.045 },
    { label: 'Anaerobic sludge digester', fn: 'methanogens finish the solids — biogas bonus', x: 0.74, y: 0.87, r: 0.055 },
];

/** dgm_moet — Multiple Ovulation Embryo Transfer (NCERT ch9 spec): elite
 *  mother → superovulation → AI → embryos flushed → surrogates → progeny. */
function paintMoet(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const cow = (cx: number, cy: number, s: number, col: string) => {
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.ellipse(cx, cy, s * 1.4, s * 0.8, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx + s * 1.5, cy - s * 0.5, s * 0.45, s * 0.35, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = Math.max(1.5, s * 0.18);
        [-0.8, -0.3, 0.5, 1.0].forEach(f => {
            ctx.beginPath(); ctx.moveTo(cx + f * s, cy + s * 0.6); ctx.lineTo(cx + f * s, cy + s * 1.35); ctx.stroke();
        });
        ctx.beginPath(); ctx.moveTo(cx - s * 1.4, cy - s * 0.4);
        ctx.quadraticCurveTo(cx - s * 1.8, cy, cx - s * 1.6, cy + s * 0.5); ctx.stroke();
    };
    const stepBox = (cx: number, cy: number, bw: number, label: string, col: string) => {
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = col; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(cx - bw / 2, cy - 13, bw, 26, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(label, cx, cy + 3);
    };
    const arr = (x1: number, y1: number, x2: number, y2: number, dash = false) => {
        ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2;
        if (dash) ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a - 0.5), y2 - 6 * Math.sin(a - 0.5));
        ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a + 0.5), y2 - 6 * Math.sin(a + 0.5)); ctx.stroke();
    };
    // the genetic mother
    cow(w * 0.13, h * 0.42, 15, '#a8a29e');
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('genetic mother', w * 0.13, h * 0.60);
    // hormone syringe (superovulation)
    ctx.save(); ctx.translate(w * 0.36, h * 0.17); ctx.rotate(-0.6);
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(-10, -3, 20, 6);
    ctx.fillStyle = '#f472b6'; ctx.fillRect(-8, -2, 9, 4);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(16, 0); ctx.stroke(); ctx.restore();
    stepBox(w * 0.36, h * 0.30, w * 0.20, 'Superovulation', '#f472b6');
    // semen vial (AI)
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.roundRect(w * 0.585, h * 0.11, w * 0.03, h * 0.10, 3); ctx.fill();
    ctx.fillStyle = '#60a5fa'; ctx.fillRect(w * 0.585, h * 0.16, w * 0.03, h * 0.05);
    stepBox(w * 0.60, h * 0.30, w * 0.20, 'Artificial insemination', '#60a5fa');
    // petri dish of embryos
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(w * 0.85, h * 0.15, 14, 5, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#a5f3fc';
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(w * 0.85 - 8 + i * 5, h * 0.15, 1.6, 0, Math.PI * 2); ctx.fill(); }
    stepBox(w * 0.85, h * 0.30, w * 0.19, 'Embryos recovered', '#a5f3fc');
    // surrogates
    cow(w * 0.42, h * 0.72, 10, '#78716c'); cow(w * 0.55, h * 0.72, 10, '#78716c'); cow(w * 0.68, h * 0.72, 10, '#78716c');
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('surrogate mothers', w * 0.55, h * 0.86);
    // progeny calf
    cow(w * 0.88, h * 0.72, 9, '#a8a29e');
    ctx.fillStyle = '#fbbf24'; ctx.fillText('superior progeny', w * 0.88, h * 0.86);
    // flow arrows
    arr(w * 0.20, h * 0.40, w * 0.30, h * 0.22);
    arr(w * 0.46, h * 0.30, w * 0.50, h * 0.30);
    arr(w * 0.70, h * 0.30, w * 0.75, h * 0.30);
    arr(w * 0.85, h * 0.43, w * 0.70, h * 0.60);
    arr(w * 0.76, h * 0.72, w * 0.79, h * 0.72);
    // dashed loop — genetic mother goes again
    arr(w * 0.40, h * 0.60, w * 0.13, h * 0.58, true);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('one elite mother → many calves a year — she never has to carry them', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, MOET_SPOTS, v.sel ?? -1);
}
const MOET_SPOTS = [
    { label: 'Genetic mother', fn: 'the superior cow — genetics worth multiplying', x: 0.13, y: 0.42, r: 0.07 },
    { label: 'Superovulation', fn: 'FSH-like hormones — 6 to 8 eggs at once', x: 0.36, y: 0.22, r: 0.055 },
    { label: 'Artificial insemination', fn: 'semen from the elite bull, placed by hand', x: 0.60, y: 0.22, r: 0.055 },
    { label: 'Embryos recovered', fn: '8-32 cell stage — flushed out non-surgically', x: 0.85, y: 0.22, r: 0.055 },
    { label: 'Surrogate mothers', fn: 'ordinary cows carry the elite embryos', x: 0.55, y: 0.72, r: 0.065 },
    { label: 'Superior progeny', fn: 'many elite calves a year from one mother', x: 0.88, y: 0.72, r: 0.055 },
];

/** dgm_tissue_culture — micropropagation (NCERT ch9 vocab): explant →
 *  sterile medium → callus → shoots+roots → hardened plantlets. */
function paintTissueCulture(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const arr = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a - 0.5), y2 - 6 * Math.sin(a - 0.5));
        ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a + 0.5), y2 - 6 * Math.sin(a + 0.5)); ctx.stroke();
    };
    const flask = (cx: number, cy: number, s: number) => {
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - s * 0.3, cy - s); ctx.lineTo(cx - s * 0.3, cy - s * 0.55);
        ctx.lineTo(cx - s * 0.75, cy + s * 0.8); ctx.lineTo(cx + s * 0.75, cy + s * 0.8);
        ctx.lineTo(cx + s * 0.3, cy - s * 0.55); ctx.lineTo(cx + s * 0.3, cy - s); ctx.stroke();
        ctx.fillStyle = 'rgba(148,163,184,0.25)';
        ctx.beginPath(); ctx.moveTo(cx - s * 0.62, cy + s * 0.3); ctx.lineTo(cx - s * 0.75, cy + s * 0.8);
        ctx.lineTo(cx + s * 0.75, cy + s * 0.8); ctx.lineTo(cx + s * 0.62, cy + s * 0.3); ctx.closePath(); ctx.fill();
    };
    // mother plant in pot
    ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(w * 0.05, h * 0.62); ctx.lineTo(w * 0.15, h * 0.62);
    ctx.lineTo(w * 0.13, h * 0.80); ctx.lineTo(w * 0.07, h * 0.80); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(w * 0.10, h * 0.62); ctx.lineTo(w * 0.10, h * 0.40); ctx.stroke();
    [[-0.03, -0.10], [0.03, -0.16], [-0.02, -0.20], [0.02, -0.06]].forEach(([dx, dy]) => {
        ctx.beginPath(); ctx.moveTo(w * 0.10, h * 0.50 + dy * h * 0.3);
        ctx.quadraticCurveTo(w * (0.10 + dx), h * 0.44 + dy * h * 0.4, w * (0.10 + dx * 2), h * 0.46 + dy * h * 0.3); ctx.stroke();
    });
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('mother plant', w * 0.10, h * 0.90);
    // explant — small cutting
    ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.ellipse(w * 0.26, h * 0.55, 6, 9, 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.fillText('explant', w * 0.26, h * 0.72);
    // flask 1 — medium + callus
    flask(w * 0.46, h * 0.50, 26);
    ctx.fillStyle = '#d6d3d1';
    ctx.beginPath(); ctx.arc(w * 0.46, h * 0.56, 8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w * 0.44, h * 0.54, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w * 0.48, h * 0.54, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.fillText('callus', w * 0.46, h * 0.86);
    // flask 2 — shoots + roots
    flask(w * 0.66, h * 0.50, 26);
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w * 0.66, h * 0.56); ctx.lineTo(w * 0.65, h * 0.44);
    ctx.moveTo(w * 0.66, h * 0.56); ctx.lineTo(w * 0.68, h * 0.46); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w * 0.66, h * 0.60); ctx.lineTo(w * 0.64, h * 0.66);
    ctx.moveTo(w * 0.66, h * 0.60); ctx.lineTo(w * 0.68, h * 0.67); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.fillText('shoots + roots', w * 0.66, h * 0.86);
    // potted plantlets
    [0.84, 0.90, 0.96].forEach(fx => {
        ctx.fillStyle = '#a16207'; ctx.fillRect(w * fx - 4, h * 0.58, 8, 9);
        ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(w * fx, h * 0.58); ctx.lineTo(w * fx, h * 0.48); ctx.stroke();
        ctx.beginPath(); ctx.arc(w * fx, h * 0.46, 3, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.fillStyle = '#fbbf24'; ctx.fillText('plantlets', w * 0.90, h * 0.72);
    arr(w * 0.16, h * 0.55, w * 0.20, h * 0.55);
    arr(w * 0.31, h * 0.55, w * 0.38, h * 0.55);
    arr(w * 0.54, h * 0.55, w * 0.58, h * 0.55);
    arr(w * 0.74, h * 0.55, w * 0.79, h * 0.55);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('one cutting → thousands of clones — totipotency on an assembly line', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, TISSUE_SPOTS, v.sel ?? -1);
}
const TISSUE_SPOTS = [
    { label: 'Explant', fn: 'the small cutting that starts it all', x: 0.26, y: 0.55, r: 0.045 },
    { label: 'Sterile nutrient medium', fn: 'agar + salts + vitamins + growth hormones', x: 0.46, y: 0.66, r: 0.05 },
    { label: 'Callus', fn: 'the unorganised cell mass — totipotency at work', x: 0.46, y: 0.55, r: 0.045 },
    { label: 'Shoots and roots', fn: 'hormone ratios decide what differentiates', x: 0.66, y: 0.52, r: 0.05 },
    { label: 'Plantlets', fn: 'clones of the mother — hardened and planted', x: 0.90, y: 0.52, r: 0.05 },
];

/** dgm_fasta — the FASTA format (NCERT biotech fig 9.4 spec): the >header
 *  line carries accession number, identifier, source and sequence type. */
function paintFasta(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    // file card
    ctx.fillStyle = 'rgba(30,41,59,0.9)'; ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(w * 0.06, h * 0.30, w * 0.88, h * 0.60, 8); ctx.fill(); ctx.stroke();
    // header line
    ctx.font = 'bold 8.5px monospace'; ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('>K02382.1 Human growth hormone synthetic gene, complete cds', w * 0.09, h * 0.38);
    // four callout labels with arrows to header segments
    const calls = [
        ['Accession number', 0.145, '#f87171'],
        ['Identifier (Gene name)', 0.42, '#4ade80'],
        ['Source', 0.72, '#60a5fa'],
        ['Type of sequence', 0.90, '#c084fc'],
    ] as const;
    calls.forEach(([label, fx, col]) => {
        ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(w * fx, h * 0.24); ctx.lineTo(w * fx, h * 0.345); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w * fx, h * 0.345); ctx.lineTo(w * fx - 4, h * 0.325);
        ctx.moveTo(w * fx, h * 0.345); ctx.lineTo(w * fx + 4, h * 0.325); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
        const words = (label as string).split(' ');
        if (words.length > 1 && (label as string).length > 14) {
            ctx.fillText(words.slice(0, -1).join(' '), w * fx, h * 0.17);
            ctx.fillText(words[words.length - 1], w * fx, h * 0.22);
        } else ctx.fillText(label as string, w * fx, h * 0.20);
    });
    // sequence lines
    ctx.font = '8px monospace'; ctx.textAlign = 'left';
    const seq = 'CGATATGTTCCCAACTATTCCACTGAGTGGCCTGTTGATAACGCGATGCTGGGTGCGATCGTCT';
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i % 2 ? '#86efac' : '#4ade80';
        ctx.fillText(seq, w * 0.09, h * (0.48 + i * 0.10));
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('first line starts > — the rest is raw sequence', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, FASTA_SPOTS, v.sel ?? -1);
}
const FASTA_SPOTS = [
    { label: 'Accession number', fn: 'the unique ID — K02382.1', x: 0.145, y: 0.38, r: 0.045 },
    { label: 'Identifier (Gene name)', fn: 'what the sequence is — human growth hormone', x: 0.42, y: 0.38, r: 0.055 },
    { label: 'Source', fn: 'where the gene came from — synthetic', x: 0.72, y: 0.38, r: 0.045 },
    { label: 'Type of sequence', fn: 'complete cds — a full coding sequence', x: 0.90, y: 0.38, r: 0.045 },
    { label: 'Sequence lines', fn: 'single-letter code, 60 bases a row', x: 0.50, y: 0.62, r: 0.065 },
];

/** dgm_protinfo — protein structure prediction flowchart (NCERT biotech
 *  fig 10.1 spec): sequence → database search → homologue? → model. */
function paintProtinfo(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const box = (cx: number, cy: number, bw: number, label: string, col = '#475569') => {
        ctx.fillStyle = 'rgba(51,65,85,0.92)'; ctx.strokeStyle = col; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.roundRect(cx - bw / 2, cy - 10, bw, 20, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
        const lines = label.split('|');
        lines.forEach((ln, i) => ctx.fillText(ln, cx, cy + (i - (lines.length - 1) / 2) * 9 + 3));
    };
    const arr = (x1: number, y1: number, x2: number, y2: number, label?: string) => {
        ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a - 0.5), y2 - 6 * Math.sin(a - 0.5));
        ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a + 0.5), y2 - 6 * Math.sin(a + 0.5)); ctx.stroke();
        if (label) { ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(label, (x1 + x2) / 2 + 3, (y1 + y2) / 2); }
    };
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // top flow
    box(X(0.50), Y(0.07), w * 0.20, 'Protein|Sequence', '#fbbf24');
    box(X(0.50), Y(0.19), w * 0.22, 'Database|Searching');
    box(X(0.15), Y(0.19), w * 0.24, 'Multiple Sequence|Alignment');
    arr(X(0.50), Y(0.12), X(0.50), Y(0.145));
    arr(X(0.39), Y(0.19), X(0.28), Y(0.19));
    // decision oval
    ctx.fillStyle = 'rgba(124,45,18,0.9)'; ctx.strokeStyle = '#fb923c'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(X(0.50), Y(0.34), w * 0.115, h * 0.055, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fed7aa'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Homologue in PDB?', X(0.50), Y(0.345));
    arr(X(0.50), Y(0.235), X(0.50), Y(0.28));
    // YES branch — left
    arr(X(0.385), Y(0.34), X(0.28), Y(0.34), 'Yes');
    box(X(0.155), Y(0.34), w * 0.25, 'Sequence-Structure|Alignment');
    arr(X(0.155), Y(0.40), X(0.155), Y(0.45));
    box(X(0.155), Y(0.50), w * 0.24, 'Homology|Modelling', '#4ade80');
    arr(X(0.155), Y(0.55), X(0.155), Y(0.80));
    // NO branch — right
    arr(X(0.615), Y(0.34), X(0.74), Y(0.34), 'No');
    box(X(0.85), Y(0.34), w * 0.24, 'Secondary Structure|Prediction');
    arr(X(0.85), Y(0.40), X(0.85), Y(0.45));
    box(X(0.85), Y(0.50), w * 0.16, 'Fold|Prediction');
    arr(X(0.85), Y(0.55), X(0.85), Y(0.60));
    ctx.fillStyle = 'rgba(124,45,18,0.9)'; ctx.strokeStyle = '#fb923c';
    ctx.beginPath(); ctx.ellipse(X(0.85), Y(0.66), w * 0.10, h * 0.05, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fed7aa'; ctx.fillText('Predicted Fold?', X(0.85), Y(0.665));
    // yes → back to seq-struct alignment; no → ab-initio
    ctx.strokeStyle = '#7dd3fc'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(X(0.75), Y(0.66)); ctx.lineTo(X(0.30), Y(0.66)); ctx.lineTo(X(0.28), Y(0.40)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Yes', X(0.72), Y(0.63));
    arr(X(0.85), Y(0.71), X(0.85), Y(0.78), 'No');
    box(X(0.85), Y(0.83), w * 0.22, 'Ab-initio Structure|Prediction');
    arr(X(0.74), Y(0.86), X(0.44), Y(0.86));
    // final model
    box(X(0.30), Y(0.86), w * 0.22, '3-D Protein|Model', '#fbbf24');
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('known relative → copy its shape; no relative → predict from scratch', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PROTINFO_SPOTS, v.sel ?? -1);
}
const PROTINFO_SPOTS = [
    { label: 'Protein Sequence', fn: 'the starting point — letters, not shape', x: 0.50, y: 0.07, r: 0.055 },
    { label: 'Database Searching', fn: 'hunt the PDB for lookalikes', x: 0.50, y: 0.19, r: 0.055 },
    { label: 'Multiple Sequence Alignment', fn: 'line the sequence up against known ones', x: 0.15, y: 0.19, r: 0.055 },
    { label: 'Homologue in PDB', fn: 'does a solved cousin exist?', x: 0.50, y: 0.34, r: 0.055 },
    { label: 'Sequence-Structure Alignment', fn: 'map your sequence onto the known fold', x: 0.155, y: 0.34, r: 0.05 },
    { label: 'Homology Modelling', fn: 'copy the cousin\'s shape — the reliable path', x: 0.155, y: 0.50, r: 0.05 },
    { label: 'Secondary Structure Prediction', fn: 'guess helices and sheets from the sequence', x: 0.85, y: 0.34, r: 0.05 },
    { label: 'Fold Prediction', fn: 'which fold family does it resemble', x: 0.85, y: 0.50, r: 0.05 },
    { label: 'Predicted Fold', fn: 'a fold candidate — good enough to model?', x: 0.85, y: 0.66, r: 0.045 },
    { label: 'Ab-initio Structure Prediction', fn: 'build the shape from physics — hardest path', x: 0.85, y: 0.83, r: 0.05 },
    { label: '3-D Protein Model', fn: 'the goal — a structure for the sequence', x: 0.30, y: 0.86, r: 0.055 },
];

/** dgm_logic — mathematical reasoning (NCERT ch14 vocab): statement,
 *  negation, implication, converse, contrapositive. */
function paintLogic(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const card = (cx: number, cy: number, bw: number, txt: string, col: string) => {
        ctx.fillStyle = 'rgba(51,65,85,0.92)'; ctx.strokeStyle = col; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.roundRect(cx - bw / 2, cy - 16, bw, 32, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        txt.split('|').forEach((ln, i) => ctx.fillText(ln, cx, cy + (i - (txt.split('|').length - 1) / 2) * 10 + 3));
    };
    const arr = (x1: number, y1: number, x2: number, y2: number, label: string, col = '#7dd3fc', dash = false) => {
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        if (dash) ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a - 0.5), y2 - 6 * Math.sin(a - 0.5));
        ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a + 0.5), y2 - 6 * Math.sin(a + 0.5)); ctx.stroke();
        ctx.fillStyle = col; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 5);
    };
    // p and q statements
    card(w * 0.18, h * 0.35, w * 0.22, 'p|x is even', '#4ade80');
    card(w * 0.82, h * 0.35, w * 0.24, 'q|x > 10', '#60a5fa');
    arr(w * 0.30, h * 0.35, w * 0.69, h * 0.35, 'p ⇒ q — implication', '#7dd3fc');
    arr(w * 0.69, h * 0.47, w * 0.30, h * 0.47, 'q ⇒ p — converse', '#fbbf24', true);
    // negation cards
    card(w * 0.18, h * 0.70, w * 0.22, '~p|x is NOT even', '#f87171');
    card(w * 0.82, h * 0.70, w * 0.24, '~q|x ≤ 10', '#f87171');
    arr(w * 0.18, h * 0.44, w * 0.18, h * 0.60, 'negation', '#f87171');
    arr(w * 0.82, h * 0.44, w * 0.82, h * 0.60, 'negation', '#f87171');
    // contrapositive bottom arrow
    arr(w * 0.69, h * 0.70, w * 0.30, h * 0.70, '~q ⇒ ~p — contrapositive', '#c084fc', true);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('the contrapositive is the only flip that keeps truth — the others can lie', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, LOGIC_SPOTS, v.sel ?? -1);
}
const LOGIC_SPOTS = [
    { label: 'Statement p', fn: 'a sentence that is true or false', x: 0.18, y: 0.35, r: 0.055 },
    { label: 'Statement q', fn: 'the second claim — linked to the first', x: 0.82, y: 0.35, r: 0.055 },
    { label: 'Implication', fn: 'if p then q — p is enough for q', x: 0.50, y: 0.35, r: 0.05 },
    { label: 'Negation', fn: 'the denial — same claim, opposite truth', x: 0.18, y: 0.70, r: 0.05 },
    { label: 'Converse', fn: 'q then p — swapped, not always true', x: 0.50, y: 0.47, r: 0.045 },
    { label: 'Contrapositive', fn: 'not-q then not-p — always keeps truth', x: 0.50, y: 0.70, r: 0.05 },
];

/** dgm_ptable — the long-form periodic table: four blocks. */
function paintPtable(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const rows = 7, cw = w * 0.052, rh = h * 0.075, ox = w * 0.03, oy = h * 0.10;
    const cell = (gx: number, gy: number, col: string, txt = '') => {
        ctx.fillStyle = col; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1;
        ctx.fillRect(ox + gx * cw, oy + gy * rh, cw - 2, rh - 2);
        ctx.strokeRect(ox + gx * cw, oy + gy * rh, cw - 2, rh - 2);
        if (txt) { ctx.fillStyle = '#0f172a'; ctx.font = 'bold 6.5px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(txt, ox + gx * cw + cw / 2 - 1, oy + gy * rh + rh / 2 + 2); }
    };
    for (let r = 0; r < rows; r++) {
        for (let g = 0; g < 18; g++) {
            const isH = r === 0 && (g === 0 || g === 17);
            const valid = isH || (r === 1 && (g < 2 || g > 11)) || (r === 2 && (g < 2 || g > 11)) || (r >= 3);
            if (!valid) continue;
            const col = g < 2 ? '#fbbf24' : g < 12 ? '#4ade80' : '#60a5fa';
            cell(g, r, col, r === 0 && g === 0 ? 'H' : r === 0 && g === 17 ? 'He' : '');
        }
    }
    // f-block strip
    for (let fr = 0; fr < 2; fr++) for (let g = 2; g < 17; g++) cell(g, 7.6 + fr, '#c084fc', fr === 0 && g === 2 ? 'La*' : fr === 1 && g === 2 ? 'Ac*' : '');
    const tag = (gx: number, gy: number, label: string, col: string) => {
        ctx.fillStyle = col; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(label, ox + gx * cw, oy + gy * rh);
    };
    tag(1.9, -0.35, 's-block', '#fbbf24'); tag(7.2, 8.9, 'd-block', '#4ade80');
    tag(15.4, -0.35, 'p-block', '#60a5fa'); tag(9.5, 10.6, 'f-block', '#c084fc');
    // period + group axes
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.save(); ctx.translate(ox - 6, oy + rows * rh / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Periods →', 0, 0); ctx.restore();
    ctx.fillText('Groups →', ox + 9 * cw, oy - h * 0.045);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('same column = same valence pattern — that is why it works', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PTABLE_SPOTS, v.sel ?? -1);
}
const PTABLE_SPOTS = [
    { label: 's-block', fn: 'groups 1-2 — the reactive metals', x: 0.08, y: 0.35, r: 0.05 },
    { label: 'd-block', fn: 'transition metals — the d-block', x: 0.36, y: 0.55, r: 0.07 },
    { label: 'p-block', fn: 'groups 13-18 — metals to noble gases', x: 0.80, y: 0.40, r: 0.07 },
    { label: 'f-block', fn: 'lanthanoids and actinoids — the inner transitions', x: 0.50, y: 0.87, r: 0.07 },
    { label: 'Period', fn: 'a row — same number of shells', x: 0.05, y: 0.72, r: 0.04 },
    { label: 'Group', fn: 'a column — same valence electrons', x: 0.30, y: 0.135, r: 0.04 },
];

/** dgm_pn_junction — the p-n junction: two regions, one depletion zone. */
function paintPnJunction(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    ctx.fillStyle = 'rgba(251,191,36,0.28)'; ctx.fillRect(X(0.06), Y(0.28), X(0.40), Y(0.44));
    ctx.fillStyle = 'rgba(96,165,250,0.28)'; ctx.fillRect(X(0.54), Y(0.28), X(0.40), Y(0.44));
    ctx.fillStyle = 'rgba(148,163,184,0.35)'; ctx.fillRect(X(0.46), Y(0.28), X(0.08), Y(0.44));
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.strokeRect(X(0.06), Y(0.28), X(0.40), Y(0.44)); ctx.strokeRect(X(0.54), Y(0.28), X(0.40), Y(0.44));
    ctx.strokeStyle = '#f8fafc'; ctx.setLineDash([4, 3]);
    ctx.strokeRect(X(0.46), Y(0.28), X(0.08), Y(0.44)); ctx.setLineDash([]);
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('p-type', X(0.26), Y(0.16)); ctx.fillText('n-type', X(0.74), Y(0.16));
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif';
    ctx.fillText('acceptor ions, holes as carriers', X(0.26), Y(0.22));
    ctx.fillText('donor ions, electrons as carriers', X(0.74), Y(0.22));
    const rng = [[0.10, 0.34], [0.18, 0.40], [0.30, 0.36], [0.38, 0.44], [0.14, 0.60], [0.26, 0.62], [0.36, 0.58], [0.10, 0.50], [0.22, 0.50], [0.40, 0.52]];
    rng.forEach(([x, y], i) => { ctx.fillStyle = i % 2 ? '#fca5a5' : '#fbbf24'; ctx.beginPath(); ctx.arc(X(x), Y(y), w * 0.012, 0, Math.PI * 2); ctx.fill(); });
    const erng = [[0.60, 0.34], [0.68, 0.40], [0.80, 0.36], [0.88, 0.44], [0.64, 0.60], [0.76, 0.62], [0.86, 0.58], [0.60, 0.50], [0.72, 0.50], [0.90, 0.52]];
    erng.forEach(([x, y], i) => { ctx.fillStyle = i % 2 ? '#93c5fd' : '#60a5fa'; ctx.beginPath(); ctx.arc(X(x), Y(y), w * 0.012, 0, Math.PI * 2); ctx.fill(); });
    ctx.fillStyle = '#fca5a5'; ctx.font = 'bold 7px sans-serif';
    ctx.fillText('−', X(0.475), Y(0.40)); ctx.fillText('−', X(0.475), Y(0.60));
    ctx.fillStyle = '#93c5fd';
    ctx.fillText('+', X(0.525), Y(0.40)); ctx.fillText('+', X(0.525), Y(0.60));
    ctx.fillStyle = '#cbd5e1'; ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('depletion region — no free carriers', X(0.50), Y(0.80));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('electrons meet holes here — a barrier forms, and only bias voltage can cross it', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PN_SPOTS, v.sel ?? -1);
}
const PN_SPOTS = [
    { label: 'p-type side', fn: 'acceptor-doped — holes are the majority carriers', x: 0.26, y: 0.45, r: 0.08 },
    { label: 'n-type side', fn: 'donor-doped — electrons are the majority carriers', x: 0.74, y: 0.45, r: 0.08 },
    { label: 'Depletion region', fn: 'the neutral zone at the junction — carriers have recombined', x: 0.50, y: 0.50, r: 0.06 },
    { label: 'Potential barrier', fn: 'the built-in voltage the junction holds — ~0.7 V for silicon', x: 0.50, y: 0.78, r: 0.05 },
    { label: 'Holes', fn: 'the positive carriers drifting through the p-side', x: 0.14, y: 0.60, r: 0.05 },
    { label: 'Electrons', fn: 'the negative carriers drifting through the n-side', x: 0.86, y: 0.58, r: 0.05 },
    { label: 'The junction', fn: 'where p meets n — the heart of every diode', x: 0.50, y: 0.28, r: 0.045 },
];

/** dgm_rectifier — full-wave rectifier: AC in, pulsing DC out. */
function paintRectifier(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // AC source + transformer
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(X(0.08), Y(0.45), w * 0.028, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('~', X(0.08), Y(0.45) + 3);
    ctx.fillText('AC in', X(0.08), Y(0.72));
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(X(0.17), Y(0.35) + i * Y(0.065), w * 0.012, Math.PI / 2, Math.PI * 1.5); ctx.stroke(); }
    ctx.strokeStyle = '#94a3b8';
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(X(0.215), Y(0.35) + i * Y(0.065), w * 0.012, -Math.PI / 2, Math.PI / 2); ctx.stroke(); }
    ctx.fillStyle = '#94a3b8'; ctx.fillText('transformer', X(0.19), Y(0.72));
    // centre tap
    ctx.strokeStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(X(0.19), Y(0.45)); ctx.lineTo(X(0.19), Y(0.52)); ctx.lineTo(X(0.42), Y(0.52)); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.fillText('centre tap', X(0.19), Y(0.60));
    // diodes
    const diode = (x: number, y: number) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x - w * 0.02, y); ctx.lineTo(x + w * 0.02, y); ctx.stroke();
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(x - w * 0.012, y - 5); ctx.lineTo(x + w * 0.012, y); ctx.lineTo(x - w * 0.012, y + 5); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(x + w * 0.012, y - 6); ctx.lineTo(x + w * 0.012, y + 6); ctx.stroke();
    };
    diode(X(0.32), Y(0.33)); diode(X(0.32), Y(0.60));
    ctx.fillStyle = '#fde68a'; ctx.font = '7.5px sans-serif';
    ctx.fillText('D1', X(0.32), Y(0.25)); ctx.fillText('D2', X(0.32), Y(0.68));
    // wires to load
    ctx.strokeStyle = '#e2e8f0';
    ctx.beginPath(); ctx.moveTo(X(0.34), Y(0.33)); ctx.lineTo(X(0.42), Y(0.33)); ctx.lineTo(X(0.42), Y(0.45)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.34), Y(0.60)); ctx.lineTo(X(0.42), Y(0.60)); ctx.lineTo(X(0.42), Y(0.45)); ctx.stroke();
    // load resistor
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.42), Y(0.45)); ctx.lineTo(X(0.42), Y(0.52));
    let zx = 0.42; for (let i = 0; i < 6; i++) { ctx.lineTo(X(zx), Y(0.52) + (i % 2 ? -6 : 6)); }
    ctx.stroke();
    ctx.fillStyle = '#4ade80'; ctx.font = '7.5px sans-serif'; ctx.fillText('load RL', X(0.48), Y(0.50));
    // waveforms
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5; ctx.beginPath();
    for (let x = 0; x < w * 0.22; x++) { const yy = Y(0.18) - Math.sin(x / w * 60) * 14; x ? ctx.lineTo(X(0.62) + x, yy) : ctx.moveTo(X(0.62), yy); }
    ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.fillText('AC input', X(0.73), Y(0.06));
    ctx.strokeStyle = '#4ade80'; ctx.beginPath();
    for (let x = 0; x < w * 0.22; x++) { const yy = Y(0.80) - Math.abs(Math.sin(x / w * 60)) * 14; x ? ctx.lineTo(X(0.62) + x, yy) : ctx.moveTo(X(0.62), yy); }
    ctx.stroke();
    ctx.fillStyle = '#4ade80'; ctx.fillText('pulsing DC out', X(0.73), Y(0.92));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('each diode takes a half-cycle — both halves reach the load pointing the same way', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, RECT_SPOTS, v.sel ?? -1);
}
const RECT_SPOTS = [
    { label: 'AC source', fn: 'the alternating supply being converted', x: 0.08, y: 0.45, r: 0.05 },
    { label: 'Centre-tap transformer', fn: 'splits the winding into two opposite phases', x: 0.19, y: 0.45, r: 0.06 },
    { label: 'Diode D1', fn: 'conducts on the positive half-cycle', x: 0.32, y: 0.33, r: 0.045 },
    { label: 'Diode D2', fn: 'conducts on the negative half-cycle', x: 0.32, y: 0.60, r: 0.045 },
    { label: 'Load resistor RL', fn: 'where the rectified current does its work', x: 0.45, y: 0.48, r: 0.05 },
    { label: 'AC input wave', fn: 'alternates positive and negative', x: 0.73, y: 0.18, r: 0.06 },
    { label: 'Pulsed DC output', fn: 'both halves now flow one way — full-wave rectified', x: 0.73, y: 0.80, r: 0.06 },
];

/** dgm_ac_generator — the alternator: rotating coil, slip rings, brushes. */
function paintAcGenerator(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // magnet poles
    ctx.fillStyle = '#f87171'; ctx.fillRect(X(0.14), Y(0.16), X(0.16), Y(0.08));
    ctx.fillStyle = '#60a5fa'; ctx.fillRect(X(0.14), Y(0.70), X(0.16), Y(0.08));
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('N', X(0.22), Y(0.21)); ctx.fillText('S', X(0.22), Y(0.75));
    // field lines
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(X(0.16 + i * 0.03), Y(0.24)); ctx.lineTo(X(0.16 + i * 0.03), Y(0.70)); ctx.stroke(); }
    // rotating coil
    const ang = (v.sel ?? -1) >= 0 ? 0 : Math.sin(t * 0.02) * 0.15;
    ctx.save(); ctx.translate(X(0.30), Y(0.45)); ctx.rotate(ang);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3; ctx.strokeRect(-w * 0.05, -h * 0.16, w * 0.10, h * 0.32);
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('A', -w * 0.05 - 8, -h * 0.14); ctx.fillText('B', -w * 0.05 - 8, h * 0.14);
    ctx.fillText('C', w * 0.05 + 10, h * 0.14); ctx.fillText('D', w * 0.05 + 10, -h * 0.14);
    ctx.restore();
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif';
    ctx.fillText('armature coil', X(0.30), Y(0.90));
    // axle + slip rings
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.35), Y(0.45)); ctx.lineTo(X(0.52), Y(0.45)); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(X(0.56), Y(0.40), w * 0.014, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(X(0.56), Y(0.50), w * 0.014, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = '7.5px sans-serif';
    ctx.fillText('slip rings', X(0.58), Y(0.62));
    // brushes
    ctx.fillStyle = '#4ade80'; ctx.fillRect(X(0.60), Y(0.36), w * 0.018, 8); ctx.fillRect(X(0.60), Y(0.50), w * 0.018, 8);
    ctx.fillText('brushes', X(0.62), Y(0.70));
    // output
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.40)); ctx.lineTo(X(0.80), Y(0.40)); ctx.lineTo(X(0.80), Y(0.30)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.52)); ctx.lineTo(X(0.80), Y(0.52)); ctx.lineTo(X(0.80), Y(0.60)); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.80), Y(0.45), w * 0.02, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('💡', X(0.80), Y(0.45) + 4);
    // output wave
    ctx.strokeStyle = '#4ade80'; ctx.beginPath();
    for (let x = 0; x < w * 0.16; x++) { const yy = Y(0.82) - Math.sin(x / w * 40) * 10; x ? ctx.lineTo(X(0.72) + x, yy) : ctx.moveTo(X(0.72), yy); }
    ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the coil spins in the field — flux through it keeps changing, so an alternating emf is induced', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, GEN_SPOTS, v.sel ?? -1);
}
const GEN_SPOTS = [
    { label: 'Field magnets (N,S)', fn: 'the steady magnetic field the coil spins in', x: 0.22, y: 0.45, r: 0.07 },
    { label: 'Armature coil ABCD', fn: 'the rotating loop — flux through it rises and falls', x: 0.30, y: 0.45, r: 0.08 },
    { label: 'Slip rings', fn: 'rotate with the coil — keep the contacts continuous', x: 0.56, y: 0.45, r: 0.05 },
    { label: 'Brushes', fn: 'fixed contacts sliding on the rings — carry current out', x: 0.62, y: 0.44, r: 0.045 },
    { label: 'External load', fn: 'the lamp — powered by the induced emf', x: 0.80, y: 0.45, r: 0.05 },
    { label: 'AC output', fn: 'the induced emf reverses every half-turn — alternating current', x: 0.80, y: 0.82, r: 0.06 },
    { label: 'Rotation', fn: 'mechanical energy in → electrical energy out', x: 0.36, y: 0.20, r: 0.05 },
];

/** dgm_logic_gates — the five basic gates with their truth. */
function paintLogicGates(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const gates: [string, string, number, number][] = [
        ['AND', '#fbbf24', 0.14, 0.22], ['OR', '#4ade80', 0.38, 0.22],
        ['NOT', '#f87171', 0.62, 0.22], ['NAND', '#c084fc', 0.26, 0.62], ['NOR', '#60a5fa', 0.55, 0.62],
    ];
    gates.forEach(([name, col, gx, gy]) => {
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X(gx), Y(gy), w * 0.14, Y(0.18), 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, X(gx + 0.07), Y(gy) + Y(0.075));
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(X(gx - 0.02), Y(gy + 0.05)); ctx.lineTo(X(gx), Y(gy + 0.05)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(gx - 0.02), Y(gy + 0.13)); ctx.lineTo(X(gx), Y(gy + 0.13)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(gx + 0.14), Y(gy + 0.09)); ctx.lineTo(X(gx + 0.16), Y(gy + 0.09)); ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.font = '6.5px sans-serif';
        const truth: Record<string, string> = { AND: 'only 1·1 → 1', OR: 'any 1 → 1', NOT: 'flips the input', NAND: 'AND then flip', NOR: 'OR then flip' };
        ctx.fillText(truth[name], X(gx + 0.07), Y(gy) + Y(0.15));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('two inputs in, one output out — NAND and NOR are the universal building blocks', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, GATE_SPOTS, v.sel ?? -1);
}
const GATE_SPOTS = [
    { label: 'AND gate', fn: 'output 1 only when BOTH inputs are 1', x: 0.21, y: 0.31, r: 0.06 },
    { label: 'OR gate', fn: 'output 1 when EITHER input is 1', x: 0.45, y: 0.31, r: 0.06 },
    { label: 'NOT gate', fn: 'one input — the output is always the opposite', x: 0.69, y: 0.31, r: 0.06 },
    { label: 'NAND gate', fn: 'AND with a flip — universal gate, builds everything', x: 0.33, y: 0.71, r: 0.06 },
    { label: 'NOR gate', fn: 'OR with a flip — the other universal gate', x: 0.62, y: 0.71, r: 0.06 },
    { label: 'Inputs A,B', fn: 'the two binary feeds — 0 or 1 each', x: 0.10, y: 0.30, r: 0.04 },
    { label: 'Output Y', fn: 'the single binary result', x: 0.80, y: 0.31, r: 0.045 },
];

/** Kingdom classification painters — NCERT tree layouts. */
function paintKingdoms(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // root
    ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.33), Y(0.06), w * 0.34, 22, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 8.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('LIVING ORGANISMS', X(0.50), Y(0.06) + 14);
    const k = [
        ['Monera', '#f87171', 'no nucleus —|bacteria'],
        ['Protista', '#fbbf24', 'one-celled|eukaryotes'],
        ['Fungi', '#c084fc', 'absorbers —|moulds, mushrooms'],
        ['Plantae', '#4ade80', 'makers —|photosynthesis'],
        ['Animalia', '#60a5fa', 'movers —|eat other life'],
    ];
    k.forEach(([label, col, fn], i) => {
        const x = 0.135 + i * 0.1825;
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(X(0.50), Y(0.19)); ctx.lineTo(X(x), Y(0.42)); ctx.stroke();
        // icon blob
        ctx.fillStyle = col as string;
        ctx.beginPath(); ctx.arc(X(x), Y(0.52), w * 0.045, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif';
        ctx.fillText(String(i + 1), X(x), Y(0.52) + 3);
        ctx.fillStyle = col as string; ctx.font = 'bold 8.5px sans-serif';
        ctx.fillText(label as string, X(x), Y(0.66));
        ctx.fillStyle = '#94a3b8'; ctx.font = '7px sans-serif';
        (fn as string).split('|').forEach((ln, j) => ctx.fillText(ln, X(x), Y(0.72 + j * 0.045)));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText("Whittaker's five kingdoms — sorted by cell type and how they eat", w / 2, h - 4);
    paintDiagramSel(ctx, w, h, KINGDOM_SPOTS, v.sel ?? -1);
}
const KINGDOM_SPOTS = [
    { label: 'Monera', fn: 'prokaryotes — bacteria, no true nucleus', x: 0.135, y: 0.55, r: 0.055 },
    { label: 'Protista', fn: 'unicellular eukaryotes — amoeba, paramecium', x: 0.3175, y: 0.55, r: 0.055 },
    { label: 'Fungi', fn: 'absorptive feeders — moulds, yeasts, mushrooms', x: 0.50, y: 0.55, r: 0.055 },
    { label: 'Plantae', fn: 'photosynthetic multicellular producers', x: 0.6825, y: 0.55, r: 0.055 },
    { label: 'Animalia', fn: 'ingesting multicellular consumers', x: 0.865, y: 0.55, r: 0.055 },
    { label: 'Living organisms', fn: 'the whole tree — five kingdoms below', x: 0.50, y: 0.13, r: 0.05 },
];

/** dgm_plant_kingdom — plant groups as an evolutionary series. */
function paintPlantKingdom(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const groups = [
        ['Algae', '#4ade80', 'water-dwellers|no true roots'],
        ['Bryophyta', '#86efac', 'mosses —|amphibian plants'],
        ['Pteridophyta', '#fbbf24', 'ferns —|first vessels'],
        ['Gymnosperms', '#fb923c', 'naked seeds|cones not fruit'],
        ['Angiosperms', '#f472b6', 'flowers|and fruit'],
    ];
    groups.forEach(([label, col, fn], i) => {
        const x = 0.17 + i * 0.165, y = 0.70 - i * 0.12;
        // step
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(X(x - 0.10), Y(0.86)); ctx.lineTo(X(x + 0.02), Y(0.86)); ctx.stroke();
        // plant dot + stem
        ctx.fillStyle = col as string;
        ctx.beginPath(); ctx.arc(X(x), Y(y), w * 0.045, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(i + 1), X(x), Y(y) + 3);
        ctx.fillStyle = col as string; ctx.font = 'bold 8px sans-serif';
        ctx.fillText(label as string, X(x), Y(y) + w * 0.045 + 12);
        ctx.fillStyle = '#94a3b8'; ctx.font = '6.5px sans-serif';
        (fn as string).split('|').forEach((ln, j) => ctx.fillText(ln, X(x), Y(y) + w * 0.045 + 22 + j * 8));
        // connector arrow to next
        if (i < groups.length - 1) {
            ctx.strokeStyle = '#7dd3fc'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(X(x + 0.055), Y(y - 8)); ctx.lineTo(X(x + 0.165 - 0.055), Y(0.70 - (i + 1) * 0.12 + 8)); ctx.stroke(); ctx.setLineDash([]);
        }
    });
    // rising arrow
    ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(X(0.06), Y(0.90)); ctx.lineTo(X(0.97), Y(0.16)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.97), Y(0.16)); ctx.lineTo(X(0.93), Y(0.16)); ctx.moveTo(X(0.97), Y(0.16)); ctx.lineTo(X(0.97), Y(0.20)); ctx.stroke();
    ctx.fillStyle = '#7dd3fc'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('increasing complexity', X(0.62), Y(0.13));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('from pond scum to flowers — the plant kingdom in five steps', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PLANTK_SPOTS, v.sel ?? -1);
}
const PLANTK_SPOTS = [
    { label: 'Algae', fn: 'aquatic, thalloid — chlorophyll inside', x: 0.17, y: 0.70, r: 0.05 },
    { label: 'Bryophyta', fn: 'mosses — need water to reproduce', x: 0.335, y: 0.58, r: 0.05 },
    { label: 'Pteridophyta', fn: 'ferns — first vascular tissue', x: 0.50, y: 0.46, r: 0.05 },
    { label: 'Gymnosperms', fn: 'conifers — seeds without fruit', x: 0.665, y: 0.34, r: 0.05 },
    { label: 'Angiosperms', fn: 'flowering plants — seeds inside fruit', x: 0.83, y: 0.22, r: 0.05 },
];

/** dgm_animal_kingdom — the phyla ladder from pores to backbone. */
function paintAnimalKingdom(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const phyla = [
        ['Porifera', 'pores — no tissues'],
        ['Coelenterata', 'stinging cells — one opening'],
        ['Platyhelminthes', 'flatworms — first organs'],
        ['Aschelminthes', 'roundworms — body cavity'],
        ['Annelida', 'segments — earthworm style'],
        ['Arthropoda', 'jointed legs — the biggest phylum'],
        ['Mollusca', 'soft body, hard shell'],
        ['Echinodermata', 'spiny skin, water vessels'],
        ['Hemichordata', 'half a notochord'],
        ['Chordata', 'notochord — includes you'],
    ];
    const cols = ['#f87171','#fb923c','#fbbf24','#fde047','#a3e635','#4ade80','#34d399','#22d3ee','#818cf8','#c084fc'];
    phyla.forEach(([label, fn], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = 0.13 + col * 0.52, y = 0.10 + row * 0.165;
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(X(x - 0.11), Y(y - 0.055), w * 0.46, h * 0.13, 6); ctx.stroke();
        ctx.fillStyle = cols[i];
        ctx.beginPath(); ctx.arc(X(x - 0.05), Y(y + 0.008), w * 0.028, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 6px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(i + 1), X(x - 0.05), Y(y + 0.008) + 2);
        ctx.fillStyle = cols[i]; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(label, X(x + 0.01), Y(y));
        ctx.fillStyle = '#94a3b8'; ctx.font = '7px sans-serif';
        ctx.fillText(fn, X(x + 0.01), Y(y + 0.04));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('ten phyla — read top-to-bottom: simpler to more complex body plans', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, ANIMALK_SPOTS, v.sel ?? -1);
}
const ANIMALK_SPOTS = [
    { label: 'Porifera', fn: 'the sponges — porous body, no true tissues', x: 0.20, y: 0.10, r: 0.045 },
    { label: 'Coelenterata', fn: 'cnidarians — stinging cells, two layers', x: 0.72, y: 0.10, r: 0.045 },
    { label: 'Platyhelminthes', fn: 'flatworms — first triploblastic organs', x: 0.20, y: 0.265, r: 0.045 },
    { label: 'Aschelminthes', fn: 'roundworms — first full body cavity', x: 0.72, y: 0.265, r: 0.045 },
    { label: 'Annelida', fn: 'segmented worms — metameric body', x: 0.20, y: 0.43, r: 0.045 },
    { label: 'Arthropoda', fn: 'jointed legs + exoskeleton — largest phylum', x: 0.72, y: 0.43, r: 0.045 },
    { label: 'Mollusca', fn: 'soft unsegmented body in a shell', x: 0.20, y: 0.595, r: 0.045 },
    { label: 'Echinodermata', fn: 'spiny skin and water vascular system', x: 0.72, y: 0.595, r: 0.045 },
    { label: 'Hemichordata', fn: 'worm-like — protochordates at the doorstep', x: 0.20, y: 0.76, r: 0.045 },
    { label: 'Chordata', fn: 'notochord + dorsal nerve cord — vertebrates live here', x: 0.72, y: 0.76, r: 0.045 },
];

/** dgm_sets — the Venn diagram: universal set, two overlapping sets. */
function paintSets(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // universal set
    ctx.fillStyle = 'rgba(30,41,59,0.85)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.08), Y(0.10), w * 0.84, h * 0.74, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#cbd5e1'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('U', X(0.10), Y(0.17));
    // circle A
    ctx.fillStyle = 'rgba(96,165,250,0.30)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(X(0.40), Y(0.48), w * 0.19, h * 0.22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // circle B
    ctx.fillStyle = 'rgba(248,113,113,0.30)'; ctx.strokeStyle = '#f87171';
    ctx.beginPath(); ctx.ellipse(X(0.62), Y(0.48), w * 0.19, h * 0.22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillStyle = '#93c5fd'; ctx.fillText('A', X(0.31), Y(0.50));
    ctx.fillStyle = '#fca5a5'; ctx.fillText('B', X(0.72), Y(0.50));
    // region labels
    ctx.font = 'bold 7.5px sans-serif';
    ctx.fillStyle = '#93c5fd'; ctx.fillText('A only', X(0.33), Y(0.62));
    ctx.fillStyle = '#e2e8f0'; ctx.fillText('A ∩ B', X(0.51), Y(0.50));
    ctx.fillStyle = '#fca5a5'; ctx.fillText('B only', X(0.70), Y(0.62));
    ctx.fillStyle = '#94a3b8'; ctx.fillText("A′ — outside A", X(0.80), Y(0.78));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('union = all of it; intersection = the shared lens; complement = outside', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SETS_SPOTS, v.sel ?? -1);
}
const SETS_SPOTS = [
    { label: 'Set A', fn: 'one collection inside the universal set', x: 0.30, y: 0.40, r: 0.045 },
    { label: 'Set B', fn: 'the second collection', x: 0.72, y: 0.40, r: 0.045 },
    { label: 'A ∩ B — intersection', fn: 'members common to both sets', x: 0.51, y: 0.50, r: 0.045 },
    { label: 'A ∪ B — union', fn: 'everything in A or B or both', x: 0.51, y: 0.66, r: 0.05 },
    { label: "A' — complement", fn: 'everything in U that is not in A', x: 0.83, y: 0.78, r: 0.045 },
    { label: 'Universal set U', fn: 'the whole rectangle — every member lives here', x: 0.15, y: 0.16, r: 0.045 },
];

/** dgm_power_plant — thermal power station schematic. */
function paintPowerPlant(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const box = (cx: number, cy: number, bw: number, bh: number, label: string, col: string) => {
        ctx.fillStyle = 'rgba(51,65,85,0.92)'; ctx.strokeStyle = col; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.roundRect(cx - bw / 2, cy - bh / 2, bw, bh, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        label.split('|').forEach((ln, i) => ctx.fillText(ln, cx, cy + (i - (label.split('|').length - 1) / 2) * 10 + 3));
    };
    const arr = (x1: number, y1: number, x2: number, y2: number, col = '#7dd3fc') => {
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a - 0.5), y2 - 6 * Math.sin(a - 0.5));
        ctx.moveTo(x2, y2); ctx.lineTo(x2 - 6 * Math.cos(a + 0.5), y2 - 6 * Math.sin(a + 0.5)); ctx.stroke();
    };
    // coal pile + conveyor
    ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(X(0.06), Y(0.80)); ctx.quadraticCurveTo(X(0.10), Y(0.66), X(0.16), Y(0.80)); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Coal', X(0.11), Y(0.77));
    // boiler with fire
    ctx.fillStyle = '#451a03'; ctx.strokeStyle = '#fb923c'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.roundRect(X(0.20), Y(0.42), w * 0.15, h * 0.34, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fb923c';
    const fy = 0.72 + 0.02 * Math.sin(t * 6);
    ctx.beginPath(); ctx.moveTo(X(0.275), Y(fy - 0.09)); ctx.quadraticCurveTo(X(0.30), Y(fy - 0.03), X(0.275), Y(fy)); ctx.quadraticCurveTo(X(0.25), Y(fy - 0.03), X(0.275), Y(fy - 0.09)); ctx.fill();
    ctx.fillStyle = '#fdba74'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Boiler', X(0.275), Y(0.52));
    ctx.fillText('water → steam', X(0.275), Y(0.60));
    // turbine
    ctx.fillStyle = '#1e3a5f'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(X(0.44), Y(0.60)); ctx.lineTo(X(0.52), Y(0.52)); ctx.lineTo(X(0.52), Y(0.68)); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#93c5fd'; ctx.fillText('Turbine', X(0.50), Y(0.48));
    // generator
    ctx.fillStyle = '#14532d'; ctx.strokeStyle = '#4ade80';
    ctx.beginPath(); ctx.roundRect(X(0.58), Y(0.52), w * 0.14, h * 0.18, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#bbf7d0'; ctx.fillText('Generator', X(0.65), Y(0.62));
    // transmission pylon
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(X(0.86), Y(0.72)); ctx.lineTo(X(0.83), Y(0.44)); ctx.lineTo(X(0.89), Y(0.44)); ctx.lineTo(X(0.86), Y(0.72)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.81), Y(0.50)); ctx.lineTo(X(0.91), Y(0.50)); ctx.moveTo(X(0.83), Y(0.56)); ctx.lineTo(X(0.89), Y(0.56)); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.fillText('Grid', X(0.86), Y(0.40));
    // steam + power arrows
    arr(X(0.16), Y(0.74), X(0.19), Y(0.74), '#94a3b8');
    arr(X(0.355), Y(0.55), X(0.43), Y(0.55));
    arr(X(0.525), Y(0.60), X(0.575), Y(0.60));
    arr(X(0.725), Y(0.60), X(0.80), Y(0.55), '#fbbf24');
    // condenser + cooling loop
    ctx.fillStyle = '#164e63'; ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.roundRect(X(0.40), Y(0.78), w * 0.20, h * 0.10, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#a5f3fc'; ctx.fillText('Condenser + cooling water', X(0.50), Y(0.845));
    ctx.strokeStyle = '#22d3ee'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(X(0.44), Y(0.70)); ctx.lineTo(X(0.44), Y(0.78)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.28), Y(0.83)); ctx.lineTo(X(0.28), Y(0.77)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('coal heats water → steam spins turbine → generator makes electricity', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, POWER_SPOTS, v.sel ?? -1);
}
const POWER_SPOTS = [
    { label: 'Coal', fn: 'the fuel — chemical energy in', x: 0.11, y: 0.72, r: 0.045 },
    { label: 'Boiler', fn: 'water heated to high-pressure steam', x: 0.275, y: 0.58, r: 0.05 },
    { label: 'Steam turbine', fn: 'steam pushes the blades — heat becomes motion', x: 0.48, y: 0.60, r: 0.05 },
    { label: 'Generator', fn: 'the spinning shaft induces current', x: 0.65, y: 0.61, r: 0.05 },
    { label: 'Transmission lines', fn: 'electricity leaves for the grid', x: 0.86, y: 0.55, r: 0.05 },
    { label: 'Condenser', fn: 'spent steam cools back to water — the loop repeats', x: 0.50, y: 0.83, r: 0.05 },
];

/** dgm_contraception — the five method families. */
/** dgm_myopia — short sight: image forms in front of the retina, concave fixes it. */
function paintMyopia(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const eye = (cx: number) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(X(cx), Y(0.40), w * 0.10, h * 0.17, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(X(cx - 0.045), Y(0.40), w * 0.020, -1.1, 1.1); ctx.stroke();
        ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(cx + 0.095), Y(0.26)); ctx.lineTo(X(cx + 0.095), Y(0.54)); ctx.stroke(); ctx.setLineDash([]);
    };
    // top: defective eye
    ctx.save(); ctx.translate(0, -h * 0.18);
    eye(0.55);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.33)); ctx.lineTo(X(0.58), Y(0.40)); ctx.lineTo(X(0.62), Y(0.44)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.47)); ctx.lineTo(X(0.58), Y(0.40)); ctx.lineTo(X(0.62), Y(0.36)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('image forms BEFORE the retina', X(0.45), Y(0.62));
    ctx.restore();
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('the defect', X(0.30), Y(0.10));
    // bottom: corrected with concave lens
    ctx.save(); ctx.translate(0, h * 0.42);
    eye(0.55);
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.40), Y(0.28)); ctx.quadraticCurveTo(X(0.37), Y(0.40), X(0.40), Y(0.52)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.43), Y(0.28)); ctx.quadraticCurveTo(X(0.46), Y(0.40), X(0.43), Y(0.52)); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.33)); ctx.lineTo(X(0.415), Y(0.36)); ctx.lineTo(X(0.645), Y(0.44)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.47)); ctx.lineTo(X(0.415), Y(0.44)); ctx.lineTo(X(0.645), Y(0.36)); ctx.stroke();
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('concave lens spreads the rays — image lands ON the retina', X(0.45), Y(0.62));
    ctx.restore();
    ctx.fillStyle = '#e2e8f0'; ctx.fillText('the correction', X(0.30), Y(0.52));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('eyeball too long or lens too strong — near objects clear, distant ones blurred', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, MYOPIA_SPOTS, v.sel ?? -1);
}
const MYOPIA_SPOTS = [
    { label: 'Parallel rays', fn: 'from a distant object — should focus on the retina', x: 0.20, y: 0.18, r: 0.05 },
    { label: 'Focus before retina', fn: 'the defect — rays cross too early, blur at the back', x: 0.60, y: 0.22, r: 0.05 },
    { label: 'Retina', fn: 'the screen at the back of the eye', x: 0.65, y: 0.28, r: 0.045 },
    { label: 'Concave lens', fn: 'the fix — diverges rays before the eye converges them', x: 0.42, y: 0.60, r: 0.05 },
    { label: 'Sharp image', fn: 'corrected — the image now lands exactly on the retina', x: 0.65, y: 0.68, r: 0.05 },
    { label: 'Eye lens', fn: 'too strong in myopia — bends rays too hard', x: 0.52, y: 0.70, r: 0.045 },
];

/** dgm_hypermetropia — long sight: image forms behind the retina, convex fixes it. */
function paintHypermetropia(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const eye = (cx: number) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(X(cx), Y(0.40), w * 0.10, h * 0.17, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(X(cx - 0.045), Y(0.40), w * 0.020, -1.1, 1.1); ctx.stroke();
        ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(cx + 0.095), Y(0.26)); ctx.lineTo(X(cx + 0.095), Y(0.54)); ctx.stroke(); ctx.setLineDash([]);
    };
    ctx.save(); ctx.translate(0, -h * 0.18);
    eye(0.55);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.33)); ctx.lineTo(X(0.60), Y(0.39)); ctx.lineTo(X(0.80), Y(0.44)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.47)); ctx.lineTo(X(0.60), Y(0.41)); ctx.lineTo(X(0.80), Y(0.36)); ctx.stroke();
    ctx.strokeStyle = '#f87171'; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.65), Y(0.39)); ctx.lineTo(X(0.80), Y(0.44)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.65), Y(0.41)); ctx.lineTo(X(0.80), Y(0.36)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('image would form BEHIND the retina', X(0.45), Y(0.62));
    ctx.restore();
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('the defect', X(0.30), Y(0.10));
    ctx.save(); ctx.translate(0, h * 0.42);
    eye(0.55);
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.415), Y(0.27)); ctx.quadraticCurveTo(X(0.38), Y(0.40), X(0.415), Y(0.53)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.415), Y(0.27)); ctx.quadraticCurveTo(X(0.45), Y(0.40), X(0.415), Y(0.53)); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.33)); ctx.lineTo(X(0.415), Y(0.35)); ctx.lineTo(X(0.645), Y(0.43)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.12), Y(0.47)); ctx.lineTo(X(0.415), Y(0.45)); ctx.lineTo(X(0.645), Y(0.37)); ctx.stroke();
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('convex lens adds convergence — image lands ON the retina', X(0.45), Y(0.62));
    ctx.restore();
    ctx.fillStyle = '#e2e8f0'; ctx.fillText('the correction', X(0.30), Y(0.52));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('eyeball too short or lens too weak — distant objects clear, near ones blurred', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, HYPER_SPOTS, v.sel ?? -1);
}
const HYPER_SPOTS = [
    { label: 'Parallel rays', fn: 'from a near object — should focus on the retina', x: 0.20, y: 0.18, r: 0.05 },
    { label: 'Focus behind retina', fn: 'the defect — rays would cross past the back wall', x: 0.78, y: 0.22, r: 0.05 },
    { label: 'Retina', fn: 'the screen the rays never quite reach', x: 0.65, y: 0.28, r: 0.045 },
    { label: 'Convex lens', fn: 'the fix — adds the extra convergence the eye lacks', x: 0.42, y: 0.60, r: 0.05 },
    { label: 'Sharp image', fn: 'corrected — the image lands on the retina', x: 0.65, y: 0.68, r: 0.05 },
    { label: 'Eye lens', fn: 'too weak in hypermetropia — under-bends the rays', x: 0.52, y: 0.70, r: 0.045 },
];

/** dgm_domestic_circuit — the household wiring: live, neutral, earth, fuse, main switch. */
function paintDomesticCircuit(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // meter + main switch on the left
    ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.08), Y(0.14), w * 0.20, h * 0.18, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('METER', X(0.18), Y(0.20)); ctx.fillText('+ MAIN', X(0.18), Y(0.25)); ctx.fillText('SWITCH', X(0.18), Y(0.30));
    // live wire (red) top, neutral (black) bottom
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(X(0.28), Y(0.18)); ctx.lineTo(X(0.94), Y(0.18)); ctx.stroke();
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath(); ctx.moveTo(X(0.28), Y(0.30)); ctx.lineTo(X(0.94), Y(0.30)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.fillText('LIVE', X(0.92), Y(0.15));
    ctx.fillStyle = '#94a3b8'; ctx.fillText('NEUTRAL', X(0.92), Y(0.27));
    // fuse on live wire
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(X(0.38), Y(0.165), w * 0.05, h * 0.03);
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif'; ctx.fillText('FUSE', X(0.405), Y(0.185));
    // appliance branches
    const apps: [number, string][] = [[0.52, 'BULB'], [0.66, 'FAN'], [0.80, 'PLUG']];
    apps.forEach(([ax, name]) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(X(ax), Y(0.18)); ctx.lineTo(X(ax), Y(0.48)); ctx.lineTo(X(ax + 0.05), Y(0.48)); ctx.lineTo(X(ax + 0.05), Y(0.30)); ctx.stroke();
        ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(X(ax + 0.025), Y(0.52), w * 0.018, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 6.5px sans-serif'; ctx.fillText(name, X(ax + 0.025), Y(0.52) + 3);
    });
    // earth wire
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2; ctx.setLineDash([5, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.80), Y(0.48)); ctx.lineTo(X(0.80), Y(0.72)); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(X(0.78 - i * 0.008), Y(0.72 + i * 0.02)); ctx.lineTo(X(0.82 + i * 0.008), Y(0.72 + i * 0.02)); ctx.stroke(); }
    ctx.fillStyle = '#4ade80'; ctx.fillText('EARTH', X(0.80), Y(0.82));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('live carries the current in, neutral returns it, earth dumps any fault to the ground', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, DOM_SPOTS, v.sel ?? -1);
}
const DOM_SPOTS = [
    { label: 'Meter + main switch', fn: 'where the supply enters and gets measured', x: 0.18, y: 0.23, r: 0.06 },
    { label: 'Live wire', fn: 'red — carries current in at 220 V', x: 0.60, y: 0.18, r: 0.05 },
    { label: 'Neutral wire', fn: 'black — completes the circuit back to the supply', x: 0.60, y: 0.30, r: 0.05 },
    { label: 'Fuse', fn: 'melts if the current surges — the circuit breaks', x: 0.405, y: 0.18, r: 0.045 },
    { label: 'Appliances', fn: 'bulb, fan, plug — each wired in parallel', x: 0.66, y: 0.50, r: 0.07 },
    { label: 'Earth wire', fn: 'green — safety path dumping fault current to ground', x: 0.80, y: 0.65, r: 0.05 },
];

/** dgm_fleming_left — Fleming's left-hand rule: force, field, current. */
function paintFlemingLeft(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // palm
    ctx.fillStyle = 'rgba(251,191,36,0.25)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(X(0.45), Y(0.52), w * 0.11, h * 0.13, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // thumb (force) — up-left
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(X(0.40), Y(0.46)); ctx.lineTo(X(0.30), Y(0.26)); ctx.stroke();
    // forefinger (field) — right
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(X(0.52), Y(0.46)); ctx.lineTo(X(0.70), Y(0.34)); ctx.stroke();
    // middle finger (current) — down
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(X(0.50), Y(0.58)); ctx.lineTo(X(0.54), Y(0.80)); ctx.stroke();
    ctx.lineCap = 'butt';
    const lbl = (x: number, y: number, txt: string, col: string) => { ctx.fillStyle = col; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(txt, X(x), Y(y)); };
    lbl(0.28, 0.22, 'THUMB = FORCE', '#f87171');
    lbl(0.74, 0.30, 'FOREFINGER = FIELD', '#60a5fa');
    lbl(0.56, 0.88, 'MIDDLE = CURRENT', '#4ade80');
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('all three at right angles — field × current pushes the wire', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, FLEM_SPOTS, v.sel ?? -1);
}
const FLEM_SPOTS = [
    { label: 'Thumb = Force', fn: 'the direction the conductor gets pushed (motion)', x: 0.32, y: 0.30, r: 0.05 },
    { label: 'Forefinger = Field', fn: 'points N to S — the magnetic field direction', x: 0.66, y: 0.36, r: 0.05 },
    { label: 'Middle = Current', fn: 'points + to − — the conventional current direction', x: 0.53, y: 0.75, r: 0.05 },
    { label: 'Left hand', fn: 'for motors — the right hand is for generators', x: 0.45, y: 0.52, r: 0.07 },
];

/** dgm_ionic_bond — Na + Cl → Na+Cl−: the electron handover. */
function paintIonicBond(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // Na atom left
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    for (const r of [0.05, 0.09, 0.13]) { ctx.beginPath(); ctx.arc(X(0.20), Y(0.42), w * r, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.20), Y(0.42), w * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Na', X(0.20), Y(0.42) + 3);
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.20) + w * 0.13, Y(0.42), w * 0.008, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde68a'; ctx.font = '7px sans-serif'; ctx.fillText('1 valence e⁻', X(0.20), Y(0.72));
    // Cl atom right
    for (const r of [0.05, 0.09, 0.13]) { ctx.strokeStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(X(0.75), Y(0.42), w * r, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(X(0.75), Y(0.42), w * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('Cl', X(0.75), Y(0.42) + 3);
    ctx.fillStyle = '#4ade80';
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; ctx.beginPath(); ctx.arc(X(0.75) + Math.cos(a) * w * 0.13, Y(0.42) + Math.sin(a) * w * 0.13, w * 0.008, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#86efac'; ctx.font = '7px sans-serif'; ctx.fillText('7 valence e⁻', X(0.75), Y(0.72));
    // electron transfer arrow
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(X(0.33), Y(0.40)); ctx.quadraticCurveTo(X(0.47), Y(0.28), X(0.61), Y(0.40)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.61), Y(0.40)); ctx.lineTo(X(0.58), Y(0.36)); ctx.lineTo(X(0.58), Y(0.44)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('electron donated', X(0.47), Y(0.24));
    // product ions
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.roundRect(X(0.36), Y(0.80), w * 0.10, h * 0.09, 6); ctx.fill();
    ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.roundRect(X(0.48), Y(0.80), w * 0.10, h * 0.09, 6); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('Na⁺', X(0.41), Y(0.845)); ctx.fillText('Cl⁻', X(0.53), Y(0.845));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('sodium gives one electron, chlorine takes it — both reach the octet, ions attract', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, IONIC_SPOTS, v.sel ?? -1);
}
const IONIC_SPOTS = [
    { label: 'Sodium atom', fn: 'one valence electron — easier to give it than find seven', x: 0.20, y: 0.42, r: 0.07 },
    { label: 'Chlorine atom', fn: 'seven valence electrons — one short of a full shell', x: 0.75, y: 0.42, r: 0.07 },
    { label: 'Electron transfer', fn: 'the donation — sodium gives, chlorine receives', x: 0.47, y: 0.32, r: 0.055 },
    { label: 'Na⁺ ion', fn: 'lost one electron — now positively charged, stable octet', x: 0.41, y: 0.845, r: 0.045 },
    { label: 'Cl⁻ ion', fn: 'gained one electron — negatively charged, stable octet', x: 0.53, y: 0.845, r: 0.045 },
    { label: 'Ionic bond', fn: 'the attraction holding the two ions together', x: 0.47, y: 0.845, r: 0.04 },
];

/** dgm_electrolytic — electrolytic refining of copper: pure sheets grow, impure dissolves. */
function paintElectrolytic(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // battery
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.44), Y(0.14)); ctx.lineTo(X(0.44), Y(0.24)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.56), Y(0.14)); ctx.lineTo(X(0.56), Y(0.24)); ctx.stroke();
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(0.40), Y(0.14)); ctx.lineTo(X(0.48), Y(0.14)); ctx.stroke();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.52), Y(0.14)); ctx.lineTo(X(0.60), Y(0.14)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('+', X(0.44), Y(0.10)); ctx.fillText('−', X(0.56), Y(0.10));
    ctx.fillText('battery', X(0.50), Y(0.05));
    // wires
    ctx.beginPath(); ctx.moveTo(X(0.44), Y(0.24)); ctx.lineTo(X(0.30), Y(0.24)); ctx.lineTo(X(0.30), Y(0.38)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.56), Y(0.24)); ctx.lineTo(X(0.70), Y(0.24)); ctx.lineTo(X(0.70), Y(0.38)); ctx.stroke();
    // beaker
    ctx.fillStyle = 'rgba(96,165,250,0.15)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.20), Y(0.38)); ctx.lineTo(X(0.20), Y(0.88)); ctx.lineTo(X(0.80), Y(0.88)); ctx.lineTo(X(0.80), Y(0.38)); ctx.stroke();
    // electrolyte
    ctx.fillStyle = 'rgba(96,165,250,0.30)'; ctx.fillRect(X(0.21), Y(0.48), X(0.58), Y(0.39));
    ctx.fillStyle = '#93c5fd'; ctx.font = '8px sans-serif'; ctx.fillText('CuSO₄ solution', X(0.50), Y(0.86));
    // anode (impure, thick) / cathode (pure, thin)
    ctx.fillStyle = '#b45309'; ctx.fillRect(X(0.28), Y(0.38), w * 0.05, Y(0.42));
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(X(0.68), Y(0.38), w * 0.025, Y(0.38));
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('impure Cu', X(0.305), Y(0.83)); ctx.fillText('pure Cu', X(0.705), Y(0.79));
    ctx.fillText('ANODE (+)', X(0.305), Y(0.36)); ctx.fillText('CATHODE (−)', X(0.705), Y(0.36));
    // ion flow arrows
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.34), Y(0.60)); ctx.quadraticCurveTo(X(0.50), Y(0.52), X(0.66), Y(0.60)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#4ade80'; ctx.font = '7px sans-serif'; ctx.fillText('Cu²⁺ migrate →', X(0.50), Y(0.50));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('impure anode dissolves, pure copper plates onto the cathode — mud collects below', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, ELECTRO_SPOTS, v.sel ?? -1);
}
const ELECTRO_SPOTS = [
    { label: 'Battery +', fn: 'drives the electrolysis — forces the copper ions to move', x: 0.44, y: 0.15, r: 0.045 },
    { label: 'Impure anode', fn: 'the crude copper — it dissolves atom by atom', x: 0.305, y: 0.55, r: 0.055 },
    { label: 'Pure cathode', fn: 'pure copper plates on here — grows thicker each hour', x: 0.705, y: 0.55, r: 0.055 },
    { label: 'CuSO₄ electrolyte', fn: 'the blue solution carrying Cu²⁺ ions', x: 0.50, y: 0.65, r: 0.07 },
    { label: 'Cu²⁺ ions', fn: 'migrating anode → cathode through the solution', x: 0.50, y: 0.55, r: 0.05 },
    { label: 'Anode mud', fn: 'the insoluble impurities sinking to the bottom — gold, silver stay behind', x: 0.50, y: 0.86, r: 0.05 },
];

/** dgm_velocity_graph — velocity-time graph: slope is acceleration, area is distance. */
function paintVelocityGraph(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.85);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.10)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.95), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Time (s) →', X(0.54), Y(0.94));
    ctx.save(); ctx.translate(X(0.05), Y(0.48)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Velocity (m/s) →', 0, 0); ctx.restore();
    // rising line = uniform acceleration
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(X(0.62), Y(0.30)); ctx.stroke();
    // flat = uniform velocity
    ctx.strokeStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.30)); ctx.lineTo(X(0.92), Y(0.30)); ctx.stroke();
    // area under curve shaded
    ctx.fillStyle = 'rgba(74,222,128,0.15)';
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(X(0.62), Y(0.30)); ctx.lineTo(X(0.62), oy); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.30)); ctx.lineTo(X(0.62), oy); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('accelerating', X(0.38), Y(0.42));
    ctx.fillStyle = '#fbbf24'; ctx.fillText('constant velocity', X(0.77), Y(0.24));
    ctx.fillStyle = '#86efac'; ctx.fillText('area = distance', X(0.40), Y(0.72));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('steep slope = fast acceleration; flat line = steady speed; the shaded area counts the journey', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, VEL_SPOTS, v.sel ?? -1);
}
const VEL_SPOTS = [
    { label: 'Rising line', fn: 'velocity growing steadily — uniform acceleration', x: 0.38, y: 0.55, r: 0.055 },
    { label: 'Flat line', fn: 'velocity unchanging — zero acceleration', x: 0.77, y: 0.30, r: 0.05 },
    { label: 'Area under curve', fn: 'velocity × time — the shaded region is the distance covered', x: 0.40, y: 0.72, r: 0.06 },
    { label: 'Slope', fn: 'rise over run — the slope IS the acceleration', x: 0.50, y: 0.38, r: 0.045 },
    { label: 'Time axis', fn: 'seconds ticking along the bottom', x: 0.50, y: 0.85, r: 0.05 },
    { label: 'Velocity axis', fn: 'm/s climbing up the side', x: 0.12, y: 0.45, r: 0.05 },
];

/** dgm_position_graph — distance-time graph: slope is speed. */
function paintPositionGraph(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.85);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.10)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.95), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Time (s) →', X(0.54), Y(0.94));
    ctx.save(); ctx.translate(X(0.05), Y(0.48)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Distance (m) →', 0, 0); ctx.restore();
    // three slopes: steep, medium, flat
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(X(0.40), Y(0.15)); ctx.stroke();
    ctx.strokeStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(X(0.72), Y(0.35)); ctx.stroke();
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(X(0.90), Y(0.72)); ctx.stroke();
    ctx.font = 'bold 8px sans-serif';
    ctx.fillStyle = '#f87171'; ctx.fillText('fast — steep slope', X(0.48), Y(0.15));
    ctx.fillStyle = '#fbbf24'; ctx.fillText('medium slope', X(0.62), Y(0.48));
    ctx.fillStyle = '#60a5fa'; ctx.fillText('slow — gentle slope', X(0.70), Y(0.80));
    // speed comparison marker
    ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0.28), Y(0.55)); ctx.lineTo(X(0.28), oy); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the steeper the line, the faster the object — a horizontal line means standing still', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, POS_SPOTS, v.sel ?? -1);
}
const POS_SPOTS = [
    { label: 'Steep line', fn: 'distance growing fast — high speed', x: 0.28, y: 0.40, r: 0.05 },
    { label: 'Medium line', fn: 'steady moderate speed', x: 0.55, y: 0.52, r: 0.05 },
    { label: 'Gentle line', fn: 'distance barely growing — slow', x: 0.80, y: 0.74, r: 0.05 },
    { label: 'Slope = speed', fn: 'rise over run — metres per second', x: 0.45, y: 0.62, r: 0.05 },
    { label: 'Time axis', fn: 'seconds along the bottom', x: 0.50, y: 0.85, r: 0.05 },
    { label: 'Distance axis', fn: 'metres up the side', x: 0.12, y: 0.45, r: 0.05 },
];

/** dgm_vsepr — the five electron-geometry shapes. */
function paintVsepr(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const shapes: [string, string, number, number, [number, number][]][] = [
        ['Linear', '#60a5fa', 0.14, 0.30, [[-0.09, 0], [0.09, 0]]],
        ['Trigonal planar', '#4ade80', 0.40, 0.30, [[0, -0.09], [-0.08, 0.06], [0.08, 0.06]]],
        ['Tetrahedral', '#fbbf24', 0.66, 0.30, [[0, -0.09], [-0.08, 0.05], [0.08, 0.05], [0, 0.10]]],
        ['Trigonal pyramidal', '#f87171', 0.25, 0.68, [[0, -0.09], [-0.08, 0.06], [0.08, 0.06], [0.02, 0.11]]],
        ['Bent (V-shaped)', '#c084fc', 0.62, 0.68, [[-0.07, -0.06], [0.07, -0.06], [0, 0.10]]],
    ];
    shapes.forEach(([name, col, cx, cy, arms]) => {
        const ax = X(cx), ay = Y(cy);
        ctx.strokeStyle = col as string; ctx.lineWidth = 2;
        arms.forEach(([dx, dy]) => {
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + dx * w, ay + dy * w); ctx.stroke();
            ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(ax + dx * w, ay + dy * w, w * 0.014, 0, Math.PI * 2); ctx.fill();
        });
        ctx.fillStyle = col as string; ctx.beginPath(); ctx.arc(ax, ay, w * 0.018, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('M', ax, ay + 3);
        ctx.fillStyle = col as string; ctx.font = 'bold 8.5px sans-serif';
        ctx.fillText(name, ax, ay + Y(0.16));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('electron pairs repel — the shape is the one that spreads them furthest apart', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, VSEPR_SPOTS, v.sel ?? -1);
}
const VSEPR_SPOTS = [
    { label: 'Linear', fn: 'two pairs, 180° apart — CO₂, BeCl₂', x: 0.14, y: 0.30, r: 0.07 },
    { label: 'Trigonal planar', fn: 'three pairs in a flat triangle — BF₃', x: 0.40, y: 0.30, r: 0.07 },
    { label: 'Tetrahedral', fn: 'four pairs at 109.5° — methane CH₄', x: 0.66, y: 0.30, r: 0.07 },
    { label: 'Trigonal pyramidal', fn: 'three bonds + one lone pair — ammonia NH₃', x: 0.25, y: 0.68, r: 0.07 },
    { label: 'Bent', fn: 'two bonds + two lone pairs — water H₂O', x: 0.62, y: 0.68, r: 0.07 },
    { label: 'Central atom M', fn: 'the atom the pairs arrange around', x: 0.40, y: 0.52, r: 0.05 },
];

/** dgm_ph_scale — the 0-14 pH ladder with everyday examples. */
function paintPhScale(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const cols = ['#ef4444', '#f97316', '#f59e0b', '#fbbf24', '#fde047', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc'];
    const bw = w * 0.058;
    for (let i = 0; i < 15; i++) {
        ctx.fillStyle = cols[i];
        ctx.fillRect(X(0.06) + i * bw, Y(0.40), bw - 2, Y(0.14));
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(i), X(0.06) + i * bw + bw / 2 - 1, Y(0.47) + 4);
    }
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('ACID', X(0.18), Y(0.36));
    ctx.fillStyle = '#4ade80'; ctx.fillText('NEUTRAL', X(0.50), Y(0.36));
    ctx.fillStyle = '#60a5fa'; ctx.fillText('BASE', X(0.82), Y(0.36));
    ctx.fillStyle = '#94a3b8'; ctx.font = '7.5px sans-serif';
    const ex: [number, string][] = [[0, 'battery acid'], [2, 'lemon'], [5, 'rain'], [7, 'pure water'], [9, 'soap'], [12, 'bleach'], [14, 'drain cleaner']];
    ex.forEach(([i, txt]) => ctx.fillText(txt, X(0.06) + i * bw + bw / 2 - 1, Y(0.60)));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('each step is 10× the H⁺ of the last — pH 2 is 100,000× more acidic than pH 7', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PH_SPOTS, v.sel ?? -1);
}
const PH_SPOTS = [
    { label: 'Strong acid (0-2)', fn: 'battery acid, stomach acid — corrosive', x: 0.12, y: 0.47, r: 0.05 },
    { label: 'Weak acid (3-6)', fn: 'lemon juice, vinegar, rain — sour but mild', x: 0.32, y: 0.47, r: 0.05 },
    { label: 'Neutral (7)', fn: 'pure water — H⁺ exactly balances OH⁻', x: 0.50, y: 0.47, r: 0.05 },
    { label: 'Weak base (8-11)', fn: 'soap, baking soda — slippery feel', x: 0.68, y: 0.47, r: 0.05 },
    { label: 'Strong base (12-14)', fn: 'bleach, drain cleaner — also corrosive', x: 0.88, y: 0.47, r: 0.05 },
    { label: 'Log scale', fn: 'each unit = 10× H⁺ difference — pH 3 is 10× more acidic than pH 4', x: 0.50, y: 0.65, r: 0.05 },
];

/** dgm_vector_addition — tip-to-tail: A + B = R. */
function paintVectorAddition(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const arrow = (x1: number, y1: number, x2: number, y2: number, col: string, wd = 3) => {
        ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(X(x1), Y(y1)); ctx.lineTo(X(x2), Y(y2)); ctx.stroke();
        const a = Math.atan2(Y(y2) - Y(y1), X(x2) - X(x1));
        ctx.fillStyle = col; ctx.beginPath();
        ctx.moveTo(X(x2), Y(y2));
        ctx.lineTo(X(x2) - 10 * Math.cos(a - 0.4), Y(y2) - 10 * Math.sin(a - 0.4));
        ctx.lineTo(X(x2) - 10 * Math.cos(a + 0.4), Y(y2) - 10 * Math.sin(a + 0.4));
        ctx.closePath(); ctx.fill(); ctx.lineCap = 'butt';
    };
    // A: right, B: up-right, R: diagonal
    arrow(0.15, 0.70, 0.55, 0.70, '#4ade80');
    arrow(0.55, 0.70, 0.80, 0.35, '#60a5fa');
    arrow(0.15, 0.70, 0.80, 0.35, '#f87171');
    // parallelogram guides
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0.55), Y(0.70)); ctx.lineTo(X(0.80), Y(0.35)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.15), Y(0.70)); ctx.setLineDash([]); ctx.stroke();
    const lbl = (x: number, y: number, txt: string, col: string) => { ctx.fillStyle = col; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(txt, X(x), Y(y)); };
    lbl(0.35, 0.76, 'A', '#4ade80');
    lbl(0.72, 0.50, 'B', '#60a5fa');
    lbl(0.42, 0.48, 'R = A + B', '#f87171');
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('walk A then B — the shortcut from start to finish is the resultant', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, VEC_SPOTS, v.sel ?? -1);
}
const VEC_SPOTS = [
    { label: 'Vector A', fn: 'the first displacement — tail to tip', x: 0.35, y: 0.70, r: 0.05 },
    { label: 'Vector B', fn: 'the second — starts where A ends (tip-to-tail)', x: 0.68, y: 0.52, r: 0.05 },
    { label: 'Resultant R', fn: 'the single step equal to A then B — the diagonal', x: 0.45, y: 0.50, r: 0.06 },
    { label: 'Parallelogram rule', fn: 'same answer: complete the parallelogram, take the diagonal', x: 0.68, y: 0.35, r: 0.05 },
    { label: 'Tail', fn: 'where the journey starts', x: 0.15, y: 0.70, r: 0.035 },
    { label: 'Tip', fn: 'where it ends — R joins tail to tip', x: 0.80, y: 0.35, r: 0.035 },
];

/** dgm_shm — the pendulum: displacement trades with speed. */
function paintShm(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // pivot
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(X(0.30), Y(0.10), w * 0.14, 6);
    // three positions: left extreme, centre, right extreme
    const pos = [[0.36, 0.60, '#60a5fa', 'extreme −A'], [0.50, 0.72, '#fbbf24', 'mean'], [0.64, 0.60, '#f87171', 'extreme +A']];
    pos.forEach(([bx, by, col, name]) => {
        const bx2 = X(bx as number), by2 = Y(by as number);
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(0.37), Y(0.16)); ctx.lineTo(bx2, by2); ctx.stroke();
        ctx.fillStyle = col as string; ctx.beginPath(); ctx.arc(bx2, by2, w * 0.022, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = col as string; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name as string, bx2, by2 + h * 0.06);
    });
    // arc of swing
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(X(0.37), Y(0.16), Math.hypot(X(0.64) - X(0.37), Y(0.60) - Y(0.16)), Math.PI * 0.35, Math.PI * 0.55); ctx.stroke(); ctx.setLineDash([]);
    // energy bar: KE vs PE at positions
    const bars: [number, string, number][] = [[0.36, 'PE max', 0.20], [0.50, 'KE max', 0.20], [0.64, 'PE max', 0.20]];
    bars.forEach(([x, lab, hh]) => {
        ctx.fillStyle = 'rgba(74,222,128,0.4)'; ctx.fillRect(X((x as number) - 0.035), Y(0.92) - hh * h, w * 0.07, hh * h);
        ctx.fillStyle = '#94a3b8'; ctx.font = '6.5px sans-serif'; ctx.fillText(lab as string, X(x as number), Y(0.95));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('speed peaks at the centre, force peaks at the ends — the trade is what keeps it ticking', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SHM_SPOTS, v.sel ?? -1);
}
const SHM_SPOTS = [
    { label: 'Mean position', fn: 'the middle — speed maximum, restoring force zero', x: 0.50, y: 0.72, r: 0.05 },
    { label: 'Extreme −A', fn: 'leftmost — speed zero, restoring force maximum', x: 0.36, y: 0.60, r: 0.05 },
    { label: 'Extreme +A', fn: 'rightmost — the same story mirrored', x: 0.64, y: 0.60, r: 0.05 },
    { label: 'Restoring force', fn: 'always points back to the mean — that is SHM', x: 0.37, y: 0.30, r: 0.05 },
    { label: 'Amplitude A', fn: 'the biggest displacement from the mean', x: 0.55, y: 0.82, r: 0.05 },
    { label: 'Energy trade', fn: 'PE at extremes ⇄ KE at the middle — total stays constant', x: 0.50, y: 0.92, r: 0.06 },
];

/** dgm_doppler — the moving siren: wavefronts bunch ahead, stretch behind. */
function paintDoppler(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // source moving right — wavefront circles offset
    for (let i = 0; i < 6; i++) {
        const cx = 0.30 + i * 0.055, r = 0.045 + i * 0.028;
        ctx.strokeStyle = i < 3 ? 'rgba(96,165,250,0.7)' : 'rgba(96,165,250,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(X(cx), Y(0.45), w * r, 0, Math.PI * 2); ctx.stroke();
    }
    // source + motion arrow
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.62), Y(0.45), w * 0.020, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🚗', X(0.62), Y(0.45) + 4);
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.38)); ctx.lineTo(X(0.74), Y(0.38)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.74), Y(0.38)); ctx.lineTo(X(0.72), Y(0.36)); ctx.lineTo(X(0.72), Y(0.40)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('compressed — higher pitch ahead', X(0.80), Y(0.62));
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('stretched — lower pitch behind', X(0.20), Y(0.62));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('an ambulance approaching sounds higher, receding sounds lower — the Doppler shift', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, DOPP_SPOTS, v.sel ?? -1);
}
const DOPP_SPOTS = [
    { label: 'Moving source', fn: 'the car/siren — travelling right through its own waves', x: 0.62, y: 0.45, r: 0.05 },
    { label: 'Bunched waves', fn: 'ahead of the motion — shorter wavelength, higher frequency', x: 0.78, y: 0.45, r: 0.055 },
    { label: 'Stretched waves', fn: 'behind the motion — longer wavelength, lower frequency', x: 0.22, y: 0.45, r: 0.055 },
    { label: 'Velocity of source', fn: 'the arrow — the speed that creates the shift', x: 0.68, y: 0.38, r: 0.045 },
    { label: 'Higher pitch ahead', fn: 'the listener in front hears a raised frequency', x: 0.80, y: 0.62, r: 0.05 },
    { label: 'Lower pitch behind', fn: 'the listener behind hears a dropped frequency', x: 0.20, y: 0.62, r: 0.05 },
];

/** dgm_circular_motion — the orbit: velocity tangent, force inward. */
function paintCircularMotion(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(X(0.50), Y(0.50), w * 0.22, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.50), Y(0.50), w * 0.018, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('centre', X(0.50), Y(0.50) + 4);
    // object at rightmost point
    const ox = 0.72, oy = 0.50;
    ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(X(ox), Y(oy), w * 0.024, 0, Math.PI * 2); ctx.fill();
    // velocity arrow — tangent (up)
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(ox), Y(oy)); ctx.lineTo(X(ox), Y(0.22)); ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.moveTo(X(ox), Y(0.22)); ctx.lineTo(X(ox) - 5, Y(0.27)); ctx.lineTo(X(ox) + 5, Y(0.27)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#60a5fa'; ctx.fillText('v — tangent', X(ox), Y(0.18));
    // centripetal force — inward
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(ox), Y(oy)); ctx.lineTo(X(0.54), Y(oy)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.54), Y(oy)); ctx.lineTo(X(0.59), Y(oy) - 5); ctx.lineTo(X(0.59), Y(oy) + 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f87171'; ctx.fillText('F — inward', X(0.62), Y(0.44));
    // string
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.50), Y(0.50)); ctx.lineTo(X(ox), Y(oy)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('speed stays constant, direction keeps changing — so it IS accelerating, inward', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, CIRC_SPOTS, v.sel ?? -1);
}
const CIRC_SPOTS = [
    { label: 'Circular path', fn: 'the orbit — constant radius, constant speed', x: 0.50, y: 0.28, r: 0.06 },
    { label: 'Orbiting object', fn: 'the stone/ball being swung round', x: 0.72, y: 0.50, r: 0.05 },
    { label: 'Velocity (tangent)', fn: 'always at a tangent — would fly straight off if released', x: 0.72, y: 0.32, r: 0.055 },
    { label: 'Centripetal force', fn: 'the inward pull keeping it on the circle', x: 0.60, y: 0.50, r: 0.055 },
    { label: 'Centre', fn: 'what the force points toward', x: 0.50, y: 0.50, r: 0.04 },
    { label: 'Radius', fn: 'the fixed distance — the string', x: 0.61, y: 0.55, r: 0.04 },
];

/** dgm_friction — the block on a rough surface: forces at work. */
function paintFriction(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // ground
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.06), Y(0.70)); ctx.lineTo(X(0.94), Y(0.70)); ctx.stroke();
    for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(X(0.08 + i * 0.065), Y(0.70)); ctx.lineTo(X(0.05 + i * 0.065), Y(0.75)); ctx.stroke(); }
    // block
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(X(0.40), Y(0.56), w * 0.14, Y(0.14) * 0.7);
    ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2; ctx.strokeRect(X(0.40), Y(0.56), w * 0.14, Y(0.14) * 0.7);
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('BLOCK', X(0.47), Y(0.61));
    // applied force →
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(0.56), Y(0.60)); ctx.lineTo(X(0.76), Y(0.60)); ctx.stroke();
    ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.moveTo(X(0.76), Y(0.60)); ctx.lineTo(X(0.73), Y(0.585)); ctx.lineTo(X(0.73), Y(0.615)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#4ade80'; ctx.fillText('APPLIED →', X(0.66), Y(0.55));
    // friction ←
    ctx.strokeStyle = '#f87171';
    ctx.beginPath(); ctx.moveTo(X(0.38), Y(0.60)); ctx.lineTo(X(0.20), Y(0.60)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.20), Y(0.60)); ctx.lineTo(X(0.23), Y(0.585)); ctx.lineTo(X(0.23), Y(0.615)); ctx.closePath(); ctx.fill();
    ctx.fillText('← FRICTION', X(0.28), Y(0.55));
    // weight ↓ + normal ↑
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.47), Y(0.56)); ctx.lineTo(X(0.47), Y(0.44)); ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.moveTo(X(0.47), Y(0.44)); ctx.lineTo(X(0.46), Y(0.46)); ctx.lineTo(X(0.48), Y(0.46)); ctx.closePath(); ctx.fill();
    ctx.fillText('NORMAL ↑', X(0.52), Y(0.43));
    ctx.strokeStyle = '#c084fc';
    ctx.beginPath(); ctx.moveTo(X(0.47), Y(0.665)); ctx.lineTo(X(0.47), Y(0.80)); ctx.stroke();
    ctx.fillStyle = '#c084fc'; ctx.beginPath(); ctx.moveTo(X(0.47), Y(0.80)); ctx.lineTo(X(0.46), Y(0.78)); ctx.lineTo(X(0.48), Y(0.78)); ctx.closePath(); ctx.fill();
    ctx.fillText('WEIGHT ↓', X(0.52), Y(0.82));
    // roughness teeth
    ctx.fillStyle = '#94a3b8';
    for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(X(0.40 + i * 0.018), Y(0.705), 1.5, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('friction always fights the slide — push left and it pushes right, always opposing', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, FRICT_SPOTS, v.sel ?? -1);
}
const FRICT_SPOTS = [
    { label: 'Applied force', fn: 'the push trying to move the block right', x: 0.66, y: 0.60, r: 0.05 },
    { label: 'Friction', fn: 'the opposing drag — parallel to the surface, opposing motion', x: 0.28, y: 0.60, r: 0.05 },
    { label: 'Weight', fn: 'gravity pulling the block straight down', x: 0.47, y: 0.76, r: 0.045 },
    { label: 'Normal force', fn: 'the surface pushing back up — equals the weight here', x: 0.47, y: 0.48, r: 0.045 },
    { label: 'Rough surface', fn: 'the tiny bumps that catch and grip — where friction lives', x: 0.47, y: 0.71, r: 0.05 },
    { label: 'The block', fn: 'the object all four forces act on', x: 0.47, y: 0.61, r: 0.05 },
];

/** dgm_stress_strain — the stress-strain curve: elastic region to fracture. */
function paintStressStrain(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.85);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.12)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.95), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Strain →', X(0.54), Y(0.94));
    ctx.save(); ctx.translate(X(0.05), Y(0.48)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Stress →', 0, 0); ctx.restore();
    // the curve: linear → yield → dip → ultimate → fracture
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(X(0.30), Y(0.30));              // proportional limit
    ctx.quadraticCurveTo(X(0.36), Y(0.26), X(0.42), Y(0.30)); // yield dip
    ctx.quadraticCurveTo(X(0.55), Y(0.30), X(0.68), Y(0.18)); // strain hardening → ultimate
    ctx.quadraticCurveTo(X(0.78), Y(0.12), X(0.80), Y(0.16));
    ctx.quadraticCurveTo(X(0.86), Y(0.30), X(0.88), Y(0.55)); // necking → fracture
    ctx.stroke();
    const lbl = (x: number, y: number, txt: string, col: string) => { ctx.fillStyle = col; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(txt, X(x), Y(y)); };
    lbl(0.30, 0.24, 'proportional limit', '#fbbf24');
    lbl(0.42, 0.36, 'yield point', '#f87171');
    lbl(0.68, 0.12, 'ultimate strength', '#4ade80');
    lbl(0.88, 0.50, 'fracture', '#f87171');
    lbl(0.20, 0.55, 'elastic zone', '#60a5fa');
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('release before the yield point and it springs back — go past and it stays deformed', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SS_SPOTS, v.sel ?? -1);
}
const SS_SPOTS = [
    { label: 'Proportional limit', fn: 'stress ∝ strain here — Hooke’s law holds', x: 0.30, y: 0.30, r: 0.05 },
    { label: 'Yield point', fn: 'the material starts flowing — permanent deformation begins', x: 0.42, y: 0.30, r: 0.05 },
    { label: 'Ultimate strength', fn: 'the highest stress it can take', x: 0.68, y: 0.16, r: 0.05 },
    { label: 'Fracture', fn: 'the break — the wire snaps', x: 0.88, y: 0.50, r: 0.05 },
    { label: 'Elastic region', fn: 'the straight part — unload and it returns', x: 0.20, y: 0.55, r: 0.05 },
    { label: 'Plastic region', fn: 'past yield — the shape change is permanent', x: 0.55, y: 0.24, r: 0.05 },
];

/** dgm_bernoulli — the Venturi tube: fast flow, low pressure. */
function paintBernoulli(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // pipe: wide → narrow → wide
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.05), Y(0.30)); ctx.lineTo(X(0.35), Y(0.30)); ctx.lineTo(X(0.45), Y(0.38)); ctx.lineTo(X(0.60), Y(0.38)); ctx.lineTo(X(0.70), Y(0.30)); ctx.lineTo(X(0.95), Y(0.30)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.05), Y(0.62)); ctx.lineTo(X(0.35), Y(0.62)); ctx.lineTo(X(0.45), Y(0.54)); ctx.lineTo(X(0.60), Y(0.54)); ctx.lineTo(X(0.70), Y(0.62)); ctx.lineTo(X(0.95), Y(0.62)); ctx.stroke();
    // flow arrows — dense in the narrow section
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
    [[0.15, 0.40], [0.25, 0.46], [0.15, 0.52]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.moveTo(X(x), Y(y)); ctx.lineTo(X(x + 0.06), Y(y)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x + 0.06), Y(y)); ctx.lineTo(X(x + 0.05), Y(y - 4)); ctx.lineTo(X(x + 0.05), Y(y + 4)); ctx.closePath(); ctx.fillStyle = '#60a5fa'; ctx.fill();
    });
    for (let i = 0; i < 5; i++) {
        const y = 0.40 + i * 0.035;
        ctx.beginPath(); ctx.moveTo(X(0.46), Y(y)); ctx.lineTo(X(0.58), Y(y)); ctx.stroke();
    }
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.moveTo(X(0.58), Y(0.46)); ctx.lineTo(X(0.565), Y(0.44)); ctx.lineTo(X(0.565), Y(0.48)); ctx.closePath(); ctx.fill();
    [[0.75, 0.40], [0.85, 0.46], [0.75, 0.52]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.moveTo(X(x), Y(y)); ctx.lineTo(X(x + 0.06), Y(y)); ctx.stroke();
    });
    // manometer columns — tall at wide, short at narrow
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 1.5;
    [[0.20, 0.14], [0.52, 0.26], [0.85, 0.14]].forEach(([x, top]) => {
        ctx.beginPath(); ctx.moveTo(X(x), Y(0.30)); ctx.lineTo(X(x), Y(top)); ctx.stroke();
        ctx.fillStyle = 'rgba(74,222,128,0.4)'; ctx.fillRect(X(x) - 4, Y(top), 8, (0.30 - top) * h);
        ctx.fillStyle = '#4ade80'; ctx.font = '6.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('P', X(x), Y(top) - 5);
    });
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('fast flow → low pressure', X(0.52), Y(0.20));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('where the pipe narrows the fluid speeds up — and its pressure drops', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, BERN_SPOTS, v.sel ?? -1);
}
const BERN_SPOTS = [
    { label: 'Wide section', fn: 'slow flow, high pressure — the tall column', x: 0.20, y: 0.45, r: 0.055 },
    { label: 'Narrow throat', fn: 'the squeeze — fluid races through here', x: 0.52, y: 0.46, r: 0.055 },
    { label: 'Low pressure column', fn: 'the short column — proof the pressure dropped', x: 0.52, y: 0.30, r: 0.05 },
    { label: 'High pressure column', fn: 'the tall column at the wide end', x: 0.20, y: 0.22, r: 0.05 },
    { label: 'Flow arrows', fn: 'packed tighter = faster streamlines', x: 0.52, y: 0.50, r: 0.045 },
    { label: 'Return section', fn: 'widens again — speed and pressure recover', x: 0.85, y: 0.45, r: 0.055 },
];

/** dgm_kepler — the elliptical orbit: equal areas in equal times. */
function paintKepler(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(X(0.50), Y(0.50), w * 0.32, h * 0.26, 0, 0, Math.PI * 2); ctx.stroke();
    // sun at focus
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.62), Y(0.50), w * 0.026, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('SUN', X(0.62), Y(0.50) + 3);
    // empty focus
    ctx.strokeStyle = '#475569'; ctx.beginPath(); ctx.arc(X(0.38), Y(0.50), 3, 0, Math.PI * 2); ctx.stroke();
    // planet near perihelion (fast) + aphelion (slow)
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.arc(X(0.78), Y(0.46), w * 0.016, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(X(0.22), Y(0.54), w * 0.016, 0, Math.PI * 2); ctx.fill();
    // equal-area wedges
    ctx.fillStyle = 'rgba(74,222,128,0.25)';
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.50)); ctx.arc(X(0.62), Y(0.50), w * 0.17, -0.35, 0.25); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.50)); ctx.arc(X(0.62), Y(0.50), w * 0.30, Math.PI * 0.85, Math.PI * 1.08); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#4ade80'; ctx.font = '7.5px sans-serif';
    ctx.fillText('same area,', X(0.78), Y(0.20)); ctx.fillText('short time', X(0.78), Y(0.25));
    ctx.fillText('same area,', X(0.18), Y(0.20)); ctx.fillText('same time', X(0.18), Y(0.25));
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('fast (perihelion)', X(0.80), Y(0.40));
    ctx.fillStyle = '#60a5fa'; ctx.fillText('slow (aphelion)', X(0.22), Y(0.62));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('planets sweep equal areas in equal times — fast near the Sun, slow far away', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, KEPLER_SPOTS, v.sel ?? -1);
}
const KEPLER_SPOTS = [
    { label: 'Sun at a focus', fn: 'the orbit is an ellipse — the Sun sits at one focus, not the centre', x: 0.62, y: 0.50, r: 0.05 },
    { label: 'Elliptical orbit', fn: 'the planet’s real path — squashed, not circular', x: 0.50, y: 0.24, r: 0.055 },
    { label: 'Perihelion', fn: 'closest approach — the planet moves fastest here', x: 0.78, y: 0.46, r: 0.045 },
    { label: 'Aphelion', fn: 'farthest point — the planet crawls here', x: 0.22, y: 0.54, r: 0.045 },
    { label: 'Equal areas', fn: 'the two shaded wedges have the same area — swept in the same time', x: 0.76, y: 0.30, r: 0.055 },
    { label: 'Empty focus', fn: 'the other focus — nothing there', x: 0.38, y: 0.50, r: 0.04 },
];

/** dgm_pv_cycle — the Carnot cycle on a PV diagram. */
function paintPvCycle(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.14), oy = Y(0.82);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.12)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Volume →', X(0.54), Y(0.92));
    ctx.save(); ctx.translate(X(0.05), Y(0.47)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Pressure →', 0, 0); ctx.restore();
    // Carnot loop: A→B isothermal expansion, B→C adiabatic, C→D isothermal compression, D→A adiabatic
    const A = [0.24, 0.30], B = [0.48, 0.42], C = [0.78, 0.66], D = [0.44, 0.62];
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(X(A[0]), Y(A[1])); ctx.quadraticCurveTo(X(0.36), Y(0.34), X(B[0]), Y(B[1])); ctx.stroke();
    ctx.strokeStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(X(B[0]), Y(B[1])); ctx.quadraticCurveTo(X(0.62), Y(0.50), X(C[0]), Y(C[1])); ctx.stroke();
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath(); ctx.moveTo(X(C[0]), Y(C[1])); ctx.quadraticCurveTo(X(0.60), Y(0.68), X(D[0]), Y(D[1])); ctx.stroke();
    ctx.strokeStyle = '#4ade80';
    ctx.beginPath(); ctx.moveTo(X(D[0]), Y(D[1])); ctx.quadraticCurveTo(X(0.30), Y(0.50), X(A[0]), Y(A[1])); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('A', X(A[0]), Y(A[1]) - 8); ctx.fillText('B', X(B[0]), Y(B[1]) - 8);
    ctx.fillText('C', X(C[0]), Y(C[1]) + 16); ctx.fillText('D', X(D[0]), Y(D[1]) + 16);
    ctx.fillStyle = '#f87171'; ctx.font = '7.5px sans-serif'; ctx.fillText('isothermal expansion', X(0.36), Y(0.28));
    ctx.fillStyle = '#fbbf24'; ctx.fillText('adiabatic expansion', X(0.66), Y(0.46));
    ctx.fillStyle = '#60a5fa'; ctx.fillText('isothermal compression', X(0.62), Y(0.72));
    ctx.fillStyle = '#4ade80'; ctx.fillText('adiabatic compression', X(0.30), Y(0.60));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the loop’s enclosed area is the net work the engine delivers per cycle', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PV_SPOTS, v.sel ?? -1);
}
const PV_SPOTS = [
    { label: 'Isothermal expansion', fn: 'A→B — gas expands at hot temperature, taking in heat', x: 0.36, y: 0.34, r: 0.05 },
    { label: 'Adiabatic expansion', fn: 'B→C — no heat exchange, gas cools as it grows', x: 0.62, y: 0.52, r: 0.05 },
    { label: 'Isothermal compression', fn: 'C→D — gas squeezed at cold temperature, dumping heat', x: 0.62, y: 0.66, r: 0.05 },
    { label: 'Adiabatic compression', fn: 'D→A — no heat exchange, gas warms back up', x: 0.32, y: 0.50, r: 0.05 },
    { label: 'Work done', fn: 'the area inside the loop — net work per cycle', x: 0.50, y: 0.50, r: 0.05 },
    { label: 'Point A', fn: 'hottest, most compressed — the cycle starts here', x: 0.24, y: 0.30, r: 0.04 },
];

/** dgm_vernier — the vernier calliper: main scale + sliding vernier. */
function paintVernier(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // main scale bar
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(X(0.10), Y(0.30), X(0.80), Y(0.16));
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.strokeRect(X(0.10), Y(0.30), X(0.80), Y(0.16));
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    for (let i = 0; i <= 10; i++) {
        const x = X(0.10) + i * X(0.08);
        ctx.strokeStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(x, Y(0.30)); ctx.lineTo(x, Y(0.36)); ctx.stroke();
        ctx.fillText(String(i * 10), x, Y(0.27));
    }
    // jaws
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(X(0.10), Y(0.46), w * 0.025, Y(0.20));
    ctx.fillRect(X(0.30), Y(0.46), w * 0.025, Y(0.16));
    // the object being measured
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.23), Y(0.60), w * 0.045, 0, Math.PI * 2); ctx.fill();
    // vernier scale (sliding)
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(X(0.22), Y(0.46), X(0.30), Y(0.14));
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.strokeRect(X(0.22), Y(0.46), X(0.30), Y(0.14));
    ctx.fillStyle = '#92400e';
    for (let i = 0; i <= 10; i++) {
        const x = X(0.22) + i * X(0.027);
        ctx.beginPath(); ctx.moveTo(x, Y(0.46)); ctx.lineTo(x, Y(0.50)); ctx.stroke();
        ctx.fillText(String(i), x, Y(0.575));
    }
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.22), Y(0.46), 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('vernier zero → main scale reading', X(0.50), Y(0.22));
    ctx.strokeStyle = '#f87171'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0.22), Y(0.30)); ctx.lineTo(X(0.22), Y(0.46)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('main scale reading + coinciding vernier division × least count = the measurement', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, VERN_SPOTS, v.sel ?? -1);
}
const VERN_SPOTS = [
    { label: 'Main scale', fn: 'the fixed ruler — read to the mark left of vernier zero', x: 0.60, y: 0.38, r: 0.06 },
    { label: 'Vernier scale', fn: 'the sliding scale — find which division lines up', x: 0.37, y: 0.53, r: 0.055 },
    { label: 'Vernier zero', fn: 'the pointer — its position is the main-scale reading', x: 0.22, y: 0.44, r: 0.04 },
    { label: 'Fixed jaw', fn: 'one side of the object rests against it', x: 0.115, y: 0.55, r: 0.045 },
    { label: 'Sliding jaw', fn: 'moves with the vernier — grips the object', x: 0.31, y: 0.53, r: 0.045 },
    { label: 'Object', fn: 'the ball being measured — jaws just touch it', x: 0.23, y: 0.60, r: 0.05 },
];

/** dgm_enthalpy — energy profile: activation hump, ΔH gap. */
function paintEnthalpy(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.10), oy = Y(0.85);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.10)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Reaction progress →', X(0.52), Y(0.94));
    ctx.save(); ctx.translate(X(0.05), Y(0.47)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Energy →', 0, 0); ctx.restore();
    // exothermic curve: reactants high → hump → products low
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(X(0.16), Y(0.40));
    ctx.lineTo(X(0.28), Y(0.40));
    ctx.quadraticCurveTo(X(0.45), Y(0.10), X(0.62), Y(0.55));
    ctx.lineTo(X(0.80), Y(0.62));
    ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('reactants', X(0.22), Y(0.36));
    ctx.fillStyle = '#60a5fa'; ctx.fillText('products', X(0.72), Y(0.66));
    ctx.fillStyle = '#f87171'; ctx.fillText('peak = activated complex', X(0.50), Y(0.08));
    // Ea arrow
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.45), Y(0.40)); ctx.lineTo(X(0.45), Y(0.16)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f87171'; ctx.font = '7.5px sans-serif'; ctx.fillText('Ea (activation energy)', X(0.45), Y(0.46));
    // ΔH arrow
    ctx.strokeStyle = '#60a5fa'; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.84), Y(0.40)); ctx.lineTo(X(0.84), Y(0.62)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#60a5fa'; ctx.fillText('ΔH < 0 (exothermic)', X(0.84), Y(0.72));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('products sit lower — the reaction released its stored energy as heat', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, ENTH_SPOTS, v.sel ?? -1);
}
const ENTH_SPOTS = [
    { label: 'Reactants', fn: 'starting energy level — higher here (exothermic reaction)', x: 0.22, y: 0.40, r: 0.05 },
    { label: 'Activated complex', fn: 'the peak — bonds half-broken, half-formed', x: 0.50, y: 0.13, r: 0.05 },
    { label: 'Activation energy', fn: 'the climb needed to start — a spark lights the fuel', x: 0.45, y: 0.30, r: 0.05 },
    { label: 'Products', fn: 'ending level — lower, so energy left as heat', x: 0.72, y: 0.62, r: 0.05 },
    { label: 'ΔH', fn: 'the energy gap released — negative for exothermic', x: 0.84, y: 0.51, r: 0.045 },
];

/** dgm_gas_laws — Boyle & Charles: the three gas-law graphs. */
function paintGasLaws(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const axes = (ox: number, oy: number, xl: string, yl: string) => {
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(ox), Y(oy - 0.28)); ctx.lineTo(X(ox), Y(oy)); ctx.lineTo(X(ox + 0.24), Y(oy)); ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(xl, X(ox + 0.12), Y(oy + 0.05)); ctx.fillText(yl, X(ox), Y(oy - 0.30));
    };
    // Boyle: P vs V — hyperbola
    axes(0.10, 0.40, 'V →', 'P ↑');
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 50; i++) { const u = i / 50, x = X(0.10) + u * X(0.22), y = Y(0.40) - (0.05 / (0.05 + u)) * Y(0.24); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.fillText('PV = const', X(0.22), Y(0.10));
    // Charles: V vs T — straight line
    axes(0.44, 0.40, 'T →', 'V ↑');
    ctx.strokeStyle = '#4ade80'; ctx.beginPath();
    ctx.moveTo(X(0.44), Y(0.38)); ctx.lineTo(X(0.66), Y(0.14)); ctx.stroke();
    ctx.fillStyle = '#4ade80'; ctx.fillText('V ∝ T', X(0.56), Y(0.10));
    // Avogadro: V vs n — straight line
    axes(0.10, 0.80, 'n →', 'V ↑');
    ctx.strokeStyle = '#60a5fa'; ctx.beginPath();
    ctx.moveTo(X(0.10), Y(0.80)); ctx.lineTo(X(0.32), Y(0.55)); ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.fillText('V ∝ n', X(0.22), Y(0.50));
    // Gay-Lussac: P vs T
    axes(0.44, 0.80, 'T →', 'P ↑');
    ctx.strokeStyle = '#fbbf24'; ctx.beginPath();
    ctx.moveTo(X(0.44), Y(0.78)); ctx.lineTo(X(0.66), Y(0.55)); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.fillText('P ∝ T', X(0.56), Y(0.50));
    // ideal gas box
    ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.74), Y(0.35), w * 0.22, Y(0.22), 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 10px sans-serif';
    ctx.fillText('PV = nRT', X(0.85), Y(0.45));
    ctx.fillStyle = '#94a3b8'; ctx.font = '7px sans-serif';
    ctx.fillText('the one law holding all four', X(0.85), Y(0.52));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('squeeze a gas and pressure climbs; heat it and it expands — the graphs say it all', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, GAS_SPOTS, v.sel ?? -1);
}
const GAS_SPOTS = [
    { label: 'Boyle’s law', fn: 'P vs V — the curve: halve the volume, double the pressure', x: 0.22, y: 0.30, r: 0.06 },
    { label: 'Charles’ law', fn: 'V vs T — straight line through origin: heat expands', x: 0.55, y: 0.27, r: 0.055 },
    { label: 'Avogadro’s law', fn: 'V vs n — more moles, more volume', x: 0.21, y: 0.66, r: 0.055 },
    { label: 'Gay-Lussac’s law', fn: 'P vs T — pressure climbs with temperature', x: 0.55, y: 0.68, r: 0.055 },
    { label: 'Ideal gas law', fn: 'PV = nRT — the master equation combining all of them', x: 0.85, y: 0.46, r: 0.06 },
];

/** dgm_redox — the electron seesaw: one oxidised, one reduced. */
function paintRedox(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // Zn and Cu spheres
    ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(X(0.22), Y(0.42), w * 0.055, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Zn', X(0.22), Y(0.42) + 4);
    ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.arc(X(0.78), Y(0.42), w * 0.055, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fef3c7'; ctx.fillText('Cu²⁺', X(0.78), Y(0.42) + 4);
    // electron arrow Zn → Cu
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2.5; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(X(0.30), Y(0.34)); ctx.quadraticCurveTo(X(0.50), Y(0.20), X(0.70), Y(0.34)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.70), Y(0.34)); ctx.lineTo(X(0.66), Y(0.30)); ctx.lineTo(X(0.67), Y(0.38)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('2 electrons donated', X(0.50), Y(0.16));
    // outcomes
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('Zn → Zn²⁺ (oxidised)', X(0.22), Y(0.58));
    ctx.fillText('Cu²⁺ → Cu (reduced)', X(0.78), Y(0.58));
    // rule box
    ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.30), Y(0.68), w * 0.40, h * 0.16, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('OIL RIG', X(0.50), Y(0.73));
    ctx.fillStyle = '#94a3b8'; ctx.font = '7.5px sans-serif';
    ctx.fillText('Oxidation Is Loss · Reduction Is Gain', X(0.50), Y(0.79));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('zinc hands its electrons to copper — the loser is oxidised, the winner reduced', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, REDOX_SPOTS, v.sel ?? -1);
}
const REDOX_SPOTS = [
    { label: 'Zinc (oxidised)', fn: 'loses 2 electrons — its oxidation number rises 0 → +2', x: 0.22, y: 0.42, r: 0.065 },
    { label: 'Copper ion (reduced)', fn: 'gains the 2 electrons — its oxidation number falls +2 → 0', x: 0.78, y: 0.42, r: 0.065 },
    { label: 'Electron transfer', fn: 'the seesaw — what one loses, the other gains', x: 0.50, y: 0.26, r: 0.055 },
    { label: 'OIL RIG', fn: 'the mnemonic — Oxidation Is Loss, Reduction Is Gain (of electrons)', x: 0.50, y: 0.75, r: 0.055 },
    { label: 'Zn²⁺ product', fn: 'zinc dissolved — went into solution as ions', x: 0.22, y: 0.58, r: 0.05 },
    { label: 'Cu metal', fn: 'copper plated out — solid metal deposited', x: 0.78, y: 0.58, r: 0.05 },
];

/** dgm_functional_groups — the organic families and their signature atoms. */
function paintFunctionalGroups(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const groups: [string, string, string, number, number][] = [
        ['Alcohol', 'R–OH', '#f87171', 0.15, 0.20],
        ['Aldehyde', 'R–CHO', '#fbbf24', 0.42, 0.20],
        ['Ketone', 'R–CO–R', '#4ade80', 0.69, 0.20],
        ['Carboxylic acid', 'R–COOH', '#60a5fa', 0.15, 0.55],
        ['Ester', 'R–COO–R', '#c084fc', 0.42, 0.55],
        ['Amine', 'R–NH₂', '#f472b6', 0.69, 0.55],
    ];
    groups.forEach(([name, formula, col, x, y]) => {
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X(x), Y(y), w * 0.24, Y(0.18), 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, X(x + 0.12), Y(y) + Y(0.06));
        ctx.fillStyle = '#e2e8f0'; ctx.font = '8px sans-serif';
        ctx.fillText(formula, X(x + 0.12), Y(y) + Y(0.13));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the group decides the family — swap the R tail, keep the chemistry', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, FG_SPOTS, v.sel ?? -1);
}
const FG_SPOTS = [
    { label: 'Alcohol (–OH)', fn: 'the hydroxyl group — ethanol, methanol', x: 0.27, y: 0.29, r: 0.055 },
    { label: 'Aldehyde (–CHO)', fn: 'carbonyl at the chain end — methanal', x: 0.54, y: 0.29, r: 0.055 },
    { label: 'Ketone (–CO–)', fn: 'carbonyl mid-chain — propanone', x: 0.81, y: 0.29, r: 0.055 },
    { label: 'Carboxylic acid', fn: 'the –COOH group — ethanoic acid', x: 0.27, y: 0.64, r: 0.055 },
    { label: 'Ester (–COO–)', fn: 'acid + alcohol condensed — fruity smells', x: 0.54, y: 0.64, r: 0.055 },
    { label: 'Amine (–NH₂)', fn: 'nitrogen-based group — methylamine', x: 0.81, y: 0.64, r: 0.055 },
];

/** dgm_mole — the mole triangle: particles ↔ mass ↔ volume. */
function paintMole(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // central mole hub
    ctx.fillStyle = 'rgba(251,191,36,0.25)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.50), Y(0.46), w * 0.10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('1 MOLE', X(0.50), Y(0.44));
    ctx.fillStyle = '#94a3b8'; ctx.font = '7.5px sans-serif';
    ctx.fillText('6.022×10²³', X(0.50), Y(0.50));
    // three spokes
    const spokes: [number, number, string, string][] = [
        [0.20, 0.22, 'Particles', '× Avogadro no.'],
        [0.80, 0.22, 'Mass (g)', '× molar mass'],
        [0.50, 0.80, 'Volume (L)', '÷ 22.4 L (STP)'],
    ];
    spokes.forEach(([x, y, name, conv]) => {
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(0.50), Y(0.46)); ctx.lineTo(X(x as number), Y(y as number)); ctx.stroke();
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X((x as number) - 0.11), Y((y as number) - 0.05), w * 0.22, Y(0.12), 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#93c5fd'; ctx.font = 'bold 8.5px sans-serif';
        ctx.fillText(name, X(x as number), Y(y as number) + 2);
        ctx.fillStyle = '#94a3b8'; ctx.font = '7px sans-serif';
        ctx.fillText(conv, X(x as number), Y((y as number) + 0.05));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('one mole of anything holds the same count — the chemist’s dozen', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, MOLE_SPOTS, v.sel ?? -1);
}
const MOLE_SPOTS = [
    { label: 'The mole', fn: 'the hub — 6.022×10²³ of any particle', x: 0.50, y: 0.46, r: 0.07 },
    { label: 'Particles', fn: 'atoms, molecules, ions — count them with Avogadro', x: 0.20, y: 0.22, r: 0.055 },
    { label: 'Mass', fn: 'grams — multiply by the molar mass', x: 0.80, y: 0.22, r: 0.055 },
    { label: 'Volume', fn: 'litres at STP — 22.4 L holds one mole of gas', x: 0.50, y: 0.80, r: 0.055 },
    { label: 'Avogadro constant', fn: '6.022×10²³ — the count in every mole', x: 0.50, y: 0.52, r: 0.04 },
];

/** dgm_haloalkane — classification of haloalkanes/haloarenes (NCERT fig 6.1 spec):
 *  top row: 1°, 2°, 3° (carbons bonded to the X-bearing carbon)
 *  bottom row: allylic, benzylic, vinylic, arylic (where the X sits vs the π system). */
function paintHaloalkane(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const cards: [string, string, string, number, number][] = [
        ['Primary (1°)', 'R–CH₂–X', '#4ade80', 0.04, 0.12],
        ['Secondary (2°)', 'R₂CH–X', '#fbbf24', 0.37, 0.12],
        ['Tertiary (3°)', 'R₃C–X', '#f87171', 0.70, 0.12],
        ['Allylic', 'CH₂=CH–CH₂–X', '#60a5fa', 0.04, 0.52],
        ['Benzylic', 'C₆H₅–CH₂–X', '#c084fc', 0.29, 0.52],
        ['Vinylic', 'CH₂=CH–X', '#f472b6', 0.54, 0.52],
        ['Arylic', 'C₆H₅–X', '#fb923c', 0.79, 0.52],
    ];
    cards.forEach(([name, formula, col, x, y]) => {
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X(x), Y(y), w * 0.26, Y(0.30), 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, X((x as number) + 0.13), Y(y as number) + Y(0.09));
        ctx.fillStyle = '#e2e8f0'; ctx.font = '9px monospace';
        ctx.fillText(formula, X((x as number) + 0.13), Y(y as number) + Y(0.19));
        ctx.fillStyle = '#64748b'; ctx.font = '7px sans-serif';
        const note = name.includes('1°') ? 'X-carbon touches ONE carbon — fastest SN2'
            : name.includes('2°') ? 'X-carbon touches TWO carbons'
            : name.includes('3°') ? 'X-carbon touches THREE carbons — fastest SN1'
            : name.includes('Allylic') ? 'X next to a double bond — reactive'
            : name.includes('Benzylic') ? 'X next to the ring — reactive'
            : name.includes('Vinylic') ? 'X ON the double bond — unreactive'
            : 'X ON the ring — unreactive, needs harsh conditions';
        ctx.fillText(note, X((x as number) + 0.13), Y(y as number) + Y(0.26));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('degree counts carbons on the X-bearing carbon; π-neighbouring changes everything', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, HALO_SPOTS, v.sel ?? -1);
}
const HALO_SPOTS = [
    { label: 'Primary (1°)', fn: 'X-carbon bonded to one carbon — SN2 favourite', x: 0.17, y: 0.27, r: 0.055 },
    { label: 'Secondary (2°)', fn: 'X-carbon bonded to two carbons — both paths open', x: 0.50, y: 0.27, r: 0.055 },
    { label: 'Tertiary (3°)', fn: 'X-carbon bonded to three carbons — SN1 favourite', x: 0.83, y: 0.27, r: 0.055 },
    { label: 'Allylic halide', fn: 'X on the carbon NEXT to C=C — resonance-stabilised cation', x: 0.17, y: 0.67, r: 0.05 },
    { label: 'Benzylic halide', fn: 'X on the carbon next to the benzene ring', x: 0.42, y: 0.67, r: 0.05 },
    { label: 'Vinylic halide', fn: 'X directly ON C=C — bond strengthened by resonance', x: 0.67, y: 0.67, r: 0.05 },
    { label: 'Arylic halide', fn: 'X directly on the benzene ring — sp² C–X is strong', x: 0.92, y: 0.67, r: 0.05 },
];

/** dgm_vdg — Van de Graaff generator (NCERT fig 2.29 spec): motor-driven belt
 *  sprays charge at the lower comb, carries it up, upper comb transfers it to
 *  the hollow sphere — charge spreads on the OUTER surface, millions of volts. */
function paintVdg(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // sphere
    ctx.fillStyle = 'rgba(96,165,250,0.18)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.50), Y(0.20), w * 0.16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // charge dots on outer surface
    ctx.fillStyle = '#93c5fd'; ctx.font = '9px sans-serif';
    for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        ctx.fillText('+', X(0.50) + Math.cos(a) * w * 0.175, Y(0.20) + Math.sin(a) * w * 0.175 + 3);
    }
    // insulating column
    ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.strokeStyle = '#475569';
    ctx.fillRect(X(0.42), Y(0.36), w * 0.16, Y(0.5)); ctx.strokeRect(X(0.42), Y(0.36), w * 0.16, Y(0.5));
    // belt (two vertical runs)
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(0.47), Y(0.30)); ctx.lineTo(X(0.47), Y(0.80)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.53), Y(0.30)); ctx.lineTo(X(0.53), Y(0.80)); ctx.stroke();
    // rollers
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(X(0.50), Y(0.32), w * 0.035, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(X(0.50), Y(0.80), w * 0.035, 0, Math.PI * 2); ctx.fill();
    // combs (sawtooth)
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.moveTo(X(0.38 + i * 0.012), Y(0.72)); ctx.lineTo(X(0.44 + i * 0.012), Y(0.72)); ctx.stroke();
    }
    for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.moveTo(X(0.56 + i * 0.012), Y(0.36)); ctx.lineTo(X(0.62 + i * 0.012), Y(0.36)); ctx.stroke();
    }
    // labels
    ctx.fillStyle = '#e2e8f0'; ctx.font = '8.5px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('hollow sphere — charge lives OUTSIDE', X(0.02), Y(0.10));
    ctx.fillText('spray comb (+ in)', X(0.02), Y(0.72));
    ctx.fillText('collector comb', X(0.68), Y(0.36));
    ctx.fillText('belt carries charge up', X(0.60), Y(0.60));
    ctx.fillText('motor roller', X(0.62), Y(0.84));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('millions of volts — charge goes to the outer surface no matter how full it is', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, VDG_SPOTS, v.sel ?? -1);
}
const VDG_SPOTS = [
    { label: 'Hollow sphere', fn: 'all charge sits on the OUTER surface — the key fact', x: 0.50, y: 0.20, r: 0.06 },
    { label: 'Surface charge', fn: 'repelled charge spreads on the sphere exterior', x: 0.66, y: 0.13, r: 0.045 },
    { label: 'Spray comb', fn: 'pointed brush spraying charge onto the belt', x: 0.42, y: 0.72, r: 0.045 },
    { label: 'The belt', fn: 'insulating belt physically carrying charge upward', x: 0.50, y: 0.55, r: 0.04 },
    { label: 'Collector comb', fn: 'brush inside the sphere stripping charge off the belt', x: 0.60, y: 0.36, r: 0.045 },
    { label: 'Motor roller', fn: 'drives the belt continuously — charge never stops arriving', x: 0.50, y: 0.80, r: 0.045 },
];

/** dgm_raoult — vapour pressure vs composition: ideal and non-ideal. */
function paintRaoult(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.78);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.14)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.92), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('mole fraction A →', X(0.52), Y(0.86));
    ctx.save(); ctx.translate(X(0.05), Y(0.46)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Vapour pressure →', 0, 0); ctx.restore();
    // component lines
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(X(0.90), Y(0.30)); ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.font = '7.5px sans-serif'; ctx.fillText('pA', X(0.80), Y(0.28));
    ctx.strokeStyle = '#f87171';
    ctx.beginPath(); ctx.moveTo(ox, Y(0.30)); ctx.lineTo(X(0.90), oy); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.fillText('pB', X(0.20), Y(0.28));
    // total = straight diagonal between the two ends
    ctx.strokeStyle = '#4ade80'; ctx.setLineDash([5, 4]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.30)); ctx.lineTo(X(0.90), Y(0.30)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#4ade80'; ctx.fillText('P total (ideal)', X(0.50), Y(0.26));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('Raoult’s law: each component adds its share — total pressure is the sum', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, RAOULT_SPOTS, v.sel ?? -1);
}
const RAOULT_SPOTS = [
    { label: 'pA line', fn: 'component A’s contribution — climbs as its share grows', x: 0.60, y: 0.45, r: 0.055 },
    { label: 'pB line', fn: 'component B’s contribution — fades as it’s diluted', x: 0.30, y: 0.50, r: 0.055 },
    { label: 'Ideal total', fn: 'the straight sum — Raoult’s law in action', x: 0.50, y: 0.30, r: 0.05 },
    { label: 'Mole fraction', fn: 'the x-axis — how much of each component is in the mix', x: 0.50, y: 0.78, r: 0.05 },
];

/** dgm_kinetics — rate curves: zero vs first order. */
function paintKinetics(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.80);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.12)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Time →', X(0.53), Y(0.88));
    ctx.save(); ctx.translate(X(0.05), Y(0.46)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('[Reactant] →', 0, 0); ctx.restore();
    // first-order exponential decay
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
        const u = i / 100, x = ox + u * (X(0.90) - ox), y = Y(0.20) + (1 - Math.exp(-u * 3)) * (oy - Y(0.20));
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('1st order — exponential decay', X(0.55), Y(0.40));
    // zero-order straight line
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.20)); ctx.lineTo(X(0.90), oy); ctx.stroke();
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('zero order — steady rate', X(0.50), Y(0.62));
    // half-life marker
    ctx.strokeStyle = '#94a3b8'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.50)); ctx.lineTo(X(0.90), Y(0.50)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '7px sans-serif';
    ctx.fillText('half left', X(0.88), Y(0.47));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('first order halves on a fixed clock; zero order just drains at a steady drip', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, KIN_SPOTS, v.sel ?? -1);
}
const KIN_SPOTS = [
    { label: 'First-order curve', fn: 'exponential — rate falls as concentration falls', x: 0.50, y: 0.42, r: 0.055 },
    { label: 'Zero-order line', fn: 'straight — rate stays constant whatever the level', x: 0.50, y: 0.58, r: 0.055 },
    { label: 'Half-life', fn: 'the fixed time to drop to half — signature of first order', x: 0.60, y: 0.50, r: 0.05 },
    { label: 'Concentration axis', fn: 'how much reactant is left', x: 0.12, y: 0.45, r: 0.045 },
    { label: 'Time axis', fn: 'the clock the rate runs against', x: 0.50, y: 0.80, r: 0.05 },
];

/** dgm_le_chatelier — the balance: push the equilibrium, it pushes back. */
function paintLeChatelier(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // seesaw
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(X(0.20), Y(0.42)); ctx.lineTo(X(0.80), Y(0.58)); ctx.stroke(); ctx.lineCap = 'butt';
    ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(X(0.50), Y(0.50)); ctx.lineTo(X(0.45), Y(0.66)); ctx.lineTo(X(0.55), Y(0.66)); ctx.closePath(); ctx.fill();
    // reactants / products boxes
    ctx.fillStyle = 'rgba(96,165,250,0.3)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.10), Y(0.30), w * 0.16, Y(0.10), 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#93c5fd'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('REACTANTS', X(0.18), Y(0.35));
    ctx.fillStyle = 'rgba(74,222,128,0.3)'; ctx.strokeStyle = '#4ade80';
    ctx.beginPath(); ctx.roundRect(X(0.74), Y(0.44), w * 0.16, Y(0.10), 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#86efac'; ctx.fillText('PRODUCTS', X(0.82), Y(0.49));
    // push arrows
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.18), Y(0.18)); ctx.lineTo(X(0.18), Y(0.28)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.18), Y(0.28)); ctx.lineTo(X(0.16), Y(0.25)); ctx.lineTo(X(0.20), Y(0.25)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f87171'; ctx.font = '7.5px sans-serif'; ctx.fillText('add reactant', X(0.18), Y(0.16));
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath(); ctx.moveTo(X(0.82), Y(0.30)); ctx.lineTo(X(0.82), Y(0.42)); ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.moveTo(X(0.82), Y(0.30)); ctx.lineTo(X(0.80), Y(0.33)); ctx.lineTo(X(0.84), Y(0.33)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#60a5fa'; ctx.font = '7.5px sans-serif'; ctx.fillText('shift →', X(0.82), Y(0.28));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('push one side and the system shifts to undo it — the equilibrium fights back', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, LC_SPOTS, v.sel ?? -1);
}
const LC_SPOTS = [
    { label: 'Reactants', fn: 'the left pan — feed it and the balance tips', x: 0.18, y: 0.35, r: 0.055 },
    { label: 'Products', fn: 'the right pan — where the shifted equilibrium lands', x: 0.82, y: 0.49, r: 0.055 },
    { label: 'The disturbance', fn: 'adding reactant pushes the seesaw down on the left', x: 0.18, y: 0.22, r: 0.05 },
    { label: 'The shift', fn: 'the system compensates — converting reactant to product', x: 0.82, y: 0.36, r: 0.05 },
    { label: 'The pivot', fn: 'the equilibrium position — it rebalances, never resets', x: 0.50, y: 0.58, r: 0.05 },
];

/** dgm_hybridization — sp³ orbitals: four lobes to the tetrahedron corners. */
function paintHybridization(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // central atom
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.50), Y(0.45), w * 0.030, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('C', X(0.50), Y(0.45) + 3);
    // four lobes to tetrahedron corners
    const lobes: [number, number, number][] = [[0.50, 0.18, 0], [0.24, 0.58, 120], [0.76, 0.58, -120], [0.50, 0.80, 180]];
    lobes.forEach(([x, y]) => {
        ctx.fillStyle = 'rgba(96,165,250,0.35)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(X(x as number), Y(y as number), w * 0.055, w * 0.030, Math.atan2(Y(y as number) - Y(0.45), X(x as number) - X(0.50)), 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#93c5fd'; ctx.font = 'bold 7px sans-serif';
        ctx.fillText('sp³', X(x as number), Y(y as number) + 3);
    });
    // labels
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('109.5° apart', X(0.50), Y(0.92));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('one s + three p orbitals merge into four equal sp³ hybrids — the tetrahedral spread', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, HYB_SPOTS, v.sel ?? -1);
}
const HYB_SPOTS = [
    { label: 'Central carbon', fn: 'the atom whose orbitals hybridise', x: 0.50, y: 0.45, r: 0.05 },
    { label: 'sp³ orbital (top)', fn: 'one of four identical hybrids pointing to a tetrahedron corner', x: 0.50, y: 0.18, r: 0.05 },
    { label: 'sp³ orbital (left)', fn: 'the second hybrid — same energy, same shape', x: 0.24, y: 0.58, r: 0.05 },
    { label: 'sp³ orbital (right)', fn: 'the third hybrid', x: 0.76, y: 0.58, r: 0.05 },
    { label: 'sp³ orbital (down)', fn: 'the fourth — 109.5° from each neighbour', x: 0.50, y: 0.80, r: 0.05 },
    { label: '109.5° angle', fn: 'the tetrahedral bond angle — equal repulsion gives equal spread', x: 0.50, y: 0.92, r: 0.045 },
];

/** dgm_sn2 — the SN2 mechanism: backside attack, umbrella flip. */
function paintSn2(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // nucleophile approaching from behind
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.14), Y(0.42), w * 0.035, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Nu⁻', X(0.14), Y(0.42) + 3);
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(X(0.19), Y(0.42)); ctx.lineTo(X(0.34), Y(0.42)); ctx.stroke(); ctx.setLineDash([]);
    // central C with three substituents + leaving group
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.42), Y(0.42), w * 0.030, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('C', X(0.42), Y(0.42) + 3);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    [[0.36, 0.30, 'R'], [0.42, 0.24, 'R'], [0.48, 0.30, 'R']].forEach(([x, y, lbl]) => {
        ctx.beginPath(); ctx.moveTo(X(0.42), Y(0.42)); ctx.lineTo(X(x as number), Y(y as number)); ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif';
        ctx.fillText(lbl as string, X(x as number), Y((y as number) - 0.02));
    });
    // leaving group on the right
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.arc(X(0.56), Y(0.42), w * 0.032, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('X', X(0.56), Y(0.42) + 3);
    // → arrow to product
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.64), Y(0.42)); ctx.lineTo(X(0.72), Y(0.42)); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(X(0.72), Y(0.42)); ctx.lineTo(X(0.70), Y(0.40)); ctx.lineTo(X(0.70), Y(0.44)); ctx.closePath(); ctx.fill();
    // product: Nu now on the right (inverted)
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.82), Y(0.42), w * 0.030, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('C', X(0.82), Y(0.42) + 3);
    ctx.strokeStyle = '#e2e8f0';
    [[0.76, 0.30], [0.82, 0.24], [0.88, 0.30]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.moveTo(X(0.82), Y(0.42)); ctx.lineTo(X(x), Y(y)); ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.fillText('R', X(x), Y(y - 0.02));
    });
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.94), Y(0.42), w * 0.032, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('Nu', X(0.94), Y(0.42) + 3);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('inverted — like an umbrella flipping in the wind', X(0.50), Y(0.72));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the nucleophile attacks from behind — the leaving group departs the same instant', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SN2_SPOTS, v.sel ?? -1);
}
const SN2_SPOTS = [
    { label: 'Nucleophile', fn: 'the attacker — approaches from the back side', x: 0.14, y: 0.42, r: 0.05 },
    { label: 'Central carbon', fn: 'the carbon under attack — four bonds, one must go', x: 0.42, y: 0.42, r: 0.045 },
    { label: 'Leaving group X', fn: 'departs the instant the new bond forms — the exchange', x: 0.56, y: 0.42, r: 0.05 },
    { label: 'Transition state', fn: 'the halfway moment — five groups crowding one carbon', x: 0.42, y: 0.24, r: 0.05 },
    { label: 'Inverted product', fn: 'the umbrella flipped — configuration reversed', x: 0.82, y: 0.42, r: 0.05 },
    { label: 'Backside attack', fn: 'why it inverts — the attack pushes through opposite the leaving group', x: 0.27, y: 0.42, r: 0.05 },
];

/** dgm_nuc_addition — nucleophilic addition to a carbonyl: the C=O opens. */
function paintNucAddition(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // carbonyl: C=O with δ+/δ−
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.30), Y(0.44), w * 0.030, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('C', X(0.30), Y(0.44) + 3);
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.30), Y(0.30), w * 0.030, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('O', X(0.30), Y(0.30) + 3);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.285), Y(0.36)); ctx.lineTo(X(0.285), Y(0.30)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.315), Y(0.36)); ctx.lineTo(X(0.315), Y(0.30)); ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 7px sans-serif';
    ctx.fillText('δ+', X(0.36), Y(0.44)); ctx.fillText('δ−', X(0.36), Y(0.30));
    // nucleophile attacking
    ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(X(0.16), Y(0.62), w * 0.030, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('Nu⁻', X(0.16), Y(0.62) + 3);
    ctx.strokeStyle = '#4ade80'; ctx.setLineDash([5, 4]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.19), Y(0.58)); ctx.lineTo(X(0.26), Y(0.48)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#4ade80'; ctx.font = '7.5px sans-serif'; ctx.fillText('attacks δ+ carbon', X(0.14), Y(0.72));
    // → arrow
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.40), Y(0.44)); ctx.lineTo(X(0.50), Y(0.44)); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(X(0.50), Y(0.44)); ctx.lineTo(X(0.48), Y(0.42)); ctx.lineTo(X(0.48), Y(0.46)); ctx.closePath(); ctx.fill();
    // product: tetrahedral C-O⁻-Nu
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.66), Y(0.44), w * 0.030, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('C', X(0.66), Y(0.44) + 3);
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.66), Y(0.30), w * 0.026, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('O⁻', X(0.66), Y(0.30) + 3);
    ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(X(0.80), Y(0.50), w * 0.026, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.fillText('Nu', X(0.80), Y(0.50) + 3);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.66), Y(0.36)); ctx.lineTo(X(0.66), Y(0.33)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.70), Y(0.46)); ctx.lineTo(X(0.78), Y(0.49)); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the double bond opens — oxygen takes the electrons, carbon gains the nucleophile', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, NUC_SPOTS, v.sel ?? -1);
}
const NUC_SPOTS = [
    { label: 'Carbonyl carbon', fn: 'δ+ — the electron-poor carbon the nucleophile targets', x: 0.30, y: 0.44, r: 0.045 },
    { label: 'Carbonyl oxygen', fn: 'δ− — hogs the π electrons, leaves carbon bare', x: 0.30, y: 0.30, r: 0.045 },
    { label: 'Nucleophile', fn: 'the attacker — electron-rich, hunts the δ+ carbon', x: 0.16, y: 0.62, r: 0.045 },
    { label: 'C=O double bond', fn: 'the two lines — one σ, one π that breaks', x: 0.30, y: 0.36, r: 0.04 },
    { label: 'Alkoxide product', fn: 'O⁻ formed — the π electrons landed on oxygen', x: 0.66, y: 0.32, r: 0.045 },
    { label: 'New C–Nu bond', fn: 'the nucleophile now bonded — tetrahedral carbon', x: 0.78, y: 0.47, r: 0.045 },
];

/** dgm_reaction_types — the four reaction families. */
function paintReactionTypes(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const types: [string, string, string, number, number][] = [
        ['Combination', 'A + B → AB', '#4ade80', 0.14, 0.20],
        ['Decomposition', 'AB → A + B', '#f87171', 0.55, 0.20],
        ['Displacement', 'A + BC → AC + B', '#fbbf24', 0.14, 0.55],
        ['Double displacement', 'AB + CD → AD + CB', '#60a5fa', 0.55, 0.55],
    ];
    types.forEach(([name, eq, col, x, y]) => {
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X(x), Y(y), w * 0.32, Y(0.16), 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, X(x + 0.16), Y(y) + Y(0.055));
        ctx.fillStyle = '#e2e8f0'; ctx.font = '8px sans-serif';
        ctx.fillText(eq, X(x + 0.16), Y(y) + Y(0.12));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('every reaction is one of these — join, split, swap, or double-swap', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, RT_SPOTS, v.sel ?? -1);
}
const RT_SPOTS = [
    { label: 'Combination', fn: 'two become one — H₂ + O₂ → water', x: 0.30, y: 0.28, r: 0.06 },
    { label: 'Decomposition', fn: 'one becomes two — CaCO₃ → CaO + CO₂', x: 0.71, y: 0.28, r: 0.06 },
    { label: 'Displacement', fn: 'the stronger one kicks the weaker out — Zn kicks Cu', x: 0.30, y: 0.63, r: 0.06 },
    { label: 'Double displacement', fn: 'partners swap — AgNO₃ + NaCl → AgCl + NaNO₃', x: 0.71, y: 0.63, r: 0.06 },
];

/** dgm_hydrocarbons — alkane, alkene, alkyne: the three carbon bonds. */
function paintHydrocarbons(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const families: [string, string, string, number, number][] = [
        ['Alkane (single)', 'CH₃–CH₃', '#4ade80', 0.14, 0.22],
        ['Alkene (double)', 'CH₂=CH₂', '#fbbf24', 0.40, 0.22],
        ['Alkyne (triple)', 'CH≡CH', '#f87171', 0.66, 0.22],
    ];
    families.forEach(([name, formula, col, x, y]) => {
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X(x), Y(y), w * 0.24, Y(0.22), 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 8.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, X(x + 0.12), Y(y) + Y(0.055));
        // draw two C spheres + bond lines
        const cy = Y(y) + Y(0.14);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath(); ctx.arc(X(x + 0.08), cy, w * 0.022, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(X(x + 0.16), cy, w * 0.022, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif';
        ctx.fillText('C', X(x + 0.08), cy + 3); ctx.fillText('C', X(x + 0.16), cy + 3);
        ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        const nb = name.startsWith('Alkane') ? 1 : name.startsWith('Alkene') ? 2 : 3;
        for (let i = 0; i < nb; i++) {
            ctx.beginPath(); ctx.moveTo(X(x + 0.10), cy - (i - (nb - 1) / 2) * 3); ctx.lineTo(X(x + 0.14), cy - (i - (nb - 1) / 2) * 3); ctx.stroke();
        }
        ctx.fillStyle = '#e2e8f0'; ctx.font = '7.5px sans-serif';
        ctx.fillText(formula, X(x + 0.12), Y(y) + Y(0.19));
    });
    // saturation note
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('saturated', X(0.26), Y(0.52)); ctx.fillText('unsaturated — the π bonds open to add', X(0.62), Y(0.52));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('single = saturated and sleepy; double & triple = unsaturated and reactive', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, HC_SPOTS, v.sel ?? -1);
}
const HC_SPOTS = [
    { label: 'Alkane', fn: 'single bonds only — saturated, unreactive, paraffins', x: 0.26, y: 0.33, r: 0.055 },
    { label: 'Alkene', fn: 'one double bond — unsaturated, adds H₂ and Br₂', x: 0.52, y: 0.33, r: 0.055 },
    { label: 'Alkyne', fn: 'one triple bond — most unsaturated, most reactive', x: 0.78, y: 0.33, r: 0.055 },
    { label: 'C–C single bond', fn: 'the single line — free rotation allowed', x: 0.26, y: 0.36, r: 0.04 },
    { label: 'C=C double bond', fn: 'the double line — one σ, one π that adds', x: 0.52, y: 0.36, r: 0.04 },
    { label: 'C≡C triple bond', fn: 'the triple line — one σ, two π', x: 0.78, y: 0.36, r: 0.04 },
];

/** dgm_circuit_symbols — the standard circuit symbols NCERT uses. */
function paintCircuitSymbols(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const cell = (x: number, y: number) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(x), Y(y)); ctx.lineTo(X(x - 0.03), Y(y)); ctx.stroke();
        ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(x - 0.005), Y(y - 0.04)); ctx.lineTo(X(x - 0.005), Y(y + 0.04)); ctx.stroke();
        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(x + 0.015), Y(y - 0.025)); ctx.lineTo(X(x + 0.015), Y(y + 0.025)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x + 0.03), Y(y)); ctx.lineTo(X(x + 0.015), Y(y)); ctx.stroke();
    };
    const battery = (x: number, y: number) => { cell(x, y); cell(x + 0.05, y); };
    const bulb = (x: number, y: number) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(x - 0.04), Y(y)); ctx.lineTo(X(x - 0.02), Y(y)); ctx.stroke();
        ctx.beginPath(); ctx.arc(X(x), Y(y), w * 0.022, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x - 0.015), Y(y - 0.015)); ctx.lineTo(X(x + 0.015), Y(y + 0.015)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x - 0.015), Y(y + 0.015)); ctx.lineTo(X(x + 0.015), Y(y - 0.015)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x + 0.02), Y(y)); ctx.lineTo(X(x + 0.04), Y(y)); ctx.stroke();
    };
    const resistor = (x: number, y: number) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(x - 0.05), Y(y)); ctx.lineTo(X(x - 0.035), Y(y)); ctx.stroke();
        ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(X(x - 0.035), Y(y));
        for (let i = 0; i < 6; i++) ctx.lineTo(X(x - 0.035 + (i + 0.5) * 0.0117), Y(y) + (i % 2 ? -5 : 5));
        ctx.lineTo(X(x + 0.035), Y(y)); ctx.stroke();
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(x + 0.035), Y(y)); ctx.lineTo(X(x + 0.05), Y(y)); ctx.stroke();
    };
    const sw = (x: number, y: number, open: boolean) => {
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(x - 0.04), Y(y)); ctx.lineTo(X(x - 0.015), Y(y)); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(X(x - 0.015), Y(y), 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(X(x + 0.015), Y(y), 2.5, 0, Math.PI * 2); ctx.fill();
        if (open) { ctx.beginPath(); ctx.moveTo(X(x - 0.015), Y(y)); ctx.lineTo(X(x + 0.015), Y(y - 0.04)); ctx.stroke(); }
        else { ctx.beginPath(); ctx.moveTo(X(x - 0.015), Y(y)); ctx.lineTo(X(x + 0.015), Y(y)); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(X(x + 0.015), Y(y)); ctx.lineTo(X(x + 0.04), Y(y)); ctx.stroke();
    };
    const items: [string, (x: number, y: number) => void, number, number][] = [
        ['Cell', cell, 0.16, 0.20], ['Battery', battery, 0.40, 0.20], ['Bulb', bulb, 0.64, 0.20],
        ['Resistor', resistor, 0.16, 0.52], ['Switch (open)', (x, y) => sw(x, y, true), 0.40, 0.52], ['Switch (closed)', (x, y) => sw(x, y, false), 0.64, 0.52],
    ];
    items.forEach(([name, draw, x, y]) => {
        draw(x as number, y as number);
        ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, X(x as number), Y((y as number) + 0.09));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the standard shorthand — every circuit diagram speaks this alphabet', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, CSYM_SPOTS, v.sel ?? -1);
}
const CSYM_SPOTS = [
    { label: 'Cell', fn: 'one long + one short line — the single power unit', x: 0.16, y: 0.20, r: 0.045 },
    { label: 'Battery', fn: 'cells chained — the pair of long-short pairs', x: 0.41, y: 0.20, r: 0.045 },
    { label: 'Bulb', fn: 'the circle with a cross — the filament lamp', x: 0.64, y: 0.20, r: 0.045 },
    { label: 'Resistor', fn: 'the zigzag — opposition to the flow', x: 0.16, y: 0.52, r: 0.045 },
    { label: 'Switch open', fn: 'the gap — current cannot cross', x: 0.40, y: 0.52, r: 0.045 },
    { label: 'Switch closed', fn: 'the bridge — current flows through', x: 0.64, y: 0.52, r: 0.045 },
];

/** dgm_heat_transfer — conduction, convection, radiation: the three ways heat travels. */
function paintHeatTransfer(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // conduction: rod in flame
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.18), Y(0.55), w * 0.028, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(0.20), Y(0.55)); ctx.lineTo(X(0.40), Y(0.55)); ctx.stroke();
    for (let i = 0; i < 5; i++) { ctx.fillStyle = i < 2 ? '#f87171' : '#64748b'; ctx.beginPath(); ctx.arc(X(0.22 + i * 0.04), Y(0.55), 2, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('CONDUCTION', X(0.28), Y(0.62));
    ctx.fillStyle = '#94a3b8'; ctx.font = '6.5px sans-serif'; ctx.fillText('heat passes atom to atom — solids', X(0.28), Y(0.67));
    // convection: loop in water
    ctx.fillStyle = 'rgba(96,165,250,0.2)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.55), Y(0.35), w * 0.22, Y(0.28), 6); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#60a5fa'; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.ellipse(X(0.66), Y(0.48), w * 0.06, Y(0.08), 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(0.66), Y(0.62), w * 0.018, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('CONVECTION', X(0.66), Y(0.72));
    ctx.fillStyle = '#94a3b8'; ctx.font = '6.5px sans-serif'; ctx.fillText('warm fluid rises, cool sinks — the loop', X(0.66), Y(0.77));
    // radiation: sun beaming
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.85), Y(0.20), w * 0.030, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2;
        ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(X(0.85) + Math.cos(a) * w * 0.038, Y(0.20) + Math.sin(a) * w * 0.038); ctx.lineTo(X(0.85) + Math.cos(a) * w * 0.055, Y(0.20) + Math.sin(a) * w * 0.055); ctx.stroke();
    }
    ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.85), Y(0.26)); ctx.lineTo(X(0.85), Y(0.58)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('RADIATION', X(0.85), Y(0.62));
    ctx.fillStyle = '#94a3b8'; ctx.font = '6.5px sans-serif'; ctx.fillText('no medium needed — travels through vacuum', X(0.85), Y(0.67));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('three roads for heat — through matter, with matter, or as light through nothing', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, HEAT_SPOTS, v.sel ?? -1);
}
const HEAT_SPOTS = [
    { label: 'Conduction', fn: 'heat walking atom to atom down the rod — how a spoon heats in soup', x: 0.28, y: 0.55, r: 0.055 },
    { label: 'The flame', fn: 'the heat source driving the flow', x: 0.18, y: 0.55, r: 0.04 },
    { label: 'Convection loop', fn: 'warm water rises, cool sinks — the circulating current', x: 0.66, y: 0.48, r: 0.055 },
    { label: 'The heat source', fn: 'warming the bottom — starting the loop', x: 0.66, y: 0.62, r: 0.04 },
    { label: 'Radiation', fn: 'heat as light — arrives through empty space', x: 0.85, y: 0.20, r: 0.05 },
    { label: 'The beam', fn: 'infrared rays — no atoms needed to carry them', x: 0.85, y: 0.42, r: 0.045 },
];

/** dgm_shadow — umbra and penumbra: the two parts of a shadow. */
function paintShadow(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // extended light source
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(0.10), Y(0.42), w * 0.045, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('LIGHT', X(0.10), Y(0.55));
    // opaque object
    ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.arc(X(0.40), Y(0.42), w * 0.035, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.fillText('object', X(0.40), Y(0.55));
    // rays to screen
    ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.10), Y(0.37)); ctx.lineTo(X(0.40), Y(0.385)); ctx.lineTo(X(0.90), Y(0.30)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.10), Y(0.47)); ctx.lineTo(X(0.40), Y(0.455)); ctx.lineTo(X(0.90), Y(0.54)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.10), Y(0.37)); ctx.lineTo(X(0.40), Y(0.385)); ctx.lineTo(X(0.90), Y(0.46)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.10), Y(0.47)); ctx.lineTo(X(0.40), Y(0.455)); ctx.lineTo(X(0.90), Y(0.38)); ctx.stroke();
    // screen + shadow regions
    ctx.fillStyle = 'rgba(30,41,59,0.9)'; ctx.fillRect(X(0.88), Y(0.26), w * 0.02, Y(0.40));
    ctx.fillStyle = '#0f172a'; ctx.fillRect(X(0.885), Y(0.36), w * 0.012, Y(0.14));
    ctx.fillStyle = '#64748b'; ctx.font = 'bold 7px sans-serif';
    ctx.fillText('UMBRA', X(0.93), Y(0.43));
    ctx.fillText('PENUMBRA', X(0.93), Y(0.32)); ctx.fillText('PENUMBRA', X(0.93), Y(0.56));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('umbra = total block, penumbra = partial — the dark centre and grey rim of every eclipse', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SHAD_SPOTS, v.sel ?? -1);
}
const SHAD_SPOTS = [
    { label: 'Light source', fn: 'the lamp — an extended source, not a point', x: 0.10, y: 0.42, r: 0.05 },
    { label: 'Opaque object', fn: 'blocks the light — casts the shadow', x: 0.40, y: 0.42, r: 0.05 },
    { label: 'Umbra', fn: 'the fully dark centre — light blocked completely', x: 0.90, y: 0.43, r: 0.045 },
    { label: 'Penumbra', fn: 'the grey rim — part of the source still peeks in', x: 0.90, y: 0.32, r: 0.045 },
    { label: 'Screen', fn: 'where the shadow lands', x: 0.88, y: 0.55, r: 0.04 },
];

/** dgm_inertia — the coin-and-card trick: the coin drops, the card flies. */
function paintInertia(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // glass
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.42), Y(0.38)); ctx.lineTo(X(0.40), Y(0.75)); ctx.lineTo(X(0.62), Y(0.75)); ctx.lineTo(X(0.60), Y(0.38)); ctx.stroke();
    ctx.fillStyle = 'rgba(96,165,250,0.15)'; ctx.fillRect(X(0.42), Y(0.50), X(0.18), Y(0.24));
    // card on top
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(X(0.38), Y(0.36), X(0.26), 6);
    ctx.strokeStyle = '#b45309'; ctx.lineWidth = 1; ctx.strokeRect(X(0.38), Y(0.36), X(0.26), 6);
    // coin resting on card
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse(X(0.51), Y(0.34), w * 0.020, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('coin', X(0.51), Y(0.29));
    // flick arrow on the card
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(X(0.68), Y(0.38)); ctx.lineTo(X(0.80), Y(0.36)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.80), Y(0.36)); ctx.lineTo(X(0.77), Y(0.34)); ctx.lineTo(X(0.77), Y(0.39)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('flick the card →', X(0.74), Y(0.30));
    // result: coin falls in glass
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse(X(0.51), Y(0.70), w * 0.020, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4ade80'; ctx.font = '7.5px sans-serif';
    ctx.fillText('the coin drops in — it stayed put', X(0.51), Y(0.80));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the coin resists the card’s motion — inertia keeps it still while the card flies', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, INERT_SPOTS, v.sel ?? -1);
}
const INERT_SPOTS = [
    { label: 'The coin', fn: 'resting on the card — wants to stay still', x: 0.51, y: 0.34, r: 0.045 },
    { label: 'The card', fn: 'about to be flicked away', x: 0.51, y: 0.36, r: 0.045 },
    { label: 'The flick', fn: 'the fast push that removes the card', x: 0.74, y: 0.37, r: 0.045 },
    { label: 'The glass', fn: 'waiting below to catch the coin', x: 0.51, y: 0.56, r: 0.055 },
    { label: 'Dropped coin', fn: 'inertia held it in place — it fell straight in', x: 0.51, y: 0.70, r: 0.045 },
    { label: 'Inertia', fn: 'the property — mass resists any change in motion', x: 0.30, y: 0.20, r: 0.05 },
];

/** dgm_energy_chain — the conversions: chemical → heat → kinetic → electrical. */
function paintEnergyChain(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const steps: [string, string, number][] = [
        ['Fuel (chemical)', '#f87171', 0.10],
        ['Heat (boiler)', '#fbbf24', 0.30],
        ['Motion (turbine)', '#4ade80', 0.50],
        ['Electric (generator)', '#60a5fa', 0.70],
        ['Light (bulb)', '#c084fc', 0.90],
    ];
    steps.forEach(([name, col, x], i) => {
        ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X((x as number) - 0.08), Y(0.36), w * 0.16, Y(0.16), 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name as string, X(x as number), Y(0.44));
        if (i < steps.length - 1) {
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(X((x as number) + 0.08), Y(0.44)); ctx.lineTo(X((x as number) + 0.12), Y(0.44)); ctx.stroke();
            ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(X((x as number) + 0.12), Y(0.44)); ctx.lineTo(X((x as number) + 0.105), Y(0.425)); ctx.lineTo(X((x as number) + 0.105), Y(0.455)); ctx.closePath(); ctx.fill();
        }
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif';
    ctx.fillText('each arrow is a conversion — energy never dies, it changes costume', X(0.50), Y(0.62));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('a power station is just a chain of costumes — chemical energy ending as light', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, ECHAIN_SPOTS, v.sel ?? -1);
}
const ECHAIN_SPOTS = [
    { label: 'Chemical energy', fn: 'locked in the fuel — coal, gas, food', x: 0.10, y: 0.44, r: 0.055 },
    { label: 'Heat energy', fn: 'the boiler releases it — steam pressure', x: 0.30, y: 0.44, r: 0.055 },
    { label: 'Kinetic energy', fn: 'the turbine spins — motion from steam', x: 0.50, y: 0.44, r: 0.055 },
    { label: 'Electrical energy', fn: 'the generator converts motion to current', x: 0.70, y: 0.44, r: 0.055 },
    { label: 'Light energy', fn: 'the bulb — the final useful form', x: 0.90, y: 0.44, r: 0.055 },
    { label: 'The conversions', fn: 'each arrow — energy changing form, never amount', x: 0.40, y: 0.44, r: 0.045 },
];

/** dgm_gravitation_c9 — universal gravitation: Earth pulls Moon, Moon pulls Earth. */
function paintGravitation(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // Earth left, Moon right, mutual arrows
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.arc(X(0.28), Y(0.45), w * 0.075, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('EARTH', X(0.28), Y(0.45) + 4);
    ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.arc(X(0.76), Y(0.45), w * 0.035, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 7px sans-serif';
    ctx.fillText('MOON', X(0.76), Y(0.45) + 3);
    // mutual pull arrows
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(X(0.40), Y(0.40)); ctx.lineTo(X(0.60), Y(0.40)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.60), Y(0.40)); ctx.lineTo(X(0.57), Y(0.38)); ctx.lineTo(X(0.57), Y(0.42)); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(X(0.60), Y(0.50)); ctx.lineTo(X(0.40), Y(0.50)); ctx.stroke();
    ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.moveTo(X(0.40), Y(0.50)); ctx.lineTo(X(0.43), Y(0.48)); ctx.lineTo(X(0.43), Y(0.52)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('equal pull, both ways', X(0.50), Y(0.35));
    // inverse-square note
    ctx.fillStyle = 'rgba(51,65,85,0.9)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(X(0.28), Y(0.72), w * 0.44, Y(0.14), 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('F = G·m₁·m₂ / r²', X(0.50), Y(0.78));
    ctx.fillStyle = '#94a3b8'; ctx.font = '7.5px sans-serif';
    ctx.fillText('double the distance → quarter the force', X(0.50), Y(0.84));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('every mass pulls every other — the same law drops an apple and holds the Moon', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, GRAV_SPOTS, v.sel ?? -1);
}
const GRAV_SPOTS = [
    { label: 'Earth', fn: 'the big mass — pulls the Moon and gets pulled back', x: 0.28, y: 0.45, r: 0.07 },
    { label: 'Moon', fn: 'the small mass — pulled by Earth, and pulls Earth too', x: 0.76, y: 0.45, r: 0.05 },
    { label: 'Mutual force', fn: 'equal and opposite — Newton’s third law in space', x: 0.50, y: 0.45, r: 0.055 },
    { label: 'Inverse-square law', fn: 'F = G·m₁·m₂/r² — force dies off fast with distance', x: 0.50, y: 0.78, r: 0.055 },
];

/** dgm_taxonomy — the Linnaean pyramid: kingdom down to species. */
function paintTaxonomy(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ranks: [string, string, number][] = [
        ['Kingdom', '#f87171', 0.14], ['Phylum', '#fbbf24', 0.24], ['Class', '#4ade80', 0.34],
        ['Order', '#2dd4bf', 0.44], ['Family', '#60a5fa', 0.54], ['Genus', '#818cf8', 0.64], ['Species', '#c084fc', 0.74],
    ];
    ranks.forEach(([name, col, y], i) => {
        const ww = 0.90 - i * 0.10;
        ctx.fillStyle = `${col}55`; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(X(0.05 + i * 0.05), Y(y as number), X(ww), Y(0.075), 4); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name, X(0.50), Y((y as number) + 0.05));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '7.5px sans-serif';
    ctx.fillText('broadest', X(0.90), Y(0.20)); ctx.fillText('narrowest — one kind', X(0.90), Y(0.80));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('seven nested boxes — each rank a tighter group than the one above', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, TAX_SPOTS, v.sel ?? -1);
}
const TAX_SPOTS = [
    { label: 'Kingdom', fn: 'the widest box — Animalia, Plantae, Fungi', x: 0.50, y: 0.17, r: 0.05 },
    { label: 'Phylum', fn: 'body plan — Chordata, Arthropoda', x: 0.50, y: 0.27, r: 0.05 },
    { label: 'Class', fn: 'Mammalia, Aves, Insecta', x: 0.50, y: 0.37, r: 0.05 },
    { label: 'Order', fn: 'Primates, Carnivora', x: 0.50, y: 0.47, r: 0.05 },
    { label: 'Family', fn: 'Hominidae, Felidae', x: 0.50, y: 0.57, r: 0.05 },
    { label: 'Genus', fn: 'Homo, Panthera', x: 0.50, y: 0.67, r: 0.05 },
    { label: 'Species', fn: 'sapiens, tigris — one kind that can interbreed', x: 0.50, y: 0.77, r: 0.05 },
];

/** dgm_potentiometer — NCERT fig: driver cell + wire AB, jockey slides to the balance point. */
function paintPotentiometer(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'light');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // wire AB
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(X(0.08), Y(0.72)); ctx.lineTo(X(0.92), Y(0.72)); ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('A', X(0.08), Y(0.80)); ctx.fillText('B', X(0.92), Y(0.80));
    // driver cell top rail
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.08), Y(0.72)); ctx.lineTo(X(0.08), Y(0.18)); ctx.lineTo(X(0.5), Y(0.18)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.92), Y(0.72)); ctx.lineTo(X(0.92), Y(0.18)); ctx.lineTo(X(0.58), Y(0.18)); ctx.stroke();
    // cell symbol (long/short plate)
    ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(0.5), Y(0.13)); ctx.lineTo(X(0.5), Y(0.23)); ctx.stroke();
    ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(X(0.54), Y(0.15)); ctx.lineTo(X(0.54), Y(0.21)); ctx.stroke();
    ctx.fillStyle = '#e11d48'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('driver cell', X(0.52), Y(0.10));
    // jockey + galvanometer to test cell
    const jx = X(0.30 + ((v.jockey ?? 40) / 100) * 0.4);
    ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(jx, Y(0.72)); ctx.lineTo(jx, Y(0.50)); ctx.lineTo(X(0.30), Y(0.50)); ctx.lineTo(X(0.30), Y(0.38)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(jx, Y(0.50)); ctx.lineTo(X(0.42), Y(0.50)); ctx.lineTo(X(0.42), Y(0.38)); ctx.stroke();
    ctx.strokeStyle = '#0284c7'; ctx.beginPath(); ctx.arc(X(0.36), Y(0.38), 10, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#0284c7'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('G', X(0.36), Y(0.41));
    ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif';
    ctx.fillText('jockey', jx, Y(0.47));
    // balance length marker
    ctx.strokeStyle = '#059669'; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.08), Y(0.62)); ctx.lineTo(jx, Y(0.62)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#059669'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('balancing length l', (X(0.08) + jx) / 2, Y(0.60));
    ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif';
    ctx.fillText('at balance the galvanometer reads zero — the wire length measures emf', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, POT_SPOTS, v.sel ?? -1);
}
const POT_SPOTS = [
    { label: 'Wire AB', fn: 'uniform wire — potential drops evenly along it', x: 0.5, y: 0.72, r: 0.05 },
    { label: 'Driver cell', fn: 'keeps a steady current through the wire', x: 0.52, y: 0.18, r: 0.045 },
    { label: 'Jockey', fn: 'slides until the galvanometer shows zero', x: 0.5, y: 0.52, r: 0.045 },
    { label: 'Galvanometer', fn: 'reads zero at the balance point — no current drawn', x: 0.36, y: 0.38, r: 0.05 },
    { label: 'Balancing length', fn: 'l ∝ emf — compare two cells by their lengths', x: 0.22, y: 0.62, r: 0.05 },
];

/** dgm_galvanometer_conv — galvanometer + shunt = ammeter; + series R = voltmeter. */
function paintGalvConv(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'light');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // left: ammeter — galvanometer with parallel shunt
    ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.25), Y(0.35), 14, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#0284c7'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('G', X(0.25), Y(0.39));
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.11), Y(0.55)); ctx.lineTo(X(0.11), Y(0.35)); ctx.lineTo(X(0.18), Y(0.35)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.32), Y(0.35)); ctx.lineTo(X(0.39), Y(0.35)); ctx.lineTo(X(0.39), Y(0.55)); ctx.lineTo(X(0.11), Y(0.55)); ctx.stroke();
    // shunt zigzag
    ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 2;
    let x = X(0.14); const shY = Y(0.55);
    ctx.beginPath(); ctx.moveTo(X(0.11), shY); 
    for (let i = 0; i < 5; i++) { ctx.lineTo(x + 3, shY - 6); ctx.lineTo(x + 6, shY); x += 6; }
    ctx.stroke();
    ctx.fillStyle = '#e11d48'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('shunt S (tiny)', X(0.25), Y(0.66));
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('AMMETER — low resistance, in series', X(0.25), Y(0.80));
    // right: voltmeter — galvanometer + series resistor
    ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.72), Y(0.35), 14, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#0284c7'; ctx.fillText('G', X(0.72), Y(0.39));
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.52), Y(0.35)); ctx.lineTo(X(0.58), Y(0.35)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.79), Y(0.35)); ctx.lineTo(X(0.94), Y(0.35)); ctx.stroke();
    // series resistor zigzag
    ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 2; x = X(0.52);
    ctx.beginPath(); ctx.moveTo(X(0.52), Y(0.35));
    for (let i = 0; i < 5; i++) { ctx.lineTo(x + 4, Y(0.35) - 7); ctx.lineTo(x + 8, Y(0.35)); x += 8; }
    ctx.stroke();
    ctx.fillStyle = '#e11d48'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('series R (huge)', X(0.58), Y(0.28));
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('VOLTMETER — high resistance, in parallel', X(0.72), Y(0.80));
    ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif';
    ctx.fillText('same meter — a shunt makes it an ammeter, a series resistor a voltmeter', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, GALV_SPOTS, v.sel ?? -1);
}
const GALV_SPOTS = [
    { label: 'Galvanometer', fn: 'the sensitive meter at the heart of both', x: 0.25, y: 0.35, r: 0.06 },
    { label: 'Shunt', fn: 'a tiny parallel resistor — current bypasses the coil', x: 0.25, y: 0.55, r: 0.05 },
    { label: 'Series resistor', fn: 'a huge resistor — drops most of the voltage', x: 0.58, y: 0.35, r: 0.05 },
    { label: 'Voltmeter G', fn: 'same galvanometer — now measuring volts', x: 0.72, y: 0.35, r: 0.06 },
    { label: 'Ammeter wiring', fn: 'sits in series — measures the circuit’s current', x: 0.25, y: 0.80, r: 0.045 },
];

/** dgm_lcr_resonance — current vs frequency; peak at f0, bandwidth marked. */
function paintLCR(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.82);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.12)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('frequency →', X(0.53), Y(0.92));
    ctx.save(); ctx.translate(X(0.05), Y(0.47)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('current →', 0, 0); ctx.restore();
    const q = (v.q ?? 50) / 100;                 // Q factor controls sharpness
    const sharp = 0.06 + (1 - q) * 0.25;
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
        const u = i / 100, x = ox + u * (X(0.90) - ox);
        const y = oy - (oy - Y(0.15)) / (1 + Math.pow((u - 0.5) / sharp, 2));
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    // f0 marker + bandwidth
    const fx = ox + 0.5 * (X(0.90) - ox);
    ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(fx, oy); ctx.lineTo(fx, Y(0.15)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('f₀ resonance', fx, Y(0.12));
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif';
    ctx.fillText(`sharper peak = higher Q`, w / 2, h - 4);
    paintDiagramSel(ctx, w, h, LCR_SPOTS, v.sel ?? -1);
}
const LCR_SPOTS = [
    { label: 'Resonance peak', fn: 'XL = XC — impedance minimum, current maximum', x: 0.50, y: 0.16, r: 0.05 },
    { label: 'The curve', fn: 'current falls away on both sides of f₀', x: 0.34, y: 0.55, r: 0.05 },
    { label: 'f₀ marker', fn: 'the frequency where the circuit sings', x: 0.50, y: 0.55, r: 0.04 },
    { label: 'Left flank', fn: 'below f₀ — capacitive, current leads', x: 0.22, y: 0.78, r: 0.05 },
    { label: 'Right flank', fn: 'above f₀ — inductive, current lags', x: 0.78, y: 0.78, r: 0.05 },
];

/** dgm_transformer — primary/secondary coils on a laminated iron core. */
function paintTransformer(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // iron core — rectangular frame
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 8;
    ctx.strokeRect(X(0.28), Y(0.20), X(0.44), Y(0.55));
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(X(0.28), Y(0.20) + i * Y(0.11)); ctx.lineTo(X(0.28) + X(0.44), Y(0.20) + i * Y(0.11)); ctx.stroke(); }
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('laminated iron core', X(0.5), Y(0.16));
    // primary coil (left limb) — Np turns
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.ellipse(X(0.28), Y(0.28) + i * Y(0.09), 12, 5, 0, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('primary Nₚ', X(0.17), Y(0.40));
    ctx.fillText('AC in', X(0.17), Y(0.55));
    // secondary coil (right limb) — more turns
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
        ctx.beginPath(); ctx.ellipse(X(0.72), Y(0.26) + i * Y(0.075), 12, 5, 0, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = '#4ade80';
    ctx.fillText('secondary Nₛ', X(0.85), Y(0.40));
    ctx.fillText('AC out', X(0.85), Y(0.55));
    // flux arrows in core
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.36), Y(0.47)); ctx.lineTo(X(0.64), Y(0.47)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.62), Y(0.45)); ctx.lineTo(X(0.64), Y(0.47)); ctx.lineTo(X(0.62), Y(0.49)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = '7.5px sans-serif';
    ctx.fillText('shared flux Φ', X(0.5), Y(0.45));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('Vₛ/Vₚ = Nₛ/Nₚ — more turns, more volts', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, TRF_SPOTS, v.sel ?? -1);
}
const TRF_SPOTS = [
    { label: 'Primary coil', fn: 'AC in — the changing current drives the flux', x: 0.26, y: 0.40, r: 0.06 },
    { label: 'Secondary coil', fn: 'more turns → higher voltage out (step-up)', x: 0.74, y: 0.40, r: 0.06 },
    { label: 'Iron core', fn: 'guides the flux between coils — laminated against eddy loss', x: 0.5, y: 0.22, r: 0.055 },
    { label: 'Shared flux', fn: 'the same changing Φ links both coils', x: 0.5, y: 0.47, r: 0.05 },
    { label: 'Turns ratio', fn: 'Nₛ > Nₚ steps voltage up; fewer steps it down', x: 0.5, y: 0.80, r: 0.05 },
];

/** dgm_zener — reverse-bias I-V with the sharp breakdown knee + regulator use. */
function paintZener(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.5), oy = Y(0.5);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.10)); ctx.lineTo(ox, Y(0.90)); ctx.moveTo(X(0.08), oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('V →', X(0.94), Y(0.47)); ctx.fillText('I', ox + 8, Y(0.13));
    ctx.fillText('forward', X(0.80), Y(0.56)); ctx.fillText('reverse', X(0.22), Y(0.56));
    // forward curve — exponential rise right of origin
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
        const u = i / 40, x = ox + u * (X(0.90) - ox);
        const y = oy - (Math.exp(u * 3) - 1) / (Math.exp(3) - 1) * (oy - Y(0.16));
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    // reverse: flat then sharp breakdown at -Vz
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(ox, oy); ctx.lineTo(X(0.16), oy - 2);
    ctx.lineTo(X(0.15), Y(0.88)); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.15), oy); ctx.lineTo(X(0.15), Y(0.88)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('−Vz breakdown', X(0.15), Y(0.94));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('past −Vz the voltage clamps — that’s why zeners regulate', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, ZNR_SPOTS, v.sel ?? -1);
}
const ZNR_SPOTS = [
    { label: 'Breakdown knee', fn: 'the sharp turn — voltage clamps at −Vz', x: 0.15, y: 0.50, r: 0.055 },
    { label: 'Forward region', fn: 'ordinary diode behaviour to the right', x: 0.72, y: 0.30, r: 0.05 },
    { label: 'Reverse region', fn: 'flat until breakdown — tiny leakage current', x: 0.30, y: 0.48, r: 0.05 },
    { label: 'Clamped voltage', fn: 'current can surge but V stays at Vz — the regulator trick', x: 0.16, y: 0.78, r: 0.05 },
];

/** dgm_banked_road — the tilted turn: N splits into centripetal + weight support. */
function paintBanked(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // road surface tilted
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(X(0.15), Y(0.72)); ctx.lineTo(X(0.85), Y(0.55)); ctx.stroke();
    // car box
    ctx.save(); ctx.translate(X(0.5), Y(0.60)); ctx.rotate(-0.10);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(-22, -26, 44, 22);
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-12, -2, 6, 0, Math.PI * 2); ctx.arc(12, -2, 6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // forces: N perpendicular, components
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(X(0.5), Y(0.58)); ctx.lineTo(X(0.5), Y(0.28)); ctx.stroke(); // N up-ish
    ctx.strokeStyle = '#f87171';
    ctx.beginPath(); ctx.moveTo(X(0.5), Y(0.58)); ctx.lineTo(X(0.72), Y(0.58)); ctx.stroke(); // N sinθ → center
    ctx.strokeStyle = '#4ade80';
    ctx.beginPath(); ctx.moveTo(X(0.5), Y(0.58)); ctx.lineTo(X(0.5), Y(0.80)); ctx.stroke(); // mg down
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('N', X(0.47), Y(0.42));
    ctx.fillStyle = '#f87171'; ctx.fillText('N sinθ → centripetal', X(0.68), Y(0.54));
    ctx.fillStyle = '#4ade80'; ctx.fillText('mg', X(0.47), Y(0.78));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the tilt feeds the inward force — no friction needed at tan θ = v²/rg', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, BANK_SPOTS, v.sel ?? -1);
}
const BANK_SPOTS = [
    { label: 'Banked surface', fn: 'the tilted road — higher edge outside the turn', x: 0.5, y: 0.66, r: 0.06 },
    { label: 'Normal N', fn: 'pushes perpendicular to the tilted surface', x: 0.5, y: 0.34, r: 0.05 },
    { label: 'N sinθ', fn: 'the inward part — supplies the centripetal force', x: 0.62, y: 0.58, r: 0.05 },
    { label: 'Weight mg', fn: 'straight down — N cosθ balances it', x: 0.5, y: 0.78, r: 0.05 },
];

/** dgm_pipe_harmonics — open vs closed pipe standing waves, first two modes. */
function paintPipes(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const tube = (x0: number, x1: number, yc: number, closedRight: boolean, mode: number) => {
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(X(x0), Y(yc - 0.09)); ctx.lineTo(X(x1), Y(yc - 0.09)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x0), Y(yc + 0.09)); ctx.lineTo(X(x1), Y(yc + 0.09)); ctx.stroke();
        if (closedRight) { ctx.beginPath(); ctx.moveTo(X(x1), Y(yc - 0.09)); ctx.lineTo(X(x1), Y(yc + 0.09)); ctx.stroke(); }
        // standing wave inside: antinode at open end(s), node at closed
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
            const u = i / 60;
            const env = closedRight ? Math.sin(u * Math.PI / 2 * mode) : Math.sin(u * Math.PI * mode) * (mode === 1 ? 1 : 1);
            const amp = closedRight ? Math.sin(u * Math.PI / 2 * (2 * mode - 1)) : Math.sin(u * Math.PI * mode);
            const x = X(x0) + u * (X(x1) - X(x0));
            const y = Y(yc) + amp * h * 0.06;
            i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
    };
    tube(0.10, 0.45, 0.28, false, 1);
    tube(0.10, 0.45, 0.55, false, 2);
    tube(0.58, 0.93, 0.28, true, 1);
    tube(0.58, 0.93, 0.55, true, 1);
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('open pipe — both ends antinodes', X(0.275), Y(0.14));
    ctx.fillText('closed pipe — one end a node', X(0.755), Y(0.14));
    ctx.font = '8px sans-serif';
    ctx.fillText('fundamental λ = 2L', X(0.275), Y(0.42));
    ctx.fillText('2nd harmonic λ = L', X(0.275), Y(0.72));
    ctx.fillText('fundamental λ = 4L', X(0.755), Y(0.42));
    ctx.fillText('next mode λ = 4L/3 (odd only)', X(0.755), Y(0.72));
    ctx.fillText('a closed pipe sounds an octave lower — only odd harmonics live in it', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PIPE_SPOTS, v.sel ?? -1);
}
const PIPE_SPOTS = [
    { label: 'Open pipe', fn: 'antinodes at both ends — all harmonics allowed', x: 0.275, y: 0.28, r: 0.055 },
    { label: 'Closed pipe', fn: 'a node at the shut end — odd harmonics only', x: 0.755, y: 0.28, r: 0.055 },
    { label: 'Open fundamental', fn: 'λ = 2L — the longest wave that fits', x: 0.275, y: 0.42, r: 0.05 },
    { label: 'Closed fundamental', fn: 'λ = 4L — quarter-wave, an octave deeper', x: 0.755, y: 0.42, r: 0.05 },
    { label: 'Closed end', fn: 'the sealed end — air can’t move: a node', x: 0.93, y: 0.28, r: 0.04 },
];

/** dgm_sound_wave — compressions & rarefactions aligned with the pressure graph. */
function paintSoundWave(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // particle row — density = cos(x)
    for (let i = 0; i < 90; i++) {
        const u = i / 90;
        const density = Math.cos(u * Math.PI * 4);
        const x = X(0.08) + u * X(0.84);
        const gap = 4 + (1 - density) * 5;
        ctx.fillStyle = density > 0 ? '#38bdf8' : '#475569';
        ctx.beginPath(); ctx.arc(x + gap / 2, Y(0.30), 2.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('compression', X(0.19), Y(0.16)); ctx.fillText('rarefaction', X(0.44), Y(0.16));
    ctx.fillText('compression', X(0.69), Y(0.16)); ctx.fillText('rarefaction', X(0.94), Y(0.16));
    // pressure graph aligned below
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(X(0.08), Y(0.62)); ctx.lineTo(X(0.92), Y(0.62)); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5; ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
        const u = i / 100, x = X(0.08) + u * X(0.84);
        const y = Y(0.62) - Math.cos(u * Math.PI * 4) * h * 0.13;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif';
    ctx.fillText('pressure — peaks sit on compressions', X(0.5), Y(0.90));
    ctx.font = '9px sans-serif';
    ctx.fillText('sound is longitudinal — particles bunch and spread along the travel direction', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SND_SPOTS, v.sel ?? -1);
}
const SND_SPOTS = [
    { label: 'Compression', fn: 'particles bunched — pressure peaks', x: 0.19, y: 0.30, r: 0.055 },
    { label: 'Rarefaction', fn: 'particles spread — pressure dips', x: 0.44, y: 0.30, r: 0.055 },
    { label: 'Pressure graph', fn: 'the wave drawn as pressure vs position', x: 0.5, y: 0.62, r: 0.05 },
    { label: 'Wavelength', fn: 'compression to compression — one full λ', x: 0.44, y: 0.80, r: 0.05 },
];

/** dgm_dc_motor — coil in a field + split-ring commutator reversing the current. */
function paintDCMotor(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // field poles N/S
    ctx.fillStyle = '#f87171'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('N', X(0.16), Y(0.45)); ctx.fillText('S', X(0.84), Y(0.45));
    ctx.fillStyle = '#334155';
    ctx.fillRect(X(0.10), Y(0.24), w * 0.09, h * 0.42); ctx.fillRect(X(0.81), Y(0.24), w * 0.09, h * 0.42);
    // field lines
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    for (let i = 0; i < 4; i++) { const y = Y(0.28) + i * Y(0.11); ctx.beginPath(); ctx.moveTo(X(0.20), y); ctx.lineTo(X(0.80), y); ctx.stroke(); }
    ctx.setLineDash([]);
    // coil ABCD tilted
    ctx.save(); ctx.translate(X(0.5), Y(0.42)); ctx.rotate((v.spin ?? 20) / 100 * 0.5);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
    ctx.strokeRect(-w * 0.09, -h * 0.13, w * 0.18, h * 0.26);
    ctx.restore();
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('coil ABCD', X(0.5), Y(0.16));
    // split ring + battery
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.5), Y(0.72), 9, 0.3, Math.PI - 0.3); ctx.stroke();
    ctx.beginPath(); ctx.arc(X(0.5), Y(0.72), 9, Math.PI + 0.3, 2 * Math.PI - 0.3); ctx.stroke();
    ctx.fillStyle = '#4ade80'; ctx.font = '7.5px sans-serif';
    ctx.fillText('split ring', X(0.5), Y(0.82));
    ctx.fillStyle = '#e11d48'; ctx.font = '8.5px sans-serif';
    ctx.fillText('battery + brushes', X(0.5), Y(0.92));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('the split ring flips the current each half-turn — torque never reverses', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, MOT_SPOTS, v.sel ?? -1);
}
const MOT_SPOTS = [
    { label: 'Field magnets', fn: 'N to S — the steady field the coil sits in', x: 0.16, y: 0.45, r: 0.06 },
    { label: 'The coil', fn: 'current through it feels a torque — F = BIL on each arm', x: 0.5, y: 0.42, r: 0.06 },
    { label: 'Split ring', fn: 'reverses current every half turn — the commutator', x: 0.5, y: 0.72, r: 0.05 },
    { label: 'Field lines', fn: 'uniform field from N pole to S pole', x: 0.5, y: 0.33, r: 0.05 },
    { label: 'Battery', fn: 'DC source feeding through the brushes', x: 0.5, y: 0.90, r: 0.045 },
];

/** dgm_born_haber — NaCl energy ladder: sublimation, ionisation, dissociation, affinity, lattice. */
function paintBornHaber(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const lv = (x: number, y: number, label: string, col = '#94a3b8') => {
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(X(x - 0.09), Y(y)); ctx.lineTo(X(x + 0.09), Y(y)); ctx.stroke();
        ctx.fillStyle = col; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(label, X(x), Y(y) - 3);
    };
    lv(0.14, 0.62, 'Na(s) + ½Cl₂');
    lv(0.30, 0.52, 'Na(g)', '#fbbf24');
    lv(0.46, 0.30, 'Na⁺(g)', '#f87171');
    lv(0.62, 0.55, 'Cl(g)', '#fbbf24');
    lv(0.78, 0.68, 'Cl⁻(g)', '#fbbf24');
    lv(0.50, 0.86, 'NaCl(s)', '#4ade80');
    const arrow = (x1: number, y1: number, x2: number, y2: number, label: string, up: boolean) => {
        ctx.strokeStyle = up ? '#f87171' : '#4ade80'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(X(x1), Y(y1)); ctx.lineTo(X(x2), Y(y2)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x2) - 3, Y(y2) + (up ? 5 : -5)); ctx.lineTo(X(x2), Y(y2)); ctx.lineTo(X(x2) + 3, Y(y2) + (up ? 5 : -5)); ctx.stroke();
        ctx.fillStyle = up ? '#f87171' : '#4ade80'; ctx.font = '7px sans-serif';
        ctx.fillText(label, (X(x1) + X(x2)) / 2, (Y(y1) + Y(y2)) / 2 - 3);
    };
    arrow(0.19, 0.62, 0.26, 0.52, 'sublimation', true);
    arrow(0.35, 0.52, 0.41, 0.30, 'ionisation', true);
    arrow(0.51, 0.30, 0.57, 0.55, '½ dissociation', false);
    arrow(0.67, 0.55, 0.73, 0.68, 'electron affinity', false);
    arrow(0.78, 0.68, 0.55, 0.86, 'lattice energy', false);
    arrow(0.14, 0.62, 0.45, 0.86, 'ΔHf', false);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('Hess’s law: the climb up equals the drop down — ΔHf = all the steps', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, BH_SPOTS, v.sel ?? -1);
}
const BH_SPOTS = [
    { label: 'Na⁺(g) top', fn: 'the highest level — ionisation costs the most', x: 0.46, y: 0.30, r: 0.05 },
    { label: 'Sublimation', fn: 'solid sodium to gas — energy in', x: 0.30, y: 0.52, r: 0.045 },
    { label: 'Electron affinity', fn: 'Cl gains the electron — energy out', x: 0.78, y: 0.68, r: 0.045 },
    { label: 'Lattice drop', fn: 'ions snap together — the big release', x: 0.64, y: 0.78, r: 0.05 },
    { label: 'NaCl(s)', fn: 'the product — the cycle’s bottom', x: 0.50, y: 0.86, r: 0.05 },
];

/** dgm_sigma_pi — head-on s-s sigma bond vs side-on p-p pi bond. */
function paintSigmaPi(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // sigma: two s orbitals head-on
    ctx.fillStyle = 'rgba(56,189,248,0.5)'; ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.16), Y(0.30), w * 0.05, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(X(0.27), Y(0.30), w * 0.05, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#7dd3fc'; ctx.font = 'bold 8.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('σ — head-on overlap', X(0.215), Y(0.46));
    // pi: two p orbitals side-on
    ctx.fillStyle = 'rgba(74,222,128,0.4)'; ctx.strokeStyle = '#4ade80';
    [[0.62, 0.20], [0.62, 0.38], [0.80, 0.20], [0.80, 0.38]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.ellipse(X(x), Y(y), w * 0.025, h * 0.075, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });
    ctx.fillStyle = '#86efac';
    ctx.fillText('π — side-on overlap', X(0.71), Y(0.52));
    // labels: internuclear axis
    ctx.strokeStyle = '#64748b'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0.08), Y(0.30)); ctx.lineTo(X(0.38), Y(0.30)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.52), Y(0.29)); ctx.lineTo(X(0.92), Y(0.29)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b'; ctx.font = '7.5px sans-serif';
    ctx.fillText('internuclear axis', X(0.23), Y(0.28));
    ctx.fillText('above & below the axis', X(0.71), Y(0.12));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('σ is the strong first bond; π adds sideways overlap on top', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, SP_SPOTS, v.sel ?? -1);
}
const SP_SPOTS = [
    { label: 'Sigma bond', fn: 'head-on s-s overlap — the strongest bond', x: 0.215, y: 0.30, r: 0.06 },
    { label: 'Pi lobes', fn: 'side-on p-p overlap — above and below the axis', x: 0.71, y: 0.29, r: 0.06 },
    { label: 'Nucleus pair', fn: 'the two atoms the orbitals belong to', x: 0.215, y: 0.30, r: 0.03 },
    { label: 'Pi overlap zone', fn: 'electron cloud shared above/below — weaker than σ', x: 0.71, y: 0.38, r: 0.05 },
    { label: 'Axis', fn: 'the line joining the nuclei', x: 0.23, y: 0.30, r: 0.04 },
];

/** dgm_phase_diagram — P–T diagram with triple point, fusion/vaporisation/sublimation lines. */
function paintPhaseDiagram(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.80);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.10)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('T →', X(0.53), Y(0.90));
    ctx.save(); ctx.translate(X(0.05), Y(0.45)); ctx.rotate(-Math.PI / 2); ctx.fillText('P →', 0, 0); ctx.restore();
    const tp = [X(0.30), Y(0.62)];
    // fusion line (slightly tilted up-right)
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(tp[0], tp[1]); ctx.lineTo(X(0.40), Y(0.12)); ctx.stroke();
    // vaporisation curve to the right
    ctx.strokeStyle = '#4ade80'; ctx.beginPath();
    ctx.moveTo(tp[0], tp[1]); ctx.quadraticCurveTo(X(0.60), Y(0.62), X(0.88), Y(0.30)); ctx.stroke();
    // sublimation curve down-left
    ctx.strokeStyle = '#38bdf8'; ctx.beginPath();
    ctx.moveTo(tp[0], tp[1]); ctx.quadraticCurveTo(X(0.18), Y(0.72), X(0.13), Y(0.80)); ctx.stroke();
    // triple point
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(tp[0], tp[1], 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillText('triple point', tp[0], tp[1] + 16);
    // region labels
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#f87171'; ctx.fillText('SOLID', X(0.25), Y(0.32));
    ctx.fillStyle = '#38bdf8'; ctx.fillText('LIQUID', X(0.55), Y(0.38));
    ctx.fillStyle = '#4ade80'; ctx.fillText('GAS', X(0.62), Y(0.72));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('all three phases meet at one P–T — the triple point', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PD_SPOTS, v.sel ?? -1);
}
const PD_SPOTS = [
    { label: 'Triple point', fn: 'solid + liquid + gas coexist — one exact P and T', x: 0.30, y: 0.62, r: 0.05 },
    { label: 'Fusion line', fn: 'solid–liquid boundary — almost vertical', x: 0.37, y: 0.35, r: 0.045 },
    { label: 'Vaporisation line', fn: 'liquid–gas boundary — ends at the critical point', x: 0.70, y: 0.45, r: 0.05 },
    { label: 'Sublimation line', fn: 'solid–gas boundary — dry ice lives here', x: 0.18, y: 0.74, r: 0.045 },
    { label: 'Solid region', fn: 'high pressure, low temperature', x: 0.25, y: 0.30, r: 0.05 },
];

/** dgm_action_potential — the spike: resting −70, depolarise to +40, repolarise, undershoot. */
function paintActionPotential(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const oy = Y(0.62), ox = X(0.08);
    // resting level dashed
    ctx.strokeStyle = '#64748b'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.font = '8px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('−70 mV resting', ox, oy + 14);
    // threshold dashed
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(ox, Y(0.50)); ctx.lineTo(X(0.94), Y(0.50)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillText('−55 mV threshold', ox, Y(0.47));
    // the spike
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(X(0.30), oy);                       // resting
    ctx.quadraticCurveTo(X(0.34), Y(0.50), X(0.38), Y(0.42)); // depolarise start
    ctx.lineTo(X(0.42), Y(0.14));                  // up to +40
    ctx.quadraticCurveTo(X(0.46), Y(0.30), X(0.52), oy); // repolarise
    ctx.quadraticCurveTo(X(0.58), Y(0.70), X(0.66), oy); // hyperpolarise
    ctx.lineTo(X(0.94), oy);
    ctx.stroke();
    // labels
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('depolarisation (Na⁺ in)', X(0.37), Y(0.30));
    ctx.fillText('repolarisation (K⁺ out)', X(0.49), Y(0.36));
    ctx.fillText('refractory dip', X(0.60), Y(0.72));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('all-or-nothing — cross the threshold and the spike fires full', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, AP_SPOTS, v.sel ?? -1);
}
const AP_SPOTS = [
    { label: 'Resting −70 mV', fn: 'the baseline — K⁺ leak keeps it negative', x: 0.18, y: 0.62, r: 0.05 },
    { label: 'Threshold', fn: 'cross −55 mV and the spike is guaranteed', x: 0.30, y: 0.50, r: 0.045 },
    { label: 'Peak +40 mV', fn: 'Na⁺ rushes in — the inside flips positive', x: 0.42, y: 0.16, r: 0.05 },
    { label: 'Repolarisation', fn: 'K⁺ leaves — voltage dives back down', x: 0.50, y: 0.42, r: 0.05 },
    { label: 'Refractory dip', fn: 'brief overshoot below resting — can’t refire yet', x: 0.60, y: 0.68, r: 0.05 },
];

/** dgm_germination — seed → radicle → plumule → seedling, in four frames. */
function paintGermination(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'light');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const stages = [0.16, 0.38, 0.60, 0.82];
    // soil line
    ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(0.04), Y(0.70)); ctx.lineTo(X(0.96), Y(0.70)); ctx.stroke();
    stages.forEach((sx, i) => {
        const x = X(sx), y = Y(0.68);
        // seed body
        ctx.fillStyle = '#a16207';
        ctx.beginPath(); ctx.ellipse(x, y - 8, 10, 13, 0.3, 0, Math.PI * 2); ctx.fill();
        if (i >= 1) { // radicle down
            ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(x + 3, y + 2); ctx.quadraticCurveTo(x + 6, y + 10, x + 4, y + 16); ctx.stroke();
        }
        if (i >= 2) { // plumule up
            ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(x - 2, y - 16); ctx.quadraticCurveTo(x - 5, y - 26, x - 4, y - 34); ctx.stroke();
        }
        if (i >= 3) { // leaves
            ctx.fillStyle = '#16a34a';
            ctx.beginPath(); ctx.ellipse(x - 9, y - 36, 8, 4, -0.5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 3, y - 38, 8, 4, 0.5, 0, Math.PI * 2); ctx.fill();
        }
    });
    ctx.fillStyle = '#475569'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ['dry seed', 'radicle out', 'plumule up', 'seedling'].forEach((s, i) => ctx.fillText(s, X(stages[i]), Y(0.94)));
    ctx.fillStyle = '#64748b'; ctx.font = '9px sans-serif';
    ctx.fillText('root first, shoot second — the seed unpacks itself', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, GERM_SPOTS, v.sel ?? -1);
}
const GERM_SPOTS = [
    { label: 'Dry seed', fn: 'dormant — waiting for water', x: 0.16, y: 0.62, r: 0.05 },
    { label: 'Radicle', fn: 'the first root — always out first', x: 0.38, y: 0.72, r: 0.05 },
    { label: 'Plumule', fn: 'the shoot pushing upward', x: 0.60, y: 0.50, r: 0.05 },
    { label: 'Seedling', fn: 'leaves open — photosynthesis takes over', x: 0.82, y: 0.45, r: 0.05 },
    { label: 'Soil line', fn: 'below ground the radicle anchors', x: 0.5, y: 0.70, r: 0.04 },
];

/** dgm_virus — bacteriophage: protein head, DNA inside, sheath, tail fibres. */
function paintVirus(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const cx = X(0.40), hy = Y(0.28);
    // head (icosahedral)
    ctx.fillStyle = 'rgba(56,189,248,0.3)'; ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 - 0.3; const x = cx + Math.cos(a) * w * 0.055, y = hy + Math.sin(a) * w * 0.055; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // DNA coil inside
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < 40; i++) { const a = i * 0.6, r = w * 0.035 * (1 - i / 60); const x = cx + Math.cos(a) * r, y = hy + Math.sin(a) * r; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    // sheath column
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 3;
    ctx.strokeRect(cx - w * 0.018, hy + w * 0.055, w * 0.036, h * 0.30);
    for (let i = 1; i < 5; i++) { ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - w * 0.018, hy + w * 0.055 + i * h * 0.06); ctx.lineTo(cx + w * 0.018, hy + w * 0.055 + i * h * 0.06); ctx.stroke(); }
    // base plate + tail fibres
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx - w * 0.04, hy + w * 0.055 + h * 0.32); ctx.lineTo(cx + w * 0.04, hy + w * 0.055 + h * 0.32); ctx.stroke();
    for (let i = 0; i < 6; i++) {
        const a = Math.PI * (0.15 + i * 0.14);
        ctx.beginPath(); ctx.moveTo(cx, hy + w * 0.055 + h * 0.32);
        ctx.lineTo(cx + Math.cos(a) * w * 0.09, hy + w * 0.055 + h * 0.32 + Math.sin(a) * h * 0.22); ctx.stroke();
    }
    // labels
    ctx.fillStyle = '#7dd3fc'; ctx.font = 'bold 8.5px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('protein head', X(0.55), Y(0.24));
    ctx.fillStyle = '#fbbf24'; ctx.fillText('DNA coiled inside', X(0.55), Y(0.34));
    ctx.fillStyle = '#86efac'; ctx.fillText('contractile sheath', X(0.55), Y(0.52));
    ctx.fillText('tail fibres — grip the host', X(0.55), Y(0.72));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('a virus is a genome in a protein shell — it injects, never enters whole', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, VIR_SPOTS, v.sel ?? -1);
}
const VIR_SPOTS = [
    { label: 'Head', fn: 'the protein shell holding the genome', x: 0.40, y: 0.28, r: 0.06 },
    { label: 'DNA inside', fn: 'the coiled genome — all the virus really is', x: 0.40, y: 0.28, r: 0.035 },
    { label: 'Sheath', fn: 'contracts to punch the DNA through the host wall', x: 0.40, y: 0.50, r: 0.05 },
    { label: 'Tail fibres', fn: 'land on the bacterium and lock on', x: 0.40, y: 0.80, r: 0.05 },
    { label: 'Base plate', fn: 'the anchor between sheath and fibres', x: 0.40, y: 0.66, r: 0.04 },
];

/** dgm_isomers — butane vs isobutane: same formula C4H10, different skeleton. */
function paintIsomers(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'light');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const bond = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(X(x1), Y(y1)); ctx.lineTo(X(x2), Y(y2)); ctx.stroke();
    };
    const c = (x: number, y: number) => {
        ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(X(x), Y(y), 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('C', X(x), Y(y) + 3);
    };
    // n-butane chain
    bond(0.10, 0.38, 0.18, 0.38); bond(0.18, 0.38, 0.26, 0.38); bond(0.26, 0.38, 0.34, 0.38);
    c(0.10, 0.38); c(0.18, 0.38); c(0.26, 0.38); c(0.34, 0.38);
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 9px sans-serif';
    ctx.fillText('n-butane — straight chain', X(0.22), Y(0.52));
    // isobutane branched
    bond(0.56, 0.38, 0.64, 0.38); bond(0.64, 0.38, 0.72, 0.38); bond(0.64, 0.38, 0.64, 0.28);
    c(0.56, 0.38); c(0.64, 0.38); c(0.72, 0.38); c(0.64, 0.28);
    ctx.fillStyle = '#0f172a';
    ctx.fillText('isobutane — branched', X(0.64), Y(0.52));
    ctx.fillStyle = '#64748b'; ctx.font = 'bold 10px sans-serif';
    ctx.fillText('both: C₄H₁₀', X(0.43), Y(0.70));
    ctx.font = '9px sans-serif';
    ctx.fillText('same formula, different skeleton — different properties', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, ISO2_SPOTS, v.sel ?? -1);
}
const ISO2_SPOTS = [
    { label: 'n-butane', fn: 'four carbons in a row — boils at −0.5 °C', x: 0.22, y: 0.38, r: 0.06 },
    { label: 'isobutane', fn: 'a branch on the middle carbon — boils at −11.7 °C', x: 0.64, y: 0.38, r: 0.06 },
    { label: 'The branch', fn: 'the extra C hanging off — what makes it an isomer', x: 0.64, y: 0.28, r: 0.05 },
    { label: 'C₄H₁₀', fn: 'identical formula — the isomer definition', x: 0.43, y: 0.70, r: 0.05 },
];

/** dgm_moment_inertia — same mass, different distribution: rod vs ring vs disc. */
function paintMomentInertia(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // rod through centre
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.18), Y(0.14)); ctx.lineTo(X(0.18), Y(0.50)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#4ade80'; ctx.fillRect(X(0.10), Y(0.30), w * 0.16, 5);
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('rod  I = ML²/12', X(0.18), Y(0.58));
    // ring
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(X(0.52), Y(0.32), w * 0.07, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.52), Y(0.14)); ctx.lineTo(X(0.52), Y(0.50)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('ring  I = MR²', X(0.52), Y(0.58));
    // disc
    ctx.fillStyle = 'rgba(96,165,250,0.4)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.84), Y(0.32), w * 0.07, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(X(0.84), Y(0.14)); ctx.lineTo(X(0.84), Y(0.50)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 7.5px sans-serif';
    ctx.fillText('disc  I = MR²/2', X(0.84), Y(0.58));
    // bar comparison
    const bars: [number, string, number][] = [[0.18, '#4ade80', 0.08], [0.52, '#fbbf24', 0.20], [0.84, '#60a5fa', 0.10]];
    ctx.fillStyle = '#64748b'; ctx.fillRect(X(0.08), Y(0.82), X(0.84), 2);
    bars.forEach(([x, col, bh]) => {
        ctx.fillStyle = col as string; ctx.fillRect(X((x as number) - 0.045), Y(0.82) - bh * h, w * 0.09, bh * h);
        ctx.fillStyle = '#94a3b8'; ctx.font = '6.5px sans-serif';
        ctx.fillText('I', X(x as number), Y(0.86));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('mass far from the axis resists turning most — the ring spins hardest to start', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, MI_SPOTS, v.sel ?? -1);
}
const MI_SPOTS = [
    { label: 'Rod', fn: 'mass spread along — I = ML²/12', x: 0.18, y: 0.32, r: 0.055 },
    { label: 'Ring', fn: 'all mass at the rim — the biggest I for the radius', x: 0.52, y: 0.32, r: 0.06 },
    { label: 'Disc', fn: 'mass spread evenly — half the ring’s inertia', x: 0.84, y: 0.32, r: 0.055 },
    { label: 'Ring wins', fn: 'same mass, same radius — but farthest from the axis', x: 0.52, y: 0.74, r: 0.05 },
    { label: 'Rotation axis', fn: 'the dashed line each shape spins around', x: 0.52, y: 0.14, r: 0.045 },
];

/** dgm_maxwell — the Maxwell-Boltzmann speed distribution at two temperatures. */
function paintMaxwell(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.82);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.12)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Speed →', X(0.53), Y(0.92));
    ctx.save(); ctx.translate(X(0.05), Y(0.47)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Fraction of molecules →', 0, 0); ctx.restore();
    // two skewed curves — cool narrow+tall, hot wide+flat
    const mb = (u: number, a: number) => u * u * Math.exp(-a * u * u);
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 100; i++) { const u = i / 100, y = mb(u, 28) / mb(Math.sqrt(1 / 56), 28); const x = ox + u * (X(0.90) - ox), yy = oy - y * (oy - Y(0.16)); i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
    ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('cool gas — narrow & tall', X(0.32), Y(0.18));
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 100; i++) { const u = i / 100, y = mb(u, 8) / mb(Math.sqrt(1 / 16), 8); const x = ox + u * (X(0.90) - ox), yy = oy - y * 0.55 * (oy - Y(0.16)); i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
    ctx.stroke();
    ctx.fillStyle = '#f87171';
    ctx.fillText('hot gas — wide & flat', X(0.62), Y(0.30));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('heating spreads the speeds — the peak drops and slides right', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, MB_SPOTS, v.sel ?? -1);
}
const MB_SPOTS = [
    { label: 'Cool curve', fn: 'narrow and tall — molecules cluster near one speed', x: 0.32, y: 0.24, r: 0.055 },
    { label: 'Hot curve', fn: 'wide and flat — heating spreads the speeds out', x: 0.58, y: 0.34, r: 0.055 },
    { label: 'Most probable speed', fn: 'the peak — the speed most molecules carry', x: 0.27, y: 0.18, r: 0.05 },
    { label: 'High-speed tail', fn: 'the few fast ones — they evaporate and react first', x: 0.80, y: 0.60, r: 0.05 },
    { label: 'Speed axis', fn: 'molecular speed along the bottom', x: 0.50, y: 0.82, r: 0.05 },
];

/** dgm_hydrogen_isotopes — protium, deuterium, tritium: same proton, extra neutrons. */
function paintHydrogenIsotopes(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const isotopes: [string, number, number, number][] = [
        ['Protium ¹H', 0.18, 0.42, 0],
        ['Deuterium ²H', 0.50, 0.42, 1],
        ['Tritium ³H', 0.82, 0.42, 2],
    ];
    isotopes.forEach(([name, cx, cy, nn]) => {
        // nucleus: proton(s) + neutrons
        ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(X(cx as number), Y(cy as number), w * 0.022, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#94a3b8';
        for (let i = 0; i < (nn as number); i++) {
            ctx.beginPath(); ctx.arc(X(cx as number) + (i - (nn as number - 1) / 2) * w * 0.026 + w * 0.014, Y(cy as number) - w * 0.012, w * 0.020, 0, Math.PI * 2); ctx.fill();
        }
        // electron orbit + electron
        ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.arc(X(cx as number), Y(cy as number), w * 0.075, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.arc(X(cx as number) + w * 0.075, Y(cy as number), w * 0.012, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 8.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(name as string, X(cx as number), Y((cy as number) + 0.14));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif';
    ctx.fillText('red = proton · grey = neutron · blue = electron', X(0.50), Y(0.62));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('same proton, same chemistry — only the neutrons differ', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, ISO_SPOTS, v.sel ?? -1);
}
const ISO_SPOTS = [
    { label: 'Protium', fn: 'one proton, no neutrons — ordinary hydrogen', x: 0.18, y: 0.42, r: 0.06 },
    { label: 'Deuterium', fn: 'one proton + one neutron — heavy water’s hydrogen', x: 0.50, y: 0.42, r: 0.06 },
    { label: 'Tritium', fn: 'one proton + two neutrons — radioactive', x: 0.82, y: 0.42, r: 0.06 },
    { label: 'The electron', fn: 'one electron each — identical chemistry', x: 0.255, y: 0.42, r: 0.04 },
    { label: 'The extra neutrons', fn: 'the grey balls — mass changes, chemistry doesn’t', x: 0.52, y: 0.38, r: 0.04 },
];

/** dgm_puberty — the adolescent growth spurt: height rate boys vs girls. */
function paintPuberty(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.12), oy = Y(0.82);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.12)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.94), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Age (years) →', X(0.53), Y(0.92));
    ctx.save(); ctx.translate(X(0.05), Y(0.47)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Height gain (cm/yr) →', 0, 0); ctx.restore();
    const ages = ['8', '10', '12', '14', '16', '18'];
    ages.forEach((a, i) => ctx.fillText(a, ox + (i + 0.5) * (X(0.90) - ox) / 6, Y(0.87)));
    // girls curve — peaks ~12
    ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 3; ctx.beginPath();
    const g = [0.55, 0.72, 0.95, 0.65, 0.42, 0.36];
    g.forEach((v2, i) => { const x = ox + (i + 0.5) * (X(0.90) - ox) / 6, y = oy - v2 * (oy - Y(0.14)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
    ctx.fillStyle = '#f472b6'; ctx.font = 'bold 8px sans-serif';
    ctx.fillText('girls — spurt ~11-12', X(0.42), Y(0.22));
    // boys curve — peaks ~14
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 3; ctx.beginPath();
    const b = [0.52, 0.58, 0.68, 0.98, 0.72, 0.45];
    b.forEach((v2, i) => { const x = ox + (i + 0.5) * (X(0.90) - ox) / 6, y = oy - v2 * (oy - Y(0.14)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('boys — spurt ~13-14', X(0.66), Y(0.32));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('girls spurt about two years before boys — same race, different start time', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, PUB_SPOTS, v.sel ?? -1);
}
const PUB_SPOTS = [
    { label: 'Girls’ curve', fn: 'the pink line — growth spurt peaks around age 11–12', x: 0.38, y: 0.30, r: 0.055 },
    { label: 'Boys’ curve', fn: 'the blue line — the spurt comes ~2 years later, around 13–14', x: 0.66, y: 0.36, r: 0.055 },
    { label: 'Girls’ peak', fn: 'the tallest point of the pink curve', x: 0.44, y: 0.16, r: 0.045 },
    { label: 'Boys’ peak', fn: 'the tallest point of the blue curve', x: 0.66, y: 0.16, r: 0.045 },
    { label: 'Age axis', fn: '8 to 18 — the adolescent window', x: 0.50, y: 0.82, r: 0.05 },
    { label: 'Height-gain axis', fn: 'centimetres grown per year', x: 0.12, y: 0.45, r: 0.045 },
];

/** dgm_stem_cell — a stem cell branching into specialised types. */
function paintStemCell(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    // stem cell centre
    ctx.fillStyle = 'rgba(251,191,36,0.3)'; ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X(0.16), Y(0.46), w * 0.055, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fde68a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('STEM', X(0.16), Y(0.44)); ctx.fillText('CELL', X(0.16), Y(0.49));
    // four branches to specialised cells
    const fates: [string, string, number][] = [
        ['Blood cell', '#f87171', 0.18], ['Nerve cell', '#60a5fa', 0.38], ['Muscle cell', '#4ade80', 0.58], ['Bone cell', '#c084fc', 0.78],
    ];
    fates.forEach(([name, col, y]) => {
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(X(0.23), Y(0.46)); ctx.quadraticCurveTo(X(0.45), Y(y as number), X(0.62), Y(y as number)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = `${col}44`; ctx.strokeStyle = col as string; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(X(0.72), Y(y as number), w * 0.075, h * 0.055, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 7.5px sans-serif';
        ctx.fillText(name as string, X(0.72), Y((y as number) + 0.01));
    });
    // self-renewal loop
    ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(X(0.16), Y(0.46), w * 0.085, -0.6, 1.4); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = '6.5px sans-serif';
    ctx.fillText('also copies itself', X(0.16), Y(0.70));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('one unspecialised cell can become any tissue — and copy itself forever', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, STEM_SPOTS, v.sel ?? -1);
}
const STEM_SPOTS = [
    { label: 'Stem cell', fn: 'the unspecialised parent — can become anything', x: 0.16, y: 0.46, r: 0.06 },
    { label: 'Blood cell', fn: 'one fate — marrow makes these daily', x: 0.72, y: 0.18, r: 0.05 },
    { label: 'Nerve cell', fn: 'another fate — the signal carrier', x: 0.72, y: 0.38, r: 0.05 },
    { label: 'Muscle cell', fn: 'a third fate — the contractile fibre', x: 0.72, y: 0.58, r: 0.05 },
    { label: 'Bone cell', fn: 'a fourth — the mineral scaffold', x: 0.72, y: 0.78, r: 0.05 },
    { label: 'Self-renewal', fn: 'the loop — a stem cell can just copy itself', x: 0.16, y: 0.62, r: 0.045 },
];

function paintContraception(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const cards = [
        ['Natural', 'periodic|abstinence ·|lactational', '#a3e635'],
        ['Barrier', 'condoms ·|diaphragms ·|cervical caps', '#38bdf8'],
        ['IUDs', 'Copper-T|LNG-20|Lippes Loop', '#fbbf24'],
        ['Oral pills', 'hormone|tablets —|the pill', '#f472b6'],
        ['Surgical', 'vasectomy|tubectomy|permanent', '#f87171'],
    ];
    cards.forEach(([title, lines, col], i) => {
        const x = 0.11 + i * 0.19;
        ctx.fillStyle = 'rgba(51,65,85,0.92)'; ctx.strokeStyle = col as string; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.roundRect(X(x - 0.085), Y(0.30), w * 0.165, h * 0.40, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col as string; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(title as string, X(x), Y(0.38));
        ctx.fillStyle = '#cbd5e1'; ctx.font = '6.5px sans-serif';
        (lines as string).split('|').forEach((ln, j) => ctx.fillText(ln, X(x), Y(0.48 + j * 0.07)));
        ctx.fillStyle = col as string; ctx.font = 'bold 14px sans-serif';
        ctx.fillText(String(i + 1), X(x), Y(0.66));
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('five families — from behaviour to surgery, all block the same meeting', w / 2, Y(0.20));
    ctx.fillText('every method stops sperm meeting ovum — pick the card that matches', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, CONTRA_SPOTS, v.sel ?? -1);
}
const CONTRA_SPOTS = [
    { label: 'Natural methods', fn: 'avoid the fertile window — no devices', x: 0.11, y: 0.50, r: 0.05 },
    { label: 'Barrier methods', fn: 'physical wall — condoms also block STDs', x: 0.30, y: 0.50, r: 0.05 },
    { label: 'IUDs', fn: 'Copper-T, LNG-20, Lippes Loop — placed by a doctor', x: 0.49, y: 0.50, r: 0.05 },
    { label: 'Oral contraceptives', fn: 'the pill — hormones stop ovulation', x: 0.68, y: 0.50, r: 0.05 },
    { label: 'Surgical methods', fn: 'vasectomy and tubectomy — permanent', x: 0.87, y: 0.50, r: 0.05 },
];

/** dgm_conformation — Newman projections: staggered vs eclipsed ethane. */
function paintConformation(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const proj = (cx: number, cy: number, eclipsed: boolean, col: string) => {
        const R = w * 0.115;
        // back carbon = circle
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(30,41,59,0.9)';
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        // back H's (from circle edge, offset by 60° if staggered)
        for (let i = 0; i < 3; i++) {
            const a = (eclipsed ? 0 : Math.PI / 3) + i * 2 * Math.PI / 3 - Math.PI / 2;
            const x2 = cx + Math.cos(a) * R * 1.55, y2 = cy + Math.sin(a) * R * 1.55;
            const x1 = cx + Math.cos(a) * R, y1 = cy + Math.sin(a) * R;
            ctx.strokeStyle = col; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
            ctx.fillStyle = '#cbd5e1'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('H', x2 + Math.cos(a) * 8, y2 + Math.sin(a) * 8 + 3);
        }
        // front carbon = centre point + front H's to circle edge
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
        for (let i = 0; i < 3; i++) {
            const a = i * 2 * Math.PI / 3 - Math.PI / 2;
            const x2 = cx + Math.cos(a) * R * (eclipsed ? 0.82 : 0.55), y2 = cy + Math.sin(a) * R * (eclipsed ? 0.82 : 0.55);
            ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2); ctx.stroke();
            ctx.fillStyle = '#fde68a'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('H', x2 + Math.cos(a) * 9, y2 + Math.sin(a) * 9 + 3);
        }
    };
    proj(X(0.26), Y(0.46), false, '#4ade80');
    proj(X(0.74), Y(0.46), true, '#f87171');
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Staggered — stable', X(0.26), Y(0.78));
    ctx.fillStyle = '#f87171';
    ctx.fillText('Eclipsed — unstable', X(0.74), Y(0.78));
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px sans-serif';
    ctx.fillText('60° dihedral — lowest energy', X(0.26), Y(0.85));
    ctx.fillText('0° dihedral — highest energy', X(0.74), Y(0.85));
    // rotation arrow between
    ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(0.44), Y(0.46)); ctx.lineTo(X(0.56), Y(0.46)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0.56), Y(0.46)); ctx.lineTo(X(0.53), Y(0.43)); ctx.moveTo(X(0.56), Y(0.46)); ctx.lineTo(X(0.53), Y(0.49)); ctx.stroke();
    ctx.fillStyle = '#7dd3fc'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('rotate the C–C bond', X(0.50), Y(0.40));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
    ctx.fillText('Newman projection — looking straight down the carbon-carbon bond', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, CONFORM_SPOTS, v.sel ?? -1);
}
const CONFORM_SPOTS = [
    { label: 'Staggered conformation', fn: 'front and back Hs offset 60° — lowest energy', x: 0.26, y: 0.46, r: 0.06 },
    { label: 'Eclipsed conformation', fn: 'Hs aligned — torsional strain, highest energy', x: 0.74, y: 0.46, r: 0.06 },
    { label: 'Back carbon', fn: 'the circle — the carbon you see second', x: 0.26, y: 0.60, r: 0.04 },
    { label: 'Front carbon', fn: 'the centre point — nearest the eye', x: 0.26, y: 0.46, r: 0.035 },
    { label: 'Dihedral angle 60°', fn: 'the twist that makes staggered stable', x: 0.44, y: 0.46, r: 0.045 },
];

/** dgm_growth_curve — the sigmoid growth curve: lag, log, stationary. */
function paintGrowthCurve(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) {
    ctx.clearRect(0, 0, w, h); sceneBg(ctx, w, h, 'dark');
    const X = (f: number) => w * f, Y = (f: number) => h * f;
    const ox = X(0.13), oy = Y(0.85);
    // axes
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, Y(0.10)); ctx.lineTo(ox, oy); ctx.lineTo(X(0.95), oy); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Time →', X(0.54), Y(0.94));
    ctx.save(); ctx.translate(X(0.06), Y(0.48)); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Growth →', 0, 0); ctx.restore();
    // sigmoid curve
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
        const u = i / 100, sig = 1 / (1 + Math.exp(-(u - 0.45) * 12));
        const x = ox + u * (X(0.92) - ox), y = oy - sig * (oy - Y(0.16));
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // phase bands + labels
    const phases = [
        [0.13, 0.32, 'Lag phase', 'slow start — cells gear up', '#fbbf24'],
        [0.38, 0.62, 'Log phase', 'exponential sprint', '#4ade80'],
        [0.70, 0.92, 'Stationary', 'plateau — resources run out', '#f87171'],
    ] as const;
    phases.forEach(([x1, x2, label, fn, col]) => {
        ctx.strokeStyle = col as string; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(X(x1 as number), Y(0.14)); ctx.lineTo(X(x1 as number), oy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(X(x2 as number), Y(0.14)); ctx.lineTo(X(x2 as number), oy); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col as string; ctx.font = 'bold 8px sans-serif';
        ctx.fillText(label as string, X(((x1 as number) + (x2 as number)) / 2), Y(0.12));
    });
    // geometric (J) dashed comparator
    ctx.strokeStyle = '#818cf8'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.8; ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
        const u = i / 100, j = Math.min(1, Math.exp(u * 5.4) / Math.exp(5.4));
        const x = ox + u * (X(0.92) - ox), y = oy - j * (oy - Y(0.16));
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#a5b4fc'; ctx.font = 'bold 7.5px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('geometric growth — the unchecked J-curve', X(0.60), Y(0.30));
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('the grand period of growth — every organ and organism traces this S', w / 2, h - 4);
    paintDiagramSel(ctx, w, h, GROWTHC_SPOTS, v.sel ?? -1);
}
const GROWTHC_SPOTS = [
    { label: 'Lag phase', fn: 'slow start — the plant gathers momentum', x: 0.22, y: 0.75, r: 0.05 },
    { label: 'Log phase', fn: 'the exponential sprint — growth feeds growth', x: 0.50, y: 0.55, r: 0.055 },
    { label: 'Stationary phase', fn: 'the plateau — size settles at maturity', x: 0.80, y: 0.24, r: 0.055 },
    { label: 'Geometric growth', fn: 'the J-curve — arithmetic vs geometric, NCERT\'s pair', x: 0.72, y: 0.42, r: 0.05 },
    { label: 'Growth axis', fn: 'size over time — the S never lies', x: 0.13, y: 0.40, r: 0.04 },
];

// ─── image-backed diagram labs (Wikimedia/CC figures + hotspot layer) ──
// diagrams.ts is generated by tools/diagram_lab/publish.py from validated .md
import { DIAGRAMS } from './diagrams';

const _imgCache: Record<string, HTMLImageElement> = {};
function getDiagramImg(src: string): HTMLImageElement | null {
    if (typeof window === 'undefined') return null;
    let im = _imgCache[src];
    if (!im) { im = new Image(); im.src = src; _imgCache[src] = im; }
    return im.complete && im.naturalWidth ? im : null;
}
/** imgdgm — draws the CC figure scaled to fit + pulsing hotspot rings, hover
 *  previews, visit-tracking, selection ripple and a styled callout.
 *  spec.image = /diagrams/<slug>.png, spec.hotspots from md.
 *  vals carries sel + seen_<i> marks + _selT (selection timestamp, ms). */
function paintImgDgm(ctx: CanvasRenderingContext2D, w: number, h: number,
    v: Record<string, number>, t: number, spec: LabSpec) {
    const im = spec.image ? getDiagramImg(spec.image) : null;
    if (!im) { sceneBg(ctx, w, h, 'dark'); ctx.fillStyle = '#64748b';
        ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('loading diagram…', w / 2, h / 2); return; }
    // soft slate stage + framed figure (no stark white page)
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#1e293b'); bg.addColorStop(1, '#0f172a');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    const s = Math.min((w - 16) / im.width, (h - 16) / im.height);
    const dw = im.width * s, dh = im.height * s;
    const ix = (w - dw) / 2, iy = (h - dh) / 2;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(ix, iy, dw, dh, 6); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.roundRect(ix, iy, dw, dh, 6); ctx.clip();
    ctx.drawImage(im, ix, iy, dw, dh);
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(ix, iy, dw, dh, 6); ctx.stroke();

    const spots = spec.hotspots ? spec.hotspots(v) : [];
    const seen = (i: number) => (v[`seen_${i}`] ?? 0) >= 0.5;
    const nSeen = spots.reduce((n, _, i) => n + (seen(i) ? 1 : 0), 0);
    const hover = v._hover ?? -1;
    const selAge = typeof v._selT === 'number' ? Math.min(1, (t - v._selT) / 450) : 1;

    // per-spot pulsing rings — phase-offset so the set shimmers organically
    for (let i = 0; i < spots.length; i++) {
        const p = spots[i];
        const px = p.x * w, py = p.y * h, pr = p.r * w;
        const pulse = 0.30 + Math.sin(t / 480 + i * 0.9) * 0.14;
        const isHov = i === hover, isSel = i === v.sel, isSeen = seen(i);
        if (isSeen) {
            ctx.strokeStyle = 'rgba(52,211,153,0.85)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(px, py, pr + 2, 0, Math.PI * 2); ctx.stroke();
            // checkmark badge
            ctx.fillStyle = '#34d399';
            ctx.beginPath(); ctx.arc(px + pr * 0.75, py - pr * 0.75, 5, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#064e3b'; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(px + pr * 0.75 - 2.2, py - pr * 0.75);
            ctx.lineTo(px + pr * 0.75 - 0.5, py - pr * 0.75 + 2);
            ctx.lineTo(px + pr * 0.75 + 2.4, py - pr * 0.75 - 2); ctx.stroke();
        } else {
            ctx.strokeStyle = isHov ? `rgba(251,191,36,${0.65 + pulse * 0.3})`
                : `rgba(96,165,250,${pulse})`;
            ctx.lineWidth = isHov ? 2.2 : 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath(); ctx.arc(px, py, isHov ? pr + 3 : pr, 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
        }
        if (!isSel) {
            ctx.fillStyle = isSeen ? 'rgba(52,211,153,0.9)' : 'rgba(96,165,250,0.75)';
            ctx.beginPath(); ctx.arc(px, py, isHov ? 3 : 2.2, 0, Math.PI * 2); ctx.fill();
        }
    }

    // selection ripple + callout
    if (typeof v.sel === 'number' && v.sel >= 0 && v.sel < spots.length) {
        const p = spots[v.sel];
        const px = p.x * w, py = p.y * h, pr = p.r * w;
        if (selAge < 1) {                       // expanding ripple on tap
            ctx.strokeStyle = `rgba(251,191,36,${1 - selAge})`; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(px, py, pr + 6 + selAge * 26, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2.5; ctx.setLineDash([7, 5]);
        ctx.beginPath(); ctx.arc(px, py, pr + 8, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        // callout card — slides in from the ring
        const pop = 1 - Math.pow(1 - Math.min(1, selAge * 1.6), 3);
        const cardW = 186, cardH = 52;
        const lx = Math.min(w - cardW - 8, px + pr + 12), ly = Math.max(30, py - 18);
        ctx.save(); ctx.globalAlpha = pop;
        ctx.translate(lx + cardW / 2, ly + cardH / 2); ctx.scale(0.85 + pop * 0.15, 0.85 + pop * 0.15);
        ctx.translate(-lx - cardW / 2, -ly - cardH / 2);
        const g = ctx.createLinearGradient(lx, ly, lx, ly + cardH);
        g.addColorStop(0, 'rgba(30,41,59,0.97)'); g.addColorStop(1, 'rgba(15,23,42,0.97)');
        ctx.fillStyle = g; ctx.strokeStyle = 'rgba(251,191,36,0.5)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(lx, ly, cardW, cardH, 9); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(`${v.sel + 1}/${spots.length}  ${p.label}`, lx + 9, ly + 15);
        ctx.fillStyle = '#cbd5e1'; ctx.font = '8.5px sans-serif';
        const fn = p.fn || '';
        ctx.fillText(fn.slice(0, 46), lx + 9, ly + 28);
        if (fn.length > 46) ctx.fillText(fn.slice(46, 92), lx + 9, ly + 40);
        ctx.restore();
    }

    // hover tooltip — part name only (peek before you tap)
    if (hover >= 0 && hover < spots.length && hover !== v.sel && !seen(hover)) {
        const p = spots[hover];
        const px = p.x * w, py = p.y * h;
        ctx.font = 'bold 9.5px sans-serif';
        const tw = ctx.measureText(p.label).width + 14;
        const tx = Math.min(w - tw - 6, px + p.r * w + 10), ty = py - 6;
        ctx.fillStyle = 'rgba(251,191,36,0.92)'; ctx.beginPath(); ctx.roundRect(tx, ty, tw, 15, 7); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.textAlign = 'left'; ctx.fillText(p.label, tx + 7, ty + 10.5);
    }

    // progress chip — "explored x/N"
    ctx.fillStyle = 'rgba(15,23,42,0.8)'; ctx.beginPath(); ctx.roundRect(8, 8, 92, 20, 10); ctx.fill();
    ctx.fillStyle = nSeen === spots.length && spots.length ? '#34d399' : '#93c5fd';
    ctx.font = 'bold 9.5px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`🔍 ${nSeen}/${spots.length} explored`, 15, 21.5);

    if (spec.credit) {
        ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = '7px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(spec.credit, w - 6, h - 5);
    }
}

type ScenePainter = (ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number, labels?: string[]) => void;
const SCENES: Record<string, ScenePainter> = {
    heart: paintHeart, circuit: paintCircuit, cell: paintCell, nephron: paintNephron,
    atom: paintAtom, prism: paintPrism, projectile: paintProjectile, pendulum: paintPendulum,
    mitosis: paintMitosis,
    efield: paintEfield, lens: paintLens, wave: paintWave, graph: paintGraph, gas: paintGas,
    titrate: paintTitrate, emag: paintEmag, vector: paintVector, equilibrium: paintEquil,
    timeline: paintTimeline, flow: paintFlow,
    dna: paintDNA, supply: paintSupply, reflex: paintReflex, digest: paintDigest,
    ph: paintPH, moon: paintMoon, spectrum: paintSpectrum, conic: paintConic,
    ledger: paintLedger, market: paintMarket, maplab: paintMaplab,
    election: paintElection, sampler: paintSampler, codeflow: paintCodeflow,
    demograph: paintDemograph, geolab: paintGeolab, dgm_synapse: paintSynapse,
    dgm_gen_dihybrid: paintDihybrid, dgm_gen_sexdet: paintSexDet,
    dgm_gen_pedigree: paintPedigree, dgm_gen_incdom: paintIncDom,
    dgm_gen_chromatin: paintChromatin, dgm_gen_fingerprint: paintFingerprint,
    dgm_gen_griffith: paintGriffith, dgm_gen_codon: paintCodon,
    dgm_biogas: paintBiogas, dgm_fermentor: paintFermentor,
    dgm_sewage: paintSewage, dgm_moet: paintMoet,
    dgm_tissue_culture: paintTissueCulture,
    dgm_fasta: paintFasta, dgm_protinfo: paintProtinfo, dgm_logic: paintLogic,
    dgm_ptable: paintPtable, dgm_kingdoms: paintKingdoms, dgm_pn_junction: paintPnJunction,
    dgm_rectifier: paintRectifier, dgm_ac_generator: paintAcGenerator, dgm_logic_gates: paintLogicGates,
    dgm_myopia: paintMyopia, dgm_hypermetropia: paintHypermetropia, dgm_domestic_circuit: paintDomesticCircuit,
    dgm_fleming_left: paintFlemingLeft, dgm_ionic_bond: paintIonicBond, dgm_electrolytic: paintElectrolytic,
    dgm_velocity_graph: paintVelocityGraph, dgm_position_graph: paintPositionGraph,
    dgm_vsepr: paintVsepr, dgm_ph_scale: paintPhScale,
    dgm_vector_addition: paintVectorAddition, dgm_shm: paintShm, dgm_doppler: paintDoppler,
    dgm_circular_motion: paintCircularMotion, dgm_friction: paintFriction,
    dgm_stress_strain: paintStressStrain, dgm_bernoulli: paintBernoulli, dgm_kepler: paintKepler,
    dgm_pv_cycle: paintPvCycle, dgm_vernier: paintVernier, dgm_enthalpy: paintEnthalpy, dgm_gas_laws: paintGasLaws,
    dgm_redox: paintRedox, dgm_functional_groups: paintFunctionalGroups, dgm_mole: paintMole,
    dgm_haloalkane: paintHaloalkane,
    dgm_vdg: paintVdg,
    dgm_raoult: paintRaoult, dgm_kinetics: paintKinetics, dgm_le_chatelier: paintLeChatelier, dgm_hybridization: paintHybridization,
    dgm_sn2: paintSn2, dgm_nuc_addition: paintNucAddition, dgm_reaction_types: paintReactionTypes, dgm_hydrocarbons: paintHydrocarbons,
    dgm_circuit_symbols: paintCircuitSymbols, dgm_heat_transfer: paintHeatTransfer, dgm_shadow: paintShadow,
    dgm_inertia: paintInertia, dgm_energy_chain: paintEnergyChain, dgm_gravitation: paintGravitation, dgm_taxonomy: paintTaxonomy,
    dgm_moment_inertia: paintMomentInertia, dgm_maxwell: paintMaxwell, dgm_hydrogen_isotopes: paintHydrogenIsotopes,
    dgm_puberty: paintPuberty, dgm_stem_cell: paintStemCell,
    dgm_potentiometer: paintPotentiometer, dgm_galvanometer_conv: paintGalvConv, dgm_lcr_resonance: paintLCR,
    dgm_transformer: paintTransformer, dgm_zener: paintZener, dgm_banked_road: paintBanked,
    dgm_pipe_harmonics: paintPipes, dgm_sound_wave: paintSoundWave, dgm_dc_motor: paintDCMotor,
    dgm_born_haber: paintBornHaber, dgm_sigma_pi: paintSigmaPi, dgm_phase_diagram: paintPhaseDiagram,
    dgm_action_potential: paintActionPotential, dgm_germination: paintGermination, dgm_virus: paintVirus,
    dgm_isomers: paintIsomers,
    dgm_plant_kingdom: paintPlantKingdom, dgm_animal_kingdom: paintAnimalKingdom,
    dgm_sets: paintSets, dgm_power_plant: paintPowerPlant,
    dgm_contraception: paintContraception, dgm_conformation: paintConformation,
    dgm_growth_curve: paintGrowthCurve,
};

const PAINTERS: Record<LabSpec['kind'], typeof paintPour> = {
    pour: paintPour, grow: paintGrow, stretch: paintStretch, jump: paintJump, balance: paintBalance,
    fraction: paintFraction, cycle: paintCycle, orbit: paintOrbit, weigh: paintWeigh, electric: paintElectric,
    scene: () => { /* scene kind routes to SCENES registry via spec.scene — handled in CanvasLab */ },
};

// ─── the lab component ───────────────────────────────────────
export function CanvasLab({ spec, onChange, labels }: { spec: LabSpec; onChange?: (v: Record<string, number>) => void; labels?: string[] }) {
    const [vals, setVals] = useState<Record<string, number>>(() => {
        const o: Record<string, number> = {};
        spec.sliders.forEach(s => { o[s.id] = s.start; });
        return o;
    });
    const ref = useRef<HTMLCanvasElement>(null);
    const dispRef = useRef<Record<string, number>>({});
    const dragRef = useRef<{ slider: string; startX: number; startVal: number } | null>(null);
    const [grabbing, setGrabbing] = useState(false);

    const canvasPos = (e: React.PointerEvent) => {
        const r = ref.current!.getBoundingClientRect();
        return { x: (e.clientX - r.left) * (360 / r.width), y: (e.clientY - r.top) * (200 / r.height) };
    };
    const onPointerDown = (e: React.PointerEvent) => {
        downPos.current = canvasPos(e);
        if (!spec.draggable) return;
        const { x, y } = canvasPos(e);
        const sid = spec.draggable(x, y, vals);
        if (!sid) return;
        const s = spec.sliders.find(sl => sl.id === sid);
        if (!s) return;
        dragRef.current = { slider: sid, startX: x, startVal: vals[sid] };
        audioManager.play('tap');
        setGrabbing(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };
    const hoverRef = useRef(-1);
    const selTimeRef = useRef(0);
    const celebratedRef = useRef(false);
    const onPointerMove = (e: React.PointerEvent) => {
        const d = dragRef.current;
        if (!d) {
            // hover preview — diagram hotspots glow under the cursor
            if (spec.hotspots && spec.image) {
                const { x, y } = canvasPos(e);
                const spots = spec.hotspots(vals);
                hoverRef.current = spots.findIndex(s =>
                    Math.hypot(x - s.x * 360, y - s.y * 200) <= s.r * 360);
            }
            return;
        }
        const { x } = canvasPos(e);
        const s = spec.sliders.find(sl => sl.id === d.slider)!;
        const val = Math.round(Math.max(s.min, Math.min(s.max, d.startVal + (x - d.startX) * (s.max - s.min) / 300)));
        setVals(v => ({ ...v, [d.slider]: val }));
    };
    const downPos = useRef<{ x: number; y: number } | null>(null);
    const onPointerUp = (e: React.PointerEvent) => {
        // tap-to-explore: small movement + hotspots = identify-a-part
        if (spec.hotspots && downPos.current) {
            const { x, y } = canvasPos(e);
            const moved = Math.hypot(x - downPos.current.x, y - downPos.current.y);
            if (moved < 6) {
                const spots = spec.hotspots(vals);
                // spots carry normalized 0-1 coords; hit-test in canvas space
                const hit = spots.findIndex(s =>
                    Math.hypot(x - s.x * 360, y - s.y * 200) <= s.r * 360);
                setVals(v => ({ ...v, sel: hit, ...(hit >= 0 ? { [`seen_${hit}`]: 1 } : {}) }));
                if (hit >= 0) {
                    selTimeRef.current = performance.now();
                    const allSeen = spots.every((_, i) => i === hit || vals[`seen_${i}`] === 1);
                    if (allSeen && spots.length > 2 && !celebratedRef.current) {
                        celebratedRef.current = true; audioManager.play('success');
                    } else audioManager.play('pickup');
                }
            }
        }
        downPos.current = null;
        dragRef.current = null; setGrabbing(false);
    };

    const scene3d = (spec.kind === 'scene' && spec.scene ? spec.scene : spec.kind) as string;
    // no WebGL (or a scene crash) → the 2D painter takes over seamlessly
    // assume WebGL exists (SSR/client render agree); verify post-mount —
    // a missing context or a scene crash flips us to the 2D painter.
    const [threeFailed, setThreeFailed] = useState(false);
    useEffect(() => { if (!webglSupported()) setThreeFailed(true); }, []);
    const has3d = HAS_3D.has(scene3d) && !threeFailed;

    useEffect(() => {
        if (has3d) { onChange?.(vals); return; }   // 3D scene renders — skip 2D paint
        const c = ref.current; if (!c) return;
        const ctx = c.getContext('2d'); if (!ctx) return;
        // bespoke scene → animate with requestAnimationFrame (scenes take time)
        if (spec.kind === 'scene' && (spec.image || (spec.scene && SCENES[spec.scene]))) {
            let raf = 0;
            const disp = dispRef.current;
            const loop = (t: number) => {
                // tween — displayed values lerp toward slider targets so
                // drags and clicks animate instead of snapping
                for (const k of Object.keys(vals)) {
                    disp[k] = (disp[k] ?? vals[k]) + (vals[k] - (disp[k] ?? vals[k])) * 0.18;
                }
                disp._hover = hoverRef.current;        // injected post-lerp (no tween on hover)
                disp._selT = selTimeRef.current;
                if (spec.image) paintImgDgm(ctx, c.width, c.height, disp, t, spec);
                else SCENES[spec.scene!](ctx, c.width, c.height, disp, t, labels);
                paintAmbience(ctx, c.width, c.height, t);
                raf = requestAnimationFrame(loop);
            };
            raf = requestAnimationFrame(loop);
            onChange?.(vals);
            return () => cancelAnimationFrame(raf);
        }
        PAINTERS[spec.kind](ctx, c.width, c.height, vals);
        onChange?.(vals);
    }, [vals, spec, onChange, has3d]);

    // linked trace — rolling history of the scene's key metric
    const [hist, setHist] = useState<number[]>([]);
    useEffect(() => { setHist([]); }, [spec]);
    useEffect(() => {
        if (!spec.trace) return;
        setHist(h => [...h.slice(-139), spec.trace!.fn(vals)]);
    }, [vals, spec]);

    const dark = spec.kind === 'scene' || has3d;
    return (
        <div className={`w-full rounded-3xl p-3 ${dark ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 shadow-[0_12px_40px_-8px_rgba(79,70,229,0.45)]' : ''}`}>
            <div className={`text-center text-sm font-black mb-2 tracking-wide ${dark ? 'text-sky-200 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'text-slate-700'}`}>
                {spec.title}
            </div>
            <div className={`relative rounded-2xl overflow-hidden ${dark ? 'ring-1 ring-sky-400/30 shadow-inner' : ''}`}>
                {has3d
                    ? <div className="w-full h-[240px]"><Lab3DBoundary onFail={() => setThreeFailed(true)}><Lab3D scene={scene3d} vals={vals} labels={labels} /></Lab3DBoundary></div>
                    : <canvas ref={ref} width={360} height={200}
                        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
                        className={`w-full touch-none ${spec.draggable ? (grabbing ? 'cursor-grabbing' : 'cursor-grab') : ''} ${dark ? '' : 'rounded-2xl bg-sky-50 border-2 border-slate-200'}`} />}
                {dark && <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/30 to-transparent" />}
            </div>
            {spec.trace && hist.length > 1 && (() => {
                const mx = spec.trace!.max ?? Math.max(...hist, 0.001);
                const xOf = (i: number) => 12 + (i * 320 / Math.max(1, hist.length - 1));
                const pts = hist.map((v, i) => `${xOf(i)},${40 - (v / mx) * 32}`).join(' ');
                const cur = hist[hist.length - 1];
                return (
                    <div className={`mt-2 rounded-xl px-2 py-1 ${dark ? 'bg-slate-800/60 ring-1 ring-sky-400/20' : 'bg-white ring-1 ring-slate-200'}`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-black tracking-widest uppercase ${dark ? 'text-sky-300/70' : 'text-slate-400'}`}>{spec.trace!.label}</span>
                            <span className={`text-[11px] font-black tabular-nums ${dark ? 'text-sky-200' : 'text-slate-700'}`}>{cur.toFixed(2)}{spec.trace!.unit ?? ''}</span>
                        </div>
                        <svg viewBox="0 0 348 44" className="w-full h-9">
                            <polyline points={pts} fill="none" stroke={dark ? '#38bdf8' : '#6366f1'} strokeWidth="2" strokeLinecap="round" />
                            <circle cx={xOf(hist.length - 1)} cy={40 - (cur / mx) * 32} r="3" fill={dark ? '#7dd3fc' : '#4f46e5'} />
                        </svg>
                    </div>
                );
            })()}
            <div className="mt-2.5 space-y-1.5">
                {spec.sliders.map(s => (
                    <div key={s.id} className="flex items-center gap-2">
                        <span className="text-lg w-7 drop-shadow">{s.emoji}</span>
                        <span className={`text-xs font-bold w-16 ${dark ? 'text-sky-100' : 'text-slate-600'}`}>{s.label}</span>
                        <input type="range" min={s.min} max={s.max} step={s.step ?? 1} value={vals[s.id]}
                            onChange={e => setVals(v => ({ ...v, [s.id]: Number(e.target.value) }))}
                            className={`flex-1 h-1.5 rounded-full appearance-none cursor-pointer ${dark ? 'accent-sky-400 bg-slate-700' : 'accent-emerald-500'}`} />
                        <span className={`text-xs font-black w-8 text-right tabular-nums ${dark ? 'text-sky-200' : 'text-slate-800'}`}>{vals[s.id]}</span>
                    </div>
                ))}
            </div>
            {spec.output && (
                <div className={`mt-2.5 text-center rounded-xl px-3 py-1.5 ${dark ? 'bg-sky-400/10 border border-sky-400/30' : 'bg-emerald-50 border-2 border-emerald-200'}`}>
                    <span className={`text-sm font-black ${dark ? 'text-sky-100' : 'text-emerald-800'}`}>{spec.output(vals)}{spec.unit ? ` ${spec.unit}` : ''}</span>
                </div>
            )}
        </div>
    );
}

/** Preset lab specs keyed by name — a sim's explore.lab picks one. */
export const LABS: Record<string, LabSpec> = {
    pour: { kind: 'pour', title: 'Fill the jug!', unit: '% full',
        sliders: [{ id: 'fill', label: 'Fill', emoji: '💧', min: 0, max: 100, start: 0 }],
        trace: { label: 'fill %', fn: v => v.fill??0, max: 100 },
        draggable: () => 'fill',
        output: v => `Water: ${v.fill}` },
    grow: { kind: 'grow', title: 'Grow the plant!',
        sliders: [{ id: 'sun', label: 'Sun', emoji: '☀️', min: 0, max: 100, start: 0 },
                  { id: 'water', label: 'Water', emoji: '💧', min: 0, max: 100, start: 0 }],
        trace: { label: 'growth', fn: v => ((v.sun??0)+(v.water??0))/2, max: 100 },
        draggable: (x => x < 180 ? 'sun' : 'water'),
        output: v => `Growth: ${Math.min(100, Math.round((v.sun + v.water) / 2))}%` },
    stretch: { kind: 'stretch', title: 'Measure the bar!', unit: 'cm',
        sliders: [{ id: 'length', label: 'Tape', emoji: '📏', min: 0, max: 100, start: 0 }],
        trace: { label: 'length', fn: v => v.length??0, max: 100 },
        draggable: () => 'length',
        output: v => `Tape shows: ${Math.round(v.length / 10)}` },
    jump: { kind: 'jump', title: 'Hop the number line!',
        // max 20 (not 10): challenges hop to sums up to 20 (8+7, 4×5) — the
        // trace axis was already drawn to 20, the slider wasn't.
        sliders: [{ id: 'pos', label: 'Frog', emoji: '🐸', min: 0, max: 20, start: 0 }],
        trace: { label: 'position', fn: v => v.pos??0, max: 20 },
        draggable: () => 'pos',
        output: v => `Frog is on: ${v.pos}` },
    balance: { kind: 'balance', title: 'Balance the scale!',
        sliders: [{ id: 'left', label: 'Left', emoji: '⬅️', min: 0, max: 10, start: 0 },
                  { id: 'right', label: 'Right', emoji: '➡️', min: 0, max: 10, start: 0 }],
        trace: { label: 'L−R', fn: v => (v.left??0)-(v.right??0), max: 50 },
        draggable: (x => x < 180 ? 'left' : 'right'),
        output: v => v.left === v.right && v.left > 0 ? 'BALANCED! ⚖️' : v.left > v.right ? 'Left is heavier' : 'Right is heavier' },
    fraction: { kind: 'fraction', title: 'Cut and shade the fraction!',
        sliders: [{ id: 'parts', label: 'Parts', emoji: '🍕', min: 2, max: 8, start: 4 },
                  { id: 'shaded', label: 'Shaded', emoji: '🖍️', min: 0, max: 8, start: 1 }],
        trace: { label: 'shaded / parts', fn: v => Math.min(v.shaded??0,v.parts??4)/Math.max(2,v.parts??4), max: 1 },
        draggable: (x => x < 180 ? 'parts' : 'shaded'),
        output: v => `${Math.min(v.shaded, v.parts)} / ${Math.max(2, v.parts)}` },
    cycle: { kind: 'cycle', title: 'Make it rain!',
        sliders: [{ id: 'heat', label: 'Sun heat', emoji: '☀️', min: 0, max: 100, start: 0 },
                  { id: 'time', label: 'Time', emoji: '⏳', min: 0, max: 100, start: 0 }],
        trace: { label: 'heat', fn: v => v.heat??0, max: 100 },
        draggable: (x => x < 180 ? 'heat' : 'time'),
        output: v => v.heat > 60 && v.time > 80 ? 'RAINING! 🌧️' : v.heat > 50 ? 'Clouds forming...' : 'Heating up...' },
    orbit: { kind: 'orbit', title: 'Orbit the planets!',
        sliders: [{ id: 'speed', label: 'Speed', emoji: '🚀', min: 0, max: 100, start: 30 }],
        trace: { label: 'orbital speed', fn: v => v.speed??30, max: 100 },
        draggable: () => 'speed',
        output: v => v.speed > 70 ? 'FAST orbits!' : v.speed > 30 ? 'Steady orbits' : 'Slow drift' },
    weigh: { kind: 'weigh', title: 'Weigh the object!', unit: 'g',
        sliders: [{ id: 'grams', label: 'Weight', emoji: '🏋️', min: 0, max: 100, start: 0 }],
        trace: { label: 'weight g', fn: v => v.grams??0, max: 100 },
        draggable: () => 'grams',
        output: v => `Weight: ${v.grams}` },
    electric: { kind: 'electric', title: 'Light the bulb!',
        sliders: [{ id: 'power', label: 'Power', emoji: '🔋', min: 0, max: 100, start: 0 }],
        trace: { label: 'power %', fn: v => v.power??0, max: 100 },
        draggable: () => 'power',
        output: v => v.power > 50 ? 'LIT! 💡' : 'Not enough power' },
    // ─── bespoke senior scenes ───────────────────────────────
    heart: { kind: 'scene', scene: 'heart', title: 'The beating heart — watch the ECG!',
        sliders: [{ id: 'rate', label: 'Heart rate', emoji: '❤️', min: 40, max: 160, start: 70 }],
        trace: { label: 'bpm', fn: v => v.rate??70, max: 160 },
        draggable: () => 'rate',
        output: v => `Pulse: ${v.rate} bpm` },
    circuit: { kind: 'scene', scene: 'circuit', title: 'Build the circuit!',
        sliders: [{ id: 'switch', label: 'Switch', emoji: '🎛️', min: 0, max: 1, start: 0 },
                  { id: 'voltage', label: 'Voltage', emoji: '🔋', min: 0, max: 100, start: 50 }],
        trace: { label: 'current (rel.)', fn: v => (v.switch??0)>0?(v.voltage??0)/50:0, max: 2 },
        draggable: () => 'voltage',
        output: v => (v.switch ?? 0) > 0 ? `Current: ${v.voltage} (bulb ${v.voltage > 40 ? 'BRIGHT' : 'dim'})` : 'Circuit open — flip the switch!' },
    cell: { kind: 'scene', scene: 'cell', title: 'Inside the cell!',
        sliders: [{ id: 'zoom', label: 'Zoom', emoji: '🔬', min: 0, max: 100, start: 30 }],
        trace: { label: 'zoom %', fn: v => v.zoom??30, max: 100 },
        draggable: () => 'zoom',
        output: v => v.zoom > 60 ? 'Chloroplasts visible — plant cell!' : 'Zoom in to see organelles' },
    nephron: { kind: 'scene', scene: 'nephron', title: 'The nephron filters blood!',
        sliders: [{ id: 'flow', label: 'Filtration', emoji: '💧', min: 0, max: 100, start: 50 }],
        trace: { label: 'filtration %', fn: v => v.flow??50, max: 100 },
        draggable: () => 'flow',
        output: v => `Filtration rate: ${v.flow}%` },
    atom: { kind: 'scene', scene: 'atom', title: 'Electrons orbiting the nucleus!',
        sliders: [{ id: 'electrons', label: 'Electrons', emoji: '⚛️', min: 0, max: 9, start: 3 }],
        trace: { label: 'electrons', fn: v => v.electrons??3, max: 9 },
        draggable: () => 'electrons',
        output: v => `${v.electrons} electron(s) in shells` },
    prism: { kind: 'scene', scene: 'prism', title: 'Split white light into the spectrum!',
        sliders: [{ id: 'angle', label: 'Spread', emoji: '🌈', min: 20, max: 100, start: 60 }],
        draggable: () => 'angle',
        trace: { label: 'dispersion', fn: v => v.angle??60, max: 100 },
        output: v => `Dispersion: ${v.angle > 70 ? 'wide spectrum!' : v.angle > 40 ? 'rainbow forming' : 'narrow beam'}` },
    projectile: { kind: 'scene', scene: 'projectile', title: 'Launch the projectile!',
        sliders: [{ id: 'speed', label: 'Speed', emoji: '🚀', min: 0, max: 100, start: 60 },
                  { id: 'angle', label: 'Angle', emoji: '📐', min: 10, max: 80, start: 45 }],
        trace: { label: 'range (rel.)', fn: v => (v.speed??60)*(v.speed??60)*Math.sin(2*(v.angle??45)*Math.PI/180)/100, max: 100 },
        draggable: (x, y) => y < 90 ? 'angle' : 'speed',
        output: v => `Launch: ${v.angle}° at speed ${v.speed}` },
    pendulum: { kind: 'scene', scene: 'pendulum', title: 'Swing the pendulum!',
        sliders: [{ id: 'length', label: 'Length', emoji: '📏', min: 0, max: 100, start: 50 }],
        trace: { label: 'period ∝ √L', fn: v => Math.sqrt(v.length??50), max: 10 },
        draggable: () => 'length',
        output: v => `Period ∝ √length — longer = slower swing` },
    mitosis: { kind: 'scene', scene: 'mitosis', title: 'Watch cell division!',
        sliders: [{ id: 'stage', label: 'Stage', emoji: '🧬', min: 0, max: 99, start: 0 }],
        trace: { label: 'phase', fn: v => Math.floor((v.stage??0)/25), max: 4 },
        draggable: () => 'stage',
        output: v => `Phase ${Math.floor((v.stage ?? 0) / 25) + 1} of mitosis` },
    // ─── v3 senior scenes ────────────────────────────────────
    efield: { kind: 'scene', scene: 'efield', title: 'Electric charges and fields',
        sliders: [{ id: 'q1', label: 'Charge A', emoji: '⚡', min: 0, max: 100, start: 80 },
                  { id: 'q2', label: 'Charge B', emoji: '⚡', min: 0, max: 100, start: 20 },
                  { id: 'separation', label: 'Distance', emoji: '📏', min: 10, max: 100, start: 60 }],
        trace: { label: 'force (rel.)', fn: v => (v.q1??80)*(v.q2??20)/Math.max(1,(v.separation??10)), max: 800 },
        draggable: (x, y) => x < 120 ? 'q1' : x < 240 ? 'q2' : 'separation',
        output: v => `A ${(v.q1 ?? 50) > 50 ? '+' : '−'} · B ${(v.q2 ?? 50) > 50 ? '+' : '−'} · ${((v.q1 ?? 50) > 50) === ((v.q2 ?? 50) > 50) ? 'repel' : 'attract'}` },
    lens: { kind: 'scene', scene: 'lens', title: 'Convex lens ray diagram',
        sliders: [{ id: 'focal', label: 'Focal len', emoji: '🔍', min: 0, max: 100, start: 50 }],
        trace: { label: 'focal power 1/f', fn: v => 1/(30+(v.focal??50)*0.8), max: 0.05 },
        draggable: () => 'focal',
        output: v => `f = ${(30 + (v.focal ?? 50) * 0.8).toFixed(0)} cm` },
    wave: { kind: 'scene', scene: 'wave', title: 'Wave on a string',
        sliders: [{ id: 'amplitude', label: 'Amplitude', emoji: '🌊', min: 0, max: 100, start: 50 },
                  { id: 'frequency', label: 'Frequency', emoji: '🎵', min: 0, max: 100, start: 40 }],
        trace: { label: 'amplitude', fn: v => (v.amplitude??50)/10, max: 10 },
        draggable: (x, y) => y < 100 ? 'amplitude' : 'frequency',
        output: v => `A=${v.amplitude} · f=${1 + Math.round((v.frequency ?? 50) / 25)} Hz` },
    graph: { kind: 'scene', scene: 'graph', title: 'Line plotter y = mx + c',
        sliders: [{ id: 'slope', label: 'Slope m', emoji: '📈', min: 0, max: 100, start: 62 },
                  { id: 'intercept', label: 'c', emoji: '📍', min: 0, max: 100, start: 50 }],
        trace: { label: 'slope m', fn: v => (v.slope??50)/25-2, max: 2 },
        draggable: (x, y) => x < 180 ? 'slope' : 'intercept',
        output: v => `y = ${((v.slope ?? 50) / 25 - 2).toFixed(1)}x ${(v.intercept ?? 50) / 12.5 - 4 >= 0 ? '+' : '−'} ${Math.abs((v.intercept ?? 50) / 12.5 - 4).toFixed(1)}` },
    gas: { kind: 'scene', scene: 'gas', title: 'Gas particles under pressure',
        sliders: [{ id: 'temperature', label: 'Temp', emoji: '🌡️', min: 0, max: 100, start: 50 },
                  { id: 'compression', label: 'Piston', emoji: '🔧', min: 0, max: 100, start: 20 }],
        trace: { label: 'volume %', fn: v => 100-(v.compression??0), max: 100 },
        draggable: (x, y) => x < 180 ? 'temperature' : 'compression',
        output: v => `Particles ${v.temperature > 70 ? 'racing' : 'drifting'} · volume ${100 - (v.compression ?? 0)}%` },
    titrate: { kind: 'scene', scene: 'titrate', title: 'Acid–base titration',
        sliders: [{ id: 'drops', label: 'Titrant', emoji: '💧', min: 0, max: 100, start: 0 }],
        trace: { label: 'pH', fn: v => (function(){const d=(v.drops??0)/100;return d<0.45?2+d*8:d<0.55?7:7+(d-0.55)*18})(), max: 14 },
        draggable: () => 'drops',
        output: v => { const d = (v.drops ?? 0) / 100; const pH = d < 0.45 ? 2 + d * 8 : d < 0.55 ? 7 : 7 + (d - 0.55) * 18; return `pH ≈ ${pH.toFixed(1)}`; } },
    emag: { kind: 'scene', scene: 'emag', title: 'Electromagnetic induction',
        sliders: [{ id: 'speed', label: 'Magnet speed', emoji: '🧲', min: 0, max: 100, start: 50 },
                  { id: 'turns', label: 'Coil turns', emoji: '🌀', min: 0, max: 100, start: 40 }],
        trace: { label: 'EMF (rel.)', fn: v => (v.speed??50)*(v.turns??40)/2000, max: 5 },
        draggable: (x, y) => x < 180 ? 'speed' : 'turns',
        output: v => `EMF ∝ rate of flux change · ${3 + Math.round((v.turns ?? 50) / 20)} turns` },
    vector: { kind: 'scene', scene: 'vector', title: 'Vector addition a + b',
        sliders: [{ id: 'ax', label: 'a.x', emoji: '↔️', min: 0, max: 100, start: 60 },
                  { id: 'ay', label: 'a.y', emoji: '↕️', min: 0, max: 100, start: 50 },
                  { id: 'bx', label: 'b.x', emoji: '↔️', min: 0, max: 100, start: 40 },
                  { id: 'by', label: 'b.y', emoji: '↕️', min: 0, max: 100, start: 60 }],
        trace: { label: '|a+b|', fn: v => Math.hypot(((v.ax??60)/12-5)+((v.bx??40)/12-4),((v.ay??50)/12-4)+((v.by??60)/12-5)), max: 15 },
        draggable: (x, y) => x < 180 ? (y < 100 ? 'ax' : 'ay') : (y < 100 ? 'bx' : 'by'),
        output: v => `a+b = (${(((v.ax ?? 60) / 12 - 5) + ((v.bx ?? 40) / 12 - 4)).toFixed(0)}, ${(((v.ay ?? 50) / 12 - 4) + ((v.by ?? 60) / 12 - 5)).toFixed(0)})` },
    equilibrium: { kind: 'scene', scene: 'equilibrium', title: 'Dynamic equilibrium A ⇌ B',
        sliders: [{ id: 'concentration', label: 'Add reactant', emoji: '⚗️', min: 0, max: 100, start: 30 }],
        trace: { label: 'products', fn: v => 24*(v.concentration??50)/100, max: 24 },
        draggable: () => 'concentration',
        output: v => `Products: ${Math.round(24 * (v.concentration ?? 50) / 100)}/24 — Le Chatelier in action` },
    timeline: { kind: 'scene', scene: 'timeline', title: 'Scrub through the era',
        sliders: [{ id: 'year', label: 'Time', emoji: '📜', min: 0, max: 100, start: 0 }],
        draggable: () => 'year',
        trace: { label: 'era %', fn: v => v.year??0, max: 100 },
        output: v => `Era position: ${v.year}%` },
    flow: { kind: 'scene', scene: 'flow', title: 'Walk the process',
        sliders: [{ id: 'stage', label: 'Stage', emoji: '🔁', min: 0, max: 100, start: 0 }],
        output: v => `Stage ${Math.min(5, Math.floor((v.stage ?? 0) / 20))}/5` },
    dna: { kind: 'scene', scene: 'dna', title: 'Unzip the double helix',
        sliders: [{ id: 'unzip', label: 'Helicase', emoji: '✂️', min: 0, max: 100, start: 0 }],
        trace: { label: 'unzipped %', fn: v => v.unzip??0, max: 100 },
        draggable: () => 'unzip',
        output: v => (v.unzip ?? 0) > 60 ? 'Strands separated — replication can begin' : 'Double helix — A·T, G·C pairs' },
    supply: { kind: 'scene', scene: 'supply', title: 'Move supply & demand',
        sliders: [{ id: 'supply', label: 'Supply', emoji: '📦', min: 0, max: 100, start: 50 },
                  { id: 'demand', label: 'Demand', emoji: '🛒', min: 0, max: 100, start: 50 }],
        trace: { label: 'D−S gap', fn: v => (v.demand??50)-(v.supply??50), max: 60 },
        draggable: (x, y) => x < 180 ? 'demand' : 'supply',
        output: () => 'Find where the curves cross — that is equilibrium' },
    reflex: { kind: 'scene', scene: 'reflex', title: 'Fire the reflex arc',
        sliders: [{ id: 'speed', label: 'Signal speed', emoji: '⚡', min: 0, max: 100, start: 50 }],
        trace: { label: 'signal speed', fn: v => v.speed??50, max: 100 },
        draggable: () => 'speed',
        output: () => 'Stimulus → receptor → cord → muscle' },
    digest: { kind: 'scene', scene: 'digest', title: 'Push food through the tract',
        sliders: [{ id: 'progress', label: 'Food journey', emoji: '🍎', min: 0, max: 100, start: 0 }],
        trace: { label: 'progress %', fn: v => v.progress??0, max: 100 },
        draggable: () => 'progress',
        output: v => (v.progress ?? 0) < 30 ? 'Early digestion' : (v.progress ?? 0) < 70 ? 'Nutrient absorption' : 'Waste formation' },
    ph: { kind: 'scene', scene: 'ph', title: 'Probe the pH scale',
        sliders: [{ id: 'probe', label: 'Probe', emoji: '🥼', min: 0, max: 100, start: 50 }],
        trace: { label: 'pH', fn: v => (v.probe??50)/100*14, max: 14 },
        draggable: () => 'probe',
        output: v => `pH ${((v.probe ?? 50) / 100 * 14).toFixed(1)}` },
    moon: { kind: 'scene', scene: 'moon', title: 'Sweep the moon phases',
        sliders: [{ id: 'phase', label: 'Phase', emoji: '🌙', min: 0, max: 100, start: 0 }],
        trace: { label: 'phase', fn: v => Math.floor((v.phase??0)/20), max: 5 },
        draggable: () => 'phase',
        output: v => ['new moon', 'crescent', 'quarter', 'gibbous', 'full moon'][Math.min(4, Math.floor((v.phase ?? 0) / 20))] },
    spectrum: { kind: 'scene', scene: 'spectrum', title: 'Scan the EM spectrum',
        sliders: [{ id: 'band', label: 'Band', emoji: '📡', min: 0, max: 100, start: 40 }],
        trace: { label: 'band', fn: v => v.band??40, max: 100 },
        draggable: () => 'band',
        output: () => 'Energy rises toward gamma →' },
    conic: { kind: 'scene', scene: 'conic', title: 'Slice the double cone',
        sliders: [{ id: 'tilt', label: 'Plane tilt', emoji: '✂️', min: 0, max: 100, start: 20 }],
        trace: { label: 'section type', fn: v => Math.floor((v.tilt??20)/25), max: 4 },
        draggable: () => 'tilt',
        output: v => ['circle', 'ellipse', 'parabola', 'hyperbola'][Math.min(3, Math.floor((v.tilt ?? 20) / 25))] },
    molecule: { kind: 'scene', scene: 'molecule', title: 'Build the molecule — atoms bond in 3D',
        sliders: [{ id: 'atoms', label: 'Atoms', emoji: '⚛️', min: 2, max: 8, start: 4 }],
        trace: { label: 'atoms', fn: v => v.atoms??4, max: 8 },
        draggable: () => 'atoms',
        output: v => `${v.atoms} atoms in the chain` },
    solid: { kind: 'scene', scene: 'solid', title: 'Cylinder — radius and height in 3D',
        sliders: [{ id: 'radius', label: 'Radius', emoji: '⭕', min: 0, max: 100, start: 50 },
                  { id: 'height', label: 'Height', emoji: '📏', min: 0, max: 100, start: 50 }],
        trace: { label: 'volume πr²h', fn: v => Math.PI*(v.radius??50)*(v.radius??50)*(v.height??50)/2500, max: 300 },
        draggable: (x, y) => x < 180 ? 'radius' : 'height',
        output: v => `V = πr²h` },
    unitcircle: { kind: 'scene', scene: 'unitcircle', title: 'The unit circle — sin and cos live',
        sliders: [{ id: 'angle', label: 'Angle', emoji: '📐', min: 0, max: 100, start: 25 }],
        trace: { label: 'sin θ', fn: v => Math.sin((v.angle??25)/100*2*Math.PI), max: 1 },
        draggable: () => 'angle',
        output: v => `θ = ${Math.round((v.angle ?? 25) / 100 * 360)}°` },
    globe: { kind: 'scene', scene: 'globe', title: 'The tilted Earth — why seasons happen',
        sliders: [{ id: 'tilt', label: 'Axis tilt', emoji: '🌍', min: 0, max: 100, start: 50 }],
        trace: { label: 'tilt °', fn: v => ((v.tilt??50)/100-0.5)*52, max: 26 },
        draggable: () => 'tilt',
        output: v => `tilt = ${Math.round(((v.tilt ?? 50) / 100 - 0.5) * 52)}°` },
    // ─── subject-shaped humanities / commerce / CS labs ──────────────
    ledger: { kind: 'scene', scene: 'ledger', title: 'Post the journal entries — watch both sides',
        sliders: [{ id: 'post', label: 'Entry', emoji: '📒', min: 0, max: 6, start: 0 }],
        trace: { label: 'net cash ₹', fn: v => LEDGER_TXNS.slice(0, Math.round(v.post ?? 0)).reduce((s, t) => s + (t.dr === 'Cash' ? t.amt : 0) - (t.cr === 'Cash' ? t.amt : 0), 0), max: 60000 },
        draggable: () => 'post',
        output: v => `${Math.min(6, Math.round(v.post ?? 0))}/6 posted — every Dr has a matching Cr` },
    market: { kind: 'scene', scene: 'market', title: 'Move supply & demand — find equilibrium',
        sliders: [{ id: 'demand', label: 'Demand', emoji: '🛒', min: 0, max: 100, start: 50 },
                  { id: 'supply', label: 'Supply', emoji: '📦', min: 0, max: 100, start: 50 },
                  { id: 'price', label: 'Price', emoji: '₹', min: 0, max: 90, start: 0 }],
        trace: { label: 'equilibrium price ₹', fn: v => ((100 + (v.demand - 50) * 0.6) + (10 - (v.supply - 50) * 0.6)) / 2, max: 120 },
        draggable: (x, y) => y < 70 ? 'price' : x < 170 ? 'demand' : 'supply',
        output: v => (v.price ?? 0) > 0 ? 'price set — surplus or shortage shows as a band' : 'equilibrium is where the curves cross' },
    maplab: { kind: 'scene', scene: 'maplab', title: 'Scrub through the empires',
        sliders: [{ id: 'era', label: 'Era', emoji: '🗺️', min: 0, max: 99, start: 0 }],
        trace: { label: 'empire extent %', fn: v => [85,60,55,75,92][Math.min(4,Math.floor((v.era??0)/20))], max: 100 },
        draggable: () => 'era',
        output: v => ['Maurya', 'Gupta', 'Delhi Sultanate', 'Mughal', 'British Raj'][Math.min(4, Math.floor((v.era ?? 0) / 20))] },
    election: { kind: 'scene', scene: 'election', title: 'Votes to seats — who forms government?',
        sliders: [{ id: 'partyA', label: 'Party A %', emoji: '🗳️', min: 0, max: 80, start: 40 },
                  { id: 'partyB', label: 'Party B %', emoji: '🗳️', min: 0, max: 80, start: 35 }],
        trace: { label: 'party A seats', fn: v => v.partyA ?? 40, max: 80 },
        draggable: x => x < 180 ? 'partyA' : 'partyB',
        output: v => `needs 51 seats for a majority` },
    sampler: { kind: 'scene', scene: 'sampler', title: 'Run trials — the Law of Large Numbers',
        sliders: [{ id: 'trials', label: 'Trials', emoji: '🎲', min: 0, max: 500, start: 0 }],
        trace: { label: 'proportion heads', fn: v => (function(){let h=0;for(let i=0;i<Math.round(v.trials??0);i++){if(((i*2654435761)>>>0)/4294967296<0.5)h++;}return (v.trials??0)>0?h/(v.trials??0):0})(), max: 1 },
        draggable: () => 'trials',
        output: v => `${Math.round(v.trials ?? 0)} trials — watch the line settle at 50%` },
    codeflow: { kind: 'scene', scene: 'codeflow', title: 'Trace the loop — be the CPU',
        sliders: [{ id: 'step', label: 'Step', emoji: '▶️', min: 0, max: 20, start: 0 }],
        trace: { label: 'sum', fn: v => CODE_STEPS[Math.min(CODE_STEPS.length-1, Math.max(0, Math.round(v.step??0)))].sum, max: 15 },
        draggable: () => 'step',
        output: v => `step ${Math.round(v.step ?? 0)} — sum accumulates i each pass` },
    geolab: { kind: 'scene', scene: 'geolab', title: 'Drive the monsoon — June to December',
        sliders: [{ id: 'season', label: 'Season', emoji: '🌧️', min: 0, max: 99, start: 0 }],
        draggable: () => 'season',
        trace: { label: 'monsoon strength', fn: v => Math.abs(1 - (v.season ?? 0) / 99 * 2) * 100, max: 100 },
        output: v => (v.season ?? 0) < 40 ? 'SW monsoon — rain over most of India' : (v.season ?? 0) > 60 ? 'NE retreat — Coromandel coast rains' : 'winds reversing' },
    dgm_synapse: { kind: 'scene', scene: 'dgm_synapse', title: 'The synapse — tap each part to learn it',
        sliders: [], hotspots: () => SYNAPSE_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        trace: { label: 'signal strength', fn: v => 60 + Math.sin(Date.now() / 800) * 30, max: 100 },
        output: v => (v.sel ?? -1) >= 0 ? `${SYNAPSE_SPOTS[v.sel].label}: ${SYNAPSE_SPOTS[v.sel].fn}` : 'tap a part of the synapse' },
    dgm_gen_dihybrid: { kind: 'scene', scene: 'dgm_gen_dihybrid', title: 'Dihybrid cross — tap the boxes',
        sliders: [], hotspots: () => DIHYBRID_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${DIHYBRID_SPOTS[v.sel].label}: ${DIHYBRID_SPOTS[v.sel].fn}` : 'tap a part of the Punnett square' },
    dgm_gen_sexdet: { kind: 'scene', scene: 'dgm_gen_sexdet', title: 'Sex determination — tap the players',
        sliders: [], hotspots: () => SEXDET_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${SEXDET_SPOTS[v.sel].label}: ${SEXDET_SPOTS[v.sel].fn}` : 'tap a part of the cross' },
    dgm_gen_pedigree: { kind: 'scene', scene: 'dgm_gen_pedigree', title: 'Pedigree chart — tap the symbols',
        sliders: [], hotspots: () => PEDIGREE_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PEDIGREE_SPOTS[v.sel].label}: ${PEDIGREE_SPOTS[v.sel].fn}` : 'tap a symbol in the pedigree' },
    dgm_gen_incdom: { kind: 'scene', scene: 'dgm_gen_incdom', title: 'Incomplete dominance — tap the flowers',
        sliders: [], hotspots: () => INCDOM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${INCDOM_SPOTS[v.sel].label}: ${INCDOM_SPOTS[v.sel].fn}` : 'tap a flower in the cross' },
    dgm_gen_chromatin: { kind: 'scene', scene: 'dgm_gen_chromatin', title: 'DNA packaging — tap each fold level',
        sliders: [], hotspots: () => CHROMATIN_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${CHROMATIN_SPOTS[v.sel].label}: ${CHROMATIN_SPOTS[v.sel].fn}` : 'tap a packaging level' },
    dgm_gen_fingerprint: { kind: 'scene', scene: 'dgm_gen_fingerprint', title: 'DNA fingerprinting — tap the lanes',
        sliders: [], hotspots: () => FINGERPRINT_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${FINGERPRINT_SPOTS[v.sel].label}: ${FINGERPRINT_SPOTS[v.sel].fn}` : 'tap a lane in the gel' },
    dgm_gen_griffith: { kind: 'scene', scene: 'dgm_gen_griffith', title: 'Griffith experiment — tap each panel',
        sliders: [], hotspots: () => GRIFFITH_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${GRIFFITH_SPOTS[v.sel].label}: ${GRIFFITH_SPOTS[v.sel].fn}` : 'tap a mouse panel' },
    dgm_gen_codon: { kind: 'scene', scene: 'dgm_gen_codon', title: 'The codon wheel — tap to read it',
        sliders: [], hotspots: () => CODON_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${CODON_SPOTS[v.sel].label}: ${CODON_SPOTS[v.sel].fn}` : 'tap a part of the wheel' },
    dgm_biogas: { kind: 'scene', scene: 'dgm_biogas', title: 'A typical biogas plant — tap each part',
        sliders: [], hotspots: () => BIOGAS_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${BIOGAS_SPOTS[v.sel].label}: ${BIOGAS_SPOTS[v.sel].fn}` : 'tap a part of the biogas plant' },
    dgm_fermentor: { kind: 'scene', scene: 'dgm_fermentor', title: 'The stirred-tank bioreactor — tap each part',
        sliders: [], hotspots: () => FERMENTOR_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${FERMENTOR_SPOTS[v.sel].label}: ${FERMENTOR_SPOTS[v.sel].fn}` : 'tap a part of the bioreactor' },
    dgm_sewage: { kind: 'scene', scene: 'dgm_sewage', title: 'Sewage treatment — tap each stage',
        sliders: [], hotspots: () => SEWAGE_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${SEWAGE_SPOTS[v.sel].label}: ${SEWAGE_SPOTS[v.sel].fn}` : 'tap a stage of the plant' },
    dgm_moet: { kind: 'scene', scene: 'dgm_moet', title: 'MOET — many calves from one elite mother',
        sliders: [], hotspots: () => MOET_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${MOET_SPOTS[v.sel].label}: ${MOET_SPOTS[v.sel].fn}` : 'tap a step of the MOET cycle' },
    dgm_tissue_culture: { kind: 'scene', scene: 'dgm_tissue_culture', title: 'Micropropagation — explant to plantlet',
        sliders: [], hotspots: () => TISSUE_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${TISSUE_SPOTS[v.sel].label}: ${TISSUE_SPOTS[v.sel].fn}` : 'tap a step of micropropagation' },
    dgm_fasta: { kind: 'scene', scene: 'dgm_fasta', title: 'A FASTA file — tap each field',
        sliders: [], hotspots: () => FASTA_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${FASTA_SPOTS[v.sel].label}: ${FASTA_SPOTS[v.sel].fn}` : 'tap a field of the FASTA header' },
    dgm_protinfo: { kind: 'scene', scene: 'dgm_protinfo', title: 'Predicting a protein\'s shape — tap each step',
        sliders: [], hotspots: () => PROTINFO_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PROTINFO_SPOTS[v.sel].label}: ${PROTINFO_SPOTS[v.sel].fn}` : 'tap a step of the pipeline' },
    dgm_logic: { kind: 'scene', scene: 'dgm_logic', title: 'Statements and their flips — tap each idea',
        sliders: [], hotspots: () => LOGIC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${LOGIC_SPOTS[v.sel].label}: ${LOGIC_SPOTS[v.sel].fn}` : 'tap an idea in the argument' },
    dgm_ptable: { kind: 'scene', scene: 'dgm_ptable', title: 'The periodic table — tap each block',
        sliders: [], hotspots: () => PTABLE_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PTABLE_SPOTS[v.sel].label}: ${PTABLE_SPOTS[v.sel].fn}` : 'tap a block of the table' },
    dgm_kingdoms: { kind: 'scene', scene: 'dgm_kingdoms', title: "Whittaker's five kingdoms — tap each",
        sliders: [], hotspots: () => KINGDOM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${KINGDOM_SPOTS[v.sel].label}: ${KINGDOM_SPOTS[v.sel].fn}` : 'tap a kingdom' },
    dgm_plant_kingdom: { kind: 'scene', scene: 'dgm_plant_kingdom', title: 'The plant kingdom — tap each group',
        sliders: [], hotspots: () => PLANTK_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PLANTK_SPOTS[v.sel].label}: ${PLANTK_SPOTS[v.sel].fn}` : 'tap a plant group' },
    dgm_animal_kingdom: { kind: 'scene', scene: 'dgm_animal_kingdom', title: 'The ten phyla — tap each',
        sliders: [], hotspots: () => ANIMALK_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${ANIMALK_SPOTS[v.sel].label}: ${ANIMALK_SPOTS[v.sel].fn}` : 'tap a phylum' },
    dgm_sets: { kind: 'scene', scene: 'dgm_sets', title: 'The Venn diagram — tap each region',
        sliders: [], hotspots: () => SETS_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${SETS_SPOTS[v.sel].label}: ${SETS_SPOTS[v.sel].fn}` : 'tap a region of the Venn diagram' },
    dgm_power_plant: { kind: 'scene', scene: 'dgm_power_plant', title: 'A thermal power station — tap each part',
        sliders: [], hotspots: () => POWER_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${POWER_SPOTS[v.sel].label}: ${POWER_SPOTS[v.sel].fn}` : 'tap a part of the plant' },
    dgm_contraception: { kind: 'scene', scene: 'dgm_contraception', title: 'Methods of contraception — tap each family',
        sliders: [], hotspots: () => CONTRA_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${CONTRA_SPOTS[v.sel].label}: ${CONTRA_SPOTS[v.sel].fn}` : 'tap a method family' },
    dgm_conformation: { kind: 'scene', scene: 'dgm_conformation', title: 'Newman projections — tap each conformation',
        sliders: [], hotspots: () => CONFORM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${CONFORM_SPOTS[v.sel].label}: ${CONFORM_SPOTS[v.sel].fn}` : 'tap a conformation' },
    dgm_growth_curve: { kind: 'scene', scene: 'dgm_growth_curve', title: 'The sigmoid growth curve — tap each phase',
        sliders: [], hotspots: () => GROWTHC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${GROWTHC_SPOTS[v.sel].label}: ${GROWTHC_SPOTS[v.sel].fn}` : 'tap a phase of the curve' },
    dgm_pn_junction: { kind: 'scene', scene: 'dgm_pn_junction', title: 'The p-n junction — tap each region',
        sliders: [], hotspots: () => PN_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PN_SPOTS[v.sel].label}: ${PN_SPOTS[v.sel].fn}` : 'tap a part of the junction' },
    dgm_rectifier: { kind: 'scene', scene: 'dgm_rectifier', title: 'Full-wave rectifier — tap each part',
        sliders: [], hotspots: () => RECT_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${RECT_SPOTS[v.sel].label}: ${RECT_SPOTS[v.sel].fn}` : 'tap a part of the circuit' },
    dgm_ac_generator: { kind: 'scene', scene: 'dgm_ac_generator', title: 'The AC generator — tap each part',
        sliders: [], hotspots: () => GEN_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${GEN_SPOTS[v.sel].label}: ${GEN_SPOTS[v.sel].fn}` : 'tap a part of the alternator' },
    dgm_logic_gates: { kind: 'scene', scene: 'dgm_logic_gates', title: 'The five logic gates — tap each',
        sliders: [], hotspots: () => GATE_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${GATE_SPOTS[v.sel].label}: ${GATE_SPOTS[v.sel].fn}` : 'tap a gate' },
    dgm_myopia: { kind: 'scene', scene: 'dgm_myopia', title: 'Short sight — tap the defect and the fix',
        sliders: [], hotspots: () => MYOPIA_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${MYOPIA_SPOTS[v.sel].label}: ${MYOPIA_SPOTS[v.sel].fn}` : 'tap a part of the eye' },
    dgm_hypermetropia: { kind: 'scene', scene: 'dgm_hypermetropia', title: 'Long sight — tap the defect and the fix',
        sliders: [], hotspots: () => HYPER_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${HYPER_SPOTS[v.sel].label}: ${HYPER_SPOTS[v.sel].fn}` : 'tap a part of the eye' },
    dgm_domestic_circuit: { kind: 'scene', scene: 'dgm_domestic_circuit', title: 'Home wiring — tap each wire',
        sliders: [], hotspots: () => DOM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${DOM_SPOTS[v.sel].label}: ${DOM_SPOTS[v.sel].fn}` : 'tap a part of the circuit' },
    dgm_fleming_left: { kind: 'scene', scene: 'dgm_fleming_left', title: "Fleming's left-hand rule — tap each finger",
        sliders: [], hotspots: () => FLEM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${FLEM_SPOTS[v.sel].label}: ${FLEM_SPOTS[v.sel].fn}` : 'tap a finger of the rule' },
    dgm_ionic_bond: { kind: 'scene', scene: 'dgm_ionic_bond', title: 'The ionic bond — tap the electron handover',
        sliders: [], hotspots: () => IONIC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${IONIC_SPOTS[v.sel].label}: ${IONIC_SPOTS[v.sel].fn}` : 'tap a part of the bond' },
    dgm_electrolytic: { kind: 'scene', scene: 'dgm_electrolytic', title: 'Electrolytic refining — tap each part',
        sliders: [], hotspots: () => ELECTRO_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${ELECTRO_SPOTS[v.sel].label}: ${ELECTRO_SPOTS[v.sel].fn}` : 'tap a part of the cell' },
    dgm_velocity_graph: { kind: 'scene', scene: 'dgm_velocity_graph', title: 'The velocity-time graph — tap each feature',
        sliders: [], hotspots: () => VEL_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${VEL_SPOTS[v.sel].label}: ${VEL_SPOTS[v.sel].fn}` : 'tap a feature of the graph' },
    dgm_position_graph: { kind: 'scene', scene: 'dgm_position_graph', title: 'The distance-time graph — tap each line',
        sliders: [], hotspots: () => POS_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${POS_SPOTS[v.sel].label}: ${POS_SPOTS[v.sel].fn}` : 'tap a feature of the graph' },
    dgm_vsepr: { kind: 'scene', scene: 'dgm_vsepr', title: 'The five molecular shapes — tap each',
        sliders: [], hotspots: () => VSEPR_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${VSEPR_SPOTS[v.sel].label}: ${VSEPR_SPOTS[v.sel].fn}` : 'tap a shape' },
    dgm_ph_scale: { kind: 'scene', scene: 'dgm_ph_scale', title: 'The pH scale — tap each band',
        sliders: [], hotspots: () => PH_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PH_SPOTS[v.sel].label}: ${PH_SPOTS[v.sel].fn}` : 'tap a band of the scale' },
    dgm_vector_addition: { kind: 'scene', scene: 'dgm_vector_addition', title: 'Adding vectors — tap each arrow',
        sliders: [], hotspots: () => VEC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${VEC_SPOTS[v.sel].label}: ${VEC_SPOTS[v.sel].fn}` : 'tap an arrow' },
    dgm_shm: { kind: 'scene', scene: 'dgm_shm', title: 'Simple harmonic motion — tap each position',
        sliders: [], hotspots: () => SHM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${SHM_SPOTS[v.sel].label}: ${SHM_SPOTS[v.sel].fn}` : 'tap a position' },
    dgm_doppler: { kind: 'scene', scene: 'dgm_doppler', title: 'The Doppler effect — tap each region',
        sliders: [], hotspots: () => DOPP_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${DOPP_SPOTS[v.sel].label}: ${DOPP_SPOTS[v.sel].fn}` : 'tap a part of the pattern' },
    dgm_circular_motion: { kind: 'scene', scene: 'dgm_circular_motion', title: 'Uniform circular motion — tap each vector',
        sliders: [], hotspots: () => CIRC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${CIRC_SPOTS[v.sel].label}: ${CIRC_SPOTS[v.sel].fn}` : 'tap a vector' },
    dgm_friction: { kind: 'scene', scene: 'dgm_friction', title: 'Friction on a block — tap each force',
        sliders: [], hotspots: () => FRICT_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${FRICT_SPOTS[v.sel].label}: ${FRICT_SPOTS[v.sel].fn}` : 'tap a force' },
    dgm_stress_strain: { kind: 'scene', scene: 'dgm_stress_strain', title: 'The stress-strain curve — tap each point',
        sliders: [], hotspots: () => SS_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${SS_SPOTS[v.sel].label}: ${SS_SPOTS[v.sel].fn}` : 'tap a point on the curve' },
    dgm_bernoulli: { kind: 'scene', scene: 'dgm_bernoulli', title: 'Bernoulli in a Venturi tube — tap each section',
        sliders: [], hotspots: () => BERN_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${BERN_SPOTS[v.sel].label}: ${BERN_SPOTS[v.sel].fn}` : 'tap a part of the tube' },
    dgm_kepler: { kind: 'scene', scene: 'dgm_kepler', title: "Kepler's orbit — tap each part",
        sliders: [], hotspots: () => KEPLER_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${KEPLER_SPOTS[v.sel].label}: ${KEPLER_SPOTS[v.sel].fn}` : 'tap a part of the orbit' },
    dgm_pv_cycle: { kind: 'scene', scene: 'dgm_pv_cycle', title: 'The Carnot cycle — tap each leg',
        sliders: [], hotspots: () => PV_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PV_SPOTS[v.sel].label}: ${PV_SPOTS[v.sel].fn}` : 'tap a leg of the cycle' },
    dgm_vernier: { kind: 'scene', scene: 'dgm_vernier', title: 'The vernier calliper — tap each part',
        sliders: [], hotspots: () => VERN_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${VERN_SPOTS[v.sel].label}: ${VERN_SPOTS[v.sel].fn}` : 'tap a part of the calliper' },
    dgm_enthalpy: { kind: 'scene', scene: 'dgm_enthalpy', title: 'The energy profile — tap each level',
        sliders: [], hotspots: () => ENTH_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${ENTH_SPOTS[v.sel].label}: ${ENTH_SPOTS[v.sel].fn}` : 'tap a level of the profile' },
    dgm_gas_laws: { kind: 'scene', scene: 'dgm_gas_laws', title: 'The gas laws — tap each graph',
        sliders: [], hotspots: () => GAS_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${GAS_SPOTS[v.sel].label}: ${GAS_SPOTS[v.sel].fn}` : 'tap a graph' },
    dgm_redox: { kind: 'scene', scene: 'dgm_redox', title: 'Redox — the electron handover, tap each side',
        sliders: [], hotspots: () => REDOX_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${REDOX_SPOTS[v.sel].label}: ${REDOX_SPOTS[v.sel].fn}` : 'tap a part of the exchange' },
    dgm_functional_groups: { kind: 'scene', scene: 'dgm_functional_groups', title: 'The six functional families — tap each',
        sliders: [], hotspots: () => FG_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${FG_SPOTS[v.sel].label}: ${FG_SPOTS[v.sel].fn}` : 'tap a family' },
    dgm_haloalkane: { kind: 'scene', scene: 'dgm_haloalkane', title: 'Haloalkane classes — tap each',
        sliders: [], hotspots: () => HALO_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${HALO_SPOTS[v.sel].label}: ${HALO_SPOTS[v.sel].fn}` : 'tap a halide class' },
    dgm_vdg: { kind: 'scene', scene: 'dgm_vdg', title: 'Van de Graaff generator — tap each part',
        sliders: [], hotspots: () => VDG_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${VDG_SPOTS[v.sel].label}: ${VDG_SPOTS[v.sel].fn}` : 'tap a part' },
    dgm_mole: { kind: 'scene', scene: 'dgm_mole', title: 'The mole — tap each conversion',
        sliders: [], hotspots: () => MOLE_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${MOLE_SPOTS[v.sel].label}: ${MOLE_SPOTS[v.sel].fn}` : 'tap a conversion' },
    dgm_raoult: { kind: 'scene', scene: 'dgm_raoult', title: "Raoult's law — tap each line",
        sliders: [], hotspots: () => RAOULT_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${RAOULT_SPOTS[v.sel].label}: ${RAOULT_SPOTS[v.sel].fn}` : 'tap a line' },
    dgm_kinetics: { kind: 'scene', scene: 'dgm_kinetics', title: 'Rate curves — tap each order',
        sliders: [], hotspots: () => KIN_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${KIN_SPOTS[v.sel].label}: ${KIN_SPOTS[v.sel].fn}` : 'tap a curve' },
    dgm_le_chatelier: { kind: 'scene', scene: 'dgm_le_chatelier', title: 'Le Chatelier — tap the balance',
        sliders: [], hotspots: () => LC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${LC_SPOTS[v.sel].label}: ${LC_SPOTS[v.sel].fn}` : 'tap a side of the balance' },
    dgm_hybridization: { kind: 'scene', scene: 'dgm_hybridization', title: 'sp³ hybridisation — tap each lobe',
        sliders: [], hotspots: () => HYB_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${HYB_SPOTS[v.sel].label}: ${HYB_SPOTS[v.sel].fn}` : 'tap an orbital' },
    dgm_sn2: { kind: 'scene', scene: 'dgm_sn2', title: 'The SN2 flip — tap each part of the attack',
        sliders: [], hotspots: () => SN2_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${SN2_SPOTS[v.sel].label}: ${SN2_SPOTS[v.sel].fn}` : 'tap a part of the mechanism' },
    dgm_nuc_addition: { kind: 'scene', scene: 'dgm_nuc_addition', title: 'Nucleophilic addition — tap each part',
        sliders: [], hotspots: () => NUC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${NUC_SPOTS[v.sel].label}: ${NUC_SPOTS[v.sel].fn}` : 'tap a part of the mechanism' },
    dgm_reaction_types: { kind: 'scene', scene: 'dgm_reaction_types', title: 'The four reaction families — tap each',
        sliders: [], hotspots: () => RT_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${RT_SPOTS[v.sel].label}: ${RT_SPOTS[v.sel].fn}` : 'tap a reaction family' },
    dgm_hydrocarbons: { kind: 'scene', scene: 'dgm_hydrocarbons', title: 'The three carbon bonds — tap each',
        sliders: [], hotspots: () => HC_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${HC_SPOTS[v.sel].label}: ${HC_SPOTS[v.sel].fn}` : 'tap a bond family' },
    dgm_circuit_symbols: { kind: 'scene', scene: 'dgm_circuit_symbols', title: 'Circuit symbols — tap each one',
        sliders: [], hotspots: () => CSYM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${CSYM_SPOTS[v.sel].label}: ${CSYM_SPOTS[v.sel].fn}` : 'tap a symbol' },
    dgm_heat_transfer: { kind: 'scene', scene: 'dgm_heat_transfer', title: 'Three ways heat travels — tap each',
        sliders: [], hotspots: () => HEAT_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${HEAT_SPOTS[v.sel].label}: ${HEAT_SPOTS[v.sel].fn}` : 'tap a mode' },
    dgm_shadow: { kind: 'scene', scene: 'dgm_shadow', title: 'Umbra and penumbra — tap each region',
        sliders: [], hotspots: () => SHAD_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${SHAD_SPOTS[v.sel].label}: ${SHAD_SPOTS[v.sel].fn}` : 'tap a part of the shadow' },
    dgm_inertia: { kind: 'scene', scene: 'dgm_inertia', title: 'The inertia trick — tap each part',
        sliders: [], hotspots: () => INERT_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${INERT_SPOTS[v.sel].label}: ${INERT_SPOTS[v.sel].fn}` : 'tap a part of the demo' },
    dgm_energy_chain: { kind: 'scene', scene: 'dgm_energy_chain', title: 'The energy chain — tap each form',
        sliders: [], hotspots: () => ECHAIN_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${ECHAIN_SPOTS[v.sel].label}: ${ECHAIN_SPOTS[v.sel].fn}` : 'tap a form of energy' },
    dgm_gravitation: { kind: 'scene', scene: 'dgm_gravitation', title: 'Universal gravitation — tap each part',
        sliders: [], hotspots: () => GRAV_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${GRAV_SPOTS[v.sel].label}: ${GRAV_SPOTS[v.sel].fn}` : 'tap a part of the pull' },
    dgm_taxonomy: { kind: 'scene', scene: 'dgm_taxonomy', title: 'The seven ranks — tap each level',
        sliders: [], hotspots: () => TAX_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${TAX_SPOTS[v.sel].label}: ${TAX_SPOTS[v.sel].fn}` : 'tap a rank' },
    dgm_moment_inertia: { kind: 'scene', scene: 'dgm_moment_inertia', title: 'Moment of inertia — tap each shape',
        sliders: [], hotspots: () => MI_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${MI_SPOTS[v.sel].label}: ${MI_SPOTS[v.sel].fn}` : 'tap a shape' },
    dgm_maxwell: { kind: 'scene', scene: 'dgm_maxwell', title: 'Speed distribution — tap each curve',
        sliders: [], hotspots: () => MB_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${MB_SPOTS[v.sel].label}: ${MB_SPOTS[v.sel].fn}` : 'tap a part of the curve' },
    dgm_hydrogen_isotopes: { kind: 'scene', scene: 'dgm_hydrogen_isotopes', title: 'The three isotopes — tap each',
        sliders: [], hotspots: () => ISO_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${ISO_SPOTS[v.sel].label}: ${ISO_SPOTS[v.sel].fn}` : 'tap an isotope' },
    dgm_puberty: { kind: 'scene', scene: 'dgm_puberty', title: 'The growth spurt — tap each curve',
        sliders: [], hotspots: () => PUB_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${PUB_SPOTS[v.sel].label}: ${PUB_SPOTS[v.sel].fn}` : 'tap a part of the graph' },
    dgm_stem_cell: { kind: 'scene', scene: 'dgm_stem_cell', title: 'The stem cell — tap each fate',
        sliders: [], hotspots: () => STEM_SPOTS.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
        output: v => (v.sel ?? -1) >= 0 ? `${STEM_SPOTS[v.sel].label}: ${STEM_SPOTS[v.sel].fn}` : 'tap a cell fate' },
    ...Object.fromEntries(([
        ['dgm_potentiometer', POT_SPOTS, 'The potentiometer — tap each part'],
        ['dgm_galvanometer_conv', GALV_SPOTS, 'Galvanometer conversions — tap each part'],
        ['dgm_lcr_resonance', LCR_SPOTS, 'The resonance curve — tap each part'],
        ['dgm_transformer', TRF_SPOTS, 'The transformer — tap each part'],
        ['dgm_zener', ZNR_SPOTS, 'The zener I-V — tap each region'],
        ['dgm_banked_road', BANK_SPOTS, 'The banked road — tap each force'],
        ['dgm_pipe_harmonics', PIPE_SPOTS, 'Pipes and harmonics — tap each'],
        ['dgm_sound_wave', SND_SPOTS, 'Sound as compressions — tap each part'],
        ['dgm_dc_motor', MOT_SPOTS, 'The DC motor — tap each part'],
        ['dgm_born_haber', BH_SPOTS, 'Born–Haber cycle — tap each step'],
        ['dgm_sigma_pi', SP_SPOTS, 'σ vs π overlap — tap each bond'],
        ['dgm_phase_diagram', PD_SPOTS, 'The phase diagram — tap each region'],
        ['dgm_action_potential', AP_SPOTS, 'The spike — tap each phase'],
        ['dgm_germination', GERM_SPOTS, 'Germination — tap each stage'],
        ['dgm_virus', VIR_SPOTS, 'Bacteriophage anatomy — tap each part'],
        ['dgm_isomers', ISO2_SPOTS, 'Isomers — tap each skeleton'],
    ] as Array<[string, Array<{ label: string; fn: string; x: number; y: number; r: number }>, string]>).map(([k, spots, ttl]) => {
        const spec: LabSpec = {
            kind: 'scene', scene: k, title: ttl,
            sliders: [],
            hotspots: () => spots.map(s => ({ id: s.label, label: s.label, fn: s.fn, x: s.x, y: s.y, r: s.r })),
            output: v => (v.sel ?? -1) >= 0 ? `${spots[v.sel].label}: ${spots[v.sel].fn}` : 'tap a part',
        };
        return [k, spec] as [string, LabSpec];
    })),
    // image-backed diagram labs — auto-registered from DIAGRAMS registry
    // (key = dgm_<slug>; a sim mounts one via widget: 'dgm_c6_flower_parts')
    ...Object.fromEntries(Object.entries(DIAGRAMS).map(([slug, d]) => [`dgm_${slug}`, {
        kind: 'scene' as const, scene: `dgm_${slug}`, image: d.image, credit: d.credit,
        title: d.title,
        sliders: [] as LabSlider[],
        hotspots: () => d.parts.map(p => ({ id: p.id, label: p.label, fn: p.fn, x: p.x, y: p.y, r: p.r })),
        output: (v: Record<string, number>) => (v.sel ?? -1) >= 0
            ? `${d.parts[v.sel].label}: ${d.parts[v.sel].fn}` : 'tap a labeled part to learn it',
    }])),
    demograph: { kind: 'scene', scene: 'demograph', title: 'Shape the population pyramid',
        sliders: [{ id: 'shape', label: 'Age mix', emoji: '👪', min: 0, max: 100, start: 20 }],
        trace: { label: 'dependency ratio', fn: v => (function(){const sh=(v.shape??20)/100;const W=[0,1,2,3,4,5].map(i=>Math.min(1,Math.max(0,1-i*0.35)*(1-sh)+Math.max(0,1-Math.abs(i-2.5)/3)*sh*0.9+(i>=4?sh*(i-3)*0.5:0)+0.06));return Math.round((W[0]+W[1]*0.5+W[4]+W[5])/Math.max(0.3,W[1]*0.5+W[2]+W[3])*100)})(), max: 120 },
        draggable: () => 'shape',
        output: v => (v.shape ?? 20) > 55 ? 'aging structure — workers strained' : (v.shape ?? 20) > 35 ? 'demographic dividend window' : 'young expansive pyramid' },
};
