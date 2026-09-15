/**
 * NaturalDisasterSimulation
 *
 * Students drag safety measure cards to the matching natural disaster.
 * Each disaster (earthquake, flood, volcano, drought, tsunami) has a
 * correct safety action that students must identify.
 *
 * Topics: earthquake, volcano, flood, drought, tsunami, disaster, safety
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Disaster definitions ────────────────────────────────────

interface Disaster {
  name: string;
  emoji: string;
  color: number;
  safety: string;
  safetyEmoji: string;
}

const DISASTERS: Disaster[] = [
  { name: 'Earthquake', emoji: '🏚️', color: 0xf97316, safety: 'Drop, cover, hold', safetyEmoji: '🛡️' },
  { name: 'Flood', emoji: '🌊', color: 0x3b82f6, safety: 'Move to higher ground', safetyEmoji: '⛰️' },
  { name: 'Volcano', emoji: '🌋', color: 0xef4444, safety: 'Evacuate the area', safetyEmoji: '🏃' },
  { name: 'Drought', emoji: '🏜️', color: 0xfbbf24, safety: 'Conserve water', safetyEmoji: '💧' },
  { name: 'Tsunami', emoji: '🌊', color: 0x06b6d4, safety: 'Move inland', safetyEmoji: '🚶' },
];

// ─── Plugin ──────────────────────────────────────────────────

class NaturalDisasterSimulationPlugin implements SimulationPlugin {
  id = 'natural-disaster';
  subject = 'science';
  topics = ['earthquake', 'volcano', 'flood', 'drought', 'disaster', 'tsunami'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      q.includes('earthquake') ||
      q.includes('volcano') ||
      q.includes('flood') ||
      q.includes('drought') ||
      q.includes('tsunami') ||
      (q.includes('disaster') && q.includes('safety'))
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'match_first',
        mascotNarration: 'Watch me! I will drag the safety measure to the matching disaster.',
        mascotAction: (sim) => {
          const firstCard = sim.container.children.find(c => c.name === 'safety_card_0') as PIXI.Container | undefined;
          const firstDisaster = sim.container.children.find(c => c.name === 'disaster_0') as PIXI.Container | undefined;
          if (firstCard && firstDisaster) {
            gsap.to(firstCard, { x: firstDisaster.x, y: firstDisaster.y, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag each safety measure to the correct disaster.',
        hint: 'Match the safety action to the disaster it protects against!',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, answer } = ctx;
    const cx = width / 2;
    let solved = false;
    let matched = 0;

    // Pick 3 disasters
    const picked = DISASTERS.slice(0, 3);
    // Shuffle safety cards
    const shuffled = [...picked].sort(() => Math.random() - 0.5);

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('🌍 Drag the safety measure to the correct disaster!', {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Disaster targets (top row) ─────────────────────────
    const disasterSpacing = 160;
    const disasterStartX = cx - ((picked.length - 1) * disasterSpacing) / 2;
    const disasterY = 90;

    picked.forEach((d, i) => {
      const dContainer = new PIXI.Container();
      dContainer.name = `disaster_${i}`;
      dContainer.x = disasterStartX + i * disasterSpacing;
      dContainer.y = disasterY;
      container.addChild(dContainer);

      const bg = new PIXI.Graphics();
      bg.lineStyle(3, d.color);
      bg.beginFill(d.color, 0.1);
      bg.drawRoundedRect(-60, -35, 120, 70, 10);
      bg.endFill();
      dContainer.addChild(bg);

      const emoji = new PIXI.Text(d.emoji, { fontSize: 28 });
      emoji.anchor.set(0.5);
      emoji.y = -8;
      dContainer.addChild(emoji);

      const nameLabel = new PIXI.Text(d.name, { fontSize: 11, fill: d.color, fontWeight: 'bold' });
      nameLabel.anchor.set(0.5);
      nameLabel.y = 20;
      dContainer.addChild(nameLabel);
    });

    // ─── Safety cards (bottom, draggable) ──────────────────
    const cardY = height - 90;
    const cardSpacing = 160;
    const cardStartX = cx - ((shuffled.length - 1) * cardSpacing) / 2;

    shuffled.forEach((d, i) => {
      const card = new PIXI.Container();
      card.name = `safety_card_${i}`;
      card.x = cardStartX + i * cardSpacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'grab';
      container.addChild(card);

      const cardBg = new PIXI.Graphics();
      cardBg.lineStyle(3, 0x16a34a);
      cardBg.beginFill(0xd1fae5, 0.8);
      cardBg.drawRoundedRect(-60, -30, 120, 60, 8);
      cardBg.endFill();
      card.addChild(cardBg);

      const emoji = new PIXI.Text(d.safetyEmoji, { fontSize: 20 });
      emoji.anchor.set(0.5);
      emoji.y = -8;
      card.addChild(emoji);

      const textLabel = new PIXI.Text(d.safety, {
        fontSize: 10, fill: 0x166534, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: 110, align: 'center',
      });
      textLabel.anchor.set(0.5);
      textLabel.y = 12;
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

        // Find closest disaster target
        let closestIdx = -1;
        let closestDist = 999;
        picked.forEach((_, di) => {
          const dContainer = container.children.find(c => c.name === `disaster_${di}`) as PIXI.Container | undefined;
          if (!dContainer) return;
          const dx = card.x - dContainer.x;
          const dy = card.y - dContainer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < closestDist) { closestDist = dist; closestIdx = di; }
        });

        if (closestIdx >= 0 && closestDist < 80) {
          const targetDisaster = picked[closestIdx];
          if (targetDisaster.name === d.name) {
            // Correct match!
            ctx.playSound('drop-correct');
            ctx.speak(`${d.safety} — correct for ${d.name}!`);
            ctx.setMascotMood('happy');
            matched++;
            gsap.to(card, { x: disasterStartX + closestIdx * disasterSpacing, y: disasterY + 40, duration: 0.2 });
            card.eventMode = 'none';
            ctx.onStepCompleted();

            if (matched === picked.length && !solved) {
              solved = true;
              ctx.playSound('success');
              ctx.speak('All safety measures matched! Great job!');
              ctx.celebrate(cx, disasterY);
              setTimeout(() => ctx.onSolved(answer), 1500);
            }
          } else {
            ctx.showWrong(card.x, card.y - 20);
            ctx.speak(`${d.safety} is for ${d.name}, not ${targetDisaster.name}!`);
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

    // ─── Adaptive: show lines connecting ────────────────────
    if (ctx.adaptiveEasier) {
      const hint = new PIXI.Text('💡 Think: What should you do to stay safe from each disaster?', {
        fontSize: 11, fill: 0x3b82f6, fontWeight: 'bold',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = height - 20;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new NaturalDisasterSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as NaturalDisasterSimulation };
