import json

d = json.load(open(r'D:\platform\parsed_output\class12_topic_mapping.json'))
c = d['12_comm']
print("Class 12 Commerce topics:")
for k, v in c.items():
    if isinstance(v, dict):
        name = v.get('name', v.get('title', '???'))
        nodes = v.get('nodes', v.get('node_ids', []))
        print(f"  Topic {k}: {name} ({len(nodes)} nodes)")
    else:
        print(f"  Topic {k}: {v}")
