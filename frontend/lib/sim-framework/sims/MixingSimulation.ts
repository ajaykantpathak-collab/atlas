/**
 * MixingSimulation
 *
 * A real beaker simulation where students drag substances (salt, sugar, sand,
 * chalk, oil) into water and observe whether they dissolve, form a suspension,
 * or form a colloid. The student must classify the mixture correctly.
 *
 * Topics: mixtures, solutions, suspensions, colloids, dissolving, filtration
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Substance definitions ───────────────────────────────────

interface Substance {
  name: string;
  emoji: string;
  color: number;
  dissolves: boolean;
  classification: 'solution' | 'suspension' | 'colloid';
  particleSize: number; // visual particle size when added
}

const SUBSTANCES: Record<string, Substance> = {
  salt: { name: 'Salt', emoji: '🧂', color: 0xffffff, dissolves: true, classification: 'solution', particleSize: 3 },
  sugar: { name: 'Sugar', emoji: '🍬', color: 0xfde68a, dissolves: true, classification: 'solution', particleSize: 4 },
  sand: { name: 'Sand', emoji: '🏖️', color: 0xfbbf24, dissolves: false, classification: 'suspension', particleSize: 6 },
  chalk: { name: 'Chalk', emoji: '✏️', color: 0xf3f4f6, dissolves: false, classification: 'suspension', particleSize: 5 },
  oil: { name: 'Oil', emoji: '🛢️', color: 0xfbbf24, dissolves: false, classification: 'colloid', particleSize: 8 },
  mud: { name: 'Mud', emoji: '🟤', color: 0x78350f, dissolves: false, classification: 'suspension', particleSize: 7 },
};

// ─── Plugin ──────────────────────────────────────────────────

class MixingSimulationPlugin implements SimulationPlugin {
  id = 'mixing';
  subject = 'science';
  topics = ['mixture', 'solution', 'suspension', 'colloid', 'dissolve', 'filtration', 'separation'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      q.includes('mixture') ||
      q.includes('solution') ||
      q.includes('suspension') ||
      q.includes('colloid') ||
      q.includes('dissolve') ||
      q.includes('filtration') ||
      q.includes('separation') ||
      q.includes('soluble') ||
      q.includes('insoluble')
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'drag_substance',
        mascotNarration: 'Watch me! I will drag a substance into the water.',
        mascotAction: (sim) => {
          // Mascot highlights the first substance
          const substances = sim.container.children.filter(
            c => c.name === 'substance_jar',
          ) as PIXI.Container[];
          if (substances[0]) {
            gsap.to(substances[0].scale, { x: 1.2, y: 1.2, duration: 0.3, yoyo: true, repeat: 2 });
          }
        },
        studentInstruction: 'Now you try! Drag a substance into the beaker of water.',
        hint: 'Pick up a substance jar and drag it over the beaker!',
      },
      {
        id: 'observe_result',
        mascotNarration: 'Look at what happened! Did the substance dissolve or stay visible?',
        mascotAction: (sim) => {
          // Mascot points at the beaker
          const beaker = sim.container.children.find(c => c.name === 'beaker') as PIXI.Graphics | undefined;
          if (beaker) {
            gsap.to(beaker.scale, { x: 1.05, y: 1.05, duration: 0.3, yoyo: true, repeat: 2 });
          }
        },
        studentInstruction: 'Observe the water. Is it clear (solution), cloudy with settling particles (suspension), or cloudy without settling (colloid)?',
        hint: 'Tap the correct classification card below the beaker!',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, question, answer, options } = ctx;
    const cx = width / 2;
    const q = question.toLowerCase();

    // Determine which substances to offer based on the question
    let availableSubstances: Substance[] = [];
    if (q.includes('sugar')) availableSubstances.push(SUBSTANCES.sugar);
    if (q.includes('salt')) availableSubstances.push(SUBSTANCES.salt);
    if (q.includes('sand')) availableSubstances.push(SUBSTANCES.sand);
    if (q.includes('chalk')) availableSubstances.push(SUBSTANCES.chalk);
    if (q.includes('oil')) availableSubstances.push(SUBSTANCES.oil);
    if (q.includes('mud')) availableSubstances.push(SUBSTANCES.mud);
    if (availableSubstances.length === 0) {
      // Default: offer sugar, sand, oil for variety
      availableSubstances = [SUBSTANCES.sugar, SUBSTANCES.sand, SUBSTANCES.oil];
    }

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('🧪 Drag a substance into the water!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Beaker ─────────────────────────────────────────────
    const beakerX = cx;
    const beakerY = 160;
    const beakerW = 120;
    const beakerH = 140;

    const beaker = new PIXI.Graphics();
    beaker.name = 'beaker';
    // Glass outline
    beaker.lineStyle(3, 0x6b7280);
    beaker.beginFill(0xe0f2fe, 0.3);
    beaker.moveTo(-beakerW / 2, -beakerH / 2);
    beaker.lineTo(-beakerW / 2 + 10, beakerH / 2);
    beaker.lineTo(beakerW / 2 - 10, beakerH / 2);
    beaker.lineTo(beakerW / 2, -beakerH / 2);
    beaker.endFill();
    // Water
    beaker.lineStyle(0);
    beaker.beginFill(0x60a5fa, 0.3);
    beaker.moveTo(-beakerW / 2 + 5, -beakerH / 2 + 30);
    beaker.lineTo(-beakerW / 2 + 10, beakerH / 2 - 5);
    beaker.lineTo(beakerW / 2 - 10, beakerH / 2 - 5);
    beaker.lineTo(beakerW / 2 - 5, -beakerH / 2 + 30);
    beaker.endFill();
    // Water surface line
    beaker.lineStyle(2, 0x3b82f6, 0.5);
    beaker.moveTo(-beakerW / 2 + 5, -beakerH / 2 + 30);
    beaker.lineTo(beakerW / 2 - 5, -beakerH / 2 + 30);
    beaker.x = beakerX;
    beaker.y = beakerY;
    container.addChild(beaker);

    // Water level text
    const waterLabel = new PIXI.Text('💧 Water', { fontSize: 12, fill: 0x3b82f6 });
    waterLabel.anchor.set(0.5);
    waterLabel.x = beakerX;
    waterLabel.y = beakerY - beakerH / 2 - 15;
    container.addChild(waterLabel);

    // ─── Substance jars (draggable) ────────────────────────
    const jarY = height - 100;
    const jarSpacing = Math.min(90, (width - 40) / availableSubstances.length);
    const jarStartX = cx - ((availableSubstances.length - 1) * jarSpacing) / 2;

    let addedSubstance: Substance | null = null;
    let solved = false;

    availableSubstances.forEach((sub, i) => {
      const jar = new PIXI.Container();
      jar.name = 'substance_jar';
      jar.x = jarStartX + i * jarSpacing;
      jar.y = jarY;
      jar.eventMode = 'static';
      jar.cursor = 'grab';
      container.addChild(jar);

      // Jar background
      const jarBg = new PIXI.Graphics();
      jarBg.lineStyle(2, 0x9ca3af);
      jarBg.beginFill(0xf9fafb, 0.8);
      jarBg.drawRoundedRect(-28, -28, 56, 56, 8);
      jarBg.endFill();
      jar.addChild(jarBg);

      // Substance emoji
      const emoji = new PIXI.Text(sub.emoji, { fontSize: 28 });
      emoji.anchor.set(0.5);
      emoji.y = -5;
      jar.addChild(emoji);

      // Substance name
      const nameText = new PIXI.Text(sub.name, { fontSize: 10, fill: 0x4b5563, fontWeight: 'bold' });
      nameText.anchor.set(0.5);
      nameText.y = 20;
      jar.addChild(nameText);

      // Drag behavior
      let dragging = false;
      let offsetX = 0, offsetY = 0;
      const origX = jar.x, origY = jar.y;

      jar.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
        if (solved || addedSubstance) return;
        dragging = true;
        jar.cursor = 'grabbing';
        ctx.playSound('pickup');
        const pos = e.global;
        offsetX = pos.x - jar.x;
        offsetY = pos.y - jar.y;
        container.setChildIndex(jar, container.children.length - 1);
      });

      jar.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
        if (!dragging) return;
        const pos = e.global;
        jar.x = pos.x - offsetX;
        jar.y = pos.y - offsetY;
      });

      const checkDrop = () => {
        if (!dragging) return;
        dragging = false;
        jar.cursor = 'grab';
        const dx = jar.x - beakerX;
        const dy = jar.y - beakerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 70 && !addedSubstance) {
          // Dropped into beaker — add the substance
          addedSubstance = sub;
          ctx.playSound('drop-correct');
          ctx.speak(`You added ${sub.name} to the water!`);
          ctx.setMascotMood('happy');

          // Animate jar back to original position
          gsap.to(jar, { x: origX, y: origY, duration: 0.3, alpha: 0.5 });

          // Add particles to the water
          this.addParticlesToWater(container, beakerX, beakerY, beakerW, beakerH, sub);

          // Show classification cards
          setTimeout(() => {
            this.showClassificationCards(ctx, container, cx, height - 60, answer, options, () => {
              if (!solved) {
                solved = true;
                ctx.celebrate(beakerX, beakerY);
                setTimeout(() => ctx.onSolved(answer), 1500);
              }
            });
          }, 1000);
        } else {
          // Return to original position
          gsap.to(jar, { x: origX, y: origY, duration: 0.3 });
        }
      };

      jar.on('pointerup', checkDrop);
      jar.on('pointerupoutside', () => {
        if (!dragging) return;
        dragging = false;
        jar.cursor = 'grab';
        gsap.to(jar, { x: origX, y: origY, duration: 0.3 });
      });
    });

    // ─── Adaptive: pre-add a hint ───────────────────────────
    if (ctx.adaptiveEasier) {
      const hint = new PIXI.Text('💡 Hint: Solutions are clear. Suspensions are cloudy and settle.', {
        fontSize: 12, fill: 0x3b82f6, fontWeight: 'bold',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = height - 130;
      container.addChild(hint);
    }
  }

  /**
   * Add visual particles to the water inside the beaker.
   */
  private addParticlesToWater(
    container: PIXI.Container,
    beakerX: number,
    beakerY: number,
    beakerW: number,
    beakerH: number,
    sub: Substance,
  ): void {
    const particleCount = sub.dissolves ? 15 : 25;
    const waterTop = beakerY - beakerH / 2 + 35;
    const waterBottom = beakerY + beakerH / 2 - 10;
    const waterLeft = beakerX - beakerW / 2 + 15;
    const waterRight = beakerX + beakerW / 2 - 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = new PIXI.Graphics();
      particle.name = 'particle_in_water';
      particle.beginFill(sub.color, sub.dissolves ? 0.3 : 0.8);
      particle.drawCircle(0, 0, sub.particleSize);
      particle.endFill();
      particle.x = waterLeft + Math.random() * (waterRight - waterLeft);
      particle.y = waterTop + Math.random() * (waterBottom - waterTop);
      particle.alpha = 0;
      container.addChild(particle);

      gsap.to(particle, { alpha: 1, duration: 0.3, delay: i * 0.05 });

      if (sub.dissolves) {
        // Solution: particles fade and spread, water becomes slightly tinted
        gsap.to(particle, {
          alpha: 0.15,
          duration: 2,
          delay: 0.5 + i * 0.05,
          ease: 'sine.out',
        });
        gsap.to(particle, {
          x: waterLeft + Math.random() * (waterRight - waterLeft),
          y: waterTop + Math.random() * (waterBottom - waterTop),
          duration: 2,
          delay: 0.5,
        });
      } else if (sub.classification === 'suspension') {
        // Suspension: particles sink to bottom slowly
        gsap.to(particle, {
          y: waterBottom - 5 - Math.random() * 15,
          duration: 2 + Math.random(),
          delay: 0.5 + i * 0.05,
          ease: 'gravity',
        });
      } else {
        // Colloid: particles stay suspended, slight movement
        gsap.to(particle, {
          y: `+=${Math.random() * 10 - 5}`,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }

    // Tint the water for solutions
    if (sub.dissolves) {
      const tint = new PIXI.Graphics();
      tint.name = 'particle_in_water';
      tint.beginFill(sub.color, 0.1);
      tint.moveTo(-beakerW / 2 + 5, -beakerH / 2 + 35);
      tint.lineTo(-beakerW / 2 + 10, beakerH / 2 - 5);
      tint.lineTo(beakerW / 2 - 10, beakerH / 2 - 5);
      tint.lineTo(beakerW / 2 - 5, -beakerH / 2 + 35);
      tint.endFill();
      tint.x = beakerX;
      tint.y = beakerY;
      tint.alpha = 0;
      container.addChild(tint);
      gsap.to(tint, { alpha: 1, duration: 2, delay: 0.5 });
    }
  }

  /**
   * Show classification cards for the student to tap.
   */
  private showClassificationCards(
    ctx: SimulationContext,
    container: PIXI.Container,
    cx: number,
    y: number,
    answer: string,
    options: string[],
    onCorrect: () => void,
  ): void {
    ctx.speak('Now classify the mixture! Tap the correct card!');

    const spacing = Math.min(110, (ctx.width - 40) / options.length);
    const startX = cx - ((options.length - 1) * spacing) / 2;
    let solved = false;

    options.forEach((opt, i) => {
      const isCorrect = opt.toLowerCase() === answer.toLowerCase();
      const card = new PIXI.Graphics();
      card.name = 'classification_card';
      card.beginFill(0xffffff, 0.9);
      card.lineStyle(3, 0xd1d5db);
      card.drawRoundedRect(-48, -28, 96, 56, 10);
      card.endFill();
      card.x = startX + i * spacing;
      card.y = y;
      card.eventMode = 'static';
      card.cursor = 'pointer';
      card.alpha = 0;
      card.scale.set(0);
      container.addChild(card);
      gsap.to(card, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: i * 0.1 });

      const text = new PIXI.Text(opt, {
        fontSize: 11, fill: 0x333333, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: 88, align: 'center',
      });
      text.anchor.set(0.5);
      text.x = startX + i * spacing;
      text.y = y;
      text.alpha = 0;
      container.addChild(text);
      gsap.to(text, { alpha: 1, duration: 0.3, delay: 0.1 + i * 0.1 });

      card.on('pointerover', () => { if (!solved) card.scale.set(1.08); });
      card.on('pointerout', () => { if (!solved) card.scale.set(1); });

      card.on('pointertap', () => {
        if (solved) return;
        ctx.playSound('tap');

        // Mark that a classification was tapped (for guided mode validation)
        ctx.onStepCompleted();

        if (isCorrect) {
          solved = true;
          card.clear();
          card.beginFill(0xd1fae5, 0.9);
          card.lineStyle(3, 0x22c55e);
          card.drawRoundedRect(-48, -28, 96, 56, 10);
          card.endFill();
          text.style.fill = 0x16a34a;
          ctx.playSound('success');
          ctx.speak(`Yes! It's a ${opt}! Great job!`);
          ctx.setMascotMood('celebrate');
          onCorrect();
        } else {
          ctx.showWrong(card.x, card.y - 30);
          gsap.to(card, { x: card.x + 5, duration: 0.05, yoyo: true, repeat: 3 });
          ctx.speak('Not quite. Look at the water again!');
          ctx.onWrong();
        }
      });
    });
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new MixingSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as MixingSimulation };
