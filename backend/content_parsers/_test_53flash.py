import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ'
BASE = 'https://open.bigmodel.cn/api/paas/v4'

url = f'{BASE}/chat/completions'
body = json.dumps({
    'model': 'glm-5.3-flash',
    'messages': [{'role': 'user', 'content': 'Say hi in one word'}],
    'max_tokens': 20,
}).encode()

req = urllib.request.Request(url, data=body, method='POST')
req.add_header('Authorization', 'Bearer ' + KEY)
req.add_header('Content-Type', 'application/json')

start = time.time()
try:
    with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
        data = json.loads(resp.read().decode())
        elapsed = time.time() - start
        text = data.get('choices', [{}])[0].get('message', {}).get('content', '')[:80]
        print('glm-5.3-flash: %.1fs -> %s' % (elapsed, text))
except urllib.error.HTTPError as e:
    print('glm-5.3-flash: HTTP %d -> %s' % (e.code, e.read().decode()[:200]))
except Exception as e:
    print('glm-5.3-flash: %s' % e)
