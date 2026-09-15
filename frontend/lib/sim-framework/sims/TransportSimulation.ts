/**
 * TransportSimulation
 *
 * Students drag vehicle cards (airplane, train, truck, ship, etc.) into
 * the correct transport category bins: Airway, Railway, Roadway, Waterway.
 *
 * Topics: transport, airway, railway, roadway, waterway, vehicle
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Vehicle definitions ─────────────────────────────────────

interface Vehicle {
  name: string;
  emoji: string;
  category: 'Airway' | 'Railway' | 'Roadway' | 'Waterway';
}

const VEHICLES: Vehicle[] = [
  { name: 'Airplane', emoji: '✈️', category: 'Airway' },
  { name: 'Helicopter', emoji: '🚁', category: 'Airway' },
  { name: 'Train', emoji: '🚂', category: 'Railway' },
  { name: 'Tram', emoji: '🚊', category: 'Railway' },
  { name: 'Truck', emoji: '🚚', category: 'Roadway' },
  { name: 'Bus', emoji: '🚌', category: 'Roadway' },
  { name: 'Ship', emoji: '🚢', category: 'Waterway' },
  { name: 'Boat', emoji: '⛵', category: 'Waterway' },
];

const CATEGORIES: { name: string; color: number; emoji: string }[] = [
  { name: 'Airway', color: 0x3b82f6, emoji: '☁️' },
  { name: 'Railway', color: 0xf97316, emoji: '🛤️' },
  { name: 'Roadway', color: 0x22c55e, emoji: '🛣️' },
  { name: 'Waterway', color: 0x06b6d4, emoji: '🌊' },
];

// ─── Plugin ──────────────────────────────────────────────────

class TransportSimulationPlugin implements SimulationPlugin {
  id = 'transport';
  subject = 'science';
  topics = ['transport', 'airway', 'railway', 'roadway', 'waterway'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      q.includes('transport') ||
      q.includes('airway') ||
      q.includes('railway') ||
      q.includes('roadway') ||
      q.includes('waterway')
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'drag_first',
        mascotNarration: 'Watch me! An airplane flies in the air, so it goes in the Airway bin.',
        mascotAction: (sim) => {
          const firstCard = sim.container.children.find(c => c.name === 'vehicle_card_0') as PIXI.Container | undefined;
          const firstBin = sim.container.children.find(c => c.name === 'bin_Airway') as PIXI.Container | undefined;
          if (firstCard && firstBin) {
            gsap.to(firstCard, { x: firstBin.x, y: firstBin.y, duration: 0.8, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag each vehicle to the correct transport category!',
        hint: 'Where does each vehicle travel? Air, rail, road, or water?',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, answer } = ctx;
    const cx = width / 2;
    let solved = false;
    let sorted = 0;

    // Pick 4 vehicles — one from each category
    const picked: Vehicle[] = [];
    for (const cat of CATEGORIES) {
      const v = VEHICLES.find(vv => vv.category === cat.name);
      if (v) picked.push(v);
    }
    picked.sort(() => Math.random() - 0.5);

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('🚗 Drag vehicles to the correct transport!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Category bins (bottom row) ─────────────────────────
    const binY = height - 110;
    const binSpacing = 150;
    const binStartX = cx - ((CATEGORIES.length - 1) * binSpacing) / 2;

    CATEGORIES.forEach((cat, i) => {
      const bin = new PIXI.Container();
      bin.name = `bin_${cat.name}`;
      bin.x = binStartX + i * binSpacing;
      bin.y = binY;
      container.addChild(bin);

      const bg = new PIXI.Graphics();
      bg.lineStyle(3, cat.color);
      bg.beginFill(cat.color, 0.1);
      bg.drawRoundedRect(-55, -30, 110, 60, 8);
      bg.endFill();
      bin.addChild(bg);

      const emoji = new PIXI.Text(cat.emoji, { fontSize: 16 });
      emoji.anchor.set(0.5);
      emoji.y = -10;
      bin.addChild(emoji);

      const label = new PIXI.Text(cat.name, { fontSize: 11, fill: cat.color, fontWeight: 'bold' });
      label.anchor.set(0.5);
      label.y = 12;
      bin.addChild(label);
    });

    // ─── Progress ───────────────────────────────────────────
    const progressText = new PIXI.Text(`Sorted: 0 / ${picked.length}`, { fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold' });
    progressText.anchor.set(0.5);
    progressText.x = cx;
    progressText.y = height - 20;
    container.addChild(progressText);

    // ─── Vehicle cards (top, draggable) ─────────────────────
    const cardSpacing = 100;
    const cardStartX = cx - ((picked.length - 1) * cardSpacing) / 2;
    const cardY = 90;

    picked.forEach((v, i) => {
      const card = new PIXI.Container();
      card.name = `vehicle_card_${i}`;
      card.x = cardStartX + i * cardSpacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'grab';
      container.addChild(card);

      const cardBg = new PIXI.Graphics();
      cardBg.lineStyle(3, 0xd1d5db);
      cardBg.beginFill(0xffffff, 0.9);
      cardBg.drawRoundedRect(-35, -35, 70, 70, 8);
      cardBg.endFill();
      card.addChild(cardBg);

      const emoji = new PIXI.Text(v.emoji, { fontSize: 28 });
      emoji.anchor.set(0.5);
      emoji.y = -8;
      card.addChild(emoji);

      const nameLabel = new PIXI.Text(v.name, { fontSize: 9, fill: 0x333333, fontWeight: 'bold' });
      nameLabel.anchor.set(0.5);
      nameLabel.y = 20;
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

        // Find closest bin
        let closestCat = '';
        let closestDist = 999;
        CATEGORIES.forEach(cat => {
          const bin = container.children.find(c => c.name === `bin_${cat.name}`) as PIXI.Container | undefined;
          if (!bin) return;
          const dx = card.x - bin.x;
          const dy = card.y - bin.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < closestDist) { closestDist = dist; closestCat = cat.name; }
        });

        if (closestDist < 80) {
          if (closestCat === v.category) {
            ctx.playSound('drop-correct');
            ctx.speak(`${v.name} — ${v.category}! Correct!`);
            ctx.setMascotMood('happy');
            sorted++;
            progressText.text = `Sorted: ${sorted} / ${picked.length}`;
            const bin = container.children.find(c => c.name === `bin_${closestCat}`) as PIXI.Container;
            gsap.to(card, { x: bin.x, y: bin.y - 20, duration: 0.2 });
            card.eventMode = 'none';
            ctx.onStepCompleted();

            if (sorted === picked.length && !solved) {
              solved = true;
              progressText.text = 'All sorted! 🎉';
              progressText.style.fill = 0x22c55e;
              ctx.playSound('success');
              ctx.speak('All vehicles sorted correctly! Great job!');
              ctx.celebrate(cx, binY);
              setTimeout(() => ctx.onSolved(answer), 1500);
            }
          } else {
            ctx.showWrong(card.x, card.y - 20);
            ctx.speak(`${v.name} is ${v.category}, not ${closestCat}!`);
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
      const hint = new PIXI.Text('💡 Airway = flies. Railway = trains. Roadway = cars/trucks. Waterway = ships/boats.', {
        fontSize: 10, fill: 0x3b82f6, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: width - 40, align: 'center',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = 160;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new TransportSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as TransportSimulation };
