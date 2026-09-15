import urllib.request, json, ssl

KEYS = [
    'sk-ant-opm-qH49u7v5dZynlQC9oCWKU495ePdy_Xfd',
    'sk-ant-opm-71R9wtEucISZPpEWPa9bYvANSWu3NjX-',
]
MODELS = ['claude-fable-5', 'claude-sonnet-5', 'claude-opus-4-8', 'claude-opus-4-7']
ctx = ssl.create_default_context()

for key in KEYS:
    key_short = key[:20] + '...'
    for model in MODELS:
        url = 'https://api.opusmax.pro/v1/messages'
        body = json.dumps({
            'model': model,
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
                if 'Invalid API key' in text:
                    print(f'FAIL {key_short} @ {model} => invalid key')
                else:
                    print(f'OK   {key_short} @ {model} => {text}')
        except urllib.error.HTTPError as e:
            print(f'FAIL {key_short} @ {model} => HTTP {e.code}')
        except Exception as e:
            print(f'FAIL {key_short} @ {model} => {e}')
    print()
