'use client';

// ─────────────────────────────────────────────────────────────
// Verified Practice — deterministic engine, truth tiers
// Corpus: anchor-verified IR chains; answers escrowed server-side
// Routes: /api/practice/deterministic/*  +  /api/tutor/solve
// ─────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from 'react';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

type PracticeStep = {
  n: number;
  name: string;
  expression: string;
  value: string | null;
};

type Item = {
  book: string;
  example_id: string;
  index: number;
  seed: number;
  tier: string;
  license: string;
  question: string;
  question_source: string;
  target: string;
  givens: string[];
  steps: PracticeStep[];
};

type CheckResult = {
  correct: boolean;
  verdict: string;
  expected: number | null;
  student: number | null;
  steps: PracticeStep[] | null;
  target?: string;
};

type LibraryBook = {
  book: string;
  n_examples: number;
  n_verified: number;
  license: string;
  shippable: boolean;
};

type CfqItem = {
  doc_id: number;
  qno: number;
  filename: string;
  subject: string;
  chapter: string | null;
  stem: string;
  options: Record<string, string>;
  tier_available: string;
  source: string;
};

type CfqCheck = {
  tier: string;
  correct: boolean;
  expected_letter: string;
  official_answer_text: string;
  marks: number;
};

type BindResult = {
  tier: string;
  answer: string | null;
  numeric: number | null;
  steps: string[];
  assumptions: string[];
  refusal_reason: string | null;
};

type SolveResult = {
  tier: string;
  solved: boolean;
  stage: string;
  answer: string | null;
  steps: string[];
  refusal_reason: string | null;
  elapsed_ms: number;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export default function VerifiedPracticePage() {
  const [library, setLibrary] = useState<LibraryBook[]>([]);
  const [book, setBook] = useState<string>('');
  const [item, setItem] = useState<Item | null>(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState({ done: 0, right: 0 });

  // free-form solver
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState<SolveResult | null>(null);

  // board (official competency) mode
  const [mode, setMode] = useState<'corpus' | 'board'>('corpus');
  const [boardSubject, setBoardSubject] = useState('physics');
  const [cfqItem, setCfqItem] = useState<CfqItem | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [cfqResult, setCfqResult] = useState<CfqCheck | null>(null);
  const [boardScore, setBoardScore] = useState({ done: 0, right: 0 });

  // binding mode (Lane C): student assigns roles to numbers
  const [bindMode, setBindMode] = useState(false);
  const [numInputs, setNumInputs] = useState([
    { value: '', role: 'count' }, { value: '', role: 'unit_price' }]);
  const [bindTarget, setBindTarget] = useState('total');
  const [bindResult, setBindResult] = useState<BindResult | null>(null);

  const roleOptions = [
    'count', 'unit_price', 'principal', 'rate_percent', 'time_years',
    'part', 'whole', 'percent', 'base', 'height', 'side', 'length',
    'breadth', 'radius', 'speed', 'time', 'distance',
    'first_quantity', 'second_quantity'];
  const targetOptions = [
    'total', 'percent', 'part', 'base', 'simple_interest',
    'compound_interest', 'amount', 'area_triangle',
    'area_parallelogram', 'area_square', 'perimeter_square',
    'area_rectangle', 'perimeter_rectangle', 'area_circle',
    'circumference', 'distance', 'speed', 'time', 'difference', 'sum'];

  const runBinding = useCallback(async () => {
    const bindings = numInputs
      .filter((n) => n.value !== '')
      .map((n) => ({ value: Number(n.value), role: n.role }));
    if (!bindings.length) return;
    setBusy(true);
    setBindResult(null);
    setError(null);
    try {
      const r = await api<BindResult>('/api/practice/deterministic/bind', {
        method: 'POST',
        body: JSON.stringify({ question: 'binding', target_role: bindTarget, bindings }),
      });
      setBindResult(r);
    } catch {
      setError('Binding solver unreachable.');
    } finally {
      setBusy(false);
    }
  }, [numInputs, bindTarget]);

  const loadLibrary = useCallback(async () => {
    try {
      const lib = await api<{ books: LibraryBook[] }>(
        '/api/practice/deterministic/library');
      setLibrary(lib.books);
      const usable = lib.books.filter(
        (b) => b.shippable && b.n_verified > 50);
      const preferred =
        usable.find((b) => /algebra/i.test(b.book) &&
                       !/college|trig/i.test(b.book)) ||
        usable.find((b) => /algebra/i.test(b.book)) ||
        usable[0] || lib.books[0];
      const first = preferred;
      if (first) setBook(first.book);
    } catch (e) {
      setError('Could not reach the practice engine.');
    }
  }, []);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  const nextItem = useCallback(
    async (seed?: number) => {
      if (!book) return;
      setBusy(true);
      setResult(null);
      setAnswer('');
      setError(null);
      try {
        const params = new URLSearchParams({
          book,
          index: String(Math.floor(Math.random() * 500)),
          seed: String(seed ?? Math.floor(Math.random() * 100000)),
        });
        const it = await api<Item>(
          `/api/practice/deterministic/item?${params}`);
        setItem(it);
      } catch {
        setError('Could not load a practice item.');
      } finally {
        setBusy(false);
      }
    },
    [book],
  );

  useEffect(() => {
    if (book && !item) nextItem();
  }, [book, item, nextItem]);

  const check = useCallback(async () => {
    if (!item || !answer.trim()) return;
    setBusy(true);
    try {
      const r = await api<CheckResult>(
        '/api/practice/deterministic/check',
        {
          method: 'POST',
          body: JSON.stringify({
            book: item.book,
            index: item.index,
            seed: item.seed,
            answer,
          }),
        },
      );
      setResult(r);
      if (r.verdict === 'correct') {
        setScore((s) => ({ done: s.done + 1, right: s.right + 1 }));
      } else if (r.verdict !== 'unparseable') {
        setScore((s) => ({ done: s.done + 1, right: s.right }));
      }
    } catch {
      setError('Check failed.');
    } finally {
      setBusy(false);
    }
  }, [item, answer]);

  const solve = useCallback(async () => {
    if (!problem.trim()) return;
    setBusy(true);
    try {
      const r = await api<SolveResult>('/api/practice/deterministic/solve', {
        method: 'POST',
        body: JSON.stringify({ text: problem }),
      });
      setSolution(r);
    } catch {
      setError('Solver unreachable.');
    } finally {
      setBusy(false);
    }
  }, [problem]);

  const nextBoardItem = useCallback(async () => {
    setBusy(true);
    setCfqItem(null);
    setCfqResult(null);
    setPicked(null);
    setError(null);
    try {
      const it = await api<CfqItem>(
        `/api/practice/deterministic/cfq/item?subject=${boardSubject}`);
      setCfqItem(it);
    } catch {
      setError('No official competency items for that subject yet.');
    } finally {
      setBusy(false);
    }
  }, [boardSubject]);

  const answerBoard = useCallback(async (letter: string) => {
    if (!cfqItem || picked || cfqResult) return;
    setPicked(letter);
    setBusy(true);
    try {
      const r = await api<CfqCheck>(
        '/api/practice/deterministic/cfq/check',
        {
          method: 'POST',
          body: JSON.stringify({
            doc_id: cfqItem.doc_id,
            qno: cfqItem.qno,
            answer: letter,
          }),
        },
      );
      setCfqResult(r);
      setBoardScore((s) => ({
        done: s.done + 1,
        right: s.right + (r.correct ? 1 : 0),
      }));
    } catch {
      setError('Check failed.');
    } finally {
      setBusy(false);
    }
  }, [cfqItem, picked, cfqResult]);

  useEffect(() => {
    if (mode === 'board' && !cfqItem) nextBoardItem();
  }, [mode, cfqItem, nextBoardItem]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        {/* header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Verified Practice</h1>
            <p className="text-sm text-slate-400">
              Deterministic engine. Every answer you see has been
              computed and verified. Answers open only after you try.
            </p>
          </div>
          <div className="rounded-xl bg-slate-900 px-4 py-2 text-sm">
            <span className="font-semibold text-emerald-400">
              {mode === 'corpus' ? score.right : boardScore.right}
            </span>
            <span className="text-slate-500">
              {' '}/ {mode === 'corpus' ? score.done : boardScore.done}{' '}
              correct
            </span>
          </div>
        </header>

        {/* mode tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode('corpus')}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              mode === 'corpus'
                ? 'bg-indigo-600'
                : 'bg-slate-900 text-slate-400'
            }`}
          >
            Verified practice
          </button>
          <button
            onClick={() => setMode('board')}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              mode === 'board' ? 'bg-indigo-600' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Board practice (official)
          </button>
        </div>

        {/* book picker */}
        <div className={`flex flex-wrap items-center gap-2 ${mode === 'corpus' ? '' : 'hidden'}`}>
          <select
            value={book}
            onChange={(e) => {
              setBook(e.target.value);
              setItem(null);
            }}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm border border-slate-700"
          >
            {library.map((b) => (
              <option key={b.book} value={b.book}>
                {b.book.replace(/_-_/g, ' ')} ({b.n_verified})
                {b.shippable ? '' : ' - internal'}
              </option>
            ))}
          </select>
          <button
            onClick={() => nextItem()}
            disabled={busy || !book}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Next question
          </button>
          <button
            onClick={() => nextItem(item ? item.seed + 1 : 1)}
            disabled={busy || !book}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm disabled:opacity-50"
            title="Same structure, fresh numbers"
          >
            One more like this
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-rose-800 bg-rose-950 px-4 py-2 text-sm text-rose-200">
            {error}
          </div>
        )}

        {/* board practice: official competency MCQs */}
        {mode === 'board' && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={boardSubject}
                onChange={(e) => {
                  setBoardSubject(e.target.value);
                  setCfqItem(null);
                  setCfqResult(null);
                  setPicked(null);
                }}
                className="rounded-lg bg-slate-950 px-3 py-2 text-sm border border-slate-700"
              >
                {['physics', 'chemistry', 'biology', 'maths', 'english',
                  'history', 'social_science'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button
                onClick={nextBoardItem}
                disabled={busy}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                Next question
              </button>
              <span className="text-xs text-slate-500">
                Official CBSE competency bank - answers are the Board's
                own keys, escrowed until you answer.
              </span>
            </div>

            {cfqItem && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-sky-900/60 px-3 py-1 font-semibold text-sky-300">
                    VERIFIED-OFFICIAL
                  </span>
                  <span className="text-slate-500">
                    {cfqItem.chapter || cfqItem.filename}
                  </span>
                </div>
                <p className="text-lg leading-relaxed">{cfqItem.stem}</p>
                <div className="grid gap-2">
                  {Object.entries(cfqItem.options).map(([letter, text]) => {
                    const isPicked = picked === letter;
                    const isRight = cfqResult &&
                      letter === cfqResult.expected_letter;
                    return (
                      <button
                        key={letter}
                        onClick={() => answerBoard(letter)}
                        disabled={busy || !!picked}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          cfqResult
                            ? isRight
                              ? 'border-emerald-600 bg-emerald-950/50'
                              : isPicked
                                ? 'border-rose-700 bg-rose-950/40'
                                : 'border-slate-800 opacity-60'
                            : 'border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        <span className="font-semibold text-slate-400">
                          ({letter}){' '}
                        </span>
                        {text}
                      </button>
                    );
                  })}
                </div>
                {cfqResult && (
                  <div
                    className={`rounded-xl p-4 border text-sm ${
                      cfqResult.correct
                        ? 'border-emerald-700 bg-emerald-950/50'
                        : 'border-amber-800 bg-amber-950/30'
                    }`}
                  >
                    <p className="font-semibold">
                      {cfqResult.correct
                        ? 'Correct - matches the official key.'
                        : `Not this one. The official answer is (${cfqResult.expected_letter}).`}
                    </p>
                    {cfqResult.official_answer_text && (
                      <p className="mt-2 text-slate-300">
                        Board marking: {cfqResult.official_answer_text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* the question */}
        {mode === 'corpus' && item && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-full bg-emerald-900/60 px-3 py-1 font-semibold text-emerald-300">
                {item.tier}
              </span>
              <span className="text-slate-500">
                {item.question_source === 'original-cc-by'
                  ? 'OpenStax (CC BY 4.0) - '
                  : ''}
                {item.book} - example {item.example_id}
              </span>
            </div>

            <p className="text-lg leading-relaxed">{item.question}</p>

            {item.steps.length > 1 && !result && (
              <details className="text-sm text-slate-400">
                <summary className="cursor-pointer">
                  Show the method scaffold
                </summary>
                <ol className="mt-2 space-y-1 list-decimal list-inside">
                  {item.steps.map((s) => (
                    <li key={s.n}>
                      <span className="text-slate-300">{s.name}</span>:{' '}
                      <code className="text-slate-500">
                        {s.value !== null
                          ? s.expression
                          : '(you compute this)'}
                      </code>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div className="flex gap-2">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && check()}
                placeholder="Your answer (e.g. 15 or 30/2)"
                className="flex-1 rounded-lg bg-slate-950 px-3 py-2 border border-slate-700 focus:border-indigo-500 outline-none"
              />
              <button
                onClick={check}
                disabled={busy || !answer.trim()}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                Check
              </button>
            </div>

            {result && (
              <div
                className={`rounded-xl p-4 space-y-3 border ${
                  result.correct
                    ? 'border-emerald-700 bg-emerald-950/50'
                    : 'border-amber-800 bg-amber-950/30'
                }`}
              >
                <p className="font-semibold">
                  {result.correct
                    ? 'Correct - verified.'
                    : result.verdict === 'unparseable'
                      ? 'Could not read that answer. Try a number or fraction like 15 or 3/4.'
                      : `Not yet. The verified answer is ${result.expected}.`}
                </p>
                {result.steps && (
                  <details className="text-sm" open={result.correct}>
                    <summary className="cursor-pointer text-slate-300">
                      Full verified solution
                    </summary>
                    <ol className="mt-2 space-y-1 list-decimal list-inside">
                      {result.steps.map((s) => (
                        <li key={s.n}>
                          <span className="text-slate-300">{s.name}</span> ={' '}
                          <code>{s.expression}</code>
                          {s.value !== null && (
                            <span className="text-emerald-300">
                              {' '}
                              = {s.value}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </details>
                )}
              </div>
            )}
          </section>
        )}

        {/* Lane C: solve with me (variable binding) */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
          <button
            onClick={() => setBindMode(!bindMode)}
            className="flex w-full items-center justify-between"
          >
            <h2 className="font-semibold">Solve with me</h2>
            <span className="text-xs text-slate-500">
              {bindMode ? 'hide' : 'show'}
            </span>
          </button>
          {bindMode && (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">
                Enter the numbers from your question and tell me what each
                one means. I compute and verify - you show you understood
                the question.
              </p>
              {numInputs.map((n, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="number"
                    value={n.value}
                    onChange={(e) => {
                      const next = [...numInputs];
                      next[i] = { ...next[i], value: e.target.value };
                      setNumInputs(next);
                    }}
                    placeholder="number"
                    className="w-24 rounded-lg bg-slate-950 px-3 py-2 border border-slate-700"
                  />
                  <select
                    value={n.role}
                    onChange={(e) => {
                      const next = [...numInputs];
                      next[i] = { ...next[i], role: e.target.value };
                      setNumInputs(next);
                    }}
                    className="flex-1 rounded-lg bg-slate-950 px-3 py-2 border border-slate-700 text-sm"
                  >
                    {roleOptions.map((r) => (
                      <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                onClick={() => setNumInputs([...numInputs, { value: '', role: 'first_quantity' }])}
                className="text-xs text-indigo-400"
              >
                + another number
              </button>
              <div className="flex gap-2">
                <span className="text-sm text-slate-400 self-center">Find the</span>
                <select
                  value={bindTarget}
                  onChange={(e) => setBindTarget(e.target.value)}
                  className="flex-1 rounded-lg bg-slate-950 px-3 py-2 border border-slate-700 text-sm"
                >
                  {targetOptions.map((t) => (
                    <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
                  ))}
                </select>
                <button
                  onClick={runBinding}
                  disabled={busy}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold disabled:opacity-50"
                >
                  Solve
                </button>
              </div>
              {bindResult && (
                <div className={`rounded-xl p-4 border text-sm ${
                  bindResult.tier.startsWith('VERIFIED')
                    ? 'border-emerald-700 bg-emerald-950/50'
                    : 'border-amber-800 bg-amber-950/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      bindResult.tier === 'VERIFIED'
                        ? 'bg-emerald-900/60 text-emerald-300'
                        : 'bg-sky-900/60 text-sky-300'
                    }`}>
                      {bindResult.tier}
                    </span>
                  </div>
                  {bindResult.answer !== null ? (
                    <p className="text-lg font-semibold text-emerald-300">
                      {bindResult.answer}
                    </p>
                  ) : (
                    <p className="text-slate-400">
                      {bindResult.refusal_reason}
                    </p>
                  )}
                  {bindResult.assumptions.length > 0 && (
                    <p className="mt-2 text-amber-300 text-xs">
                      Assumptions: {bindResult.assumptions.join('; ')}
                    </p>
                  )}
                  {bindResult.steps.length > 0 && (
                    <ol className="mt-2 space-y-1 list-decimal list-inside text-slate-300">
                      {bindResult.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* free-form deterministic solver */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
          <h2 className="font-semibold">Ask the deterministic solver</h2>
          <p className="text-sm text-slate-400">
            Type any problem. Verified answers are computed, never
            generated; anything else gets the method, not a guess.
          </p>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            placeholder="e.g. Solve for x: 2x + 6 = 20"
            className="w-full rounded-lg bg-slate-950 px-3 py-2 border border-slate-700 focus:border-indigo-500 outline-none"
          />
          <button
            onClick={solve}
            disabled={busy || !problem.trim()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Solve
          </button>

          {solution && (
            <div className="rounded-xl bg-slate-950 p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    solution.tier === 'VERIFIED'
                      ? 'bg-emerald-900/60 text-emerald-300'
                      : 'bg-amber-900/60 text-amber-300'
                  }`}
                >
                  {solution.tier}
                </span>
                <span className="text-slate-500">
                  {solution.stage} - {solution.elapsed_ms} ms
                </span>
              </div>
              {solution.answer !== null ? (
                <p className="text-lg font-semibold text-emerald-300">
                  {solution.answer}
                </p>
              ) : (
                <p className="text-slate-400">
                  {solution.solved
                    ? 'Method only - the final answer is yours to compute.'
                    : solution.refusal_reason ||
                      'No verified path for this problem yet.'}
                </p>
              )}
              {solution.steps.length > 0 && (
                <ol className="space-y-1 list-decimal list-inside text-slate-300">
                  {solution.steps.slice(0, 8).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </section>

        <footer className="text-xs text-slate-600 pb-8">
          Content adapted from OpenStax (CC BY 4.0) and platform-verified
          structures. Licensed renditions are rendered, never copied.
        </footer>
      </div>
    </main>
  );
}
