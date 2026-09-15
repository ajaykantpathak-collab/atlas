"""Check all corpus files for empty or near-empty content."""
import os
from pathlib import Path

CISCE_ROOT = r"D:\cisce"

results = {
    "empty": [],          # 0 bytes
    "near_empty": [],     # < 100 bytes
    "tiny": [],           # < 500 bytes
    "small": [],          # < 2000 bytes
    "ok": 0,              # >= 2000 bytes
    "total": 0,
    "total_bytes": 0,
}

for root, dirs, files in os.walk(CISCE_ROOT):
    for fname in files:
        fpath = os.path.join(root, fname)
        results["total"] += 1
        try:
            size = os.path.getsize(fpath)
        except:
            results["empty"].append(fpath)
            continue
        results["total_bytes"] += size
        
        if size == 0:
            results["empty"].append(fpath)
        elif size < 100:
            results["near_empty"].append(fpath)
        elif size < 500:
            results["tiny"].append(fpath)
        elif size < 2000:
            results["small"].append(fpath)
        else:
            results["ok"] += 1

print(f"Total files in D:\\cisce: {results['total']}")
print(f"Total size: {results['total_bytes'] / 1_000_000:.1f} MB")
print()
print(f"Empty (0 bytes):        {len(results['empty'])}")
print(f"Near-empty (<100 bytes): {len(results['near_empty'])}")
print(f"Tiny (<500 bytes):      {len(results['tiny'])}")
print(f"Small (<2000 bytes):    {len(results['small'])}")
print(f"OK (>=2000 bytes):      {results['ok']}")
print()

if results["empty"]:
    print("=" * 60)
    print("EMPTY FILES (0 bytes):")
    print("=" * 60)
    for f in results["empty"][:50]:
        print(f"  {f}")
    if len(results["empty"]) > 50:
        print(f"  ... and {len(results['empty']) - 50} more")

if results["near_empty"]:
    print()
    print("=" * 60)
    print("NEAR-EMPTY FILES (<100 bytes):")
    print("=" * 60)
    for f in results["near_empty"][:50]:
        try:
            with open(f, 'r', encoding='utf-8', errors='replace') as fh:
                content = fh.read().strip()
            print(f"  {f} ({os.path.getsize(f)} bytes): {content[:80]}")
        except:
            print(f"  {f} ({os.path.getsize(f)} bytes): [read error]")

if results["tiny"]:
    print()
    print("=" * 60)
    print(f"TINY FILES (<500 bytes) — showing first 30 of {len(results['tiny'])}:")
    print("=" * 60)
    for f in results["tiny"][:30]:
        try:
            with open(f, 'r', encoding='utf-8', errors='replace') as fh:
                content = fh.read().strip()
            print(f"  {f} ({os.path.getsize(f)} bytes): {content[:100]}")
        except:
            print(f"  {f} ({os.path.getsize(f)} bytes): [read error]")
