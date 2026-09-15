import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = 'sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK'
URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'

body = json.dumps({
    'model': MODEL,
    'max_tokens': 2000,
    'messages': [{'role': 'user', 'content': 'Write a 200-word analysis of Macbeth as a tragic hero with 2 key quotes.'}],
}).encode()

req = urllib.request.Request(URL, data=body, method='POST')
req.add_header('x-api-key', KEY)
req.add_header('Content-Type', 'application/json')
req.add_header('anthropic-version', '2023-06-01')

start = time.time()
with urllib.request.urlopen(req, timeout=120, context=ctx) as resp:
    data = json.loads(resp.read().decode())
    elapsed = time.time() - start
    text = ''
    for block in data.get('content', []):
        if block.get('type') == 'text':
            text = block.get('text', '')
            break
    usage = data.get('usage', {})
    print('Time: %.1fs' % elapsed)
    print('Tokens in: %s, out: %s' % (usage.get('input_tokens'), usage.get('output_tokens')))
    print('Content (%d chars):' % len(text))
    print(text[:500])
