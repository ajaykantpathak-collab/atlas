/**
 * Narrative types — story context for topics
 */

export interface StoryContext {
  /** Topic key (e.g., 'addition', 'fractions', 'mixing') */
  topic: string;
  /** Mascot name for this story */
  mascotName: string;
  /** Mascot emoji */
  mascotEmoji: string;
  /** Story setting name */
  setting: string;
  /** Setting background color (hex) */
  settingBgColor: number;
  /** Setting top gradient color */
  settingTopColor: number;
  /** Setting bottom gradient color */
  settingBottomColor: number;
  /** Story intro spoken by mascot */
  intro: string;
  /** Success message when challenge is completed */
  successMessage: string;
  /** Function to wrap a raw question in narrative framing */
  frameQuestion: (question: string) => string;
  /** Items used in the story (e.g., 'cupcakes', 'mangoes', 'pizzas') */
  itemWord: string;
  /** Item emoji */
  itemEmoji: string;
}
