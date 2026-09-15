/**
 * Particle System — GPU-accelerated particle effects
 *
 * Powers celebrations, success bursts, error feedback, and ambient particles.
 * Uses PixiJS Graphics for procedural particles — no image assets needed.
 */

import * as PIXI from 'pixi.js';
import { drawStar } from './pixi-utils';

interface Particle {
  sprite: PIXI.Graphics;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  fadeOut: boolean;
}

const CELEBRATION_COLORS = [0xffd700, 0xff6b6b, 0x4ecdc4, 0x95e1d3, 0xf38181, 0xaa96da, 0xfcbad3];
const SUCCESS_COLORS = [0xffd700, 0xffe066, 0xfab005];
const ERROR_COLORS = [0xff6b6b, 0xfa5252];
const HINT_COLORS = [0x74c0fc, 0xa5d8ff];

export class ParticleSystem {
  private container: PIXI.Container;
  private width: number;
  private height: number;
  private particles: Particle[] = [];
  private ambientEnabled = true;
  private ambientTimer = 0;

  constructor(container: PIXI.Container, width: number, height: number) {
    this.container = container;
    this.width = width;
    this.height = height;
  }

  // ─── Celebration Burst ──────────────────────────────────────

  celebration(): void {
    // Big celebration — confetti from top
    for (let i = 0; i < 80; i++) {
      const color = CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)];
      const x = Math.random() * this.width;
      const y = -20;
      this.spawnConfetti(x, y, color, true);
    }
    // Sparkles from center
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const speed = 200 + Math.random() * 200;
      const color = CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)];
      this.spawnSparkle(
        this.width / 2,
        this.height / 2,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        color,
      );
    }
  }

  // ─── Success Burst ──────────────────────────────────────────

  burst(x: number, y: number, type: 'success' | 'error' | 'hint'): void {
    const colors = type === 'success' ? SUCCESS_COLORS : type === 'error' ? ERROR_COLORS : HINT_COLORS;
    const count = type === 'success' ? 20 : type === 'error' ? 12 : 15;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 100 + Math.random() * 150;
      const color = colors[Math.floor(Math.random() * colors.length)];

      if (type === 'success') {
        this.spawnSparkle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color);
      } else if (type === 'error') {
        this.spawnDot(x, y, Math.cos(angle) * speed * 0.5, Math.sin(angle) * speed * 0.5, color);
      } else {
        this.spawnSparkle(x, y, Math.cos(angle) * speed * 0.6, Math.sin(angle) * speed * 0.6, color);
      }
    }
  }

  // ─── Particle Spawners ──────────────────────────────────────

  private spawnSparkle(x: number, y: number, vx: number, vy: number, color: number): void {
    const g = new PIXI.Graphics();
    const size = 4 + Math.random() * 6;
    g.beginFill(color);
    drawStar(g, 0, 0, 5, size, size * 0.4);
    g.endFill();
    g.x = x;
    g.y = y;
    g.alpha = 1;
    this.container.addChild(g);

    this.particles.push({
      sprite: g,
      vx,
      vy,
      life: 0,
      maxLife: 0.8 + Math.random() * 0.4,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 200,
      fadeOut: true,
    });
  }

  private spawnConfetti(x: number, y: number, color: number, big: boolean): void {
    const g = new PIXI.Graphics();
    const w = big ? 6 + Math.random() * 6 : 4 + Math.random() * 4;
    const h = big ? 10 + Math.random() * 8 : 6 + Math.random() * 4;
    g.beginFill(color);
    g.drawRect(-w / 2, -h / 2, w, h);
    g.endFill();
    g.x = x;
    g.y = y;
    g.rotation = Math.random() * Math.PI * 2;
    this.container.addChild(g);

    this.particles.push({
      sprite: g,
      vx: (Math.random() - 0.5) * 100,
      vy: 50 + Math.random() * 100,
      life: 0,
      maxLife: 2 + Math.random() * 1.5,
      rotation: g.rotation,
      rotationSpeed: (Math.random() - 0.5) * 8,
      gravity: 150,
      fadeOut: false,
    });
  }

  private spawnDot(x: number, y: number, vx: number, vy: number, color: number): void {
    const g = new PIXI.Graphics();
    const size = 3 + Math.random() * 4;
    g.beginFill(color);
    g.drawCircle(0, 0, size);
    g.endFill();
    g.x = x;
    g.y = y;
    g.alpha = 0.8;
    this.container.addChild(g);

    this.particles.push({
      sprite: g,
      vx,
      vy,
      life: 0,
      maxLife: 0.5 + Math.random() * 0.3,
      rotation: 0,
      rotationSpeed: 0,
      gravity: 100,
      fadeOut: true,
    });
  }

  // ─── Ambient Particles (background atmosphere) ──────────────

  spawnAmbient(x: number, y: number, color: number): void {
    if (!this.ambientEnabled) return;
    const g = new PIXI.Graphics();
    g.beginFill(color, 0.3);
    g.drawCircle(0, 0, 1.5);
    g.endFill();
    g.x = x;
    g.y = y;
    this.container.addChild(g);

    this.particles.push({
      sprite: g,
      vx: (Math.random() - 0.5) * 20,
      vy: -10 - Math.random() * 20,
      life: 0,
      maxLife: 3 + Math.random() * 2,
      rotation: 0,
      rotationSpeed: 0,
      gravity: -5,
      fadeOut: true,
    });
  }

  // ─── Update Loop ────────────────────────────────────────────

  update(delta: number): void {
    const dt = delta / 60; // normalize to seconds

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += dt;

      if (p.life >= p.maxLife) {
        this.container.removeChild(p.sprite);
        p.sprite.destroy();
        this.particles.splice(i, 1);
        continue;
      }

      // Physics
      p.vy += p.gravity * dt;
      p.sprite.x += p.vx * dt;
      p.sprite.y += p.vy * dt;
      p.rotation += p.rotationSpeed * dt;
      p.sprite.rotation = p.rotation;

      // Fade out
      if (p.fadeOut) {
        const lifeRatio = p.life / p.maxLife;
        p.sprite.alpha = Math.max(0, 1 - lifeRatio);
      }

      // Remove off-screen
      if (p.sprite.y > this.height + 50 || p.sprite.x < -50 || p.sprite.x > this.width + 50) {
        this.container.removeChild(p.sprite);
        p.sprite.destroy();
        this.particles.splice(i, 1);
      }
    }

    // Spawn ambient particles occasionally
    this.ambientTimer += dt;
    if (this.ambientTimer > 0.5) {
      this.ambientTimer = 0;
      if (this.ambientEnabled && this.particles.length < 50) {
        const x = Math.random() * this.width;
        const y = this.height - 20;
        this.spawnAmbient(x, y, 0xffd700);
      }
    }
  }

  // ─── Resize ─────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  setAmbientEnabled(enabled: boolean): void {
    this.ambientEnabled = enabled;
  }

  // ─── Cleanup ────────────────────────────────────────────────

  destroy(): void {
    this.particles.forEach(p => {
      this.container.removeChild(p.sprite);
      p.sprite.destroy();
    });
    this.particles = [];
  }
}
