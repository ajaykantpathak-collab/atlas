import json
from pathlib import Path

# Check what subjects exist for class 10
class10 = {}
for f in Path(r'D:\platform\cbse_coverage_output').glob('*_result.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        for chunk in data.get('results', []):
            for node in chunk.get('nodes', []):
                nid = node.get('node_id', '')
                if nid.startswith('c10_'):
                    subj = node.get('subject', '')
                    if subj not in class10:
                        class10[subj] = []
                    class10[subj].append(nid)
    except: pass

print('Class 10 subjects:')
for subj in sorted(class10.keys()):
    nodes = class10[subj]
    print('  ' + subj + ': ' + str(len(nodes)) + ' nodes')
    # Show first 3 node IDs
    for nid in nodes[:3]:
        print('    ' + nid)
