import os
import json, urllib.request, ssl, datetime

API_URL = 'https://api.claudeopus.pro/v1/messages'
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

body = json.dumps({'model': 'claude-opus-5', 'max_tokens': 50, 'messages': [{'role': 'user', 'content': 'hi'}]}).encode('utf-8')

keys = [
    ('KEY 0', os.environ.get('ANTHROPIC_API_KEY') or ''),
    ('KEY 1', os.environ.get('ANTHROPIC_API_KEY') or ''),
]

for name, key in keys:
    print(f'\n=== {name} ===')
    req = urllib.request.Request(API_URL, data=body, method='POST')
    req.add_header('x-api-key', key)
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            text = ''
            for block in data.get('content', []):
                if block['type'] == 'text':
                    text = block['text']
                    break
            if 'token limit' in text.lower() or 'rate limit' in text.lower():
                print(f'  RATE LIMITED')
                print(f'  Message: {text[:400]}')
            else:
                print(f'  LIVE! Response: {text[:100]}')
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        print(f'  HTTP {e.code}')
        try:
            err_data = json.loads(err_body)
            err_text = ''
            for block in err_data.get('content', []):
                if block.get('type') == 'text':
                    err_text = block['text']
                    break
            if err_text:
                print(f'  Message: {err_text[:400]}')
            else:
                print(f'  Body: {err_body[:400]}')
        except:
            print(f'  Body: {err_body[:400]}')
    except Exception as e:
        print(f'  Error: {str(e)[:400]}')

print(f'\nTime: {datetime.datetime.now().strftime("%H:%M:%S")}')
