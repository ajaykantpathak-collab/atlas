/**
 * NarrativeManager — provides story context for topics.
 *
 * Wraps learning in narrative context:
 * - Mascot character relevant to the topic
 * - Story setting (bakery, lab, farm, etc.)
 * - Story-framed questions
 * - Success messages that reference the story
 *
 * Usage:
 *   const story = NarrativeManager.getStory('addition');
 *   story.intro // "Hi! I'm Bunty the Baker. Help me count my cupcakes!"
 *   story.frameQuestion("What is 3+4?") // wrapped in story
 */

import type { StoryContext } from './types';
import { getStory } from './stories';

export class NarrativeManager {
  /**
   * Get the story context for a topic.
   */
  static getStory(topic: string): StoryContext {
    return getStory(topic);
  }

  /**
   * Get the mascot name for a topic.
   */
  static getMascotName(topic: string): string {
    return getStory(topic).mascotName;
  }

  /**
   * Get the mascot emoji for a topic.
   */
  static getMascotEmoji(topic: string): string {
    return getStory(topic).mascotEmoji;
  }

  /**
   * Get the setting name for a topic.
   */
  static getSetting(topic: string): string {
    return getStory(topic).setting;
  }

  /**
   * Get the intro message for a topic.
   */
  static getIntro(topic: string): string {
    return getStory(topic).intro;
  }

  /**
   * Get the success message for a topic.
   */
  static getSuccessMessage(topic: string): string {
    return getStory(topic).successMessage;
  }

  /**
   * Frame a question in the story context.
   */
  static frameQuestion(topic: string, question: string): string {
    return getStory(topic).frameQuestion(question);
  }

  /**
   * Detect the topic from a question string.
   */
  static detectTopic(question: string, subject: string): string {
    const q = question.toLowerCase();
    if (subject === 'maths') {
      if (q.includes('+') || q.includes('add') || q.includes('more') || q.includes('altogether') || q.includes('sum')) return 'addition';
      if (q.includes('-') || q.includes('subtract') || q.includes('away') || q.includes('left') || q.includes('difference')) return 'subtraction';
      if (q.includes('×') || q.includes('times') || q.includes('groups of') || q.includes('multiply')) return 'multiplication';
      if (q.includes('÷') || q.includes('divided') || q.includes('split') || q.includes('share')) return 'division';
      if (q.includes('fraction') || q.includes('half') || q.includes('quarter') || q.includes('third')) return 'fractions';
      if (q.includes('number line') || q.includes('hop')) return 'number_line';
      if (q.includes('angle') || q.includes('acute') || q.includes('obtuse') || q.includes('right angle')) return 'angles';
      if (q.includes('perimeter')) return 'perimeter';
      if (q.includes('area')) return 'area';
      if (q.includes('percent') || q.includes('%')) return 'percentage';
      if (q.includes('decimal')) return 'decimals';
      if (q.includes('integer') || q.includes('negative') || q.includes('above') && q.includes('below')) return 'integers';
      if (q.includes('prime') || q.includes('composite')) return 'prime_composite';
      if (q.includes('pattern') || q.includes('sequence')) return 'patterns';
      if (q.includes('roman')) return 'roman_numerals';
      if (q.includes('symmetry') || q.includes('symmetrical')) return 'symmetry';
      if (q.includes('3d') || q.includes('cube') || q.includes('sphere') || q.includes('cylinder') || q.includes('cone')) return 'shapes_3d';
    }
    if (subject === 'science') {
      if (q.includes('mixture') || q.includes('solution') || q.includes('suspension') || q.includes('colloid')) return 'mixing';
      if (q.includes('blood') || q.includes('heart') || q.includes('artery') || q.includes('vein') || q.includes('circulat')) return 'circulatory';
      if (q.includes('plant') && (q.includes('grow') || q.includes('seed') || q.includes('germin') || q.includes('photosynth'))) return 'plant_growth';
      if (q.includes('physical change') || q.includes('chemical change')) return 'physical_chemical';
      if (q.includes('earthquake') || q.includes('volcano') || q.includes('flood') || q.includes('disaster')) return 'natural_disaster';
      if (q.includes('air') && (q.includes('composition') || q.includes('nitrogen') || q.includes('oxygen'))) return 'air_composition';
      if (q.includes('biotic') || q.includes('abiotic') || q.includes('renewable') || q.includes('environment')) return 'environment';
      if (q.includes('transport') || q.includes('airway') || q.includes('railway') || q.includes('roadway')) return 'transport';
      if (q.includes('abacus') || q.includes('eniac') || q.includes('computer') || q.includes('calculating')) return 'computer_history';
      if (q.includes('body') && q.includes('part')) return 'body_parts';
    }
    return 'general';
  }
}
