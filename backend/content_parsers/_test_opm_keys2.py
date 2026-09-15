import urllib.request, json, ssl

KEYS = [
    'sk-ant-opm-qH49u7v5dZynlQC9oCWKU495ePdy_Xfd',
    'sk-ant-opm-71R9wtEucISZPpEWPa9bYvANSWu3NjX-',
]
ctx = ssl.create_default_context()

for key in KEYS:
    key_short = key[:20] + '...'
    url = 'https://api.anthropic.com/v1/messages'
    body = json.dumps({
        'model': 'claude-3-5-sonnet-20241022',
        'max_tokens': 50,
        'messages': [{'role': 'user', 'content': 'Say hi'}],
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
                    text = b.get('text', '')[:50]
                    break
            print(f'OK   {key_short} @ anthropic => {text}')
    except urllib.error.HTTPError as e:
        print(f'FAIL {key_short} @ anthropic => HTTP {e.code}: {e.read().decode()[:80]}')
    except Exception as e:
        print(f'FAIL {key_short} @ anthropic => {e}')
