import json, urllib.request

BASE = 'http://localhost'
TOKEN = open(r'D:/platform/.studentA_tmp/token.txt').read().strip()
SID = open(r'D:/platform/.studentA_tmp/diag_fixb_sid.txt').read().strip().split('=')[1]

def req(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(BASE + path, method=method, data=data)
    r.add_header('Authorization', 'Bearer ' + TOKEN)
    r.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(r, timeout=120) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode() or '{}')

# chosen optionIds (semantically correct where determinable)
plan = {
 1:'a', 2:'b', 3:'a', 4:'a', 5:'c', 6:'a', 7:'a', 8:'b',
 9:'a', 10:'a', 11:'a', 12:'b', 13:'a', 14:'b',
}

d = json.load(open(r'D:/platform/.studentA_tmp/diag_fixb_psy.json'))
qs = d['questions']
print('session', SID)
for i, q in enumerate(qs):
    if i == 0:
        continue  # already answered 'a' -> correct
    opts = {o['optionId']: o['text'] for o in (q.get('options') or [])}
    pick = plan.get(i, 'a')
    body = {'questionId': q['questionId'], 'selectedOptionId': pick, 'timeSpentSeconds': 8}
    code, resp = req('POST', f'/api/diagnostics/{SID}/answer', body)
    if code != 200:
        print(i, q['questionId'], 'HTTP', code, str(resp)[:120]); continue
    correct_answer = str(resp.get('correctAnswer') or '')
    my_text = opts.get(pick, '')
    import re
    norm = lambda s: re.sub(r'\s+', '', str(s)).lower()
    matches_grader = norm(my_text) == norm(correct_answer)
    flag = 'OK-TRUE' if resp.get('isCorrect') else ('WRONG-BUT-MATCHES-GRADER-ANSWER' if matches_grader else 'wrong')
    print(f"{i:2d} {q['questionId'][:34]:34s} pick={pick} isCorrect={str(resp.get('isCorrect')):5s} graderSaid={correct_answer[:50]!r} myText={my_text[:40]!r} -> {flag}")
