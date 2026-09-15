/**
 * Sim Engine — Public API
 *
 * Usage:
 *   import { useSimEngine, SimRenderer, audioManager } from '@/lib/sim-engine';
 *   import type { SceneConfig } from '@/lib/sim-engine';
 */

// Types
export type {
  SceneConfig,
  SceneCategory,
  InteractionType,
  SceneObject,
  ObjectShape,
  DropTarget,
  SceneRule,
  RuleType,
  DifficultyLevel,
  SceneState,
  FeedbackEvent,
  FeedbackType,
  SoundEffect,
  SimRendererProps,
} from './types';

// Engine
export { useSimEngine } from './engine';

// Audio
export { audioManager } from './audio';

// Speech
export { speechManager } from './speech';

// Feedback
export {
  useFeedback,
  FeedbackOverlay,
  SparkleBurst,
  Confetti,
  SuccessBanner,
  HintBubble,
  ErrorShake,
} from './feedback';
export type { FeedbackState } from './feedback';
