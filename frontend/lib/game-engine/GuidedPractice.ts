/**
 * GuidedPractice — implements the "I do → We do → You do" pedagogical framework.
 *
 * Phase 1 (I do): Challenges 1-2 — Mascot demonstrates, student watches
 * Phase 2 (We do): Challenges 3-4 — Mascot gives step-by-step guidance
 * Phase 3 (You do): Challenges 5-8 — Student works independently
 *
 * This is the gold standard for struggling learners.
 */

export type PracticePhase = 'i_do' | 'we_do' | 'you_do';

export interface GuidedPracticeState {
  phase: PracticePhase;
  phaseLabel: string;
  phaseEmoji: string;
  phaseDescription: string;
  showWalkthrough: boolean; // Auto-show solution walkthrough
  autoHint: boolean; // Auto-show hints
  hintDelay: number; // Seconds before auto-hint
  encouragement: string; // Phase-specific encouragement
}

/**
 * Get the practice phase for a given challenge index (0-based).
 * With 8 challenges:
 * - 0-1: I do (mascot demonstrates)
 * - 2-3: We do (guided practice)
 * - 4-7: You do (independent practice)
 */
export function getPracticePhase(challengeIndex: number, totalChallenges: number = 8): GuidedPracticeState {
  // Calculate phase boundaries proportionally
  const iDoEnd = Math.max(1, Math.floor(totalChallenges * 0.25));
  const weDoEnd = Math.max(iDoEnd + 1, Math.floor(totalChallenges * 0.5));

  if (challengeIndex < iDoEnd) {
    return {
      phase: 'i_do',
      phaseLabel: 'Watch & Learn',
      phaseEmoji: '👀',
      phaseDescription: 'Watch how I do it! Pay attention to the steps.',
      showWalkthrough: true,
      autoHint: true,
      hintDelay: 3,
      encouragement: "Just watch me do it first! Don't worry about answering yet. 👀",
    };
  }

  if (challengeIndex < weDoEnd) {
    return {
      phase: 'we_do',
      phaseLabel: 'Let\'s Try Together',
      phaseEmoji: '🤝',
      phaseDescription: 'Let\'s do this one together! I\'ll help you step by step.',
      showWalkthrough: false,
      autoHint: true,
      hintDelay: 5,
      encouragement: 'We can do this together! I\'ll give you hints along the way. 🤝',
    };
  }

  return {
    phase: 'you_do',
    phaseLabel: 'Your Turn!',
    phaseEmoji: '🌟',
    phaseDescription: 'Now it\'s your turn! You can do it!',
    showWalkthrough: false,
    autoHint: false,
    hintDelay: 10,
    encouragement: 'You\'ve got this! Try on your own, but I\'m here if you need a hint. 🌟',
  };
}

/**
 * Get a phase-specific hint for a challenge.
 */
export function getPhaseHint(phase: PracticePhase, hint: string): string {
  switch (phase) {
    case 'i_do':
      return `Let me show you: ${hint}`;
    case 'we_do':
      return `Let's think together: ${hint}`;
    case 'you_do':
      return hint;
  }
}

/**
 * Get phase-specific feedback for a correct answer.
 */
export function getPhaseCorrectFeedback(phase: PracticePhase): string {
  switch (phase) {
    case 'i_do':
      return 'Did you see how I did that? Now you try the next one! 👀';
    case 'we_do':
      return 'Great! We did it together! You\'re getting the idea! 🤝';
    case 'you_do':
      return 'Amazing! You did it all by yourself! 🌟';
  }
}

/**
 * Get phase-specific feedback for a wrong answer.
 */
export function getPhaseWrongFeedback(phase: PracticePhase): string {
  switch (phase) {
    case 'i_do':
      return 'Watch carefully — this is how it works. Let me show you again. 👀';
    case 'we_do':
      return 'Not quite! Let\'s figure it out together. Look at the hint! 🤝';
    case 'you_do':
      return 'That\'s okay! Making mistakes helps us learn. Try the hint if you\'re stuck! 💪';
  }
}
