import json

# Check Class 10 geo mapping
with open(r"D:\platform\parsed_output\class10_topic_mapping.json", encoding="utf-8-sig") as f:
    data = json.load(f)

geo = data.get("10_geo", {})
print("=== Class 10 Geo mapping ===")
for t in geo.get("topics", []):
    tnum = t["topic_num"]
    tname = t["topic_name"]
    nodes = t["nodes"]
    print(f"  Topic {tnum}: {tname} ({len(nodes)} nodes)")
    for n in nodes:
        print(f"    {n}")

# Now check actual geo nodes
print("\n=== Actual Class 10 geo enrichment nodes ===")
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        if r.get("class_level") == 10 and r.get("subject") == "geo":
            print(f"  {r['node_id']}: {r['title']}")
