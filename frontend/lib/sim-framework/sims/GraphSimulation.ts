/**
 * GraphSimulation
 *
 * Students drag points onto a coordinate grid to plot coordinates,
 * draw lines, or identify points. The grid shows x/y axes with labels.
 *
 * Topics: graph, coordinate, plot, point, line, cartesian, x-axis, y-axis,
 * ordered pair, linear graph
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Plugin ──────────────────────────────────────────────────

class GraphSimulationPlugin implements SimulationPlugin {
  id = 'graph';
  subject = 'maths';
  topics = ['graph', 'coordinate', 'plot', 'point', 'cartesian', 'x-axis', 'y-axis', 'ordered pair', 'linear graph'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      subject === 'maths' && (
        q.includes('graph') ||
        q.includes('coordinate') ||
        q.includes('plot') ||
        q.includes('cartesian') ||
        q.includes('ordered pair') ||
        q.includes('(0,') ||
        q.match(/\(\s*-?\d+\s*,\s*-?\d+\s*\)/) !== null
      )
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'find_x',
        mascotNarration: 'Watch me! First, find the x-coordinate on the horizontal axis.',
        mascotAction: (sim) => {
          const point = sim.container.children.find(c => c.name === 'draggable_point') as PIXI.Container | undefined;
          if (point) {
            gsap.to(point, { x: point.x + 50, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag the point to the correct x-coordinate on the horizontal axis.',
        hint: 'Drag the dot to where the x and y coordinates meet!',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, question, answer } = ctx;
    const cx = width / 2;
    const cy = height / 2 + 10;
    let solved = false;

    // Parse target coordinate from question or answer
    const coordMatch = question.match(/\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/) ||
      answer.match(/\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/);
    const targetX = coordMatch ? parseInt(coordMatch[1]) : 3;
    const targetY = coordMatch ? parseInt(coordMatch[2]) : 2;

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text(`📍 Plot the point (${targetX}, ${targetY}) on the graph!`, {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Grid ───────────────────────────────────────────────
    const gridSize = 6; // -6 to 6
    const cellSize = 28;
    const gridPixels = gridSize * cellSize;

    const grid = new PIXI.Graphics();
    grid.x = cx;
    grid.y = cy;
    container.addChild(grid);

    // Grid lines
    grid.lineStyle(1, 0xd1d5db, 0.5);
    for (let i = -gridSize; i <= gridSize; i++) {
      grid.moveTo(i * cellSize, -gridPixels);
      grid.lineTo(i * cellSize, gridPixels);
      grid.moveTo(-gridPixels, i * cellSize);
      grid.lineTo(gridPixels, i * cellSize);
    }

    // Axes
    grid.lineStyle(2, 0x374151);
    grid.moveTo(-gridPixels, 0);
    grid.lineTo(gridPixels, 0); // x-axis
    grid.moveTo(0, -gridPixels);
    grid.lineTo(0, gridPixels); // y-axis

    // Axis labels
    for (let i = -gridSize; i <= gridSize; i++) {
      if (i === 0) continue;
      const xLabel = new PIXI.Text(String(i), { fontSize: 10, fill: 0x6b7280 });
      xLabel.anchor.set(0.5);
      xLabel.x = i * cellSize;
      xLabel.y = 15;
      grid.addChild(xLabel);

      const yLabel = new PIXI.Text(String(i), { fontSize: 10, fill: 0x6b7280 });
      yLabel.anchor.set(0.5);
      yLabel.x = -15;
      yLabel.y = -i * cellSize;
      grid.addChild(yLabel);
    }

    // Origin label
    const originLabel = new PIXI.Text('0', { fontSize: 10, fill: 0x6b7280 });
    originLabel.anchor.set(0.5);
    originLabel.x = -12;
    originLabel.y = 12;
    grid.addChild(originLabel);

    // Axis names
    const xAxisLabel = new PIXI.Text('x', { fontSize: 14, fill: 0x374151, fontWeight: 'bold' });
    xAxisLabel.anchor.set(0.5);
    xAxisLabel.x = gridPixels + 12;
    xAxisLabel.y = 0;
    grid.addChild(xAxisLabel);

    const yAxisLabel = new PIXI.Text('y', { fontSize: 14, fill: 0x374151, fontWeight: 'bold' });
    yAxisLabel.anchor.set(0.5);
    yAxisLabel.x = 0;
    yAxisLabel.y = -gridPixels - 12;
    grid.addChild(yAxisLabel);

    // ─── Target marker (ghost) ──────────────────────────────
    const targetPixelX = cx + targetX * cellSize;
    const targetPixelY = cy - targetY * cellSize;

    if (ctx.adaptiveEasier) {
      const ghost = new PIXI.Graphics();
      ghost.name = 'target_ghost';
      ghost.beginFill(0x22c55e, 0.2);
      ghost.lineStyle(2, 0x22c55e, 0.4);
      ghost.drawCircle(0, 0, 15);
      ghost.endFill();
      ghost.x = targetPixelX;
      ghost.y = targetPixelY;
      container.addChild(ghost);
      gsap.to(ghost, { alpha: 0.6, duration: 0.5, yoyo: true, repeat: -1 });
    }

    // ─── Draggable point ────────────────────────────────────
    const point = new PIXI.Container();
    point.name = 'draggable_point';
    point.x = cx - gridPixels - 20;
    point.y = cy + gridPixels + 20;
    point.eventMode = 'static';
    point.cursor = 'grab';
    container.addChild(point);

    const pointG = new PIXI.Graphics();
    pointG.beginFill(0x3b82f6);
    pointG.lineStyle(3, 0x1e40af);
    pointG.drawCircle(0, 0, 12);
    pointG.endFill();
    point.addChild(pointG);

    const pointLabel = new PIXI.Text('Drag me!', { fontSize: 11, fill: 0x3b82f6, fontWeight: 'bold' });
    pointLabel.anchor.set(0.5);
    pointLabel.y = -25;
    point.addChild(pointLabel);

    // ─── Coordinate readout ─────────────────────────────────
    const coordText = new PIXI.Text('(0, 0)', { fontSize: 16, fill: 0x3b82f6, fontWeight: 'bold' });
    coordText.anchor.set(0.5);
    coordText.x = cx;
    coordText.y = height - 30;
    container.addChild(coordText);

    // ─── Drag behavior ──────────────────────────────────────
    let dragging = false;
    let offsetX = 0, offsetY = 0;

    point.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      if (solved) return;
      dragging = true;
      point.cursor = 'grabbing';
      ctx.playSound('pickup');
      const pos = e.global;
      offsetX = pos.x - point.x;
      offsetY = pos.y - point.y;
      container.setChildIndex(point, container.children.length - 1);
    });

    point.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!dragging) return;
      const pos = e.global;
      point.x = pos.x - offsetX;
      point.y = pos.y - offsetY;

      // Snap to nearest grid cell
      const gridX = Math.round((point.x - cx) / cellSize);
      const gridY = Math.round((cy - point.y) / cellSize);
      coordText.text = `(${gridX}, ${gridY})`;
    });

    point.on('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      point.cursor = 'grab';

      // Snap to nearest grid cell
      const gridX = Math.round((point.x - cx) / cellSize);
      const gridY = Math.round((cy - point.y) / cellSize);
      const snapX = cx + gridX * cellSize;
      const snapY = cy - gridY * cellSize;

      gsap.to(point, { x: snapX, y: snapY, duration: 0.15 });

      // Check if correct
      if (gridX === targetX && gridY === targetY && !solved) {
        solved = true;
        coordText.text = `(${targetX}, ${targetY})! 🎉`;
        coordText.style.fill = 0x22c55e;

        // Turn point green
        pointG.clear();
        pointG.beginFill(0x22c55e);
        pointG.lineStyle(3, 0x16a34a);
        pointG.drawCircle(0, 0, 12);
        pointG.endFill();
        pointLabel.text = '✓';

        ctx.onStepCompleted();

        ctx.playSound('success');
        ctx.speak(`Point (${targetX}, ${targetY}) plotted! Great job!`);
        ctx.setMascotMood('celebrate');
        ctx.celebrate(snapX, snapY);
        setTimeout(() => ctx.onSolved(answer), 1500);
      } else {
        ctx.showWrong(point.x, point.y - 20);
        ctx.speak(`That's (${gridX}, ${gridY}). Try to plot (${targetX}, ${targetY})!`);
        ctx.onWrong();
      }
    });

    point.on('pointerupoutside', () => {
      if (!dragging) return;
      dragging = false;
      point.cursor = 'grab';
    });
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new GraphSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as GraphSimulation };
