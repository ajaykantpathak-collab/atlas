/**
 * SimulationEngine
 *
 * The core engine that manages simulation state, guided walkthroughs,
 * and adaptive difficulty. It sits between the VisualChallengeRenderer
 * and individual simulation plugins.
 *
 * State machine:
 *   idle → setup → playing → (mascot_turn ↔ student_turn) → solved
 *                                  ↓
 *                               failed → (adaptive swap) → setup
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import type {
  SimulationContext,
  SimulationPlugin,
  SimulationStep,
  SimulationState,
  AdaptiveConfig,
} from './types';
import { simulationRegistry } from './SimulationRegistry';

export class SimulationEngine {
  private layer: PIXI.Container;
  private width: number;
  private height: number;
  private app: PIXI.Application;

  private state: SimulationState = 'idle';
  private currentPlugin: SimulationPlugin | null = null;
  private currentSteps: SimulationStep[] = [];
  private currentStepIndex = 0;
  private context: SimulationContext | null = null;
  private adaptiveConfig: AdaptiveConfig | null = null;
  private wrongCount = 0;
  private guidedMode = false;
  private adaptiveEasier = false;
  private currentContainer: PIXI.Container | null = null;

  // Callbacks
  private onSolved: (answer: string) => void;
  private onWrong: () => void;
  private onSpeak: (text: string) => void;
  private onPlaySound: (effect: string) => void;
  private onCelebrate: (x: number, y: number) => void;
  private onShowWrong: (x: number, y: number) => void;
  private onMascotMood: (mood: string) => void;
  private onAdaptiveSwap: (question: string, answer: string, options: string[]) => void;

  constructor(
    layer: PIXI.Container,
    width: number,
    height: number,
    app: PIXI.Application,
    callbacks: {
      onSolved: (answer: string) => void;
      onWrong: () => void;
      onSpeak: (text: string) => void;
      onPlaySound: (effect: string) => void;
      onCelebrate: (x: number, y: number) => void;
      onShowWrong: (x: number, y: number) => void;
      onMascotMood: (mood: string) => void;
      onAdaptiveSwap?: (question: string, answer: string, options: string[]) => void;
    },
  ) {
    this.layer = layer;
    this.width = width;
    this.height = height;
    this.app = app;
    this.onSolved = callbacks.onSolved;
    this.onWrong = callbacks.onWrong;
    this.onSpeak = callbacks.onSpeak;
    this.onPlaySound = callbacks.onPlaySound;
    this.onCelebrate = callbacks.onCelebrate;
    this.onShowWrong = callbacks.onShowWrong;
    this.onMascotMood = callbacks.onMascotMood;
    this.onAdaptiveSwap = callbacks.onAdaptiveSwap || (() => {});
  }

  /**
   * Try to run a simulation for the given question.
   * Returns true if a plugin was found and the simulation started.
   */
  run(
    question: string,
    subject: string,
    answer: string,
    options: string[],
    adaptiveConfig?: AdaptiveConfig,
  ): boolean {
    const plugin = simulationRegistry.find(question, subject);
    if (!plugin) return false;

    this.clear();
    this.currentPlugin = plugin;
    this.adaptiveConfig = adaptiveConfig || null;
    this.wrongCount = 0;
    this.state = 'setup';

    const container = new PIXI.Container();
    this.currentContainer = container;
    this.layer.addChild(container);

    this.context = {
      container,
      width: this.width,
      height: this.height,
      app: this.app,
      question,
      answer,
      options,
      subject,
      speak: (text: string) => this.onSpeak(text),
      playSound: (effect: string) => this.onPlaySound(effect),
      onSolved: (ans: string) => this.handleSolved(ans),
      onWrong: () => this.handleWrong(),
      celebrate: (x: number, y: number) => this.onCelebrate(x, y),
      showWrong: (x: number, y: number) => this.onShowWrong(x, y),
      setMascotMood: (mood: string) => this.onMascotMood(mood),
      adaptiveEasier: this.adaptiveEasier,
      guidedMode: this.guidedMode,
      onStepCompleted: () => this.handleStepCompleted(),
    };

    // Build guided steps if in guided mode
    if (this.guidedMode) {
      this.currentSteps = plugin.buildSteps(this.context);
      this.currentStepIndex = 0;
    }

    // Render the simulation
    plugin.render(this.context);
    this.state = 'playing';

    // If guided mode, start with mascot's first step
    if (this.guidedMode && this.currentSteps.length > 0) {
      this.startMascotStep();
    }

    return true;
  }

  /**
   * Start a mascot step in the guided walkthrough.
   */
  private startMascotStep(): void {
    if (this.currentStepIndex >= this.currentSteps.length) {
      this.state = 'playing';
      return;
    }

    this.state = 'mascot_turn';
    const step = this.currentSteps[this.currentStepIndex];
    this.onMascotMood('thinking');
    this.onSpeak(step.mascotNarration);

    // Execute mascot action
    setTimeout(() => {
      if (this.context) {
        step.mascotAction(this.context);
      }
      // After mascot finishes, switch to student turn
      setTimeout(() => {
        this.startStudentStep();
      }, 2000);
    }, 1000);
  }

  /**
   * Start a student step in the guided walkthrough.
   */
  private startStudentStep(): void {
    if (this.currentStepIndex >= this.currentSteps.length) {
      this.state = 'playing';
      return;
    }

    this.state = 'student_turn';
    const step = this.currentSteps[this.currentStepIndex];
    this.onMascotMood('happy');
    this.onSpeak(step.studentInstruction);

    // Show hint after 10 seconds of inactivity
    setTimeout(() => {
      if (this.state === 'student_turn') {
        this.onSpeak(step.hint);
      }
    }, 10000);
  }

  /**
   * Handle a step completion from the plugin (guided mode).
   * The plugin calls ctx.onStepCompleted() when the student does the correct action.
   */
  private handleStepCompleted(): void {
    if (this.state !== 'student_turn') return;

    this.currentStepIndex++;
    if (this.currentStepIndex >= this.currentSteps.length) {
      // All steps done — student has completed the walkthrough
      this.state = 'playing';
      this.onMascotMood('celebrate');
      this.onSpeak('You did all the steps! Now try the next challenge!');
    } else {
      // Next step — mascot's turn
      this.startMascotStep();
    }
  }

  /**
   * Handle a correct answer.
   */
  private handleSolved(answer: string): void {
    if (this.state === 'solved') return;
    this.state = 'solved';
    this.onMascotMood('celebrate');
    this.onSolved(answer);
  }

  /**
   * Handle a wrong answer — adaptive difficulty logic.
   */
  private handleWrong(): void {
    this.wrongCount++;
    this.onWrong();
    this.onMascotMood('sad');

    const config = this.adaptiveConfig;
    if (!config) return;

    // Phase 1: Add hints after hintThreshold wrong answers
    if (this.wrongCount === config.hintThreshold) {
      this.adaptiveEasier = true;
      if (this.context) {
        this.context.adaptiveEasier = true;
      }
      this.onSpeak("Let me make this a bit easier for you!");
    }

    // Phase 2: Swap to easier question after swapThreshold wrong answers
    if (this.wrongCount >= config.swapThreshold && config.easierVariant) {
      this.onSpeak("Let's try a simpler version of this question first.");
      this.onAdaptiveSwap(
        config.easierVariant.question,
        config.easierVariant.answer,
        config.easierVariant.options,
      );
    }
  }

  /**
   * Enable/disable guided mode (step-by-step walkthrough).
   */
  setGuidedMode(enabled: boolean): void {
    this.guidedMode = enabled;
  }

  /**
   * Set adaptive easier mode manually.
   */
  setAdaptiveEasier(easier: boolean): void {
    this.adaptiveEasier = easier;
    if (this.context) {
      this.context.adaptiveEasier = easier;
    }
  }

  /**
   * Get current state.
   */
  getState(): SimulationState {
    return this.state;
  }

  /**
   * Get wrong count.
   */
  getWrongCount(): number {
    return this.wrongCount;
  }

  /**
   * Clear the current simulation.
   */
  clear(): void {
    if (this.currentContainer) {
      this.layer.removeChild(this.currentContainer);
      this.currentContainer.destroy({ children: true });
      this.currentContainer = null;
    }
    if (this.currentPlugin?.destroy) {
      this.currentPlugin.destroy();
    }
    this.currentPlugin = null;
    this.currentSteps = [];
    this.currentStepIndex = 0;
    this.context = null;
    this.state = 'idle';
  }

  /**
   * Destroy the engine.
   */
  destroy(): void {
    this.clear();
    gsap.killTweensOf(this.layer);
  }
}
