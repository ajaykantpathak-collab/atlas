'use client';

/**
 * RiveOwlMascot — Animated owl mascot rendered from a .riv file
 *
 * Uses @rive-app/react-canvas to render the programmatically
 * generated owl-mascot.riv file with idle and celebrate animations.
 */

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export interface RiveOwlMascotProps {
  /** Which animation to play */
  mood?: 'idle' | 'celebrate' | 'thinking';
  /** Size in pixels */
  size?: number;
  /** Called when the rive file loads */
  onLoad?: () => void;
}

export function RiveOwlMascot({ mood = 'idle', size = 60, onLoad }: RiveOwlMascotProps) {
  const { rive, RiveComponent } = useRive({
    src: '/rive/owl-mascot.riv',
    autoplay: true,
    animations: mood === 'celebrate' ? 'celebrate' : 'idle',
    onLoad: () => {
      onLoad?.();
    },
  });

  return (
    <div style={{ width: size, height: size }} className="pointer-events-none">
      <RiveComponent style={{ width: size, height: size }} />
    </div>
  );
}
