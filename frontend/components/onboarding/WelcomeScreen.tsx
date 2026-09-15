'use client';

/**
 * WelcomeScreen — onboarding screen for young students.
 *
 * Shows a friendly mascot greeting, name input, and class selection.
 * Replaces the developer-style /game-test page as the entry point.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiveMascot } from '../mascots/RiveMascot';

export interface WelcomeScreenProps {
  onStart: (studentName: string, classLevel: number) => void;
}

const CLASS_OPTIONS = [
  { level: 1, label: 'Class 1', emoji: '🌱', color: 'from-green-400 to-emerald-500' },
  { level: 2, label: 'Class 2', emoji: '🌿', color: 'from-teal-400 to-cyan-500' },
  { level: 3, label: 'Class 3', emoji: '🌳', color: 'from-blue-400 to-indigo-500' },
  { level: 4, label: 'Class 4', emoji: '🌟', color: 'from-purple-400 to-pink-500' },
  { level: 5, label: 'Class 5', emoji: '🚀', color: 'from-orange-400 to-red-500' },
];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [step, setStep] = useState<'greeting' | 'name' | 'class'>('greeting');
  const [studentName, setStudentName] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100 p-4">
      <AnimatePresence mode="wait">
        {/* Step 1: Greeting */}
        {step === 'greeting' && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6"
            >
              <RiveMascot src="/rive/dog-mascot.riv" mood="happy" width={160} height={160} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-indigo-600 mb-3"
            >
              Welcome to Atlas!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 mb-8"
            >
              Hi there! I'm Hooty the Owl. I'm so happy you're here! Let's learn together and have fun! 🎉
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('name')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Let's Go! 🚀
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Name input */}
        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            <div className="mb-6">
              <RiveMascot src="/rive/dog-mascot.riv" mood="thinking" width={120} height={120} />
            </div>

            <h2 className="text-2xl font-black text-indigo-600 mb-2">
              What's your name?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              I want to know who I'm learning with today!
            </p>

            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && studentName.trim()) setStep('class');
              }}
              placeholder="Type your name here..."
              autoFocus
              maxLength={20}
              className="w-64 px-4 py-3 rounded-2xl border-2 border-indigo-200 text-center text-lg font-semibold text-indigo-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-6"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setStep('greeting')}
                className="px-6 py-3 rounded-2xl bg-gray-200 text-gray-600 font-bold hover:bg-gray-300 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => studentName.trim() && setStep('class')}
                disabled={!studentName.trim()}
                className={`px-8 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${
                  studentName.trim()
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Next! →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Class selection */}
        {step === 'class' && (
          <motion.div
            key="class"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center text-center max-w-lg w-full"
          >
            <div className="mb-4">
              <RiveMascot src="/rive/dog-mascot.riv" mood="celebrate" width={100} height={100} />
            </div>

            <h2 className="text-2xl font-black text-indigo-600 mb-1">
              Hi {studentName}! 👋
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Which class are you in? Pick your class to start learning!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
              {CLASS_OPTIONS.map((cls) => (
                <motion.button
                  key={cls.level}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onStart(studentName, cls.level)}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${cls.color} text-white font-bold shadow-lg hover:shadow-xl transition-all`}
                >
                  <span className="text-3xl">{cls.emoji}</span>
                  <span className="text-lg">{cls.label}</span>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setStep('name')}
              className="px-6 py-2 rounded-2xl bg-gray-200 text-gray-600 font-bold hover:bg-gray-300 transition-all text-sm"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
