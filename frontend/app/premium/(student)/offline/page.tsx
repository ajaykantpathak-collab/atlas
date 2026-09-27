'use client';

/**
 * Offline Content — /premium/offline
 *
 * Backed by the REAL device cache (lib/offlineLibrary): every story listed
 * here sits in the `atlas-stories-v1` Cache Storage entry written when the
 * student opened that Story online. Counts, titles and sizes are read back
 * from the cache itself — nothing is fabricated, no server-side
 * "available for download" filler. Storage figures come from
 * navigator.storage.estimate().
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, CloudOff, HardDrive, Search, Trash2, Wifi, WifiOff,
} from 'lucide-react';
import {
  clearDownloadedStories,
  formatBytes,
  listDownloadedStories,
  removeDownloadedStory,
  type DownloadedStory,
} from '@/lib/offlineLibrary';

function metaLine(s: DownloadedStory): string {
  const parts = [
    s.classLevel != null ? `Class ${s.classLevel}` : '',
    s.subject,
    s.chapter,
  ].filter(Boolean);
  return parts.join(' · ');
}

export default function PremiumOfflinePage() {
  const [search, setSearch] = useState('');
  const [stories, setStories] = useState<DownloadedStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);
  const [storage, setStorage] = useState<{ used: number | null; quota: number | null }>({
    used: null,
    quota: null,
  });

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setStories(await listDownloadedStories());
      if (navigator.storage?.estimate) {
        const est = await navigator.storage.estimate();
        setStorage({
          used: est.usage ?? null,
          quota: est.quota ?? null,
        });
      }
    } catch {
      setStories([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    void refresh();
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, [refresh]);

  const remove = async (nodeId: string) => {
    await removeDownloadedStory(nodeId);
    void refresh();
  };

  const clearAll = async () => {
    await clearDownloadedStories();
    void refresh();
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return stories;
    return stories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subject.toLowerCase().includes(q) ||
        s.chapter.toLowerCase().includes(q)
    );
  }, [stories, search]);

  const totalStoryBytes = stories.reduce((sum, s) => sum + s.sizeBytes, 0);
  const usedMb = storage.used != null ? (storage.used / (1024 * 1024)).toFixed(1) : null;
  const quotaMb = storage.quota != null ? Math.round(storage.quota / (1024 * 1024)) : null;
  const pct =
    storage.used != null && storage.quota
      ? Math.min(100, Math.round((storage.used / storage.quota) * 100))
      : 0;

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/premium/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Offline Content</h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass">
            {online ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-mint-400" />
                <span className="text-xs text-surface-600">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-gold-300" />
                <span className="text-xs text-surface-600">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Real device storage */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shrink-0">
              <HardDrive className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-2 gap-3">
                <h2 className="font-display text-lg font-bold text-white">Storage on this device</h2>
                <span className="text-xs text-surface-600 font-mono whitespace-nowrap">
                  {usedMb != null ? `${usedMb} MB${quotaMb != null ? ` / ${quotaMb} MB` : ''}` : 'estimate unavailable'}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-400 to-gold-400 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-surface-600 mt-2">
                {loading
                  ? 'Reading offline library…'
                  : `${stories.length} ${stories.length === 1 ? 'story' : 'stories'} saved · ${formatBytes(totalStoryBytes) || '0 B'} of story content`}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        {stories.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search saved stories..."
                className="input-field pl-9 text-xs h-9"
              />
            </div>
            <button
              onClick={clearAll}
              className="text-xs text-red-300 hover:text-red-200 flex items-center gap-1 px-3 py-2"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear all
            </button>
          </div>
        )}

        {/* Saved stories — real cache contents */}
        <div className="space-y-3">
          {filtered.map((story) => (
            <div key={story.nodeId} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-brand-300 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white truncate">{story.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-surface-600 mt-0.5">
                    {metaLine(story) && <span className="truncate">{metaLine(story)}</span>}
                    {story.sizeBytes > 0 && <span className="whitespace-nowrap">{formatBytes(story.sizeBytes)}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={story.storyUrl} className="btn-ghost text-xs px-3 py-1.5">
                    Open
                  </Link>
                  <button
                    onClick={() => remove(story.nodeId)}
                    aria-label={`Remove ${story.title} from offline library`}
                    className="text-surface-600 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && filtered.length === 0 && (
            <div className="glass-card rounded-xl p-8 text-center">
              <CloudOff className="w-8 h-8 text-surface-500 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-white mb-1">
                {stories.length === 0 ? 'No stories saved yet' : 'No saved story matches your search'}
              </h3>
              <p className="text-xs text-surface-600">
                {stories.length === 0 ? (
                  <>
                    Open any <Link href="/my-galaxy" className="text-brand-300 hover:text-brand-200">Story</Link> while
                    connected — it is saved to this device automatically and then opens without internet.
                  </>
                ) : (
                  'Try a different search.'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
