from neo4j import GraphDatabase
driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j','dream_neo4j_2024'))
with driver.session() as s:
    # Get all labels
    r = s.run("CALL db.labels() YIELD label RETURN label")
    labels = [rec["label"] for rec in r]
    print("Labels:", labels)

    # Get count for each label
    for label in labels:
        r = s.run(f"MATCH (n:{label}) RETURN count(n) as cnt")
        cnt = r.single()["cnt"]
        print(f"  {label}: {cnt}")

    # Sample nodes from biggest label
    if labels:
        for label in labels:
            r = s.run(f"MATCH (n:{label}) RETURN n.node_id as nid, n.board as board, n.subject as subj, n.class_level as cls LIMIT 10")
            print(f"\nSample {label} nodes:")
            for rec in r:
                print(f"  nid={rec['nid']} board={rec['board']} subj={rec['subj']} cls={rec['cls']}")

    # Check for Hindi in any label
    print("\n=== Searching for Hindi across all nodes ===")
    r = s.run("MATCH (n) WHERE n.subject CONTAINS 'hindi' OR n.subject CONTAINS 'Hindi' OR n.subject = 'hindi' RETURN labels(n) as labels, count(n) as cnt")
    for rec in r:
        print(f"  labels={rec['labels']}, count={rec['cnt']}")

    # Total node count across all labels
    r = s.run("MATCH (n) RETURN count(n) as total")
    print(f"\nTotal nodes (all labels): {r.single()['total']}")

driver.close()
