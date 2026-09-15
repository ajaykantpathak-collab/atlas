/**
 * Audio Manager — Sound effects for the sim engine
 *
 * Uses Howler.js for reliable cross-browser audio.
 * Sounds are generated procedurally (Web Audio API) to avoid
 * needing audio file assets — zero download, instant playback.
 */

import { Howl } from 'howler';
import type { SoundEffect } from './types';

// ─── Procedural Sound Generation ──────────────────────────────
//
// Instead of shipping audio files, we generate sounds procedurally
// using the Web Audio API. This gives us:
// - Zero asset downloads
// - Instant playback
// - Tiny bundle size
// - Consistent quality

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctor) {
      audioCtx = new Ctor();
    }
  }
  return audioCtx;
}

/** Play a simple tone with envelope */
function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3,
  delay: number = 0
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  // Attack-decay envelope
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

/** Play a frequency sweep (for whoosh/sparkle effects) */
function playSweep(
  startFreq: number,
  endFreq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.2
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

/** Play a chord (multiple tones simultaneously) */
function playChord(freqs: number[], duration: number, type: OscillatorType = 'sine', volume: number = 0.15): void {
  freqs.forEach(f => playTone(f, duration, type, volume));
}

// ─── Sound Effect Definitions ─────────────────────────────────

const soundEffects: Record<SoundEffect, () => void> = {
  pickup: () => {
    // Light, quick upward pop
    playSweep(300, 500, 0.08, 'sine', 0.15);
  },

  'drop-correct': () => {
    // Satisfying "plonk" — two quick tones
    playTone(523, 0.1, 'sine', 0.2);       // C5
    playTone(659, 0.12, 'sine', 0.15, 0.05); // E5
  },

  'drop-wrong': () => {
    // Soft, gentle "try again" — not harsh
    playTone(200, 0.15, 'sine', 0.12);
    playTone(180, 0.2, 'sine', 0.1, 0.08);
  },

  tap: () => {
    // Quick click
    playTone(800, 0.04, 'square', 0.08);
  },

  success: () => {
    // Happy ascending arpeggio
    playTone(523, 0.15, 'sine', 0.2);        // C5
    playTone(659, 0.15, 'sine', 0.2, 0.1);   // E5
    playTone(784, 0.15, 'sine', 0.2, 0.2);   // G5
    playTone(1047, 0.3, 'sine', 0.25, 0.3);  // C6
  },

  celebration: () => {
    // Big celebration — fanfare + sparkle
    playChord([523, 659, 784], 0.3, 'sine', 0.12);  // C major
    playTone(1047, 0.4, 'sine', 0.2, 0.15);          // C6
    playTone(1319, 0.4, 'sine', 0.15, 0.2);          // E6
    playSweep(2000, 4000, 0.3, 'sine', 0.08);        // sparkle sweep
  },

  hint: () => {
    // Gentle, encouraging "ding"
    playTone(880, 0.15, 'sine', 0.15);     // A5
    playTone(1109, 0.2, 'sine', 0.1, 0.1); // C#6
  },

  error: () => {
    // Soft, non-threatening error
    playTone(220, 0.2, 'sine', 0.1);
    playTone(196, 0.25, 'sine', 0.08, 0.1);
  },

  count: () => {
    // Short ascending tick per count
    playTone(600 + Math.random() * 100, 0.05, 'sine', 0.1);
  },

  balance: () => {
    // Deep, satisfying "thunk" when balance achieved
    playTone(150, 0.3, 'sine', 0.2);
    playTone(200, 0.4, 'sine', 0.15, 0.05);
  },

  whoosh: () => {
    // Air movement
    playSweep(100, 800, 0.3, 'sine', 0.1);
  },

  sparkle: () => {
    // High sparkle
    playSweep(3000, 6000, 0.15, 'sine', 0.06);
  },

  chime: () => {
    // Bell-like chime
    playTone(880, 0.5, 'sine', 0.15);
    playTone(1760, 0.3, 'sine', 0.08, 0.02);
  },

  pop: () => {
    // Cartoon pop
    playSweep(400, 100, 0.06, 'sine', 0.15);
  },

  swoop: () => {
    // Descending swoop
    playSweep(800, 200, 0.2, 'sine', 0.1);
  },
};

// ─── Audio Manager ────────────────────────────────────────────

class AudioManager {
  private enabled: boolean = true;
  private volume: number = 0.5;
  private unlocked: boolean = false;

  /** Enable/disable all sound */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /** Set master volume (0-1) */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /** Unlock audio context (required by browsers — must be triggered by user interaction) */
  unlock(): void {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        this.unlocked = true;
      }).catch(() => {});
    }
    // Set unlocked immediately even if resume is async — the next play will work
    this.unlocked = true;
  }

  /** Play a sound effect — auto-unlocks on first call from user gesture */
  play(effect: SoundEffect): void {
    if (!this.enabled) return;

    // Auto-unlock: if not unlocked yet, try to unlock now.
    // This works because play() is always called from a user interaction handler.
    if (!this.unlocked) {
      this.unlock();
    }

    const ctx = getAudioContext();
    if (!ctx) return;
    // If context is still suspended, try resuming again
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const fn = soundEffects[effect];
    if (fn) fn();
  }

  /** Check if audio is available */
  isAvailable(): boolean {
    return getAudioContext() !== null;
  }
}

// Singleton instance
export const audioManager = new AudioManager();

// Export for testing
export { soundEffects };
