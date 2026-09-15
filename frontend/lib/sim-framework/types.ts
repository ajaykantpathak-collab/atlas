/**
 * Simulation Framework Types
 *
 * The core types for the educational simulation engine.
 * Every simulation (science, math, etc.) implements these interfaces.
 */

import * as PIXI from 'pixi.js';

// ─── Simulation States ─────────────────────────────────────────

export type SimulationState =
  | 'idle'        // Not started
  | 'setup'       // Setting up the scene
  | 'playing'     // Student is interacting
  | 'mascot_turn' // Mascot is demonstrating a step
  | 'student_turn' // Student's turn to do a step
  | 'solved'      // Correct answer achieved
  | 'failed'      // Too many wrong attempts
  | 'completed';  // Walkthrough finished

// ─── Simulation Step (for guided walkthrough) ─────────────────

export interface SimulationStep {
  /** Unique step ID */
  id: string;
  /** What the mascot says when doing this step */
  mascotNarration: string;
  /** What the mascot does (animation description) */
  mascotAction: (sim: SimulationContext) => void;
  /** What the student is expected to do */
  studentInstruction: string;
  /** Hint to show if student is stuck */
  hint: string;
}

// ─── Simulation Context ───────────────────────────────────────

export interface SimulationContext {
  /** The PIXI container to draw into */
  container: PIXI.Container;
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** The PIXI app for ticker/access */
  app: PIXI.Application;
  /** Current question text */
  question: string;
  /** Correct answer */
  answer: string;
  /** Answer options */
  options: string[];
  /** Subject */
  subject: string;
  /** Speak callback (TTS) */
  speak: (text: string) => void;
  /** Play sound effect */
  playSound: (effect: string) => void;
  /** Called when the simulation is solved */
  onSolved: (answer: string) => void;
  /** Called when the student makes a wrong attempt */
  onWrong: () => void;
  /** Show celebration */
  celebrate: (x: number, y: number) => void;
  /** Show wrong feedback */
  showWrong: (x: number, y: number) => void;
  /** Set mascot mood */
  setMascotMood: (mood: string) => void;
  /** Whether adaptive/easier mode is active */
  adaptiveEasier: boolean;
  /** Whether show-me/guided mode is active */
  guidedMode: boolean;
  /**
   * In guided mode: call this when the student completes a step correctly.
   * The engine will advance to the next mascot step.
   * Outside guided mode: this is a no-op.
   */
  onStepCompleted: () => void;
}

// ─── Simulation Plugin Interface ──────────────────────────────

export interface SimulationPlugin {
  /** Unique plugin ID (e.g., 'mixing', 'algebra-tiles') */
  id: string;
  /** Topics this plugin handles (matched against question text) */
  topics: string[];
  /** Subject area */
  subject: string;
  /** Check if this plugin can handle a given question */
  canHandle: (question: string, subject: string) => boolean;
  /** Build the guided walkthrough steps for this question */
  buildSteps: (ctx: SimulationContext) => SimulationStep[];
  /** Render the simulation scene */
  render: (ctx: SimulationContext) => void;
  /** Clean up resources */
  destroy?: () => void;
}

// ─── Adaptive Difficulty Config ───────────────────────────────

export interface AdaptiveConfig {
  /** Number of wrong answers before adding hints */
  hintThreshold: number;
  /** Number of wrong answers before swapping to easier question */
  swapThreshold: number;
  /** Easier variant of the question (if available) */
  easierVariant?: {
    question: string;
    answer: string;
    options: string[];
  };
}

// ─── Simulation Registry ──────────────────────────────────────

export interface SimulationRegistry {
  register: (plugin: SimulationPlugin) => void;
  find: (question: string, subject: string) => SimulationPlugin | null;
}
