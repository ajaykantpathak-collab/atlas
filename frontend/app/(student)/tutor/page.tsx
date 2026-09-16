'use client';

// ──────────────────────────────────────────────────────
// Socratic Tutor Chat — K-12 Learning Platform
// Class 11 ISC · Mobile-first · Offline-capable · WCAG AA
// Hinglish / Hindi support · Subject-aware · Mastery bar
// ──────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import katex from 'katex';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStudentStore } from '@/stores/studentStore';
import { offlineCache } from '@/lib/offlineCache';
import { friendlyNodeTitle, subjectName } from '@/lib/nodeTitle';

// ─── Local toast shim (sonner not installed) ──────────────
// Minimal no-op implementation so toast.success/error/info/loading
// calls compile and run without pulling in an extra dependency.
const toast = {
  success: (_msg?: string, _opts?: unknown) => {},
  error: (_msg?: string, _opts?: unknown) => {},
  info: (_msg?: string, _opts?: unknown) => {},
  loading: (_msg?: string, _opts?: unknown) => {},
};

// ─── Local offline-cache helpers for tutor messages ───────
// The shared offlineCache API has no per-conversation message
// store, so we piggy-back on the generic profile store with a
// namespaced key. Pending (offline-queued) messages use the
// existing sync queue.
type PendingMessage = { id: string; payload: unknown };

function messagesKey(userId?: string, nodeId?: string): string {
  return `tutor-messages-${userId ?? 'guest'}-${nodeId ?? 'default'}`;
}

function pendingKey(): string {
  return `tutor-pending-messages`;
}

async function getMessages(
  userId?: string,
  nodeId?: string,
): Promise<Message[]> {
  const data = await offlineCache.getProfile(messagesKey(userId, nodeId));
  return (data as Message[] | null) ?? [];
}

async function saveMessages(
  userId: string | undefined,
  nodeId: string | undefined,
  msgs: Message[],
): Promise<void> {
  await offlineCache.setProfile(messagesKey(userId, nodeId), msgs);
}

async function clearMessages(userId?: string, nodeId?: string): Promise<void> {
  await offlineCache.setProfile(messagesKey(userId, nodeId), []);
}

async function getPendingMessages(): Promise<PendingMessage[]> {
  const data = await offlineCache.getProfile(pendingKey());
  return (data as PendingMessage[] | null) ?? [];
}

async function removePendingMessage(id: string): Promise<void> {
  const pending = await getPendingMessages();
  await offlineCache.setProfile(
    pendingKey(),
    pending.filter((m) => m.id !== id),
  );
}

async function queueMessage(
  message: Message,
  payload: unknown,
): Promise<void> {
  const pending = await getPendingMessages();
  pending.push({ id: message.id, payload });
  await offlineCache.setProfile(pendingKey(), pending);
}

// ─── Types ────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'student' | 'tutor';
  content: string;
  timestamp: number;
  isInitial?: boolean;
  showHint?: boolean;
  hintLevel?: number;
  hasHint?: boolean;
  hint?: string;
  feedback?: string;
  isSimplified?: boolean;
  // Where the submitted answer's content came from (authored corpus).
  sourceNodeId?: string | null;
  sourceField?: string | null;
}

interface TutorApiResponse {
  text: string;
  hint?: string;
  feedback?: string;
  intent: string;
  mastery_level: number;
  hint_level: number;
  quality_score: number;
  simplified?: string;
  // Authored provenance (quick-question router): the corpus node whose
  // enrichment field served this answer, and which field it was.
  node_id?: string | null;
  node_title?: string | null;
  type?: string;
}

// ─── Constants ────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8001';
const TUTOR_WS_URL = process.env.NEXT_PUBLIC_TUTOR_WS_URL ?? 'ws://localhost:8001';
const EXCHANGES_BEFORE_ESCALATION = 3;

type Language = 'en' | 'hinglish' | 'hi';

// ─── i18n ──────────────────────────────────────────────────

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    tutorName: 'Socratic Tutor',
    greeting_morning: 'Good morning',
    greeting_afternoon: 'Good afternoon',
    greeting_evening: 'Good evening',
    online: 'Online',
    offline: 'Offline — messages will sync when reconnected',
    clearConversation: 'Clear conversation',
    tutorThinking: 'Tutor is thinking…',
    youSaid: 'You said',
    tutorSaid: 'Tutor said',
    welcomeTitle: 'Hi',
    welcomeSubtitle:
      "I'm your Socratic Tutor. I ask guiding questions to help you discover the answer yourself. What would you like to explore today?",
    hint: 'Show Hint',
    hideHint: 'Hide Hint',
    requestHint: 'Hint',
    explainSimpler: 'Explain simpler',
    simplifiedBadge: 'Simplified',
    hintPrefix: 'hint',
    inputPlaceholder: 'Type your answer or question…',
    inputHelp: 'Press Enter to send · Shift+Enter for new line',
    askTeacher: 'Stuck? Ask your teacher for help',
    errorTitle: "Couldn't reach the tutor",
    errorDetail: 'Please check your connection and try again.',
    retry: 'Retry',
    queuedOffline: "Message queued — will send when you're back online",
    backOnline: 'Back online! Syncing…',
    noInternet: 'No internet — messages will be sent when you reconnect',
    conversationCleared: 'Conversation cleared',
    simplerLoaded: 'Simpler explanation loaded!',
    simplerLoading: 'Making it simpler…',
    greatThinking: 'Great thinking! 🎯',
    hintError: "Couldn't load hint. Try again.",
    explainError: "Couldn't load explanation. Try again.",
    topic: 'Topic',
    mastery: 'Mastery',
    // Suggestions
    s_derivatives: "I don't understand derivatives",
    s_hint: 'Give me a hint',
    s_example: 'Show me an example',
    s_biggerHint: 'Can you give me a bigger hint?',
    s_simpler: 'Explain in simpler words',
    s_confused: "I'm still confused",
    s_gettingIt: "I think I'm getting it…",
    s_anotherQuestion: 'Can you ask me another question?',
    s_practice: "I'd like to try a problem",
    s_askTeacher: 'I want to ask my teacher',
    s_differentExplanation: 'I need a different explanation',
    s_startOver: 'Can we start over?',
    s_exampleNav: 'Show example',
    s_practiceNav: 'Practice problem',
    s_progressNav: 'Show my progress',
  },
  hinglish: {
    tutorName: 'Socratic Tutor',
    greeting_morning: 'Good morning',
    greeting_afternoon: 'Good afternoon',
    greeting_evening: 'Good evening',
    online: 'Online',
    offline: 'Offline — messages sync honge reconnect par',
    clearConversation: 'Conversation clear karein',
    tutorThinking: 'Tutor soch raha hai…',
    youSaid: 'Aapne kaha',
    tutorSaid: 'Tutor ne kaha',
    welcomeTitle: 'Namaste',
    welcomeSubtitle:
      'Main aapka Socratic Tutor hoon. Main guiding questions poochta hoon taaki aap khud answer discover karein. Aaj kya seekhna chahte ho?',
    hint: 'Hint Dekhein',
    hideHint: 'Hint Chhupayein',
    requestHint: 'Hint',
    explainSimpler: 'Aasaan batao',
    simplifiedBadge: 'Aasaan version',
    hintPrefix: 'hint',
    inputPlaceholder: 'Apna answer ya question type karein…',
    inputHelp: 'Enter dabayein bhejne ke liye · Shift+Enter nayi line ke liye',
    askTeacher: 'Stuck ho? Apne teacher se poochein',
    errorTitle: 'Tutor se connect nahi ho paya',
    errorDetail: 'Kripya apna internet check karein aur phir try karein.',
    retry: 'Phir try karein',
    queuedOffline: 'Message queue mein hai — reconnect par bhej diya jayega',
    backOnline: 'Wapas online ho gaye! Syncing…',
    noInternet: 'Internet nahi hai — reconnect par messages bhej diye jayenge',
    conversationCleared: 'Conversation clear ho gayi',
    simplerLoaded: 'Aasaan explanation load ho gaya!',
    simplerLoading: 'Aasaan bana rahe hain…',
    greatThinking: 'Great socha! 🎯',
    hintError: 'Hint load nahi ho payi. Phir try karein.',
    explainError: 'Explanation load nahi ho paya. Phir try karein.',
    topic: 'Topic',
    mastery: 'Mastery',
    s_derivatives: 'Derivatives samajh nahi aaye',
    s_hint: 'Hint do',
    s_example: 'Example dikhao',
    s_biggerHint: 'Bada hint de sakte ho?',
    s_simpler: 'Aasaan shabdon mein samjhao',
    s_confused: 'Abhi bhi samajh nahi aaya',
    s_gettingIt: 'Lag raha hai samajh aa raha hai…',
    s_anotherQuestion: 'Ek aur question pooch sakte ho?',
    s_practice: 'Mujhe problem solve karni hai',
    s_askTeacher: 'Main apne teacher se poochna chahta hoon',
    s_differentExplanation: 'Alag explanation chahiye',
    s_startOver: 'Phir se shuru karein',
    s_exampleNav: 'Example dikhao',
    s_practiceNav: 'Problem solve karo',
    s_progressNav: 'Mera progress dekho',
  },
  hi: {
    tutorName: 'Socratic Tutor',
    greeting_morning: 'सुप्रभात',
    greeting_afternoon: 'नमस्कार',
    greeting_evening: 'शुभ संध्या',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन — रिकनेक्ट करने पर संदेश सिंक होंगे',
    clearConversation: 'वार्तालाप हटाएं',
    tutorThinking: 'ट्यूटर सोच रहा है…',
    youSaid: 'आपने कहा',
    tutorSaid: 'ट्यूटर ने कहा',
    welcomeTitle: 'नमस्ते',
    welcomeSubtitle:
      'मैं आपका Socratic Tutor हूँ। मैं मार्गदर्शन करने वाले प्रश्न पूछता हूँ ताकि आप स्वयं उत्तर खोज सकें। आज आप क्या सीखना चाहते हैं?',
    hint: 'संकेत देखें',
    hideHint: 'संकेत छुपाएं',
    requestHint: 'संकेत',
    explainSimpler: 'आसान भाषा में समझाएं',
    simplifiedBadge: 'आसान संस्करण',
    hintPrefix: 'संकेत',
    inputPlaceholder: 'अपना उत्तर या प्रश्न टाइप करें…',
    inputHelp: 'भेजने के लिए Enter दबाएं · नई पंक्ति के लिए Shift+Enter',
    askTeacher: 'परेशान हैं? अपने शिक्षक से पूछें',
    errorTitle: 'ट्यूटर से कनेक्ट नहीं हो पाया',
    errorDetail: 'कृपया अपना कनेक्शन जाँचें और फिर प्रयास करें।',
    retry: 'पुनः प्रयास',
    queuedOffline: 'संदेश कतारबद्ध — रिकनेक्ट पर भेज दिया जाएगा',
    backOnline: 'वापस ऑनलाइन! सिंक हो रहा है…',
    noInternet: 'इंटरनेट नहीं है — रिकनेक्ट पर संदेश भेज दिए जाएंगे',
    conversationCleared: 'वार्तालाप हटा दिया गया',
    simplerLoaded: 'आसान व्याख्या लोड हो गई!',
    simplerLoading: 'आसान बना रहे हैं…',
    greatThinking: 'बहुत बड़ा सोच! 🎯',
    hintError: 'संकेत लोड नहीं हो पाया। फिर प्रयास करें।',
    explainError: 'व्याख्या लोड नहीं हो पाई। फिर प्रयास करें।',
    topic: 'विषय',
    mastery: 'महारत',
    s_derivatives: 'डेरिवेटिव्स समझ नहीं आए',
    s_hint: 'संकेत दो',
    s_example: 'उदाहरण दिखाओ',
    s_biggerHint: 'बड़ा संकेत दे सकते हो?',
    s_simpler: 'आसान शब्दों में समझाओ',
    s_confused: 'अभी भी समझ नहीं आया',
    s_gettingIt: 'लगता है समझ आ रहा है…',
    s_anotherQuestion: 'एक और सवाल पूछ सकते हो?',
    s_practice: 'मुझे प्रैक्टिस करनी है',
    s_askTeacher: 'मैं अपने टीचर से पूछना चाहता हूँ',
    s_differentExplanation: 'अलग व्याख्या चाहिए',
    s_startOver: 'फिर से शुरू करें',
    s_exampleNav: 'उदाहरण देखें',
    s_practiceNav: 'प्रैक्टिस करें',
    s_progressNav: 'मेरा प्रोग्रेस देखें',
  },
};

// ─── Suggestion texts per language ────────────────────────

const SUGGESTION_KEYS: Record<string, string[]> = {
  initial: ['s_derivatives', 's_hint', 's_example'],
  struggling: ['s_biggerHint', 's_simpler', 's_confused'],
  progressing: ['s_gettingIt', 's_anotherQuestion', 's_practice'],
  escalate: ['s_askTeacher', 's_differentExplanation', 's_startOver'],
  quickActions: ['s_exampleNav', 's_practiceNav', 's_progressNav'],
};

// ─── Helper: render inline math ────────────────────────────

function renderMath(text: string): string {
  const parts = text.split(/(\$[^$]+\$|\\\[[^\]]+\\\])/g);
  return parts
    .map((part) => {
      if (!part) return '';
      if (part.startsWith('$') && part.endsWith('$')) {
        try {
          const expr = part.slice(1, -1);
          return katex.renderToString(expr, {
            throwOnError: false,
            displayMode: false,
            strict: false,
            output: 'html',
          });
        } catch {
          return part;
        }
      }
      if (part.startsWith('\\[') && part.endsWith('\\]')) {
        try {
          const expr = part.slice(2, -2);
          return katex.renderToString(expr, {
            throwOnError: false,
            displayMode: true,
            strict: false,
            output: 'html',
          });
        } catch {
          return part;
        }
      }
      return part
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>');
    })
    .join('');
}

// ─── t() helper ────────────────────────────────────────────

function t(lang: Language, key: string): string {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['en'][key] ?? key;
}

// ─── Mastery bar color ─────────────────────────────────────

function masteryColor(value: number): string {
  if (value < 0.4) return 'bg-red-500';
  if (value < 0.7) return 'bg-yellow-500';
  return 'bg-emerald-500';
}

function masteryLabel(value: number, lang: Language): string {
  if (value < 0.4) return lang === 'hi' ? 'आरंभिक' : lang === 'hinglish' ? 'Shuruat' : 'Beginner';
  if (value < 0.7) return lang === 'hi' ? 'मध्यम' : lang === 'hinglish' ? 'Beech ka' : 'Intermediate';
  return lang === 'hi' ? 'उन्नत' : lang === 'hinglish' ? 'Advance' : 'Advanced';
}

// ─── Main Page Component ───────────────────────────────────

export default function TutorPage({
  userId,
  nodeId,
  mastery: masteryProp,
  subject: subjectProp,
  classLevel: classLevelProp,
}: {
  userId?: string;
  nodeId?: string;
  mastery?: number;
  subject?: string;
  classLevel?: number;
}) {
  const router = useRouter();

  // ─── State ───────────────────────────────────────────────

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [openHints, setOpenHints] = useState<Set<string>>(new Set());
  const [language, setLanguage] = useState<Language>('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mastery, setMastery] = useState(masteryProp ?? 0.3);
  const [isExplaining, setIsExplaining] = useState(false);

  // ─── Refs ────────────────────────────────────────────────

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const hasSentInitialRef = useRef(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // ─── Stores ─────────────────────────────────────────────

  const queryClient = useQueryClient();
  const studentId = useStudentStore((s) => s.profile.id);
  const studentName = useStudentStore((s) => s.profile.name);
  const storeLang = useStudentStore((s) => s.profile.languagePref) as Language | undefined;
  const storeSubject = useStudentStore((s) => s.profile.subjects?.[0]);
  const storeClassLevel = useStudentStore((s) => s.profile.class);
  const effectiveUserId = userId ?? studentId;
  const effectiveLang = storeLang ?? language;
  const effectiveSubject = subjectProp ?? storeSubject ?? 'Mathematics';
  const effectiveClassLevel = classLevelProp ?? storeClassLevel ?? 11;

  // ─── Derived ─────────────────────────────────────────────

  const studentMessageCount = useMemo(
    () => messages.filter((m) => m.role === 'student').length,
    [messages],
  );
  const showEscalation = studentMessageCount >= EXCHANGES_BEFORE_ESCALATION * 2;
  const showQuickActions = studentMessageCount >= 2 && !isLoading;
  const lang = effectiveLang;

  // ─── Language menu click-outside ─────────────────────────

  useEffect(() => {
    if (!langMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langMenuOpen]);

  // ─── Auto-scroll ─────────────────────────────────────────

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = 'smooth') => {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior });
      });
    },
    [],
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // ─── Offline / online listeners ──────────────────────────

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success(t(lang, 'backOnline'));
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error(t(lang, 'noInternet'));
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) handleOffline();
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [lang]);

  // ─── Load cached messages on mount ──────────────────────

  useEffect(() => {
    let cancelled = false;
    getMessages(effectiveUserId, nodeId)
      .then((cached) => {
        if (cancelled || !cached?.length) return;
        setMessages(cached);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [effectiveUserId, nodeId]);

  // ─── WebSocket ──────────────────────────────────────────

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const wsUrl = `${TUTOR_WS_URL}/api/tutor/its/ws?user_id=${encodeURIComponent(effectiveUserId)}`;
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    const connect = () => {
      try {
        ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          retryCountRef.current = 0;
          // Flush queued messages from IndexedDB
          getPendingMessages()
            .then((pending) => {
              pending.forEach((m) => {
                if (ws?.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify(m.payload));
                  removePendingMessage(m.id).catch(() => {});
                }
              });
            })
            .catch(() => {});
        };

        ws.onmessage = (event: MessageEvent) => {
          try {
            const data: TutorApiResponse = JSON.parse(event.data);
            const tutorMessage: Message = {
              id: `tutor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              role: 'tutor',
              content: data.text,
              timestamp: Date.now(),
              hasHint: !!data.hint,
              hintLevel: data.hint_level,
              hint: data.hint,
              feedback: data.feedback,
              sourceNodeId: data.node_id ?? null,
              sourceField: data.type ?? null,
            };
            setMessages((prev) => {
              const updated = [...prev, tutorMessage];
              saveMessages(effectiveUserId, nodeId, updated).catch(() => {});
              return updated;
            });
            setIsLoading(false);

            if (data.mastery_level) {
              setMastery(data.mastery_level);
              queryClient.invalidateQueries({ queryKey: ['mastery'] });
            }

            if (data.quality_score > 0.85) {
              toast.success(t(lang, 'greatThinking'));
            }
          } catch {
            console.error('Failed to parse WS message');
          }
        };

        ws.onerror = () => {
          // Silently handle — onclose fires after this
        };

        ws.onclose = (evt) => {
          wsRef.current = null;
          const delay = Math.min(1000 * 2 ** retryCountRef.current, 30000);
          if (!evt.wasClean) {
            retryCountRef.current++;
            reconnectTimer = setTimeout(connect, delay);
          }
        };
      } catch {
        wsRef.current = null;
      }
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      ws?.close(1000, 'Component unmounting');
    };
  }, [effectiveUserId, nodeId, queryClient, lang]);

  // ─── React Query mutation ────────────────────────────────

  const tutorMutation = useMutation({
    mutationFn: async (payload: {
      user_query: string;
      node_id?: string;
      mastery: number;
      subject: string;
      class_level: number;
      language_pref: Language;
    }): Promise<TutorApiResponse> => {
      const res = await fetch(`${API_URL}/api/tutor/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) {
        // Never surface raw server response bodies to students.
        throw new Error(`tutor_unavailable_${res.status}`);
      }
      return res.json();
    },
  });

  // ─── Hint toggle ─────────────────────────────────────────

  const toggleHint = useCallback((messageId: string) => {
    setOpenHints((prev) => {
      const next = new Set(prev);
      if (next.has(messageId)) next.delete(messageId);
      else next.add(messageId);
      return next;
    });
  }, []);

  // ─── Request a hint ──────────────────────────────────────

  const requestHint = useCallback(
    async (messageId: string) => {
      const lastTutor = [...messages]
        .reverse()
        .find((m) => m.role === 'tutor');
      if (!lastTutor) return;

      try {
        const res = await fetch(`${API_URL}/api/tutor/hint`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: effectiveUserId,
            node_id: nodeId,
            context: lastTutor.content,
            hint_level: (lastTutor.hintLevel ?? 0) + 1,
            mastery,
            language_pref: lang,
          }),
          signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) throw new Error('Hint request failed');

        const data: { hint: string; hint_level: number } = await res.json();

        setMessages((prev) => {
          const updated = prev.map((m) =>
            m.id === lastTutor.id
              ? {
                  ...m,
                  hint: data.hint,
                  hintLevel: data.hint_level,
                  hasHint: true,
                }
              : m,
          );
          saveMessages(effectiveUserId, nodeId, updated).catch(() => {});
          return updated;
        });
        setOpenHints((prev) => new Set(prev).add(lastTutor.id));
      } catch {
        toast.error(t(lang, 'hintError'));
      }
    },
    [messages, effectiveUserId, nodeId, mastery, lang],
  );

  // ─── Explain simpler ─────────────────────────────────────

  const explainSimpler = useCallback(async () => {
    const lastTutor = [...messages]
      .reverse()
      .find((m) => m.role === 'tutor');
    if (!lastTutor) return;

    setIsExplaining(true);
    toast.loading(t(lang, 'simplerLoading'), { id: 'explain-simpler' });

    try {
      const payload = {
        step_rule: lastTutor.content,
        step_formula: '',
        step_explanation: lastTutor.feedback ?? '',
        student_level: effectiveClassLevel,
        user_id: effectiveUserId,
        language_pref: lang,
        subject: effectiveSubject,
      };

      const res = await fetch(`${API_URL}/api/tutor/explain-step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });

      if (!res.ok) throw new Error();
      const data: { simplified: string } = await res.json();

      const simplerMessage: Message = {
        id: `tutor-simpler-${Date.now()}`,
        role: 'tutor',
        content: data.simplified,
        timestamp: Date.now(),
        isSimplified: true,
      };

      setMessages((prev) => {
        const updated = [...prev, simplerMessage];
        saveMessages(effectiveUserId, nodeId, updated).catch(() => {});
        return updated;
      });
      toast.success(t(lang, 'simplerLoaded'), { id: 'explain-simpler' });
    } catch {
      toast.error(t(lang, 'explainError'), { id: 'explain-simpler' });
    } finally {
      setIsExplaining(false);
    }
  }, [messages, effectiveUserId, nodeId, lang, effectiveClassLevel, effectiveSubject]);

  // ─── Send message ────────────────────────────────────────

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setInputValue('');
    setError(null);

    const studentMessage: Message = {
      id: `student-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'student',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => {
      const updated = [...prev, studentMessage];
      saveMessages(effectiveUserId, nodeId, updated).catch(() => {});
      return updated;
    });

    setIsLoading(true);
    hasSentInitialRef.current = true;

    const payload = {
      user_query: text,
      user_id: effectiveUserId,
      node_id: nodeId,
      mastery,
      subject: effectiveSubject,
      class_level: effectiveClassLevel,
      language_pref: lang,
    };

    // Try WebSocket first (real-time, 3G-friendly)
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(payload));
        return; // onmessage will handle the response
      } catch {
        // Fall through to HTTP
      }
    }

    // Fall back to HTTP
    if (!isOnline) {
      queueMessage(studentMessage, payload).catch(() => {});
      setIsLoading(false);
      toast.info(t(lang, 'queuedOffline'));
      return;
    }

    try {
      const data: TutorApiResponse = await tutorMutation.mutateAsync(payload);

      const tutorMessage: Message = {
        id: `tutor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: 'tutor',
        content: data.text,
        timestamp: Date.now(),
        hasHint: !!data.hint,
        hintLevel: data.hint_level,
        hint: data.hint,
        feedback: data.feedback,
        sourceNodeId: data.node_id ?? null,
        sourceField: data.type ?? null,
      };

      setMessages((prev) => {
        const updated = [...prev, tutorMessage];
        saveMessages(effectiveUserId, nodeId, updated).catch(() => {});
        return updated;
      });

      if (data.mastery_level) {
        setMastery(data.mastery_level);
        queryClient.invalidateQueries({ queryKey: ['mastery'] });
      }
    } catch {
      // Friendly, translated copy only — no raw error text reaches students.
      const msg = `${t(lang, 'errorTitle')} — ${t(lang, 'errorDetail')}`;
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.id !== studentMessage.id));
      setInputValue(text);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [
    inputValue,
    isLoading,
    isOnline,
    effectiveUserId,
    nodeId,
    mastery,
    effectiveSubject,
    effectiveClassLevel,
    lang,
    tutorMutation,
    queryClient,
  ]);

  // ─── Retry last send ─────────────────────────────────────

  const retryLast = useCallback(() => {
    setError(null);
    const lastStudent = [...messages].reverse().find((m) => m.role === 'student');
    if (lastStudent) {
      setInputValue(lastStudent.content);
      setMessages((prev) => prev.filter((m) => m.id !== lastStudent.id));
    }
  }, [messages]);

  // ─── Clear conversation ──────────────────────────────────

  const clearConversation = useCallback(() => {
    setMessages([]);
    setOpenHints(new Set());
    setError(null);
    hasSentInitialRef.current = false;
    clearMessages(effectiveUserId, nodeId).catch(() => {});
    toast.success(t(lang, 'conversationCleared'));
  }, [effectiveUserId, nodeId, lang]);

  // ─── Keyboard handler ────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  // ─── Suggestion chips ────────────────────────────────────

  const suggestions = useMemo(() => {
    if (showQuickActions) return SUGGESTION_KEYS.quickActions;
    if (messages.length === 0) return SUGGESTION_KEYS.initial;
    if (showEscalation) return SUGGESTION_KEYS.escalate;
    if (studentMessageCount <= 2) return SUGGESTION_KEYS.struggling;
    return SUGGESTION_KEYS.progressing;
  }, [messages.length, studentMessageCount, showEscalation, showQuickActions]);

  // ─── Navigation ──────────────────────────────────────────

  const navigateTo = useCallback(
    (path: string) => {
      router.push(
        `${path}?subject=${encodeURIComponent(effectiveSubject)}&class=${effectiveClassLevel}`,
      );
    },
    [router, effectiveSubject, effectiveClassLevel],
  );

  // ─── Language cycle ──────────────────────────────────────

  const cycleLanguage = useCallback(() => {
    setLangMenuOpen(false);
    setLanguage((prev) => {
      const next: Language = prev === 'en' ? 'hinglish' : prev === 'hinglish' ? 'hi' : 'en';
      useStudentStore.getState().setLanguagePref(next);
      return next;
    });
  }, []);

  // ─── Render helpers ──────────────────────────────────────

  const displayName = studentName ?? 'Student';
  const hour = new Date().getHours();
  const greetingKey =
    hour < 12
      ? 'greeting_morning'
      : hour < 17
        ? 'greeting_afternoon'
        : 'greeting_evening';

  const renderMathContent = (text: string) => {
    const html = renderMath(text);
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const langLabel = lang === 'en' ? 'EN' : lang === 'hinglish' ? 'HN' : 'HI';

  // ─── JSX ────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50 dark:bg-gray-950 max-w-2xl mx-auto relative">

      {/* ═══════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════ */}
      <header
        className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/60 z-20"
        role="banner"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0" aria-hidden="true">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center shadow-md shadow-amber-200/50 dark:shadow-amber-900/30">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <span
            className={
              'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900 '
              + (isOnline ? 'bg-emerald-400' : 'bg-amber-400')
            }
            aria-label={isOnline ? t(lang, 'online') : t(lang, 'offline')}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {t(lang, 'tutorName')}
          </h1>
          <p
            className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5"
            aria-live="polite"
          >
            {isOnline ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {t(lang, greetingKey)}, {displayName}!
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {t(lang, 'offline')}
              </>
            )}
          </p>
          {/* Subject · Class · Mastery bar */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
              {subjectName(effectiveSubject)} · Class {effectiveClassLevel}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              · {t(lang, 'mastery')}: {Math.round(mastery * 100)}%
            </span>
            <div
              className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(mastery * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${t(lang, 'mastery')} ${Math.round(mastery * 100)}%`}
              title={`${masteryLabel(mastery, lang)}: ${Math.round(mastery * 100)}%`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${masteryColor(mastery)}`}
                style={{ width: `${Math.round(mastery * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Language toggle */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              aria-label="Change language"
              aria-haspopup="true"
              aria-expanded={langMenuOpen}
              title="Language"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  role="menu"
                >
                  {(['en', 'hinglish', 'hi'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={cycleLanguage}
                      className={
                        'w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 '
                        + (l === lang
                          ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50')
                      }
                      role="menuitem"
                    >
                      <span
                        className={
                          'text-[10px] font-bold px-1.5 py-0.5 rounded '
                          + (l === lang
                            ? 'bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400')
                        }
                      >
                        {l === 'en' ? 'EN' : l === 'hinglish' ? 'HN' : 'HI'}
                      </span>
                      {l === 'en'
                        ? 'English'
                        : l === 'hinglish'
                          ? 'Hinglish'
                          : 'हिन्दी'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear button */}
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={t(lang, 'clearConversation')}
              title={t(lang, 'clearConversation')}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════
          MESSAGES AREA
      ═══════════════════════════════════════════════════ */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
        {/* Welcome when empty */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center px-6 py-12"
          >
            <div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/30 flex items-center justify-center mb-5"
              aria-hidden="true"
            >
              <svg className="w-10 h-10 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t(lang, 'welcomeTitle')} {displayName}! 👋
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              {t(lang, 'welcomeSubtitle')}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
              {subjectName(effectiveSubject)} · Class {effectiveClassLevel}
              {nodeId && (
                <>{' '}· {t(lang, 'topic')}: {friendlyNodeTitle(nodeId)}</>
              )}
            </p>
          </motion.div>
        )}

        {/* Message list */}
        {messages.map((msg) => {
          const isStudent = msg.role === 'student';

          return (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`flex ${isStudent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`group relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  isStudent
                    ? 'bg-amber-500 text-gray-900 rounded-br-md'
                    : 'glass-card text-gray-900 dark:text-gray-100 rounded-bl-md'
                }`}
              >
                {/* Role label */}
                <span className="sr-only">
                  {isStudent ? t(lang, 'youSaid') : t(lang, 'tutorSaid')}
                </span>

                {/* Badge for simplified */}
                {msg.isSimplified && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 mb-1.5">
                    ⚡ {t(lang, 'simplifiedBadge')}
                  </span>
                )}

                {/* Message text with KaTeX */}
                <p
                  className="text-sm leading-relaxed break-words"
                  dangerouslySetInnerHTML={{
                    __html: isStudent
                      ? msg.content
                          .replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;')
                          .replace(/\n/g, '<br/>')
                      : renderMath(msg.content),
                  }}
                />

                {/* Hint level badge */}
                {!isStudent && msg.hintLevel && msg.hintLevel > 0 && (
                  <span className="inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                    {t(lang, 'hintPrefix')} {msg.hintLevel}
                  </span>
                )}

                {/* Timestamp */}
                <time
                  dateTime={new Date(msg.timestamp).toISOString()}
                  className={`block text-[10px] mt-1 select-none ${
                    isStudent
                      ? 'text-amber-900/70'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>

                {/* ─── TUTOR-ONLY ACTIONS ─── */}
                {!isStudent && (
                  <>
                    {/* Hint section */}
                    <AnimatePresence>
                      {msg.hasHint && (
                        <div className="mt-2.5">
                          <button
                            onClick={() => toggleHint(msg.id)}
                            className={
                              'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 '
                              + (openHints.has(msg.id)
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40')
                            }
                            aria-expanded={openHints.has(msg.id)}
                            aria-controls={`hint-${msg.id}`}
                          >
                            <svg
                              className={
                                'w-3.5 h-3.5 transition-transform duration-200 '
                                + (openHints.has(msg.id) ? 'rotate-180' : '')
                              }
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                            {openHints.has(msg.id)
                              ? t(lang, 'hideHint')
                              : t(lang, 'hint')}
                          </button>

                          <motion.div
                            id={`hint-${msg.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={
                              openHints.has(msg.id)
                                ? { height: 'auto', opacity: 1 }
                                : { height: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                            aria-hidden={!openHints.has(msg.id)}
                          >
                            <div className="mt-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
                              <p
                                className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: renderMath(msg.hint ?? ''),
                                }}
                              />
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Feedback */}
                    {msg.feedback && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-1.5 text-[11px] text-gray-400 dark:text-gray-500 italic"
                      >
                        💡 {msg.feedback}
                      </motion.p>
                    )}

                    {/* Authored provenance of this submit result: when the
                        grader served the answer from a corpus node, link the
                        lesson — and flag authored misconception answers so
                        the student can study the full remediation recipe. */}
                    {!isStudent && msg.sourceNodeId && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="mt-1.5"
                      >
                        <Link
                          href={`/learn/${encodeURIComponent(msg.sourceNodeId)}`}
                          className={
                            'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full '
                            + 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 '
                            + 'transition-colors'
                          }
                        >
                          {msg.sourceField === 'common_misconception'
                            ? `Common misconception · ${friendlyNodeTitle(msg.sourceNodeId)}`
                            : `Authored answer · ${friendlyNodeTitle(msg.sourceNodeId)}`}
                        </Link>
                      </motion.div>
                    )}

                    {/* Action buttons */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {msg.hasHint && !openHints.has(msg.id) && (
                        <button
                          onClick={() => requestHint(msg.id)}
                          className={
                            'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full '
                            + 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 '
                            + 'transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1'
                          }
                          aria-label={t(lang, 'requestHint')}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          💡 {t(lang, 'requestHint')}
                        </button>
                      )}

                      <button
                        onClick={explainSimpler}
                        disabled={isExplaining}
                        className={
                          'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full '
                          + 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 '
                          + 'transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1 '
                          + (isExplaining ? 'opacity-50 cursor-not-allowed' : '')
                        }
                        aria-label={t(lang, 'explainSimpler')}
                      >
                        {isExplaining ? (
                          <>
                            <motion.svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </motion.svg>
                            {t(lang, 'simplerLoading')}…
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            {t(lang, 'explainSimpler')}
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* ─── TYPING INDICATOR ─── */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex justify-start"
              aria-label={t(lang, 'tutorThinking')}
              role="status"
            >
              <div className="glass-card rounded-2xl rounded-bl-md px-5 py-3.5">
                <div className="flex items-center gap-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
                <span className="sr-only">{t(lang, 'tutorThinking')}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll anchor */}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* ═══════════════════════════════════════════════════
          ERROR BANNER
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="flex-shrink-0 mx-4 mb-2"
          >
            <div
              className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40"
              role="alert"
            >
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <p className="text-xs text-red-700 dark:text-red-300 flex-1 leading-relaxed">
                {error}
              </p>
              <button
                onClick={retryLast}
                className={
                  'text-xs font-semibold px-3 py-1.5 rounded-lg '
                  + 'bg-red-100 text-red-700 hover:bg-red-200 '
                  + 'dark:bg-red-800/40 dark:text-red-200 dark:hover:bg-red-800/60 '
                  + 'transition-colors focus-visible:ring-2 focus-visible:ring-red-400 flex-shrink-0'
                }
              >
                {t(lang, 'retry')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          SUGGESTION CHIPS
      ═══════════════════════════════════════════════════ */}
      {messages.length > 0 && !isLoading && (
        <div className="flex-shrink-0 px-4 pb-2" role="region" aria-label="Quick suggestions">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {suggestions.map((key) => {
              const label = t(lang, key);
              const isQuickAction = ['s_exampleNav', 's_practiceNav', 's_progressNav'].includes(key);
              const navPath = key === 's_exampleNav'
                ? '/solver'
                : key === 's_practiceNav'
                  ? '/practice'
                  : key === 's_progressNav'
                    ? '/progress'
                    : null;

              if (isQuickAction && navPath) {
                return (
                  <button
                    key={key}
                    onClick={() => navigateTo(navPath)}
                    className={
                      'flex-shrink-0 text-xs px-3.5 py-2 rounded-full border transition-all duration-200 '
                      + 'hover:shadow-md focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 '
                      + 'active:scale-95 '
                      + 'border-amber-200 text-amber-700 bg-amber-50/50 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:bg-amber-900/20 dark:hover:bg-amber-900/40'
                    }
                    aria-label={label}
                  >
                    {key === 's_exampleNav' && (
                      <svg className="w-3 h-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {key === 's_practiceNav' && (
                      <svg className="w-3 h-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    )}
                    {key === 's_progressNav' && (
                      <svg className="w-3 h-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {label}
                  </button>
                );
              }

              return (
                <button
                  key={key}
                  onClick={() => setInputValue(label)}
                  className={
                    'flex-shrink-0 text-xs px-3.5 py-2 rounded-full border transition-all duration-200 '
                    + 'hover:shadow-md focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-1 '
                    + 'active:scale-95 '
                    + (showEscalation
                      ? 'border-red-200 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20'
                      : 'border-amber-200 text-amber-700 bg-amber-50/50 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:bg-amber-900/20 dark:hover:bg-amber-900/40')
                  }
                  aria-label={`${label}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          INPUT AREA
      ═══════════════════════════════════════════════════ */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/80 dark:border-gray-700/60 px-4 py-3 z-20">
        <div className="flex items-end gap-2">
          {/* Textarea */}
          <div className="flex-1 relative">
            <label htmlFor="tutor-input" className="sr-only">
              {t(lang, 'inputPlaceholder')}
            </label>
            <textarea
              ref={inputRef}
              id="tutor-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t(lang, 'inputPlaceholder')}
              rows={1}
              disabled={isLoading}
              aria-describedby="input-help"
              className={
                'w-full resize-none rounded-2xl px-4 py-3 pr-10 text-sm '
                + 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 '
                + 'placeholder-gray-400 dark:placeholder-gray-500 '
                + 'border-2 border-transparent '
                + 'focus:border-amber-400 dark:focus:border-amber-500 '
                + 'focus:bg-white dark:focus:bg-gray-800 '
                + 'focus:outline-none focus:ring-0 '
                + 'disabled:opacity-50 disabled:cursor-not-allowed '
                + 'transition-colors duration-200 '
                + 'leading-relaxed'
              }
              style={{ minHeight: '44px', maxHeight: '120px' }}
              onInput={(e) => {
                const el = e.target as HTMLTextAreaElement;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 120) + 'px';
              }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className={
              'flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center '
              + 'transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 '
              + (inputValue.trim() && !isLoading
                ? 'bg-amber-500 hover:bg-amber-600 active:scale-90 shadow-lg shadow-amber-300/40 dark:shadow-amber-900/40 text-gray-900'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed')
            }
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>

        <p
          id="input-help"
          className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center"
        >
          {t(lang, 'inputHelp').split('·')[0]}·
          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-mono text-[10px]">
            {lang === 'hi' ? 'एंटर' : 'Enter'}
          </kbd>{' '}
          {lang === 'hi' ? 'भेजने के लिए' : 'to send'} ·{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-mono text-[10px]">
            Shift+Enter
          </kbd>{' '}
          {lang === 'hi' ? 'नई पंक्ति के लिए' : 'for new line'}
        </p>

        {/* Ask Teacher escalation */}
        <AnimatePresence>
          {showEscalation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-3"
            >
              <button
                onClick={() => {
                  setInputValue(t(lang, 's_askTeacher'));
                  inputRef.current?.focus();
                }}
                className={
                  'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium '
                  + 'border border-red-200 dark:border-red-800 '
                  + 'bg-red-50 text-red-700 hover:bg-red-100 '
                  + 'dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40 '
                  + 'transition-colors focus-visible:ring-2 focus-visible:ring-red-400'
                }
                aria-label={t(lang, 'askTeacher')}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-3.4-3.4 9.337 9.337 0 00-2.051.373M15 19.128v.003M15 19.128a48.004 48.004 0 01-7.256-1.136M15 19.128l-3.364-3.364M15 19.128l-1.636-1.636m0 0A9 9 0 1112 3a9 9 0 010 18z"
                  />
                </svg>
                {t(lang, 'askTeacher')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
