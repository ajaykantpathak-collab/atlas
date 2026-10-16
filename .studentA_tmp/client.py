import json, time, urllib.request, urllib.error, os

BASE = 'http://localhost'
TOKF = r'D:/platform/.studentA_tmp/token.txt'
SID = '57c8638c-ee2d-4daa-857d-b345d3fabb37'

def _token():
    if os.path.exists(TOKF):
        return open(TOKF).read().strip()
    return login()

def login():
    d = req_raw('POST', '/api/auth/login', {'email':'demo@dreamapp.in','password':'demo123'})
    tok = d['body']['access_token']
    open(TOKF,'w').write(tok)
    return tok

def req_raw(method, path, body=None, auth=True, _retry=True):
    data = None
    if body is not None:
        data = json.dumps(body).encode()
    r = urllib.request.Request(BASE+path, method=method, data=data)
    if auth: r.add_header('Authorization', 'Bearer '+_token())
    if body is not None:
        r.add_header('Content-Type','application/json')
    try:
        with urllib.request.urlopen(r, timeout=120) as resp:
            raw = resp.read().decode('utf-8', 'replace')
            code = resp.status
    except urllib.error.HTTPError as e:
        raw = e.read().decode('utf-8','replace')
        code = e.code
    except Exception as e:
        return {'code':0,'body':None,'error':str(e)}
    try: parsed = json.loads(raw)
    except Exception: parsed = raw
    if code == 401 and auth and _retry:
        login()
        return req_raw(method, path, body, auth, False)
    return {'code':code,'body':parsed,'raw':raw if not isinstance(parsed,(dict,list)) else None}

def req(method, path, body=None, auth=True):
    r = req_raw(method, path, body, auth)
    return r

def j(x, n=400):
    s = json.dumps(x, ensure_ascii=False) if not isinstance(x,str) else x
    return s[:n]
