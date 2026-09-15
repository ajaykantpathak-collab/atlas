from neo4j import GraphDatabase
driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j','dream_neo4j_2024'))
with driver.session() as s:
    # All subjects in KnowledgeNode
    r = s.run("MATCH (n:KnowledgeNode) RETURN n.board as board, n.subject as subj, n.class_level as cls, count(n) as cnt ORDER BY board, subj, cls")
    print("=== KnowledgeNode by board/subject/class ===")
    current_board = None
    for rec in r:
        board = rec["board"] or "?"
        subj = rec["subj"] or "?"
        cls = rec["cls"]
        cnt = rec["cnt"]
        if board != current_board:
            current_board = board
            print(f"\n  [{board}]")
        print(f"    {subj:25s} class {cls}: {cnt}")

    # Check for hindi specifically
    print("\n=== Hindi search ===")
    r = s.run("MATCH (n) WHERE n.subject CONTAINS 'hin' RETURN labels(n) as labels, n.subject as subj, count(n) as cnt")
    found = False
    for rec in r:
        print(f"  labels={rec['labels']}, subj={rec['subj']}, count={rec['cnt']}")
        found = True
    if not found:
        print("  NO Hindi nodes found in Neo4j")

    # Check organized hindi content
    import os
    hindi_path = r"D:\platform\organized\hindi"
    if os.path.exists(hindi_path):
        print(f"\n=== Organized Hindi content ===")
        for cls_dir in sorted(os.listdir(hindi_path)):
            cls_full = os.path.join(hindi_path, cls_dir)
            if os.path.isdir(cls_full):
                cn = os.path.join(cls_full, "content_nodes")
                if os.path.exists(cn):
                    files = [f for f in os.listdir(cn) if f.endswith(".md")]
                    print(f"  {cls_dir}: {len(files)} content files")
    else:
        print("  No organized/hindi directory")

    # Check node_index.json for hindi
    import json
    idx = json.loads(open(r"D:\platform\content\index\node_index.json", encoding="utf-8").read())
    hindi_nodes = [n for n in idx if n.get("subject") == "hindi"]
    print(f"\n=== node_index.json Hindi nodes: {len(hindi_nodes)} ===")
    for n in hindi_nodes[:5]:
        print(f"  {n['node_id']} | class {n['class']} | {n['title'][:60]}")
    if len(hindi_nodes) > 5:
        print(f"  ... and {len(hindi_nodes)-5} more")

driver.close()
