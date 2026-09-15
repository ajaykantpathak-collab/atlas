/**
 * FormativeFeedback — real-time feedback during interaction.
 *
 * Provides continuous feedback WHILE the student is interacting,
 * not just at the end. Keeps students oriented and prevents
 * them from going too far down the wrong path.
 *
 * Examples:
 * - During drag: "You've placed 3. You need 4 more."
 * - During fraction clicking: "You've filled 2 out of 4 slices."
 * - During angle drawing: "You're at 45°. You need 90°."
 *
 * Throttled to not spam (max once per 2 seconds).
 */

// ─── Types ───────────────────────────────────────────────────

export interface FeedbackState {
  /** Current count/progress */
  current: number;
  /** Target count */
  target: number;
  /** Unit word (e.g., "objects", "slices", "degrees") */
  unit: string;
  /** Whether the student has exceeded the target */
  exceeded: boolean;
}

export interface FeedbackMessage {
  /** Spoken text */
  spoken: string;
  /** Visual text to display on canvas */
  visual: string;
  /** Priority: 1=info, 2=warning, 3=success */
  priority: 1 | 2 | 3;
}

// ─── FormativeFeedback ───────────────────────────────────────

export class FormativeFeedback {
  private lastFeedbackTime: number = 0;
  private throttleMs: number = 2000;
  private lastMessage: string = '';

  /**
   * Generate feedback based on current state.
   * Returns null if throttled (too soon since last feedback).
   */
  getFeedback(state: FeedbackState): FeedbackMessage | null {
    const now = Date.now();
    if (now - this.lastFeedbackTime < this.throttleMs) return null;

    const { current, target, unit, exceeded } = state;
    const remaining = target - current;

    let spoken = '';
    let visual = '';
    let priority: 1 | 2 | 3 = 1;

    if (current === 0) {
      spoken = `You need ${target} ${unit}. Let's start!`;
      visual = `0 / ${target}`;
      priority = 1;
    } else if (exceeded) {
      spoken = `That's ${current} — you only need ${target}. Try removing some!`;
      visual = `${current} / ${target} — too many!`;
      priority = 2;
    } else if (remaining === 0) {
      spoken = `Perfect! You've placed all ${target} ${unit}!`;
      visual = `${current} / ${target} ✓`;
      priority = 3;
    } else if (remaining === 1) {
      spoken = `Almost there! Just 1 more!`;
      visual = `${current} / ${target} — 1 more!`;
      priority = 1;
    } else if (remaining <= 3) {
      spoken = `You've placed ${current}. Just ${remaining} more to go!`;
      visual = `${current} / ${target} — ${remaining} left`;
      priority = 1;
    } else {
      spoken = `You've placed ${current} out of ${target} ${unit}.`;
      visual = `${current} / ${target}`;
      priority = 1;
    }

    // Don't repeat the same message
    if (spoken === this.lastMessage) return null;
    this.lastMessage = spoken;
    this.lastFeedbackTime = now;

    return { spoken, visual, priority };
  }

  /**
   * Generate feedback for a fraction interaction.
   */
  getFractionFeedback(numerator: number, denominator: number, targetNum: number, targetDen: number): FeedbackMessage | null {
    const now = Date.now();
    if (now - this.lastFeedbackTime < this.throttleMs) return null;

    let spoken = '';
    let visual = '';
    let priority: 1 | 2 | 3 = 1;

    if (numerator === targetNum && denominator === targetDen) {
      spoken = `Perfect! That's ${targetNum}/${targetDen}!`;
      visual = `${targetNum}/${targetDen} ✓`;
      priority = 3;
    } else if (numerator > targetNum) {
      spoken = `That's ${numerator} out of ${denominator} — too many slices! Remove some.`;
      visual = `${numerator}/${denominator} — too many!`;
      priority = 2;
    } else if (numerator < targetNum) {
      const need = targetNum - numerator;
      spoken = `You've filled ${numerator} out of ${denominator}. Need ${need} more slice${need > 1 ? 's' : ''}!`;
      visual = `${numerator}/${denominator} — ${need} more!`;
      priority = 1;
    }

    if (spoken === this.lastMessage) return null;
    this.lastMessage = spoken;
    this.lastFeedbackTime = now;

    return { spoken, visual, priority };
  }

  /**
   * Generate feedback for an angle drawing interaction.
   */
  getAngleFeedback(currentAngle: number, targetAngle: number): FeedbackMessage | null {
    const now = Date.now();
    if (now - this.lastFeedbackTime < this.throttleMs) return null;

    let spoken = '';
    let visual = '';
    let priority: 1 | 2 | 3 = 1;

    const diff = Math.abs(currentAngle - targetAngle);

    if (diff < 2) {
      spoken = `Perfect! That's ${targetAngle}°!`;
      visual = `${currentAngle}° ✓`;
      priority = 3;
    } else if (diff <= 10) {
      const direction = currentAngle < targetAngle ? 'more' : 'less';
      spoken = `You're at ${currentAngle}°. Just a little ${direction} — target is ${targetAngle}°!`;
      visual = `${currentAngle}° → ${targetAngle}°`;
      priority = 1;
    } else if (currentAngle < targetAngle) {
      spoken = `You're at ${currentAngle}°. Keep going — you need ${targetAngle}°!`;
      visual = `${currentAngle}° / ${targetAngle}°`;
      priority = 1;
    } else {
      spoken = `You're at ${currentAngle}° — that's past ${targetAngle}°. Go back a little!`;
      visual = `${currentAngle}° — too much!`;
      priority = 2;
    }

    if (spoken === this.lastMessage) return null;
    this.lastMessage = spoken;
    this.lastFeedbackTime = now;

    return { spoken, visual, priority };
  }

  /**
   * Generate feedback for a pattern/sequence interaction.
   */
  getPatternFeedback(currentValue: number, expectedValue: number, step: number): FeedbackMessage | null {
    const now = Date.now();
    if (now - this.lastFeedbackTime < this.throttleMs) return null;

    let spoken = '';
    let visual = '';
    let priority: 1 | 2 | 3 = 1;

    if (currentValue === expectedValue) {
      spoken = `Yes! ${currentValue} is correct! What comes next?`;
      visual = `${currentValue} ✓`;
      priority = 3;
    } else {
      spoken = `Not quite — the pattern should give ${expectedValue} here. Look at the pattern again!`;
      visual = `${currentValue} ✗ — expected ${expectedValue}`;
      priority = 2;
    }

    if (spoken === this.lastMessage) return null;
    this.lastMessage = spoken;
    this.lastFeedbackTime = now;

    return { spoken, visual, priority };
  }

  /**
   * Reset the throttle (e.g., when starting a new challenge).
   */
  reset(): void {
    this.lastFeedbackTime = 0;
    this.lastMessage = '';
  }

  /**
   * Set the throttle duration.
   */
  setThrottle(ms: number): void {
    this.throttleMs = ms;
  }
}
