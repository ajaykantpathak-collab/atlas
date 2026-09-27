/**
 * ChallengeExpander — expands 8 challenges to 24 with progressive variation.
 *
 * Takes the original 8 challenges and generates additional variants:
 * - Challenges 1-8: Original (I do → We do → You do)
 * - Challenges 9-16: Same concepts with different numbers/objects
 * - Challenges 17-24: Harder variants (larger numbers, word problems)
 *
 * This ensures students get enough practice to master each concept.
 */

import type { Challenge } from './types';

/**
 * Expand an array of challenges to 24 by generating variations.
 * If the original has 8, we triple it with number/object variations.
 */
export function expandChallenges(original: Challenge[], subject: string): Challenge[] {
  if (original.length >= 20) return original; // Already enough

  const expanded: Challenge[] = [...original];

  // Generate round 2: same concepts, different numbers
  for (const ch of original) {
    const variant = generateVariant(ch, 'medium');
    if (variant) expanded.push(variant);
  }

  // Generate round 3: harder variants
  for (const ch of original) {
    const variant = generateVariant(ch, 'hard');
    if (variant) expanded.push(variant);
  }

  return expanded.slice(0, 24); // Cap at 24
}

/**
 * Generate a variant of a challenge with different numbers/objects.
 */
function generateVariant(ch: Challenge, difficulty: 'medium' | 'hard'): Challenge | null {
  // Try to extract numbers from the question and answer
  const numbers = ch.question.match(/\d+/g)?.map(Number) || [];
  const answerNum = parseFloat(ch.answer);

  if (numbers.length === 0 || isNaN(answerNum)) {
    // Non-numeric challenge — swap objects
    return swapObjects(ch, difficulty);
  }

  // Generate new numbers based on difficulty
  const multiplier = difficulty === 'medium' ? 1.5 : 2.5;
  const newNumbers = numbers.map(n => Math.round(n * multiplier + Math.random() * 3));
  const newAnswer = Math.round(answerNum * multiplier + Math.random() * 3).toString();

  // Replace numbers in question
  let newQuestion = ch.question;
  numbers.forEach((n, i) => {
    if (i < newNumbers.length) {
      newQuestion = newQuestion.replace(n.toString(), newNumbers[i].toString());
    }
  });

  // Generate new options
  const newOptions = generateOptions(parseInt(newAnswer), difficulty);

  return {
    ...ch,
    question: newQuestion,
    answer: newAnswer,
    options: newOptions,
    hint: ch.hint, // Keep same hint
    misconception: ch.misconception,
    easierVariant: undefined,
    harderVariant: undefined,
  };
}

/**
 * Swap objects in non-numeric challenges.
 */
function swapObjects(ch: Challenge, difficulty: 'medium' | 'hard'): Challenge | null {
  const objectSwaps: Record<string, string> = {
    'apple': 'orange',
    'mango': 'banana',
    'ball': 'star',
    'flower': 'leaf',
    'cat': 'dog',
    'dog': 'rabbit',
    'bird': 'fish',
    'tree': 'plant',
  };

  let newQuestion = ch.question;
  for (const [from, to] of Object.entries(objectSwaps)) {
    newQuestion = newQuestion.replace(new RegExp(from, 'gi'), to);
  }

  return {
    ...ch,
    question: newQuestion,
  };
}

/**
 * Generate plausible wrong-answer options.
 */
function generateOptions(correct: number, difficulty: 'medium' | 'hard'): string[] {
  const range = difficulty === 'medium' ? 5 : 10;
  const options = new Set<string>([correct.toString()]);

  // Bounded attempts: for negative `correct` answers (e.g. Integers games) the
  // `wrong > 0` guard can be unsatisfiable, and this loop then spins forever —
  // freezing the whole tab with no console error. Cap the random phase, then
  // pad deterministically so a challenge always renders with 3 options.
  let attempts = 0;
  while (options.size < 3 && attempts < 100) {
    attempts++;
    const offset = Math.floor(Math.random() * range) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const wrong = correct + sign * offset;
    if (wrong > 0) {
      options.add(wrong.toString());
    }
  }

  // Fallback for negative/zero answers: nearby distractors on the same side
  // of zero as `correct` (wrong>0 distractors are meaningless for them).
  let pad = 1;
  while (options.size < 3) {
    const candidate = correct > 0 ? correct + range + pad : correct - range - pad;
    options.add(candidate.toString());
    pad++;
  }

  // Shuffle
  return Array.from(options).sort(() => Math.random() - 0.5);
}
