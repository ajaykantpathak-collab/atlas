"""
Key tester — checks both keys, finds which one works, and reports token limit reset times.
"""
import urllib.request, json, ssl, re, time

KEYS = [
    ('sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK', 'https://api.claudeopus.pro/v1/messages', 'claudeopus'),
    ('sk-ant-opm-gCvQy5dW5Vaw09slQ6TH6ap31b30cwCl', 'https://api.opusmax.pro/v1/messages', 'opusmax'),
]
ctx = ssl.create_default_context()

for key, url, label in KEYS:
    key_short = key[:20] + '...'
    body = json.dumps({
        'model': 'claude-opus-5',
        'max_tokens': 50,
        'messages': [{'role': 'user', 'content': 'Say hi in one word'}],
    }).encode('utf-8')
    req = urllib.request.Request(url, data=body, method='POST')
    req.add_header('x-api-key', key)
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')
    try:
        with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            text = ''
            for b in data.get('content', []):
                if b.get('type') == 'text':
                    text = b.get('text', '')
                    break
            if 'Invalid API key' in text:
                print(f'{label}: {key_short} => INVALID KEY')
            elif 'Token limit' in text or 'Rate limit' in text:
                # Extract reset time
                m = re.search(r'reset in (\d+h?\s*\d*m)', text)
                reset = m.group(1) if m else 'unknown'
                print(f'{label}: {key_short} => LIMIT REACHED, resets in {reset}')
                print(f'  Full message: {text[:200]}')
            else:
                print(f'{label}: {key_short} => WORKING! Response: {text[:50]}')
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:200]
        print(f'{label}: {key_short} => HTTP {e.code}: {body}')
    except Exception as e:
        print(f'{label}: {key_short} => ERROR: {e}')
