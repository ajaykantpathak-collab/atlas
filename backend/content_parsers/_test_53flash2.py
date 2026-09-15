import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ'
BASE = 'https://open.bigmodel.cn/api/paas/v4'

url = f'{BASE}/chat/completions'
body = json.dumps({
    'model': 'glm-5.3-flash',
    'messages': [
        {'role': 'system', 'content': 'You are a helpful English teacher.'},
        {'role': 'user', 'content': 'Write 3 quotes from Macbeth Act 1 with speaker and context. Use this format:\nQUOTE: ...\nSPEAKER: ...\nCONTEXT: ...\n\nDo this for 3 quotes.'},
    ],
    'max_tokens': 1000,
    'temperature': 0.7,
}).encode()

req = urllib.request.Request(url, data=body, method='POST')
req.add_header('Authorization', 'Bearer ' + KEY)
req.add_header('Content-Type', 'application/json')

start = time.time()
with urllib.request.urlopen(req, timeout=60, context=ctx) as resp:
    raw = resp.read().decode()
    data = json.loads(raw)
    elapsed = time.time() - start
    text = data.get('choices', [{}])[0].get('message', {}).get('content', '')
    usage = data.get('usage', {})
    print('Time: %.1fs' % elapsed)
    print('Tokens: in=%s out=%s' % (usage.get('prompt_tokens'), usage.get('completion_tokens')))
    print('Content (%d chars):' % len(text))
    print(text)
    if not text:
        print('RAW RESPONSE:')
        print(raw[:500])
