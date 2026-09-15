/**
 * Game Engine — Public API
 *
 * Import from here:
 * import { GameEngine, GameRenderer, LivingWorldMap } from '@/lib/game-engine';
 */

export { GameEngine } from './GameEngine';
export { Renderer } from './Renderer';
export { ParticleSystem } from './particles';
export { SceneRenderer } from './scenes/SceneRenderer';
export { MascotRenderer } from './mascots/MascotRenderer';
export { DiagramRenderer } from './diagrams/DiagramRenderer';
export { ChallengeRenderer } from './challenges/ChallengeRenderer';
export { VisualChallengeRenderer } from './challenges/VisualChallengeRenderer';
export { FeedbackOverlay } from './feedback/FeedbackOverlay';
export {
  LivingWorldMap,
  ProgressDashboard,
  recordGameCompletion,
  getGameProgress,
} from './LivingWorldMap';
export { GameRenderer, LazyGameRenderer } from '../../components/simulations/GameRenderer';

export type {
  GameData,
  TeachingSlide,
  Challenge,
  SortItem,
  SortBin,
  InteractiveObject,
  DiagramConfig,
  DiagramType,
  ArtifactConfig,
  ArtifactType,
  WorldMapNode,
  StoryArc,
  StoryBeat,
  SceneTheme,
  SceneLayer,
  SceneElement,
  EngineState,
  EngineEvent,
  GamePhase,
  GameRendererProps,
} from './types';
