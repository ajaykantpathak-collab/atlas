import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ'
BASE = 'https://open.bigmodel.cn/api/paas/v4'

system_prompt = """You are a master English teacher and CISCE/ISC curriculum expert. You generate world-class learning content for Indian students preparing for ICSE/ISC exams.

Your content must be:
- Analytically deep (not superficial summaries)
- Exam-focused (directly useful for board exam answers)
- Textually accurate (real quotes, correct act/scene references)
- Rich in literary analysis
- If unsure about an exact quote, paraphrase rather than invent"""

prompt = """Create a comprehensive QUOTE BANK for "Julius Caesar Act I" by William Shakespeare (Class 9, CISCE English Literature).

For EACH important quote in Act I, provide:
- The exact quote
- Speaker
- Context (act, scene, situation)
- Literal meaning
- What it reveals about character/theme
- Themes it connects to
- Exam questions it answers

Include 15-20 quotes covering all major characters and key moments in Act I ONLY.

Use this delimited format:

<<<QUOTE>>>
QUOTE: (the exact quote)
SPEAKER: (who said it)
CONTEXT: (when/where)
LITERAL_MEANING: (what it means literally)
REVEALS: (what it reveals about character/theme)
THEMES: (comma-separated themes)
EXAM_USE: (which exam questions this quote answers)
<<<END>>>

Write ALL quotes in this format. No JSON."""

url = f'{BASE}/chat/completions'
body = json.dumps({
    'model': 'glm-5.3-flash',
    'messages': [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': prompt},
    ],
    'max_tokens': 8000,
    'temperature': 0.7,
}).encode()

req = urllib.request.Request(url, data=body, method='POST')
req.add_header('Authorization', 'Bearer ' + KEY)
req.add_header('Content-Type', 'application/json')

start = time.time()
with urllib.request.urlopen(req, timeout=180, context=ctx) as resp:
    data = json.loads(resp.read().decode())
    elapsed = time.time() - start
    text = data.get('choices', [{}])[0].get('message', {}).get('content', '')
    usage = data.get('usage', {})
    print('Model: glm-5.3-flash')
    print('Time: %.1fs' % elapsed)
    print('Tokens: in=%s out=%s' % (usage.get('prompt_tokens'), usage.get('completion_tokens')))
    print('Content: %d chars (%.1f KB)' % (len(text), len(text)/1024))
    print('Quotes: %d' % text.count('<<<QUOTE>>>'))
    print()
    print('=== FULL OUTPUT ===')
    print(text)
