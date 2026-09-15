"""Check physics files for broken refs AND content mismatches."""
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

valid_ids = set(nodes.keys())
REF_RE = re.compile(r"(c\d+_[a-z]+_cbse_\w+)")
COMMON = {
    "the", "a", "an", "is", "are", "to", "of", "in", "for", "and", "or", "with",
    "from", "by", "on", "at", "as", "this", "that", "student", "must", "need",
    "requires", "provides", "establishes", "transfers", "builds", "allows",
    "enables", "concept", "schema", "skill", "understanding", "before",
    "essential", "directly", "applied", "used", "between", "into", "over",
    "same", "both", "across", "which", "their", "these", "those", "such",
    "it", "its", "be", "has", "have", "was", "were", "will", "can", "not",
    "but", "they", "them", "more", "than", "less", "also", "only", "just",
    "very", "most", "all", "when", "where", "what", "how", "why", "who",
}

for f in sorted(Path(r"D:\platform\cbse_data\prereqs").glob("*.md")):
    content = f.read_text(encoding="utf-8")

    # Check broken refs
    refs = REF_RE.findall(content)
    broken = [r for r in set(refs) if r not in valid_ids]

    # Check content mismatches
    sections = content.split("## ")
    mismatches = []
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
                for m in re.finditer(r'"(c\d+_[a-z]+_cbse_\w+)"\s*:\s*"(.*?)"', val, re.DOTALL):
                    cross_reasons[m.group(1)] = m.group(2)
        for ref in cross_refs:
            if ref not in nodes:
                continue
            topic = nodes[ref].get("topic", "").lower()
            chapter = nodes[ref].get("chapter", "").lower()
            reason = cross_reasons.get(ref, "").lower()
            if not reason:
                continue
            reason_words = set(re.findall(r"[a-z]{4,}", reason)) - COMMON
            topic_words = set(re.findall(r"[a-z]{4,}", topic + " " + chapter)) - COMMON
            overlap = reason_words & topic_words
            if not overlap and reason_words:
                mismatches.append((nid, ref, reason[:80], topic[:50]))

    print(f"=== {f.name} ===")
    print(f"  Broken IDs: {len(broken)}")
    if broken:
        print(f"    {broken[:5]}")
    print(f"  Content mismatches: {len(mismatches)}")
    for nid, ref, reason, topic in mismatches:
        print(f"    {nid} -> {ref}")
        print(f"      reason: {reason}")
        print(f"      actual topic: {topic}")
    print()
