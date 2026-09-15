/**
 * Sim Engine — Core Type Definitions
 *
 * The engine supports two categories of interactive content:
 * 1. Educational games (Class 1-5): drag-drop, sort, count, match, patterns
 * 2. Physics simulations (Class 6-12): levers, circuits, optics, chemistry
 *
 * Every scene links to a CISCE enrichment node for content integration.
 */

// ─── Scene Types ──────────────────────────────────────────────

export type SceneCategory = 'game' | 'simulation';

export type InteractionType =
  | 'drag-drop'      // drag objects to targets
  | 'count'          // tap to count
  | 'sort'           // sort into categories
  | 'balance'        // balance scale
  | 'pour'           // liquid between containers
  | 'order'          // arrange in sequence
  | 'pattern'        // complete repeating patterns
  | 'match'          // match pairs
  | 'physics'        // matter.js physics world
  | 'slider'         // variable control with formula
  | 'ray-trace'      // light rays for optics
  | 'tap'            // tap to trigger
  | 'draw'           // draw / trace
  | 'mixed';         // combination of above

export interface SceneConfig {
  /** Unique scene ID, matches CISCE node ID (e.g. "c1_math_001") */
  id: string;
  /** Display title */
  title: string;
  /** CISCE node ID this scene teaches */
  nodeId: string;
  /** Class level (1-12) */
  classLevel: number;
  /** Subject */
  subject: string;
  /** Category: game for young kids, simulation for older */
  category: SceneCategory;
  /** Primary interaction type */
  interaction: InteractionType;
  /** Scene description shown to student */
  description: string;
  /** Goal text shown to student ("Drag 5 apples into the basket") */
  goal: string;
  /** Objects in the scene */
  objects: SceneObject[];
  /** Drop targets / interaction zones */
  targets?: DropTarget[];
  /** Rules that determine completion */
  rules: SceneRule[];
  /** Hints shown when student is stuck */
  hints: string[];
  /** Success message */
  successMessage: string;
  /** Background color or gradient */
  background?: string;
  /** Whether to show a celebration on success */
  celebrateOnSuccess?: boolean;
  /** Difficulty levels (adaptive) */
  difficultyLevels?: DifficultyLevel[];
}

// ─── Object Types ─────────────────────────────────────────────

export type ObjectShape =
  | 'circle'
  | 'rect'
  | 'ellipse'
  | 'path'      // custom SVG path
  | 'image'     // image URL
  | 'text'
  | 'group';    // composite

export interface SceneObject {
  /** Unique object ID within the scene */
  id: string;
  /** Display label */
  label?: string;
  /** Shape type */
  shape: ObjectShape;
  /** SVG path data (for 'path' shape) */
  pathData?: string;
  /** Image URL (for 'image' shape) */
  imageUrl?: string;
  /** Position (in scene coordinates) */
  x: number;
  y: number;
  /** Size */
  width?: number;
  height?: number;
  radius?: number;
  /** Colors */
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  /** Whether object is draggable */
  draggable?: boolean;
  /** Whether object is resizable */
  resizable?: boolean;
  /** Whether object is tappable */
  tappable?: boolean;
  /** Object weight (for balance/physics scenes) */
  weight?: number;
  /** Object value (for counting/math scenes) */
  value?: number;
  /** Category (for sorting scenes) */
  category?: string;
  /** Sound to play on interaction */
  soundOnPickup?: string;
  soundOnDrop?: string;
  soundOnTap?: string;
  /** Visual effects */
  glow?: boolean;
  shadow?: boolean;
  /** Animation properties */
  bounceOnPlace?: boolean;
  sparkleOnPlace?: boolean;
  /** Z-index */
  zIndex?: number;
  /** Custom data for specific interaction types */
  data?: Record<string, unknown>;
}

// ─── Target Types ─────────────────────────────────────────────

export interface DropTarget {
  id: string;
  label?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Shape of the target zone */
  shape?: ObjectShape;
  /** Categories this target accepts (for sorting) */
  acceptsCategories?: string[];
  /** Specific object IDs this target accepts */
  acceptsObjectIds?: string[];
  /** Maximum objects this target can hold */
  maxItems?: number;
  /** Visual feedback when hovering */
  highlightOnHover?: boolean;
  highlightColor?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  /** Sound when correct object dropped */
  soundOnCorrect?: string;
  /** Sound when wrong object dropped */
  soundOnWrong?: string;
}

// ─── Rule Types ───────────────────────────────────────────────

export type RuleType =
  | 'count-equals'       // count of objects in target equals N
  | 'count-greater'      // count > N
  | 'count-less'         // count < N
  | 'all-sorted'         // all objects sorted into correct categories
  | 'all-matched'        // all pairs matched
  | 'balance-equal'      // both sides of balance are equal
  | 'pattern-complete'   // pattern is correctly completed
  | 'order-correct'      // objects in correct order
  | 'custom'             // custom validation function
  | 'physics-state';     // physics world reaches target state

export interface SceneRule {
  type: RuleType;
  /** Target ID this rule applies to */
  targetId?: string;
  /** Expected value */
  expected?: number;
  /** Expected category */
  expectedCategory?: string;
  /** Custom validation (for 'custom' type) */
  validate?: (state: SceneState) => boolean;
  /** Error message when rule not met */
  errorMessage?: string;
}

// ─── Difficulty ───────────────────────────────────────────────

export interface DifficultyLevel {
  name: string;
  description: string;
  /** Modify scene config for this difficulty */
  configure: (config: SceneConfig) => SceneConfig;
}

// ─── Scene State ──────────────────────────────────────────────

export interface SceneState {
  /** Objects and their current positions */
  objects: Record<string, { x: number; y: number; placed: boolean; targetId?: string }>;
  /** Targets and what they contain */
  targets: Record<string, string[]>;
  /** Count per target */
  counts: Record<string, number>;
  /** Whether scene is complete */
  complete: boolean;
  /** Score (0-100) */
  score: number;
  /** Attempts made */
  attempts: number;
  /** Hints used */
  hintsUsed: number;
  /** Time started */
  startTime: number;
  /** Time completed (if complete) */
  endTime?: number;
}

// ─── Feedback Types ───────────────────────────────────────────

export type FeedbackType = 'success' | 'partial' | 'incorrect' | 'hint' | 'celebration';

export interface FeedbackEvent {
  type: FeedbackType;
  message?: string;
  /** Position for visual effect */
  x?: number;
  y?: number;
  /** Sound to play */
  sound?: string;
  /** Duration in ms */
  duration?: number;
}

// ─── Sound Definitions ────────────────────────────────────────

export type SoundEffect =
  | 'pickup'
  | 'drop-correct'
  | 'drop-wrong'
  | 'tap'
  | 'success'
  | 'celebration'
  | 'hint'
  | 'error'
  | 'count'
  | 'balance'
  | 'whoosh'
  | 'sparkle'
  | 'chime'
  | 'pop'
  | 'swoop';

// ─── Component Props ──────────────────────────────────────────

export interface SimRendererProps {
  /** Scene configuration */
  config: SceneConfig;
  /** Called when scene is completed */
  onComplete?: (state: SceneState) => void;
  /** Called on every state change */
  onStateChange?: (state: SceneState) => void;
  /** Called when student requests hint */
  onHint?: (hintIndex: number) => void;
  /** Called on incorrect attempt */
  onError?: (feedback: FeedbackEvent) => void;
  /** Width of the simulation canvas */
  width?: number;
  /** Height of the simulation canvas */
  height?: number;
  /** Whether to show debug info */
  debug?: boolean;
}
