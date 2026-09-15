'use client';

/**
 * RiveMascot — React component that renders a Rive animated mascot.
 *
 * Uses @rive-app/react-canvas to load .riv files.
 * Falls back to an emoji if Rive fails to load within 5 seconds.
 *
 * The mascot is positioned as an overlay on top of the PixiJS canvas.
 */

import { useEffect, useRef, useState } from 'react';
import { useRive } from '@rive-app/react-canvas';

export type MascotMood = 'happy' | 'thinking' | 'celebrate' | 'sad';

export interface RiveMascotProps {
  src?: string;
  stateMachine?: string;
  mood?: MascotMood;
  width?: number;
  height?: number;
  className?: string;
}

const DEFAULT_MASCOT = '/rive/dog-mascot.riv';

const MOOD_EMOJI: Record<MascotMood, string> = {
  happy: '🐶',
  thinking: '🤔',
  celebrate: '🎉',
  sad: '😢',
};

export function RiveMascot({
  src = DEFAULT_MASCOT,
  stateMachine,
  mood = 'happy',
  width = 120,
  height = 120,
  className = '',
}: RiveMascotProps) {
  const [timedOut, setTimedOut] = useState(false);

  // Timeout fallback — if Rive doesn't load in 10s, show emoji
  useEffect(() => {
    setTimedOut(false);
    const timer = setTimeout(() => setTimedOut(true), 10000);
    return () => clearTimeout(timer);
  }, [src]);

  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine ? [stateMachine] : undefined,
    autoplay: true,
  });

  // Detect load failure — if rive object exists but is empty
  useEffect(() => {
    if (rive) {
      // Rive loaded successfully — reset timeout
      setTimedOut(false);
    }
  }, [rive]);

  // If Rive timed out, show emoji fallback
  if (timedOut) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full shadow-lg ${className}`}
        style={{ width, height }}
      >
        <span style={{ fontSize: width * 0.5 }}>{MOOD_EMOJI[mood]}</span>
      </div>
    );
  }

  // If Rive is still loading, show a placeholder
  if (!RiveComponent) {
    return (
      <div
        className={`flex items-center justify-center bg-indigo-100 rounded-full animate-pulse ${className}`}
        style={{ width, height }}
      >
        <span style={{ fontSize: width * 0.4 }}>⏳</span>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width, height }}
    >
      <RiveComponent
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

/**
 * Get a themed mascot .riv file based on the game subject/topic.
 */
export function getMascotForSubject(subject: string, topic?: string): string {
  const s = subject.toLowerCase();
  const t = (topic || '').toLowerCase();

  // Science topics → different animals
  if (s.includes('science') || s.includes('evs')) {
    if (t.includes('animal')) return '/rive/dog-mascot.riv';
    if (t.includes('plant')) return '/rive/blop-mascot.riv';
    if (t.includes('body') || t.includes('health')) return '/rive/walking-dog.riv';
    return '/rive/doggy-mascot.riv';
  }

  // Maths → dragon (fun, engaging)
  if (s.includes('math')) return '/rive/atlas-dragon.riv';

  // Default
  return '/rive/dog-mascot.riv';
}
