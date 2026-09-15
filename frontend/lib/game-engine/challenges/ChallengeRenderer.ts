/**
 * ChallengeRenderer — Renders interactive challenges with physics
 *
 * UPGRADE 2: SVG objects as the interaction (not decoration)
 * - Tap actual objects on screen to answer
 * - Drag real objects to bins with physics (momentum, snap, collision)
 * - Near-miss detection: if you drop close to a bin, it snaps
 * - Objects are the primary visual, not text buttons
 *
 * Uses Matter.js for physics-based drag-and-drop.
 */

import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import { drawStar } from '../pixi-utils';
import type { InteractiveObject, SortItem, SortBin } from '../types';

interface DragState {
  objectId: string;
  body: Matter.Body;
  sprite: PIXI.Graphics;
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
}

export class ChallengeRenderer {
  private objectLayer: PIXI.Container;
  private uiLayer: PIXI.Container;
  private width: number;
  private height: number;
  private app: PIXI.Application;

  private matterEngine: Matter.Engine;
  private matterWorld: Matter.World;

  private objects: Map<string, { sprite: PIXI.Graphics; body: Matter.Body; data: InteractiveObject }> = new Map();
  private bins: Map<string, { sprite: PIXI.Graphics; body: Matter.Body; data: SortBin }> = new Map();
  private dragState: DragState | null = null;
  private placements: Record<string, string> = {};

  private onTapCallback: ((objectId: string) => void) | null = null;
  private onSortCallback: ((placements: Record<string, string>) => void) | null = null;

  private pointerDownHandler: (e: PIXI.FederatedPointerEvent) => void;
  private pointerMoveHandler: (e: PIXI.FederatedPointerEvent) => void;
  private pointerUpHandler: (e: PIXI.FederatedPointerEvent) => void;

  constructor(
    objectLayer: PIXI.Container,
    uiLayer: PIXI.Container,
    width: number,
    height: number,
    app: PIXI.Application,
  ) {
    this.objectLayer = objectLayer;
    this.uiLayer = uiLayer;
    this.width = width;
    this.height = height;
    this.app = app;

    // Initialize Matter.js
    this.matterEngine = Matter.Engine.create();
    this.matterWorld = this.matterEngine.world;
    this.matterWorld.gravity.y = 0; // No gravity — we control dragging

    // Pointer handlers
    this.pointerDownHandler = (e) => this.onPointerDown(e);
    this.pointerMoveHandler = (e) => this.onPointerMove(e);
    this.pointerUpHandler = (e) => this.onPointerUp(e);

    this.app.stage.on('pointerdown', this.pointerDownHandler);
    this.app.stage.on('pointermove', this.pointerMoveHandler);
    this.app.stage.on('pointerup', this.pointerUpHandler);
    this.app.stage.on('pointerupoutside', this.pointerUpHandler);
  }

  // ─── Interactive Objects (tap challenges) ───────────────────

  renderInteractiveObjects(
    objects: InteractiveObject[],
    onTap: (objectId: string) => void,
  ): void {
    this.clear();
    this.onTapCallback = onTap;

    for (const obj of objects) {
      const x = obj.x * this.width;
      const y = obj.y * this.height;
      const size = obj.size || 50;
      const color = obj.color ? parseInt(obj.color.replace('#', '0x')) : 0x6c5ce7;

      // Use a container so we can add the shape + label together
      const container = new PIXI.Container();
      container.x = x;
      container.y = y;
      container.eventMode = 'static';
      container.cursor = 'pointer';

      const sprite = new PIXI.Graphics();
      this.drawObjectByKind(sprite, obj.kind, color, size);
      container.addChild(sprite);

      // Add a text label on top of the object so students can read the answer
      if (obj.label) {
        const label = new PIXI.Text(obj.label, {
          fontFamily: 'Arial',
          fontSize: 16,
          fill: 0xffffff,
          fontWeight: 'bold',
          stroke: 0x333333,
          strokeThickness: 3,
        });
        label.anchor.set(0.5);
        label.x = 0;
        label.y = 0;
        container.addChild(label);
      }

      // Hover effect
      container.on('pointerover', () => {
        container.scale.set(1.1);
      });
      container.on('pointerout', () => {
        container.scale.set(1);
      });

      // Tap effect
      container.on('pointertap', () => {
        this.flashObject(sprite);
        if (this.onTapCallback) {
          this.onTapCallback(obj.id);
        }
      });

      this.objectLayer.addChild(container);

      // Create a static matter body for collision reference
      const body = Matter.Bodies.circle(x, y, size / 2, { isStatic: true });
      Matter.World.add(this.matterWorld, body);

      this.objects.set(obj.id, { sprite, body, data: obj });
    }
  }

  // ─── Sort Challenge (drag-to-bin) ───────────────────────────

  renderSortChallenge(
    items: SortItem[],
    bins: SortBin[],
    onComplete: (placements: Record<string, string>) => void,
  ): void {
    this.clear();
    this.onSortCallback = onComplete;
    this.placements = {};

    // Render bins at top
    const binW = 110;
    const binH = 100;
    const binSpacing = 130;
    const binStartX = (this.width - (bins.length - 1) * binSpacing) / 2 - binW / 2;
    const binY = 80;

    bins.forEach((bin, i) => {
      const x = binStartX + i * binSpacing;
      const color = parseInt(bin.color.replace('#', '0x')) || 0x6c5ce7;

      const sprite = new PIXI.Graphics();
      // Bin body
      sprite.beginFill(color, 0.2);
      sprite.lineStyle(3, color);
      sprite.drawRoundedRect(0, 0, binW, binH, 8);
      sprite.endFill();
      // Bin label
      const label = new PIXI.Text(bin.label, {
        fontSize: 12, fill: color, fontWeight: 'bold',
      });
      label.anchor.set(0.5);
      label.x = binW / 2;
      label.y = binH / 2;
      sprite.addChild(label);

      sprite.x = x;
      sprite.y = binY;
      this.objectLayer.addChild(sprite);

      // Matter body for bin (sensor)
      const body = Matter.Bodies.rectangle(x + binW / 2, binY + binH / 2, binW, binH, {
        isStatic: true,
        isSensor: true,
      });
      Matter.World.add(this.matterWorld, body);
      this.bins.set(bin.id, { sprite, body, data: bin });
    });

    // Render draggable items at bottom
    const itemSize = 55;
    const itemSpacing = 80;
    const itemStartX = (this.width - (items.length - 1) * itemSpacing) / 2 - itemSize / 2;
    const itemY = this.height - 120;

    items.forEach((item, i) => {
      const x = itemStartX + i * itemSpacing;
      const sprite = new PIXI.Graphics();
      this.drawSortItem(sprite, item, itemSize);
      sprite.x = x;
      sprite.y = itemY;
      sprite.eventMode = 'static';
      sprite.cursor = 'grab';

      this.objectLayer.addChild(sprite);

      // Matter body for item
      const body = Matter.Bodies.circle(x, itemY, itemSize / 2, {
        isStatic: false,
        restitution: 0.3,
      });
      Matter.World.add(this.matterWorld, body);

      this.objects.set(item.id, {
        sprite,
        body,
        data: {
          id: item.id,
          kind: item.icon,
          label: item.label,
          x: x / this.width,
          y: itemY / this.height,
          size: itemSize,
          interaction: 'drag-to-bin',
          category: item.correctBin,
        },
      });
    });
  }

  // ─── Pointer Handling (drag) ────────────────────────────────

  private onPointerDown(e: PIXI.FederatedPointerEvent): void {
    const pos = e.global;
    // Find object under pointer
    for (const [id, obj] of Array.from(this.objects)) {
      if (obj.data.interaction === 'tap') continue;

      const dx = pos.x - obj.sprite.x;
      const dy = pos.y - obj.sprite.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = (obj.data.size || 50) / 2;

      if (dist < radius) {
        this.dragState = {
          objectId: id,
          body: obj.body,
          sprite: obj.sprite,
          offsetX: dx,
          offsetY: dy,
          isDragging: true,
        };
        Matter.Body.setStatic(obj.body, false);
        obj.sprite.cursor = 'grabbing';
        obj.sprite.zIndex = 100;
        break;
      }
    }
  }

  private onPointerMove(e: PIXI.FederatedPointerEvent): void {
    if (!this.dragState || !this.dragState.isDragging) return;
    const pos = e.global;
    const newX = pos.x - this.dragState.offsetX;
    const newY = pos.y - this.dragState.offsetY;
    Matter.Body.setPosition(this.dragState.body, { x: newX, y: newY });
    this.dragState.sprite.x = newX;
    this.dragState.sprite.y = newY;

    // Highlight bins on hover
    for (const [binId, bin] of Array.from(this.bins)) {
      const binBody = bin.body;
      const binPos = binBody.position;
      const dist = Matter.Vector.magnitude(
        Matter.Vector.sub(this.dragState.body.position, binPos),
      );
      if (dist < 80) {
        bin.sprite.alpha = 0.8;
        bin.sprite.scale.set(1.05);
      } else {
        bin.sprite.alpha = 1;
        bin.sprite.scale.set(1);
      }
    }
  }

  private onPointerUp(e: PIXI.FederatedPointerEvent): void {
    if (!this.dragState) return;
    const obj = this.objects.get(this.dragState.objectId);
    if (!obj) {
      this.dragState = null;
      return;
    }

    obj.sprite.cursor = 'grab';
    obj.sprite.zIndex = 1;

    // Check if dropped on a bin
    let droppedBin: string | null = null;
    let minDist = Infinity;

    for (const [binId, bin] of Array.from(this.bins)) {
      const dist = Matter.Vector.magnitude(
        Matter.Vector.sub(this.dragState.body.position, bin.body.position),
      );
      // Near-miss detection: snap if within 60px
      if (dist < 60 && dist < minDist) {
        minDist = dist;
        droppedBin = binId;
      }
    }

    if (droppedBin) {
      // Snap to bin
      const bin = this.bins.get(droppedBin)!;
      const binPos = bin.body.position;
      Matter.Body.setPosition(this.dragState.body, { x: binPos.x, y: binPos.y });
      obj.sprite.x = binPos.x;
      obj.sprite.y = binPos.y;
      this.placements[this.dragState.objectId] = droppedBin;

      // Check if all items placed
      if (Object.keys(this.placements).length === this.objects.size) {
        if (this.onSortCallback) {
          this.onSortCallback(this.placements);
        }
      }
    } else {
      // Return to original position (or let it stay)
      Matter.Body.setStatic(this.dragState.body, true);
    }

    this.dragState = null;
  }

  // ─── Object Drawing ─────────────────────────────────────────

  private drawObjectByKind(g: PIXI.Graphics, kind: string, color: number, size: number): void {
    const r = size / 2;
    switch (kind) {
      case 'apple':
        g.beginFill(0xff4444);
        g.drawCircle(0, 0, r);
        g.endFill();
        g.beginFill(0x4a8b3a);
        g.drawEllipse(2, -r, 3, 5);
        g.endFill();
        g.beginFill(0xffffff, 0.3);
        g.drawCircle(-r * 0.3, -r * 0.3, r * 0.2);
        g.endFill();
        break;
      case 'ball':
        g.beginFill(color);
        g.drawCircle(0, 0, r);
        g.endFill();
        g.lineStyle(2, 0x333333, 0.3);
        g.drawCircle(0, 0, r * 0.7);
        break;
      case 'star':
        g.beginFill(0xffd700);
        drawStar(g, 0, 0, 5, r, r * 0.4);
        g.endFill();
        break;
      case 'square':
      case 'shape-square':
        g.beginFill(color);
        g.drawRect(-r, -r, size, size);
        g.endFill();
        g.lineStyle(2, 0x333333, 0.3);
        g.drawRect(-r, -r, size, size);
        break;
      case 'circle':
      case 'shape-circle':
        g.beginFill(color);
        g.drawCircle(0, 0, r);
        g.endFill();
        g.lineStyle(2, 0x333333, 0.3);
        g.drawCircle(0, 0, r);
        break;
      case 'triangle':
      case 'shape-triangle':
        g.beginFill(color);
        g.moveTo(0, -r);
        g.lineTo(-r, r);
        g.lineTo(r, r);
        g.closePath();
        g.endFill();
        g.lineStyle(2, 0x333333, 0.3);
        g.moveTo(0, -r);
        g.lineTo(-r, r);
        g.lineTo(r, r);
        g.closePath();
        break;
      case 'rectangle':
      case 'shape-rectangle':
        g.beginFill(color);
        g.drawRect(-r * 1.3, -r * 0.7, size * 1.3, size * 0.7);
        g.endFill();
        break;
      case 'pizza':
        g.beginFill(0xffd700);
        g.drawCircle(0, 0, r);
        g.endFill();
        g.beginFill(0xff6b6b, 0.5);
        g.drawCircle(0, 0, r * 0.7);
        g.endFill();
        break;
      case 'leaf':
        g.beginFill(0x4a8b3a);
        g.drawEllipse(0, 0, r * 0.6, r);
        g.endFill();
        break;
      case 'flower':
        g.beginFill(color);
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          g.drawCircle(Math.cos(angle) * r * 0.5, Math.sin(angle) * r * 0.5, r * 0.4);
        }
        g.endFill();
        g.beginFill(0xffd700);
        g.drawCircle(0, 0, r * 0.3);
        g.endFill();
        break;
      case 'water-drop':
        g.beginFill(0x4a90d9);
        g.moveTo(0, -r);
        g.bezierCurveTo(r, -r * 0.3, r, r * 0.5, 0, r);
        g.bezierCurveTo(-r, r * 0.5, -r, -r * 0.3, 0, -r);
        g.endFill();
        break;
      default:
        g.beginFill(color);
        g.drawRoundedRect(-r, -r, size, size, 8);
        g.endFill();
        g.lineStyle(2, 0x333333, 0.3);
        g.drawRoundedRect(-r, -r, size, size, 8);
    }

    // Label
    if (kind !== 'apple' && kind !== 'star') {
      // Labels handled by caller for specific kinds
    }
  }

  private drawSortItem(g: PIXI.Graphics, item: SortItem, size: number): void {
    const r = size / 2;
    // Card background
    g.beginFill(0xffffff);
    g.lineStyle(2, 0x6c5ce7);
    g.drawRoundedRect(-r, -r, size, size, 8);
    g.endFill();

    // Icon (simplified)
    g.beginFill(0x6c5ce7, 0.3);
    g.drawCircle(0, -r * 0.3, r * 0.4);
    g.endFill();

    // Label
    const label = new PIXI.Text(item.label, {
      fontSize: 9, fill: 0x333333, fontWeight: 'bold', wordWrap: true, wordWrapWidth: size - 4,
    });
    label.anchor.set(0.5);
    label.x = 0;
    label.y = r * 0.4;
    g.addChild(label);
  }

  private flashObject(sprite: PIXI.Graphics): void {
    const originalScale = sprite.scale.x;
    sprite.scale.set(originalScale * 1.3);
    setTimeout(() => sprite.scale.set(originalScale), 150);
  }

  // ─── Update Loop ────────────────────────────────────────────

  update(_delta: number): void {
    // Sync sprite positions with matter bodies
    for (const [, obj] of Array.from(this.objects)) {
      if (!this.dragState || this.dragState.objectId !== obj.data.id) {
        obj.sprite.x = obj.body.position.x;
        obj.sprite.y = obj.body.position.y;
      }
    }
  }

  // ─── Resize ─────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  // ─── Cleanup ────────────────────────────────────────────────

  private clear(): void {
    this.objects.forEach(obj => {
      this.objectLayer.removeChild(obj.sprite);
      Matter.World.remove(this.matterWorld, obj.body);
    });
    this.bins.forEach(bin => {
      this.objectLayer.removeChild(bin.sprite);
      Matter.World.remove(this.matterWorld, bin.body);
    });
    this.objects.clear();
    this.bins.clear();
    this.placements = {};
    this.dragState = null;
  }

  destroy(): void {
    this.clear();
    this.app.stage.off('pointerdown', this.pointerDownHandler);
    this.app.stage.off('pointermove', this.pointerMoveHandler);
    this.app.stage.off('pointerup', this.pointerUpHandler);
    this.app.stage.off('pointerupoutside', this.pointerUpHandler);
    Matter.World.clear(this.matterWorld, false);
    Matter.Engine.clear(this.matterEngine);
  }
}
