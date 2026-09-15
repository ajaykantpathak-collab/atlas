import re, json
from pathlib import Path
from collections import defaultdict

valid_ids = set()
for f in Path(r'D:\platform\cbse_coverage_output').glob('*_result.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        for chunk in data.get('results', []):
            for node in chunk.get('nodes', []):
                nid = node.get('node_id', '')
                if nid: valid_ids.add(nid)
    except: pass

REF_PATTERN = re.compile(r'(c\d+_[a-z]+_(?:cbse|cisce)[\w]*)')
bad_files = defaultdict(set)

for f in sorted(Path(r'D:\platform\cbse_data\prereqs').glob('*.md')):
    if f.stat().st_size < 500: continue
    content = f.read_text(encoding='utf-8')
    if 'Token limit' in content[:200]: continue
    refs = REF_PATTERN.findall(content)
    for r in set(refs):
        if r not in valid_ids:
            bad_files[f.name].add(r)

print('Files with invalid refs: ' + str(len(bad_files)))
for fname in sorted(bad_files.keys()):
    refs = sorted(bad_files[fname])
    suffix = ' ...' if len(refs) > 5 else ''
    print('  ' + fname + ': ' + str(len(refs)) + ' invalid -> ' + str(refs[:5]) + suffix)
