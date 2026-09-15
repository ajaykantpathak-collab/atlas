"""seed_enhanced_question_bank.py -- enhanced-node diagnostics -> tutor bank.

Converts the enhanced-nodes teaching corpus (diagnostic Q&A pairs with
misconception analysis) into generated-bank files the TutorEngine merge
already understands.  Each node becomes a synthetic concept keyed
"enh:<node_id>" with its 5-6 diagnostics as self-check serve items.
"""
import json
import os
import sys

sys.path.insert(0, r"D:\platform")
from backend.services.enhanced_nodes import load_index

OUT = r"D:\platform\backend\its\questions\generated"


def main():
    index = load_index()
    nodes = getattr(index, "nodes", {}) or {}
    items = nodes.items()
    written = 0
    for node_id, node in items:
        diags = node.get("diagnostics") or []
        if not diags:
            continue
        qs = []
        for d in diags:
            q = d.get("q")
            a = d.get("a")
            if q and a:
                qs.append({"q": q, "a": a, "self_check": True})
        if not qs:
            continue
        cls = node.get("class")
        subj = node.get("subject") or "general"
        try:
            cls = int(cls)
        except (TypeError, ValueError):
            cls = 0
        bank = {
            "catalog": f"enhanced_{node_id}",
            "concepts": [{
                "id": f"enh:{node_id}",
                "title": node.get("title") or node_id,
                "questions": qs,
            }],
        }
        safe = re.sub(r"[^a-zA-Z0-9]+", "_", node_id) if (re := __import__("re")) else node_id
        path = os.path.join(OUT, f"enhanced_{safe}.json")
        json.dump(bank, open(path, "w", encoding="utf-8"), indent=1,
                  ensure_ascii=False)
        written += 1
    print(f"enhanced-node banks written: {written}")


if __name__ == "__main__":
    main()
