import json
from pathlib import Path

# Check a few chapters for node granularity
chapters_to_check = ["lebo101", "lebo102", "leac102", "leph101", "lech101"]

for ch_file in chapters_to_check:
    f = Path(rf"D:\platform\cbse_coverage_output\{ch_file}_result.json")
    if not f.exists():
        continue
    data = json.loads(f.read_text(encoding="utf-8"))
    print(f"=== {data['chapter']} ({data['subject']}) ===")
    for chunk in data["results"]:
        if "_error" in chunk:
            continue
        nodes = chunk.get("missing") or chunk.get("nodes") or []
        print(f"  Nodes: {len(nodes)}")
        for n in nodes:
            print(f"    {n['node_id']}: {n['topic'][:60]}")
    print()
