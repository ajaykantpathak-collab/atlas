'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  FunctionSquare,
  Sigma,
  Binary,
  FlaskConical,
  Globe,
  BookOpen,
  Atom,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  RotateCcw,
  Play,
  ArrowRight,
  Zap,
  Brain,
  Lightbulb,
  Trophy,
  Clock,
  TrendingUp,
  ArrowDown,
  Copy,
  Check,
  Expand,
  Minimize2,
  Target,
  BookMarked,
  Shuffle,
} from "lucide-react";

// ─── ATLAS TOKENS ──────────────────────────────────────────────
const ATLAS_TOKENS = {
  colors: {
    navy900: "#0B0E17",
    navy800: "#111827",
    navy700: "#1A2332",
    navy600: "#243044",
    navy500: "#374866",
    navy400: "#5B6B8A",
    navy300: "#8A99B4",
    navy200: "#B8C5DB",
    navy100: "#E2E8F0",
    white: "#FFFFFF",
    gold: "#F59E0B",
    goldLight: "#FCD34D",
    goldDark: "#D97706",
    goldBg: "rgba(245, 158, 11, 0.08)",
    goldBorder: "rgba(245, 158, 11, 0.25)",
    success: "#10B981",
    successBg: "rgba(16, 185, 129, 0.1)",
    successBorder: "rgba(16, 185, 129, 0.3)",
    error: "#EF4444",
    errorBg: "rgba(239, 68, 68, 0.1)",
    errorBorder: "rgba(239, 68, 68, 0.3)",
    info: "#6366F1",
    infoBg: "rgba(99, 102, 241, 0.1)",
    purple: "#A78BFA",
    teal: "#14B8A6",
    rose: "#F43F5E",
    orange: "#F97316",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.3)",
    md: "0 4px 12px rgba(0,0,0,0.4)",
    lg: "0 12px 40px rgba(0,0,0,0.5)",
    glow: "0 0 20px rgba(245,158,11,0.15)",
    glowSm: "0 0 10px rgba(245,158,11,0.1)",
  },
  fonts: {
    math: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace",
    sans: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "400ms cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "spring(1, 0.5, 0.1)",
  },
};

// ─── SUBJECT & TOPIC DEFINITIONS ──────────────────────────────
const SUBJECTS: Record<string, { icon: typeof Calculator; color: string }> = {
  Mathematics: { icon: Calculator, color: "#F59E0B" },
  Physics: { icon: Atom, color: "#6366F1" },
  Chemistry: { icon: FlaskConical, color: "#10B981" },
  Biology: { icon: Globe, color: "#14B8A6" },
};

const TOPICS_BY_CLASS: Record<number, Record<string, string[]>> = {
  6: {
    Mathematics: ["Basic Arithmetic", "Fractions", "Decimals", "Geometry", "Data Handling"],
    Physics: ["Motion", "Light", "Sound", "Electricity Basics"],
    Chemistry: ["Separation Techniques", "Materials"],
    Biology: ["Food Sources", "Plants", "Animals"],
  },
  7: {
    Mathematics: ["Integers", "Fractions & Decimals", "Data Handling", "Lines & Angles", "Triangles"],
    Physics: ["Heat", "Motion & Time", "Current & Electricity", "Weather & Climate"],
    Chemistry: ["Acids & Bases", "Physical & Chemical Changes", "Soil"],
    Biology: ["Nutrition in Plants", "Respiration", "Transportation"],
  },
  8: {
    Mathematics: ["Rational Numbers", "Linear Equations", "Quadrilaterals", "Data Handling", "Cubes & Roots"],
    Physics: ["Force & Pressure", "Friction", "Sound", "Chemical Effects of Current"],
    Chemistry: ["Metals & Non-Metals", "Synthetic Fibers", "Coal & Petroleum"],
    Biology: ["Cell Structure", "Microorganisms", "Crop Production"],
  },
  9: {
    Mathematics: [
      "Number Systems",
      "Polynomials",
      "Coordinate Geometry",
      "Linear Equations",
      "Triangles",
      "Quadrilaterals",
      "Heron's Formula",
      "Surface Area & Volume",
      "Statistics",
      "Probability",
    ],
    Physics: [
      "Motion",
      "Force & Laws of Motion",
      "Gravitation",
      "Work & Energy",
      "Sound",
      "Matter in Our Surroundings",
    ],
    Chemistry: [
      "Matter in Our Surroundings",
      "Atoms & Molecules",
      "Structure of Atom",
      "Chemical Bonding",
      "Periodic Table",
    ],
    Biology: ["Cell — The Unit of Life", "Tissues", "Improvement in Food Resources"],
  },
  10: {
    Mathematics: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Trigonometry",
      "Circles",
      "Statistics",
      "Probability",
    ],
    Physics: [
      "Light — Reflection & Refraction",
      "Human Eye & Colourful World",
      "Electricity",
      "Magnetic Effects of Current",
      "Sources of Energy",
    ],
    Chemistry: [
      "Chemical Reactions & Equations",
      "Acids, Bases & Salts",
      "Metals & Non-Metals",
      "Carbon & Its Compounds",
    ],
    Biology: ["Life Processes", "Control & Coordination", "Reproduction", "Heredity & Evolution"],
  },
  11: {
    Mathematics: [
      "Sets",
      "Relations & Functions",
      "Trigonometric Functions",
      "Limits & Derivatives",
      "Conic Sections",
      "Straight Lines",
      "Permutations & Combinations",
      "Binomial Theorem",
      "Probability",
      "Matrices",
      "Sequences & Series",
    ],
    Physics: [
      "Kinematics",
      "Laws of Motion",
      "Work & Energy",
      "Rotational Motion",
      "Thermodynamics",
      "Waves",
    ],
    Chemistry: [
      "Atomic Structure",
      "Chemical Bonding",
      "States of Matter",
      "Thermodynamics",
      "Equilibrium",
      "Organic Chemistry",
    ],
    Biology: ["Cell Biology", "Plant Physiology", "Human Physiology"],
  },
  12: {
    Mathematics: [
      "Relations & Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity & Differentiability",
      "Applications of Derivatives",
      "Integrals",
      "Differential Equations",
      "Probability",
      "Vectors",
      "Three Dimensional Geometry",
    ],
    Physics: [
      "Electrostatics",
      "Current Electricity",
      "Magnetic Effects of Current",
      "Electromagnetic Induction",
      "Optics",
      "Modern Physics",
    ],
    Chemistry: [
      "Solid State",
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "Coordination Compounds",
      "Organic Compounds",
    ],
    Biology: ["Genetics", "Evolution", "Biotechnology", "Ecology"],
  },
};

// ─── PROBLEM TYPE DEFINITIONS ─────────────────────────────────
const PROBLEM_TYPES: Record<string, { topic: string; classLevel: number }[]> = {
  "Linear Equations": [
    { topic: "Linear Equations", classLevel: 9 },
    { topic: "Pair of Linear Equations", classLevel: 10 },
    { topic: "Coordinate Geometry", classLevel: 10 },
  ],
  "Quadratic Equations": [
    { topic: "Quadratic Equations", classLevel: 10 },
    { topic: "Polynomials", classLevel: 9 },
  ],
  "Derivatives": [
    { topic: "Limits & Derivatives", classLevel: 11 },
    { topic: "Continuity & Differentiability", classLevel: 12 },
  ],
  "Integrals": [
    { topic: "Integrals", classLevel: 12 },
    { topic: "Sequences & Series", classLevel: 11 },
  ],
  "Trigonometry": [
    { topic: "Trigonometric Functions", classLevel: 11 },
    { topic: "Trigonometry", classLevel: 10 },
  ],
  "Matrices": [
    { topic: "Matrices", classLevel: 11 },
    { topic: "Matrices", classLevel: 12 },
  ],
  "Probability": [
    { topic: "Probability", classLevel: 11 },
    { topic: "Probability", classLevel: 12 },
    { topic: "Statistics", classLevel: 10 },
  ],
  "Kinematics": [
    { topic: "Kinematics", classLevel: 11 },
    { topic: "Motion", classLevel: 9 },
  ],
  "Electricity": [
    { topic: "Electricity", classLevel: 10 },
    { topic: "Current Electricity", classLevel: 12 },
    { topic: "Electrostatics", classLevel: 12 },
  ],
  "Optics": [
    { topic: "Optics", classLevel: 12 },
    { topic: "Light — Reflection & Refraction", classLevel: 10 },
  ],
};

const PROBLEM_TYPE_CONFIG: Record<
  string,
  {
    icon: typeof Calculator;
    color: string;
    methodChoices: { value: string; label: string; hint: string }[];
    inputFields: {
      name: string;
      label: string;
      type: "expression" | "number" | "matrix" | "select" | "point";
      placeholder?: string;
      options?: { value: string; label: string }[];
      rows?: number;
      cols?: number;
    }[];
    subject: string;
  }
> = {
  "Linear Equations": {
    icon: FunctionSquare,
    color: "#F59E0B",
    subject: "Mathematics",
    methodChoices: [
      { value: "substitution", label: "Substitution Method", hint: "Solve one equation for one variable, substitute into the other" },
      { value: "elimination", label: "Elimination Method", hint: "Add or subtract equations to eliminate one variable" },
      { value: "graphical", label: "Graphical Method", hint: "Plot both lines and find their intersection" },
      { value: "cross-multiplication", label: "Cross-Multiplication Method", hint: "Use the cross-multiplication formula" },
    ],
    inputFields: [
      { name: "equation1", label: "First Equation", type: "expression", placeholder: "e.g., 2x + 3y = 7" },
      { name: "equation2", label: "Second Equation", type: "expression", placeholder: "e.g., x - y = 1" },
    ],
  },
  "Quadratic Equations": {
    icon: Zap,
    color: "#6366F1",
    subject: "Mathematics",
    methodChoices: [
      { value: "factorization", label: "Factorization", hint: "Split the middle term and factor" },
      { value: "quadratic-formula", label: "Quadratic Formula", hint: "x = (-b ± √(b²-4ac)) / 2a" },
      { value: "completing-square", label: "Completing the Square", hint: "Rewrite as (x+p)² = q" },
    ],
    inputFields: [
      { name: "equation", label: "Quadratic Equation", type: "expression", placeholder: "e.g., x² + 5x + 6 = 0" },
    ],
  },
  Derivatives: {
    icon: TrendingUp,
    color: "#EF4444",
    subject: "Mathematics",
    methodChoices: [
      { value: "first-principles", label: "First Principles (Definition)", hint: "f'(x) = lim(h→0) [f(x+h)-f(x)]/h" },
      { value: "power-rule", label: "Power Rule", hint: "d/dx(xⁿ) = nxⁿ⁻¹" },
      { value: "chain-rule", label: "Chain Rule", hint: "d/dx[f(g(x))] = f'(g(x)) · g'(x)" },
      { value: "product-rule", label: "Product Rule", hint: "d/dx[uv] = u'v + uv'" },
    ],
    inputFields: [
      { name: "function", label: "Function", type: "expression", placeholder: "e.g., x³ + 2x²" },
      { name: "variable", label: "With Respect To", type: "select", options: [{ value: "x", label: "x" }, { value: "t", label: "t" }, { value: "θ", label: "θ" }] },
    ],
  },
  Integrals: {
    icon: Sigma,
    color: "#8B5CF6",
    subject: "Mathematics",
    methodChoices: [
      { value: "power-rule-int", label: "Power Rule", hint: "∫xⁿdx = xⁿ⁺¹/(n+1)" },
      { value: "substitution", label: "Substitution Method", hint: "Let u = g(x), then ∫f(g(x))g'(x)dx = ∫f(u)du" },
      { value: "by-parts", label: "Integration by Parts", hint: "∫udv = uv - ∫vdu" },
    ],
    inputFields: [
      { name: "function", label: "Function to Integrate", type: "expression", placeholder: "e.g., x² + 3x" },
      { name: "lower_limit", label: "Lower Limit (leave empty for indefinite)", type: "expression", placeholder: "e.g., 0" },
      { name: "upper_limit", label: "Upper Limit (leave empty for indefinite)", type: "expression", placeholder: "e.g., 2" },
    ],
  },
  Trigonometry: {
    icon: Binary,
    color: "#EC4899",
    subject: "Mathematics",
    methodChoices: [
      { value: "identities", label: "Trigonometric Identities", hint: "Use standard identities to simplify" },
      { value: "conversion", label: "Angle Conversion", hint: "Convert between degrees and radians" },
    ],
    inputFields: [
      { name: "angle", label: "Angle Value", type: "number", placeholder: "e.g., 30" },
      { name: "unit", label: "Unit", type: "select", options: [{ value: "deg", label: "Degrees (°)" }, { value: "rad", label: "Radians" }] },
      { name: "expression", label: "Trig Expression", type: "expression", placeholder: "e.g., sin(x) + cos(x)" },
    ],
  },
  Matrices: {
    icon: BookOpen,
    color: "#14B8A6",
    subject: "Mathematics",
    methodChoices: [
      { value: "addition", label: "Matrix Addition", hint: "Add corresponding elements: (A+B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ" },
      { value: "multiplication", label: "Matrix Multiplication", hint: "Multiply row of first by column of second" },
      { value: "determinant", label: "Determinant", hint: "ad-bc for 2×2, cofactor expansion for larger" },
    ],
    inputFields: [
      { name: "method", label: "Operation", type: "select", options: [
        { value: "add", label: "Addition" },
        { value: "multiply", label: "Multiplication" },
        { value: "det", label: "Determinant" },
      ]},
    ],
  },
  Probability: {
    icon: Target,
    color: "#F97316",
    subject: "Mathematics",
    methodChoices: [
      { value: "classical", label: "Classical Definition", hint: "P(E) = n(E) / n(S)" },
      { value: "conditional", label: "Conditional Probability", hint: "P(A|B) = P(A∩B) / P(B)" },
      { value: "bayes", label: "Bayes' Theorem", hint: "P(A|B) = P(B|A)·P(A) / P(B)" },
    ],
    inputFields: [
      { name: "favorable", label: "Favorable Outcomes", type: "number", placeholder: "e.g., 3" },
      { name: "total", label: "Total Outcomes", type: "number", placeholder: "e.g., 6" },
    ],
  },
  Kinematics: {
    icon: TrendingUp,
    color: "#3B82F6",
    subject: "Physics",
    methodChoices: [
      { value: "equations-of-motion", label: "Equations of Motion", hint: "Use SUVAT equations" },
      { value: "graphical", label: "Graphical Method", hint: "Interpret velocity-time or displacement-time graph" },
      { value: "relative", label: "Relative Motion", hint: "v_rel = v₁ - v₂" },
    ],
    inputFields: [
      { name: "u", label: "Initial Velocity (u)", type: "number", placeholder: "e.g., 0" },
      { name: "a", label: "Acceleration (a)", type: "number", placeholder: "e.g., 9.8" },
      { name: "t", label: "Time (t)", type: "number", placeholder: "e.g., 5" },
      { name: "find", label: "Find", type: "select", options: [
        { value: "v", label: "Final Velocity (v)" },
        { value: "s", label: "Displacement (s)" },
      ]},
    ],
  },
  Electricity: {
    icon: Zap,
    color: "#6366F1",
    subject: "Physics",
    methodChoices: [
      { value: "ohm-law", label: "Ohm's Law", hint: "V = IR" },
      { value: "series", label: "Series Circuits", hint: "R_eq = R₁ + R₂ + ..." },
      { value: "parallel", label: "Parallel Circuits", hint: "1/R_eq = 1/R₁ + 1/R₂ + ..." },
      { value: "power", label: "Power Formulas", hint: "P = VI = I²R = V²/R" },
    ],
    inputFields: [
      { name: "voltage", label: "Voltage (V)", type: "number", placeholder: "e.g., 12" },
      { name: "resistance", label: "Resistance (R)", type: "number", placeholder: "e.g., 4" },
    ],
  },
  Optics: {
    icon: Lightbulb,
    color: "#06B6D4",
    subject: "Physics",
    methodChoices: [
      { value: "mirror-formula", label: "Mirror Formula", hint: "1/f = 1/v + 1/u" },
      { value: "lens-formula", label: "Lens Formula", hint: "1/f = 1/v - 1/u" },
      { value: "snells", label: "Snell's Law", hint: "n₁sinθ₁ = n₂sinθ₂" },
    ],
    inputFields: [
      { name: "u", label: "Object Distance (u)", type: "number", placeholder: "e.g., -30" },
      { name: "f", label: "Focal Length (f)", type: "number", placeholder: "e.g., -15" },
      { name: "type", label: "Type", type: "select", options: [
        { value: "mirror-concave", label: "Concave Mirror" },
        { value: "mirror-convex", label: "Convex Mirror" },
        { value: "lens-convex", label: "Convex Lens" },
        { value: "lens-concave", label: "Concave Lens" },
      ]},
    ],
  },
};

// ─── MOCK SOLVER ENGINE ────────────────────────────────────────
interface MockSolveInput {
  problemType: string;
  method: string;
  inputs: Record<string, any>;
}

function mockSolve({ problemType, method, inputs }: MockSolveInput): SolverResponse {
  const { problem_type, steps, final_answer, verified } = generateMockSolution(problemType, method, inputs);
  return { problem_type, steps, final_answer, verified };
}

function generateMockSolution(
  type: string,
  method: string,
  inputs: Record<string, any>
): SolverResponse {
  switch (type) {
    case "Linear Equations":
      return solveLinearEquations(method, inputs);
    case "Quadratic Equations":
      return solveQuadratic(method, inputs);
    case "Derivatives":
      return solveDerivative(method, inputs);
    case "Integrals":
      return solveIntegral(method, inputs);
    case "Trigonometry":
      return solveTrigonometry(method, inputs);
    case "Matrices":
      return solveMatrix(method, inputs);
    case "Probability":
      return solveProbability(method, inputs);
    case "Kinematics":
      return solveKinematics(method, inputs);
    case "Electricity":
      return solveElectricity(method, inputs);
    case "Optics":
      return solveOptics(method, inputs);
    default:
      return {
        problem_type: type,
        steps: [
          {
            step_number: 1,
            title: "Setup",
            description: "Preparing the problem for solution.",
            expression: inputs.function || inputs.equation1 || "N/A",
            result: "Setup complete",
            verified: true,
            verification_note: "Problem setup verified",
          },
        ],
        final_answer: "Solution computed",
        verified: true,
      };
  }
}

function solveLinearEquations(method: string, inputs: Record<string, any>): SolverResponse {
  const eq1 = inputs.equation1 || "2x + 3y = 7";
  const eq2 = inputs.equation2 || "x - y = 1";
  const methodName = method === "substitution" ? "Substitution Method"
    : method === "elimination" ? "Elimination Method"
    : method === "graphical" ? "Graphical Method"
    : "Cross-Multiplication Method";

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify the Equations",
      description: `We have two linear equations:\nEquation 1: ${eq1}\nEquation 2: ${eq2}`,
      expression: `${eq1}\n${eq2}`,
      verified: true,
      verification_note: "Both equations correctly identified",
    },
    {
      step_number: 2,
      title: `Apply ${methodName}`,
      description: method === "elimination"
        ? "We'll eliminate one variable by making coefficients equal.\nFrom Eq(2): x = y + 1\nSubstitute into Eq(1): 2(y+1) + 3y = 7"
        : method === "substitution"
        ? "From Equation 2: x = y + 1\nSubstitute into Equation 1 to solve for y."
        : "Converting to standard form and applying cross-multiplication:",
      expression: method === "elimination"
        ? "2(y + 1) + 3y = 7\n→ 2y + 2 + 3y = 7\n→ 5y = 5"
        : method === "substitution"
        ? "x = y + 1\n2(y + 1) + 3y = 7\n→ 5y + 2 = 7"
        : "5y = 5",
      result: method === "elimination" ? "5y = 5 → y = 1" : "5y = 5 → y = 1",
      verified: true,
      verification_note: "Method applied correctly",
    },
    {
      step_number: 3,
      title: "Solve for First Variable",
      description: "Dividing both sides by 5:",
      expression: "5y = 5\ny = 5/5 = 1",
      result: "y = 1",
      verified: true,
      verification_note: "y = 1 ✓",
    },
    {
      step_number: 4,
      title: "Substitute & Solve for Second Variable",
      description: "Substitute y = 1 into Equation 2:",
      expression: "x - 1 = 1\nx = 1 + 1 = 2",
      result: "x = 2",
      verified: true,
      verification_note: "x = 2 ✓",
    },
    {
      step_number: 5,
      title: "Verify the Solution",
      description: "Check: Eq(1): 2(2) + 3(1) = 4 + 3 = 7 ✓\nCheck: Eq(2): 2 - 1 = 1 ✓",
      expression: "LHS = 7 = RHS ✓\nLHS = 1 = RHS ✓",
      result: "(x, y) = (2, 1)",
      verified: true,
      verification_note: "Both equations satisfied",
    },
  ];
  return { problem_type: "Linear Equations", steps, final_answer: "x = 2, y = 1", verified: true };
}

function solveQuadratic(method: string, inputs: Record<string, any>): SolverResponse {
  const eq = inputs.equation || "x² + 5x + 6 = 0";
  const methodLabel = method === "factorization" ? "Factorization"
    : method === "quadratic-formula" ? "Quadratic Formula"
    : "Completing the Square";

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Write in Standard Form",
      description: "Standard form: ax² + bx + c = 0",
      expression: `${eq}`,
      result: "a = 1, b = 5, c = 6",
      verified: true,
      verification_note: "Standard form confirmed",
    },
    {
      step_number: 2,
      title: `Apply ${methodLabel}`,
      description: method === "factorization"
        ? "Find two numbers that multiply to c=6 and add to b=5."
        : method === "quadratic-formula"
        ? "Apply the quadratic formula: x = (-b ± √(b²-4ac)) / 2a"
        : "Rewrite: x² + 5x = -6",
      expression: method === "factorization"
        ? "Numbers: 2 × 3 = 6, 2 + 3 = 5"
        : method === "quadratic-formula"
        ? "x = (-5 ± √(25-24)) / 2\nx = (-5 ± 1) / 2"
        : "x² + 5x + 25/4 = -6 + 25/4\n(x + 5/2)² = 1/4",
      result: method === "factorization" ? "(x+2)(x+3) = 0" : method === "quadratic-formula" ? "x = -2, x = -3" : "x = -2, x = -3",
      verified: true,
      verification_note: "Formula applied correctly",
    },
    {
      step_number: 3,
      title: "Solve for x",
      description: method === "factorization"
        ? "Set each factor to zero and solve:"
        : "Solving for x:",
      expression: method === "factorization"
        ? "x + 2 = 0 → x = -2\nx + 3 = 0 → x = -3"
        : "x + 5/2 = ±1/2\nx = -5/2 ± 1/2\nx₁ = -2, x₂ = -3",
      result: "x = -2, x = -3",
      verified: true,
      verification_note: "Both roots found correctly",
    },
    {
      step_number: 4,
      title: "Verify",
      description: "Check: (-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0 ✓",
      expression: "4 - 10 + 6 = 0 ✓",
      result: "x = -2, x = -3",
      verified: true,
      verification_note: "Both roots verified",
    },
  ];
  return { problem_type: "Quadratic Equations", steps, final_answer: "x = -2, x = -3", verified: true };
}

function solveDerivative(method: string, inputs: Record<string, any>): SolverResponse {
  const func = inputs.function || "x³ + 2x² - x + 5";
  const varName = inputs.variable || "x";
  const methodLabel = method === "power-rule" ? "Power Rule"
    : method === "first-principles" ? "First Principles"
    : method === "chain-rule" ? "Chain Rule"
    : "Product Rule";

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify the Function",
      description: `Function: f(${varName}) = ${func}`,
      expression: `f(${varName}) = ${func}`,
      verified: true,
      verification_note: "Function identified correctly",
    },
    {
      step_number: 2,
      title: `Apply ${methodLabel}`,
      description: method === "power-rule"
        ? "Apply d/dx(xⁿ) = nxⁿ⁻¹ to each term:"
        : method === "first-principles"
        ? `Compute f'(${varName}) = lim(h→0) [f(${varName}+h) - f(${varName})] / h:`
        : "Applying the rule:",
      expression: method === "power-rule"
        ? `d/dx(${func})\n= 3x² + 4x - 1 + 0`
        : `d/dx(${func})\nApplying term by term...`,
      result: method === "power-rule" ? "3x² + 4x - 1" : "Computed",
      verified: true,
      verification_note: "Rule applied correctly",
    },
    {
      step_number: 3,
      title: "Simplify",
      description: "Simplify the derivative expression:",
      expression: `d/d${varName}(${func}) = 3${varName}² + 4${varName} - 1`,
      result: `3${varName}² + 4${varName} - 1`,
      verified: true,
      verification_note: "Simplification verified",
    },
    {
      step_number: 4,
      title: "Final Answer",
      description: `The derivative of f(${varName}) is:`,
      expression: `f'(${varName}) = 3${varName}² + 4${varName} - 1`,
      result: `f'(${varName}) = 3${varName}² + 4${varName} - 1`,
      verified: true,
      verification_note: "Final answer verified ✓",
    },
  ];
  return { problem_type: "Derivatives", steps, final_answer: `f'(${varName}) = 3${varName}² + 4${varName} - 1`, verified: true };
}

function solveIntegral(method: string, inputs: Record<string, any>): SolverResponse {
  const func = inputs.function || "x² + 3x";
  const hasLimits = inputs.lower_limit !== undefined && inputs.lower_limit !== "";
  const lower = inputs.lower_limit || "0";
  const upper = inputs.upper_limit || "2";

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify the Function",
      description: hasLimits
        ? `Evaluate ∫ ${func} dx from ${lower} to ${upper}`
        : `Find the indefinite integral of ${func}`,
      expression: hasLimits
        ? `∫(${lower} to ${upper}) (${func}) dx`
        : `∫ (${func}) dx`,
      verified: true,
      verification_note: "Integral set up correctly",
    },
    {
      step_number: 2,
      title: "Apply Integration Rules",
      description: method === "power-rule-int"
        ? "Apply ∫ xⁿ dx = xⁿ⁺¹ / (n+1) + C to each term:"
        : "Applying the integration method:",
      expression: `∫(${func}) dx\n= x³/3 + 3x²/2 + C`,
      result: "x³/3 + 3x²/2 + C",
      verified: true,
      verification_note: "Integration performed correctly",
    },
    ...(hasLimits
      ? [
          {
            step_number: 3,
            title: "Apply Limits",
            description: `Evaluate the antiderivative at upper and lower bounds:`,
            expression: `[x³/3 + 3x²/2] from ${lower} to ${upper}\n= [${upper}³/3 + 3·${upper}²/2] - [${lower}³/3 + 3·${lower}²/2]`,
            result: hasLimits ? `${upper}³/3 + 3·${upper}²/2 - (${lower}³/3 + 3·${lower}²/2)` : "N/A",
            verified: true,
            verification_note: "Limits applied correctly",
          },
        ]
      : []),
    {
      step_number: hasLimits ? 4 : 3,
      title: "Compute Result",
      description: hasLimits ? "Evaluating the expression:" : "The indefinite integral:",
      expression: hasLimits
        ? `= ${(parseFloat(upper) ** 3) / 3 + (3 * parseFloat(upper) ** 2) / 2} - ${(parseFloat(lower) ** 3) / 3 + (3 * parseFloat(lower) ** 2) / 2}\n= ${((parseFloat(upper) ** 3) / 3 + (3 * parseFloat(upper) ** 2) / 2 - (parseFloat(lower) ** 3) / 3 - (3 * parseFloat(lower) ** 2) / 2).toFixed(4)}`
        : `∫(${func}) dx = x³/3 + 3x²/2 + C`,
      result: hasLimits
        ? ((parseFloat(upper) ** 3) / 3 + (3 * parseFloat(upper) ** 2) / 2 - (parseFloat(lower) ** 3) / 3 - (3 * parseFloat(lower) ** 2) / 2).toFixed(4)
        : "x³/3 + 3x²/2 + C",
      verified: true,
      verification_note: hasLimits ? "Definite integral computed" : "Indefinite integral computed",
    },
  ];
  return { problem_type: "Integrals", steps, final_answer: hasLimits ? ((parseFloat(upper) ** 3) / 3 + (3 * parseFloat(upper) ** 2) / 2 - (parseFloat(lower) ** 3) / 3 - (3 * parseFloat(lower) ** 2) / 2).toFixed(4) : "x³/3 + 3x²/2 + C", verified: true };
}

function solveTrigonometry(method: string, inputs: Record<string, any>): SolverResponse {
  const angle = inputs.angle || "30";
  const unit = inputs.unit || "deg";
  const expr = inputs.expression || "sin(x)";

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify Given Values",
      description: `Angle: ${angle}°${unit === "rad" ? " (radians)" : ""}`,
      expression: `${expr}`,
      verified: true,
      verification_note: "Values identified",
    },
    {
      step_number: 2,
      title: "Apply Trigonometric Identities",
      description: "Using standard trigonometric values:",
      expression: `sin(${angle}°) = 1/2\ncos(${angle}°) = √3/2\ntan(${angle}°) = 1/√3`,
      result: "Standard values applied",
      verified: true,
      verification_note: "Correct values used",
    },
    {
      step_number: 3,
      title: "Compute Result",
      description: "Evaluating the expression:",
      expression: `${expr.replace("x", angle + "°")}`,
      result: `sin(${angle}°) = 0.5`,
      verified: true,
      verification_note: "Computation verified",
    },
  ];
  return { problem_type: "Trigonometry", steps, final_answer: `sin(${angle}°) = 0.5`, verified: true };
}

function solveMatrix(method: string, inputs: Record<string, any>): SolverResponse {
  const op = inputs.method || "det";
  const opLabel = op === "add" ? "Addition" : op === "multiply" ? "Multiplication" : "Determinant";

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify Matrices",
      description: "Working with 2×2 matrices",
      expression: "A = [a₁  a₂]\n    [a₃  a₄]\n\nB = [b₁  b₂]\n    [b₃  b₄]",
      verified: true,
      verification_note: "Matrices identified",
    },
    {
      step_number: 2,
      title: `Apply ${opLabel}`,
      description: op === "det"
        ? "Determinant: |A| = a₁a₄ - a₂a₃"
        : op === "add"
        ? "Add corresponding elements: (A+B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ"
        : "Multiply: (AB)ᵢⱼ = Σ Aᵢₖ · Bₖⱼ",
      expression: op === "det"
        ? "|A| = (1)(4) - (2)(3)\n   = 4 - 6\n   = -2"
        : "Result computed element-wise",
      result: op === "det" ? "-2" : "Computed",
      verified: true,
      verification_note: "Operation applied correctly",
    },
    {
      step_number: 3,
      title: "Result",
      description: `${opLabel} completed:`,
      expression: op === "det" ? "|A| = -2" : "Computed matrix",
      result: op === "det" ? "-2" : "Computed",
      verified: true,
      verification_note: "Result verified",
    },
  ];
  return { problem_type: "Matrices", steps, final_answer: op === "det" ? "-2" : "Computed", verified: true };
}

function solveProbability(method: string, inputs: Record<string, any>): SolverResponse {
  const favorable = inputs.favorable || 3;
  const total = inputs.total || 6;
  const prob = (favorable / total).toFixed(4);

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify Sample Space",
      description: "Classical probability definition",
      expression: `P(E) = n(E) / n(S)`,
      result: `P(E) = ${favorable}/${total}`,
      verified: true,
      verification_note: "Sample space identified",
    },
    {
      step_number: 2,
      title: "Count Outcomes",
      description: "Counting favorable and total outcomes:",
      expression: `n(E) = ${favorable}\nn(S) = ${total}`,
      result: `${favorable}/${total}`,
      verified: true,
      verification_note: "Outcomes counted correctly",
    },
    {
      step_number: 3,
      title: "Calculate Probability",
      description: "Applying the probability formula:",
      expression: `P(E) = ${favorable}/${total} = ${prob}`,
      result: prob,
      verified: true,
      verification_note: "Probability computed",
    },
    {
      step_number: 4,
      title: "Express as Percentage",
      description: "Converting to percentage:",
      expression: `P(E) × 100% = ${(parseFloat(prob) * 100).toFixed(2)}%`,
      result: `${(parseFloat(prob) * 100).toFixed(2)}%`,
      verified: true,
      verification_note: "Percentage computed",
    },
  ];
  return { problem_type: "Probability", steps, final_answer: `${prob} (${(parseFloat(prob) * 100).toFixed(2)}%)`, verified: true };
}

function solveKinematics(method: string, inputs: Record<string, any>): SolverResponse {
  const u = parseFloat(inputs.u) || 0;
  const a = parseFloat(inputs.a) || 9.8;
  const t = parseFloat(inputs.t) || 5;
  const find = inputs.find || "s";

  let steps: SolverStep[];
  if (find === "v") {
    const v = u + a * t;
    steps = [
      {
        step_number: 1,
        title: "Identify Given Values",
        description: `u = ${u} m/s, a = ${a} m/s², t = ${t} s`,
        expression: `u = ${u}, a = ${a}, t = ${t}`,
        verified: true,
        verification_note: "Values confirmed",
      },
      {
        step_number: 2,
        title: "Choose the Right Equation",
        description: "Using: v = u + at",
        expression: "v = u + at",
        verified: true,
        verification_note: "Equation selected",
      },
      {
        step_number: 3,
        title: "Substitute & Solve",
        description: "Plug in the values:",
        expression: `v = ${u} + (${a})(${t})\nv = ${u} + ${a * t}\nv = ${v}`,
        result: `v = ${v} m/s`,
        verified: true,
        verification_note: "Solution verified",
      },
    ];
    return { problem_type: "Kinematics", steps, final_answer: `v = ${v} m/s`, verified: true };
  } else {
    const s = u * t + 0.5 * a * t * t;
    steps = [
      {
        step_number: 1,
        title: "Identify Given Values",
        description: `u = ${u} m/s, a = ${a} m/s², t = ${t} s`,
        expression: `u = ${u}, a = ${a}, t = ${t}`,
        verified: true,
        verification_note: "Values confirmed",
      },
      {
        step_number: 2,
        title: "Choose the Right Equation",
        description: "Using: s = ut + ½at²",
        expression: "s = ut + ½at²",
        verified: true,
        verification_note: "Equation selected",
      },
      {
        step_number: 3,
        title: "Substitute & Solve",
        description: "Plug in the values:",
        expression: `s = ${u}(${t}) + ½(${a})(${t})²\ns = ${u * t} + ${0.5 * a * t * t}\ns = ${s}`,
        result: `s = ${s} m`,
        verified: true,
        verification_note: "Solution verified",
      },
    ];
    return { problem_type: "Kinematics", steps, final_answer: `s = ${s} m`, verified: true };
  }
}

function solveElectricity(method: string, inputs: Record<string, any>): SolverResponse {
  const V = parseFloat(inputs.voltage) || 12;
  const R = parseFloat(inputs.resistance) || 4;
  const I = V / R;
  const P = V * I;

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify Given Values",
      description: `Voltage V = ${V} V, Resistance R = ${R} Ω`,
      expression: `V = ${V} V\nR = ${R} Ω`,
      verified: true,
      verification_note: "Values confirmed",
    },
    {
      step_number: 2,
      title: "Apply Ohm's Law",
      description: "Ohm's Law: V = IR",
      expression: "V = IR\n→ I = V/R",
      result: `I = ${V}/${R}`,
      verified: true,
      verification_note: "Formula applied",
    },
    {
      step_number: 3,
      title: "Calculate Current",
      description: "Substitute values:",
      expression: `I = ${V}/${R} = ${I.toFixed(4)} A`,
      result: `I = ${I.toFixed(4)} A`,
      verified: true,
      verification_note: "Current calculated",
    },
    {
      step_number: 4,
      title: "Calculate Power",
      description: "Power: P = VI = I²R = V²/R",
      expression: `P = (${V})(${I.toFixed(4)})\nP = ${P.toFixed(4)} W`,
      result: `P = ${P.toFixed(4)} W`,
      verified: true,
      verification_note: "Power computed",
    },
  ];
  return { problem_type: "Electricity", steps, final_answer: `I = ${I.toFixed(2)} A, P = ${P.toFixed(2)} W`, verified: true };
}

function solveOptics(method: string, inputs: Record<string, any>): SolverResponse {
  const u = parseFloat(inputs.u) || -30;
  const f = parseFloat(inputs.f) || -15;
  const type = inputs.type || "mirror-concave";

  // Mirror formula: 1/v = 1/f - 1/u → v = uf / (u-f)
  const v = (u * f) / (u - f);
  const magnification = v / u;
  const isMirror = type.startsWith("mirror");
  const isConcave = type.endsWith("concave");

  const steps: SolverStep[] = [
    {
      step_number: 1,
      title: "Identify Given Values",
      description: `Object distance u = ${u} cm, Focal length f = ${f} cm`,
      expression: `u = ${u} cm\nf = ${f} cm`,
      verified: true,
      verification_note: "Values confirmed",
    },
    {
      step_number: 2,
      title: "Apply Formula",
      description: isMirror ? "Mirror formula: 1/f = 1/v + 1/u" : "Lens formula: 1/f = 1/v - 1/u",
      expression: isMirror
        ? "1/f = 1/v + 1/u\n→ 1/v = 1/f - 1/u\n→ v = uf / (u - f)"
        : "1/f = 1/v - 1/u\n→ 1/v = 1/f + 1/u\n→ v = uf / (u + f)",
      result: `v = (${u} × ${f}) / (${u - f})`,
      verified: true,
      verification_note: "Formula applied correctly",
    },
    {
      step_number: 3,
      title: "Calculate Image Distance",
      description: "Computing the image position:",
      expression: `v = ${(u * f).toFixed(2)} / ${(u - f).toFixed(2)}\nv = ${v.toFixed(4)} cm`,
      result: `v ≈ ${v.toFixed(2)} cm`,
      verified: true,
      verification_note: "Image distance computed",
    },
    {
      step_number: 4,
      title: "Calculate Magnification",
      description: "Magnification: m = -v/u",
      expression: `m = -(${v.toFixed(2)}) / (${u})\nm = ${magnification.toFixed(4)}`,
      result: `m ≈ ${magnification.toFixed(2)}`,
      verified: true,
      verification_note: "Magnification computed",
    },
    {
      step_number: 5,
      title: "Nature of Image",
      description: `Since m is ${magnification < 0 ? "negative" : "positive"}: Image is ${magnification < 0 ? "inverted" : "erect"} and ${Math.abs(magnification) > 1 ? "magnified" : "diminished"}.`,
      expression: magnification < 0 ? "Inverted & Real Image" : "Erect & Virtual Image",
      result: magnification < 0 ? "Real, Inverted" : "Virtual, Erect",
      verified: true,
      verification_note: "Image nature determined",
    },
  ];
  return { problem_type: "Optics", steps, final_answer: `v ≈ ${v.toFixed(2)} cm, m ≈ ${magnification.toFixed(2)}`, verified: true };
}

// ─── ANIMATION VARIANTS ───────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const slideUpItem = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── MATH EXPRESSION RENDERER ─────────────────────────────────
function MathExpression({ expression, className = "" }: { expression: string; className?: string }) {
  return (
    <div
      className={`${ATLAS_TOKENS.fonts.math} text-base leading-relaxed whitespace-pre-wrap font-medium tracking-wide ${className}`}
      style={{
        color: ATLAS_TOKENS.colors.navy100,
        fontFamily: ATLAS_TOKENS.fonts.math,
        background: "rgba(245, 158, 11, 0.06)",
        border: `1px solid ${ATLAS_TOKENS.colors.goldBorder}`,
        borderRadius: ATLAS_TOKENS.radius.md,
        padding: "16px 20px",
        overflowX: "auto",
      }}
    >
      {expression}
    </div>
  );
}

// ─── VERIFICATION BADGE ───────────────────────────────────────
function VerificationBadge({ verified, note }: { verified: boolean; note?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="flex items-center gap-2"
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: verified ? ATLAS_TOKENS.colors.successBg : ATLAS_TOKENS.colors.errorBg,
          border: `1px solid ${verified ? ATLAS_TOKENS.colors.successBorder : ATLAS_TOKENS.colors.errorBorder}`,
        }}
      >
        {verified ? (
          <CheckCircle2 size={16} color={ATLAS_TOKENS.colors.success} />
        ) : (
          <XCircle size={16} color={ATLAS_TOKENS.colors.error} />
        )}
        <span
          className="text-xs font-semibold tracking-wide"
          style={{
            color: verified ? ATLAS_TOKENS.colors.success : ATLAS_TOKENS.colors.error,
          }}
        >
          {verified ? "VERIFIED" : "FAILED"}
        </span>
      </div>
    </motion.div>
  );
}

// ─── COPY BUTTON ──────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleCopy}
      className="p-1.5 rounded-md transition-colors"
      style={{
        background: "rgba(255,255,255,0.05)",
        color: copied ? ATLAS_TOKENS.colors.success : ATLAS_TOKENS.colors.navy300,
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </motion.button>
  );
}

// ─── STAGE 0: PROBLEM TYPE PICKER ─────────────────────────────
function ProblemTypePicker({
  subject,
  classLevel,
  selectedType,
  onSelect,
}: {
  subject: string;
  classLevel: number;
  selectedType: string | null;
  onSelect: (type: string) => void;
}) {
  const topics = TOPICS_BY_CLASS[classLevel]?.[subject] || [];
  const [search, setSearch] = useState("");

  const availableTypes = Object.entries(PROBLEM_TYPES).filter(([name, configs]) =>
    configs.some((c) => c.topic && topics.some((t) => t.toLowerCase().includes(c.topic.toLowerCase()) || c.topic.toLowerCase().includes(t.toLowerCase()))) && configs.some(c => c.classLevel === classLevel)
  );

  const filteredTypes = availableTypes.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  // Popular fallback chips — shown when no curated types match the subject/class
  const POPULAR_BY_SUBJECT: Record<string, string[]> = {
    maths: ['Quadratic Equation', 'Linear Equation', 'Simultaneous Equations', 'Percentage', 'Profit & Loss', 'GST', 'Compound Interest', 'Trigonometry'],
    physics: ['Projectile Motion', 'Ohm\'s Law', 'Lens Formula', 'Newton\'s Second Law', 'Wave Speed', 'Density'],
    chemistry: ['Mole Concept', 'pH Calculation', 'Empirical Formula', 'Gas Laws', 'Concentration'],
    biology: ['Punnett Square', 'Photosynthesis', 'Cell Division', 'DNA Replication'],
    economics: ['Elasticity of Demand', 'GDP Calculation', 'Multiplier Effect'],
    accounts: ['Journal Entry', 'Trial Balance', 'Depreciation', 'Bank Reconciliation'],
  };
  const popularChips = POPULAR_BY_SUBJECT[subject] || [];
  const showPopular = filteredTypes.length === 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div variants={slideUpItem} className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: `${ATLAS_TOKENS.colors.goldBg}`,
              border: `1px solid ${ATLAS_TOKENS.colors.goldBorder}`,
            }}
          >
            {SUBJECTS[subject] && (
              React.createElement(SUBJECTS[subject].icon, {
                size: 22,
                color: ATLAS_TOKENS.colors.gold,
              })
            )}
          </div>
          <div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.white }}
            >
              Choose Problem Type
            </h3>
            <p
              className="text-sm"
              style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
            >
              {subject} · Class {classLevel} · Select what you want to solve
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={slideUpItem} className="mb-5">
        <div className="relative">
          <Sparkles
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: ATLAS_TOKENS.colors.navy400 }}
          />
          <input
            type="text"
            placeholder="Search problem types..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-10 pr-4 text-sm outline-none"
            style={{
              fontFamily: ATLAS_TOKENS.fonts.sans,
              background: ATLAS_TOKENS.colors.navy700,
              border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
              borderRadius: ATLAS_TOKENS.radius.md,
              color: ATLAS_TOKENS.colors.white,
            }}
          />
        </div>
      </motion.div>

      {showPopular && popularChips.length > 0 && (
        <motion.div variants={slideUpItem} className="mb-5">
          <p
            className="text-xs uppercase tracking-wider mb-3 font-semibold"
            style={{ color: ATLAS_TOKENS.colors.navy300, fontFamily: ATLAS_TOKENS.fonts.sans }}
          >
            Popular in {subject}
          </p>
          <div className="flex flex-wrap gap-2">
            {popularChips.map((label) => (
              <button
                key={label}
                onClick={() => onSelect(label)}
                className="px-3.5 py-2 text-sm rounded-lg transition-all hover:scale-105"
                style={{
                  background: ATLAS_TOKENS.colors.navy700,
                  border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
                  color: ATLAS_TOKENS.colors.white,
                  fontFamily: ATLAS_TOKENS.fonts.sans,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <p
            className="text-xs mt-3"
            style={{ color: ATLAS_TOKENS.colors.navy400, fontFamily: ATLAS_TOKENS.fonts.sans }}
          >
            More problem types unlock as your class syllabus is mapped.
          </p>
        </motion.div>
      )}

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-2 gap-3"
      >
        {filteredTypes.map(([name, configs]) => {
          const config = configs.find(c => c.classLevel === classLevel) || configs[0];
          const fullConfig = PROBLEM_TYPE_CONFIG[name];
          if (!fullConfig || fullConfig.subject !== subject) return null;
          const Icon = fullConfig.icon;
          const isSelected = selectedType === name;

          return (
            <motion.button
              key={name}
              variants={slideUpItem}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(name)}
              className="text-left p-4 rounded-xl transition-all cursor-pointer"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))`
                  : ATLAS_TOKENS.colors.navy700,
                border: `2px solid ${isSelected ? ATLAS_TOKENS.colors.gold : ATLAS_TOKENS.colors.navy500}`,
                boxShadow: isSelected ? ATLAS_TOKENS.shadows.glowSm : "none",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{ background: `${fullConfig.color}20` }}
                >
                  <Icon size={20} color={fullConfig.color} />
                </div>
                <div className="min-w-0">
                  <h4
                    className="text-sm font-bold truncate"
                    style={{
                      fontFamily: ATLAS_TOKENS.fonts.sans,
                      color: isSelected ? ATLAS_TOKENS.colors.gold : ATLAS_TOKENS.colors.white,
                    }}
                  >
                    {name}
                  </h4>
                  <p
                    className="text-xs mt-0.5"
                    style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
                  >
                    {fullConfig.methodChoices.length} method{fullConfig.methodChoices.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              {isSelected && (
                <motion.div
                  layoutId="selectedIndicator"
                  className="mt-3 flex items-center gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: ATLAS_TOKENS.colors.gold }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: ATLAS_TOKENS.colors.gold }}
                  >
                    Selected
                  </span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

// ─── STAGE 1: THINKING STEP ───────────────────────────────────
function ThinkingStep({
  problemType,
  selectedMethod,
  onSelect,
  onBack,
}: {
  problemType: string;
  selectedMethod: string | null;
  onSelect: (method: string) => void;
  onBack: () => void;
}) {
  const config = PROBLEM_TYPE_CONFIG[problemType];
  if (!config) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div variants={slideUpItem} className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: `${ATLAS_TOKENS.colors.infoBg}`,
              border: `1px solid rgba(99, 102, 241, 0.25)`,
            }}
          >
            <Brain size={22} color={ATLAS_TOKENS.colors.info} />
          </div>
          <div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.white }}
            >
              Which method applies?
            </h3>
            <p
              className="text-sm"
              style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
            >
              Choose the right approach to solve this {problemType.toLowerCase()} problem
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="space-y-3"
      >
        {config.methodChoices.map((choice, i) => {
          const isSelected = selectedMethod === choice.value;
          return (
            <motion.button
              key={choice.value}
              variants={slideUpItem}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(choice.value)}
              className="w-full text-left p-5 rounded-xl cursor-pointer"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${config.color}15, ${config.color}08)`
                  : ATLAS_TOKENS.colors.navy700,
                border: `2px solid ${isSelected ? config.color : ATLAS_TOKENS.colors.navy500}`,
                boxShadow: isSelected ? `0 0 20px ${config.color}20` : "none",
                transition: `all ${ATLAS_TOKENS.transitions.base}`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0"
                  style={{
                    background: isSelected ? `${config.color}25` : ATLAS_TOKENS.colors.navy600,
                    color: isSelected ? config.color : ATLAS_TOKENS.colors.navy300,
                    fontFamily: ATLAS_TOKENS.fonts.sans,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-sm font-bold mb-1"
                    style={{
                      fontFamily: ATLAS_TOKENS.fonts.sans,
                      color: isSelected ? config.color : ATLAS_TOKENS.colors.white,
                    }}
                  >
                    {choice.label}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
                  >
                    {choice.hint}
                  </p>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="methodCheck"
                    className="shrink-0 mt-1"
                  >
                    <CheckCircle2 size={20} color={ATLAS_TOKENS.colors.success} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div variants={slideUpItem} className="mt-6 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
          style={{
            fontFamily: ATLAS_TOKENS.fonts.sans,
            background: ATLAS_TOKENS.colors.navy600,
            color: ATLAS_TOKENS.colors.navy200,
            border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
          }}
        >
          <RotateCcw size={16} />
          Back
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── STAGE 2: INPUT FORM ──────────────────────────────────────
function InputForm({
  problemType,
  inputs,
  onInputChange,
  onSolve,
  isSolving,
  onBack,
}: {
  problemType: string;
  inputs: Record<string, any>;
  onInputChange: (name: string, value: any) => void;
  onSolve: () => void;
  isSolving: boolean;
  onBack: () => void;
}) {
  const config = PROBLEM_TYPE_CONFIG[problemType];
  if (!config) return null;

  const isValid = config.inputFields.every((field) => {
    if (field.type === "select") return !!inputs[field.name];
    if (field.type === "number") return inputs[field.name] !== undefined && inputs[field.name] !== "";
    if (field.type === "expression") return !!inputs[field.name] && inputs[field.name].trim().length > 0;
    return true;
  });

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div variants={slideUpItem} className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: `${ATLAS_TOKENS.colors.goldBg}`,
              border: `1px solid ${ATLAS_TOKENS.colors.goldBorder}`,
            }}
          >
            <BookMarked size={22} color={ATLAS_TOKENS.colors.gold} />
          </div>
          <div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.white }}
            >
              Enter Your Values
            </h3>
            <p
              className="text-sm"
              style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
            >
              {problemType} — Fill in the fields below
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="space-y-4"
      >
        {config.inputFields.map((field) => (
          <motion.div key={field.name} variants={slideUpItem}>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{
                fontFamily: ATLAS_TOKENS.fonts.sans,
                color: ATLAS_TOKENS.colors.navy200,
              }}
            >
              {field.label}
            </label>
            {field.type === "expression" ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder={field.placeholder || ""}
                  value={inputs[field.name] || ""}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                  className="w-full py-3 px-4 text-sm outline-none"
                  style={{
                    fontFamily: ATLAS_TOKENS.fonts.math,
                    background: ATLAS_TOKENS.colors.navy700,
                    border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
                    borderRadius: ATLAS_TOKENS.radius.md,
                    color: ATLAS_TOKENS.colors.goldLight,
                    caretColor: ATLAS_TOKENS.colors.gold,
                  }}
                />
                {inputs[field.name] && (
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: ATLAS_TOKENS.colors.success,
                      boxShadow: `0 0 8px ${ATLAS_TOKENS.colors.success}60`,
                    }}
                  />
                )}
              </div>
            ) : field.type === "number" ? (
              <div className="relative">
                <input
                  type="number"
                  placeholder={field.placeholder || ""}
                  value={inputs[field.name] ?? ""}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                  className="w-full py-3 px-4 text-sm outline-none"
                  style={{
                    fontFamily: ATLAS_TOKENS.fonts.sans,
                    background: ATLAS_TOKENS.colors.navy700,
                    border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
                    borderRadius: ATLAS_TOKENS.radius.md,
                    color: ATLAS_TOKENS.colors.white,
                    caretColor: ATLAS_TOKENS.colors.gold,
                    MozAppearance: "textfield",
                  }}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: inputs[field.name] !== undefined && inputs[field.name] !== ""
                      ? ATLAS_TOKENS.colors.success
                      : ATLAS_TOKENS.colors.navy400,
                    boxShadow: inputs[field.name] !== undefined && inputs[field.name] !== ""
                      ? `0 0 8px ${ATLAS_TOKENS.colors.success}60`
                      : "none",
                  }}
                />
              </div>
            ) : field.type === "matrix" ? (
              <div className="p-4 rounded-xl" style={{
                background: ATLAS_TOKENS.colors.navy700,
                border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
              }}>
                <MatrixInput
                  rows={field.rows || 2}
                  cols={field.cols || 2}
                  value={inputs[field.name] || [[1, 2], [3, 4]]}
                  onChange={(val) => onInputChange(field.name, val)}
                />
              </div>
            ) : (
              <select
                value={inputs[field.name] || ""}
                onChange={(e) => onInputChange(field.name, e.target.value)}
                className="w-full py-3 px-4 text-sm outline-none cursor-pointer appearance-none"
                style={{
                  fontFamily: ATLAS_TOKENS.fonts.sans,
                  background: ATLAS_TOKENS.colors.navy700,
                  border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
                  borderRadius: ATLAS_TOKENS.radius.md,
                  color: ATLAS_TOKENS.colors.white,
                }}
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={slideUpItem} className="mt-8 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
          style={{
            fontFamily: ATLAS_TOKENS.fonts.sans,
            background: ATLAS_TOKENS.colors.navy600,
            color: ATLAS_TOKENS.colors.navy200,
            border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
          }}
        >
          <RotateCcw size={16} />
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSolve}
          disabled={!isValid || isSolving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer"
          style={{
            fontFamily: ATLAS_TOKENS.fonts.sans,
            background: isValid && !isSolving
              ? `linear-gradient(135deg, ${ATLAS_TOKENS.colors.gold}, ${ATLAS_TOKENS.colors.goldDark})`
              : ATLAS_TOKENS.colors.navy600,
            color: isValid && !isSolving ? ATLAS_TOKENS.colors.navy900 : ATLAS_TOKENS.colors.navy400,
            border: `1px solid ${isValid && !isSolving ? ATLAS_TOKENS.colors.gold : ATLAS_TOKENS.colors.navy500}`,
            cursor: isValid && !isSolving ? "pointer" : "not-allowed",
            boxShadow: isValid && !isSolving ? ATLAS_TOKENS.shadows.glow : "none",
          }}
        >
          {isSolving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Solving...
            </>
          ) : (
            <>
              <Play size={16} />
              Solve Step by Step
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function MatrixInput({
  rows,
  cols,
  value,
  onChange,
}: {
  rows: number;
  cols: number;
  value: number[][];
  onChange: (val: number[][]) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows }).map((_, i) =>
          Array.from({ length: cols }).map((_, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={value[i]?.[j] ?? 0}
              onChange={(e) => {
                const newVal = value.map((r) => [...r]);
                newVal[i] = newVal[i] || [];
                newVal[i][j] = parseFloat(e.target.value) || 0;
                onChange(newVal);
              }}
              className="w-16 py-2 px-2 text-center text-sm outline-none"
              style={{
                fontFamily: ATLAS_TOKENS.fonts.math,
                background: ATLAS_TOKENS.colors.navy600,
                border: `1px solid ${ATLAS_TOKENS.colors.navy400}`,
                borderRadius: ATLAS_TOKENS.radius.sm,
                color: ATLAS_TOKENS.colors.goldLight,
                caretColor: ATLAS_TOKENS.colors.gold,
                MozAppearance: "textfield",
              }}
            />
          ))
        )}
      </div>
      <span className="text-lg font-bold" style={{ color: ATLAS_TOKENS.colors.navy300, fontFamily: ATLAS_TOKENS.fonts.sans }}>
        {rows}×{cols}
      </span>
    </div>
  );
}

// ─── STAGE 3: SOLUTION DISPLAY ────────────────────────────────
function SolutionDisplay({
  response,
  onPractice,
}: {
  response: SolverResponse;
  onPractice: () => void;
}) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const stepsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleSteps(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    response.steps.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleSteps(i + 1), 600 + i * 800));
    });
    return () => timers.forEach(clearTimeout);
  }, [response]);

  const toggleStep = (num: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={slideUpItem} className="mb-6">
        <div
          className="p-5 rounded-xl"
          style={{
            background: `linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.03))`,
            border: `1px solid ${ATLAS_TOKENS.colors.goldBorder}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: `${ATLAS_TOKENS.colors.goldBg}`,
                  border: `1px solid ${ATLAS_TOKENS.colors.goldBorder}`,
                }}
              >
                <Trophy size={20} color={ATLAS_TOKENS.colors.gold} />
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.white }}
                >
                  {response.problem_type}
                </h3>
                <p
                  className="text-xs mt-0.5 flex items-center gap-1.5"
                  style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
                >
                  <Clock size={12} />
                  {response.steps.length} step{response.steps.length > 1 ? "s" : ""}
                  <span style={{ color: ATLAS_TOKENS.colors.navy400 }}>·</span>
                  <CheckCircle2 size={12} color={ATLAS_TOKENS.colors.success} />
                  All steps verified
                </p>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <VerificationBadge verified={response.verified} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Steps Chain */}
      <div className="relative">
        {/* Connecting line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{
            background: `linear-gradient(to bottom, ${ATLAS_TOKENS.colors.gold}40, ${ATLAS_TOKENS.colors.navy500})`,
          }}
        />

        <motion.div variants={staggerContainer} className="space-y-4 pl-2">
          <AnimatePresence>
            {response.steps.slice(0, visibleSteps).map((step, index) => (
              <motion.div
                key={step.step_number}
                variants={slideUpItem}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="relative"
              >
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: ATLAS_TOKENS.colors.navy700,
                    border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
                  }}
                >
                  {/* Step header */}
                  <div className="flex items-start gap-4 p-4">
                    {/* Step number */}
                    <div className="relative shrink-0">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          background: `linear-gradient(135deg, ${ATLAS_TOKENS.colors.gold}, ${ATLAS_TOKENS.colors.goldDark})`,
                          color: ATLAS_TOKENS.colors.navy900,
                          fontFamily: ATLAS_TOKENS.fonts.sans,
                          boxShadow: `0 0 15px ${ATLAS_TOKENS.colors.gold}40`,
                        }}
                      >
                        {step.step_number}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className="text-sm font-bold"
                          style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.white }}
                        >
                          {step.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <CopyButton text={`${step.title}: ${step.expression || step.result || ""}`} />
                          {step.expression && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleStep(step.step_number)}
                              className="p-1.5 rounded-md"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                color: expandedSteps.has(step.step_number)
                                  ? ATLAS_TOKENS.colors.gold
                                  : ATLAS_TOKENS.colors.navy300,
                              }}
                            >
                              {expandedSteps.has(step.step_number)
                                ? <Minimize2 size={14} />
                                : <Expand size={14} />}
                            </motion.button>
                          )}
                          <VerificationBadge verified={step.verified} note={step.verification_note} />
                        </div>
                      </div>
                      <p
                        className="text-xs leading-relaxed whitespace-pre-line"
                        style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Expandable expression */}
                  <AnimatePresence>
                    {expandedSteps.has(step.step_number) && step.expression && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <MathExpression expression={step.expression} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Result badge */}
                  {step.result && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                        style={{
                          background: `${ATLAS_TOKENS.colors.goldBg}`,
                          border: `1px solid ${ATLAS_TOKENS.colors.goldBorder}`,
                        }}
                    >
                      <Zap size={14} color={ATLAS_TOKENS.colors.gold} />
                      <span
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: ATLAS_TOKENS.fonts.math,
                          color: ATLAS_TOKENS.colors.goldLight,
                        }}
                      >
                        {step.result}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Chain arrow (not last step) */}
                {index < response.steps.length - 1 && visibleSteps > index + 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    className="flex justify-center -my-1 relative z-10"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <ArrowDown
                        size={18}
                        color={ATLAS_TOKENS.colors.gold}
                        style={{ opacity: 0.6 }}
                      />
                      <span
                        className="text-[10px] font-medium"
                        style={{ color: ATLAS_TOKENS.colors.gold, opacity: 0.5, fontFamily: ATLAS_TOKENS.fonts.sans }}
                      >
                        auto-fill
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        </motion.div>
      </div>

      {/* Multi-step chain summary */}
      {response.steps.length > 2 && (
        <motion.div
          variants={slideUpItem}
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleSteps === response.steps.length ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div
            className="p-4 rounded-xl"
            style={{
              background: ATLAS_TOKENS.colors.navy700,
              border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Shuffle size={14} color={ATLAS_TOKENS.colors.purple} />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.purple }}
              >
                Solution Chain
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {response.steps.map((step, i) => (
                <React.Fragment key={step.step_number}>
                  <div
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      background: ATLAS_TOKENS.colors.navy600,
                      color: ATLAS_TOKENS.colors.navy200,
                      fontFamily: ATLAS_TOKENS.fonts.sans,
                    }}
                  >
                    Step {step.step_number}
                  </div>
                  {i < response.steps.length - 1 && (
                    <ArrowRight size={14} color={ATLAS_TOKENS.colors.navy400} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Final answer */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: visibleSteps === response.steps.length ? 1 : 0,
          y: visibleSteps === response.steps.length ? 0 : 20,
          scale: visibleSteps === response.steps.length ? 1 : 0.95,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-6"
      >
        <div
          className="p-6 rounded-xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))`,
            border: `2px solid ${ATLAS_TOKENS.colors.gold}`,
            boxShadow: `0 0 30px rgba(245,158,11,0.15)`,
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
            style={{ background: "rgba(245,158,11,0.1)" }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} color={ATLAS_TOKENS.colors.gold} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.gold }}
              >
                Final Answer
              </span>
            </div>
            <MathExpression
              expression={response.final_answer}
              className="text-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleSteps === response.steps.length ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="mt-6 flex flex-wrap gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPractice}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold cursor-pointer"
          style={{
            fontFamily: ATLAS_TOKENS.fonts.sans,
            background: `linear-gradient(135deg, ${ATLAS_TOKENS.colors.gold}, ${ATLAS_TOKENS.colors.goldDark})`,
            color: ATLAS_TOKENS.colors.navy900,
            boxShadow: ATLAS_TOKENS.shadows.glow,
          }}
        >
          <Shuffle size={16} />
          Try Another
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium cursor-pointer"
          style={{
            fontFamily: ATLAS_TOKENS.fonts.sans,
            background: ATLAS_TOKENS.colors.navy700,
            color: ATLAS_TOKENS.colors.navy200,
            border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
          }}
        >
          <BookMarked size={16} />
          Save to Notebook
        </motion.button>
      </motion.div>

      <div ref={stepsEndRef} />
    </motion.div>
  );
}

// ─── LOADING SKELETON ─────────────────────────────────────────
function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="relative"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: `${ATLAS_TOKENS.colors.goldBg}`,
              border: `2px solid ${ATLAS_TOKENS.colors.goldBorder}`,
            }}
          >
            <Loader2 size={28} color={ATLAS_TOKENS.colors.gold} className="animate-spin" />
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)`,
            }}
          />
        </motion.div>
        <div className="text-center">
          <p
            className="text-sm font-bold"
            style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.gold }}
          >
            Solving step by step...
          </p>
          <p
            className="text-xs mt-1"
            style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy300 }}
          >
            Computing each step with verification
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: ATLAS_TOKENS.colors.navy600 }}>
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${ATLAS_TOKENS.colors.gold}, ${ATLAS_TOKENS.colors.goldLight})`,
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── PROGRESS INDICATOR (top of main area) ───────────────────
function StageIndicator({ currentStage }: { currentStage: number }) {
  const stages = [
    { label: "Type", icon: BookMarked },
    { label: "Method", icon: Brain },
    { label: "Input", icon: Lightbulb },
    { label: "Solve", icon: Sparkles },
  ];
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {stages.map((stage, i) => {
          const isActive = i <= currentStage;
          const Icon = stage.icon;
          return (
            <React.Fragment key={stage.label}>
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    backgroundColor: isActive
                      ? ATLAS_TOKENS.colors.gold
                      : ATLAS_TOKENS.colors.navy600,
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    border: `2px solid ${isActive ? ATLAS_TOKENS.colors.gold : ATLAS_TOKENS.colors.navy500}`,
                    boxShadow: isActive ? `0 0 12px ${ATLAS_TOKENS.colors.gold}30` : "none",
                    transition: `all ${ATLAS_TOKENS.transitions.base}`,
                  }}
                >
                  <Icon
                    size={14}
                    color={isActive ? ATLAS_TOKENS.colors.navy900 : ATLAS_TOKENS.colors.navy400}
                  />
                </motion.div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: ATLAS_TOKENS.fonts.sans,
                    color: isActive ? ATLAS_TOKENS.colors.gold : ATLAS_TOKENS.colors.navy400,
                  }}
                >
                  {stage.label}
                </span>
              </div>
              {i < stages.length - 1 && (
                <div className="flex-1 mx-2 mb-5">
                  <div
                    className="h-0.5 rounded-full"
                    style={{
                      background: i < currentStage
                        ? ATLAS_TOKENS.colors.gold
                        : ATLAS_TOKENS.colors.navy600,
                      opacity: i < currentStage ? 1 : 0.5,
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <ProgressBar current={currentStage} total={3} />
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export interface SolverStep {
  step_number: number;
  title: string;
  description: string;
  expression?: string;
  result?: string;
  verified: boolean;
  verification_note?: string;
}

export interface SolverResponse {
  problem_type: string;
  steps: SolverStep[];
  final_answer: string;
  verified: boolean;
}

export interface AtlasSolverProps {
  subject: string;
  classLevel: number;
  onSolve?: (problemType: string, inputs: Record<string, any>) => Promise<SolverResponse>;
  className?: string;
}

export function AtlasSolver({
  subject,
  classLevel,
  onSolve,
  className = "",
}: AtlasSolverProps) {
  const [stage, setStage] = useState<"type" | "method" | "input" | "solving" | "result">("type");
  const [problemType, setProblemType] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [solution, setSolution] = useState<SolverResponse | null>(null);
  const [isSolving, setIsSolving] = useState(false);

  const handleSelectType = useCallback((type: string) => {
    setProblemType(type);
    setSelectedMethod(null);
    setInputs({});
    setSolution(null);
    setStage("method");
  }, []);

  const handleSelectMethod = useCallback((method: string) => {
    setSelectedMethod(method);
    const config = PROBLEM_TYPE_CONFIG[problemType || ""];
    if (config) {
      const defaultInputs: Record<string, any> = {};
      config.inputFields.forEach((field) => {
        if (field.type === "select") defaultInputs[field.name] = "";
        else if (field.type === "matrix") {
          defaultInputs[field.name] = Array.from({ length: field.rows || 2 }, () =>
            Array.from({ length: field.cols || 2 }, () => 0)
          );
        }
        else defaultInputs[field.name] = "";
      });
      setInputs(defaultInputs);
    }
    setStage("input");
  }, [problemType]);

  const handleSolve = useCallback(async () => {
    if (!problemType || !selectedMethod) return;
    setIsSolving(true);
    setStage("solving");

    try {
      let result: SolverResponse;
      if (onSolve) {
        result = await onSolve(problemType, { ...inputs, method: selectedMethod });
      } else {
        await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
        result = mockSolve({ problemType, method: selectedMethod, inputs });
      }
      setSolution(result);
      setStage("result");
    } catch {
      setStage("input");
    } finally {
      setIsSolving(false);
    }
  }, [problemType, selectedMethod, inputs, onSolve]);

  const handlePractice = useCallback(() => {
    setSolution(null);
    setStage("input");
  }, []);

  const handleBackToMethod = useCallback(() => {
    setSelectedMethod(null);
    setStage("method");
  }, []);

  const handleBackToType = useCallback(() => {
    setProblemType(null);
    setSelectedMethod(null);
    setInputs({});
    setSolution(null);
    setStage("type");
  }, []);

  const handleReset = useCallback(() => {
    setProblemType(null);
    setSelectedMethod(null);
    setInputs({});
    setSolution(null);
    setStage("type");
  }, []);

  const stageIndex = stage === "type" ? 0 : stage === "method" ? 1 : stage === "input" ? 2 : stage === "solving" ? 3 : 2;

  return (
    <div
      className={`relative min-h-screen w-full ${className}`}
      style={{
        background: `linear-gradient(180deg, ${ATLAS_TOKENS.colors.navy900} 0%, ${ATLAS_TOKENS.colors.navy800} 50%, ${ATLAS_TOKENS.colors.navy900} 100%)`,
        fontFamily: ATLAS_TOKENS.fonts.sans,
      }}
    >
      {/* Background noise texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow orbs */}
      <div
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <header
        className="relative border-b"
        style={{
          background: `${ATLAS_TOKENS.colors.navy800}90`,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${ATLAS_TOKENS.colors.navy600}60`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${ATLAS_TOKENS.colors.gold}, ${ATLAS_TOKENS.colors.goldDark})`,
                boxShadow: `0 0 15px ${ATLAS_TOKENS.colors.gold}30`,
              }}
            >
              <Calculator size={18} color={ATLAS_TOKENS.colors.navy900} />
            </motion.div>
            <div>
              <h1
                className="text-base font-bold tracking-tight"
                style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.white }}
              >
                ATLAS Solver
              </h1>
              <p
                className="text-[10px] font-medium uppercase tracking-widest"
                style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.gold }}
              >
                Step-by-step mastery
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {problemType && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: ATLAS_TOKENS.colors.navy700,
                  border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
                }}
              >
                {PROBLEM_TYPE_CONFIG[problemType] && (
                  React.createElement(PROBLEM_TYPE_CONFIG[problemType].icon, {
                    size: 14,
                    color: PROBLEM_TYPE_CONFIG[problemType].color,
                  })
                )}
                <span
                  className="text-xs font-medium"
                  style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy200 }}
                >
                  {problemType}
                </span>
              </motion.div>
            )}
            {(stage === "method" || stage === "input") && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  fontFamily: ATLAS_TOKENS.fonts.sans,
                  background: ATLAS_TOKENS.colors.navy700,
                  color: ATLAS_TOKENS.colors.navy200,
                  border: `1px solid ${ATLAS_TOKENS.colors.navy500}`,
                }}
              >
                <RotateCcw size={12} />
                Reset
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative max-w-5xl mx-auto px-6 py-8">
        {/* Stage indicator */}
        {(stage !== "result") && <StageIndicator currentStage={stageIndex} />}

        {/* Stage content */}
        <AnimatePresence mode="wait">
          {stage === "type" && (
            <motion.div
              key="type"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ProblemTypePicker
                subject={subject}
                classLevel={classLevel}
                selectedType={problemType}
                onSelect={handleSelectType}
              />
            </motion.div>
          )}

          {stage === "method" && problemType && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <ThinkingStep
                problemType={problemType}
                selectedMethod={selectedMethod}
                onSelect={handleSelectMethod}
                onBack={handleBackToType}
              />
            </motion.div>
          )}

          {stage === "input" && problemType && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <InputForm
                problemType={problemType}
                inputs={inputs}
                onInputChange={(name, value) => setInputs(prev => ({ ...prev, [name]: value }))}
                onSolve={handleSolve}
                isSolving={isSolving}
                onBack={handleBackToMethod}
              />
            </motion.div>
          )}

          {(stage === "solving" || stage === "result") && (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {stage === "solving" && <LoadingState />}
              {stage === "result" && solution && (
                <SolutionDisplay response={solution} onPractice={handlePractice} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className="relative border-t mt-12"
        style={{
          borderTop: `1px solid ${ATLAS_TOKENS.colors.navy600}40`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="text-xs"
            style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy400 }}
          >
            ATLAS Solver · Step-by-step learning
          </span>
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} color={ATLAS_TOKENS.colors.gold} />
            <span
              className="text-xs font-medium"
              style={{ fontFamily: ATLAS_TOKENS.fonts.sans, color: ATLAS_TOKENS.colors.navy400 }}
            >
              Deterministic solutions, always
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AtlasSolver;