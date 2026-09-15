import urllib.request, json, ssl

KEYS = [
    'sk-ant-opm-qH49u7v5dZynlQC9oCWKU495ePdy_Xfd',
    'sk-ant-opm-71R9wtEucISZPpEWPa9bYvANSWu3NjX-',
]
ctx = ssl.create_default_context()

# First check what models are available
for key in KEYS:
    key_short = key[:20] + '...'
    url = 'https://api.opusmax.pro/v1/models'
    req = urllib.request.Request(url)
    req.add_header('x-api-key', key)
    req.add_header('anthropic-version', '2023-06-01')
    try:
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            models = [m.get('id','') for m in data.get('data', [])][:10]
            print(f'{key_short} models: {models}')
    except urllib.error.HTTPError as e:
        print(f'{key_short} models: HTTP {e.code}: {e.read().decode()[:100]}')
    except Exception as e:
        print(f'{key_short} models: {e}')

    # Try with Bearer auth
    url2 = 'https://api.opusmax.pro/v1/messages'
    body = json.dumps({
        'model': 'claude-opus-5',
        'max_tokens': 50,
        'messages': [{'role': 'user', 'content': 'Say hi'}],
    }).encode('utf-8')
    req2 = urllib.request.Request(url2, data=body, method='POST')
    req2.add_header('Authorization', f'Bearer {key}')
    req2.add_header('Content-Type', 'application/json')
    req2.add_header('anthropic-version', '2023-06-01')
    try:
        with urllib.request.urlopen(req2, timeout=30, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            text = ''
            for b in data.get('content', []):
                if b.get('type') == 'text':
                    text = b.get('text', '')[:50]
                    break
            print(f'  Bearer auth: OK => {text}')
    except urllib.error.HTTPError as e:
        print(f'  Bearer auth: HTTP {e.code}: {e.read().decode()[:100]}')
    except Exception as e:
        print(f'  Bearer auth: {e}')
    print()
