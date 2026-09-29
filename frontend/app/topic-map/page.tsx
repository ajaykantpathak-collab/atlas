'use client';

/**
 * Topic Map page — student chooses what to learn next.
 *
 * Shows a visual map of topics with prerequisites, mastery levels,
 * and recommendations based on learning analytics.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TopicMapView } from '../../components/progression/TopicMapView';
import Link from 'next/link';

export default function TopicMapPage() {
  const [classLevel, setClassLevel] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gold-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-gold-700">🗺️ Topic Map</h1>
            <p className="text-sm text-gray-500 mt-1">
              Choose what you want to explore next! Master topics to unlock new ones.
            </p>
          </div>
          <Link
            href="/game-test"
            className="px-4 py-2 rounded-xl bg-gold-500 text-white font-bold text-sm hover:bg-gold-600 transition-all"
          >
            ← Back to Games
          </Link>
        </div>

        {/* Class selector */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(cl => (
            <button
              key={cl}
              onClick={() => setClassLevel(cl)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                classLevel === cl
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Class {cl}
            </button>
          ))}
        </div>

        {/* Topic Map */}
        <motion.div
          key={classLevel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TopicMapView
            classLevel={classLevel}
            onSelectTopic={(topic) => {
              // Navigate to game-test for now
              // In the future, this could launch the specific game
              window.location.href = '/game-test';
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
