'use client';

/**
 * LoadingScreen — shown while game assets are loading.
 * Features a Rive mascot animation and progress bar.
 */

import { motion } from 'framer-motion';
import { RiveMascot } from '../mascots/RiveMascot';

export interface LoadingScreenProps {
  visible: boolean;
  progress?: number; // 0-100
  message?: string;
}

export function LoadingScreen({
  visible,
  progress = 0,
  message = 'Getting your game ready...',
}: LoadingScreenProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 to-purple-100"
    >
      {/* Mascot animation */}
      <div className="mb-6">
        <RiveMascot
          src="/rive/dog-mascot.riv"
          mood="happy"
          width={140}
          height={140}
        />
      </div>

      {/* Message */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-lg font-bold text-indigo-600 mb-4"
      >
        {message}
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-3 bg-indigo-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          animate={{ width: `${Math.max(10, progress)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Progress percentage */}
      <p className="text-sm text-indigo-400 mt-2 font-semibold">
        {Math.round(progress)}%
      </p>

      {/* Fun facts while loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center max-w-xs"
      >
        <p className="text-xs text-gray-500">
          💡 Did you know? Practicing a little every day makes your brain stronger!
        </p>
      </motion.div>
    </motion.div>
  );
}
