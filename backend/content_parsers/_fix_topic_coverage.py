"""Assign every enrichment node to a topic.

For combos with no mapping: create one "General" topic with all nodes.
For combos with partial coverage: match uncovered nodes to existing topics by title,
put unmatched ones in a "General" topic.
"""
import json
import re
from collections import defaultdict

# Load topic mappings
with open(r"D:\platform\parsed_output\topic_node_mappings.json", encoding="utf-8-sig") as f:
    data = json.load(f)
mappings = data.get("mappings", data)

# Load enrichment nodes
nodes_by_cs = defaultdict(list)  # (cls, subj) -> [(nid, title)]
node_titles = {}
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        nid = r.get("node_id")
        cls = r.get("class_level")
        subj = r.get("subject")
        title = r.get("title", "")
        if nid and cls and subj:
            nodes_by_cs[(cls, subj)].append((nid, title))
            node_titles[nid] = title

# Stopwords for matching
STOPWORDS = {
    "the", "and", "for", "with", "from", "into", "that", "this", "what",
    "how", "why", "when", "where", "which", "their", "there", "they",
    "are", "was", "were", "been", "have", "has", "had", "will", "would",
    "can", "could", "should", "may", "might", "must", "shall", "not",
    "but", "nor", "yet", "so", "or", "if", "then", "than", "too", "very",
    "also", "only", "just", "such", "some", "any", "all", "each", "both",
    "few", "more", "most", "other", "one", "two", "three", "first", "last",
    "about", "between", "through", "during", "before", "after", "above",
    "below", "up", "down", "out", "off", "over", "under", "again",
    "class", "chapter", "unit", "section", "topic", "introduction",
    "revision", "extension", "overview", "general", "basic", "simple",
    "concept", "concepts", "study", "learning", "understanding",
}

def get_significant_words(text):
    """Extract significant words from text (len >= 4, not stopwords)."""
    words = re.findall(r'[a-z]+', text.lower())
    return [w for w in words if len(w) >= 4 and w not in STOPWORDS]

def match_node_to_topic(node_title, topics):
    """Find the best matching topic for a node by title similarity.
    Returns topic_num or None."""
    node_words = set(get_significant_words(node_title))
    if not node_words:
        return None
    
    best_match = None
    best_score = 0
    
    for topic in topics:
        topic_name = topic.get("topic_name", "")
        topic_words = set(get_significant_words(topic_name))
        if not topic_words:
            continue
        
        # Score = number of shared significant words
        shared = node_words & topic_words
        score = len(shared)
        
        # Also check substring match
        if topic_name.lower() in node_title.lower() or node_title.lower() in topic_name.lower():
            score += 5
        
        if score > best_score:
            best_score = score
            best_match = topic.get("topic_num")
    
    return best_match if best_score > 0 else None

# Process each class+subject combo
changes = {
    "new_combos": 0,
    "nodes_assigned_to_existing_topic": 0,
    "nodes_assigned_to_general": 0,
}

for (cls, subj) in sorted(nodes_by_cs.keys()):
    key = f"{cls}_{subj}"
    all_nodes = nodes_by_cs[(cls, subj)]
    
    if key not in mappings:
        # No mapping at all — create a single "General" topic
        mappings[key] = {
            "class": cls,
            "subject": subj,
            "topics": [{
                "topic_num": 1,
                "topic_name": "General",
                "nodes": [nid for nid, _ in all_nodes],
            }],
        }
        changes["new_combos"] += 1
        continue
    
    # Has mapping — find uncovered nodes
    existing_topics = mappings[key].get("topics", [])
    covered_nodes = set()
    for topic in existing_topics:
        covered_nodes.update(topic.get("nodes", []))
    
    uncovered = [(nid, title) for nid, title in all_nodes if nid not in covered_nodes]
    if not uncovered:
        continue
    
    # Try to match each uncovered node to an existing topic
    general_nodes = []
    for nid, title in uncovered:
        topic_num = match_node_to_topic(title, existing_topics)
        if topic_num is not None:
            # Add to existing topic
            for topic in existing_topics:
                if topic.get("topic_num") == topic_num:
                    if nid not in topic.get("nodes", []):
                        topic.setdefault("nodes", []).append(nid)
                    break
            changes["nodes_assigned_to_existing_topic"] += 1
        else:
            general_nodes.append(nid)
    
    # Put unmatched nodes in a "General" topic
    if general_nodes:
        # Check if there's already a General topic
        general_topic = None
        for topic in existing_topics:
            if topic.get("topic_name") == "General":
                general_topic = topic
                break
        
        if general_topic:
            general_topic.setdefault("nodes", []).extend(general_nodes)
        else:
            # Find next available topic_num
            max_num = max((t.get("topic_num", 0) for t in existing_topics), default=0)
            existing_topics.append({
                "topic_num": max_num + 1,
                "topic_name": "General",
                "nodes": general_nodes,
            })
        
        changes["nodes_assigned_to_general"] += len(general_nodes)

# Write updated file
with open(r"D:\platform\parsed_output\topic_node_mappings.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Verify coverage
mapped_nodes = set()
for key, m in mappings.items():
    for topic in m.get("topics", []):
        for nid in topic.get("nodes", []):
            mapped_nodes.add(nid)

all_enrichment = set(node_titles.keys())
uncovered = all_enrichment - mapped_nodes

print(f"Changes:")
print(f"  New combos created: {changes['new_combos']}")
print(f"  Nodes assigned to existing topic: {changes['nodes_assigned_to_existing_topic']}")
print(f"  Nodes assigned to General topic: {changes['nodes_assigned_to_general']}")
print(f"\nFinal coverage:")
print(f"  Total nodes: {len(all_enrichment)}")
print(f"  Covered: {len(mapped_nodes)}")
print(f"  Uncovered: {len(uncovered)}")
if uncovered:
    print(f"  STILL UNCOVERED: {sorted(uncovered)[:10]}...")
else:
    print(f"  100% COVERAGE!")
