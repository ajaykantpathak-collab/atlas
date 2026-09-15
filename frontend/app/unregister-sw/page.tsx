'use client';

/**
 * One-shot service-worker purge. The old production build's workbox SW
 * precaches "/" and serves the stale Atlas page from the browser cache,
 * so the server's redirect to /lumen never reaches the user. Visit
 * localhost:3000/unregister-sw ONCE: this route is not in the old
 * precache manifest, so it is always served from the network; it then
 * unregisters every SW, deletes every cache, and lands on the live app.
 */
import { useEffect } from 'react';

export default function UnregisterSwPage() {
  useEffect(() => {
    const done = () => { window.location.replace('/'); };
    try {
      localStorage.setItem('sw-purged', '1');
      sessionStorage.setItem('sw-purged', '1');
    } catch {}
    const timers = setTimeout(done, 600);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((rs) => {
        Promise.all(rs.map((r) => r.unregister())).catch(() => {});
      });
    }
    if (window.caches && window.caches.keys) {
      window.caches.keys().then((ks) => {
        ks.forEach((k) => window.caches.delete(k));
      }).catch(() => {});
    }
    return () => clearTimeout(timers);
  }, []);

  return (
    <div style={{ background: '#0b0f19', color: '#e2e8f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <p>Clearing the stale offline cache — redirecting…</p>
    </div>
  );
}
