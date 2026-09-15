/**
 * EnvironmentSimulation
 *
 * Students drag environmental items (plants, animals, soil, water, sun, coal, etc.)
 * into either "Biotic" / "Abiotic" bins or "Renewable" / "Non-Renewable" bins
 * depending on the question type.
 *
 * Topics: environment, biotic, abiotic, renewable, non-renewable, natural resource
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Item definitions ────────────────────────────────────────

interface EnvItem {
  name: string;
  emoji: string;
  biotic: boolean;
  renewable: boolean;
}

const ITEMS: EnvItem[] = [
  { name: 'Plant', emoji: '🌿', biotic: true, renewable: true },
  { name: 'Animal', emoji: '🐰', biotic: true, renewable: true },
  { name: 'Soil', emoji: '🟫', biotic: false, renewable: false },
  { name: 'Water', emoji: '💧', biotic: false, renewable: true },
  { name: 'Sunlight', emoji: '☀️', biotic: false, renewable: true },
  { name: 'Coal', emoji: '⬛', biotic: false, renewable: false },
  { name: 'Fish', emoji: '🐟', biotic: true, renewable: true },
  { name: 'Rock', emoji: '🪨', biotic: false, renewable: false },
];

// ─── Plugin ──────────────────────────────────────────────────

class EnvironmentSimulationPlugin implements SimulationPlugin {
  id = 'environment';
  subject = 'science';
  topics = ['environment', 'biotic', 'abiotic', 'renewable', 'non-renewable', 'natural resource'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      q.includes('biotic') ||
      q.includes('abiotic') ||
      q.includes('renewable') ||
      q.includes('non-renewable') ||
      q.includes('natural resource') ||
      (q.includes('environment') && q.includes('component'))
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'drag_first',
        mascotNarration: 'Watch me! Biotic means living things. I will drag a plant to the Biotic bin.',
        mascotAction: (sim) => {
          const firstCard = sim.container.children.find(c => c.name === 'item_card_0') as PIXI.Container | undefined;
          const bin = sim.container.children.find(c => c.name === 'bin_left') as PIXI.Container | undefined;
          if (firstCard && bin) {
            gsap.to(firstCard, { x: bin.x, y: bin.y, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag each item into the correct bin.',
        hint: 'Biotic = living things. Abiotic = non-living things.',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, question, answer } = ctx;
    const cx = width / 2;
    const q = question.toLowerCase();
    let solved = false;
    let sorted = 0;

    // Determine mode: biotic/abiotic or renewable/non-renewable
    const isRenewableMode = q.includes('renewable') || q.includes('non-renewable');
    const leftLabel = isRenewableMode ? 'Renewable' : 'Biotic';
    const rightLabel = isRenewableMode ? 'Non-Renewable' : 'Abiotic';
    const leftColor = isRenewableMode ? 0x22c55e : 0x22c55e;
    const rightColor = isRenewableMode ? 0xef4444 : 0xf97316;
    const checkFn = (item: EnvItem) => isRenewableMode ? item.renewable : item.biotic;

    // Pick 4 items — 2 for left, 2 for right
    const leftItems = ITEMS.filter(i => checkFn(i)).slice(0, 2);
    const rightItems = ITEMS.filter(i => !checkFn(i)).slice(0, 2);
    const picked = [...leftItems, ...rightItems].sort(() => Math.random() - 0.5);

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text(`🌳 Drag each item to ${leftLabel} or ${rightLabel}!`, {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Two bins ───────────────────────────────────────────
    const binY = height - 130;
    const binW = 140;
    const binH = 70;

    const leftBin = new PIXI.Container();
    leftBin.name = 'bin_left';
    leftBin.x = cx - 100;
    leftBin.y = binY;
    container.addChild(leftBin);

    const leftBinG = new PIXI.Graphics();
    leftBinG.lineStyle(3, leftColor);
    leftBinG.beginFill(leftColor, 0.1);
    leftBinG.drawRoundedRect(-binW / 2, -binH / 2, binW, binH, 10);
    leftBinG.endFill();
    leftBin.addChild(leftBinG);

    const leftLabelT = new PIXI.Text(leftLabel, { fontSize: 14, fill: leftColor, fontWeight: 'bold' });
    leftLabelT.anchor.set(0.5);
    leftBin.addChild(leftLabelT);

    const rightBin = new PIXI.Container();
    rightBin.name = 'bin_right';
    rightBin.x = cx + 100;
    rightBin.y = binY;
    container.addChild(rightBin);

    const rightBinG = new PIXI.Graphics();
    rightBinG.lineStyle(3, rightColor);
    rightBinG.beginFill(rightColor, 0.1);
    rightBinG.drawRoundedRect(-binW / 2, -binH / 2, binW, binH, 10);
    rightBinG.endFill();
    rightBin.addChild(rightBinG);

    const rightLabelT = new PIXI.Text(rightLabel, { fontSize: 14, fill: rightColor, fontWeight: 'bold' });
    rightLabelT.anchor.set(0.5);
    rightBin.addChild(rightLabelT);

    // ─── Progress ───────────────────────────────────────────
    const progressText = new PIXI.Text(`Sorted: 0 / ${picked.length}`, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    progressText.anchor.set(0.5);
    progressText.x = cx;
    progressText.y = height - 20;
    container.addChild(progressText);

    // ─── Item cards ─────────────────────────────────────────
    const cardSpacing = 90;
    const cardStartX = cx - ((picked.length - 1) * cardSpacing) / 2;
    const cardY = 90;

    picked.forEach((item, i) => {
      const card = new PIXI.Container();
      card.name = `item_card_${i}`;
      card.x = cardStartX + i * cardSpacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'grab';
      container.addChild(card);

      const cardBg = new PIXI.Graphics();
      cardBg.lineStyle(3, 0xd1d5db);
      cardBg.beginFill(0xffffff, 0.9);
      cardBg.drawRoundedRect(-33, -33, 66, 66, 8);
      cardBg.endFill();
      card.addChild(cardBg);

      const emoji = new PIXI.Text(item.emoji, { fontSize: 24 });
      emoji.anchor.set(0.5);
      emoji.y = -8;
      card.addChild(emoji);

      const nameLabel = new PIXI.Text(item.name, { fontSize: 9, fill: 0x333333, fontWeight: 'bold' });
      nameLabel.anchor.set(0.5);
      nameLabel.y = 18;
      card.addChild(nameLabel);

      // Drag
      let dragging = false;
      let offsetX = 0, offsetY = 0;
      const origX = card.x, origY = card.y;

      card.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
        if (solved) return;
        dragging = true;
        card.cursor = 'grabbing';
        ctx.playSound('pickup');
        const pos = e.global;
        offsetX = pos.x - card.x;
        offsetY = pos.y - card.y;
        container.setChildIndex(card, container.children.length - 1);
      });

      card.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
        if (!dragging) return;
        const pos = e.global;
        card.x = pos.x - offsetX;
        card.y = pos.y - offsetY;
      });

      const checkDrop = () => {
        if (!dragging) return;
        dragging = false;
        card.cursor = 'grab';

        const leftDx = card.x - leftBin.x;
        const leftDy = card.y - leftBin.y;
        const leftDist = Math.sqrt(leftDx * leftDx + leftDy * leftDy);

        const rightDx = card.x - rightBin.x;
        const rightDy = card.y - rightBin.y;
        const rightDist = Math.sqrt(rightDx * rightDx + rightDy * rightDy);

        const droppedLeft = leftDist < rightDist && leftDist < 80;
        const droppedRight = rightDist < leftDist && rightDist < 80;

        if (droppedLeft || droppedRight) {
          const isLeft = checkFn(item);
          const correct = (droppedLeft && isLeft) || (droppedRight && !isLeft);

          if (correct) {
            ctx.playSound('drop-correct');
            ctx.speak(`${item.name} — ${isLeft ? leftLabel : rightLabel}! Correct!`);
            ctx.setMascotMood('happy');
            sorted++;
            progressText.text = `Sorted: ${sorted} / ${picked.length}`;
            const targetBin = droppedLeft ? leftBin : rightBin;
            gsap.to(card, { x: targetBin.x + (sorted % 3 - 1) * 22, y: targetBin.y, duration: 0.2 });
            card.eventMode = 'none';
            ctx.onStepCompleted();

            if (sorted === picked.length && !solved) {
              solved = true;
              progressText.text = 'All sorted! 🎉';
              progressText.style.fill = 0x22c55e;
              ctx.playSound('success');
              ctx.speak('All items sorted correctly! Great job!');
              ctx.celebrate(cx, binY);
              setTimeout(() => ctx.onSolved(answer), 1500);
            }
          } else {
            ctx.showWrong(card.x, card.y - 20);
            ctx.speak(`${item.name} is ${isLeft ? leftLabel : rightLabel}, not ${droppedLeft ? leftLabel : rightLabel}!`);
            ctx.onWrong();
            gsap.to(card, { x: origX, y: origY, duration: 0.3 });
          }
        } else {
          gsap.to(card, { x: origX, y: origY, duration: 0.3 });
        }
      };

      card.on('pointerup', checkDrop);
      card.on('pointerupoutside', () => {
        if (!dragging) return;
        dragging = false;
        card.cursor = 'grab';
        gsap.to(card, { x: origX, y: origY, duration: 0.3 });
      });
    });

    // ─── Adaptive ───────────────────────────────────────────
    if (ctx.adaptiveEasier) {
      const hintText = isRenewableMode
        ? '💡 Renewable = can be replaced. Non-renewable = runs out.'
        : '💡 Biotic = living. Abiotic = non-living.';
      const hint = new PIXI.Text(hintText, { fontSize: 11, fill: 0x3b82f6, fontWeight: 'bold' });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = 55;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new EnvironmentSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as EnvironmentSimulation };
