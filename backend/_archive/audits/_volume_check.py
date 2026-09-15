"""Check volume coverage of CBSE generation."""
import json
from pathlib import Path
from collections import defaultdict
import importlib.util
import asyncio

spec = importlib.util.spec_from_file_location('p', r'D:\platform\backend\cbse_coverage_pipeline.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

chapters = []
for g in [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]:
    chapters.extend(m.get_chapters_for_grade(g))

# Get done chapter IDs
done_ids = set()
for f in Path(r'D:\platform\cbse_coverage_output').glob('*_result.json'):
    data = json.loads(f.read_text(encoding='utf-8'))
    has_nodes = any(chunk.get('nodes') for chunk in data.get('results', []))
    if has_nodes:
        done_ids.add(data['chapter'])  # chapter = file stem

total_kb = sum(c['size'] for c in chapters) / 1024
done_kb = sum(c['size'] for c in chapters if c['file'] in done_ids) / 1024

print(f"Total chapters: {len(chapters)}")
print(f"Total volume: {total_kb:.0f} KB ({total_kb/1024:.1f} MB)")
print(f"Done: {len(done_ids)} chapters, {done_kb:.0f} KB ({done_kb/total_kb*100:.0f}%)")
print(f"Remaining: {len(chapters)-len(done_ids)} chapters, {(total_kb-done_kb):.0f} KB ({(total_kb-done_kb)/total_kb*100:.0f}%)")
print()

by_grade = defaultdict(lambda: {"total": 0, "done": 0, "count": 0, "done_count": 0})
for c in chapters:
    g = c["grade"]
    by_grade[g]["total"] += c["size"] / 1024
    by_grade[g]["count"] += 1
    if c["file"] in done_ids:
        by_grade[g]["done"] += c["size"] / 1024
        by_grade[g]["done_count"] += 1

print("=== By grade (volume) ===")
for g in sorted(by_grade):
    d = by_grade[g]
    pct = d["done"] / d["total"] * 100 if d["total"] else 0
    print(f"  Grade {g}: {d['done_count']}/{d['count']} ch | {d['done']:.0f}/{d['total']:.0f} KB ({pct:.0f}%)")
