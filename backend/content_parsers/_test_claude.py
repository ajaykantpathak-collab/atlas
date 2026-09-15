import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = 'sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK'
URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'

body = json.dumps({
    'model': MODEL,
    'max_tokens': 50,
    'messages': [{'role': 'user', 'content': 'Say hi in one word'}],
}).encode()

req = urllib.request.Request(URL, data=body, method='POST')
req.add_header('x-api-key', KEY)
req.add_header('Content-Type', 'application/json')
req.add_header('anthropic-version', '2023-06-01')

start = time.time()
try:
    with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
        data = json.loads(resp.read().decode())
        elapsed = time.time() - start
        text = ''
        for block in data.get('content', []):
            if block.get('type') == 'text':
                text = block.get('text', '')
                break
        print('Claude OK: %.1fs -> %s' % (elapsed, text[:80]))
except urllib.error.HTTPError as e:
    body = e.read().decode()[:300]
    print('Claude HTTP %d: %s' % (e.code, body))
except Exception as e:
    print('Claude ERROR: %s' % e)
