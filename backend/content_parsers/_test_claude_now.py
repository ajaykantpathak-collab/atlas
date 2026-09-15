import urllib.request, json, re

API_URL = 'https://api.claudeopus.pro/v1/messages'
src = open(r'D:\platform\backend\content_parsers\claude_english_supporting.py', 'r').read()
m = re.search(r"API_KEY\s*=\s*['\"]([^'\"]+)", src)
key = m.group(1)

payload = json.dumps({
    'model': 'claude-opus-5',
    'max_tokens': 100,
    'messages': [{'role': 'user', 'content': 'Say hello'}]
}).encode()

req = urllib.request.Request(API_URL, data=payload)
req.add_header('x-api-key', key)
req.add_header('Content-Type', 'application/json')
req.add_header('anthropic-version', '2023-06-01')

try:
    resp = urllib.request.urlopen(req, timeout=30)
    data = json.loads(resp.read())
    print('RESPONSE:', json.dumps(data)[:500])
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print('ERROR %d: %s' % (e.code, body[:300]))
