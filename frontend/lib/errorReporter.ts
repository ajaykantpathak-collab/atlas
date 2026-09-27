'use client';

/**
 * reportClientError — fire-and-forget error POST to the backend so
 * real-user crashes land in activity_log instead of being invisible.
 * Wire it once from an error boundary / window.onerror.
 */
import { api } from './api';

let _lastReport = 0;
const _seen = new Set<string>();

export function reportClientError(message: string, opts?: { url?: string; stack?: string; component?: string }) {
    if (typeof window === 'undefined') return;
    // Dedupe + throttle: at most one identical error per session, and no
    // more than one report every 2s (error storms during render loops).
    const key = `${message}|${opts?.component ?? ''}`;
    if (_seen.has(key)) return;
    if (Date.now() - _lastReport < 2000) return;
    _seen.add(key);
    _lastReport = Date.now();
    api.post('/api/progress/client-error', {
        message: String(message).slice(0, 2000),
        url: opts?.url ?? window.location.pathname,
        stack: String(opts?.stack ?? '').slice(0, 4000),
        component: opts?.component,
    }).catch(() => {});
}

/** Attach once — global error + unhandled rejection listeners. */
export function initErrorReporting() {
    if (typeof window === 'undefined' || (window as unknown as Record<string, boolean>).__atlasErrInit) return;
    (window as unknown as Record<string, boolean>).__atlasErrInit = true;
    window.addEventListener('error', (e) => {
        reportClientError(e.message ?? 'window error', { stack: e.error?.stack });
    });
    window.addEventListener('unhandledrejection', (e) => {
        reportClientError(`unhandled rejection: ${String(e.reason ?? '').slice(0, 300)}`);
    });
}
