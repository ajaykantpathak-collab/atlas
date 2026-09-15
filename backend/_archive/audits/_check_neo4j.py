from neo4j import GraphDatabase
driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j','dream_neo4j_2024'))
with driver.session() as s:
    # Total nodes
    r = s.run('MATCH (n:Node) RETURN count(n) as total')
    print(f'Total Neo4j nodes: {r.single()["total"]}')

    # By board
    r = s.run('MATCH (n:Node) RETURN n.board as board, count(n) as cnt ORDER BY cnt DESC')
    print('\nBy board:')
    for rec in r:
        print(f'  {rec["board"]}: {rec["cnt"]}')

    # By subject
    r = s.run('MATCH (n:Node) RETURN n.subject as subj, count(n) as cnt ORDER BY cnt DESC')
    print('\nBy subject:')
    for rec in r:
        print(f'  {rec["subj"]}: {rec["cnt"]}')

    # Hindi specifically
    r = s.run("MATCH (n:Node) WHERE n.subject CONTAINS 'hindi' OR n.subject CONTAINS 'Hindi' RETURN n.board as board, n.class_level as cls, count(n) as cnt ORDER BY board, cls")
    print('\nHindi nodes:')
    for rec in r:
        print(f'  board={rec["board"]}, class={rec["cls"]}, count={rec["cnt"]}')

    # Check for any nodes NOT in our index
    r = s.run("MATCH (n:Node) WHERE NOT n.node_id STARTS WITH 'c' RETURN count(n) as cnt")
    print(f"\nNodes not starting with 'c': {r.single()['cnt']}")

    # Sample some node_ids to see format
    r = s.run("MATCH (n:Node) RETURN n.node_id as nid, n.board as board, n.subject as subj LIMIT 20")
    print("\nSample nodes:")
    for rec in r:
        print(f'  {rec["nid"]} | {rec["board"]} | {rec["subj"]}')
driver.close()
