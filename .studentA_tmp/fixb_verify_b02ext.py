import json, re, urllib.request

BASE = 'http://localhost'

def token():
    d = json.loads(urllib.request.urlopen(urllib.request.Request(
        BASE + '/api/auth/login', method='POST',
        data=json.dumps({'email': 'demo@dreamapp.in', 'password': 'demo123'}).encode(),
        headers={'Content-Type': 'application/json'}), timeout=60).read().decode())
    return d['access_token']

def req(method, path, body=None, tok=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(BASE + path, method=method, data=data)
    if tok: r.add_header('Authorization', 'Bearer ' + tok)
    r.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(r, timeout=120) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode() or '{}')

tok = token()
code, d = req('POST', '/api/diagnostics/start',
              {'subjects': ['Psychology'], 'gradeLevel': 12}, tok)
print('start:', code, 'session:', d.get('sessionId'))
qs = d.get('questions') or []
corpus_n = sum(1 for q in qs if str(q.get('questionId', '')).startswith('corpus:'))
print(f'questions: {len(qs)} | corpus(real psy): {corpus_n} | generator: {len(qs)-corpus_n}')
for i, q in enumerate(qs[:5]):
    print(' ', i, q.get('questionId')[:40], '|', (q.get('questionText') or '')[:60])

# answer every question by picking the option whose text equals the grader's
# own canonical answer when possible; log any false-negative.
norm = lambda s: re.sub(r'\s+', '', str(s or '')).lower()
false_neg = 0
connective_checked = 0
for q in qs:
    opts = {o['optionId']: o['text'] for o in (q.get('options') or [])}
    if not opts:
        continue
    # answer question 1 with first option, then use returned correctAnswer
    pick = sorted(opts)[0]
    code, resp = req('POST', f"/api/diagnostics/{d['sessionId']}/answer",
                     {'questionId': q['questionId'], 'selectedOptionId': pick,
                      'timeSpentSeconds': 5}, tok)
    if code != 200:
        print('answer HTTP', code, str(resp)[:100], q.get('questionId'))
        continue
    ca = str(resp.get('correctAnswer') or '')
    match_pick = [oid for oid, t in opts.items() if norm(t) == norm(ca)]
    if match_pick:
        # canonical answer exists in options: if we picked wrong, re-check via
        # a second identical session is impossible (sequential) — instead flag
        # only if grader said False while our pick text == canonical answer
        if (not resp.get('isCorrect')) and norm(opts[pick]) == norm(ca):
            false_neg += 1
            print('FALSE-NEG on grader-own-answer:', q.get('questionId'), ca[:50])
    is_conn = 'connective' in str(q.get('questionText') or '')
    if is_conn:
        connective_checked += 1
        # connective questions: canonical must now be IN options (fix check)
        in_opts = norm(ca) in {norm(t) for t in opts.values()}
        print(f"connective q {q.get('questionId')[:30]}: answer={ca!r} in_options={in_opts}")
        if not in_opts:
            false_neg += 1
print('connective questions seen:', connective_checked)
print('false-negatives on grader-own answers:', false_neg)
print('RESULT:', 'PASS' if false_neg == 0 else 'FAIL')
