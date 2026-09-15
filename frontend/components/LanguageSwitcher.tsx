'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-surface-600 hover:text-white hover:bg-white/5 transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-32 rounded-lg glass-strong border border-surface-300/30 py-1 z-50">
          <button
            onClick={() => { setLocale('en'); setOpen(false); }}
            className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
              locale === 'en' ? 'text-brand-300 bg-white/5' : 'text-surface-600 hover:text-white hover:bg-white/5'
            }`}
          >
            English
          </button>
          <button
            onClick={() => { setLocale('hi'); setOpen(false); }}
            className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
              locale === 'hi' ? 'text-brand-300 bg-white/5' : 'text-surface-600 hover:text-white hover:bg-white/5'
            }`}
          >
            हिंदी
          </button>
        </div>
      )}
    </div>
  );
}
