/**
 * AlgebraTilesSimulation
 *
 * Students drag algebra tiles (x-tiles and unit tiles) onto a balance scale
 * to represent and solve simple algebraic equations like "x + 3 = 7".
 * The scale tips when sides are unbalanced and levels out when correct.
 *
 * Topics: algebra, equation, solve for x, balance, linear equation
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Plugin ──────────────────────────────────────────────────

class AlgebraTilesSimulationPlugin implements SimulationPlugin {
  id = 'algebra-tiles';
  subject = 'maths';
  topics = ['algebra', 'equation', 'solve for x', 'balance', 'linear equation', 'x +', 'x -'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      subject === 'maths' && (
        q.includes('algebra') ||
        q.includes('equation') ||
        q.includes('solve for x') ||
        q.includes('solve: x') ||
        q.match(/\bx\s*[+\-]\s*\d+\s*=\s*\d+/) !== null ||
        q.match(/\d+\s*[+\-]\s*x\s*=\s*\d+/) !== null
      )
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    const q = ctx.question.toLowerCase();
    const match = q.match(/x\s*([+\-])\s*(\d+)\s*=\s*(\d+)/) || q.match(/(\d+)\s*([+\-])\s*x\s*=\s*(\d+)/);
    const isAdd = match ? match[1] === '+' || match[2] === '+' : true;
    const constant = match ? parseInt(match[2] || match[1]) : 3;
    const result = match ? parseInt(match[3] || match[3]) : 7;
    const xValue = isAdd ? result - constant : result + constant;

    return [
      {
        id: 'place_x_tile',
        mascotNarration: 'Watch me! I will place an x-tile on the left side of the balance.',
        mascotAction: (sim) => {
          const xTile = sim.container.children.find(c => c.name === 'tile_x') as PIXI.Container | undefined;
          const leftPan = sim.container.children.find(c => c.name === 'left_pan') as PIXI.Container | undefined;
          if (xTile && leftPan) {
            gsap.to(xTile, { x: leftPan.x, y: leftPan.y - 10, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag the x-tile (blue rectangle) to the left side of the balance.',
        hint: 'Drag the blue x-tile to the left pan!',
      },
      {
        id: 'place_unit_tiles',
        mascotNarration: `Now we need ${constant} unit tiles on the left side too.`,
        mascotAction: (sim) => {
          const unitTile = sim.container.children.find(c => c.name === 'tile_unit') as PIXI.Container | undefined;
          const leftPan = sim.container.children.find(c => c.name === 'left_pan') as PIXI.Container | undefined;
          if (unitTile && leftPan) {
            gsap.to(unitTile, { x: leftPan.x + 20, y: leftPan.y - 10, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: `Drag ${constant} unit tiles (yellow squares) to the left side of the balance.`,
        hint: `Drag ${constant} yellow unit tiles to the left pan!`,
      },
      {
        id: 'balance_right',
        mascotNarration: `Now place ${result} unit tiles on the right side to balance the equation.`,
        mascotAction: (sim) => {
          const unitTile = sim.container.children.find(c => c.name === 'tile_unit') as PIXI.Container | undefined;
          const rightPan = sim.container.children.find(c => c.name === 'right_pan') as PIXI.Container | undefined;
          if (unitTile && rightPan) {
            gsap.to(unitTile, { x: rightPan.x, y: rightPan.y - 10, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: `Drag ${result} unit tiles to the right side. Then remove ${constant} from both sides to find x = ${xValue}!`,
        hint: `The right side needs ${result} unit tiles. Then x = ${xValue}!`,
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, question, answer } = ctx;
    const cx = width / 2;
    let solved = false;

    // Parse equation from question
    const q = question.toLowerCase();
    const match = q.match(/x\s*([+\-])\s*(\d+)\s*=\s*(\d+)/) || q.match(/(\d+)\s*([+\-])\s*x\s*=\s*(\d+)/);
    const isAdd = match ? (match[1] === '+' || match[2] === '+') : true;
    const constant = match ? parseInt(match[2] || match[1]) : 3;
    const result = match ? parseInt(match[3]) : 7;
    const xValue = isAdd ? result - constant : result + constant;

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text(`⚖️ Balance the equation: ${question.replace(/\?$/, '')}`, {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
      wordWrap: true, wordWrapWidth: width - 40, align: 'center',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Balance scale ──────────────────────────────────────
    const scaleY = 180;
    const beamLength = 160;

    // Fulcrum (triangle base)
    const fulcrum = new PIXI.Graphics();
    fulcrum.beginFill(0x6b7280);
    fulcrum.moveTo(0, 0);
    fulcrum.lineTo(-25, 40);
    fulcrum.lineTo(25, 40);
    fulcrum.closePath();
    fulcrum.endFill();
    fulcrum.x = cx;
    fulcrum.y = scaleY;
    container.addChild(fulcrum);

    // Beam (rotates based on balance)
    const beam = new PIXI.Container();
    beam.x = cx;
    beam.y = scaleY;
    container.addChild(beam);

    const beamG = new PIXI.Graphics();
    beamG.lineStyle(4, 0x374151);
    beamG.moveTo(-beamLength, 0);
    beamG.lineTo(beamLength, 0);
    beam.addChild(beamG);

    // Left pan
    const leftPan = new PIXI.Container();
    leftPan.name = 'left_pan';
    leftPan.x = -beamLength;
    leftPan.y = 30;
    beam.addChild(leftPan);

    const leftPanG = new PIXI.Graphics();
    leftPanG.lineStyle(3, 0x6b7280);
    leftPanG.beginFill(0xf3f4f6, 0.5);
    leftPanG.drawRoundedRect(-40, 0, 80, 8, 4);
    leftPanG.endFill();
    leftPanG.moveTo(-35, 0); leftPanG.lineTo(-40, -25);
    leftPanG.moveTo(35, 0); leftPanG.lineTo(40, -25);
    leftPan.addChild(leftPanG);

    // Right pan
    const rightPan = new PIXI.Container();
    rightPan.name = 'right_pan';
    rightPan.x = beamLength;
    rightPan.y = 30;
    beam.addChild(rightPan);

    const rightPanG = new PIXI.Graphics();
    rightPanG.lineStyle(3, 0x6b7280);
    rightPanG.beginFill(0xf3f4f6, 0.5);
    rightPanG.drawRoundedRect(-40, 0, 80, 8, 4);
    rightPanG.endFill();
    rightPanG.moveTo(-35, 0); rightPanG.lineTo(-40, -25);
    rightPanG.moveTo(35, 0); rightPanG.lineTo(40, -25);
    rightPan.addChild(rightPanG);

    // ─── State tracking ─────────────────────────────────────
    let leftX = 0; // number of x-tiles on left
    let leftUnits = 0; // number of unit tiles on left
    let rightUnits = 0; // number of unit tiles on right

    // ─── Update balance ─────────────────────────────────────
    const updateBalance = () => {
      const leftValue = leftX * xValue + leftUnits;
      const rightValue = rightUnits;
      const diff = leftValue - rightValue;
      const tilt = Math.max(-0.3, Math.min(0.3, diff * 0.02));
      gsap.to(beam, { rotation: tilt, duration: 0.5, ease: 'power2.out' });

      // Check if balanced and correct
      if (Math.abs(diff) < 0.5 && leftX === 1 && leftUnits === constant && rightUnits === result && !solved) {
        solved = true;
        ctx.onStepCompleted();
        ctx.playSound('success');
        ctx.speak(`The scale is balanced! x = ${xValue}! Great job!`);
        ctx.setMascotMood('celebrate');
        ctx.celebrate(cx, scaleY);
        setTimeout(() => ctx.onSolved(answer), 1500);
      }
    };

    // ─── Tiles tray (bottom) ────────────────────────────────
    const trayY = height - 70;

    // x-tile (blue rectangle)
    const xTile = new PIXI.Container();
    xTile.name = 'tile_x';
    xTile.x = cx - 60;
    xTile.y = trayY;
    xTile.eventMode = 'static';
    xTile.cursor = 'grab';
    container.addChild(xTile);

    const xTileG = new PIXI.Graphics();
    xTileG.beginFill(0x3b82f6);
    xTileG.lineStyle(2, 0x1e40af);
    xTileG.drawRoundedRect(-30, -15, 60, 30, 4);
    xTileG.endFill();
    xTile.addChild(xTileG);

    const xTileText = new PIXI.Text('x', { fontSize: 18, fill: 0xffffff, fontWeight: 'bold' });
    xTileText.anchor.set(0.5);
    xTile.addChild(xTileText);

    // Unit tile (yellow square)
    const unitTile = new PIXI.Container();
    unitTile.name = 'tile_unit';
    unitTile.x = cx + 60;
    unitTile.y = trayY;
    unitTile.eventMode = 'static';
    unitTile.cursor = 'grab';
    container.addChild(unitTile);

    const unitTileG = new PIXI.Graphics();
    unitTileG.beginFill(0xfbbf24);
    unitTileG.lineStyle(2, 0xd97706);
    unitTileG.drawRoundedRect(-15, -15, 30, 30, 4);
    unitTileG.endFill();
    unitTile.addChild(unitTileG);

    const unitTileText = new PIXI.Text('1', { fontSize: 16, fill: 0xffffff, fontWeight: 'bold' });
    unitTileText.anchor.set(0.5);
    unitTile.addChild(unitTileText);

    // ─── Drag behavior for x-tile ───────────────────────────
    let xDragging = false;
    let xOffsetX = 0, xOffsetY = 0;
    const xOrigX = xTile.x, xOrigY = xTile.y;

    xTile.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      if (solved || leftX >= 1) return;
      xDragging = true;
      xTile.cursor = 'grabbing';
      ctx.playSound('pickup');
      const pos = e.global;
      xOffsetX = pos.x - xTile.x;
      xOffsetY = pos.y - xTile.y;
      container.setChildIndex(xTile, container.children.length - 1);
    });

    xTile.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!xDragging) return;
      const pos = e.global;
      xTile.x = pos.x - xOffsetX;
      xTile.y = pos.y - xOffsetY;
    });

    xTile.on('pointerup', () => {
      if (!xDragging) return;
      xDragging = false;
      xTile.cursor = 'grab';

      // Check if dropped on left pan
      const leftPanWorldX = cx + leftPan.x;
      const leftPanWorldY = scaleY + leftPan.y;
      const dx = xTile.x - leftPanWorldX;
      const dy = xTile.y - leftPanWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 60 && leftX === 0) {
        leftX = 1;
        ctx.playSound('drop-correct');
        ctx.speak('x-tile placed on the left!');
        ctx.setMascotMood('happy');
        ctx.onStepCompleted();
        gsap.to(xTile, { x: leftPanWorldX - 20, y: leftPanWorldY - 20, duration: 0.2 });
        updateBalance();
      } else {
        gsap.to(xTile, { x: xOrigX, y: xOrigY, duration: 0.3 });
      }
    });

    xTile.on('pointerupoutside', () => {
      if (!xDragging) return;
      xDragging = false;
      xTile.cursor = 'grab';
      gsap.to(xTile, { x: xOrigX, y: xOrigY, duration: 0.3 });
    });

    // ─── Drag behavior for unit tile ────────────────────────
    let unitDragging = false;
    let unitOffsetX = 0, unitOffsetY = 0;
    const unitOrigX = unitTile.x, unitOrigY = unitTile.y;
    const placedUnitTiles: PIXI.Container[] = [];

    unitTile.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      if (solved) return;
      unitDragging = true;
      unitTile.cursor = 'grabbing';
      ctx.playSound('pickup');
      const pos = e.global;
      unitOffsetX = pos.x - unitTile.x;
      unitOffsetY = pos.y - unitTile.y;
      container.setChildIndex(unitTile, container.children.length - 1);
    });

    unitTile.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!unitDragging) return;
      const pos = e.global;
      unitTile.x = pos.x - unitOffsetX;
      unitTile.y = pos.y - unitOffsetY;
    });

    unitTile.on('pointerup', () => {
      if (!unitDragging) return;
      unitDragging = false;
      unitTile.cursor = 'grab';

      // Check left pan
      const leftPanWorldX = cx + leftPan.x;
      const leftPanWorldY = scaleY + leftPan.y;
      const dxLeft = unitTile.x - leftPanWorldX;
      const dyLeft = unitTile.y - leftPanWorldY;
      const distLeft = Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft);

      // Check right pan
      const rightPanWorldX = cx + rightPan.x;
      const rightPanWorldY = scaleY + rightPan.y;
      const dxRight = unitTile.x - rightPanWorldX;
      const dyRight = unitTile.y - rightPanWorldY;
      const distRight = Math.sqrt(dxRight * dxRight + dyRight * dyRight);

      if (distLeft < 60 && leftUnits < constant) {
        leftUnits++;
        ctx.playSound('drop-correct');
        ctx.speak(`${leftUnits} unit tile${leftUnits > 1 ? 's' : ''} on the left!`);

        // Create a placed copy
        const placed = new PIXI.Container();
        placed.x = leftPanWorldX - 25 + leftUnits * 12;
        placed.y = leftPanWorldY - 15;
        const placedG = new PIXI.Graphics();
        placedG.beginFill(0xfbbf24);
        placedG.lineStyle(2, 0xd97706);
        placedG.drawRoundedRect(-10, -10, 20, 20, 3);
        placedG.endFill();
        placed.addChild(placedG);
        container.addChild(placed);
        placedUnitTiles.push(placed);

        if (leftUnits === constant) {
          ctx.onStepCompleted();
        }
        updateBalance();
        gsap.to(unitTile, { x: unitOrigX, y: unitOrigY, duration: 0.2 });
      } else if (distRight < 60 && rightUnits < result) {
        rightUnits++;
        ctx.playSound('drop-correct');
        ctx.speak(`${rightUnits} unit tile${rightUnits > 1 ? 's' : ''} on the right!`);

        const placed = new PIXI.Container();
        placed.x = rightPanWorldX - 25 + (rightUnits % 5) * 12;
        placed.y = rightPanWorldY - 15 - Math.floor(rightUnits / 5) * 22;
        const placedG = new PIXI.Graphics();
        placedG.beginFill(0xfbbf24);
        placedG.lineStyle(2, 0xd97706);
        placedG.drawRoundedRect(-10, -10, 20, 20, 3);
        placedG.endFill();
        placed.addChild(placedG);
        container.addChild(placed);
        placedUnitTiles.push(placed);

        updateBalance();
        gsap.to(unitTile, { x: unitOrigX, y: unitOrigY, duration: 0.2 });
      } else {
        gsap.to(unitTile, { x: unitOrigX, y: unitOrigY, duration: 0.3 });
      }
    });

    unitTile.on('pointerupoutside', () => {
      if (!unitDragging) return;
      unitDragging = false;
      unitTile.cursor = 'grab';
      gsap.to(unitTile, { x: unitOrigX, y: unitOrigY, duration: 0.3 });
    });

    // ─── Labels ─────────────────────────────────────────────
    const leftLabel = new PIXI.Text('Left: x + ' + constant, { fontSize: 12, fill: 0x3b82f6, fontWeight: 'bold' });
    leftLabel.anchor.set(0.5);
    leftLabel.x = cx - beamLength;
    leftLabel.y = scaleY + 60;
    container.addChild(leftLabel);

    const rightLabel = new PIXI.Text('Right: ' + result, { fontSize: 12, fill: 0xef4444, fontWeight: 'bold' });
    rightLabel.anchor.set(0.5);
    rightLabel.x = cx + beamLength;
    rightLabel.y = scaleY + 60;
    container.addChild(rightLabel);

    // ─── Adaptive: show answer hint ─────────────────────────
    if (ctx.adaptiveEasier) {
      const hint = new PIXI.Text(`💡 x = ${xValue} (place tiles to show it)`, {
        fontSize: 12, fill: 0x3b82f6, fontWeight: 'bold',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = height - 30;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new AlgebraTilesSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as AlgebraTilesSimulation };
