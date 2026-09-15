'use client';

/**
 * TopicMapView — visual topic map with prerequisites, status, and recommendations.
 *
 * Students choose what to explore next:
 * - Green = mastered, Yellow = in-progress, Blue = available, Gray = locked, Orange = review due
 * - "Recommended" badge on suggested next topic
 * - Click an available topic to launch its game
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TopicSelector } from '../../lib/game-engine/progression/TopicSelector';
import { LearningAnalytics } from '../../lib/game-engine/analytics/LearningAnalytics';
import type { TopicWithStatus } from '../../lib/game-engine/progression/TopicSelector';

export interface TopicMapViewProps {
  classLevel: number;
  onSelectTopic?: (topic: TopicWithStatus) => void;
}

export function TopicMapView({ classLevel, onSelectTopic }: TopicMapViewProps) {
  const analytics = useMemo(() => {
    const a = new LearningAnalytics();
    a.init('student_001', 'Student', classLevel);
    return a;
  }, [classLevel]);

  const selector = useMemo(() => new TopicSelector(analytics), [analytics]);
  const topics = useMemo(() => selector.getTopicsForClass(classLevel), [selector, classLevel]);
  const recommended = useMemo(() => selector.getRecommendedTopic(classLevel), [selector, classLevel]);

  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredTopics = selectedSubject === 'all'
    ? topics
    : topics.filter(t => t.subject === selectedSubject);

  const subjects = ['all', ...Array.from(new Set(topics.map(t => t.subject)))];

  return (
    <div className="space-y-4">
      {/* Subject filter */}
      <div className="flex gap-2 flex-wrap">
        {subjects.map(subj => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
              selectedSubject === subj
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {subj === 'all' ? '📚 All' : subj === 'maths' ? '🔢 Maths' : '🔬 Science'}
          </button>
        ))}
      </div>

      {/* Recommended banner */}
      {recommended && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <div className="text-sm font-bold">Recommended Next</div>
              <div className="text-lg font-black">
                {recommended.emoji} {recommended.name}
              </div>
              <div className="text-xs opacity-90">
                {recommended.status === 'review_due'
                  ? 'Time to review this topic!'
                  : 'This is a great topic to explore next!'}
              </div>
            </div>
            <button
              onClick={() => onSelectTopic?.(recommended)}
              className="ml-auto px-4 py-2 rounded-lg bg-white text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-all"
            >
              Start →
            </button>
          </div>
        </motion.div>
      )}

      {/* Topic grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredTopics.map((topic, i) => {
          const color = selector.getStatusColor(topic.status);
          const emoji = selector.getStatusEmoji(topic.status);
          const isRecommended = recommended?.id === topic.id;

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`relative rounded-xl p-4 border-2 shadow-sm transition-all cursor-pointer ${
                topic.status === 'locked'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-md hover:scale-105'
              }`}
              style={{ borderColor: color, backgroundColor: `${color}15` }}
              onClick={() => {
                if (topic.status !== 'locked') onSelectTopic?.(topic);
              }}
            >
              {/* Status emoji */}
              <div className="absolute top-2 right-2 text-sm">{emoji}</div>

              {/* Recommended badge */}
              {isRecommended && (
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-indigo-500 text-white text-xs font-bold">
                  ⭐
                </div>
              )}

              {/* Topic emoji */}
              <div className="text-3xl mb-2">{topic.emoji}</div>

              {/* Topic name */}
              <div className="text-sm font-bold text-gray-800">{topic.name}</div>

              {/* Subject */}
              <div className="text-xs text-gray-400 mt-1">
                {topic.subject === 'maths' ? 'Maths' : 'Science'}
              </div>

              {/* Mastery bar */}
              {topic.masteryScore > 0 && (
                <div className="mt-2">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${topic.masteryScore}%`, backgroundColor: color }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{topic.masteryScore}%</div>
                </div>
              )}

              {/* Review due badge */}
              {topic.reviewDue && (
                <div className="mt-2 px-2 py-0.5 rounded bg-orange-100 text-orange-600 text-xs font-bold">
                  🔄 Review Due
                </div>
              )}

              {/* Locked prerequisite hint */}
              {topic.status === 'locked' && topic.prerequisites.length > 0 && (
                <div className="mt-2 text-xs text-gray-400">
                  🔒 Master first: {topic.prerequisites.map(p => p.replace(/c\d_/, '').replace(/_/g, ' ')).join(', ')}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center text-xs text-gray-500 pt-2">
        <span>✅ Mastered</span>
        <span>🔄 Review Due</span>
        <span>⏳ In Progress</span>
        <span>▶️ Available</span>
        <span>🔒 Locked</span>
      </div>
    </div>
  );
}
