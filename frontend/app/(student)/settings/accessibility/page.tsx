"use client";

import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface AccessibilitySettings {
  language: "en" | "hinglish" | "hindi";
  visualFontSize: "small" | "medium" | "large" | "xlarge";
  visualColorblindMode: "none" | "protanopia" | "deuteranopia" | "tritanopia";
  visualHighContrast: boolean;
  visualDyslexicFont: boolean;
  hearingCaptions: boolean;
  hearingVisualAlerts: boolean;
  hearingVibration: boolean;
  motorLargeTouchTargets: boolean;
  motorKeyboardOnly: boolean;
  motorVoiceControl: boolean;
  cognitiveReducedDistractions: boolean;
  cognitiveSimplifiedUI: boolean;
  cognitiveExtendedTime: "none" | "1.5x" | "2x";
  screenReaderEnabled: boolean;
}

interface SettingsState extends AccessibilitySettings {
  setLanguage: (lang: AccessibilitySettings["language"]) => void;
  toggle: (key: keyof AccessibilitySettings) => void;
  set: (key: keyof AccessibilitySettings, value: unknown) => void;
  reset: () => void;
}

// ─── ZUSTAND STORE ────────────────────────────────────────────────────────────
const useSettingsStore = create<SettingsState>((set, get) => ({
  language: "en",
  visualFontSize: "medium",
  visualColorblindMode: "none",
  visualHighContrast: false,
  visualDyslexicFont: false,
  hearingCaptions: true,
  hearingVisualAlerts: true,
  hearingVibration: false,
  motorLargeTouchTargets: false,
  motorKeyboardOnly: false,
  motorVoiceControl: false,
  cognitiveReducedDistractions: false,
  cognitiveSimplifiedUI: false,
  cognitiveExtendedTime: "none",
  screenReaderEnabled: false,

  setLanguage: (lang) => set({ language: lang }),
  toggle: (key) => set((prev) => ({ ...prev, [key]: !prev[key] })),
  set: (key, value) => set((prev) => ({ ...prev, [key]: value as AccessibilitySettings[keyof AccessibilitySettings] })),
  reset: () =>
    set({
      language: get().language,
      visualFontSize: "medium",
      visualColorblindMode: "none",
      visualHighContrast: false,
      visualDyslexicFont: false,
      hearingCaptions: true,
      hearingVisualAlerts: true,
      hearingVibration: false,
      motorLargeTouchTargets: false,
      motorKeyboardOnly: false,
      motorVoiceControl: false,
      cognitiveReducedDistractions: false,
      cognitiveSimplifiedUI: false,
      cognitiveExtendedTime: "none",
      screenReaderEnabled: false,
    }),
}));

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const FONT_SIZE_CLASSES: Record<string, string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
  xlarge: "text-2xl",
};

const FILTER_MAP: Record<string, string> = {
  protanopia: "url(#protanopia)",
  deuteranopia: "url(#deuteranopia)",
  tritanopia: "url(#tritanopia)",
  none: "none",
};

// ─── i18n STRINGS ────────────────────────────────────────────────────────────
const T = {
  en: {
    pageTitle: "Accessibility Settings",
    pageSubtitle:
      "Customize your experience to suit your needs. All settings take effect immediately.",
    livePreview: "Live Preview",
    visual: "Visual",
    visualDesc: "Adjust how content looks on screen",
    hearing: "Hearing",
    hearingDesc: "Settings for audio and sound feedback",
    motor: "Motor",
    motorDesc: "Controls for easier interaction",
    cognitive: "Cognitive",
    cognitiveDesc: "Reduce complexity for better focus",
    screenReader: "Screen Reader",
    screenReaderDesc: "Enable and test screen reader support",
    fontSize: "Text Size",
    fontSizeDesc: "Adjust the size of text across the platform",
    fontSizeSmall: "Small",
    fontSizeMedium: "Medium",
    fontSizeLarge: "Large",
    fontSizeXLarge: "X-Large",
    colorblindMode: "Colorblind Mode",
    colorblindModeDesc: "Adjust colors to improve visibility",
    colorblindNone: "None",
    colorblindProtanopia: "Protanopia (Red-Blind)",
    colorblindDeuteranopia: "Deuteranopia (Green-Blind)",
    colorblindTritanopia: "Tritanopia (Blue-Blind)",
    highContrast: "High Contrast",
    highContrastDesc: "Increase contrast for better readability",
    dyslexicFont: "Dyslexia-Friendly Font",
    dyslexicFontDesc: "Use OpenDyslexic font for easier reading",
    captions: "Captions",
    captionsDesc: "Show captions for all audio and video content",
    visualAlerts: "Visual Alerts",
    visualAlertsDesc: "Show visual notifications for sounds",
    vibration: "Vibration",
    vibrationDesc: "Enable haptic feedback for important actions",
    largeTouchTargets: "Large Touch Targets",
    largeTouchTargetsDesc: "Increase button and link sizes for easier tapping",
    keyboardOnly: "Keyboard-Only Mode",
    keyboardOnlyDesc: "Navigate the entire app using only your keyboard",
    voiceControl: "Voice Control",
    voiceControlDesc: "Control the app using voice commands",
    reducedDistractions: "Reduced Distractions",
    reducedDistractionsDesc: "Hide animations and floating elements",
    simplifiedUI: "Simplified Interface",
    simplifiedUIDesc: "Reduce layout density and simplify the interface",
    extendedTime: "Extended Time",
    extendedTimeDesc: "Allow extra time for timed activities and quizzes",
    extendedTimeNone: "None",
    extendedTimeHalf: "1.5× (50% Extra)",
    extendedTimeDouble: "2× (100% Extra)",
    screenReaderToggle: "Enable Screen Reader",
    screenReaderDescFull:
      "Enable screen reader support for improved compatibility with assistive technology",
    testAnnouncement: "Test Announcement",
    testAnnouncementDesc:
      "Click to hear a test announcement and verify screen reader is working",
    resetAll: "Reset All Settings",
    resetConfirm: "Reset all accessibility settings to defaults?",
    previewHeading: "Preview Heading",
    previewButton: "Click Me",
    previewCard: "Sample Content Card",
    previewInput: "Type here…",
    previewSuccess: "Success message",
    previewInfo: "Information notice",
    settingsSaved: "Settings saved automatically",
    focusMode: "Focus Mode Active",
    voiceListening: "Listening…",
    keyboardNav: "Keyboard Navigation Active",
  },
  hinglish: {
    pageTitle: "Accessibility Settings",
    pageSubtitle:
      "Apne needs ke hisaab se settings customize karein. Sab settings turant apply hongi.",
    livePreview: "Live Preview",
    visual: "Visual",
    visualDesc: "Screen par content kaise dikhta hai, adjust karein",
    hearing: "Hearing",
    hearingDesc: "Audio aur sound feedback ke liye settings",
    motor: "Motor",
    motorDesc: "Aasaan interaction ke liye controls",
    cognitive: "Cognitive",
    cognitiveDesc: "Better focus ke liye complexity kam karein",
    screenReader: "Screen Reader",
    screenReaderDesc: "Screen reader support enable aur test karein",
    fontSize: "Text Size",
    fontSizeDesc: "Platform par text ka size adjust karein",
    fontSizeSmall: "Small",
    fontSizeMedium: "Medium",
    fontSizeLarge: "Large",
    fontSizeXLarge: "X-Large",
    colorblindMode: "Colorblind Mode",
    colorblindModeDesc: "Colors adjust karein visibility badhane ke liye",
    colorblindNone: "None",
    colorblindProtanopia: "Protanopia (Red-Blind)",
    colorblindDeuteranopia: "Deuteranopia (Green-Blind)",
    colorblindTritanopia: "Tritanopia (Blue-Blind)",
    highContrast: "High Contrast",
    highContrastDesc: "Better readability ke liye contrast badhayein",
    dyslexicFont: "Dyslexia-Friendly Font",
    dyslexicFontDesc: "Aasaan reading ke liye OpenDyslexic font use karein",
    captions: "Captions",
    captionsDesc: "Saare audio aur video content ke liye captions dikhayein",
    visualAlerts: "Visual Alerts",
    visualAlertsDesc: "Sounds ke liye visual notifications dikhayein",
    vibration: "Vibration",
    vibrationDesc: "Important actions ke liye haptic feedback enable karein",
    largeTouchTargets: "Large Touch Targets",
    largeTouchTargetsDesc:
      "Aasaan tapping ke liye button aur link ke size badhayein",
    keyboardOnly: "Keyboard-Only Mode",
    keyboardOnlyDesc: "Sirf keyboard se poora app navigate karein",
    voiceControl: "Voice Control",
    voiceControlDesc: "Voice commands se app control karein",
    reducedDistractions: "Reduced Distractions",
    reducedDistractionsDesc: "Animations aur floating elements chhupayein",
    simplifiedUI: "Simplified Interface",
    simplifiedUIDesc: "Layout density kam karein aur interface simplify karein",
    extendedTime: "Extended Time",
    extendedTimeDesc: "Timed activities aur quizzes ke liye extra time dein",
    extendedTimeNone: "None",
    extendedTimeHalf: "1.5× (50% Extra)",
    extendedTimeDouble: "2× (100% Extra)",
    screenReaderToggle: "Enable Screen Reader",
    screenReaderDescFull:
      "Assistive technology ke saath better compatibility ke liye screen reader support enable karein",
    testAnnouncement: "Test Announcement",
    testAnnouncementDesc:
      "Verify karne ke liye test announcement sunne ke liye click karein",
    resetAll: "Reset All Settings",
    resetConfirm: "Sab accessibility settings ko default par reset karein?",
    previewHeading: "Preview Heading",
    previewButton: "Click Me",
    previewCard: "Sample Content Card",
    previewInput: "Yahan type karein…",
    previewSuccess: "Success message",
    previewInfo: "Information notice",
    settingsSaved: "Settings automatically save ho jati hain",
    focusMode: "Focus Mode Active",
    voiceListening: "Listening…",
    keyboardNav: "Keyboard Navigation Active",
  },
  hi: {
    pageTitle: "पहुंच व्यवस्थाएं",
    pageSubtitle:
      "अपनी जरूरतों के अनुसार सेटिंग्स को अनुकूलित करें। सभी सेटिंग्स तुरंत लागू होती हैं।",
    livePreview: "लाइव पूर्वावलोकन",
    visual: "दृष्टिगत",
    visualDesc: "स्क्रीन पर सामग्री कैसे दिखती है, समायोजित करें",
    hearing: "श्रवण",
    hearingDesc: "ऑडियो और ध्वनि प्रतिक्रिया के लिए सेटिंग्स",
    motor: "मोटर",
    motorDesc: "आसान इंटरैक्शन के लिए नियंत्रण",
    cognitive: "संज्ञानात्मक",
    cognitiveDesc: "बेहतर ध्यान के लिए जटिलता कम करें",
    screenReader: "स्क्रीन रीडर",
    screenReaderDesc: "स्क्रीन रीडर समर्थन सक्षम और परीक्षण करें",
    fontSize: "पाठ का आकार",
    fontSizeDesc: "प्लेटफॉर्म पर पाठ का आकार समायोजित करें",
    fontSizeSmall: "छोटा",
    fontSizeMedium: "मध्यम",
    fontSizeLarge: "बड़ा",
    fontSizeXLarge: "अति बड़ा",
    colorblindMode: "रंगअंधता मोड",
    colorblindModeDesc: "दृश्यता बढ़ाने के लिए रंगों को समायोजित करें",
    colorblindNone: "कोई नहीं",
    colorblindProtanopia: "प्रोटैनोपिया (लाल-अंध)",
    colorblindDeuteranopia: "ड्यूटेरैनोपिया (हरा-अंध)",
    colorblindTritanopia: "ट्राइटैनोपिया (नीला-अंध)",
    highContrast: "उच्च कंट्रास्ट",
    highContrastDesc: "बेहतर पठनीयता के लिए कंट्रास्ट बढ़ाएं",
    dyslexicFont: "डिस्लेक्सिया-फ्रेंडली फ़ॉन्ट",
    dyslexicFontDesc: "आसान पढ़ने के लिए OpenDyslexic फ़ॉन्ट का उपयोग करें",
    captions: "कैप्शन",
    captionsDesc: "सभी ऑडियो और वीडियो सामग्री के लिए कैप्शन दिखाएं",
    visualAlerts: "दृश्य अलर्ट",
    visualAlertsDesc: "ध्वनियों के लिए दृश्य सूचनाएं दिखाएं",
    vibration: "कंपन",
    vibrationDesc: "महत्वपूर्ण कार्यों के लिए हैप्टिक प्रतिक्रिया सक्षम करें",
    largeTouchTargets: "बड़े स्पर्श लक्ष्य",
    largeTouchTargetsDesc:
      "आसान टैपिंग के लिए बटन और लिंक के आकार बढ़ाएं",
    keyboardOnly: "कीबोर्ड-केवल मोड",
    keyboardOnlyDesc: "केवल कीबोर्ड का उपयोग करके पूरे ऐप को नेविगेट करें",
    voiceControl: "आवाज नियंत्रण",
    voiceControlDesc: "आवाज कमांड का उपयोग करके ऐप को नियंत्रित करें",
    reducedDistractions: "कम व्यवधान",
    reducedDistractionsDesc: "एनिमेशन और फ्लोटिंग तत्वों को छिपाएं",
    simplifiedUI: "सरलीकृत इंटरफेस",
    simplifiedUIDesc: "लेआउट घनत्व कम करें और इंटरफेस को सरल करें",
    extendedTime: "अतिरिक्त समय",
    extendedTimeDesc: "समयबद्ध गतिविधियों और प्रश्नोत्तरी के लिए अतिरिक्त समय दें",
    extendedTimeNone: "कोई नहीं",
    extendedTimeHalf: "1.5× (50% अतिरिक्त)",
    extendedTimeDouble: "2× (100% अतिरिक्त)",
    screenReaderToggle: "स्क्रीन रीडर सक्षम करें",
    screenReaderDescFull:
      "सहायक प्रौद्योगिकी के साथ बेहतर अनुकूलता के लिए स्क्रीन रीडर समर्थन सक्षम करें",
    testAnnouncement: "परीक्षण घोषणा",
    testAnnouncementDesc:
      "स्क्रीन रीडर कार्य कर रहा है या सत्यापित करने के लिए परीक्षण घोषणा सुनने के लिए क्लिक करें",
    resetAll: "सभी सेटिंग्स रीसेट करें",
    resetConfirm: "सभी पहुंच व्यवस्थाएं डिफ़ॉल्ट पर रीसेट करें?",
    previewHeading: "पूर्वावलोकन शीर्षक",
    previewButton: "Click Me",
    previewCard: "नमूना सामग्री कार्ड",
    previewInput: "यहां टाइप करें…",
    previewSuccess: "सफलता संदेश",
    previewInfo: "सूचना सूचना",
    settingsSaved: "सेटिंग्स स्वचालित रूप से सहेजी जाती हैं",
    focusMode: "फोकस मोड सक्रिय",
    voiceListening: "सुन रहा हूँ…",
    keyboardNav: "कीबोर्ड नेविगेशन सक्रिय",
  },
};

// ─── SETTINGS STORE PERSISTENCE ──────────────────────────────────────────────
function usePersistSettings() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("a11y-settings");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
        const s = useSettingsStore.getState();
        (Object.keys(parsed) as Array<keyof AccessibilitySettings>).forEach((k) => {
          if (k in s && k !== "language") s.set(k, parsed[k]!);
        });
      }
    } catch { /* noop */ }
  }, []);

  const state = useSettingsStore();
  useEffect(() => {
    const { language, ...rest } = state;
    localStorage.setItem("a11y-settings", JSON.stringify(rest));
  }, [state]);
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useLiveRegion() {
  const regionRef = useRef<HTMLDivElement>(null);
  const announce = useCallback((msg: string) => {
    if (regionRef.current) {
      regionRef.current.textContent = "";
      requestAnimationFrame(() => {
        if (regionRef.current) regionRef.current.textContent = msg;
      });
    }
  }, []);
  return { regionRef, announce };
}

function useAnnouncements(lang: string) {
  const { regionRef, announce } = useLiveRegion();

  const testAnnouncement = useCallback(() => {
    const t = T[lang as keyof typeof T];
    announce(
      `${t.testAnnouncement}. ${t.pageTitle}: Visual text size is ${t[`fontSize${lang === "hi" ? "" : ""}Medium` as keyof typeof t]}. ${t.screenReaderDescFull}.`
    );
  }, [lang, announce]);

  return { regionRef, testAnnouncement };
}

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────
const Icons = {
  eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  ear: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M6 8.5a6.5 6.5 0 0 1 13 0c0 6-6 13-6 13S6 14.5 6 8.5z" /><path d="M12 2.5v4" />
    </svg>
  ),
  hand: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 11a2 2 0 0 1 4 0v5a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.83L7 15" />
    </svg>
  ),
  brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9.5 18A2.5 2.5 0 0 1 7 15.5V11a2.5 2.5 0 0 1 5 0v4.5a2.5 2.5 0 0 1-2.5 2.5z" />
      <path d="M14.5 18A2.5 2.5 0 0 1 12 15.5V11a2.5 2.5 0 0 1 5 0v4.5a2.5 2.5 0 0 1-2.5 2.5z" />
      <path d="M12 2v4M4 9.5A2.5 2.5 0 0 1 6.5 7h3M20 9.5A2.5 2.5 0 0 1 17.5 7h-3" />
    </svg>
  ),
  screenReader: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  preview: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  reset: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

const toggleTap = {
  scale: 0.94,
  transition: { type: "spring", stiffness: 500, damping: 20 },
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function LanguageSwitcher() {
  const lang = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const t = T[lang];

  const options: { value: typeof lang; label: string; native: string }[] = [
    { value: "en", label: "English", native: "English" },
    { value: "hinglish", label: "Hinglish", native: "हिंग्लिश" },
    { value: "hindi", label: "Hindi", native: "हिन्दी" },
  ];

  return (
    <div className="flex items-center gap-2" role="group" aria-label={t.pageTitle}>
      <span className="sr-only">Select language</span>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setLanguage(o.value)}
          aria-pressed={lang === o.value}
          aria-label={o.label}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
            lang === o.value
              ? "bg-white/10 text-white border border-gold-500/30"
              : "bg-white/5 text-surface-600 hover:bg-white/10 hover:text-white border border-transparent"
          }`}
        >
          {o.native}
        </button>
      ))}
    </div>
  );
}

function LivePreview({ settings }: { settings: AccessibilitySettings }) {
  const t = T[settings.language];
  const fontSizeLabel = t[`fontSize${capitalize(settings.visualFontSize)}` as keyof typeof t] as string;
  const extendedLabel = settings.cognitiveExtendedTime === "1.5x"
    ? t.extendedTimeHalf
    : settings.cognitiveExtendedTime === "2x"
    ? t.extendedTimeDouble
    : t.extendedTimeNone;

  const colorblindCSS = settings.visualColorblindMode !== "none"
    ? FILTER_MAP[settings.visualColorblindMode]
    : "none";

  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-white/60 backdrop-blur-xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/80 border-b border-gray-200/50">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs font-medium text-gray-500">{t.livePreview}</span>
        </div>
        <div
          className="p-5 space-y-4 transition-all duration-300"
          style={{
            fontSize: settings.visualFontSize === "xlarge" ? "1.375rem" : settings.visualFontSize === "large" ? "1.125rem" : settings.visualFontSize === "small" ? "0.8rem" : "1rem",
            fontFamily: settings.visualDyslexicFont ? "'OpenDyslexic', 'Comic Sans MS', sans-serif" : "inherit",
            filter: colorblindCSS === "none" ? undefined : colorblindCSS,
          }}
          aria-label={t.livePreview}
          role="region"
        >
          <h3
            className={`font-bold text-gray-900 ${settings.visualFontSize === "xlarge" ? "text-3xl" : settings.visualFontSize === "large" ? "text-2xl" : settings.visualFontSize === "small" ? "text-sm" : "text-lg"}`}
            style={{ color: settings.visualHighContrast ? "#000000" : undefined }}
          >
            {t.previewHeading}
          </h3>

          <p
            className={`text-gray-700 leading-relaxed ${settings.visualFontSize === "xlarge" ? "text-lg" : ""}`}
            style={{ color: settings.visualHighContrast ? "#1a1a1a" : undefined }}
          >
            {t.previewCard}
          </p>

          <div
            className={`p-3 rounded-lg ${settings.cognitiveSimplifiedUI ? "bg-gray-50 border border-gray-200" : "bg-indigo-50 border border-indigo-100"}`}
            style={{ backgroundColor: settings.visualHighContrast ? "#ffffcc" : undefined, borderColor: settings.visualHighContrast ? "#000" : undefined }}
          >
            <label
              className={`block font-medium mb-1 ${settings.visualFontSize === "xlarge" ? "text-lg" : ""}`}
              style={{ color: settings.visualHighContrast ? "#000" : undefined }}
            >
              {t.previewInput}
            </label>
            <input
              type="text"
              className={`w-full rounded-lg border bg-white/80 px-3 py-2 ${settings.motorLargeTouchTargets ? "py-4 text-base" : "py-2 text-sm"}`}
              style={{ borderColor: settings.visualHighContrast ? "#000" : "#d1d5db" }}
              readOnly
              aria-label={t.previewInput}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`font-medium rounded-lg transition-colors ${settings.motorLargeTouchTargets ? "px-6 py-4 text-base" : "px-4 py-2 text-sm"} bg-indigo-500 text-white hover:bg-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-300`}
              style={{ backgroundColor: settings.visualHighContrast ? "#0000ff" : undefined }}
            >
              {t.previewButton}
            </button>
            <button
              className={`font-medium rounded-lg transition-colors ${settings.motorLargeTouchTargets ? "px-6 py-4 text-base" : "px-4 py-2 text-sm"} bg-pink-500 text-white hover:bg-pink-600`}
              style={{ backgroundColor: settings.visualHighContrast ? "#cc0000" : undefined }}
            >
              {t.previewButton}
            </button>
          </div>

          <motion.div
            className={`flex items-center gap-2 p-3 rounded-lg ${settings.hearingVisualAlerts ? "border-2 border-green-400 bg-green-50" : "border border-gray-200 bg-gray-50"}`}
            animate={settings.hearingVisualAlerts ? { scale: [1, 1.02, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            role="status"
            aria-live="polite"
          >
            <span className="text-xl" aria-hidden="true">🔔</span>
            <span
              className={`font-medium ${settings.hearingVisualAlerts ? "text-green-700" : "text-gray-500"}`}
              style={{ color: settings.visualHighContrast && settings.hearingVisualAlerts ? "#006400" : undefined }}
            >
              {settings.hearingVisualAlerts ? t.previewSuccess : t.previewInfo}
            </span>
          </motion.div>

          <div className="flex flex-wrap gap-2 text-xs text-surface-600">
            <span className="px-2 py-1 bg-surface-200/40 text-surface-800 rounded-md">
              {t.fontSize}: {fontSizeLabel}
            </span>
            <span className="px-2 py-1 bg-surface-200/40 text-surface-800 rounded-md">
              {t.extendedTime}: {extendedLabel}
            </span>
            {settings.visualColorblindMode !== "none" && (
              <span className="px-2 py-1 bg-brand-500/15 text-brand-300 rounded-md">
                {t.colorblindMode}: {t[`colorblind${capitalize(settings.visualColorblindMode)}` as keyof typeof t] as string}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onToggle,
  ariaDescribedBy,
  disabled = false,
  size = "md",
}: {
  label: string;
  description?: string;
  checked: boolean;
  onToggle: () => void;
  ariaDescribedBy?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const trackRef = useRef<HTMLElement>(null);
  const btnSize = size === "md"
    ? "w-12 h-7"
    : "w-10 h-6";
  const thumbSize = size === "md"
    ? "w-5 h-5"
    : "w-4 h-4";
  const translate = size === "md" ? "translate-x-5" : "translate-x-4";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex-1 min-w-0">
        <span className={`block font-medium text-white ${size === "md" ? "text-base" : "text-sm"}`}>
          {label}
        </span>
        {description && (
          <p
            id={ariaDescribedBy}
            className={`text-surface-600 mt-0.5 ${size === "md" ? "text-sm" : "text-xs"}`}
          >
            {description}
          </p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        className={`
          relative shrink-0 rounded-full transition-colors duration-300 ease-in-out
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500
          ${btnSize}
          ${checked ? "bg-gold-500" : "bg-surface-600"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 ${thumbSize} rounded-full bg-white shadow-md
            transition-transform duration-300 ease-in-out pointer-events-none
            ${checked ? translate : "translate-x-0.5"}
          `}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  getAriaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  getAriaLabel?: (v: string) => string;
}) {
  const activeIndex = options.findIndex((o) => o.value === value);
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % options.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + options.length) % options.length;
    }
    if (nextIndex !== index) {
      onChange(options[nextIndex].value);
      (groupRef.current?.children[nextIndex] as HTMLElement | undefined)?.focus();
    }
  };

  return (
    <div role="radiogroup" aria-label={label} className="space-y-2">
      <span className="block text-sm font-medium text-surface-800">{label}</span>
      <div ref={groupRef} className="flex rounded-xl bg-surface-200/40 p-1 gap-0.5 border border-surface-300/20">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            role="radio"
            aria-checked={value === opt.value}
            aria-label={getAriaLabel ? getAriaLabel(opt.value) : opt.label}
            tabIndex={value === opt.value ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`
              flex-1 min-w-0 px-2 sm:px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium leading-tight transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500
              ${value === opt.value
                ? "bg-white/10 text-white shadow-sm"
                : "text-surface-600 hover:text-white"
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Section({
  id,
  icon,
  title,
  description,
  children,
  index,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.section
      id={id}
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card rounded-2xl p-5 sm:p-6"
      aria-labelledby={`${id}-heading`}
    >
      <div className="flex items-start gap-3 mb-5">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/25 text-gold-300 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h2 id={`${id}-heading`} className="font-display text-lg font-bold text-white">
            {title}
          </h2>
          <p className="text-sm text-surface-600 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="space-y-1">{children}</div>
    </motion.section>
  );
}

// ─── SVG FILTERS ─────────────────────────────────────────────────────────────
const ColorBlindFilters = () => (
  <svg className="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="protanopia">
        <feColorMatrix
          type="matrix"
          values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"
        />
      </filter>
      <filter id="deuteranopia">
        <feColorMatrix
          type="matrix"
          values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"
        />
      </filter>
      <filter id="tritanopia">
        <feColorMatrix
          type="matrix"
          values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"
        />
      </filter>
    </defs>
  </svg>
);

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function AccessibilitySettingsPage() {
  const settings = useSettingsStore();
  const {
    language,
    visualFontSize,
    visualColorblindMode,
    visualHighContrast,
    visualDyslexicFont,
    hearingCaptions,
    hearingVisualAlerts,
    hearingVibration,
    motorLargeTouchTargets,
    motorKeyboardOnly,
    motorVoiceControl,
    cognitiveReducedDistractions,
    cognitiveSimplifiedUI,
    cognitiveExtendedTime,
    screenReaderEnabled,
    toggle,
    set,
    reset,
  } = settings;

  const t = T[language];
  const extendedLabel = cognitiveExtendedTime === "1.5x"
    ? t.extendedTimeHalf
    : cognitiveExtendedTime === "2x"
    ? t.extendedTimeDouble
    : t.extendedTimeNone;
  const [confirmReset, setConfirmReset] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const { regionRef, testAnnouncement } = useAnnouncements(language);
  usePersistSettings();

  // ── Global CSS effects based on settings ──
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.setAttribute("data-font-size", visualFontSize);

    // Dyslexia font
    if (visualDyslexicFont) {
      root.style.setProperty("--font-family", "'OpenDyslexic', 'Comic Sans MS', sans-serif");
    } else {
      root.style.removeProperty("--font-family");
    }

    // High contrast
    root.setAttribute("data-high-contrast", visualHighContrast ? "true" : "false");

    // Reduced motion
    if (cognitiveReducedDistractions) {
      root.style.setProperty("--motion-duration", "0.01ms");
    } else {
      root.style.removeProperty("--motion-duration");
    }

    // Large touch targets
    root.setAttribute("data-large-targets", motorLargeTouchTargets ? "true" : "false");

    // Colorblind
    root.setAttribute("data-colorblind", visualColorblindMode);

    // Simplified UI
    root.setAttribute("data-simplified", cognitiveSimplifiedUI ? "true" : "false");

    return () => {
      root.style.removeProperty("--font-family");
      root.style.removeProperty("--motion-duration");
    };
  }, [visualFontSize, visualDyslexicFont, visualHighContrast, cognitiveReducedDistractions, motorLargeTouchTargets, visualColorblindMode, cognitiveSimplifiedUI]);

  // ── Keyboard-only mode focus management ──
  useEffect(() => {
    if (motorKeyboardOnly) {
      document.body.classList.add("keyboard-only-mode");
      const handleFocus = () => document.body.classList.add("keyboard-focused");
      const handleBlur = () => document.body.classList.remove("keyboard-focused");
      document.addEventListener("keydown", handleFocus);
      document.addEventListener("mousedown", handleBlur);
      return () => {
        document.body.classList.remove("keyboard-only-mode", "keyboard-focused");
        document.removeEventListener("keydown", handleFocus);
        document.removeEventListener("mousedown", handleBlur);
      };
    } else {
      document.body.classList.remove("keyboard-only-mode", "keyboard-focused");
    }
  }, [motorKeyboardOnly]);

  // ── Reset handler ──
  const handleReset = useCallback(() => {
    reset();
    setConfirmReset(false);
    if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
  }, [reset]);

  const handleResetClick = useCallback(() => {
    setConfirmReset(true);
    confirmTimerRef.current = setTimeout(() => setConfirmReset(false), 4000);
  }, []);

  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    };
  }, []);

  // ── Computed preview filter for the preview panel ──
  const previewFilter = visualColorblindMode !== "none"
    ? FILTER_MAP[visualColorblindMode]
    : "none";

  // ── Keyboard nav indicator ──
  useEffect(() => {
    if (motorKeyboardOnly) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          document.body.classList.add("keyboard-focused");
        }
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [motorKeyboardOnly]);

  return (
    <div
      className={`
        min-h-screen transition-colors duration-300
        ${visualHighContrast ? "bg-black text-white" : "mesh-bg text-white"}
      `}
      style={{
        fontFamily: visualDyslexicFont ? "'OpenDyslexic', 'Comic Sans MS', sans-serif" : undefined,
      }}
      data-font-size={visualFontSize}
      data-colorblind={visualColorblindMode}
      data-simplified={cognitiveSimplifiedUI}
      data-large-targets={motorLargeTouchTargets}
      data-high-contrast={visualHighContrast}
    >
      <ColorBlindFilters />

      {/* Global Screen Reader Live Region */}
      <div ref={regionRef} role="status" aria-live="assertive" aria-atomic="true" className="sr-only" />

      {/* Skip to main link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:bg-gold-500 focus:text-black focus:rounded-xl focus:shadow-xl"
      >
        {language === "hindi" ? "मुख्य सामग्री पर जाएं" : language === "hinglish" ? "Main content par jayen" : "Skip to main content"}
      </a>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 glass-strong border-b border-surface-300/30 transition-colors duration-300" style={{ borderColor: visualHighContrast ? "#333" : undefined, backgroundColor: visualHighContrast ? "rgba(0,0,0,0.95)" : undefined }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                {t.pageTitle}
              </h1>
              <p className={`text-surface-600 mt-0.5 ${visualFontSize === "xlarge" ? "text-base" : "text-sm"}`}>
                {t.pageSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* VISUAL */}
            <Section
              id="visual"
              icon={<Icons.eye />}
              title={t.visual}
              description={t.visualDesc}
              index={0}
            >
              <SegmentedControl
                label={t.fontSize}
                options={[
                  { value: "small", label: t.fontSizeSmall },
                  { value: "medium", label: t.fontSizeMedium },
                  { value: "large", label: t.fontSizeLarge },
                  { value: "xlarge", label: t.fontSizeXLarge },
                ]}
                value={visualFontSize}
                onChange={(v) => set("visualFontSize", v)}
                getAriaLabel={(v) => `${t.fontSize}: ${t[`fontSize${capitalize(v)}` as keyof typeof t]}`}
              />

              <SegmentedControl
                label={t.colorblindMode}
                options={[
                  { value: "none", label: t.colorblindNone },
                  { value: "protanopia", label: t.colorblindProtanopia },
                  { value: "deuteranopia", label: t.colorblindDeuteranopia },
                  { value: "tritanopia", label: t.colorblindTritanopia },
                ]}
                value={visualColorblindMode}
                onChange={(v) => set("visualColorblindMode", v)}
                getAriaLabel={(v) =>
                  `${t.colorblindMode}: ${t[`colorblind${capitalize(v)}` as keyof typeof t] as string}`
                }
              />

              <Toggle
                label={t.highContrast}
                description={t.highContrastDesc}
                checked={visualHighContrast}
                onToggle={() => toggle("visualHighContrast")}
                ariaDescribedBy="high-contrast-desc"
              />
              <span id="high-contrast-desc" className="sr-only">{t.highContrastDesc}</span>

              <Toggle
                label={t.dyslexicFont}
                description={t.dyslexicFontDesc}
                checked={visualDyslexicFont}
                onToggle={() => toggle("visualDyslexicFont")}
                ariaDescribedBy="dyslexic-font-desc"
              />
              <span id="dyslexic-font-desc" className="sr-only">{t.dyslexicFontDesc}</span>
            </Section>

            {/* HEARING */}
            <Section
              id="hearing"
              icon={<Icons.ear />}
              title={t.hearing}
              description={t.hearingDesc}
              index={1}
            >
              <Toggle
                label={t.captions}
                description={t.captionsDesc}
                checked={hearingCaptions}
                onToggle={() => toggle("hearingCaptions")}
              />
              <Toggle
                label={t.visualAlerts}
                description={t.visualAlertsDesc}
                checked={hearingVisualAlerts}
                onToggle={() => toggle("hearingVisualAlerts")}
              />
              <Toggle
                label={t.vibration}
                description={t.vibrationDesc}
                checked={hearingVibration}
                onToggle={() => toggle("hearingVibration")}
              />
            </Section>

            {/* MOTOR */}
            <Section
              id="motor"
              icon={<Icons.hand />}
              title={t.motor}
              description={t.motorDesc}
              index={2}
            >
              <Toggle
                label={t.largeTouchTargets}
                description={t.largeTouchTargetsDesc}
                checked={motorLargeTouchTargets}
                onToggle={() => toggle("motorLargeTouchTargets")}
              />
              <Toggle
                label={t.keyboardOnly}
                description={t.keyboardOnlyDesc}
                checked={motorKeyboardOnly}
                onToggle={() => toggle("motorKeyboardOnly")}
              />
              <Toggle
                label={t.voiceControl}
                description={t.voiceControlDesc}
                checked={motorVoiceControl}
                onToggle={() => toggle("motorVoiceControl")}
                disabled={!hearingCaptions}
              />
              {!hearingCaptions && motorVoiceControl && (
                <p className="text-xs text-amber-400 mt-1 pl-1">
                  ⚠ {t.captions} must be enabled for {t.voiceControl} to work.
                </p>
              )}
            </Section>

            {/* COGNITIVE */}
            <Section
              id="cognitive"
              icon={<Icons.brain />}
              title={t.cognitive}
              description={t.cognitiveDesc}
              index={3}
            >
              <Toggle
                label={t.reducedDistractions}
                description={t.reducedDistractionsDesc}
                checked={cognitiveReducedDistractions}
                onToggle={() => toggle("cognitiveReducedDistractions")}
              />
              <Toggle
                label={t.simplifiedUI}
                description={t.simplifiedUIDesc}
                checked={cognitiveSimplifiedUI}
                onToggle={() => toggle("cognitiveSimplifiedUI")}
              />
              <SegmentedControl
                label={t.extendedTime}
                options={[
                  { value: "none", label: t.extendedTimeNone },
                  { value: "1.5x", label: t.extendedTimeHalf },
                  { value: "2x", label: t.extendedTimeDouble },
                ]}
                value={cognitiveExtendedTime}
                onChange={(v) => set("cognitiveExtendedTime", v)}
              />
            </Section>

            {/* SCREEN READER */}
            <Section
              id="screen-reader"
              icon={<Icons.screenReader />}
              title={t.screenReader}
              description={t.screenReaderDesc}
              index={4}
            >
              <Toggle
                label={t.screenReaderToggle}
                description={t.screenReaderDescFull}
                checked={screenReaderEnabled}
                onToggle={() => toggle("screenReaderEnabled")}
              />
              <div className="pt-2">
                <button
                  onClick={testAnnouncement}
                  disabled={!screenReaderEnabled}
                  className={`
                    w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300
                    flex items-center justify-center gap-2
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500
                    ${screenReaderEnabled
                      ? "bg-gold-500/15 text-gold-300 border border-gold-500/30 hover:bg-gold-500/25"
                      : "bg-white/5 text-surface-600 cursor-not-allowed"
                    }
                  `}
                >
                  <span aria-hidden="true">🔊</span>
                  {t.testAnnouncement}
                </button>
                <p className="text-xs text-surface-600 mt-2 text-center">
                  {t.testAnnouncementDesc}
                </p>
              </div>
            </Section>

            {/* RESET */}
            <motion.div
              className="flex flex-col items-center gap-3 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <AnimateVisibility show={!confirmReset}>
                <button
                  onClick={handleResetClick}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                >
                  <Icons.reset />
                  {t.resetAll}
                </button>
              </AnimateVisibility>

              <AnimateVisibility show={confirmReset}>
                <motion.div
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <p className="text-sm text-red-300 font-medium">{t.resetConfirm}</p>
                  <button
                    onClick={handleReset}
                    className="px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                  >
                    {language === "hindi" ? "हां" : language === "hinglish" ? "Haan" : "Yes"}
                  </button>
                  <button
                    onClick={() => {
                      setConfirmReset(false);
                      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
                    }}
                    className="px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                  >
                    {language === "hindi" ? "नहीं" : language === "hinglish" ? "Nahi" : "No"}
                  </button>
                </motion.div>
              </AnimateVisibility>
            </motion.div>
          </div>

          {/* Preview column */}
          <div className="hidden lg:block">
            <motion.div
              className="mb-4 flex items-center gap-2 text-sm font-medium text-surface-600"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Icons.preview />
              {t.livePreview}
            </motion.div>
            <LivePreview settings={settings} />
          </div>
        </div>

        {/* Mobile preview strip */}
        <div className="lg:hidden mt-6">
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm font-medium text-surface-600 mb-3 flex items-center gap-2">
              <Icons.preview />
              {t.livePreview}
            </p>
            <div
              className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3"
              style={{
                fontSize: visualFontSize === "xlarge" ? "1.375rem" : visualFontSize === "large" ? "1.125rem" : visualFontSize === "small" ? "0.8rem" : "1rem",
                fontFamily: visualDyslexicFont ? "'OpenDyslexic', 'Comic Sans MS', sans-serif" : undefined,
                filter: visualColorblindMode !== "none" ? FILTER_MAP[visualColorblindMode] : undefined,
              }}
            >
              <h3 className="font-bold text-gray-900">{t.previewHeading}</h3>
              <p className="text-gray-600 text-sm">{t.previewCard}</p>
              <div className="flex gap-2">
                <span className="px-3 py-2 bg-indigo-500 text-white text-sm rounded-lg">{t.previewButton}</span>
                <span className="px-3 py-2 bg-pink-500 text-white text-sm rounded-lg">{t.previewButton}</span>
              </div>
              {cognitiveExtendedTime !== "none" && (
                <div className="text-xs text-amber-600 font-medium">
                  ⏱ {t.extendedTime}: {extendedLabel}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings saved indicator */}
        <motion.div
          className="fixed bottom-6 right-4 sm:right-6 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#12121a]/90 hc-toast backdrop-blur-xl rounded-full shadow-lg border border-surface-300/20 text-sm text-surface-800">
            <Icons.check />
            {t.settingsSaved}
          </div>
        </motion.div>
      </main>

      {/* ── GLOBAL STYLES ── */}
      <style jsx global>{`
        /* OpenDyslexic font */
        @font-face {
          font-family: "OpenDyslexic";
          src: local("OpenDyslexic"), local("Comic Sans MS");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* Font size presets */
        [data-font-size="small"] { font-size: 0.85rem; }
        [data-font-size="medium"] { font-size: 1rem; }
        [data-font-size="large"] { font-size: 1.125rem; }
        [data-font-size="xlarge"] { font-size: 1.375rem; }

        /* Colorblind preview filter on entire page */
        [data-colorblind="protanopia"] { filter: url(#protanopia); }
        [data-colorblind="deuteranopia"] { filter: url(#deuteranopia); }
        [data-colorblind="tritanopia"] { filter: url(#tritanopia); }

        /* High contrast mode */
        [data-high-contrast="true"] {
          background: #000000 !important;
          color: #ffffff !important;
        }
        [data-high-contrast="true"] * {
          border-color: #ffffff !important;
        }
        [data-high-contrast="true"] .glass-card,
        [data-high-contrast="true"] .hc-toast {
          background: #111111 !important;
          color: #ffffff !important;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        [data-simplified="true"] *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }

        /* Large touch targets */
        [data-large-targets="true"] button,
        [data-large-targets="true"] a,
        [data-large-targets="true"] [role="switch"] {
          min-height: 48px;
          min-width: 48px;
        }
        [data-large-targets="true"] input[type="checkbox"],
        [data-large-targets="true"] input[type="radio"] {
          width: 24px;
          height: 24px;
        }

        /* Keyboard-only mode */
        .keyboard-only-mode *:focus {
          outline: 2px solid #f59e0b !important;
          outline-offset: 2px !important;
        }
        .keyboard-only-mode *:focus:not(:focus-visible) {
          outline: none !important;
        }
        .keyboard-only-mode .keyboard-focused *:focus-visible {
          outline: 2px solid #f59e0b !important;
          outline-offset: 2px !important;
        }
        .keyboard-only-mode :focus {
          outline: none;
        }
        .keyboard-only-mode .keyboard-focused :focus {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }

        /* Simplified UI */
        [data-simplified="true"] .bg-gradient-to-br {
          background: rgba(255, 255, 255, 0.03) !important;
        }
        [data-simplified="true"] .shadow-lg,
        [data-simplified="true"] .shadow-xl {
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }
        [data-simplified="true"] .rounded-2xl {
          border-radius: 8px;
        }

        /* Dyslexic font support */
        [data-font-size] {
          line-height: 1.8;
          letter-spacing: 0.02em;
        }

        /* Focus visible for all interactive elements */
        :focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
          border-radius: 4px;
        }
        button:focus:not(:focus-visible) {
          outline: none;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(251, 191, 36, 0.35); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(251, 191, 36, 0.55); }

        /* Skip link */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* AnimateVisibility component styles */
        .av-enter { opacity: 0; transform: scale(0.95); }
        .av-enter-active { opacity: 1; transform: scale(1); transition: opacity 0.3s, transform 0.3s; }
        .av-exit { opacity: 1; transform: scale(1); }
        .av-exit-active { opacity: 0; transform: scale(0.95); transition: opacity 0.2s, transform 0.2s; }
      `}</style>
    </div>
  );
}

// ─── SIMPLE ANIMATE PRESENCE WRAPPER ────────────────────────────────────────
function AnimateVisibility({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}