import urllib.request, json, ssl, time

API_KEY = 'sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK'
ctx = ssl.create_default_context()

# Try multiple endpoints and auth methods
tests = [
    # 1. Anthropic direct with x-api-key
    ('https://api.anthropic.com/v1/messages', 'x-api-key', 'claude-opus-4-20250514'),
    # 2. Anthropic direct with Bearer
    ('https://api.anthropic.com/v1/messages', 'bearer', 'claude-opus-4-20250514'),
    # 3. OpusMax with Bearer
    ('https://api.opusmax.pro/v1/messages', 'bearer', 'claude-opus-5'),
    # 4. OpusMax with x-api-key (already tried but retry)
    ('https://api.opusmax.pro/v1/messages', 'x-api-key', 'claude-opus-5'),
    # 5. Anthropic with newer model
    ('https://api.anthropic.com/v1/messages', 'x-api-key', 'claude-3-5-sonnet-20241022'),
    # 6. Anthropic with Bearer and newer model
    ('https://api.anthropic.com/v1/messages', 'bearer', 'claude-3-5-sonnet-20241022'),
]

for url, auth_method, model in tests:
    body = json.dumps({
        'model': model,
        'max_tokens': 50,
        'messages': [{'role': 'user', 'content': 'Say hi'}],
    }).encode('utf-8')

    req = urllib.request.Request(url, data=body, method='POST')
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')

    if auth_method == 'x-api-key':
        req.add_header('x-api-key', API_KEY)
    elif auth_method == 'bearer':
        req.add_header('Authorization', f'Bearer {API_KEY}')

    label = f'{url.split("/")[2]} | {auth_method} | {model}'
    try:
        with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            text = ''
            for b in data.get('content', []):
                if b.get('type') == 'text':
                    text = b.get('text', '')[:50]
                    break
            print(f'OK   {label} => {text}')
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')[:100]
        print(f'FAIL {label} => HTTP {e.code}: {err_body}')
    except Exception as e:
        print(f'FAIL {label} => {e}')
