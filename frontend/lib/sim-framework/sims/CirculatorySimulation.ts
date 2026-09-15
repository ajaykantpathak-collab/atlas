/**
 * CirculatorySimulation
 *
 * An interactive heart diagram where students drag a blood cell through
 * the correct path: right atrium → right ventricle → lungs → left atrium
 * → left ventricle → body. The blood cell changes color (blue=deoxygenated,
 * red=oxygenated) as it passes through the lungs.
 *
 * Topics: circulatory system, blood, heart, arteries, veins, circulation
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';

// ─── Heart chamber definitions ───────────────────────────────

interface Chamber {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: number;
  oxygenated: boolean;
}

const CHAMBERS: Chamber[] = [
  { id: 'ra', name: 'Right Atrium', x: -35, y: -30, w: 50, h: 40, color: 0x3b82f6, oxygenated: false },
  { id: 'rv', name: 'Right Ventricle', x: -35, y: 20, w: 50, h: 45, color: 0x3b82f6, oxygenated: false },
  { id: 'la', name: 'Left Atrium', x: 35, y: -30, w: 50, h: 40, color: 0xef4444, oxygenated: true },
  { id: 'lv', name: 'Left Ventricle', x: 35, y: 20, w: 50, h: 45, color: 0xef4444, oxygenated: true },
];

const CORRECT_PATH = ['ra', 'rv', 'la', 'lv'];

// ─── Plugin ──────────────────────────────────────────────────

class CirculatorySimulationPlugin implements SimulationPlugin {
  id = 'circulatory';
  subject = 'science';
  topics = ['circulatory', 'blood', 'heart', 'artery', 'vein', 'circulation'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return (
      q.includes('circulat') ||
      q.includes('blood flow') ||
      q.includes('heart chamber') ||
      q.includes('oxygenated blood') ||
      q.includes('deoxygenated blood') ||
      q.includes('right atrium') ||
      q.includes('left ventricle')
    );
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [
      {
        id: 'drag_to_ra',
        mascotNarration: 'Watch me! Blood enters the heart through the Right Atrium. I will drag the blood cell there.',
        mascotAction: (sim) => {
          const bloodCell = sim.container.children.find(c => c.name === 'blood_cell') as PIXI.Graphics | undefined;
          const ra = sim.container.children.find(c => c.name === 'chamber_ra') as PIXI.Container | undefined;
          if (bloodCell && ra) {
            gsap.to(bloodCell, { x: ra.x + sim.container.x, y: ra.y + sim.container.y, duration: 1, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Now you try! Drag the blue blood cell into the Right Atrium (top left).',
        hint: 'The Right Atrium is the blue chamber at the top left of the heart!',
      },
      {
        id: 'drag_to_rv',
        mascotNarration: 'Great! Now the blood flows down to the Right Ventricle.',
        mascotAction: (sim) => {
          const bloodCell = sim.container.children.find(c => c.name === 'blood_cell') as PIXI.Graphics | undefined;
          const rv = sim.container.children.find(c => c.name === 'chamber_rv') as PIXI.Container | undefined;
          if (bloodCell && rv) {
            gsap.to(bloodCell, { x: rv.x + sim.container.x, y: rv.y + sim.container.y, duration: 1, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Drag the blood cell down into the Right Ventricle (bottom left).',
        hint: 'The Right Ventricle is below the Right Atrium!',
      },
      {
        id: 'drag_to_lungs',
        mascotNarration: 'Now the blood goes to the lungs to get oxygen! Watch the color change!',
        mascotAction: (sim) => {
          const bloodCell = sim.container.children.find(c => c.name === 'blood_cell') as PIXI.Graphics | undefined;
          if (bloodCell) {
            gsap.to(bloodCell, { x: sim.width / 2, y: 60, duration: 1, ease: 'power2.out' });
            gsap.to(bloodCell, { tint: 0xef4444, duration: 0.5, delay: 0.5 });
          }
        },
        studentInstruction: 'Drag the blood cell up to the lungs (top center). It will turn red when it gets oxygen!',
        hint: 'Drag the blood cell to the top of the screen where the lungs are!',
      },
      {
        id: 'drag_to_la',
        mascotNarration: 'Now the red, oxygenated blood returns to the Left Atrium!',
        mascotAction: (sim) => {
          const bloodCell = sim.container.children.find(c => c.name === 'blood_cell') as PIXI.Graphics | undefined;
          const la = sim.container.children.find(c => c.name === 'chamber_la') as PIXI.Container | undefined;
          if (bloodCell && la) {
            gsap.to(bloodCell, { x: la.x + sim.container.x, y: la.y + sim.container.y, duration: 1, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Drag the red blood cell into the Left Atrium (top right).',
        hint: 'The Left Atrium is the red chamber at the top right!',
      },
      {
        id: 'drag_to_lv',
        mascotNarration: 'Finally, the blood flows to the Left Ventricle, then out to the body!',
        mascotAction: (sim) => {
          const bloodCell = sim.container.children.find(c => c.name === 'blood_cell') as PIXI.Graphics | undefined;
          const lv = sim.container.children.find(c => c.name === 'chamber_lv') as PIXI.Container | undefined;
          if (bloodCell && lv) {
            gsap.to(bloodCell, { x: lv.x + sim.container.x, y: lv.y + sim.container.y, duration: 1, ease: 'power2.out' });
          }
        },
        studentInstruction: 'Drag the blood cell into the Left Ventricle (bottom right) to complete the cycle!',
        hint: 'The Left Ventricle is below the Left Atrium!',
      },
    ];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, answer } = ctx;
    const cx = width / 2;
    const cy = height / 2 - 20;
    let solved = false;
    let pathIndex = 0;

    // ─── Title ──────────────────────────────────────────────
    const title = new PIXI.Text('❤️ Drag the blood cell through the heart!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // ─── Lungs (top center) ─────────────────────────────────
    const lungs = new PIXI.Graphics();
    lungs.name = 'lungs';
    lungs.lineStyle(3, 0xfca5a5);
    lungs.beginFill(0xfecaca, 0.5);
    lungs.drawEllipse(-25, 0, 22, 18);
    lungs.drawEllipse(25, 0, 22, 18);
    lungs.endFill();
    lungs.x = cx;
    lungs.y = 70;
    lungs.eventMode = 'static';
    container.addChild(lungs);

    const lungsLabel = new PIXI.Text('🫁 Lungs', { fontSize: 12, fill: 0xef4444, fontWeight: 'bold' });
    lungsLabel.anchor.set(0.5);
    lungsLabel.x = cx;
    lungsLabel.y = 50;
    container.addChild(lungsLabel);

    // ─── Heart (center) ─────────────────────────────────────
    const heart = new PIXI.Container();
    heart.name = 'heart';
    heart.x = cx;
    heart.y = cy;
    container.addChild(heart);

    // Heart outline
    const heartShape = new PIXI.Graphics();
    heartShape.lineStyle(3, 0xef4444);
    heartShape.beginFill(0xfecaca, 0.2);
    // Draw a heart shape
    heartShape.moveTo(0, -50);
    heartShape.bezierCurveTo(-60, -80, -80, -20, 0, 50);
    heartShape.bezierCurveTo(80, -20, 60, -80, 0, -50);
    heartShape.endFill();
    heart.addChild(heartShape);

    // Divider line
    const divider = new PIXI.Graphics();
    divider.lineStyle(2, 0xef4444, 0.5);
    divider.moveTo(0, -40);
    divider.lineTo(0, 45);
    heart.addChild(divider);

    // Horizontal divider
    const hDivider = new PIXI.Graphics();
    hDivider.lineStyle(2, 0xef4444, 0.3);
    hDivider.moveTo(-55, -5);
    hDivider.lineTo(55, -5);
    heart.addChild(hDivider);

    // ─── Chambers ───────────────────────────────────────────
    CHAMBERS.forEach(ch => {
      const chamber = new PIXI.Container();
      chamber.name = `chamber_${ch.id}`;
      chamber.x = ch.x;
      chamber.y = ch.y;
      heart.addChild(chamber);

      const rect = new PIXI.Graphics();
      rect.lineStyle(2, ch.color, 0.6);
      rect.beginFill(ch.color, 0.15);
      rect.drawRoundedRect(-ch.w / 2, -ch.h / 2, ch.w, ch.h, 6);
      rect.endFill();
      chamber.addChild(rect);

      const label = new PIXI.Text(ch.name, {
        fontSize: 9, fill: ch.color, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: ch.w - 4, align: 'center',
      });
      label.anchor.set(0.5);
      chamber.addChild(label);
    });

    // ─── Blood cell (draggable) ─────────────────────────────
    const bloodCell = new PIXI.Graphics();
    bloodCell.name = 'blood_cell';
    bloodCell.beginFill(0x3b82f6);
    bloodCell.drawCircle(0, 0, 12);
    bloodCell.endFill();
    bloodCell.lineStyle(2, 0x1e40af);
    bloodCell.drawCircle(0, 0, 12);
    bloodCell.x = cx - 100;
    bloodCell.y = cy;
    bloodCell.eventMode = 'static';
    bloodCell.cursor = 'grab';
    container.addChild(bloodCell);

    // Blood cell label
    const bloodLabel = new PIXI.Text('🩸 Drag me!', { fontSize: 11, fill: 0x3b82f6, fontWeight: 'bold' });
    bloodLabel.anchor.set(0.5);
    bloodLabel.x = bloodCell.x;
    bloodLabel.y = bloodCell.y - 25;
    container.addChild(bloodLabel);

    // ─── Path progress indicator ────────────────────────────
    const progressText = new PIXI.Text('Step: 0 / 4', { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    progressText.anchor.set(0.5);
    progressText.x = cx;
    progressText.y = height - 25;
    container.addChild(progressText);

    // ─── Drag behavior ──────────────────────────────────────
    let dragging = false;
    let offsetX = 0, offsetY = 0;

    bloodCell.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      if (solved) return;
      dragging = true;
      bloodCell.cursor = 'grabbing';
      ctx.playSound('pickup');
      const pos = e.global;
      offsetX = pos.x - bloodCell.x;
      offsetY = pos.y - bloodCell.y;
      container.setChildIndex(bloodCell, container.children.length - 1);
    });

    bloodCell.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!dragging) return;
      const pos = e.global;
      bloodCell.x = pos.x - offsetX;
      bloodCell.y = pos.y - offsetY;
      bloodLabel.x = bloodCell.x;
      bloodLabel.y = bloodCell.y - 25;
    });

    const checkDrop = () => {
      if (!dragging) return;
      dragging = false;
      bloodCell.cursor = 'grab';

      // Check if dropped on the correct next chamber
      const targetId = CORRECT_PATH[pathIndex];
      const targetChamber = heart.children.find(c => c.name === `chamber_${targetId}`) as PIXI.Container | undefined;

      if (!targetChamber) return;

      // Get world position of target chamber
      const targetX = heart.x + targetChamber.x;
      const targetY = heart.y + targetChamber.y;
      const dx = bloodCell.x - targetX;
      const dy = bloodCell.y - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Special case: lungs (step 2)
      if (pathIndex === 2) {
        const lungsDx = bloodCell.x - lungs.x;
        const lungsDy = bloodCell.y - lungs.y;
        const lungsDist = Math.sqrt(lungsDx * lungsDx + lungsDy * lungsDy);

        if (lungsDist < 40) {
          // Correct! Blood goes to lungs
          ctx.playSound('pop');
          ctx.speak('The blood gets oxygen in the lungs! It turns red!');
          // Change blood color to red
          bloodCell.clear();
          bloodCell.beginFill(0xef4444);
          bloodCell.drawCircle(0, 0, 12);
          bloodCell.endFill();
          bloodCell.lineStyle(2, 0x991b1b);
          bloodCell.drawCircle(0, 0, 12);
          bloodLabel.text = '🩸 Oxygenated!';

          // Mark reached
          ctx.onStepCompleted();

          pathIndex++;
          progressText.text = `Step: ${pathIndex} / 4`;
          gsap.to(progressText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });
          ctx.setMascotMood('happy');
          return;
        }
      }

      if (dist < 35) {
        // Correct chamber!
        ctx.playSound('pop');
        const chamber = CHAMBERS.find(c => c.id === targetId)!;
        ctx.speak(`${chamber.name}! Correct!`);

        ctx.onStepCompleted();

        // Highlight the chamber
        const rect = targetChamber.children[0] as PIXI.Graphics;
        rect.clear();
        rect.lineStyle(3, 0x22c55e);
        rect.beginFill(0x22c55e, 0.3);
        rect.drawRoundedRect(-chamber.w / 2, -chamber.h / 2, chamber.w, chamber.h, 6);
        rect.endFill();

        pathIndex++;
        progressText.text = `Step: ${pathIndex} / 4`;
        gsap.to(progressText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });
        ctx.setMascotMood('happy');

        if (pathIndex >= 4 && !solved) {
          solved = true;
          progressText.text = 'Blood cycle complete! 🎉';
          progressText.style.fill = 0x22c55e;
          ctx.playSound('success');
          ctx.speak('You completed the blood cycle! The blood goes from the body to the lungs and back! Great job!');
          ctx.celebrate(cx, cy);
          setTimeout(() => ctx.onSolved(answer), 1500);
        }
      } else {
        // Wrong chamber
        ctx.showWrong(bloodCell.x, bloodCell.y - 20);
        ctx.speak('Not the right chamber! Follow the path!');
        ctx.onWrong();
      }
    };

    bloodCell.on('pointerup', checkDrop);
    bloodCell.on('pointerupoutside', () => {
      if (!dragging) return;
      dragging = false;
      bloodCell.cursor = 'grab';
    });

    // ─── Adaptive: show path arrows ─────────────────────────
    if (ctx.adaptiveEasier) {
      const hint = new PIXI.Text('💡 Path: Right Atrium → Right Ventricle → Lungs → Left Atrium → Left Ventricle', {
        fontSize: 10, fill: 0x3b82f6, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: width - 40, align: 'center',
      });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = height - 50;
      container.addChild(hint);
    }
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new CirculatorySimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as CirculatorySimulation };
