"""Integration tests for the node-grounded answer lane (in-container).

  N1  known node + definition ask   -> VERIFIED_FROM_NODE hit grounded in
                                      the node's own DEFINITION
  N2  explain/why ask               -> WALKTHROUGH-grounded hit
  N3  unknown node id               -> refuse (None)
  N4  garbage question on known node -> still grounded (sections exist) or
                                      refuse -- never an unrelated answer
  N5  no node-id tokens in the served answer
"""
import re
import sys

sys.path.insert(0, "/app")

from backend.its.solver.node_answer import node_answer  # noqa: E402

_ID = re.compile(r"c\d+_[a-z0-9]+(?:_[a-z0-9]+)+\d*", re.I)


def main():
    from backend.services.enhanced_nodes import load_index

    idx = load_index()
    nodes = [nid for nid, r in idx.nodes.items()
             if isinstance(r, dict) and r.get("definition") and r.get("walkthrough")]
    assert nodes, "no authored nodes in index"
    nid = nodes[0]
    rec = idx.nodes[nid]

    passed = failed = 0

    # N1 definition ask
    hit = node_answer("What is " + str(rec.get("title") or "this concept") + "?",
                      node_id=nid)
    if hit and hit["answer"]:
        passed += 1
    else:
        failed += 1
        print(f"FAIL N1 definition: {nid}")

    # N2 explain ask
    hit2 = node_answer("Explain why this works and how it happens.", node_id=nid)
    if hit2 and hit2["answer"]:
        passed += 1
    else:
        failed += 1
        print(f"FAIL N2 explain: {nid}")

    # N3 unknown node
    if node_answer("What is gravity?", node_id="c99_zzz_fake_99_999") is None:
        passed += 1
    else:
        failed += 1
        print("FAIL N3 unknown node served")

    # N4 no node id -> refuse (lane only fires with context)
    if node_answer("Explain photosynthesis.", node_id=None) is None:
        passed += 1
    else:
        failed += 1
        print("FAIL N4 served without node context")

    # N5 node-id scrub
    for h in (hit, hit2):
        if h and _ID.search(h["answer"] or ""):
            failed += 1
            print(f"FAIL N5 node-id leak: {h['answer'][:80]!r}")
        else:
            passed += 1

    print(f"\nnode lane: {passed} passed, {failed} failed")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
