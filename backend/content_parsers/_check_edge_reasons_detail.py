import json, os

d = r'D:\node_generator\atomic_graph\cisce_enriched'
files = sorted([f for f in os.listdir(d) if f.endswith('.json')])

BAD_PATTERNS = [
    'provides the foundation for',
    'is essential for',
    'must understand',
    'is needed before',
    'is prerequisite',
    'curriculum-sequencing link',
    'is a prerequisite for',
    'is required for',
]

# Per-subject breakdown
subj_stats = {}

for f in files:
    data = json.load(open(os.path.join(d, f), encoding='utf-8'))
    if not isinstance(data, list):
        continue
    subj = f.replace('_graph.json', '')
    stats = subj_stats.setdefault(subj, {'nodes': 0, 'edges': 0, 'good': 0, 'templated': 0, 'empty': 0})
    for node in data:
        stats['nodes'] += 1
        prereqs = node.get('prerequisite_node_ids', [])
        reasons = node.get('prerequisite_reasons', {})
        if not isinstance(reasons, dict):
            reasons = {}
        for pid in prereqs:
            stats['edges'] += 1
            reason = reasons.get(pid, '')
            if not reason:
                stats['empty'] += 1
            elif any(bp in reason.lower() for bp in BAD_PATTERNS):
                stats['templated'] += 1
            else:
                stats['good'] += 1

print('%-30s %6s %6s %8s %8s %8s' % ('Subject', 'Nodes', 'Edges', 'Good', 'Templ', 'Empty'))
print('-' * 75)
for subj in sorted(subj_stats.keys()):
    s = subj_stats[subj]
    pct = 100 * s['good'] / max(s['edges'], 1)
    print('%-30s %6d %6d %8d %8d %8d  (%.0f%% good)' % (
        subj, s['nodes'], s['edges'], s['good'], s['templated'], s['empty'], pct
    ))
