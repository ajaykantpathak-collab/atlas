'use client';

/**
 * InteractiveNumberLine — A number line students can click to hop along.
 *
 * Features:
 * - Click any number to hop there (animated)
 * - Speaks each number as you hop ("1... 2... 3...")
 * - Shows a character hopping along the line
 * - Highlights the answer when revealed
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speechManager } from '../../lib/sim-engine/speech';

interface InteractiveNumberLineProps {
  max: number;
  start?: number;
  answer: number;
  showCorrect: boolean;
  onHop?: (position: number) => void;
}

export function InteractiveNumberLine({ max, start = 0, answer, showCorrect, onHop }: InteractiveNumberLineProps) {
  const [position, setPosition] = useState(start);
  const [hopping, setHopping] = useState(false);
  const numbers = Array.from({ length: max + 1 }, (_, i) => i);

  const hopTo = (n: number) => {
    if (hopping) return;
    setHopping(true);
    const direction = n > position ? 1 : -1;
    let current = position;

    const hopStep = () => {
      current += direction;
      setPosition(current);
      speechManager.speak(String(current));
      onHop?.(current);

      if (current !== n) {
        setTimeout(hopStep, 400);
      } else {
        setHopping(false);
      }
    };

    hopStep();
  };

  // Auto-hop to answer when showCorrect is triggered
  useEffect(() => {
    if (showCorrect && position !== answer) {
      hopTo(answer);
    }
  }, [showCorrect]);

  return (
    <div className="mt-3 select-none">
      <div className="text-center text-xs font-bold text-gold-600 mb-2">
        {hopping ? `Hopping... ${position}` : '👆 Click a number to hop there!'}
      </div>
      <div className="flex items-end justify-center">
        {numbers.map((n, i) => (
          <div key={n} className="flex flex-col items-center relative">
            {/* Hopper character above the current position */}
            {position === n && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: [-10, -20, -10], opacity: 1 }}
                transition={{ y: { repeat: Infinity, duration: 0.6 }, opacity: { duration: 0.2 } }}
                className="absolute -top-8 text-2xl"
              >
                🐸
              </motion.div>
            )}
            <button
              onClick={() => hopTo(n)}
              disabled={hopping}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                showCorrect && n === answer
                  ? 'bg-green-500 text-white border-green-600 scale-125 shadow-lg'
                  : n === position
                  ? 'bg-gold-500 text-white border-gold-600 scale-110'
                  : n === start
                  ? 'bg-gold-200 text-gold-700 border-gold-400'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gold-50 hover:border-gold-300'
              }`}
            >
              {n}
            </button>
            {i < max && <div className="w-3 h-1 bg-gray-300 -mt-4 z-[-1]" />}
          </div>
        ))}
      </div>
    </div>
  );
}
