'use client';

/**
 * VoiceInput — lightweight speech-to-math wrapper.
 *
 * Uses the Web Speech API (SpeechRecognition) where available and maps
 * common spoken-math phrases to LaTeX tokens via VOICE_MATH_MAP.  When the
 * Web Speech API is unavailable the component degrades gracefully and
 * reports unsupported status through the `onUnsupported` callback.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';

// Shared phrase map (kept in sync with the inline map in MathInput.tsx)
const VOICE_MATH_MAP: [string, string][] = [
  ['to the power of', '^{#}'],
  ['to the power',     '^{#}'],
  ['raised to',        '^{#}'],
  ['square root of',   '\\sqrt{#}'],
  ['cube root of',     '\\sqrt[3]{#}'],
  ['square root',      '\\sqrt{#}'],
  ['fraction',         '\\frac{#}{#0}'],
  ['over',             '\\frac{#}{#0}'],
  ['divided by',       '\\frac{#}{#0}'],
  ['plus',             '+'],
  ['minus',            '-'],
  ['times',            '\\times'],
  ['multiplied by',    '\\times'],
  ['equals',           '='],
  ['less than or equal to', '\\leq'],
  ['greater than or equal to', '\\geq'],
  ['less than',        '<'],
  ['greater than',     '>'],
  ['pi',               '\\pi'],
  ['theta',            '\\theta'],
  ['alpha',            '\\alpha'],
  ['beta',             '\\beta'],
  ['gamma',            '\\gamma'],
  ['delta',            '\\delta'],
  ['infinity',         '\\infty'],
  ['integral',         '\\int'],
  ['derivative',       '\\frac{d}{dx}'],
  ['sum of',           '\\sum'],
  ['log of',           '\\log'],
  ['ln of',            '\\ln'],
  ['sin',              '\\sin'],
  ['cos',              '\\cos'],
  ['tan',              '\\tan'],
];

interface VoiceInputProps {
  /** Called with the recognised LaTeX-ready transcript. */
  onTranscript?: (latex: string) => void;
  /** Called when the user starts/stops listening. */
  onListeningChange?: (listening: boolean) => void;
  /** Called once if the Web Speech API is not available. */
  onUnsupported?: () => void;
  disabled?: boolean;
  className?: string;
}

// Minimal typing for the vendor-prefixed Web Speech API
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

function applyMathMap(text: string): string {
  let out = text;
  for (const [phrase, latex] of VOICE_MATH_MAP) {
    out = out.split(phrase).join(latex);
  }
  return out;
}

export default function VoiceInput({
  onTranscript,
  onListeningChange,
  onUnsupported,
  disabled = false,
  className = '',
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setSupported(false);
      onUnsupported?.();
      return;
    }
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? '';
      if (transcript) {
        const latex = applyMathMap(transcript);
        onTranscript?.(latex);
      }
    };
    rec.onerror = () => {
      setIsListening(false);
      onListeningChange?.(false);
    };
    rec.onend = () => {
      setIsListening(false);
      onListeningChange?.(false);
    };
    recognitionRef.current = rec;
    return () => {
      try { rec.abort(); } catch { /* ignore */ }
    };
  }, [onTranscript, onListeningChange, onUnsupported]);

  const toggle = useCallback(() => {
    if (disabled || !supported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      onListeningChange?.(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        onListeningChange?.(true);
      } catch { /* already started */ }
    }
  }, [disabled, supported, isListening, onListeningChange]);

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-500 bg-slate-800/40 cursor-not-allowed ${className}`}
        title="Voice input not supported in this browser"
      >
        <MicOff className="w-4 h-4" />
        <span>Voice unavailable</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        isListening
          ? 'bg-red-500/20 text-red-300 ring-1 ring-red-400/40'
          : 'bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      aria-pressed={isListening}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
    >
      {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      <span>{isListening ? 'Stop' : 'Speak'}</span>
    </button>
  );
}
