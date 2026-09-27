'use client';

/**
 * PWAProvider — registers the hand-written Atlas service worker (/sw.js) and
 * mounts the add-to-home-screen prompt.
 *
 * Registration happens HERE (the student + premium layouts), not in the root
 * layout: only student-facing surfaces need offline support, and an inline
 * <script> registration in the root layout would also swallow landing/auth
 * pages that must never be served stale.
 *
 * The worker itself is versioned (cache names carry the version inside
 * public/sw.js); the browser byte-compares sw.js on its own update cycle.
 */

import { type ReactNode, useEffect } from 'react';
import InstallPrompt from '@/components/pwa/InstallPrompt';

let registrationPromise: Promise<ServiceWorkerRegistration | null> | null = null;

function registerAtlasSW(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(null);
  }
  if (!registrationPromise) {
    registrationPromise = navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch((err) => {
        // Registration must never break the app — log and move on.
        console.warn('[atlas-sw] registration failed:', err);
        registrationPromise = null;
        return null;
      });
  }
  return registrationPromise;
}

export default function PWAProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void registerAtlasSW();
  }, []);

  return (
    <>
      {children}
      <InstallPrompt />
    </>
  );
}
