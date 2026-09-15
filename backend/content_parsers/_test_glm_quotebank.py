import urllib.request, json, ssl, time

ctx = ssl.create_default_context()
KEY = '93296b71324642388f2a0023c9b49305.ToP65AZkwP2OnUiZ'
BASE = 'https://open.bigmodel.cn/api/paas/v4'

# Test with the EXACT same prompt we use for quote_bank
system_prompt = """You are a master English teacher and CISCE/ISC curriculum expert specializing in English Literature.
You are creating Curated quotes per text with analysis for Class 11 students preparing for ISC/ICSE exams.

Rules:
- Base ALL content on your expert knowledge of the actual texts. Do NOT fabricate quotes.
- If unsure about a specific quote, paraphrase rather than invent.
- Content must be directly useful for ISC/ICSE exam preparation.
- Be specific and detailed — no vague generalities.
- Use the delimited text format specified in the prompt. Do NOT use JSON."""

prompt = """Create a comprehensive QUOTE BANK for "Macbeth Acts I-II" by William Shakespeare (Class 11, English Literature).

For EACH important quote in the text, provide:
- The exact quote
- Who said it (speaker)
- Context (when/where in the text)
- Literal meaning
- What it reveals about character/theme
- Themes it connects to
- Exam questions it can answer

Include 15-25 quotes covering all major characters, themes, and turning points.
Prioritize quotes that are most useful for ISC/ICSE exam answers.

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
    'model': 'glm-4-plus',
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
with urllib.request.urlopen(req, timeout=120, context=ctx) as resp:
    data = json.loads(resp.read().decode())
    elapsed = time.time() - start
    text = data.get('choices', [{}])[0].get('message', {}).get('content', '')
    usage = data.get('usage', {})
    print('Response time: %.1fs' % elapsed)
    print('Tokens in: %s, out: %s' % (usage.get('prompt_tokens'), usage.get('completion_tokens')))
    print('Content length: %d chars (%.1f KB)' % (len(text), len(text)/1024))
    print('Quotes found: %d' % text.count('<<<QUOTE>>>'))
    print()
    print('=== FIRST 2000 CHARS ===')
    print(text[:2000])
    print()
    print('=== LAST 500 CHARS ===')
    print(text[-500:])
