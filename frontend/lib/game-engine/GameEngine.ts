/**
 * GameEngine — Main controller that orchestrates the entire game.
 *
 * Reads a GameData JSON and manages:
 * - Teaching slide flow with animated diagrams
 * - Challenge flow with adaptive difficulty
 * - Mascot mood and speech
 * - Learning artifact progression
 * - Story arc beats
 * - Scene state-reactive layers
 * - Audio and speech
 * - Particle effects and celebrations
 * - Progress tracking and scoring
 *
 * This is engine-agnostic — it manages STATE and emits EVENTS.
 * The renderer (PixiJS) listens to events and draws accordingly.
 */

import { audioManager } from '../sim-engine/audio';
import { speechManager } from '../sim-engine/speech';
import type {
  GameData,
  EngineState,
  EngineEvent,
  EngineEventListener,
  GamePhase,
  Challenge,
} from './types';

const MAX_CHALLENGES = 8;
const MAX_SLIDES = 5;
const HINT_DELAY_MS = 10000;
const ADAPTIVE_FAIL_THRESHOLD = 2;
const ADAPTIVE_WIN_THRESHOLD = 3;
const SCORE_PER_MISTAKE = 5;

export class GameEngine {
  private gameData: GameData;
  private state: EngineState;
  private listeners: Set<EngineEventListener> = new Set();
  private hintTimer: ReturnType<typeof setTimeout> | null = null;
  private startTime: number = 0;

  constructor(gameData: GameData) {
    this.gameData = gameData;
    this.state = {
      phase: 'loading',
      currentSlide: 0,
      currentChallenge: 0,
      stars: 0,
      mistakes: 0,
      score: 100,
      artifactProgress: 0,
      storyBeatIndex: 0,
      timeOfDay: 0.15, // dawn
      adaptiveMode: 'normal',
      consecutiveFails: 0,
      consecutiveWins: 0,
      complete: false,
    };
  }

  // ─── Event System ───────────────────────────────────────────

  on(listener: EngineEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(event: EngineEvent): void {
    this.listeners.forEach(l => l(event));
  }

  getState(): EngineState {
    return { ...this.state };
  }

  getGameData(): GameData {
    return this.gameData;
  }

  // ─── Lifecycle ──────────────────────────────────────────────

  /** Start the game — enter teaching phase */
  start(): void {
    this.startTime = Date.now();
    this.setPhase('teaching');
    this.emit({ type: 'phase-change', data: { phase: 'teaching' } });
    audioManager.play('tap');
  }

  /** Start playing challenges */
  startChallenges(): void {
    this.setPhase('playing');
    this.emit({ type: 'phase-change', data: { phase: 'playing' } });
    this.emit({ type: 'challenge-start', data: { index: 0 } });
    this.startHintTimer();
    this.updateStoryBeat();
  }

  /** Clean up resources */
  destroy(): void {
    this.clearHintTimer();
    speechManager.stop();
    this.listeners.clear();
  }

  // ─── Teaching Slides ────────────────────────────────────────

  nextSlide(): void {
    if (this.state.currentSlide < MAX_SLIDES - 1) {
      this.state.currentSlide++;
      audioManager.play('tap');
      const slide = this.gameData.slides[this.state.currentSlide];
      if (slide?.spoken) {
        speechManager.speak(slide.spoken);
      }
      this.emit({ type: 'slide-change', data: { index: this.state.currentSlide } });
    }
  }

  prevSlide(): void {
    if (this.state.currentSlide > 0) {
      this.state.currentSlide--;
      audioManager.play('tap');
      this.emit({ type: 'slide-change', data: { index: this.state.currentSlide } });
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < MAX_SLIDES) {
      this.state.currentSlide = index;
      audioManager.play('tap');
      const slide = this.gameData.slides[index];
      if (slide?.spoken) {
        speechManager.speak(slide.spoken);
      }
      this.emit({ type: 'slide-change', data: { index } });
    }
  }

  getCurrentSlide() {
    return this.gameData.slides[this.state.currentSlide];
  }

  // ─── Challenges ─────────────────────────────────────────────

  getCurrentChallenge(): Challenge {
    let challenge = this.gameData.challenges[this.state.currentChallenge];
    if (!challenge) return this.gameData.challenges[0];

    // Adaptive difficulty: swap to easier/harder variant
    if (this.state.adaptiveMode === 'easier' && challenge.easierVariant) {
      challenge = { ...challenge, ...challenge.easierVariant };
    } else if (this.state.adaptiveMode === 'harder' && challenge.harderVariant) {
      challenge = { ...challenge, ...challenge.harderVariant };
    }

    return challenge;
  }

  /** Submit an answer for the current challenge */
  submitAnswer(answer: string): boolean {
    this.clearHintTimer();
    const challenge = this.getCurrentChallenge();
    const isCorrect = answer === challenge.answer;

    if (isCorrect) {
      this.handleCorrect();
    } else {
      this.handleWrong(challenge);
    }

    return isCorrect;
  }

  /** Submit a sort placement (all items placed) */
  submitSort(placements: Record<string, string>): boolean {
    this.clearHintTimer();
    const challenge = this.getCurrentChallenge();
    if (!challenge.sortItems) return false;

    let allCorrect = true;
    for (const item of challenge.sortItems) {
      if (placements[item.id] !== item.correctBin) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      this.handleCorrect();
    } else {
      this.handleWrong(challenge);
    }

    return allCorrect;
  }

  private handleCorrect(): void {
    audioManager.play('success');
    this.state.stars++;
    this.state.consecutiveFails = 0;
    this.state.consecutiveWins++;

    // Adaptive: ramp up after 3 consecutive wins
    if (this.state.consecutiveWins >= ADAPTIVE_WIN_THRESHOLD && this.state.adaptiveMode !== 'harder') {
      this.state.adaptiveMode = 'harder';
    }

    // Update learning artifact (UPGRADE 3)
    this.state.artifactProgress++;
    this.emit({ type: 'artifact-update', data: { progress: this.state.artifactProgress } });

    // Update time of day (UPGRADE 7: scene reacts to progress)
    this.state.timeOfDay = 0.15 + (this.state.currentChallenge / MAX_CHALLENGES) * 0.7;

    // Celebration
    this.emit({ type: 'answer-correct', data: { challengeIndex: this.state.currentChallenge } });
    this.emit({ type: 'celebration', data: { intensity: 'normal' } });

    // Move to challenge-complete phase
    this.setPhase('challenge-complete');
    this.emit({ type: 'phase-change', data: { phase: 'challenge-complete' } });
  }

  private handleWrong(challenge: Challenge): void {
    audioManager.play('error');
    this.state.mistakes++;
    this.state.score = Math.max(0, this.state.score - SCORE_PER_MISTAKE);
    this.state.consecutiveWins = 0;
    this.state.consecutiveFails++;

    // Adaptive: drop to easier after 2 consecutive fails
    if (this.state.consecutiveFails >= ADAPTIVE_FAIL_THRESHOLD && this.state.adaptiveMode !== 'easier') {
      this.state.adaptiveMode = 'easier';
    }

    // Speak the misconception feedback
    if (challenge.misconception) {
      speechManager.speak(challenge.misconception);
    }

    this.emit({ type: 'answer-wrong', data: { misconception: challenge.misconception } });
    this.startHintTimer();
  }

  /** Advance to next challenge or finish */
  nextChallenge(): void {
    this.clearHintTimer();

    if (this.state.currentChallenge < MAX_CHALLENGES - 1) {
      this.state.currentChallenge++;
      this.setPhase('playing');
      this.emit({ type: 'phase-change', data: { phase: 'playing' } });
      this.emit({ type: 'challenge-start', data: { index: this.state.currentChallenge } });
      this.updateStoryBeat();
      this.startHintTimer();
    } else {
      this.completeGame();
    }
  }

  /** Show a hint for the current challenge */
  showHint(): void {
    const challenge = this.getCurrentChallenge();
    audioManager.play('hint');
    if (challenge.hint) {
      speechManager.speak(challenge.hint);
    }
    this.emit({ type: 'hint-shown', data: { hint: challenge.hint } });
  }

  private completeGame(): void {
    this.clearHintTimer();
    this.state.complete = true;
    this.setPhase('game-complete');
    audioManager.play('celebration');
    this.emit({ type: 'phase-change', data: { phase: 'game-complete' } });
    this.emit({ type: 'game-complete', data: { score: this.state.score } });
  }

  // ─── Adaptive Difficulty ────────────────────────────────────

  getAdaptiveMode(): 'normal' | 'easier' | 'harder' {
    return this.state.adaptiveMode;
  }

  resetAdaptive(): void {
    this.state.adaptiveMode = 'normal';
    this.state.consecutiveFails = 0;
    this.state.consecutiveWins = 0;
  }

  // ─── Hint Timer ─────────────────────────────────────────────

  private startHintTimer(): void {
    this.clearHintTimer();
    this.hintTimer = setTimeout(() => {
      if (this.state.phase === 'playing') {
        this.showHint();
      }
    }, HINT_DELAY_MS);
  }

  private clearHintTimer(): void {
    if (this.hintTimer) {
      clearTimeout(this.hintTimer);
      this.hintTimer = null;
    }
  }

  /** Call on any user interaction to reset the hint timer */
  onInteraction(): void {
    if (this.state.phase === 'playing') {
      this.clearHintTimer();
      this.startHintTimer();
    }
  }

  // ─── Story Arc (UPGRADE 5) ──────────────────────────────────

  private updateStoryBeat(): void {
    if (!this.gameData.storyArc) return;
    const beats = this.gameData.storyArc.beats;
    for (let i = 0; i < beats.length; i++) {
      if (beats[i].challengeIndices.includes(this.state.currentChallenge)) {
        if (this.state.storyBeatIndex !== i) {
          this.state.storyBeatIndex = i;
          this.emit({ type: 'story-beat-change', data: { beatIndex: i, beat: beats[i] } });
          if (beats[i].mascotDialogue) {
            speechManager.speak(beats[i].mascotDialogue);
          }
        }
        break;
      }
    }
  }

  getCurrentStoryBeat() {
    if (!this.gameData.storyArc) return null;
    return this.gameData.storyArc.beats[this.state.storyBeatIndex] || null;
  }

  // ─── Learning Artifact (UPGRADE 3) ──────────────────────────

  getArtifactProgress(): number {
    return this.state.artifactProgress;
  }

  getArtifactConfig() {
    return this.gameData.learningArtifact || null;
  }

  // ─── Helpers ────────────────────────────────────────────────

  private setPhase(phase: GamePhase): void {
    this.state.phase = phase;
  }

  getProgress(): number {
    return (this.state.currentChallenge / MAX_CHALLENGES) * 100;
  }

  getStars(): number {
    return this.state.stars;
  }

  getScore(): number {
    return this.state.score;
  }

  isComplete(): boolean {
    return this.state.complete;
  }
}
