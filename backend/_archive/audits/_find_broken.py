"""Find result files with JSON parse errors and attempt to fix them."""
import json
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

broken = []
good = 0
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        has_nodes = any(chunk.get("nodes") for chunk in data.get("results", []))
        if has_nodes:
            good += 1
    except json.JSONDecodeError as e:
        broken.append((f, str(e)))

print(f"Good files: {good}")
print(f"Broken files: {len(broken)}")
print()
for f, err in broken:
    print(f"  {f.name}: {err[:80]}")
