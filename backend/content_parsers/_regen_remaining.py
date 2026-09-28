import os
"""Regenerate the remaining old/tiny supporting files for the 4 poets."""
import json, time, urllib.request, ssl, re, os
from pathlib import Path

API_KEY = os.environ.get('ANTHROPIC_API_KEY') or ''
API_URL = 'https://api.claudeopus.pro/v1/messages'
MODEL = 'claude-opus-5'
MAX_TOKENS = 128000
SUPPORT_DIR = Path(r'D:\platform\parsed_output\english_supporting_files\engelec')

# Load poem texts from the regen script
import importlib.util
spec = importlib.util.spec_from_file_location('regen', r'D:\platform\backend\content_parsers\_regen_verified.py')
regen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(regen)
POEM_TEXTS = regen.POEM_TEXTS

# Files that need regeneration (OLD or tiny)
NEED_FIX = {
    'c12_engelec_poet_01': ['character_maps', 'theme_trackers', 'literary_devices', 'model_answers', 'revision_sheets'],
    'c12_engelec_poet_03': ['character_maps', 'theme_trackers', 'literary_devices', 'model_answers', 'revision_sheets'],
    'c12_engelec_poet_07': ['character_maps', 'theme_trackers', 'literary_devices', 'model_answers', 'revision_sheets'],
    'c12_engelec_poet_10': ['theme_trackers', 'model_answers', 'quote_bank', 'character_maps', 'drill_banks'],
}

def call_claude(prompt, system_prompt=None):
    body = {'model': MODEL, 'max_tokens': MAX_TOKENS, 'messages': [{'role': 'user', 'content': prompt}]}
    if system_prompt: body['system'] = system_prompt
    payload = json.dumps(body).encode()
    req = urllib.request.Request(API_URL, data=payload)
    req.add_header('x-api-key', API_KEY)
    req.add_header('Content-Type', 'application/json')
    req.add_header('anthropic-version', '2023-06-01')
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, timeout=300, context=ctx)
            data = json.loads(resp.read())
            for block in data['content']:
                if block['type'] == 'text':
                    return block['text']
            return ''
        except Exception as e:
            print('  Attempt %d failed: %s' % (attempt+1, str(e)[:100]), flush=True)
            time.sleep(3)
    return None

TYPE_DESC = {
    'quote_bank': 'a comprehensive QUOTE BANK with exact quotations from the poems, each with speaker, context, and significance',
    'character_maps': 'CHARACTER MAPS describing the speakers/personas in each poem and their relationships',
    'theme_trackers': 'THEME TRACKERS identifying and tracking major themes across all the poems with evidence',
    'literary_devices': 'LITERARY DEVICES analysis identifying all literary devices used with exact quotes as evidence',
    'model_answers': 'MODEL ANSWERS — 3-5 exam-style essay answers (300-500 words each) addressing common ISC questions about these poems',
    'revision_sheets': 'REVISION SHEETS — concise 1-2 page summaries of each poem for quick revision',
    'glossary': 'GLOSSARY — definitions of all difficult/archaic words and literary terms used in the poems',
    'worked_examples': 'WORKED EXAMPLES — step-by-step analysis of 3-5 key passages with exact quotes',
    'question_bank': 'QUESTION BANK — 20-30 exam-style questions (short and long answer) with model answers',
    'drill_banks': 'DRILL BANKS — 15-20 quick-fire questions for practice with brief answers'
}

total = sum(len(v) for v in NEED_FIX.values())
done = 0
for node_id, file_types in NEED_FIX.items():
    info = POEM_TEXTS[node_id]
    poems_text = ""
    for title, text in info['poems'].items():
        poems_text += '\n\n=== "%s" ===\n%s\n' % (title, text)

    for ft in file_types:
        done += 1
        out_file = SUPPORT_DIR / ('%s_%s.txt' % (node_id, ft))
        print('[%d/%d] %s %s' % (done, total, node_id, ft), end=' ', flush=True)

        system = """You are a master English teacher and CISCE/ISC curriculum expert.
Create {desc} for the prescribed poems below.

CRITICAL RULES:
- The ACTUAL FULL TEXTS of all prescribed poems are provided. Use ONLY these texts.
- ALL quotations MUST be copied EXACTLY from the provided poem texts.
- Do NOT quote from any poem not in the provided list.
- Do NOT invent quotations, lines, or textual details.
- Output should be plain text with clear section headers. No JSON.

OUTPUT FORMAT:
Use <<<ITEM>>> delimiters for each entry, with labeled fields as appropriate.
End each item with <<<END>>>.""".format(desc=TYPE_DESC.get(ft, ft))

        prompt = """Create {desc} for these prescribed poems by {author}:

PRESCRIBED POEMS: {poem_list}

FULL TEXTS (use ONLY these for all quotations):
{poems_text}

Create {desc}. All quotes must be copied EXACTLY from the texts above.
Use the <<<ITEM>>> delimited format. Do NOT use JSON.""".format(
            desc=TYPE_DESC.get(ft, ft),
            author=info['author'],
            poem_list=', '.join(info['poems'].keys()),
            poems_text=poems_text
        )

        response = call_claude(prompt, system)
        if not response:
            print('FAILED')
            continue
        out_file.write_text(response, encoding='utf-8')
        kb = out_file.stat().st_size / 1024
        print('DONE (%.1fKB)' % kb, flush=True)

print('\nALL DONE')
