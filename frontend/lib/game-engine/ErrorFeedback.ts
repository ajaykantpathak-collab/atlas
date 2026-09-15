/**
 * ErrorFeedback — generates specific, actionable feedback for wrong answers.
 *
 * Instead of generic "Try again", it:
 * 1. Detects how close the answer is ("almost right" vs "far off")
 * 2. Provides error-specific visual explanations
 * 3. Suggests a concrete next step
 */

export interface ErrorFeedbackResult {
  /** How close the answer is */
  proximity: 'very_close' | 'close' | 'off' | 'way_off';
  /** Specific feedback message */
  message: string;
  /** Suggested action */
  suggestion: string;
  /** Whether to show a visual comparison */
  showVisualComparison: boolean;
  /** Emoji representing the feedback tone */
  emoji: string;
}

/**
 * Generate specific feedback for a wrong answer.
 */
export function generateErrorFeedback(
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  subject: string,
  topic: string,
): ErrorFeedbackResult {
  // Try to parse as numbers
  const studentNum = parseFloat(studentAnswer);
  const correctNum = parseFloat(correctAnswer);

  if (!isNaN(studentNum) && !isNaN(correctNum)) {
    const diff = Math.abs(studentNum - correctNum);
    const pct = correctNum !== 0 ? (diff / Math.abs(correctNum)) * 100 : diff * 100;

    // Very close (within 1 or within 5%)
    if (diff <= 1 || pct <= 5) {
      return {
        proximity: 'very_close',
        message: `So close! You said ${studentAnswer}, but the answer is ${correctAnswer}. You're just ${diff} away!`,
        suggestion: 'Count one more time carefully. You almost had it!',
        showVisualComparison: true,
        emoji: '😅',
      };
    }

    // Close (within 3 or within 15%)
    if (diff <= 3 || pct <= 15) {
      return {
        proximity: 'close',
        message: `Good try! You said ${studentAnswer}, but the answer is ${correctAnswer}. You're on the right track!`,
        suggestion: 'Try counting the objects again, one by one.',
        showVisualComparison: true,
        emoji: '🤔',
      };
    }

    // Off (within 10 or within 40%)
    if (diff <= 10 || pct <= 40) {
      return {
        proximity: 'off',
        message: `Not quite! You said ${studentAnswer}, but the answer is ${correctAnswer}. Let's think about this differently.`,
        suggestion: 'Look at the picture above and count the objects carefully.',
        showVisualComparison: true,
        emoji: '💡',
      };
    }

    // Way off
    return {
      proximity: 'way_off',
      message: `Let's try again! You said ${studentAnswer}, but the answer is ${correctAnswer}. Don't worry — we'll get there!`,
      suggestion: 'Try the "Show me how" button to see a walkthrough.',
      showVisualComparison: false,
      emoji: '💪',
    };
  }

  // Non-numeric answers — check for partial matches
  const studentLower = studentAnswer.toLowerCase().trim();
  const correctLower = correctAnswer.toLowerCase().trim();

  // Check if answer contains part of the correct answer
  if (correctLower.includes(studentLower) || studentLower.includes(correctLower)) {
    return {
      proximity: 'close',
      message: `You're on the right track! The correct answer is "${correctAnswer}".`,
      suggestion: 'Think about what else might be part of the answer.',
      showVisualComparison: false,
      emoji: '🤔',
    };
  }

  // Check for common mistakes
  if (topic.includes('addition') || topic.includes('add')) {
    return {
      proximity: 'off',
      message: `Let's think about this. Addition means putting things together to find the total.`,
      suggestion: 'Count all the objects in the picture, one by one.',
      showVisualComparison: true,
      emoji: '💡',
    };
  }

  if (topic.includes('subtraction') || topic.includes('subtract')) {
    return {
      proximity: 'off',
      message: `Let's think about this. Subtraction means taking away to find what's left.`,
      suggestion: 'Count the objects that are left after some are taken away.',
      showVisualComparison: true,
      emoji: '💡',
    };
  }

  // Generic fallback
  return {
    proximity: 'off',
    message: `The correct answer is "${correctAnswer}". Let's try the next one!`,
    suggestion: 'Use the hint button if you need help, or try "Show me how".',
    showVisualComparison: false,
    emoji: '💪',
  };
}

/**
 * Get a comparison visual description for the error.
 * This is used by the renderer to show a visual comparison.
 */
export function getComparisonVisual(
  studentAnswer: string,
  correctAnswer: string,
): { studentCount: number; correctCount: number; difference: number } | null {
  const studentNum = parseFloat(studentAnswer);
  const correctNum = parseFloat(correctAnswer);

  if (isNaN(studentNum) || isNaN(correctNum)) return null;

  return {
    studentCount: studentNum,
    correctCount: correctNum,
    difference: Math.abs(studentNum - correctNum),
  };
}
