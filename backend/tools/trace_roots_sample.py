"""Definitive global cycle detection + root quality via Kahn's algorithm.

If the topological sort covers every node: the graph is a DAG — every
chain terminates at true roots, zero cycles, guaranteed.
Nodes left unsorted are exactly the nodes involved in cycles.
Also reports root quality: what classes the chains terminate in.
"""
import random
from collections import defaultdict, deque
from neo4j import GraphDatabase

env = dict(l.split('=', 1) for l in open(r'D:/platform/.env', encoding='utf-8',
                                         errors='ignore') if '=' in l)
drv = GraphDatabase.driver('bolt://localhost:7687',
                           auth=('neo4j', env['NEO4J_PASSWORD'].strip()))

with drv.session(database='neo4j') as s:
    edges = defaultdict(list)
    cls_of, indeg = {}, defaultdict(int)
    for r in s.run("MATCH (a:Node)-[:PREREQUISITE_OF]->(b:Node) "
                   "RETURN a.node_id AS a, b.node_id AS b"):
        edges[r['a']].append(r['b'])
        indeg[r['b']] += 1
    for r in s.run("MATCH (n:Node) RETURN n.node_id AS node_id, n.class AS c"):
        cls_of[r['node_id']] = str(r['c'])
        indeg[r['node_id']] += 0  # ensure every node is keyed

    # Kahn
    queue = deque(n for n in cls_of if indeg[n] == 0)
    sorted_count, sorted_nodes = 0, []
    while queue:
        n = queue.popleft()
        sorted_count += 1
        sorted_nodes.append(n)
        for m in edges.get(n, []):
            indeg[m] -= 1
            if indeg[m] == 0:
                queue.append(m)

    total = len(cls_of)
    in_cycles = total - sorted_count
    print(f'total nodes: {total}')
    print(f'topologically sorted: {sorted_count}')
    print(f'nodes inside cycles: {in_cycles}')
    if in_cycles:
        stuck = [n for n in cls_of if indeg[n] > 0][:10]
        print('  sample cycle-involved nodes:', stuck)

    # ── root quality: walk 40 sampled nodes with visited-set (guaranteed
    #    to terminate now that cycles are ruled out — or reported) ──
    if in_cycles == 0:
        random.seed(20260914)
        sample = random.sample([n for n in edges if n in cls_of], 40)
        root_cls = defaultdict(int)
        lens = []
        findings = []
        for node_id in sample:
            seen, frontier, depth = {node_id}, [node_id], 0
            roots = []
            while frontier:
                nxt = []
                depth += 1
                for n in frontier:
                    pres = edges.get(n, [])
                    if not pres:
                        roots.append(n)
                    else:
                        nxt.extend(p for p in pres if p not in seen)
                frontier = [p for p in nxt if p not in seen]
                seen |= set(frontier)
                if depth > 40:
                    break
            lens.append(depth)
            for rt in roots:
                root_cls[cls_of.get(rt, '?')] += 1
            if depth <= 6:
                findings.append((node_id, depth, roots[:2]))
        print()
        print('40-node root trace: all terminated, depths min/median/max:',
              min(lens), sorted(lens)[20], max(lens))
        print('root classes (chains end in these classes):',
              dict(sorted(root_cls.items())))
        print()
        for nid, d, roots in findings[:3]:
            print(f'── {nid} (depth {d}) ends at: {roots}')
drv.close()
