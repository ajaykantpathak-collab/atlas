import json
from pathlib import Path
from collections import Counter

soc_nodes = []
for f in Path(r'D:\platform\cbse_coverage_output').glob('*_result.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        for chunk in data.get('results', []):
            for node in chunk.get('nodes', []):
                subj = node.get('subject', '')
                if subj in ('sociology', 'soc'):
                    soc_nodes.append(node)
    except: pass

print('Sociology nodes total:', len(soc_nodes))
classes = Counter(n.get('class', '?') for n in soc_nodes)
print('By class:', dict(classes))
print('Sample node IDs:')
for n in soc_nodes[:10]:
    nid = n.get('node_id', '')
    cls = n.get('class', '')
    subj = n.get('subject', '')
    print('  ' + nid + ' class=' + str(cls) + ' subject=' + str(subj))
