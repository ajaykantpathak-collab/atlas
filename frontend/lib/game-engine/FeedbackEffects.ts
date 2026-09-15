/**
 * FeedbackEffects — tactile and visual feedback for interactions.
 *
 * - Screen shake on wrong answers
 * - Haptic vibration on touch devices
 * - Snap sounds for drag-and-drop
 * - Success chime for correct answers
 */

/**
 * Trigger haptic feedback (vibration) on supported devices.
 */
export function triggerHaptic(pattern: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning'): void {
  if (typeof window === 'undefined') return;
  if (!('vibrate' in navigator)) return;

  const patterns: Record<string, number | number[]> = {
    light: 10,
    medium: 20,
    heavy: 50,
    success: [10, 30, 10],
    error: [50, 30, 50],
    warning: [30],
  };

  try {
    navigator.vibrate(patterns[pattern]);
  } catch {
    // Vibration not supported — silently ignore
  }
}

/**
 * Trigger a screen shake effect on a DOM element.
 * Uses CSS animation, then cleans up.
 */
export function triggerScreenShake(element: HTMLElement, intensity: 'light' | 'medium' | 'heavy' = 'medium'): void {
  const intensities = {
    light: 3,
    medium: 8,
    heavy: 15,
  };

  const px = intensities[intensity];
  const keyframes = [
    { transform: `translate(0, 0)` },
    { transform: `translate(-${px}px, ${px * 0.5}px)` },
    { transform: `translate(${px}px, -${px * 0.5}px)` },
    { transform: `translate(-${px * 0.5}px, ${px * 0.3}px)` },
    { transform: `translate(${px * 0.5}px, -${px * 0.3}px)` },
    { transform: `translate(0, 0)` },
  ];

  const animation = element.animate(keyframes, {
    duration: 400,
    easing: 'ease-out',
  });

  animation.onfinish = () => {
    element.style.transform = '';
  };
}

/**
 * Play a snap sound using Web Audio API (no file needed).
 */
export function playSnapSound(): void {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
    ctx.close();
  } catch {
    // Audio not supported — silently ignore
  }
}

/**
 * Play a success chime using Web Audio API.
 */
export function playSuccessChime(): void {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Play a pleasant ascending chord
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const startTime = ctx.currentTime + i * 0.08;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });

    // Close context after all notes finish
    setTimeout(() => ctx.close(), 500);
  } catch {
    // Audio not supported — silently ignore
  }
}

/**
 * Play a gentle "pop" sound for picking up objects.
 */
export function playPopSound(): void {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
    ctx.close();
  } catch {
    // Audio not supported — silently ignore
  }
}
