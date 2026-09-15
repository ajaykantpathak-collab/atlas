/**
 * SceneRenderer — Parallax scene backgrounds with state-reactive layers
 *
 * UPGRADE 7: State-reactive scene layers
 * - Sky gradient changes with time-of-day (dawn → noon → dusk → night)
 * - Sun/moon moves across the sky as challenges progress
 * - Clouds drift with parallax
 * - Background elements react to correct/wrong answers
 * - Scene pulses on correct, shakes on wrong
 * - Story beats change the scene mood
 *
 * UPGRADE 6: Shared SVG design system
 * - All scenes use a consistent visual language
 * - Theme-based rendering (orchard, classroom, lab, etc.)
 * - Reusable element library
 */

import * as PIXI from 'pixi.js';
import { drawStar } from '../pixi-utils';
import type { SceneTheme } from '../types';

interface SceneElement {
  sprite: PIXI.Graphics | PIXI.Container;
  parallaxSpeed: number;
  animationType: 'drift' | 'sway' | 'rotate' | 'pulse' | 'float' | 'none';
  animSpeed: number;
  baseX: number;
  baseY: number;
  phase: number;
}

export class SceneRenderer {
  private container: PIXI.Container;
  private theme: SceneTheme;
  private width: number;
  private height: number;

  private skyGradient: PIXI.Graphics;
  private celestialBody: PIXI.Graphics;
  private celestialGlow: PIXI.Graphics;
  private cloudLayer: PIXI.Container;
  private backgroundLayer: PIXI.Container;
  private midgroundLayer: PIXI.Container;
  private groundLayer: PIXI.Graphics;
  private foregroundLayer: PIXI.Container;

  private elements: SceneElement[] = [];
  private timeOfDay: number = 0.15;
  private shakeOffset: { x: number; y: number } = { x: 0, y: 0 };
  private shakeDuration: number = 0;
  private pulseScale: number = 1;
  private pulseDuration: number = 0;
  private mood: string = '';
  private storyBeat: string = '';

  constructor(container: PIXI.Container, theme: SceneTheme, width: number, height: number) {
    this.container = container;
    this.theme = theme;
    this.width = width;
    this.height = height;

    // Create layers
    this.skyGradient = new PIXI.Graphics();
    this.celestialGlow = new PIXI.Graphics();
    this.celestialBody = new PIXI.Graphics();
    this.cloudLayer = new PIXI.Container();
    this.backgroundLayer = new PIXI.Container();
    this.midgroundLayer = new PIXI.Container();
    this.groundLayer = new PIXI.Graphics();
    this.foregroundLayer = new PIXI.Container();

    container.addChild(
      this.skyGradient,
      this.celestialGlow,
      this.celestialBody,
      this.cloudLayer,
      this.backgroundLayer,
      this.midgroundLayer,
      this.groundLayer,
      this.foregroundLayer,
    );

    this.buildScene();
    this.updateTimeOfDay();
  }

  // ─── Scene Building ─────────────────────────────────────────

  private buildScene(): void {
    this.drawSky();
    this.drawCelestialBody();
    this.drawClouds();
    this.drawBackground();
    this.drawMidground();
    this.drawGround();
    this.drawForeground();
  }

  private drawSky(): void {
    this.skyGradient.clear();
    const colors = this.getSkyColors(this.timeOfDay);
    // Draw gradient as horizontal strips
    const strips = 40;
    for (let i = 0; i < strips; i++) {
      const t = i / strips;
      const color = this.interpolateColor(colors.top, colors.bottom, t);
      this.skyGradient.beginFill(color);
      this.skyGradient.drawRect(0, (this.height * 0.7 * i) / strips, this.width, this.height * 0.7 / strips + 1);
      this.skyGradient.endFill();
    }
  }

  private drawCelestialBody(): void {
    this.celestialBody.clear();
    this.celestialGlow.clear();

    const isNight = this.timeOfDay > 0.75;
    const x = this.width * this.timeOfDay;
    const y = this.height * 0.15 + Math.sin(this.timeOfDay * Math.PI) * -50 + 80;

    const color = isNight ? 0xf0f0f0 : 0xffd700;
    const glowColor = isNight ? 0xe0e0ff : 0xffe066;

    // Glow
    this.celestialGlow.beginFill(glowColor, 0.2);
    this.celestialGlow.drawCircle(x, y, 40);
    this.celestialGlow.endFill();
    this.celestialGlow.beginFill(glowColor, 0.1);
    this.celestialGlow.drawCircle(x, y, 60);
    this.celestialGlow.endFill();

    // Body
    this.celestialBody.beginFill(color);
    this.celestialBody.drawCircle(x, y, 22);
    this.celestialBody.endFill();

    if (isNight) {
      // Moon craters
      this.celestialBody.beginFill(0xcccccc, 0.5);
      this.celestialBody.drawCircle(x - 8, y - 5, 4);
      this.celestialBody.drawCircle(x + 6, y + 8, 3);
      this.celestialBody.drawCircle(x + 3, y - 10, 2);
      this.celestialBody.endFill();
    } else {
      // Sun rays
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = x + Math.cos(angle) * 28;
        const y1 = y + Math.sin(angle) * 28;
        const x2 = x + Math.cos(angle) * 38;
        const y2 = y + Math.sin(angle) * 38;
        this.celestialBody.lineStyle(3, color, 0.6);
        this.celestialBody.moveTo(x1, y1);
        this.celestialBody.lineTo(x2, y2);
      }
    }
  }

  private drawClouds(): void {
    this.cloudLayer.removeChildren();
    const cloudCount = 4;
    for (let i = 0; i < cloudCount; i++) {
      const cloud = new PIXI.Graphics();
      const cx = (i / cloudCount) * this.width + Math.random() * 100;
      const cy = 40 + Math.random() * 60;
      const scale = 0.6 + Math.random() * 0.6;

      cloud.beginFill(0xffffff, 0.7);
      cloud.drawEllipse(0, 0, 30 * scale, 15 * scale);
      cloud.drawEllipse(-20 * scale, 5, 20 * scale, 12 * scale);
      cloud.drawEllipse(20 * scale, 5, 22 * scale, 13 * scale);
      cloud.endFill();
      cloud.x = cx;
      cloud.y = cy;

      this.cloudLayer.addChild(cloud);
      this.elements.push({
        sprite: cloud,
        parallaxSpeed: 0.1,
        animationType: 'drift',
        animSpeed: 5 + Math.random() * 10,
        baseX: cx,
        baseY: cy,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  private drawBackground(): void {
    this.backgroundLayer.removeChildren();
    const themeElements = this.getThemeBackgroundElements();

    for (const el of themeElements) {
      const g = new PIXI.Graphics();
      this.drawThemeElement(g, el.kind, el.color || 0x88aa88, el.size || 40);
      g.x = el.x;
      g.y = el.y;
      this.backgroundLayer.addChild(g);

      this.elements.push({
        sprite: g,
        parallaxSpeed: 0.2,
        animationType: el.animation || 'sway',
        animSpeed: el.animSpeed || 2,
        baseX: el.x,
        baseY: el.y,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  private drawMidground(): void {
    this.midgroundLayer.removeChildren();
    const elements = this.getThemeMidgroundElements();

    for (const el of elements) {
      const g = new PIXI.Graphics();
      this.drawThemeElement(g, el.kind, el.color || 0x66aa66, el.size || 60);
      g.x = el.x;
      g.y = el.y;
      this.midgroundLayer.addChild(g);

      this.elements.push({
        sprite: g,
        parallaxSpeed: 0.4,
        animationType: el.animation || 'sway',
        animSpeed: el.animSpeed || 1.5,
        baseX: el.x,
        baseY: el.y,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  private drawGround(): void {
    this.groundLayer.clear();
    const groundColor = this.getGroundColor();
    const groundY = this.height * 0.7;

    this.groundLayer.beginFill(groundColor);
    this.groundLayer.drawRect(0, groundY, this.width, this.height - groundY);
    this.groundLayer.endFill();

    // Grass texture
    this.groundLayer.beginFill(this.darkenColor(groundColor, 0.85), 0.3);
    for (let x = 0; x < this.width; x += 8) {
      const h = 3 + Math.random() * 5;
      this.groundLayer.drawRect(x, groundY, 2, h);
    }
    this.groundLayer.endFill();
  }

  private drawForeground(): void {
    this.foregroundLayer.removeChildren();
    const elements = this.getThemeForegroundElements();

    for (const el of elements) {
      const g = new PIXI.Graphics();
      this.drawThemeElement(g, el.kind, el.color || 0x448844, el.size || 80);
      g.x = el.x;
      g.y = el.y;
      this.foregroundLayer.addChild(g);

      this.elements.push({
        sprite: g,
        parallaxSpeed: 0.6,
        animationType: el.animation || 'sway',
        animSpeed: el.animSpeed || 1,
        baseX: el.x,
        baseY: el.y,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // ─── Theme Elements ─────────────────────────────────────────

  private getThemeBackgroundElements(): SceneElementSpec[] {
    switch (this.theme) {
      case 'orchard':
        return [
          { kind: 'hill', x: 100, y: this.height * 0.55, size: 120, color: 0x6aa84f, animation: 'none' },
          { kind: 'hill', x: 400, y: this.height * 0.58, size: 100, color: 0x6aa84f, animation: 'none' },
          { kind: 'hill', x: 600, y: this.height * 0.52, size: 140, color: 0x5a9840, animation: 'none' },
        ];
      case 'classroom':
        return [
          { kind: 'building', x: 50, y: this.height * 0.5, size: 100, color: 0xd4c5a0, animation: 'none' },
          { kind: 'building', x: 550, y: this.height * 0.52, size: 120, color: 0xc4b590, animation: 'none' },
        ];
      case 'space':
        return [
          { kind: 'star', x: 80, y: 80, size: 4, color: 0xffffff, animation: 'pulse', animSpeed: 2 },
          { kind: 'star', x: 200, y: 120, size: 3, color: 0xffffe0, animation: 'pulse', animSpeed: 1.5 },
          { kind: 'star', x: 500, y: 60, size: 5, color: 0xffffff, animation: 'pulse', animSpeed: 2.5 },
          { kind: 'star', x: 650, y: 150, size: 3, color: 0xe0e0ff, animation: 'pulse', animSpeed: 1.8 },
          { kind: 'star', x: 350, y: 200, size: 4, color: 0xffffe0, animation: 'pulse', animSpeed: 2.2 },
        ];
      case 'ocean':
        return [
          { kind: 'wave', x: 0, y: this.height * 0.55, size: 200, color: 0x4a90d9, animation: 'sway', animSpeed: 1.5 },
          { kind: 'wave', x: 400, y: this.height * 0.58, size: 180, color: 0x3a80c9, animation: 'sway', animSpeed: 1.2 },
        ];
      default:
        return [
          { kind: 'hill', x: 150, y: this.height * 0.55, size: 100, color: 0x88aa88, animation: 'none' },
          { kind: 'hill', x: 500, y: this.height * 0.58, size: 120, color: 0x789878, animation: 'none' },
        ];
    }
  }

  private getThemeMidgroundElements(): SceneElementSpec[] {
    switch (this.theme) {
      case 'orchard':
        return [
          { kind: 'tree', x: 80, y: this.height * 0.65, size: 70, color: 0x4a8b3a, animation: 'sway', animSpeed: 1.5 },
          { kind: 'tree', x: 250, y: this.height * 0.68, size: 60, color: 0x5a9b4a, animation: 'sway', animSpeed: 1.2 },
          { kind: 'tree', x: 550, y: this.height * 0.66, size: 75, color: 0x4a8b3a, animation: 'sway', animSpeed: 1.8 },
          { kind: 'tree', x: 650, y: this.height * 0.7, size: 55, color: 0x5a9b4a, animation: 'sway', animSpeed: 1.4 },
        ];
      case 'garden':
        return [
          { kind: 'flower', x: 100, y: this.height * 0.68, size: 30, color: 0xff69b4, animation: 'sway', animSpeed: 2 },
          { kind: 'flower', x: 250, y: this.height * 0.72, size: 25, color: 0xffd700, animation: 'sway', animSpeed: 1.5 },
          { kind: 'flower', x: 450, y: this.height * 0.69, size: 28, color: 0xff6347, animation: 'sway', animSpeed: 1.8 },
          { kind: 'flower', x: 600, y: this.height * 0.71, size: 32, color: 0xda70d6, animation: 'sway', animSpeed: 2.2 },
        ];
      case 'zoo':
        return [
          { kind: 'tree', x: 80, y: this.height * 0.65, size: 70, color: 0x4a8b3a, animation: 'sway', animSpeed: 1.5 },
          { kind: 'cage', x: 300, y: this.height * 0.65, size: 80, color: 0x8a7a6a, animation: 'none' },
          { kind: 'tree', x: 550, y: this.height * 0.68, size: 65, color: 0x5a9b4a, animation: 'sway', animSpeed: 1.3 },
        ];
      default:
        return [
          { kind: 'tree', x: 100, y: this.height * 0.65, size: 60, color: 0x4a8b3a, animation: 'sway', animSpeed: 1.5 },
          { kind: 'tree', x: 600, y: this.height * 0.68, size: 65, color: 0x5a9b4a, animation: 'sway', animSpeed: 1.3 },
        ];
    }
  }

  private getThemeForegroundElements(): SceneElementSpec[] {
    switch (this.theme) {
      case 'orchard':
        return [
          { kind: 'bush', x: 50, y: this.height * 0.78, size: 40, color: 0x3a7b2a, animation: 'sway', animSpeed: 1 },
          { kind: 'bush', x: 680, y: this.height * 0.79, size: 45, color: 0x3a7b2a, animation: 'sway', animSpeed: 1.2 },
        ];
      default:
        return [
          { kind: 'bush', x: 30, y: this.height * 0.78, size: 35, color: 0x3a7b2a, animation: 'sway', animSpeed: 1 },
          { kind: 'bush', x: 690, y: this.height * 0.79, size: 40, color: 0x3a7b2a, animation: 'sway', animSpeed: 1.1 },
        ];
    }
  }

  private drawThemeElement(g: PIXI.Graphics, kind: string, color: number, size: number): void {
    switch (kind) {
      case 'tree':
        // Trunk
        g.beginFill(0x8b4513);
        g.drawRect(-size * 0.1, 0, size * 0.2, size * 0.5);
        g.endFill();
        // Foliage
        g.beginFill(color);
        g.drawCircle(0, -size * 0.2, size * 0.5);
        g.drawCircle(-size * 0.3, -size * 0.1, size * 0.35);
        g.drawCircle(size * 0.3, -size * 0.1, size * 0.35);
        g.endFill();
        break;
      case 'hill':
        g.beginFill(color);
        g.drawEllipse(0, 0, size, size * 0.4);
        g.endFill();
        break;
      case 'building':
        g.beginFill(color);
        g.drawRect(-size * 0.3, -size, size * 0.6, size);
        g.endFill();
        // Windows
        g.beginFill(0x4a90d9, 0.6);
        for (let wy = -size * 0.8; wy < -size * 0.1; wy += size * 0.2) {
          for (let wx = -size * 0.2; wx < size * 0.2; wx += size * 0.15) {
            g.drawRect(wx, wy, size * 0.08, size * 0.1);
          }
        }
        g.endFill();
        break;
      case 'flower':
        g.beginFill(color);
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          g.drawCircle(Math.cos(angle) * size * 0.3, Math.sin(angle) * size * 0.3, size * 0.25);
        }
        g.endFill();
        g.beginFill(0xffd700);
        g.drawCircle(0, 0, size * 0.2);
        g.endFill();
        break;
      case 'bush':
        g.beginFill(color);
        g.drawCircle(0, 0, size * 0.5);
        g.drawCircle(-size * 0.3, size * 0.1, size * 0.35);
        g.drawCircle(size * 0.3, size * 0.1, size * 0.35);
        g.endFill();
        break;
      case 'star':
        g.beginFill(color);
        drawStar(g, 0, 0, 4, size, size * 0.4);
        g.endFill();
        break;
      case 'wave':
        g.beginFill(color, 0.5);
        for (let x = -size; x < size; x += 20) {
          g.drawCircle(x, Math.sin(x * 0.05) * 10, 15);
        }
        g.endFill();
        break;
      case 'cage':
        g.beginFill(color);
        g.drawRect(-size * 0.4, -size, size * 0.8, size);
        g.endFill();
        g.beginFill(0x333333, 0.5);
        for (let bx = -size * 0.35; bx < size * 0.35; bx += size * 0.1) {
          g.drawRect(bx, -size * 0.9, size * 0.03, size * 0.8);
        }
        g.endFill();
        break;
      default:
        g.beginFill(color);
        g.drawCircle(0, 0, size * 0.3);
        g.endFill();
    }
  }

  // ─── Color Utilities ────────────────────────────────────────

  private getSkyColors(timeOfDay: number): { top: number; bottom: number } {
    // Dawn: 0.0-0.2, Day: 0.2-0.6, Dusk: 0.6-0.8, Night: 0.8-1.0
    if (timeOfDay < 0.2) {
      // Dawn — pink to light blue
      return { top: 0xff9e7d, bottom: 0xfce4b8 };
    } else if (timeOfDay < 0.6) {
      // Day — light blue to pale
      return { top: 0x87ceeb, bottom: 0xe0f6ff };
    } else if (timeOfDay < 0.8) {
      // Dusk — orange to purple
      return { top: 0xff7e5f, bottom: 0xfeb47b };
    } else {
      // Night — dark blue to dark purple
      return { top: 0x1a1a3e, bottom: 0x2d2d5e };
    }
  }

  private getGroundColor(): number {
    switch (this.theme) {
      case 'orchard':
      case 'garden':
      case 'zoo':
        return 0x5a8b3a;
      case 'classroom':
        return 0xd4c5a0;
      case 'lab':
        return 0xb0bec5;
      case 'body':
        return 0xf0e0d0;
      case 'space':
        return 0x2a2a4e;
      case 'ocean':
        return 0x1a5a9a;
      default:
        return 0x5a8b3a;
    }
  }

  private interpolateColor(c1: number, c2: number, t: number): number {
    const r1 = (c1 >> 16) & 0xff;
    const g1 = (c1 >> 8) & 0xff;
    const b1 = c1 & 0xff;
    const r2 = (c2 >> 16) & 0xff;
    const g2 = (c2 >> 8) & 0xff;
    const b2 = c2 & 0xff;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return (r << 16) | (g << 8) | b;
  }

  private darkenColor(color: number, factor: number): number {
    const r = Math.round(((color >> 16) & 0xff) * factor);
    const g = Math.round(((color >> 8) & 0xff) * factor);
    const b = Math.round((color & 0xff) * factor);
    return (r << 16) | (g << 8) | b;
  }

  // ─── Public API ─────────────────────────────────────────────

  setTimeOfDay(t: number): void {
    this.timeOfDay = Math.max(0, Math.min(1, t));
    this.updateTimeOfDay();
  }

  private updateTimeOfDay(): void {
    this.drawSky();
    this.drawCelestialBody();
  }

  setMood(bgColor: string): void {
    this.mood = bgColor;
    // Could adjust scene tint based on slide bgColor
  }

  setStoryBeat(beat: string): void {
    this.storyBeat = beat;
    // Could change scene elements based on story beat
  }

  shake(): void {
    this.shakeDuration = 0.4;
  }

  pulse(): void {
    this.pulseDuration = 0.3;
    this.pulseScale = 1.05;
  }

  // ─── Update Loop ────────────────────────────────────────────

  update(delta: number): void {
    const dt = delta / 60;
    const time = Date.now() / 1000;

    // Animate elements
    for (const el of this.elements) {
      switch (el.animationType) {
        case 'drift':
          el.sprite.x = el.baseX + Math.sin(time * el.animSpeed * 0.1 + el.phase) * 30;
          break;
        case 'sway':
          el.sprite.rotation = Math.sin(time * el.animSpeed + el.phase) * 0.05;
          break;
        case 'rotate':
          el.sprite.rotation += dt * el.animSpeed;
          break;
        case 'pulse':
          const s = 1 + Math.sin(time * el.animSpeed + el.phase) * 0.2;
          el.sprite.scale.set(s);
          break;
        case 'float':
          el.sprite.y = el.baseY + Math.sin(time * el.animSpeed + el.phase) * 5;
          break;
        case 'none':
        default:
          break;
      }
    }

    // Shake effect
    if (this.shakeDuration > 0) {
      this.shakeDuration -= dt;
      const intensity = this.shakeDuration * 10;
      this.shakeOffset.x = (Math.random() - 0.5) * intensity;
      this.shakeOffset.y = (Math.random() - 0.5) * intensity;
      this.container.x = this.shakeOffset.x;
      this.container.y = this.shakeOffset.y;
    } else if (this.container.x !== 0 || this.container.y !== 0) {
      this.container.x = 0;
      this.container.y = 0;
    }

    // Pulse effect
    if (this.pulseDuration > 0) {
      this.pulseDuration -= dt;
      const t = this.pulseDuration / 0.3;
      const scale = 1 + (this.pulseScale - 1) * t;
      this.container.scale.set(scale);
    } else if (this.container.scale.x !== 1) {
      this.container.scale.set(1);
    }
  }

  // ─── Resize ─────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.buildScene();
  }

  // ─── Cleanup ────────────────────────────────────────────────

  destroy(): void {
    this.elements = [];
    this.container.removeChildren();
  }
}

interface SceneElementSpec {
  kind: string;
  x: number;
  y: number;
  size?: number;
  color?: number;
  animation?: 'drift' | 'sway' | 'rotate' | 'pulse' | 'float' | 'none';
  animSpeed?: number;
}
