"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Sparkles, BookOpen, GraduationCap, Target, Globe, ArrowRight, Star, Trophy, Zap } from "lucide-react";
import { useOnboardingStore, type StepId, type Language, type BoardType, type ClassLevel, type Subject, type GoalType } from "./store";

// ─── Translations ─────────────────────────────────────────────────────────────
type T = Record<string, Record<Language, string>>;

const translations: T = {
  // Welcome
  welcome_title: { en: "Welcome to LearnSphere", hinglish: "LearnSphere mein aapka swagat hai", hindi: "लर्नस्फेयर में आपका स्वागत है" },
  welcome_subtitle: { en: "Your personal learning companion for school success", hinglish: "School success ke liye aapka personal learning companion", hindi: "स्कूल सफलता के लिए आपका व्यक्तिगत शिक्षा साथी" },
  welcome_cta: { en: "Let's Get Started", hinglish: "Chalo shuru karte hain", hindi: "चलो शुरू करते हैं" },
  welcome_skip: { en: "Skip for now", hinglish: "Abhi skip karo", hindi: "अभी छोड़ें" },

  // Class
  class_title: { en: "Which class are you in?", hinglish: "Aap kaunsi class mein ho?", hindi: "आप कक्षा में हैं?" },
  class_subtitle: { en: "We'll customize your experience accordingly", hinglish: "Hum aapka experience customize karenge", hindi: "हम आपके अनुभव को अनुकूलित करेंगे" },
  class_11: { en: "Class 11", hinglish: "Class 11", hindi: "कक्षा 11" },
  class_12: { en: "Class 12", hinglish: "Class 12", hindi: "कक्षा 12" },
  board_label: { en: "Select your board", hinglish: "Apna board select karo", hindi: "अपना बोर्ड चुनें" },
  board_cbse: { en: "CBSE", hinglish: "CBSE", hindi: "सीबीएसई" },
  board_icse: { en: "ICSE", hinglish: "ICSE", hindi: "आईसीएसई" },
  board_state: { en: "State Board", hinglish: "State Board", hindi: "राज्य बोर्ड" },
  class_next: { en: "Continue", hinglish: "Aage badho", hindi: "आगे बढ़ें" },

  // Subjects
  subjects_title: { en: "Pick your subjects", hinglish: "Apne subjects choose karo", hindi: "अपने विषय चुनें" },
  subjects_subtitle: { en: "Select all that apply to you", hinglish: "Jitne bhi applicable hain, select karo", hindi: "जो भी लागू हों चुनें" },
  subjects_select_at_least: { en: "Please select at least one subject", hinglish: "Kam se kam ek subject select karo", hindi: "कम से कम एक विषय चुनें" },
  subjects_next: { en: "Continue", hinglish: "Aage badho", hindi: "आगे बढ़ें" },
  maths: { en: "Mathematics", hinglish: "Maths", hindi: "गणित" },
  physics: { en: "Physics", hinglish: "Physics", hindi: "भौतिक विज्ञान" },
  chemistry: { en: "Chemistry", hinglish: "Chemistry", hindi: "रसायन विज्ञान" },
  biology: { en: "Biology", hinglish: "Biology", hindi: "जीव विज्ञान" },
  english: { en: "English", hinglish: "English", hindi: "अंग्रेजी" },
  history: { en: "History", hinglish: "History", hindi: "इतिहास" },
  geography: { en: "Geography", hinglish: "Geography", hindi: "भूगोल" },
  political_science: { en: "Political Science", hinglish: "Political Science", hindi: "राजनीति विज्ञान" },
  economics: { en: "Economics", hinglish: "Economics", hindi: "अर्थशास्त्र" },
  informatics: { en: "Computer Sci", hinglish: "Computer Science", hindi: "कंप्यूटर विज्ञान" },

  // Language
  language_title: { en: "Choose your language", hinglish: "Apni language choose karo", hindi: "अपनी भाषा चुनें" },
  language_subtitle: { en: "We'll show content in your preferred language", hinglish: "Hum content aapki pasand ki language mein dikhayenge", hindi: "हम सामग्री आपकी पसंद की भाषा में दिखाएंगे" },
  language_en: { en: "English", hinglish: "English", hindi: "अंग्रेजी" },
  language_hinglish: { en: "Hinglish", hinglish: "Hinglish", hindi: "हिंग्लिश" },
  language_hindi: { en: "Hindi", hinglish: "Hindi", hindi: "हिंदी" },
  language_next: { en: "Continue", hinglish: "Aage badho", hindi: "आगे बढ़ें" },

  // Goal
  goal_title: { en: "What's your goal?", hinglish: "Aapka kya goal hai?", hindi: "आपका लक्ष्य क्या है?" },
  goal_subtitle: { en: "We'll help you get there", hinglish: "Hum aapko wahan pahunchayenge", hindi: "हम आपको वहां पहुंचाएंगे" },
  goal_boards_top: { en: "Score 95%+ in Boards", hinglish: "Boards mein 95%+ score karo", hindi: "बोर्ड में 95%+ स्कोर करें" },
  goal_boards_good: { en: "Score 90%+ in Boards", hinglish: "Boards mein 90%+ score karo", hindi: "बोर्ड में 90%+ स्कोर करें" },
  goal_foundation: { en: "Strong Foundation", hinglish: "Strong foundation banaye", hindi: "मजबूत नींव बनाएं" },
  goal_competitive: { en: "Crack JEE / NEET", hinglish: "JEE / NEET crack karo", hindi: "JEE / NEET क्रैक करें" },
  goal_submit: { en: "I'm Ready!", hinglish: "Main ready hoon!", hindi: "मैं तैयार हूँ!" },

  // Ready
  ready_title: { en: "You're all set! 🎉", hinglish: "Sab set ho gaya! 🎉", hindi: "सब सेट हो गया! 🎉" },
  ready_subtitle: { en: "Your personalized learning journey starts now", hinglish: "Aapka personalized learning journey ab shuru hota hai", hindi: "आपकी व्यक्तिगत शिक्षा यात्रा अब शुरू होती है" },
  ready_cta: { en: "Go to Dashboard", hinglish: "Dashboard par jao", hindi: "डैशबोर्ड पर जाओ" },
  ready_summary: { en: "Summary", hinglish: "Summary", hindi: "सारांश" },

  // Progress
  step: { en: "Step", hinglish: "Step", hindi: "चरण" },
  of: { en: "of", hinglish: "se", hindi: "में से" },
};

const t = (key: string, lang: Language): string => translations[key]?.[lang] || translations[key]?.en || key;

// ─── Subject Metadata ─────────────────────────────────────────────────────────
const SUBJECT_META: Record<Subject, { icon: string; color: string; gradient: string }> = {
  maths: { icon: "📐", color: "bg-blue-100 text-blue-700 border-blue-200", gradient: "from-blue-400 to-indigo-500" },
  physics: { icon: "⚛️", color: "bg-purple-100 text-purple-700 border-purple-200", gradient: "from-purple-400 to-violet-500" },
  chemistry: { icon: "🧪", color: "bg-emerald-100 text-emerald-700 border-emerald-200", gradient: "from-emerald-400 to-teal-500" },
  biology: { icon: "🧬", color: "bg-pink-100 text-pink-700 border-pink-200", gradient: "from-pink-400 to-rose-500" },
  english: { icon: "📖", color: "bg-amber-100 text-amber-700 border-amber-200", gradient: "from-amber-400 to-orange-500" },
  history: { icon: "🏛️", color: "bg-orange-100 text-orange-700 border-orange-200", gradient: "from-orange-400 to-red-500" },
  geography: { icon: "🌍", color: "bg-teal-100 text-teal-700 border-teal-200", gradient: "from-teal-400 to-cyan-500" },
  political_science: { icon: "🏛️", color: "bg-indigo-100 text-indigo-700 border-indigo-200", gradient: "from-indigo-400 to-blue-500" },
  economics: { icon: "📊", color: "bg-green-100 text-green-700 border-green-200", gradient: "from-green-400 to-emerald-500" },
  informatics: { icon: "💻", color: "bg-slate-100 text-slate-700 border-slate-200", gradient: "from-slate-400 to-gray-500" },
};

const GOALS: { id: GoalType; icon: string; color: string; border: string; bg: string }[] = [
  { id: "boards_top", icon: "🏆", color: "text-amber-600", border: "border-amber-300", bg: "bg-amber-50" },
  { id: "boards_good", icon: "⭐", color: "text-indigo-600", border: "border-indigo-300", bg: "bg-indigo-50" },
  { id: "foundation", icon: "📚", color: "text-emerald-600", border: "border-emerald-300", bg: "bg-emerald-50" },
  { id: "competitive", icon: "🚀", color: "text-rose-600", border: "border-rose-300", bg: "bg-rose-50" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
const TOTAL_STEPS = 5;

function ProgressIndicator({ currentStep }: { currentStep: StepId }) {
  const order: StepId[] = ["welcome", "class", "subjects", "language", "goal"];
  const currentIdx = order.indexOf(currentStep);
  const progress = currentStep === "ready" ? 100 : ((currentIdx) / (TOTAL_STEPS - 1)) * 100;

  const labels = ["Welcome", "Class", "Subjects", "Language", "Goal"];

  return (
    <div className="w-full px-6 py-4" role="navigation" aria-label="Onboarding progress">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
          {t("step", "en")} {Math.min(currentIdx + 1, TOTAL_STEPS)} {t("of", "en")} {TOTAL_STEPS}
        </span>
        <span className="text-xs font-medium text-indigo-300">{labels[currentIdx] || ""}</span>
      </div>
      {/* Bar track */}
      <div className="relative h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      </div>
      {/* Step dots */}
      <div className="flex items-center justify-between mt-3 px-1">
        {order.map((step, i) => {
          const isActive = i === currentIdx;
          const isComplete = i < currentIdx;
          return (
            <div key={step} className="flex flex-col items-center gap-1">
              <motion.div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                  isComplete
                    ? "bg-indigo-400 text-white"
                    : isActive
                    ? "bg-white text-indigo-600 shadow-lg shadow-indigo-200"
                    : "bg-white/30 text-white/60"
                }`}
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {isComplete ? <Check size={14} strokeWidth={3} /> : i + 1}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Language Display ─────────────────────────────────────────────────────────
function useDisplayText(lang: Language): (key: string) => string {
  return useCallback((key: string) => t(key, lang), [lang]);
}

// ─── Step 0: Welcome ──────────────────────────────────────────────────────────
function WelcomeStep({ onNext, onSkip, lang }: { onNext: () => void; onSkip: () => void; lang: Language }) {
  const dt = useDisplayText(lang);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Animated logo */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-400 via-pink-400 to-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-300/50 relative">
          <BookOpen size={52} className="text-white" strokeWidth={1.5} />
          {/* Floating sparkles */}
          <motion.div
            className="absolute -top-3 -right-3"
            animate={{ y: [-5, -12, -5], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={20} className="text-amber-300" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-4"
            animate={{ y: [0, -8, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Star size={16} className="text-pink-300" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 -right-5"
            animate={{ y: [-3, -10, -3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Zap size={14} className="text-yellow-300" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight"
        variants={staggerItem}
      >
        {dt("welcome_title")}
      </motion.h1>
      <motion.p className="text-base sm:text-lg text-white/70 mb-10 max-w-xs leading-relaxed" variants={staggerItem}>
        {dt("welcome_subtitle")}
      </motion.p>

      <motion.div className="w-full max-w-xs space-y-3" variants={staggerItem}>
        <motion.button
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-white text-indigo-600 font-bold text-base
                     shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30
                     active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
        >
          {dt("welcome_cta")}
          <ArrowRight size={18} />
        </motion.button>
        <button
          onClick={onSkip}
          className="w-full py-3 text-sm text-white/50 hover:text-white/80 transition-colors underline underline-offset-4"
        >
          {dt("welcome_skip")}
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Step 1: Class Selection ──────────────────────────────────────────────────
function ClassStep({ onNext, lang }: { onNext: () => void; lang: Language }) {
  const dt = useDisplayText(lang);
  const { classLevel, board } = useOnboardingStore();
  const boards: BoardType[] = ["CBSE", "ICSE", "State Board"];

  const canProceed = classLevel !== null && board !== null;

  return (
    <motion.div
      className="px-6 py-6 min-h-[70vh] flex flex-col"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.h2 className="text-2xl font-extrabold text-white mb-2" variants={staggerItem}>
        {dt("class_title")}
      </motion.h2>
      <motion.p className="text-sm text-white/60 mb-8" variants={staggerItem}>
        {dt("class_subtitle")}
      </motion.p>

      {/* Class cards */}
      <motion.div className="grid grid-cols-2 gap-4 mb-8" variants={staggerItem}>
        {([11, 12] as ClassLevel[]).map((level) => (
          <motion.button
            key={level}
            onClick={() => useOnboardingStore.getState().setClassLevel(level)}
            className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-300 ${
              classLevel === level
                ? "bg-white/15 border-indigo-300 shadow-lg shadow-indigo-500/20"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
          >
            <GraduationCap
              size={32}
              className={`mx-auto mb-2 ${classLevel === level ? "text-indigo-200" : "text-white/40"}`}
            />
            <span className={`text-lg font-bold block ${classLevel === level ? "text-white" : "text-white/60"}`}>
              {dt(`class_${level}`)}
            </span>
            {classLevel === level && (
              <motion.div
                className="absolute top-2 right-2 w-6 h-6 bg-indigo-400 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Check size={14} className="text-white" strokeWidth={3} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Board selection */}
      <motion.div variants={staggerItem}>
        <label className="text-sm font-semibold text-white/70 mb-3 block">{dt("board_label")}</label>
        <div className="flex flex-wrap gap-3">
          {boards.map((b) => (
            <motion.button
              key={b}
              onClick={() => useOnboardingStore.getState().setBoard(b)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                board === b
                  ? "bg-indigo-400/20 border-indigo-300 text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white/70"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {dt(`board_${b.toLowerCase().replace(" ", "")}` as any) || b}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div className="mt-auto pt-8" variants={staggerItem}>
        <motion.button
          onClick={canProceed ? onNext : undefined}
          disabled={!canProceed}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
            canProceed
              ? "bg-white text-indigo-600 shadow-lg shadow-black/20 active:scale-95"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
          whileTap={canProceed ? { scale: 0.97 } : {}}
        >
          {dt("class_next")} <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Step 2: Subject Selection ────────────────────────────────────────────────
function SubjectsStep({ onNext, onBack, lang }: { onNext: () => void; onBack: () => void; lang: Language }) {
  const dt = useDisplayText(lang);
  const { subjects, toggleSubject } = useOnboardingStore();
  const [error, setError] = useState(false);

  const allSubjects: { id: Subject; emoji: string; labelKey: string }[] = [
    { id: "maths", emoji: "📐", labelKey: "maths" },
    { id: "physics", emoji: "⚛️", labelKey: "physics" },
    { id: "chemistry", emoji: "🧪", labelKey: "chemistry" },
    { id: "biology", emoji: "🧬", labelKey: "biology" },
    { id: "english", emoji: "📖", labelKey: "english" },
    { id: "history", emoji: "📜", labelKey: "history" },
    { id: "geography", emoji: "🌍", labelKey: "geography" },
    { id: "political_science", emoji: "⚖️", labelKey: "political_science" },
    { id: "economics", emoji: "📊", labelKey: "economics" },
    { id: "informatics", emoji: "💻", labelKey: "informatics" },
  ];

  const handleNext = () => {
    if (subjects.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    onNext();
  };

  return (
    <motion.div
      className="px-6 py-6 min-h-[70vh] flex flex-col"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.h2 className="text-2xl font-extrabold text-white mb-2" variants={staggerItem}>
        {dt("subjects_title")}
      </motion.h2>
      <motion.p className="text-sm text-white/60 mb-6" variants={staggerItem}>
        {dt("subjects_subtitle")}
      </motion.p>

      <motion.div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pb-4" variants={staggerContainer}>
        {allSubjects.map(({ id, emoji, labelKey }) => {
          const selected = subjects.includes(id);
          const meta = SUBJECT_META[id];
          return (
            <motion.button
              key={id}
              onClick={() => { toggleSubject(id); setError(false); }}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                selected
                  ? `${meta.color} border-current shadow-lg`
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
              }`}
              variants={staggerItem}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <span className="text-2xl mb-2 block">{emoji}</span>
              <span className={`text-sm font-bold block ${selected ? "" : "text-white/50"}`}>
                {dt(labelKey as any)}
              </span>
              {selected && (
                <motion.div
                  className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Check size={12} className="text-indigo-600" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {error && (
        <motion.p
          className="text-red-300 text-sm mb-4 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {dt("subjects_select_at_least")}
        </motion.p>
      )}

      <motion.div className="flex gap-3 mt-auto pt-4" variants={staggerItem}>
        <motion.button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl bg-white/10 text-white font-semibold active:scale-95 transition-all"
          whileTap={{ scale: 0.97 }}
        >
          ← Back
        </motion.button>
        <motion.button
          onClick={handleNext}
          className="flex-[2] py-4 rounded-2xl bg-white text-indigo-600 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          whileTap={{ scale: 0.97 }}
        >
          {dt("subjects_next")} <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Step 3: Language Selection ───────────────────────────────────────────────
function LanguageStep({ onNext, onBack, lang }: { onNext: () => void; onBack: () => void; lang: Language }) {
  const dt = useDisplayText(lang);
  const { language, setLanguage } = useOnboardingStore();

  const options: { value: Language; flag: string; labelKey: string; desc: Record<Language, string> }[] = [
    { value: "en", flag: "🇬🇧", labelKey: "language_en", desc: { en: "Full English interface", hinglish: "Poora English interface", hindi: "पूरा अंग्रेजी इंटरफेस" } },
    { value: "hinglish", flag: "🇮🇳", labelKey: "language_hinglish", desc: { en: "Mix of English & Hindi", hinglish: "English aur Hindi ka mix", hindi: "अंग्रेजी और हिंदी का मिश्रण" } },
    { value: "hindi", flag: "🇮🇳", labelKey: "language_hindi", desc: { en: "Full Hindi interface", hinglish: "Poora Hindi interface", hindi: "पूरा हिंदी इंटरफेस" } },
  ];

  return (
    <motion.div
      className="px-6 py-6 min-h-[70vh] flex flex-col"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.h2 className="text-2xl font-extrabold text-white mb-2" variants={staggerItem}>
        {dt("language_title")}
      </motion.h2>
      <motion.p className="text-sm text-white/60 mb-8" variants={staggerItem}>
        {dt("language_subtitle")}
      </motion.p>

      <motion.div className="space-y-4" variants={staggerContainer}>
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            onClick={() => setLanguage(opt.value)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
              language === opt.value
                ? "bg-white/15 border-indigo-300 shadow-lg shadow-indigo-500/20"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
            variants={staggerItem}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-3xl">{opt.flag}</span>
            <div className="flex-1">
              <span className={`text-base font-bold block ${language === opt.value ? "text-white" : "text-white/60"}`}>
                {dt(opt.labelKey)}
              </span>
              <span className="text-xs text-white/40">{opt.desc[lang]}</span>
            </div>
            <motion.div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                language === opt.value ? "border-indigo-300" : "border-white/20"
              }`}
              animate={language === opt.value ? { scale: [1, 1.2, 1] } : {}}
            >
              {language === opt.value && (
                <motion.div
                  className="w-3.5 h-3.5 bg-indigo-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.div>
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="flex gap-3 mt-auto pt-8" variants={staggerItem}>
        <motion.button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl bg-white/10 text-white font-semibold active:scale-95 transition-all"
          whileTap={{ scale: 0.97 }}
        >
          ← Back
        </motion.button>
        <motion.button
          onClick={onNext}
          className="flex-[2] py-4 rounded-2xl bg-white text-indigo-600 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          whileTap={{ scale: 0.97 }}
        >
          {dt("language_next")} <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Step 4: Goal Selection ───────────────────────────────────────────────────
function GoalStep({ onNext, onBack, lang }: { onNext: () => void; onBack: () => void; lang: Language }) {
  const dt = useDisplayText(lang);
  const { goal, setGoal } = useOnboardingStore();

  return (
    <motion.div
      className="px-6 py-6 min-h-[70vh] flex flex-col"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.h2 className="text-2xl font-extrabold text-white mb-2" variants={staggerItem}>
        {dt("goal_title")}
      </motion.h2>
      <motion.p className="text-sm text-white/60 mb-8" variants={staggerItem}>
        {dt("goal_subtitle")}
      </motion.p>

      <motion.div className="space-y-3" variants={staggerContainer}>
        {GOALS.map((g) => (
          <motion.button
            key={g.id}
            onClick={() => setGoal(g.id)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
              goal === g.id
                ? `${g.bg} ${g.border} shadow-lg`
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
            variants={staggerItem}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-3xl">{g.icon}</span>
            <div className="flex-1">
              <span className={`text-base font-bold block ${goal === g.id ? g.color : "text-white/60"}`}>
                {dt(`goal_${g.id}`)}
              </span>
            </div>
            <motion.div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                goal === g.id ? g.border : "border-white/20"
              }`}
            >
              {goal === g.id && (
                <motion.div
                  className="w-3.5 h-3.5 bg-current rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.div>
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="flex gap-3 mt-auto pt-8" variants={staggerItem}>
        <motion.button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl bg-white/10 text-white font-semibold active:scale-95 transition-all"
          whileTap={{ scale: 0.97 }}
        >
          ← Back
        </motion.button>
        <motion.button
          onClick={onNext}
          className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-indigo-400 to-pink-400 text-white font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
        >
          {dt("goal_submit")} <Sparkles size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Step 5: Ready / Celebration ──────────────────────────────────────────────
function ReadyStep({ lang }: { lang: Language }) {
  const dt = useDisplayText(lang);
  const { classLevel, board, subjects, goal, reset } = useOnboardingStore();
  const router = useRouter();

  const goToDashboard = async () => {
    // Persist onboarding state to backend
    try {
      await fetch("/api/student/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classLevel,
          board,
          subjects,
          language: lang,
          goal,
          completed: true,
        }),
      });
    } catch {
      // offline — state already in localStorage
    }
    router.push("/dashboard");
  };

  const goalLabel = goal ? dt(`goal_${goal}`) : "";

  return (
    <motion.div
      className="px-6 py-6 min-h-[70vh] flex flex-col items-center text-center"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Celebration animation */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-amber-400 flex items-center justify-center shadow-2xl shadow-indigo-400/40 relative">
          <Trophy size={56} className="text-white" />
          {/* Confetti */}
          {["🎉", "🎊", "✨", "🌟", "💫"].map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{
                top: `${10 + i * 15}%`,
                left: `${5 + i * 20}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.h2 className="text-3xl font-extrabold text-white mb-3" variants={staggerItem}>
        {dt("ready_title")}
      </motion.h2>
      <motion.p className="text-white/60 text-sm mb-8 max-w-xs" variants={staggerItem}>
        {dt("ready_subtitle")}
      </motion.p>

      {/* Summary card */}
      <motion.div
        className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-8"
        variants={staggerItem}
      >
        <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">{dt("ready_summary")}</h3>
        <div className="space-y-3 text-left">
          <SummaryRow icon="🎓" label="Class" value={classLevel ? `Class ${classLevel}` : "—"} />
          <SummaryRow icon="📋" label="Board" value={board || "—"} />
          <SummaryRow icon="📚" label="Subjects" value={`${subjects.length} selected`} subjects={subjects} lang={lang} />
          <SummaryRow icon="🗣️" label="Language" value={dt(`language_${lang}`)} />
          <SummaryRow icon="🎯" label="Goal" value={goalLabel} />
        </div>
      </motion.div>

      <motion.div className="w-full max-w-sm space-y-3" variants={staggerItem}>
        <motion.button
          onClick={goToDashboard}
          className="w-full py-4 px-6 rounded-2xl bg-white text-indigo-600 font-bold text-base
                     shadow-lg shadow-black/20 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
        >
          {dt("ready_cta")} <ArrowRight size={18} />
        </motion.button>
        <button
          onClick={reset}
          className="text-xs text-white/30 hover:text-white/50 transition-colors"
        >
          Start over
        </button>
      </motion.div>
    </motion.div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
  subjects,
  lang,
}: {
  icon: string;
  label: string;
  value: string;
  subjects?: Subject[];
  lang?: Language;
}) {
  const dt = useDisplayText(lang || "en");
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50 flex items-center gap-2">
        <span>{icon}</span> {label}
      </span>
      <span className="text-sm text-white font-medium text-right">
        {subjects
          ? subjects.map((s) => (dt(s as any) || s)).join(", ")
          : value}
      </span>
    </div>
  );
}

// ─── Skip Banner ──────────────────────────────────────────────────────────────
function SkipBanner({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-end">
      <motion.button
        onClick={onSkip}
        className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white/60 text-xs font-medium
                   hover:bg-white/20 hover:text-white/80 transition-all border border-white/10"
        whileHover={{ y: -1 }}
      >
        Skip for now →
      </motion.button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const { step, setStep, next, prev, completed, reset } = useOnboardingStore();
  const [lang, setLang] = useState<Language>("en");
  const [direction, setDirection] = useState(1);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("onboarding_state") : null;
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.language) setLang(saved.language);
      }
    } catch {}
  }, []);

  // If already completed, redirect to dashboard after a beat
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("onboarding_state") : null;
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.completed) {
          window.location.href = "/dashboard";
        }
      }
    } catch {}
  }, []);

  const order: StepId[] = ["welcome", "class", "subjects", "language", "goal"];

  const goNext = () => {
    setDirection(1);
    if (step === "goal") {
      useOnboardingStore.getState().complete();
    } else {
      next();
    }
  };

  const goBack = () => {
    setDirection(-1);
    prev();
  };

  const goToStep = (s: StepId) => {
    setDirection(order.indexOf(s) > order.indexOf(step) ? 1 : -1);
    setStep(s);
  };

  const handleSkip = () => {
    reset();
    window.location.href = "/dashboard";
  };

  // ─── Background ──────────────────────────────────────────────────────────
  const bgContent = (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900" />

      {/* Mesh / noise overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(at 20% 30%, rgba(236,72,153,0.25) 0, transparent 50%),
                            radial-gradient(at 80% 70%, rgba(99,102,241,0.3) 0, transparent 50%),
                            radial-gradient(at 50% 0%, rgba(251,191,36,0.15) 0, transparent 40%)`,
        }}
      />

      {/* Glass card floating decorations */}
      <motion.div
        className="absolute top-20 left-6 w-40 h-40 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5"
        animate={{ y: [-10, 10, -10], rotate: [-3, 3, -3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-6 w-32 h-32 rounded-full bg-pink-400/10 backdrop-blur-sm border border-white/5"
        animate={{ y: [10, -10, 10], rotate: [3, -3, 3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/3 right-10 w-20 h-20 rounded-2xl bg-amber-300/10 backdrop-blur-sm border border-white/5"
        animate={{ y: [-5, 15, -5], rotate: [2, -2, 2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );

  // ─── Ready step (no progress bar, full celebration) ──────────────────────
  if (step === "ready") {
    return (
      <>
        {bgContent}
        <div className="min-h-screen">
          <SkipBanner onSkip={handleSkip} />
          <ReadyStep lang={lang} />
        </div>
      </>
    );
  }

  const currentIdx = order.indexOf(step);

  return (
    <>
      {bgContent}

      <div className="min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-5 pb-0">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white/80">LearnSphere</span>
          </div>

          {/* Language quick-switch */}
          <div className="flex items-center bg-white/10 rounded-xl p-0.5 backdrop-blur-sm">
            {(["en", "hinglish", "hindi"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 ${
                  lang === l ? "bg-white text-indigo-600 shadow-sm" : "text-white/50 hover:text-white/70"
                }`}
                aria-label={`Switch to ${l}`}
                aria-pressed={lang === l}
              >
                {l === "hinglish" ? "H" : l === "hindi" ? "हि" : "En"}
              </button>
            ))}
          </div>
        </header>

        {/* Progress */}
        <ProgressIndicator currentStep={step} />

        {/* Step content with animation */}
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
              className="absolute inset-0"
            >
              {step === "welcome" && (
                <WelcomeStep onNext={() => goToStep("class")} onSkip={handleSkip} lang={lang} />
              )}
              {step === "class" && (
                <ClassStep onNext={goNext} lang={lang} />
              )}
              {step === "subjects" && (
                <SubjectsStep onNext={goNext} onBack={goBack} lang={lang} />
              )}
              {step === "language" && (
                <LanguageStep onNext={goNext} onBack={goBack} lang={lang} />
              )}
              {step === "goal" && (
                <GoalStep onNext={goNext} onBack={goBack} lang={lang} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom skip link */}
        <div className="px-6 pb-6 pt-2 flex justify-center">
          <button
            onClick={handleSkip}
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            Skip onboarding →
          </button>
        </div>
      </div>
    </>
  );
}