/**
 * DiagramRenderer — Animated teaching diagrams that build step-by-step
 *
 * UPGRADE 1: Animated diagrams in teaching slides
 *
 * Each diagram type animates on appear, building up piece by piece:
 * - Place value chart: columns appear one by one, digits slide in
 * - Fraction bar: bar fills up to show the fraction
 * - Number line: line draws left to right, markers appear
 * - Factor tree: trunk grows, branches extend
 * - Body diagram: parts light up in sequence
 * - etc.
 *
 * All drawn procedurally with PixiJS Graphics — no image assets.
 */

import * as PIXI from 'pixi.js';
import { drawStar } from '../pixi-utils';
import type { DiagramConfig, DiagramType } from '../types';

/**
 * Options for the DiagramRenderer. Everything is optional — the legacy game
 * Renderer constructs this class with no options and keeps the historical
 * behavior exactly.
 */
export interface DiagramRendererOptions {
  /**
   * Fit the built diagram to the stage: after each build step the content's
   * measured bounds are scaled (aspect preserved, about the content center)
   * so sparse diagrams — a 240px timeline or a 110x70 venn — fill the frame
   * instead of floating in emptiness. Off by default.
   */
  fitToStage?: boolean;
  /**
   * Device pixel ratio of the display, used with fitToStage to re-rasterize
   * PIXI.Text at the fitted size (default 1 → labels scale like bitmaps).
   */
  textDpr?: number;
}

export class DiagramRenderer {
  private container: PIXI.Container;
  private width: number;
  private height: number;
  private currentDiagram: PIXI.Container | null = null;
  private animationStep: number = 0;
  private animationTimer: number = 0;
  private totalSteps: number = 0;
  private fitEnabled: boolean;
  private textDpr: number;

  constructor(container: PIXI.Container, width: number, height: number, options: DiagramRendererOptions = {}) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.fitEnabled = options.fitToStage === true;
    this.textDpr = options.textDpr ?? 1;
  }

  render(config: DiagramConfig): void {
    // Clear previous diagram
    if (this.currentDiagram) {
      this.container.removeChild(this.currentDiagram);
      this.currentDiagram.destroy({ children: true });
    }

    this.currentDiagram = new PIXI.Container();
    this.currentDiagram.x = this.width / 2;
    this.currentDiagram.y = this.centerY();
    this.container.addChild(this.currentDiagram);

    this.animationStep = 0;
    this.animationTimer = 0;
    // Record the request so update() re-renders the SAME diagram at the new
    // progress (previously these were never set, so the first update tick
    // redrew every animated diagram as a default generic-flow).
    this.currentType = config.type;
    this.currentData = config.data || {};

    if (config.animate === false) {
      // Render all at once
      this.renderDiagram(config.type, config.data || {}, 1.0);
    } else if (config.steps && config.steps.length > 0) {
      // Step-by-step animation
      this.totalSteps = config.steps.length;
      this.renderDiagram(config.type, config.data || {}, 0);
    } else {
      // Default: animate in one pass
      this.totalSteps = 1;
      this.renderDiagram(config.type, config.data || {}, 0);
    }
    this.fitToStage();
  }

  /** Vertical anchor for the diagram's center. The legacy game slides content
   *  50px above true center (room for its bottom UI overlay); stage-fit mode
   *  centers exactly, because the content now owns the whole stage. */
  private centerY(): number {
    return this.fitEnabled ? this.height / 2 : this.height / 2 - 50;
  }

  /**
   * Scale the current diagram's measured bounds to fill the stage (opt-in,
   * see DiagramRendererOptions.fitToStage). Aspect-preserving, applied about
   * the content center so the composition stays centered. Sparse diagrams
   * (a 240px timeline on a 640px stage, a 110x70 venn) thereby fill their
   * frame; oversized data shrinks to fit. Labels are re-rasterized at the
   * fitted size when textDpr > 1 so text stays crisp after the scale.
   */
  private fitToStage(): void {
    if (!this.fitEnabled || !this.currentDiagram) return;
    const diagram = this.currentDiagram;
    const bounds = diagram.getLocalBounds();
    if (!(bounds.width > 1 && bounds.height > 1)) return; // nothing drawn yet
    const pad = 44; // breathing room inside the stage, in design px
    const availW = this.width - pad * 2;
    const availH = this.height - pad * 2;
    if (availW <= 0 || availH <= 0) return;
    const MAX_SCALE = 2.6; // tiny defaults must not blow up into caricature
    const scale = Math.min(availW / bounds.width, availH / bounds.height, MAX_SCALE);
    diagram.pivot.set(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    diagram.position.set(this.width / 2, this.centerY());
    diagram.scale.set(scale);
    if (this.textDpr > 1) {
      const resolution = Math.min(4, Math.max(1, Math.ceil(scale * this.textDpr)));
      for (const child of diagram.children) {
        if (child instanceof PIXI.Text && child.resolution !== resolution) {
          child.resolution = resolution; // lazily re-rasterizes on next render
        }
      }
    }
  }

  private renderDiagram(type: DiagramType, data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;

    switch (type) {
      case 'place-value-chart':
        this.renderPlaceValueChart(data, progress);
        break;
      case 'fraction-bar':
        this.renderFractionBar(data, progress);
        break;
      case 'fraction-pizza':
        this.renderFractionPizza(data, progress);
        break;
      case 'number-line':
        this.renderNumberLine(data, progress);
        break;
      case 'factor-tree':
        this.renderFactorTree(data, progress);
        break;
      case 'body-diagram':
        this.renderBodyDiagram(data, progress);
        break;
      case 'plant-parts':
        this.renderPlantParts(data, progress);
        break;
      case 'water-cycle':
        this.renderWaterCycle(data, progress);
        break;
      case 'balance-scale':
        this.renderBalanceScale(data, progress);
        break;
      case 'counting-objects':
        this.renderCountingObjects(data, progress);
        break;
      case 'bar-chart':
        this.renderBarChart(data, progress);
        break;
      case 'shape-sorter':
        this.renderShapeSorter(data, progress);
        break;
      case 'pattern-builder':
        this.renderPatternBuilder(data, progress);
        break;
      case 'solar-system':
        this.renderSolarSystem(data, progress);
        break;
      case 'circuit':
        this.renderCircuit(data, progress);
        break;
      case 'food-chain':
        this.renderFoodChain(data, progress);
        break;
      case 'map-india':
        this.renderMapIndia(data, progress);
        break;
      case 'timeline':
        this.renderTimeline(data, progress);
        break;
      case 'venn-diagram':
        this.renderVennDiagram(data, progress);
        break;
      case 'generic-flow':
      default:
        this.renderGenericFlow(data, progress);
        break;
    }
  }

  // ─── Place Value Chart ──────────────────────────────────────

  private renderPlaceValueChart(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const columns = (data.columns as string[]) || ['Crores', 'Lakhs', 'Thousands', 'Ones'];
    const digits = (data.digits as string[]) || ['1', '2', '3', '4'];
    const colW = 60;
    const totalW = columns.length * colW;
    const startX = -totalW / 2;
    const visibleCols = Math.floor(progress * columns.length);

    for (let i = 0; i < columns.length; i++) {
      const x = startX + i * colW;
      const visible = i < visibleCols;

      // Column header
      g.beginFill(0x6c5ce7, visible ? 1 : 0.3);
      g.drawRoundedRect(x, -40, colW - 4, 25, 4);
      g.endFill();

      // Header text
      const headerText = new PIXI.Text(columns[i], {
        fontSize: 10, fill: 0xffffff, fontWeight: 'bold',
      });
      headerText.anchor.set(0.5);
      headerText.x = x + (colW - 4) / 2;
      headerText.y = -27;
      headerText.alpha = visible ? 1 : 0.3;
      this.currentDiagram!.addChild(headerText);

      // Digit box
      g.beginFill(0xffffff, visible ? 1 : 0.2);
      g.lineStyle(2, 0x6c5ce7, visible ? 1 : 0.3);
      g.drawRoundedRect(x, -10, colW - 4, 35, 4);
      g.endFill();

      // Digit
      if (visible && digits[i]) {
        const digitText = new PIXI.Text(digits[i], {
          fontSize: 20, fill: 0x333333, fontWeight: 'bold',
        });
        digitText.anchor.set(0.5);
        digitText.x = x + (colW - 4) / 2;
        digitText.y = 8;
        this.currentDiagram!.addChild(digitText);
      }
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Fraction Bar ───────────────────────────────────────────

  private renderFractionBar(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const numerator = (data.numerator as number) || 3;
    const denominator = (data.denominator as number) || 4;
    const barW = 240;
    const barH = 40;
    const startX = -barW / 2;
    const filledW = barW * Math.min(progress, numerator / denominator);

    // Empty bar
    g.beginFill(0xffffff);
    g.lineStyle(2, 0x333333);
    g.drawRoundedRect(startX, -barH / 2, barW, barH, 6);
    g.endFill();

    // Filled portion
    if (filledW > 0) {
      g.beginFill(0x6c5ce7);
      g.drawRoundedRect(startX, -barH / 2, filledW, barH, 6);
      g.endFill();
    }

    // Division lines
    g.lineStyle(1, 0x999999);
    for (let i = 1; i < denominator; i++) {
      const x = startX + (barW / denominator) * i;
      g.moveTo(x, -barH / 2);
      g.lineTo(x, barH / 2);
    }

    this.currentDiagram!.addChild(g);

    // Labels
    if (progress > 0.5) {
      const label = new PIXI.Text(`${numerator}/${denominator}`, {
        fontSize: 16, fill: 0x333333, fontWeight: 'bold',
      });
      label.anchor.set(0.5);
      label.x = 0;
      label.y = barH / 2 + 20;
      this.currentDiagram!.addChild(label);
    }
  }

  // ─── Fraction Pizza ─────────────────────────────────────────

  private renderFractionPizza(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const slices = (data.slices as number) || 8;
    const filled = (data.filled as number) || 3;
    const radius = 60;
    const visibleSlices = Math.floor(progress * filled);

    // Pizza base
    g.beginFill(0xffd700);
    g.drawCircle(0, 0, radius);
    g.endFill();

    // Slice lines
    g.lineStyle(2, 0xcc8800);
    for (let i = 0; i < slices; i++) {
      const angle = (i / slices) * Math.PI * 2 - Math.PI / 2;
      g.moveTo(0, 0);
      g.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }

    // Filled slices
    for (let i = 0; i < visibleSlices; i++) {
      const startAngle = (i / slices) * Math.PI * 2 - Math.PI / 2;
      const endAngle = ((i + 1) / slices) * Math.PI * 2 - Math.PI / 2;
      g.beginFill(0xff6b6b, 0.7);
      g.moveTo(0, 0);
      g.arc(0, 0, radius - 2, startAngle, endAngle);
      g.closePath();
      g.endFill();
    }

    // Crust
    g.lineStyle(4, 0xcc8800);
    g.drawCircle(0, 0, radius);

    this.currentDiagram!.addChild(g);
  }

  // ─── Number Line ────────────────────────────────────────────

  private renderNumberLine(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const min = (data.min as number) || 0;
    const max = (data.max as number) || 20;
    const length = 280;
    const startX = -length / 2;
    const visibleLength = length * progress;

    // Line
    g.lineStyle(3, 0x333333);
    g.moveTo(startX, 0);
    g.lineTo(startX + visibleLength, 0);

    // Arrow
    if (progress > 0.9) {
      g.moveTo(startX + length, 0);
      g.lineTo(startX + length - 10, -5);
      g.moveTo(startX + length, 0);
      g.lineTo(startX + length - 10, 5);
    }

    // Tick marks and numbers
    const tickCount = max - min + 1;
    const tickSpacing = length / (tickCount - 1);
    const visibleTicks = Math.floor(progress * tickCount);

    for (let i = 0; i < visibleTicks; i++) {
      const x = startX + i * tickSpacing;
      g.lineStyle(2, 0x666666);
      g.moveTo(x, -5);
      g.lineTo(x, 5);

      const numText = new PIXI.Text(String(min + i), {
        fontSize: 10, fill: 0x666666,
      });
      numText.anchor.set(0.5);
      numText.x = x;
      numText.y = 18;
      this.currentDiagram!.addChild(numText);
    }

    // Highlight a specific number
    const highlight = data.highlight as number;
    if (highlight !== undefined && progress > 0.8) {
      const x = startX + (highlight - min) * tickSpacing;
      g.beginFill(0xff6b6b);
      g.drawCircle(x, 0, 8);
      g.endFill();
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Factor Tree ────────────────────────────────────────────

  private renderFactorTree(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const number = (data.number as number) || 12;
    const factors = (data.factors as number[]) || [3, 4];

    // Root node
    if (progress > 0.1) {
      g.beginFill(0x6c5ce7);
      g.drawCircle(0, -50, 22);
      g.endFill();
      const rootText = new PIXI.Text(String(number), {
        fontSize: 16, fill: 0xffffff, fontWeight: 'bold',
      });
      rootText.anchor.set(0.5);
      rootText.x = 0;
      rootText.y = -50;
      this.currentDiagram!.addChild(rootText);
    }

    // Branches
    if (progress > 0.4) {
      const branchProgress = Math.min(1, (progress - 0.4) / 0.3);
      g.lineStyle(2, 0x999999);
      g.moveTo(0, -28);
      g.lineTo(-40 * branchProgress, 10);
      g.moveTo(0, -28);
      g.lineTo(40 * branchProgress, 10);
    }

    // Factor nodes
    factors.forEach((factor, i) => {
      const nodeProgress = (progress - 0.7 - i * 0.1) / 0.2;
      if (nodeProgress > 0) {
        const x = i === 0 ? -40 : 40;
        const alpha = Math.min(1, nodeProgress);
        g.beginFill(0x00b894, alpha);
        g.drawCircle(x, 20, 18);
        g.endFill();

        const factorText = new PIXI.Text(String(factor), {
          fontSize: 14, fill: 0xffffff, fontWeight: 'bold',
        });
        factorText.anchor.set(0.5);
        factorText.x = x;
        factorText.y = 20;
        factorText.alpha = alpha;
        this.currentDiagram!.addChild(factorText);
      }
    });

    this.currentDiagram!.addChild(g);
  }

  // ─── Body Diagram ───────────────────────────────────────────

  private renderBodyDiagram(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const parts = (data.parts as string[]) || ['Head', 'Chest', 'Arms', 'Legs'];
    const highlightIndex = data.highlightIndex as number;

    // Body outline
    g.lineStyle(2, 0x333333);
    // Head
    g.drawCircle(0, -60, 18);
    // Body
    g.drawRoundedRect(-15, -40, 30, 50, 8);
    // Arms
    g.moveTo(-15, -35);
    g.lineTo(-30, -10);
    g.moveTo(15, -35);
    g.lineTo(30, -10);
    // Legs
    g.moveTo(-10, 10);
    g.lineTo(-12, 40);
    g.moveTo(10, 10);
    g.lineTo(12, 40);

    // Highlight a part
    if (highlightIndex !== undefined && progress > 0.5) {
      g.lineStyle(3, 0xff6b6b);
      const highlights: Record<number, () => void> = {
        0: () => g.drawCircle(0, -60, 20),
        1: () => g.drawRoundedRect(-17, -42, 34, 54, 10),
        2: () => { g.moveTo(-17, -37); g.lineTo(-32, -12); g.moveTo(17, -37); g.lineTo(32, -12); },
        3: () => { g.moveTo(-12, 8); g.lineTo(-14, 42); g.moveTo(12, 8); g.lineTo(14, 42); },
      };
      highlights[highlightIndex]?.();
    }

    // Labels
    if (progress > 0.7) {
      parts.forEach((part, i) => {
        const labelY = -60 + i * 30;
        const labelText = new PIXI.Text(part, {
          fontSize: 10, fill: 0x666666,
        });
        labelText.x = 35;
        labelText.y = labelY - 5;
        this.currentDiagram!.addChild(labelText);
      });
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Plant Parts ────────────────────────────────────────────

  private renderPlantParts(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();

    // Roots
    if (progress > 0.1) {
      g.lineStyle(2, 0x8b4513);
      g.moveTo(0, 20);
      g.lineTo(-15, 45);
      g.moveTo(0, 20);
      g.lineTo(15, 45);
      g.moveTo(0, 20);
      g.lineTo(0, 50);
    }

    // Stem
    if (progress > 0.3) {
      g.lineStyle(4, 0x4a8b3a);
      g.moveTo(0, 20);
      g.lineTo(0, -20);
    }

    // Leaves
    if (progress > 0.5) {
      g.beginFill(0x5a9b4a);
      g.drawEllipse(-15, -5, 12, 6);
      g.drawEllipse(15, -10, 12, 6);
      g.endFill();
    }

    // Flower
    if (progress > 0.7) {
      g.beginFill(0xff69b4);
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        g.drawCircle(Math.cos(angle) * 8, -25 + Math.sin(angle) * 8, 6);
      }
      g.endFill();
      g.beginFill(0xffd700);
      g.drawCircle(0, -25, 5);
      g.endFill();
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Water Cycle ────────────────────────────────────────────

  private renderWaterCycle(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();

    // Sun
    if (progress > 0.1) {
      g.beginFill(0xffd700);
      g.drawCircle(80, -50, 18);
      g.endFill();
    }

    // Cloud
    if (progress > 0.3) {
      g.beginFill(0xe0e0e0, 0.8);
      g.drawCircle(-40, -40, 15);
      g.drawCircle(-25, -45, 18);
      g.drawCircle(-10, -40, 15);
      g.endFill();
    }

    // Rain
    if (progress > 0.5) {
      g.lineStyle(2, 0x4a90d9);
      for (let i = 0; i < 5; i++) {
        const x = -40 + i * 12;
        g.moveTo(x, -20);
        g.lineTo(x - 3, 0);
      }
    }

    // Water body
    if (progress > 0.7) {
      g.beginFill(0x4a90d9, 0.6);
      g.drawRoundedRect(-80, 20, 160, 20, 5);
      g.endFill();
    }

    // Evaporation arrow
    if (progress > 0.85) {
      g.lineStyle(2, 0x6c5ce7, 0.6);
      g.moveTo(-60, 15);
      g.quadraticCurveTo(-80, -20, -40, -30);
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Balance Scale ──────────────────────────────────────────

  private renderBalanceScale(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const leftWeight = (data.leftWeight as number) || 5;
    const rightWeight = (data.rightWeight as number) || 5;
    const balanced = leftWeight === rightWeight;
    const tiltAngle = balanced ? 0 : (leftWeight > rightWeight ? -0.15 : 0.15);

    // Base
    g.beginFill(0x8b4513);
    g.drawRoundedRect(-5, 30, 10, 30, 3);
    g.drawRoundedRect(-25, 55, 50, 8, 4);
    g.endFill();

    // Beam
    const beamContainer = new PIXI.Container();
    beamContainer.y = 10;
    beamContainer.rotation = progress > 0.5 ? tiltAngle * progress : 0;

    const beam = new PIXI.Graphics();
    beam.beginFill(0x6c5ce7);
    beam.drawRoundedRect(-50, -3, 100, 6, 3);
    beam.endFill();

    // Left pan
    beam.beginFill(0x00b894);
    beam.drawRoundedRect(-55, 5, 25, 4, 2);
    beam.drawRoundedRect(-50, 9, 15, 12, 3);
    beam.endFill();

    // Right pan
    beam.beginFill(0x00b894);
    beam.drawRoundedRect(30, 5, 25, 4, 2);
    beam.drawRoundedRect(35, 9, 15, 12, 3);
    beam.endFill();

    beamContainer.addChild(beam);
    this.currentDiagram!.addChild(beamContainer);
    this.currentDiagram!.addChild(g);
  }

  // ─── Counting Objects ───────────────────────────────────────

  private renderCountingObjects(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const count = (data.count as number) || 5;
    const shape = (data.shape as string) || 'apple';
    const visibleCount = Math.floor(progress * count);
    const spacing = 40;
    const startX = -((count - 1) * spacing) / 2;

    for (let i = 0; i < visibleCount; i++) {
      const x = startX + i * spacing;
      const g = new PIXI.Graphics();

      switch (shape) {
        case 'apple':
          g.beginFill(0xff4444);
          g.drawCircle(x, 0, 12);
          g.endFill();
          g.beginFill(0x4a8b3a);
          g.drawEllipse(x + 3, -12, 3, 5);
          g.endFill();
          break;
        case 'star':
          g.beginFill(0xffd700);
          drawStar(g, x, 0, 5, 12, 5);
          g.endFill();
          break;
        case 'ball':
          g.beginFill(0x6c5ce7);
          g.drawCircle(x, 0, 12);
          g.endFill();
          break;
        default:
          g.beginFill(0xff6b6b);
          g.drawCircle(x, 0, 10);
          g.endFill();
      }

      // Count label
      const numText = new PIXI.Text(String(i + 1), {
        fontSize: 10, fill: 0x333333,
      });
      numText.anchor.set(0.5);
      numText.x = x;
      numText.y = 20;
      this.currentDiagram!.addChild(numText);

      this.currentDiagram!.addChild(g);
    }
  }

  // ─── Bar Chart ──────────────────────────────────────────────

  private renderBarChart(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const bars = (data.bars as { label: string; value: number; color?: number }[]) || [
      { label: 'A', value: 30 },
      { label: 'B', value: 50 },
      { label: 'C', value: 40 },
    ];
    const maxVal = Math.max(...bars.map(b => b.value));
    const barW = 40;
    const spacing = 55;
    const startX = -((bars.length - 1) * spacing) / 2;
    const chartH = 80;

    // Axis
    g.lineStyle(2, 0x333333);
    g.moveTo(startX - 20, 40);
    g.lineTo(startX + bars.length * spacing, 40);
    g.moveTo(startX - 20, 40);
    g.lineTo(startX - 20, 40 - chartH);

    bars.forEach((bar, i) => {
      const x = startX + i * spacing;
      const barH = (bar.value / maxVal) * chartH * progress;
      const color = bar.color || 0x6c5ce7;

      g.beginFill(color);
      g.drawRect(x - barW / 2, 40 - barH, barW, barH);
      g.endFill();

      // Label
      const labelText = new PIXI.Text(bar.label, {
        fontSize: 10, fill: 0x666666,
      });
      labelText.anchor.set(0.5);
      labelText.x = x;
      labelText.y = 50;
      this.currentDiagram!.addChild(labelText);
    });

    this.currentDiagram!.addChild(g);
  }

  // ─── Shape Sorter ───────────────────────────────────────────

  private renderShapeSorter(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const shapes = (data.shapes as string[]) || ['circle', 'square', 'triangle'];
    const visibleShapes = Math.floor(progress * shapes.length);
    const spacing = 50;
    const startX = -((shapes.length - 1) * spacing) / 2;

    for (let i = 0; i < visibleShapes; i++) {
      const x = startX + i * spacing;
      const shape = shapes[i];
      g.beginFill(0x6c5ce7);

      switch (shape) {
        case 'circle':
          g.drawCircle(x, 0, 18);
          break;
        case 'square':
          g.drawRect(x - 16, -16, 32, 32);
          break;
        case 'triangle':
          g.moveTo(x, -18);
          g.lineTo(x - 16, 14);
          g.lineTo(x + 16, 14);
          g.closePath();
          break;
        case 'rectangle':
          g.drawRect(x - 20, -10, 40, 20);
          break;
        case 'star':
          drawStar(g, x, 0, 5, 18, 8);
          break;
      }
      g.endFill();
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Pattern Builder ────────────────────────────────────────

  private renderPatternBuilder(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const pattern = (data.pattern as string[]) || ['red', 'blue', 'red', 'blue'];
    const visibleCount = Math.floor(progress * pattern.length);
    const spacing = 35;
    const startX = -((pattern.length - 1) * spacing) / 2;

    const colorMap: Record<string, number> = {
      red: 0xff6b6b, blue: 0x4ecdc4, green: 0x55efc4,
      yellow: 0xffd700, purple: 0xa29bfe, orange: 0xff9f43,
    };

    for (let i = 0; i < visibleCount; i++) {
      const x = startX + i * spacing;
      const color = colorMap[pattern[i]] || 0xcccccc;
      g.beginFill(color);
      g.drawCircle(x, 0, 14);
      g.endFill();
    }

    // Question mark for missing
    if (progress > 0.8 && data.missingIndex !== undefined) {
      const missingIdx = data.missingIndex as number;
      const x = startX + missingIdx * spacing;
      g.beginFill(0xf0f0f0);
      g.drawCircle(x, 0, 14);
      g.endFill();
      g.lineStyle(2, 0x999999);
      g.drawCircle(x, 0, 14);

      const qText = new PIXI.Text('?', {
        fontSize: 16, fill: 0x999999, fontWeight: 'bold',
      });
      qText.anchor.set(0.5);
      qText.x = x;
      qText.y = 0;
      this.currentDiagram!.addChild(qText);
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Solar System ───────────────────────────────────────────

  private renderSolarSystem(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const planets = (data.planets as { name: string; color: number; distance: number; size: number }[]) || [
      { name: 'Mercury', color: 0xaaaaaa, distance: 30, size: 4 },
      { name: 'Venus', color: 0xffcc66, distance: 50, size: 7 },
      { name: 'Earth', color: 0x4a90d9, distance: 70, size: 8 },
      { name: 'Mars', color: 0xff6b6b, distance: 90, size: 6 },
    ];

    // Sun
    g.beginFill(0xffd700);
    g.drawCircle(0, 0, 15);
    g.endFill();

    // Orbits and planets
    planets.forEach((planet, i) => {
      const planetProgress = (progress - i * 0.15) / 0.3;
      if (planetProgress > 0) {
        // Orbit
        g.lineStyle(1, 0x999999, 0.3);
        g.drawCircle(0, 0, planet.distance);

        // Planet
        g.beginFill(planet.color, Math.min(1, planetProgress));
        g.drawCircle(planet.distance, 0, planet.size);
        g.endFill();
      }
    });

    this.currentDiagram!.addChild(g);
  }

  // ─── Circuit ────────────────────────────────────────────────

  private renderCircuit(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const isComplete = (data.complete as boolean) || false;
    const wireColor = isComplete && progress > 0.8 ? 0x00b894 : 0x999999;

    // Battery
    g.beginFill(0x333333);
    g.drawRect(-60, -20, 15, 40);
    g.endFill();
    g.beginFill(0xffd700);
    g.drawRect(-55, -25, 5, 50);
    g.endFill();

    // Wires
    g.lineStyle(3, wireColor);
    g.moveTo(-52, -20);
    g.lineTo(-52, -50);
    g.lineTo(40, -50);
    g.lineTo(40, -20);

    // Bulb
    g.beginFill(isComplete && progress > 0.8 ? 0xffd700 : 0xcccccc);
    g.drawCircle(40, 0, 15);
    g.endFill();
    g.lineStyle(2, 0x666666);
    g.drawCircle(40, 0, 15);

    // Return wire
    g.lineStyle(3, wireColor);
    g.moveTo(40, 15);
    g.lineTo(40, 50);
    g.lineTo(-52, 50);
    g.lineTo(-52, 20);

    this.currentDiagram!.addChild(g);
  }

  // ─── Food Chain ─────────────────────────────────────────────

  private renderFoodChain(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const chain = (data.chain as string[]) || ['Plant', 'Grasshopper', 'Frog', 'Snake'];
    const visibleCount = Math.floor(progress * chain.length);

    // Boxes sized to their labels (fixed 50px boxes clipped longer names).
    const boxH = 30;
    const minBoxW = 50;
    const gap = 20;
    const labels = chain.map(s => new PIXI.Text(s, { fontSize: 9, fill: 0xffffff, fontWeight: 'bold' }));
    const widths = labels.map(t => Math.max(minBoxW, Math.ceil(t.width) + 20));
    const totalW = widths.reduce((a, w) => a + w, 0) + gap * (chain.length - 1);
    let cursor = -totalW / 2;

    for (let i = 0; i < visibleCount; i++) {
      const bw = widths[i];
      const cx = cursor + bw / 2;

      g.lineStyle(0);
      g.beginFill(0x6c5ce7, 0.8);
      g.drawRoundedRect(cursor, -boxH / 2, bw, boxH, 6);
      g.endFill();

      const labelText = labels[i];
      labelText.anchor.set(0.5);
      labelText.x = cx;
      labelText.y = 0;
      this.currentDiagram!.addChild(labelText);

      cursor += bw + gap;
    }

    // Arrows after fills (see renderGenericFlow); stop short of the next box.
    cursor = -totalW / 2;
    for (let i = 0; i < visibleCount; i++) {
      const bw = widths[i];
      if (i < visibleCount - 1) {
        const x0 = cursor + bw;
        const x1 = cursor + bw + gap - 4;
        g.lineStyle(2, 0xff6b6b);
        g.moveTo(x0, 0);
        g.lineTo(x1, 0);
        g.moveTo(x1 - 5, -3);
        g.lineTo(x1, 0);
        g.lineTo(x1 - 5, 3);
      }
      cursor += bw + gap;
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Map of India ───────────────────────────────────────────

  private renderMapIndia(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();

    // Simplified India outline
    g.beginFill(0x4a8b3a, 0.6);
    g.lineStyle(2, 0x333333);
    g.moveTo(-40, -40);
    g.lineTo(-30, -50);
    g.lineTo(-10, -55);
    g.lineTo(10, -50);
    g.lineTo(30, -45);
    g.lineTo(40, -30);
    g.lineTo(35, -10);
    g.lineTo(20, 10);
    g.lineTo(10, 30);
    g.lineTo(0, 50);
    g.lineTo(-10, 30);
    g.lineTo(-25, 10);
    g.lineTo(-35, -10);
    g.lineTo(-40, -40);
    g.closePath();
    g.endFill();

    // Highlight a region
    const region = data.region as { x: number; y: number; label: string };
    if (region && progress > 0.5) {
      g.beginFill(0xff6b6b, 0.7);
      g.drawCircle(region.x, region.y, 8);
      g.endFill();

      const labelText = new PIXI.Text(region.label, {
        fontSize: 10, fill: 0x333333, fontWeight: 'bold',
      });
      labelText.x = region.x + 10;
      labelText.y = region.y - 5;
      this.currentDiagram!.addChild(labelText);
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Timeline ───────────────────────────────────────────────

  private renderTimeline(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const events = (data.events as { time: string; label: string }[]) || [
      { time: '0', label: 'Start' },
      { time: '1', label: 'Middle' },
      { time: '2', label: 'End' },
    ];
    const lineLength = 240;
    const startX = -lineLength / 2;
    const visibleLength = lineLength * progress;

    // Timeline
    g.lineStyle(3, 0x333333);
    g.moveTo(startX, 0);
    g.lineTo(startX + visibleLength, 0);

    // Events
    const visibleEvents = Math.floor(progress * events.length);
    for (let i = 0; i < visibleEvents; i++) {
      const x = startX + (i / (events.length - 1)) * lineLength;
      g.beginFill(0x6c5ce7);
      g.drawCircle(x, 0, 6);
      g.endFill();

      const timeText = new PIXI.Text(events[i].time, {
        fontSize: 9, fill: 0x6c5ce7, fontWeight: 'bold',
      });
      timeText.anchor.set(0.5);
      timeText.x = x;
      timeText.y = -15;
      this.currentDiagram!.addChild(timeText);

      const labelText = new PIXI.Text(events[i].label, {
        fontSize: 9, fill: 0x666666,
      });
      labelText.anchor.set(0.5);
      labelText.x = x;
      labelText.y = 15;
      this.currentDiagram!.addChild(labelText);
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Venn Diagram ───────────────────────────────────────────

  private renderVennDiagram(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const labelA = (data.labelA as string) || 'A';
    const labelB = (data.labelB as string) || 'B';

    // Circle A
    g.beginFill(0x6c5ce7, 0.3);
    g.lineStyle(2, 0x6c5ce7);
    g.drawCircle(-20, 0, 35);
    g.endFill();

    // Circle B
    g.beginFill(0xff6b6b, 0.3);
    g.lineStyle(2, 0xff6b6b);
    g.drawCircle(20, 0, 35);
    g.endFill();

    if (progress > 0.5) {
      const textA = new PIXI.Text(labelA, { fontSize: 12, fill: 0x6c5ce7, fontWeight: 'bold' });
      textA.anchor.set(0.5);
      textA.x = -40;
      textA.y = -25;
      this.currentDiagram!.addChild(textA);

      const textB = new PIXI.Text(labelB, { fontSize: 12, fill: 0xff6b6b, fontWeight: 'bold' });
      textB.anchor.set(0.5);
      textB.x = 40;
      textB.y = -25;
      this.currentDiagram!.addChild(textB);
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Generic Flow ───────────────────────────────────────────

  private renderGenericFlow(data: Record<string, unknown>, progress: number): void {
    if (!this.currentDiagram) return;
    const g = new PIXI.Graphics();
    const steps = (data.steps as string[]) || ['Input', 'Process', 'Output'];
    const visibleCount = Math.floor(progress * steps.length);

    // Boxes sized to their labels (the old fixed 60px box overflowed any real
    // step label); layout flows left→right from a centered total width, so
    // stage-fit keeps the whole chain in frame.
    const boxH = 32;
    const minBoxW = 60;
    const gap = 26;
    const labels = steps.map(s => new PIXI.Text(s, { fontSize: 11, fill: 0xffffff, fontWeight: 'bold' }));
    const widths = labels.map(t => Math.max(minBoxW, Math.ceil(t.width) + 28));
    const totalW = widths.reduce((a, w) => a + w, 0) + gap * (steps.length - 1);
    let cursor = -totalW / 2;

    for (let i = 0; i < visibleCount; i++) {
      const bw = widths[i];
      const cx = cursor + bw / 2;

      g.lineStyle(0);
      g.beginFill(0x6c5ce7, 0.8);
      g.drawRoundedRect(cursor, -boxH / 2, bw, boxH, 8);
      g.endFill();

      const labelText = labels[i];
      labelText.anchor.set(0.5);
      labelText.x = cx;
      labelText.y = 0;
      this.currentDiagram!.addChild(labelText);

      cursor += bw + gap;
    }

    // Arrows after fills so box strokes never inherit the arrow color; stop
    // 4px short of the next box so the head doesn't read as its border.
    cursor = -totalW / 2;
    for (let i = 0; i < visibleCount; i++) {
      const bw = widths[i];
      if (i < visibleCount - 1) {
        const x0 = cursor + bw;
        const x1 = cursor + bw + gap - 4;
        g.lineStyle(2, 0xff6b6b);
        g.moveTo(x0, 0);
        g.lineTo(x1, 0);
        g.moveTo(x1 - 5, -3);
        g.lineTo(x1, 0);
        g.lineTo(x1 - 5, 3);
      }
      cursor += bw + gap;
    }

    this.currentDiagram!.addChild(g);
  }

  // ─── Update Loop ────────────────────────────────────────────

  update(delta: number): void {
    const dt = delta / 60;

    // Animate step-by-step
    if (this.totalSteps > 0 && this.animationStep < this.totalSteps) {
      this.animationTimer += dt;
      if (this.animationTimer > 0.5) {
        this.animationTimer = 0;
        this.animationStep++;
        // Re-render with new progress
        if (this.currentDiagram) {
          this.container.removeChild(this.currentDiagram);
          this.currentDiagram.destroy({ children: true });
          this.currentDiagram = new PIXI.Container();
          this.currentDiagram.x = this.width / 2;
          this.currentDiagram.y = this.centerY();
          this.container.addChild(this.currentDiagram);
          this.renderDiagram(this.currentType, this.currentData, this.animationStep / this.totalSteps);
          this.fitToStage();
        }
      }
    }
  }

  private currentType: DiagramType = 'generic-flow';
  private currentData: Record<string, unknown> = {};

  // ─── Resize ─────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    if (this.currentDiagram) {
      this.currentDiagram.x = width / 2;
      this.currentDiagram.y = this.centerY();
      this.fitToStage();
    }
  }

  // ─── Cleanup ────────────────────────────────────────────────

  destroy(): void {
    if (this.currentDiagram) {
      this.container.removeChild(this.currentDiagram);
      this.currentDiagram.destroy({ children: true });
      this.currentDiagram = null;
    }
  }
}
