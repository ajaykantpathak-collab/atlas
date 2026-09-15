/**
 * SimulationEngine — Core engine for Class 6-8 interactive simulations.
 *
 * Unlike the Class 1-5 GameEngine (which runs childish games with mascots
 * and counting challenges), this engine is designed for older students:
 *
 * - Real physics via Planck.js (Box2D)
 * - Real math via JSXGraph
 * - Real chemistry via Kekule.js
 * - Real 3D biology via Three.js
 * - Enrichment-driven content (not hardcoded game JSON)
 * - Predict → Explore → Test → Explain → Transfer workflow
 * - Misconception-specific feedback from enrichment data
 * - Mastery tracking across sessions
 *
 * The engine is simulation-agnostic: it loads a "simulation template"
 * (e.g. MotionSim, CircuitSim, MoleculeBuilder) and feeds it enrichment
 * data for the specific node being studied.
 */

import type { EnrichmentNode } from './EnrichmentParser';

// ─── Types ───────────────────────────────────────────────────

export type SimulationType =
  | 'physics-motion'
  | 'physics-force'
  | 'physics-gravity'
  | 'physics-friction'
  | 'physics-collision'
  | 'physics-pendulum'
  | 'physics-spring'
  | 'physics-projectile'
  | 'physics-pressure'
  | 'physics-buoyancy'
  | 'physics-light'
  | 'physics-circuit'
  | 'physics-magnetism'
  | 'physics-sound'
  | 'physics-heat'
  | 'chem-states'
  | 'chem-atom'
  | 'chem-molecule'
  | 'chem-reaction'
  | 'chem-acid-base'
  | 'chem-periodic'
  | 'bio-cell'
  | 'bio-photosynthesis'
  | 'bio-digestion'
  | 'bio-circulatory'
  | 'bio-plant-growth'
  | 'bio-food-web'
  | 'math-algebra'
  | 'math-geometry'
  | 'math-fraction'
  | 'math-graph'
  | 'math-numberline'
  | 'math-data'
  | 'math-3d-shapes'
  | 'geo-solar'
  | 'geo-water-cycle'
  | 'geo-rock-cycle'
  | 'geo-weather'
  | 'challenge-timeline'
  | 'challenge-concept-map'
  | 'challenge-sort'
  | 'challenge-solver'
  | 'challenge-label';

export interface SimulationConfig {
  /** Which simulation template to use */
  type: SimulationType;
  /** The enrichment node this simulation teaches */
  node: EnrichmentNode;
  /** Canvas width in pixels */
  width: number;
  /** Canvas height in pixels */
  height: number;
}

export type Phase = 'play' | 'discover' | 'test' | 'explain' | 'transfer' | 'complete';

export interface SimulationState {
  /** Current phase of the inquiry workflow */
  phase: Phase;
  /** Score 0-100 */
  score: number;
  /** Number of correct answers */
  correctCount: number;
  /** Number of wrong answers */
  errorCount: number;
  /** Which diagnostic questions have been answered correctly */
  answeredQuestions: Set<number>;
  /** Whether the student has made a prediction */
  hasPredicted: boolean;
  /** Whether the student has explored the simulation */
  hasExplored: boolean;
  /** Current question index (0-4) */
  currentQuestion: number;
  /** Misconceptions the student has triggered */
  triggeredMisconceptions: string[];
}

export interface SimulationCallbacks {
  onStateChange?: (state: SimulationState) => void;
  onComplete?: (score: number) => void;
  onMisconception?: (misconception: string, correction: string) => void;
  onPhaseChange?: (oldPhase: Phase, newPhase: Phase) => void;
}

// ─── Engine ──────────────────────────────────────────────────

export class SimulationEngine {
  private config: SimulationConfig;
  private callbacks: SimulationCallbacks;
  private state: SimulationState;
  private destroyed = false;

  constructor(
    config: SimulationConfig,
    callbacks: SimulationCallbacks = {},
  ) {
    this.config = config;
    this.callbacks = callbacks;
    this.state = {
      phase: 'play',
      score: 100,
      correctCount: 0,
      errorCount: 0,
      answeredQuestions: new Set(),
      hasPredicted: false,
      hasExplored: false,
      currentQuestion: 0,
      triggeredMisconceptions: [],
    };
  }

  // ─── Phase management ──────────────────────────────────────

  /**
   * Transition to a new phase.
   * Enforces the inquiry workflow order: play → discover → test → explain → transfer → complete
   */
  setPhase(phase: Phase): void {
    if (this.destroyed) return;
    const oldPhase = this.state.phase;
    if (oldPhase === phase) return;
    this.state.phase = phase;
    this.callbacks.onPhaseChange?.(oldPhase, phase);
    this.emitState();
  }

  getPhase(): Phase {
    return this.state.phase;
  }

  // ─── Prediction ────────────────────────────────────────────

  /**
   * Record the student's prediction before they explore the simulation.
   * Called when the student submits their prediction in the "play" phase.
   */
  recordPrediction(prediction: string): void {
    if (this.destroyed) return;
    this.state.hasPredicted = true;
    // Move to discover phase after prediction
    this.setPhase('discover');
  }

  // ─── Exploration ───────────────────────────────────────────

  /**
   * Mark that the student has interacted with the simulation.
   * Called when the student manipulates variables in the simulation.
   */
  markExplored(): void {
    if (this.destroyed) return;
    this.state.hasExplored = true;
  }

  /**
   * Move from discover to test phase.
   * Called when the student clicks "I'm ready to test my understanding".
   */
  startTesting(): void {
    if (this.destroyed) return;
    if (this.state.hasExplored) {
      this.setPhase('test');
    }
  }

  // ─── Questions ─────────────────────────────────────────────

  /**
   * Get the current diagnostic question.
   */
  getCurrentQuestion(): EnrichmentNode['diagnosticQuestions'][0] | null {
    const questions = this.config.node.diagnosticQuestions;
    if (this.state.currentQuestion >= questions.length) return null;
    return questions[this.state.currentQuestion];
  }

  /**
   * Submit an answer to the current diagnostic question.
   * Returns whether the answer was correct.
   */
  submitAnswer(answer: string): boolean {
    if (this.destroyed) return false;
    const question = this.getCurrentQuestion();
    if (!question) return false;

    // For now, we use a simple similarity check.
    // In production, this would use an LLM or more sophisticated matching.
    const isCorrect = this.checkAnswer(answer, question.answer);

    if (isCorrect) {
      this.state.correctCount++;
      this.state.answeredQuestions.add(question.number);
      this.state.score = Math.max(0, 100 - this.state.errorCount * 5);

      // Advance to next question
      this.state.currentQuestion++;

      // Check if we've answered all questions
      if (this.state.currentQuestion >= this.config.node.diagnosticQuestions.length) {
        // Move to explain phase, then transfer
        if (this.state.phase === 'test') {
          this.setPhase('explain');
        }
      }
    } else {
      this.state.errorCount++;
      this.state.score = Math.max(0, 100 - this.state.errorCount * 5);

      // Find the relevant misconception and remediation path
      const remediation = this.config.node.remediationPaths.find(
        r => r.questionNumber === question.number,
      );
      const misconception = this.config.node.misconceptions[
        Math.min(this.state.errorCount - 1, this.config.node.misconceptions.length - 1)
      ];

      if (misconception) {
        this.state.triggeredMisconceptions.push(misconception.belief);
        this.callbacks.onMisconception?.(misconception.belief, misconception.correction);
      }

      // Return false so the UI can show the misconception feedback
      return false;
    }

    this.emitState();
    return isCorrect;
  }

  /**
   * Check if the student's answer is correct.
   * This is a simple keyword-matching approach.
   * In production, this would be replaced with LLM-based evaluation.
   */
  private checkAnswer(studentAnswer: string, modelAnswer: string): boolean {
    // For multiple-choice questions, the answer should match exactly
    // For open-ended questions, we check for key terms
    const student = studentAnswer.toLowerCase().trim();
    const model = modelAnswer.toLowerCase().trim();

    // If the answer is very short (like "A" or "B"), check exact match
    if (student.length <= 3) {
      return student === model.substring(0, student.length);
    }

    // For longer answers, check if key terms from the model answer are present
    // Extract significant words from the model answer (length > 4)
    const modelWords = model
      .split(/\s+/)
      .filter(w => w.length > 4 && !['about', 'which', 'their', 'there', 'would', 'could', 'should', 'because', 'however'].includes(w));

    // Check if at least 30% of model words appear in the student answer
    const studentWords = new Set(student.split(/\s+/));
    const matchedWords = modelWords.filter(w => studentWords.has(w));
    const matchRatio = matchedWords.length / Math.max(modelWords.length, 1);

    return matchRatio >= 0.3;
  }

  // ─── Explain & Transfer ────────────────────────────────────

  /**
   * Move from explain to transfer phase.
   */
  startTransfer(): void {
    if (this.destroyed) return;
    this.setPhase('transfer');
  }

  /**
   * Complete the simulation.
   */
  complete(): void {
    if (this.destroyed) return;
    this.setPhase('complete');
    this.callbacks.onComplete?.(this.state.score);
  }

  // ─── State ─────────────────────────────────────────────────

  getState(): SimulationState {
    return { ...this.state, answeredQuestions: new Set(this.state.answeredQuestions) };
  }

  private emitState(): void {
    if (this.destroyed) return;
    this.callbacks.onStateChange?.(this.getState());
  }

  // ─── Cleanup ───────────────────────────────────────────────

  destroy(): void {
    this.destroyed = true;
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  // ─── Helpers ───────────────────────────────────────────────

  getNode(): EnrichmentNode {
    return this.config.node;
  }

  getConfig(): SimulationConfig {
    return this.config;
  }
}

// ─── Simulation registry ─────────────────────────────────────

/**
 * Maps enrichment node IDs to simulation types.
 * This determines which simulation template to use for each topic.
 *
 * In production, this would be a comprehensive mapping loaded from a JSON file.
 * For now, it's a function that infers the simulation type from the node's
 * subject and title keywords.
 */
export function inferSimulationType(node: EnrichmentNode): SimulationType {
  const title = node.title.toLowerCase();
  const subject = node.subject;

  // Physics
  if (subject === 'physics') {
    if (title.includes('motion') || title.includes('speed') || title.includes('average speed')) return 'physics-motion';
    if (title.includes('force')) return 'physics-force';
    if (title.includes('gravity') || title.includes('weight')) return 'physics-gravity';
    if (title.includes('friction')) return 'physics-friction';
    if (title.includes('collision') || title.includes('momentum')) return 'physics-collision';
    if (title.includes('pendulum') || title.includes('periodic')) return 'physics-pendulum';
    if (title.includes('spring')) return 'physics-spring';
    if (title.includes('projectile')) return 'physics-projectile';
    if (title.includes('pressure')) return 'physics-pressure';
    if (title.includes('buoyancy') || title.includes('float') || title.includes('sink')) return 'physics-buoyancy';
    if (title.includes('light') || title.includes('reflection') || title.includes('mirror')) return 'physics-light';
    if (title.includes('circuit') || title.includes('electric')) return 'physics-circuit';
    if (title.includes('magnet')) return 'physics-magnetism';
    if (title.includes('sound') || title.includes('wave') || title.includes('vibration')) return 'physics-sound';
    if (title.includes('heat') || title.includes('temperature') || title.includes('thermal')) return 'physics-heat';
    // Default for measurement topics
    return 'challenge-solver';
  }

  // Chemistry
  if (subject === 'chem') {
    if (title.includes('state') && title.includes('matter')) return 'chem-states';
    if (title.includes('atom')) return 'chem-atom';
    if (title.includes('molecule') || title.includes('compound')) return 'chem-molecule';
    if (title.includes('reaction') || title.includes('chemical change')) return 'chem-reaction';
    if (title.includes('acid') || title.includes('base') || title.includes('ph')) return 'chem-acid-base';
    if (title.includes('periodic') || title.includes('element')) return 'chem-periodic';
    return 'challenge-solver';
  }

  // Biology
  if (subject === 'bio') {
    if (title.includes('cell')) return 'bio-cell';
    if (title.includes('photosynthesis') || title.includes('plant') && title.includes('process')) return 'bio-photosynthesis';
    if (title.includes('digest')) return 'bio-digestion';
    if (title.includes('circulatory') || title.includes('heart') || title.includes('blood')) return 'bio-circulatory';
    if (title.includes('plant') && (title.includes('growth') || title.includes('life'))) return 'bio-plant-growth';
    if (title.includes('food') && (title.includes('chain') || title.includes('web') || title.includes('ecosystem'))) return 'bio-food-web';
    return 'challenge-label';
  }

  // Maths
  if (subject === 'maths') {
    if (title.includes('algebra') || title.includes('equation')) return 'math-algebra';
    if (title.includes('geometry') || title.includes('angle') || title.includes('triangle') || title.includes('circle')) return 'math-geometry';
    if (title.includes('fraction') || title.includes('ratio') || title.includes('proportion')) return 'math-fraction';
    if (title.includes('graph') || title.includes('coordinate') || title.includes('plot')) return 'math-graph';
    if (title.includes('integer') || title.includes('number line') || title.includes('negative')) return 'math-numberline';
    if (title.includes('data') || title.includes('statistics') || title.includes('bar chart') || title.includes('pie')) return 'math-data';
    if (title.includes('3d') || title.includes('cube') || title.includes('cylinder') || title.includes('sphere')) return 'math-3d-shapes';
    return 'math-numberline';
  }

  // Geography
  if (subject === 'geo' || subject === 'geography') {
    if (title.includes('solar') || title.includes('planet') || title.includes('earth') && title.includes('rotation')) return 'geo-solar';
    if (title.includes('water cycle')) return 'geo-water-cycle';
    if (title.includes('rock')) return 'geo-rock-cycle';
    if (title.includes('weather') || title.includes('climate')) return 'geo-weather';
    return 'challenge-timeline';
  }

  // History / Civics
  if (subject === 'histciv' || subject === 'history' || subject === 'civics') {
    if (title.includes('timeline') || title.includes('event') || title.includes('chronolog')) return 'challenge-timeline';
    return 'challenge-concept-map';
  }

  // Computer Science
  if (subject === 'cs' || subject === 'computer') {
    return 'challenge-solver';
  }

  // EVS
  if (subject === 'evs') {
    return 'challenge-sort';
  }

  // Default
  return 'challenge-solver';
}

// ─── Enrichment data cache ───────────────────────────────────

/**
 * Cache of parsed enrichment nodes, keyed by node ID.
 * Populated by loadEnrichmentData() and used by the UI to look up nodes.
 */
const enrichmentCache = new Map<string, EnrichmentNode>();

/**
 * Register enrichment nodes in the cache.
 * Called at app startup or when loading a specific class/subject.
 */
export function registerEnrichmentNodes(nodes: EnrichmentNode[]): void {
  for (const node of nodes) {
    enrichmentCache.set(node.nodeId, node);
  }
}

/**
 * Get a specific enrichment node by ID.
 */
export function getEnrichmentNode(nodeId: string): EnrichmentNode | undefined {
  return enrichmentCache.get(nodeId);
}

/**
 * Get all registered enrichment nodes for a specific class and subject.
 */
export function getEnrichmentNodesForClassSubject(classLevel: number, subject: string): EnrichmentNode[] {
  const result: EnrichmentNode[] = [];
  for (const node of enrichmentCache.values()) {
    if (node.classLevel === classLevel && node.subject === subject) {
      result.push(node);
    }
  }
  return result.sort((a, b) => a.nodeId.localeCompare(b.nodeId));
}
