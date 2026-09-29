'use client';

/**
 * AtlasDragon — The student's personal companion
 *
 * The dragon is the Atlas mascot across ALL classes (1-12).
 * - Class 1-5: Kids see a cute dragon they named themselves
 * - Class 6-12: Students see a wise study companion that grows with them
 *
 * The name is stored in localStorage so it persists across sessions.
 * On first visit, the student is prompted to name their dragon.
 *
 * Rive asset: "Jellybean The Dragon" by alexsmithdesigns.uk
 * License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 *
 * Animations from .riv file:
 * - Floating: gentle hover (idle state)
 * - Sat: sitting pose (thinking state)
 *
 * State machine: "State Machine 1" (auto-plays, no inputs)
 */

import { useRive } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DRAGON_NAME_KEY = 'atlas-dragon-name';

export interface AtlasDragonProps {
  /** Which animation to play */
  mood?: 'idle' | 'thinking' | 'celebrate';
  /** Size in pixels (the dragon fills this space) */
  size?: number;
  /** Speech bubble text (shown above dragon) */
  speaking?: string | null;
  /** Called when the rive file loads */
  onLoad?: () => void;
  /** Override the stored name (for testing) */
  testName?: string;
}

export function AtlasDragon({ mood = 'idle', size = 160, speaking = null, onLoad, testName }: AtlasDragonProps) {
  // Map mood to animation name
  const animationName = mood === 'thinking' ? 'Sat' : 'Floating';

  const { RiveComponent } = useRive({
    src: '/rive/atlas-dragon.riv',
    autoplay: true,
    onLoad: () => onLoad?.(),
  });

  const [dragonName, setDragonName] = useState<string | null>(testName ?? null);
  const [showNamingPrompt, setShowNamingPrompt] = useState(false);
  const [inputName, setInputName] = useState('');

  // Load name from localStorage on mount
  useEffect(() => {
    if (testName) {
      setDragonName(testName);
      return;
    }
    const stored = typeof window !== 'undefined' ? localStorage.getItem(DRAGON_NAME_KEY) : null;
    if (stored) {
      setDragonName(stored);
    } else {
      setShowNamingPrompt(true);
    }
  }, [testName]);

  const handleNameSubmit = () => {
    const name = inputName.trim();
    if (!name) return;
    setDragonName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DRAGON_NAME_KEY, name);
    }
    setShowNamingPrompt(false);
  };

  return (
    <div className="flex flex-col items-center pointer-events-auto">
      {/* Speech bubble */}
      <AnimatePresence>
        {speaking && dragonName && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-2 shadow-lg max-w-[220px] relative"
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
            <p className="text-sm font-semibold text-gray-800 text-center">
              <span className="text-gold-600">{dragonName}</span>: {speaking}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The dragon */}
      <motion.div
        animate={
          mood === 'celebrate'
            ? { y: [0, -15, 0], rotate: [0, -3, 3, -2, 0] }
            : mood === 'thinking'
            ? { rotate: [0, 5, 5, 0] }
            : { y: [0, -5, 0] }
        }
        transition={
          mood === 'celebrate'
            ? { duration: 0.6, repeat: Infinity }
            : mood === 'thinking'
            ? { duration: 2.5, repeat: Infinity, repeatType: 'reverse' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ width: size, height: size }}
        className="relative"
      >
        <RiveComponent style={{ width: '100%', height: '100%' }} />
      </motion.div>

      {/* Name tag below dragon */}
      {dragonName && !showNamingPrompt && (
        <div className="mt-1 px-3 py-0.5 bg-gold-500/20 rounded-full">
          <span className="text-xs font-bold text-gold-300">{dragonName}</span>
        </div>
      )}

      {/* Naming prompt — shown on first visit */}
      <AnimatePresence>
        {showNamingPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-br from-gold-50 to-purple-100 rounded-3xl p-8 max-w-md shadow-2xl text-center"
            >
              {/* Dragon preview */}
              <div className="flex justify-center mb-4">
                <div style={{ width: 120, height: 120 }}>
                  <RiveComponent style={{ width: '100%', height: '100%' }} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Meet your study companion!
              </h2>
              <p className="text-gray-600 mb-6">
                This dragon will be with you on your learning journey —
                from Class 1 all the way to Class 12. Give your dragon a name!
              </p>

              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder="Type a name..."
                maxLength={20}
                autoFocus
                className="w-full px-4 py-3 rounded-xl border-2 border-gold-300 focus:border-gold-500 focus:outline-none text-lg text-center font-semibold text-gray-800 bg-white"
              />

              <button
                onClick={handleNameSubmit}
                disabled={!inputName.trim()}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-gold-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                That's my dragon's name!
              </button>

              <p className="text-xs text-gray-400 mt-4">
                You can change the name later in settings
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
