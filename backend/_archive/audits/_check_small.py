import json
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

# Check a few small files
small_files = sorted(OUTPUT_DIR.glob("*_result.json"), key=lambda f: f.stat().st_size)[:5]
for f in small_files:
    size = f.stat().st_size
    data = json.loads(f.read_text(encoding="utf-8"))
    print(f"=== {f.name} ({size} bytes) ===")
    print(f"  keys: {list(data.keys())}")
    if "nodes" in data:
        print(f"  nodes: {len(data['nodes'])}")
    if "questions" in data:
        print(f"  questions: {len(data['questions'])}")
    if "error" in data:
        print(f"  error: {str(data['error'])[:100]}")
    if "status" in data:
        print(f"  status: {data['status']}")
    content = f.read_text(encoding="utf-8")
    print(f"  content: {content[:250]}")
    print()

# Also check a sample of OK files for comparison
ok_files = sorted(OUTPUT_DIR.glob("*_result.json"), key=lambda f: f.stat().st_size, reverse=True)[:3]
for f in ok_files:
    size = f.stat().st_size
    data = json.loads(f.read_text(encoding="utf-8"))
    print(f"=== {f.name} ({size} bytes) ===")
    print(f"  keys: {list(data.keys())}")
    if "nodes" in data:
        print(f"  nodes: {len(data['nodes'])}")
    if "questions" in data:
        print(f"  questions: {len(data['questions'])}")
    print()
