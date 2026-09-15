import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ'
BASE = 'https://open.bigmodel.cn/api/paas/v4'

url = f'{BASE}/chat/completions'
body = json.dumps({
    'model': 'glm-4-plus',
    'messages': [{'role': 'user', 'content': 'Write a 200-word essay about Macbeth as a tragic hero'}],
    'max_tokens': 2000,
}).encode()
req = urllib.request.Request(url, data=body, method='POST')
req.add_header('Authorization', f'Bearer ' + KEY)
req.add_header('Content-Type', 'application/json')

start = time.time()
with urllib.request.urlopen(req, timeout=60, context=ctx) as resp:
    data = json.loads(resp.read().decode())
    elapsed = time.time() - start
    text = data.get('choices', [{}])[0].get('message', {}).get('content', '')
    usage = data.get('usage', {})
    print('Response time: %.1fs' % elapsed)
    print('Tokens in: %s, out: %s, total: %s' % (usage.get('prompt_tokens'), usage.get('completion_tokens'), usage.get('total_tokens')))
    print('Content length: %d chars' % len(text))
    print('Content preview:')
    print(text[:500])
