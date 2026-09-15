/**
 * GeometryConstructionSimulation
 *
 * Students use a virtual protractor and ruler to construct angles and
 * measure shapes. They drag the protractor to the vertex, then drag
 * a ray to the correct angle measurement.
 *
 * Topics: geometry, construction, protractor, angle, measure, triangle,
 * perpendicular, bisector
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Plugin ──────────────────────────────────────────────────

class GeometryConstructionSimulationPlugin implements SimulationPlugin {
  id = 'geometry-construction';
  subject = 'maths';
  topics = ['geometry', 'construction', 'protractor', 'angle', 'measure angle', 'draw angle', 'triangle', 'perpendicular', 'bisector'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      subject === 'maths' && (
        q.includes('construct') ||
        q.includes('protractor') ||
        q.includes('measure angle') ||
        q.includes('draw angle') ||
        q.includes('draw a triangle') ||
        q.includes('construct a triangle') ||
        (q.includes('angle') && q.match(/\d+\s*(degree|°)/) !== null)
      )
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'place_protractor',
        mascotNarration: 'Watch me! First, I place the protractor center on the vertex point.',
        mascotAction: (sim) => {
          const protractor = sim.container.children.find(c => c.name === 'protractor') as PIXI.Container | undefined;
          const vertex = sim.container.children.find(c => c.name === 'vertex') as PIXI.Graphics | undefined;
          if (protractor && vertex) {
            gsap.to(protractor, { x: vertex.x, y: vertex.y, duration: 1, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag the protractor so its center is on the vertex point.',
        hint: 'Drag the protractor so the center dot is on the vertex!',
      },
      {
        id: 'draw_ray',
        mascotNarration: 'Now I drag the ray to the correct angle measurement on the protractor.',
        mascotAction: (sim) => {
          const ray = sim.container.children.find(c => c.name === 'ray') as PIXI.Graphics | undefined;
          if (ray) {
            gsap.to(ray, { rotation: 0.5, duration: 1, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Drag the ray to the correct angle on the protractor scale!',
        hint: 'Drag the ray to match the target angle on the protractor!',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, question, answer } = ctx;
    const cx = width / 2;
    const cy = height / 2 + 20;
    let solved = false;

    // Parse target angle from question
    const q = question.toLowerCase();
    const angleMatch = q.match(/(\d+)\s*(?:degree|°)/);
    const targetAngle = angleMatch ? parseInt(angleMatch[1]) : 90;

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text(`📐 Construct a ${targetAngle}° angle!`, {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Base line (horizontal) ─────────────────────────────
    const baseLine = new PIXI.Graphics();
    baseLine.lineStyle(3, 0x374151);
    baseLine.moveTo(cx - 100, cy);
    baseLine.lineTo(cx + 100, cy);
    container.addChild(baseLine);

    // ─── Vertex point ───────────────────────────────────────
    const vertex = new PIXI.Graphics();
    vertex.name = 'vertex';
    vertex.beginFill(0xef4444);
    vertex.drawCircle(0, 0, 6);
    vertex.endFill();
    vertex.x = cx;
    vertex.y = cy;
    container.addChild(vertex);

    const vertexLabel = new PIXI.Text('Vertex', { fontSize: 10, fill: 0xef4444, fontWeight: 'bold' });
    vertexLabel.anchor.set(0.5);
    vertexLabel.x = cx;
    vertexLabel.y = cy + 18;
    container.addChild(vertexLabel);

    // ─── Rotating ray (student drags this) ──────────────────
    const ray = new PIXI.Graphics();
    ray.name = 'ray';
    ray.lineStyle(3, 0x3b82f6);
    ray.moveTo(0, 0);
    ray.lineTo(100, 0);
    ray.x = cx;
    ray.y = cy;
    ray.rotation = 0;
    ray.eventMode = 'static';
    ray.cursor = 'grab';
    // Add invisible hit area for easier dragging
    const hitArea = new PIXI.Graphics();
    hitArea.beginFill(0xffffff, 0.001);
    hitArea.drawRect(0, -15, 100, 30);
    hitArea.endFill();
    ray.addChild(hitArea);
    container.addChild(ray);

    // Ray endpoint (draggable handle)
    const rayHandle = new PIXI.Graphics();
    rayHandle.beginFill(0x3b82f6);
    rayHandle.drawCircle(0, 0, 8);
    rayHandle.endFill();
    rayHandle.lineStyle(2, 0x1e40af);
    rayHandle.drawCircle(0, 0, 8);
    rayHandle.x = cx + 100;
    rayHandle.y = cy;
    rayHandle.eventMode = 'static';
    rayHandle.cursor = 'grab';
    container.addChild(rayHandle);

    // ─── Angle readout ──────────────────────────────────────
    const angleText = new PIXI.Text('0°', { fontSize: 20, fill: 0x3b82f6, fontWeight: 'bold' });
    angleText.anchor.set(0.5);
    angleText.x = cx;
    angleText.y = cy - 40;
    container.addChild(angleText);

    const targetText = new PIXI.Text(`Target: ${targetAngle}°`, { fontSize: 14, fill: 0xef4444, fontWeight: 'bold' });
    targetText.anchor.set(0.5);
    targetText.x = cx;
    targetText.y = cy - 65;
    container.addChild(targetText);

    // ─── Protractor (draggable) ─────────────────────────────
    const protractor = new PIXI.Container();
    protractor.name = 'protractor';
    protractor.x = 80;
    protractor.y = 80;
    protractor.eventMode = 'static';
    protractor.cursor = 'grab';
    container.addChild(protractor);

    const protG = new PIXI.Graphics();
    // Semicircle protractor
    protG.lineStyle(2, 0x6b7280);
    protG.beginFill(0xe0e7ff, 0.3);
    protG.arc(0, 0, 70, Math.PI, 0);
    protG.lineTo(70, 0);
    protG.lineTo(-70, 0);
    protG.endFill();
    // Center dot
    protG.beginFill(0xef4444);
    protG.drawCircle(0, 0, 4);
    protG.endFill();
    // Degree marks
    for (let deg = 0; deg <= 180; deg += 10) {
      const angle = (deg * Math.PI) / 180;
      const x1 = Math.cos(angle) * 65;
      const y1 = -Math.sin(angle) * 65;
      const x2 = Math.cos(angle) * 70;
      const y2 = -Math.sin(angle) * 70;
      protG.lineStyle(1, 0x6b7280);
      protG.moveTo(x1, y1);
      protG.lineTo(x2, y2);
    }
    // Degree labels (every 30°)
    for (let deg = 0; deg <= 180; deg += 30) {
      const angle = (deg * Math.PI) / 180;
      const lx = Math.cos(angle) * 55;
      const ly = -Math.sin(angle) * 55;
      const label = new PIXI.Text(String(deg), { fontSize: 8, fill: 0x4b5563 });
      label.anchor.set(0.5);
      label.x = lx;
      label.y = ly;
      protractor.addChild(label);
    }
    protractor.addChild(protG);

    // ─── Protractor drag ────────────────────────────────────
    let protDragging = false;
    let protOffsetX = 0, protOffsetY = 0;

    protractor.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      if (solved) return;
      protDragging = true;
      protractor.cursor = 'grabbing';
      ctx.playSound('pickup');
      const pos = e.global;
      protOffsetX = pos.x - protractor.x;
      protOffsetY = pos.y - protractor.y;
      container.setChildIndex(protractor, container.children.length - 1);
    });

    protractor.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!protDragging) return;
      const pos = e.global;
      protractor.x = pos.x - protOffsetX;
      protractor.y = pos.y - protOffsetY;
    });

    protractor.on('pointerup', () => {
      if (!protDragging) return;
      protDragging = false;
      protractor.cursor = 'grab';

      // Check if placed on vertex
      const dx = protractor.x - vertex.x;
      const dy = protractor.y - vertex.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 20) {
        // Snap to vertex
        gsap.to(protractor, { x: vertex.x, y: vertex.y, duration: 0.2 });
        ctx.playSound('drop-correct');
        ctx.speak('Protractor placed on the vertex! Now drag the ray to the correct angle!');
        ctx.setMascotMood('happy');
        ctx.onStepCompleted();
      }
    });

    protractor.on('pointerupoutside', () => {
      if (!protDragging) return;
      protDragging = false;
      protractor.cursor = 'grab';
    });

    // ─── Ray drag (rotate by dragging handle) ───────────────
    let rayDragging = false;

    rayHandle.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      if (solved) return;
      rayDragging = true;
      rayHandle.cursor = 'grabbing';
      ctx.playSound('pickup');
    });

    rayHandle.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!rayDragging) return;
      const pos = e.global;
      const dx = pos.x - cx;
      const dy = pos.y - cy;
      let angle = Math.atan2(dy, dx);
      if (angle < 0) angle = 0;
      if (angle > Math.PI) angle = Math.PI;

      ray.rotation = angle;
      rayHandle.x = cx + Math.cos(angle) * 100;
      rayHandle.y = cy + Math.sin(angle) * 100;

      const degrees = Math.round((angle * 180) / Math.PI);
      angleText.text = `${degrees}°`;
    });

    rayHandle.on('pointerup', () => {
      if (!rayDragging) return;
      rayDragging = false;
      rayHandle.cursor = 'grab';

      const currentAngle = Math.round((ray.rotation * 180) / Math.PI);

      if (Math.abs(currentAngle - targetAngle) <= 5 && !solved) {
        // Correct angle!
        solved = true;
        // Snap to exact angle
        const exactAngle = (targetAngle * Math.PI) / 180;
        gsap.to(ray, { rotation: exactAngle, duration: 0.2 });
        gsap.to(rayHandle, {
          x: cx + Math.cos(exactAngle) * 100,
          y: cy + Math.sin(exactAngle) * 100,
          duration: 0.2,
        });
        angleText.text = `${targetAngle}°! 🎉`;
        angleText.style.fill = 0x22c55e;

        // Draw angle arc
        const arc = new PIXI.Graphics();
        arc.lineStyle(2, 0x22c55e, 0.6);
        arc.arc(0, 0, 30, 0, exactAngle);
        arc.x = cx;
        arc.y = cy;
        container.addChild(arc);

        ctx.onStepCompleted();

        ctx.playSound('success');
        ctx.speak(`${targetAngle} degrees! Perfect angle construction! Great job!`);
        ctx.setMascotMood('celebrate');
        ctx.celebrate(cx, cy);
        setTimeout(() => ctx.onSolved(answer), 1500);
      } else {
        ctx.showWrong(rayHandle.x, rayHandle.y - 20);
        ctx.speak(`That's ${currentAngle}°. Try to get ${targetAngle}°!`);
        ctx.onWrong();
      }
    });

    rayHandle.on('pointerupoutside', () => {
      if (!rayDragging) return;
      rayDragging = false;
      rayHandle.cursor = 'grab';
    });

    // ─── Adaptive: show target line ─────────────────────────
    if (ctx.adaptiveEasier) {
      const targetAngleRad = (targetAngle * Math.PI) / 180;
      const ghost = new PIXI.Graphics();
      ghost.lineStyle(2, 0x22c55e, 0.3);
      ghost.moveTo(cx, cy);
      ghost.lineTo(cx + Math.cos(targetAngleRad) * 100, cy + Math.sin(targetAngleRad) * 100);
      container.addChild(ghost);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new GeometryConstructionSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as GeometryConstructionSimulation };
