/**
 * Renderer — PixiJS GPU-accelerated 2D canvas renderer
 *
 * Draws all game visuals on a single canvas:
 * - Parallax scene backgrounds with state-reactive layers (UPGRADE 7)
 * - Procedural mascots with mood animations
 * - Animated teaching diagrams (UPGRADE 1)
 * - Interactive objects (UPGRADE 2)
 * - Particle effects for celebrations
 * - UI overlays (slides, challenges, feedback)
 *
 * Listens to GameEngine events and updates the canvas accordingly.
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type { GameEngine } from './GameEngine';
import type { EngineEvent, GameData, SceneTheme } from './types';
import { SceneRenderer } from './scenes/SceneRenderer';
import { MascotRenderer } from './mascots/MascotRenderer';
import { DiagramRenderer } from './diagrams/DiagramRenderer';
import { ParticleSystem } from './particles';
import { ChallengeRenderer } from './challenges/ChallengeRenderer';
import { VisualChallengeRenderer } from './challenges/VisualChallengeRenderer';
import { AssetLoader } from './AssetLoader';
import { FeedbackOverlay } from './feedback/FeedbackOverlay';

export class Renderer {
  private app: PIXI.Application;
  private engine: GameEngine;
  private gameData: GameData;
  private container: HTMLElement;

  // Sub-renderers
  private sceneRenderer: SceneRenderer;
  private mascotRenderer: MascotRenderer;
  private diagramRenderer: DiagramRenderer;
  private particleSystem: ParticleSystem;
  private challengeRenderer: ChallengeRenderer;
  private visualChallengeRenderer: VisualChallengeRenderer;
  private feedbackOverlay: FeedbackOverlay;

  // Layers (z-ordered)
  private sceneLayer: PIXI.Container;
  private diagramLayer: PIXI.Container;
  private visualLayer: PIXI.Container;
  private objectLayer: PIXI.Container;
  private mascotLayer: PIXI.Container;
  private particleLayer: PIXI.Container;
  private uiLayer: PIXI.Container;

  private width: number;
  private height: number;
  private destroyed = false;

  constructor(container: HTMLElement, engine: GameEngine, width: number, height: number, forceCanvas: boolean = false) {
    this.container = container;
    this.engine = engine;
    this.gameData = engine.getGameData();
    this.width = width;
    this.height = height;

    // Create PixiJS application — try WebGL, fallback to Canvas2D
    const appOptions = {
      width,
      height,
      backgroundColor: 0xfdf6e3,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      forceCanvas: forceCanvas,
    } as PIXI.IApplicationOptions;
    this.app = new PIXI.Application(appOptions);

    container.appendChild(this.app.view as HTMLCanvasElement);

    // Create layers
    this.sceneLayer = new PIXI.Container();
    this.diagramLayer = new PIXI.Container();
    this.visualLayer = new PIXI.Container();
    this.objectLayer = new PIXI.Container();
    this.mascotLayer = new PIXI.Container();
    this.particleLayer = new PIXI.Container();
    this.uiLayer = new PIXI.Container();

    this.app.stage.addChild(
      this.sceneLayer,
      this.diagramLayer,
      this.visualLayer,
      this.objectLayer,
      this.mascotLayer,
      this.particleLayer,
      this.uiLayer,
    );

    // Initialize sub-renderers
    const theme: SceneTheme = this.gameData.theme || this.inferTheme();
    this.sceneRenderer = new SceneRenderer(this.sceneLayer, theme, width, height);
    this.diagramRenderer = new DiagramRenderer(this.diagramLayer, width, height);
    this.particleSystem = new ParticleSystem(this.particleLayer, width, height);
    this.mascotRenderer = new MascotRenderer(this.mascotLayer, width, height);
    this.challengeRenderer = new ChallengeRenderer(
      this.objectLayer,
      this.uiLayer,
      width,
      height,
      this.app,
    );
    this.visualChallengeRenderer = new VisualChallengeRenderer(
      this.visualLayer,
      width,
      height,
      this.app,
      {
        onAnswer: (answer: string) => {
          this.engine.submitAnswer(answer);
        },
        onMascotMood: (mood: 'happy' | 'celebrate' | 'thinking' | 'sad') => {
          this.mascotRenderer?.setMood(mood);
        },
      },
    );
    this.feedbackOverlay = new FeedbackOverlay(this.uiLayer, width, height);

    // Listen to engine events
    this.engine.on((event: EngineEvent) => this.handleEvent(event));

    // Start ticker for animations
    this.app.ticker.add((delta) => this.update(delta));

    // Preload common assets (sprites, emoji, particles) for visual rendering
    // This is fire-and-forget — assets that aren't loaded yet fall back to primitives
    AssetLoader.preloadCommon().catch(() => {});
  }

  // ─── Theme Inference ────────────────────────────────────────

  private inferTheme(): SceneTheme {
    const nodes = this.gameData.cisceNodes;
    const nodeStr = nodes.join(' ');
    if (nodeStr.includes('math')) return 'classroom';
    if (nodeStr.includes('bio') || nodeStr.includes('body')) return 'body';
    if (nodeStr.includes('chem')) return 'lab';
    if (nodeStr.includes('physics')) return 'lab';
    if (nodeStr.includes('evs') || nodeStr.includes('plant')) return 'garden';
    if (nodeStr.includes('geo')) return 'outdoor';
    if (nodeStr.includes('cs') || nodeStr.includes('computer')) return 'classroom';
    return 'default';
  }

  // ─── Event Handling ─────────────────────────────────────────

  private handleEvent(event: EngineEvent): void {
    if (this.destroyed) return;

    switch (event.type) {
      case 'phase-change':
        this.handlePhaseChange(event.data?.phase as string);
        break;
      case 'slide-change':
        this.renderSlide(event.data?.index as number);
        break;
      case 'challenge-start':
        this.renderChallenge(event.data?.index as number);
        break;
      case 'answer-correct':
        this.onCorrect();
        break;
      case 'answer-wrong':
        this.onWrong(event.data?.misconception as string);
        break;
      case 'hint-shown':
        this.onHint(event.data?.hint as string);
        break;
      case 'celebration':
        this.onCelebration();
        break;
      case 'artifact-update':
        this.onArtifactUpdate(event.data?.progress as number);
        break;
      case 'story-beat-change':
        this.onStoryBeat();
        break;
      case 'game-complete':
        this.onGameComplete();
        break;
    }
  }

  private handlePhaseChange(phase: string): void {
    switch (phase) {
      case 'teaching':
        this.sceneRenderer.setTimeOfDay(0.15);
        this.mascotRenderer.setMood('happy');
        this.renderSlide(0);
        break;
      case 'playing':
        this.sceneRenderer.setTimeOfDay(0.3);
        this.mascotRenderer.setMood('happy');
        break;
      case 'challenge-complete':
        this.mascotRenderer.setMood('celebrate');
        break;
      case 'game-complete':
        this.sceneRenderer.setTimeOfDay(0.85);
        this.mascotRenderer.setMood('celebrate');
        break;
    }
  }

  // ─── Rendering ──────────────────────────────────────────────

  private renderSlide(index: number): void {
    const slide = this.gameData.slides[index];
    if (!slide) return;

    // Clear diagram layer
    this.diagramLayer.removeChildren();

    // Render animated diagram if present (UPGRADE 1)
    if (slide.diagram) {
      this.diagramRenderer.render(slide.diagram);
    }

    // Update scene mood based on slide
    this.sceneRenderer.setMood(slide.bgColor);

    // Mascot speaks the slide
    this.mascotRenderer.setSpeech(slide.title);
  }

  private renderChallenge(index: number): void {
    const challenge = this.engine.getCurrentChallenge();
    if (!challenge) return;

    // Clear object layer
    this.objectLayer.removeChildren();

    // Render visual problem representation (interactive canvas visuals)
    this.visualChallengeRenderer.renderVisual(
      challenge.question,
      this.gameData.subject || 'general',
      challenge.answer,
      challenge.options || [],
      false,
    );

    // Render interactive objects (UPGRADE 2)
    if (challenge.interactiveObjects) {
      this.challengeRenderer.renderInteractiveObjects(
        challenge.interactiveObjects,
        (objectId: string) => this.handleObjectTap(objectId),
      );
    }

    // Render sort items if present
    if (challenge.sortItems && challenge.bins) {
      this.challengeRenderer.renderSortChallenge(
        challenge.sortItems,
        challenge.bins,
        (placements: Record<string, string>) => {
          this.engine.submitSort(placements);
        },
      );
    }

    // Render diagram if present
    this.diagramLayer.removeChildren();
    if (challenge.diagram) {
      this.diagramRenderer.render(challenge.diagram);
    }

    // Update scene time-of-day based on progress (UPGRADE 7)
    const progress = index / 8;
    this.sceneRenderer.setTimeOfDay(0.15 + progress * 0.7);

    this.mascotRenderer.setMood('happy');
    this.mascotRenderer.setSpeech(challenge.question);
  }

  private onCorrect(): void {
    this.particleSystem.burst(this.width / 2, this.height / 2, 'success');
    this.sceneRenderer.pulse();
  }

  private onWrong(misconception: string): void {
    this.particleSystem.burst(this.width / 2, this.height / 2, 'error');
    this.sceneRenderer.shake();
    this.feedbackOverlay.showMisconception(misconception);
  }

  private onHint(hint: string): void {
    this.feedbackOverlay.showHint(hint);
    this.mascotRenderer.setMood('thinking');
  }

  private onCelebration(): void {
    this.particleSystem.celebration();
  }

  private onArtifactUpdate(progress: number): void {
    // The UI layer handles artifact rendering
    this.feedbackOverlay.updateArtifact(progress, this.engine.getArtifactConfig());
  }

  private onStoryBeat(): void {
    const beat = this.engine.getCurrentStoryBeat();
    if (beat) {
      this.sceneRenderer.setStoryBeat(beat.name);
      this.mascotRenderer.setSpeech(beat.mascotDialogue);
    }
  }

  private onGameComplete(): void {
    this.particleSystem.celebration();
    this.particleSystem.celebration();
    this.feedbackOverlay.showGameComplete(this.engine.getScore(), this.engine.getStars());
  }

  private handleObjectTap(objectId: string): void {
    this.engine.onInteraction();
    const challenge = this.engine.getCurrentChallenge();
    if (!challenge.interactiveObjects) return;

    const obj = challenge.interactiveObjects.find(o => o.id === objectId);
    if (!obj) return;

    if (obj.isCorrect !== undefined) {
      // Tap-to-answer challenge
      this.engine.submitAnswer(obj.label || obj.id);
    }
  }

  // ─── Public API for visual challenge updates ────────────────

  /**
   * Update the visual challenge to show the correct answer.
   * Called when the student has failed multiple times.
   */
  showVisualCorrectAnswer(): void {
    const challenge = this.engine.getCurrentChallenge();
    if (!challenge) return;
    this.visualChallengeRenderer.renderVisual(
      challenge.question,
      this.gameData.subject || 'general',
      challenge.answer,
      challenge.options || [],
      true,
    );
  }

  /**
   * Trigger "Show me" guided mode — the mascot demonstrates the first step.
   * Then the student gets to try themselves.
   */
  triggerShowMe(): void {
    this.visualChallengeRenderer.triggerShowMe();
  }

  /**
   * Set adaptive difficulty — reduces objects / simplifies for struggling students.
   */
  setAdaptiveDifficulty(easier: boolean): void {
    this.visualChallengeRenderer.setAdaptiveDifficulty(easier);
  }

  /**
   * Set the scaffolding manager — enables scaffold level branching
   * (Level 3: manipulatives, Level 2: number line, Level 1: abstract).
   */
  setScaffoldManager(manager: import('./scaffolding/ScaffoldingManager').ScaffoldingManager): void {
    this.visualChallengeRenderer.setScaffoldManager(manager);
  }

  /**
   * Trigger remediation (alternative explanation) after a wrong answer.
   */
  triggerRemediation(question: string, subject: string, correctAnswer: string, studentAnswer: string): string {
    return this.visualChallengeRenderer.triggerRemediation(question, subject, correctAnswer, studentAnswer);
  }

  /**
   * Show a step-by-step solution walkthrough on the canvas.
   * Called after wrong answers to teach the student how to solve it.
   */
  showSolutionWalkthrough(): void {
    const challenge = this.engine.getCurrentChallenge();
    if (!challenge) return;
    this.visualChallengeRenderer.renderSolutionWalkthrough(
      challenge.question,
      challenge.answer,
      this.gameData.subject || 'general',
    );
  }

  // ─── Update Loop ────────────────────────────────────────────

  private update(delta: number): void {
    this.sceneRenderer.update(delta);
    this.mascotRenderer.update(delta);
    this.particleSystem.update(delta);
    this.diagramRenderer.update(delta);
    this.challengeRenderer.update(delta);
    this.visualChallengeRenderer.update(delta);
  }

  // ─── Resize ─────────────────────────────────────────────────

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.app.renderer.resize(width, height);
    this.sceneRenderer.resize(width, height);
    this.mascotRenderer.resize(width, height);
    this.particleSystem.resize(width, height);
    this.challengeRenderer.resize(width, height);
    this.visualChallengeRenderer.resize(width, height);
    this.feedbackOverlay.resize(width, height);
  }

  // ─── Cleanup ────────────────────────────────────────────────

  destroy(): void {
    this.destroyed = true;
    try { this.sceneRenderer.destroy(); } catch (_e) {}
    try { this.mascotRenderer.destroy(); } catch (_e) {}
    try { this.diagramRenderer.destroy(); } catch (_e) {}
    try { this.particleSystem.destroy(); } catch (_e) {}
    try { this.challengeRenderer.destroy(); } catch (_e) {}
    try { this.visualChallengeRenderer.destroy(); } catch (_e) {}
    try { this.feedbackOverlay.destroy(); } catch (_e) {}
    try {
      this.app.destroy(true, { children: true });
    } catch (_e) {}
    try {
      const view = this.app.view as HTMLCanvasElement;
      if (view && view.parentNode) {
        view.parentNode.removeChild(view);
      }
    } catch (_e) {}
  }
}
