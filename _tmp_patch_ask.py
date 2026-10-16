"""Patch script: add near-miss tier to /api/tutor-graph/ask in competency_tutor.py."""
import sys

path = "D:/platform/deploy/backend/api/competency_tutor.py"
with open(path, "r", encoding="utf-8") as f:
    src = f.read()

# The old block: score_gate through "return None" at end of _teach_lane
old_marker = "    score_gate = 4.0 if class_level is not None else 6.0\n"
idx = src.find(old_marker)
if idx < 0:
    print("ERROR: score_gate marker not found")
    sys.exit(1)

# Find the end of the block: the "return None" that ends _teach_lane
# It's the first "    return None\n" after the score_gate line
end_marker = "\n    return None\n"
end_idx = src.find(end_marker, idx + len(old_marker))
if end_idx < 0:
    print("ERROR: end of _teach_lane block not found")
    sys.exit(1)
end_idx += len(end_marker)

old_block = src[idx:end_idx]

new_block = """    score_gate = 4.0 if class_level is not None else 6.0
    near_miss_gate = 2.5 if class_level is not None else 3.5
    if hits and float(hits[0].get("score") or 0.0) >= score_gate:
        node = index.get(hits[0]["node_id"])
        # Subject-class gate from the node's OWN metadata: a question
        # carrying distinctive psychology/accountancy vocabulary is never
        # taught from a node of a disjoint subject.
        q_tags = _subject_marker_hits(question)
        if q_tags:
            n_tags = _NODE_SUBJECT_TAGS.get(
                str((node or {}).get("subject") or "").strip().lower(),
                frozenset())
            if n_tags and not (q_tags & n_tags):
                return None
        definition = str((node or {}).get("definition") or "").strip()
        if node is not None and definition:
            # the question's longest distinctive term must appear in the
            # matched node — topical anchoring, not generic-word noise
            # ('photosynthesis' must be IN the matched node's own text)
            longest = max(terms, key=len) if terms else ''
            # GRADE-MAP P1: inside the asker's own class the anchor floor
            # drops to 4 (the informative-term floor) so short but exact
            # curriculum terms anchor too — "What is a noun?" must reach
            # the Class 6 grammar node.  The global lane keeps >= 6.
            min_anchor = 4 if class_level is not None else 6
            if len(longest) < min_anchor \\
                    or longest not in definition.lower():
                return None
            walkthrough = str(node.get("walkthrough") or "").strip()
            if len(walkthrough) > 900:
                walkthrough = walkthrough[:900].rstrip() + " ..."
            answer = definition + (("\\n\\n" + walkthrough)
                                   if walkthrough else "")
            return _teach_response(
                "enhanced_nodes", answer,
                node_id=node["node_id"],
                # Doubt->Story bridge: the question resolved to a real
                # corpus node, so the answer carries its verified Story
                # Mode deep link (additive field; every other lane --
                # explainer table, misconception catalog, solver --
                # resolves no node and stays exactly as it was).
                story_url=f"/learn/{node['node_id']}/story",
                topic=definition[:120])
    # Near-miss tier: the top hit scored below the teach gate but above
    # the near-miss floor AND is on-grade (class-known) OR subject-anchored.
    # Instead of a hard "I won't guess" we offer "this might be what you
    # mean" with a deep link — the student decides.  Off-grade near-misses
    # (e.g. Class 6 symmetry -> Class 11 psychology) are still refused.
    if hits:
        top = hits[0]
        top_score = float(top.get("score") or 0.0)
        top_node_id = str(top.get("node_id") or "")
        if top_score >= near_miss_gate and top_node_id:
            near_node = index.get(top_node_id)
            if near_node:
                near_def = str(near_node.get("definition") or "").strip()
                if near_def:
                    q_tags = _subject_marker_hits(question)
                    if q_tags:
                        n_tags = _NODE_SUBJECT_TAGS.get(
                            str((near_node or {}).get("subject") or "").strip().lower(),
                            frozenset())
                        if n_tags and not (q_tags & n_tags):
                            pass  # off-grade near-miss — fall through to honest refusal
                        else:
                            return {
                                "teach": False,
                                "verified": False,
                                "label": "NEAR_MISS",
                                "answer": near_def,
                                "steps": [],
                                "refusal_reason": None,
                                "socratic": None,
                                "source": "enhanced_nodes_near_miss",
                                "node_id": top_node_id,
                                "node_title": str(near_node.get("label") or near_def[:80]),
                                "story_url": f"/learn/{top_node_id}/story",
                                "topic": near_def[:120],
                                "near_miss": True,
                                "near_miss_score": top_score,
                                "route": ["ask:near_miss"],
                            }
                    else:
                        # no distinctive subject markers — class-gated check only
                        if class_level is not None:
                            near_cls = int(near_node.get("class_level") or 0)
                            if near_cls == class_level:
                                return {
                                    "teach": False,
                                    "verified": False,
                                    "label": "NEAR_MISS",
                                    "answer": near_def,
                                    "steps": [],
                                    "refusal_reason": None,
                                    "socratic": None,
                                    "source": "enhanced_nodes_near_miss",
                                    "node_id": top_node_id,
                                    "node_title": str(near_node.get("label") or near_def[:80]),
                                    "story_url": f"/learn/{top_node_id}/story",
                                    "topic": near_def[:120],
                                    "near_miss": True,
                                    "near_miss_score": top_score,
                                    "route": ["ask:near_miss"],
                                }
    return None"""

src = src[:idx] + new_block + src[end_idx:]
with open(path, "w", encoding="utf-8") as f:
    f.write(src)

print(f"OK: patched {path}")
print(f"  old block: {len(old_block)} chars")
print(f"  new block: {len(new_block)} chars")
