// Per-class probes: diagnostic + chapter test + practice for classes 6-12
const API = 'http://localhost:8001';
async function api(p, tok, body, method) {
  const r = await fetch(API + p, { method: method || (body ? 'POST' : 'GET'), headers: { 'Content-Type': 'application/json', ...(tok ? { Authorization: 'Bearer ' + tok } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const t = await r.text(); let j = null; try { j = JSON.parse(t); } catch {}
  return { status: r.status, json: j, raw: t.slice(0, 400) };
}
const uid = t => JSON.parse(Buffer.from(t.split('.')[1], 'base64').toString()).sub;

(async () => {
  for (const cls of [6, 7, 8, 9, 10, 11, 12]) {
    const em = `cls${cls}_${Date.now()}@t.in`;
    const su = await api('/api/auth/signup', null, { name: 'C' + cls, email: em, password: 'Pass@12345', role: 'student', grade: cls });
    const tok = su.json && su.json.access_token;
    if (!tok) { console.log(`CLASS ${cls}: signup FAIL`, su.status); continue; }

    // --- practice session ---
    const pr = await api('/api/practice/start', tok, { student_id: uid(tok), subject: 'mathematics', num_questions: 5, class_level: cls });
    const pq = pr.json && (pr.json.question || pr.json.first_question || (pr.json.session && pr.json.session.current_question));
    console.log(`CLASS ${cls} practice:`, pr.status, pq ? 'q=' + String(pq.question || pq.text || pq).slice(0, 60) : JSON.stringify(pr.json).slice(0, 160));

    // --- diagnostic ---
    const dg = await api('/api/diagnostics/start', tok, { gradeLevel: cls, subjects: ['Mathematics'], questionCountPerSubject: 5 });
    const dsess = dg.json && (dg.json.sessionId || dg.json.id || (dg.json.session || {}).id);
    const dqs = dg.json && (dg.json.questions || dg.json.plan || (dg.json.session || {}).questions);
    console.log(`CLASS ${cls} diagnostic:`, dg.status, 'sess=' + (dsess || 'none'), 'qs=' + (Array.isArray(dqs) ? dqs.length : 'n/a'));

    // --- chapter test ---
    const ch = await api(`/api/chapter-tests/chapters?subject=maths&class_level=${cls}`, tok);
    const chaps = ch.json && (ch.json.chapters || ch.json.data || ch.json);
    const first = Array.isArray(chaps) && chaps[0];
    console.log(`CLASS ${cls} chapters:`, ch.status, 'n=' + (Array.isArray(chaps) ? chaps.length : '?'), first ? 'first=' + JSON.stringify(first).slice(0, 80) : '');
    if (first) {
      const chId = first.id || first.code || first.chapter || first.key;
      const st = await api('/api/chapter-tests/start', tok, { subject: 'maths', classLevel: cls, chapter: String(chId), numQuestions: 5 });
      console.log(`CLASS ${cls} ch-test start:`, st.status, JSON.stringify(st.json).slice(0, 160));
    }
  }
})();
