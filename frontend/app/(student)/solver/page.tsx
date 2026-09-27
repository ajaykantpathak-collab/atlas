"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { LazyBlockMath as BlockMath } from "@/components/solver/LazyMath";
import "katex/dist/katex.min.css";

// Lazy-load MathInput (heavy: pulls in mathlive ~5.5MB)
const MathInput = dynamic(() => import("@/components/solver/MathInput"), {
  ssr: false,
  loading: () => (
    <div className="h-12 rounded-xl glass-card animate-pulse flex items-center justify-center text-sm text-surface-600">
      Loading math keyboard...
    </div>
  ),
});
import { solveProblem, type SolverResponse, type SolverVisual, type SolveRequest } from "./solver/api";
import { useMasteryStore } from "./solver/masteryStore";
import { FrameRenderer, type Frame, type FrameType } from "@/components/renderers";

// ────────────────────────────────────────
// Types
// ────────────────────────────────────────
interface Step {
  step_number: number;
  title: string;
  explanation: string;
  math_expression?: string;
  hint?: string;
  is_key_step?: boolean;
  visual?: SolverVisual;
}

interface ThinkingQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  concept_tag: string;
}

// ────────────────────────────────────────
// Constants
// ────────────────────────────────────────
const PROBLEM_CATEGORIES: { category: string; label: string; icon: string; types: string[] }[] = [
  {
    category: "calculus",
    label: "Calculus",
    icon: "∫",
    types: ["Derivative", "Integration", "Limits", "Maxima & Minima"],
  },
  {
    category: "algebra",
    label: "Algebra",
    icon: "𝑥",
    types: ["Quadratic Equations", "Polynomials", "Matrices", "Sequences & Series"],
  },
  {
    category: "trigonometry",
    label: "Trigo",
    icon: "△",
    types: ["Trigonometric Ratios", "Identities", "Inverse Trig", "Solutions of Triangles"],
  },
  {
    category: "coordinate",
    label: "Coordinate",
    icon: "📐",
    types: ["Straight Lines", "Conic Sections", "Distance Formula", "Section Formula"],
  },
  {
    category: "statistics",
    label: "Statistics",
    icon: "📊",
    types: ["Mean/Median/Mode", "Standard Deviation", "Correlation", "Regression"],
  },
  {
    category: "probability",
    label: "Probability",
    icon: "🎲",
    types: ["Basic Probability", "Bayes Theorem", "Random Variables", "Distributions"],
  },
];

const SAMPLE_PROBLEMS: Record<string, string[]> = {
  Derivative: ["x*sin(x)", "x^2 * e^x", "ln(x) * x^3", "sin(x)/cos(x)", "sqrt(x) * ln(x)"],
  Integration: ["x^2", "e^x * sin(x)", "1/(x^2+1)", "x*ln(x)", "sec^2(x)"],
  Limits: ["(sin(x))/x as x→0", "(x^2-4)/(x-2) as x→2", "(1-cos(x))/x^2 as x→0"],
  "Quadratic Equations": ["x^2 - 5x + 6 = 0", "2x^2 + 3x - 5 = 0", "x^2 + 1 = 0"],
  "Maxima & Minima": ["x^3 - 3x^2 + 2", "x^4 - 4x^3 + 8x", "sin(x) + cos(x)"],
};

const THINKING_QUESTIONS: Record<string, ThinkingQuestion[]> = {
  Derivative: [
    {
      id: "d1",
      question: "Aapko x·sin(x) ka derivative lena hai. Pehle aap sochte — isme ek product hai. Product rule ka pehla step kya hai?",
      options: [
        "Pehle function ka derivative, phir doosre ka",
        "(Pehla ka derivative)×(Doosra) + (Pehla)×(Doosra ka derivative)",
        "Dono functions ko alag alag differentiate karo aur add karo",
        "F(-1) rule use karo",
      ],
      correct_index: 1,
      explanation: "Sahi! Product rule ka formula hai: d(uv)/dx = u·(dv/dx) + v·(du/dx)",
      concept_tag: "Product Rule",
    },
    {
      id: "d2",
      question: "x·sin(x) mein, 'u' aur 'v' kya honge product rule ke liye?",
      options: ["u=x², v=sin(x)", "u=x, v=sin(x)", "u=1, v=x·sin(x)", "u=sin(x), v=x²"],
      correct_index: 1,
      explanation: "Bilkul sahi! u = x aur v = sin(x). Ab har ek ka derivative nikalenge.",
      concept_tag: "Product Rule",
    },
    {
      id: "d3",
      question: "d/dx[sin(x)] kya aayega?",
      options: ["cos(x)", "-cos(x)", "sin(x)", "tan(x)"],
      correct_index: 0,
      explanation: "Perfect! sin(x) ka derivative cos(x) hai. Ye formula yaad rakhna zaroori hai.",
      concept_tag: "Basic Derivatives",
    },
  ],
  default: [
    {
      id: "gen1",
      question: "Is problem ko solve karne se pehle — aapko lagta hai kaun sa formula ya concept use hoga?",
      options: ["Differentiation", "Integration", "Algebra", "Trigonometry"],
      correct_index: -1,
      explanation: "Chalo dekhte hain kaunsa concept sahi hai!",
      concept_tag: "Problem Analysis",
    },
  ],
};

// ────────────────────────────────────────
// Animations
// ────────────────────────────────────────
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideUp = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring", damping: 24, stiffness: 200 },
};

const stepReveal = {
  initial: { opacity: 0, x: -20, height: 0 },
  animate: { opacity: 1, x: 0, height: "auto" },
  exit: { opacity: 0, x: 20, height: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ────────────────────────────────────────
// Loading Animation Component
// ────────────────────────────────────────
function SolvingAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 gap-4"
      {...slideUp}
    >
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-3 border-indigo-500/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-pink-500/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          >
            ∫
          </motion.span>
        </div>
      </div>
      <motion.p
        className="text-sm text-gray-400 font-body"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Solving step by step...
      </motion.p>
      <motion.p
        className="text-xs text-gray-500 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Pehle concept samjho, phir formula apply karo
      </motion.p>
    </motion.div>
  );
}

// ────────────────────────────────────────
// Problem Type Grid Component
// ────────────────────────────────────────
function ProblemTypeGrid({ onSelect, selectedType }: { onSelect: (type: string) => void; selectedType?: string }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return PROBLEM_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return PROBLEM_CATEGORIES
      .map((cat) => ({
        ...cat,
        types: cat.types.filter((t) => t.toLowerCase().includes(q) || cat.label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.types.length > 0);
  }, [searchQuery]);

  return (
    <div className="w-full">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search problem type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all font-body"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredCategories.map((cat) => (
          <motion.div
            key={cat.category}
            className="glass-card rounded-2xl overflow-hidden"
            layout
          >
            <button
              onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
              className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors"
            >
              <span className="text-2xl w-8 h-8 flex items-center justify-center bg-indigo-500/10 rounded-lg">
                {cat.icon}
              </span>
              <div className="text-left flex-1">
                <span className="text-sm font-semibold text-white font-body">{cat.label}</span>
                <span className="block text-xs text-gray-500 font-body">{cat.types.length} problem types</span>
              </div>
              <motion.span
                animate={{ rotate: expandedCategory === cat.category ? 180 : 0 }}
                className="text-gray-500 text-xs"
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {expandedCategory === cat.category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 space-y-1.5">
                    {cat.types.map((type) => (
                      <motion.button
                        key={type}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onSelect(type)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-body transition-all ${
                          selectedType === type
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 border border-transparent"
                        }`}
                      >
                        {selectedType === type && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                        )}
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Thinking Question Component
// ────────────────────────────────────────
function ThinkingQuestionBlock({
  question,
  onAnswered,
  onSkip,
}: {
  question: ThinkingQuestion;
  onAnswered: (correct: boolean) => void;
  onSkip: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    const correct = index === question.correct_index;
    setTimeout(() => onAnswered(correct), correct ? 1200 : 2000);
  };

  return (
    <motion.div
      className="w-full"
      {...slideUp}
    >
      <div className="glass-strong rounded-2xl p-5 border border-amber-500/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💡</span>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider font-body">Pehle Socho</span>
          <span className="text-xs text-gray-500 ml-auto font-body">ISC Class 11</span>
        </div>

        <p className="text-white text-sm leading-relaxed mb-1 font-body">
          {question.question}
        </p>

        <p className="text-xs text-indigo-400 mb-4 font-body">Concept: {question.concept_tag}</p>

        <div className="space-y-2">
          {question.options.map((option, i) => {
            let btnClass = "bg-white/5 border-white/10 text-gray-300";
            if (showResult) {
              if (i === question.correct_index) {
                btnClass = "bg-emerald-500/20 border-emerald-500/40 text-emerald-300";
              } else if (i === selected && i !== question.correct_index) {
                btnClass = "bg-red-500/20 border-red-500/40 text-red-300";
              } else {
                btnClass = "bg-white/3 border-white/5 text-gray-500 opacity-60";
              }
            }

            return (
              <motion.button
                key={i}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
                onClick={() => handleSelect(i)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-body transition-all flex items-center gap-3 ${btnClass}`}
              >
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs shrink-0 ${
                    showResult && i === question.correct_index
                      ? "border-emerald-500 bg-emerald-500/20"
                      : showResult && i === selected
                      ? "border-red-500 bg-red-500/20"
                      : "border-gray-600"
                  }`}
                >
                  {showResult && i === question.correct_index ? "✓" : String.fromCharCode(65 + i)}
                </span>
                {option}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20"
            >
              <p className="text-xs text-indigo-300 font-body">{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onSkip}
          className="mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors font-body"
        >
          Skip & directly solve →
        </button>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────
// Step Visual Renderer — converts solver visual payload to Frame
// ────────────────────────────────────────
function visualToFrame(visual: SolverVisual, stepNumber: number): Frame | null {
  if (!visual || !visual.type) return null
  const knownTypes: FrameType[] = [
    'ray_diagram', 'circuit', 'function_plot', 'molecular_3d',
    'flowchart', 'graph_slider', 'annotated_svg', 'ledger', 'text', 'quiz',
  ]
  const vType = visual.type as FrameType
  if (!knownTypes.includes(vType)) return null
  return {
    id: `step-${stepNumber}-visual`,
    type: vType,
    title: `Visual — Step ${stepNumber}`,
    data: (visual.data || {}) as Frame['data'],
  }
}

function StepVisual({ visual, stepNumber }: { visual: SolverVisual; stepNumber: number }) {
  const frame = visualToFrame(visual, stepNumber)
  if (!frame) return null
  return (
    <div className="mt-3">
      <FrameRenderer frame={frame} />
    </div>
  )
}

// ────────────────────────────────────────
// Step Display Component
// ────────────────────────────────────────
function StepDisplay({ step, isActive, totalSteps }: { step: Step; isActive: boolean; totalSteps: number }) {
  const [showHint, setShowHint] = useState(false);

  if (!isActive) return null;

  return (
    <motion.div
      {...stepReveal}
      className="w-full"
    >
      <div className="glass-card rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <span className="text-xs font-bold text-indigo-300 font-mono">{step.step_number}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white font-body">{step.title}</h3>
            <p className="text-xs text-gray-500 font-body">Step {step.step_number} of {totalSteps}</p>
          </div>
          {step.is_key_step && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 font-body">
              ⭐ Key Step
            </span>
          )}
        </div>

        {step.math_expression && (
          <div className="bg-white/5 rounded-xl p-4 mb-3 overflow-x-auto">
            <BlockMath math={step.math_expression} />
          </div>
        )}

        <p className="text-sm text-gray-300 leading-relaxed font-body">
          {step.explanation}
        </p>

        {step.visual && <StepVisual visual={step.visual} stepNumber={step.step_number} />}

        {step.hint && (
          <div className="mt-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-body"
            >
              {showHint ? "🙈 Hide hint" : "💡 Need a hint?"}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/15"
                >
                  <p className="text-xs text-amber-300 font-body">{step.hint}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────
// Mastery Progress Bar
// ────────────────────────────────────────
function MasteryProgress({ problemType, compact = false }: { problemType: string; compact?: boolean }) {
  const { getMastery, getAttempts } = useMasteryStore();
  const mastery = getMastery(problemType);
  const attempts = getAttempts(problemType);
  const level = Math.floor(mastery / 25);
  const levelNames = ["", "Beginner", "Learning", "Practiced", "Confident", "Expert"];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${mastery}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <span className="text-[10px] text-gray-500 font-body">{mastery}%</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">🏆</span>
          <span className="text-sm font-semibold text-white font-body">{levelNames[level] || "Beginner"}</span>
        </div>
        <span className="text-xs text-gray-500 font-body">{attempts} attempts this session</span>
      </div>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden mb-1">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${mastery}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] text-gray-500 font-body">{levelNames[1] || "Beginner"}</span>
        <span className="text-[10px] text-gray-500 font-body">{levelNames[5] || "Expert"}</span>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────
// Socratic Teacher Button
// ────────────────────────────────────────
function SocraticTeacherButton({ problemType, expression }: { problemType: string; expression: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 p-4 rounded-2xl border border-dashed border-gray-700 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl group-hover:scale-110 transition-transform">👨‍🏫</span>
          <div className="text-left">
            <span className="text-sm text-gray-400 group-hover:text-indigo-300 transition-colors font-body">
              I can't solve this yet
            </span>
            <span className="block text-xs text-gray-600 font-body">
              Tap here to ask a teacher — Socratic method se samjhaenge
            </span>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full max-w-md glass-strong rounded-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">👨‍🏫</span>
                <div>
                  <h3 className="text-lg font-semibold text-white font-body">Ask a Teacher</h3>
                  <p className="text-xs text-gray-400 font-body">Socratic method — hints diye jaayenge, seedha answer nahi</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-1 font-body">Your problem:</p>
                <p className="text-sm text-white font-mono">{expression || "not specified"}</p>
                <p className="text-xs text-indigo-400 mt-1 font-body">{problemType}</p>
              </div>

              <div className="space-y-3 mb-4">
                <p className="text-xs text-gray-400 font-body">Aapke paas options hain:</p>
                <div className="space-y-2">
                  {["Step-by-step hints mangwao", "Similar example dekho", "Concept revision karo", "Live doubt session join karo"].map((opt, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all font-body"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl bg-white/10 text-white text-sm font-body hover:bg-white/15 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ────────────────────────────────────────
// Math Input Component
// ────────────────────────────────────────
function MathInputField({
  value,
  onChange,
  placeholder,
  onSubmit,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onSubmit: () => void;
  disabled: boolean;
}) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full">
      <div
        ref={inputRef}
        className={`relative rounded-2xl transition-all duration-200 ${
          focused ? "border-indigo-500/50 bg-white/[0.07]" : "border-white/10 bg-white/5"
        } border`}
      >
        <MathInput
          value={value}
          onChange={(math: string) => onChange(math || "")}
          keypadType="calculus"
          placeholder={placeholder || "Type your expression, e.g. x*sin(x)"}
          disabled={disabled}
          showPreview={true}
          showVoice={false}
          showPhoto={false}
        />

        {!focused && !value && (
          <div className="absolute inset-0 flex items-center pointer-events-none px-4">
            <span className="text-gray-600 text-sm font-body">e.g. x\\cdot\\sin(x) or x^2 + 2x + 1</span>
          </div>
        )}
      </div>

      {value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 p-3 rounded-xl bg-white/5 border border-white/5 overflow-x-auto"
        >
          <p className="text-[10px] text-gray-500 mb-1 font-body">Preview:</p>
          <BlockMath math={value} />
        </motion.div>
      )}

      <div className="flex gap-2 mt-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold font-body hover:from-indigo-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
        >
          🔍 Solve Karo
        </motion.button>

        <label className="relative cursor-pointer" title="Snap the problem">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              e.target.value = "";
              try {
                const b64 = await new Promise<string>((res, rej) => {
                  const r = new FileReader();
                  r.onload = () => res(String(r.result));
                  r.onerror = rej;
                  r.readAsDataURL(file);
                });
                const { api } = await import("@/lib/api");
                const out = await api.post<{ text: string }>("/api/vision/extract", { image: b64 });
                const text = out?.text?.trim();
                if (text) onChange(text);
                else alert("Could not read the photo — try a clearer shot.");
              } catch {
                alert("Photo read failed — log in and try again.");
              }
            }}
            className="hidden"
          />
          <div className="w-14 h-[52px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="text-xl">📷</span>
          </div>
        </label>
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Step Navigation
// ────────────────────────────────────────
function StepNavigation({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onFinish,
}: {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}) {
  const progress = totalSteps > 0 ? ((currentStep) / totalSteps) * 100 : 0;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs text-gray-500 font-mono font-body min-w-[3rem] text-right">
          {currentStep}/{totalSteps}
        </span>
      </div>

      <div className="flex gap-2">
        {currentStep > 1 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onPrev}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-body hover:bg-white/10 transition-colors"
          >
            ← Pehle Step
          </motion.button>
        )}

        {currentStep < totalSteps ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold font-body shadow-lg shadow-indigo-500/20"
          >
            Agla Step →
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onFinish}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold font-body shadow-lg shadow-emerald-500/20"
          >
            ✅ Samajh gaya!
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Try Another Variation
// ────────────────────────────────────────
function TryAnotherButton({ onGenerate, isLoading }: { onGenerate: (seed: number) => void; isLoading: boolean }) {
  const [variationCount, setVariationCount] = useState(0);

  const handleClick = () => {
    const seed = Date.now();
    setVariationCount((c) => c + 1);
    onGenerate(seed);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      disabled={isLoading}
      className="w-full py-3.5 rounded-xl border-2 border-dashed border-white/15 hover:border-indigo-500/40 text-sm font-body text-gray-400 hover:text-indigo-300 hover:bg-indigo-500/5 disabled:opacity-40 transition-all"
    >
      <span className="flex items-center justify-center gap-2">
        <span>🔄</span>
        <span>Try Another (variation {variationCount + 1})</span>
      </span>
    </motion.button>
  );
}

// ────────────────────────────────────────
// Result Summary Card
// ────────────────────────────────────────
function ResultSummary({ steps, problemType }: { steps: Step[]; problemType: string }) {
  const lastStep = steps[steps.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-strong rounded-2xl p-6 border border-emerald-500/20"
    >
      <div className="text-center mb-4">
        <span className="text-4xl mb-2 block">🎯</span>
        <h3 className="text-lg font-semibold text-white font-body">Final Answer</h3>
      </div>

      {lastStep?.math_expression && (
        <div className="bg-white/5 rounded-xl p-5 mb-4 overflow-x-auto flex justify-center">
          <BlockMath math={lastStep.math_expression} />
        </div>
      )}

      {lastStep?.explanation && (
        <p className="text-sm text-gray-300 text-center font-body leading-relaxed">
          {lastStep.explanation}
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center font-body">
          {steps.length} steps • {problemType} • ISC Class 11
        </p>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────
// Sample Problems Chips
// ────────────────────────────────────────
function SampleProblemChips({ type, onSelect }: { type: string; onSelect: (expr: string) => void }) {
  const samples = SAMPLE_PROBLEMS[type] || [];
  if (samples.length === 0) return null;

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 mb-2 font-body">Quick try karo:</p>
      <div className="flex flex-wrap gap-2">
        {samples.map((sample) => (
          <motion.button
            key={sample}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(sample)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all font-mono"
          >
            {sample}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Main Solver Page
// ────────────────────────────────────────
const STAGES = {
  TYPE_SELECT: "type_select",
  THINKING: "thinking",
  INPUT: "input",
  SOLVING: "solving",
  STEPS: "steps",
  RESULT: "result",
  ERROR: "error",
} as const;

type Stage = (typeof STAGES)[keyof typeof STAGES];

export default function SolverPage() {
  // ── State ──
  const [stage, setStage] = useState<Stage>(STAGES.TYPE_SELECT);
  const [selectedType, setSelectedType] = useState<string>("");
  const [inputExpression, setInputExpression] = useState("");
  const [thinkingQuestion, setThinkingQuestion] = useState<ThinkingQuestion | null>(null);
  const [solverSteps, setSolverSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [thinkingCorrect, setThinkingCorrect] = useState(false);
  const [thinkingAnswered, setThinkingAnswered] = useState(false);

  // ── Refs ──
  const topRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  // ── Mastery ──
  const { incrementAttempt, incrementCorrect } = useMasteryStore();

  // ── Scroll to top on stage change ──
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [stage]);

  // ── Auto-scroll steps ──
  useEffect(() => {
    if (stage === STAGES.STEPS || stage === STAGES.RESULT) {
      setTimeout(() => {
        stepsContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [currentStep, stage]);

  // ── Handlers ──
  const handleTypeSelect = useCallback((type: string) => {
    setSelectedType(type);
    setInputExpression("");
    setError(null);

    const questions = THINKING_QUESTIONS[type] || THINKING_QUESTIONS["default"] || [];
    if (questions.length > 0) {
      const randomQ = questions[Math.floor(Math.random() * questions.length)];
      setThinkingQuestion(randomQ);
      setThinkingCorrect(false);
      setThinkingAnswered(false);
      setStage(STAGES.THINKING);
    } else {
      setStage(STAGES.INPUT);
    }
  }, []);

  const handleThinkingAnswered = useCallback((correct: boolean) => {
    setThinkingCorrect(correct);
    setThinkingAnswered(true);
    setTimeout(() => {
      setStage(STAGES.INPUT);
    }, 1000);
  }, []);

  const handleThinkingSkip = useCallback(() => {
    setStage(STAGES.INPUT);
  }, []);

  const handleSolve = useCallback(async () => {
    if (!selectedType || !inputExpression.trim()) return;

    setStage(STAGES.SOLVING);
    setError(null);
    setSolverSteps([]);
    setCurrentStep(1);

    try {
      const result: SolverResponse = await solveProblem({
        problem_type: selectedType,
        expression: inputExpression,
      });

      if (result.error) {
        setError(result.error);
        setStage(STAGES.ERROR);
        return;
      }

      const steps: Step[] = (result.steps || []).map((s, i) => ({
        step_number: i + 1,
        title: s.title || `Step ${i + 1}`,
        explanation: s.explanation || s.text || "",
        math_expression: s.math_expression || (s as any).latex || undefined,
        hint: s.hint || undefined,
        is_key_step: s.is_key_step || i === 0 || i === (result.steps || []).length - 1,
        visual: s.visual || undefined,
      }));

      if (steps.length === 0) {
        setError("No steps generated — expression thoda aur clear karo.");
        setStage(STAGES.ERROR);
        return;
      }

      setSolverSteps(steps);
      setCurrentStep(1);
      setStage(STAGES.STEPS);
      incrementAttempt(selectedType);
    } catch (err) {
      setError("Network issue! Check your internet connection aur phir try karo.");
      setStage(STAGES.ERROR);
    }
  }, [selectedType, inputExpression, incrementAttempt]);

  const handleNextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, solverSteps.length));
  }, [solverSteps.length]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleFinish = useCallback(() => {
    incrementCorrect(selectedType);
    setStage(STAGES.RESULT);
  }, [selectedType, incrementCorrect]);

  const handleTryAnother = useCallback(async (seed: number) => {
    setStage(STAGES.SOLVING);
    setError(null);
    setSolverSteps([]);
    setCurrentStep(1);

    try {
      const result: SolverResponse = await solveProblem({
        problem_type: selectedType,
        expression: inputExpression,
        seed,
        variation: true,
      } as SolveRequest);

      if (result.error) {
        setError(result.error);
        setStage(STAGES.ERROR);
        return;
      }

      const steps: Step[] = (result.steps || []).map((s, i) => ({
        step_number: i + 1,
        title: s.title || `Step ${i + 1}`,
        explanation: s.explanation || s.text || "",
        math_expression: s.math_expression || (s as any).latex || undefined,
        hint: s.hint || undefined,
        is_key_step: s.is_key_step || i === 0 || i === (result.steps || []).length - 1,
        visual: s.visual || undefined,
      }));

      if (steps.length > 0) {
        setSolverSteps(steps);
        setCurrentStep(1);
        setStage(STAGES.STEPS);
        incrementAttempt(selectedType);
      }
    } catch {
      setError("Try again thoda baad mein.");
      setStage(STAGES.ERROR);
    }
  }, [selectedType, inputExpression, incrementAttempt]);

  const handleRetry = useCallback(() => {
    setError(null);
    setStage(STAGES.INPUT);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedType("");
    setInputExpression("");
    setSolverSteps([]);
    setCurrentStep(1);
    setError(null);
    setThinkingQuestion(null);
    setThinkingCorrect(false);
    setThinkingAnswered(false);
    setStage(STAGES.TYPE_SELECT);
  }, []);

  // ── Render ──
  return (
    <div ref={topRef} className="min-h-screen bg-[#0a0a0f] text-white font-body">
      {/* Background ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/[0.03] blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {stage !== STAGES.TYPE_SELECT && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleReset}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                ←
              </motion.button>
            )}
            <div>
              <h1 className="text-sm font-bold text-white font-body leading-tight">Math Solver</h1>
              {selectedType && (
                <p className="text-[10px] text-gray-500 font-body">{selectedType} • ISC Class 11</p>
              )}
            </div>
          </div>

          {selectedType && (
            <MasteryProgress problemType={selectedType} compact />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-lg mx-auto px-4 pt-6 pb-24">
        <AnimatePresence mode="wait">
          {/* ── Stage 1: Type Selection ── */}
          {stage === STAGES.TYPE_SELECT && (
            <motion.div key="type" {...slideUp} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-1 font-['Space_Grotesk']">
                  Kya solve karna hai?
                </h2>
                <p className="text-sm text-gray-400 font-body">
                  Apna problem type choose karo
                </p>
              </div>
              <ProblemTypeGrid onSelect={handleTypeSelect} />
            </motion.div>
          )}

          {/* ── Stage 2: Thinking Question ── */}
          {stage === STAGES.THINKING && thinkingQuestion && (
            <motion.div key="thinking" className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-xs text-gray-500 font-body">
                  <span>1</span>
                  <span className="w-4 h-px bg-gray-700"></span>
                  <span>2</span>
                  <span className="w-4 h-px bg-gray-700"></span>
                  <span>3</span>
                </div>
                <span className="text-[10px] text-gray-600 font-body">Step 1 of 3</span>
              </div>
              <ThinkingQuestionBlock
                question={thinkingQuestion}
                onAnswered={handleThinkingAnswered}
                onSkip={handleThinkingSkip}
              />
              {thinkingAnswered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-gray-500 font-body"
                >
                  Ab expression type karo ↓
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Stage 3: Input ── */}
          {(stage === STAGES.INPUT ||
            stage === STAGES.THINKING && thinkingAnswered) && (
            <motion.div key="input" className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-xs font-body">
                  <span className={stage === STAGES.THINKING && thinkingAnswered ? "text-indigo-400" : "text-gray-600"}>1</span>
                  <span className="w-4 h-px bg-gray-700"></span>
                  <span className={stage === STAGES.INPUT ? "text-indigo-400" : "text-gray-600"}>2</span>
                  <span className="w-4 h-px bg-gray-700"></span>
                  <span className="text-gray-600">3</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-body">Ab apna expression type karo</p>
                  <p className="text-xs text-indigo-400 font-body">{selectedType}</p>
                </div>
              </div>

              <MathInputField
                value={inputExpression}
                onChange={setInputExpression}
                placeholder={`${selectedType} ka expression likho, e.g. x\\sin(x)`}
                onSubmit={handleSolve}
                disabled={(stage as Stage) === STAGES.SOLVING}
              />

              <SampleProblemChips type={selectedType} onSelect={setInputExpression} />
            </motion.div>
          )}

          {/* ── Stage 4: Solving (Loading) ── */}
          {stage === STAGES.SOLVING && (
            <motion.div key="solving">
              <SolvingAnimation />
            </motion.div>
          )}

          {/* ── Stage 5: Steps ── */}
          {(stage === STAGES.STEPS || stage === STAGES.RESULT) && (
            <motion.div key="steps" ref={stepsContainerRef} className="space-y-4">
              {stage === STAGES.STEPS && (
                <AnimatePresence mode="wait">
                  {solverSteps.map((step, i) => (
                    step.step_number <= currentStep ? (
                      <StepDisplay
                        key={step.step_number}
                        step={step}
                        isActive={step.step_number === currentStep}
                        totalSteps={solverSteps.length}
                      />
                    ) : null
                  ))
                  }
                </AnimatePresence>
              )}

              {stage === STAGES.STEPS && (
                <StepNavigation
                  currentStep={currentStep}
                  totalSteps={solverSteps.length}
                  onPrev={handlePrevStep}
                  onNext={handleNextStep}
                  onFinish={handleFinish}
                />
              )}

              {stage === STAGES.RESULT && <ResultSummary steps={solverSteps} problemType={selectedType} />}

              {stage === STAGES.RESULT && (
                <div className="space-y-3 mt-4">
                  <TryAnotherButton onGenerate={handleTryAnother} isLoading={false} />
                  <MasteryProgress problemType={selectedType} />
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleReset}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400 font-body hover:bg-white/10 transition-colors"
                  >
                    Naya Problem ↓
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Stage 6: Error ── */}
          {stage === STAGES.ERROR && (
            <motion.div key="error" {...slideUp} className="space-y-4">
              <div className="glass-strong rounded-2xl p-6 border border-red-500/20 text-center">
                <span className="text-4xl mb-3 block">😕</span>
                <h3 className="text-lg font-semibold text-white mb-2 font-body">
                  Abhi solve nahi ho paya
                </h3>
                <p className="text-sm text-gray-400 font-body">{error}</p>
              </div>

              <SocraticTeacherButton problemType={selectedType} expression={inputExpression} />

              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRetry}
                  className="flex-1 py-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-body"
                >
                  Phir try karo
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-body"
                >
                  Naya problem
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar (decorative) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#0a0a0f]/90 border-t border-white/5">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
          {["🏠 Home", "📚 Syllabus", "🧮 Solver", "📊 Progress"].map((item, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                item.includes("Solver") ? "text-indigo-400" : "text-gray-600"
              }`}
            >
              <span className="text-sm">{item.split(" ")[0]}</span>
              <span className="text-[9px] font-body">{item.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
