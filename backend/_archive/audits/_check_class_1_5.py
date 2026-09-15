from neo4j import GraphDatabase
driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j','dream_neo4j_2024'))
with driver.session() as s:
    # All CISCE nodes for classes 1-5
    r = s.run("MATCH (n:KnowledgeNode) WHERE n.class_level >= 1 AND n.class_level <= 5 RETURN n.subject as subj, n.class_level as cls, count(n) as cnt ORDER BY subj, cls")
    print("=== CISCE classes 1-5 in Neo4j ===")
    cisce_1_5 = []
    for rec in r:
        print(f"  {rec['subj']:25s} class {rec['cls']}: {rec['cnt']}")
        cisce_1_5.append({"subj": rec["subj"], "cls": rec["cls"], "cnt": rec["cnt"]})

    # Get node_ids for classes 1-5
    r = s.run("MATCH (n:KnowledgeNode) WHERE n.class_level >= 1 AND n.class_level <= 5 RETURN n.nid as nid, n.subject as subj, n.class_level as cls, n.title as title LIMIT 200")
    print("\n=== Sample CISCE class 1-5 nodes ===")
    cisce_nodes_1_5 = []
    for rec in r:
        cisce_nodes_1_5.append({"node_id": rec["nid"], "subject": rec["subj"], "class": rec["cls"], "title": rec["title"] or ""})

    for n in cisce_nodes_1_5[:30]:
        print(f"  {n['node_id']:25s} | c{n['class']} | {n['subject']:15s} | {n['title'][:50]}")
    if len(cisce_nodes_1_5) > 30:
        print(f"  ... and {len(cisce_nodes_1_5)-30} more")

    # Total count
    r = s.run("MATCH (n:KnowledgeNode) WHERE n.class_level >= 1 AND n.class_level <= 5 RETURN count(n) as cnt")
    total_1_5 = r.single()["cnt"]
    print(f"\nTotal CISCE class 1-5 nodes: {total_1_5}")

driver.close()

# Now check what CBSE has for classes 1-5
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
cbse_by_subj_cls = defaultdict(list)
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 500:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        subject = data.get("subject", "unknown")
        grade = data.get("grade", "?")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                cls = node.get("class_level", "?")
                if isinstance(cls, int) and cls <= 5:
                    cbse_by_subj_cls[(subject, cls)].append(node.get("node_id", ""))
    except:
        pass

print(f"\n=== CBSE classes 1-5 ===")
if cbse_by_subj_cls:
    for (subj, cls), nodes in sorted(cbse_by_subj_cls.items()):
        print(f"  {subj:25s} class {cls}: {len(nodes)} nodes")
else:
    print("  NONE — CBSE data only has classes 6-12")

# Check organized content for classes 1-5
print(f"\n=== Organized content for classes 1-5 ===")
organized = Path(r"D:\platform\organized")
for subj_dir in sorted(organized.iterdir()):
    if not subj_dir.is_dir():
        continue
    for cls_num in range(1, 6):
        cls_dir = subj_dir / f"class{cls_num}"
        if cls_dir.exists():
            cn_dir = cls_dir / "content_nodes"
            granular = cls_dir / "granular_nodes"
            md_count = 0
            for d in [cn_dir, granular]:
                if d.exists():
                    md_count += len(list(d.glob("*.md")))
            if md_count > 0:
                print(f"  {subj_dir.name:15s} class {cls_num}: {md_count} content files")
