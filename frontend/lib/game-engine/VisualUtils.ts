/**
 * VisualUtils.ts
 *
 * Shared visual utilities for all renderers and sim plugins.
 * Follows PhET design principles: minimal text, clear play area,
 * no distracting elements, consistent visual language.
 *
 * Used by:
 * - VisualChallengeRenderer (all interactive renderers)
 * - All sim plugins (beaker glass, heart glow, plant textures, etc.)
 * - LivingWorld (gamification world scene)
 * - SandboxSimulation (variable manipulation visuals)
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

// ─── Backgrounds ─────────────────────────────────────────────

/**
 * Draw a vertical gradient background (sky/scene).
 * Uses a filled rectangle with layered alpha steps for gradient effect.
 */
export function drawGradientBackground(
  g: PIXI.Graphics,
  width: number,
  height: number,
  topColor: number,
  bottomColor: number,
): void {
  g.clear();
  // Build gradient with horizontal strips
  const steps = 40;
  const stripHeight = height / steps;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r1 = (topColor >> 16) & 0xff;
    const g1 = (topColor >> 8) & 0xff;
    const b1 = topColor & 0xff;
    const r2 = (bottomColor >> 16) & 0xff;
    const g2 = (bottomColor >> 8) & 0xff;
    const b2 = bottomColor & 0xff;
    const r = Math.round(r1 + (r2 - r1) * t);
    const gg = Math.round(g1 + (g2 - g1) * t);
    const bb = Math.round(b1 + (b2 - b1) * t);
    const color = (r << 16) | (gg << 8) | bb;
    g.beginFill(color);
    g.drawRect(0, i * stripHeight, width, stripHeight + 1);
    g.endFill();
  }
}

/**
 * Draw a radial gradient (for glows, sun, spotlights).
 */
export function drawRadialGradient(
  g: PIXI.Graphics,
  cx: number,
  cy: number,
  maxRadius: number,
  innerColor: number,
  outerColor: number,
  innerAlpha = 1,
  outerAlpha = 0,
): void {
  const steps = 20;
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const radius = maxRadius * t;
    const r1 = (innerColor >> 16) & 0xff;
    const g1 = (innerColor >> 8) & 0xff;
    const b1 = innerColor & 0xff;
    const r2 = (outerColor >> 16) & 0xff;
    const g2 = (outerColor >> 8) & 0xff;
    const b2 = outerColor & 0xff;
    const r = Math.round(r1 + (r2 - r1) * t);
    const gg = Math.round(g1 + (g2 - g1) * t);
    const bb = Math.round(b1 + (b2 - b1) * t);
    const color = (r << 16) | (gg << 8) | bb;
    const alpha = innerAlpha + (outerAlpha - innerAlpha) * t;
    g.beginFill(color, alpha);
    g.drawCircle(cx, cy, radius);
    g.endFill();
  }
}

// ─── Glow & Shadow ───────────────────────────────────────────

/**
 * Draw a soft glow halo around a point.
 */
export function drawGlow(
  container: PIXI.Container,
  x: number,
  y: number,
  radius: number,
  color: number,
  intensity = 0.5,
): PIXI.Graphics {
  const glow = new PIXI.Graphics();
  drawRadialGradient(glow, x, y, radius, color, color, intensity * 0.8, 0);
  container.addChild(glow);
  return glow;
}

/**
 * Draw a drop shadow under an object (elliptical, semi-transparent).
 */
export function drawShadow(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  opacity = 0.25,
): void {
  g.beginFill(0x000000, opacity);
  g.drawEllipse(x, y, width, height);
  g.endFill();
}

// ─── Particle Effects ────────────────────────────────────────

/**
 * Create a particle burst (sparkle explosion) at a point.
 * Particles fly outward and fade. Auto-cleans after animation.
 */
export function drawParticleBurst(
  container: PIXI.Container,
  x: number,
  y: number,
  color: number,
  count = 12,
): void {
  for (let i = 0; i < count; i++) {
    const particle = new PIXI.Graphics();
    const size = 3 + Math.random() * 5;
    particle.beginFill(color, 0.9);
    if (Math.random() > 0.5) {
      particle.drawCircle(0, 0, size);
    } else {
      drawStar(particle, 0, 0, size, color);
    }
    particle.endFill();
    particle.x = x;
    particle.y = y;
    container.addChild(particle);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const distance = 40 + Math.random() * 60;
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;

    gsap.to(particle, {
      x: targetX,
      y: targetY,
      alpha: 0,
      duration: 0.6 + Math.random() * 0.3,
      ease: 'power2.out',
      onComplete: () => {
        if (particle.parent) particle.parent.removeChild(particle);
        particle.destroy();
      },
    });
  }
}

// ─── Liquid & Glass ──────────────────────────────────────────

/**
 * Draw liquid filling a container with an animated wave surface.
 * Returns a graphics object that can be updated via animateLiquid.
 */
export function drawLiquidFill(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  fillPercent: number,
  waveOffset = 0,
): void {
  const fillHeight = height * fillPercent;
  const liquidY = y + height - fillHeight;

  g.beginFill(color, 0.75);

  // Draw liquid body with wavy top
  g.moveTo(x, y + height);
  g.lineTo(x, liquidY);

  // Wavy surface
  const waveAmplitude = 3;
  const waveSegments = 10;
  for (let i = 0; i <= waveSegments; i++) {
    const wx = x + (width * i) / waveSegments;
    const wy = liquidY + Math.sin((i / waveSegments) * Math.PI * 2 + waveOffset) * waveAmplitude;
    g.lineTo(wx, wy);
  }

  g.lineTo(x + width, y + height);
  g.closePath();
  g.endFill();

  // Surface highlight
  g.lineStyle(1, 0xffffff, 0.3);
  for (let i = 0; i <= waveSegments; i++) {
    const wx = x + (width * i) / waveSegments;
    const wy = liquidY + Math.sin((i / waveSegments) * Math.PI * 2 + waveOffset) * waveAmplitude;
    if (i === 0) g.moveTo(wx, wy);
    else g.lineTo(wx, wy);
  }
}

/**
 * Animate the wave offset of a liquid fill.
 * Call in a ticker or use gsap to update the waveOffset.
 */
export function animateLiquid(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  fillPercent: number,
): { update: () => void; destroy: () => void } {
  let offset = 0;
  let rafId: number | null = null;

  const update = () => {
    offset += 0.05;
    g.clear();
    drawLiquidFill(g, x, y, width, height, color, fillPercent, offset);
    rafId = requestAnimationFrame(update);
  };

  const destroy = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
  };

  update();
  return { update: () => {}, destroy };
}

/**
 * Draw a glass container effect (translucent with highlight).
 */
export function drawGlassEffect(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  // Glass body
  g.beginFill(0xffffff, 0.08);
  g.drawRoundedRect(x, y, width, height, 6);
  g.endFill();

  // Glass border
  g.lineStyle(2, 0xffffff, 0.4);
  g.drawRoundedRect(x, y, width, height, 6);

  // Highlight (left side reflection)
  g.lineStyle(2, 0xffffff, 0.25);
  g.moveTo(x + 4, y + 8);
  g.lineTo(x + 4, y + height - 8);
}

// ─── Textures ────────────────────────────────────────────────

/**
 * Draw a wood texture (for tables, shelves, floors).
 */
export function drawWoodTexture(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  // Base
  g.beginFill(0x92400e, 0.3);
  g.drawRect(x, y, width, height);
  g.endFill();

  // Wood grain lines
  g.lineStyle(1, 0x78350f, 0.4);
  const grainCount = Math.floor(height / 8);
  for (let i = 0; i < grainCount; i++) {
    const gy = y + (i + 0.5) * (height / grainCount);
    g.moveTo(x, gy);
    // Wavy grain
    for (let wx = 0; wx <= width; wx += 10) {
      g.lineTo(x + wx, gy + Math.sin(wx * 0.1) * 1.5);
    }
  }
}

/**
 * Draw a grass ground texture.
 */
export function drawGrassTexture(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  // Base green
  g.beginFill(0x86efac, 0.3);
  g.drawRect(x, y, width, height);
  g.endFill();

  // Grass blades
  g.lineStyle(1, 0x22c55e, 0.5);
  const bladeCount = Math.floor(width / 6);
  for (let i = 0; i < bladeCount; i++) {
    const bx = x + i * 6 + Math.random() * 3;
    const bh = 4 + Math.random() * 6;
    g.moveTo(bx, y + height);
    g.lineTo(bx + 1, y + height - bh);
  }
}

/**
 * Draw a fluffy cloud.
 */
export function drawCloud(
  g: PIXI.Graphics,
  x: number,
  y: number,
  scale = 1,
): void {
  g.beginFill(0xffffff, 0.85);
  g.drawCircle(x, y, 18 * scale);
  g.drawCircle(x + 18 * scale, y + 4 * scale, 14 * scale);
  g.drawCircle(x - 18 * scale, y + 4 * scale, 14 * scale);
  g.drawCircle(x + 8 * scale, y - 8 * scale, 12 * scale);
  g.drawCircle(x - 8 * scale, y - 8 * scale, 12 * scale);
  g.endFill();
}

/**
 * Draw a 5-point star.
 */
export function drawStar(
  g: PIXI.Graphics,
  x: number,
  y: number,
  size: number,
  color: number,
): void {
  const spikes = 5;
  const outerRadius = size;
  const innerRadius = size * 0.4;
  g.beginFill(color);
  let rot = -Math.PI / 2;
  const step = Math.PI / spikes;
  g.moveTo(x, y - outerRadius);
  for (let i = 0; i < spikes; i++) {
    rot += step;
    g.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
    rot += step;
    g.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
  }
  g.closePath();
  g.endFill();
}

// ─── Animations ──────────────────────────────────────────────

/**
 * Gentle floating animation (up and down).
 */
export function animateFloat(
  obj: PIXI.DisplayObject,
  amplitude = 5,
  duration = 2,
): gsap.core.Tween {
  return gsap.to(obj, {
    y: '+= ' + amplitude,
    duration: duration / 2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

/**
 * Pulsing breathing effect (scale up and down).
 */
export function animateBreathe(
  obj: PIXI.DisplayObject,
  scale = 1.05,
  duration = 1.5,
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(obj.scale, { x: scale, y: scale, duration: duration / 2, ease: 'sine.inOut' });
  return tl;
}

/**
 * Bounce-in entrance animation.
 */
export function animateBounceIn(
  obj: PIXI.DisplayObject,
  delay = 0,
): gsap.core.Timeline {
  obj.scale.set(0);
  const tl = gsap.timeline({ delay });
  tl.to(obj.scale, { x: 1.2, y: 1.2, duration: 0.2, ease: 'back.out(2)' });
  tl.to(obj.scale, { x: 1, y: 1, duration: 0.1, ease: 'power2.out' });
  return tl;
}

/**
 * Shake animation (for wrong answers).
 */
export function animateShake(
  obj: PIXI.DisplayObject,
  intensity = 8,
): gsap.core.Timeline {
  const originalX = obj.x;
  const tl = gsap.timeline();
  tl.to(obj, { x: originalX + intensity, duration: 0.05 });
  tl.to(obj, { x: originalX - intensity, duration: 0.05 });
  tl.to(obj, { x: originalX + intensity * 0.7, duration: 0.05 });
  tl.to(obj, { x: originalX - intensity * 0.7, duration: 0.05 });
  tl.to(obj, { x: originalX, duration: 0.05 });
  return tl;
}

// ─── Cards & Panels ──────────────────────────────────────────

/**
 * Draw a polished rounded card with shadow and border.
 */
export function drawRoundedCard(
  g: PIXI.Graphics,
  w: number,
  h: number,
  fillColor = 0xffffff,
  fillColorAlpha = 0.9,
  borderColor = 0xd1d5db,
  borderWidth = 2,
  radius = 8,
): void {
  // Shadow
  g.beginFill(0x000000, 0.1);
  g.drawRoundedRect(-w / 2 + 2, -h / 2 + 3, w, h, radius);
  g.endFill();

  // Card body
  g.beginFill(fillColor, fillColorAlpha);
  g.drawRoundedRect(-w / 2, -h / 2, w, h, radius);
  g.endFill();

  // Border
  g.lineStyle(borderWidth, borderColor);
  g.drawRoundedRect(-w / 2, -h / 2, w, h, radius);
}

/**
 * Draw a control panel background (PhET-style: distinct from play area).
 */
export function drawControlPanel(
  g: PIXI.Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  g.beginFill(0xf3f4f6, 0.95);
  g.drawRoundedRect(x, y, w, h, 10);
  g.endFill();
  g.lineStyle(2, 0xe5e7eb);
  g.drawRoundedRect(x, y, w, h, 10);
}

// ─── Scene Helpers ───────────────────────────────────────────

/**
 * Draw a sun (for outdoor scenes).
 */
export function drawSun(
  g: PIXI.Graphics,
  x: number,
  y: number,
  radius: number,
): void {
  // Glow
  drawRadialGradient(g, x, y, radius * 2, 0xfde047, 0xfde047, 0.3, 0);
  // Sun body
  g.beginFill(0xfbbf24);
  g.drawCircle(x, y, radius);
  g.endFill();
  // Rays
  g.lineStyle(2, 0xfbbf24, 0.6);
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;
    g.moveTo(x + Math.cos(angle) * (radius + 4), y + Math.sin(angle) * (radius + 4));
    g.lineTo(x + Math.cos(angle) * (radius + 12), y + Math.sin(angle) * (radius + 12));
  }
}

/**
 * Draw a tree (for outdoor scenes / living world).
 */
export function drawTree(
  g: PIXI.Graphics,
  x: number,
  y: number,
  scale = 1,
): void {
  // Trunk
  g.beginFill(0x92400e);
  g.drawRect(x - 4 * scale, y - 10 * scale, 8 * scale, 30 * scale);
  g.endFill();
  // Leaves
  g.beginFill(0x22c55e, 0.85);
  g.drawCircle(x, y - 20 * scale, 18 * scale);
  g.drawCircle(x - 12 * scale, y - 12 * scale, 14 * scale);
  g.drawCircle(x + 12 * scale, y - 12 * scale, 14 * scale);
  g.endFill();
}

/**
 * Draw a flower (for living world / garden scenes).
 */
export function drawFlower(
  g: PIXI.Graphics,
  x: number,
  y: number,
  petalColor: number,
  scale = 1,
): void {
  // Stem
  g.lineStyle(2 * scale, 0x22c55e);
  g.moveTo(x, y);
  g.lineTo(x, y + 15 * scale);
  // Petals
  g.beginFill(petalColor, 0.9);
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5;
    g.drawCircle(
      x + Math.cos(angle) * 6 * scale,
      y + Math.sin(angle) * 6 * scale,
      5 * scale,
    );
  }
  g.endFill();
  // Center
  g.beginFill(0xfbbf24);
  g.drawCircle(x, y, 4 * scale);
  g.endFill();
}

/**
 * Draw a mountain (for landscape scenes).
 */
export function drawMountain(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  g.beginFill(0x6b7280, 0.6);
  g.moveTo(x - width / 2, y);
  g.lineTo(x, y - height);
  g.lineTo(x + width / 2, y);
  g.closePath();
  g.endFill();
  // Snow cap
  g.beginFill(0xffffff, 0.8);
  g.moveTo(x - width * 0.15, y - height * 0.7);
  g.lineTo(x, y - height);
  g.lineTo(x + width * 0.15, y - height * 0.7);
  g.closePath();
  g.endFill();
}

/**
 * Draw a river/water body.
 */
export function drawRiver(
  g: PIXI.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  g.beginFill(0x3b82f6, 0.4);
  g.drawRoundedRect(x, y, width, height, height / 2);
  g.endFill();
  // Wave lines
  g.lineStyle(1, 0xffffff, 0.4);
  for (let i = 0; i < 3; i++) {
    const wy = y + (height * (i + 1)) / 4;
    g.moveTo(x + 5, wy);
    for (let wx = 5; wx <= width - 5; wx += 8) {
      g.lineTo(x + wx, wy + Math.sin(wx * 0.2) * 2);
    }
  }
}

// ─── Color Utilities ─────────────────────────────────────────

/**
 * Lighten a color by a percentage (0-1).
 */
export function lightenColor(color: number, amount: number): number {
  const r = Math.min(255, ((color >> 16) & 0xff) + Math.round(255 * amount));
  const g = Math.min(255, ((color >> 8) & 0xff) + Math.round(255 * amount));
  const b = Math.min(255, (color & 0xff) + Math.round(255 * amount));
  return (r << 16) | (g << 8) | b;
}

/**
 * Darken a color by a percentage (0-1).
 */
export function darkenColor(color: number, amount: number): number {
  const r = Math.max(0, ((color >> 16) & 0xff) - Math.round(255 * amount));
  const g = Math.max(0, ((color >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (color & 0xff) - Math.round(255 * amount));
  return (r << 16) | (g << 8) | b;
}

/**
 * Convert a hex color to a CSS string (for PIXI.Text styles).
 */
export function hexToCss(color: number): string {
  return '#' + color.toString(16).padStart(6, '0');
}

// ─── Colorblind-Safe Palette ─────────────────────────────────

/**
 * Colorblind-safe palette (Wong 2011 palette).
 * Use instead of red/green for category distinctions.
 */
export const COLORBLIND_PALETTE = {
  blue: 0x0072b2,
  orange: 0xe69f00,
  yellow: 0xf0e442,
  skyBlue: 0x56b4e9,
  green: 0x009e73,
  vermillion: 0xd55e00,
  purple: 0xcc79a7,
  black: 0x000000,
};

/**
 * Get a colorblind-safe color for a category index.
 */
export function colorblindColor(index: number): number {
  const colors = [
    COLORBLIND_PALETTE.blue,
    COLORBLIND_PALETTE.orange,
    COLORBLIND_PALETTE.green,
    COLORBLIND_PALETTE.vermillion,
    COLORBLIND_PALETTE.purple,
    COLORBLIND_PALETTE.skyBlue,
    COLORBLIND_PALETTE.yellow,
  ];
  return colors[index % colors.length];
}
