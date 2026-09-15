"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  useStartDiagnostic,
  useSubmitDiagnostic,
  useDiagnosticResult,
  useRemediationPath,
  type DiagnosticQuestion,
  type DiagnosticResult,
  type RemediationPath,
  type Subject as DiagSubject,
} from "@/services/diagnostic.service";
import { useAuthStore } from "@/stores/authStore";

// ─── Types ────────────────────────────────────────────────────────────────

type Subject = "math" | "science" | "english";
type Phase = "setup" | "active" | "calculating" | "results" | "remediation";

type Difficulty = "easy" | "medium" | "hard";

type QuestionType = "mcq" | "math";

interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  subject: Subject;
  chapter: string;
  subskill: string;
  stem: string;
  options?: string[];
  correctAnswer: number | string;
  explanation: string;
  misconception?: string;
}

interface SubskillResult {
  name: string;
  mastery: number;
  correct: number;
  total: number;
  isStrong: boolean;
  misconception?: string;
}

interface RemediationStep {
  day: number;
  title: string;
  description: string;
  activity: string;
  duration: string;
  completed: boolean;
}

// ─── i18n ──────────────────────────────────────────────────────────────────

const translations = {
  en: {
    selectSubject: "Select Subject",
    selectChapter: "Select Chapter",
    startDiagnostic: "Start Diagnostic",
    timeEstimate: "⏱️ This will take about 15 minutes.",
    subtitle: "We'll find out what you know and what you need to learn.",
    ready: "Ready?",
    math: "Mathematics",
    science: "Science",
    english: "English",
    chapters_math: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
    chapters_science: ["Physics", "Chemistry", "Biology"],
    chapters_english: ["Grammar", "Comprehension", "Writing"],
    question: "Question",
    of: "of",
    submit: "Submit",
    next: "Next",
    timeRemaining: "Time",
    resultsTitle: "Your Diagnostic Results",
    overallMastery: "Overall Mastery",
    strongAreas: "💪 Strong Areas",
    weakAreas: "📚 Needs Practice",
    misconceptions: "⚠️ Misconceptions Identified",
    remediationPath: "🗺️ Your Remediation Path",
    startRemediation: "Start Remediation",
    retakeDiagnostic: "Retake Diagnostic",
    masteryHigh: "Excellent!",
    masteryMedium: "Good Progress",
    masteryLow: "Let's Build Up",
    remediationTitle: "Your Learning Plan",
    day: "Day",
    minutes: "min",
    startActivity: "Start",
    completed: "Done",
    backToResults: "Back to Results",
    calculating: "Calculating results...",
    correct: "correct",
    incorrect: "incorrect",
    explanation: "Explanation",
    subskillLabel: "Subskill",
    questionsLabel: "questions",
    masteryPercent: "% mastery",
    yourProgress: "Your Progress",
    activityLabel: "Activity",
    durationLabel: "Duration",
    notAttempted: "Not attempted",
    diagnosticComplete: "Diagnostic Complete!",
    selectSubjectFirst: "Please select a subject first.",
    selectChapterFirst: "Please select a chapter.",
    confirmQuit: "Are you sure you want to quit? Progress will be lost.",
    yes: "Yes",
    no: "No",
    quit: "Quit",
    langLabel: "Language",
    offlineReady: "✅ Available offline",
  },
  hi: {
    selectSubject: "विषय चुनें",
    selectChapter: "अध्याय चुनें",
    startDiagnostic: "डायग्नोस्टिक शुरू करें",
    timeEstimate: "⏱️ इसमें लगभग 15 मिनट लगेंगे।",
    subtitle: "हम यह पता लगाएंगे कि आप क्या जानते हैं और क्या सीखने की आवश्यकता है।",
    ready: "तैयार हैं?",
    math: "गणित",
    science: "विज्ञान",
    english: "अंग्रेजी",
    chapters_math: ["बीजगणित", "ज्यामिति", "त्रिकोणमिति", "कैलकुलस"],
    chapters_science: ["भौतिकी", "रसायन", "जीव विज्ञान"],
    chapters_english: ["व्याकरण", "पठन", "लेखन"],
    question: "प्रश्न",
    of: "का",
    submit: "जमा करें",
    next: "अगला",
    timeRemaining: "समय",
    resultsTitle: "आपके डायग्नोस्टिक परिणाम",
    overallMastery: "कुल मास्टरी",
    strongAreas: "💪 मजबूत क्षेत्र",
    weakAreas: "📚 अभ्यास की आवश्यकता",
    misconceptions: "⚠️ गलत धारणाएं",
    remediationPath: "🗺️ आपकी सुधार योजना",
    startRemediation: "सुधार शुरू करें",
    retakeDiagnostic: "दोबारा परीक्षण करें",
    masteryHigh: "उत्कृष्ट!",
    masteryMedium: "अच्छी प्रगति",
    masteryLow: "आइए मजबूत करें",
    remediationTitle: "आपकी सीखने की योजना",
    day: "दिन",
    minutes: "मिनट",
    startActivity: "शुरू करें",
    completed: "पूर्ण",
    backToResults: " परिणाम पर वापस",
    calculating: "परिणाम गणना हो रहे हैं...",
    correct: "सही",
    incorrect: "गलत",
    explanation: "व्याख्या",
    subskillLabel: "उपकौशल",
    questionsLabel: "प्रश्न",
    masteryPercent: "% मास्टरी",
    yourProgress: "आपकी प्रगति",
    activityLabel: "गतिविधि",
    durationLabel: "अवधि",
    notAttempted: "प्रयास नहीं किया गया",
    diagnosticComplete: "डायग्नोस्टिक पूर्ण!",
    selectSubjectFirst: "कृपया पहले विषय चुनें।",
    selectChapterFirst: "कृपया एक अध्याय चुनें।",
    confirmQuit: "क्या आप वाकई छोड़ना चाहते हैं? प्रगति खो जाएगी।",
    yes: "हां",
    no: "नहीं",
    quit: "छोड़ें",
    langLabel: "भाषा",
    offlineReady: "✅ ऑफलाइन उपलब्ध",
  },
  hinglish: {
    selectSubject: "Subject Choose Karo",
    selectChapter: "Chapter Choose Karo",
    startDiagnostic: "Diagnostic Shuru Karo",
    timeEstimate: "⏱️ Ismein 15 minute lagenge.",
    subtitle: "Hum batayenge ki aap kya jaante ho aur kya seekhne ki zaroorat hai.",
    ready: "Ready Ho?",
    math: "Mathematics",
    science: "Science",
    english: "English",
    chapters_math: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
    chapters_science: ["Physics", "Chemistry", "Biology"],
    chapters_english: ["Grammar", "Comprehension", "Writing"],
    question: "Question",
    of: "of",
    submit: "Submit",
    next: "Next",
    timeRemaining: "Time",
    resultsTitle: "Aapke Diagnostic Results",
    overallMastery: "Overall Mastery",
    strongAreas: "💪 Strong Areas",
    weakAreas: "📚 Practice Chahiye",
    misconceptions: "⚠️ Galat Samajh",
    remediationPath: "🗺️ Aapki Learning Plan",
    startRemediation: "Remediation Shuru Karo",
    retakeDiagnostic: "Phir Se Test Karo",
    masteryHigh: "Bahut Badhiya!",
    masteryMedium: "Achha Progress",
    masteryLow: "Chalo Thoda Mehnat Karte Hain",
    remediationTitle: "Aapki Seekhne Ki Plan",
    day: "Din",
    minutes: "min",
    startActivity: "Shuru Karo",
    completed: "Done",
    backToResults: "Results Par Wapas",
    calculating: "Results calculate ho rahe hain...",
    correct: "Sahi",
    incorrect: "Galat",
    explanation: "Explanation",
    subskillLabel: "Subskill",
    questionsLabel: "questions",
    masteryPercent: "% mastery",
    yourProgress: "Tumhari Progress",
    activityLabel: "Activity",
    durationLabel: "Duration",
    notAttempted: "Try nahi kiya",
    diagnosticComplete: "Diagnostic Complete!",
    selectSubjectFirst: "Pehle subject choose karo.",
    selectChapterFirst: "Ek chapter choose karo.",
    confirmQuit: "Quit karoge? Progress lost ho jayegi.",
    yes: "Haan",
    no: "Nahi",
    quit: "Quit",
    langLabel: "Language",
    offlineReady: "✅ Offline Available",
  },
} as const;

type Lang = keyof typeof translations;
type Translation = (typeof translations)[Lang];

const LANG_ORDER: Lang[] = ["en", "hinglish", "hi"];

// ─── Question Bank ─────────────────────────────────────────────────────────

const QUESTION_BANK: Record<Subject, Record<string, Question[]>> = {
  math: {
    Algebra: [
      {
        id: "m-a-1", type: "mcq", difficulty: "easy", subject: "math", chapter: "Algebra", subskill: "Linear Equations",
        stem: "Solve for $x$: $2x + 5 = 13$",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "Subtract 5 from both sides: $2x = 8$, then divide by 2: $x = 4$.",
        misconception: "Some students forget to divide both sides equally.",
      },
      {
        id: "m-a-2", type: "mcq", difficulty: "medium", subject: "math", chapter: "Algebra", subskill: "Linear Equations",
        stem: "If $3x - 7 = 2x + 5$, what is $x$?",
        options: ["2", "10", "12", "-2"],
        correctAnswer: 2,
        explanation: "Subtract $2x$ from both sides: $x - 7 = 5$, add 7: $x = 12$.",
        misconception: "Students often get signs wrong when moving terms across.",
      },
      {
        id: "m-a-3", type: "math", difficulty: "hard", subject: "math", chapter: "Algebra", subskill: "Quadratic Equations",
        stem: "Solve: $x^2 - 5x + 6 = 0$",
        correctAnswer: "x=2, x=3",
        explanation: "Factor: $(x-2)(x-3) = 0$, so $x = 2$ or $x = 3$.",
        misconception: "Students may plug in answers instead of factoring.",
      },
      {
        id: "m-a-4", type: "mcq", difficulty: "medium", subject: "math", chapter: "Algebra", subskill: "Polynomials",
        stem: "What is $(x + 3)(x - 2)$ expanded?",
        options: ["$x^2 + x - 6$", "$x^2 - x - 6$", "$x^2 + 5x - 6$", "$x^2 + x + 6$"],
        correctAnswer: 0,
        explanation: "$x^2 - 2x + 3x - 6 = x^2 + x - 6$",
      },
      {
        id: "m-a-5", type: "mcq", difficulty: "easy", subject: "math", chapter: "Algebra", subskill: "Linear Equations",
        stem: "Which equation has slope 2 and y-intercept 3?",
        options: ["$y = 2x + 3$", "$y = 3x + 2$", "$y = 2x - 3$", "$y = 3x - 2$"],
        correctAnswer: 0,
        explanation: "Slope-intercept form is $y = mx + b$ where $m=2, b=3$.",
      },
    ],
    Geometry: [
      {
        id: "m-g-1", type: "mcq", difficulty: "easy", subject: "math", chapter: "Geometry", subskill: "Triangles",
        stem: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
        explanation: "The sum of interior angles in any triangle is 180°.",
        misconception: "Some students think it's 90° confusing it with a right angle.",
      },
      {
        id: "m-g-2", type: "math", difficulty: "medium", subject: "math", chapter: "Geometry", subskill: "Area",
        stem: "Find the area of a circle with radius $r = 7$ cm (use $\pi \approx \frac{22}{7}$).",
        correctAnswer: "154",
        explanation: "Area = $\pi r^2 = \frac{22}{7} \times 49 = 154$ cm²",
        misconception: "Using diameter instead of radius in formula.",
      },
      {
        id: "m-g-3", type: "mcq", difficulty: "hard", subject: "math", chapter: "Geometry", subskill: "Similarity",
        stem: "Two triangles are similar. Sides of first are 3, 4, 5. Corresponding side of second is 6. What is its perimeter?",
        options: ["12", "18", "24", "30"],
        correctAnswer: 1,
        explanation: "Scale factor is $6/3 = 2$. Perimeter of first = 12. Second = $12 \times 2 = 24$. Wait — 3+4+5=12, scaled = 24.",
      },
      {
        id: "m-g-4", type: "mcq", difficulty: "easy", subject: "math", chapter: "Geometry", subskill: "Triangles",
        stem: "In a right triangle, if two angles are 30° and 60°, what is the third angle?",
        options: ["30°", "60°", "90°", "45°"],
        correctAnswer: 2,
        explanation: "Sum of angles = 180°, so $180 - 30 - 60 = 90°$. Also definition of right triangle.",
      },
      {
        id: "m-g-5", type: "mcq", difficulty: "medium", subject: "math", chapter: "Geometry", subskill: "Circles",
        stem: "The diameter of a circle is 14 cm. What is its circumference?",
        options: ["22 cm", "44 cm", "14 cm", "28 cm"],
        correctAnswer: 1,
        explanation: "Circumference = $\pi d = \frac{22}{7} \times 14 = 44$ cm",
      },
    ],
    Trigonometry: [
      {
        id: "m-t-1", type: "mcq", difficulty: "easy", subject: "math", chapter: "Trigonometry", subskill: "Ratios",
        stem: "What is $\sin(30°)$?",
        options: ["$\frac{1}{2}$", "$\frac{\sqrt{3}}{2}$", "$\frac{\sqrt{2}}{2}$", "1"],
        correctAnswer: 0,
        explanation: "$\sin(30°) = \frac{1}{2}$ is a fundamental trigonometric value.",
      },
      {
        id: "m-t-2", type: "mcq", difficulty: "medium", subject: "math", chapter: "Trigonometry", subskill: "Identities",
        stem: "What is $\sin^2\theta + \cos^2\theta$?",
        options: ["0", "1", "2", "$\tan\theta$"],
        correctAnswer: 1,
        explanation: "This is the Pythagorean identity: $\sin^2\theta + \cos^2\theta = 1$.",
      },
      {
        id: "m-t-3", type: "math", difficulty: "hard", subject: "math", chapter: "Trigonometry", subskill: "Applications",
        stem: "A ladder 10 m long leans against a wall at 60°. Find the height it reaches. (Use $\sin 60° = \frac{\sqrt{3}}{2}$)",
        correctAnswer: "$5\sqrt{3}$",
        explanation: "Height = $10 \times \sin(60°) = 10 \times \frac{\sqrt{3}}{2} = 5\sqrt{3}$ m",
        misconception: "Confusing sine and cosine when choosing the ratio.",
      },
    ],
    Calculus: [
      {
        id: "m-c-1", type: "mcq", difficulty: "medium", subject: "math", chapter: "Calculus", subskill: "Derivatives",
        stem: "What is the derivative of $x^3$?",
        options: ["$3x^2$", "$x^2$", "$3x$", "$3x^3$"],
        correctAnswer: 0,
        explanation: "Using the power rule: $\frac{d}{dx}(x^n) = nx^{n-1}$, so $3x^2$.",
      },
      {
        id: "m-c-2", type: "math", difficulty: "hard", subject: "math", chapter: "Calculus", subskill: "Integration",
        stem: "Evaluate: $\int x^2 \, dx$",
        correctAnswer: "$\frac{x^3}{3} + C$",
        explanation: "Using power rule for integration: $\int x^n dx = \frac{x^{n+1}}{n+1} + C$",
      },
    ],
  },
  science: {
    Physics: [
      {
        id: "s-p-1", type: "mcq", difficulty: "easy", subject: "science", chapter: "Physics", subskill: "Motion",
        stem: "What is the SI unit of velocity?",
        options: ["m/s", "m/s²", "km/h", "m"],
        correctAnswer: 0,
        explanation: "Velocity = displacement/time, so SI unit is m/s.",
      },
      {
        id: "s-p-2", type: "mcq", difficulty: "medium", subject: "science", chapter: "Physics", subskill: "Force",
        stem: "Newton's second law: $F = ma$. If mass is doubled and force constant, acceleration becomes?",
        options: ["Same", "Double", "Half", "Quadruple"],
        correctAnswer: 2,
        explanation: "$a = F/m$, so if $m$ doubles, $a$ becomes half.",
        misconception: "Students often think more mass means more acceleration.",
      },
      {
        id: "s-p-3", type: "mcq", difficulty: "easy", subject: "science", chapter: "Physics", subskill: "Energy",
        stem: "What type of energy does a stretched rubber band have?",
        options: ["Kinetic", "Potential", "Thermal", "Sound"],
        correctAnswer: 1,
        explanation: "A stretched rubber band stores elastic potential energy.",
      },
    ],
    Chemistry: [
      {
        id: "s-c-1", type: "mcq", difficulty: "easy", subject: "science", chapter: "Chemistry", subskill: "Atomic Structure",
        stem: "What is the atomic number of Carbon?",
        options: ["4", "6", "12", "14"],
        correctAnswer: 1,
        explanation: "Carbon has 6 protons, so atomic number = 6.",
      },
      {
        id: "s-c-2", type: "mcq", difficulty: "medium", subject: "science", chapter: "Chemistry", subskill: "Chemical Reactions",
        stem: "What type of reaction is $A + B \rightarrow AB$?",
        options: ["Decomposition", "Combination", "Displacement", "Double displacement"],
        correctAnswer: 1,
        explanation: "Two reactants combining to form one product is a combination reaction.",
      },
      {
        id: "s-c-3", type: "math", difficulty: "hard", subject: "science", chapter: "Chemistry", subskill: "Stoichiometry",
        stem: "In the reaction $2H_2 + O_2 \rightarrow 2H_2O$, how many moles of water are produced from 3 moles of $H_2$?",
        correctAnswer: "3",
        explanation: "From stoichiometry: 2 moles H₂ → 2 moles H₂O, so 3 moles H₂ → 3 moles H₂O.",
      },
    ],
    Biology: [
      {
        id: "s-b-1", type: "mcq", difficulty: "easy", subject: "science", chapter: "Biology", subskill: "Cells",
        stem: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correctAnswer: 1,
        explanation: "Mitochondria produce ATP through cellular respiration.",
      },
      {
        id: "s-b-2", type: "mcq", difficulty: "medium", subject: "science", chapter: "Biology", subskill: "Photosynthesis",
        stem: "Which gas is released during photosynthesis?",
        options: ["CO₂", "O₂", "N₂", "H₂"],
        correctAnswer: 1,
        explanation: "Plants release oxygen as a byproduct of photosynthesis.",
      },
      {
        id: "s-b-3", type: "mcq", difficulty: "hard", subject: "science", chapter: "Biology", subskill: "Genetics",
        stem: "What is the probability of getting a homozygous dominant offspring from two heterozygous parents?",
        options: ["0%", "25%", "50%", "75%"],
        correctAnswer: 1,
        explanation: "Punnett square shows 1/4 (25%) chance of homozygous dominant.",
      },
    ],
  },
  english: {
    Grammar: [
      {
        id: "e-g-1", type: "mcq", difficulty: "easy", subject: "english", chapter: "Grammar", subskill: "Tenses",
        stem: "She ___ to school every day.",
        options: ["go", "goes", "going", "gone"],
        correctAnswer: 1,
        explanation: "Third person singular in present simple adds -s: 'goes'.",
      },
      {
        id: "e-g-2", type: "mcq", difficulty: "medium", subject: "english", chapter: "Grammar", subskill: "Parts of Speech",
        stem: 'Identify the adjective: "The quick brown fox jumps."',
        options: ["quick", "fox", "jumps", "the"],
        correctAnswer: 0,
        explanation: "Adjectives describe nouns. 'Quick' describes the fox.",
      },
      {
        id: "e-g-3", type: "mcq", difficulty: "hard", subject: "english", chapter: "Grammar", subskill: "Conditionals",
        stem: "If I ___ rich, I would travel the world. (Second conditional)",
        options: ["am", "was", "were", "be"],
        correctAnswer: 2,
        explanation: "Second conditional uses 'were' for all subjects (subjunctive).",
      },
    ],
    Comprehension: [
      {
        id: "e-co-1", type: "mcq", difficulty: "easy", subject: "english", chapter: "Comprehension", subskill: "Reading",
        stem: "What is the main idea of a paragraph?",
        options: ["The last sentence", "The central thought", "A supporting detail", "A question"],
        correctAnswer: 1,
        explanation: "The main idea is the central thought the paragraph conveys.",
      },
      {
        id: "e-co-2", type: "mcq", difficulty: "medium", subject: "english", chapter: "Comprehension", subskill: "Inference",
        stem: "If a character is described as having 'a forced smile', what can you infer?",
        options: ["They are happy", "They are hiding feelings", "They are angry", "They are tired"],
        correctAnswer: 1,
        explanation: "A 'forced' smile suggests the emotion isn't genuine.",
      },
    ],
    Writing: [
      {
        id: "e-w-1", type: "mcq", difficulty: "medium", subject: "english", chapter: "Writing", subskill: "Essay",
        stem: "Which sentence best introduces an essay topic?",
        options: ["The topic sentence", "The conclusion", "A random fact", "A question"],
        correctAnswer: 0,
        explanation: "A topic sentence clearly introduces the main idea of a paragraph.",
      },
    ],
  },
};

// ─── Remediation Data ──────────────────────────────────────────────────────

const REMEDIATION_TEMPLATES: Record<Subject, RemediationStep[]> = {
  math: [
    { day: 1, title: "Linear Equations", description: "Master solving one-variable linear equations.", activity: "5 practice problems + video lesson", duration: "20 min", completed: false },
    { day: 2, title: "Geometry Basics", description: "Learn area and perimeter formulas.", activity: "Interactive geometry worksheet", duration: "25 min", completed: false },
    { day: 3, title: "Trigonometry Ratios", description: "Memorize and apply sin, cos, tan values.", activity: "Flashcards + 10 practice questions", duration: "20 min", completed: false },
    { day: 4, title: "Quadratic Equations", description: "Learn factoring and the quadratic formula.", activity: "Step-by-step tutorial + quiz", duration: "30 min", completed: false },
    { day: 5, title: "Practice Test", description: "Mixed practice on all topics.", activity: "20-question timed test", duration: "30 min", completed: false },
  ],
  science: [
    { day: 1, title: "Motion & Force", description: "Understand velocity, acceleration, and Newton's laws.", activity: "Simulation experiment + worksheet", duration: "25 min", completed: false },
    { day: 2, title: "Atomic Structure", description: "Electrons, protons, neutrons and Bohr model.", activity: "Interactive periodic table + quiz", duration: "20 min", completed: false },
    { day: 3, title: "Cell Biology", description: "Organelles, cell theory and cell division.", activity: "3D cell model exploration", duration: "25 min", completed: false },
    { day: 4, title: "Chemical Reactions", description: "Types of reactions and balancing equations.", activity: "Virtual lab + practice problems", duration: "30 min", completed: false },
    { day: 5, title: "Practice Test", description: "Mixed review of all chapters.", activity: "15-question test", duration: "25 min", completed: false },
  ],
  english: [
    { day: 1, title: "Tenses Mastery", description: "All 12 tenses with usage rules and examples.", activity: "Story-based practice exercises", duration: "20 min", completed: false },
    { day: 2, title: "Reading Comprehension", description: "Strategies for finding main ideas and inference.", activity: "3 passages with questions", duration: "25 min", completed: false },
    { day: 3, title: "Vocabulary Builder", description: "Learn 20 new words with context usage.", activity: "Flashcards + sentence writing", duration: "15 min", completed: false },
    { day: 4, title: "Writing Skills", description: "Essay structure, topic sentences, conclusions.", activity: "Write 2 short paragraphs", duration: "30 min", completed: false },
    { day: 5, title: "Practice Test", description: "Grammar and comprehension review.", activity: "15-question test", duration: "20 min", completed: false },
  ],
};

// ─── Adaptive Engine ───────────────────────────────────────────────────────

function selectAdaptiveQuestions(subject: Subject, chapter: string, count: number = 15): Question[] {
  const pool = QUESTION_BANK[subject]?.[chapter] || [];
  if (pool.length === 0) return [];

  const easy = pool.filter((q) => q.difficulty === "easy");
  const medium = pool.filter((q) => q.difficulty === "medium");
  const hard = pool.filter((q) => q.difficulty === "hard");

  const selected: Question[] = [];
  let lastCorrect = true;
  let difficulty: Difficulty = "easy";

  const getFromDifficulty = (diff: Difficulty): Question | undefined => {
    const list = diff === "easy" ? easy : diff === "medium" ? medium : hard;
    const available = list.filter((q) => !selected.find((s) => s.id === q.id));
    if (available.length === 0) return undefined;
    return available[Math.floor(Math.random() * available.length)];
  };

  for (let i = 0; i < count; i++) {
    if (i > 0 && !lastCorrect && difficulty !== "easy") {
      difficulty = difficulty === "hard" ? "medium" : "easy";
    } else if (i > 0 && lastCorrect && difficulty !== "hard") {
      difficulty = difficulty === "easy" ? "medium" : "hard";
    }
    const q = getFromDifficulty(difficulty);
    if (q) selected.push(q);
    lastCorrect = Math.random() > 0.35; // simulate adaptive
  }

  while (selected.length < count) {
    const any = pool.find((q) => !selected.find((s) => s.id === q.id));
    if (any) selected.push(any);
    else break;
  }

  return selected.slice(0, count);
}

function computeSubskillResults(questions: Question[], answers: (number | string | null)[]): SubskillResult[] {
  const map = new Map<string, { correct: number; total: number; misconception?: string }>();

  questions.forEach((q, i) => {
    const existing = map.get(q.subskill) || { correct: 0, total: 0 };
    existing.total++;
    const isCorrect = answers[i] !== null && answers[i] !== undefined &&
      String(answers[i]).toLowerCase() === String(q.correctAnswer).toLowerCase();
    if (isCorrect) existing.correct++;
    if (!isCorrect && q.misconception && !existing.misconception) {
      existing.misconception = q.misconception;
    }
    map.set(q.subskill, existing);
  });

  return Array.from(map.entries()).map(([name, data]) => ({
    name,
    mastery: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    correct: data.correct,
    total: data.total,
    isStrong: data.total > 0 && data.correct / data.total >= 0.6,
    misconception: data.misconception,
  }));
}

// ─── Local Storage ─────────────────────────────────────────────────────────

const STORAGE_KEY = "diagnostic_state_v1";

function saveState(state: unknown) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function loadState<T>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ─── Helper: Render KaTeX ──────────────────────────────────────────────────

function MathText({ tex, displayMode = false, className = "" }: { tex: string; displayMode?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && tex) {
      try {
        katex.render(tex, ref.current, { displayMode, throwOnError: false, trust: true });
      } catch {
        if (ref.current) ref.current.textContent = tex;
      }
    }
  }, [tex, displayMode]);

  return <span className={className} ref={ref} />;
}

// ─── Hook: Timer ───────────────────────────────────────────────────────────

function useTimer(initialSeconds: number, active: boolean) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!active) { setRunning(false); return; }
    setRunning(true);
    setSeconds(initialSeconds);
  }, [active, initialSeconds]);

  useEffect(() => {
    if (!running || seconds <= 0) { if (seconds <= 0) setRunning(false); return; }
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const format = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }, []);

  return { seconds, formatted: format(seconds), isRunning: running };
}

// ─── Sub-components ────────────────────────────────────────────────────────

function LangSwitcher({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  const t = translations[lang];
  const labels: Record<Lang, string> = { en: "EN", hinglish: "हिं", hi: "हि" };
  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1" role="radiogroup" aria-label={t.langLabel}>
      {LANG_ORDER.map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={lang === l}
          onClick={() => onChange(l)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300
            ${lang === l ? "bg-white text-indigo-700 shadow-md" : "text-white/70 hover:text-white hover:bg-white/10"}`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}

function SubjectCard({
  subject,
  label,
  icon,
  selected,
  onClick,
}: {
  subject: Subject;
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}) {
  const colors: Record<Subject, string> = {
    math: "from-blue-500 to-indigo-600",
    science: "from-emerald-500 to-teal-600",
    english: "from-pink-500 to-rose-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden group
        ${selected ? "border-white shadow-lg shadow-white/20" : "border-white/20 hover:border-white/40 bg-white/5"}`}
      aria-pressed={selected}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[subject]} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
      <div className="relative flex items-center gap-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-white font-bold text-lg">{label}</p>
          <p className="text-white/60 text-sm">Class 8 – 10</p>
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="ml-auto w-8 h-8 rounded-full bg-green-400 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

function ChapterChips({ chapters, selected, onSelect }: { chapters: string[]; selected: string; onSelect: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Chapter selection">
      {chapters.map((ch) => (
        <motion.button
          key={ch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(ch)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
            ${selected === ch
              ? "bg-white text-indigo-700 border-white shadow-lg"
              : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"}`}
          role="radio"
          aria-checked={selected === ch}
        >
          {ch}
        </motion.button>
      ))}
    </div>
  );
}

// ─── Setup Screen ──────────────────────────────────────────────────────────

function SetupScreen({
  lang,
  t,
  subject,
  setSubject,
  chapter,
  setChapter,
  onStart,
}: {
  lang: Lang;
  t: Translation;
  subject: Subject | "";
  setSubject: (s: Subject) => void;
  chapter: string;
  setChapter: (c: string) => void;
  onStart: () => void;
}) {
  const subjectMeta: Record<Subject, { label: string; icon: string }> = {
    math: { label: t.math, icon: "📐" },
    science: { label: t.science, icon: "🔬" },
    english: { label: t.english, icon: "📖" },
  };

  const canStart = subject !== "" && chapter !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
          🎯
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.ready}</h1>
        <p className="text-white/70 text-sm leading-relaxed">{t.subtitle}</p>
        <p className="text-white/50 text-xs mt-2 flex items-center justify-center gap-1">{t.offlineReady}</p>
      </motion.div>

      {/* Subject Selection */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
        <label className="block text-white/80 text-sm font-semibold mb-3">{t.selectSubject}</label>
        <div className="space-y-3">
          {(Object.keys(subjectMeta) as Subject[]).map((s) => (
            <SubjectCard
              key={s}
              subject={s}
              label={subjectMeta[s].label}
              icon={subjectMeta[s].icon}
              selected={subject === s}
              onClick={() => { setSubject(s); setChapter(""); }}
            />
          ))}
        </div>
      </motion.div>

      {/* Chapter Selection */}
      <AnimatePresence>
        {subject && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden"
          >
            <label className="block text-white/80 text-sm font-semibold mb-3">{t.selectChapter}</label>
            <ChapterChips
              chapters={(t as unknown as Record<string, string[]>)[`chapters_${subject}`] || []}
              selected={chapter}
              onSelect={setChapter}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time Estimate */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/10"
      >
        <p className="text-white/80 text-sm text-center">{t.timeEstimate}</p>
        <p className="text-white/50 text-xs text-center mt-1">{t.subtitle}</p>
      </motion.div>

      {/* Start Button */}
      <motion.button
        whileHover={canStart ? { scale: 1.02 } : {}}
        whileTap={canStart ? { scale: 0.98 } : {}}
        onClick={onStart}
        disabled={!canStart}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300
          ${canStart
            ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            : "bg-white/10 text-white/30 cursor-not-allowed"}`}
        aria-label={t.startDiagnostic}
      >
        {t.startDiagnostic}
      </motion.button>
    </motion.div>
  );
}

// ─── Question Screen ───────────────────────────────────────────────────────

function QuestionScreen({
  lang,
  t,
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  onQuit,
}: {
  lang: Lang;
  t: Translation;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answer: number | string) => void;
  onQuit: () => void;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mathAnswer, setMathAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const TOTAL_TIME = 15 * 60; // 15 min
  const elapsedPerQuestion = TOTAL_TIME / totalQuestions;
  const timer = useTimer(Math.round(elapsedPerQuestion), !showFeedback);

  useEffect(() => {
    setSelectedOption(null);
    setMathAnswer("");
    setShowFeedback(false);
    setIsCorrect(false);
  }, [question.id]);

  const handleSubmit = () => {
    let answer: number | string;
    let correct = false;

    if (question.type === "mcq") {
      if (selectedOption === null) return;
      answer = selectedOption;
      correct = selectedOption === question.correctAnswer;
    } else {
      if (!mathAnswer.trim()) return;
      answer = mathAnswer.trim();
      const correctStr = String(question.correctAnswer).toLowerCase().replace(/[^a-z0-9=,.]/g, "");
      const userStr = mathAnswer.trim().toLowerCase().replace(/[^a-z0-9=,.]/g, "");
      correct = userStr === correctStr || correctStr.includes(userStr) || userStr.includes(correctStr);
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onSubmit(answer);
    }, 1500);
  };

  const progress = ((questionNumber - 1) / totalQuestions) * 100;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full max-w-lg mx-auto px-4 py-6"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/60 text-sm font-medium">
          {t.question} {questionNumber} {t.of} {totalQuestions}
        </span>
        <button
          onClick={onQuit}
          className="text-white/40 hover:text-white/80 text-sm transition-colors px-3 py-1 rounded-lg hover:bg-white/10"
          aria-label={t.quit}
        >
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((questionNumber) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Timer */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5" aria-live="polite" aria-label={t.timeRemaining}>
          <span className="text-sm">⏱️</span>
          <span className={`text-sm font-mono font-medium ${timer.seconds < 30 ? "text-red-300 animate-pulse" : "text-white/70"}`}>
            {timer.formatted}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/15 shadow-xl mb-6"
      >
        {/* Subskill tag */}
        <span className="inline-block bg-indigo-500/30 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {t.subskillLabel}: {question.subskill}
        </span>

        {/* Question stem */}
        <div className="text-white text-lg font-medium leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: renderStem(question.stem) }} />

        {/* Options / Math Input */}
        {question.type === "mcq" && question.options ? (
          <div className="space-y-3" role="radiogroup" aria-label="Answer options">
            {question.options.map((opt, i) => {
              const optNum = i;
              const isSelected = selectedOption === optNum;
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => !showFeedback && setSelectedOption(i)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3
                    ${isSelected
                      ? "border-indigo-400 bg-indigo-500/20 shadow-md shadow-indigo-500/10"
                      : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"}
                    ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors
                    ${isSelected ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-white/90 text-sm" dangerouslySetInnerHTML={{ __html: opt }} />
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div>
            <label htmlFor="math-input" className="block text-white/70 text-sm mb-2">Enter your answer:</label>
            <input
              id="math-input"
              type="text"
              value={mathAnswer}
              onChange={(e) => !showFeedback && setMathAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder="e.g. 4 or x = 3"
              className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 disabled:opacity-50 transition-all"
              autoComplete="off"
            />
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-xl border ${isCorrect ? "bg-green-500/15 border-green-400/30" : "bg-red-500/15 border-red-400/30"}`}
            role="alert"
          >
            <p className={`font-semibold text-sm mb-1 ${isCorrect ? "text-green-300" : "text-red-300"}`}>
              {isCorrect ? "✅ " + t.correct : "❌ " + t.incorrect}
            </p>
            <p className="text-white/70 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: question.explanation }} />
          </motion.div>
        )}
      </motion.div>

      {/* Submit Button */}
      {!showFeedback && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={question.type === "mcq" ? selectedOption === null : !mathAnswer.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300
            ${(question.type === "mcq" ? selectedOption !== null : mathAnswer.trim())
              ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
              : "bg-white/10 text-white/30 cursor-not-allowed"}`}
        >
          {t.submit}
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── Results Screen ────────────────────────────────────────────────────────

function ResultsScreen({
  lang,
  t,
  mastery,
  subskillResults,
  questions,
  answers,
  onStartRemediation,
  onRetake,
}: {
  lang: Lang;
  t: Translation;
  mastery: number;
  subskillResults: SubskillResult[];
  questions: Question[];
  answers: (number | string | null)[];
  onStartRemediation: () => void;
  onRetake: () => void;
}) {
  const strong = subskillResults.filter((r) => r.isStrong);
  const weak = subskillResults.filter((r) => !r.isStrong);
  const misconceptions = subskillResults.filter((r) => r.misconception);

  const masteryColor = mastery >= 70 ? "text-green-300" : mastery >= 40 ? "text-amber-300" : "text-red-300";
  const masteryLabel = mastery >= 70 ? t.masteryHigh : mastery >= 40 ? t.masteryMedium : t.masteryLow;
  const masteryGradient = mastery >= 70 ? "from-green-400 to-emerald-500" : mastery >= 40 ? "from-amber-400 to-orange-500" : "from-red-400 to-pink-500";

  // Circular progress
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (mastery / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto px-4 py-8"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-6">{t.resultsTitle}</h2>

      {/* Mastery Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-48 h-48 mx-auto mb-8"
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="url(#masteryGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="masteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={mastery >= 70 ? "#4ade80" : mastery >= 40 ? "#fbbf24" : "#f87171"} />
              <stop offset="100%" stopColor={mastery >= 70 ? "#34d399" : mastery >= 40 ? "#f97316" : "#ec4899"} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className={`text-4xl font-extrabold ${masteryColor}`}
          >
            {mastery}%
          </motion.span>
          <span className="text-white/60 text-xs font-medium mt-1">{t.masteryPercent}</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-white font-semibold text-lg mb-8"
      >
        {masteryLabel}
      </motion.p>

      {/* Strong Areas */}
      {strong.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-green-500/10 backdrop-blur-md rounded-2xl p-5 border border-green-400/20 mb-4"
        >
          <h3 className="text-green-300 font-bold text-sm mb-3">{t.strongAreas}</h3>
          <div className="space-y-2">
            {strong.map((r) => (
              <div key={r.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-lg">✅</span>
                  <span className="text-white/90 text-sm">{r.name}</span>
                </div>
                <span className="text-green-300 text-xs font-semibold">{r.correct}/{r.total} {t.correct}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Weak Areas */}
      {weak.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-red-500/10 backdrop-blur-md rounded-2xl p-5 border border-red-400/20 mb-4"
        >
          <h3 className="text-red-300 font-bold text-sm mb-3">{t.weakAreas}</h3>
          <div className="space-y-3">
            {weak.map((r) => (
              <div key={r.name} className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/90 text-sm font-medium">{r.name}</span>
                  <span className="text-red-300 text-xs font-semibold">{r.mastery}% {t.masteryPercent}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full" style={{ width: `${r.mastery}%` }} />
                </div>
                <p className="text-white/50 text-xs mt-1">{r.correct} of {r.total} {t.correct}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Misconceptions */}
      {misconceptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-amber-500/10 backdrop-blur-md rounded-2xl p-5 border border-amber-400/20 mb-4"
        >
          <h3 className="text-amber-300 font-bold text-sm mb-3">{t.misconceptions}</h3>
          <div className="space-y-3">
            {misconceptions.map((r) => (
              <div key={r.name} className="flex gap-3">
                <span className="text-amber-400 text-lg mt-0.5">⚠️</span>
                <div>
                  <p className="text-white/80 text-sm font-medium">{r.name}</p>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">{r.misconception}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Question Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 mb-6"
      >
        <h3 className="text-white/80 font-bold text-sm mb-3">Question Review</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {questions.map((q, i) => {
            const answered = answers[i] !== null && answers[i] !== undefined;
            const correct = answered && String(answers[i]).toLowerCase() === String(q.correctAnswer).toLowerCase();
            return (
              <div key={q.id} className="flex items-center gap-2 text-xs">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                  ${correct ? "bg-green-500/30 text-green-300" : answered ? "bg-red-500/30 text-red-300" : "bg-white/10 text-white/30"}`}>
                  {correct ? "✓" : answered ? "✗" : "–"}
                </span>
                <span className="text-white/60 truncate">
                  {q.stem.replace(/\$[^$]*\$/g, "[math]").substring(0, 50)}...
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="space-y-3"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartRemediation}
          className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30"
        >
          {t.startRemediation}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onRetake}
          className="w-full py-3 rounded-2xl font-semibold text-white/70 bg-white/10 hover:bg-white/20 transition-colors"
        >
          {t.retakeDiagnostic}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Remediation Screen ────────────────────────────────────────────────────

function RemediationScreen({
  lang,
  t,
  subject,
  steps,
  currentStep,
  onToggleStep,
  onBack,
}: {
  lang: Lang;
  t: Translation;
  subject: Subject;
  steps: RemediationStep[];
  currentStep: number;
  onToggleStep: (index: number) => void;
  onBack: () => void;
}) {
  const completedCount = steps.filter((s) => s.completed).length;
  const progress = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          ← {t.backToResults}
        </button>
        <span className="text-white/40 text-xs">{t.yourProgress}</span>
      </div>

      {/* Overall Progress */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">{t.remediationTitle}</h2>
          <span className="text-white/60 text-sm font-medium">{completedCount}/{steps.length}</span>
        </div>
        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-mint-400 to-indigo-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-white/50 text-xs mt-2">{Math.round(progress)}% {t.completed}</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative flex gap-4"
            >
              {/* Timeline dot */}
              <div className="relative z-10 shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-300
                  ${step.completed
                    ? "bg-green-500/30 border-green-400 text-green-300"
                    : i === currentStep
                      ? "bg-indigo-500/30 border-indigo-400 text-indigo-300 animate-pulse"
                      : "bg-white/5 border-white/20 text-white/30"}`}>
                  {step.completed ? "✓" : step.day}
                </div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`flex-1 rounded-2xl p-4 border transition-all duration-300
                  ${step.completed
                    ? "bg-green-500/10 border-green-400/20"
                    : i === currentStep
                      ? "bg-indigo-500/10 border-indigo-400/30 shadow-lg shadow-indigo-500/10"
                      : "bg-white/5 border-white/10 opacity-60"}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-white font-bold text-sm">{step.title}</h3>
                  <span className="text-white/40 text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                    {t.day} {step.day} · {step.duration}
                  </span>
                </div>
                <p className="text-white/60 text-xs mb-3 leading-relaxed">{step.description}</p>
                <div className="bg-white/5 rounded-lg px-3 py-2 mb-3">
                  <p className="text-white/70 text-xs"><span className="text-indigo-300 font-medium">{t.activityLabel}:</span> {step.activity}</p>
                </div>
                <motion.button
                  whileHover={!step.completed ? { scale: 1.02 } : {}}
                  whileTap={!step.completed ? { scale: 0.98 } : {}}
                  onClick={() => !step.completed && onToggleStep(i)}
                  disabled={step.completed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300
                    ${step.completed
                      ? "bg-green-500/20 text-green-300 cursor-default"
                      : "bg-indigo-500/30 text-indigo-200 hover:bg-indigo-500/50"}`}
                >
                  {step.completed ? t.completed : t.startActivity}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {completedCount === steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30 text-center"
          role="alert"
        >
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-green-300 font-bold text-lg mb-1">Congratulations!</h3>
          <p className="text-white/60 text-sm">You&apos;ve completed the remediation plan. Keep practicing!</p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Utility ───────────────────────────────────────────────────────────────

function renderStem(stem: string): string {
  // Convert inline $...$ to a span that KaTeX will process
  return stem.replace(/\$([^$]+)\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { throwOnError: false, displayMode: false });
    } catch {
      return `<code>${tex}</code>`;
    }
  });
}

// ─── Confirmation Modal ────────────────────────────────────────────────────

function ConfirmModal({
  t,
  message,
  onConfirm,
  onCancel,
}: {
  t: Translation;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={message}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-sm w-full shadow-2xl"
      >
        <p className="text-white font-semibold text-center mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl bg-white/10 text-white/80 font-semibold text-sm hover:bg-white/20 transition-colors">
            {t.no}
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500/30 text-red-200 font-semibold text-sm hover:bg-red-500/50 transition-colors">
            {t.yes}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Loading / Calculating Screen ──────────────────────────────────────────

function CalculatingScreen({ t }: { t: Translation }) {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-20 text-center" aria-live="polite" aria-label={t.calculating}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-6 border-4 border-white/20 border-t-indigo-400 rounded-full"
      />
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-white/80 font-medium"
      >
        {t.calculating}
      </motion.p>
    </div>
  );
}

// ─── Main Diagnostic Page ──────────────────────────────────────────────────

export default function DiagnosticPage() {
  const { user } = useAuthStore();
  const [lang, setLang] = useState<Lang>("en");
  const [phase, setPhase] = useState<Phase>("setup");
  const [subject, setSubject] = useState<Subject | "">("");
  const [chapter, setChapter] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | string | null)[]>([]);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [remediationSteps, setRemediationSteps] = useState<RemediationStep[]>([]);
  const [activeRemediation, setActiveRemediation] = useState(-1);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [apiResult, setApiResult] = useState<DiagnosticResult | null>(null);
  const [apiRemediation, setApiRemediation] = useState<RemediationPath | null>(null);

  const t = translations[lang];

  // API hooks
  const startDiagnostic = useStartDiagnostic();
  const submitDiagnostic = useSubmitDiagnostic(sessionId);
  const { data: fetchedResult } = useDiagnosticResult(sessionId, { enabled: !!sessionId && phase === "results" });
  const { data: fetchedRemediation } = useRemediationPath(sessionId, { enabled: !!sessionId && phase === "remediation" });

  // Use fetched result when available
  useEffect(() => {
    if (fetchedResult) setApiResult(fetchedResult as DiagnosticResult);
  }, [fetchedResult]);

  // Use fetched remediation when available
  useEffect(() => {
    if (fetchedRemediation) setApiRemediation(fetchedRemediation);
  }, [fetchedRemediation]);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadState<{
      phase: Phase;
      subject: Subject;
      chapter: string;
      questions: Question[];
      currentQIndex: number;
      answers: (number | string | null)[];
    }>();
    if (saved) {
      if (saved.phase === "active" && saved.questions.length > 0) {
        setSubject(saved.subject);
        setChapter(saved.chapter);
        setQuestions(saved.questions);
        setCurrentQIndex(saved.currentQIndex);
        setAnswers(saved.answers);
        setPhase("active");
      }
    }
  }, []);

  // Persist state
  useEffect(() => {
    if (phase === "active") {
      saveState({ phase, subject, chapter, questions, currentQIndex, answers });
    }
  }, [phase, currentQIndex, answers]);

  // Map local subject to API subject
  const mapSubject = (s: Subject): DiagSubject => {
    if (s === "math") return "Mathematics";
    if (s === "science") return "Science";
    return "English";
  };

  const handleStart = useCallback(async () => {
    if (!subject) { alert(t.selectSubjectFirst); return; }
    if (!chapter) { alert(t.selectChapterFirst); return; }

    // Try API first
    try {
      const session = await startDiagnostic.mutateAsync({
        studentId: user?.id || "anonymous",
        config: {
          subjects: [mapSubject(subject)],
          gradeLevel: user?.class_level || 10,
          board: (user?.board as "CBSE" | "ICSE" | "State" | "IB" | "NCERT") || "CBSE",
          language: lang === "hi" ? "hi" : "en",
          questionCountPerSubject: 15,
          adaptiveEnabled: true,
        },
      });
      setSessionId(session.sessionId);
      // Map API questions to local format
      const apiQuestions: Question[] = (session.questions || []).map((dq: DiagnosticQuestion) => ({
        id: dq.questionId,
        type: dq.options && dq.options.length > 0 ? "mcq" : "math",
        difficulty: dq.difficulty,
        subject,
        chapter: dq.topic,
        subskill: dq.topic,
        stem: dq.questionText,
        options: dq.options?.map(o => o.text),
        correctAnswer: dq.options?.findIndex(o => o.optionId === dq.correctOptionId) ?? 0,
        explanation: dq.explanation,
      }));
      if (apiQuestions.length > 0) {
        setQuestions(apiQuestions);
        setAnswers(new Array(apiQuestions.length).fill(null));
        setCurrentQIndex(0);
        setPhase("active");
        return;
      }
    } catch {
      // Fall through to local question bank
    }

    // Fallback: local question bank
    const qs = selectAdaptiveQuestions(subject, chapter, 15);
    if (qs.length === 0) return;
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrentQIndex(0);
    setPhase("active");
  }, [subject, chapter, t, startDiagnostic, user, lang]);

  const handleAnswer = useCallback(
    (answer: number | string) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQIndex] = answer;
        return next;
      });
      setCurrentQIndex((prev) => {
        if (prev + 1 >= questions.length) {
          // All questions answered — submit to API or compute locally
          const allAnswers = [...answers, answer];
          setTimeout(async () => {
            // Try API submission
            if (sessionId) {
              try {
                const answerRecords = questions.map((q, i) => ({
                  questionId: q.id,
                  selectedOptionId: String(allAnswers[i] ?? ""),
                  isCorrect: String(allAnswers[i]).toLowerCase() === String(q.correctAnswer).toLowerCase(),
                  timeSpentSeconds: 60,
                  submittedAt: new Date().toISOString(),
                }));
                const result = await submitDiagnostic.mutateAsync({
                  answers: answerRecords,
                  completedAt: new Date().toISOString(),
                });
                setApiResult(result);
                setPhase("calculating");
                clearState();
                setTimeout(() => setPhase("results"), 2000);
                return;
              } catch {
                // Fall through to local computation
              }
            }

            // Fallback: local computation
            const subskillResults = computeSubskillResults(questions, allAnswers);
            const totalCorrect = subskillResults.reduce((sum, r) => sum + r.correct, 0);
            const totalQuestions = subskillResults.reduce((sum, r) => sum + r.total, 0);
            const mastery = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
            setPhase("calculating");
            clearState();
            setTimeout(() => {
              setPhase("results");
              (window as unknown as Record<string, unknown>).__diagnosticResults = { mastery, subskillResults, questions, answers: allAnswers };
            }, 2000);
          }, 500);
          return prev + 1;
        }
        return prev + 1;
      });
    },
    [currentQIndex, questions, answers, sessionId, submitDiagnostic]
  );

  const handleStartRemediation = useCallback(() => {
    // If we have API remediation, use it
    if (apiRemediation) {
      const steps: RemediationStep[] = apiRemediation.steps.map((s) => ({
        day: s.stepNumber,
        title: s.title,
        description: s.description,
        activity: s.type,
        duration: `${s.estimatedDurationMinutes} min`,
        completed: s.status === "completed",
      }));
      setRemediationSteps(steps);
      setActiveRemediation(apiRemediation.currentStepIndex);
      setPhase("remediation");
      return;
    }

    // Fallback: local remediation templates
    const steps = REMEDIATION_TEMPLATES[subject as Subject] || REMEDIATION_TEMPLATES.math;
    setRemediationSteps(steps);
    setActiveRemediation(0);
    setPhase("remediation");
  }, [subject, apiRemediation]);

  const handleRetake = useCallback(() => {
    clearState();
    setQuestions([]);
    setAnswers([]);
    setCurrentQIndex(0);
    setSessionId(undefined);
    setApiResult(null);
    setApiRemediation(null);
    setPhase("setup");
  }, []);

  const handleQuit = useCallback(() => {
    clearState();
    setQuestions([]);
    setAnswers([]);
    setCurrentQIndex(0);
    setSessionId(undefined);
    setShowQuitModal(false);
    setPhase("setup");
  }, []);

  const handleToggleRemediationStep = useCallback((index: number) => {
    setRemediationSteps((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], completed: !next[index].completed };
      const nextActive = next.findIndex((s, i) => i >= index && !s.completed);
      setActiveRemediation(nextActive >= 0 ? nextActive : next.length - 1);
      return next;
    });
  }, []);

  const getMasteryAndResults = useCallback((): { mastery: number; subskillResults: SubskillResult[]; questions: Question[]; answers: (number | string | null)[] } => {
    // If we have API result, map it
    if (apiResult) {
      const subskillResults: SubskillResult[] = (apiResult.skillAssessments || []).map(sa => ({
        name: sa.skillName,
        mastery: sa.masteryScore,
        correct: sa.questionsCorrect,
        total: sa.questionsTotal,
        isStrong: sa.masteryScore >= 60,
      }));
      return {
        mastery: apiResult.overallScore,
        subskillResults,
        questions,
        answers,
      };
    }

    // Fallback: local results
    const results = (window as unknown as Record<string, { mastery: number; subskillResults: SubskillResult[]; questions: Question[]; answers: (number | string | null)[] }>).__diagnosticResults;
    if (results) return results;
    return { mastery: 0, subskillResults: [], questions: [], answers: [] };
  }, [apiResult, questions, answers]);

  const renderPhase = () => {
    switch (phase) {
      case "setup":
        return (
          <SetupScreen
            lang={lang}
            t={t}
            subject={subject}
            setSubject={(s) => { setSubject(s); setChapter(""); }}
            chapter={chapter}
            setChapter={setChapter}
            onStart={handleStart}
          />
        );

      case "active": {
        const q = questions[currentQIndex];
        if (!q) return null;
        return (
          <QuestionScreen
            lang={lang}
            t={t}
            question={q}
            questionNumber={currentQIndex + 1}
            totalQuestions={questions.length}
            onSubmit={handleAnswer}
            onQuit={() => setShowQuitModal(true)}
          />
        );
      }

      case "calculating":
        return <CalculatingScreen t={t} />;

      case "results": {
        const { mastery, subskillResults, questions: qs, answers: ans } = getMasteryAndResults();
        return (
          <ResultsScreen
            lang={lang}
            t={t}
            mastery={mastery}
            subskillResults={subskillResults}
            questions={qs}
            answers={ans}
            onStartRemediation={handleStartRemediation}
            onRetake={handleRetake}
          />
        );
      }

      case "remediation":
        return (
          <RemediationScreen
            lang={lang}
            t={t}
            subject={(subject as Subject)}
            steps={remediationSteps}
            currentStep={activeRemediation}
            onToggleStep={handleToggleRemediationStep}
            onBack={() => {
              const { mastery, subskillResults, questions: qs, answers: ans } = getMasteryAndResults();
              setPhase("results");
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -10, 20, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-white font-bold text-xs">
            L
          </div>
          <span className="text-white/80 font-bold text-sm hidden sm:inline">LearnPath</span>
        </div>
        <LangSwitcher lang={lang} onChange={setLang} />
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {renderPhase()}
        </AnimatePresence>
      </main>

      {/* Quit confirmation */}
      <AnimatePresence>
        {showQuitModal && (
          <ConfirmModal
            t={t}
            message={t.confirmQuit}
            onConfirm={handleQuit}
            onCancel={() => setShowQuitModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Global styles for scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
