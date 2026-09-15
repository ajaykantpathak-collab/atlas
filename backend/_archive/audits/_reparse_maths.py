"""Reparse the existing Call 1 response with fixed parser, then run Call 2."""
import json
import re
import asyncio
import aiohttp
import ssl
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cisce_merge_output")

def parse_call1(text):
    both_mappings = []
    cbse_only = []
    cisce_unmatched = []

    for line in text.split("\n"):
        line = line.strip()
        if line.startswith("A |"):
            m = re.match(r'A\s*\|\s*(?:cisce:\s*)?(\S+)\s*→\s*cbse:\s*\[([^\]]*)\]', line)
            if m:
                cisce_id = m.group(1)
                cbse_ids = [x.strip() for x in m.group(2).split(",") if x.strip()]
                both_mappings.append({"cisce": cisce_id, "cbse": cbse_ids})
        elif line.startswith("B |"):
            node_id = line.replace("B |", "").strip()
            if node_id.startswith("c"):
                cbse_only.append(node_id)
        elif line.startswith("C |"):
            parts = line.replace("C |", "").strip().split(" | ", 1)
            if len(parts) >= 1:
                node_id = parts[0].strip()
                title = parts[1].strip() if len(parts) > 1 else ""
                cisce_unmatched.append({"node_id": node_id, "title": title})

    return {"both": both_mappings, "cbse_only": cbse_only, "cisce_unmatched_ids": cisce_unmatched}

# Parse existing response
response1 = Path(OUTPUT_DIR / "maths_call1_response.md").read_text(encoding="utf-8")
cat = parse_call1(response1)

print(f"Category A (both): {len(cat['both'])} mappings")
print(f"Category B (CBSE only): {len(cat['cbse_only'])} nodes")
print(f"Category C (CISCE unmatched): {len(cat['cisce_unmatched_ids'])} topics")

# Save parsed
with open(OUTPUT_DIR / "maths_call1_parsed.json", "w", encoding="utf-8") as f:
    json.dump(cat, f, indent=2, ensure_ascii=False)

# Show samples
if cat['both']:
    print(f"\n=== Sample BOTH mappings (first 5) ===")
    for m in cat['both'][:5]:
        print(f"  {m['cisce']} → {m['cbse'][:3]}")

if cat['cisce_unmatched_ids']:
    print(f"\n=== Sample UNMATCHED (first 10) ===")
    for u in cat['cisce_unmatched_ids'][:10]:
        print(f"  {u['node_id']}: {u['title'][:60]}")

if cat['cbse_only']:
    print(f"\n=== Sample CBSE-ONLY (first 10) ===")
    for n in cat['cbse_only'][:10]:
        print(f"  {n}")
