/**
 * ErrorClassifier — classifies student errors into types.
 *
 * Types:
 * - procedural: student used the wrong operation/method
 * - conceptual: student doesn't understand the concept
 * - careless: right method but wrong arithmetic
 * - none: no error (correct answer)
 *
 * Also identifies specific misconceptions based on the question
 * and answer patterns.
 */

import type { ErrorClassification, ErrorType } from './types';

export class ErrorClassifier {
  /**
   * Classify an error based on the question, student answer, and correct answer.
   */
  static classify(
    question: string,
    studentAnswer: string,
    correctAnswer: string,
    subject: string,
  ): ErrorClassification {
    const q = question.toLowerCase();
    const sAns = studentAnswer.trim();
    const cAns = correctAnswer.trim();

    // ─── Math error classification ──────────────────────

    if (subject === 'maths') {
      // Check if it's an arithmetic error (careless)
      const sNum = parseInt(sAns);
      const cNum = parseInt(cAns);
      if (!isNaN(sNum) && !isNaN(cNum)) {
        const diff = Math.abs(sNum - cNum);
        if (diff === 1) {
          return {
            type: 'careless',
            misconception: 'off_by_one',
            explanation: 'So close! You are off by just 1. Double-check your counting.',
          };
        }
        if (diff <= 2) {
          return {
            type: 'careless',
            misconception: 'small_arithmetic_error',
            explanation: 'Almost right! Check your addition or subtraction carefully.',
          };
        }
      }

      // Check for operation confusion (procedural)
      if (q.includes('+') || q.includes('add') || q.includes('more') || q.includes('altogether')) {
        // Addition question — check if they subtracted
        if (!isNaN(sNum) && !isNaN(cNum) && sNum < cNum) {
          const operands = this.extractOperands(q);
          if (operands.length === 2) {
            const diff = operands[0] - operands[1];
            if (sNum === diff) {
              return {
                type: 'procedural',
                misconception: 'subtracted_instead_of_added',
                explanation: 'You subtracted instead of adding. The question asks to add!',
              };
            }
          }
        }
      }

      if (q.includes('-') || q.includes('subtract') || q.includes('away') || q.includes('left')) {
        // Subtraction question — check if they added
        if (!isNaN(sNum) && !isNaN(cNum) && sNum > cNum) {
          const operands = this.extractOperands(q);
          if (operands.length === 2) {
            const sum = operands[0] + operands[1];
            if (sNum === sum) {
              return {
                type: 'procedural',
                misconception: 'added_instead_of_subtracted',
                explanation: 'You added instead of subtracting. The question asks to take away!',
              };
            }
          }
        }
      }

      // Fraction errors (conceptual)
      if (q.includes('fraction') || q.includes('half') || q.includes('quarter') || q.includes('third')) {
        if (sAns !== cAns) {
          // Check for numerator/denominator confusion
          if (sAns.includes('/') && cAns.includes('/')) {
            const [sNum2, sDen] = sAns.split('/').map(Number);
            const [cNum2, cDen] = cAns.split('/').map(Number);
            if (sNum2 === cDen && sDen === cNum2) {
              return {
                type: 'conceptual',
                misconception: 'numerator_denominator_swapped',
                explanation: 'You swapped the top and bottom numbers. The top is how many parts you have, the bottom is how many total parts.',
              };
            }
          }
          return {
            type: 'conceptual',
            misconception: 'fraction_misunderstanding',
            explanation: 'Fractions can be tricky. Let me show you another way to think about it.',
          };
        }
      }

      // Angle type confusion (conceptual)
      if (q.includes('angle') || q.includes('acute') || q.includes('obtuse') || q.includes('right angle')) {
        if (sAns !== cAns) {
          if ((sAns.toLowerCase().includes('acute') && cAns.toLowerCase().includes('obtuse')) ||
              (sAns.toLowerCase().includes('obtuse') && cAns.toLowerCase().includes('acute'))) {
            return {
              type: 'conceptual',
              misconception: 'acute_obtuse_confusion',
              explanation: 'Acute angles are smaller than 90°. Obtuse angles are between 90° and 180°.',
            };
          }
          return {
            type: 'conceptual',
            misconception: 'angle_type_confusion',
            explanation: 'Let me show you the different types of angles again.',
          };
        }
      }

      // Prime/composite confusion
      if (q.includes('prime') || q.includes('composite')) {
        if (sAns !== cAns) {
          return {
            type: 'conceptual',
            misconception: 'prime_composite_confusion',
            explanation: 'Prime numbers have only 2 factors: 1 and themselves. Composite numbers have more.',
          };
        }
      }

      // Generic large arithmetic error
      if (!isNaN(sNum) && !isNaN(cNum) && Math.abs(sNum - cNum) > 2) {
        return {
          type: 'conceptual',
          misconception: 'large_arithmetic_error',
          explanation: 'Let me break this down into smaller steps for you.',
        };
      }
    }

    // ─── Science error classification ───────────────────

    if (subject === 'science') {
      // Check for common science misconceptions
      if (q.includes('physical change') || q.includes('chemical change')) {
        if (sAns !== cAns) {
          return {
            type: 'conceptual',
            misconception: 'physical_chemical_confusion',
            explanation: 'Physical changes are reversible (like melting ice). Chemical changes make new substances (like burning paper).',
          };
        }
      }

      if (q.includes('mixture') || q.includes('solution') || q.includes('suspension') || q.includes('colloid')) {
        if (sAns !== cAns) {
          return {
            type: 'conceptual',
            misconception: 'mixture_type_confusion',
            explanation: 'Solutions are clear, suspensions settle, colloids stay cloudy.',
          };
        }
      }

      if (q.includes('biotic') || q.includes('abiotic')) {
        if (sAns !== cAns) {
          return {
            type: 'conceptual',
            misconception: 'biotic_abiotic_confusion',
            explanation: 'Biotic = living things. Abiotic = non-living things.',
          };
        }
      }

      if (q.includes('renewable') || q.includes('non-renewable')) {
        if (sAns !== cAns) {
          return {
            type: 'conceptual',
            misconception: 'renewable_confusion',
            explanation: 'Renewable resources can be replaced. Non-renewable resources run out.',
          };
        }
      }

      // Generic science error
      if (sAns !== cAns) {
        return {
          type: 'conceptual',
          misconception: 'science_concept_error',
          explanation: 'Let me explain this concept in a different way.',
        };
      }
    }

    // ─── Default: unknown error ─────────────────────────

    return {
      type: 'careless',
      misconception: 'general_error',
      explanation: 'Try again! You can do it!',
    };
  }

  /**
   * Extract numeric operands from a question string.
   */
  private static extractOperands(q: string): number[] {
    const matches = q.match(/(\d+)/g);
    if (!matches) return [];
    return matches.map(Number).filter(n => n > 0 && n < 1000);
  }

  /**
   * Get the error type as a human-readable label.
   */
  static errorTypeLabel(type: ErrorType): string {
    switch (type) {
      case 'procedural': return 'Method';
      case 'conceptual': return 'Concept';
      case 'careless': return 'Careful!';
      case 'none': return 'Correct';
    }
  }
}
