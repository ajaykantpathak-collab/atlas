"""Audit Neo4j mapping - nodes per subject per class."""
import json, urllib.request

def get_json(url):
    try:
        r = urllib.request.urlopen(url, timeout=10)
        return json.loads(r.read())
    except Exception as e:
        return {"error": str(e)}

# Get all subjects
subjects = get_json("http://localhost:8000/api/content/subjects")
if isinstance(subjects, list):
    print(f"Total subjects: {len(subjects)}")
    print()
    print(f"{'Subject':<30} {'Chapters':<10} {'Classes'}")
    print("-" * 70)
    for s in subjects:
        slug = s.get("slug", "?")
        name = s.get("name", "?")
        chapters = s.get("chapter_count", 0)
        classes = s.get("class_levels", [])
        if classes:
            classes_str = ",".join(str(c) for c in classes)
        else:
            classes_str = "none"
        print(f"{name:<30} {chapters:<10} {classes_str}")
else:
    print("Failed to get subjects:", subjects)

print()
print("=== Nodes per subject per class ===")
print()

# Check nodes for each subject/class combination
subject_slugs = [s["slug"] for s in subjects] if isinstance(subjects, list) else []
for slug in subject_slugs:
    total = 0
    class_counts = {}
    for cls in range(1, 13):
        data = get_json(f"http://localhost:8000/api/content/nodes/{cls}/{slug}")
        if isinstance(data, list):
            count = len(data)
            if count > 0:
                class_counts[cls] = count
                total += count
        elif isinstance(data, dict) and "nodes" in data:
            count = len(data["nodes"])
            if count > 0:
                class_counts[cls] = count
                total += count

    if class_counts:
        counts_str = "  ".join(f"C{k}:{v}" for k, v in sorted(class_counts.items()))
        print(f"{slug:<30} total={total:<5} {counts_str}")
    else:
        print(f"{slug:<30} total=0    NO NODES")
