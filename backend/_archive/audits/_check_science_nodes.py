import json
from pathlib import Path
from collections import Counter

science_nodes = []
for f in Path(r'D:\platform\cbse_coverage_output').glob('*_result.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        for chunk in data.get('results', []):
            for node in chunk.get('nodes', []):
                subj = node.get('subject', '')
                if subj == 'science':
                    science_nodes.append(node)
    except: pass

print('Science nodes total:', len(science_nodes))
# Check what node_id prefixes are in science
prefixes = Counter()
for n in science_nodes:
    nid = n.get('node_id', '')
    if nid:
        parts = nid.split('_')
        if len(parts) >= 2:
            prefixes[parts[1]] += 1

print('Subject abbreviations in node_ids for science nodes:')
for p, c in prefixes.most_common():
    print('  ' + p + ': ' + str(c))

print()
print('Sample science nodes:')
for n in science_nodes[:10]:
    nid = n.get('node_id', '')
    topic = n.get('topic', '')[:50]
    chapter = n.get('chapter', '')[:40]
    print('  ' + nid + ' | ' + topic + ' | ' + chapter)
