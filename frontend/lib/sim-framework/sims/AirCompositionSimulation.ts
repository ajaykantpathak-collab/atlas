/**
 * AirCompositionSimulation
 *
 * Students drag gas molecules (nitrogen, oxygen, carbon dioxide, argon, etc.)
 * into an "atmosphere" container to build the correct air composition.
 * A bar chart shows the current vs target percentages.
 *
 * Topics: air, atmosphere, nitrogen, oxygen, gas, composition, carbon dioxide
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Gas definitions ─────────────────────────────────────────

interface Gas {
  name: string;
  emoji: string;
  color: number;
  percent: number; // target percentage in air
}

const GASES: Gas[] = [
  { name: 'Nitrogen', emoji: '🔵', color: 0x3b82f6, percent: 78 },
  { name: 'Oxygen', emoji: '🟢', color: 0x22c55e, percent: 21 },
  { name: 'Carbon Dioxide', emoji: '⚫', color: 0x374151, percent: 0.04 },
  { name: 'Argon', emoji: '🟣', color: 0xa855f7, percent: 0.93 },
];

// ─── Plugin ──────────────────────────────────────────────────

class AirCompositionSimulationPlugin implements SimulationPlugin {
  id = 'air-composition';
  subject = 'science';
  topics = ['air', 'nitrogen', 'oxygen', 'atmosphere', 'gas composition', 'carbon dioxide'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      (q.includes('air') && (q.includes('composition') || q.includes('percentage') || q.includes('component') || q.includes('gas') || q.includes('nitrogen') || q.includes('oxygen'))) ||
      q.includes('atmosphere') ||
      (q.includes('nitrogen') && q.includes('percent'))
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'drag_nitrogen',
        mascotNarration: 'Watch me! Nitrogen is the most common gas in air — about 78%! I will drag it into the atmosphere.',
        mascotAction: (sim) => {
          const nCard = sim.container.children.find(c => c.name === 'gas_Nitrogen') as PIXI.Container | undefined;
          const atmos = sim.container.children.find(c => c.name === 'atmosphere') as PIXI.Container | undefined;
          if (nCard && atmos) {
            gsap.to(nCard, { x: atmos.x, y: atmos.y, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag each gas into the atmosphere jar to build the correct air composition.',
        hint: 'Nitrogen is 78%, Oxygen is 21%. Drag them into the jar!',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, answer } = ctx;
    const cx = width / 2;
    let solved = false;
    let placed: { name: string; percent: number }[] = [];

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('💨 Drag gases to build the air!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Atmosphere jar (center, large) ─────────────────────
    const atmos = new PIXI.Container();
    atmos.name = 'atmosphere';
    atmos.x = cx;
    atmos.y = 180;
    container.addChild(atmos);

    const jarG = new PIXI.Graphics();
    jarG.lineStyle(3, 0x6b7280);
    jarG.beginFill(0xe0f2fe, 0.2);
    jarG.drawRoundedRect(-70, -80, 140, 160, 12);
    jarG.endFill();
    atmos.addChild(jarG);

    const jarLabel = new PIXI.Text('🌍 Atmosphere', { fontSize: 12, fill: 0x6b7280, fontWeight: 'bold' });
    jarLabel.anchor.set(0.5);
    jarLabel.y = -95;
    atmos.addChild(jarLabel);

    // ─── Bar chart inside jar ───────────────────────────────
    const barChart = new PIXI.Container();
    barChart.y = 30;
    atmos.addChild(barChart);

    const updateBars = () => {
      barChart.removeChildren();
      const total = placed.reduce((s, g) => s + g.percent, 0);
      if (total === 0) return;

      let yOffset = 0;
      const barW = 100;
      placed.forEach(g => {
        const gas = GASES.find(gg => gg.name === g.name);
        if (!gas) return;
        const barH = (g.percent / 100) * 60;
        const bar = new PIXI.Graphics();
        bar.beginFill(gas.color, 0.7);
        bar.drawRect(-barW / 2, -yOffset - barH, barW, barH);
        bar.endFill();
        barChart.addChild(bar);

        const label = new PIXI.Text(`${gas.name}: ${g.percent}%`, { fontSize: 8, fill: 0xffffff, fontWeight: 'bold' });
        label.anchor.set(0.5);
        label.x = 0;
        label.y = -yOffset - barH / 2;
        barChart.addChild(label);

        yOffset += barH;
      });
    };

    // ─── Gas cards (bottom, draggable) ──────────────────────
    const cardY = height - 70;
    const cardSpacing = 110;
    const cardStartX = cx - ((GASES.length - 1) * cardSpacing) / 2;

    GASES.forEach((gas, i) => {
      const card = new PIXI.Container();
      card.name = `gas_${gas.name}`;
      card.x = cardStartX + i * cardSpacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'grab';
      container.addChild(card);

      const cardBg = new PIXI.Graphics();
      cardBg.lineStyle(3, gas.color);
      cardBg.beginFill(0xffffff, 0.9);
      cardBg.drawRoundedRect(-45, -28, 90, 56, 8);
      cardBg.endFill();
      card.addChild(cardBg);

      const emoji = new PIXI.Text(gas.emoji, { fontSize: 18 });
      emoji.anchor.set(0.5);
      emoji.y = -8;
      card.addChild(emoji);

      const nameLabel = new PIXI.Text(gas.name, { fontSize: 9, fill: gas.color, fontWeight: 'bold' });
      nameLabel.anchor.set(0.5);
      nameLabel.y = 8;
      card.addChild(nameLabel);

      const pctLabel = new PIXI.Text(`${gas.percent}%`, { fontSize: 10, fill: 0x6b7280, fontWeight: 'bold' });
      pctLabel.anchor.set(0.5);
      pctLabel.y = 20;
      card.addChild(pctLabel);

      // Drag behavior
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

        const dx = card.x - atmos.x;
        const dy = card.y - atmos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90 && !alreadyPlaced) {
          // Placed in atmosphere
          alreadyPlaced = true;
          placed.push({ name: gas.name, percent: gas.percent });
          ctx.playSound('pop');
          ctx.speak(`${gas.name}: ${gas.percent}% of air!`);
          ctx.setMascotMood('happy');
          updateBars();
          ctx.onStepCompleted();

          // Fade card
          gsap.to(card, { alpha: 0.3, duration: 0.3 });

          // Check if all placed
          if (placed.length === GASES.length && !solved) {
            solved = true;
            ctx.playSound('success');
            ctx.speak('Air composition complete! Nitrogen 78%, Oxygen 21%, and trace gases! Great job!');
            ctx.celebrate(cx, 180);
            setTimeout(() => ctx.onSolved(answer), 1500);
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

    // ─── Adaptive: show target chart ────────────────────────
    if (ctx.adaptiveEasier) {
      const hint = new PIXI.Text('💡 Air = Nitrogen 78% + Oxygen 21% + small amounts of other gases', {
        fontSize: 10, fill: 0x3b82f6, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: width - 40, align: 'center',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = height - 20;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new AirCompositionSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as AirCompositionSimulation };
