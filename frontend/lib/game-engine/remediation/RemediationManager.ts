/**
 * RemediationManager — picks alternative explanations for wrong answers.
 *
 * When a student gets something wrong, shows the concept in a DIFFERENT way.
 * PhET principle: multiple representations help students build robust understanding.
 *
 * Selection logic:
 * - Track which modes the student has seen
 * - Show a mode they haven't seen yet
 * - If all modes exhausted, repeat the one that worked best previously
 * - Mascot says: "Let me show you another way to think about this..."
 */

import type { RemediationStrategy, RemediationContext, ExplanationMode } from './types';

export class RemediationManager {
  /**
   * Get the best remediation strategy for a wrong answer.
   */
  static getRemediation(ctx: RemediationContext): RemediationStrategy {
    const availableModes = this.getAvailableModes(ctx.topic, ctx.subject);

    // Filter out modes already shown
    const unseenModes = availableModes.filter(m => !ctx.modesShown.includes(m));

    // Pick the first unseen mode, or cycle back to the first mode
    const mode = unseenModes.length > 0 ? unseenModes[0] : availableModes[0];

    return this.buildStrategy(mode, ctx);
  }

  /**
   * Get available explanation modes for a topic.
   */
  private static getAvailableModes(topic: string, subject: string): ExplanationMode[] {
    const t = topic.toLowerCase();

    if (t === 'addition') return ['visual_objects', 'number_line', 'decomposition', 'real_world'];
    if (t === 'subtraction') return ['visual_objects', 'number_line', 'decomposition', 'real_world'];
    if (t === 'multiplication') return ['visual_objects', 'decomposition', 'real_world', 'step_by_step'];
    if (t === 'division') return ['visual_objects', 'decomposition', 'real_world', 'step_by_step'];
    if (t === 'fractions') return ['pizza_model', 'bar_model', 'number_line', 'set_model'];
    if (t === 'angles') return ['visual_objects', 'analogy', 'step_by_step'];
    if (t === 'perimeter') return ['visual_objects', 'step_by_step', 'real_world'];
    if (t === 'area') return ['visual_objects', 'decomposition', 'step_by_step'];
    if (t === 'percentage') return ['bar_model', 'real_world', 'visual_objects', 'step_by_step'];
    if (t === 'decimals') return ['visual_objects', 'number_line', 'real_world', 'step_by_step'];
    if (t === 'integers') return ['number_line', 'visual_objects', 'real_world', 'analogy'];
    if (t === 'prime_composite') return ['visual_objects', 'decomposition', 'step_by_step', 'analogy'];
    if (t === 'patterns') return ['visual_objects', 'step_by_step', 'analogy'];
    if (t === 'mixing') return ['analogy', 'real_world', 'step_by_step'];
    if (t === 'circulatory') return ['analogy', 'step_by_step', 'visual_objects'];
    if (t === 'plant_growth') return ['real_world', 'analogy', 'step_by_step'];
    if (t === 'physical_chemical') return ['real_world', 'analogy', 'step_by_step'];
    if (t === 'natural_disaster') return ['real_world', 'analogy', 'step_by_step'];
    if (t === 'environment') return ['real_world', 'analogy', 'step_by_step'];
    if (t === 'transport') return ['real_world', 'analogy', 'visual_objects'];
    if (t === 'computer_history') return ['analogy', 'step_by_step', 'real_world'];

    // Default
    return ['visual_objects', 'step_by_step', 'analogy', 'real_world'];
  }

  /**
   * Build a remediation strategy for a specific mode.
   */
  private static buildStrategy(mode: ExplanationMode, ctx: RemediationContext): RemediationStrategy {
    const q = ctx.question.toLowerCase();

    switch (mode) {
      case 'visual_objects':
        return {
          mode,
          spokenText: "Let me show you with real objects. Count along with me!",
          visualText: 'Look at the objects — count them one by one.',
          showAlternativeVisual: true,
          rendererMethod: 'renderInteractiveAddition',
          rendererParams: this.extractOperands(q),
        };

      case 'number_line':
        return {
          mode,
          spokenText: "Let's use a number line. Hop forward to add, hop backward to subtract!",
          visualText: 'Use the number line — hop to find the answer!',
          showAlternativeVisual: true,
          rendererMethod: 'renderNumberLineChallenge',
          rendererParams: this.extractOperands(q),
        };

      case 'decomposition':
        return {
          mode,
          spokenText: "Let me break this into smaller, easier parts!",
          visualText: 'Break the problem into smaller steps.',
          showAlternativeVisual: false,
        };

      case 'real_world':
        return {
          mode,
          spokenText: "Think about this with real money. If you have rupees, how many would you have?",
          visualText: 'Imagine this with real rupees in your hand.',
          showAlternativeVisual: false,
        };

      case 'bar_model':
        return {
          mode,
          spokenText: "Let me show you with a bar model. The bar shows the whole and the parts.",
          visualText: 'Look at the bar — it shows the fraction visually.',
          showAlternativeVisual: true,
          rendererMethod: 'renderFractionBar',
        };

      case 'pizza_model':
        return {
          mode,
          spokenText: "Think of a pizza! Each slice is a fraction of the whole pizza.",
          visualText: 'Look at the pizza — count the slices!',
          showAlternativeVisual: true,
          rendererMethod: 'renderFractionPizza',
        };

      case 'set_model':
        return {
          mode,
          spokenText: "Look at this group of objects. Some are colored — that's the fraction!",
          visualText: 'Count the colored objects out of the total.',
          showAlternativeVisual: true,
          rendererMethod: 'renderFractionSet',
        };

      case 'analogy':
        return {
          mode,
          spokenText: "Let me compare this to something you already know!",
          visualText: 'Think of it like this comparison...',
          showAlternativeVisual: false,
        };

      case 'step_by_step':
        return {
          mode,
          spokenText: "Let me work through this step by step with you!",
          visualText: 'Follow each step carefully.',
          showAlternativeVisual: false,
        };

      default:
        return {
          mode: 'default',
          spokenText: "Try again! You can do it!",
          visualText: 'Give it another try!',
          showAlternativeVisual: false,
        };
    }
  }

  /**
   * Extract numeric operands from a question.
   */
  private static extractOperands(q: string): number[] {
    const matches = q.match(/(\d+)/g);
    if (!matches) return [3, 4];
    return matches.map(Number).filter(n => n > 0 && n < 1000).slice(0, 2);
  }

  /**
   * Get a human-readable label for a mode.
   */
  static getModeLabel(mode: ExplanationMode): string {
    const labels: Record<ExplanationMode, string> = {
      visual_objects: 'Count with objects',
      number_line: 'Number line',
      decomposition: 'Break it down',
      real_world: 'Real-world example',
      bar_model: 'Bar model',
      pizza_model: 'Pizza model',
      set_model: 'Set of objects',
      analogy: 'Comparison',
      step_by_step: 'Step by step',
      default: 'Try again',
    };
    return labels[mode];
  }
}
