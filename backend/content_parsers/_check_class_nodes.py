"""Check available nodes per class level from Qdrant."""
import requests, json

classes = {}
for coll in ["cisce_nodes_v2"]:
    # Scroll through all points
    offset = None
    while True:
        body = {"limit": 100, "with_payload": True, "with_vector": False}
        if offset:
            body["offset"] = offset
        r = requests.post(
            f"http://localhost:6333/collections/{coll}/points/scroll",
            json=body,
        )
        data = r.json()["result"]
        points = data["points"]
        if not points:
            break
        for p in points:
            payload = p.get("payload", {})
            cls = payload.get("class_level", 0)
            subject = payload.get("subject", "unknown")
            node_id = payload.get("node_id", "")
            title = payload.get("title", "")
            if cls not in classes:
                classes[cls] = {}
            if subject not in classes[cls]:
                classes[cls][subject] = []
            classes[cls][subject].append({"node_id": node_id, "title": title})
        offset = data.get("next_offset")
        if not offset:
            break

print("Available nodes per class:")
for cls in sorted(classes.keys()):
    subjects = classes[cls]
    total = sum(len(v) for v in subjects.values())
    subj_list = ", ".join(f"{k}:{len(v)}" for k, v in sorted(subjects.items()))
    print(f"  Class {cls:2d}: {total:4d} nodes | {subj_list}")

# Save for the test script
with open(r"D:\platform\backend\content_parsers\_class_nodes.json", "w") as f:
    json.dump(classes, f, indent=2)
print("\nSaved to _class_nodes.json")
