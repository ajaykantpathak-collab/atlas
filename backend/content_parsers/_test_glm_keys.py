import urllib.request, json, ssl

KEYS = [
    '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ',
    '648de7f2f42d4554bbc9bb7cada9d645.Ncm0xTGQ0YW8LeqN',
]

ctx = ssl.create_default_context()
BASE = 'https://open.bigmodel.cn/api/paas/v4'

for key in KEYS:
    key_short = key[:20] + '...'
    print(f'=== {key_short} ===')

    # Test 1: chat completions with glm-4
    for model in ['glm-4', 'glm-4-plus', 'glm-4-flash', 'glm-4v', 'glm-4-air']:
        url = f'{BASE}/chat/completions'
        body = json.dumps({
            'model': model,
            'messages': [{'role': 'user', 'content': 'Say hi in one word'}],
            'max_tokens': 20,
        }).encode()
        req = urllib.request.Request(url, data=body, method='POST')
        req.add_header('Authorization', f'Bearer {key}')
        req.add_header('Content-Type', 'application/json')
        try:
            with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
                data = json.loads(resp.read().decode())
                text = data.get('choices', [{}])[0].get('message', {}).get('content', '')[:80]
                print(f'  {model}: OK -> {text}')
        except urllib.error.HTTPError as e:
            err = e.read().decode()[:100]
            print(f'  {model}: HTTP {e.code} -> {err}')
        except Exception as e:
            print(f'  {model}: {e}')
    print()
