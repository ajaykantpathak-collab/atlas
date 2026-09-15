import json
from pathlib import Path

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# Find applied_maths and legal nodes and check their class_level type
for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            subj = node.get("subject", "")
            if "applied" in subj.lower() or "legal" in subj.lower() or "amath" in node.get("node_id", "").lower():
                cls = node.get("class_level")
                print(f"  {node['node_id']:30s} subj={subj:20s} class_level={cls!r:10s} type={type(cls).__name__}")
                break
        else:
            continue
        break
