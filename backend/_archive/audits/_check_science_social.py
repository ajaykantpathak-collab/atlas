"""Check if Science (phy+chem+bio) and Social Science (hist+civics+geo) content
is actually present under split subjects for classes 6-10."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

nodes_by_subj_cls = defaultdict(lambda: defaultdict(int))
sample_topics = defaultdict(lambda: defaultdict(list))

for f in sorted(CBSE_OUTPUT.glob("*_result.json")):
    if f.stat().st_size < 100:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            subj = node.get("subject", "?").strip()
            cls = node.get("class_level", "?")
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0

            # Normalize
            if subj == "math": subj = "maths"
            if subj == "phy": subj = "physics"
            if subj == "bt": subj = "biotech"
            if subj == "sci": subj = "science"
            if subj == "histciv": subj = "history_civics"
            if subj in ("his", "history"): subj = "hist"
            if subj == "geo": subj = "geography"
            if subj == "acc": subj = "accounts"

            nodes_by_subj_cls[subj][cls] += 1
            if len(sample_topics[subj][cls]) < 5:
                sample_topics[subj][cls].append(node.get("topic", "")[:60])

# For each class 6-10, show Science components and Social Science components
print(f"{'='*100}")
print(f"  SCIENCE = Physics + Chemistry + Biology")
print(f"{'='*100}")
print(f"{'Class':>5s} {'Science':>8s} {'Physics':>8s} {'Chemistry':>8s} {'Biology':>8s} {'Sci Total':>10s} {'Status':>10s}")
print("-" * 70)

for cls in range(6, 11):
    sci = nodes_by_subj_cls.get("science", {}).get(cls, 0)
    phy = nodes_by_subj_cls.get("physics", {}).get(cls, 0)
    chem = nodes_by_subj_cls.get("chemistry", {}).get(cls, 0)
    bio = nodes_by_subj_cls.get("biology", {}).get(cls, 0)
    split_total = phy + chem + bio
    total = sci + split_total
    status = "OK" if total > 20 else "LOW" if total > 0 else "MISSING"
    print(f"{cls:5d} {sci:8d} {phy:8d} {chem:8d} {bio:8d} {split_total:10d} {status:>10s}")

# Show sample topics for science split subjects
print(f"\n  Sample Physics topics (class 6-8):")
for cls in [6, 7, 8]:
    for t in sample_topics.get("physics", {}).get(cls, [])[:3]:
        print(f"    c{cls} phy: {t}")

print(f"\n  Sample Chemistry topics (class 6-8):")
for cls in [6, 7, 8]:
    for t in sample_topics.get("chemistry", {}).get(cls, [])[:3]:
        print(f"    c{cls} chem: {t}")
    if not sample_topics.get("chemistry", {}).get(cls, []):
        print(f"    c{cls} chem: (none)")

print(f"\n  Sample Biology topics (class 6-8):")
for cls in [6, 7, 8]:
    for t in sample_topics.get("biology", {}).get(cls, [])[:3]:
        print(f"    c{cls} bio: {t}")
    if not sample_topics.get("biology", {}).get(cls, []):
        print(f"    c{cls} bio: (none)")

print(f"\n  Sample Science topics (class 6-8):")
for cls in [6, 7, 8]:
    for t in sample_topics.get("science", {}).get(cls, [])[:3]:
        print(f"    c{cls} sci: {t}")
    if not sample_topics.get("science", {}).get(cls, []):
        print(f"    c{cls} sci: (none)")

print(f"\n{'='*100}")
print(f"  SOCIAL SCIENCE = History + Civics + Geography")
print(f"{'='*100}")
print(f"{'Class':>5s} {'SocSci':>8s} {'Hist':>8s} {'HistCiv':>8s} {'Geo':>8s} {'SS Total':>10s} {'Status':>10s}")
print("-" * 70)

for cls in range(6, 11):
    ss = nodes_by_subj_cls.get("social_science", {}).get(cls, 0)
    hist = nodes_by_subj_cls.get("hist", {}).get(cls, 0)
    histciv = nodes_by_subj_cls.get("history_civics", {}).get(cls, 0)
    geo = nodes_by_subj_cls.get("geography", {}).get(cls, 0)
    split_total = hist + histciv + geo
    total = ss + split_total
    status = "OK" if total > 20 else "LOW" if total > 0 else "MISSING"
    print(f"{cls:5d} {ss:8d} {hist:8d} {histciv:8d} {geo:8d} {split_total:10d} {status:>10s}")

print(f"\n  Sample History topics (class 6-8):")
for cls in [6, 7, 8]:
    for t in sample_topics.get("hist", {}).get(cls, [])[:3]:
        print(f"    c{cls} hist: {t}")
    if not sample_topics.get("hist", {}).get(cls, []):
        print(f"    c{cls} hist: (none)")

print(f"\n  Sample History_Civics topics (class 6-8):")
for cls in [6, 7, 8]:
    for t in sample_topics.get("history_civics", {}).get(cls, [])[:3]:
        print(f"    c{cls} histciv: {t}")

print(f"\n  Sample Geography topics (class 6-8):")
for cls in [6, 7, 8]:
    for t in sample_topics.get("geography", {}).get(cls, [])[:3]:
        print(f"    c{cls} geo: {t}")
    if not sample_topics.get("geography", {}).get(cls, []):
        print(f"    c{cls} geo: (none)")

# Now check class 9-10 where Science and Social Science are also taught
print(f"\n{'='*100}")
print(f"  CLASS 9-10 SCIENCE (should be phy+chem+bio)")
print(f"{'='*100}")
for cls in [9, 10]:
    sci = nodes_by_subj_cls.get("science", {}).get(cls, 0)
    phy = nodes_by_subj_cls.get("physics", {}).get(cls, 0)
    chem = nodes_by_subj_cls.get("chemistry", {}).get(cls, 0)
    bio = nodes_by_subj_cls.get("biology", {}).get(cls, 0)
    print(f"  Class {cls}: science={sci}, physics={phy}, chemistry={chem}, biology={bio}, total={sci+phy+chem+bio}")
    for t in sample_topics.get("science", {}).get(cls, [])[:5]:
        print(f"    science: {t}")
