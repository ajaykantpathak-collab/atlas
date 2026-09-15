/**
 * MascotRenderer — Procedural animated mascot characters
 *
 * Every game gets a unique mascot rendered procedurally with:
 * - Custom appearance based on game theme
 * - Mood states: happy, celebrate, thinking
 * - Animated eyes (blink), mouth (talk), arms (wave/point)
 * - Speech bubble with text
 * - Bounce/idle animation
 *
 * No image assets needed — all drawn with PixiJS Graphics.
 */

import * as PIXI from 'pixi.js';
import type { SceneTheme } from '../types';

type Mood = 'happy' | 'celebrate' | 'thinking' | 'sad';

interface MascotConfig {
  bodyColor: number;
  headColor: number;
  accentColor: number;
  accessory: 'glasses' | 'hat' | 'cap' | 'apron' | 'stethoscope' | 'none';
  name: string;
}

export class MascotRenderer {
  private container: PIXI.Container;
  private width: number;
  private height: number;

  private mascotGroup: PIXI.Container;
  private body!: PIXI.Graphics;
  private head!: PIXI.Graphics;
  private leftEye!: PIXI.Graphics;
  private rightEye!: PIXI.Graphics;
  private mouth!: PIXI.Graphics;
  private leftArm!: PIXI.Graphics;
  private rightArm!: PIXI.Graphics;
  private accessory!: PIXI.Graphics;
  private speechBubble!: PIXI.Container;
  private speechText!: PIXI.Text;

  private mood: Mood = 'happy';
  private blinkTimer: number = 0;
  private blinkState: 'open' | 'closing' | 'closed' | 'opening' = 'open';
  private talkTimer: number = 0;
  private idlePhase: number = 0;
  private celebrateTimer: number = 0;
  private config: MascotConfig;
  private speechVisible: boolean = false;

  constructor(container: PIXI.Container, width: number, height: number) {
    this.container = container;
    this.width = width;
    this.height = height;

    this.mascotGroup = new PIXI.Container();
    this.mascotGroup.x = width - 100;
    this.mascotGroup.y = height - 140;

    this.config = this.getDefaultConfig();

    this.buildMascot();
    this.buildSpeechBubble();

    container.addChild(this.mascotGroup);
  }

  // ─── Mascot Configuration ───────────────────────────────────

  private getDefaultConfig(): MascotConfig {
    return {
      bodyColor: 0xff6b6b,
      headColor: 0xffdbac,
      accentColor: 0x4ecdc4,
      accessory: 'none',
      name: 'Mascot',
    };
  }

  setConfig(config: Partial<MascotConfig>): void {
    this.config = { ...this.config, ...config };
    this.rebuildMascot();
  }

  setTheme(theme: SceneTheme): void {
    const themeConfigs: Record<SceneTheme, Partial<MascotConfig>> = {
      orchard: { bodyColor: 0xff6b6b, accentColor: 0x4a8b3a, accessory: 'hat', name: 'Piku' },
      classroom: { bodyColor: 0x6c5ce7, accentColor: 0xfdcb6e, accessory: 'glasses', name: 'Meera' },
      kitchen: { bodyColor: 0xff7675, accentColor: 0xfdcb6e, accessory: 'apron', name: 'Chef' },
      lab: { bodyColor: 0x0984e3, accentColor: 0x00cec9, accessory: 'glasses', name: 'Scientist' },
      body: { bodyColor: 0xffffff, accentColor: 0xe17055, accessory: 'stethoscope', name: 'Doctor' },
      outdoor: { bodyColor: 0x55efc4, accentColor: 0x00b894, accessory: 'hat', name: 'Explorer' },
      space: { bodyColor: 0xa29bfe, accentColor: 0x6c5ce7, accessory: 'none', name: 'Cosmo' },
      city: { bodyColor: 0xfd79a8, accentColor: 0xe84393, accessory: 'cap', name: 'Guide' },
      market: { bodyColor: 0xfdcb6e, accentColor: 0xe17055, accessory: 'apron', name: 'Shopkeeper' },
      zoo: { bodyColor: 0x00b894, accentColor: 0x55efc4, accessory: 'hat', name: 'Zookeeper' },
      garden: { bodyColor: 0x55efc4, accentColor: 0x00cec9, accessory: 'hat', name: 'Gardener' },
      ocean: { bodyColor: 0x0984e3, accentColor: 0x74b9ff, accessory: 'none', name: 'Marina' },
      music: { bodyColor: 0xa29bfe, accentColor: 0xfd79a8, accessory: 'none', name: 'Maestro' },
      art: { bodyColor: 0xe84393, accentColor: 0xfdcb6e, accessory: 'cap', name: 'Artist' },
      default: { bodyColor: 0xff6b6b, accentColor: 0x4ecdc4, accessory: 'none', name: 'Mascot' },
    };
    const config = themeConfigs[theme] || themeConfigs.default;
    this.setConfig(config);
  }

  // ─── Build Mascot ───────────────────────────────────────────

  private buildMascot(): void {
    this.body = new PIXI.Graphics();
    this.head = new PIXI.Graphics();
    this.leftEye = new PIXI.Graphics();
    this.rightEye = new PIXI.Graphics();
    this.mouth = new PIXI.Graphics();
    this.leftArm = new PIXI.Graphics();
    this.rightArm = new PIXI.Graphics();
    this.accessory = new PIXI.Graphics();

    this.drawBody();
    this.drawHead();
    this.drawEyes();
    this.drawMouth();
    this.drawArms();
    this.drawAccessory();

    // Z-order: arms behind body, head on top
    this.mascotGroup.addChild(
      this.leftArm,
      this.rightArm,
      this.body,
      this.head,
      this.accessory,
      this.leftEye,
      this.rightEye,
      this.mouth,
    );
  }

  private rebuildMascot(): void {
    this.mascotGroup.removeChildren();
    this.drawBody();
    this.drawHead();
    this.drawEyes();
    this.drawMouth();
    this.drawArms();
    this.drawAccessory();
    this.mascotGroup.addChild(
      this.leftArm,
      this.rightArm,
      this.body,
      this.head,
      this.accessory,
      this.leftEye,
      this.rightEye,
      this.mouth,
    );
  }

  private drawBody(): void {
    this.body.clear();
    this.body.beginFill(this.config.bodyColor);
    // Rounded body
    this.body.drawRoundedRect(-20, 0, 40, 50, 15);
    this.body.endFill();
    // Belly highlight
    this.body.beginFill(0xffffff, 0.2);
    this.body.drawRoundedRect(-15, 10, 30, 30, 10);
    this.body.endFill();
  }

  private drawHead(): void {
    this.head.clear();
    this.head.beginFill(this.config.headColor);
    this.head.drawCircle(0, -15, 22);
    this.head.endFill();
    // Cheeks (blush)
    this.head.beginFill(0xff9999, 0.4);
    this.head.drawCircle(-14, -10, 5);
    this.head.drawCircle(14, -10, 5);
    this.head.endFill();
  }

  private drawEyes(): void {
    const eyeY = -18;
    this.leftEye.clear();
    this.rightEye.clear();

    if (this.blinkState === 'closed') {
      // Closed eyes (lines)
      this.leftEye.lineStyle(2, 0x333333);
      this.leftEye.moveTo(-12, eyeY);
      this.leftEye.lineTo(-6, eyeY);
      this.rightEye.lineStyle(2, 0x333333);
      this.rightEye.moveTo(6, eyeY);
      this.rightEye.lineTo(12, eyeY);
    } else {
      // Open eyes
      const eyeHeight = this.blinkState === 'closing' || this.blinkState === 'opening' ? 2 : 5;
      this.leftEye.beginFill(0x333333);
      this.leftEye.drawEllipse(-9, eyeY, 3, eyeHeight);
      this.leftEye.endFill();
      this.leftEye.beginFill(0xffffff);
      this.leftEye.drawCircle(-8, eyeY - 1, 1.5);
      this.leftEye.endFill();

      this.rightEye.beginFill(0x333333);
      this.rightEye.drawEllipse(9, eyeY, 3, eyeHeight);
      this.rightEye.endFill();
      this.rightEye.beginFill(0xffffff);
      this.rightEye.drawCircle(10, eyeY - 1, 1.5);
      this.rightEye.endFill();
    }

    // Thinking mood: one eyebrow raised
    if (this.mood === 'thinking') {
      this.leftEye.lineStyle(2, 0x333333);
      this.leftEye.moveTo(-14, eyeY - 8);
      this.leftEye.lineTo(-4, eyeY - 6);
      this.rightEye.lineStyle(2, 0x333333);
      this.rightEye.moveTo(4, eyeY - 8);
      this.rightEye.lineTo(14, eyeY - 8);
    }
  }

  private drawMouth(): void {
    this.mouth.clear();
    this.mouth.lineStyle(2, 0x333333);

    switch (this.mood) {
      case 'happy':
        // Gentle smile
        this.mouth.moveTo(-6, -5);
        this.mouth.quadraticCurveTo(0, -2, 6, -5);
        break;
      case 'celebrate':
        // Big open smile
        this.mouth.beginFill(0x663333);
        this.mouth.drawEllipse(0, -4, 7, 5);
        this.mouth.endFill();
        this.mouth.beginFill(0xffffff);
        this.mouth.drawRect(-6, -7, 12, 2);
        this.mouth.endFill();
        break;
      case 'thinking':
        // Small "o" mouth
        this.mouth.beginFill(0x663333);
        this.mouth.drawCircle(0, -4, 3);
        this.mouth.endFill();
        break;
      case 'sad':
        // Frown
        this.mouth.moveTo(-6, -2);
        this.mouth.quadraticCurveTo(0, -5, 6, -2);
        break;
    }

    // Talking animation
    if (this.talkTimer > 0) {
      const talkScale = 1 + Math.sin(this.talkTimer * 20) * 0.3;
      this.mouth.scale.y = talkScale;
    } else {
      this.mouth.scale.y = 1;
    }
  }

  private drawArms(): void {
    this.leftArm.clear();
    this.rightArm.clear();

    this.leftArm.beginFill(this.config.bodyColor);
    this.rightArm.beginFill(this.config.bodyColor);

    if (this.mood === 'celebrate') {
      // Arms up
      this.leftArm.drawRoundedRect(-28, -5, 12, 25, 6);
      this.leftArm.rotation = -0.5;
      this.rightArm.drawRoundedRect(16, -5, 12, 25, 6);
      this.rightArm.rotation = 0.5;
    } else if (this.mood === 'thinking') {
      // One arm on chin
      this.leftArm.drawRoundedRect(-28, 5, 12, 20, 6);
      this.leftArm.rotation = 0.3;
      this.rightArm.drawRoundedRect(16, 5, 12, 20, 6);
      this.rightArm.rotation = 0;
    } else {
      // Arms down
      this.leftArm.drawRoundedRect(-28, 5, 12, 25, 6);
      this.leftArm.rotation = 0;
      this.rightArm.drawRoundedRect(16, 5, 12, 25, 6);
      this.rightArm.rotation = 0;
    }

    this.leftArm.endFill();
    this.rightArm.endFill();
  }

  private drawAccessory(): void {
    this.accessory.clear();

    switch (this.config.accessory) {
      case 'glasses':
        this.accessory.lineStyle(2, 0x333333);
        this.accessory.drawCircle(-9, -18, 6);
        this.accessory.drawCircle(9, -18, 6);
        this.accessory.moveTo(-3, -18);
        this.accessory.lineTo(3, -18);
        // Lens shine
        this.accessory.beginFill(0xffffff, 0.3);
        this.accessory.drawCircle(-9, -18, 5);
        this.accessory.drawCircle(9, -18, 5);
        this.accessory.endFill();
        break;
      case 'hat':
        this.accessory.beginFill(this.config.accentColor);
        this.accessory.drawRoundedRect(-18, -38, 36, 8, 4);
        this.accessory.drawRoundedRect(-12, -48, 24, 12, 6);
        this.accessory.endFill();
        break;
      case 'cap':
        this.accessory.beginFill(this.config.accentColor);
        this.accessory.drawRoundedRect(-20, -35, 40, 6, 3);
        this.accessory.drawRoundedRect(-15, -42, 30, 10, 5);
        this.accessory.endFill();
        // Cap brim
        this.accessory.beginFill(this.darken(this.config.accentColor, 0.8));
        this.accessory.drawRoundedRect(-22, -33, 44, 4, 2);
        this.accessory.endFill();
        break;
      case 'apron':
        this.accessory.beginFill(this.config.accentColor, 0.8);
        this.accessory.drawRoundedRect(-18, 5, 36, 40, 8);
        this.accessory.endFill();
        // Strap
        this.accessory.lineStyle(2, this.config.accentColor);
        this.accessory.moveTo(-15, 0);
        this.accessory.lineTo(-18, 8);
        this.accessory.moveTo(15, 0);
        this.accessory.lineTo(18, 8);
        break;
      case 'stethoscope':
        this.accessory.lineStyle(3, 0x333333);
        this.accessory.drawCircle(-8, -5, 4);
        this.accessory.drawCircle(8, -5, 4);
        this.accessory.moveTo(-8, -2);
        this.accessory.quadraticCurveTo(-15, 10, 0, 15);
        this.accessory.moveTo(8, -2);
        this.accessory.quadraticCurveTo(15, 10, 0, 15);
        break;
      case 'none':
      default:
        break;
    }
  }

  // ─── Speech Bubble ──────────────────────────────────────────

  private buildSpeechBubble(): void {
    this.speechBubble = new PIXI.Container();
    this.speechBubble.visible = false;

    const bubbleW = 200;
    const bubbleH = 60;
    const bubbleX = this.width - 320;
    const bubbleY = this.height - 220;

    // Bubble background
    const bg = new PIXI.Graphics();
    bg.beginFill(0xffffff, 0.95);
    bg.drawRoundedRect(0, 0, bubbleW, bubbleH, 12);
    bg.endFill();
    // Tail
    bg.beginFill(0xffffff, 0.95);
    bg.moveTo(bubbleW - 30, bubbleH);
    bg.lineTo(bubbleW - 10, bubbleH);
    bg.lineTo(bubbleW - 20, bubbleH + 15);
    bg.endFill();
    // Border
    bg.lineStyle(2, 0xcccccc);
    bg.drawRoundedRect(0, 0, bubbleW, bubbleH, 12);

    this.speechBubble.addChild(bg);
    this.speechBubble.x = bubbleX;
    this.speechBubble.y = bubbleY;

    // Text
    this.speechText = new PIXI.Text('', {
      fontFamily: 'Arial',
      fontSize: 13,
      fill: 0x333333,
      fontWeight: 'bold',
      wordWrap: true,
      wordWrapWidth: bubbleW - 20,
      align: 'center',
    });
    this.speechText.x = 10;
    this.speechText.y = 10;
    this.speechBubble.addChild(this.speechText);

    this.container.addChild(this.speechBubble);
  }

  setSpeech(text: string): void {
    if (!text) {
      this.speechBubble.visible = false;
      this.speechVisible = false;
      return;
    }
    this.speechText.text = text.length > 80 ? text.substring(0, 77) + '...' : text;
    this.speechBubble.visible = true;
    this.speechVisible = true;
    this.talkTimer = 2; // talk for 2 seconds

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (this.speechVisible) {
        this.speechBubble.visible = false;
        this.speechVisible = false;
      }
    }, 5000);
  }

  // ─── Mood ───────────────────────────────────────────────────

  setMood(mood: Mood): void {
    if (this.mood === mood) return;
    this.mood = mood;
    this.drawEyes();
    this.drawMouth();
    this.drawArms();

    if (mood === 'celebrate') {
      this.celebrateTimer = 1.5;
    }
  }

  // ─── Update Loop ────────────────────────────────────────────

  update(delta: number): void {
    const dt = delta / 60;
    const time = Date.now() / 1000;
    this.idlePhase += dt;

    // Idle bounce
    const bounceY = Math.sin(this.idlePhase * 2) * 3;
    this.mascotGroup.y = this.height - 140 + bounceY;

    // Celebrate bounce (bigger)
    if (this.celebrateTimer > 0) {
      this.celebrateTimer -= dt;
      this.mascotGroup.y -= Math.abs(Math.sin(this.idlePhase * 8)) * 10;
    }

    // Blink animation
    this.blinkTimer += dt;
    if (this.blinkTimer > 3 + Math.random() * 2) {
      this.blinkTimer = 0;
      this.blinkState = 'closing';
    }

    if (this.blinkState === 'closing') {
      this.blinkState = 'closed';
      this.drawEyes();
      setTimeout(() => {
        this.blinkState = 'open';
        this.drawEyes();
      }, 100);
    }

    // Talk animation
    if (this.talkTimer > 0) {
      this.talkTimer -= dt;
      this.drawMouth();
    }
  }

  // ─── Helpers ────────────────────────────────────────────────

  private darken(color: number, factor: number): number {
    const r = Math.round(((color >> 16) & 0xff) * factor);
    const g = Math.round(((color >> 8) & 0xff) * factor);
    const b = Math.round((color & 0xff) * factor);
    return (r << 16) | (g << 8) | b;
  }

  // ─── Resize ─────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.mascotGroup.x = width - 100;
    this.mascotGroup.y = height - 140;
    this.speechBubble.x = width - 320;
    this.speechBubble.y = height - 220;
  }

  // ─── Cleanup ────────────────────────────────────────────────

  destroy(): void {
    this.container.removeChildren();
  }
}
