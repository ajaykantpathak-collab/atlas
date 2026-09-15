'use client';

/**
 * AtlasPuppy — The student's personal companion
 *
 * The puppy is the Atlas mascot across ALL classes (1-12).
 * - Class 1-5: Kids see a cute puppy they named themselves
 * - Class 6-12: Students see a loyal study companion that's been with them
 *
 * The name is stored in localStorage so it persists across sessions.
 * On first visit, the student is prompted to name their puppy.
 *
 * Animations (from .riv file):
 * - idle: breathing + ear twitch + head bob
 * - celebrate: big bounce + happy head shake
 * - thinking: head tilt (when showing hints)
 *
 * Generated programmatically with @stevysmith/rive-generator.
 */

import { useRive } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PUPPY_NAME_KEY = 'atlas-puppy-name';

export interface AtlasPuppyProps {
  /** Which animation to play */
  mood?: 'idle' | 'celebrate' | 'thinking';
  /** Size in pixels (the puppy fills this space) */
  size?: number;
  /** Speech bubble text (shown above puppy) */
  speaking?: string | null;
  /** Called when the rive file loads */
  onLoad?: () => void;
  /** Override the stored name (for testing) */
  testName?: string;
}

export function AtlasPuppy({ mood = 'idle', size = 120, speaking = null, onLoad, testName }: AtlasPuppyProps) {
  const { RiveComponent } = useRive({
    src: '/rive/atlas-puppy.riv',
    autoplay: true,
    animations: mood,
    onLoad: () => onLoad?.(),
  });

  const [puppyName, setPuppyName] = useState<string | null>(testName ?? null);
  const [showNamingPrompt, setShowNamingPrompt] = useState(false);
  const [inputName, setInputName] = useState('');

  // Load name from localStorage on mount
  useEffect(() => {
    if (testName) {
      setPuppyName(testName);
      return;
    }
    const stored = typeof window !== 'undefined' ? localStorage.getItem(PUPPY_NAME_KEY) : null;
    if (stored) {
      setPuppyName(stored);
    } else {
      setShowNamingPrompt(true);
    }
  }, [testName]);

  const handleNameSubmit = () => {
    const name = inputName.trim();
    if (!name) return;
    setPuppyName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem(PUPPY_NAME_KEY, name);
    }
    setShowNamingPrompt(false);
  };

  return (
    <div className="flex flex-col items-center pointer-events-auto">
      {/* Speech bubble */}
      <AnimatePresence>
        {speaking && puppyName && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-2 shadow-lg max-w-[220px] relative"
          >
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
            <p className="text-sm font-semibold text-gray-800 text-center">
              <span className="text-blue-600">{puppyName}</span>: {speaking}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The puppy */}
      <div style={{ width: size, height: size }} className="relative">
        <RiveComponent style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Name tag below puppy */}
      {puppyName && !showNamingPrompt && (
        <div className="mt-1 px-3 py-0.5 bg-blue-500/20 rounded-full">
          <span className="text-xs font-bold text-blue-300">{puppyName}</span>
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
              className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-8 max-w-md shadow-2xl text-center"
            >
              {/* Puppy preview */}
              <div className="flex justify-center mb-4">
                <div style={{ width: 100, height: 100 }}>
                  <RiveComponent style={{ width: '100%', height: '100%' }} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Meet your study buddy!
              </h2>
              <p className="text-gray-600 mb-6">
                This puppy will be with you on your learning journey —
                from Class 1 all the way to Class 12. Give your puppy a name!
              </p>

              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder="Type a name..."
                maxLength={20}
                autoFocus
                className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 focus:border-orange-500 focus:outline-none text-lg text-center font-semibold text-gray-800 bg-white"
              />

              <button
                onClick={handleNameSubmit}
                disabled={!inputName.trim()}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                That's my puppy's name!
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
