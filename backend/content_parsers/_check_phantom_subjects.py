"""Check what topic mappings and nodes exist for the 6 phantom subjects."""
import json

PHANTOMS = ['home', 'legal', 'massmedia', 'pol', 'psy', 'soc']

for cls in [11, 12]:
    path = rf'D:\platform\parsed_output\class{cls}_topic_mapping.json'
    d = json.load(open(path, encoding='utf-8'))
    for subj in PHANTOMS:
        key = f'{cls}_{subj}'
        if key not in d:
            print(f"{key}: NOT IN TOPIC MAPPING")
            continue
        entry = d[key]
        topics = entry.get('topics', [])
        total_nodes = sum(len(t.get('nodes', [])) for t in topics)
        print(f"\n{'='*70}")
        print(f"{key}: {len(topics)} topics, {total_nodes} nodes")
        print(f"{'='*70}")
        for t in topics:
            tnum = t.get('topic_num')
            tname = t.get('topic_name', '???')
            nodes = t.get('nodes', [])
            print(f"  Topic {tnum}: {tname} ({len(nodes)} nodes)")
            for n in nodes[:3]:
                print(f"    {n}")
            if len(nodes) > 3:
                print(f"    ... +{len(nodes)-3} more")
