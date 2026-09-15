/**
 * ComputerHistorySimulation
 *
 * Students drag computer generation cards (abacus, ENIAC, vacuum tube,
 * transistor, microchip, AI) into the correct order on a timeline.
 * The timeline shows from oldest to newest.
 *
 * Topics: abacus, babbage, eniac, vacuum, transistor, computer history, generation
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Computer generation definitions ─────────────────────────

interface ComputerGen {
  name: string;
  emoji: string;
  year: string;
  order: number; // 1 = oldest
}

const GENERATIONS: ComputerGen[] = [
  { name: 'Abacus', emoji: '🧮', year: '~3000 BC', order: 1 },
  { name: 'ENIAC', emoji: '🖥️', year: '1940s', order: 2 },
  { name: 'Vacuum Tube', emoji: '💡', year: '1950s', order: 3 },
  { name: 'Transistor', emoji: '🔌', year: '1960s', order: 4 },
  { name: 'Microchip', emoji: '💾', year: '1970s', order: 5 },
  { name: 'AI Computer', emoji: '🤖', year: '2020s', order: 6 },
];

// ─── Plugin ──────────────────────────────────────────────────

class ComputerHistorySimulationPlugin implements SimulationPlugin {
  id = 'computer-history';
  subject = 'science';
  topics = ['abacus', 'babbage', 'eniac', 'vacuum', 'transistor', 'computer history', 'generation', 'calculating device'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      q.includes('abacus') ||
      q.includes('eniac') ||
      q.includes('vacuum tube') ||
      q.includes('transistor') ||
      q.includes('babbage') ||
      q.includes('analytical engine') ||
      (q.includes('computer') && (q.includes('generation') || q.includes('history') || q.includes('oldest') || q.includes('calculating')))
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'place_first',
        mascotNarration: 'Watch me! The abacus is the oldest calculating device. I will place it first on the timeline.',
        mascotAction: (sim) => {
          const abacusCard = sim.container.children.find(c => c.name === 'gen_card_Abacus') as PIXI.Container | undefined;
          const firstSlot = sim.container.children.find(c => c.name === 'slot_0') as PIXI.Container | undefined;
          if (abacusCard && firstSlot) {
            gsap.to(abacusCard, { x: firstSlot.x, y: firstSlot.y, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag the computer cards to arrange them from oldest to newest on the timeline!',
        hint: 'Start with the oldest device and work forward in time!',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, answer } = ctx;
    const cx = width / 2;
    let solved = false;
    let placed = 0;

    // Pick 4 generations for the timeline
    const picked = GENERATIONS.slice(0, 4);
    const shuffled = [...picked].sort(() => Math.random() - 0.5);

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('💻 Arrange computers from oldest to newest!', {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Timeline (horizontal line with slots) ──────────────
    const timelineY = 200;
    const slotSpacing = 130;
    const slotStartX = cx - ((picked.length - 1) * slotSpacing) / 2;

    // Timeline line
    const timeline = new PIXI.Graphics();
    timeline.lineStyle(4, 0xd1d5db);
    timeline.moveTo(slotStartX - 60, timelineY);
    timeline.lineTo(slotStartX + (picked.length - 1) * slotSpacing + 60, timelineY);
    container.addChild(timeline);

    // Arrow at the end
    const arrow = new PIXI.Graphics();
    arrow.lineStyle(4, 0xd1d5db);
    arrow.moveTo(slotStartX + (picked.length - 1) * slotSpacing + 60, timelineY);
    arrow.lineTo(slotStartX + (picked.length - 1) * slotSpacing + 50, timelineY - 8);
    arrow.moveTo(slotStartX + (picked.length - 1) * slotSpacing + 60, timelineY);
    arrow.lineTo(slotStartX + (picked.length - 1) * slotSpacing + 50, timelineY + 8);
    container.addChild(arrow);

    // "Old" and "New" labels
    const oldLabel = new PIXI.Text('Old →', { fontSize: 11, fill: 0x9ca3af, fontWeight: 'bold' });
    oldLabel.anchor.set(0.5);
    oldLabel.x = slotStartX - 70;
    oldLabel.y = timelineY + 25;
    container.addChild(oldLabel);

    const newLabel = new PIXI.Text('→ New', { fontSize: 11, fill: 0x9ca3af, fontWeight: 'bold' });
    newLabel.anchor.set(0.5);
    newLabel.x = slotStartX + (picked.length - 1) * slotSpacing + 70;
    newLabel.y = timelineY + 25;
    container.addChild(newLabel);

    // Timeline slots
    picked.forEach((gen, i) => {
      const slot = new PIXI.Container();
      slot.name = `slot_${i}`;
      slot.x = slotStartX + i * slotSpacing;
      slot.y = timelineY;
      container.addChild(slot);

      const slotG = new PIXI.Graphics();
      slotG.lineStyle(2, 0xd1d5db, 0.5);
      slotG.beginFill(0xf9fafb, 0.5);
      slotG.drawRoundedRect(-45, -45, 90, 90, 8);
      slotG.endFill();
      slot.addChild(slotG);

      // Slot number
      const numLabel = new PIXI.Text(String(i + 1), { fontSize: 14, fill: 0xd1d5db, fontWeight: 'bold' });
      numLabel.anchor.set(0.5);
      numLabel.y = -55;
      slot.addChild(numLabel);
    });

    // ─── Progress ───────────────────────────────────────────
    const progressText = new PIXI.Text(`Placed: 0 / ${picked.length}`, { fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold' });
    progressText.anchor.set(0.5);
    progressText.x = cx;
    progressText.y = height - 20;
    container.addChild(progressText);

    // ─── Computer cards (bottom, draggable) ─────────────────
    const cardY = height - 80;
    const cardSpacing = 110;
    const cardStartX = cx - ((shuffled.length - 1) * cardSpacing) / 2;

    shuffled.forEach((gen, i) => {
      const card = new PIXI.Container();
      card.name = `gen_card_${gen.name}`;
      card.x = cardStartX + i * cardSpacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'grab';
      container.addChild(card);

      const cardBg = new PIXI.Graphics();
      cardBg.lineStyle(3, 0xa855f7);
      cardBg.beginFill(0xffffff, 0.9);
      cardBg.drawRoundedRect(-40, -30, 80, 60, 8);
      cardBg.endFill();
      card.addChild(cardBg);

      const emoji = new PIXI.Text(gen.emoji, { fontSize: 20 });
      emoji.anchor.set(0.5);
      emoji.y = -8;
      card.addChild(emoji);

      const nameLabel = new PIXI.Text(gen.name, { fontSize: 9, fill: 0x333333, fontWeight: 'bold' });
      nameLabel.anchor.set(0.5);
      nameLabel.y = 10;
      card.addChild(nameLabel);

      const yearLabel = new PIXI.Text(gen.year, { fontSize: 8, fill: 0x6b7280 });
      yearLabel.anchor.set(0.5);
      yearLabel.y = 22;
      card.addChild(yearLabel);

      // Drag
      let dragging = false;
      let offsetX = 0, offsetY = 0;
      const origX = card.x, origY = card.y;
      let alreadyPlaced = false;

      card.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
        if (solved || alreadyPlaced) return;
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

        // Find closest slot
        let closestSlotIdx = -1;
        let closestDist = 999;
        picked.forEach((_, si) => {
          const slot = container.children.find(c => c.name === `slot_${si}`) as PIXI.Container | undefined;
          if (!slot) return;
          const dx = card.x - slot.x;
          const dy = card.y - slot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < closestDist) { closestDist = dist; closestSlotIdx = si; }
        });

        if (closestSlotIdx >= 0 && closestDist < 60) {
          // Check if this is the correct slot (order-1 = slot index)
          if (gen.order - 1 === closestSlotIdx) {
            alreadyPlaced = true;
            ctx.playSound('drop-correct');
            ctx.speak(`${gen.name} (${gen.year}) — correct position!`);
            ctx.setMascotMood('happy');
            placed++;
            progressText.text = `Placed: ${placed} / ${picked.length}`;

            const slot = container.children.find(c => c.name === `slot_${closestSlotIdx}`) as PIXI.Container;
            gsap.to(card, { x: slot.x, y: slot.y, duration: 0.2 });
            card.eventMode = 'none';
            ctx.onStepCompleted();

            if (placed === picked.length && !solved) {
              solved = true;
              progressText.text = 'Timeline complete! 🎉';
              progressText.style.fill = 0x22c55e;
              ctx.playSound('success');
              ctx.speak('Computers arranged in order! From abacus to modern AI! Great job!');
              ctx.celebrate(cx, timelineY);
              setTimeout(() => ctx.onSolved(answer), 1500);
            }
          } else {
            ctx.showWrong(card.x, card.y - 20);
            const correctSlot = picked[closestSlotIdx];
            ctx.speak(`${gen.name} is not in position ${closestSlotIdx + 1}. That's where ${correctSlot.name} goes!`);
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

    // ─── Adaptive: show year labels on slots ────────────────
    if (ctx.adaptiveEasier) {
      picked.forEach((gen, i) => {
        const slot = container.children.find(c => c.name === `slot_${i}`) as PIXI.Container | undefined;
        if (slot) {
          const yearHint = new PIXI.Text(gen.year, { fontSize: 8, fill: 0x3b82f6, fontWeight: 'bold' });
          yearHint.anchor.set(0.5);
          yearHint.y = 55;
          slot.addChild(yearHint);
        }
      });
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new ComputerHistorySimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as ComputerHistorySimulation };
