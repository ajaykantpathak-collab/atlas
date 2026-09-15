import urllib.request, json, ssl, time

API_KEY = 'sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK'
url = 'https://api.opusmax.pro/v1/messages'
ctx = ssl.create_default_context()

body = json.dumps({
    'model': 'claude-opus-5',
    'max_tokens': 100,
    'messages': [{'role': 'user', 'content': 'Say hello in one word'}],
}).encode('utf-8')

req = urllib.request.Request(url, data=body, method='POST')
req.add_header('x-api-key', API_KEY)
req.add_header('Content-Type', 'application/json')
req.add_header('anthropic-version', '2023-06-01')

start = time.time()
try:
    with urllib.request.urlopen(req, timeout=60, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        blocks = data.get('content', [])
        for b in blocks:
            btype = b.get('type')
            text = b.get('text', '')[:100]
            print(f'Block: {btype} = {text}')
        elapsed = time.time() - start
        print(f'Time: {elapsed:.1f}s')
        print(f'Usage: {data.get("usage", {})}')
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8')
    print(f'HTTP Error {e.code}: {body[:300]}')
except Exception as e:
    print(f'Error: {e}')
