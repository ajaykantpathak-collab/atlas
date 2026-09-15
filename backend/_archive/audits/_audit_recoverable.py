"""Check which raw txt files have real content but failed result.json stubs."""
import json
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

# Get all raw txt files with real content (>1KB)
raw_files = [f for f in OUTPUT_DIR.glob("*_chunk*_raw.txt") if f.stat().st_size > 1000]
print(f"Raw txt files with content (>1KB): {len(raw_files)}")

# For each, check if the corresponding result.json is a failed stub
recoverable = []
for raw in raw_files:
    # Extract chapter file name: e.g. "hhbk101_chunk1_raw.txt" -> "hhbk101"
    stem = raw.name.replace("_chunk1_raw.txt", "").replace("_chunk2_raw.txt", "")
    result_path = OUTPUT_DIR / f"{stem}_result.json"
    if result_path.exists():
        data = json.loads(result_path.read_text(encoding="utf-8"))
        results = data.get("results", [])
        has_error = any("_error" in r for r in results)
        has_real = any("nodes" in r for r in results)
        if has_error and not has_real:
            recoverable.append((stem, raw.stat().st_size, result_path.stat().st_size))
    else:
        recoverable.append((stem, raw.stat().st_size, 0))

print(f"Recoverable from raw txt (failed result.json): {len(recoverable)}")
print(f"\nFirst 20:")
for stem, raw_size, res_size in recoverable[:20]:
    print(f"  {stem}: raw={raw_size}B, result={res_size}B")
