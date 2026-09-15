"""Extract CBSE + CISCE maths nodes for pilot test."""
import json
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
NODE_INDEX = Path(r"D:\platform\content\index\node_index.json")

# Load CISCE maths nodes
cisce_data = json.loads(NODE_INDEX.read_text(encoding="utf-8"))
cisce_maths = []
for item in cisce_data:
    if item.get("subject") == "maths" and isinstance(item.get("class"), int) and item["class"] >= 6:
        cisce_maths.append({
            "node_id": item.get("node_id", ""),
            "title": item.get("title", ""),
            "class": item.get("class", "?"),
            "section": item.get("section", ""),
            "syllabus": item.get("syllabus", "")[:300],  # truncate for token budget
        })

# Load CBSE maths nodes (minimal fields)
cbse_maths = []
for result_file in OUTPUT_DIR.glob("*_result.json"):
    if result_file.stat().st_size < 500:
        continue
    try:
        data = json.loads(result_file.read_text(encoding="utf-8"))
        if data.get("subject") != "maths":
            continue
        grade = data.get("grade", "?")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                topic = node.get("topic", "")
                node_id = node.get("node_id", "")
                if topic:
                    cbse_maths.append({
                        "node_id": node_id,
                        "topic": topic,
                        "class_level": node.get("class_level", grade),
                    })
    except:
        pass

print(f"CISCE maths (class 6-12): {len(cisce_maths)} nodes")
print(f"CBSE maths (all classes): {len(cbse_maths)} nodes")

# Save for the prompt builder
out = Path(r"D:\platform\backend\_pilot_maths_data.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump({"cbse": cbse_maths, "cisce": cisce_maths}, f, indent=2, ensure_ascii=False)
print(f"Saved to {out} ({out.stat().st_size//1024}KB)")

# Show samples
print("\n=== CBSE sample (first 5) ===")
for n in cbse_maths[:5]:
    print(f"  {n['node_id']} (class {n['class_level']}): {n['topic']}")

print("\n=== CISCE sample (first 5) ===")
for n in cisce_maths[:5]:
    print(f"  {n['node_id']} (class {n['class']}): {n['title']}")
    print(f"    syllabus: {n['syllabus'][:100]}...")
