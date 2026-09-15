'use client';

/**
 * SheruMascot — Animated tiger cub mascot rendered from a .riv file
 *
 * Sheru is the Atlas mascot — a baby tiger cub that grows as the
 * student learns more. Three animations:
 * - idle: gentle breathing + tail sway
 * - celebrate: bounce + head shake (on correct answer / challenge complete)
 * - thinking: head tilt (when showing a hint)
 *
 * Generated programmatically with @stevysmith/rive-generator.
 */

import { useRive } from '@rive-app/react-canvas';

export interface SheruMascotProps {
  /** Which animation to play */
  mood?: 'idle' | 'celebrate' | 'thinking';
  /** Size in pixels */
  size?: number;
  /** Called when the rive file loads */
  onLoad?: () => void;
  /** Speech bubble text (shown above Sheru) */
  speaking?: string | null;
}

export function SheruMascot({ mood = 'idle', size = 80, onLoad, speaking = null }: SheruMascotProps) {
  const { RiveComponent } = useRive({
    src: '/rive/sheru-tiger-cub.riv',
    autoplay: true,
    animations: mood,
    onLoad: () => {
      onLoad?.();
    },
  });

  return (
    <div className="flex flex-col items-center pointer-events-none">
      {speaking && (
        <div className="mb-1 bg-white rounded-xl px-3 py-1.5 shadow-lg max-w-[200px]">
          <p className="text-sm font-bold text-gray-800 text-center">{speaking}</p>
        </div>
      )}
      <div style={{ width: size, height: size * (120 / 140) }}>
        <RiveComponent style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
