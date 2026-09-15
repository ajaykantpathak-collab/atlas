import json, os

d = r'D:\node_generator\atomic_graph\cisce_enriched'
files = sorted([f for f in os.listdir(d) if f.endswith('.json')])

total_nodes = 0
total_edges = 0
edges_with_reason = 0
edges_empty_reason = 0
edges_templated = 0

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

for f in files:
    data = json.load(open(os.path.join(d, f), encoding='utf-8'))
    if not isinstance(data, list):
        continue
    for node in data:
        total_nodes += 1
        prereqs = node.get('prerequisite_node_ids', [])
        reasons = node.get('prerequisite_reasons', {})
        if not isinstance(reasons, dict):
            reasons = {}
        for pid in prereqs:
            total_edges += 1
            reason = reasons.get(pid, '')
            if not reason:
                edges_empty_reason += 1
            elif any(bp in reason.lower() for bp in BAD_PATTERNS):
                edges_templated += 1
            else:
                edges_with_reason += 1

print('Total nodes: %d' % total_nodes)
print('Total edges: %d' % total_edges)
print('Edges with good reason: %d (%.1f%%)' % (edges_with_reason, 100*edges_with_reason/max(total_edges,1)))
print('Edges with templated reason: %d (%.1f%%)' % (edges_templated, 100*edges_templated/max(total_edges,1)))
print('Edges with empty reason: %d (%.1f%%)' % (edges_empty_reason, 100*edges_empty_reason/max(total_edges,1)))
