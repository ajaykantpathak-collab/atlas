'use client';

/**
 * LottieCelebration — React component that shows a Lottie confetti animation
 * as an overlay when triggered.
 *
 * Used for correct-answer celebrations, badge unlocks, and game completion.
 */

import { useState, useEffect, useCallback } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LottieCelebrationProps {
  /** Trigger the celebration — change this value to fire */
  trigger: number;
  /** Animation file path */
  src?: string;
  /** Size in pixels */
  size?: number;
  /** Duration in ms before auto-hiding */
  duration?: number;
}

export function LottieCelebration({
  trigger,
  src = '/assets/lottie/confetti.json',
  size = 300,
  duration = 2000,
}: LottieCelebrationProps) {
  const [show, setShow] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);

  // Load animation data once
  useEffect(() => {
    fetch(src)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {});
  }, [src]);

  // Fire on trigger change
  useEffect(() => {
    if (trigger > 0 && animationData) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, animationData, duration]);

  if (!animationData) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <Lottie
            animationData={animationData}
            loop={false}
            style={{ width: size, height: size }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
