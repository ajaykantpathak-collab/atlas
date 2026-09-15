import json, re, glob, os

nodes_dir = r'D:\platform\cbse_data\nodes\by_subject'
chem_nodes = []
sci_chem = []

for f in sorted(glob.glob(os.path.join(nodes_dir, '*.json'))):
    with open(f, 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    for n in data:
        subj = n.get('subject', '').lower()
        cls = n.get('class_level', 0)
        if not isinstance(cls, int) or cls < 6 or cls > 12:
            continue
        if 'chem' in subj:
            chem_nodes.append(n)
        elif 'sci' in subj:
            topic = n.get('topic', '').lower()
            if re.search(r'chem|acid|base|salt|reaction|atom|molecul|periodic|bond|organic|metal|element|compound|mixture|solution|catalyst|oxid|reduc|electroly', topic):
                sci_chem.append(n)

print(f'Chemistry nodes: {len(chem_nodes)}')
by_class = {}
for n in chem_nodes:
    c = n['class_level']
    by_class.setdefault(c, []).append(n)
for c in sorted(by_class):
    print(f'  C{c}: {len(by_class[c])} nodes')

print(f'\nScience-chem nodes: {len(sci_chem)}')
by_class2 = {}
for n in sci_chem:
    c = n['class_level']
    by_class2.setdefault(c, []).append(n)
for c in sorted(by_class2):
    print(f'  C{c}: {len(by_class2[c])} nodes')
    for n in by_class2[c][:3]:
        nid = n['node_id']
        topic = n['topic']
        print(f'    {nid}: {topic}')

total = len(chem_nodes) + len(sci_chem)
print(f'\nTotal: {total} nodes')
print(f'Estimated sims (8 nodes/sim): {-(-total // 8)}')
