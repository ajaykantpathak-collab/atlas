import sys, json, urllib.request, urllib.error
BASE='http://localhost'
def tok(email, pw='demo123'):
    r = urllib.request.Request(BASE+'/api/auth/login', method='POST',
        data=json.dumps({'email':email,'password':pw}).encode(),
        headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(r, timeout=30) as resp:
        d = json.loads(resp.read())
    return d['access_token'], d['user']
def call(method, path, token, body=None):
    r = urllib.request.Request(BASE+path, method=method)
    r.add_header('Authorization','Bearer '+token)
    data=None
    if body is not None:
        data=json.dumps(body).encode(); r.add_header('Content-Type','application/json')
    r.data = data
    try:
        with urllib.request.urlopen(r, timeout=60) as resp:
            raw = resp.read().decode('utf-8','replace'); code = resp.status
    except urllib.error.HTTPError as e:
        raw = e.read().decode('utf-8','replace'); code = e.code
    try: parsed=json.loads(raw)
    except Exception: parsed=raw
    return {'code':code,'body':parsed}
