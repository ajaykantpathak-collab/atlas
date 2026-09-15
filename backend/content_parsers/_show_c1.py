import json

with open(r"D:\platform\parsed_output\topic_node_mappings.json", encoding="utf-8-sig") as f:
    data = json.load(f)
mappings = data.get("mappings", data)

# Show Class 1 mappings
for key in sorted(mappings.keys()):
    if key.startswith("1_"):
        m = mappings[key]
        topics = m.get("topics", [])
        total_nodes = sum(len(t.get("nodes", [])) for t in topics)
        print(f"\n=== {key} ({total_nodes} nodes) ===")
        for t in topics:
            nodes = t.get("nodes", [])
            tname = t.get("topic_name", "?")
            tnum = t.get("topic_num", "?")
            print(f"  Topic {tnum}: {tname} ({len(nodes)} nodes)")
            for n in nodes:
                print(f"    {n}")
