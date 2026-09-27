/**
 * Game Engine — Core Type Definitions
 *
 * One engine reads any game JSON and renders a world-class learning game.
 * All 133 games use this same type system.
 *
 * The 7 upgrades are embedded throughout:
 * 1. Animated diagrams in teaching slides (diagram field on slides)
 * 2. SVG objects as the interaction (interactiveObjects on challenges)
 * 3. Persistent learning artifact (learningArtifact on game)
 * 4. Living world map (worldMapNode on game)
 * 5. Story arc with advancing scenes (storyArc on game)
 * 6. Shared SVG design system (theme field on game)
 * 7. State-reactive scene layers (reactiveLayers on scene)
 */

// ─── Game Data (loaded from JSON) ─────────────────────────────

export interface GameData {
  /** Game identifier, e.g. "CountingGame" */
  gameFile: string;
  /** Class level 1-5 */
  classLevel: number;
  /** CISCE enrichment node IDs */
  cisceNodes: string[];
  /** Mascot name/description */
  mascot: string;
  /** Number of teaching slides (always 5) */
  slideCount: number;
  /** Number of challenges (always 8) */
  challengeCount: number;
  /** Teaching slides */
  slides: TeachingSlide[];
  /** Challenges */
  challenges: Challenge[];
  /** Subject area, inferred from node IDs */
  subject?: string;
  /** Theme key for the shared SVG design system (UPGRADE 6) */
  theme?: SceneTheme;
  /** Story arc for narrative progression (UPGRADE 5) */
  storyArc?: StoryArc;
  /** Learning artifact that builds up during the game (UPGRADE 3) */
  learningArtifact?: ArtifactConfig;
  /** Living world map node (UPGRADE 4) */
  worldMapNode?: WorldMapNode;
  /** Linked sims_v2 id — set by the play page from _sim_map.json so the
   * completion screen can offer a deeper interactive exploration. */
  simId?: string;
}

export interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
  /** Animated diagram to display on this slide (UPGRADE 1) */
  diagram?: DiagramConfig;
}

export interface Challenge {
  type: string;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  /** Sort items for sort-type challenges */
  sortItems?: SortItem[];
  /** Bins for sort-type challenges */
  bins?: SortBin[];
  /** Interactive objects the student taps/drags (UPGRADE 2) */
  interactiveObjects?: InteractiveObject[];
  /** Easier variant for adaptive difficulty (UPGRADE: adaptive) */
  easierVariant?: Partial<Challenge>;
  /** Harder variant for adaptive difficulty */
  harderVariant?: Partial<Challenge>;
  /** Story beat for this challenge (UPGRADE 5) */
  storyBeat?: string;
  /** Diagram to show alongside this challenge */
  diagram?: DiagramConfig;
}

export interface SortItem {
  id: string;
  label: string;
  icon: string;
  emoji?: string;
  correctBin: string;
}

export interface SortBin {
  id: string;
  label: string;
  color: string;
}

// ─── UPGRADE 1: Animated Diagrams ─────────────────────────────

export type DiagramType =
  | 'place-value-chart'
  | 'factor-tree'
  | 'fraction-bar'
  | 'fraction-pizza'
  | 'number-line'
  | 'body-diagram'
  | 'plant-parts'
  | 'water-cycle'
  | 'food-chain'
  | 'circuit'
  | 'solar-system'
  | 'balance-scale'
  | 'shape-sorter'
  | 'pattern-builder'
  | 'counting-objects'
  | 'bar-chart'
  | 'venn-diagram'
  | 'timeline'
  | 'map-india'
  | 'generic-flow';

export interface DiagramConfig {
  type: DiagramType;
  /** Title shown above the diagram */
  title?: string;
  /** Data to drive the diagram (type-specific) */
  data?: Record<string, unknown>;
  /** Whether the diagram animates step-by-step on appear */
  animate?: boolean;
  /** Steps to reveal in sequence (for step-by-step animation) */
  steps?: DiagramStep[];
}

export interface DiagramStep {
  /** Label for this step */
  label: string;
  /** What to highlight/add in this step */
  action: string;
  /** Duration in ms */
  duration?: number;
}

// ─── UPGRADE 2: Interactive Objects ───────────────────────────

export type InteractionStyle = 'tap' | 'drag' | 'drag-to-bin' | 'drag-to-order' | 'connect';

export interface InteractiveObject {
  id: string;
  /** What this object represents (apple, pizza slice, shape, animal) */
  kind: string;
  /** Display label */
  label?: string;
  /** Position on canvas (0-1 relative) */
  x: number;
  y: number;
  /** Size in pixels */
  size?: number;
  /** Color for procedural rendering */
  color?: string;
  /** Whether this is the correct answer (for tap challenges) */
  isCorrect?: boolean;
  /** Category for sort challenges */
  category?: string;
  /** Value for counting/math challenges */
  value?: number;
  /** Interaction style */
  interaction: InteractionStyle;
  /** Target bin ID (for drag-to-bin) */
  targetBin?: string;
  /** Order position (for drag-to-order) */
  orderPosition?: number;
}

// ─── UPGRADE 3: Learning Artifact ─────────────────────────────

export type ArtifactType =
  | 'growing-tree'
  | 'filling-chart'
  | 'building-map'
  | 'collecting-stars'
  | 'growing-garden'
  | 'filling-shelves'
  | 'building-structure'
  | 'completing-puzzle';

export interface ArtifactConfig {
  type: ArtifactType;
  /** Title shown to student */
  title: string;
  /** How many pieces/steps to complete (usually = challenge count) */
  totalPieces: number;
  /** Visual theme for the artifact */
  theme?: string;
}

// ─── UPGRADE 4: Living World Map ──────────────────────────────

export interface WorldMapNode {
  /** Node ID on the world map */
  nodeId: string;
  /** Region/area on the map */
  region: string;
  /** X position on map (0-1) */
  mapX: number;
  /** Y position on map (0-1) */
  mapY: number;
  /** Icon to show on the map */
  icon: string;
  /** Prerequisite node IDs that must be completed first */
  prerequisites?: string[];
}

// ─── UPGRADE 5: Story Arc ─────────────────────────────────────

export interface StoryArc {
  /** Theme of the story */
  theme: string;
  /** 5-beat story mapped to 8 challenges */
  beats: StoryBeat[];
}

export interface StoryBeat {
  /** Beat name: setup, inciting, rising, climax, resolution */
  name: 'setup' | 'inciting' | 'rising' | 'climax' | 'resolution';
  /** Challenge indices this beat covers (0-7) */
  challengeIndices: number[];
  /** Scene description for this beat */
  sceneDescription: string;
  /** Mascot dialogue for this beat */
  mascotDialogue: string;
}

// ─── UPGRADE 6: Shared SVG Design System ──────────────────────

export type SceneTheme =
  | 'orchard'      // apple trees, farms, gardens
  | 'classroom'    // school, chalkboard, desks
  | 'kitchen'      // cooking, food, fractions
  | 'lab'          // science lab, experiments
  | 'body'         // human body, health
  | 'outdoor'      // nature, sky, landscape
  | 'space'        // solar system, stars
  | 'city'         // buildings, transport, community
  | 'market'       // shopping, money, trade
  | 'zoo'          // animals, habitats
  | 'garden'       // plants, flowers, growing
  | 'ocean'        // water, sea creatures
  | 'music'        // sound, instruments
  | 'art'          // colors, shapes, creativity
  | 'default';     // generic learning space

// ─── UPGRADE 7: State-Reactive Scene Layers ───────────────────

export type SceneLayerType =
  | 'sky'          // background sky with gradient
  | 'sun-moon'     // celestial body that moves
  | 'clouds'       // drifting clouds
  | 'weather'      // rain, snow, leaves
  | 'background'   // far background (mountains, buildings)
  | 'midground'    // mid-distance objects
  | 'foreground'   // close-up objects
  | 'ground'       // ground/floor
  | 'particles'    // ambient particles
  | 'lighting';    // overlay lighting/tint

export interface SceneLayer {
  type: SceneLayerType;
  /** Parallax speed factor (0 = static, 1 = moves with camera) */
  parallaxSpeed: number;
  /** Whether this layer reacts to game state */
  reactive?: boolean;
  /** What state changes affect this layer */
  reactsTo?: 'correct' | 'wrong' | 'progress' | 'time-of-day' | 'celebration';
  /** Visual elements in this layer */
  elements: SceneElement[];
}

export interface SceneElement {
  kind: string;
  x: number;
  y: number;
  size?: number;
  color?: string;
  /** Animation type */
  animation?: 'drift' | 'sway' | 'rotate' | 'pulse' | 'float' | 'fall' | 'none';
  /** Animation speed */
  animSpeed?: number;
}

// ─── Engine State ─────────────────────────────────────────────

export type GamePhase = 'loading' | 'teaching' | 'playing' | 'challenge-complete' | 'game-complete';

export interface EngineState {
  phase: GamePhase;
  currentSlide: number;
  currentChallenge: number;
  stars: number;
  mistakes: number;
  score: number;
  /** Artifact progress (0 to totalPieces) (UPGRADE 3) */
  artifactProgress: number;
  /** Story beat index (UPGRADE 5) */
  storyBeatIndex: number;
  /** Time of day (0=dawn, 0.5=noon, 1=dusk) (UPGRADE 7) */
  timeOfDay: number;
  /** Whether adaptive difficulty has kicked in */
  adaptiveMode: 'normal' | 'easier' | 'harder';
  /** Consecutive fails (for adaptive difficulty) */
  consecutiveFails: number;
  /** Consecutive wins (for adaptive difficulty) */
  consecutiveWins: number;
  /** Whether the game is complete */
  complete: boolean;
}

// ─── Engine Events ────────────────────────────────────────────

export type EngineEventType =
  | 'slide-change'
  | 'challenge-start'
  | 'answer-correct'
  | 'answer-wrong'
  | 'hint-shown'
  | 'artifact-update'
  | 'story-beat-change'
  | 'phase-change'
  | 'game-complete'
  | 'celebration';

export interface EngineEvent {
  type: EngineEventType;
  data?: Record<string, unknown>;
}

export type EngineEventListener = (event: EngineEvent) => void;

// ─── Component Props ──────────────────────────────────────────

export interface GameRendererProps {
  /** Game data to render */
  gameData: GameData;
  /** Called when game is completed */
  onComplete?: (score: number) => void;
  /** Called on every state change */
  onStateChange?: (state: EngineState) => void;
  /** Canvas width */
  width?: number;
  height?: number;
  /** Enable debug overlay */
  debug?: boolean;
}
