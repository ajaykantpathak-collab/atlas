/**
 * PhysicalChemicalSimulation
 *
 * Students drag scenario cards (melting ice, burning paper, rusting iron, etc.)
 * into either the "Physical Change" bin or the "Chemical Change" bin.
 * A new substance is formed = chemical change. Only state/shape changes = physical.
 *
 * Topics: physical change, chemical change, melting, burning, rusting, reversible
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Scenario definitions ────────────────────────────────────

interface Scenario {
  text: string;
  emoji: string;
  isChemical: boolean;
}

const SCENARIOS: Scenario[] = [
  { text: 'Melting ice', emoji: '🧊', isChemical: false },
  { text: 'Burning paper', emoji: '📄', isChemical: true },
  { text: 'Rusting iron', emoji: '🔩', isChemical: true },
  { text: 'Dissolving salt', emoji: '🧂', isChemical: false },
  { text: 'Boiling water', emoji: '💧', isChemical: false },
  { text: 'Baking a cake', emoji: '🎂', isChemical: true },
  { text: 'Cutting paper', emoji: '✂️', isChemical: false },
  { text: 'Souring milk', emoji: '🥛', isChemical: true },
];

// ─── Plugin ──────────────────────────────────────────────────

class PhysicalChemicalSimulationPlugin implements SimulationPlugin {
  id = 'physical-chemical';
  subject = 'science';
  topics = ['physical change', 'chemical change', 'melting', 'burning', 'rusting', 'reversible'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      q.includes('physical change') ||
      q.includes('chemical change') ||
      (q.includes('which') && (q.includes('melting') || q.includes('burning') || q.includes('rusting') || q.includes('boiling')))
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'drag_first',
        mascotNarration: 'Watch me! A physical change is reversible — like melting ice. I will drag it to the Physical Change bin.',
        mascotAction: (sim) => {
          const firstCard = sim.container.children.find(c => c.name === 'scenario_card_0') as PIXI.Container | undefined;
          const physBin = sim.container.children.find(c => c.name === 'bin_physical') as PIXI.Container | undefined;
          if (firstCard && physBin) {
            gsap.to(firstCard, { x: physBin.x, y: physBin.y, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag each scenario card into the correct bin.',
        hint: 'Physical changes are reversible. Chemical changes make new substances.',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, answer } = ctx;
    const cx = width / 2;
    let solved = false;
    let sorted = 0;

    // Pick 4 scenarios (2 physical, 2 chemical) — include the one matching the answer
    const answerLower = answer.toLowerCase();
    let picked: Scenario[] = [];
    // Try to include the answer scenario
    const answerScenario = SCENARIOS.find(s => s.text.toLowerCase() === answerLower || answerLower.includes(s.text.toLowerCase()));
    if (answerScenario) picked.push(answerScenario);
    // Fill remaining
    for (const s of SCENARIOS) {
      if (picked.length >= 4) break;
      if (!picked.includes(s)) picked.push(s);
    }

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('🔬 Drag each card to the correct bin!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Two bins ───────────────────────────────────────────
    const binY = height - 130;
    const binW = 140;
    const binH = 70;

    // Physical change bin (blue)
    const physBin = new PIXI.Container();
    physBin.name = 'bin_physical';
    physBin.x = cx - 100;
    physBin.y = binY;
    container.addChild(physBin);

    const physBinG = new PIXI.Graphics();
    physBinG.lineStyle(3, 0x3b82f6);
    physBinG.beginFill(0x3b82f6, 0.1);
    physBinG.drawRoundedRect(-binW / 2, -binH / 2, binW, binH, 10);
    physBinG.endFill();
    physBin.addChild(physBinG);

    const physLabel = new PIXI.Text('Physical Change\n(reversible)', {
      fontSize: 12, fill: 0x3b82f6, fontWeight: 'bold', align: 'center',
    });
    physLabel.anchor.set(0.5);
    physBin.addChild(physLabel);

    // Chemical change bin (red)
    const chemBin = new PIXI.Container();
    chemBin.name = 'bin_chemical';
    chemBin.x = cx + 100;
    chemBin.y = binY;
    container.addChild(chemBin);

    const chemBinG = new PIXI.Graphics();
    chemBinG.lineStyle(3, 0xef4444);
    chemBinG.beginFill(0xef4444, 0.1);
    chemBinG.drawRoundedRect(-binW / 2, -binH / 2, binW, binH, 10);
    chemBinG.endFill();
    chemBin.addChild(chemBinG);

    const chemLabel = new PIXI.Text('Chemical Change\n(new substance)', {
      fontSize: 12, fill: 0xef4444, fontWeight: 'bold', align: 'center',
    });
    chemLabel.anchor.set(0.5);
    chemBin.addChild(chemLabel);

    // ─── Progress ───────────────────────────────────────────
    const progressText = new PIXI.Text(`Sorted: 0 / ${picked.length}`, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    progressText.anchor.set(0.5);
    progressText.x = cx;
    progressText.y = height - 20;
    container.addChild(progressText);

    // ─── Scenario cards (draggable) ─────────────────────────
    const cardSpacing = 100;
    const cardStartX = cx - ((picked.length - 1) * cardSpacing) / 2;
    const cardY = 90;

    picked.forEach((scn, i) => {
      const card = new PIXI.Container();
      card.name = `scenario_card_${i}`;
      card.x = cardStartX + i * cardSpacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'grab';
      container.addChild(card);

      const cardBg = new PIXI.Graphics();
      cardBg.lineStyle(3, 0xd1d5db);
      cardBg.beginFill(0xffffff, 0.9);
      cardBg.drawRoundedRect(-38, -35, 76, 70, 8);
      cardBg.endFill();
      card.addChild(cardBg);

      const emoji = new PIXI.Text(scn.emoji, { fontSize: 24 });
      emoji.anchor.set(0.5);
      emoji.y = -10;
      card.addChild(emoji);

      const textLabel = new PIXI.Text(scn.text, {
        fontSize: 9, fill: 0x333333, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: 70, align: 'center',
      });
      textLabel.anchor.set(0.5);
      textLabel.y = 18;
      card.addChild(textLabel);

      // Drag behavior
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

        // Check which bin it's over
        const physDx = card.x - physBin.x;
        const physDy = card.y - physBin.y;
        const physDist = Math.sqrt(physDx * physDx + physDy * physDy);

        const chemDx = card.x - chemBin.x;
        const chemDy = card.y - chemBin.y;
        const chemDist = Math.sqrt(chemDx * chemDx + chemDy * chemDy);

        const droppedPhysical = physDist < chemDist && physDist < 80;
        const droppedChemical = chemDist < physDist && chemDist < 80;

        if (droppedPhysical || droppedChemical) {
          const correctBin = scn.isChemical ? 'chemical' : 'physical';
          const droppedBin = droppedChemical ? 'chemical' : 'physical';

          if (correctBin === droppedBin) {
            // Correct!
            ctx.playSound('drop-correct');
            ctx.speak(`${scn.text} — ${scn.isChemical ? 'chemical' : 'physical'} change! Correct!`);
            ctx.setMascotMood('happy');
            sorted++;
            progressText.text = `Sorted: ${sorted} / ${picked.length}`;
            gsap.to(progressText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });

            // Snap card into bin
            const targetBin = droppedPhysical ? physBin : chemBin;
            gsap.to(card, { x: targetBin.x + (sorted % 3 - 1) * 25, y: targetBin.y, duration: 0.2 });
            card.eventMode = 'none';
            ctx.onStepCompleted();

            if (sorted === picked.length && !solved) {
              solved = true;
              progressText.text = 'All sorted! 🎉';
              progressText.style.fill = 0x22c55e;
              ctx.playSound('success');
              ctx.speak('All scenarios sorted correctly! Great job!');
              ctx.celebrate(cx, binY);
              setTimeout(() => ctx.onSolved(answer), 1500);
            }
          } else {
            // Wrong bin
            ctx.showWrong(card.x, card.y - 20);
            ctx.speak(`${scn.text} is a ${correctBin} change, not ${droppedBin}!`);
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

    // ─── Adaptive: show hint ────────────────────────────────
    if (ctx.adaptiveEasier) {
      const hint = new PIXI.Text('💡 Physical = reversible. Chemical = new substance.', {
        fontSize: 11, fill: 0x3b82f6, fontWeight: 'bold',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = 55;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new PhysicalChemicalSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as PhysicalChemicalSimulation };
