'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { sanitizeHtml } from '@/lib/sanitize';

// CSS is imported once at module level (Next.js deduplicates)
import 'katex/dist/katex.min.css';

interface MathProps {
  math: string;
  className?: string;
}

/**
 * Lazy-loaded inline math renderer using KaTeX.
 * Usage: <LazyInlineMath math="\frac{1}{2}" />
 */
export function LazyInlineMath({ math, className }: MathProps) {
  return <KatexRenderer math={math} displayMode={false} className={className} />;
}

/**
 * Lazy-loaded block math renderer using KaTeX.
 * Usage: <LazyBlockMath math="\int_0^1 x^2 dx" />
 */
export function LazyBlockMath({ math, className }: MathProps) {
  return <KatexRenderer math={math} displayMode={true} className={className} />;
}

function KatexRenderer({
  math,
  displayMode,
  className,
}: {
  math: string;
  displayMode: boolean;
  className?: string;
}) {
  const [html, setHtml] = useState<string>('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('katex').then(({ default: katex }) => {
      if (cancelled) return;
      try {
        const result = katex.renderToString(math, {
          displayMode,
          throwOnError: false,
          errorColor: '#ef4444',
        });
        setHtml(result);
        setError(false);
      } catch {
        setError(true);
      }
    });
    return () => { cancelled = true; };
  }, [math, displayMode]);

  if (error) return <span style={{ color: '#ef4444' }}>Math error</span>;
  if (!html) return <span className="animate-pulse">{displayMode ? '⋯' : '⋯'}</span>;

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}

/**
 * Render math in a string (auto-detect $...$ and $$...$$)
 */
export function LazyAutoMath({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => {
    const segments: { type: 'text' | 'inline' | 'block'; content: string }[] = [];
    const regex = /(\$\$[\s\S]+?\$\$|\$[^$]+?\$|\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\])/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      const m = match[0];
      if (m.startsWith('$$') || m.startsWith('\\[')) {
        segments.push({ type: 'block', content: m.slice(2, -2) });
      } else {
        segments.push({ type: 'inline', content: m.slice(m.startsWith('\\(') ? 2 : 1, m.startsWith('\\(') ? -2 : -1) });
      }
      lastIndex = match.index + m.length;
    }
    if (lastIndex < text.length) {
      segments.push({ type: 'text', content: text.slice(lastIndex) });
    }
    return segments;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.type === 'inline') return <LazyInlineMath key={i} math={part.content} />;
        if (part.type === 'block') return <LazyBlockMath key={i} math={part.content} />;
        return <span key={i}>{part.content}</span>;
      })}
    </span>
  );
}
