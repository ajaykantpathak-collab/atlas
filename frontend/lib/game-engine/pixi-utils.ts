/**
 * PixiJS Helper Utilities
 *
 * Functions that are missing or awkward in PixiJS v7.
 */

import * as PIXI from 'pixi.js';

/**
 * Draw a star shape on a PIXI.Graphics object.
 * Replaces drawStar which doesn't exist in PixiJS v7 Graphics.
 */
export function drawStar(
  g: PIXI.Graphics,
  x: number,
  y: number,
  points: number,
  outerRadius: number,
  innerRadius: number,
): PIXI.Graphics {
  const step = Math.PI / points;
  const startAngle = -Math.PI / 2;

  g.moveTo(x + Math.cos(startAngle) * outerRadius, y + Math.sin(startAngle) * outerRadius);

  for (let i = 0; i < points * 2; i++) {
    const angle = startAngle + (i + 1) * step;
    const radius = i % 2 === 0 ? innerRadius : outerRadius;
    g.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
  }

  g.closePath();
  return g;
}
