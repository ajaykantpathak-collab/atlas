import urllib.request, json, ssl, time

API_KEY = 'sk-ant-opm-gCvQy5dW5Vaw09slQ6TH6ap31b30cwCl'
url = 'https://api.opusmax.pro/v1/messages'
ctx = ssl.create_default_context()

# Test opus-5
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
