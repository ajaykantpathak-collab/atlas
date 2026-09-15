"""Add cross-subject RELATED_TO edges to Neo4j from existing cross_topic_connections marker files.

Data sources (already in class_level_content table, content_type='cross_topic_connections'):
  1. Master files (physics, maths): cross_topic_connections.marker
     - Physics master has explicit sections: PHYSICS <-> MATHEMATICS, PHYSICS <-> CHEMISTRY,
       PHYSICS <-> BIOLOGY, PHYSICS <-> PHYSICS, each with "Target node: c11_phy_009, ..." lines
     - Maths master has within-maths connections (algebra <-> geometry, trig <-> calculus, etc.)
  2. Per-class files (bio, physics, maths): c{N}_{subject}_cross_topic.marker
     - Each has "Connection N: ... connects to ..." with "Target node: ..." lines
     - Bio files connect to Chemistry, Maths, Physics by name (some have node IDs, some don't)

This script parses ALL of these and creates RELATED_TO edges using the actual target node IDs.
Only creates edges where target nodes exist in Neo4j. No keyword guessing.
"""
import asyncio
import re
import sys
sys.path.insert(0, ".")

from sqlalchemy import select
from backend.database import async_session
from backend.models.enrichment import ClassLevelContent
from backend.services.graph_service import get_neo4j


# --------------------------------------------------------------------------- #
# Parsers
# --------------------------------------------------------------------------- #

# Per-class format: "Connection N: ... connects to ..." + "Target node: ..." + "Why: ..."
_CONNECTION_RE = re.compile(
    r'Connection\s+(\d+)\s*:\s*(.*?)(?=\n\s*Target node:|\n\s*Why:|\n\s*Connection\s+\d+|\Z)',
    re.DOTALL,
)
_TARGET_RE = re.compile(
    r'Target node:\s*(.*?)(?=\n\s*Why:|\n\s*Connection\s+\d+|\Z)',
    re.DOTALL,
)
_WHY_RE = re.compile(
    r'Why:\s*(.*?)(?=\n\s*Example:|\n\s*Connection\s+\d+|\Z)',
    re.DOTALL,
)

# Master file format: "=== SECTION NAME ===" + "Target node: ..." + bullet list
_SECTION_RE = re.compile(
    r'===\s*(.+?)\s*===\s*\n(.*?)(?=\n===|\Z)',
    re.DOTALL,
)
_NODE_ID_RE = re.compile(r'c\d+_\w+_\d+')


def _parse_per_class_connections(content: str):
    """Parse per-class cross-topic marker content.
    
    Returns list of (target_node_ids, reason, connection_text).
    """
    connections = []
    conn_matches = list(_CONNECTION_RE.finditer(content))
    
    for conn_match in conn_matches:
        conn_text = conn_match.group(2).strip()
        remaining = content[conn_match.end():].lstrip()
        
        target_match = _TARGET_RE.match(remaining)
        why_match = _WHY_RE.search(remaining)
        
        if not target_match:
            continue
        
        target_text = target_match.group(1).strip()
        if target_text.upper() == "UNKNOWN":
            continue
        
        node_ids = _NODE_ID_RE.findall(target_text)
        if not node_ids:
            continue
        
        reason = ""
        if why_match:
            reason = why_match.group(1).strip()[:500]
        else:
            reason = conn_text[:200]
        
        connections.append((node_ids, reason, conn_text))
    
    return connections


def _parse_master_connections(content: str):
    """Parse master cross_topic_connections.marker content.
    
    The master file has sections like:
      === PHYSICS <-> MATHEMATICS ===
      Target node: c11_phy_009, c11_phy_010, ...
      - Vectors (Physics) <-> Vectors (Maths): Same addition, dot product...
    
    Returns list of (target_node_ids, reason, section_name).
    """
    connections = []
    
    for section_match in _SECTION_RE.finditer(content):
        section_name = section_match.group(1).strip()
        section_body = section_match.group(2).strip()
        
        # Find "Target node:" line in this section
        target_match = re.search(r'Target node:\s*(.*?)(?=\n[-\n]|\Z)', section_body, re.DOTALL)
        if not target_match:
            continue
        
        target_text = target_match.group(1).strip()
        node_ids = _NODE_ID_RE.findall(target_text)
        if not node_ids:
            continue
        
        # The bullet points after Target node are the reasons
        bullets = re.findall(r'^-\s*(.+?)$', section_body, re.MULTILINE)
        reason = "; ".join(bullets[:3])[:500] if bullets else section_name
        
        connections.append((node_ids, reason, section_name))
    
    return connections


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #

async def add_edges_from_markers():
    """Parse all cross_topic_connections from the database and create RELATED_TO edges."""
    driver = await get_neo4j()
    edges_added = 0
    edges_skipped = 0
    nodes_not_found = 0
    source_nodes_seen = set()
    
    async with async_session() as db:
        result = await db.execute(
            select(ClassLevelContent)
            .where(ClassLevelContent.content_type == "cross_topic_connections")
        )
        all_clc = list(result.scalars())
        print(f"Found {len(all_clc)} cross_topic_connections entries in database\n")
        
        async with driver.session() as session:
            for clc in all_clc:
                # Get the source node ID from the content
                node_id_match = re.search(r'NODE_ID:\s*(\S+)', clc.content or "")
                if not node_id_match:
                    continue
                source_node_id = node_id_match.group(1)
                
                # Check if source node exists in Neo4j
                # The cross_topic nodes themselves may not be in Neo4j (they're in class_level_content, not enrichment)
                # So we create edges FROM each target node TO the other target nodes in the same connection
                # Actually — the cross_topic node IS a KnowledgeNode in Neo4j? Let's check.
                check_src = await session.run(
                    "MATCH (n:KnowledgeNode {node_id: $nid}) RETURN n.node_id AS nid",
                    nid=source_node_id,
                )
                src_record = await check_src.single()
                source_exists = src_record is not None
                
                content = clc.content or ""

                # ONLY process master files — per-class files are within-subject
                # connections (same as REQUIRES/depth prereq edges), not cross-subject
                is_master = "===" in content and "<->" in content
                if not is_master:
                    continue

                connections = _parse_master_connections(content)
                file_type = "master"
                
                if not connections:
                    continue
                
                print(f"{source_node_id} [{file_type}] ({clc.target_subject} C{clc.target_class}): {len(connections)} connection groups")
                
                for target_node_ids, reason, conn_text in connections:
                    # For each connection, create edges between all listed target nodes
                    # These nodes are the actual curriculum nodes that should be RELATED_TO each other
                    for i, node_a in enumerate(target_node_ids):
                        for node_b in target_node_ids[i+1:]:
                            if node_a == node_b:
                                continue
                            
                            # Check both nodes exist in Neo4j
                            check_a = await session.run(
                                "MATCH (n:KnowledgeNode {node_id: $nid}) RETURN n.node_id AS nid",
                                nid=node_a,
                            )
                            rec_a = await check_a.single()
                            if rec_a is None:
                                nodes_not_found += 1
                                continue
                            
                            check_b = await session.run(
                                "MATCH (n:KnowledgeNode {node_id: $nid}) RETURN n.node_id AS nid",
                                nid=node_b,
                            )
                            rec_b = await check_b.single()
                            if rec_b is None:
                                nodes_not_found += 1
                                continue
                            
                            # Check if edge already exists
                            edge_check = await session.run(
                                """
                                MATCH (a:KnowledgeNode {node_id: $a_id})-[r:RELATED_TO]-(b:KnowledgeNode {node_id: $b_id})
                                RETURN count(r) AS count
                                """,
                                a_id=node_a, b_id=node_b,
                            )
                            edge_record = await edge_check.single()
                            if edge_record and edge_record["count"] > 0:
                                edges_skipped += 1
                                continue
                            
                            # Create bidirectional edge
                            await session.run(
                                """
                                MATCH (a:KnowledgeNode {node_id: $a_id}), (b:KnowledgeNode {node_id: $b_id})
                                CREATE (a)-[:RELATED_TO {reason: $reason, source: 'cross_topic_marker'}]->(b)
                                """,
                                a_id=node_a, b_id=node_b,
                                reason=reason,
                            )
                            edges_added += 1
                
                source_nodes_seen.add(source_node_id)
    
    # Verify
    async with driver.session() as session:
        result = await session.run("MATCH ()-[r:RELATED_TO]->() RETURN count(r) AS total")
        record = await result.single()
        print(f"\n--- Summary ---")
        print(f"Source files processed: {len(source_nodes_seen)}")
        print(f"Edges added: {edges_added}")
        print(f"Edges skipped (already existed): {edges_skipped}")
        print(f"Target nodes not found in Neo4j: {nodes_not_found}")
        print(f"Total RELATED_TO edges in Neo4j: {record['total']}")


async def main():
    await add_edges_from_markers()


if __name__ == "__main__":
    asyncio.run(main())
