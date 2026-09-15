import urllib.request, json, ssl

KEY = 'sk-ant-opm-gCvQy5dW5Vaw09slQ6TH6ap31b30cwCl'
ctx = ssl.create_default_context()

# Test 1: models endpoint (no auth check)
url1 = 'https://api.opusmax.pro/v1/models'
req1 = urllib.request.Request(url1)
req1.add_header('x-api-key', KEY)
try:
    with urllib.request.urlopen(req1, timeout=15, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        models = [m.get('id','') for m in data.get('data', [])]
        print(f'Models endpoint OK: {len(models)} models available')
        print(f'  First 5: {models[:5]}')
except Exception as e:
    print(f'Models endpoint: {e}')

# Test 2: messages endpoint
url2 = 'https://api.opusmax.pro/v1/messages'
body = json.dumps({
    'model': 'claude-opus-5',
    'max_tokens': 20,
    'messages': [{'role': 'user', 'content': 'Say hi'}],
}).encode('utf-8')
req2 = urllib.request.Request(url2, data=body, method='POST')
req2.add_header('x-api-key', KEY)
req2.add_header('Content-Type', 'application/json')
req2.add_header('anthropic-version', '2023-06-01')
try:
    with urllib.request.urlopen(req2, timeout=30, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        text = ''
        for b in data.get('content', []):
            if b.get('type') == 'text':
                text = b.get('text', '')
                break
        print(f'\nMessages endpoint: {text[:100]}')
        if 'Invalid' in text:
            print('=> KEY IS INVALID/EXPIRED')
        elif 'Token limit' in text:
            print('=> KEY WORKS but token limit reached')
        else:
            print('=> KEY WORKS!')
except urllib.error.HTTPError as e:
    print(f'\nMessages endpoint: HTTP {e.code}: {e.read().decode()[:100]}')
except Exception as e:
    print(f'\nMessages endpoint: {e}')

# Test 3: Try with Bearer auth instead
req3 = urllib.request.Request(url2, data=body, method='POST')
req3.add_header('Authorization', f'Bearer {KEY}')
req3.add_header('Content-Type', 'application/json')
req3.add_header('anthropic-version', '2023-06-01')
try:
    with urllib.request.urlopen(req3, timeout=30, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        text = ''
        for b in data.get('content', []):
            if b.get('type') == 'text':
                text = b.get('text', '')
                break
        print(f'\nBearer auth: {text[:100]}')
except urllib.error.HTTPError as e:
    print(f'\nBearer auth: HTTP {e.code}: {e.read().decode()[:100]}')
except Exception as e:
    print(f'\nBearer auth: {e}')
