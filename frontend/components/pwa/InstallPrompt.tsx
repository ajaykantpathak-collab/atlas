'use client';

/**
 * InstallPrompt — add-to-home-screen banner for the Atlas PWA.
 *
 * India-first: students mostly arrive via mobile browsers, and an installed
 * PWA opens in one tap and works offline. Behavior:
 *   - listens for `beforeinstallprompt`, prevents the browser's own mini-infobar;
 *   - never shows when already running installed (standalone display mode);
 *   - dismissal is REMEMBERED in localStorage for 14 days (no nagging) and
 *     cleared on a successful install;
 *   - a fired-but-unanswered prompt is kept so the Install button can call
 *     prompt() exactly once (the event is single-use);
 *   - if the browser never fires the event (iOS Safari, some Androids), the
 *     banner simply never appears — no fake install button.
 */

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

const DISMISS_KEY = 'atlas-a2hs-dismissed-at';
const REMIND_AFTER_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function wasRecentlyDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY) || '0');
    return at > 0 && Date.now() - at < REMIND_AFTER_MS;
  } catch {
    return false;
  }
}

function isStandalone(): boolean {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)')?.matches ||
      // iOS Safari
      (window.navigator as unknown as { standalone?: boolean }).standalone === true)
  );
}

export default function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as InstallPromptEvent);
      if (!wasRecentlyDismissed()) {
        // Small delay so the banner never fights the page's first paint.
        setTimeout(() => setVisible(true), 2500);
      }
    };
    const onInstalled = () => {
      setVisible(false);
      setPromptEvent(null);
      try {
        localStorage.removeItem(DISMISS_KEY);
      } catch { /* private mode */ }
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch { /* private mode */ }
  };

  const install = async () => {
    if (!promptEvent) return;
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === 'accepted') {
        try {
          localStorage.removeItem(DISMISS_KEY);
        } catch { /* private mode */ }
      }
    } catch { /* prompt failed — banner just closes */ }
    setVisible(false);
    setPromptEvent(null);
  };

  if (!visible || !promptEvent) return null;

  return (
    <div
      role="dialog"
      aria-label="Install Atlas"
      className="fixed inset-x-3 z-[70] max-w-[calc(100vw-1.5rem)] glass-card rounded-2xl p-4 shadow-2xl sm:left-auto sm:right-4 sm:max-w-sm"
      style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-semibold text-white">Install Atlas</p>
          <p className="text-xs text-surface-600 mt-0.5">
            Opens in one tap — stories you read stay available offline.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button onClick={install} className="btn-primary text-xs px-4 py-2">
              Install
            </button>
            <button
              onClick={dismiss}
              aria-label="Dismiss install suggestion"
              className="btn-ghost text-xs px-3 py-2"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Close install banner"
          className="text-surface-600 hover:text-white p-1 -m-1 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
