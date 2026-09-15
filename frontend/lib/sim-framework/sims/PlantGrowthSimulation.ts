/**
 * PlantGrowthSimulation
 *
 * Students drag sun, water, and soil to a plant seed and watch it grow
 * through stages: seed → sprout → seedling → adult plant → flower.
 * Each stage requires the student to provide the right resource.
 *
 * Topics: plants, growth, photosynthesis, germination, agriculture, crops
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Growth stages ───────────────────────────────────────────

interface GrowthStage {
  id: string;
  name: string;
  neededResource: 'sun' | 'water' | 'soil';
  narration: string;
}

const STAGES: GrowthStage[] = [
  { id: 'seed', name: 'Seed', neededResource: 'soil', narration: 'The seed needs soil to germinate!' },
  { id: 'sprout', name: 'Sprout', neededResource: 'water', narration: 'The sprout needs water to grow!' },
  { id: 'seedling', name: 'Seedling', neededResource: 'sun', narration: 'The seedling needs sunlight for photosynthesis!' },
  { id: 'adult', name: 'Adult Plant', neededResource: 'water', narration: 'The plant needs more water to grow taller!' },
  { id: 'flower', name: 'Flower', neededResource: 'sun', narration: 'The plant needs sun to bloom!' },
];

// ─── Plugin ──────────────────────────────────────────────────

class PlantGrowthSimulationPlugin implements SimulationPlugin {
  id = 'plant-growth';
  subject = 'science';
  topics = ['plant', 'growth', 'photosynthesis', 'germination', 'crop', 'agriculture', 'farming'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    // Only handle growth/agriculture questions, NOT basic plant parts questions
    // (e.g., "Which part of the plant does photosynthesis?" should go to the body/plant diagram renderer)
    if (q.includes('which part') || q.includes('part of the plant') || q.includes('part of plant')) {
      return false;
    }
    return (
      (q.includes('plant') && (q.includes('grow') || q.includes('need') || q.includes('stage'))) ||
      q.includes('growth') ||
      q.includes('photosynthesis') ||
      q.includes('germination') ||
      (q.includes('crop') && (q.includes('kharif') || q.includes('rabi') || q.includes('sow') || q.includes('grow'))) ||
      q.includes('agriculture') ||
      q.includes('farming') ||
      (q.includes('seed') && (q.includes('grow') || q.includes('plant') || q.includes('need')))
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return STAGES.map((stage, i) => ({
      id: `stage_${stage.id}`,
      mascotNarration: `Watch me! ${stage.narration} I'll drag the ${stage.neededResource} to the plant.`,
      mascotAction: (sim) => {
        const resource = sim.container.children.find(c => c.name === `resource_${stage.neededResource}`) as PIXI.Container | undefined;
        const plant = sim.container.children.find(c => c.name === 'plant') as PIXI.Container | undefined;
        if (resource && plant) {
          gsap.to(resource, { x: plant.x, y: plant.y, duration: 0.8, ease: 'power2.out', yoyo: true, repeat: 1 });
        }
      },
      studentInstruction: `Now you try! Drag the ${stage.neededResource} to the ${stage.name}.`,
      hint: `Drag the ${stage.neededResource} icon to the plant!`,
    }));
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, answer } = ctx;
    const cx = width / 2;
    let solved = false;
    let stageIndex = 0;

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('🌱 Drag resources to grow the plant!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Ground ─────────────────────────────────────────────
    const ground = new PIXI.Graphics();
    ground.beginFill(0x92400e, 0.3);
    ground.drawRect(0, height - 120, width, 120);
    ground.endFill();
    ground.beginFill(0x78350f, 0.4);
    ground.drawRect(0, height - 120, width, 30);
    ground.endFill();
    container.addChild(ground);

    // ─── Plant container (center) ───────────────────────────
    const plant = new PIXI.Container();
    plant.name = 'plant';
    plant.x = cx;
    plant.y = height - 120;
    container.addChild(plant);

    // Draw the current stage of the plant
    const drawPlant = (stage: number) => {
      plant.removeChildren();

      const stem = new PIXI.Graphics();
      stem.lineStyle(4, 0x16a34a);

      if (stage === 0) {
        // Seed
        const seed = new PIXI.Graphics();
        seed.beginFill(0x92400e);
        seed.drawEllipse(0, -5, 8, 6);
        seed.endFill();
        plant.addChild(seed);
      } else if (stage === 1) {
        // Sprout
        stem.moveTo(0, 0);
        stem.lineTo(0, -20);
        plant.addChild(stem);
        const leaf1 = new PIXI.Graphics();
        leaf1.beginFill(0x22c55e);
        leaf1.drawEllipse(-8, -15, 8, 4);
        leaf1.endFill();
        plant.addChild(leaf1);
        const leaf2 = new PIXI.Graphics();
        leaf2.beginFill(0x22c55e);
        leaf2.drawEllipse(8, -15, 8, 4);
        leaf2.endFill();
        plant.addChild(leaf2);
      } else if (stage === 2) {
        // Seedling
        stem.moveTo(0, 0);
        stem.lineTo(0, -40);
        plant.addChild(stem);
        for (let i = 0; i < 4; i++) {
          const leaf = new PIXI.Graphics();
          leaf.beginFill(0x22c55e);
          const ly = -10 - i * 10;
          leaf.drawEllipse(i % 2 === 0 ? -10 : 10, ly, 10, 5);
          leaf.endFill();
          plant.addChild(leaf);
        }
      } else if (stage === 3) {
        // Adult plant
        stem.moveTo(0, 0);
        stem.lineTo(0, -70);
        plant.addChild(stem);
        for (let i = 0; i < 6; i++) {
          const leaf = new PIXI.Graphics();
          leaf.beginFill(0x22c55e);
          const ly = -10 - i * 10;
          leaf.drawEllipse(i % 2 === 0 ? -12 : 12, ly, 12, 6);
          leaf.endFill();
          plant.addChild(leaf);
        }
      } else if (stage >= 4) {
        // Flower
        stem.moveTo(0, 0);
        stem.lineTo(0, -80);
        plant.addChild(stem);
        for (let i = 0; i < 6; i++) {
          const leaf = new PIXI.Graphics();
          leaf.beginFill(0x22c55e);
          const ly = -10 - i * 10;
          leaf.drawEllipse(i % 2 === 0 ? -12 : 12, ly, 12, 6);
          leaf.endFill();
          plant.addChild(leaf);
        }
        // Flower petals
        const flower = new PIXI.Graphics();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          flower.beginFill(0xec4899);
          flower.drawEllipse(Math.cos(angle) * 10, -80 + Math.sin(angle) * 10, 8, 5);
          flower.endFill();
        }
        flower.beginFill(0xfbbf24);
        flower.drawCircle(0, -80, 6);
        flower.endFill();
        plant.addChild(flower);
      }
    };

    drawPlant(0);

    // ─── Stage label ────────────────────────────────────────
    const stageLabel = new PIXI.Text('Stage: Seed', { fontSize: 16, fill: 0x16a34a, fontWeight: 'bold' });
    stageLabel.anchor.set(0.5);
    stageLabel.x = cx;
    stageLabel.y = 55;
    container.addChild(stageLabel);

    // ─── Progress bar ───────────────────────────────────────
    const progressText = new PIXI.Text(`Growth: 0 / ${STAGES.length}`, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    progressText.anchor.set(0.5);
    progressText.x = cx;
    progressText.y = height - 15;
    container.addChild(progressText);

    // ─── Resources (draggable) ──────────────────────────────
    const resources: { type: 'sun' | 'water' | 'soil'; emoji: string; x: number }[] = [
      { type: 'sun', emoji: '☀️', x: 60 },
      { type: 'water', emoji: '💧', x: cx },
      { type: 'soil', emoji: '🟫', x: width - 60 },
    ];

    resources.forEach(res => {
      const resContainer = new PIXI.Container();
      resContainer.name = `resource_${res.type}`;
      resContainer.x = res.x;
      resContainer.y = 100;
      resContainer.eventMode = 'static';
      resContainer.cursor = 'grab';
      container.addChild(resContainer);

      const bg = new PIXI.Graphics();
      bg.beginFill(0xffffff, 0.8);
      bg.lineStyle(2, 0xd1d5db);
      bg.drawRoundedRect(-25, -25, 50, 50, 10);
      bg.endFill();
      resContainer.addChild(bg);

      const emoji = new PIXI.Text(res.emoji, { fontSize: 28 });
      emoji.anchor.set(0.5);
      resContainer.addChild(emoji);

      const label = new PIXI.Text(res.type, { fontSize: 10, fill: 0x6b7280, fontWeight: 'bold' });
      label.anchor.set(0.5);
      label.y = 22;
      resContainer.addChild(label);

      // Drag behavior
      let dragging = false;
      let offsetX = 0, offsetY = 0;
      const origX = resContainer.x, origY = resContainer.y;

      resContainer.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
        if (solved) return;
        dragging = true;
        resContainer.cursor = 'grabbing';
        ctx.playSound('pickup');
        const pos = e.global;
        offsetX = pos.x - resContainer.x;
        offsetY = pos.y - resContainer.y;
        container.setChildIndex(resContainer, container.children.length - 1);
      });

      resContainer.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
        if (!dragging) return;
        const pos = e.global;
        resContainer.x = pos.x - offsetX;
        resContainer.y = pos.y - offsetY;
      });

      const checkDrop = () => {
        if (!dragging) return;
        dragging = false;
        resContainer.cursor = 'grab';

        const dx = resContainer.x - plant.x;
        const dy = resContainer.y - plant.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          // Dropped on plant — check if this is the right resource
          const currentStage = STAGES[stageIndex];
          if (res.type === currentStage.neededResource) {
            // Correct!
            ctx.playSound('pop');
            ctx.speak(currentStage.narration);
            ctx.setMascotMood('happy');

            ctx.onStepCompleted();

            // Grow animation
            stageIndex++;
            gsap.to(plant.scale, { x: 1.1, y: 1.1, duration: 0.2, yoyo: true, repeat: 1, onComplete: () => {
              drawPlant(stageIndex);
              gsap.from(plant.scale, { x: 0.8, y: 0.8, duration: 0.4, ease: 'back.out' });
            }});

            stageLabel.text = `Stage: ${STAGES[Math.min(stageIndex, STAGES.length - 1)].name}`;
            progressText.text = `Growth: ${stageIndex} / ${STAGES.length}`;
            gsap.to(progressText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });

            // Return resource to original position
            gsap.to(resContainer, { x: origX, y: origY, duration: 0.3 });

            if (stageIndex >= STAGES.length && !solved) {
              solved = true;
              stageLabel.text = '🌸 Fully grown! 🎉';
              stageLabel.style.fill = 0xec4899;
              progressText.text = 'Plant complete! 🎉';
              progressText.style.fill = 0x22c55e;
              ctx.playSound('success');
              ctx.speak('The plant has fully grown! It needed soil, water, and sunlight! Great job!');
              ctx.celebrate(cx, plant.y - 80);
              setTimeout(() => ctx.onSolved(answer), 1500);
            }
          } else {
            // Wrong resource
            ctx.showWrong(resContainer.x, resContainer.y - 20);
            ctx.speak(`The ${currentStage.name} needs ${currentStage.neededResource}, not ${res.type}!`);
            ctx.onWrong();
            gsap.to(resContainer, { x: origX, y: origY, duration: 0.3 });
          }
        } else {
          // Return to original position
          gsap.to(resContainer, { x: origX, y: origY, duration: 0.3 });
        }
      };

      resContainer.on('pointerup', checkDrop);
      resContainer.on('pointerupoutside', () => {
        if (!dragging) return;
        dragging = false;
        resContainer.cursor = 'grab';
        gsap.to(resContainer, { x: origX, y: origY, duration: 0.3 });
      });
    });

    // ─── Adaptive: show what's needed ───────────────────────
    if (ctx.adaptiveEasier) {
      const hint = new PIXI.Text(`💡 The plant needs: ${STAGES[0].neededResource}`, {
        fontSize: 12, fill: 0x3b82f6, fontWeight: 'bold',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = 80;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new PlantGrowthSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as PlantGrowthSimulation };
