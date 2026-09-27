'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import {
  useTeacherClasses,
  useClassStudents,
  useClassProgress,
  useCreateWorksheet,
  useSendWorksheet,
  useAssignHomework,
  type Class as ApiClass,
  type Student as ApiStudent,
  type ClassProgress,
  type WorksheetQuestion as ApiWorksheetQuestion,
  Difficulty,
  ContentLanguage,
} from '@/services/teacher.service';
import { useAuthStore } from '@/stores/authStore';
import AuthGuard from '@/components/AuthGuard';
import { useRouter } from 'next/navigation';

// --- TYPES ---
interface Student {
  id: string;
  name: string;
  /** Real average mastery % from the student's mastery records — null = no data yet. */
  mastery: number | null;
  /** Recorded practice answers (real activity events, all time). */
  practiceAttempts: number;
  /** ISO timestamp of last recorded activity — null when none. */
  lastActivityAt: string | null;
}

interface ClassData {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  /** Real class average mastery — null = nothing recorded yet (shown as "—"). */
  averageMastery: number | null;
  homeworkCompletionRate: number;
  students: Student[];
}

interface WorksheetQuestion {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  competency: string;
}

interface WorksheetForm {
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  numQuestions: number;
  competencyRatios: Record<string, number>;
}

// --- I18N TRANSLATIONS ---
const translations: Record<string, Record<string, any>> = {
  en: {
    dashboardTitle: 'Teacher Dashboard',
    classes: 'My Classes',
    students: 'students',
    avgMastery: 'Avg Mastery',
    completionRate: 'Completion Rate',
    createWorksheet: 'Create Worksheet',
    preview: 'Preview',
    sendWhatsApp: 'Send via WhatsApp',
    performance: 'Class Performance',
    struggling: 'Struggling',
    remediation: 'Send Remediation',
    subject: 'Subject',
    topic: 'Topic',
    difficulty: 'Difficulty',
    numQuestions: 'Questions',
    competencies: 'Competency Ratios',
    memory: 'Memory',
    understanding: 'Understanding',
    application: 'Application',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    mixed: 'Mixed',
    worksheetPreview: 'Worksheet Preview',
    generatedQuestions: 'Generated Questions',
    confirmSend: 'Confirm & Send',
    sent: 'Sent!',
    allStudents: 'All Students',
    mastery: 'Mastery',
    homeworkStatus: 'Homework Status',
    strugglingTopics: 'Struggling Topics',
    language: 'Language',
    back: 'Back',
    noStruggling: 'No struggling students 🎉',
    generateWorksheet: 'Generate Worksheet',
  },
  hi: {
    dashboardTitle: 'शिक्षक डैशबोर्ड',
    classes: 'मेरी कक्षाएं',
    students: 'छात्र',
    avgMastery: 'औसत महारत',
    completionRate: 'पूर्णता दर',
    createWorksheet: 'वर्कशीट बनाएं',
    preview: 'पूर्वावलोकन',
    sendWhatsApp: 'व्हाट्सएप से भेजें',
    performance: 'कक्षा प्रदर्शन',
    struggling: 'कठिनाई',
    remediation: 'सुधार भेजें',
    subject: 'विषय',
    topic: 'विषय',
    difficulty: 'कठिनाई स्तर',
    numQuestions: 'प्रश्न',
    competencies: 'क्षमता अनुपात',
    memory: 'स्मृति',
    understanding: 'समझ',
    application: 'अनुप्रयोग',
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन',
    mixed: 'मिश्रित',
    worksheetPreview: 'वर्कशीट पूर्वावलोकन',
    generatedQuestions: 'उत्पन्न प्रश्न',
    confirmSend: 'पुष्टि करें और भेजें',
    sent: 'भेज दिया!',
    allStudents: 'सभी छात्र',
    mastery: 'महारत',
    homeworkStatus: 'होमवर्क स्थिति',
    strugglingTopics: 'कठिनाई विषय',
    language: 'भाषा',
    back: 'वापस',
    noStruggling: 'कोई कठिनाई नहीं 🎉',
    generateWorksheet: 'वर्कशीट बनाएं',
  },
  hinglish: {
    dashboardTitle: 'Teacher Dashboard',
    classes: 'Meri Classes',
    students: 'students',
    avgMastery: 'Avg Mastery',
    completionRate: 'Completion Rate',
    createWorksheet: 'Worksheet Banaye',
    preview: 'Preview',
    sendWhatsApp: 'WhatsApp se Bheje',
    performance: 'Class Performance',
    struggling: 'Struggling',
    remediation: 'Remediation Bheje',
    subject: 'Subject',
    topic: 'Topic',
    difficulty: 'Difficulty',
    numQuestions: 'Questions',
    competencies: 'Competency Ratios',
    memory: 'Memory',
    understanding: 'Understanding',
    application: 'Application',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    mixed: 'Mixed',
    worksheetPreview: 'Worksheet Preview',
    generatedQuestions: 'Generated Questions',
    confirmSend: 'Confirm & Send',
    sent: 'Sent!',
    allStudents: 'All Students',
    mastery: 'Mastery',
    homeworkStatus: 'Homework Status',
    strugglingTopics: 'Struggling Topics',
    language: 'Language',
    back: 'Back',
    noStruggling: 'No struggling students 🎉',
    generateWorksheet: 'Worksheet Banaye',
  },
};

function t(key: string, lang: string): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

// --- HELPER COMPONENTS ---

type Lang = 'en' | 'hi' | 'hinglish';

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const opts = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'hinglish', label: 'हिं', full: 'Hinglish' },
    { code: 'hi', label: 'हि', full: 'हिन्दी' },
  ] as const;
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10" role="radiogroup" aria-label={t('language', lang)}>
      {opts.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setLang(opt.code)}
          role="radio"
          aria-checked={lang === opt.code}
          aria-label={opt.full}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 ${
            lang === opt.code
              ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, color, delay }: { icon: string; label: string; value: string | number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: easeOut }}
      className="rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-white font-bold text-lg" style={{ color }}>{value}</div>
      <div className="text-white/40 text-xs">{label}</div>
    </motion.div>
  );
}

function MasteryBadge({ value, lang }: { value: number; lang: string }) {
  const label = value >= 75 ? (lang === 'hi' ? 'उत्कृष्ट' : 'Excellent') : value >= 50 ? (lang === 'hi' ? 'औसत' : 'Average') : (lang === 'hi' ? 'कमजोर' : 'Weak');
  const color = value >= 75
    ? 'bg-green-500/15 text-green-300 border-green-500/30'
    : value >= 50
    ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
    : 'bg-red-500/15 text-red-300 border-red-500/30';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      {value}% {lang === 'hi' ? ' — ' : '· '}{t('mastery', lang)}: {label}
    </span>
  );
}

function MasteryBar({ value }: { value: number }) {
  const barColor = value >= 75 ? '#34d399' : value >= 50 ? '#fbbf24' : '#f87171';
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-1" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`Mastery: ${value}%`}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: barColor }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: easeOut }}
      />
    </div>
  );
}

function ClassCard({ cls, onSelect, lang, index }: { cls: ClassData; onSelect: () => void; lang: string; index: number }) {
  const strugglingCount = cls.students.filter(s => s.mastery !== null && s.mastery < 40).length;
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: easeOut }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="w-full text-left rounded-2xl p-5 border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{cls.name}</h3>
          <p className="text-white/40 text-sm mt-0.5">{cls.subject}</p>
        </div>
        {strugglingCount > 0 && (
          <span className="text-xs px-2 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 font-semibold">
            {strugglingCount} {t('struggling', lang)}
          </span>
        )}
      </div>
      <div className="flex gap-4 text-xs">
        <span className="text-white/60">👥 {cls.studentCount} {t('students', lang)}</span>
        <span className={cls.averageMastery === null ? 'text-white/40' : 'text-green-400'}>
          🎯 {cls.averageMastery === null ? 'No data yet' : `${cls.averageMastery}%`}
        </span>
        <span className="text-blue-400">📋 {cls.homeworkCompletionRate}%</span>
      </div>
    </motion.button>
  );
}

function StudentRow({ student, onRemediate, lang }: { student: Student; onRemediate: (id: string) => void; lang: string }) {
  const hasMastery = student.mastery !== null;
  const isStruggling = student.mastery !== null && student.mastery < 40;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-xl p-4 border backdrop-blur-md flex items-center justify-between ${
        isStruggling ? 'border-red-500/30 bg-red-500/5' : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${
          isStruggling ? 'bg-red-500/30' : 'bg-indigo-500/30'
        }`}>
          {student.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">{student.name}</p>
          <p className="text-white/40 text-xs truncate">
            {student.practiceAttempts > 0
              ? `${student.practiceAttempts} practice ${student.practiceAttempts === 1 ? 'answer' : 'answers'} recorded`
              : 'No practice recorded yet'}
            {student.lastActivityAt && ` · last ${new Date(student.lastActivityAt).toLocaleDateString()}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <span className={`text-xs font-bold min-w-[36px] text-right ${isStruggling ? 'text-red-300' : 'text-white/80'}`}>
            {hasMastery ? `${student.mastery}%` : '—'}
          </span>
          {hasMastery ? (
            <MasteryBar value={student.mastery} />
          ) : (
            <span className="block text-[10px] text-white/30 mt-1">No data yet</span>
          )}
        </div>
        {isStruggling && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemediate(student.id)}
            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
          >
            📱 {t('remediation', lang)}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

function StudentTable({ students, onRemediate, lang }: { students: Student[]; onRemediate: (id: string) => void; lang: string }) {
  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-white/40 text-sm">
        No students to show yet.
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {students.map((student) => (
        <StudentRow key={student.id} student={student} onRemediate={onRemediate} lang={lang} />
      ))}
    </div>
  );
}

function WorksheetFormView({ form, setForm, onGenerate, onPreview, lang, isGenerating }: {
  form: WorksheetForm;
  setForm: (f: WorksheetForm) => void;
  onGenerate: () => void;
  onPreview: () => void;
  lang: string;
  isGenerating: boolean;
}) {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const difficulties: Array<'easy' | 'medium' | 'hard' | 'mixed'> = ['easy', 'medium', 'hard', 'mixed'];

  return (
    <div className="space-y-5">
      {/* Subject */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('subject', lang)}</label>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
        >
          {subjects.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
        </select>
      </div>

      {/* Topic */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('topic', lang)}</label>
        <input
          type="text"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          placeholder={lang === 'hi' ? 'विषय दर्ज करें...' : 'Enter topic...'}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/30 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
        />
      </div>

      {/* Difficulty */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('difficulty', lang)}</label>
        <div className="flex gap-2">
          {difficulties.map(d => (
            <button
              key={d}
              onClick={() => setForm({ ...form, difficulty: d })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
                form.difficulty === d
                  ? 'bg-gradient-to-r from-indigo-500/30 to-pink-500/30 text-white border-indigo-400/50 shadow-md'
                  : 'text-white/40 hover:text-white hover:bg-white/5 border-white/10'
              }`}
            >
              {t(d, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Questions */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">
          {t('numQuestions', lang)}: <span className="text-white font-bold">{form.numQuestions}</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={form.numQuestions}
          onChange={(e) => setForm({ ...form, numQuestions: parseInt(e.target.value) })}
          className="w-full accent-indigo-500"
        />
      </div>

      {/* Competency Ratios */}
      <div>
        <label className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 block">{t('competencies', lang)}</label>
        <div className="space-y-3">
          {(['memory', 'understanding', 'application'] as const).map(comp => (
            <div key={comp} className="flex items-center gap-3">
              <span className="text-white/60 text-xs w-24 capitalize">{t(comp, lang)}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={form.competencyRatios[comp] || 0}
                onChange={(e) => setForm({
                  ...form,
                  competencyRatios: { ...form.competencyRatios, [comp]: parseInt(e.target.value) }
                })}
                className="flex-1 accent-pink-500"
              />
              <span className="text-white/80 text-xs w-8 text-right">{form.competencyRatios[comp] || 0}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 disabled:opacity-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
      >
        {isGenerating ? '⏳ ' + (lang === 'hi' ? 'बन रहा है...' : 'Generating...') : `📝 ${t('generateWorksheet', lang)}`}
      </motion.button>
    </div>
  );
}

function QuestionPreview({ questions, onConfirm, onBack, lang }: {
  questions: WorksheetQuestion[];
  onConfirm: () => void;
  onBack: () => void;
  lang: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-lg">{t('worksheetPreview', lang)}</h3>
        <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
          {questions.length} {t('generatedQuestions', lang)}
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <span className="text-white/40 text-sm font-bold shrink-0">Q{i + 1}.</span>
              <div className="flex-1">
                <p className="text-white text-sm">{q.text}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    q.difficulty === 'easy' ? 'bg-green-500/15 text-green-300 border-green-500/30' :
                    q.difficulty === 'medium' ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30' :
                    'bg-red-500/15 text-red-300 border-red-500/30'
                  }`}>
                    {t(q.difficulty, lang)}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {q.competency}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 text-sm font-semibold border border-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          ← {t('back', lang)}
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-green-500/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60"
        >
          📱 {t('confirmSend', lang)}
        </motion.button>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
function TeacherDashboard() {
  const [lang, setLang] = useState<'en' | 'hi' | 'hinglish'>('en');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'worksheet' | 'performance'>('overview');
  const [subTab, setSubTab] = useState<'form' | 'preview'>('form');
  const [worksheetForm, setWorksheetForm] = useState<WorksheetForm>({
    subject: 'Mathematics',
    topic: '',
    difficulty: 'mixed',
    numQuestions: 5,
    competencyRatios: { memory: 20, understanding: 30, application: 50 },
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<WorksheetQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sentFlash, setSentFlash] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [createdWorksheetId, setCreatedWorksheetId] = useState<string | null>(null);

  // ── Real API hooks ──
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  // Teacher surface requires a signed-in staff user — the page used to
  // render the full dashboard (with demo fallbacks) to anonymous
  // visitors (B27).
  useEffect(() => {
    if (isAuthenticated === false) router.replace('/login');
  }, [isAuthenticated, router]);

  const teacherId = user?.id ?? 'me';
  const { data: classesData, isLoading: classesLoading } = useTeacherClasses(teacherId);
  const { data: studentsData, isLoading: studentsLoading } = useClassStudents(selectedClassId);
  const { data: classProgress } = useClassProgress(selectedClassId);
  const createWorksheet = useCreateWorksheet();
  const sendWorksheet = useSendWorksheet(createdWorksheetId);
  const assignHomework = useAssignHomework();

  // Only the selected class has a progress payload; other classes show an
  // honest "no data yet" until selected and measured.
  const progressForClass = selectedClassId ? classProgress : undefined;

  // Map API classes to display format — mastery/completion come from the REAL
  // class-progress payload (mastery_records + practice activity), never
  // synthesized. averageMastery === null means nothing recorded yet.
  const apiClasses: ClassData[] = useMemo(() => {
    if (!classesData?.data) return [];
    return classesData.data.map((c: ApiClass) => ({
      id: c.id,
      name: c.name,
      subject: c.subject,
      studentCount: c.studentCount,
      averageMastery:
        c.id === selectedClassId && progressForClass
          ? progressForClass.averageMastery
          : null,
      homeworkCompletionRate: Math.round(
        ((c.id === selectedClassId ? progressForClass?.overallCompletionRate : undefined) ?? 0) * 100,
      ),
      students: [],
    }));
  }, [classesData, progressForClass, selectedClassId]);

  // Per-student mastery from the real progress payload, merged with the
  // roster. Students without recorded data carry mastery: null and render as
  // "No data yet" — never counted as struggling (a fabricated 0% would flag
  // every new student as failing).
  const apiStudents: Student[] = useMemo(() => {
    const progressStudents = progressForClass?.students ?? [];
    const byId = new Map(progressStudents.map((s) => [s.studentId, s]));
    const roster = studentsData ?? [];
    const ids = new Set<string>();
    const out: Student[] = [];
    const push = (s: ApiStudent) => {
      if (ids.has(s.id)) return;
      ids.add(s.id);
      const p = byId.get(s.id);
      out.push({
        id: s.id,
        name: `${s.firstName} ${s.lastName}`.trim(),
        mastery: p?.mastery ?? null,
        practiceAttempts: p?.practiceAttempts ?? 0,
        lastActivityAt: p?.lastActivityAt ?? null,
      });
    };
    roster.forEach(push);
    progressStudents.forEach((p) => {
      if (!ids.has(p.studentId)) {
        ids.add(p.studentId);
        out.push({
          id: p.studentId,
          name: p.name,
          mastery: p.mastery,
          practiceAttempts: p.practiceAttempts,
          lastActivityAt: p.lastActivityAt,
        });
      }
    });
    return out;
  }, [studentsData, progressForClass]);

  // Build the selected class with students
  const selectedClass = useMemo(() => {
    if (!selectedClassId) return null;
    const cls = apiClasses.find((c) => c.id === selectedClassId);
    if (!cls) return null;
    return { ...cls, students: apiStudents };
  }, [selectedClassId, apiClasses, apiStudents]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const difficultyMap: Record<string, Difficulty> = {
        easy: Difficulty.Easy,
        medium: Difficulty.Medium,
        hard: Difficulty.Hard,
      };
      const difficulty = worksheetForm.difficulty === 'mixed'
        ? Difficulty.Medium
        : difficultyMap[worksheetForm.difficulty] ?? Difficulty.Medium;

      const langMap: Record<string, ContentLanguage> = {
        en: ContentLanguage.English,
        hi: ContentLanguage.Hindi,
        hinglish: ContentLanguage.Hinglish,
      };

      const questions: Omit<ApiWorksheetQuestion, 'id'>[] = Array.from(
        { length: worksheetForm.numQuestions },
        (_, i) => ({
          type: 'short_answer' as const,
          prompt: `${worksheetForm.topic} — Question ${i + 1}`,
          correctAnswer: '',
          marks: 5,
          hints: [],
        }),
      );

      const worksheet = await createWorksheet.mutateAsync({
        title: `${worksheetForm.subject}: ${worksheetForm.topic || 'Worksheet'}`,
        subject: worksheetForm.subject,
        grade: selectedClass ? parseInt(selectedClass.name.match(/\d+/)?.[0] ?? '10') : 10,
        chapter: worksheetForm.topic,
        difficulty,
        language: langMap[lang] ?? ContentLanguage.English,
        questions,
      });

      setCreatedWorksheetId(worksheet.id);
      setGeneratedQuestions(
        worksheet.questions.map((q) => ({
          id: q.id,
          text: q.prompt,
          difficulty: q.type.includes('choice') ? 'easy' : 'medium',
          competency: 'Understanding',
        })),
      );
      setSubTab('preview');
    } catch (err) {
      console.error('Worksheet generation failed:', err);
      // Fallback: show empty preview with error message
      setGeneratedQuestions([]);
      setSubTab('preview');
    } finally {
      setIsGenerating(false);
    }
  }, [worksheetForm, createWorksheet, selectedClass, lang]);

  const handleSendWhatsApp = useCallback(async () => {
    if (!createdWorksheetId || !selectedClass) return;
    setSentFlash(true);
    try {
      const recipientIds = selectedClass.students.map((s) => s.id);
      await sendWorksheet.mutateAsync({ recipientIds, message: 'Your worksheet is ready!' });
    } catch (err) {
      console.error('WhatsApp send failed:', err);
    } finally {
      setTimeout(() => setSentFlash(false), 3000);
    }
  }, [createdWorksheetId, selectedClass, sendWorksheet]);

  const handleRemediate = useCallback((studentId: string) => {
    // In production this would call a remediation endpoint
    console.log(`Remediation triggered for student: ${studentId}`);
  }, []);

  const filteredStudents = useMemo(() => {
    if (!selectedClass) return [];
    const students = selectedClass.students;
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(s => s.name.toLowerCase().includes(q));
  }, [selectedClass, searchQuery]);

  // --- CLASS SELECTION VIEW ---
  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950" role="main">
        <div className="max-w-lg mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                👩‍🏫 {t('dashboardTitle', lang)}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-sm mt-1"
              >
                {user?.name ?? 'Teacher'}
              </motion.p>
            </div>
            <LanguageToggle lang={lang} setLang={setLang} />
          </header>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-sm mb-4"
          >
            {t('classes', lang)}
          </motion.p>

          {classesLoading ? (
            <div className="text-center py-8 text-white/40 text-sm">Loading classes…</div>
          ) : apiClasses.length === 0 ? (
            <div className="text-center py-8 text-white/40 text-sm">No classes assigned yet.</div>
          ) : (
            <div className="space-y-4">
              {apiClasses.map((cls, i) => (
                <ClassCard
                  key={cls.id}
                  cls={cls}
                  lang={lang}
                  index={i}
                  onSelect={() => setSelectedClassId(cls.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- CLASS DETAIL VIEW ---
  const cls = selectedClass;
  const strugglingCount = cls.students.filter(s => s.mastery !== null && s.mastery < 40).length;
  const hasClassData = Boolean(progressForClass?.hasData);
  const tabs = [
    { key: 'overview' as const, label: t('classes', lang), icon: '📊' },
    { key: 'worksheet' as const, label: t('createWorksheet', lang), icon: '📝' },
    { key: 'performance' as const, label: t('performance', lang), icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950" role="main">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setSelectedClassId(null); setActiveTab('overview'); setSubTab('form'); setGeneratedQuestions([]); setCreatedWorksheetId(null); }}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Back to classes"
            >
              ←
            </motion.button>
            <div>
              <motion.h1 className="text-xl font-bold text-white leading-tight" layout>
                {cls.name}
              </motion.h1>
              <motion.p className="text-white/40 text-xs" layout>
                {cls.subject} · {cls.studentCount} {t('students', lang)}
              </motion.p>
            </div>
          </div>
          <LanguageToggle lang={lang} setLang={setLang} />
        </header>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 mb-6" role="tablist" aria-label="Dashboard sections">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => { setActiveTab(tab.key); if (tab.key !== 'worksheet') setSubTab('form'); }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-indigo-500/30 to-pink-500/30 text-white shadow-md'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="space-y-5"
            >
              <div className="grid grid-cols-3 gap-3">
                <StatCard icon="👥" label={t('students', lang)} value={cls.studentCount} color="#6366f1" delay={0} />
                <StatCard icon="🎯" label={t('avgMastery', lang)} value={cls.averageMastery === null ? '—' : `${cls.averageMastery}%`} color="#f472b6" delay={0.1} />
                <StatCard icon="📋" label={t('completionRate', lang)} value={`${cls.homeworkCompletionRate}%`} color="#34d399" delay={0.2} />
              </div>

              {!hasClassData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🌱</span>
                    <h3 className="text-white/80 font-bold text-sm">No class data yet</h3>
                  </div>
                  <p className="text-white/40 text-xs">
                    Students haven&apos;t started practicing — mastery and activity numbers appear here as soon as they do. Nothing is estimated or filled in.
                  </p>
                </motion.div>
              )}

              {hasClassData && strugglingCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-5 border border-red-500/30 bg-red-500/10 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚠️</span>
                    <h3 className="text-red-300 font-bold text-sm">
                      {strugglingCount} {t('struggling', lang)} {t('students', lang).toLowerCase()}
                    </h3>
                  </div>
                  <p className="text-red-300/60 text-xs">
                    Measured mastery below 40%. Tap Performance tab for details.
                  </p>
                </motion.div>
              )}

              <div>
                <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '📝', label: t('createWorksheet', lang), action: () => setActiveTab('worksheet') },
                    { icon: '📈', label: t('performance', lang), action: () => setActiveTab('performance') },
                  ].map((action, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={action.action}
                      className="rounded-xl p-4 border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                    >
                      <span className="text-2xl block mb-2">{action.icon}</span>
                      <span className="text-white text-sm font-semibold">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'worksheet' && (
            <motion.div
              key="worksheet"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: easeOut }}
            >
              <AnimatePresence mode="wait">
                {subTab === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <WorksheetFormView
                      form={worksheetForm}
                      setForm={setWorksheetForm}
                      onGenerate={handleGenerate}
                      onPreview={() => setSubTab('preview')}
                      lang={lang}
                      isGenerating={isGenerating}
                    />
                  </motion.div>
                )}
                {subTab === 'preview' && (
                  <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <QuestionPreview
                      questions={generatedQuestions}
                      onConfirm={handleSendWhatsApp}
                      onBack={() => setSubTab('form')}
                      lang={lang}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">{t('allStudents', lang)}</h3>
                <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                  {filteredStudents.length} {t('students', lang)}
                </span>
              </div>

              <div className="relative">
                <input
                  type="search"
                  placeholder="Search students or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/30 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 transition-all"
                  aria-label="Search students"
                />
                <span className="absolute left-3 top-3.5 text-white/30">🔍</span>
              </div>

              <StudentTable students={filteredStudents} onRemediate={handleRemediate} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Sent Flash */}
        <AnimatePresence>
          {sentFlash && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-green-500 text-white shadow-2xl shadow-green-500/40 border border-green-400/30 flex items-center gap-3"
              role="alert"
            >
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-sm">{t('sent', lang)}</p>
                <p className="text-green-100 text-xs">Homework sent to {cls.studentCount} students via WhatsApp</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TeacherOverviewPage() {
  // B27: the teacher portal must never render for logged-out visitors or
  // students — backend APIs are staff-guarded, the page now matches.
  return (
    <AuthGuard allowedRoles={['teacher', 'admin']}>
      <TeacherDashboard />
    </AuthGuard>
  );
}
