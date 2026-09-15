"""Check cross-subject refs in physics_c12 files — verify topic matches reason."""
import re
import json
from pathlib import Path

nodes = {}
for f in Path(r"D:\platform\cbse_coverage_output_fixed").glob("*.json"):
    data = json.loads(f.read_text(encoding="utf-8"))
    for chunk in data.get("results", []):
        for n in chunk.get("nodes", []):
            nid = n.get("node_id", "")
            if nid:
                nodes[nid] = n

REF_RE = re.compile(r"(c\d+_[a-z]+_cbse_\w+)")

for f in sorted(Path(r"D:\platform\cbse_data\prereqs").glob("physics_c12_*.md")):
    content = f.read_text(encoding="utf-8")
    sections = content.split("## ")
    print(f"\n=== {f.name} ===")
    for sec in sections[1:]:
        lines = sec.strip().split("\n")
        nid = lines[0].strip()
        cross_refs = []
        cross_reasons = {}
        for line in lines:
            s = line.strip()
            if s.startswith("- **cross_subject_prereqs**"):
                val = s.split("**:", 1)[1].strip()
                cross_refs = REF_RE.findall(val)
            if s.startswith("- **cross_subject_reasons**"):
                val = s.split("**:", 1)[1].strip()
                for m in re.finditer(r'"(c\d+_[a-z]+_cbse_\w+)"\s*:\s*"(.*?)"', val):
                    cross_reasons[m.group(1)] = m.group(2)[:80]
        if cross_refs:
            for ref in cross_refs:
                topic = nodes.get(ref, {}).get("topic", "NOT FOUND")[:45]
                chapter = nodes.get(ref, {}).get("chapter", "")[:30]
                reason = cross_reasons.get(ref, "")[:80]
                print(f"  {nid} -> {ref}")
                print(f"    topic: {topic} | ch={chapter}")
                print(f"    reason: {reason}")
                print()
