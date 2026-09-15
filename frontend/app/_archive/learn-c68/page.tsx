'use client';

/**
 * LearnC68Page — The main Class 6-8 learning interface.
 *
 * Flow:
 * 1. Student selects a class (6, 7, 8)
 * 2. Student selects a subject (physics, chemistry, biology, maths, geography, CS, history/civics)
 * 3. Student sees a list of topics (enrichment nodes) for that class/subject
 * 4. Student selects a topic → the correct simulation template is rendered
 *    with the real enrichment data (definition, ELI5, misconceptions, challenges)
 * 5. Student can go back to the topic list to pick another topic
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimulationRenderer from '../../components/simulations/c6_8/SimulationRenderer';
import type { SimulationProps } from '../../components/simulations/c6_8/SimulationRenderer';
import {
  inferTemplateType,
  getTemplateInfo,
  type SimulationTemplateType,
} from '../../lib/c68/SimulationRegistry';
import type { EnrichmentNode } from '../../lib/game-engine/EnrichmentParser';
import { enrichNodeToSimProps } from '../../lib/c68/SimulationPropsMapper';

// ─── Subject list ────────────────────────────────────────────

const SUBJECTS = [
  { id: 'physics', name: 'Physics', icon: '⚡', color: '#2196f3', gradient: 'from-blue-500 to-blue-700' },
  { id: 'chem', name: 'Chemistry', icon: '🧪', color: '#9c27b0', gradient: 'from-purple-500 to-purple-700' },
  { id: 'bio', name: 'Biology', icon: '🧬', color: '#4caf50', gradient: 'from-green-500 to-green-700' },
  { id: 'maths', name: 'Mathematics', icon: '📐', color: '#ff9800', gradient: 'from-orange-500 to-orange-700' },
  { id: 'geo', name: 'Geography', icon: '🌍', color: '#009688', gradient: 'from-teal-500 to-teal-700' },
  { id: 'cs', name: 'Computer Science', icon: '💻', color: '#607d8b', gradient: 'from-slate-500 to-slate-700' },
  { id: 'histciv', name: 'History & Civics', icon: '📜', color: '#795548', gradient: 'from-amber-700 to-amber-900' },
];

// ─── Types ───────────────────────────────────────────────────

interface NodeSummary {
  nodeId: string;
  title: string;
  subject: string;
  classLevel: number;
  cognitiveLevel: string;
  masteryCriteria: string;
}

// ─── Main component ──────────────────────────────────────────

export default function LearnC68Page() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [nodes, setNodes] = useState<NodeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Node detail state
  const [selectedNodeFull, setSelectedNodeFull] = useState<EnrichmentNode | null>(null);
  const [simProps, setSimProps] = useState<SimulationProps | null>(null);
  const [templateType, setTemplateType] = useState<SimulationTemplateType | null>(null);
  const [loadingNode, setLoadingNode] = useState(false);

  // ─── Load nodes when class + subject selected ──────────────

  useEffect(() => {
    if (!selectedClass || !selectedSubject) {
      setNodes([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/c68/nodes?class=${selectedClass}&subject=${selectedSubject}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const summaries: NodeSummary[] = (data.nodes || []).map((n: EnrichmentNode) => ({
          nodeId: n.nodeId,
          title: n.title,
          subject: n.subject,
          classLevel: n.classLevel,
          cognitiveLevel: n.cognitiveLevel,
          masteryCriteria: n.masteryCriteria,
        }));
        setNodes(summaries);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setNodes([]);
      });
  }, [selectedClass, selectedSubject]);

  // ─── Load full node details when a node is selected ────────

  const selectNode = useCallback((nodeId: string) => {
    setLoadingNode(true);
    setError(null);

    fetch(`/api/c68/nodes?nodeId=${nodeId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!data.node) throw new Error('Node not found');
        const node = data.node as EnrichmentNode;
        const props = enrichNodeToSimProps(node);
        setSelectedNodeFull(node);
        setSimProps(props);
        setTemplateType(props.templateType);
        setLoadingNode(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingNode(false);
      });
  }, []);

  const goBackToNodeList = useCallback(() => {
    setSelectedNodeFull(null);
    setSimProps(null);
    setTemplateType(null);
  }, []);

  const goBackToSubjectList = useCallback(() => {
    setSelectedSubject(null);
    setNodes([]);
    setSelectedNodeFull(null);
    setSimProps(null);
    setTemplateType(null);
  }, []);

  const goBackToClassList = useCallback(() => {
    setSelectedClass(null);
    setSelectedSubject(null);
    setNodes([]);
    setSelectedNodeFull(null);
    setSimProps(null);
    setTemplateType(null);
  }, []);

  // ─── Render: Node detail (simulation view) ─────────────────

  if (simProps && templateType) {
    const templateInfo = getTemplateInfo(templateType);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb / back button */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={goBackToNodeList}
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-sm font-semibold"
            >
              ← Back to Topics
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Class {selectedClass}</span>
              <span>›</span>
              <span>{SUBJECTS.find((s) => s.id === selectedSubject)?.name}</span>
              <span>›</span>
              <span className="text-slate-700 font-semibold">{simProps.title}</span>
            </div>
          </div>

          {/* Template badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: templateInfo.color }}
            >
              {templateInfo.icon} {templateInfo.name}
            </span>
          </div>

          {/* Simulation */}
          {loadingNode ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-500">Loading simulation...</div>
            </div>
          ) : (
            <SimulationRenderer
              templateType={templateType}
              nodeId={simProps.nodeId}
              title={simProps.title}
              definition={simProps.definition}
              eli5={simProps.eli5}
              misconceptions={simProps.misconceptions}
              diagnosticQuestions={simProps.diagnosticQuestions}
              masteryCriteria={simProps.masteryCriteria}
              onComplete={(score) => {
                // Could save score to backend in the future
                console.log(`[LearnC68] Node ${simProps.nodeId} completed with score: ${score}`);
              }}
            />
          )}
        </div>
      </div>
    );
  }

  // ─── Render: Node list (topic selection) ───────────────────

  if (selectedClass && selectedSubject && !selectedNodeFull) {
    const subjectInfo = SUBJECTS.find((s) => s.id === selectedSubject);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={goBackToSubjectList}
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-sm font-semibold"
            >
              ← Back to Subjects
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{subjectInfo?.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Class {selectedClass} {subjectInfo?.name}
              </h1>
              <p className="text-sm text-slate-500">
                Choose a topic to start learning
              </p>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center h-40 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-500">Loading topics...</div>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
              Error loading topics: {error}
            </div>
          )}

          {/* Node list */}
          {!loading && !error && (
            <div className="grid gap-3">
              {nodes.map((node, idx) => {
                const template = inferTemplateType({
                  nodeId: node.nodeId,
                  title: node.title,
                  subject: node.subject,
                  classLevel: node.classLevel,
                  cognitiveLevel: node.cognitiveLevel,
                } as EnrichmentNode);
                const tplInfo = getTemplateInfo(template);
                return (
                  <motion.button
                    key={node.nodeId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => selectNode(node.nodeId)}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left group"
                  >
                    {/* Template icon */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${tplInfo.color}20` }}
                    >
                      {tplInfo.icon}
                    </div>

                    {/* Node info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-400">
                          {node.nodeId}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white font-semibold"
                          style={{ backgroundColor: tplInfo.color }}
                        >
                          {tplInfo.name}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {node.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {node.masteryCriteria?.substring(0, 120)}
                        {node.masteryCriteria && node.masteryCriteria.length > 120 ? '...' : ''}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 text-slate-300 group-hover:text-blue-500 transition-colors">
                      →
                    </div>
                  </motion.button>
                );
              })}

              {nodes.length === 0 && !loading && !error && (
                <div className="p-8 bg-white rounded-xl border border-slate-200 text-center text-slate-500">
                  No topics found for Class {selectedClass} {subjectInfo?.name}.
                </div>
              )}
            </div>
          )}

          {/* Node count */}
          {!loading && nodes.length > 0 && (
            <div className="mt-4 text-center text-xs text-slate-400">
              {nodes.length} topics available
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Render: Subject selection ─────────────────────────────

  if (selectedClass && !selectedSubject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={goBackToClassList}
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all text-sm font-semibold"
            >
              ← Back to Class Selection
            </button>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Class {selectedClass} — Choose a Subject
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Pick a subject to see the available topics
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUBJECTS.map((subject, idx) => (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedSubject(subject.id)}
                className={`p-6 rounded-xl bg-gradient-to-br ${subject.gradient} text-white text-left hover:scale-105 transition-transform shadow-lg`}
              >
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="text-lg font-bold mb-1">{subject.name}</h3>
                <p className="text-xs text-white/80">
                  Tap to see Class {selectedClass} topics
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Class selection (initial screen) ──────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-3"
          >
            Atlas Learning
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80"
          >
            Class 6-8 Interactive Science & Maths
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/60 mt-2"
          >
            CISCE-aligned simulations with real enrichment content
          </motion.p>
        </div>

        {/* Class selection cards */}
        <div className="grid grid-cols-3 gap-6">
          {[6, 7, 8].map((cls, idx) => (
            <motion.button
              key={cls}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              onClick={() => setSelectedClass(cls)}
              className="p-8 bg-white/95 rounded-2xl shadow-xl hover:scale-105 transition-transform"
            >
              <div className="text-5xl font-bold text-slate-800 mb-2">{cls}</div>
              <div className="text-sm text-slate-500">Class {cls}</div>
            </motion.button>
          ))}
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center text-white/50 text-xs"
        >
          741 topics across 7 subjects · 25 simulation templates
        </motion.div>
      </div>
    </div>
  );
}
