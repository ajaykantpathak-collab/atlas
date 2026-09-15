"""Recover failed result.json stubs by re-parsing the raw txt files.

This script ONLY:
1. Reads existing _raw.txt files
2. Re-parses the JSON content with lenient parsing
3. Writes NEW _recovered.json files (does NOT touch existing _result.json files)

This does NOT modify, truncate, or delete any existing data files.
"""
import json
import re
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")


def lenient_json_parse(text: str) -> dict:
    """Parse JSON from raw text with multiple fallback strategies."""
    # Strategy 1: Extract between markers
    marker_match = re.search(r'<<<JSON_START>>+\s*(.*?)\s*<<<JSON_END>>+', text, re.DOTALL)
    if marker_match:
        clean = marker_match.group(1)
    else:
        # Strategy 2: Try markdown fences
        fence_match = re.search(r'```(?:json)?\s*(.*?)\s*```', text, re.DOTALL)
        if fence_match:
            clean = fence_match.group(1)
        else:
            # Strategy 3: Find first { and last }
            first = text.find("{")
            last = text.rfind("}")
            if first >= 0 and last > first:
                clean = text[first:last + 1]
            else:
                return None

    # Fix common JSON issues
    # Remove trailing commas before } or ]
    clean = re.sub(r',\s*([}\]])', r'\1', clean)
    # Remove single-line comments
    clean = re.sub(r'//.*?\n', '\n', clean)
    # Remove /* */ comments
    clean = re.sub(r'/\*.*?\*/', '', clean, flags=re.DOTALL)
    # Fix missing commas between fields: "value" "next_key" -> "value", "next_key"
    clean = re.sub(r'"\s*\n\s*"', '",\n"', clean)
    # Fix missing commas after } or ] or }] before next key
    clean = re.sub(r'([}\]]+)\s+"', r'\1, "', clean)

    try:
        return json.loads(clean)
    except json.JSONDecodeError as e:
        # Strategy 4: Try line-by-line repair
        try:
            # Remove control characters
            clean2 = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', clean)
            return json.loads(clean2)
        except json.JSONDecodeError:
            pass

        # Strategy 5: Try to fix escaped quotes issues
        try:
            clean3 = clean.replace('\\"', '"').replace('"\\', '"')
            # Re-escape properly
            return json.loads(clean3)
        except json.JSONDecodeError:
            pass

        # Strategy 6: Use json5-style lenient parsing via regex repair
        try:
            # Fix missing commas after } or ] before next key
            clean4 = re.sub(r'([}\]]+)\s+"', r'\1, "', clean)
            return json.loads(clean4)
        except json.JSONDecodeError:
            pass

        return None


# Find all recoverable chapters
raw_files = [f for f in OUTPUT_DIR.glob("*_chunk*_raw.txt") if f.stat().st_size > 1000]
print(f"Raw txt files with content: {len(raw_files)}")

recovered = 0
failed = 0

for raw_file in raw_files:
    stem = raw_file.name.replace("_chunk1_raw.txt", "").replace("_chunk2_raw.txt", "")
    result_path = OUTPUT_DIR / f"{stem}_result.json"

    # Check if result is a failed stub
    should_recover = False
    chapter_info = {}
    if result_path.exists():
        try:
            data = json.loads(result_path.read_text(encoding="utf-8"))
            results = data.get("results", [])
            has_error = any("_error" in r for r in results)
            has_real = any("nodes" in r for r in results)
            if has_error and not has_real:
                should_recover = True
                chapter_info = {
                    "chapter": data.get("chapter", stem),
                    "title": data.get("title", ""),
                    "grade": data.get("grade", 0),
                    "subject": data.get("subject", ""),
                    "cbse_subject": data.get("cbse_subject", ""),
                    "mode": data.get("mode", "cbse_full"),
                }
        except Exception:
            should_recover = True
    else:
        should_recover = True

    if not should_recover:
        continue

    # Parse the raw file
    raw_text = raw_file.read_text(encoding="utf-8", errors="replace")
    parsed = lenient_json_parse(raw_text)

    if parsed and "nodes" in parsed:
        # Write to NEW file (does NOT overwrite existing)
        recovered_path = OUTPUT_DIR / f"{stem}_recovered.json"
        parsed["_chunk"] = 1
        output = {
            **chapter_info,
            "results": [parsed],
            "recovered_from": raw_file.name,
        }
        recovered_path.write_text(
            json.dumps(output, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        n_nodes = len(parsed.get("nodes", []))
        print(f"  ✓ {stem}: {n_nodes} nodes recovered")
        recovered += 1
    else:
        print(f"  ✗ {stem}: could not parse")
        failed += 1

print(f"\n=== RECOVERY COMPLETE: {recovered} recovered, {failed} failed ===")
