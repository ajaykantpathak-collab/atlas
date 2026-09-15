/**
 * Speech Manager — Natural text-to-speech via cloud TTS proxy
 *
 * Uses Google Translate TTS (free, natural voices) via our /api/tts proxy.
 * Falls back to Web Speech API if the cloud service is unavailable.
 *
 * The audio is cached both server-side (in the API route) and client-side
 * (in-memory Map) to minimize repeated requests.
 */

// ─── Number names ─────────────────────────────────────────────

const NUMBER_NAMES_EN: Record<number, string> = {
  0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
  6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
  11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
  16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
};

const NUMBER_NAMES_HI: Record<number, string> = {
  0: 'शून्य', 1: 'एक', 2: 'दो', 3: 'तीन', 4: 'चार', 5: 'पाँच',
  6: 'छह', 7: 'सात', 8: 'आठ', 9: 'नौ', 10: 'दस',
  11: 'ग्यारह', 12: 'बारह', 13: 'तेरह', 14: 'चौदह', 15: 'पंद्रह',
  16: 'सोलह', 17: 'सत्रह', 18: 'अठारह', 19: 'उन्नीस', 20: 'बीस',
};

const ENCOURAGEMENT_EN = [
  'Great job!', 'Well done!', 'Perfect!', 'You got it!', 'Keep going!',
  'Excellent!', 'Fantastic!', 'Wonderful!', 'Amazing!', 'You are so smart!',
];

// ─── Speech Manager ───────────────────────────────────────────

class SpeechManager {
  private enabled = true;
  private lang: 'en' | 'hi' = 'en';
  private unlocked = false;
  private audioCache = new Map<string, string>(); // text -> object URL
  private currentAudio: HTMLAudioElement | null = null;
  private fallbackToWebSpeech = false;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setLang(lang: 'en' | 'hi') {
    this.lang = lang;
    // Clear cache when language changes
    this.clearCache();
  }

  unlock() {
    this.unlocked = true;
  }

  private clearCache() {
    this.audioCache.forEach(url => URL.revokeObjectURL(url));
    this.audioCache.clear();
  }

  /** Speak a number by its value (1 → "one", 2 → "two", etc.) */
  speakNumber(n: number) {
    if (!this.enabled) return;
    if (!this.unlocked) this.unlock();
    const names = this.lang === 'hi' ? NUMBER_NAMES_HI : NUMBER_NAMES_EN;
    const name = names[n];
    if (name) this.speak(name);
  }

  /** Speak arbitrary text using cloud TTS (natural voice) */
  async speak(text: string) {
    if (!this.enabled) return;
    if (!this.unlocked) this.unlock();
    if (typeof window === 'undefined') return;

    // Stop any currently playing audio
    this.stop();

    // If we've already fallen back to Web Speech, use it directly
    if (this.fallbackToWebSpeech) {
      this.speakWebSpeech(text);
      return;
    }

    try {
      // Check cache first
      let audioUrl = this.audioCache.get(text);

      if (!audioUrl) {
        // Fetch from our TTS proxy
        const response = await fetch(`/api/tts?text=${encodeURIComponent(text)}&lang=${this.lang}`);

        if (!response.ok) {
          // Fall back to Web Speech API
          this.fallbackToWebSpeech = true;
          this.speakWebSpeech(text);
          return;
        }

        const blob = await response.blob();
        audioUrl = URL.createObjectURL(blob);
        this.audioCache.set(text, audioUrl);
      }

      // Play the audio
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      await audio.play().catch(() => {
        // Autoplay blocked — fall back to Web Speech
        this.fallbackToWebSpeech = true;
        this.speakWebSpeech(text);
      });
    } catch {
      // Network error — fall back to Web Speech
      this.fallbackToWebSpeech = true;
      this.speakWebSpeech(text);
    }
  }

  /** Web Speech API fallback (robotic but always available) */
  private speakWebSpeech(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.15;
    utterance.volume = 0.9;

    // Try to find a non-robotic voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const langPrefix = this.lang === 'hi' ? 'hi' : 'en';
      const langVoices = voices.filter(v => v.lang.startsWith(langPrefix));
      // Prefer Zira over David (slightly less robotic)
      const preferred = langVoices.find(v => v.name.includes('Zira'))
        || langVoices.find(v => v.name.includes('Female') || v.name.includes('female'))
        || langVoices[0];
      if (preferred) utterance.voice = preferred;
    }

    window.speechSynthesis.speak(utterance);
  }

  /** Stop any currently playing speech */
  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /** Speak a random encouragement phrase */
  encourage() {
    const phrases = this.lang === 'hi' ? ['बहुत अच्छे!'] : ENCOURAGEMENT_EN;
    this.speak(phrases[Math.floor(Math.random() * phrases.length)]);
  }

  /** Get the written number name (for display) */
  getNumberName(n: number): string {
    const names = this.lang === 'hi' ? NUMBER_NAMES_HI : NUMBER_NAMES_EN;
    return names[n] || String(n);
  }

  isAvailable(): boolean {
    return typeof window !== 'undefined';
  }
}

export const speechManager = new SpeechManager();
