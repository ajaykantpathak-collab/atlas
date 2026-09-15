import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ'
BASE = 'https://open.bigmodel.cn/api/paas/v4'

# Test with glm-4.7 (newer than 4-plus, covered by free credits)
system_prompt = "You are a master English teacher and CISCE/ISC curriculum expert. Generate accurate, exam-focused content."

prompt = """Create a QUOTE BANK for "Julius Caesar Act I" by William Shakespeare (Class 9, CISCE).

For each important quote in Act I, provide:
- Exact quote, Speaker, Context, Literal meaning, What it reveals, Themes, Exam use

Include 15 quotes. Use this format:

<<<QUOTE>>>
QUOTE: ...
SPEAKER: ...
CONTEXT: ...
LITERAL_MEANING: ...
REVEALS: ...
THEMES: ...
EXAM_USE: ...
<<<END>>>

Act I only. No JSON."""

for model in ['glm-4.7', 'glm-4-plus']:
    url = f'{BASE}/chat/completions'
    body = json.dumps({
        'model': model,
        'messages': [
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': prompt},
        ],
        'max_tokens': 6000,
        'temperature': 0.7,
    }).encode()

    req = urllib.request.Request(url, data=body, method='POST')
    req.add_header('Authorization', 'Bearer ' + KEY)
    req.add_header('Content-Type', 'application/json')

    print(f'=== {model} ===')
    start = time.time()
    try:
        with urllib.request.urlopen(req, timeout=120, context=ctx) as resp:
            data = json.loads(resp.read().decode())
            elapsed = time.time() - start
            text = data.get('choices', [{}])[0].get('message', {}).get('content', '')
            usage = data.get('usage', {})
            print('  Time: %.1fs' % elapsed)
            print('  Tokens: in=%s out=%s' % (usage.get('prompt_tokens'), usage.get('completion_tokens')))
            print('  Content: %d chars (%.1f KB)' % (len(text), len(text)/1024))
            print('  Quotes: %d' % text.count('<<<QUOTE>>>'))
            # Check accuracy - first 3 quotes
            print('  First 1500 chars:')
            print('  ' + text[:1500].replace('\n', '\n  '))
    except urllib.error.HTTPError as e:
        print('  HTTP %d: %s' % (e.code, e.read().decode()[:200]))
    except Exception as e:
        print('  ERROR: %s' % e)
    print()
