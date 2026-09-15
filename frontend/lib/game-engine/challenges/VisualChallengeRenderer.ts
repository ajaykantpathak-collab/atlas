/**
 * VisualChallengeRenderer — Renders interactive visual problem representations
 * on the PixiJS canvas.
 *
 * This is the core upgrade for struggling students:
 * - Math addition/subtraction: animated counting objects that appear one by one
 * - Interactive number line: frog hops and speaks each number
 * - Draggable counting manipulatives: drag objects into a basket
 * - Interactive fraction pizza: click slices to fill them
 * - Step-by-step solution walkthrough: animates the solution after wrong answers
 *
 * All rendering happens on the GPU canvas — no DOM/SVG.
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { speechManager } from '../../sim-engine/speech';
import { audioManager } from '../../sim-engine/audio';
import type { SoundEffect } from '../../sim-engine/types';
import { SimulationEngine } from '../../sim-framework';
import type { AdaptiveConfig } from '../../sim-framework';
import type { ScaffoldingManager } from '../scaffolding/ScaffoldingManager';
import type { ScaffoldLevel } from '../scaffolding/types';
import { RemediationManager } from '../remediation/RemediationManager';
import type { ExplanationMode, RemediationContext } from '../remediation/types';
import { FormativeFeedback } from '../feedback/FormativeFeedback';
import type { FeedbackMessage } from '../feedback/FormativeFeedback';
import { AssetLoader } from '../AssetLoader';

interface VisualChallengeRendererCallbacks {
  onSpeak?: (text: string) => void;
  onAnswer?: (answer: string) => void;
  onCelebrate?: () => void;
  onMascotMood?: (mood: 'happy' | 'celebrate' | 'thinking' | 'sad') => void;
}

export class VisualChallengeRenderer {
  private layer: PIXI.Container;
  private width: number;
  private height: number;
  private app: PIXI.Application;
  private callbacks: VisualChallengeRendererCallbacks;

  private currentVisual: PIXI.Container | null = null;
  private tickerHandler: (() => void) | null = null;
  private adaptiveEasier = false;
  private showMeActive = false;
  private simEngine: SimulationEngine | null = null;
  private scaffoldManager: ScaffoldingManager | null = null;
  private remediationModesShown: ExplanationMode[] = [];
  private currentQuestion = '';
  private currentSubject = '';
  private formativeFeedback = new FormativeFeedback();
  private feedbackText: PIXI.Text | null = null;

  constructor(
    layer: PIXI.Container,
    width: number,
    height: number,
    app: PIXI.Application,
    callbacks: VisualChallengeRendererCallbacks = {},
  ) {
    this.layer = layer;
    this.width = width;
    this.height = height;
    this.app = app;
    // Default: use speechManager for TTS, allow override
    this.callbacks = {
      onSpeak: callbacks.onSpeak || ((text: string) => speechManager.speak(text)),
      onAnswer: callbacks.onAnswer,
      onCelebrate: callbacks.onCelebrate,
      onMascotMood: callbacks.onMascotMood,
    };
  }

  // ─── Public API: Show me mode & adaptive difficulty ──────────

  /**
   * Trigger "Show me" guided mode.
   * The mascot demonstrates the first step of the current visual,
   * then hands over to the student.
   */
  triggerShowMe(): void {
    this.showMeActive = true;
    this.callbacks.onMascotMood?.('thinking');
    // The showMeActive flag is read by interactive renderers
    // to auto-demonstrate the first step.
    // After 3 seconds, reset so the student can try.
    setTimeout(() => {
      this.showMeActive = false;
      this.callbacks.onMascotMood?.('happy');
    }, 3000);
  }

  /**
   * Set adaptive difficulty.
   * When easier=true, interactive visuals use fewer objects / simpler layouts.
   */
  setAdaptiveDifficulty(easier: boolean): void {
    this.adaptiveEasier = easier;
  }

  /**
   * Set the scaffolding manager.
   * When set, interactive renderers will branch on scaffold level:
   * - Level 3: full manipulatives (drag objects)
   * - Level 2: number line representation
   * - Level 1: abstract symbols only
   */
  setScaffoldManager(manager: ScaffoldingManager): void {
    this.scaffoldManager = manager;
  }

  /**
   * Get the scaffold level for a topic, defaulting to 3 (full support).
   */
  private getScaffoldLevel(question: string, subject: string): ScaffoldLevel {
    if (!this.scaffoldManager) return 3;
    const topic = this.detectTopicFromQuestion(question, subject);
    return this.scaffoldManager.getLevel(topic, subject);
  }

  /**
   * Detect a topic key from the question text for scaffolding lookup.
   */
  private detectTopicFromQuestion(question: string, subject: string): string {
    const q = question.toLowerCase();
    if (q.includes('add') || q.includes('more') || q.includes('altogether') || q.includes('in all') || q.match(/\d+\s*\+\s*\d+/)) return 'addition';
    if (q.includes('subtract') || q.includes('take away') || q.includes('give') || q.includes('left') || q.match(/\d+\s*-\s*\d+/)) return 'subtraction';
    if (q.includes('fraction') || q.includes('half') || q.includes('quarter') || q.includes('third')) return 'fractions';
    if (q.includes('multiply') || q.includes('times') || q.includes('groups of')) return 'multiplication';
    if (q.includes('divide') || q.includes('divided by') || q.includes('split')) return 'division';
    if (q.includes('angle')) return 'angles';
    if (q.includes('perimeter')) return 'perimeter';
    if (q.includes('area')) return 'area';
    if (q.includes('percentage') || q.includes('percent')) return 'percentages';
    if (q.includes('decimal')) return 'decimals';
    return subject || 'general';
  }

  // ─── Remediation: alternative explanation on wrong answer ────

  /**
   * Track the current question for remediation context.
   * Called when a new challenge starts.
   */
  setQuestionContext(question: string, subject: string): void {
    this.currentQuestion = question;
    this.currentSubject = subject;
    this.remediationModesShown = [];
  }

  /**
   * Trigger remediation after a wrong answer.
   * Picks an alternative explanation mode and renders it.
   * Returns the spoken text for the mascot.
   */
  triggerRemediation(question: string, subject: string, correctAnswer: string, studentAnswer: string): string {
    const topic = this.detectTopicFromQuestion(question, subject);
    const ctx: RemediationContext = {
      question,
      correctAnswer,
      studentAnswer,
      subject,
      topic,
      modesShown: this.remediationModesShown,
      errorType: 'general',
      misconception: '',
    };
    const strategy = RemediationManager.getRemediation(ctx);
    this.remediationModesShown.push(strategy.mode);

    // Speak the remediation intro
    this.callbacks.onSpeak?.(strategy.spokenText);
    this.callbacks.onMascotMood?.('thinking');

    // If the strategy has an alternative visual, render it
    if (strategy.showAlternativeVisual && strategy.rendererMethod) {
      this.renderRemediationVisual(strategy.rendererMethod, strategy.rendererParams, question, subject, correctAnswer, strategy.visualText);
    } else {
      // Show text-based remediation on canvas
      this.renderRemediationText(strategy.spokenText, strategy.visualText, strategy.mode);
    }

    return strategy.spokenText;
  }

  /**
   * Render an alternative visual representation based on the remediation mode.
   */
  private renderRemediationVisual(
    method: string,
    params: number[] | undefined,
    question: string,
    subject: string,
    answer: string,
    visualText: string,
  ): void {
    this.clear();
    const q = question.toLowerCase();

    // Show the visual text banner at top
    const banner = new PIXI.Text(visualText, {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    banner.anchor.set(0.5);
    banner.x = this.width / 2;
    banner.y = 10;

    switch (method) {
      case 'renderInteractiveAddition':
      case 'renderInteractiveSubtraction': {
        // Re-render with visual objects (force scaffold level 3)
        if (q.match(/(\d+)\s*[+-]\s*(\d+)/) || (params && params.length >= 2)) {
          const match = q.match(/(\d+)\s*([+-])\s*(\d+)/);
          if (match) {
            const a = parseInt(match[1]);
            const b = parseInt(match[3]);
            if (match[2] === '+') {
              this.renderInteractiveAddition(a, b, question, answer);
            } else {
              this.renderInteractiveSubtraction(a, b, question, answer);
            }
            // Add banner on top
            if (this.currentVisual) this.currentVisual.addChildAt(banner, 0);
            return;
          }
        }
        if (params && params.length >= 2) {
          if (q.includes('subtract') || q.includes('take away') || q.includes('give') || q.includes('left')) {
            this.renderInteractiveSubtraction(params[0], params[1], question, answer);
          } else {
            this.renderInteractiveAddition(params[0], params[1], question, answer);
          }
          if (this.currentVisual) this.currentVisual.addChildAt(banner, 0);
          return;
        }
        break;
      }

      case 'renderNumberLineChallenge': {
        // Use the number line representation
        const match = q.match(/(\d+)\s*([+-])\s*(\d+)/);
        if (match) {
          const a = parseInt(match[1]);
          const b = parseInt(match[3]);
          if (match[2] === '+') {
            this.renderAdditionNumberLine(a, b, question, answer);
          } else {
            this.renderSubtractionNumberLine(a, b, question, answer);
          }
          if (this.currentVisual) this.currentVisual.addChildAt(banner, 0);
          return;
        }
        break;
      }

      case 'renderFractionBar': {
        this.renderFractionBar(question, answer);
        if (this.currentVisual) this.currentVisual.addChildAt(banner, 0);
        return;
      }

      case 'renderFractionPizza': {
        this.renderFractionPizza(question, answer);
        if (this.currentVisual) this.currentVisual.addChildAt(banner, 0);
        return;
      }

      case 'renderFractionSet': {
        this.renderFractionSet(question, answer);
        if (this.currentVisual) this.currentVisual.addChildAt(banner, 0);
        return;
      }
    }

    // Fallback: show text remediation
    this.renderRemediationText('Let me show you another way!', 'Try thinking about it differently.', 'default');
  }

  /**
   * Render text-based remediation on the canvas.
   * Used for decomposition, real_world, analogy, step_by_step modes.
   */
  private renderRemediationText(spokenText: string, visualText: string, mode: ExplanationMode): void {
    this.clear();
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    // Background card
    const card = new PIXI.Graphics();
    card.beginFill(0xf0f9ff, 0.95);
    card.lineStyle(3, 0x6c5ce7);
    card.drawRoundedRect(20, 40, this.width - 40, this.height - 120, 16);
    card.endFill();
    container.addChild(card);

    // Mode label
    const modeLabel = new PIXI.Text(`💡 ${RemediationManager.getModeLabel(mode)}`, {
      fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    modeLabel.anchor.set(0.5);
    modeLabel.x = this.width / 2;
    modeLabel.y = 65;
    container.addChild(modeLabel);

    // Visual text (main instruction)
    const text = new PIXI.Text(visualText, {
      fontSize: 18, fill: 0x1f2937, fontWeight: 'bold',
      wordWrap: true, wordWrapWidth: this.width - 80, align: 'center',
    });
    text.anchor.set(0.5);
    text.x = this.width / 2;
    text.y = this.height / 2 - 20;
    container.addChild(text);

    // Spoken text (smaller, for reference)
    const spoken = new PIXI.Text(`🔊 ${spokenText}`, {
      fontSize: 13, fill: 0x6b7280,
      wordWrap: true, wordWrapWidth: this.width - 80, align: 'center',
    });
    spoken.anchor.set(0.5);
    spoken.x = this.width / 2;
    spoken.y = this.height / 2 + 60;
    container.addChild(spoken);

    // "Try again" button
    const tryAgainBtn = new PIXI.Graphics();
    tryAgainBtn.beginFill(0x6c5ce7);
    tryAgainBtn.drawRoundedRect(-60, -18, 120, 36, 10);
    tryAgainBtn.endFill();
    tryAgainBtn.x = this.width / 2;
    tryAgainBtn.y = this.height - 70;
    tryAgainBtn.eventMode = 'static';
    tryAgainBtn.cursor = 'pointer';
    container.addChild(tryAgainBtn);

    const tryAgainText = new PIXI.Text('Try again →', {
      fontSize: 14, fill: 0xffffff, fontWeight: 'bold',
    });
    tryAgainText.anchor.set(0.5);
    tryAgainBtn.addChild(tryAgainText);

    // Animate card appearing
    card.alpha = 0;
    text.alpha = 0;
    spoken.alpha = 0;
    modeLabel.alpha = 0;
    tryAgainBtn.alpha = 0;
    gsap.to([card, text, spoken, modeLabel, tryAgainBtn], {
      alpha: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out',
    });
  }

  // ─── Alternative fraction representations for remediation ────

  /**
   * Render a bar model for fractions.
   * Shows a rectangular bar divided into parts, with some parts filled.
   */
  private renderFractionBar(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let parts = 2;
    let filled = 1;
    if (q.includes('quarter') || q.includes('1/4')) { parts = 4; filled = 1; }
    else if (q.includes('third') || q.includes('1/3')) { parts = 3; filled = 1; }
    else if (q.includes('half') || q.includes('1/2')) { parts = 2; filled = 1; }
    else if (q.includes('3/4')) { parts = 4; filled = 3; }
    else if (q.includes('2/3')) { parts = 3; filled = 2; }
    else if (q.includes('3/4')) { parts = 4; filled = 3; }

    // Parse from answer if possible
    const fracMatch = answer.match(/(\d+)\s*\/\s*(\d+)/);
    if (fracMatch) {
      filled = parseInt(fracMatch[1]);
      parts = parseInt(fracMatch[2]);
    }

    const cx = this.width / 2;
    const barW = 300;
    const barH = 60;
    const barX = cx - barW / 2;
    const barY = 150;
    const segW = barW / parts;
    let solved = false;

    // Title
    const title = new PIXI.Text('📊 Bar Model — click the parts to fill them!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 30;
    container.addChild(title);

    // Bar outline
    const barOutline = new PIXI.Graphics();
    barOutline.lineStyle(3, 0x1f2937);
    barOutline.drawRect(barX, barY, barW, barH);
    container.addChild(barOutline);

    // Segment dividers
    for (let i = 1; i < parts; i++) {
      const div = new PIXI.Graphics();
      div.lineStyle(2, 0x1f2937);
      div.moveTo(barX + i * segW, barY);
      div.lineTo(barX + i * segW, barY + barH);
      container.addChild(div);
    }

    // Clickable segments
    const segFilled: boolean[] = new Array(parts).fill(false);
    const segments: PIXI.Graphics[] = [];

    for (let i = 0; i < parts; i++) {
      const seg = new PIXI.Graphics();
      seg.beginFill(0xffffff, 0.001);
      seg.drawRect(barX + i * segW, barY, segW, barH);
      seg.endFill();
      seg.eventMode = 'static';
      seg.cursor = 'pointer';
      container.addChild(seg);
      segments.push(seg);

      seg.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        segFilled[i] = !segFilled[i];

        // Redraw segment
        const fill = new PIXI.Graphics();
        if (segFilled[i]) {
          fill.beginFill(0x6c5ce7);
          fill.drawRect(barX + i * segW + 2, barY + 2, segW - 4, barH - 4);
          fill.endFill();
        }
        // Remove old fill, add new
        const existing = seg.getChildByName('fill');
        if (existing) seg.removeChild(existing);
        if (segFilled[i]) {
          fill.name = 'fill';
          seg.addChildAt(fill, 0);
        }

        const count = segFilled.filter(f => f).length;
        this.callbacks.onSpeak?.(`${count} out of ${parts}`);

        if (count === filled && !solved) {
          solved = true;
          this.playSound('success');
          this.celebrate(container, cx, barY + barH / 2);
          this.callbacks.onSpeak?.(`Yes! ${filled} out of ${parts}! That's the right fraction!`);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        }
      });
    }

    // Fraction label
    const fracLabel = new PIXI.Text(`${filled} / ${parts}`, {
      fontSize: 36, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    fracLabel.anchor.set(0.5);
    fracLabel.x = cx;
    fracLabel.y = barY + barH + 50;
    container.addChild(fracLabel);

    this.callbacks.onMascotMood?.('thinking');
  }

  /**
   * Render a pizza/circle model for fractions.
   * Similar to the existing interactive fraction but with a different visual style.
   */
  private renderFractionPizza(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let parts = 4;
    let filled = 1;
    const fracMatch = answer.match(/(\d+)\s*\/\s*(\d+)/);
    if (fracMatch) {
      filled = parseInt(fracMatch[1]);
      parts = parseInt(fracMatch[2]);
    } else if (q.includes('half') || q.includes('1/2')) { parts = 2; filled = 1; }
    else if (q.includes('third') || q.includes('1/3')) { parts = 3; filled = 1; }
    else if (q.includes('quarter') || q.includes('1/4')) { parts = 4; filled = 1; }

    const cx = this.width / 2;
    const cy = 180;
    const radius = 80;
    let solved = false;

    // Title
    const title = new PIXI.Text('🍕 Pizza Model — click slices to fill!', {
      fontSize: 14, fill: 0xf59e0b, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 30;
    container.addChild(title);

    // Pizza base
    const base = new PIXI.Graphics();
    base.beginFill(0xfde68a);
    base.lineStyle(4, 0xf59e0b);
    base.drawCircle(0, 0, radius);
    base.endFill();
    base.x = cx;
    base.y = cy;
    container.addChild(base);

    // Slice lines
    for (let i = 0; i < parts; i++) {
      const angle = (i / parts) * Math.PI * 2 - Math.PI / 2;
      const line = new PIXI.Graphics();
      line.lineStyle(3, 0xf59e0b);
      line.moveTo(0, 0);
      line.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      line.x = cx;
      line.y = cy;
      container.addChild(line);
    }

    // Clickable slices
    const sliceFilled: boolean[] = new Array(parts).fill(false);

    for (let i = 0; i < parts; i++) {
      const startAngle = (i / parts) * Math.PI * 2 - Math.PI / 2;
      const endAngle = ((i + 1) / parts) * Math.PI * 2 - Math.PI / 2;

      const clickArea = new PIXI.Graphics();
      clickArea.beginFill(0xffffff, 0.001);
      clickArea.moveTo(0, 0);
      clickArea.arc(0, 0, radius, startAngle, endAngle);
      clickArea.closePath();
      clickArea.endFill();
      clickArea.x = cx;
      clickArea.y = cy;
      clickArea.eventMode = 'static';
      clickArea.cursor = 'pointer';
      container.addChild(clickArea);

      clickArea.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        sliceFilled[i] = !sliceFilled[i];

        // Draw fill
        const existing = clickArea.getChildByName('fill');
        if (existing) clickArea.removeChild(existing);

        if (sliceFilled[i]) {
          const fill = new PIXI.Graphics();
          fill.beginFill(0xef4444, 0.7);
          fill.moveTo(0, 0);
          fill.arc(0, 0, radius - 2, startAngle, endAngle);
          fill.closePath();
          fill.endFill();
          fill.name = 'fill';
          clickArea.addChildAt(fill, 0);
          // Add pepperoni
          const pepperoni = new PIXI.Graphics();
          const midAngle = (startAngle + endAngle) / 2;
          pepperoni.beginFill(0xdc2626);
          pepperoni.drawCircle(Math.cos(midAngle) * radius * 0.5, Math.sin(midAngle) * radius * 0.5, 6);
          pepperoni.endFill();
          clickArea.addChild(pepperoni);
        }

        const count = sliceFilled.filter(f => f).length;
        this.callbacks.onSpeak?.(`${count} out of ${parts} slices`);

        if (count === filled && !solved) {
          solved = true;
          this.playSound('success');
          this.celebrate(container, cx, cy);
          this.callbacks.onSpeak?.(`Yes! ${filled} out of ${parts} slices! That's the right fraction!`);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        }
      });
    }

    // Label
    const label = new PIXI.Text(`${filled} / ${parts}`, {
      fontSize: 36, fill: 0xf59e0b, fontWeight: 'bold',
    });
    label.anchor.set(0.5);
    label.x = cx;
    label.y = cy + radius + 40;
    container.addChild(label);

    this.callbacks.onMascotMood?.('thinking');
  }

  /**
   * Render a set model for fractions.
   * Shows a group of objects, some colored to represent the fraction.
   */
  private renderFractionSet(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let parts = 6;
    let filled = 3;
    const fracMatch = answer.match(/(\d+)\s*\/\s*(\d+)/);
    if (fracMatch) {
      filled = parseInt(fracMatch[1]);
      parts = parseInt(fracMatch[2]);
      // Scale up to a reasonable set size (at least 4 objects)
      if (parts < 4) {
        const scale = Math.ceil(4 / parts);
        parts *= scale;
        filled *= scale;
      }
    } else if (q.includes('half') || q.includes('1/2')) { parts = 6; filled = 3; }
    else if (q.includes('third') || q.includes('1/3')) { parts = 6; filled = 2; }
    else if (q.includes('quarter') || q.includes('1/4')) { parts = 8; filled = 2; }

    const cx = this.width / 2;
    const objSize = 40;
    const spacing = 50;
    const perRow = Math.min(parts, 6);
    const startX = cx - ((perRow - 1) * spacing) / 2;
    const startY = 120;
    let solved = false;

    // Title
    const title = new PIXI.Text('🔵 Set Model — click objects to color them!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 30;
    container.addChild(title);

    // Instruction
    const instr = new PIXI.Text(`Color ${filled} out of ${parts} objects`, {
      fontSize: 16, fill: 0x6b7280, fontWeight: 'bold',
    });
    instr.anchor.set(0.5);
    instr.x = cx;
    instr.y = 60;
    container.addChild(instr);

    // Create objects
    const objColored: boolean[] = new Array(parts).fill(false);
    const objects: PIXI.Graphics[] = [];

    for (let i = 0; i < parts; i++) {
      const col = i % perRow;
      const row = Math.floor(i / perRow);
      const x = startX + col * spacing;
      const y = startY + row * spacing;

      const obj = new PIXI.Graphics();
      obj.beginFill(0xe5e7eb);
      obj.lineStyle(2, 0x9ca3af);
      obj.drawCircle(0, 0, objSize / 2);
      obj.endFill();
      obj.x = x;
      obj.y = y;
      obj.eventMode = 'static';
      obj.cursor = 'pointer';
      container.addChild(obj);
      objects.push(obj);

      obj.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        objColored[i] = !objColored[i];

        // Redraw
        obj.clear();
        if (objColored[i]) {
          obj.beginFill(0x6c5ce7);
          obj.lineStyle(2, 0x4c1d95);
        } else {
          obj.beginFill(0xe5e7eb);
          obj.lineStyle(2, 0x9ca3af);
        }
        obj.drawCircle(0, 0, objSize / 2);
        obj.endFill();

        const count = objColored.filter(f => f).length;
        this.callbacks.onSpeak?.(`${count} out of ${parts}`);

        if (count === filled && !solved) {
          solved = true;
          this.playSound('success');
          this.celebrate(container, cx, startY + Math.floor(parts / perRow) * spacing / 2);
          this.callbacks.onSpeak?.(`Yes! ${filled} out of ${parts}! That's the right fraction!`);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        }
      });
    }

    this.callbacks.onMascotMood?.('thinking');
  }

  // ─── Formative feedback display helpers ──────────────────────

  /**
   * Create the feedback text element on a container.
   */
  private createFeedbackDisplay(container: PIXI.Container): void {
    if (this.feedbackText) {
      this.feedbackText.destroy();
      this.feedbackText = null;
    }
    const fb = new PIXI.Text('', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
      wordWrap: true, wordWrapWidth: this.width - 40, align: 'center',
    });
    fb.anchor.set(0.5);
    fb.x = this.width / 2;
    fb.y = this.height - 30;
    fb.alpha = 0;
    container.addChild(fb);
    this.feedbackText = fb;
  }

  /**
   * Show a formative feedback message on the canvas.
   */
  private showFeedback(msg: FeedbackMessage): void {
    if (!this.feedbackText) return;
    this.feedbackText.text = msg.visual;
    this.feedbackText.style.fill = msg.priority === 3 ? 0x22c55e : msg.priority === 2 ? 0xef4444 : 0x6c5ce7;
    gsap.to(this.feedbackText, { alpha: 1, duration: 0.3 });
    // Auto-hide after 2.5s
    gsap.to(this.feedbackText, { alpha: 0, duration: 0.5, delay: 2.5 });
    // Also speak
    this.callbacks.onSpeak?.(msg.spoken);
  }

  /**
   * Try to show formative feedback (throttled internally).
   */
  private tryFeedback(state: { current: number; target: number; unit: string; exceeded: boolean }): void {
    const msg = this.formativeFeedback.getFeedback(state);
    if (msg) this.showFeedback(msg);
  }

  /**
   * Try to show fraction formative feedback (throttled internally).
   */
  private tryFractionFeedback(num: number, den: number, targetNum: number, targetDen: number): void {
    const msg = this.formativeFeedback.getFractionFeedback(num, den, targetNum, targetDen);
    if (msg) this.showFeedback(msg);
  }

  // ─── Sound helpers ──────────────────────────────────────────

  private playSound(effect: SoundEffect): void {
    try { audioManager.play(effect); } catch (_e) {}
  }

  // ─── Celebration: confetti burst on canvas ──────────────────

  private celebrate(container: PIXI.Container, x: number, y: number): void {
    this.playSound('celebration');
    this.callbacks.onCelebrate?.();
    this.callbacks.onMascotMood?.('celebrate');

    // Create confetti particles — mix of sprite-based and primitive
    const colors = [0xff4444, 0x4a90d9, 0xffd700, 0x22c55e, 0xa855f7, 0xec4899];
    const particleSprites = ['star_01', 'spark_01', 'spark_02', 'magic_01', 'star_02'];
    for (let i = 0; i < 30; i++) {
      let particle: PIXI.DisplayObject;
      // Use sprite for every 3rd particle, primitive for the rest (for variety)
      if (i % 3 === 0) {
        const spriteName = particleSprites[i % particleSprites.length];
        particle = this.createParticleSprite(spriteName, 20 + Math.random() * 15);
        // Tint some particles
        if (particle instanceof PIXI.Sprite) {
          particle.tint = colors[Math.floor(Math.random() * colors.length)];
        }
      } else {
        const g = new PIXI.Graphics();
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 4 + Math.random() * 6;
        g.beginFill(color);
        g.drawRect(-size / 2, -size / 2, size, size);
        g.endFill();
        particle = g;
      }
      particle.x = x;
      particle.y = y;
      container.addChild(particle);

      const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.5;
      const dist = 80 + Math.random() * 120;
      const targetX = x + Math.cos(angle) * dist;
      const targetY = y + Math.sin(angle) * dist - 50;

      gsap.to(particle, {
        x: targetX, y: targetY, alpha: 0,
        rotation: Math.random() * Math.PI * 4,
        duration: 1.2 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: () => { container.removeChild(particle); particle.destroy(); },
      });
    }

    // "GREAT!" text
    const greatText = new PIXI.Text('🎉 GREAT! 🎉', {
      fontSize: 28, fill: 0x22c55e, fontWeight: 'bold', stroke: 0xffffff, strokeThickness: 4,
    });
    greatText.anchor.set(0.5);
    greatText.x = x;
    greatText.y = y - 40;
    greatText.scale.set(0);
    container.addChild(greatText);
    gsap.to(greatText, {
      pixi: { scale: 1.2 }, duration: 0.3, ease: 'back.out(2)',
      onComplete: () => {
        gsap.to(greatText, {
          pixi: { scale: 0 }, alpha: 0, duration: 0.5, delay: 0.8,
          onComplete: () => { container.removeChild(greatText); greatText.destroy(); },
        });
      },
    });
  }

  // ─── Wrong feedback: shake + buzz ───────────────────────────

  private wrongFeedback(container: PIXI.Container, x: number, y: number): void {
    this.playSound('error');
    this.callbacks.onMascotMood?.('sad');

    const xText = new PIXI.Text('✗', {
      fontSize: 32, fill: 0xef4444, fontWeight: 'bold',
    });
    xText.anchor.set(0.5);
    xText.x = x;
    xText.y = y;
    xText.scale.set(0);
    container.addChild(xText);
    gsap.to(xText, {
      pixi: { scale: 1.3 }, duration: 0.2, ease: 'back.out(2)',
      onComplete: () => {
        gsap.to(xText, {
          alpha: 0, pixi: { scale: 0 }, duration: 0.4, delay: 0.5,
          onComplete: () => { container.removeChild(xText); xText.destroy(); },
        });
      },
    });
    gsap.to(xText, { x: x + 8, duration: 0.04, yoyo: true, repeat: 6 });
  }

  // ─── Main entry: parse question and render appropriate visual ───

  renderVisual(
    question: string,
    subject: string,
    answer: string,
    options: string[],
    showCorrect: boolean,
  ): void {
    this.clear();
    // Reset remediation tracking for new question (but not on adaptive swap)
    if (question !== this.currentQuestion) {
      this.remediationModesShown = [];
    }
    this.currentQuestion = question;
    this.currentSubject = subject;

    const q = question.toLowerCase();

    // ─── Try the Simulation Framework first ────────────────
    // The sim framework handles advanced interactive simulations
    // (mixing beakers, blood flow, algebra tiles, geometry, graphs).
    // It only activates for non-showCorrect (interactive) mode.
    if (!showCorrect) {
      if (!this.simEngine) {
        this.simEngine = new SimulationEngine(
          this.layer,
          this.width,
          this.height,
          this.app,
          {
            onSolved: (ans: string) => {
              this.callbacks.onAnswer?.(ans);
            },
            onWrong: () => {
              this.callbacks.onMascotMood?.('sad');
            },
            onSpeak: (text: string) => {
              this.callbacks.onSpeak?.(text);
            },
            onPlaySound: (effect: string) => {
              this.playSound(effect as SoundEffect);
            },
            onCelebrate: (x: number, y: number) => {
              this.celebrate(this.layer, x, y);
            },
            onShowWrong: (x: number, y: number) => {
              this.wrongFeedback(this.layer, x, y);
            },
            onMascotMood: (mood: string) => {
              this.callbacks.onMascotMood?.(mood as 'happy' | 'celebrate' | 'thinking' | 'sad');
            },
            onAdaptiveSwap: (newQuestion: string, newAnswer: string, newOptions: string[]) => {
              // Re-render with the easier question
              this.renderVisual(newQuestion, subject, newAnswer, newOptions, false);
            },
          },
        );
      }

      this.simEngine.setGuidedMode(this.showMeActive);
      this.simEngine.setAdaptiveEasier(this.adaptiveEasier);

      const adaptiveConfig: AdaptiveConfig = {
        hintThreshold: 2,
        swapThreshold: 4,
        easierVariant: this.buildEasierVariant(question, subject, answer, options),
      };

      const handled = this.simEngine.run(question, subject, answer, options, adaptiveConfig);
      if (handled) {
        return; // Simulation plugin is handling this challenge
      }
    }

    // Try math visuals first
    const addMatch = q.match(/(\d+)\s*\+\s*(\d+)/);
    if (addMatch && (subject === 'maths' || q.includes('add') || q.includes('more') || q.includes('altogether') || q.includes('in all'))) {
      const a = parseInt(addMatch[1]);
      const b = parseInt(addMatch[2]);
      if (showCorrect) {
        this.renderAddition(a, b, q, answer, showCorrect);
      } else {
        this.renderInteractiveAddition(a, b, q, answer);
      }
      return;
    }

    const subMatch = q.match(/(\d+)\s*-\s*(\d+)/);
    if (subMatch && (subject === 'maths' || q.includes('take away') || q.includes('give') || q.includes('left') || q.includes('subtract'))) {
      const a = parseInt(subMatch[1]);
      const b = parseInt(subMatch[2]);
      if (showCorrect) {
        this.renderSubtraction(a, b, q, answer, showCorrect);
      } else {
        this.renderInteractiveSubtraction(a, b, q, answer);
      }
      return;
    }

    // "X mangoes and Y more" without explicit +
    const moreMatch = q.match(/(\d+)\s+\w+.*?\s+(\d+)\s+more/);
    if (moreMatch && subject === 'maths') {
      const a = parseInt(moreMatch[1]);
      const b = parseInt(moreMatch[2]);
      if (showCorrect) {
        this.renderAddition(a, b, q, answer, showCorrect);
      } else {
        this.renderInteractiveAddition(a, b, q, answer);
      }
      return;
    }

    // "X toffees and gives Y away"
    const giveMatch = q.match(/(\d+)\s+\w+.*?(\d+)\s+(?:away|to)/);
    if (giveMatch && subject === 'maths') {
      const a = parseInt(giveMatch[1]);
      const b = parseInt(giveMatch[2]);
      if (showCorrect) {
        this.renderSubtraction(a, b, q, answer, showCorrect);
      } else {
        this.renderInteractiveSubtraction(a, b, q, answer);
      }
      return;
    }

    const mulMatch = q.match(/(\d+)\s*[×x*]\s*(\d+)/) || q.match(/(\d+)\s+times\s+(\d+)/) || q.match(/(\d+)\s+groups?\s+of\s+(\d+)/);
    if (mulMatch && subject === 'maths') {
      const a = parseInt(mulMatch[1]);
      const b = parseInt(mulMatch[2]);
      this.renderMultiplication(a, b, answer, showCorrect);
      return;
    }

    const divMatch = q.match(/(\d+)\s*[÷/]\s*(\d+)/) || q.match(/(\d+)\s+divided\s+by\s+(\d+)/) || q.match(/split\s+(\d+)\s+.*?\s+(\d+)/);
    if (divMatch && subject === 'maths') {
      const a = parseInt(divMatch[1]);
      const b = parseInt(divMatch[2]);
      this.renderDivision(a, b, answer, showCorrect);
      return;
    }

    if (q.includes('fraction') || q.includes('half') || q.includes('quarter') || q.includes('third')) {
      if (showCorrect) {
        this.renderFraction(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveFraction(question, answer, options);
      }
      return;
    }

    if (q.includes('number line') || q.includes('hop') || q.includes('counting on') || q.includes('count back')) {
      if (showCorrect) {
        this.renderNumberLineChallenge(question, answer, showCorrect);
      } else {
        this.renderInteractiveNumberLineChallenge(question, answer);
      }
      return;
    }

    if (q.includes('greater') || q.includes('less') || q.includes('bigger') || q.includes('smaller') || q.includes('compare') || q.includes('largest') || q.includes('smallest')) {
      const numbers = q.match(/\d+/g);
      if (numbers && numbers.length >= 2) {
        this.renderCompare(numbers.map(Number), question, answer, showCorrect);
        return;
      }
    }

    if (q.includes('how many') && subject === 'maths') {
      const countMatch = q.match(/how many\s+(\w+)/);
      const word = countMatch ? countMatch[1] : '';
      const count = parseInt(q.match(/\d+/)?.[0] || '5');
      this.renderCounting(word, count, answer, showCorrect);
      return;
    }

    // Subject-specific visuals
    if (q.includes('body') || q.includes('eye') || q.includes('ear') || q.includes('nose') || q.includes('mouth') || q.includes('hand') || q.includes('leg') || q.includes('heart') || q.includes('brain') || q.includes('bone') || q.includes('muscle') || q.includes('skin') || q.includes('teeth')) {
      if (showCorrect) {
        this.renderBodyDiagram(answer, options, showCorrect);
      } else {
        this.renderInteractiveBodyDiagram(answer, options);
      }
      return;
    }

    if (q.includes('plant') || q.includes('leaf') || q.includes('flower') || q.includes('root') || q.includes('stem') || q.includes('seed') || q.includes('tree')) {
      this.renderPlantDiagram(answer, options, showCorrect);
      return;
    }

    // ─── Class 5 Math visuals ────────────────────────────────

    // Angles
    if (q.includes('angle') && (q.includes('90') || q.includes('right') || q.includes('acute') || q.includes('obtuse') || q.includes('straight') || q.includes('reflex'))) {
      if (showCorrect) {
        this.renderAngle(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveAngle(question, answer, options);
      }
      return;
    }

    // Perimeter
    if (q.includes('perimeter') || (q.includes('fencing') && q.includes('around'))) {
      if (showCorrect) {
        this.renderPerimeter(question, answer, showCorrect);
      } else {
        this.renderInteractivePerimeter(question, answer);
      }
      return;
    }

    // Area
    if (q.includes('area') && (q.includes('rectangle') || q.includes('square') || q.includes('length'))) {
      if (showCorrect) {
        this.renderArea(question, answer, showCorrect);
      } else {
        this.renderInteractiveArea(question, answer);
      }
      return;
    }

    // 3D shapes
    if (q.includes('3d') || q.includes('cylinder') || q.includes('cube') || q.includes('sphere') || q.includes('cone') || q.includes('prism') || q.includes('pyramid') || q.includes('faces') || q.includes('edges') || q.includes('vertices')) {
      if (showCorrect) {
        this.render3DShape(question, answer, options, showCorrect);
      } else {
        this.renderInteractive3DShape(question, answer, options);
      }
      return;
    }

    // Symmetry
    if (q.includes('symmetry') || q.includes('symmetrical') || q.includes('reflection')) {
      if (showCorrect) {
        this.renderSymmetry(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveSymmetry(question, answer, options);
      }
      return;
    }

    // Fractions (advanced — unlike fractions, compare, add, divide)
    if (q.includes('fraction') || (q.includes('/') && q.includes('denominator')) || q.includes('numerator')) {
      this.renderAdvancedFraction(question, answer, options, showCorrect);
      return;
    }

    // Decimals
    if (q.includes('decimal') || q.match(/\d+\.\d+/)) {
      if (showCorrect) {
        this.renderDecimal(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveDecimal(question, answer, options);
      }
      return;
    }

    // Percentages
    if (q.includes('percent') || q.includes('%')) {
      if (showCorrect) {
        this.renderPercentage(question, answer, showCorrect);
      } else {
        this.renderInteractivePercentage(question, answer);
      }
      return;
    }

    // Integers / negative numbers
    if (q.includes('integer') || q.includes('negative') || q.includes('-5') || q.includes('-1') || q.includes('left of zero')) {
      if (showCorrect) {
        this.renderIntegerNumberLine(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveInteger(question, answer, options);
      }
      return;
    }

    // Prime / composite
    if (q.includes('prime') || q.includes('composite') || q.includes('factor')) {
      if (showCorrect) {
        this.renderPrimeComposite(question, answer, options, showCorrect);
      } else {
        this.renderInteractivePrimeComposite(question, answer, options);
      }
      return;
    }

    // HCF / LCM
    if (q.includes('hcf') || q.includes('lcm') || q.includes('greatest common') || q.includes('least common')) {
      if (showCorrect) {
        this.renderHCFLCM(question, answer, showCorrect);
      } else {
        this.renderInteractiveHCFLCM(question, answer);
      }
      return;
    }

    // Number patterns / sequences
    if (q.includes('pattern') || q.includes('sequence') || q.includes('next two') || q.includes('progressive')) {
      if (showCorrect) {
        this.renderPattern(question, answer, showCorrect);
      } else {
        this.renderInteractivePattern(question, answer);
      }
      return;
    }

    // Roman numerals
    if (q.includes('roman') || q.match(/\b[IVXLCDM]+\b/)) {
      if (showCorrect) {
        this.renderRomanNumeral(question, answer, showCorrect);
      } else {
        this.renderInteractiveRomanNumeral(question, answer);
      }
      return;
    }

    // Multiplication (large numbers)
    const mulLargeMatch = q.match(/(\d+)\s*[×x*]\s*(\d+)/);
    if (mulLargeMatch && subject === 'maths') {
      const a = parseInt(mulLargeMatch[1]);
      const b = parseInt(mulLargeMatch[2]);
      this.renderMultiplication(a, b, answer, showCorrect);
      return;
    }

    // ─── Class 5 Science visuals (all interactive — tap to answer) ──

    // Physical / chemical changes
    if (q.includes('physical change') || q.includes('chemical change') || q.includes('melting') || q.includes('burning') || q.includes('rusting')) {
      if (showCorrect) {
        this.renderPhysicalChemical(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'physical_chemical');
      }
      return;
    }

    // Circulatory system
    if (q.includes('circulat') || q.includes('blood') || q.includes('artery') || q.includes('vein') || q.includes('heart')) {
      if (showCorrect) {
        this.renderCirculatory(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'circulatory');
      }
      return;
    }

    // Agriculture / crops
    if (q.includes('crop') || q.includes('kharif') || q.includes('rabi') || q.includes('agriculture') || q.includes('farming')) {
      if (showCorrect) {
        this.renderAgriculture(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'agriculture');
      }
      return;
    }

    // Natural disasters
    if (q.includes('earthquake') || q.includes('volcano') || q.includes('flood') || q.includes('drought') || q.includes('disaster') || q.includes('tsunami')) {
      if (showCorrect) {
        this.renderNaturalDisaster(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'disaster');
      }
      return;
    }

    // Mixtures / solutions
    if (q.includes('mixture') || q.includes('solution') || q.includes('suspension') || q.includes('colloid') || q.includes('filtration') || q.includes('evaporation') || q.includes('separation')) {
      if (showCorrect) {
        this.renderMixture(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'mixture');
      }
      return;
    }

    // Computer history
    if (q.includes('abacus') || q.includes('babbage') || q.includes('eniac') || q.includes('vacuum') || q.includes('analytical') || q.includes('generation') || q.includes('computer') || q.includes('calculating')) {
      if (showCorrect) {
        this.renderComputerHistory(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'computer');
      }
      return;
    }

    // Environment / resources
    if (q.includes('environment') || q.includes('biotic') || q.includes('abiotic') || q.includes('renewable') || q.includes('natural resource')) {
      if (showCorrect) {
        this.renderEnvironment(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'environment');
      }
      return;
    }

    // Transport
    if (q.includes('transport') || q.includes('airway') || q.includes('railway') || q.includes('roadway')) {
      if (showCorrect) {
        this.renderTransport(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'transport');
      }
      return;
    }

    // Air / gases
    if (q.includes('air') || q.includes('nitrogen') || q.includes('oxygen') || q.includes('gas') || q.includes('breeze') || q.includes('wind')) {
      if (showCorrect) {
        this.renderAirComposition(question, answer, options, showCorrect);
      } else {
        this.renderInteractiveOptionCards(question, answer, options, 'air');
      }
      return;
    }

    // Fallback: render option emojis as canvas objects
    this.renderOptionEmojis(options, question, answer, showCorrect);
  }

  // ─── INTERACTIVE: Addition — drag objects into basket, count along ──

  // ─── Scaffolding Level 2: Addition on a number line ──────────

  private renderAdditionNumberLine(a: number, b: number, question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const total = a + b;
    const max = Math.max(total + 2, 10);
    const numCount = max + 1;
    const spacing = Math.min(38, (this.width - 80) / numCount);
    const startX = this.width / 2 - ((numCount - 1) * spacing) / 2;
    const lineY = 180;
    let solved = false;

    // Title
    const title = new PIXI.Text(`Level 2: Use the number line! ${a} + ${b} = ?`, {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 30;
    container.addChild(title);

    // Subtitle
    const subtitle = new PIXI.Text('👆 Click numbers to hop the frog!', {
      fontSize: 12, fill: 0x6b7280,
    });
    subtitle.anchor.set(0.5);
    subtitle.x = this.width / 2;
    subtitle.y = 55;
    container.addChild(subtitle);

    // Number line
    const line = new PIXI.Graphics();
    line.lineStyle(3, 0xcbd5e1);
    line.moveTo(0, 0);
    line.lineTo((numCount - 1) * spacing, 0);
    line.x = startX;
    line.y = lineY;
    container.addChild(line);

    // Arrow at end
    const arrow = new PIXI.Graphics();
    arrow.beginFill(0xcbd5e1);
    arrow.moveTo((numCount - 1) * spacing, -5);
    arrow.lineTo((numCount - 1) * spacing + 10, 0);
    arrow.lineTo((numCount - 1) * spacing, 5);
    arrow.closePath();
    arrow.endFill();
    arrow.x = startX;
    arrow.y = lineY;
    container.addChild(arrow);

    // Frog starts at position 'a'
    const frog = new PIXI.Text('🐸', { fontSize: 24 });
    frog.anchor.set(0.5);
    frog.x = startX + a * spacing;
    frog.y = lineY - 25;
    container.addChild(frog);

    let frogPos = a;
    const frogText = new PIXI.Text(`Position: ${a}`, { fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold' });
    frogText.anchor.set(0.5);
    frogText.x = this.width / 2;
    frogText.y = lineY + 40;
    container.addChild(frogText);

    // Highlight starting position
    const startHighlight = new PIXI.Graphics();
    startHighlight.beginFill(0xfbbf24, 0.3);
    startHighlight.drawCircle(0, 0, 18);
    startHighlight.endFill();
    startHighlight.x = startX + a * spacing;
    startHighlight.y = lineY;
    container.addChildAt(startHighlight, container.getChildIndex(line) + 1);

    // Numbers
    for (let i = 0; i < numCount; i++) {
      const circle = new PIXI.Graphics();
      const isStart = i === a;
      circle.beginFill(isStart ? 0xfbbf24 : 0xffffff);
      circle.lineStyle(2, isStart ? 0xf59e0b : 0xd1d5db);
      circle.drawCircle(0, 0, 15);
      circle.endFill();
      circle.x = startX + i * spacing;
      circle.y = lineY;
      circle.eventMode = 'static';
      circle.cursor = 'pointer';
      container.addChild(circle);

      const numText = new PIXI.Text(String(i), {
        fontSize: 12, fill: 0x6b7280, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      circle.addChild(numText);

      circle.on('pointerover', () => { if (!solved) circle.scale.set(1.15); });
      circle.on('pointerout', () => { if (!solved) circle.scale.set(1); });

      circle.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        const target = i;
        const direction = target > frogPos ? 1 : -1;
        const hopStep = () => {
          if (frogPos === target) return;
          frogPos += direction;
          frog.x = startX + frogPos * spacing;
          this.playSound('whoosh');
          this.callbacks.onSpeak?.(String(frogPos));
          frogText.text = `Position: ${frogPos}`;
          gsap.to(frog, { y: lineY - 40, duration: 0.15, yoyo: true, repeat: 1 });

          if (frogPos !== target) {
            setTimeout(hopStep, 350);
          } else {
            if (frogPos === total && !solved) {
              solved = true;
              frogText.text = `🎉 ${a} + ${b} = ${total}!`;
              frogText.style.fill = 0x22c55e;
              circle.clear();
              circle.beginFill(0x22c55e);
              circle.lineStyle(2, 0x16a34a);
              circle.drawCircle(0, 0, 15);
              circle.endFill();
              this.playSound('success');
              this.celebrate(container, this.width / 2, lineY - 20);
              setTimeout(() => this.callbacks.onAnswer?.(String(total)), 1500);
            }
          }
        };
        hopStep();
      });
    }

    // Mascot intro
    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Start at ${a} on the number line. Now hop forward ${b} times to find the answer!`), 500);

    // Show-me: auto-demonstrate hopping to the answer
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Hop forward like this...');
        let step = 0;
        const demoHop = () => {
          if (step >= b || solved) return;
          frogPos = a + step + 1;
          frog.x = startX + frogPos * spacing;
          this.playSound('whoosh');
          this.callbacks.onSpeak?.(String(frogPos));
          frogText.text = `Position: ${frogPos}`;
          gsap.to(frog, { y: lineY - 40, duration: 0.15, yoyo: true, repeat: 1 });
          step++;
          if (step < b) {
            setTimeout(demoHop, 600);
          } else {
            setTimeout(() => {
              this.callbacks.onSpeak?.(`See? ${a} plus ${b} equals ${total}! Now you try!`);
              // Reset frog to start
              frogPos = a;
              frog.x = startX + a * spacing;
              frogText.text = `Position: ${a}`;
            }, 800);
          }
        };
        setTimeout(demoHop, 1000);
      }, 1500);
    }
  }

  // ─── Scaffolding Level 1: Addition abstract (symbols only) ───

  private renderAdditionAbstract(a: number, b: number, question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const total = a + b;
    let solved = false;

    // Title
    const title = new PIXI.Text('Level 1: Solve it!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 30;
    container.addChild(title);

    // Equation display
    const equation = new PIXI.Text(`${a} + ${b} = ?`, {
      fontSize: 48, fill: 0x1f2937, fontWeight: 'bold',
    });
    equation.anchor.set(0.5);
    equation.x = this.width / 2;
    equation.y = 120;
    container.addChild(equation);

    // Input display
    const inputBox = new PIXI.Graphics();
    inputBox.beginFill(0xfef3c7);
    inputBox.lineStyle(3, 0xf59e0b);
    inputBox.drawRoundedRect(-40, -30, 80, 60, 10);
    inputBox.endFill();
    inputBox.x = this.width / 2;
    inputBox.y = 220;
    container.addChild(inputBox);

    const inputText = new PIXI.Text('?', {
      fontSize: 36, fill: 0xf59e0b, fontWeight: 'bold',
    });
    inputText.anchor.set(0.5);
    inputText.x = this.width / 2;
    inputText.y = 220;
    container.addChild(inputText);

    let inputValue = '';

    // Number pad (0-9)
    const padStartX = this.width / 2 - 90;
    const padStartY = 300;
    const btnSize = 50;
    const btnSpacing = 8;

    for (let i = 0; i < 10; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const btn = new PIXI.Graphics();
      btn.beginFill(0x6c5ce7);
      btn.drawRoundedRect(-btnSize / 2, -btnSize / 2, btnSize, btnSize, 8);
      btn.endFill();
      btn.x = padStartX + col * (btnSize + btnSpacing);
      btn.y = padStartY + row * (btnSize + btnSpacing);
      btn.eventMode = 'static';
      btn.cursor = 'pointer';
      container.addChild(btn);

      const btnText = new PIXI.Text(String(i), {
        fontSize: 20, fill: 0xffffff, fontWeight: 'bold',
      });
      btnText.anchor.set(0.5);
      btn.addChild(btnText);

      // Special: last button is 0, reposition
      if (i === 0) {
        btn.x = padStartX + (btnSize + btnSpacing); // center the 0
      }

      btn.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        inputValue += String(i === 0 && inputValue === '' ? '' : i);
        if (inputValue.length > 2) inputValue = inputValue.slice(-2);
        inputText.text = inputValue || '?';
        gsap.to(btn.scale, { x: 0.9, y: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
      });
    }

    // Submit button
    const submitBtn = new PIXI.Graphics();
    submitBtn.beginFill(0x22c55e);
    submitBtn.drawRoundedRect(-50, -20, 100, 40, 10);
    submitBtn.endFill();
    submitBtn.x = this.width / 2;
    submitBtn.y = padStartY + 4 * (btnSize + btnSpacing) - 10;
    submitBtn.eventMode = 'static';
    submitBtn.cursor = 'pointer';
    container.addChild(submitBtn);

    const submitText = new PIXI.Text('✓ Check', {
      fontSize: 16, fill: 0xffffff, fontWeight: 'bold',
    });
    submitText.anchor.set(0.5);
    submitBtn.addChild(submitText);

    submitBtn.on('pointertap', () => {
      if (solved) return;
      const val = parseInt(inputValue);
      if (val === total) {
        solved = true;
        inputText.text = String(total);
        inputText.style.fill = 0x22c55e;
        equation.text = `${a} + ${b} = ${total}`;
        this.playSound('success');
        this.celebrate(container, this.width / 2, 220);
        this.callbacks.onSpeak?.(`Correct! ${a} plus ${b} equals ${total}!`);
        setTimeout(() => this.callbacks.onAnswer?.(String(total)), 1500);
      } else {
        this.playSound('error');
        this.callbacks.onMascotMood?.('sad');
        this.wrongFeedback(container, this.width / 2, 220);
        this.callbacks.onSpeak?.(`Not quite. Try again!`);
        inputValue = '';
        inputText.text = '?';
        gsap.to(inputBox, { x: this.width / 2 + 8, duration: 0.04, yoyo: true, repeat: 6, onComplete: () => { inputBox.x = this.width / 2; } });
      }
    });

    // Clear button
    const clearBtn = new PIXI.Graphics();
    clearBtn.beginFill(0xef4444);
    clearBtn.drawRoundedRect(-30, -15, 60, 30, 8);
    clearBtn.endFill();
    clearBtn.x = this.width / 2 + 100;
    clearBtn.y = padStartY + 4 * (btnSize + btnSpacing) - 10;
    clearBtn.eventMode = 'static';
    clearBtn.cursor = 'pointer';
    container.addChild(clearBtn);

    const clearText = new PIXI.Text('Clear', {
      fontSize: 12, fill: 0xffffff, fontWeight: 'bold',
    });
    clearText.anchor.set(0.5);
    clearBtn.addChild(clearText);

    clearBtn.on('pointertap', () => {
      if (solved) return;
      this.playSound('whoosh');
      inputValue = '';
      inputText.text = '?';
    });

    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`What is ${a} plus ${b}? Type your answer and press check!`), 500);
  }

  // ─── Scaffolding Level 2: Subtraction on a number line ──────

  private renderSubtractionNumberLine(a: number, b: number, question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const result = a - b;
    const max = a + 2;
    const numCount = max + 1;
    const spacing = Math.min(38, (this.width - 80) / numCount);
    const startX = this.width / 2 - ((numCount - 1) * spacing) / 2;
    const lineY = 180;
    let solved = false;

    // Title
    const title = new PIXI.Text(`Level 2: Use the number line! ${a} - ${b} = ?`, {
      fontSize: 14, fill: 0xef4444, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 30;
    container.addChild(title);

    const subtitle = new PIXI.Text('👆 Click numbers to hop the frog BACKWARD!', {
      fontSize: 12, fill: 0x6b7280,
    });
    subtitle.anchor.set(0.5);
    subtitle.x = this.width / 2;
    subtitle.y = 55;
    container.addChild(subtitle);

    // Number line
    const line = new PIXI.Graphics();
    line.lineStyle(3, 0xcbd5e1);
    line.moveTo(0, 0);
    line.lineTo((numCount - 1) * spacing, 0);
    line.x = startX;
    line.y = lineY;
    container.addChild(line);

    // Frog starts at position 'a'
    const frog = new PIXI.Text('🐸', { fontSize: 24 });
    frog.anchor.set(0.5);
    frog.x = startX + a * spacing;
    frog.y = lineY - 25;
    container.addChild(frog);

    let frogPos = a;
    const frogText = new PIXI.Text(`Position: ${a}`, { fontSize: 16, fill: 0xef4444, fontWeight: 'bold' });
    frogText.anchor.set(0.5);
    frogText.x = this.width / 2;
    frogText.y = lineY + 40;
    container.addChild(frogText);

    // Highlight starting position
    const startHighlight = new PIXI.Graphics();
    startHighlight.beginFill(0xfbbf24, 0.3);
    startHighlight.drawCircle(0, 0, 18);
    startHighlight.endFill();
    startHighlight.x = startX + a * spacing;
    startHighlight.y = lineY;
    container.addChildAt(startHighlight, container.getChildIndex(line) + 1);

    // Numbers
    for (let i = 0; i < numCount; i++) {
      const circle = new PIXI.Graphics();
      const isStart = i === a;
      const isAnswer = i === result;
      circle.beginFill(isStart ? 0xfbbf24 : 0xffffff);
      circle.lineStyle(2, isStart ? 0xf59e0b : 0xd1d5db);
      circle.drawCircle(0, 0, 15);
      circle.endFill();
      circle.x = startX + i * spacing;
      circle.y = lineY;
      circle.eventMode = 'static';
      circle.cursor = 'pointer';
      container.addChild(circle);

      const numText = new PIXI.Text(String(i), {
        fontSize: 12, fill: 0x6b7280, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      circle.addChild(numText);

      circle.on('pointerover', () => { if (!solved) circle.scale.set(1.15); });
      circle.on('pointerout', () => { if (!solved) circle.scale.set(1); });

      circle.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        const target = i;
        const direction = target > frogPos ? 1 : -1;
        const hopStep = () => {
          if (frogPos === target) return;
          frogPos += direction;
          frog.x = startX + frogPos * spacing;
          this.playSound('whoosh');
          this.callbacks.onSpeak?.(String(frogPos));
          frogText.text = `Position: ${frogPos}`;
          gsap.to(frog, { y: lineY - 40, duration: 0.15, yoyo: true, repeat: 1 });

          if (frogPos !== target) {
            setTimeout(hopStep, 350);
          } else {
            if (frogPos === result && !solved) {
              solved = true;
              frogText.text = `🎉 ${a} - ${b} = ${result}!`;
              frogText.style.fill = 0x22c55e;
              circle.clear();
              circle.beginFill(0x22c55e);
              circle.lineStyle(2, 0x16a34a);
              circle.drawCircle(0, 0, 15);
              circle.endFill();
              this.playSound('success');
              this.celebrate(container, this.width / 2, lineY - 20);
              setTimeout(() => this.callbacks.onAnswer?.(String(result)), 1500);
            }
          }
        };
        hopStep();
      });
    }

    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Start at ${a} on the number line. Now hop BACKWARD ${b} times to find the answer!`), 500);

    // Show-me
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Hop backward like this...');
        let step = 0;
        const demoHop = () => {
          if (step >= b || solved) return;
          frogPos = a - step - 1;
          frog.x = startX + frogPos * spacing;
          this.playSound('whoosh');
          this.callbacks.onSpeak?.(String(frogPos));
          frogText.text = `Position: ${frogPos}`;
          gsap.to(frog, { y: lineY - 40, duration: 0.15, yoyo: true, repeat: 1 });
          step++;
          if (step < b) {
            setTimeout(demoHop, 600);
          } else {
            setTimeout(() => {
              this.callbacks.onSpeak?.(`See? ${a} minus ${b} equals ${result}! Now you try!`);
              frogPos = a;
              frog.x = startX + a * spacing;
              frogText.text = `Position: ${a}`;
            }, 800);
          }
        };
        setTimeout(demoHop, 1000);
      }, 1500);
    }
  }

  // ─── Scaffolding Level 1: Subtraction abstract (symbols only) ─

  private renderSubtractionAbstract(a: number, b: number, question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const result = a - b;
    let solved = false;

    // Title
    const title = new PIXI.Text('Level 1: Solve it!', {
      fontSize: 14, fill: 0xef4444, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 30;
    container.addChild(title);

    // Equation display
    const equation = new PIXI.Text(`${a} - ${b} = ?`, {
      fontSize: 48, fill: 0x1f2937, fontWeight: 'bold',
    });
    equation.anchor.set(0.5);
    equation.x = this.width / 2;
    equation.y = 120;
    container.addChild(equation);

    // Input display
    const inputBox = new PIXI.Graphics();
    inputBox.beginFill(0xfef3c7);
    inputBox.lineStyle(3, 0xf59e0b);
    inputBox.drawRoundedRect(-40, -30, 80, 60, 10);
    inputBox.endFill();
    inputBox.x = this.width / 2;
    inputBox.y = 220;
    container.addChild(inputBox);

    const inputText = new PIXI.Text('?', {
      fontSize: 36, fill: 0xf59e0b, fontWeight: 'bold',
    });
    inputText.anchor.set(0.5);
    inputText.x = this.width / 2;
    inputText.y = 220;
    container.addChild(inputText);

    let inputValue = '';

    // Number pad (1-9, then 0)
    const padStartX = this.width / 2 - 90;
    const padStartY = 300;
    const btnSize = 50;
    const btnSpacing = 8;

    for (let i = 1; i <= 9; i++) {
      const col = (i - 1) % 3;
      const row = Math.floor((i - 1) / 3);
      const btn = new PIXI.Graphics();
      btn.beginFill(0xef4444);
      btn.drawRoundedRect(-btnSize / 2, -btnSize / 2, btnSize, btnSize, 8);
      btn.endFill();
      btn.x = padStartX + col * (btnSize + btnSpacing);
      btn.y = padStartY + row * (btnSize + btnSpacing);
      btn.eventMode = 'static';
      btn.cursor = 'pointer';
      container.addChild(btn);

      const btnText = new PIXI.Text(String(i), {
        fontSize: 20, fill: 0xffffff, fontWeight: 'bold',
      });
      btnText.anchor.set(0.5);
      btn.addChild(btnText);

      btn.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        inputValue += String(i);
        if (inputValue.length > 2) inputValue = inputValue.slice(-2);
        inputText.text = inputValue;
        gsap.to(btn.scale, { x: 0.9, y: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
      });
    }

    // 0 button
    const zeroBtn = new PIXI.Graphics();
    zeroBtn.beginFill(0xef4444);
    zeroBtn.drawRoundedRect(-btnSize / 2, -btnSize / 2, btnSize, btnSize, 8);
    zeroBtn.endFill();
    zeroBtn.x = padStartX + (btnSize + btnSpacing);
    zeroBtn.y = padStartY + 3 * (btnSize + btnSpacing);
    zeroBtn.eventMode = 'static';
    zeroBtn.cursor = 'pointer';
    container.addChild(zeroBtn);

    const zeroText = new PIXI.Text('0', { fontSize: 20, fill: 0xffffff, fontWeight: 'bold' });
    zeroText.anchor.set(0.5);
    zeroBtn.addChild(zeroText);

    zeroBtn.on('pointertap', () => {
      if (solved) return;
      this.playSound('tap');
      if (inputValue.length > 0) inputValue += '0';
      inputText.text = inputValue || '?';
      gsap.to(zeroBtn.scale, { x: 0.9, y: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    });

    // Submit button
    const submitBtn = new PIXI.Graphics();
    submitBtn.beginFill(0x22c55e);
    submitBtn.drawRoundedRect(-50, -20, 100, 40, 10);
    submitBtn.endFill();
    submitBtn.x = this.width / 2;
    submitBtn.y = padStartY + 4 * (btnSize + btnSpacing) + 10;
    submitBtn.eventMode = 'static';
    submitBtn.cursor = 'pointer';
    container.addChild(submitBtn);

    const submitText = new PIXI.Text('✓ Check', { fontSize: 16, fill: 0xffffff, fontWeight: 'bold' });
    submitText.anchor.set(0.5);
    submitBtn.addChild(submitText);

    submitBtn.on('pointertap', () => {
      if (solved) return;
      const val = parseInt(inputValue);
      if (val === result) {
        solved = true;
        inputText.text = String(result);
        inputText.style.fill = 0x22c55e;
        equation.text = `${a} - ${b} = ${result}`;
        this.playSound('success');
        this.celebrate(container, this.width / 2, 220);
        this.callbacks.onSpeak?.(`Correct! ${a} minus ${b} equals ${result}!`);
        setTimeout(() => this.callbacks.onAnswer?.(String(result)), 1500);
      } else {
        this.playSound('error');
        this.callbacks.onMascotMood?.('sad');
        this.wrongFeedback(container, this.width / 2, 220);
        this.callbacks.onSpeak?.('Not quite. Try again!');
        inputValue = '';
        inputText.text = '?';
        gsap.to(inputBox, { x: this.width / 2 + 8, duration: 0.04, yoyo: true, repeat: 6, onComplete: () => { inputBox.x = this.width / 2; } });
      }
    });

    // Clear button
    const clearBtn = new PIXI.Graphics();
    clearBtn.beginFill(0x6b7280);
    clearBtn.drawRoundedRect(-30, -15, 60, 30, 8);
    clearBtn.endFill();
    clearBtn.x = this.width / 2 + 100;
    clearBtn.y = padStartY + 4 * (btnSize + btnSpacing) + 10;
    clearBtn.eventMode = 'static';
    clearBtn.cursor = 'pointer';
    container.addChild(clearBtn);

    const clearText = new PIXI.Text('Clear', { fontSize: 12, fill: 0xffffff, fontWeight: 'bold' });
    clearText.anchor.set(0.5);
    clearBtn.addChild(clearText);

    clearBtn.on('pointertap', () => {
      if (solved) return;
      this.playSound('whoosh');
      inputValue = '';
      inputText.text = '?';
    });

    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`What is ${a} minus ${b}? Type your answer and press check!`), 500);
  }

  private renderInteractiveAddition(a: number, b: number, question: string, answer: string): void {
    // ─── Scaffolding: branch on scaffold level ──────────────
    const scaffoldLevel = this.getScaffoldLevel(question, 'maths');
    if (scaffoldLevel === 2) {
      this.renderAdditionNumberLine(a, b, question, answer);
      return;
    }
    if (scaffoldLevel === 1) {
      this.renderAdditionAbstract(a, b, question, answer);
      return;
    }
    // Level 3: full manipulatives (default behavior below)

    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);
    this.createFeedbackDisplay(container);
    this.formativeFeedback.reset();

    // Adaptive difficulty: if easier mode, pre-place group A objects in basket
    const prePlaceA = this.adaptiveEasier;

    const emoji = this.getEmojiForQuestion(question);
    const total = a + b;
    const objSize = 36;
    const objSpacing = 42;

    // Title
    const titleText = prePlaceA
      ? `Easier mode! ${a} are already in the basket. Drag the remaining ${b}!`
      : `Drag ALL objects into the basket! (${a} + ${b} = ?)`;
    const title = new PIXI.Text(titleText, {
      fontSize: 14, fill: prePlaceA ? 0x3b82f6 : 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 25;
    container.addChild(title);

    // Group labels
    const groupALabel = new PIXI.Text(`${a}`, { fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold' });
    groupALabel.anchor.set(0.5);
    groupALabel.x = this.width / 2 - 100;
    groupALabel.y = 55;
    container.addChild(groupALabel);

    const groupBLabel = new PIXI.Text(`${b}`, { fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold' });
    groupBLabel.anchor.set(0.5);
    groupBLabel.x = this.width / 2 + 100;
    groupBLabel.y = 55;
    container.addChild(groupBLabel);

    // Basket
    const basketY = this.height - 100;
    const basket = new PIXI.Graphics();
    basket.beginFill(0x92400e, 0.2);
    basket.lineStyle(3, 0x92400e);
    basket.drawRoundedRect(-60, -30, 120, 60, 8);
    basket.endFill();
    basket.x = this.width / 2;
    basket.y = basketY;
    container.addChild(basket);

    const basketLabel = new PIXI.Text('🧺 Drop here!', { fontSize: 14, fill: 0x92400e, fontWeight: 'bold' });
    basketLabel.anchor.set(0.5);
    basketLabel.x = this.width / 2;
    basketLabel.y = basketY - 40;
    container.addChild(basketLabel);

    // Count display
    const initialCount = prePlaceA ? a : 0;
    const countText = new PIXI.Text(`Count: ${initialCount}`, { fontSize: 22, fill: 0x6c5ce7, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = this.width / 2;
    countText.y = basketY + 50;
    container.addChild(countText);

    // Reset button
    const resetBtn = new PIXI.Text('↩️ Reset', { fontSize: 14, fill: 0xef4444, fontWeight: 'bold' });
    resetBtn.anchor.set(0.5);
    resetBtn.x = this.width - 50;
    resetBtn.y = 25;
    resetBtn.eventMode = 'static';
    resetBtn.cursor = 'pointer';
    container.addChild(resetBtn);

    // Create draggable objects
    let placedCount = initialCount; // In easier mode, group A is pre-placed
    let solved = false;
    const allObjects: { sprite: PIXI.DisplayObject; placed: boolean; origX: number; origY: number; basketIdx: number }[] = [];

    const groupAY = 90;
    const groupBY = 90;
    const aStartX = this.width / 2 - 100 - ((a - 1) * objSpacing) / 2;
    const bStartX = this.width / 2 + 100 - ((b - 1) * objSpacing) / 2;

    resetBtn.on('pointertap', () => {
      if (solved) return;
      this.playSound('whoosh');
      placedCount = 0;
      countText.text = 'Count: 0';
      countText.style.fill = 0x6c5ce7;
      allObjects.forEach(d => {
        d.placed = false;
        d.basketIdx = -1;
        gsap.to(d.sprite, { x: d.origX, y: d.origY, alpha: 1, scale: 1, duration: 0.3 });
      });
    });

    const createDraggable = (x: number, y: number, _idx: number) => {
      const obj = this.createObjectSprite(emoji, objSize);
      obj.x = x;
      obj.y = y;
      obj.eventMode = 'static';
      obj.cursor = 'grab';
      // Larger hit area for touch (44px minimum for accessibility)
      obj.hitArea = new PIXI.Circle(0, 0, Math.max(22, objSize * 0.7));
      container.addChild(obj);

      const data = { sprite: obj, placed: false, origX: x, origY: y, basketIdx: -1, dragging: false, offsetX: 0, offsetY: 0 };

      obj.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
        if (solved) return;
        data.dragging = true;
        obj.cursor = 'grabbing';
        this.playSound('pickup');
        const pos = e.global;
        data.offsetX = pos.x - obj.x;
        data.offsetY = pos.y - obj.y;
        container.setChildIndex(obj, container.children.length - 1);
      });

      obj.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
        if (!data.dragging) return;
        const pos = e.global;
        obj.x = pos.x - data.offsetX;
        obj.y = pos.y - data.offsetY;
      });

      const handleDrop = () => {
        if (!data.dragging) return;
        data.dragging = false;
        obj.cursor = 'grab';

        const dx = obj.x - this.width / 2;
        const dy = obj.y - basketY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Larger drop zone (100px) for forgiving touch interaction
        if (dist < 100) {
          // Dropped in basket
          if (data.placed) {
            // Already in basket — just reposition
            placedCount++;
          } else {
            data.placed = true;
            placedCount++;
          }
          data.basketIdx = placedCount;
          this.playSound('pop');
          gsap.to(obj, {
            x: this.width / 2 + (placedCount % 5 - 2) * 18,
            y: basketY + Math.floor(placedCount / 5) * 15,
            alpha: 0.8, scale: 0.6, duration: 0.3,
          });
          this.callbacks.onSpeak?.(String(placedCount));
          this.playSound('count');
          countText.text = `Count: ${placedCount}`;
          gsap.to(countText.scale, { x: 1.3, y: 1.3, duration: 0.2, yoyo: true, repeat: 1 });
          this.callbacks.onMascotMood?.('happy');
          this.tryFeedback({ current: placedCount, target: total, unit: 'objects', exceeded: placedCount > total });

          if (placedCount === total && !solved) {
            solved = true;
            countText.text = `Total: ${total}! 🎉`;
            countText.style.fill = 0x22c55e;
            this.playSound('success');
            this.callbacks.onSpeak?.(`Total is ${total}! Great job!`);
            this.celebrate(container, this.width / 2, basketY - 20);
            setTimeout(() => this.callbacks.onAnswer?.(String(total)), 1500);
          }
        } else {
          // Dropped outside basket
          if (data.placed) {
            // Taking out of basket
            data.placed = false;
            placedCount = Math.max(0, placedCount - 1);
            countText.text = `Count: ${placedCount}`;
            this.playSound('whoosh');
          }
          gsap.to(obj, { x: data.origX, y: data.origY, alpha: 1, scale: 1, duration: 0.3 });
        }
      };

      obj.on('pointerup', handleDrop);
      obj.on('pointerupoutside', () => {
        if (!data.dragging) return;
        data.dragging = false;
        obj.cursor = 'grab';
        gsap.to(obj, { x: data.origX, y: data.origY, alpha: 1, scale: 1, duration: 0.3 });
      });

      allObjects.push(data);
    };

    // Create group A objects
    for (let i = 0; i < a; i++) {
      createDraggable(aStartX + i * objSpacing, groupAY, i);
    }
    // Create group B objects
    for (let i = 0; i < b; i++) {
      createDraggable(bStartX + i * objSpacing, groupBY, a + i);
    }

    // In adaptive/easier mode, pre-place group A objects in the basket
    if (prePlaceA) {
      allObjects.slice(0, a).forEach((d, i) => {
        d.placed = true;
        d.basketIdx = i + 1;
        d.sprite.x = this.width / 2 + ((i + 1) % 5 - 2) * 18;
        d.sprite.y = basketY + Math.floor((i + 1) / 5) * 15;
        d.sprite.alpha = 0.8;
        d.sprite.scale.set(0.6);
      });
    }

    // Animate objects appearing
    allObjects.forEach((d, i) => {
      if (d.placed) return; // Skip pre-placed
      d.sprite.alpha = 0;
      d.sprite.scale.set(0);
      gsap.to(d.sprite, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: i * 0.08 });
    });

    // Mascot intro
    this.callbacks.onMascotMood?.('happy');
    if (prePlaceA) {
      setTimeout(() => this.callbacks.onSpeak?.(`${a} are already in the basket! Now drag the remaining ${b}! Count with me!`), 500);
    } else {
      setTimeout(() => this.callbacks.onSpeak?.(`Drag ${total} objects into the basket! Count with me!`), 500);
    }

    // "Show me" guided mode: auto-demonstrate dragging the first object
    if (this.showMeActive) {
      const firstObj = allObjects[prePlaceA ? a : 0]; // First non-pre-placed object
      if (firstObj && !firstObj.placed) {
        setTimeout(() => {
          this.callbacks.onSpeak?.('Watch me! Drag like this...');
          this.playSound('pickup');
          gsap.to(firstObj.sprite, {
            x: this.width / 2, y: basketY,
            duration: 1.0, ease: 'power2.inOut',
            onComplete: () => {
              if (!firstObj.placed && !solved) {
                firstObj.placed = true;
                placedCount++;
                this.playSound('pop');
                this.callbacks.onSpeak?.(String(placedCount));
                countText.text = `Count: ${placedCount}`;
                gsap.to(firstObj.sprite, { alpha: 0.8, scale: 0.6, duration: 0.2 });
                gsap.to(countText.scale, { x: 1.3, y: 1.3, duration: 0.2, yoyo: true, repeat: 1 });
              }
            },
          });
        }, 1500);
      }
    }
  }

  // ─── INTERACTIVE: Subtraction — drag objects away to take away ──

  private renderInteractiveSubtraction(a: number, b: number, question: string, answer: string): void {
    // ─── Scaffolding: branch on scaffold level ──────────────
    const scaffoldLevel = this.getScaffoldLevel(question, 'maths');
    if (scaffoldLevel === 2) {
      this.renderSubtractionNumberLine(a, b, question, answer);
      return;
    }
    if (scaffoldLevel === 1) {
      this.renderSubtractionAbstract(a, b, question, answer);
      return;
    }
    // Level 3: full manipulatives (default behavior below)

    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);
    this.createFeedbackDisplay(container);
    this.formativeFeedback.reset();

    const emoji = this.getEmojiForQuestion(question);
    const result = a - b;
    const objSize = 36;
    const objSpacing = 42;
    let solved = false;

    // Title
    const title = new PIXI.Text(`Drag ${b} objects into the trash to take them away!`, {
      fontSize: 13, fill: 0xef4444, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 25;
    container.addChild(title);

    // Count display
    const countText = new PIXI.Text(`Remaining: ${a}`, { fontSize: 22, fill: 0x6c5ce7, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = this.width / 2;
    countText.y = 55;
    container.addChild(countText);

    // Trash bin
    const trashY = this.height - 100;
    const trash = new PIXI.Graphics();
    trash.beginFill(0xef4444, 0.15);
    trash.lineStyle(3, 0xef4444);
    trash.drawRoundedRect(-50, -30, 100, 60, 8);
    trash.endFill();
    trash.x = this.width / 2;
    trash.y = trashY;
    container.addChild(trash);

    const trashLabel = new PIXI.Text('🗑️ Take Away', { fontSize: 14, fill: 0xef4444, fontWeight: 'bold' });
    trashLabel.anchor.set(0.5);
    trashLabel.x = this.width / 2;
    trashLabel.y = trashY - 40;
    container.addChild(trashLabel);

    // Create objects
    let removedCount = 0;
    const startX = this.width / 2 - ((a - 1) * objSpacing) / 2;
    const objY = 120;

    for (let i = 0; i < a; i++) {
      const obj = this.createObjectSprite(emoji, objSize);
      obj.x = startX + i * objSpacing;
      obj.y = objY;
      obj.eventMode = 'static';
      obj.hitArea = new PIXI.Circle(0, 0, Math.max(22, objSize * 0.7));
      obj.cursor = 'grab';
      obj.alpha = 0;
      obj.scale.set(0);
      container.addChild(obj);
      gsap.to(obj, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: i * 0.08 });

      const data = { dragging: false, offsetX: 0, offsetY: 0, removed: false, origX: obj.x, origY: obj.y };

      obj.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
        if (data.removed || solved) return;
        data.dragging = true;
        obj.cursor = 'grabbing';
        this.playSound('pickup');
        const pos = e.global;
        data.offsetX = pos.x - obj.x;
        data.offsetY = pos.y - obj.y;
        container.setChildIndex(obj, container.children.length - 1);
      });

      obj.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
        if (!data.dragging) return;
        const pos = e.global;
        obj.x = pos.x - data.offsetX;
        obj.y = pos.y - data.offsetY;
      });

      const checkDrop = () => {
        if (!data.dragging) return;
        data.dragging = false;
        obj.cursor = 'grab';
        const dx = obj.x - this.width / 2;
        const dy = obj.y - trashY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 60 && !data.removed) {
          data.removed = true;
          removedCount++;
          this.playSound('pop');
          gsap.to(obj, { alpha: 0, pixi: { scale: 0 }, duration: 0.3, x: this.width / 2, y: trashY });
          this.callbacks.onSpeak?.(`${removedCount} taken away`);
          const remaining = a - removedCount;
          countText.text = `Remaining: ${remaining}`;
          gsap.to(countText.scale, { x: 1.3, y: 1.3, duration: 0.2, yoyo: true, repeat: 1 });
          this.callbacks.onMascotMood?.('happy');
          this.tryFeedback({ current: removedCount, target: b, unit: 'taken away', exceeded: removedCount > b });

          if (removedCount === b && !solved) {
            solved = true;
            countText.text = `Answer: ${result}! 🎉`;
            countText.style.fill = 0x22c55e;
            this.playSound('success');
            this.callbacks.onSpeak?.(`${remaining} left! The answer is ${result}. Great job!`);
            this.celebrate(container, this.width / 2, trashY - 20);
            setTimeout(() => this.callbacks.onAnswer?.(String(result)), 1500);
          }
        } else if (!data.removed) {
          gsap.to(obj, { x: data.origX, y: data.origY, duration: 0.3 });
        }
      };

      obj.on('pointerup', checkDrop);
      obj.on('pointerupoutside', checkDrop);
    }

    // Show-me: auto-drag the first object to trash
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Drag like this to the trash...');
        const firstObj = container.children.find(c =>
          c instanceof PIXI.Graphics && c.alpha > 0.5 && (c as PIXI.Graphics).scale.x > 0.5
        ) as PIXI.Graphics | undefined;
        if (firstObj) {
          this.playSound('pickup');
          gsap.to(firstObj, {
            x: this.width / 2, y: trashY,
            duration: 1.0, ease: 'power2.inOut',
            onComplete: () => {
              this.playSound('pop');
              gsap.to(firstObj, { alpha: 0, pixi: { scale: 0 }, duration: 0.3 });
            },
          });
        }
      }, 1500);
    }
  }

  private renderInteractiveNumberLineChallenge(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const ansNum = parseInt(answer) || 0;
    const max = 15;
    const numCount = max + 1;
    const spacing = Math.min(38, (this.width - 80) / numCount);
    const startX = this.width / 2 - ((numCount - 1) * spacing) / 2;
    const lineY = 150;
    let solved = false;

    // Title
    const title = new PIXI.Text('👆 Click numbers to hop! Find the answer.', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 30;
    container.addChild(title);

    // Line
    const line = new PIXI.Graphics();
    line.lineStyle(2, 0xcbd5e1);
    line.moveTo(0, 0);
    line.lineTo((numCount - 1) * spacing, 0);
    line.x = startX;
    line.y = lineY;
    container.addChild(line);

    // Frog
    const frog = new PIXI.Text('🐸', { fontSize: 24 });
    frog.anchor.set(0.5);
    frog.x = startX;
    frog.y = lineY - 25;
    container.addChild(frog);

    let frogPos = 0;
    const frogText = new PIXI.Text('Position: 0', { fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold' });
    frogText.anchor.set(0.5);
    frogText.x = this.width / 2;
    frogText.y = lineY + 40;
    container.addChild(frogText);

    // Numbers
    for (let i = 0; i < numCount; i++) {
      const circle = new PIXI.Graphics();
      circle.beginFill(0xffffff);
      circle.lineStyle(2, 0xd1d5db);
      circle.drawCircle(0, 0, 15);
      circle.endFill();
      circle.x = startX + i * spacing;
      circle.y = lineY;
      circle.eventMode = 'static';
      circle.cursor = 'pointer';
      container.addChild(circle);

      const numText = new PIXI.Text(String(i), {
        fontSize: 12, fill: 0x6b7280, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      numText.x = startX + i * spacing;
      numText.y = lineY;
      circle.addChild(numText);

      // Hover
      circle.on('pointerover', () => { if (!solved) circle.scale.set(1.15); });
      circle.on('pointerout', () => { if (!solved) circle.scale.set(1); });

      circle.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        const target = i;
        const direction = target > frogPos ? 1 : -1;
        const hopStep = () => {
          if (frogPos === target) return;
          frogPos += direction;
          frog.x = startX + frogPos * spacing;
          this.playSound('whoosh');
          this.callbacks.onSpeak?.(String(frogPos));
          frogText.text = `Position: ${frogPos}`;

          // Frog hop animation
          gsap.to(frog, { y: lineY - 40, duration: 0.15, yoyo: true, repeat: 1 });

          if (frogPos !== target) {
            setTimeout(hopStep, 350);
          } else {
            // Check if this is the answer
            if (frogPos === ansNum && !solved) {
              solved = true;
              frogText.text = `🎉 Answer: ${ansNum}!`;
              frogText.style.fill = 0x22c55e;
              circle.clear();
              circle.beginFill(0x22c55e);
              circle.lineStyle(2, 0x16a34a);
              circle.drawCircle(0, 0, 15);
              circle.endFill();
              this.playSound('success');
              this.callbacks.onSpeak?.(`You found it! ${ansNum} is the answer!`);
              this.celebrate(container, startX + ansNum * spacing, lineY - 20);
              setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
            }
          }
        };
        hopStep();
      });
    }

    // Mascot intro
    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Hop the frog to find the answer!`), 500);

    // Show-me: auto-hop the frog to number 1
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Click a number to hop!');
        this.playSound('whoosh');
        gsap.to(frog, { y: lineY - 40, duration: 0.15, yoyo: true, repeat: 1 });
        gsap.to(frog, { x: startX + spacing, duration: 0.5, delay: 0.3, onComplete: () => {
          frogPos = 1;
          this.callbacks.onSpeak?.('1!');
          this.playSound('count');
          frogText.text = 'Position: 1';
        }});
      }, 1500);
    }
  }

  // ─── INTERACTIVE: Fraction — click slices to fill ────────────

  private renderInteractiveFraction(question: string, answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);
    this.createFeedbackDisplay(container);
    this.formativeFeedback.reset();

    const q = question.toLowerCase();
    let parts = 2;
    let targetFilled = 1;
    if (q.includes('quarter') || q.includes('1/4')) { parts = 4; targetFilled = 1; }
    else if (q.includes('third') || q.includes('1/3')) { parts = 3; targetFilled = 1; }
    else if (q.includes('half') || q.includes('1/2')) { parts = 2; targetFilled = 1; }
    // Parse from answer if possible
    const fracMatch = answer.match(/(\d+)\s*\/\s*(\d+)/);
    if (fracMatch) {
      targetFilled = parseInt(fracMatch[1]);
      parts = parseInt(fracMatch[2]);
    }

    const cx = this.width / 2;
    const cy = 140;
    const radius = 65;
    let solved = false;

    // Title
    const title = new PIXI.Text('👆 Click slices to fill the pizza!', {
      fontSize: 14, fill: 0xf59e0b, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 30;
    container.addChild(title);

    // Pizza base
    const base = new PIXI.Graphics();
    base.beginFill(0xfde68a);
    base.lineStyle(3, 0xf59e0b);
    base.drawCircle(0, 0, radius);
    base.endFill();
    base.x = cx;
    base.y = cy;
    container.addChild(base);

    // Slice lines
    for (let i = 0; i < parts; i++) {
      const angle = (i / parts) * Math.PI * 2 - Math.PI / 2;
      const line = new PIXI.Graphics();
      line.lineStyle(2, 0xf59e0b);
      line.moveTo(0, 0);
      line.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      line.x = cx;
      line.y = cy;
      container.addChild(line);
    }

    // Clickable slices
    const filled: boolean[] = new Array(parts).fill(false);
    const slices: PIXI.Graphics[] = [];

    for (let i = 0; i < parts; i++) {
      const startAngle = (i / parts) * Math.PI * 2 - Math.PI / 2;
      const endAngle = ((i + 1) / parts) * Math.PI * 2 - Math.PI / 2;

      // Invisible click area
      const clickArea = new PIXI.Graphics();
      clickArea.beginFill(0xffffff, 0.001);
      clickArea.moveTo(0, 0);
      clickArea.arc(0, 0, radius, startAngle, endAngle);
      clickArea.lineTo(0, 0);
      clickArea.endFill();
      clickArea.x = cx;
      clickArea.y = cy;
      clickArea.eventMode = 'static';
      clickArea.cursor = 'pointer';
      container.addChild(clickArea);

      // Filled slice (initially invisible)
      const slice = new PIXI.Graphics();
      slice.beginFill(0xfbbf24, 0.7);
      slice.moveTo(0, 0);
      slice.arc(0, 0, radius - 2, startAngle, endAngle);
      slice.lineTo(0, 0);
      slice.endFill();
      slice.x = cx;
      slice.y = cy;
      slice.alpha = 0;
      container.addChild(slice);
      slices.push(slice);

      clickArea.on('pointertap', () => {
        if (solved) return;
        this.playSound('pop');
        filled[i] = !filled[i];
        gsap.to(slice, { alpha: filled[i] ? 1 : 0, duration: 0.3, ease: 'back.out(1.5)' });
        const filledCount = filled.filter(f => f).length;
        this.callbacks.onSpeak?.(`${filledCount} of ${parts}`);
        this.playSound('count');
        countText.text = `Filled: ${filledCount}/${parts}`;
        gsap.to(countText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });
        this.callbacks.onMascotMood?.('happy');
        this.tryFractionFeedback(filledCount, parts, targetFilled, parts);

        // Check if matches answer
        const answerMatch = answer.match(/(\d+)\s*\/\s*(\d+)/);
        if (answerMatch) {
          const ansN = parseInt(answerMatch[1]);
          const ansD = parseInt(answerMatch[2]);
          if (ansD === parts && filledCount === ansN && !solved) {
            solved = true;
            countText.text = `🎉 ${filledCount}/${parts} = ${answer}!`;
            countText.style.fill = 0x22c55e;
            this.playSound('success');
            this.callbacks.onSpeak?.(`${filledCount} of ${parts}! That's ${answer}! Great job!`);
            this.celebrate(container, cx, cy);
            setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
          }
        }
      });
    }

    // Count display
    const countText = new PIXI.Text(`Filled: 0/${parts}`, {
      fontSize: 20, fill: 0xf59e0b, fontWeight: 'bold',
    });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + radius + 30;
    container.addChild(countText);

    // Show-me: auto-fill the first slice
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Click a slice like this!');
        if (slices[0] && !filled[0]) {
          filled[0] = true;
          this.playSound('pop');
          gsap.to(slices[0], { alpha: 1, duration: 0.3, ease: 'back.out(1.5)' });
          const fc = filled.filter(f => f).length;
          countText.text = `Filled: ${fc}/${parts}`;
          this.callbacks.onSpeak?.(`${fc} of ${parts}`);
        }
      }, 1500);
    }

    // Adaptive: pre-fill first slice in easier mode
    if (this.adaptiveEasier && slices[0]) {
      filled[0] = true;
      slices[0].alpha = 1;
      countText.text = `Filled: 1/${parts}`;
    }
  }

  // ─── INTERACTIVE: Body Diagram — tap parts to answer ─────────

  private renderInteractiveBodyDiagram(answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    let solved = false;

    // Title
    const title = new PIXI.Text('👆 Tap the correct body part!', {
      fontSize: 14, fill: 0xef4444, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Selected part feedback
    const selectedText = new PIXI.Text('', { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    selectedText.anchor.set(0.5);
    selectedText.x = cx;
    selectedText.y = 50;
    container.addChild(selectedText);

    const answerLower = answer.toLowerCase();

    // Helper to make a part tappable
    const makePart = (g: PIXI.Graphics, partName: string, x: number, y: number) => {
      g.x = x;
      g.y = y;
      g.eventMode = 'static';
      g.cursor = 'pointer';
      container.addChild(g);

      g.on('pointerover', () => { if (!solved) g.scale.set(1.15); });
      g.on('pointerout', () => { if (!solved) g.scale.set(1); });

      g.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        selectedText.text = `You tapped: ${partName}`;
        this.callbacks.onSpeak?.(partName);
        // Check if correct
        if (answerLower.includes(partName.toLowerCase()) || partName.toLowerCase().includes(answerLower)) {
          solved = true;
          selectedText.text = `✓ ${partName} is correct!`;
          selectedText.style.fill = 0x22c55e;
          g.tint = 0x22c55e;
          this.playSound('success');
          this.callbacks.onSpeak?.(`Yes! That's the ${partName}! Great job!`);
          this.celebrate(container, x, y);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        } else {
          selectedText.text = `✗ That's the ${partName}. Try again!`;
          selectedText.style.fill = 0xef4444;
          this.wrongFeedback(container, x, y);
          gsap.to(g, { x: x + 5, duration: 0.05, yoyo: true, repeat: 3 });
        }
      });
    };

    // Head
    const head = new PIXI.Graphics();
    head.beginFill(0xfde68a);
    head.lineStyle(2, 0xd97706);
    head.drawCircle(0, 0, 22);
    head.endFill();
    makePart(head, 'head', cx, cy - 45);

    // Eyes
    const eyes = new PIXI.Graphics();
    eyes.beginFill(0x333333);
    eyes.drawCircle(-7, 0, 3);
    eyes.drawCircle(7, 0, 3);
    eyes.endFill();
    makePart(eyes, 'eyes', cx, cy - 50);

    // Nose
    const nose = new PIXI.Graphics();
    nose.beginFill(0xd97706);
    nose.drawEllipse(0, 0, 2, 3);
    nose.endFill();
    makePart(nose, 'nose', cx, cy - 42);

    // Mouth
    const mouth = new PIXI.Graphics();
    mouth.lineStyle(2, 0xd97706);
    mouth.arc(0, 0, 5, 0, Math.PI);
    makePart(mouth, 'mouth', cx, cy - 35);

    // Ears
    const leftEar = new PIXI.Graphics();
    leftEar.beginFill(0xfde68a);
    leftEar.lineStyle(1, 0xd97706);
    leftEar.drawEllipse(0, 0, 4, 7);
    leftEar.endFill();
    makePart(leftEar, 'ear', cx - 25, cy - 43);

    // Body
    const body = new PIXI.Graphics();
    body.beginFill(0xfde68a);
    body.lineStyle(2, 0xd97706);
    body.drawRoundedRect(-22, -25, 44, 50, 10);
    body.endFill();
    makePart(body, 'chest', cx, cy + 12);

    // Heart
    const heart = new PIXI.Graphics();
    heart.beginFill(0xfca5a5);
    heart.drawCircle(-4, -3, 5);
    heart.drawCircle(4, -3, 5);
    heart.moveTo(-8, -1);
    heart.lineTo(0, 8);
    heart.lineTo(8, -1);
    heart.endFill();
    makePart(heart, 'heart', cx - 7, cy + 5);

    // Arms
    const leftArm = new PIXI.Graphics();
    leftArm.lineStyle(5, 0xd97706, 1, 0.5, true);
    leftArm.moveTo(0, 0);
    leftArm.lineTo(-18, 35);
    makePart(leftArm, 'arm', cx - 22, cy - 8);

    // Hand
    const leftHand = new PIXI.Graphics();
    leftHand.beginFill(0xfde68a);
    leftHand.lineStyle(1, 0xd97706);
    leftHand.drawCircle(0, 0, 5);
    leftHand.endFill();
    makePart(leftHand, 'hand', cx - 40, cy + 27);

    // Legs
    const leftLeg = new PIXI.Graphics();
    leftLeg.lineStyle(6, 0xd97706, 1, 0.5, true);
    leftLeg.moveTo(0, 0);
    leftLeg.lineTo(-2, 45);
    makePart(leftLeg, 'leg', cx - 10, cy + 38);

    // Foot
    const leftFoot = new PIXI.Graphics();
    leftFoot.beginFill(0xfde68a);
    leftFoot.lineStyle(1, 0xd97706);
    leftFoot.drawEllipse(0, 0, 8, 4);
    leftFoot.endFill();
    makePart(leftFoot, 'foot', cx - 12, cy + 85);

    // Show-me: highlight the head to show how tapping works
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Tap a body part like this!');
        gsap.to(head, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 2 });
      }, 1500);
    }

    // Adaptive: pulse the correct part as a hint
    if (this.adaptiveEasier) {
      const allParts = [head, eyes, nose, mouth, leftEar, body, heart, leftArm, leftHand, leftLeg, leftFoot];
      const correctPart = allParts.find(p => {
        const name = (p.children[0] as PIXI.Text)?.text?.toLowerCase() || '';
        return answerLower.includes(name) || name.includes(answerLower);
      });
      if (correctPart) {
        gsap.to(correctPart, { alpha: 0.5, duration: 0.5, yoyo: true, repeat: -1 });
      }
    }
  }

  // ─── Addition: animated counting objects + number line ───────

  private renderAddition(a: number, b: number, question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const emoji = this.getEmojiForQuestion(question);
    const total = a + b;
    const objSize = 36;
    const objSpacing = 40;
    const groupY = 100;

    // Group A label
    const labelA = new PIXI.Text(`${a}`, {
      fontSize: 20, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    labelA.anchor.set(0.5);
    labelA.x = this.width / 2 - 100;
    labelA.y = groupY - 30;
    container.addChild(labelA);

    // Group A objects
    const groupA: PIXI.DisplayObject[] = [];
    for (let i = 0; i < a; i++) {
      const obj = this.createObjectSprite(emoji, objSize);
      obj.x = this.width / 2 - 100 + (i - (a - 1) / 2) * objSpacing;
      obj.y = groupY;
      obj.alpha = 0;
      obj.scale.set(0);
      container.addChild(obj);
      groupA.push(obj);

      gsap.to(obj, {
        alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: i * 0.15,
        onStart: () => this.callbacks.onSpeak?.(String(i + 1)),
      });
    }

    // Plus sign
    const plus = new PIXI.Text('+', { fontSize: 36, fill: 0x6c5ce7, fontWeight: 'bold' });
    plus.anchor.set(0.5);
    plus.x = this.width / 2;
    plus.y = groupY;
    plus.alpha = 0;
    container.addChild(plus);
    gsap.to(plus, { alpha: 1, duration: 0.3, delay: a * 0.15 + 0.1 });

    // Group B label
    const labelB = new PIXI.Text(`${b}`, {
      fontSize: 20, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    labelB.anchor.set(0.5);
    labelB.x = this.width / 2 + 100;
    labelB.y = groupY - 30;
    labelB.alpha = 0;
    container.addChild(labelB);
    gsap.to(labelB, { alpha: 1, duration: 0.3, delay: a * 0.15 + 0.2 });

    // Group B objects
    const groupB: PIXI.DisplayObject[] = [];
    for (let i = 0; i < b; i++) {
      const obj = this.createObjectSprite(emoji, objSize);
      obj.x = this.width / 2 + 100 + (i - (b - 1) / 2) * objSpacing;
      obj.y = groupY;
      obj.alpha = 0;
      obj.scale.set(0);
      container.addChild(obj);
      groupB.push(obj);

      gsap.to(obj, {
        alpha: 1, pixi: { scale: 1 }, duration: 0.3,
        delay: a * 0.15 + 0.4 + i * 0.15,
        onStart: () => this.callbacks.onSpeak?.(String(a + i + 1)),
      });
    }

    // Equals sign
    const equals = new PIXI.Text('=', { fontSize: 36, fill: 0x6c5ce7, fontWeight: 'bold' });
    equals.anchor.set(0.5);
    equals.x = this.width / 2 + 200;
    equals.y = groupY;
    equals.alpha = 0;
    container.addChild(equals);
    gsap.to(equals, { alpha: 1, duration: 0.3, delay: a * 0.15 + b * 0.15 + 0.5 });

    // Answer box
    const answerBox = new PIXI.Graphics();
    answerBox.beginFill(0xffffff);
    answerBox.lineStyle(3, 0xa855f7);
    answerBox.drawRoundedRect(-30, -25, 60, 50, 10);
    answerBox.endFill();
    answerBox.x = this.width / 2 + 260;
    answerBox.y = groupY;
    answerBox.alpha = 0;
    container.addChild(answerBox);

    const answerText = new PIXI.Text('?', {
      fontSize: 28, fill: 0xa855f7, fontWeight: 'bold',
    });
    answerText.anchor.set(0.5);
    answerText.x = this.width / 2 + 260;
    answerText.y = groupY;
    answerText.alpha = 0;
    container.addChild(answerText);

    gsap.to([answerBox, answerText], { alpha: 1, duration: 0.3, delay: a * 0.15 + b * 0.15 + 0.7 });

    // Reveal answer
    if (showCorrect) {
      gsap.to(answerText, {
        pixi: { text: String(total) }, duration: 0.3,
        delay: a * 0.15 + b * 0.15 + 1.0,
      });
      answerText.style.fill = 0x22c55e;
      answerBox.clear();
      answerBox.beginFill(0xd1fae5);
      answerBox.lineStyle(3, 0x22c55e);
      answerBox.drawRoundedRect(-30, -25, 60, 50, 10);
      answerBox.endFill();
    }

    // Interactive number line below
    this.renderNumberLine(container, Math.max(total + 2, 10), total, showCorrect, 220, a * 0.15 + b * 0.15 + 1.2);
  }

  // ─── Subtraction: cross-out animation + number line ──────────

  private renderSubtraction(a: number, b: number, question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const emoji = this.getEmojiForQuestion(question);
    const result = a - b;
    const objSize = 36;
    const objSpacing = 40;
    const groupY = 100;

    // Render all A objects
    const objects: PIXI.DisplayObject[] = [];
    const startX = this.width / 2 - ((a - 1) * objSpacing) / 2;

    for (let i = 0; i < a; i++) {
      const obj = this.createObjectSprite(emoji, objSize);
      obj.x = startX + i * objSpacing;
      obj.y = groupY;
      obj.alpha = 0;
      obj.scale.set(0);
      container.addChild(obj);
      objects.push(obj);

      gsap.to(obj, {
        alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: i * 0.1,
      });
    }

    // Cross out first B objects
    const crossOutDelay = a * 0.1 + 0.5;
    for (let i = 0; i < b; i++) {
      const obj = objects[i];
      // Red X overlay
      const cross = new PIXI.Graphics();
      cross.lineStyle(4, 0xef4444);
      cross.moveTo(-15, -15);
      cross.lineTo(15, 15);
      cross.moveTo(15, -15);
      cross.lineTo(-15, 15);
      cross.x = obj.x;
      cross.y = obj.y;
      cross.alpha = 0;
      cross.scale.set(0);
      container.addChild(cross);

      gsap.to(obj, { alpha: 0.3, duration: 0.3, delay: crossOutDelay + i * 0.2 });
      gsap.to(cross, {
        alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: crossOutDelay + i * 0.2,
        onStart: () => this.callbacks.onSpeak?.(`${i + 1} taken away`),
      });
    }

    // Equation text
    const eqText = new PIXI.Text(`${a} − ${b} = ${showCorrect ? result : '?'}`, {
      fontSize: 28, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold',
    });
    eqText.anchor.set(0.5);
    eqText.x = this.width / 2;
    eqText.y = groupY + 50;
    eqText.alpha = 0;
    container.addChild(eqText);
    gsap.to(eqText, { alpha: 1, duration: 0.3, delay: crossOutDelay + b * 0.2 + 0.3 });

    // Number line
    this.renderNumberLine(container, Math.max(a + 1, 10), result, showCorrect, 220, crossOutDelay + b * 0.2 + 0.5, a);
  }

  // ─── Multiplication: groups grid ─────────────────────────────

  private renderMultiplication(a: number, b: number, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const total = a * b;
    const objSize = 24;
    const objSpacing = 28;
    const rowSpacing = 32;
    const startY = 80;

    // Title
    const title = new PIXI.Text(`${a} groups of ${b}`, {
      fontSize: 18, fill: 0x16a34a, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = startY - 25;
    container.addChild(title);

    // Render groups
    for (let row = 0; row < a; row++) {
      // Group background
      const groupBg = new PIXI.Graphics();
      groupBg.beginFill(0xf0fdf4, 0.5);
      groupBg.lineStyle(2, 0x86efac);
      groupBg.drawRoundedRect(-((b * objSpacing) / 2) - 8, -12, b * objSpacing + 16, 28, 6);
      groupBg.endFill();
      groupBg.x = this.width / 2;
      groupBg.y = startY + row * rowSpacing;
      groupBg.alpha = 0;
      container.addChild(groupBg);
      gsap.to(groupBg, { alpha: 1, duration: 0.2, delay: row * 0.15 });

      for (let col = 0; col < b; col++) {
        const obj = this.createObjectSprite('ball', objSize);
        obj.x = this.width / 2 + (col - (b - 1) / 2) * objSpacing;
        obj.y = startY + row * rowSpacing;
        obj.alpha = 0;
        obj.scale.set(0);
        container.addChild(obj);

        gsap.to(obj, {
          alpha: 1, pixi: { scale: 1 }, duration: 0.2,
          delay: row * 0.15 + col * 0.05,
        });
      }
    }

    // Answer
    const answerText = new PIXI.Text(`= ${showCorrect ? total : '?'}`, {
      fontSize: 28, fill: showCorrect ? 0x22c55e : 0x16a34a, fontWeight: 'bold',
    });
    answerText.anchor.set(0.5);
    answerText.x = this.width / 2;
    answerText.y = startY + a * rowSpacing + 20;
    answerText.alpha = 0;
    container.addChild(answerText);
    gsap.to(answerText, { alpha: 1, duration: 0.3, delay: a * 0.15 + b * 0.05 + 0.3 });
  }

  // ─── Division: sharing into groups ───────────────────────────

  private renderDivision(a: number, b: number, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const result = Math.floor(a / b);
    const objSize = 24;
    const groupSpacing = 70;
    const startX = this.width / 2 - ((b - 1) * groupSpacing) / 2;

    // Title
    const title = new PIXI.Text(`Share ${a} into ${b} groups`, {
      fontSize: 18, fill: 0x9333ea, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 60;
    container.addChild(title);

    // Render groups
    for (let g = 0; g < b; g++) {
      const groupBg = new PIXI.Graphics();
      groupBg.beginFill(0xfaf5ff, 0.5);
      groupBg.lineStyle(2, 0xc084fc);
      groupBg.drawRoundedRect(-25, -15, 50, 80, 8);
      groupBg.endFill();
      groupBg.x = startX + g * groupSpacing;
      groupBg.y = 120;
      groupBg.alpha = 0;
      container.addChild(groupBg);
      gsap.to(groupBg, { alpha: 1, duration: 0.2, delay: g * 0.1 });

      for (let i = 0; i < result; i++) {
        const obj = this.createObjectSprite('ball', objSize);
        obj.x = startX + g * groupSpacing;
        obj.y = 110 + i * 26;
        obj.alpha = 0;
        obj.scale.set(0);
        container.addChild(obj);

        gsap.to(obj, {
          alpha: 1, pixi: { scale: 1 }, duration: 0.2,
          delay: g * 0.1 + 0.2 + i * 0.08,
        });
      }
    }

    // Answer
    const answerText = new PIXI.Text(`= ${showCorrect ? result : '?'} each`, {
      fontSize: 24, fill: showCorrect ? 0x22c55e : 0x9333ea, fontWeight: 'bold',
    });
    answerText.anchor.set(0.5);
    answerText.x = this.width / 2;
    answerText.y = 220;
    answerText.alpha = 0;
    container.addChild(answerText);
    gsap.to(answerText, { alpha: 1, duration: 0.3, delay: b * 0.1 + result * 0.08 + 0.5 });
  }

  // ─── Fraction: interactive pizza ─────────────────────────────

  private renderFraction(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let parts = 2;
    let filled = 1;
    if (q.includes('quarter') || q.includes('1/4')) { parts = 4; filled = 1; }
    else if (q.includes('third') || q.includes('1/3')) { parts = 3; filled = 1; }
    else if (q.includes('half') || q.includes('1/2')) { parts = 2; filled = 1; }

    const cx = this.width / 2;
    const cy = 130;
    const radius = 60;

    // Pizza base
    const base = new PIXI.Graphics();
    base.beginFill(0xfde68a);
    base.lineStyle(3, 0xf59e0b);
    base.drawCircle(0, 0, radius);
    base.endFill();
    base.x = cx;
    base.y = cy;
    container.addChild(base);

    // Slice lines
    for (let i = 0; i < parts; i++) {
      const angle = (i / parts) * Math.PI * 2 - Math.PI / 2;
      const line = new PIXI.Graphics();
      line.lineStyle(2, 0xf59e0b);
      line.moveTo(0, 0);
      line.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      line.x = cx;
      line.y = cy;
      container.addChild(line);
    }

    // Filled slices (animated)
    for (let i = 0; i < filled; i++) {
      const slice = new PIXI.Graphics();
      const startAngle = (i / parts) * Math.PI * 2 - Math.PI / 2;
      const endAngle = ((i + 1) / parts) * Math.PI * 2 - Math.PI / 2;

      slice.beginFill(0xfbbf24, 0.7);
      slice.moveTo(0, 0);
      slice.arc(0, 0, radius - 2, startAngle, endAngle);
      slice.lineTo(0, 0);
      slice.endFill();
      slice.x = cx;
      slice.y = cy;
      slice.alpha = 0;
      container.addChild(slice);

      gsap.to(slice, { alpha: 1, duration: 0.4, delay: 0.3 + i * 0.3 });
    }

    // Label
    const label = new PIXI.Text(`${filled}/${parts} shaded${showCorrect ? ` = ${answer}` : ''}`, {
      fontSize: 20, fill: showCorrect ? 0x22c55e : 0xf59e0b, fontWeight: 'bold',
    });
    label.anchor.set(0.5);
    label.x = cx;
    label.y = cy + radius + 25;
    label.alpha = 0;
    container.addChild(label);
    gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.3 + filled * 0.3 + 0.2 });
  }

  // ─── Number line challenge ───────────────────────────────────

  private renderNumberLineChallenge(question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const ansNum = parseInt(answer) || 0;
    this.renderNumberLine(container, 15, ansNum, showCorrect, 130, 0.3);
  }

  // ─── Compare numbers with block towers ───────────────────────

  private renderCompare(numbers: number[], question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    const isGreatest = q.includes('greatest') || q.includes('largest') || q.includes('biggest');
    const isSmallest = q.includes('smallest') || q.includes('least');
    const target = isGreatest ? Math.max(...numbers) : isSmallest ? Math.min(...numbers) : 0;

    const towerSpacing = 100;
    const startX = this.width / 2 - ((numbers.length - 1) * towerSpacing) / 2;
    const baseY = 200;
    const blockH = 16;
    const blockW = 40;

    numbers.forEach((n, i) => {
      const isAnswer = showCorrect && n === target;
      const blocks = Math.min(n, 10);
      const towerX = startX + i * towerSpacing;

      // Tower blocks
      for (let j = 0; j < blocks; j++) {
        const block = new PIXI.Graphics();
        block.beginFill(isAnswer ? 0x22c55e : 0x6366f1);
        block.lineStyle(1, isAnswer ? 0x16a34a : 0x4f46e5);
        block.drawRoundedRect(-blockW / 2, 0, blockW, blockH - 2, 3);
        block.endFill();
        block.x = towerX;
        block.y = baseY - j * blockH;
        block.alpha = 0;
        block.scale.set(0, 1);
        container.addChild(block);

        gsap.to(block, {
          alpha: 1, pixi: { scaleX: 1 }, duration: 0.2, delay: i * 0.1 + j * 0.05,
        });
      }

      // Number label
      const numLabel = new PIXI.Text(String(n), {
        fontSize: 22, fill: isAnswer ? 0x22c55e : 0x333333, fontWeight: 'bold',
      });
      numLabel.anchor.set(0.5);
      numLabel.x = towerX;
      numLabel.y = baseY + 20;
      numLabel.alpha = 0;
      container.addChild(numLabel);
      gsap.to(numLabel, { alpha: 1, duration: 0.3, delay: i * 0.1 + blocks * 0.05 + 0.1 });

      if (n > 10) {
        const more = new PIXI.Text(`+${n - 10}`, {
          fontSize: 12, fill: 0x6366f1, fontWeight: 'bold',
        });
        more.anchor.set(0.5);
        more.x = towerX;
        more.y = baseY - 10 * blockH - 10;
        more.alpha = 0;
        container.addChild(more);
        gsap.to(more, { alpha: 1, duration: 0.3, delay: i * 0.1 + 0.5 });
      }
    });
  }

  // ─── Counting objects ────────────────────────────────────────

  private renderCounting(word: string, count: number, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const emoji = this.getEmojiForWord(word);
    const objSize = 40;
    const spacing = 48;
    const cols = Math.min(count, 6);
    const startX = this.width / 2 - ((cols - 1) * spacing) / 2;
    const startY = 100;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const obj = this.createObjectSprite(emoji, objSize);
      obj.x = startX + col * spacing;
      obj.y = startY + row * spacing;
      obj.alpha = 0;
      obj.scale.set(0);
      container.addChild(obj);

      gsap.to(obj, {
        alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: i * 0.15,
        onStart: () => this.callbacks.onSpeak?.(String(i + 1)),
      });
    }

    // Count label
    const countLabel = new PIXI.Text(showCorrect ? `Count: ${count} → Answer: ${answer}` : 'Count the objects!', {
      fontSize: 18, fill: showCorrect ? 0x22c55e : 0xec4899, fontWeight: 'bold',
    });
    countLabel.anchor.set(0.5);
    countLabel.x = this.width / 2;
    countLabel.y = startY + Math.ceil(count / cols) * spacing + 20;
    countLabel.alpha = 0;
    container.addChild(countLabel);
    gsap.to(countLabel, { alpha: 1, duration: 0.3, delay: count * 0.15 + 0.3 });
  }

  // ─── Body diagram (canvas-drawn) ─────────────────────────────

  private renderBodyDiagram(answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const answerLower = answer.toLowerCase();

    // Head
    const head = new PIXI.Graphics();
    const headColor = showCorrect && (answerLower.includes('head') || answerLower.includes('brain')) ? 0x86efac : 0xfde68a;
    head.beginFill(headColor);
    head.lineStyle(2, 0xd97706);
    head.drawCircle(0, 0, 25);
    head.endFill();
    head.x = cx;
    head.y = cy - 50;
    container.addChild(head);

    // Eyes
    const eyeColor = showCorrect && answerLower.includes('eye') ? 0x22c55e : 0x333333;
    const leftEye = new PIXI.Graphics();
    leftEye.beginFill(eyeColor);
    leftEye.drawCircle(0, 0, 4);
    leftEye.endFill();
    leftEye.x = cx - 8;
    leftEye.y = cy - 55;
    container.addChild(leftEye);

    const rightEye = new PIXI.Graphics();
    rightEye.beginFill(eyeColor);
    rightEye.drawCircle(0, 0, 4);
    rightEye.endFill();
    rightEye.x = cx + 8;
    rightEye.y = cy - 55;
    container.addChild(rightEye);

    // Nose
    const noseColor = showCorrect && answerLower.includes('nose') ? 0x22c55e : 0xd97706;
    const nose = new PIXI.Graphics();
    nose.beginFill(noseColor);
    nose.drawEllipse(0, 0, 3, 4);
    nose.endFill();
    nose.x = cx;
    nose.y = cy - 45;
    container.addChild(nose);

    // Mouth
    const mouthColor = showCorrect && answerLower.includes('mouth') ? 0x22c55e : 0xd97706;
    const mouth = new PIXI.Graphics();
    mouth.lineStyle(2, mouthColor);
    mouth.arc(0, 0, 6, 0, Math.PI);
    mouth.x = cx;
    mouth.y = cy - 38;
    container.addChild(mouth);

    // Ears
    const earColor = showCorrect && answerLower.includes('ear') ? 0x86efac : 0xfde68a;
    const leftEar = new PIXI.Graphics();
    leftEar.beginFill(earColor);
    leftEar.lineStyle(1, 0xd97706);
    leftEar.drawEllipse(0, 0, 5, 8);
    leftEar.endFill();
    leftEar.x = cx - 28;
    leftEar.y = cy - 48;
    container.addChild(leftEar);

    const rightEar = new PIXI.Graphics();
    rightEar.beginFill(earColor);
    rightEar.lineStyle(1, 0xd97706);
    rightEar.drawEllipse(0, 0, 5, 8);
    rightEar.endFill();
    rightEar.x = cx + 28;
    rightEar.y = cy - 48;
    container.addChild(rightEar);

    // Body
    const bodyColor = showCorrect && (answerLower.includes('chest') || answerLower.includes('stomach') || answerLower.includes('skin')) ? 0x86efac : 0xfde68a;
    const body = new PIXI.Graphics();
    body.beginFill(bodyColor);
    body.lineStyle(2, 0xd97706);
    body.drawRoundedRect(-25, -30, 50, 60, 12);
    body.endFill();
    body.x = cx;
    body.y = cy + 15;
    container.addChild(body);

    // Heart
    const heartColor = showCorrect && answerLower.includes('heart') ? 0xef4444 : 0xfca5a5;
    const heart = new PIXI.Graphics();
    heart.beginFill(heartColor);
    heart.drawCircle(-5, -5, 6);
    heart.drawCircle(5, -5, 6);
    heart.moveTo(-10, -3);
    heart.lineTo(0, 10);
    heart.lineTo(10, -3);
    heart.endFill();
    heart.x = cx - 8;
    heart.y = cy + 5;
    container.addChild(heart);

    // Arms
    const armColor = showCorrect && (answerLower.includes('arm') || answerLower.includes('hand') || answerLower.includes('muscle')) ? 0x22c55e : 0xd97706;
    const leftArm = new PIXI.Graphics();
    leftArm.lineStyle(6, armColor, 1, 0.5, true);
    leftArm.moveTo(0, 0);
    leftArm.lineTo(-20, 40);
    leftArm.x = cx - 25;
    leftArm.y = cy - 10;
    container.addChild(leftArm);

    const rightArm = new PIXI.Graphics();
    rightArm.lineStyle(6, armColor, 1, 0.5, true);
    rightArm.moveTo(0, 0);
    rightArm.lineTo(20, 40);
    rightArm.x = cx + 25;
    rightArm.y = cy - 10;
    container.addChild(rightArm);

    // Hands
    const handColor = showCorrect && answerLower.includes('hand') ? 0x86efac : 0xfde68a;
    const leftHand = new PIXI.Graphics();
    leftHand.beginFill(handColor);
    leftHand.lineStyle(1, 0xd97706);
    leftHand.drawCircle(0, 0, 6);
    leftHand.endFill();
    leftHand.x = cx - 45;
    leftHand.y = cy + 30;
    container.addChild(leftHand);

    const rightHand = new PIXI.Graphics();
    rightHand.beginFill(handColor);
    rightHand.lineStyle(1, 0xd97706);
    rightHand.drawCircle(0, 0, 6);
    rightHand.endFill();
    rightHand.x = cx + 45;
    rightHand.y = cy + 30;
    container.addChild(rightHand);

    // Legs
    const legColor = showCorrect && (answerLower.includes('leg') || answerLower.includes('knee') || answerLower.includes('foot')) ? 0x22c55e : 0xd97706;
    const leftLeg = new PIXI.Graphics();
    leftLeg.lineStyle(7, legColor, 1, 0.5, true);
    leftLeg.moveTo(0, 0);
    leftLeg.lineTo(-3, 50);
    leftLeg.x = cx - 12;
    leftLeg.y = cy + 45;
    container.addChild(leftLeg);

    const rightLeg = new PIXI.Graphics();
    rightLeg.lineStyle(7, legColor, 1, 0.5, true);
    rightLeg.moveTo(0, 0);
    rightLeg.lineTo(3, 50);
    rightLeg.x = cx + 12;
    rightLeg.y = cy + 45;
    container.addChild(rightLeg);

    // Feet
    const footColor = showCorrect && answerLower.includes('foot') ? 0x86efac : 0xfde68a;
    const leftFoot = new PIXI.Graphics();
    leftFoot.beginFill(footColor);
    leftFoot.lineStyle(1, 0xd97706);
    leftFoot.drawEllipse(0, 0, 10, 5);
    leftFoot.endFill();
    leftFoot.x = cx - 15;
    leftFoot.y = cy + 98;
    container.addChild(leftFoot);

    const rightFoot = new PIXI.Graphics();
    rightFoot.beginFill(footColor);
    rightFoot.lineStyle(1, 0xd97706);
    rightFoot.drawEllipse(0, 0, 10, 5);
    rightFoot.endFill();
    rightFoot.x = cx + 15;
    rightFoot.y = cy + 98;
    container.addChild(rightFoot);

    // Answer label
    if (showCorrect) {
      const label = new PIXI.Text(`✓ ${answer}`, {
        fontSize: 18, fill: 0x22c55e, fontWeight: 'bold',
      });
      label.anchor.set(0.5);
      label.x = cx;
      label.y = cy + 120;
      container.addChild(label);
    }
  }

  // ─── Plant diagram (canvas-drawn) ────────────────────────────

  private renderPlantDiagram(answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const answerLower = answer.toLowerCase();

    // Flower petals
    const petalColor = showCorrect && answerLower.includes('flower') ? 0x22c55e : 0xec4899;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const petal = new PIXI.Graphics();
      petal.beginFill(petalColor);
      petal.drawEllipse(0, 0, 12, 20);
      petal.endFill();
      petal.rotation = angle;
      petal.x = cx + Math.cos(angle) * 18;
      petal.y = cy - 60 + Math.sin(angle) * 18;
      container.addChild(petal);
    }

    // Flower center
    const center = new PIXI.Graphics();
    center.beginFill(0xfbbf24);
    center.drawCircle(0, 0, 10);
    center.endFill();
    center.x = cx;
    center.y = cy - 60;
    container.addChild(center);

    // Stem
    const stemColor = showCorrect && answerLower.includes('stem') ? 0x22c55e : 0x16a34a;
    const stem = new PIXI.Graphics();
    stem.lineStyle(5, stemColor);
    stem.moveTo(0, 0);
    stem.lineTo(0, 60);
    stem.x = cx;
    stem.y = cy - 55;
    container.addChild(stem);

    // Leaves
    const leafColor = showCorrect && (answerLower.includes('leaf') || answerLower.includes('leaves')) ? 0x22c55e : 0x16a34a;
    const leftLeaf = new PIXI.Graphics();
    leftLeaf.beginFill(leafColor);
    leftLeaf.drawEllipse(0, 0, 15, 8);
    leftLeaf.endFill();
    leftLeaf.rotation = -0.4;
    leftLeaf.x = cx - 15;
    leftLeaf.y = cy - 20;
    container.addChild(leftLeaf);

    const rightLeaf = new PIXI.Graphics();
    rightLeaf.beginFill(leafColor);
    rightLeaf.drawEllipse(0, 0, 15, 8);
    rightLeaf.endFill();
    rightLeaf.rotation = 0.4;
    rightLeaf.x = cx + 15;
    rightLeaf.y = cy - 20;
    container.addChild(rightLeaf);

    // Roots
    const rootColor = showCorrect && answerLower.includes('root') ? 0x22c55e : 0x92400e;
    for (let i = -2; i <= 2; i++) {
      const root = new PIXI.Graphics();
      root.lineStyle(2, rootColor);
      root.moveTo(0, 0);
      root.lineTo(i * 8, 20);
      root.x = cx;
      root.y = cy + 5;
      container.addChild(root);
    }

    // Ground line
    const ground = new PIXI.Graphics();
    ground.lineStyle(2, 0x92400e, 0.5);
    ground.moveTo(-60, 0);
    ground.lineTo(60, 0);
    ground.x = cx;
    ground.y = cy + 5;
    container.addChild(ground);

    // Answer label
    if (showCorrect) {
      const label = new PIXI.Text(`✓ ${answer}`, {
        fontSize: 18, fill: 0x22c55e, fontWeight: 'bold',
      });
      label.anchor.set(0.5);
      label.x = cx;
      label.y = cy + 50;
      container.addChild(label);
    }
  }

  // ─── INTERACTIVE: Angle — drag the angle line to match ──────

  private renderInteractiveAngle(question: string, answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 160;
    const r = 80;
    let solved = false;

    // Determine target angle from answer
    const a = answer.toLowerCase();
    let targetDeg = 90;
    if (a.includes('acute')) targetDeg = 45;
    else if (a.includes('obtuse')) targetDeg = 135;
    else if (a.includes('right')) targetDeg = 90;
    else if (a.includes('straight')) targetDeg = 180;
    else if (a.includes('reflex')) targetDeg = 270;

    // Title
    const title = new PIXI.Text('👆 Drag the purple line to make the angle!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Base line (horizontal, fixed)
    const baseLine = new PIXI.Graphics();
    baseLine.lineStyle(4, 0x333333);
    baseLine.moveTo(0, 0);
    baseLine.lineTo(r, 0);
    baseLine.x = cx;
    baseLine.y = cy;
    container.addChild(baseLine);

    // Arc (updates as user drags)
    const arc = new PIXI.Graphics();
    arc.x = cx;
    arc.y = cy;
    container.addChild(arc);

    // Draggable angle line
    const angleLine = new PIXI.Graphics();
    angleLine.lineStyle(4, 0x6c5ce7);
    angleLine.moveTo(0, 0);
    angleLine.lineTo(r, 0);
    angleLine.x = cx;
    angleLine.y = cy;
    angleLine.eventMode = 'static';
    angleLine.cursor = 'grab';
    container.addChild(angleLine);

    // Handle at end of angle line
    const handle = new PIXI.Graphics();
    handle.beginFill(0x6c5ce7);
    handle.drawCircle(0, 0, 10);
    handle.endFill();
    handle.eventMode = 'static';
    handle.cursor = 'grab';
    container.addChild(handle);

    // Vertex point
    const vertex = new PIXI.Graphics();
    vertex.beginFill(0x333333);
    vertex.drawCircle(0, 0, 5);
    vertex.endFill();
    vertex.x = cx;
    vertex.y = cy;
    container.addChild(vertex);

    // Angle display
    const angleText = new PIXI.Text('0°', { fontSize: 24, fill: 0x6c5ce7, fontWeight: 'bold' });
    angleText.anchor.set(0.5);
    angleText.x = cx;
    angleText.y = cy - r - 20;
    container.addChild(angleText);

    let currentDeg = 0;
    let dragging = false;

    const updateAngle = (deg: number) => {
      currentDeg = Math.max(0, Math.min(270, deg));
      const rad = (currentDeg * Math.PI) / 180;
      angleLine.clear();
      angleLine.lineStyle(4, solved ? 0x22c55e : 0x6c5ce7);
      angleLine.moveTo(0, 0);
      angleLine.lineTo(r * Math.cos(rad), -r * Math.sin(rad));

      handle.x = cx + r * Math.cos(rad);
      handle.y = cy - r * Math.sin(rad);

      arc.clear();
      arc.lineStyle(3, solved ? 0x22c55e : 0xa855f7, 0.7);
      arc.arc(0, 0, 30, 0, -rad, true);

      angleText.text = `${Math.round(currentDeg)}°`;
    };

    updateAngle(0);

    handle.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
      if (solved) return;
      dragging = true;
      handle.cursor = 'grabbing';
      this.playSound('pickup');
    });

    handle.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!dragging) return;
      const pos = e.global;
      const dx = pos.x - cx;
      const dy = pos.y - cy;
      let deg = Math.atan2(-dy, dx) * 180 / Math.PI;
      if (deg < 0) deg += 360;
      if (deg > 270) deg = 270;
      updateAngle(deg);
    });

    const stopDrag = () => {
      if (!dragging) return;
      dragging = false;
      handle.cursor = 'grab';
      // Check if close to target
      const diff = Math.abs(currentDeg - targetDeg);
      if (diff < 15 && !solved) {
        solved = true;
        // Snap to target
        gsap.to({ val: currentDeg }, {
          val: targetDeg, duration: 0.3,
          onUpdate: function() { updateAngle(this.targets()[0].val); },
        });
        angleText.text = `${targetDeg}° ✓`;
        angleText.style.fill = 0x22c55e;
        this.playSound('success');
        this.callbacks.onSpeak?.(`${targetDeg} degrees! That's a ${answer}! Great job!`);
        this.celebrate(container, cx, cy - 40);
        setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
      } else {
        this.playSound('tap');
      }
    };

    handle.on('pointerup', stopDrag);
    handle.on('pointerupoutside', stopDrag);

    // Mascot intro
    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Drag the line to make a ${answer}!`), 500);

    // Show-me: auto-drag the line partway
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Drag the purple line like this!');
        this.playSound('pickup');
        gsap.to({ val: 0 }, {
          val: Math.min(targetDeg * 0.5, 45), duration: 1.0,
          onUpdate: function() { updateAngle(this.targets()[0].val); },
        });
      }, 1500);
    }

    // Adaptive: show a ghost line at the target angle
    if (this.adaptiveEasier) {
      const rad = (targetDeg * Math.PI) / 180;
      const ghost = new PIXI.Graphics();
      ghost.lineStyle(3, 0x22c55e, 0.3);
      // ghost.setLineDash([5, 5]); // Not supported in PIXI
      ghost.moveTo(0, 0);
      ghost.lineTo(r * Math.cos(rad), -r * Math.sin(rad));
      ghost.x = cx;
      ghost.y = cy;
      container.addChild(ghost);
    }
  }

  // ─── INTERACTIVE: Perimeter — drag fence posts around the shape ──

  private renderInteractivePerimeter(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let side = 6, length = 8, breadth = 5;
    let shape = 'square';
    const sqMatch = q.match(/square.*?side\s*(\d+)/);
    if (sqMatch) { side = parseInt(sqMatch[1]); shape = 'square'; }
    const rectMatch = q.match(/length\s*(\d+).*?breadth\s*(\d+)/);
    if (rectMatch) { length = parseInt(rectMatch[1]); breadth = parseInt(rectMatch[2]); shape = 'rectangle'; }

    const cx = this.width / 2;
    const cy = 130;
    const scale = 3;
    const w = (shape === 'square' ? side : length) * scale;
    const h = (shape === 'square' ? side : breadth) * scale;
    const perimeter = shape === 'square' ? 4 * side : 2 * (length + breadth);
    let solved = false;

    // Title
    const title = new PIXI.Text('👆 Click the sides to count the perimeter!', {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Shape
    const rect = new PIXI.Graphics();
    rect.beginFill(0x6c5ce7, 0.1);
    rect.lineStyle(3, 0x6c5ce7);
    rect.drawRect(-w / 2, -h / 2, w, h);
    rect.endFill();
    rect.x = cx;
    rect.y = cy;
    container.addChild(rect);

    // 4 clickable sides
    const sides = shape === 'square'
      ? [
          { x: cx, y: cy - h / 2, w: w, h: 10, label: `${side}`, len: side, horiz: true },
          { x: cx + w / 2, y: cy, w: 10, h: h, label: `${side}`, len: side, horiz: false },
          { x: cx, y: cy + h / 2, w: w, h: 10, label: `${side}`, len: side, horiz: true },
          { x: cx - w / 2, y: cy, w: 10, h: h, label: `${side}`, len: side, horiz: false },
        ]
      : [
          { x: cx, y: cy - h / 2, w: w, h: 10, label: `${length}`, len: length, horiz: true },
          { x: cx + w / 2, y: cy, w: 10, h: h, label: `${breadth}`, len: breadth, horiz: false },
          { x: cx, y: cy + h / 2, w: w, h: 10, label: `${length}`, len: length, horiz: true },
          { x: cx - w / 2, y: cy, w: 10, h: h, label: `${breadth}`, len: breadth, horiz: false },
        ];

    let countedSides = 0;
    let totalPerim = 0;
    const clicked: boolean[] = new Array(4).fill(false);

    const countText = new PIXI.Text('Perimeter: 0', { fontSize: 20, fill: 0x6c5ce7, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + h / 2 + 35;
    container.addChild(countText);

    const allHighlights: PIXI.Graphics[] = [];
    sides.forEach((s, i) => {
      const clickArea = new PIXI.Graphics();
      clickArea.beginFill(0xffffff, 0.001);
      clickArea.drawRect(-s.w / 2, -s.h / 2, s.w, s.h);
      clickArea.endFill();
      clickArea.x = s.x;
      clickArea.y = s.y;
      clickArea.eventMode = 'static';
      clickArea.cursor = 'pointer';
      container.addChild(clickArea);

      // Label
      const label = new PIXI.Text(s.label, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
      label.anchor.set(0.5);
      label.x = s.x + (s.horiz ? 0 : (s.x > cx ? 20 : -20));
      label.y = s.y + (s.horiz ? (s.y > cy ? 15 : -15) : 0);
      container.addChild(label);

      // Highlight overlay
      const highlight = new PIXI.Graphics();
      highlight.beginFill(0x22c55e, 0.3);
      highlight.drawRect(-s.w / 2, -s.h / 2, s.w, s.h);
      highlight.endFill();
      highlight.x = s.x;
      highlight.y = s.y;
      highlight.alpha = 0;
      container.addChild(highlight);
      allHighlights.push(highlight);

      clickArea.on('pointertap', () => {
        if (solved || clicked[i]) return;
        clicked[i] = true;
        countedSides++;
        totalPerim += s.len;
        this.playSound('pop');
        this.callbacks.onSpeak?.(`Plus ${s.len}`);
        gsap.to(highlight, { alpha: 1, duration: 0.3 });
        countText.text = `Perimeter: ${totalPerim}`;
        gsap.to(countText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });
        this.callbacks.onMascotMood?.('happy');

        if (countedSides === 4 && !solved) {
          solved = true;
          countText.text = `Perimeter: ${totalPerim}! 🎉`;
          countText.style.fill = 0x22c55e;
          this.playSound('success');
          this.callbacks.onSpeak?.(`The perimeter is ${totalPerim}! Great job!`);
          this.celebrate(container, cx, cy);
          setTimeout(() => this.callbacks.onAnswer?.(String(perimeter)), 1500);
        }
      });
    });

    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Click all 4 sides to count the perimeter!`), 500);

    // Show-me: pulse the first side to show what to click
    if (this.showMeActive && allHighlights[0]) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Click each side like this!');
        gsap.to(allHighlights[0], { alpha: 0.6, duration: 0.3, yoyo: true, repeat: 3 });
      }, 1500);
    }

    // Adaptive: pre-count the first side
    if (this.adaptiveEasier && allHighlights[0]) {
      clicked[0] = true;
      countedSides = 1;
      totalPerim = sides[0].len;
      allHighlights[0].alpha = 1;
      countText.text = `Perimeter: ${totalPerim}`;
    }
  }

  // ─── INTERACTIVE: Area — click grid cells to fill the shape ──

  private renderInteractiveArea(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let length = 8, breadth = 5;
    const rectMatch = q.match(/length\s*(\d+).*?breadth\s*(\d+)/);
    if (rectMatch) { length = parseInt(rectMatch[1]); breadth = parseInt(rectMatch[2]); }
    const sqMatch = q.match(/square.*?side\s*(\d+)/);
    if (sqMatch) { length = parseInt(sqMatch[1]); breadth = length; }

    const cx = this.width / 2;
    const cy = 130;
    const cellSize = Math.min(16, (this.width - 80) / Math.max(length, breadth));
    const gridW = length * cellSize;
    const gridH = breadth * cellSize;
    const area = length * breadth;
    let solved = false;
    let filledCount = 0;

    // Title
    const title = new PIXI.Text('👆 Click ALL squares to find the area!', {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Grid
    const grid = new PIXI.Graphics();
    grid.x = cx;
    grid.y = cy;
    grid.beginFill(0xe5e7eb);
    grid.drawRect(-gridW / 2, -gridH / 2, gridW, gridH);
    grid.endFill();
    grid.lineStyle(1, 0x9ca3af, 0.5);
    for (let i = 0; i <= length; i++) {
      grid.moveTo(-gridW / 2 + i * cellSize, -gridH / 2);
      grid.lineTo(-gridW / 2 + i * cellSize, gridH / 2);
    }
    for (let j = 0; j <= breadth; j++) {
      grid.moveTo(-gridW / 2, -gridH / 2 + j * cellSize);
      grid.lineTo(gridW / 2, -gridH / 2 + j * cellSize);
    }
    grid.lineStyle(3, 0x6c5ce7);
    grid.drawRect(-gridW / 2, -gridH / 2, gridW, gridH);
    container.addChild(grid);

    // Clickable cells
    const cells: PIXI.Graphics[] = [];
    for (let row = 0; row < breadth; row++) {
      for (let col = 0; col < length; col++) {
        const cell = new PIXI.Graphics();
        cell.beginFill(0x6c5ce7, 0.001);
        cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
        cell.endFill();
        cell.x = cx - gridW / 2 + col * cellSize + cellSize / 2;
        cell.y = cy - gridH / 2 + row * cellSize + cellSize / 2;
        cell.eventMode = 'static';
        cell.cursor = 'pointer';
        cell.alpha = 0;
        container.addChild(cell);
        cells.push(cell);

        cell.on('pointertap', () => {
          if (solved) return;
          if (cell.tint === 0x6c5ce7) return; // already filled
          cell.clear();
          cell.beginFill(0x6c5ce7, 0.5);
          cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
          cell.endFill();
          cell.tint = 0x6c5ce7;
          filledCount++;
          this.playSound('pop');
          if (filledCount % 5 === 0) this.callbacks.onSpeak?.(String(filledCount));
          countText.text = `Area: ${filledCount} squares`;
          gsap.to(countText.scale, { x: 1.15, y: 1.15, duration: 0.1, yoyo: true, repeat: 1 });

          if (filledCount === area && !solved) {
            solved = true;
            countText.text = `Area: ${area} squares! 🎉`;
            countText.style.fill = 0x22c55e;
            this.playSound('success');
            this.callbacks.onSpeak?.(`${area} squares! The area is ${area}! Great job!`);
            this.celebrate(container, cx, cy);
            setTimeout(() => this.callbacks.onAnswer?.(String(area)), 1500);
          }
        });
      }
    }

    // Labels
    const lenLabel = new PIXI.Text(`${length}`, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    lenLabel.anchor.set(0.5);
    lenLabel.x = cx;
    lenLabel.y = cy - gridH / 2 - 15;
    container.addChild(lenLabel);

    const brdLabel = new PIXI.Text(`${breadth}`, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    brdLabel.anchor.set(0.5);
    brdLabel.x = cx + gridW / 2 + 15;
    brdLabel.y = cy;
    container.addChild(brdLabel);

    const countText = new PIXI.Text('Area: 0 squares', { fontSize: 18, fill: 0x6c5ce7, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + gridH / 2 + 30;
    container.addChild(countText);

    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Click every square inside to count the area!`), 500);

    // Show-me: pulse the first cell
    if (this.showMeActive && cells[0]) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Click each square like this!');
        gsap.to(cells[0], { alpha: 0.5, duration: 0.3, yoyo: true, repeat: 3 });
      }, 1500);
    }

    // Adaptive: pre-fill the first row
    if (this.adaptiveEasier) {
      const preFill = Math.min(length, 3);
      for (let i = 0; i < preFill; i++) {
        const cell = cells[i];
        if (cell) {
          cell.clear();
          cell.beginFill(0x6c5ce7, 0.5);
          cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
          cell.endFill();
          cell.tint = 0x6c5ce7;
          filledCount++;
        }
      }
      countText.text = `Area: ${filledCount} squares`;
    }
  }

  // ─── INTERACTIVE: Percentage — click grid cells to fill ──────

  private renderInteractivePercentage(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();

    // Parse target percentage
    let targetPct = 25;
    const pctMatch = q.match(/(\d+)\s*%/);
    if (pctMatch) targetPct = parseInt(pctMatch[1]);
    const decMatch = q.match(/(\d+\.?\d*)/);
    if (!pctMatch && decMatch && q.includes('percentage')) targetPct = Math.round(parseFloat(decMatch[1]) * 100);

    const gridSize = 10;
    const cellSize = 16;
    const gridW = gridSize * cellSize;
    let solved = false;
    let filledCount = 0;

    // Title
    const title = new PIXI.Text(`👆 Click squares to fill ${targetPct}%!`, {
      fontSize: 14, fill: 0xf59e0b, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Grid background
    const grid = new PIXI.Graphics();
    grid.x = cx;
    grid.y = cy;
    grid.beginFill(0xe5e7eb);
    grid.drawRect(-gridW / 2, -gridW / 2, gridW, gridW);
    grid.endFill();
    grid.lineStyle(1, 0x9ca3af, 0.5);
    for (let i = 0; i <= gridSize; i++) {
      grid.moveTo(-gridW / 2 + i * cellSize, -gridW / 2);
      grid.lineTo(-gridW / 2 + i * cellSize, gridW / 2);
      grid.moveTo(-gridW / 2, -gridW / 2 + i * cellSize);
      grid.lineTo(gridW / 2, -gridW / 2 + i * cellSize);
    }
    container.addChild(grid);

    // Clickable cells
    const pctCells: PIXI.Graphics[] = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cell = new PIXI.Graphics();
        cell.beginFill(0xffffff, 0.001);
        cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
        cell.endFill();
        cell.x = cx - gridW / 2 + col * cellSize + cellSize / 2;
        cell.y = cy - gridW / 2 + row * cellSize + cellSize / 2;
        cell.eventMode = 'static';
        cell.cursor = 'pointer';
        container.addChild(cell);
        pctCells.push(cell);

        let filled = false;
        cell.on('pointertap', () => {
          if (solved) return;
          filled = !filled;
          cell.clear();
          cell.beginFill(filled ? 0xf59e0b : 0xffffff, filled ? 0.6 : 0.001);
          cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
          cell.endFill();
          filledCount += filled ? 1 : -1;
          this.playSound('pop');
          countText.text = `${filledCount}%`;

          if (filledCount === targetPct && !solved) {
            solved = true;
            countText.text = `${targetPct}%! 🎉`;
            countText.style.fill = 0x22c55e;
            this.playSound('success');
            this.callbacks.onSpeak?.(`${targetPct} percent! Great job!`);
            this.celebrate(container, cx, cy);
            setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
          }
        });
      }
    }

    const countText = new PIXI.Text('0%', { fontSize: 22, fill: 0xf59e0b, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + gridW / 2 + 30;
    container.addChild(countText);

    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Click squares to fill ${targetPct} percent of the grid!`), 500);

    // Show-me: pulse the first cell
    if (this.showMeActive && pctCells[0]) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Click squares like this!');
        gsap.to(pctCells[0], { alpha: 0.3, duration: 0.3, yoyo: true, repeat: 3 });
      }, 1500);
    }

    // Adaptive: pre-fill 10% of cells
    if (this.adaptiveEasier) {
      const preFill = Math.min(10, Math.floor(targetPct * 0.3));
      for (let i = 0; i < preFill; i++) {
        const cell = pctCells[i];
        cell.clear();
        cell.beginFill(0xf59e0b, 0.6);
        cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
        cell.endFill();
        filledCount++;
      }
      countText.text = `${filledCount}%`;
    }
  }

  // ─── INTERACTIVE: Integers — drag marker on number line ─────

  private renderInteractiveInteger(question: string, answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 150;
    const range = 6;
    const spacing = 35;
    const total = range * 2 + 1;
    const startX = cx - ((total - 1) * spacing) / 2;
    let solved = false;

    const ansNum = parseInt(answer) || 0;

    // Title
    const title = new PIXI.Text('👆 Drag the marker to the answer!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Line
    const line = new PIXI.Graphics();
    line.lineStyle(2, 0xcbd5e1);
    line.moveTo(0, 0);
    line.lineTo((total - 1) * spacing, 0);
    line.x = startX;
    line.y = cy;
    container.addChild(line);

    // Numbers
    for (let i = -range; i <= range; i++) {
      const idx = i + range;
      const x = startX + idx * spacing;
      const isZero = i === 0;

      const circle = new PIXI.Graphics();
      circle.beginFill(isZero ? 0x3b82f6 : 0xffffff);
      circle.lineStyle(2, isZero ? 0x2563eb : 0xd1d5db);
      circle.drawCircle(0, 0, 14);
      circle.endFill();
      circle.x = x;
      circle.y = cy;
      container.addChild(circle);

      const numText = new PIXI.Text(i > 0 ? `+${i}` : String(i), {
        fontSize: 11, fill: isZero ? 0xffffff : 0x6b7280, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      numText.x = x;
      numText.y = cy;
      container.addChild(numText);
    }

    // Draggable marker
    const marker = new PIXI.Graphics();
    marker.beginFill(0xef4444);
    marker.drawCircle(0, 0, 12);
    marker.endFill();
    marker.lineStyle(2, 0xffffff);
    marker.drawCircle(0, 0, 12);
    marker.x = startX + range * spacing; // start at 0
    marker.y = cy - 25;
    marker.eventMode = 'static';
    marker.cursor = 'grab';
    container.addChild(marker);

    const valueText = new PIXI.Text('0', { fontSize: 20, fill: 0xef4444, fontWeight: 'bold' });
    valueText.anchor.set(0.5);
    valueText.x = cx;
    valueText.y = cy + 35;
    container.addChild(valueText);

    let dragging = false;
    marker.on('pointerdown', () => {
      if (solved) return;
      dragging = true;
      marker.cursor = 'grabbing';
      this.playSound('pickup');
    });

    marker.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
      if (!dragging) return;
      const pos = e.global;
      let x = pos.x;
      // Snap to nearest number
      let idx = Math.round((x - startX) / spacing);
      idx = Math.max(0, Math.min(total - 1, idx));
      marker.x = startX + idx * spacing;
      const val = idx - range;
      valueText.text = val > 0 ? `+${val}` : String(val);
    });

    const stopDrag = () => {
      if (!dragging) return;
      dragging = false;
      marker.cursor = 'grab';
      this.playSound('tap');
      const idx = Math.round((marker.x - startX) / spacing);
      const val = idx - range;
      if (val === ansNum && !solved) {
        solved = true;
        marker.clear();
        marker.beginFill(0x22c55e);
        marker.lineStyle(2, 0xffffff);
        marker.drawCircle(0, 0, 14);
        marker.endFill();
        valueText.text = `${val > 0 ? '+' : ''}${val} ✓`;
        valueText.style.fill = 0x22c55e;
        this.playSound('success');
        this.callbacks.onSpeak?.(`${val > 0 ? 'Plus' : ''} ${val}! Great job!`);
        this.celebrate(container, marker.x, cy - 20);
        setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
      }
    };

    marker.on('pointerup', stopDrag);
    marker.on('pointerupoutside', stopDrag);

    this.callbacks.onMascotMood?.('happy');
    setTimeout(() => this.callbacks.onSpeak?.(`Drag the red marker to ${answer}!`), 500);

    // Show-me: auto-drag marker partway
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Drag the marker like this!');
        this.playSound('pickup');
        const targetIdx = ansNum + range;
        const halfway = Math.round(targetIdx / 2);
        gsap.to(marker, { x: startX + halfway * spacing, duration: 1.0, ease: 'power2.inOut' });
        gsap.to(valueText, { text: String(halfway - range), duration: 0.3, delay: 1.0 });
      }, 1500);
    }

    // Adaptive: show a green arrow pointing to the answer
    if (this.adaptiveEasier) {
      const ansIdx = ansNum + range;
      const arrow = new PIXI.Text('↓', { fontSize: 20, fill: 0x22c55e, fontWeight: 'bold' });
      arrow.anchor.set(0.5);
      arrow.x = startX + ansIdx * spacing;
      arrow.y = cy - 30;
      arrow.alpha = 0;
      container.addChild(arrow);
      gsap.to(arrow, { alpha: 0.7, duration: 0.5, delay: 0.5, yoyo: true, repeat: -1 });
    }
  }

  // ─── INTERACTIVE: 3D Shape — rotate shape, tap to answer ────

  private renderInteractive3DShape(question: string, answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 140;
    const q = question.toLowerCase();
    const a = answer.toLowerCase();
    let solved = false;

    let shapeType = 'cube';
    if (q.includes('cylinder') || a.includes('cylinder')) shapeType = 'cylinder';
    else if (q.includes('sphere') || a.includes('sphere')) shapeType = 'sphere';
    else if (q.includes('cone') || a.includes('cone')) shapeType = 'cone';
    else if (q.includes('pyramid') || a.includes('pyramid')) shapeType = 'pyramid';

    const title = new PIXI.Text('👆 Tap the correct shape name!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Draw the shape (large, centered)
    const shapeG = new PIXI.Graphics();
    shapeG.x = cx;
    shapeG.y = cy;
    this.draw3DShape(shapeG, shapeType, 0x6c5ce7);
    shapeG.eventMode = 'static';
    shapeG.cursor = 'pointer';
    shapeG.interactiveChildren = true;
    container.addChild(shapeG);

    // Slow rotation animation
    gsap.to(shapeG, { rotation: 0.05, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    // Option cards at bottom
    const spacing = 110;
    const startX = cx - ((options.length - 1) * spacing) / 2;
    const cardY = this.height - 90;

    options.forEach((opt, i) => {
      const isCorrect = opt.toLowerCase() === answer.toLowerCase();
      const card = new PIXI.Graphics();
      card.beginFill(0xffffff, 0.9);
      card.lineStyle(3, 0xd1d5db);
      card.drawRoundedRect(-45, -30, 90, 60, 10);
      card.endFill();
      card.x = startX + i * spacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'pointer';
      card.alpha = 0;
      card.scale.set(0);
      container.addChild(card);
      gsap.to(card, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.3 + i * 0.1 });

      const optText = new PIXI.Text(opt, { fontSize: 12, fill: 0x333333, fontWeight: 'bold', wordWrap: true, wordWrapWidth: 80 });
      optText.anchor.set(0.5);
      optText.x = startX + i * spacing;
      optText.y = cardY;
      container.addChild(optText);

      card.on('pointerover', () => { if (!solved) card.scale.set(1.08); });
      card.on('pointerout', () => { if (!solved) card.scale.set(1); });

      card.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        if (isCorrect) {
          solved = true;
          card.clear();
          card.beginFill(0xd1fae5, 0.9);
          card.lineStyle(3, 0x22c55e);
          card.drawRoundedRect(-45, -30, 90, 60, 10);
          card.endFill();
          shapeG.tint = 0x22c55e;
          this.playSound('success');
          this.callbacks.onSpeak?.(`Yes! That's a ${opt}! Great job!`);
          this.celebrate(container, cx, cy);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        } else {
          this.wrongFeedback(container, card.x, card.y - 35);
          gsap.to(card, { x: card.x + 5, duration: 0.05, yoyo: true, repeat: 3 });
        }
      });
    });

    // Show-me: pulse the correct card
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Look at the shape carefully, then tap the name!');
        gsap.to(shapeG, { scale: 1.1, duration: 0.5, yoyo: true, repeat: 2 });
      }, 1500);
    }
  }

  // ─── INTERACTIVE: Symmetry — draw lines on the shape ────────

  private renderInteractiveSymmetry(question: string, answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 140;
    const q = question.toLowerCase();
    let solved = false;

    let shape = 'square';
    let targetLines = 4;
    if (q.includes('square')) { shape = 'square'; targetLines = 4; }
    else if (q.includes('circle')) { shape = 'circle'; targetLines = 999; }
    else if (q.includes('triangle') || q.includes('equilateral')) { shape = 'triangle'; targetLines = 3; }
    else if (q.includes('rectangle')) { shape = 'rectangle'; targetLines = 2; }
    else if (q.includes('pentagon')) { shape = 'pentagon'; targetLines = 5; }
    else if (q.includes('hexagon')) { shape = 'hexagon'; targetLines = 6; }

    const title = new PIXI.Text('👆 Click the shape to draw symmetry lines!', {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Draw shape
    const shapeG = new PIXI.Graphics();
    shapeG.x = cx;
    shapeG.y = cy;
    shapeG.lineStyle(3, 0x6c5ce7);
    shapeG.beginFill(0x6c5ce7, 0.1);
    const r = 60;
    this.drawShape(shapeG, shape, r);
    shapeG.endFill();
    container.addChild(shapeG);

    // Lines container
    const linesContainer = new PIXI.Container();
    linesContainer.x = cx;
    linesContainer.y = cy;
    container.addChild(linesContainer);

    let lineCount = 0;
    const countText = new PIXI.Text(`Lines: 0`, { fontSize: 18, fill: 0x6c5ce7, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + r + 25;
    container.addChild(countText);

    // Click on shape to add a symmetry line
    const clickArea = new PIXI.Graphics();
    clickArea.beginFill(0xffffff, 0.001);
    this.drawShape(clickArea, shape, r);
    clickArea.endFill();
    clickArea.x = cx;
    clickArea.y = cy;
    clickArea.eventMode = 'static';
    clickArea.cursor = 'pointer';
    container.addChild(clickArea);

    const targetLineAngles: number[] = [];
    if (targetLines === 999) {
      for (let i = 0; i < 8; i++) targetLineAngles.push((i / 8) * Math.PI);
    } else {
      for (let i = 0; i < targetLines; i++) {
        targetLineAngles.push((i / targetLines) * Math.PI * 2 - Math.PI / 2);
      }
    }

    const drawnAngles: number[] = [];

    clickArea.on('pointertap', (e: PIXI.FederatedPointerEvent) => {
      if (solved) return;
      const pos = e.global;
      const dx = pos.x - cx;
      const dy = pos.y - cy;
      const angle = Math.atan2(dy, dx);

      // Check if this angle is close to a target
      let closest = -1;
      let closestDiff = 999;
      targetLineAngles.forEach((ta, i) => {
        if (drawnAngles.includes(i)) return;
        const diff = Math.abs(this.angleDiff(angle, ta));
        if (diff < closestDiff) { closestDiff = diff; closest = i; }
      });

      if (closest >= 0 && closestDiff < 0.4) {
        drawnAngles.push(closest);
        const ta = targetLineAngles[closest];
        const line = new PIXI.Graphics();
        line.lineStyle(2, 0xef4444, 0.8);
        line.moveTo(0, 0);
        if (targetLines === 999) {
          line.lineTo(Math.cos(ta) * r, Math.sin(ta) * r);
          line.lineTo(Math.cos(ta + Math.PI) * r, Math.sin(ta + Math.PI) * r);
        } else {
          line.lineTo(Math.cos(ta) * r, Math.sin(ta) * r);
        }
        line.alpha = 0;
        linesContainer.addChild(line);
        gsap.to(line, { alpha: 1, duration: 0.3 });
        this.playSound('pop');
        lineCount++;
        countText.text = `Lines: ${lineCount}`;
        gsap.to(countText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });
        this.callbacks.onMascotMood?.('happy');

        const totalNeeded = targetLines === 999 ? 8 : targetLines;
        if (lineCount === totalNeeded && !solved) {
          solved = true;
          countText.text = `${lineCount} lines! 🎉`;
          countText.style.fill = 0x22c55e;
          this.playSound('success');
          this.callbacks.onSpeak?.(`${lineCount} lines of symmetry! Great job!`);
          this.celebrate(container, cx, cy);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        }
      } else {
        this.wrongFeedback(container, pos.x, pos.y);
      }
    });

    // Show-me: draw the first line
    if (this.showMeActive && targetLineAngles[0] !== undefined) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Click to draw a symmetry line!');
        const ta = targetLineAngles[0];
        const line = new PIXI.Graphics();
        line.lineStyle(2, 0xef4444, 0.4);
        line.moveTo(0, 0);
        line.lineTo(Math.cos(ta) * r, Math.sin(ta) * r);
        linesContainer.addChild(line);
        gsap.from(line, { alpha: 0, duration: 0.5 });
      }, 1500);
    }

    // Adaptive: draw first line as a hint
    if (this.adaptiveEasier && targetLineAngles[0] !== undefined) {
      const ta = targetLineAngles[0];
      const line = new PIXI.Graphics();
      line.lineStyle(2, 0xef4444, 0.3);
      line.moveTo(0, 0);
      line.lineTo(Math.cos(ta) * r, Math.sin(ta) * r);
      linesContainer.addChild(line);
    }
  }

  // ─── INTERACTIVE: Decimals — click grid cells ────────────────

  private renderInteractiveDecimal(question: string, answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();
    let solved = false;

    const decMatch = q.match(/(\d+)\.(\d+)/);
    let wholePart = 0, decPart = '0';
    if (decMatch) { wholePart = parseInt(decMatch[1]); decPart = decMatch[2]; }
    const fullValue = parseFloat(`${wholePart}.${decPart}`);
    const totalCells = Math.round(fullValue * 10); // tenths grid

    const title = new PIXI.Text(`👆 Click squares to show ${wholePart}.${decPart}!`, {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // 10x1 grid (tenths) or 10x10 (hundredths)
    const isHundredths = decPart.length > 1;
    const gridSize = isHundredths ? 10 : 10;
    const rows = isHundredths ? 10 : 1;
    const cellSize = isHundredths ? 16 : 40;
    const gridW = gridSize * cellSize;
    const gridH = rows * cellSize;

    const grid = new PIXI.Graphics();
    grid.x = cx;
    grid.y = cy;
    grid.beginFill(0xe5e7eb);
    grid.drawRect(-gridW / 2, -gridH / 2, gridW, gridH);
    grid.endFill();
    grid.lineStyle(1, 0x9ca3af, 0.5);
    for (let i = 0; i <= gridSize; i++) {
      grid.moveTo(-gridW / 2 + i * cellSize, -gridH / 2);
      grid.lineTo(-gridW / 2 + i * cellSize, gridH / 2);
    }
    for (let j = 0; j <= rows; j++) {
      grid.moveTo(-gridW / 2, -gridH / 2 + j * cellSize);
      grid.lineTo(gridW / 2, -gridH / 2 + j * cellSize);
    }
    container.addChild(grid);

    let filledCount = 0;
    const countText = new PIXI.Text('0', { fontSize: 20, fill: 0x6c5ce7, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + gridH / 2 + 30;
    container.addChild(countText);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cell = new PIXI.Graphics();
        cell.beginFill(0xffffff, 0.001);
        cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
        cell.endFill();
        cell.x = cx - gridW / 2 + col * cellSize + cellSize / 2;
        cell.y = cy - gridH / 2 + row * cellSize + cellSize / 2;
        cell.eventMode = 'static';
        cell.cursor = 'pointer';
        container.addChild(cell);

        let filled = false;
        cell.on('pointertap', () => {
          if (solved) return;
          filled = !filled;
          cell.clear();
          cell.beginFill(filled ? 0x6c5ce7 : 0xffffff, filled ? 0.6 : 0.001);
          cell.drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
          cell.endFill();
          filledCount += filled ? 1 : -1;
          this.playSound('pop');
          countText.text = `${filledCount}`;

          if (filledCount === totalCells && !solved) {
            solved = true;
            countText.text = `${wholePart}.${decPart}! 🎉`;
            countText.style.fill = 0x22c55e;
            this.playSound('success');
            this.callbacks.onSpeak?.(`${wholePart}.${decPart}! Great job!`);
            this.celebrate(container, cx, cy);
            setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
          }
        });
      }
    }

    // Show-me: pulse first cell
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Click squares to fill the decimal!');
        const firstCell = container.children.find(c => c instanceof PIXI.Graphics && c.eventMode === 'static') as PIXI.Graphics | undefined;
        if (firstCell) gsap.to(firstCell, { alpha: 0.3, duration: 0.3, yoyo: true, repeat: 3 });
      }, 1500);
    }

    // Adaptive: pre-fill 20%
    if (this.adaptiveEasier) {
      const preFill = Math.floor(totalCells * 0.2);
      const cells = container.children.filter(c => c instanceof PIXI.Graphics && c.eventMode === 'static') as PIXI.Graphics[];
      for (let i = 0; i < preFill && i < cells.length; i++) {
        cells[i].clear();
        cells[i].beginFill(0x6c5ce7, 0.6);
        cells[i].drawRect(-cellSize / 2, -cellSize / 2, cellSize, cellSize);
        cells[i].endFill();
        filledCount++;
      }
      countText.text = `${filledCount}`;
    }
  }

  // ─── INTERACTIVE: Prime/Composite — tap factors ─────────────

  private renderInteractivePrimeComposite(question: string, answer: string, options: string[]): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();
    let solved = false;

    const numMatch = q.match(/\b(\d+)\b/);
    const num = numMatch ? parseInt(numMatch[1]) : 24;

    const factors: number[] = [];
    for (let i = 1; i <= num; i++) if (num % i === 0) factors.push(i);
    const isPrime = factors.length === 2;

    const title = new PIXI.Text(`👆 Tap ALL factors of ${num}!`, {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Draw factor boxes
    const boxSize = 36;
    const spacing = 42;
    const cols = Math.min(factors.length, 8);
    const startX = cx - ((cols - 1) * spacing) / 2;

    let tappedCount = 0;
    const tapped: boolean[] = new Array(factors.length).fill(false);

    const countText = new PIXI.Text(`Factors found: 0 / ${factors.length}`, {
      fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + Math.ceil(factors.length / cols) * spacing + 30;
    container.addChild(countText);

    factors.forEach((f, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const box = new PIXI.Graphics();
      box.beginFill(0xbfdbfe);
      box.lineStyle(2, 0x3b82f6);
      box.drawRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 6);
      box.endFill();
      box.x = startX + col * spacing;
      box.y = cy + row * spacing;
      box.eventMode = 'static';
      box.cursor = 'pointer';
      box.alpha = 0;
      box.scale.set(0);
      container.addChild(box);
      gsap.to(box, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.2 + i * 0.08 });

      const numText = new PIXI.Text(String(f), { fontSize: 16, fill: 0x333333, fontWeight: 'bold' });
      numText.anchor.set(0.5);
      numText.x = startX + col * spacing;
      numText.y = cy + row * spacing;
      numText.alpha = 0;
      container.addChild(numText);
      gsap.to(numText, { alpha: 1, duration: 0.3, delay: 0.3 + i * 0.08 });

      box.on('pointertap', () => {
        if (solved || tapped[i]) return;
        tapped[i] = true;
        tappedCount++;
        this.playSound('pop');
        box.clear();
        box.beginFill(0x22c55e);
        box.lineStyle(2, 0x16a34a);
        box.drawRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 6);
        box.endFill();
        numText.style.fill = 0xffffff;
        this.callbacks.onSpeak?.(String(f));
        countText.text = `Factors found: ${tappedCount} / ${factors.length}`;
        gsap.to(countText.scale, { x: 1.1, y: 1.1, duration: 0.15, yoyo: true, repeat: 1 });

        if (tappedCount === factors.length && !solved) {
          solved = true;
          countText.text = `${num} is ${isPrime ? 'PRIME' : 'COMPOSITE'}! 🎉`;
          countText.style.fill = isPrime ? 0xef4444 : 0x3b82f6;
          this.playSound('success');
          this.callbacks.onSpeak?.(`${num} has ${factors.length} factors. It is ${isPrime ? 'prime' : 'composite'}! Great job!`);
          this.celebrate(container, cx, cy);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        }
      });
    });

    // Show-me: tap the first factor (1)
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Tap each factor!');
        const firstBox = container.children.find(c => c instanceof PIXI.Graphics && c.eventMode === 'static') as PIXI.Graphics | undefined;
        if (firstBox) gsap.to(firstBox.scale, { x: 1.3, y: 1.3, duration: 0.3, yoyo: true, repeat: 2 });
      }, 1500);
    }

    // Adaptive: pre-tap factor 1
    if (this.adaptiveEasier && factors[0] === 1) {
      tapped[0] = true;
      tappedCount = 1;
      const firstBox = container.children.find(c => c instanceof PIXI.Graphics && c.eventMode === 'static') as PIXI.Graphics | undefined;
      if (firstBox) {
        firstBox.clear();
        firstBox.beginFill(0x22c55e);
        firstBox.lineStyle(2, 0x16a34a);
        firstBox.drawRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 6);
        firstBox.endFill();
      }
      countText.text = `Factors found: 1 / ${factors.length}`;
    }
  }

  // ─── INTERACTIVE: HCF/LCM — drag common factors to center ───

  private renderInteractiveHCFLCM(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();
    let solved = false;

    const nums = q.match(/\d+/g)?.map(Number) || [12, 18];
    const isHCF = q.includes('hcf') || q.includes('greatest common');
    const factors = (n: number) => { const f: number[] = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
    const allFactors = nums.map(factors);
    const common = allFactors[0].filter(f => allFactors.every(af => af.includes(f)));
    const result = isHCF ? Math.max(...common) : nums.reduce((a, b) => (a * b) / common.reduce((x, y) => Math.max(x, y)));

    const title = new PIXI.Text(`👆 Tap the COMMON factors of ${nums[0]} and ${nums[1]}!`, {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Venn diagram
    const r = 60;
    const overlap = 25;
    const left = new PIXI.Graphics();
    left.lineStyle(3, 0x3b82f6);
    left.beginFill(0x3b82f6, 0.1);
    left.drawCircle(0, 0, r);
    left.endFill();
    left.x = cx - overlap;
    left.y = cy;
    container.addChild(left);

    const right = new PIXI.Graphics();
    right.lineStyle(3, 0xef4444);
    right.beginFill(0xef4444, 0.1);
    right.drawCircle(0, 0, r);
    right.endFill();
    right.x = cx + overlap;
    right.y = cy;
    container.addChild(right);

    // Labels
    const leftLabel = new PIXI.Text(String(nums[0]), { fontSize: 18, fill: 0x3b82f6, fontWeight: 'bold' });
    leftLabel.anchor.set(0.5);
    leftLabel.x = cx - overlap - r * 0.6;
    leftLabel.y = cy;
    container.addChild(leftLabel);

    const rightLabel = new PIXI.Text(String(nums[1]), { fontSize: 18, fill: 0xef4444, fontWeight: 'bold' });
    rightLabel.anchor.set(0.5);
    rightLabel.x = cx + overlap + r * 0.6;
    rightLabel.y = cy;
    container.addChild(rightLabel);

    // Common factors as tappable boxes in center
    let tappedCount = 0;
    const tapped: boolean[] = new Array(common.length).fill(false);

    const countText = new PIXI.Text(`Common: 0 / ${common.length}`, { fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold' });
    countText.anchor.set(0.5);
    countText.x = cx;
    countText.y = cy + r + 25;
    container.addChild(countText);

    const boxSpacing = 32;
    const boxStartX = cx - ((common.length - 1) * boxSpacing) / 2;

    common.forEach((f, i) => {
      const box = new PIXI.Graphics();
      box.beginFill(0xfef3c7);
      box.lineStyle(2, 0xf59e0b);
      box.drawRoundedRect(-13, -13, 26, 26, 4);
      box.endFill();
      box.x = boxStartX + i * boxSpacing;
      box.y = cy;
      box.eventMode = 'static';
      box.cursor = 'pointer';
      box.alpha = 0;
      box.scale.set(0);
      container.addChild(box);
      gsap.to(box, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.3 + i * 0.1 });

      const fText = new PIXI.Text(String(f), { fontSize: 12, fill: 0x333333, fontWeight: 'bold' });
      fText.anchor.set(0.5);
      fText.x = boxStartX + i * boxSpacing;
      fText.y = cy;
      fText.alpha = 0;
      container.addChild(fText);
      gsap.to(fText, { alpha: 1, duration: 0.3, delay: 0.4 + i * 0.1 });

      box.on('pointertap', () => {
        if (solved || tapped[i]) return;
        tapped[i] = true;
        tappedCount++;
        this.playSound('pop');
        box.clear();
        box.beginFill(0x22c55e);
        box.lineStyle(2, 0x16a34a);
        box.drawRoundedRect(-13, -13, 26, 26, 4);
        box.endFill();
        fText.style.fill = 0xffffff;
        this.callbacks.onSpeak?.(String(f));
        countText.text = `Common: ${tappedCount} / ${common.length}`;

        if (tappedCount === common.length && !solved) {
          solved = true;
          countText.text = `${isHCF ? 'HCF' : 'LCM'} = ${result}! 🎉`;
          countText.style.fill = 0x22c55e;
          this.playSound('success');
          this.callbacks.onSpeak?.(`${isHCF ? 'HCF' : 'LCM'} is ${result}! Great job!`);
          this.celebrate(container, cx, cy);
          setTimeout(() => this.callbacks.onAnswer?.(String(result)), 1500);
        }
      });
    });

    // Show-me
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Tap the common factors in the center!');
        const firstBox = container.children.find(c => c instanceof PIXI.Graphics && c.eventMode === 'static') as PIXI.Graphics | undefined;
        if (firstBox) gsap.to(firstBox.scale, { x: 1.4, y: 1.4, duration: 0.3, yoyo: true, repeat: 2 });
      }, 1500);
    }

    // Adaptive: pre-tap factor 1
    if (this.adaptiveEasier && common[0] === 1) {
      tapped[0] = true;
      tappedCount = 1;
      const firstBox = container.children.find(c => c instanceof PIXI.Graphics && c.eventMode === 'static') as PIXI.Graphics | undefined;
      if (firstBox) {
        firstBox.clear();
        firstBox.beginFill(0x22c55e);
        firstBox.lineStyle(2, 0x16a34a);
        firstBox.drawRoundedRect(-13, -13, 26, 26, 4);
        firstBox.endFill();
      }
      countText.text = `Common: 1 / ${common.length}`;
    }
  }

  // ─── INTERACTIVE: Pattern — drag next number ────────────────

  private renderInteractivePattern(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();
    let solved = false;

    const nums = q.match(/\d+/g)?.map(Number) || [3, 6, 9, 12];
    const diff = nums.length >= 2 ? nums[1] - nums[0] : 1;
    const next1 = nums[nums.length - 1] + diff;

    const title = new PIXI.Text('👆 Drag the correct number to the ? box!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    const spacing = 55;
    const startX = cx - ((nums.length) * spacing) / 2;

    // Sequence boxes
    nums.forEach((n, i) => {
      const box = new PIXI.Graphics();
      box.beginFill(0x6c5ce7, 0.2);
      box.lineStyle(3, 0x6c5ce7);
      box.drawRoundedRect(-22, -22, 44, 44, 8);
      box.endFill();
      box.x = startX + i * spacing;
      box.y = cy;
      container.addChild(box);

      const t = new PIXI.Text(String(n), { fontSize: 20, fill: 0x6c5ce7, fontWeight: 'bold' });
      t.anchor.set(0.5);
      t.x = startX + i * spacing;
      t.y = cy;
      container.addChild(t);
    });

    // Question mark box (drop target)
    const qmX = startX + nums.length * spacing;
    const qmBox = new PIXI.Graphics();
    qmBox.beginFill(0xfef3c7);
    qmBox.lineStyle(3, 0xf59e0b, 0.5, 0.5, true);
    qmBox.drawRoundedRect(-22, -22, 44, 44, 8);
    qmBox.endFill();
    qmBox.x = qmX;
    qmBox.y = cy;
    container.addChild(qmBox);

    const qmText = new PIXI.Text('?', { fontSize: 24, fill: 0xf59e0b, fontWeight: 'bold' });
    qmText.anchor.set(0.5);
    qmText.x = qmX;
    qmText.y = cy;
    container.addChild(qmText);

    // Drag options at bottom
    const options = [next1, next1 + diff, next1 - diff, next1 + 1].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 3);
    // Ensure correct answer is included
    if (!options.includes(next1)) options[0] = next1;
    // Shuffle
    options.sort(() => Math.random() - 0.5);

    const optSpacing = 70;
    const optStartX = cx - ((options.length - 1) * optSpacing) / 2;
    const optY = this.height - 80;

    options.forEach((opt, i) => {
      const optBox = new PIXI.Graphics();
      optBox.beginFill(0xffffff, 0.9);
      optBox.lineStyle(3, 0xa855f7);
      optBox.drawRoundedRect(-25, -25, 50, 50, 8);
      optBox.endFill();
      optBox.x = optStartX + i * optSpacing;
      optBox.y = optY;
      optBox.eventMode = 'static';
      optBox.cursor = 'grab';
      container.addChild(optBox);

      const optText = new PIXI.Text(String(opt), { fontSize: 20, fill: 0xa855f7, fontWeight: 'bold' });
      optText.anchor.set(0.5);
      optText.x = optStartX + i * optSpacing;
      optText.y = optY;
      container.addChild(optText);

      let dragging = false;
      let offsetX = 0, offsetY = 0;
      const origX = optBox.x, origY = optBox.y;

      optBox.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
        if (solved) return;
        dragging = true;
        optBox.cursor = 'grabbing';
        this.playSound('pickup');
        const pos = e.global;
        offsetX = pos.x - optBox.x;
        offsetY = pos.y - optBox.y;
        container.setChildIndex(optBox, container.children.length - 1);
        container.setChildIndex(optText, container.children.length - 1);
      });

      optBox.on('pointermove', (e: PIXI.FederatedPointerEvent) => {
        if (!dragging) return;
        const pos = e.global;
        optBox.x = pos.x - offsetX;
        optBox.y = pos.y - offsetY;
        optText.x = optBox.x;
        optText.y = optBox.y;
      });

      const checkDrop = () => {
        if (!dragging) return;
        dragging = false;
        optBox.cursor = 'grab';
        const dx = optBox.x - qmX;
        const dy = optBox.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 35) {
          if (opt === next1 && !solved) {
            solved = true;
            this.playSound('pop');
            gsap.to([optBox, optText], { x: qmX, y: cy, duration: 0.2 });
            optBox.clear();
            optBox.beginFill(0xd1fae5);
            optBox.lineStyle(3, 0x22c55e);
            optBox.drawRoundedRect(-25, -25, 50, 50, 8);
            optBox.endFill();
            optText.style.fill = 0x22c55e;
            qmText.text = '';
            this.playSound('success');
            this.callbacks.onSpeak?.(`${next1}! The pattern goes up by ${diff}! Great job!`);
            this.celebrate(container, qmX, cy);
            setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
          } else {
            this.wrongFeedback(container, optBox.x, optBox.y - 30);
            gsap.to([optBox, optText], { x: origX, y: origY, duration: 0.3 });
          }
        } else {
          gsap.to([optBox, optText], { x: origX, y: origY, duration: 0.3 });
        }
      };

      optBox.on('pointerup', checkDrop);
      optBox.on('pointerupoutside', () => {
        if (!dragging) return;
        dragging = false;
        optBox.cursor = 'grab';
        gsap.to([optBox, optText], { x: origX, y: origY, duration: 0.3 });
      });
    });

    // Show-me
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Drag the next number to the question mark!');
        gsap.to(qmBox, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 2 });
      }, 1500);
    }

    // Adaptive: show the diff as a hint
    if (this.adaptiveEasier) {
      const hint = new PIXI.Text(`Hint: +${diff} each time`, { fontSize: 14, fill: 0x3b82f6, fontWeight: 'bold' });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = cy + 50;
      container.addChild(hint);
    }
  }

  // ─── INTERACTIVE: Roman Numerals — drag symbols ─────────────

  private renderInteractiveRomanNumeral(question: string, answer: string): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    let solved = false;

    const title = new PIXI.Text('👆 Drag Roman symbols to build the number!', {
      fontSize: 13, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Target value from question
    const q = question.toLowerCase();
    const numMatch = q.match(/(\d+)/);
    const targetNum = numMatch ? parseInt(numMatch[1]) : 14;

    // Build area
    const buildBox = new PIXI.Graphics();
    buildBox.beginFill(0xfef3c7, 0.5);
    buildBox.lineStyle(3, 0xf59e0b, 0.5, 0.5, true);
    buildBox.drawRoundedRect(-80, -25, 160, 50, 10);
    buildBox.endFill();
    buildBox.x = cx;
    buildBox.y = cy;
    container.addChild(buildBox);

    const buildText = new PIXI.Text('', { fontSize: 24, fill: 0xf59e0b, fontWeight: 'bold', fontFamily: 'Georgia, serif' });
    buildText.anchor.set(0.5);
    buildText.x = cx;
    buildText.y = cy;
    container.addChild(buildText);

    const valueText = new PIXI.Text(`Value: 0 / ${targetNum}`, { fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold' });
    valueText.anchor.set(0.5);
    valueText.x = cx;
    valueText.y = cy + 45;
    container.addChild(valueText);

    // Roman symbols to drag
    const symbols = [
      { roman: 'I', value: 1 },
      { roman: 'V', value: 5 },
      { roman: 'X', value: 10 },
      { roman: 'L', value: 50 },
      { roman: 'C', value: 100 },
    ];

    let currentValue = 0;
    let currentRoman = '';

    const symSpacing = 60;
    const symStartX = cx - ((symbols.length - 1) * symSpacing) / 2;
    const symY = this.height - 80;

    symbols.forEach((sym, i) => {
      const symBox = new PIXI.Graphics();
      symBox.beginFill(0xffffff, 0.9);
      symBox.lineStyle(3, 0x6c5ce7);
      symBox.drawRoundedRect(-22, -22, 44, 44, 8);
      symBox.endFill();
      symBox.x = symStartX + i * symSpacing;
      symBox.y = symY;
      symBox.eventMode = 'static';
      symBox.cursor = 'pointer';
      container.addChild(symBox);

      const symText = new PIXI.Text(sym.roman, { fontSize: 20, fill: 0x6c5ce7, fontWeight: 'bold', fontFamily: 'Georgia, serif' });
      symText.anchor.set(0.5);
      symText.x = symStartX + i * symSpacing;
      symText.y = symY;
      container.addChild(symText);

      symBox.on('pointerover', () => { if (!solved) symBox.scale.set(1.1); });
      symBox.on('pointerout', () => { if (!solved) symBox.scale.set(1); });

      symBox.on('pointertap', () => {
        if (solved) return;
        this.playSound('pop');
        currentValue += sym.value;
        currentRoman += sym.roman;
        buildText.text = currentRoman;
        valueText.text = `Value: ${currentValue} / ${targetNum}`;
        gsap.to(buildText.scale, { x: 1.2, y: 1.2, duration: 0.15, yoyo: true, repeat: 1 });
        this.callbacks.onSpeak?.(sym.roman);

        if (currentValue === targetNum && !solved) {
          solved = true;
          buildText.style.fill = 0x22c55e;
          valueText.text = `${currentRoman} = ${targetNum}! 🎉`;
          valueText.style.fill = 0x22c55e;
          this.playSound('success');
          this.callbacks.onSpeak?.(`${currentRoman} equals ${targetNum}! Great job!`);
          this.celebrate(container, cx, cy);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        } else if (currentValue > targetNum) {
          // Reset
          this.wrongFeedback(container, cx, cy - 30);
          setTimeout(() => {
            currentValue = 0;
            currentRoman = '';
            buildText.text = '';
            valueText.text = `Value: 0 / ${targetNum}`;
          }, 500);
        }
      });
    });

    // Reset button
    const resetBtn = new PIXI.Text('↩️ Reset', { fontSize: 14, fill: 0xef4444, fontWeight: 'bold' });
    resetBtn.anchor.set(0.5);
    resetBtn.x = this.width - 50;
    resetBtn.y = 25;
    resetBtn.eventMode = 'static';
    resetBtn.cursor = 'pointer';
    container.addChild(resetBtn);
    resetBtn.on('pointertap', () => {
      if (solved) return;
      this.playSound('whoosh');
      currentValue = 0;
      currentRoman = '';
      buildText.text = '';
      valueText.text = `Value: 0 / ${targetNum}`;
    });

    // Show-me
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch me! Tap Roman symbols to build the number!');
        gsap.to(buildBox, { scale: 1.1, duration: 0.3, yoyo: true, repeat: 2 });
      }, 1500);
    }

    // Adaptive: show first symbol
    if (this.adaptiveEasier) {
      const hint = new PIXI.Text(`Hint: Start with ${answer[0] || 'X'}`, { fontSize: 14, fill: 0x3b82f6, fontWeight: 'bold' });
      hint.anchor.set(0.5);
      hint.x = cx;
      hint.y = cy + 70;
      container.addChild(hint);
    }
  }

  // ─── INTERACTIVE: Generic option cards (science topics) ─────
  // Used for physical/chemical, circulatory, agriculture, disasters,
  // mixtures, computer history, environment, transport, air.

  private renderInteractiveOptionCards(
    question: string,
    answer: string,
    options: string[],
    topic: string,
  ): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 140;
    let solved = false;

    const title = new PIXI.Text('👆 Tap the correct answer card!', {
      fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = 25;
    container.addChild(title);

    // Topic-specific emoji/icon
    const topicEmojis: Record<string, string> = {
      physical_chemical: '🔬',
      circulatory: '❤️',
      agriculture: '🌾',
      disaster: '🌍',
      mixture: '🧪',
      computer: '💻',
      environment: '🌳',
      transport: '🚗',
      air: '💨',
    };
    const topicEmoji = topicEmojis[topic] || '❓';

    const bigEmoji = new PIXI.Text(topicEmoji, { fontSize: 48 });
    bigEmoji.anchor.set(0.5);
    bigEmoji.x = cx;
    bigEmoji.y = cy - 10;
    bigEmoji.alpha = 0;
    bigEmoji.scale.set(0);
    container.addChild(bigEmoji);
    gsap.to(bigEmoji, { alpha: 1, pixi: { scale: 1 }, duration: 0.5, delay: 0.2 });

    // Option cards
    const spacing = Math.min(110, (this.width - 40) / options.length);
    const startX = cx - ((options.length - 1) * spacing) / 2;
    const cardY = cy + 70;

    options.forEach((opt, i) => {
      const isCorrect = opt.toLowerCase() === answer.toLowerCase();
      const card = new PIXI.Graphics();
      card.beginFill(0xffffff, 0.9);
      card.lineStyle(3, 0xd1d5db);
      card.drawRoundedRect(-48, -32, 96, 64, 10);
      card.endFill();
      card.x = startX + i * spacing;
      card.y = cardY;
      card.eventMode = 'static';
      card.cursor = 'pointer';
      card.alpha = 0;
      card.scale.set(0);
      container.addChild(card);
      gsap.to(card, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.4 + i * 0.1 });

      const optText = new PIXI.Text(opt, {
        fontSize: 11, fill: 0x333333, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: 88, align: 'center',
      });
      optText.anchor.set(0.5);
      optText.x = startX + i * spacing;
      optText.y = cardY;
      container.addChild(optText);

      card.on('pointerover', () => { if (!solved) card.scale.set(1.08); });
      card.on('pointerout', () => { if (!solved) card.scale.set(1); });

      card.on('pointertap', () => {
        if (solved) return;
        this.playSound('tap');
        if (isCorrect) {
          solved = true;
          card.clear();
          card.beginFill(0xd1fae5, 0.9);
          card.lineStyle(3, 0x22c55e);
          card.drawRoundedRect(-48, -32, 96, 64, 10);
          card.endFill();
          optText.style.fill = 0x16a34a;
          this.playSound('success');
          this.callbacks.onSpeak?.(`Yes! ${opt}! Great job!`);
          this.celebrate(container, cx, cardY);
          setTimeout(() => this.callbacks.onAnswer?.(answer), 1500);
        } else {
          this.wrongFeedback(container, card.x, card.y - 35);
          gsap.to(card, { x: card.x + 5, duration: 0.05, yoyo: true, repeat: 3 });
          this.callbacks.onSpeak?.('Not quite. Try again!');
        }
      });
    });

    // Show-me: pulse the correct card
    if (this.showMeActive) {
      setTimeout(() => {
        this.callbacks.onSpeak?.('Watch the cards carefully, then tap the right one!');
        gsap.to(bigEmoji, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 2 });
      }, 1500);
    }

    // Adaptive: highlight the correct card subtly
    if (this.adaptiveEasier) {
      options.forEach((opt, i) => {
        if (opt.toLowerCase() === answer.toLowerCase()) {
          const x = startX + i * spacing;
          const hint = new PIXI.Graphics();
          hint.lineStyle(2, 0x22c55e, 0.3);
          hint.drawRoundedRect(-52, -36, 104, 72, 12);
          hint.x = x;
          hint.y = cardY;
          container.addChild(hint);
          gsap.to(hint, { alpha: 0.6, duration: 0.5, yoyo: true, repeat: -1 });
        }
      });
    }
  }

  // ─── Helper: draw 3D shape ──────────────────────────────────

  private draw3DShape(g: PIXI.Graphics, shapeType: string, color: number): void {
    g.lineStyle(3, color);
    g.beginFill(color, 0.15);
    switch (shapeType) {
      case 'cube': {
        const s = 50;
        g.drawRect(-s, -s, s * 2, s * 2);
        g.moveTo(-s, -s); g.lineTo(-s + 25, -s - 20); g.lineTo(s + 25, -s - 20); g.lineTo(s, -s); g.closePath();
        g.moveTo(s, -s); g.lineTo(s + 25, -s - 20); g.lineTo(s + 25, s - 20); g.lineTo(s, s); g.closePath();
        break;
      }
      case 'cylinder':
        g.drawRect(-40, -40, 80, 80);
        g.drawEllipse(0, -40, 40, 12);
        g.drawEllipse(0, 40, 40, 12);
        break;
      case 'sphere':
        g.drawCircle(0, 0, 50);
        g.lineStyle(1, color, 0.3);
        g.drawEllipse(0, 0, 50, 15);
        break;
      case 'cone':
        g.moveTo(0, -50); g.lineTo(-40, 40); g.lineTo(40, 40); g.closePath();
        g.drawEllipse(0, 40, 40, 12);
        break;
      case 'pyramid':
        g.moveTo(0, -55); g.lineTo(-45, 40); g.lineTo(45, 40); g.closePath();
        g.moveTo(-45, 40); g.lineTo(-25, 55); g.lineTo(45, 40); g.lineTo(25, 55); g.closePath();
        break;
      default:
        g.drawRect(-40, -40, 80, 80);
    }
    g.endFill();
  }

  // ─── Helper: draw shape for symmetry ────────────────────────

  private drawShape(g: PIXI.Graphics, shape: string, r: number): void {
    switch (shape) {
      case 'square': g.drawRect(-r, -r, r * 2, r * 2); break;
      case 'circle': g.drawCircle(0, 0, r); break;
      case 'triangle': g.moveTo(0, -r); g.lineTo(-r, r); g.lineTo(r, r); g.closePath(); break;
      case 'rectangle': g.drawRect(-r, -r * 0.6, r * 2, r * 1.2); break;
      case 'pentagon':
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * r, y = Math.sin(a) * r;
          if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.closePath(); break;
      case 'hexagon':
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const x = Math.cos(a) * r, y = Math.sin(a) * r;
          if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.closePath(); break;
    }
  }

  // ─── Helper: angle difference ───────────────────────────────

  private angleDiff(a: number, b: number): number {
    let d = a - b;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    return d;
  }

  // ─── Class 5 Math: Angle ────────────────────────────────────

  private renderAngle(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 160;
    const r = 80;

    // Determine angle type from question or answer
    const q = question.toLowerCase();
    const a = answer.toLowerCase();
    let angleDeg = 90;
    let label = 'Right Angle';
    if (a.includes('acute') || q.includes('acute')) { angleDeg = 45; label = 'Acute Angle'; }
    else if (a.includes('obtuse') || q.includes('obtuse')) { angleDeg = 135; label = 'Obtuse Angle'; }
    else if (a.includes('straight') || q.includes('straight')) { angleDeg = 180; label = 'Straight Angle'; }
    else if (a.includes('reflex') || q.includes('reflex')) { angleDeg = 270; label = 'Reflex Angle'; }
    else if (a.includes('right') || q.includes('right') || q.includes('90')) { angleDeg = 90; label = 'Right Angle'; }

    // Match from question number
    const angleMatch = q.match(/(\d+)\s*degree/);
    if (angleMatch) angleDeg = parseInt(angleMatch[1]);

    const angleRad = (angleDeg * Math.PI) / 180;

    // Base line (horizontal)
    const baseLine = new PIXI.Graphics();
    baseLine.lineStyle(4, 0x333333);
    baseLine.moveTo(0, 0);
    baseLine.lineTo(r, 0);
    baseLine.x = cx;
    baseLine.y = cy;
    baseLine.alpha = 0;
    container.addChild(baseLine);
    gsap.to(baseLine, { alpha: 1, duration: 0.3, delay: 0.2 });

    // Angle line
    const angleLine = new PIXI.Graphics();
    angleLine.lineStyle(4, showCorrect ? 0x22c55e : 0x6c5ce7);
    angleLine.moveTo(0, 0);
    angleLine.lineTo(r * Math.cos(angleRad), -r * Math.sin(angleRad));
    angleLine.x = cx;
    angleLine.y = cy;
    angleLine.alpha = 0;
    container.addChild(angleLine);
    gsap.to(angleLine, { alpha: 1, duration: 0.4, delay: 0.5 });

    // Arc showing the angle
    const arc = new PIXI.Graphics();
    arc.lineStyle(3, showCorrect ? 0x22c55e : 0xa855f7, 0.7);
    arc.arc(0, 0, 30, 0, -angleRad, true);
    arc.x = cx;
    arc.y = cy;
    arc.alpha = 0;
    container.addChild(arc);
    gsap.to(arc, { alpha: 1, duration: 0.4, delay: 0.8 });

    // Vertex point
    const vertex = new PIXI.Graphics();
    vertex.beginFill(0x333333);
    vertex.drawCircle(0, 0, 5);
    vertex.endFill();
    vertex.x = cx;
    vertex.y = cy;
    container.addChild(vertex);

    // Label
    const labelText = showCorrect ? `${label} (${angleDeg}°)` : `${angleDeg}°`;
    const labelObj = new PIXI.Text(labelText, {
      fontSize: 20, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold',
    });
    labelObj.anchor.set(0.5);
    labelObj.x = cx;
    labelObj.y = cy - r - 20;
    labelObj.alpha = 0;
    container.addChild(labelObj);
    gsap.to(labelObj, { alpha: 1, duration: 0.3, delay: 1.0 });
  }

  // ─── Class 5 Math: Perimeter ────────────────────────────────

  private renderPerimeter(question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let side = 6;
    let length = 8, breadth = 5;
    let shape = 'square';

    const sqMatch = q.match(/square.*?side\s*(\d+)/);
    if (sqMatch) { side = parseInt(sqMatch[1]); shape = 'square'; }
    const rectMatch = q.match(/(?:length|long)\s*(\d+).*?(?:breadth|wide|width)\s*(\d+)/);
    if (rectMatch) { length = parseInt(rectMatch[1]); breadth = parseInt(rectMatch[2]); shape = 'rectangle'; }
    const rectMatch2 = q.match(/(\d+)\s*m\s*long.*?(\d+)\s*m\s*wide/);
    if (rectMatch2) { length = parseInt(rectMatch2[1]); breadth = parseInt(rectMatch2[2]); shape = 'rectangle'; }

    const cx = this.width / 2;
    const cy = 130;
    const scale = 3;
    const w = (shape === 'square' ? side : length) * scale;
    const h = (shape === 'square' ? side : breadth) * scale;

    // Shape
    const rect = new PIXI.Graphics();
    rect.lineStyle(4, showCorrect ? 0x22c55e : 0x6c5ce7);
    rect.beginFill(0x6c5ce7, 0.1);
    rect.drawRect(-w / 2, -h / 2, w, h);
    rect.endFill();
    rect.x = cx;
    rect.y = cy;
    rect.alpha = 0;
    container.addChild(rect);
    gsap.to(rect, { alpha: 1, duration: 0.4, delay: 0.2 });

    // Side labels
    const sideLabels = shape === 'square'
      ? [{ text: `${side}`, x: cx, y: cy - h / 2 - 15 }, { text: `${side}`, x: cx + w / 2 + 15, y: cy }]
      : [{ text: `${length}`, x: cx, y: cy - h / 2 - 15 }, { text: `${breadth}`, x: cx + w / 2 + 15, y: cy }];

    sideLabels.forEach((sl, i) => {
      const t = new PIXI.Text(sl.text, {
        fontSize: 16, fill: 0x6c5ce7, fontWeight: 'bold',
      });
      t.anchor.set(0.5);
      t.x = sl.x;
      t.y = sl.y;
      t.alpha = 0;
      container.addChild(t);
      gsap.to(t, { alpha: 1, duration: 0.3, delay: 0.5 + i * 0.2 });
    });

    // Perimeter formula + answer
    const formula = shape === 'square'
      ? `4 × ${side} = ${4 * side}`
      : `2 × (${length} + ${breadth}) = ${2 * (length + breadth)}`;
    const answerText = new PIXI.Text(
      showCorrect ? `Perimeter = ${formula}` : 'Perimeter = ?',
      { fontSize: 18, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold' },
    );
    answerText.anchor.set(0.5);
    answerText.x = cx;
    answerText.y = cy + h / 2 + 30;
    answerText.alpha = 0;
    container.addChild(answerText);
    gsap.to(answerText, { alpha: 1, duration: 0.3, delay: 0.9 });
  }

  // ─── Class 5 Math: Area ─────────────────────────────────────

  private renderArea(question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();
    let length = 8, breadth = 5;
    const rectMatch = q.match(/length\s*(\d+).*?(?:breadth|width)\s*(\d+)/);
    if (rectMatch) { length = parseInt(rectMatch[1]); breadth = parseInt(rectMatch[2]); }

    const cx = this.width / 2;
    const cy = 130;
    const scale = 3;
    const w = length * scale;
    const h = breadth * scale;

    // Grid showing unit squares
    const grid = new PIXI.Graphics();
    grid.x = cx;
    grid.y = cy;
    grid.alpha = 0;

    // Fill
    grid.beginFill(0x6c5ce7, 0.1);
    grid.drawRect(-w / 2, -h / 2, w, h);
    grid.endFill();

    // Grid lines
    grid.lineStyle(1, 0x6c5ce7, 0.3);
    for (let i = 0; i <= length; i++) {
      grid.moveTo(-w / 2 + i * scale, -h / 2);
      grid.lineTo(-w / 2 + i * scale, h / 2);
    }
    for (let j = 0; j <= breadth; j++) {
      grid.moveTo(-w / 2, -h / 2 + j * scale);
      grid.lineTo(w / 2, -h / 2 + j * scale);
    }

    // Border
    grid.lineStyle(3, showCorrect ? 0x22c55e : 0x6c5ce7);
    grid.drawRect(-w / 2, -h / 2, w, h);

    container.addChild(grid);
    gsap.to(grid, { alpha: 1, duration: 0.4, delay: 0.2 });

    // Labels
    const lenLabel = new PIXI.Text(`${length} cm`, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    lenLabel.anchor.set(0.5);
    lenLabel.x = cx;
    lenLabel.y = cy - h / 2 - 15;
    lenLabel.alpha = 0;
    container.addChild(lenLabel);
    gsap.to(lenLabel, { alpha: 1, duration: 0.3, delay: 0.5 });

    const brdLabel = new PIXI.Text(`${breadth} cm`, { fontSize: 14, fill: 0x6c5ce7, fontWeight: 'bold' });
    brdLabel.anchor.set(0.5);
    brdLabel.x = cx + w / 2 + 20;
    brdLabel.y = cy;
    brdLabel.alpha = 0;
    container.addChild(brdLabel);
    gsap.to(brdLabel, { alpha: 1, duration: 0.3, delay: 0.6 });

    // Answer
    const area = length * breadth;
    const answerText = new PIXI.Text(
      showCorrect ? `Area = ${length} × ${breadth} = ${area} cm²` : 'Area = ?',
      { fontSize: 18, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold' },
    );
    answerText.anchor.set(0.5);
    answerText.x = cx;
    answerText.y = cy + h / 2 + 30;
    answerText.alpha = 0;
    container.addChild(answerText);
    gsap.to(answerText, { alpha: 1, duration: 0.3, delay: 0.9 });
  }

  // ─── Class 5 Math: 3D Shapes ────────────────────────────────

  private render3DShape(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 140;
    const q = question.toLowerCase();
    const a = answer.toLowerCase();

    // Determine which shape to draw
    let shapeType = 'cube';
    if (q.includes('cylinder') || a.includes('cylinder')) shapeType = 'cylinder';
    else if (q.includes('sphere') || a.includes('sphere')) shapeType = 'sphere';
    else if (q.includes('cone') || a.includes('cone')) shapeType = 'cone';
    else if (q.includes('pyramid') || a.includes('pyramid')) shapeType = 'pyramid';
    else if (q.includes('prism') || a.includes('prism')) shapeType = 'prism';

    const shapeColor = showCorrect ? 0x22c55e : 0x6c5ce7;
    const g = new PIXI.Graphics();
    g.x = cx;
    g.y = cy;

    switch (shapeType) {
      case 'cube': {
        // Isometric cube
        const s = 50;
        g.lineStyle(3, shapeColor);
        g.beginFill(shapeColor, 0.15);
        // Front face
        g.drawRect(-s, -s, s * 2, s * 2);
        // Top face
        g.moveTo(-s, -s);
        g.lineTo(-s + 25, -s - 20);
        g.lineTo(s + 25, -s - 20);
        g.lineTo(s, -s);
        g.closePath();
        // Right face
        g.moveTo(s, -s);
        g.lineTo(s + 25, -s - 20);
        g.lineTo(s + 25, s - 20);
        g.lineTo(s, s);
        g.closePath();
        g.endFill();
        break;
      }
      case 'cylinder': {
        g.lineStyle(3, shapeColor);
        g.beginFill(shapeColor, 0.15);
        // Body
        g.drawRect(-40, -40, 80, 80);
        // Top ellipse
        g.drawEllipse(0, -40, 40, 12);
        // Bottom ellipse
        g.drawEllipse(0, 40, 40, 12);
        g.endFill();
        break;
      }
      case 'sphere': {
        g.lineStyle(3, shapeColor);
        g.beginFill(shapeColor, 0.15);
        g.drawCircle(0, 0, 50);
        g.endFill();
        g.lineStyle(1, shapeColor, 0.3);
        g.drawEllipse(0, 0, 50, 15);
        break;
      }
      case 'cone': {
        g.lineStyle(3, shapeColor);
        g.beginFill(shapeColor, 0.15);
        g.moveTo(0, -50);
        g.lineTo(-40, 40);
        g.lineTo(40, 40);
        g.closePath();
        g.drawEllipse(0, 40, 40, 12);
        g.endFill();
        break;
      }
      case 'pyramid': {
        g.lineStyle(3, shapeColor);
        g.beginFill(shapeColor, 0.15);
        g.moveTo(0, -55);
        g.lineTo(-45, 40);
        g.lineTo(45, 40);
        g.closePath();
        // Base
        g.moveTo(-45, 40);
        g.lineTo(-25, 55);
        g.lineTo(45, 40);
        g.lineTo(25, 55);
        g.closePath();
        g.endFill();
        break;
      }
      default: {
        g.lineStyle(3, shapeColor);
        g.beginFill(shapeColor, 0.15);
        g.drawRect(-40, -40, 80, 80);
        g.endFill();
      }
    }

    g.alpha = 0;
    g.scale.set(0);
    container.addChild(g);
    gsap.to(g, { alpha: 1, pixi: { scale: 1 }, duration: 0.5, delay: 0.2 });

    // Label
    const label = new PIXI.Text(showCorrect ? answer : shapeType, {
      fontSize: 20, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold',
    });
    label.anchor.set(0.5);
    label.x = cx;
    label.y = cy + 80;
    label.alpha = 0;
    container.addChild(label);
    gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.7 });

    // If faces/edges/vertices question
    if (q.includes('faces') && q.includes('edges')) {
      const fevMap: Record<string, string> = {
        cube: '6 faces, 12 edges, 8 vertices',
        cylinder: '3 faces, 2 edges, 0 vertices',
        sphere: '1 face, 0 edges, 0 vertices',
        cone: '2 faces, 1 edge, 1 vertex',
        pyramid: '5 faces, 8 edges, 5 vertices',
      };
      const fev = fevMap[shapeType] || '';
      if (fev && showCorrect) {
        const fevText = new PIXI.Text(fev, {
          fontSize: 14, fill: 0x22c55e, fontWeight: 'bold',
        });
        fevText.anchor.set(0.5);
        fevText.x = cx;
        fevText.y = cy + 105;
        fevText.alpha = 0;
        container.addChild(fevText);
        gsap.to(fevText, { alpha: 1, duration: 0.3, delay: 0.9 });
      }
    }
  }

  // ─── Class 5 Math: Symmetry ─────────────────────────────────

  private renderSymmetry(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 140;
    const q = question.toLowerCase();

    // Determine shape
    let shape = 'square';
    let lines = 4;
    if (q.includes('square')) { shape = 'square'; lines = 4; }
    else if (q.includes('circle')) { shape = 'circle'; lines = 999; }
    else if (q.includes('triangle') || q.includes('equilateral')) { shape = 'triangle'; lines = 3; }
    else if (q.includes('rectangle')) { shape = 'rectangle'; lines = 2; }
    else if (q.includes('pentagon')) { shape = 'pentagon'; lines = 5; }
    else if (q.includes('hexagon')) { shape = 'hexagon'; lines = 6; }

    const color = showCorrect ? 0x22c55e : 0x6c5ce7;
    const g = new PIXI.Graphics();
    g.x = cx;
    g.y = cy;
    g.lineStyle(3, color);
    g.beginFill(color, 0.1);

    const r = 60;
    switch (shape) {
      case 'square':
        g.drawRect(-r, -r, r * 2, r * 2);
        break;
      case 'circle':
        g.drawCircle(0, 0, r);
        break;
      case 'triangle':
        g.moveTo(0, -r);
        g.lineTo(-r, r);
        g.lineTo(r, r);
        g.closePath();
        break;
      case 'rectangle':
        g.drawRect(-r, -r * 0.6, r * 2, r * 1.2);
        break;
      case 'pentagon':
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.closePath();
        break;
      case 'hexagon':
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.closePath();
        break;
    }
    g.endFill();
    g.alpha = 0;
    container.addChild(g);
    gsap.to(g, { alpha: 1, duration: 0.4, delay: 0.2 });

    // Draw symmetry lines
    if (showCorrect || q.includes('how many')) {
      g.lineStyle(2, 0xef4444, 0.6);
      if (lines === 999) {
        // Circle — draw several diameter lines
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI;
          g.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          g.lineTo(Math.cos(a + Math.PI) * r, Math.sin(a + Math.PI) * r);
        }
      } else {
        for (let i = 0; i < lines; i++) {
          const a = (i / lines) * Math.PI * 2 - Math.PI / 2;
          g.moveTo(0, 0);
          g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
      }
    }

    // Label
    const label = new PIXI.Text(
      showCorrect ? (lines === 999 ? 'Infinite lines of symmetry' : `${lines} lines of symmetry`) : 'Lines of symmetry?',
      { fontSize: 18, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold' },
    );
    label.anchor.set(0.5);
    label.x = cx;
    label.y = cy + r + 25;
    label.alpha = 0;
    container.addChild(label);
    gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.7 });
  }

  // ─── Class 5 Math: Advanced Fractions ───────────────────────

  private renderAdvancedFraction(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();

    // Parse fractions from question
    const fracMatches = q.match(/(\d+)\s*\/\s*(\d+)/g);
    const cx = this.width / 2;
    const cy = 130;

    if (fracMatches && fracMatches.length >= 2) {
      // Compare or add fractions — show two bars
      const fracs = fracMatches.map(f => {
        const [n, d] = f.split('/').map(Number);
        return { n, d };
      });

      const barW = 200;
      const barH = 30;
      const spacing = 50;

      fracs.forEach((frac, i) => {
        const y = cy - 30 + i * spacing;
        // Full bar
        const bar = new PIXI.Graphics();
        bar.beginFill(0xe5e7eb);
        bar.drawRect(-barW / 2, 0, barW, barH);
        bar.endFill();
        // Filled portion
        bar.beginFill(showCorrect && i === 0 ? 0x22c55e : 0x6c5ce7, 0.6);
        bar.drawRect(-barW / 2, 0, (barW * frac.n) / frac.d, barH);
        bar.endFill();
        // Dividers
        bar.lineStyle(1, 0x9ca3af);
        for (let j = 1; j < frac.d; j++) {
          bar.moveTo(-barW / 2 + (barW * j) / frac.d, 0);
          bar.lineTo(-barW / 2 + (barW * j) / frac.d, barH);
        }
        bar.x = cx;
        bar.y = y;
        bar.alpha = 0;
        container.addChild(bar);
        gsap.to(bar, { alpha: 1, duration: 0.4, delay: 0.2 + i * 0.3 });

        // Label
        const label = new PIXI.Text(`${frac.n}/${frac.d}`, {
          fontSize: 16, fill: 0x333333, fontWeight: 'bold',
        });
        label.anchor.set(0.5);
        label.x = cx;
        label.y = y + barH + 12;
        label.alpha = 0;
        container.addChild(label);
        gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.3 + i * 0.3 });
      });

      // Answer
      if (showCorrect) {
        const ansText = new PIXI.Text(`= ${answer}`, {
          fontSize: 20, fill: 0x22c55e, fontWeight: 'bold',
        });
        ansText.anchor.set(0.5);
        ansText.x = cx;
        ansText.y = cy + fracs.length * spacing + 10;
        ansText.alpha = 0;
        container.addChild(ansText);
        gsap.to(ansText, { alpha: 1, duration: 0.3, delay: 0.5 + fracs.length * 0.3 });
      }
    } else {
      // Single fraction — show as bar
      const fracMatch = q.match(/(\d+)\s*\/\s*(\d+)/);
      if (fracMatch) {
        const n = parseInt(fracMatch[1]);
        const d = parseInt(fracMatch[2]);
        const barW = 200;
        const barH = 40;

        const bar = new PIXI.Graphics();
        bar.beginFill(0xe5e7eb);
        bar.drawRect(-barW / 2, 0, barW, barH);
        bar.endFill();
        bar.beginFill(showCorrect ? 0x22c55e : 0x6c5ce7, 0.6);
        bar.drawRect(-barW / 2, 0, (barW * n) / d, barH);
        bar.endFill();
        bar.lineStyle(1, 0x9ca3af);
        for (let j = 1; j < d; j++) {
          bar.moveTo(-barW / 2 + (barW * j) / d, 0);
          bar.lineTo(-barW / 2 + (barW * j) / d, barH);
        }
        bar.x = cx;
        bar.y = cy;
        bar.alpha = 0;
        container.addChild(bar);
        gsap.to(bar, { alpha: 1, duration: 0.4, delay: 0.2 });

        const label = new PIXI.Text(`${n}/${d}${showCorrect ? ` = ${answer}` : ''}`, {
          fontSize: 20, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold',
        });
        label.anchor.set(0.5);
        label.x = cx;
        label.y = cy + barH + 20;
        label.alpha = 0;
        container.addChild(label);
        gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.5 });
      } else {
        this.renderOptionEmojis(options, question, answer, showCorrect);
      }
    }
  }

  // ─── Class 5 Math: Decimals ─────────────────────────────────

  private renderDecimal(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();

    // Parse decimal from question
    const decMatch = q.match(/(\d+)\.(\d+)/);
    if (decMatch) {
      const wholePart = parseInt(decMatch[1]);
      const decPart = decMatch[2];
      const fullValue = parseFloat(`${wholePart}.${decPart}`);

      // Show as grid — 10x10 grid for tenths/hundredths
      const gridSize = 10;
      const cellSize = 16;
      const gridW = gridSize * cellSize;

      const grid = new PIXI.Graphics();
      grid.x = cx;
      grid.y = cy;
      grid.alpha = 0;

      // Background
      grid.beginFill(0xe5e7eb);
      grid.drawRect(-gridW / 2, -gridW / 2, gridW, gridW);
      grid.endFill();

      // Fill cells representing the decimal
      const totalCells = Math.round(fullValue * gridSize);
      grid.beginFill(showCorrect ? 0x22c55e : 0x6c5ce7, 0.6);
      for (let i = 0; i < totalCells && i < gridSize * gridSize; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        grid.drawRect(-gridW / 2 + col * cellSize, -gridW / 2 + row * cellSize, cellSize, cellSize);
      }
      grid.endFill();

      // Grid lines
      grid.lineStyle(1, 0x9ca3af, 0.5);
      for (let i = 0; i <= gridSize; i++) {
        grid.moveTo(-gridW / 2 + i * cellSize, -gridW / 2);
        grid.lineTo(-gridW / 2 + i * cellSize, gridW / 2);
        grid.moveTo(-gridW / 2, -gridW / 2 + i * cellSize);
        grid.lineTo(gridW / 2, -gridW / 2 + i * cellSize);
      }

      container.addChild(grid);
      gsap.to(grid, { alpha: 1, duration: 0.4, delay: 0.2 });

      // Label
      const label = new PIXI.Text(
        `${wholePart}.${decPart}${showCorrect ? ` = ${answer}` : ''}`,
        { fontSize: 20, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold' },
      );
      label.anchor.set(0.5);
      label.x = cx;
      label.y = cy + gridW / 2 + 25;
      label.alpha = 0;
      container.addChild(label);
      gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.6 });
    } else {
      this.renderOptionEmojis(options, question, answer, showCorrect);
    }
  }

  // ─── Class 5 Math: Percentage ───────────────────────────────

  private renderPercentage(question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();

    // Parse percentage
    const pctMatch = q.match(/(\d+)\s*%/);
    const decMatch = q.match(/(\d+\.?\d*)/);

    let pct = 25;
    if (pctMatch) pct = parseInt(pctMatch[1]);
    else if (q.includes('60%')) pct = 60;
    else if (decMatch && q.includes('percentage')) pct = Math.round(parseFloat(decMatch[1]) * 100);

    // Draw a 10x10 grid (100 cells)
    const gridSize = 10;
    const cellSize = 16;
    const gridW = gridSize * cellSize;

    const grid = new PIXI.Graphics();
    grid.x = cx;
    grid.y = cy;
    grid.alpha = 0;

    grid.beginFill(0xe5e7eb);
    grid.drawRect(-gridW / 2, -gridW / 2, gridW, gridW);
    grid.endFill();

    // Fill cells
    grid.beginFill(showCorrect ? 0x22c55e : 0xf59e0b, 0.6);
    for (let i = 0; i < pct && i < 100; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      grid.drawRect(-gridW / 2 + col * cellSize, -gridW / 2 + row * cellSize, cellSize, cellSize);
    }
    grid.endFill();

    grid.lineStyle(1, 0x9ca3af, 0.5);
    for (let i = 0; i <= gridSize; i++) {
      grid.moveTo(-gridW / 2 + i * cellSize, -gridW / 2);
      grid.lineTo(-gridW / 2 + i * cellSize, gridW / 2);
      grid.moveTo(-gridW / 2, -gridW / 2 + i * cellSize);
      grid.lineTo(gridW / 2, -gridW / 2 + i * cellSize);
    }

    container.addChild(grid);
    gsap.to(grid, { alpha: 1, duration: 0.4, delay: 0.2 });

    const label = new PIXI.Text(
      `${pct}%${showCorrect ? ` = ${answer}` : ''}`,
      { fontSize: 20, fill: showCorrect ? 0x22c55e : 0xf59e0b, fontWeight: 'bold' },
    );
    label.anchor.set(0.5);
    label.x = cx;
    label.y = cy + gridW / 2 + 25;
    label.alpha = 0;
    container.addChild(label);
    gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.6 });
  }

  // ─── Class 5 Math: Integers / Negative Numbers ──────────────

  private renderIntegerNumberLine(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 150;
    const range = 6; // -6 to +6
    const spacing = 35;
    const total = range * 2 + 1;
    const startX = cx - ((total - 1) * spacing) / 2;

    // Line
    const line = new PIXI.Graphics();
    line.lineStyle(2, 0xcbd5e1);
    line.moveTo(0, 0);
    line.lineTo((total - 1) * spacing, 0);
    line.x = startX;
    line.y = cy;
    line.alpha = 0;
    container.addChild(line);
    gsap.to(line, { alpha: 1, duration: 0.3, delay: 0.2 });

    // Numbers
    for (let i = -range; i <= range; i++) {
      const idx = i + range;
      const x = startX + idx * spacing;
      const isZero = i === 0;
      const isAnswer = showCorrect && (answer.includes(String(i)) || (i > 0 && answer.includes(`+${i}`)));

      const circle = new PIXI.Graphics();
      circle.beginFill(isAnswer ? 0x22c55e : isZero ? 0x3b82f6 : 0xffffff);
      circle.lineStyle(2, isAnswer ? 0x16a34a : isZero ? 0x2563eb : 0xd1d5db);
      circle.drawCircle(0, 0, 14);
      circle.endFill();
      circle.x = x;
      circle.y = cy;
      circle.alpha = 0;
      circle.scale.set(0);
      container.addChild(circle);
      gsap.to(circle, { alpha: 1, pixi: { scale: 1 }, duration: 0.2, delay: 0.3 + idx * 0.04 });

      const numText = new PIXI.Text(i > 0 ? `+${i}` : String(i), {
        fontSize: 11, fill: isAnswer ? 0xffffff : isZero ? 0xffffff : 0x6b7280, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      numText.x = x;
      numText.y = cy;
      numText.alpha = 0;
      container.addChild(numText);
      gsap.to(numText, { alpha: 1, duration: 0.2, delay: 0.3 + idx * 0.04 });

      if (isAnswer) {
        gsap.to(circle.scale, { x: 1.3, y: 1.3, duration: 0.4, delay: 0.5 + idx * 0.04, yoyo: true, repeat: 3 });
      }
    }

    // Label
    const label = new PIXI.Text(
      showCorrect ? `Answer: ${answer}` : 'Negative ← | → Positive',
      { fontSize: 16, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold' },
    );
    label.anchor.set(0.5);
    label.x = cx;
    label.y = cy + 35;
    label.alpha = 0;
    container.addChild(label);
    gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.5 });
  }

  // ─── Class 5 Math: Prime / Composite ────────────────────────

  private renderPrimeComposite(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();

    // Parse number from question
    const numMatch = q.match(/\b(\d+)\b/);
    const num = numMatch ? parseInt(numMatch[1]) : 24;

    // Draw factor boxes
    const factors: number[] = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) factors.push(i);
    }

    const isPrime = factors.length === 2;
    const boxSize = 36;
    const spacing = 42;
    const cols = Math.min(factors.length, 8);
    const startX = cx - ((cols - 1) * spacing) / 2;

    // Title
    const title = new PIXI.Text(`Factors of ${num}`, {
      fontSize: 18, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = cx;
    title.y = cy - 40;
    container.addChild(title);

    // Factor boxes
    factors.forEach((f, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const box = new PIXI.Graphics();
      box.beginFill(isPrime ? 0xfecaca : 0xbfdbfe);
      box.lineStyle(2, isPrime ? 0xef4444 : 0x3b82f6);
      box.drawRoundedRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 6);
      box.endFill();
      box.x = startX + col * spacing;
      box.y = cy + row * spacing;
      box.alpha = 0;
      box.scale.set(0);
      container.addChild(box);
      gsap.to(box, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.2 + i * 0.1 });

      const numText = new PIXI.Text(String(f), {
        fontSize: 16, fill: 0x333333, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      numText.x = startX + col * spacing;
      numText.y = cy + row * spacing;
      numText.alpha = 0;
      container.addChild(numText);
      gsap.to(numText, { alpha: 1, duration: 0.3, delay: 0.3 + i * 0.1 });
    });

    // Answer
    const answerText = new PIXI.Text(
      showCorrect ? `${num} is ${isPrime ? 'PRIME (2 factors)' : `COMPOSITE (${factors.length} factors)`}` : `${factors.length} factors`,
      { fontSize: 16, fill: showCorrect ? (isPrime ? 0xef4444 : 0x3b82f6) : 0x6c5ce7, fontWeight: 'bold' },
    );
    answerText.anchor.set(0.5);
    answerText.x = cx;
    answerText.y = cy + Math.ceil(factors.length / cols) * spacing + 20;
    answerText.alpha = 0;
    container.addChild(answerText);
    gsap.to(answerText, { alpha: 1, duration: 0.3, delay: 0.3 + factors.length * 0.1 });
  }

  // ─── Class 5 Math: HCF / LCM ────────────────────────────────

  private renderHCFLCM(question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();

    // Parse numbers
    const nums = q.match(/\d+/g)?.map(Number) || [12, 18];
    const isHCF = q.includes('hcf') || q.includes('greatest common');

    // Find factors/multiples
    const factors = (n: number) => { const f: number[] = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
    const allFactors = nums.map(factors);
    const common = allFactors[0].filter(f => allFactors.every(af => af.includes(f)));
    const result = isHCF ? Math.max(...common) : nums.reduce((a, b) => (a * b) / common.reduce((x, y) => Math.max(x, y)));

    // Draw Venn-like diagram
    const r = 60;
    const overlap = 25;
    const left = new PIXI.Graphics();
    left.lineStyle(3, 0x3b82f6);
    left.beginFill(0x3b82f6, 0.1);
    left.drawCircle(0, 0, r);
    left.endFill();
    left.x = cx - overlap;
    left.y = cy;
    left.alpha = 0;
    container.addChild(left);
    gsap.to(left, { alpha: 1, duration: 0.4, delay: 0.2 });

    const right = new PIXI.Graphics();
    right.lineStyle(3, 0xef4444);
    right.beginFill(0xef4444, 0.1);
    right.drawCircle(0, 0, r);
    right.endFill();
    right.x = cx + overlap;
    right.y = cy;
    right.alpha = 0;
    container.addChild(right);
    gsap.to(right, { alpha: 1, duration: 0.4, delay: 0.3 });

    // Labels
    const leftLabel = new PIXI.Text(String(nums[0]), { fontSize: 18, fill: 0x3b82f6, fontWeight: 'bold' });
    leftLabel.anchor.set(0.5);
    leftLabel.x = cx - overlap - r * 0.6;
    leftLabel.y = cy;
    leftLabel.alpha = 0;
    container.addChild(leftLabel);
    gsap.to(leftLabel, { alpha: 1, duration: 0.3, delay: 0.5 });

    const rightLabel = new PIXI.Text(String(nums[1]), { fontSize: 18, fill: 0xef4444, fontWeight: 'bold' });
    rightLabel.anchor.set(0.5);
    rightLabel.x = cx + overlap + r * 0.6;
    rightLabel.y = cy;
    rightLabel.alpha = 0;
    container.addChild(rightLabel);
    gsap.to(rightLabel, { alpha: 1, duration: 0.3, delay: 0.6 });

    // Common factors in center
    const commonText = new PIXI.Text(common.join(', '), {
      fontSize: 12, fill: 0x22c55e, fontWeight: 'bold',
    });
    commonText.anchor.set(0.5);
    commonText.x = cx;
    commonText.y = cy;
    commonText.alpha = 0;
    container.addChild(commonText);
    gsap.to(commonText, { alpha: 1, duration: 0.3, delay: 0.7 });

    // Answer
    const answerText = new PIXI.Text(
      showCorrect ? `${isHCF ? 'HCF' : 'LCM'} = ${result}` : `${isHCF ? 'HCF' : 'LCM'} = ?`,
      { fontSize: 20, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold' },
    );
    answerText.anchor.set(0.5);
    answerText.x = cx;
    answerText.y = cy + r + 25;
    answerText.alpha = 0;
    container.addChild(answerText);
    gsap.to(answerText, { alpha: 1, duration: 0.3, delay: 0.9 });
  }

  // ─── Class 5 Math: Number Patterns ──────────────────────────

  private renderPattern(question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const q = question.toLowerCase();

    // Parse pattern from question
    const nums = q.match(/\d+/g)?.map(Number) || [3, 6, 9, 12];

    const spacing = 55;
    const startX = cx - ((nums.length - 1) * spacing) / 2;

    nums.forEach((n, i) => {
      const box = new PIXI.Graphics();
      box.beginFill(0x6c5ce7, 0.2);
      box.lineStyle(3, 0x6c5ce7);
      box.drawRoundedRect(-22, -22, 44, 44, 8);
      box.endFill();
      box.x = startX + i * spacing;
      box.y = cy;
      box.alpha = 0;
      box.scale.set(0);
      container.addChild(box);
      gsap.to(box, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.2 + i * 0.15 });

      const numText = new PIXI.Text(String(n), {
        fontSize: 20, fill: 0x6c5ce7, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      numText.x = startX + i * spacing;
      numText.y = cy;
      numText.alpha = 0;
      container.addChild(numText);
      gsap.to(numText, { alpha: 1, duration: 0.3, delay: 0.3 + i * 0.15 });
    });

    // Next terms
    if (showCorrect) {
      const diff = nums.length >= 2 ? nums[1] - nums[0] : 1;
      const next1 = nums[nums.length - 1] + diff;
      const next2 = next1 + diff;

      [next1, next2].forEach((n, i) => {
        const x = startX + (nums.length + i) * spacing;
        const box = new PIXI.Graphics();
        box.beginFill(0x22c55e, 0.2);
        box.lineStyle(3, 0x22c55e);
        box.drawRoundedRect(-22, -22, 44, 44, 8);
        box.endFill();
        box.x = x;
        box.y = cy;
        box.alpha = 0;
        box.scale.set(0);
        container.addChild(box);
        gsap.to(box, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.5 + i * 0.2 });

        const numText = new PIXI.Text(String(n), {
          fontSize: 20, fill: 0x22c55e, fontWeight: 'bold',
        });
        numText.anchor.set(0.5);
        numText.x = x;
        numText.y = cy;
        numText.alpha = 0;
        container.addChild(numText);
        gsap.to(numText, { alpha: 1, duration: 0.3, delay: 0.6 + i * 0.2 });
      });

      const ruleText = new PIXI.Text(`Rule: +${diff} each time`, {
        fontSize: 16, fill: 0x22c55e, fontWeight: 'bold',
      });
      ruleText.anchor.set(0.5);
      ruleText.x = cx;
      ruleText.y = cy + 50;
      ruleText.alpha = 0;
      container.addChild(ruleText);
      gsap.to(ruleText, { alpha: 1, duration: 0.3, delay: 0.9 });
    } else {
      // Question marks for next terms
      for (let i = 0; i < 2; i++) {
        const x = startX + (nums.length + i) * spacing;
        const qmark = new PIXI.Text('?', {
          fontSize: 24, fill: 0xa855f7, fontWeight: 'bold',
        });
        qmark.anchor.set(0.5);
        qmark.x = x;
        qmark.y = cy;
        qmark.alpha = 0;
        container.addChild(qmark);
        gsap.to(qmark, { alpha: 1, duration: 0.3, delay: 0.3 + nums.length * 0.15 + i * 0.2 });
      }
    }
  }

  // ─── Class 5 Math: Roman Numerals ───────────────────────────

  private renderRomanNumeral(question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    // Big Roman numeral display
    const romanText = new PIXI.Text(showCorrect ? answer : '?', {
      fontSize: 60, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold',
      fontFamily: 'Georgia, serif',
    });
    romanText.anchor.set(0.5);
    romanText.x = cx;
    romanText.y = cy;
    romanText.alpha = 0;
    romanText.scale.set(0);
    container.addChild(romanText);
    gsap.to(romanText, { alpha: 1, pixi: { scale: 1 }, duration: 0.5, delay: 0.2 });

    // Value chart
    const chart = [
      { roman: 'I', value: 1 },
      { roman: 'V', value: 5 },
      { roman: 'X', value: 10 },
      { roman: 'L', value: 50 },
      { roman: 'C', value: 100 },
      { roman: 'D', value: 500 },
      { roman: 'M', value: 1000 },
    ];

    const chartY = cy + 60;
    const chartSpacing = 50;
    const chartStartX = cx - ((chart.length - 1) * chartSpacing) / 2;

    chart.forEach((item, i) => {
      const x = chartStartX + i * chartSpacing;
      const r = new PIXI.Text(item.roman, { fontSize: 18, fill: 0x6c5ce7, fontWeight: 'bold', fontFamily: 'Georgia, serif' });
      r.anchor.set(0.5);
      r.x = x;
      r.y = chartY;
      r.alpha = 0;
      container.addChild(r);
      gsap.to(r, { alpha: 1, duration: 0.2, delay: 0.4 + i * 0.05 });

      const v = new PIXI.Text(String(item.value), { fontSize: 12, fill: 0x6b7280 });
      v.anchor.set(0.5);
      v.x = x;
      v.y = chartY + 18;
      v.alpha = 0;
      container.addChild(v);
      gsap.to(v, { alpha: 1, duration: 0.2, delay: 0.5 + i * 0.05 });
    });
  }

  // ─── Class 5 Science: Physical/Chemical Changes ─────────────

  private renderPhysicalChemical(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    // Two columns: Physical vs Chemical
    const colW = 130;
    const colH = 100;
    const spacing = 150;

    // Physical (left)
    const physBox = new PIXI.Graphics();
    physBox.beginFill(0x3b82f6, 0.1);
    physBox.lineStyle(3, 0x3b82f6);
    physBox.drawRoundedRect(-colW / 2, -colH / 2, colW, colH, 10);
    physBox.endFill();
    physBox.x = cx - spacing;
    physBox.y = cy;
    physBox.alpha = 0;
    container.addChild(physBox);
    gsap.to(physBox, { alpha: 1, duration: 0.3, delay: 0.2 });

    const physTitle = new PIXI.Text('Physical\nChange', { fontSize: 14, fill: 0x3b82f6, fontWeight: 'bold', align: 'center' });
    physTitle.anchor.set(0.5);
    physTitle.x = cx - spacing;
    physTitle.y = cy - 20;
    physTitle.alpha = 0;
    container.addChild(physTitle);
    gsap.to(physTitle, { alpha: 1, duration: 0.3, delay: 0.3 });

    const physEmoji = new PIXI.Text('🧊→💧', { fontSize: 24 });
    physEmoji.anchor.set(0.5);
    physEmoji.x = cx - spacing;
    physEmoji.y = cy + 20;
    physEmoji.alpha = 0;
    container.addChild(physEmoji);
    gsap.to(physEmoji, { alpha: 1, duration: 0.3, delay: 0.4 });

    // Chemical (right)
    const chemBox = new PIXI.Graphics();
    chemBox.beginFill(0xef4444, 0.1);
    chemBox.lineStyle(3, 0xef4444);
    chemBox.drawRoundedRect(-colW / 2, -colH / 2, colW, colH, 10);
    chemBox.endFill();
    chemBox.x = cx + spacing;
    chemBox.y = cy;
    chemBox.alpha = 0;
    container.addChild(chemBox);
    gsap.to(chemBox, { alpha: 1, duration: 0.3, delay: 0.5 });

    const chemTitle = new PIXI.Text('Chemical\nChange', { fontSize: 14, fill: 0xef4444, fontWeight: 'bold', align: 'center' });
    chemTitle.anchor.set(0.5);
    chemTitle.x = cx + spacing;
    chemTitle.y = cy - 20;
    chemTitle.alpha = 0;
    container.addChild(chemTitle);
    gsap.to(chemTitle, { alpha: 1, duration: 0.3, delay: 0.6 });

    const chemEmoji = new PIXI.Text('🔥', { fontSize: 28 });
    chemEmoji.anchor.set(0.5);
    chemEmoji.x = cx + spacing;
    chemEmoji.y = cy + 20;
    chemEmoji.alpha = 0;
    container.addChild(chemEmoji);
    gsap.to(chemEmoji, { alpha: 1, duration: 0.3, delay: 0.7 });

    // Highlight correct answer
    if (showCorrect) {
      const a = answer.toLowerCase();
      const isPhysical = a.includes('physical') || a.includes('melting') || a.includes('dissolv');
      const highlightBox = new PIXI.Graphics();
      highlightBox.lineStyle(4, 0x22c55e);
      highlightBox.drawRoundedRect(-colW / 2 - 3, -colH / 2 - 3, colW + 6, colH + 6, 12);
      highlightBox.x = cx + (isPhysical ? -spacing : spacing);
      highlightBox.y = cy;
      highlightBox.alpha = 0;
      container.addChild(highlightBox);
      gsap.to(highlightBox, { alpha: 1, duration: 0.3, delay: 0.9 });
    }
  }

  // ─── Class 5 Science: Circulatory System ────────────────────

  private renderCirculatory(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 140;
    const a = answer.toLowerCase();

    // Heart in center
    const heartColor = showCorrect && (a.includes('heart') || a.includes('pump')) ? 0x22c55e : 0xef4444;
    const heart = new PIXI.Graphics();
    heart.beginFill(heartColor);
    heart.drawCircle(-12, -8, 18);
    heart.drawCircle(12, -8, 18);
    heart.moveTo(-28, -5);
    heart.lineTo(0, 25);
    heart.lineTo(28, -5);
    heart.endFill();
    heart.x = cx;
    heart.y = cy;
    heart.alpha = 0;
    heart.scale.set(0);
    container.addChild(heart);
    gsap.to(heart, { alpha: 1, pixi: { scale: 1 }, duration: 0.5, delay: 0.2 });

    // Pulsing animation
    gsap.to(heart.scale, { x: 1.1, y: 1.1, duration: 0.5, repeat: -1, yoyo: true, delay: 0.7 });

    // Arteries (red, going out)
    const arteryColor = showCorrect && a.includes('artery') ? 0x22c55e : 0xdc2626;
    const artery = new PIXI.Graphics();
    artery.lineStyle(5, arteryColor);
    artery.moveTo(0, 0);
    artery.lineTo(40, -30);
    artery.moveTo(0, 0);
    artery.lineTo(-40, -30);
    artery.moveTo(0, 0);
    artery.lineTo(0, 40);
    artery.x = cx;
    artery.y = cy;
    artery.alpha = 0;
    container.addChild(artery);
    gsap.to(artery, { alpha: 1, duration: 0.3, delay: 0.5 });

    // Veins (blue, coming in)
    const veinColor = showCorrect && a.includes('vein') ? 0x22c55e : 0x3b82f6;
    const vein = new PIXI.Graphics();
    vein.lineStyle(5, veinColor);
    vein.moveTo(40, -30);
    vein.lineTo(60, -50);
    vein.moveTo(-40, -30);
    vein.lineTo(-60, -50);
    vein.x = cx;
    vein.y = cy;
    vein.alpha = 0;
    container.addChild(vein);
    gsap.to(vein, { alpha: 1, duration: 0.3, delay: 0.6 });

    // Labels
    const labels = [
      { text: 'Heart ❤️', x: cx, y: cy + 40, color: 0xef4444, show: showCorrect && (a.includes('heart') || a.includes('pump')) },
      { text: 'Arteries (red)', x: cx + 70, y: cy - 50, color: arteryColor, show: showCorrect && a.includes('artery') },
      { text: 'Veins (blue)', x: cx - 70, y: cy - 50, color: veinColor, show: showCorrect && a.includes('vein') },
    ];

    labels.forEach((l, i) => {
      if (l.show || !showCorrect) {
        const t = new PIXI.Text(l.text, { fontSize: 12, fill: l.color, fontWeight: 'bold' });
        t.anchor.set(0.5);
        t.x = l.x;
        t.y = l.y;
        t.alpha = 0;
        container.addChild(t);
        gsap.to(t, { alpha: 1, duration: 0.3, delay: 0.8 + i * 0.1 });
      }
    });
  }

  // ─── Class 5 Science: Agriculture / Crops ───────────────────

  private renderAgriculture(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    // Two seasons: Kharif vs Rabi
    const colW = 130;
    const colH = 90;
    const spacing = 150;

    // Kharif (monsoon)
    const kharifBox = new PIXI.Graphics();
    kharifBox.beginFill(0x3b82f6, 0.1);
    kharifBox.lineStyle(3, 0x3b82f6);
    kharifBox.drawRoundedRect(-colW / 2, -colH / 2, colW, colH, 10);
    kharifBox.endFill();
    kharifBox.x = cx - spacing;
    kharifBox.y = cy;
    kharifBox.alpha = 0;
    container.addChild(kharifBox);
    gsap.to(kharifBox, { alpha: 1, duration: 0.3, delay: 0.2 });

    const kharifTitle = new PIXI.Text('Kharif\n(Monsoon)', { fontSize: 13, fill: 0x3b82f6, fontWeight: 'bold', align: 'center' });
    kharifTitle.anchor.set(0.5);
    kharifTitle.x = cx - spacing;
    kharifTitle.y = cy - 15;
    kharifTitle.alpha = 0;
    container.addChild(kharifTitle);
    gsap.to(kharifTitle, { alpha: 1, duration: 0.3, delay: 0.3 });

    const kharifEmoji = new PIXI.Text('🌧️🌾', { fontSize: 24 });
    kharifEmoji.anchor.set(0.5);
    kharifEmoji.x = cx - spacing;
    kharifEmoji.y = cy + 20;
    kharifEmoji.alpha = 0;
    container.addChild(kharifEmoji);
    gsap.to(kharifEmoji, { alpha: 1, duration: 0.3, delay: 0.4 });

    // Rabi (winter)
    const rabiBox = new PIXI.Graphics();
    rabiBox.beginFill(0xf59e0b, 0.1);
    rabiBox.lineStyle(3, 0xf59e0b);
    rabiBox.drawRoundedRect(-colW / 2, -colH / 2, colW, colH, 10);
    rabiBox.endFill();
    rabiBox.x = cx + spacing;
    rabiBox.y = cy;
    rabiBox.alpha = 0;
    container.addChild(rabiBox);
    gsap.to(rabiBox, { alpha: 1, duration: 0.3, delay: 0.5 });

    const rabiTitle = new PIXI.Text('Rabi\n(Winter)', { fontSize: 13, fill: 0xf59e0b, fontWeight: 'bold', align: 'center' });
    rabiTitle.anchor.set(0.5);
    rabiTitle.x = cx + spacing;
    rabiTitle.y = cy - 15;
    rabiTitle.alpha = 0;
    container.addChild(rabiTitle);
    gsap.to(rabiTitle, { alpha: 1, duration: 0.3, delay: 0.6 });

    const rabiEmoji = new PIXI.Text('☀️🌾', { fontSize: 24 });
    rabiEmoji.anchor.set(0.5);
    rabiEmoji.x = cx + spacing;
    rabiEmoji.y = cy + 20;
    rabiEmoji.alpha = 0;
    container.addChild(rabiEmoji);
    gsap.to(rabiEmoji, { alpha: 1, duration: 0.3, delay: 0.7 });

    // Highlight answer
    if (showCorrect) {
      const a = answer.toLowerCase();
      const isKharif = a.includes('kharif') || a.includes('rice') || a.includes('monsoon');
      const isRabi = a.includes('rabi') || a.includes('wheat') || a.includes('winter');
      if (isKharif || isRabi) {
        const highlight = new PIXI.Graphics();
        highlight.lineStyle(4, 0x22c55e);
        highlight.drawRoundedRect(-colW / 2 - 3, -colH / 2 - 3, colW + 6, colH + 6, 12);
        highlight.x = cx + (isKharif ? -spacing : spacing);
        highlight.y = cy;
        highlight.alpha = 0;
        container.addChild(highlight);
        gsap.to(highlight, { alpha: 1, duration: 0.3, delay: 0.9 });
      }
    }
  }

  // ─── Class 5 Science: Natural Disasters ─────────────────────

  private renderNaturalDisaster(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;
    const a = answer.toLowerCase();

    // Big emoji for the disaster
    let emoji = '🌍';
    if (a.includes('earthquake')) emoji = '🌋';
    else if (a.includes('volcano')) emoji = '🌋';
    else if (a.includes('flood')) emoji = '🌊';
    else if (a.includes('drought')) emoji = '🏜️';
    else if (a.includes('tsunami')) emoji = '🌊';
    else if (a.includes('cyclone') || a.includes('storm')) emoji = '🌀';

    const bigEmoji = new PIXI.Text(emoji, { fontSize: 60 });
    bigEmoji.anchor.set(0.5);
    bigEmoji.x = cx;
    bigEmoji.y = cy;
    bigEmoji.alpha = 0;
    bigEmoji.scale.set(0);
    container.addChild(bigEmoji);
    gsap.to(bigEmoji, { alpha: 1, pixi: { scale: 1 }, duration: 0.5, delay: 0.2 });

    // Option cards
    const optEmojis: Record<string, string> = {
      earthquake: '🌋', volcano: '🌋', flood: '🌊', drought: '🏜️',
      tsunami: '🌊', cyclone: '🌀', storm: '⛈️', fire: '🔥',
    };

    const spacing = 80;
    const startX = cx - ((options.length - 1) * spacing) / 2;
    options.forEach((opt, i) => {
      const o = opt.toLowerCase();
      let e = '🌍';
      for (const [key, em] of Object.entries(optEmojis)) {
        if (o.includes(key)) { e = em; break; }
      }
      const isCorrect = showCorrect && opt === answer;
      const card = new PIXI.Graphics();
      card.beginFill(isCorrect ? 0xd1fae5 : 0xffffff, 0.8);
      card.lineStyle(2, isCorrect ? 0x22c55e : 0xd1d5db);
      card.drawRoundedRect(-30, -35, 60, 70, 8);
      card.endFill();
      card.x = startX + i * spacing;
      card.y = cy + 70;
      card.alpha = 0;
      card.scale.set(0);
      container.addChild(card);
      gsap.to(card, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.5 + i * 0.1 });

      const eText = new PIXI.Text(e, { fontSize: 28 });
      eText.anchor.set(0.5);
      eText.x = startX + i * spacing;
      eText.y = cy + 60;
      eText.alpha = 0;
      container.addChild(eText);
      gsap.to(eText, { alpha: 1, duration: 0.3, delay: 0.6 + i * 0.1 });

      const lText = new PIXI.Text(opt, { fontSize: 10, fill: isCorrect ? 0x16a34a : 0x333333, fontWeight: 'bold', wordWrap: true, wordWrapWidth: 55 });
      lText.anchor.set(0.5);
      lText.x = startX + i * spacing;
      lText.y = cy + 90;
      lText.alpha = 0;
      container.addChild(lText);
      gsap.to(lText, { alpha: 1, duration: 0.3, delay: 0.65 + i * 0.1 });
    });
  }

  // ─── Class 5 Science: Mixtures / Solutions ──────────────────

  private renderMixture(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    // Draw beaker
    const beaker = new PIXI.Graphics();
    beaker.lineStyle(3, 0x6b7280);
    beaker.beginFill(0xe0f2fe, 0.5);
    beaker.moveTo(-30, -40);
    beaker.lineTo(-30, 35);
    beaker.lineTo(30, 35);
    beaker.lineTo(30, -40);
    beaker.endFill();
    // Liquid
    beaker.beginFill(showCorrect ? 0x22c55e : 0x3b82f6, 0.3);
    beaker.drawRect(-28, -10, 56, 43);
    beaker.endFill();
    // Particles
    if (question.toLowerCase().includes('suspension') || question.toLowerCase().includes('sand')) {
      beaker.beginFill(0xf59e0b);
      for (let i = 0; i < 8; i++) {
        beaker.drawCircle(-20 + Math.random() * 40, 0 + Math.random() * 30, 3);
      }
      beaker.endFill();
    } else {
      // Solution — small evenly distributed dots
      beaker.beginFill(0xffffff, 0.5);
      for (let i = 0; i < 15; i++) {
        beaker.drawCircle(-20 + (i % 5) * 10, 0 + Math.floor(i / 5) * 10, 1.5);
      }
      beaker.endFill();
    }
    beaker.x = cx;
    beaker.y = cy;
    beaker.alpha = 0;
    container.addChild(beaker);
    gsap.to(beaker, { alpha: 1, duration: 0.4, delay: 0.2 });

    // Label
    const label = new PIXI.Text(showCorrect ? answer : 'Mixture?', {
      fontSize: 18, fill: showCorrect ? 0x22c55e : 0x6c5ce7, fontWeight: 'bold',
    });
    label.anchor.set(0.5);
    label.x = cx;
    label.y = cy + 55;
    label.alpha = 0;
    container.addChild(label);
    gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.6 });
  }

  // ─── Class 5 CS: Computer History ───────────────────────────

  private renderComputerHistory(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    // Timeline
    const timeline = new PIXI.Graphics();
    timeline.lineStyle(3, 0x6b7280);
    timeline.moveTo(-200, 0);
    timeline.lineTo(200, 0);
    timeline.x = cx;
    timeline.y = cy;
    timeline.alpha = 0;
    container.addChild(timeline);
    gsap.to(timeline, { alpha: 1, duration: 0.4, delay: 0.2 });

    // Timeline points
    const points = [
      { x: -150, emoji: '🧮', label: 'Abacus' },
      { x: -50, emoji: '⚙️', label: 'Babbage' },
      { x: 50, emoji: '📺', label: 'ENIAC' },
      { x: 150, emoji: '💻', label: 'Modern' },
    ];

    points.forEach((p, i) => {
      const dot = new PIXI.Graphics();
      dot.beginFill(0x6c5ce7);
      dot.drawCircle(0, 0, 6);
      dot.endFill();
      dot.x = cx + p.x;
      dot.y = cy;
      dot.alpha = 0;
      container.addChild(dot);
      gsap.to(dot, { alpha: 1, duration: 0.3, delay: 0.3 + i * 0.15 });

      const emoji = new PIXI.Text(p.emoji, { fontSize: 24 });
      emoji.anchor.set(0.5);
      emoji.x = cx + p.x;
      emoji.y = cy - 35;
      emoji.alpha = 0;
      container.addChild(emoji);
      gsap.to(emoji, { alpha: 1, duration: 0.3, delay: 0.4 + i * 0.15 });

      const label = new PIXI.Text(p.label, { fontSize: 11, fill: 0x6b7280, fontWeight: 'bold' });
      label.anchor.set(0.5);
      label.x = cx + p.x;
      label.y = cy + 20;
      label.alpha = 0;
      container.addChild(label);
      gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.5 + i * 0.15 });
    });

    // Highlight answer
    if (showCorrect) {
      const a = answer.toLowerCase();
      let highlightIdx = -1;
      if (a.includes('abacus')) highlightIdx = 0;
      else if (a.includes('babbage')) highlightIdx = 1;
      else if (a.includes('eniac') || a.includes('vacuum')) highlightIdx = 2;
      else if (a.includes('modern') || a.includes('microprocessor')) highlightIdx = 3;

      if (highlightIdx >= 0) {
        const hl = new PIXI.Graphics();
        hl.beginFill(0x22c55e, 0.3);
        hl.drawCircle(0, 0, 20);
        hl.endFill();
        hl.x = cx + points[highlightIdx].x;
        hl.y = cy;
        hl.alpha = 0;
        container.addChild(hl);
        gsap.to(hl, { alpha: 1, duration: 0.3, delay: 0.9 });
      }
    }
  }

  // ─── Class 5 Science: Environment ───────────────────────────

  private renderEnvironment(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    // Two categories: Biotic vs Abiotic
    const colW = 130;
    const colH = 90;
    const spacing = 150;

    // Biotic (living)
    const bioticBox = new PIXI.Graphics();
    bioticBox.beginFill(0x22c55e, 0.1);
    bioticBox.lineStyle(3, 0x22c55e);
    bioticBox.drawRoundedRect(-colW / 2, -colH / 2, colW, colH, 10);
    bioticBox.endFill();
    bioticBox.x = cx - spacing;
    bioticBox.y = cy;
    bioticBox.alpha = 0;
    container.addChild(bioticBox);
    gsap.to(bioticBox, { alpha: 1, duration: 0.3, delay: 0.2 });

    const bioticTitle = new PIXI.Text('Biotic\n(Living)', { fontSize: 13, fill: 0x22c55e, fontWeight: 'bold', align: 'center' });
    bioticTitle.anchor.set(0.5);
    bioticTitle.x = cx - spacing;
    bioticTitle.y = cy - 15;
    bioticTitle.alpha = 0;
    container.addChild(bioticTitle);
    gsap.to(bioticTitle, { alpha: 1, duration: 0.3, delay: 0.3 });

    const bioticEmoji = new PIXI.Text('🌿🦁', { fontSize: 24 });
    bioticEmoji.anchor.set(0.5);
    bioticEmoji.x = cx - spacing;
    bioticEmoji.y = cy + 20;
    bioticEmoji.alpha = 0;
    container.addChild(bioticEmoji);
    gsap.to(bioticEmoji, { alpha: 1, duration: 0.3, delay: 0.4 });

    // Abiotic (non-living)
    const abioticBox = new PIXI.Graphics();
    abioticBox.beginFill(0x6b7280, 0.1);
    abioticBox.lineStyle(3, 0x6b7280);
    abioticBox.drawRoundedRect(-colW / 2, -colH / 2, colW, colH, 10);
    abioticBox.endFill();
    abioticBox.x = cx + spacing;
    abioticBox.y = cy;
    abioticBox.alpha = 0;
    container.addChild(abioticBox);
    gsap.to(abioticBox, { alpha: 1, duration: 0.3, delay: 0.5 });

    const abioticTitle = new PIXI.Text('Abiotic\n(Non-living)', { fontSize: 13, fill: 0x6b7280, fontWeight: 'bold', align: 'center' });
    abioticTitle.anchor.set(0.5);
    abioticTitle.x = cx + spacing;
    abioticTitle.y = cy - 15;
    abioticTitle.alpha = 0;
    container.addChild(abioticTitle);
    gsap.to(abioticTitle, { alpha: 1, duration: 0.3, delay: 0.6 });

    const abioticEmoji = new PIXI.Text('💧☀️', { fontSize: 24 });
    abioticEmoji.anchor.set(0.5);
    abioticEmoji.x = cx + spacing;
    abioticEmoji.y = cy + 20;
    abioticEmoji.alpha = 0;
    container.addChild(abioticEmoji);
    gsap.to(abioticEmoji, { alpha: 1, duration: 0.3, delay: 0.7 });

    // Highlight
    if (showCorrect) {
      const a = answer.toLowerCase();
      const isBiotic = a.includes('biotic') || a.includes('living') || a.includes('plant') || a.includes('animal');
      const isAbiotic = a.includes('abiotic') || a.includes('non-living') || a.includes('water') || a.includes('sun') || a.includes('solar');
      if (isBiotic || isAbiotic) {
        const hl = new PIXI.Graphics();
        hl.lineStyle(4, 0x22c55e);
        hl.drawRoundedRect(-colW / 2 - 3, -colH / 2 - 3, colW + 6, colH + 6, 12);
        hl.x = cx + (isBiotic ? -spacing : spacing);
        hl.y = cy;
        hl.alpha = 0;
        container.addChild(hl);
        gsap.to(hl, { alpha: 1, duration: 0.3, delay: 0.9 });
      }
    }
  }

  // ─── Class 5 EVS: Transport ─────────────────────────────────

  private renderTransport(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    const transportEmojis: Record<string, string> = {
      airway: '✈️', air: '✈️', flight: '✈️', plane: '✈️',
      railway: '🚂', train: '🚂', rail: '🚂',
      roadway: '🚗', road: '🚗', car: '🚗', bus: '🚌',
      waterway: '⛵', ship: '⛵', boat: '⛵', water: '⛵',
    };

    const spacing = 90;
    const startX = cx - ((options.length - 1) * spacing) / 2;

    options.forEach((opt, i) => {
      const o = opt.toLowerCase();
      let emoji = '🚶';
      for (const [key, e] of Object.entries(transportEmojis)) {
        if (o.includes(key)) { emoji = e; break; }
      }
      const isCorrect = showCorrect && opt === answer;
      const card = new PIXI.Graphics();
      card.beginFill(isCorrect ? 0xd1fae5 : 0xffffff, 0.8);
      card.lineStyle(2, isCorrect ? 0x22c55e : 0xd1d5db);
      card.drawRoundedRect(-35, -35, 70, 70, 10);
      card.endFill();
      card.x = startX + i * spacing;
      card.y = cy;
      card.alpha = 0;
      card.scale.set(0);
      container.addChild(card);
      gsap.to(card, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: 0.2 + i * 0.1 });

      const e = new PIXI.Text(emoji, { fontSize: 32 });
      e.anchor.set(0.5);
      e.x = startX + i * spacing;
      e.y = cy - 8;
      e.alpha = 0;
      container.addChild(e);
      gsap.to(e, { alpha: 1, duration: 0.3, delay: 0.3 + i * 0.1 });

      const l = new PIXI.Text(opt, { fontSize: 10, fill: isCorrect ? 0x16a34a : 0x333333, fontWeight: 'bold', wordWrap: true, wordWrapWidth: 60 });
      l.anchor.set(0.5);
      l.x = startX + i * spacing;
      l.y = cy + 20;
      l.alpha = 0;
      container.addChild(l);
      gsap.to(l, { alpha: 1, duration: 0.3, delay: 0.35 + i * 0.1 });
    });
  }

  // ─── Class 5 Science: Air Composition ───────────────────────

  private renderAirComposition(question: string, answer: string, options: string[], showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const cx = this.width / 2;
    const cy = 130;

    // Pie chart of air composition
    const composition = [
      { name: 'Nitrogen', pct: 78, color: 0x3b82f6 },
      { name: 'Oxygen', pct: 21, color: 0x22c55e },
      { name: 'Other', pct: 1, color: 0xf59e0b },
    ];

    const radius = 60;
    let currentAngle = -Math.PI / 2;

    composition.forEach((gas, i) => {
      const angle = (gas.pct / 100) * Math.PI * 2;
      const slice = new PIXI.Graphics();
      const isAnswer = showCorrect && answer.toLowerCase().includes(gas.name.toLowerCase());
      slice.beginFill(isAnswer ? 0x22c55e : gas.color, 0.7);
      slice.lineStyle(2, 0xffffff);
      slice.moveTo(0, 0);
      slice.arc(0, 0, radius, currentAngle, currentAngle + angle);
      slice.lineTo(0, 0);
      slice.endFill();
      slice.x = cx;
      slice.y = cy;
      slice.alpha = 0;
      container.addChild(slice);
      gsap.to(slice, { alpha: 1, duration: 0.4, delay: 0.2 + i * 0.3 });

      // Label
      const midAngle = currentAngle + angle / 2;
      const labelX = cx + Math.cos(midAngle) * (radius + 25);
      const labelY = cy + Math.sin(midAngle) * (radius + 25);
      const label = new PIXI.Text(`${gas.name}\n${gas.pct}%`, {
        fontSize: 11, fill: gas.color, fontWeight: 'bold', align: 'center',
      });
      label.anchor.set(0.5);
      label.x = labelX;
      label.y = labelY;
      label.alpha = 0;
      container.addChild(label);
      gsap.to(label, { alpha: 1, duration: 0.3, delay: 0.3 + i * 0.3 });

      currentAngle += angle;
    });
  }

  // ─── Option emojis fallback ──────────────────────────────────

  private renderOptionEmojis(options: string[], question: string, answer: string, showCorrect: boolean): void {
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const spacing = 90;
    const startX = this.width / 2 - ((options.length - 1) * spacing) / 2;
    const y = 120;

    options.forEach((opt, i) => {
      const isCorrect = showCorrect && opt === answer;
      const emoji = this.getEmojiForOption(opt, question);

      // Card background
      const card = new PIXI.Graphics();
      card.beginFill(isCorrect ? 0xd1fae5 : 0xffffff, 0.8);
      card.lineStyle(2, isCorrect ? 0x22c55e : 0xd1d5db);
      card.drawRoundedRect(-35, -35, 70, 70, 10);
      card.endFill();
      card.x = startX + i * spacing;
      card.y = y;
      card.alpha = 0;
      card.scale.set(0);
      container.addChild(card);

      gsap.to(card, { alpha: 1, pixi: { scale: 1 }, duration: 0.3, delay: i * 0.1 });

      // Emoji text
      const emojiText = new PIXI.Text(emoji, { fontSize: 32 });
      emojiText.anchor.set(0.5);
      emojiText.x = startX + i * spacing;
      emojiText.y = y - 8;
      emojiText.alpha = 0;
      container.addChild(emojiText);
      gsap.to(emojiText, { alpha: 1, duration: 0.3, delay: i * 0.1 + 0.1 });

      // Option label
      const label = new PIXI.Text(opt, {
        fontSize: 11, fill: isCorrect ? 0x16a34a : 0x333333, fontWeight: 'bold',
        wordWrap: true, wordWrapWidth: 60,
      });
      label.anchor.set(0.5);
      label.x = startX + i * spacing;
      label.y = y + 20;
      label.alpha = 0;
      container.addChild(label);
      gsap.to(label, { alpha: 1, duration: 0.3, delay: i * 0.1 + 0.15 });
    });
  }

  // ─── Interactive number line (shared component) ──────────────

  private renderNumberLine(
    container: PIXI.Container,
    max: number,
    highlight: number,
    showCorrect: boolean,
    y: number,
    delay: number,
    startHop?: number,
  ): void {
    const numCount = max + 1;
    const spacing = Math.min(40, (this.width - 80) / numCount);
    const startX = this.width / 2 - ((numCount - 1) * spacing) / 2;

    // Line
    const line = new PIXI.Graphics();
    line.lineStyle(2, 0xcbd5e1);
    line.moveTo(0, 0);
    line.lineTo((numCount - 1) * spacing, 0);
    line.x = startX;
    line.y = y;
    line.alpha = 0;
    container.addChild(line);
    gsap.to(line, { alpha: 1, duration: 0.3, delay });

    // Numbers
    for (let i = 0; i < numCount; i++) {
      const isHighlight = showCorrect && i === highlight;
      const isStart = startHop !== undefined && i === startHop;

      const circle = new PIXI.Graphics();
      circle.beginFill(isHighlight ? 0x22c55e : isStart ? 0x3b82f6 : 0xffffff);
      circle.lineStyle(2, isHighlight ? 0x16a34a : isStart ? 0x2563eb : 0xd1d5db);
      circle.drawCircle(0, 0, 14);
      circle.endFill();
      circle.x = startX + i * spacing;
      circle.y = y;
      circle.alpha = 0;
      circle.scale.set(0);
      container.addChild(circle);

      gsap.to(circle, {
        alpha: 1, pixi: { scale: 1 }, duration: 0.2, delay: delay + 0.1 + i * 0.03,
      });

      const numText = new PIXI.Text(String(i), {
        fontSize: 12, fill: isHighlight ? 0xffffff : isStart ? 0xffffff : 0x6b7280, fontWeight: 'bold',
      });
      numText.anchor.set(0.5);
      numText.x = startX + i * spacing;
      numText.y = y;
      numText.alpha = 0;
      container.addChild(numText);
      gsap.to(numText, { alpha: 1, duration: 0.2, delay: delay + 0.1 + i * 0.03 });

      // Highlight pulse
      if (isHighlight) {
        gsap.to(circle.scale, {
          x: 1.3, y: 1.3, duration: 0.4, delay: delay + 0.1 + i * 0.03 + 0.3,
          yoyo: true, repeat: 3,
        });
      }
    }

    // Frog character at highlight position when shown
    if (showCorrect) {
      const frog = new PIXI.Text('🐸', { fontSize: 24 });
      frog.anchor.set(0.5);
      frog.x = startX + highlight * spacing;
      frog.y = y - 25;
      frog.alpha = 0;
      frog.scale.set(0);
      container.addChild(frog);
      gsap.to(frog, {
        alpha: 1, pixi: { scale: 1 }, duration: 0.3,
        delay: delay + 0.1 + highlight * 0.03 + 0.5,
      });
    }
  }

  // ─── Step-by-step solution walkthrough ───────────────────────

  renderSolutionWalkthrough(
    question: string,
    answer: string,
    subject: string,
  ): void {
    this.clear();
    const container = new PIXI.Container();
    this.currentVisual = container;
    this.layer.addChild(container);

    const q = question.toLowerCase();

    // Title
    const title = new PIXI.Text('Let me show you how! 📝', {
      fontSize: 22, fill: 0x6c5ce7, fontWeight: 'bold',
    });
    title.anchor.set(0.5);
    title.x = this.width / 2;
    title.y = 40;
    title.alpha = 0;
    container.addChild(title);
    gsap.to(title, { alpha: 1, duration: 0.3 });

    const addMatch = q.match(/(\d+)\s*\+\s*(\d+)/);
    if (addMatch) {
      const a = parseInt(addMatch[1]);
      const b = parseInt(addMatch[2]);
      const total = a + b;

      const steps = [
        `Step 1: Count the first group: ${a}`,
        `Step 2: Count ${b} more: ${a + 1}, ${a + 2}... ${total}`,
        `Step 3: Total = ${total} ✓`,
      ];

      steps.forEach((step, i) => {
        const text = new PIXI.Text(step, {
          fontSize: 16, fill: 0x333333, fontWeight: 'bold',
        });
        text.anchor.set(0.5);
        text.x = this.width / 2;
        text.y = 90 + i * 35;
        text.alpha = 0;
        container.addChild(text);
        gsap.to(text, {
          alpha: 1, duration: 0.4, delay: 0.5 + i * 0.8,
          onStart: () => this.callbacks.onSpeak?.(step),
        });
      });

      // Re-render the visual with answer shown
      setTimeout(() => {
        this.renderVisual(question, subject, answer, [], true);
      }, 0.5 + steps.length * 0.8 + 0.5);
      return;
    }

    const subMatch = q.match(/(\d+)\s*-\s*(\d+)/);
    if (subMatch) {
      const a = parseInt(subMatch[1]);
      const b = parseInt(subMatch[2]);
      const result = a - b;

      const steps = [
        `Step 1: Start with ${a}`,
        `Step 2: Take away ${b}`,
        `Step 3: Count what's left: ${result} ✓`,
      ];

      steps.forEach((step, i) => {
        const text = new PIXI.Text(step, {
          fontSize: 16, fill: 0x333333, fontWeight: 'bold',
        });
        text.anchor.set(0.5);
        text.x = this.width / 2;
        text.y = 90 + i * 35;
        text.alpha = 0;
        container.addChild(text);
        gsap.to(text, {
          alpha: 1, duration: 0.4, delay: 0.5 + i * 0.8,
          onStart: () => this.callbacks.onSpeak?.(step),
        });
      });

      setTimeout(() => {
        this.renderVisual(question, subject, answer, [], true);
      }, 0.5 + steps.length * 0.8 + 0.5);
      return;
    }

    // Generic solution
    const solution = new PIXI.Text(`The answer is: ${answer}`, {
      fontSize: 24, fill: 0x22c55e, fontWeight: 'bold',
    });
    solution.anchor.set(0.5);
    solution.x = this.width / 2;
    solution.y = 120;
    solution.alpha = 0;
    container.addChild(solution);
    gsap.to(solution, {
      alpha: 1, duration: 0.4, delay: 0.5,
      onStart: () => this.callbacks.onSpeak?.(`The answer is ${answer}`),
    });
  }

  // ─── Emoji/object drawing helpers ────────────────────────────

  private getEmojiForQuestion(question: string): string {
    const q = question.toLowerCase();
    if (q.includes('mango')) return 'mango';
    if (q.includes('apple')) return 'apple';
    if (q.includes('star')) return 'star';
    if (q.includes('ball')) return 'ball';
    if (q.includes('cand') || q.includes('toffee')) return 'candy';
    if (q.includes('flower')) return 'flower';
    if (q.includes('leaf')) return 'leaf';
    if (q.includes('water')) return 'water-drop';
    return 'ball';
  }

  private getEmojiForWord(word: string): string {
    const w = word.toLowerCase();
    if (w.includes('apple')) return 'apple';
    if (w.includes('mango')) return 'mango';
    if (w.includes('star')) return 'star';
    if (w.includes('ball')) return 'ball';
    if (w.includes('cand')) return 'candy';
    if (w.includes('flower')) return 'flower';
    if (w.includes('leaf')) return 'leaf';
    if (w.includes('water')) return 'water-drop';
    return 'ball';
  }

  private getEmojiForOption(opt: string, question: string): string {
    const o = opt.toLowerCase();
    const q = question.toLowerCase();
    if (q.includes('mango') || o.includes('mango')) return '🥭';
    if (q.includes('apple') || o.includes('apple')) return '🍎';
    if (q.includes('star') || o.includes('star')) return '⭐';
    if (q.includes('ball') || o.includes('ball')) return '⚽';
    if (q.includes('cand') || o.includes('cand')) return '🍬';
    if (q.includes('book') || o.includes('book')) return '📚';
    if (q.includes('pencil') || o.includes('pencil')) return '✏️';
    if (q.includes('stone') || o.includes('stone')) return '🪨';
    if (q.includes('feather') || o.includes('feather')) return '🪶';
    if (q.includes('water') || o.includes('water')) return '💧';
    if (q.includes('animal') || q.includes('pet') || o.includes('dog')) return '🐶';
    if (o.includes('cat')) return '🐱';
    if (o.includes('cow')) return '🐮';
    if (o.includes('lion')) return '🦁';
    if (o.includes('fish')) return '🐟';
    if (o.includes('bird')) return '🐦';
    if (q.includes('body') || o.includes('eye')) return '👁️';
    if (o.includes('ear')) return '👂';
    if (o.includes('nose')) return '👃';
    if (o.includes('mouth')) return '👄';
    if (o.includes('hand')) return '✋';
    if (o.includes('leg')) return '🦵';
    if (o.includes('heart')) return '❤️';
    if (o.includes('brain')) return '🧠';
    if (o.includes('heavy')) return '⬇️';
    if (o.includes('light')) return '⬆️';
    if (o.includes('solid')) return '🧊';
    if (o.includes('liquid')) return '💧';
    if (o.includes('gas')) return '💨';
    if (o.includes('hot') || o.includes('warm')) return '🔥';
    if (o.includes('cold')) return '❄️';
    if (o.includes('sun') || o.includes('sunny') || o.includes('day')) return '☀️';
    if (o.includes('moon') || o.includes('night')) return '🌙';
    if (o.includes('rain')) return '🌧️';
    if (o.includes('cloud')) return '☁️';
    if (o.includes('wind')) return '💨';
    if (o.includes('tree')) return '🌳';
    if (o.includes('flower')) return '🌸';
    if (o.includes('leaf')) return '🍃';
    if (o.includes('computer')) return '💻';
    if (o.includes('keyboard')) return '⌨️';
    if (o.includes('mouse')) return '🖱️';
    if (o.includes('screen') || o.includes('monitor')) return '🖥️';
    if (o.includes('correct') || o.includes('yes') || o.includes('true')) return '✅';
    if (o.includes('wrong') || o.includes('no') || o.includes('false')) return '❌';
    return '🔵';
  }

  /**
   * Create a draggable/countable object as a sprite (if asset loaded) or graphics (fallback).
   * Returns a DisplayObject that can be positioned, dragged, and animated.
   */
  private createObjectSprite(kind: string, size: number): PIXI.DisplayObject {
    // Map internal kind names to asset names
    const assetMap: Record<string, { category: 'emoji' | 'food'; name: string }> = {
      'apple': { category: 'food', name: 'apple' },
      'mango': { category: 'emoji', name: 'mango' },
      'ball': { category: 'emoji', name: 'ball' },
      'star': { category: 'emoji', name: 'star' },
      'candy': { category: 'food', name: 'cookie' },
      'flower': { category: 'emoji', name: 'flower' },
      'leaf': { category: 'emoji', name: 'leaf' },
      'water-drop': { category: 'emoji', name: 'water' },
      'cake': { category: 'food', name: 'cake' },
      'cupcake': { category: 'food', name: 'cupcake' },
      'cookie': { category: 'food', name: 'cookie' },
      'fish': { category: 'food', name: 'fish' },
      'orange': { category: 'food', name: 'orange' },
      'strawberry': { category: 'food', name: 'strawberry' },
      'banana': { category: 'food', name: 'banana' },
      'carrot': { category: 'food', name: 'carrot' },
      'corn': { category: 'food', name: 'corn' },
      'egg': { category: 'food', name: 'egg' },
      'grapes': { category: 'food', name: 'grapes' },
      'tomato': { category: 'food', name: 'tomato' },
      'pizza': { category: 'food', name: 'pizza' },
    };

    const asset = assetMap[kind];
    if (asset) {
      const sprite = AssetLoader.trySprite(asset.category, asset.name);
      if (sprite) {
        // Scale sprite to target size
        const maxDim = Math.max(sprite.texture.width, sprite.texture.height);
        const scale = size / maxDim;
        sprite.scale.set(scale);
        return sprite;
      }
    }

    // Fallback: draw primitive shape
    const g = new PIXI.Graphics();
    this.drawEmojiObject(g, kind, size);
    return g;
  }

  /**
   * Create an animal sprite from Kenney animal pack.
   */
  private createAnimalSprite(name: string, size: number): PIXI.DisplayObject {
    const sprite = AssetLoader.trySprite('animal', name);
    if (sprite) {
      const maxDim = Math.max(sprite.texture.width, sprite.texture.height);
      sprite.scale.set(size / maxDim);
      return sprite;
    }
    // Fallback: circle
    const g = new PIXI.Graphics();
    g.beginFill(0xa78bfa);
    g.drawCircle(0, 0, size / 2);
    g.endFill();
    return g;
  }

  /**
   * Create a nature/world element sprite from OpenMoji.
   */
  private createNatureSprite(name: string, size: number): PIXI.DisplayObject {
    const sprite = AssetLoader.trySprite('emoji', name);
    if (sprite) {
      const maxDim = Math.max(sprite.texture.width, sprite.texture.height);
      sprite.scale.set(size / maxDim);
      return sprite;
    }
    // Fallback: circle
    const g = new PIXI.Graphics();
    g.beginFill(0x86efac);
    g.drawCircle(0, 0, size / 2);
    g.endFill();
    return g;
  }

  /**
   * Create a celebration particle sprite.
   */
  private createParticleSprite(name: string, size: number): PIXI.DisplayObject {
    const sprite = AssetLoader.trySprite('particle', name);
    if (sprite) {
      const maxDim = Math.max(sprite.texture.width, sprite.texture.height);
      sprite.scale.set(size / maxDim);
      return sprite;
    }
    // Fallback: star shape
    const g = new PIXI.Graphics();
    g.beginFill(0xfbbf24);
    this.drawStar(g, 0, 0, 5, size / 2, size / 4);
    g.endFill();
    return g;
  }

  private drawEmojiObject(g: PIXI.Graphics, kind: string, size: number): void {
    const r = size / 2;
    switch (kind) {
      case 'apple':
        g.beginFill(0xef4444);
        g.drawCircle(0, 0, r);
        g.endFill();
        g.beginFill(0x4a8b3a);
        g.drawEllipse(2, -r, 3, 5);
        g.endFill();
        g.beginFill(0xffffff, 0.3);
        g.drawCircle(-r * 0.3, -r * 0.3, r * 0.2);
        g.endFill();
        break;
      case 'mango':
        g.beginFill(0xfbbf24);
        g.drawEllipse(0, 0, r, r * 1.1);
        g.endFill();
        g.beginFill(0xf97316, 0.3);
        g.drawEllipse(0, r * 0.3, r * 0.7, r * 0.4);
        g.endFill();
        g.beginFill(0x4a8b3a);
        g.drawEllipse(0, -r, 2, 4);
        g.endFill();
        break;
      case 'ball':
        g.beginFill(0x3b82f6);
        g.drawCircle(0, 0, r);
        g.endFill();
        g.lineStyle(2, 0xffffff, 0.5);
        g.arc(0, 0, r * 0.7, -0.5, 0.5);
        g.arc(0, 0, r * 0.7, Math.PI - 0.5, Math.PI + 0.5);
        break;
      case 'star':
        g.beginFill(0xfbbf24);
        this.drawStar(g, 0, 0, 5, r, r * 0.4);
        g.endFill();
        break;
      case 'candy':
        g.beginFill(0xec4899);
        g.drawRoundedRect(-r * 0.6, -r * 0.4, r * 1.2, r * 0.8, 4);
        g.endFill();
        g.lineStyle(2, 0xffffff);
        g.moveTo(-r * 0.6, 0);
        g.lineTo(r * 0.6, 0);
        break;
      case 'flower':
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          g.beginFill(0xec4899);
          g.drawCircle(Math.cos(angle) * r * 0.5, Math.sin(angle) * r * 0.5, r * 0.4);
          g.endFill();
        }
        g.beginFill(0xfbbf24);
        g.drawCircle(0, 0, r * 0.3);
        g.endFill();
        break;
      case 'leaf':
        g.beginFill(0x16a34a);
        g.drawEllipse(0, 0, r * 0.6, r);
        g.endFill();
        g.lineStyle(1, 0x15803d);
        g.moveTo(0, -r);
        g.lineTo(0, r);
        break;
      case 'water-drop':
        g.beginFill(0x3b82f6);
        g.moveTo(0, -r);
        g.bezierCurveTo(r, -r * 0.3, r, r * 0.5, 0, r);
        g.bezierCurveTo(-r, r * 0.5, -r, -r * 0.3, 0, -r);
        g.endFill();
        g.beginFill(0xffffff, 0.3);
        g.drawCircle(-r * 0.2, -r * 0.1, r * 0.15);
        g.endFill();
        break;
      default:
        g.beginFill(0x6c5ce7);
        g.drawCircle(0, 0, r);
        g.endFill();
    }
  }

  private drawStar(g: PIXI.Graphics, cx: number, cy: number, spikes: number, outerR: number, innerR: number): void {
    let rot = -Math.PI / 2;
    const step = Math.PI / spikes;
    g.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * outerR;
      let y = cy + Math.sin(rot) * outerR;
      g.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * innerR;
      y = cy + Math.sin(rot) * innerR;
      g.lineTo(x, y);
      rot += step;
    }
    g.closePath();
  }

  // ─── Update loop ─────────────────────────────────────────────

  update(_delta: number): void {
    // GSAP handles animations; nothing to update per-frame
  }

  // ─── Resize ──────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  // ─── Adaptive: build an easier variant of the question ───────

  private buildEasierVariant(
    question: string,
    subject: string,
    answer: string,
    options: string[],
  ): { question: string; answer: string; options: string[] } | undefined {
    const q = question.toLowerCase();

    // Addition: reduce numbers
    const addMatch = q.match(/(\d+)\s*\+\s*(\d+)/) || q.match(/(\d+)\s+\w+.*?\s+(\d+)\s+more/);
    if (addMatch && subject === 'maths') {
      const a = Math.max(1, Math.floor(parseInt(addMatch[1]) / 2));
      const b = Math.max(1, Math.floor(parseInt(addMatch[2]) / 2));
      return {
        question: `What is ${a} + ${b}?`,
        answer: String(a + b),
        options: [String(a + b), String(a + b + 1), String(a + b - 1)],
      };
    }

    // Subtraction: reduce numbers
    const subMatch = q.match(/(\d+)\s*-\s*(\d+)/) || q.match(/(\d+)\s+\w+.*?(\d+)\s+(?:away|to|left)/);
    if (subMatch && subject === 'maths') {
      const a = Math.max(2, Math.floor(parseInt(subMatch[1]) / 2));
      const b = Math.max(1, Math.floor(parseInt(subMatch[2]) / 2));
      return {
        question: `What is ${a} - ${b}?`,
        answer: String(a - b),
        options: [String(a - b), String(a - b + 1), String(a - b - 1)],
      };
    }

    // Angles: use a simpler angle type
    if (q.includes('angle') && q.includes('90')) {
      return {
        question: 'A right angle measures how many degrees?',
        answer: '90',
        options: ['90', '45', '180'],
      };
    }

    // Perimeter: reduce side length
    if (q.includes('perimeter') && q.includes('square')) {
      return {
        question: 'What is the perimeter of a square with side 3 cm?',
        answer: '12',
        options: ['12', '9', '6'],
      };
    }

    // Area: reduce dimensions
    if (q.includes('area') && q.includes('rectangle')) {
      return {
        question: 'What is the area of a rectangle with length 3 and width 2?',
        answer: '6',
        options: ['6', '5', '8'],
      };
    }

    // Percentage: use a simpler percentage
    if (q.includes('percent') || q.includes('%')) {
      return {
        question: 'What is 50% of 10?',
        answer: '5',
        options: ['5', '10', '2'],
      };
    }

    // Fractions: use a simpler fraction
    if (q.includes('fraction') || q.includes('half')) {
      return {
        question: 'What is half of 10?',
        answer: '5',
        options: ['5', '4', '6'],
      };
    }

    // Decimals: use a simpler decimal
    if (q.includes('decimal')) {
      return {
        question: 'What is 0.5 as a fraction?',
        answer: '1/2',
        options: ['1/2', '1/4', '1/3'],
      };
    }

    // Prime/composite: use a smaller number
    if (q.includes('prime') || q.includes('composite')) {
      return {
        question: 'Is 2 a prime number?',
        answer: 'Yes',
        options: ['Yes', 'No'],
      };
    }

    // For all other types, return undefined — the adaptive system
    // will still provide hints and pre-fills, just no question swap.
    return undefined;
  }

  // ─── Cleanup ─────────────────────────────────────────────────

  clear(): void {
    if (this.simEngine) {
      this.simEngine.clear();
    }
    if (this.currentVisual) {
      gsap.killTweensOf(this.currentVisual.children);
      this.layer.removeChild(this.currentVisual);
      this.currentVisual.destroy({ children: true });
      this.currentVisual = null;
    }
  }

  destroy(): void {
    this.clear();
    if (this.simEngine) {
      this.simEngine.destroy();
      this.simEngine = null;
    }
  }
}
