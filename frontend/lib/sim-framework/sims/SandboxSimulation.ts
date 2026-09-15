/**
 * SandboxSimulation — free-play exploration mode (PhET-style).
 *
 * Students manipulate variables and observe effects in real-time.
 * No "correct answer" — just exploration and discovery.
 *
 * Three sandboxes:
 * 1. Mixing: temperature, stir speed, substance amount → dissolve rate
 * 2. Plant: sunlight, water, soil quality → plant health
 * 3. Balance: add weights to either side → explore equality
 *
 * The mascot gives guided observations ("Look! More heat makes it dissolve faster!")
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { SimulationPlugin, SimulationContext, SimulationStep } from '../types';
import { simulationRegistry } from '../SimulationRegistry';
import {
  drawGradientBackground,
  drawGlassEffect,
  drawLiquidFill,
  drawSun,
  drawTree,
  drawGrassTexture,
  drawCloud,
  drawControlPanel,
  drawRoundedCard,
  animateBreathe,
} from '../../game-engine/VisualUtils';

// ─── Sandbox types ───────────────────────────────────────────

type SandboxType = 'mixing' | 'plant' | 'balance';

interface Slider {
  label: string;
  min: number;
  max: number;
  value: number;
  unit: string;
  color: number;
}

// ─── Plugin ──────────────────────────────────────────────────

class SandboxSimulationPlugin implements SimulationPlugin {
  id = 'sandbox';
  subject = 'science';
  topics = ['sandbox', 'explore', 'free play', 'experiment'];

  canHandle(question: string, subject: string): boolean {
    const q = question.toLowerCase();
    return q.includes('sandbox') || q.includes('explore mode') || q.includes('free play');
  }

  buildSteps(ctx: SimulationContext): SimulationStep[] {
    return [];
  }

  render(ctx: SimulationContext): void {
    const { container, width, height, question } = ctx;
    const q = question.toLowerCase();

    // Determine sandbox type
    let type: SandboxType = 'mixing';
    if (q.includes('plant')) type = 'plant';
    else if (q.includes('balance')) type = 'balance';

    switch (type) {
      case 'mixing': this.renderMixingSandbox(ctx); break;
      case 'plant': this.renderPlantSandbox(ctx); break;
      case 'balance': this.renderBalanceSandbox(ctx); break;
    }
  }

  // ─── Mixing Sandbox ────────────────────────────────────────

  private renderMixingSandbox(ctx: SimulationContext): void {
    const { container, width, height, speak } = ctx;
    container.removeChildren();
    const cx = width / 2;

    // Background: lab gradient
    const bg = new PIXI.Graphics();
    drawGradientBackground(bg, width, height, 0xa7f3d0, 0x10b981);
    container.addChild(bg);

    // Title
    const title = new PIXI.Text('🧪 Mixing Sandbox — Explore!', {
      fontSize: 16, fill: 0x064e3b, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Beaker (glass)
    const beakerX = cx;
    const beakerY = height / 2 + 20;
    const beakerW = 120;
    const beakerH = 140;

    const beaker = new PIXI.Graphics();
    drawGlassEffect(beaker, beakerX - beakerW / 2, beakerY - beakerH / 2, beakerW, beakerH);
    container.addChild(beaker);

    // Liquid (water)
    const liquidG = new PIXI.Graphics();
    container.addChild(liquidG);

    // Particles container
    const particles = new PIXI.Container();
    container.addChild(particles);

    // Sliders
    const sliders: Slider[] = [
      { label: 'Temperature', min: 0, max: 100, value: 50, unit: '°C', color: 0xef4444 },
      { label: 'Stir Speed', min: 0, max: 10, value: 3, unit: 'x', color: 0x3b82f6 },
      { label: 'Substance', min: 1, max: 20, value: 10, unit: 'g', color: 0xa855f7 },
    ];

    const sliderContainers: PIXI.Container[] = [];
    const sliderY = height - 130;

    sliders.forEach((slider, i) => {
      const sc = this.createSlider(slider, cx - 180 + i * 180, sliderY, (newValue) => {
        sliders[i].value = newValue;
        updateSimulation();
      });
      container.addChild(sc);
      sliderContainers.push(sc);
    });

    // Observation text
    const obsText = new PIXI.Text('', {
      fontSize: 12, fill: 0x064e3b, fontWeight: 'bold',
      wordWrap: true, wordWrapWidth: width - 40, align: 'center',
    });
    obsText.anchor.set(0.5);
    obsText.x = cx;
    obsText.y = 60;
    container.addChild(obsText);

    // Animation state
    let dissolveProgress = 0;
    let lastTime = Date.now();

    const updateSimulation = () => {
      const temp = sliders[0].value;
      const stir = sliders[1].value;
      const amount = sliders[2].value;

      // Dissolve rate: higher temp + stir = faster
      const rate = (temp / 100) * 0.5 + (stir / 10) * 0.5;

      // Update observation
      let obs = '';
      if (temp > 80 && stir > 7) obs = 'Wow! Hot and fast stirring dissolves everything quickly! ⚡';
      else if (temp < 20) obs = 'Cold water dissolves slowly. Try increasing the temperature! 🌡️';
      else if (stir < 2) obs = 'Not stirring much? The substance dissolves very slowly. Try stirring! 🥄';
      else if (amount > 15) obs = 'Lots of substance! It takes longer to dissolve everything. ⏳';
      else obs = `Dissolving at ${Math.round(rate * 100)}% efficiency. Try changing the variables!`;
      obsText.text = obs;

      speak(obs);
    };

    // Particle animation ticker
    const tickerFn = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const temp = sliders[0].value;
      const stir = sliders[1].value;
      const amount = sliders[2].value;
      const rate = (temp / 100) * 0.5 + (stir / 10) * 0.5;

      // Update dissolve progress
      dissolveProgress = Math.min(1, dissolveProgress + rate * dt * 0.3);

      // Update liquid fill
      liquidG.clear();
      drawLiquidFill(liquidG, beakerX - beakerW / 2 + 4, beakerY - beakerH / 2 + 4, beakerW - 8, beakerH - 8, 0x3b82f6, 0.7, now * 0.003);

      // Update particles
      particles.removeChildren();
      const visibleParticles = Math.round(amount * (1 - dissolveProgress));
      for (let i = 0; i < visibleParticles; i++) {
        const p = new PIXI.Graphics();
        p.beginFill(0xa855f7, 0.8);
        p.drawCircle(0, 0, 3);
        p.endFill();
        p.x = beakerX - beakerW / 2 + 10 + Math.random() * (beakerW - 20);
        p.y = beakerY - beakerH / 2 + 20 + Math.random() * (beakerH - 40);
        // Stir effect: move particles
        const stirAngle = now * 0.001 * stir + i;
        p.x += Math.cos(stirAngle) * stir * 2;
        p.y += Math.sin(stirAngle) * stir * 2;
        particles.addChild(p);
      }
    };

    ctx.app.ticker.add(tickerFn);

    // Store destroy function
    (this as any)._destroy = () => {
      ctx.app.ticker.remove(tickerFn);
    };

    updateSimulation();
    speak('Welcome to the Mixing Sandbox! Drag the sliders to explore how temperature, stirring, and amount affect dissolving!');
  }

  // ─── Plant Sandbox ─────────────────────────────────────────

  private renderPlantSandbox(ctx: SimulationContext): void {
    const { container, width, height, speak } = ctx;
    container.removeChildren();
    const cx = width / 2;

    // Background: sky gradient
    const bg = new PIXI.Graphics();
    drawGradientBackground(bg, width, height, 0x93c5fd, 0x86efac);
    container.addChild(bg);

    // Sun
    const sunG = new PIXI.Graphics();
    drawSun(sunG, width - 60, 60, 25);
    container.addChild(sunG);

    // Clouds
    const cloud1 = new PIXI.Graphics();
    drawCloud(cloud1, 80, 50, 1);
    container.addChild(cloud1);
    const cloud2 = new PIXI.Graphics();
    drawCloud(cloud2, 200, 80, 0.7);
    container.addChild(cloud2);

    // Ground
    const ground = new PIXI.Graphics();
    drawGrassTexture(ground, 0, height - 200, width, 200);
    container.addChild(ground);

    // Title
    const title = new PIXI.Text('🌱 Plant Sandbox — Explore!', {
      fontSize: 16, fill: 0x166534, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Plant container (stem + leaves + flower)
    const plantContainer = new PIXI.Container();
    plantContainer.x = cx;
    plantContainer.y = height - 200;
    container.addChild(plantContainer);

    // Sliders
    const sliders: Slider[] = [
      { label: 'Sunlight', min: 0, max: 100, value: 50, unit: '%', color: 0xfbbf24 },
      { label: 'Water', min: 0, max: 100, value: 50, unit: '%', color: 0x3b82f6 },
      { label: 'Soil Quality', min: 0, max: 100, value: 50, unit: '%', color: 0x92400e },
    ];

    const sliderY = height - 130;
    sliders.forEach((slider, i) => {
      const sc = this.createSlider(slider, cx - 180 + i * 180, sliderY, (newValue) => {
        sliders[i].value = newValue;
        updatePlant();
      });
      container.addChild(sc);
    });

    // Health bar
    const healthBar = new PIXI.Graphics();
    healthBar.x = cx;
    healthBar.y = 60;
    container.addChild(healthBar);

    const healthLabel = new PIXI.Text('Plant Health: 50%', {
      fontSize: 12, fill: 0x166534, fontWeight: 'bold',
    });
    healthLabel.anchor.set(0.5);
    healthLabel.x = cx;
    healthLabel.y = 45;
    container.addChild(healthLabel);

    const updatePlant = () => {
      const sun = sliders[0].value;
      const water = sliders[1].value;
      const soil = sliders[2].value;

      // Health: optimal is 50-70 for each. Too much or too little hurts.
      const sunHealth = 100 - Math.abs(sun - 60) * 1.5;
      const waterHealth = 100 - Math.abs(water - 50) * 1.5;
      const soilHealth = 100 - Math.abs(soil - 60) * 1.5;
      const health = Math.max(0, Math.min(100, (sunHealth + waterHealth + soilHealth) / 3));

      // Update health bar
      healthBar.clear();
      healthBar.beginFill(0xe5e7eb);
      healthBar.drawRect(-80, 0, 160, 12);
      healthBar.endFill();
      const healthColor = health > 70 ? 0x22c55e : health > 40 ? 0xfbbf24 : 0xef4444;
      healthBar.beginFill(healthColor);
      healthBar.drawRect(-80, 0, 160 * (health / 100), 12);
      healthBar.endFill();
      healthLabel.text = `Plant Health: ${Math.round(health)}%`;

      // Update plant visual
      plantContainer.removeChildren();
      const stemHeight = 20 + health * 0.8;
      const stemColor = health > 50 ? 0x22c55e : 0x92400e;

      // Stem
      const stem = new PIXI.Graphics();
      stem.beginFill(stemColor);
      stem.drawRect(-3, -stemHeight, 6, stemHeight);
      stem.endFill();
      plantContainer.addChild(stem);

      // Leaves
      if (health > 20) {
        const leaves = new PIXI.Graphics();
        leaves.beginFill(stemColor, 0.85);
        const leafCount = Math.floor(health / 20);
        for (let i = 0; i < leafCount; i++) {
          const ly = -stemHeight + (i + 1) * (stemHeight / (leafCount + 1));
          leaves.drawEllipse(-12, ly, 10, 5);
          leaves.drawEllipse(12, ly, 10, 5);
        }
        leaves.endFill();
        plantContainer.addChild(leaves);
      }

      // Flower (only if health > 70)
      if (health > 70) {
        const flower = new PIXI.Graphics();
        flower.beginFill(0xec4899, 0.9);
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5;
          flower.drawCircle(Math.cos(angle) * 8, -stemHeight + Math.sin(angle) * 8, 6);
        }
        flower.endFill();
        flower.beginFill(0xfbbf24);
        flower.drawCircle(0, -stemHeight, 5);
        flower.endFill();
        plantContainer.addChild(flower);
      }

      // Wilt effect (health < 30)
      if (health < 30) {
        gsap.to(plantContainer, { rotation: 0.15, duration: 1, yoyo: true, repeat: -1 });
      } else {
        gsap.to(plantContainer, { rotation: 0, duration: 0.5 });
      }

      // Observation
      let obs = '';
      if (health > 80) obs = 'Your plant is thriving! Perfect balance of sun, water, and soil! 🌸';
      else if (health > 60) obs = 'Your plant is healthy! Keep up the good balance! 🌿';
      else if (health > 40) obs = 'Your plant is okay, but could be better. Try adjusting the sliders! 🌱';
      else if (health > 20) obs = 'Your plant is struggling. Check if it needs more or less of something! 😟';
      else obs = 'Your plant is wilting! Something is very wrong. Try different values! 🥀';

      speak(obs);
    };

    updatePlant();
    speak('Welcome to the Plant Sandbox! Drag the sliders to explore how sunlight, water, and soil affect plant growth!');
  }

  // ─── Balance Sandbox ───────────────────────────────────────

  private renderBalanceSandbox(ctx: SimulationContext): void {
    const { container, width, height, speak } = ctx;
    container.removeChildren();
    const cx = width / 2;

    // Background
    const bg = new PIXI.Graphics();
    drawGradientBackground(bg, width, height, 0xc7d2fe, 0x818cf8);
    container.addChild(bg);

    // Title
    const title = new PIXI.Text('⚖️ Balance Sandbox — Explore!', {
      fontSize: 16, fill: 0x312e81, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Balance scale
    const scaleContainer = new PIXI.Container();
    scaleContainer.x = cx;
    scaleContainer.y = height / 2 - 20;
    container.addChild(scaleContainer);

    // Base
    const base = new PIXI.Graphics();
    base.beginFill(0x4b5563);
    base.drawRect(-40, 80, 80, 10);
    base.endFill();
    base.beginFill(0x6b7280);
    base.drawRect(-5, 0, 10, 80);
    base.endFill();
    scaleContainer.addChild(base);

    // Beam (rotates based on weight difference)
    const beam = new PIXI.Container();
    scaleContainer.addChild(beam);

    const beamG = new PIXI.Graphics();
    beamG.beginFill(0x374151);
    beamG.drawRect(-120, -3, 240, 6);
    beamG.endFill();
    beam.addChild(beamG);

    // Left pan
    const leftPan = new PIXI.Container();
    leftPan.x = -100;
    leftPan.y = 0;
    beam.addChild(leftPan);

    const leftPanG = new PIXI.Graphics();
    leftPanG.beginFill(0xd1d5db);
    leftPanG.drawRoundedRect(-40, 0, 80, 8, 4);
    leftPanG.endFill();
    leftPanG.beginFill(0x9ca3af);
    leftPanG.drawRect(-1, -20, 2, 20);
    leftPanG.endFill();
    leftPan.addChild(leftPanG);

    const leftLabel = new PIXI.Text('Left: 0', { fontSize: 12, fill: 0x374151, fontWeight: 'bold' });
    leftLabel.anchor.set(0.5);
    leftLabel.y = 30;
    leftPan.addChild(leftLabel);

    // Right pan
    const rightPan = new PIXI.Container();
    rightPan.x = 100;
    rightPan.y = 0;
    beam.addChild(rightPan);

    const rightPanG = new PIXI.Graphics();
    rightPanG.beginFill(0xd1d5db);
    rightPanG.drawRoundedRect(-40, 0, 80, 8, 4);
    rightPanG.endFill();
    rightPanG.beginFill(0x9ca3af);
    rightPanG.drawRect(-1, -20, 2, 20);
    rightPanG.endFill();
    rightPan.addChild(rightPanG);

    const rightLabel = new PIXI.Text('Right: 0', { fontSize: 12, fill: 0x374151, fontWeight: 'bold' });
    rightLabel.anchor.set(0.5);
    rightLabel.y = 30;
    rightPan.addChild(rightLabel);

    // Weight objects on pans
    const leftWeights = new PIXI.Container();
    leftPan.addChild(leftWeights);
    const rightWeights = new PIXI.Container();
    rightPan.addChild(rightWeights);

    // Controls: add/remove weights
    const controlPanel = new PIXI.Graphics();
    drawControlPanel(controlPanel, 20, height - 120, width - 40, 100);
    container.addChild(controlPanel);

    let leftCount = 0;
    let rightCount = 0;

    // Add left weight button
    const addLeftBtn = this.createButton('➕ Left', cx - 120, height - 80, 0x3b82f6, () => {
      leftCount++;
      this.addWeight(leftWeights, leftCount);
      leftLabel.text = `Left: ${leftCount}`;
      updateBalance();
    });
    container.addChild(addLeftBtn);

    // Remove left weight button
    const remLeftBtn = this.createButton('➖ Left', cx - 120, height - 50, 0x6b7280, () => {
      if (leftCount > 0) {
        leftCount--;
        leftWeights.removeChildren();
        for (let i = 0; i < leftCount; i++) this.addWeight(leftWeights, i + 1);
        leftLabel.text = `Left: ${leftCount}`;
        updateBalance();
      }
    });
    container.addChild(remLeftBtn);

    // Add right weight button
    const addRightBtn = this.createButton('➕ Right', cx + 120, height - 80, 0xef4444, () => {
      rightCount++;
      this.addWeight(rightWeights, rightCount);
      rightLabel.text = `Right: ${rightCount}`;
      updateBalance();
    });
    container.addChild(addRightBtn);

    // Remove right weight button
    const remRightBtn = this.createButton('➖ Right', cx + 120, height - 50, 0x6b7280, () => {
      if (rightCount > 0) {
        rightCount--;
        rightWeights.removeChildren();
        for (let i = 0; i < rightCount; i++) this.addWeight(rightWeights, i + 1);
        rightLabel.text = `Right: ${rightCount}`;
        updateBalance();
      }
    });
    container.addChild(remRightBtn);

    // Status text
    const statusText = new PIXI.Text('', {
      fontSize: 14, fill: 0x312e81, fontWeight: 'bold',
    });
    statusText.anchor.set(0.5);
    statusText.x = cx;
    statusText.y = height - 150;
    container.addChild(statusText);

    const updateBalance = () => {
      const diff = leftCount - rightCount;
      const tiltAngle = Math.max(-0.3, Math.min(0.3, diff * 0.05));
      gsap.to(beam, { rotation: tiltAngle, duration: 0.5, ease: 'elastic.out(1, 0.5)' });

      if (diff === 0 && leftCount > 0) {
        statusText.text = '⚖️ Balanced! Both sides are equal!';
        statusText.style.fill = 0x22c55e;
        speak('The scale is balanced! Both sides have the same weight!');
      } else if (diff > 0) {
        statusText.text = `Left is heavier by ${diff}!`;
        statusText.style.fill = 0x3b82f6;
        speak(`The left side is heavier by ${diff} weights!`);
      } else if (diff < 0) {
        statusText.text = `Right is heavier by ${-diff}!`;
        statusText.style.fill = 0xef4444;
        speak(`The right side is heavier by ${-diff} weights!`);
      } else {
        statusText.text = 'Add weights to explore balance!';
        statusText.style.fill = 0x312e81;
      }
    };

    updateBalance();
    speak('Welcome to the Balance Sandbox! Add weights to either side and see what happens! Try to make it balanced!');
  }

  // ─── Helper: Create a slider ───────────────────────────────

  private createSlider(
    slider: Slider,
    x: number,
    y: number,
    onChange: (value: number) => void,
  ): PIXI.Container {
    const container = new PIXI.Container();
    container.x = x;
    container.y = y;

    // Label
    const label = new PIXI.Text(`${slider.label}: ${slider.value}${slider.unit}`, {
      fontSize: 11, fill: 0x374151, fontWeight: 'bold',
    });
    label.anchor.set(0.5);
    label.y = -15;
    container.addChild(label);

    // Track
    const trackW = 140;
    const track = new PIXI.Graphics();
    track.beginFill(0xe5e7eb);
    track.drawRoundedRect(-trackW / 2, 0, trackW, 6, 3);
    track.endFill();
    container.addChild(track);

    // Fill
    const fill = new PIXI.Graphics();
    container.addChild(fill);

    // Handle
    const handle = new PIXI.Graphics();
    handle.beginFill(slider.color);
    handle.drawCircle(0, 3, 10);
    handle.endFill();
    handle.eventMode = 'static';
    handle.cursor = 'grab';
    container.addChild(handle);

    const updateFill = () => {
      const pct = (slider.value - slider.min) / (slider.max - slider.min);
      fill.clear();
      fill.beginFill(slider.color, 0.5);
      fill.drawRoundedRect(-trackW / 2, 0, trackW * pct, 6, 3);
      fill.endFill();
      handle.x = -trackW / 2 + trackW * pct;
      label.text = `${slider.label}: ${slider.value}${slider.unit}`;
    };

    updateFill();

    // Drag handle
    let dragging = false;
    handle.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      dragging = true;
      handle.cursor = 'grabbing';
    });

    handle.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!dragging) return;
      const localX = e.global.x - container.x + trackW / 2;
      const pct = Math.max(0, Math.min(1, localX / trackW));
      const newValue = Math.round(slider.min + (slider.max - slider.min) * pct);
      if (newValue !== slider.value) {
        slider.value = newValue;
        updateFill();
        onChange(newValue);
      }
    });

    const stopDrag = () => {
      dragging = false;
      handle.cursor = 'grab';
    };
    handle.on('pointerup', stopDrag);
    handle.on('pointerupoutside', stopDrag);

    return container;
  }

  // ─── Helper: Create a button ───────────────────────────────

  private createButton(
    text: string,
    x: number,
    y: number,
    color: number,
    onClick: () => void,
  ): PIXI.Container {
    const btn = new PIXI.Container();
    btn.x = x;
    btn.y = y;
    btn.eventMode = 'static';
    btn.cursor = 'pointer';

    const bg = new PIXI.Graphics();
    bg.beginFill(color, 0.9);
    bg.drawRoundedRect(-50, -15, 100, 30, 6);
    bg.endFill();
    btn.addChild(bg);

    const label = new PIXI.Text(text, { fontSize: 12, fill: 0xffffff, fontWeight: 'bold' });
    label.anchor.set(0.5);
    btn.addChild(label);

    btn.on('pointerdown', () => {
      gsap.to(btn.scale, { x: 0.95, y: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
      onClick();
    });

    return btn;
  }

  // ─── Helper: Add a weight to a pan ─────────────────────────

  private addWeight(container: PIXI.Container, index: number): void {
    const w = new PIXI.Graphics();
    w.beginFill(0x4b5563);
    w.drawRoundedRect(-12, -index * 14, 24, 12, 3);
    w.endFill();
    w.lineStyle(1, 0x6b7280);
    w.drawRoundedRect(-12, -index * 14, 24, 12, 3);
    container.addChild(w);
  }

  destroy(): void {
    const fn = (this as any)._destroy;
    if (fn) fn();
  }
}

// ─── Register ────────────────────────────────────────────────

const plugin = new SandboxSimulationPlugin();
simulationRegistry.register(plugin);
export { plugin as SandboxSimulation };
