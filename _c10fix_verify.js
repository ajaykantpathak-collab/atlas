// c10fix — live verification on :3001 (API surface)
// Verifies: grammar practice purity, pre-board honesty (math/science/soc-sci),
// exam titles, diagnostics availability. Run AFTER the backend restart window.
const { freshToken } = require('D:/platform/_c10_audit/token.js');
const fs = require('fs');

const BASE = 'http://localhost:3001';
const OUT = 'D:/platform/_c10_audit/c10fix_verify.jsonl';

const LOGIC_RE = /(propositional|is a proposition|proposition\?|tautology|truth table|truth value|biconditional|logical connective|the symbol\s*[''’]?[∧∨→↔~]|given\s+p\s*=|\bif\s+p\s*=\s*(true|false)|\bp\s*(and|or|implies|→|↔)\s*q)/i;

async function api(method, path, token, body, timeout = 60000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeout);
  try {
    const r = await fetch(BASE + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: ctl.signal,
    });
    const raw = await r.text();
    let j; try { j = JSON.parse(raw); } catch { j = raw.slice(0, 300); }
    return { status: r.status, body: j };
  } catch (e) {
    return { status: -1, body: { error: String(e.message || e).slice(0, 160) } };
  } finally { clearTimeout(t); }
}

(async () => {
  const log = fs.createWriteStream(OUT, { flags: 'a' });
  const rec = (o) => { log.write(JSON.stringify({ ts: new Date().toISOString().slice(11, 19), ...o }) + '\n'); console.log(JSON.stringify(o).slice(0, 400)); };
  const token = await freshToken();

  // ── 1. Grammar practice: 20 questions, every one must be grammar ──
  const nodes = await api('GET', '/api/nodes/by-class-subject?class=10&subject=gram&limit=100', token);
  const gramNode = (nodes.body.nodes || [])[0];
  const st = await api('POST', '/api/practice/start', token, {
    subject: 'grammar', topic_ids: [gramNode.node_id], num_questions: 20, class_level: 10,
  });
  if (!(st.status === 200 || st.status === 201)) {
    rec({ check: 'grammar_start', fail: true, status: st.status, body: JSON.stringify(st.body).slice(0, 200) });
  } else {
    const qs = st.body.questions || [];
    const texts = qs.map(q => String(q.text || ''));
    const logicHits = texts.filter(t => LOGIC_RE.test(t));
    const onClass = qs.filter(q => String(q.node_id || '').includes('c10_gram'));
    rec({
      check: 'grammar_20q', planned: qs.length,
      all_grammar_nodes: qs.length > 0 && onClass.length === qs.length,
      logic_hits: logicHits.length,
      sample: texts.slice(0, 2).map(t => t.slice(0, 90)),
      session: st.body.id,
    });
  }

  // ── 2. Math pre-board: no logic, no broken options, valid paper ──
  for (const subject of ['mathematics', 'science', 'social_science']) {
    const p = await api('POST', `/api/preboard/${subject}/start?class_level=10`, token, {});
    if (p.status !== 200 && p.status !== 201) {
      rec({ check: 'preboard_start', subject, fail: true, status: p.status, body: JSON.stringify(p.body).slice(0, 160) });
      continue;
    }
    const paper = p.body;
    const allQ = (paper.sections || []).flatMap(s => (s.questions || []).map(q => ({ ...q, sectionTitle: s.title, sectionNote: s.note })));
    const logicQ = allQ.filter(q => LOGIC_RE.test(String(q.text || '')) || (q.options || []).some(o => LOGIC_RE.test(String(o || ''))));
    const brokenOpt = allQ.filter(q => {
      const emb = String(q.text || '').split('\n').map(l => l.match(/^\s*[A-Da-d][\)\.:]\s+(\S.*)$/)).filter(Boolean).map(m => m[1].trim().toLowerCase());
      const opts = (q.options || []).map(o => String(o || '').replace(/^[A-Da-d][\)\.:]\s*/, '').trim().toLowerCase());
      if (emb.length >= 2 && opts.length) {
        if (emb.length !== opts.length) return true;
        const e = new Set(emb.map(s => s.replace(/^[a-d][\)\.:]\s*/, ''))), s2 = new Set(opts);
        return [...e].join('|') !== [...s2].join('|');
      }
      return opts.length !== new Set(opts).size;
    });
    const withOpts = allQ.filter(q => (q.options || []).length > 0);
    const secA = (paper.sections || [])[0] || {};
    const objectiveClaim = /objective/i.test(secA.title || '');
    const honestObjective = !objectiveClaim || withOpts.filter(q => q.sectionTitle === secA.title).length > 0;
    rec({
      check: 'preboard_paper', subject, session: paper.sessionId,
      total: allQ.length, totalMarks: paper.totalMarks,
      sectionA_title: secA.title,
      questions_with_options: withOpts.length,
      tf_chips: allQ.filter(q => (q.options || []).join() === 'True,False').length,
      logic_questions: logicQ.length,
      broken_option_questions: brokenOpt.length,
      objective_claim_honest: honestObjective,
      shortfalls: (paper.shortfalls || []).length,
      empty_chapter: allQ.filter(q => !q.chapter).length,
    });

    // answer everything with a real attempt (the T/F chips' own text where present)
    const answers = allQ.filter(q => !q.alternativeOf).map(q => ({
      questionId: q.questionId,
      answer: (q.options || []).length ? q.options[0] : '42',
      timeTakenSeconds: 5,
    }));
    const sub = await api('POST', `/api/preboard/${paper.session_id || paper.sessionId}/submit`, token, { answers }, 120000);
    const res = sub.status === 200 || sub.status === 201
      ? await api('GET', `/api/preboard/${paper.session_id || paper.sessionId}/result`, token)
      : { status: sub.status, body: sub.body };
    rec({
      check: 'preboard_grade', subject, submit: sub.status, result: res.status,
      score: res.body && res.body.totalScore, max: res.body && res.body.maxScore,
      grade: res.body && res.body.grade, sections: res.body && (res.body.sections || []).map(s => `${s.sectionId}:${s.score}/${s.max}`),
      shortfalls_in_report: res.body && (res.body.shortfalls || []).map(s => s.slice(0, 90)),
    });
  }

  // ── 3. Exam list titles (stale-year fix) ──
  const exams = await api('GET', '/api/assessment/exams', token);
  rec({ check: 'exam_titles', exams: (exams.body.exams || exams.body || []).map(e => e.title || e).slice(0, 6) });

  // ── 4. Chapter tests now know grammar/computer ──
  for (const s of ['grammar', 'computer']) {
    const ct = await api('GET', `/api/chapter-tests/chapters?subject=${s}&class_level=10`, token);
    rec({
      check: 'chtest_catalog', subject: s, status: ct.status,
      chapters: ct.status === 200 ? (ct.body.chapters || []).length : JSON.stringify(ct.body).slice(0, 120),
      ready: ct.status === 200 ? (ct.body.chapters || []).filter(c => c.testReady).length : null,
    });
  }

  // ── 5. Mastery map totals (real catalog) ──
  const m = await api('GET', '/api/progress/mastery', token);
  const rows = Array.isArray(m.body) ? m.body : [];
  rec({
    check: 'mastery_map', status: m.status,
    total_nodes: rows.reduce((a, r) => a + (r.totalNodes ?? r.total_nodes ?? 0), 0),
    subjects: rows.map(r => `${r.subject}:${r.totalNodes ?? r.total_nodes}`),
  });

  // ── 6. Stats per_class_subject (Hindi gate data) ──
  const stats = await api('GET', '/api/nodes/stats');
  const pcs = stats.body && stats.body.per_class_subject;
  rec({
    check: 'stats_per_class_subject', status: stats.status,
    c10_hindi: pcs && pcs['10'] ? (pcs['10']['hin_a'] || 0) + (pcs['10']['hin_ar'] || 0) : null,
    c11_hindi: pcs && pcs['11'] ? (pcs['11']['hin_a'] || 0) + (pcs['11']['hin_ar'] || 0) : null,
    c10_total: pcs ? Object.values(pcs['10'] || {}).reduce((a, b) => a + b, 0) : null,
  });

  log.end();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
