/**
 * BackgroundMusic — gentle ambient music for young learners.
 *
 * Uses Web Audio API to generate simple, calming tones.
 * No audio files needed — all synthesized.
 *
 * Music is optional and can be toggled by the student/parent.
 */

class BackgroundMusicClass {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private gains: GainNode[] = [];
  private intervalId: number | null = null;
  private enabled = false;

  /**
   * Enable/disable background music.
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Start playing gentle ambient music.
   * Uses a simple pentatonic scale to avoid dissonance.
   */
  start(): void {
    if (!this.enabled || this.isPlaying) return;
    if (typeof window === 'undefined') return;

    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isPlaying = true;

      // Pentatonic scale frequencies (C, D, E, G, A) in a gentle octave
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

      // Play a random note every 2-4 seconds
      const playNote = () => {
        if (!this.ctx || !this.isPlaying) return;

        const freq = notes[Math.floor(Math.random() * notes.length)];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Connect
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Gentle sine wave
        osc.type = 'sine';
        osc.frequency.value = freq;

        // Fade in and out
        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
        gain.gain.linearRampToValueAtTime(0, now + 2);

        osc.start(now);
        osc.stop(now + 2);

        // Schedule next note
        const nextDelay = 2000 + Math.random() * 2000;
        this.intervalId = window.setTimeout(playNote, nextDelay);
      };

      playNote();
    } catch {
      // Audio not supported
    }
  }

  /**
   * Stop playing music.
   */
  stop(): void {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    this.oscillators.forEach(o => { try { o.stop(); } catch {} });
    this.oscillators = [];
    this.gains = [];
    if (this.ctx) {
      try { this.ctx.close(); } catch {}
      this.ctx = null;
    }
  }
}

export const BackgroundMusic = new BackgroundMusicClass();
