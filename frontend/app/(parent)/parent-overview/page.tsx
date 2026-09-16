'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Type Definitions ───────────────────────────────────────────

type Subject = 'maths' | 'physics' | 'chemistry';

type Language = 'en' | 'hinglish' | 'hindi';

interface SubjectMastery {
  subject: Subject;
  name: string;
  percentage: number;
}

interface HomeworkItem {
  subject: Subject;
  title: string;
  status: 'completed' | 'pending' | 'overdue';
  date: string;
  score?: string;
}

interface ActivityItem {
  id: string;
  description: string;
  time: string;
  icon: string;
  type: 'solved' | 'question' | 'homework' | 'exam';
}

// ─── Translations ────────────────────────────────────────────────

const translations: Record<Language, Record<string, any>> = {
  en: {
    parentDashboard: 'Parent Dashboard',
    childName: 'Aarav',
    childClass: 'Class 10th',
    schoolName: 'DPS, Rohini',
    todayOverview: "Today's Overview",
    mathsCompleted: 'Maths Homework Completed',
    ofProblems: 'of 10 problems solved',
    streak: 'Day Streak',
    streakMessage: 'Keep it up, Aarav! 🔥',
    thisWeek: 'This Week',
    homeworkDone: 'Homework Done',
    homeworkPending: 'Pending',
    homeworkOverdue: 'Overdue',
    mastery: 'Subject Mastery',
    recentActivity: 'Recent Activity',
    upcoming: 'Upcoming',
    mathsExam: 'Maths Exam',
    examDate: 'March 15, 2025',
    examSubtitle: 'Chapter 5-8 · Algebra & Geometry',
    connectWhatsApp: '📱 Connect on WhatsApp',
    whatsAppSubtitle: 'Get instant updates about Aarav\'s progress',
    viewFullReport: 'View Full Report',
    solvedProblems: 'solved problems',
    askedTutor: 'asked tutor',
    questions: 'questions',
    noActivity: 'No recent activity',
    masteryNote: 'Mastery percentages reflect conceptual understanding, not exact scores.',
    subjects: {
      maths: 'Mathematics',
      physics: 'Physics',
      chemistry: 'Chemistry',
    },
    levels: {
      excellent: 'Excellent',
      good: 'Good Progress',
      needsWork: 'Needs Attention',
    },
    activityTypes: {
      solved: 'Solved',
      question: 'Question',
      homework: 'Homework',
      exam: 'Exam',
    },
  },
  hinglish: {
    parentDashboard: 'Parent Dashboard',
    childName: 'Aarav',
    childClass: 'Class 10th',
    schoolName: 'DPS, Rohini',
    todayOverview: "Aaj ka Saransh",
    mathsCompleted: 'Maths Homework Complete',
    ofProblems: '10 problems mein se solve kiye',
    streak: 'Din ka Streak',
    streakMessage: 'Shabash, Aarav! 🔥',
    thisWeek: 'Is Hafta',
    homeworkDone: 'Homework Done',
    homeworkPending: 'Baki Hai',
    homeworkOverdue: 'Late Ho Gaya',
    mastery: 'Subject Mastery',
    recentActivity: 'Recent Activity',
    upcoming: 'Aane Wala',
    mathsExam: 'Maths Exam',
    examDate: '15 March, 2025',
    examSubtitle: 'Chapter 5-8 · Algebra & Geometry',
    connectWhatsApp: '📱 WhatsApp pe Connect Karein',
    whatsAppSubtitle: 'Aarav ki progress ke baare mein turant updates paayein',
    viewFullReport: 'Full Report Dekhein',
    solvedProblems: 'problems solve kiye',
    askedTutor: 'tutor se poocha',
    questions: 'sawaal',
    noActivity: 'Koi recent activity nahi',
    masteryNote: 'Mastery percentage conceptual samajh ko show karta hai, exact score nahi.',
    subjects: {
      maths: 'Ganit',
      physics: 'Bhautik Vigyan',
      chemistry: 'Rasayan Vigyan',
    },
    levels: {
      excellent: 'Excellent',
      good: 'Achha Progress',
      needsWork: 'Dhyan Chahiye',
    },
    activityTypes: {
      solved: 'Solve Kiya',
      question: 'Sawaal',
      homework: 'Homework',
      exam: 'Exam',
    },
  },
  hindi: {
    parentDashboard: 'माता-पिता डैशबोर्ड',
    childName: 'आरव',
    childClass: 'कक्षा 10वीं',
    schoolName: 'DPS, रोहिणी',
    todayOverview: 'आज का सारांश',
    mathsCompleted: 'गणित का होमवर्क पूर्ण',
    ofProblems: '10 प्रश्नों में से हल किए',
    streak: 'दिन का स्ट्रीक',
    streakMessage: 'शाबाश, आरव! 🔥',
    thisWeek: 'इस सप्ताह',
    homeworkDone: 'होमवर्क पूर्ण',
    homeworkPending: 'बाकी है',
    homeworkOverdue: 'विलंबित',
    mastery: 'विषय में प्रभुत्व',
    recentActivity: 'हाल की गतिविधि',
    upcoming: 'आगामी',
    mathsExam: 'गणित परीक्षा',
    examDate: '15 मार्च, 2025',
    examSubtitle: 'अध्याय 5-8 · बीजगणित और ज्यामिति',
    connectWhatsApp: '📱 व्हाट्सएप पर जुड़ें',
    whatsAppSubtitle: 'आरव की प्रगति के बारे में तुरंत अपडेट प्राप्त करें',
    viewFullReport: 'पूरी रिपोर्ट देखें',
    solvedProblems: 'प्रश्न हल किए',
    askedTutor: 'ट्यूटर से पूछा',
    questions: 'सवाल',
    noActivity: 'कोई हालिया गतिविधि नहीं',
    masteryNote: 'प्रभुत्व प्रतिशत अवधारणात्मक समझ को दर्शाता है, ठीक स्कोर नहीं।',
    subjects: {
      maths: 'गणित',
      physics: 'भौतिक विज्ञान',
      chemistry: 'रसायन विज्ञान',
    },
    levels: {
      excellent: 'उत्कृष्ट',
      good: 'अच्छी प्रगति',
      needsWork: 'ध्यान चाहिए',
    },
    activityTypes: {
      solved: 'हल किया',
      question: 'सवाल',
      homework: 'होमवर्क',
      exam: 'परीक्षा',
    },
  },
};

// ─── Fallback demo data (shown only when the API is unreachable) ─

const DEMO_SUBJECT_MASTERY: SubjectMastery[] = [
  { subject: 'maths', name: 'Mathematics', percentage: 73 },
  { subject: 'physics', name: 'Physics', percentage: 45 },
  { subject: 'chemistry', name: 'Chemistry', percentage: 62 },
];

const DEMO_HOMEWORK: HomeworkItem[] = [
  { subject: 'maths', title: 'Algebra Practice Set', status: 'completed', date: 'Mon', score: '8/10' },
  { subject: 'physics', title: 'Laws of Motion Worksheet', status: 'completed', date: 'Tue' },
  { subject: 'chemistry', title: 'Chemical Reactions Quiz', status: 'completed', date: 'Wed' },
];

const DEMO_ACTIVITIES: ActivityItem[] = [
  { id: '1', description: 'Solved problems in Mathematics', time: 'recently', icon: '✅', type: 'solved' },
];

const SUBJECT_KEYS: Record<string, Subject> = {
  mathematics: 'maths', maths: 'maths', math: 'maths',
  physics: 'physics', chemistry: 'chemistry',
};

const WHATSAPP_NUMBER = '919876543210';

// ─── Helpers ─────────────────────────────────────────────────────

function getLevelInfo(percentage: number) {
  if (percentage > 70) return { color: 'emerald', label: 'levels.excellent', barColor: 'bg-emerald-500' };
  if (percentage >= 40) return { color: 'amber', label: 'levels.good', barColor: 'bg-amber-500' };
  return { color: 'rose', label: 'levels.needsWork', barColor: 'bg-rose-500' };
}

function getStatusConfig(status: string) {
  switch (status) {
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'homeworkDone' };
    case 'pending': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400', label: 'homeworkPending' };
    case 'overdue': return { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', dot: 'bg-rose-500', label: 'homeworkOverdue' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-400', label: '' };
  }
}

// ─── Animation Variants ──────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
};

// ─── Progress Bar Component ──────────────────────────────────────

function MasteryBar({ percentage, labelKey, name, lang }: { percentage: number; labelKey: string; name: string; lang: Language }) {
  const level = getLevelInfo(percentage);
  const t = translations[lang];
  const displayName = labelKey === 'subjects.maths' ? t.subjects.maths : labelKey === 'subjects.physics' ? t.subjects.physics : t.subjects.chemistry;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
              level.color === 'emerald'
                ? 'bg-emerald-100 text-emerald-700'
                : level.color === 'amber'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            {displayName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">{displayName}</p>
            <p className={`text-xs sm:text-sm font-medium ${
              level.color === 'emerald' ? 'text-emerald-600' :
              level.color === 'amber' ? 'text-amber-600' : 'text-rose-600'
            }`}>
              {t[level.label as keyof typeof t] || level.label}
            </p>
          </div>
        </div>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.5 }}
          className={`text-2xl sm:text-3xl font-bold ${
            level.color === 'emerald' ? 'text-emerald-600' :
            level.color === 'amber' ? 'text-amber-600' : 'text-rose-600'
          }`}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 sm:h-4 overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${displayName} mastery: ${percentage}%`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
          className={`h-full rounded-full relative ${level.barColor}`}
        >
          <motion.div
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Activity Timeline Component ─────────────────────────────────

function ActivityTimeline({ activities, lang }: { activities: ActivityItem[]; lang: Language }) {
  const t = translations[lang];

  return (
    <div className="space-y-0">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          variants={slideInVariants}
          className="flex gap-3 sm:gap-4 relative"
        >
          {/* Timeline connector */}
          {index < activities.length - 1 && (
            <div className="absolute left-[19px] sm:left-[23px] top-10 w-0.5 h-full bg-gray-100" />
          )}
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-base sm:text-lg flex-shrink-0"
          >
            {activity.icon}
          </motion.div>
          {/* Content */}
          <motion.div
            whileHover={{ x: 4 }}
            className="flex-1 pb-5 pt-1"
          >
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{activity.description}</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">{activity.time}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Streak Flame Component ──────────────────────────────────────

function StreakFlame({ days, lang }: { days: number; lang: Language }) {
  const t = translations[lang];

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl p-4 sm:p-6 border border-orange-100/50 text-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -5, 5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-5xl sm:text-6xl mb-2 inline-block"
        aria-hidden="true"
      >
        🔥
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent"
      >
        {days}
      </motion.div>
      <p className="text-sm sm:text-base font-semibold text-gray-600 mt-1">{t.streak}</p>
      <p className="text-xs text-orange-500/80 mt-2 font-medium italic">{t.streakMessage}</p>
    </motion.div>
  );
}

// ─── Homework Summary Component ──────────────────────────────────

function HomeworkSummary({ items, lang }: { items: HomeworkItem[]; lang: Language }) {
  const t = translations[lang];
  const completed = items.filter(i => i.status === 'completed').length;
  const pending = items.filter(i => i.status === 'pending').length;
  const overdue = items.filter(i => i.status === 'overdue').length;

  const stats = [
    { label: t.homeworkDone, count: completed, color: 'emerald', icon: '✅' },
    { label: t.homeworkPending, count: pending, color: 'amber', icon: '⏳' },
    { label: t.homeworkOverdue, count: overdue, color: 'rose', icon: '⚠️' },
  ];

  return (
    <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 300 }}
          className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border ${
            stat.color === 'emerald'
              ? 'bg-emerald-50/80 border-emerald-100'
              : stat.color === 'amber'
              ? 'bg-amber-50/80 border-amber-100'
              : 'bg-rose-50/80 border-rose-100'
          }`}
        >
          <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
          <div className={`text-xl sm:text-3xl font-extrabold ${
            stat.color === 'emerald' ? 'text-emerald-600' :
            stat.color === 'amber' ? 'text-amber-600' : 'text-rose-600'
          }`}>
            {stat.count}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500 font-semibold mt-0.5 leading-tight">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Language Switcher ───────────────────────────────────────────

function LanguageSwitcher({ current, onChange }: { current: Language; onChange: (l: Language) => void }) {
  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hinglish', label: 'Hinglish', native: 'हिंग्लिश' },
    { code: 'hindi', label: 'Hindi', native: 'हिंदी' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 border border-white/50 shadow-sm"
      role="radiogroup"
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          role="radio"
          aria-checked={current === lang.code}
          onClick={() => onChange(lang.code)}
          className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            current === lang.code
              ? 'bg-indigo-500 text-white shadow-md'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          {lang.native}
        </button>
      ))}
    </motion.div>
  );
}

// ─── WhatsApp Button ──────────────────────────────────────────────

function WhatsAppButton({ lang }: { lang: Language }) {
  const t = translations[lang];

  return (
    <motion.a
      variants={itemVariants}
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! Main Aarav ka parent hoon. Mera baccha ka progress update chahiye.')}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl py-4 px-6 font-bold text-base sm:text-lg shadow-lg shadow-green-500/25 transition-colors"
    >
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {t.connectWhatsApp}
    </motion.a>
  );
}

// ─── Language-stored State ───────────────────────────────────────

const LANG_STORAGE_KEY = 'parent-dashboard-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored === 'en' || stored === 'hinglish' || stored === 'hindi') return stored;
  // Try to detect browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('hi')) return 'hindi';
  if (browserLang.includes('hinglish') || browserLang.includes('en-in')) return 'hinglish';
  return 'en';
}

// ─── Main Page ────────────────────────────────────────────────────

// ─── Live data wiring ─────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

function authHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Get the logged-in parent's id from the persisted student-store. */
function getParentId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('student-storage');
    if (!raw) return null;
    return JSON.parse(raw)?.state?.profile?.id || null;
  } catch {
    return null;
  }
}

function subjectKey(name: string): Subject {
  return SUBJECT_KEYS[(name || '').toLowerCase()] || 'maths';
}

interface LiveData {
  childName: string | null;
  childGrade: string | null;
  streak: number;
  mastery: SubjectMastery[];
  homework: HomeworkItem[];
  activities: ActivityItem[];
}

const EMPTY_LIVE: LiveData = {
  childName: null, childGrade: null, streak: 0,
  mastery: [], homework: [], activities: [],
};

async function loadLiveData(parentId: string): Promise<LiveData> {
  const headers = authHeaders();
  const out: LiveData = { ...EMPTY_LIVE };

  const pd: any = await fetch(`${API_BASE}/api/dashboard/parent/${parentId}`, { headers })
    .then(r => (r.ok ? r.json() : null)).catch(() => null);
  const child = pd?.children?.[0];
  if (!child) return out;

  out.childName = child.student_name;
  out.childGrade = child.grade;
  out.streak = child.current_streak ?? 0;

  // Per-subject mastery from the child's student dashboard
  const sd: any = await fetch(`${API_BASE}/api/dashboard/student/${child.student_id}`, { headers })
    .then(r => (r.ok ? r.json() : null)).catch(() => null);
  if (sd?.mastery_by_topic?.length) {
    const agg: Record<string, { sum: number; n: number; name: string }> = {};
    for (const t of sd.mastery_by_topic) {
      const k = subjectKey(t.subject_name || '');
      agg[k] = agg[k] || { sum: 0, n: 0, name: t.subject_name };
      agg[k].sum += t.mastery_score ?? 0;
      agg[k].n += 1;
    }
    out.mastery = Object.entries(agg).map(([k, v]) => ({
      subject: k as Subject, name: v.name, percentage: Math.round(v.sum / v.n),
    }));
  }

  // Homework list
  const hw: any = await fetch(`${API_BASE}/api/homework/student/${child.student_id}`, { headers })
    .then(r => (r.ok ? r.json() : [])).catch(() => []);
  out.homework = (Array.isArray(hw) ? hw : hw?.items || []).map((h: any) => ({
    subject: subjectKey(h.subject),
    title: h.title,
    status: h.status === 'submitted' || h.status === 'graded' ? 'completed'
      : h.status === 'late' ? 'overdue' : 'pending',
    date: h.due_date ? new Date(h.due_date).toLocaleDateString('en-IN', { weekday: 'short' }) : '',
    score: h.score != null && h.total_marks ? `${h.score}/${h.total_marks}` : undefined,
  }));

  // Parent insights → activity feed
  out.activities = (pd?.insights || []).slice(0, 6).map((ins: any, i: number) => ({
    id: String(i),
    description: `${ins.title}: ${ins.detail}`,
    time: ins.trend || '',
    icon: ins.trend === 'improving' ? '📈' : ins.trend === 'declining' ? '📉' : 'ℹ️',
    type: 'question' as const,
  }));

  return out;
}

export default function ParentDashboard() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [live, setLive] = useState<LiveData>(EMPTY_LIVE);

  const t = translations[lang];
  const subjectMastery = live.mastery.length ? live.mastery : DEMO_SUBJECT_MASTERY;
  const weeklyHomework = live.homework.length ? live.homework : DEMO_HOMEWORK;
  const recentActivities = live.activities.length ? live.activities : DEMO_ACTIVITIES;

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pid = getParentId();
    if (!pid) return;
    let cancelled = false;
    loadLiveData(pid).then(d => { if (!cancelled) setLive(d); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50" dir={lang === 'hindi' ? 'ltr' : 'ltr'}>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* ─── Header ───────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white font-bold text-lg sm:text-xl" aria-hidden="true">📚</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">{t.parentDashboard}</h1>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Atlas · Smart Learning</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <LanguageSwitcher current={lang} onChange={setLang} />
          </motion.div>
        </div>
      </header>

      {/* ─── Main Content ──────────────────────── */}
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5">
        <AnimatePresence mode="wait">
          {isLoaded && (
            <motion.div
              key={lang}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              variants={containerVariants}
            >
              {/* ── Child Profile Card ───────────── */}
              <motion.div variants={itemVariants} className="relative">
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl shadow-indigo-500/20 overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.3 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-3xl sm:text-4xl shadow-lg"
                    >
                      👦
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold">{live.childName || t.childName}</h2>
                      <p className="text-white/80 text-sm sm:text-base font-medium mt-0.5">{live.childGrade ? `Class ${live.childGrade}` : t.childClass} · {t.schoolName}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" aria-hidden="true" />
                        <span className="text-xs sm:text-sm text-white/90 font-medium">Online · Learning now</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-2.5 transition-colors border border-white/20"
                      aria-label="Settings"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* ── Today Overview ──────────────── */}
              <motion.section variants={itemVariants} aria-labelledby="today-heading">
                <h3 id="today-heading" className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span aria-hidden="true">📊</span> {t.todayOverview}
                </h3>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/50 shadow-sm space-y-4">
                  {/* Maths homework completed */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl" aria-hidden="true">📐</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-bold text-gray-800">{t.mathsCompleted}</p>
                      <p className="text-xs sm:text-sm text-gray-500">8{t.ofProblems}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">8</span>
                      <span className="text-sm text-gray-400 font-semibold">/10</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" role="separator" />

                  {/* Streak */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl" aria-hidden="true">🔥</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-bold text-gray-800">{t.streak}</p>
                      <p className="text-xs sm:text-sm text-orange-500 font-medium">{t.streakMessage}</p>
                    </div>
                    <StreakFlame days={live.streak || 7} lang={lang} />
                  </div>
                </div>
              </motion.section>

              {/* ── This Week ────────────────────── */}
              <motion.section variants={itemVariants} aria-labelledby="week-heading">
                <h3 id="week-heading" className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span aria-hidden="true">📅</span> {t.thisWeek}
                </h3>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/50 shadow-sm">
                  <HomeworkSummary items={weeklyHomework} lang={lang} />

                  {/* Individual homework items */}
                  <div className="mt-4 space-y-2" role="list" aria-label="Homework list">
                    {weeklyHomework.map((hw, index) => {
                      const statusConfig = getStatusConfig(hw.status);
                      const subjectNames: Record<Subject, string> = {
                        maths: t.subjects.maths,
                        physics: t.subjects.physics,
                        chemistry: t.subjects.chemistry,
                      };

                      return (
                        <motion.div
                          key={`${hw.subject}-${hw.date}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.08 }}
                          className={`flex items-center gap-3 p-3 rounded-xl border ${statusConfig.bg} ${statusConfig.border}`}
                          role="listitem"
                        >
                          <span className={`w-2 h-2 rounded-full ${statusConfig.dot} flex-shrink-0`} aria-hidden="true" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-semibold ${statusConfig.text} truncate`}>{hw.title}</p>
                            <p className="text-[10px] sm:text-xs text-gray-400">{subjectNames[hw.subject]} · {hw.date}</p>
                          </div>
                          {hw.score && (
                            <span className="text-xs sm:text-sm font-bold text-emerald-600 flex-shrink-0">{hw.score}</span>
                          )}
                          <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${statusConfig.text} ${statusConfig.bg} border ${statusConfig.border} flex-shrink-0`}>
                            {t[statusConfig.label as keyof typeof t] || hw.status}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.section>

              {/* ── Subject Mastery ─────────────── */}
              <motion.section variants={itemVariants} aria-labelledby="mastery-heading">
                <h3 id="mastery-heading" className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span aria-hidden="true">🎯</span> {t.mastery}
                </h3>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/50 shadow-sm">
                  <div className="space-y-3 sm:space-y-4">
                    {subjectMastery.map((subject) => (
                      <MasteryBar
                        key={subject.subject}
                        percentage={subject.percentage}
                        labelKey={`subjects.${subject.subject}`}
                        name={subject.name}
                        lang={lang}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-4 text-center italic">
                    {t.masteryNote}
                  </p>
                </div>
              </motion.section>

              {/* ── Recent Activity ─────────────── */}
              <motion.section variants={itemVariants} aria-labelledby="activity-heading">
                <h3 id="activity-heading" className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span aria-hidden="true">⚡</span> {t.recentActivity}
                </h3>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/50 shadow-sm">
                  <ActivityTimeline activities={recentActivities} lang={lang} />
                </div>
              </motion.section>

              {/* ── Upcoming Exam ───────────────── */}
              <motion.section variants={itemVariants} aria-labelledby="upcoming-heading">
                <h3 id="upcoming-heading" className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span aria-hidden="true">📅</span> {t.upcoming}
                </h3>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-indigo-100/50 shadow-sm"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] sm:text-xs font-bold text-indigo-400 uppercase">Mar</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-indigo-600 leading-none">15</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-gray-800">{t.mathsExam}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{t.examDate}</p>
                      <p className="text-xs text-indigo-500/80 font-medium mt-1">{t.examSubtitle}</p>
                    </div>
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-2xl sm:text-3xl flex-shrink-0"
                      aria-hidden="true"
                    >
                      📝
                    </motion.div>
                  </div>

                  {/* Preparation progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-600">Preparation Progress</span>
                      <span className="text-xs font-bold text-indigo-600">60%</span>
                    </div>
                    <div className="w-full bg-indigo-100/80 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {/* ── WhatsApp Connect ────────────── */}
              <motion.section variants={itemVariants}>
                <WhatsAppButton lang={lang} />
              </motion.section>

              {/* ── Footer ──────────────────────── */}
              <motion.div variants={itemVariants} className="text-center py-4 sm:py-6">
                <p className="text-[10px] sm:text-xs text-gray-400">
                  Atlas · Empowering every child to learn smarter
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
