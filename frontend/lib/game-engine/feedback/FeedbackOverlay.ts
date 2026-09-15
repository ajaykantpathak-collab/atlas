/**
 * FeedbackOverlay — UI overlays for feedback, hints, and progress
 *
 * Renders on top of the game canvas:
 * - Bullet-point misconception feedback (not walls of text)
 * - Hint bubbles
 * - Learning artifact progress (UPGRADE 3)
 * - Game complete screen with score and stars
 * - Adaptive difficulty indicator
 *
 * Uses PixiJS Text and Graphics — no DOM elements.
 */

import * as PIXI from 'pixi.js';
import { drawStar } from '../pixi-utils';
import type { ArtifactConfig } from '../types';

export class FeedbackOverlay {
  private container: PIXI.Container;
  private width: number;
  private height: number;

  private misconceptionBox: PIXI.Container;
  private misconceptionText: PIXI.Text;
  private misconceptionTimer: number = 0;

  private hintBox: PIXI.Container;
  private hintText: PIXI.Text;
  private hintTimer: number = 0;

  private artifactContainer: PIXI.Container;
  private artifactPieces: PIXI.Graphics[] = [];
  private artifactConfig: ArtifactConfig | null = null;

  private completeScreen: PIXI.Container | null = null;

  constructor(container: PIXI.Container, width: number, height: number) {
    this.container = container;
    this.width = width;
    this.height = height;

    // Misconception feedback box
    this.misconceptionBox = new PIXI.Container();
    this.misconceptionBox.visible = false;
    this.misconceptionText = new PIXI.Text('', {
      fontFamily: 'Arial',
      fontSize: 13,
      fill: 0x333333,
      wordWrap: true,
      wordWrapWidth: 280,
      align: 'left',
    });
    this.buildMisconceptionBox();
    this.container.addChild(this.misconceptionBox);

    // Hint box
    this.hintBox = new PIXI.Container();
    this.hintBox.visible = false;
    this.hintText = new PIXI.Text('', {
      fontFamily: 'Arial',
      fontSize: 13,
      fill: 0x333333,
      wordWrap: true,
      wordWrapWidth: 260,
      align: 'center',
    });
    this.buildHintBox();
    this.container.addChild(this.hintBox);

    // Artifact container
    this.artifactContainer = new PIXI.Container();
    this.artifactContainer.x = 20;
    this.artifactContainer.y = 20;
    this.container.addChild(this.artifactContainer);
  }

  // ─── Misconception Feedback ─────────────────────────────────

  private buildMisconceptionBox(): void {
    const w = 300;
    const h = 100;
    const bg = new PIXI.Graphics();
    bg.beginFill(0xfff3f3, 0.95);
    bg.lineStyle(3, 0xff6b6b);
    bg.drawRoundedRect(0, 0, w, h, 12);
    bg.endFill();

    // Icon
    const icon = new PIXI.Graphics();
    icon.beginFill(0xff6b6b);
    icon.drawCircle(15, 15, 10);
    icon.endFill();
    icon.beginFill(0xffffff);
    icon.lineStyle(0);
    // Exclamation mark
    const excl = new PIXI.Text('!', {
      fontSize: 14, fill: 0xffffff, fontWeight: 'bold',
    });
    excl.anchor.set(0.5);
    excl.x = 15;
    excl.y = 15;

    this.misconceptionBox.addChild(bg);
    this.misconceptionBox.addChild(icon);
    this.misconceptionBox.addChild(excl);

    this.misconceptionText.x = 35;
    this.misconceptionText.y = 8;
    this.misconceptionText.style.wordWrap = true;
    this.misconceptionText.style.wordWrapWidth = 250;
    this.misconceptionBox.addChild(this.misconceptionText);

    this.misconceptionBox.x = (this.width - w) / 2;
    this.misconceptionBox.y = this.height - h - 20;
  }

  showMisconception(text: string): void {
    // Break long text into bullet points
    const bullets = this.breakIntoBullets(text);
    // Truncate to fit box
    const maxLen = 180;
    this.misconceptionText.text = bullets.length > maxLen ? bullets.substring(0, maxLen) + '...' : bullets;
    this.misconceptionBox.visible = true;
    this.misconceptionTimer = 5; // show for 5 seconds
  }

  private breakIntoBullets(text: string): string {
    // If text has sentences, break into bullet points
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length <= 1) return text;

    // Take first 2 sentences as bullets to keep it short
    const bullets = sentences.slice(0, 2).map(s => `• ${s.trim()}.`);
    return bullets.join('\n');
  }

  // ─── Hint Bubble ────────────────────────────────────────────

  private buildHintBox(): void {
    const w = 320;
    const h = 80;
    const bg = new PIXI.Graphics();
    bg.beginFill(0xe8f4fd, 0.95);
    bg.lineStyle(3, 0x74c0fc);
    bg.drawRoundedRect(0, 0, w, h, 12);
    bg.endFill();

    // Lightbulb icon
    const icon = new PIXI.Graphics();
    icon.beginFill(0xffd700);
    icon.drawCircle(15, 15, 8);
    icon.endFill();
    icon.beginFill(0x999999);
    icon.drawRect(12, 22, 6, 4);
    icon.endFill();

    this.hintBox.addChild(bg);
    this.hintBox.addChild(icon);

    this.hintText.x = 35;
    this.hintText.y = 8;
    this.hintText.style.wordWrap = true;
    this.hintText.style.wordWrapWidth = w - 50;
    this.hintBox.addChild(this.hintText);

    this.hintBox.x = (this.width - w) / 2;
    this.hintBox.y = this.height - h - 20;
  }

  showHint(text: string): void {
    // Truncate to fit the box
    const maxLen = 140;
    this.hintText.text = text.length > maxLen ? text.substring(0, maxLen - 3) + '...' : text;
    this.hintBox.visible = true;
    this.hintTimer = 5;
  }

  // ─── Learning Artifact (UPGRADE 3) ──────────────────────────

  updateArtifact(progress: number, config: ArtifactConfig | null): void {
    this.artifactConfig = config;
    this.artifactContainer.removeChildren();
    this.artifactPieces = [];

    if (!config) return;

    // Title
    const title = new PIXI.Text(config.title, {
      fontFamily: 'Arial',
      fontSize: 11,
      fill: 0x333333,
      fontWeight: 'bold',
    });
    title.x = 0;
    title.y = 0;
    this.artifactContainer.addChild(title);

    // Draw artifact based on type
    const totalW = 150;
    const pieceW = totalW / config.totalPieces;

    for (let i = 0; i < config.totalPieces; i++) {
      const filled = i < progress;
      const piece = new PIXI.Graphics();

      switch (config.type) {
        case 'growing-tree':
        case 'growing-garden':
          // Each piece is a leaf/flower on a branch
          piece.beginFill(filled ? 0x4a8b3a : 0xcccccc, filled ? 1 : 0.3);
          piece.drawCircle(i * pieceW + pieceW / 2, 25, 6);
          piece.endFill();
          break;
        case 'filling-chart':
        case 'filling-shelves':
          // Each piece is a bar
          piece.beginFill(filled ? 0x6c5ce7 : 0xcccccc, filled ? 1 : 0.3);
          piece.drawRect(i * pieceW + 2, 15, pieceW - 4, 20);
          piece.endFill();
          break;
        case 'collecting-stars':
          // Each piece is a star
          piece.beginFill(filled ? 0xffd700 : 0xcccccc, filled ? 1 : 0.3);
          drawStar(piece, i * pieceW + pieceW / 2, 25, 5, 7, 3);
          piece.endFill();
          break;
        case 'building-structure':
        case 'building-map':
        case 'completing-puzzle':
          // Each piece is a block
          piece.beginFill(filled ? 0x00b894 : 0xcccccc, filled ? 1 : 0.3);
          piece.drawRect(i * pieceW + 2, 15, pieceW - 4, 20);
          piece.endFill();
          break;
        default:
          piece.beginFill(filled ? 0x6c5ce7 : 0xcccccc, filled ? 1 : 0.3);
          piece.drawCircle(i * pieceW + pieceW / 2, 25, 5);
          piece.endFill();
      }

      this.artifactContainer.addChild(piece);
      this.artifactPieces.push(piece);
    }
  }

  // ─── Game Complete Screen ───────────────────────────────────

  showGameComplete(score: number, stars: number): void {
    if (this.completeScreen) {
      this.container.removeChild(this.completeScreen);
      this.completeScreen.destroy({ children: true });
    }

    this.completeScreen = new PIXI.Container();

    // Overlay
    const overlay = new PIXI.Graphics();
    overlay.beginFill(0x000000, 0.5);
    overlay.drawRect(0, 0, this.width, this.height);
    overlay.endFill();
    this.completeScreen.addChild(overlay);

    // Card
    const cardW = 300;
    const cardH = 200;
    const card = new PIXI.Graphics();
    card.beginFill(0xffffff);
    card.lineStyle(4, 0xffd700);
    card.drawRoundedRect(0, 0, cardW, cardH, 20);
    card.endFill();
    card.x = (this.width - cardW) / 2;
    card.y = (this.height - cardH) / 2;
    this.completeScreen.addChild(card);

    // Title
    const title = new PIXI.Text('Game Complete!', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0x6c5ce7,
      fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = (this.height - cardH) / 2 + 40;
    this.completeScreen.addChild(title);

    // Stars
    for (let i = 0; i < 8; i++) {
      const star = new PIXI.Graphics();
      const filled = i < stars;
      star.beginFill(filled ? 0xffd700 : 0xcccccc);
      drawStar(star, 0, 0, 5, 12, 5);
      star.endFill();
      star.x = (this.width - 8 * 25) / 2 + i * 25 + 12;
      star.y = (this.height - cardH) / 2 + 80;
      this.completeScreen.addChild(star);
    }

    // Score
    const scoreText = new PIXI.Text(`Score: ${score}/100`, {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0x333333,
      fontWeight: 'bold',
    });
    scoreText.anchor.set(0.5);
    scoreText.x = this.width / 2;
    scoreText.y = (this.height - cardH) / 2 + 120;
    this.completeScreen.addChild(scoreText);

    // Encouragement
    const encouragement = score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job!' : 'Keep practicing!';
    const encText = new PIXI.Text(encouragement, {
      fontFamily: 'Arial',
      fontSize: 14,
      fill: 0x666666,
    });
    encText.anchor.set(0.5);
    encText.x = this.width / 2;
    encText.y = (this.height - cardH) / 2 + 150;
    this.completeScreen.addChild(encText);

    this.container.addChild(this.completeScreen);
  }

  // ─── Update Loop ────────────────────────────────────────────

  update(delta: number): void {
    const dt = delta / 60;

    // Auto-hide misconception
    if (this.misconceptionTimer > 0) {
      this.misconceptionTimer -= dt;
      if (this.misconceptionTimer <= 0) {
        this.misconceptionBox.visible = false;
      }
    }

    // Auto-hide hint
    if (this.hintTimer > 0) {
      this.hintTimer -= dt;
      if (this.hintTimer <= 0) {
        this.hintBox.visible = false;
      }
    }
  }

  // ─── Resize ─────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.misconceptionBox.x = (width - 300) / 2;
    this.misconceptionBox.y = height - 120;
    this.hintBox.x = (width - 280) / 2;
    this.hintBox.y = height - 90;
  }

  // ─── Cleanup ────────────────────────────────────────────────

  destroy(): void {
    this.container.removeChildren();
  }
}
