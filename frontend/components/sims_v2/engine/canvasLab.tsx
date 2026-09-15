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
function paintTimeline(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
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
            ctx.fillText(`event ${i + 1}`, x, ty - 16);
        }
    });
    // the scrubber
    const sx = w * 0.06 + pos * w * 0.88;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.moveTo(sx, ty - 22); ctx.lineTo(sx - 7, ty - 34); ctx.lineTo(sx + 7, ty - 34); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`you are here — ${Math.round(pos * 100)}% through the timeline`, sx, ty - 40);
}
function paintFlow(ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>) {
    const step = Math.min(5, Math.max(0, Math.floor((v.stage ?? 0) / 20)));
    ctx.clearRect(0, 0, w, h);
    sceneBg(ctx, w, h, 'light');
    const labels = ['start', 'stage 1', 'stage 2', 'stage 3', 'stage 4', 'done'];
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

type ScenePainter = (ctx: CanvasRenderingContext2D, w: number, h: number, v: Record<string, number>, t: number) => void;
const SCENES: Record<string, ScenePainter> = {
    heart: paintHeart, circuit: paintCircuit, cell: paintCell, nephron: paintNephron,
    atom: paintAtom, prism: paintPrism, projectile: paintProjectile, pendulum: paintPendulum,
    mitosis: paintMitosis,
    efield: paintEfield, lens: paintLens, wave: paintWave, graph: paintGraph, gas: paintGas,
    titrate: paintTitrate, emag: paintEmag, vector: paintVector, equilibrium: paintEquil,
    timeline: paintTimeline, flow: paintFlow,
    dna: paintDNA, supply: paintSupply, reflex: paintReflex, digest: paintDigest,
    ph: paintPH, moon: paintMoon, spectrum: paintSpectrum, conic: paintConic,
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
        if (spec.kind === 'scene' && spec.scene && SCENES[spec.scene]) {
            let raf = 0;
            const loop = (t: number) => {
                SCENES[spec.scene!](ctx, c.width, c.height, vals, t);
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

    const dark = spec.kind === 'scene' || has3d;
    return (
        <div className={`w-full rounded-3xl p-3 ${dark ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 shadow-[0_12px_40px_-8px_rgba(79,70,229,0.45)]' : ''}`}>
            <div className={`text-center text-sm font-black mb-2 tracking-wide ${dark ? 'text-sky-200 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'text-slate-700'}`}>
                {spec.title}
            </div>
            <div className={`relative rounded-2xl overflow-hidden ${dark ? 'ring-1 ring-sky-400/30 shadow-inner' : ''}`}>
                {has3d
                    ? <div className="w-full h-[240px]"><Lab3DBoundary onFail={() => setThreeFailed(true)}><Lab3D scene={scene3d} vals={vals} labels={labels} /></Lab3DBoundary></div>
                    : <canvas ref={ref} width={360} height={200} className={`w-full ${dark ? '' : 'rounded-2xl bg-sky-50 border-2 border-slate-200'}`} />}
                {dark && <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/30 to-transparent" />}
            </div>
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
        output: v => `Water: ${v.fill}` },
    grow: { kind: 'grow', title: 'Grow the plant!',
        sliders: [{ id: 'sun', label: 'Sun', emoji: '☀️', min: 0, max: 100, start: 0 },
                  { id: 'water', label: 'Water', emoji: '💧', min: 0, max: 100, start: 0 }],
        output: v => `Growth: ${Math.min(100, Math.round((v.sun + v.water) / 2))}%` },
    stretch: { kind: 'stretch', title: 'Measure the bar!', unit: 'cm',
        sliders: [{ id: 'length', label: 'Tape', emoji: '📏', min: 0, max: 100, start: 0 }],
        output: v => `Tape shows: ${Math.round(v.length / 10)}` },
    jump: { kind: 'jump', title: 'Hop the number line!',
        sliders: [{ id: 'pos', label: 'Frog', emoji: '🐸', min: 0, max: 10, start: 0 }],
        output: v => `Frog is on: ${v.pos}` },
    balance: { kind: 'balance', title: 'Balance the scale!',
        sliders: [{ id: 'left', label: 'Left', emoji: '⬅️', min: 0, max: 10, start: 0 },
                  { id: 'right', label: 'Right', emoji: '➡️', min: 0, max: 10, start: 0 }],
        output: v => v.left === v.right && v.left > 0 ? 'BALANCED! ⚖️' : v.left > v.right ? 'Left is heavier' : 'Right is heavier' },
    fraction: { kind: 'fraction', title: 'Cut and shade the fraction!',
        sliders: [{ id: 'parts', label: 'Parts', emoji: '🍕', min: 2, max: 8, start: 4 },
                  { id: 'shaded', label: 'Shaded', emoji: '🖍️', min: 0, max: 8, start: 1 }],
        output: v => `${Math.min(v.shaded, v.parts)} / ${Math.max(2, v.parts)}` },
    cycle: { kind: 'cycle', title: 'Make it rain!',
        sliders: [{ id: 'heat', label: 'Sun heat', emoji: '☀️', min: 0, max: 100, start: 0 },
                  { id: 'time', label: 'Time', emoji: '⏳', min: 0, max: 100, start: 0 }],
        output: v => v.heat > 60 && v.time > 80 ? 'RAINING! 🌧️' : v.heat > 50 ? 'Clouds forming...' : 'Heating up...' },
    orbit: { kind: 'orbit', title: 'Orbit the planets!',
        sliders: [{ id: 'speed', label: 'Speed', emoji: '🚀', min: 0, max: 100, start: 30 }],
        output: v => v.speed > 70 ? 'FAST orbits!' : v.speed > 30 ? 'Steady orbits' : 'Slow drift' },
    weigh: { kind: 'weigh', title: 'Weigh the object!', unit: 'g',
        sliders: [{ id: 'grams', label: 'Weight', emoji: '🏋️', min: 0, max: 100, start: 0 }],
        output: v => `Weight: ${v.grams}` },
    electric: { kind: 'electric', title: 'Light the bulb!',
        sliders: [{ id: 'power', label: 'Power', emoji: '🔋', min: 0, max: 100, start: 0 }],
        output: v => v.power > 50 ? 'LIT! 💡' : 'Not enough power' },
    // ─── bespoke senior scenes ───────────────────────────────
    heart: { kind: 'scene', scene: 'heart', title: 'The beating heart — watch the ECG!',
        sliders: [{ id: 'rate', label: 'Heart rate', emoji: '❤️', min: 40, max: 160, start: 70 }],
        output: v => `Pulse: ${v.rate} bpm` },
    circuit: { kind: 'scene', scene: 'circuit', title: 'Build the circuit!',
        sliders: [{ id: 'switch', label: 'Switch', emoji: '🎛️', min: 0, max: 1, start: 0 },
                  { id: 'voltage', label: 'Voltage', emoji: '🔋', min: 0, max: 100, start: 50 }],
        output: v => (v.switch ?? 0) > 0 ? `Current: ${v.voltage} (bulb ${v.voltage > 40 ? 'BRIGHT' : 'dim'})` : 'Circuit open — flip the switch!' },
    cell: { kind: 'scene', scene: 'cell', title: 'Inside the cell!',
        sliders: [{ id: 'zoom', label: 'Zoom', emoji: '🔬', min: 0, max: 100, start: 30 }],
        output: v => v.zoom > 60 ? 'Chloroplasts visible — plant cell!' : 'Zoom in to see organelles' },
    nephron: { kind: 'scene', scene: 'nephron', title: 'The nephron filters blood!',
        sliders: [{ id: 'flow', label: 'Filtration', emoji: '💧', min: 0, max: 100, start: 50 }],
        output: v => `Filtration rate: ${v.flow}%` },
    atom: { kind: 'scene', scene: 'atom', title: 'Electrons orbiting the nucleus!',
        sliders: [{ id: 'electrons', label: 'Electrons', emoji: '⚛️', min: 0, max: 9, start: 3 }],
        output: v => `${v.electrons} electron(s) in shells` },
    prism: { kind: 'scene', scene: 'prism', title: 'Split white light into the spectrum!',
        sliders: [{ id: 'angle', label: 'Spread', emoji: '🌈', min: 20, max: 100, start: 60 }],
        output: v => `Dispersion: ${v.angle > 70 ? 'wide spectrum!' : v.angle > 40 ? 'rainbow forming' : 'narrow beam'}` },
    projectile: { kind: 'scene', scene: 'projectile', title: 'Launch the projectile!',
        sliders: [{ id: 'speed', label: 'Speed', emoji: '🚀', min: 0, max: 100, start: 60 },
                  { id: 'angle', label: 'Angle', emoji: '📐', min: 10, max: 80, start: 45 }],
        output: v => `Launch: ${v.angle}° at speed ${v.speed}` },
    pendulum: { kind: 'scene', scene: 'pendulum', title: 'Swing the pendulum!',
        sliders: [{ id: 'length', label: 'Length', emoji: '📏', min: 0, max: 100, start: 50 }],
        output: v => `Period ∝ √length — longer = slower swing` },
    mitosis: { kind: 'scene', scene: 'mitosis', title: 'Watch cell division!',
        sliders: [{ id: 'stage', label: 'Stage', emoji: '🧬', min: 0, max: 99, start: 0 }],
        output: v => `Phase ${Math.floor((v.stage ?? 0) / 25) + 1} of mitosis` },
    // ─── v3 senior scenes ────────────────────────────────────
    efield: { kind: 'scene', scene: 'efield', title: 'Electric charges and fields',
        sliders: [{ id: 'q1', label: 'Charge A', emoji: '⚡', min: 0, max: 100, start: 80 },
                  { id: 'q2', label: 'Charge B', emoji: '⚡', min: 0, max: 100, start: 20 },
                  { id: 'separation', label: 'Distance', emoji: '📏', min: 10, max: 100, start: 60 }],
        output: v => `A ${(v.q1 ?? 50) > 50 ? '+' : '−'} · B ${(v.q2 ?? 50) > 50 ? '+' : '−'} · ${((v.q1 ?? 50) > 50) === ((v.q2 ?? 50) > 50) ? 'repel' : 'attract'}` },
    lens: { kind: 'scene', scene: 'lens', title: 'Convex lens ray diagram',
        sliders: [{ id: 'focal', label: 'Focal len', emoji: '🔍', min: 0, max: 100, start: 50 }],
        output: v => `f = ${(30 + (v.focal ?? 50) * 0.8).toFixed(0)} cm` },
    wave: { kind: 'scene', scene: 'wave', title: 'Wave on a string',
        sliders: [{ id: 'amplitude', label: 'Amplitude', emoji: '🌊', min: 0, max: 100, start: 50 },
                  { id: 'frequency', label: 'Frequency', emoji: '🎵', min: 0, max: 100, start: 40 }],
        output: v => `A=${v.amplitude} · f=${1 + Math.round((v.frequency ?? 50) / 25)} Hz` },
    graph: { kind: 'scene', scene: 'graph', title: 'Line plotter y = mx + c',
        sliders: [{ id: 'slope', label: 'Slope m', emoji: '📈', min: 0, max: 100, start: 62 },
                  { id: 'intercept', label: 'c', emoji: '📍', min: 0, max: 100, start: 50 }],
        output: v => `y = ${((v.slope ?? 50) / 25 - 2).toFixed(1)}x ${(v.intercept ?? 50) / 12.5 - 4 >= 0 ? '+' : '−'} ${Math.abs((v.intercept ?? 50) / 12.5 - 4).toFixed(1)}` },
    gas: { kind: 'scene', scene: 'gas', title: 'Gas particles under pressure',
        sliders: [{ id: 'temperature', label: 'Temp', emoji: '🌡️', min: 0, max: 100, start: 50 },
                  { id: 'compression', label: 'Piston', emoji: '🔧', min: 0, max: 100, start: 20 }],
        output: v => `Particles ${v.temperature > 70 ? 'racing' : 'drifting'} · volume ${100 - (v.compression ?? 0)}%` },
    titrate: { kind: 'scene', scene: 'titrate', title: 'Acid–base titration',
        sliders: [{ id: 'drops', label: 'Titrant', emoji: '💧', min: 0, max: 100, start: 0 }],
        output: v => { const d = (v.drops ?? 0) / 100; const pH = d < 0.45 ? 2 + d * 8 : d < 0.55 ? 7 : 7 + (d - 0.55) * 18; return `pH ≈ ${pH.toFixed(1)}`; } },
    emag: { kind: 'scene', scene: 'emag', title: 'Electromagnetic induction',
        sliders: [{ id: 'speed', label: 'Magnet speed', emoji: '🧲', min: 0, max: 100, start: 50 },
                  { id: 'turns', label: 'Coil turns', emoji: '🌀', min: 0, max: 100, start: 40 }],
        output: v => `EMF ∝ rate of flux change · ${3 + Math.round((v.turns ?? 50) / 20)} turns` },
    vector: { kind: 'scene', scene: 'vector', title: 'Vector addition a + b',
        sliders: [{ id: 'ax', label: 'a.x', emoji: '↔️', min: 0, max: 100, start: 60 },
                  { id: 'ay', label: 'a.y', emoji: '↕️', min: 0, max: 100, start: 50 },
                  { id: 'bx', label: 'b.x', emoji: '↔️', min: 0, max: 100, start: 40 },
                  { id: 'by', label: 'b.y', emoji: '↕️', min: 0, max: 100, start: 60 }],
        output: v => `a+b = (${(((v.ax ?? 60) / 12 - 5) + ((v.bx ?? 40) / 12 - 4)).toFixed(0)}, ${(((v.ay ?? 50) / 12 - 4) + ((v.by ?? 60) / 12 - 5)).toFixed(0)})` },
    equilibrium: { kind: 'scene', scene: 'equilibrium', title: 'Dynamic equilibrium A ⇌ B',
        sliders: [{ id: 'concentration', label: 'Add reactant', emoji: '⚗️', min: 0, max: 100, start: 30 }],
        output: v => `Products: ${Math.round(24 * (v.concentration ?? 50) / 100)}/24 — Le Chatelier in action` },
    timeline: { kind: 'scene', scene: 'timeline', title: 'Scrub through the era',
        sliders: [{ id: 'year', label: 'Time', emoji: '📜', min: 0, max: 100, start: 0 }],
        output: v => `Era position: ${v.year}%` },
    flow: { kind: 'scene', scene: 'flow', title: 'Walk the process',
        sliders: [{ id: 'stage', label: 'Stage', emoji: '🔁', min: 0, max: 100, start: 0 }],
        output: v => `Stage ${Math.min(5, Math.floor((v.stage ?? 0) / 20))}/5` },
    dna: { kind: 'scene', scene: 'dna', title: 'Unzip the double helix',
        sliders: [{ id: 'unzip', label: 'Helicase', emoji: '✂️', min: 0, max: 100, start: 0 }],
        output: v => (v.unzip ?? 0) > 60 ? 'Strands separated — replication can begin' : 'Double helix — A·T, G·C pairs' },
    supply: { kind: 'scene', scene: 'supply', title: 'Move supply & demand',
        sliders: [{ id: 'supply', label: 'Supply', emoji: '📦', min: 0, max: 100, start: 50 },
                  { id: 'demand', label: 'Demand', emoji: '🛒', min: 0, max: 100, start: 50 }],
        output: () => 'Find where the curves cross — that is equilibrium' },
    reflex: { kind: 'scene', scene: 'reflex', title: 'Fire the reflex arc',
        sliders: [{ id: 'speed', label: 'Signal speed', emoji: '⚡', min: 0, max: 100, start: 50 }],
        output: () => 'Stimulus → receptor → cord → muscle' },
    digest: { kind: 'scene', scene: 'digest', title: 'Push food through the tract',
        sliders: [{ id: 'progress', label: 'Food journey', emoji: '🍎', min: 0, max: 100, start: 0 }],
        output: v => (v.progress ?? 0) < 30 ? 'Early digestion' : (v.progress ?? 0) < 70 ? 'Nutrient absorption' : 'Waste formation' },
    ph: { kind: 'scene', scene: 'ph', title: 'Probe the pH scale',
        sliders: [{ id: 'probe', label: 'Probe', emoji: '🥼', min: 0, max: 100, start: 50 }],
        output: v => `pH ${((v.probe ?? 50) / 100 * 14).toFixed(1)}` },
    moon: { kind: 'scene', scene: 'moon', title: 'Sweep the moon phases',
        sliders: [{ id: 'phase', label: 'Phase', emoji: '🌙', min: 0, max: 100, start: 0 }],
        output: v => ['new moon', 'crescent', 'quarter', 'gibbous', 'full moon'][Math.min(4, Math.floor((v.phase ?? 0) / 20))] },
    spectrum: { kind: 'scene', scene: 'spectrum', title: 'Scan the EM spectrum',
        sliders: [{ id: 'band', label: 'Band', emoji: '📡', min: 0, max: 100, start: 40 }],
        output: () => 'Energy rises toward gamma →' },
    conic: { kind: 'scene', scene: 'conic', title: 'Slice the double cone',
        sliders: [{ id: 'tilt', label: 'Plane tilt', emoji: '✂️', min: 0, max: 100, start: 20 }],
        output: v => ['circle', 'ellipse', 'parabola', 'hyperbola'][Math.min(3, Math.floor((v.tilt ?? 20) / 25))] },
    molecule: { kind: 'scene', scene: 'molecule', title: 'Build the molecule — atoms bond in 3D',
        sliders: [{ id: 'atoms', label: 'Atoms', emoji: '⚛️', min: 2, max: 8, start: 4 }],
        output: v => `${v.atoms} atoms in the chain` },
    solid: { kind: 'scene', scene: 'solid', title: 'Cylinder — radius and height in 3D',
        sliders: [{ id: 'radius', label: 'Radius', emoji: '⭕', min: 0, max: 100, start: 50 },
                  { id: 'height', label: 'Height', emoji: '📏', min: 0, max: 100, start: 50 }],
        output: v => `V = πr²h` },
    unitcircle: { kind: 'scene', scene: 'unitcircle', title: 'The unit circle — sin and cos live',
        sliders: [{ id: 'angle', label: 'Angle', emoji: '📐', min: 0, max: 100, start: 25 }],
        output: v => `θ = ${Math.round((v.angle ?? 25) / 100 * 360)}°` },
    globe: { kind: 'scene', scene: 'globe', title: 'The tilted Earth — why seasons happen',
        sliders: [{ id: 'tilt', label: 'Axis tilt', emoji: '🌍', min: 0, max: 100, start: 50 }],
        output: v => `tilt = ${Math.round(((v.tilt ?? 50) / 100 - 0.5) * 52)}°` },
};
