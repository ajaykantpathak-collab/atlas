/**
 * LivingWorld — PixiJS scene that evolves as the student masters topics.
 *
 * Starts as empty grassland with a single tree.
 * Each mastered topic adds: flowers, animals, buildings, weather effects.
 * Mastery level controls: day/night cycle, season, number of creatures.
 *
 * Usage:
 *   const world = new LivingWorld(app, container, width, height);
 *   world.render(worldState);
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { WorldState, WorldElement } from './types';
import {
  drawGradientBackground,
  drawGrassTexture,
  drawTree,
  drawFlower,
  drawCloud,
  drawSun,
  drawStar,
} from '../VisualUtils';
import { AssetLoader } from '../AssetLoader';

export class LivingWorld {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private width: number;
  private height: number;
  private elements: PIXI.DisplayObject[] = [];
  private animationTweens: gsap.core.Tween[] = [];

  constructor(app: PIXI.Application, container: PIXI.Container, width: number, height: number) {
    this.app = app;
    this.container = container;
    this.width = width;
    this.height = height;
  }

  /**
   * Render the world based on the current world state.
   */
  render(state: WorldState): void {
    this.clear();
    const cx = this.width / 2;

    // ─── Background (sky gradient based on time of day) ───
    const bg = new PIXI.Graphics();
    let topColor = 0x93c5fd;
    let bottomColor = 0xbfdbfe;

    switch (state.timeOfDay) {
      case 'dawn':
        topColor = 0xfe9ca7;
        bottomColor = 0xfec89b;
        break;
      case 'day':
        topColor = 0x93c5fd;
        bottomColor = 0xbfdbfe;
        break;
      case 'dusk':
        topColor = 0xf97316;
        bottomColor = 0xfbbf24;
        break;
      case 'night':
        topColor = 0x1e1b4b;
        bottomColor = 0x312e81;
        break;
    }

    drawGradientBackground(bg, this.width, this.height, topColor, bottomColor);
    this.container.addChild(bg);
    this.elements.push(bg);

    // ─── Ground ────────────────────────────────────────────
    const groundColor = state.season === 'winter' ? 0xe5e7eb : state.season === 'autumn' ? 0xd4a373 : 0x86efac;
    const ground = new PIXI.Graphics();
    ground.beginFill(groundColor, 0.5);
    ground.drawRect(0, this.height - 150, this.width, 150);
    ground.endFill();
    this.container.addChild(ground);
    this.elements.push(ground);

    if (state.season !== 'winter') {
      const grass = new PIXI.Graphics();
      drawGrassTexture(grass, 0, this.height - 150, this.width, 150);
      this.container.addChild(grass);
      this.elements.push(grass);
    }

    // ─── Sun / Moon ────────────────────────────────────────
    if (state.timeOfDay !== 'night') {
      const sun = new PIXI.Graphics();
      drawSun(sun, this.width - 80, 60, 30);
      this.container.addChild(sun);
      this.elements.push(sun);
    } else {
      // Moon
      const moon = new PIXI.Graphics();
      moon.beginFill(0xfef3c7);
      moon.drawCircle(this.width - 80, 60, 25);
      moon.endFill();
      this.container.addChild(moon);
      this.elements.push(moon);

      // Stars
      for (let i = 0; i < 20; i++) {
        const star = new PIXI.Graphics();
        drawStar(star, Math.random() * this.width, Math.random() * (this.height - 200), 2, 0xffffff);
        this.container.addChild(star);
        this.elements.push(star);
        // Twinkle
        const tw = gsap.to(star, { alpha: 0.3, duration: 1 + Math.random(), yoyo: true, repeat: -1 });
        this.animationTweens.push(tw);
      }
    }

    // ─── World elements ────────────────────────────────────
    const elements = state.elements;
    let xPos = 50;

    for (const el of elements) {
      const obj = this.createElement(el, xPos, this.height - 150);
      if (obj) {
        this.container.addChild(obj);
        this.elements.push(obj);
        xPos += 80;
        if (xPos > this.width - 50) xPos = 50;
      }
    }

    // ─── Title ─────────────────────────────────────────────
    const title = new PIXI.Text(`🌍 My Living World — Level ${state.worldLevel}`, {
      fontSize: 16, fill: 0xffffff, fontWeight: 'bold',
      stroke: 0x000000, strokeThickness: 3,
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    this.container.addChild(title);
    this.elements.push(title);

    // ─── Stats ─────────────────────────────────────────────
    const stats = new PIXI.Text(
      `Mastered: ${state.masteredTopics} topics | Mastery: ${state.totalMastery}% | Season: ${state.season}`,
      {
        fontSize: 12, fill: 0xffffff, fontWeight: 'bold',
        stroke: 0x000000, strokeThickness: 2,
      },
    );
    stats.anchor.set(0.5);
    stats.x = cx;
    stats.y = 50;
    this.container.addChild(stats);
    this.elements.push(stats);
  }

  /**
   * Create a world element visual.
   */
  private createElement(el: WorldElement, x: number, groundY: number): PIXI.DisplayObject | null {
    switch (el) {
      case 'tree': {
        // Use OpenMoji tree sprite, fall back to primitive
        const sprite = AssetLoader.trySprite('emoji', 'tree');
        if (sprite) {
          sprite.x = x;
          sprite.y = groundY - 30;
          const scale = 0.6;
          sprite.scale.set(scale);
          return sprite;
        }
        const g = new PIXI.Graphics();
        drawTree(g, x, groundY - 10, 1);
        return g;
      }
      case 'flower_red': {
        const sprite = AssetLoader.trySprite('emoji', 'flower');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 25; sprite.scale.set(0.35);
          sprite.tint = 0xef4444;
          return sprite;
        }
        const g = new PIXI.Graphics();
        drawFlower(g, x, groundY - 30, 0xef4444, 1);
        return g;
      }
      case 'flower_blue': {
        const sprite = AssetLoader.trySprite('emoji', 'flower');
        if (sprite) {
          sprite.x = x + 20; sprite.y = groundY - 25; sprite.scale.set(0.3);
          sprite.tint = 0x3b82f6;
          return sprite;
        }
        const g = new PIXI.Graphics();
        drawFlower(g, x + 20, groundY - 25, 0x3b82f6, 0.8);
        return g;
      }
      case 'flower_yellow': {
        const sprite = AssetLoader.trySprite('emoji', 'sunflower');
        if (sprite) {
          sprite.x = x + 40; sprite.y = groundY - 30; sprite.scale.set(0.35);
          return sprite;
        }
        const g = new PIXI.Graphics();
        drawFlower(g, x + 40, groundY - 35, 0xfbbf24, 0.9);
        return g;
      }
      case 'butterfly': {
        const sprite = AssetLoader.trySprite('emoji', 'butterfly');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 60; sprite.scale.set(0.4);
          const tw = gsap.to(sprite, { y: groundY - 80, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          this.animationTweens.push(tw);
          return sprite;
        }
        // No butterfly in Kenney animals — use parrot as flying creature
        const parrot = AssetLoader.trySprite('animal', 'parrot');
        if (parrot) {
          parrot.x = x; parrot.y = groundY - 60; parrot.scale.set(0.4);
          const tw = gsap.to(parrot, { y: groundY - 80, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          this.animationTweens.push(tw);
          return parrot;
        }
        const g = new PIXI.Graphics();
        g.beginFill(0xa855f7, 0.8);
        g.drawEllipse(-5, 0, 6, 4);
        g.drawEllipse(5, 0, 6, 4);
        g.endFill();
        g.beginFill(0x000000);
        g.drawRect(-0.5, -3, 1, 6);
        g.endFill();
        g.x = x;
        g.y = groundY - 60;
        const tw = gsap.to(g, { y: groundY - 80, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        this.animationTweens.push(tw);
        return g;
      }
      case 'bird': {
        // Try emoji bird first, then Kenney parrot
        const emojiBird = AssetLoader.trySprite('emoji', 'bird');
        if (emojiBird) {
          emojiBird.x = x; emojiBird.y = 80; emojiBird.scale.set(0.4);
          const tw = gsap.to(emojiBird, { x: x + 50, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          this.animationTweens.push(tw);
          return emojiBird;
        }
        const sprite = AssetLoader.trySprite('animal', 'parrot');
        if (sprite) {
          sprite.x = x; sprite.y = 80; sprite.scale.set(0.5);
          const tw = gsap.to(sprite, { x: x + 50, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          this.animationTweens.push(tw);
          return sprite;
        }
        const g = new PIXI.Graphics();
        g.beginFill(0x3b82f6);
        g.drawCircle(0, 0, 5);
        g.endFill();
        g.lineStyle(2, 0x1e40af);
        g.moveTo(-8, -3);
        g.lineTo(-3, 0);
        g.lineTo(-8, 3);
        g.moveTo(8, -3);
        g.lineTo(3, 0);
        g.lineTo(8, 3);
        g.x = x;
        g.y = 80;
        const tw = gsap.to(g, { x: x + 50, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        this.animationTweens.push(tw);
        return g;
      }
      case 'rabbit': {
        const sprite = AssetLoader.trySprite('animal', 'rabbit');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 8; sprite.scale.set(0.5);
          const tw = gsap.to(sprite, { y: groundY - 15, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          this.animationTweens.push(tw);
          return sprite;
        }
        const g = new PIXI.Graphics();
        g.beginFill(0xf3f4f6);
        g.drawEllipse(0, 0, 10, 8);
        g.drawCircle(0, -8, 6);
        g.endFill();
        g.beginFill(0xfca5a5);
        g.drawCircle(-3, -10, 2);
        g.drawCircle(3, -10, 2);
        g.endFill();
        g.x = x;
        g.y = groundY - 8;
        const tw = gsap.to(g, { y: groundY - 15, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        this.animationTweens.push(tw);
        return g;
      }
      case 'deer': {
        // Try emoji deer first, then Kenney moose
        const emojiDeer = AssetLoader.trySprite('emoji', 'deer');
        if (emojiDeer) {
          emojiDeer.x = x; emojiDeer.y = groundY - 8; emojiDeer.scale.set(0.4);
          return emojiDeer;
        }
        const sprite = AssetLoader.trySprite('animal', 'moose');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 8; sprite.scale.set(0.5);
          return sprite;
        }
        const g = new PIXI.Graphics();
        g.beginFill(0x92400e);
        g.drawEllipse(0, 0, 12, 8);
        g.drawCircle(0, -10, 7);
        g.endFill();
        g.lineStyle(2, 0x78350f);
        g.moveTo(-5, -15);
        g.lineTo(-8, -20);
        g.moveTo(5, -15);
        g.lineTo(8, -20);
        g.x = x;
        g.y = groundY - 8;
        return g;
      }
      case 'house': {
        const sprite = AssetLoader.trySprite('emoji', 'house');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 25; sprite.scale.set(0.5);
          return sprite;
        }
        const g = new PIXI.Graphics();
        g.beginFill(0xfca5a5);
        g.drawRect(x - 20, groundY - 40, 40, 40);
        g.endFill();
        g.beginFill(0x7f1d1d);
        g.moveTo(x - 25, groundY - 40);
        g.lineTo(x, groundY - 60);
        g.lineTo(x + 25, groundY - 40);
        g.closePath();
        g.endFill();
        g.beginFill(0xfbbf24);
        g.drawRect(x - 5, groundY - 25, 10, 15);
        g.endFill();
        return g;
      }
      case 'fountain': {
        const sprite = AssetLoader.trySprite('emoji', 'fountain');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 15; sprite.scale.set(0.5);
          const tw = gsap.to(sprite.scale, { x: 0.55, y: 0.55, duration: 1, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          this.animationTweens.push(tw);
          return sprite;
        }
        const g = new PIXI.Graphics();
        g.beginFill(0x93c5fd, 0.7);
        g.drawCircle(x, groundY - 15, 15);
        g.endFill();
        g.beginFill(0x3b82f6);
        g.drawCircle(x, groundY - 25, 5);
        g.endFill();
        const tw = gsap.to(g.scale, { x: 1.1, y: 1.1, duration: 1, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        this.animationTweens.push(tw);
        return g;
      }
      case 'bridge': {
        const sprite = AssetLoader.trySprite('emoji', 'bridge');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 15; sprite.scale.set(0.5);
          return sprite;
        }
        const g = new PIXI.Graphics();
        g.beginFill(0x92400e);
        g.drawRect(x - 30, groundY - 20, 60, 8);
        g.endFill();
        g.lineStyle(2, 0x78350f);
        g.moveTo(x - 30, groundY - 20);
        g.lineTo(x - 30, groundY - 35);
        g.moveTo(x + 30, groundY - 20);
        g.lineTo(x + 30, groundY - 35);
        return g;
      }
      case 'windmill': {
        const sprite = AssetLoader.trySprite('emoji', 'windmill');
        if (sprite) {
          sprite.x = x; sprite.y = groundY - 25; sprite.scale.set(0.5);
          return sprite;
        }
        // Fallback: primitive windmill
        const g = new PIXI.Graphics();
        g.beginFill(0xf3f4f6);
        g.drawRect(x - 10, groundY - 50, 20, 50);
        g.endFill();
        g.beginFill(0x6b7280);
        g.drawCircle(x, groundY - 50, 4);
        g.endFill();
        const blades = new PIXI.Graphics();
        blades.beginFill(0xe5e7eb);
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI * 2 * i) / 4;
          blades.drawRect(Math.cos(angle) * 15 - 2, Math.sin(angle) * 15 - 2, 4, 30);
        }
        blades.endFill();
        blades.x = x;
        blades.y = groundY - 50;
        const tw = gsap.to(blades, { rotation: Math.PI * 2, duration: 4, repeat: -1, ease: 'none' });
        this.animationTweens.push(tw);
        return blades;
      }
      case 'rainbow': {
        const g = new PIXI.Graphics();
        const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e, 0x3b82f6, 0xa855f7];
        for (let i = 0; i < colors.length; i++) {
          g.lineStyle(4, colors[i], 0.7);
          g.arc(x, groundY, 60 - i * 5, Math.PI, 0);
        }
        return g;
      }
      case 'cloud': {
        const g = new PIXI.Graphics();
        drawCloud(g, x, 100, 1);
        const tw = gsap.to(g, { x: x + 30, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        this.animationTweens.push(tw);
        return g;
      }
      case 'sun': {
        const g = new PIXI.Graphics();
        drawSun(g, x, 80, 20);
        return g;
      }
      case 'star': {
        const g = new PIXI.Graphics();
        drawStar(g, x, 100, 8, 0xfbbf24);
        const tw = gsap.to(g, { rotation: Math.PI * 2, duration: 10, repeat: -1, ease: 'none' });
        this.animationTweens.push(tw);
        return g;
      }
      default:
        return null;
    }
  }

  /**
   * Clear all world elements and animations.
   */
  clear(): void {
    for (const tw of this.animationTweens) {
      tw.kill();
    }
    this.animationTweens = [];

    for (const el of this.elements) {
      if (el.parent) el.parent.removeChild(el);
      el.destroy();
    }
    this.elements = [];
  }
}
