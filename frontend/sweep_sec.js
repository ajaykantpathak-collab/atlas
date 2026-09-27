const API = 'http://localhost:8001';
async function api(p, tok, body) {
  const r = await fetch(API + p, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', ...(tok ? { Authorization: 'Bearer ' + tok } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const t = await r.text();
  let j = null; try { j = JSON.parse(t); } catch {}
  return { status: r.status, json: j };
}
(async () => {
  const a = await api('/api/auth/signup', null, { name: 'A', email: 'za' + Date.now() + '@t.in', password: 'Pass@12345', role: 'student', grade: 10 });
  const b = await api('/api/auth/signup', null, { name: 'B', email: 'zb' + Date.now() + '@t.in', password: 'Pass@12345', role: 'student', grade: 10 });
  const tokA = a.json.access_token, tokB = b.json.access_token;
  const uidA = JSON.parse(Buffer.from(tokA.split('.')[1], 'base64').toString()).sub;
  const uidB = JSON.parse(Buffer.from(tokB.split('.')[1], 'base64').toString()).sub;
  console.log('B->A dash:', (await api('/api/dashboard/student/' + uidA, tokB)).status);
  console.log('B->B dash:', (await api('/api/dashboard/student/' + uidB, tokB)).status);
  console.log('anon->A dash:', (await api('/api/dashboard/student/' + uidA, null)).status);
  console.log('B->A achievements:', (await api('/api/dashboard/student/' + uidA + '/achievements', tokB)).status);
  console.log('B->A recent:', (await api('/api/dashboard/student/' + uidA + '/recent', tokB)).status);
  console.log('student->teacher/classes:', (await api('/api/teacher/classes', tokB)).status);
  console.log('anon->teacher/classes:', (await api('/api/teacher/classes', null)).status);
  const t = await api('/api/auth/login', null, { email: 'teacher@dreamapp.in', password: 'demo123' });
  const tokT = t.json.access_token;
  const uidT = JSON.parse(Buffer.from(tokT.split('.')[1], 'base64').toString()).sub;
  console.log('student->teacher dash:', (await api('/api/dashboard/teacher/' + uidT, tokB)).status);
  console.log('teacher->own dash:', (await api('/api/dashboard/teacher/' + uidT, tokT)).status);
})();
