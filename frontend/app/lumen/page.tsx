'use client';

/**
 * Lumen Lab — the cosmic GPGPU experience as the platform's landing.
 * The simulation core (components/lumen/*) is ported verbatim from the
 * workspace build — untouched. This wrapper mounts it into the route,
 * renders the chrome (lesson card, dock, frame, cursor) declaratively,
 * and adds the Enter path into the app.
 */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { initLumen } from '@/components/lumen/lumenEngine';
import { LESSONS, LESSON_ORDER } from '@/components/lumen/lessons';
import './lumen.css';

const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap';

export default function LumenPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const clockRef = useRef<HTMLSpanElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [lessonId, setLessonId] = useState('solar');

  useEffect(() => {
    // fonts must be ready before the text-field canvas rasterises targets
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = FONT_LINK;
    document.head.appendChild(font);

    let engine: { cleanup: () => void } | null = null;
    const t = setTimeout(() => {
      if (!rootRef.current || !canvasRef.current) return;
      engine = initLumen({
        canvas: canvasRef.current,
        cursorEl: cursorRef.current,
        clockEl: clockRef.current,
        countEl: countRef.current,
        root: rootRef.current,
        onLesson: (id: string) => setLessonId(id),
      });
    }, 60);
    return () => {
      clearTimeout(t);
      engine?.cleanup();
    };
  }, []);

  const lesson = (LESSONS as Record<string, any>)[lessonId] || (LESSONS as Record<string, any>).solar;
  const keys = LESSON_ORDER as string[];

  const pick = (id: string) => {
    setLessonId(id);
  };

  return (
    <div className="lumen-root" ref={rootRef} data-lesson={lessonId}>
      <canvas id="gl" ref={canvasRef} />

      <div className="frame" aria-hidden="true">
        <span className="frame-corner tl" />
        <span className="frame-corner tr" />
        <span className="frame-corner bl" />
        <span className="frame-corner br" />
      </div>

      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div id="annotations" aria-hidden="true" />

      <header className="chrome top">
        <div className="brand">
          <span className="brand-mark" />
          <span className="brand-name">Lumen Lab</span>
        </div>
        <div className="meta-row">
          <span>Class 1–12</span>
          <span className="dot" />
          <span ref={countRef} id="particle-count">262,144</span>
          <span className="mute">light-points</span>
        </div>
      </header>

      {/* THE ENTER PATH */}
      <div className="enter-row">
        <Link className="enter-btn" href="/atlas">
          Enter the app <span className="arr">→</span>
        </Link>
      </div>

      <aside className="side-label left" id="side-subject">
        {String(lesson.index ?? '01')} {lesson.subject}
      </aside>
      <aside className="side-label right">
        <span ref={clockRef} id="clock">00:00:00</span>
      </aside>

      <section className="lesson-card" aria-live="polite" key={lesson.id}>
        <div className="card-top">
          <span className="badge" id="lesson-subject">{lesson.subject}</span>
          <span className="grade" id="lesson-grade">{lesson.grade}</span>
        </div>
        <h1 id="lesson-title">{lesson.title}</h1>
        <p className="lede" id="lesson-lede">{lesson.lede}</p>
        <ul className="facts" id="lesson-facts">
          {lesson.facts.map((f: string, i: number) => <li key={i}>{f}</li>)}
        </ul>
        <p className="try" id="lesson-try">{lesson.tryThis}</p>
      </section>

      <nav className="dock" aria-label="Lessons">
        {keys.map((id, i) => (
          <button
            key={id}
            type="button"
            data-lesson={id}
            className={id === lessonId ? 'is-active' : ''}
            onClick={() => pick(id)}
          >
            <span className="dock-index">0{i + 1}</span>
            {(LESSONS as Record<string, any>)[id].title}
          </button>
        ))}
      </nav>

      <nav className="dock-links" aria-label="Explore">
        <Link href="/atlas">atlas</Link>
        <span className="dl-sep" />
        <Link href="/simulations">3,919 sims</Link>
        <span className="dl-sep" />
        <Link href="/practice">practice</Link>
        <span className="dl-sep" />
        <Link href="/junior">junior world</Link>
      </nav>

      <footer className="chrome bottom">
        <div className="hint">
          <span className="key">Move</span> disturb
          <span className="sep" />
          <span className="key">Hold</span> gather
          <span className="sep" />
          <span className="key">1 2 3</span> cosmos
        </div>
        <div className="hint quiet">Every answer verified. The dark stays honest.</div>
      </footer>

      <div className="cursor" ref={cursorRef} aria-hidden="true">
        <span className="cursor-ring" />
        <span className="cursor-core" />
      </div>
    </div>
  );
}
