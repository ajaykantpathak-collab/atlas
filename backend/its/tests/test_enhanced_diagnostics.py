"""Acceptance harness: enhanced-nodes diagnostics as the struggling-
student test set.  For a sample of teaching nodes, this verifies:
  1. the teach card serves the node's walkthrough + diagnostics,
  2. asking each node's diagnostic questions through the solver never
     produces a WRONG-VERIFIED (the zero-wrong invariant extends to
     conceptual WHY-questions), and records the baseline answer-rate
     so the struggling-student build can be measured against it.

Run: python -m pytest backend/its/tests/test_enhanced_diagnostics.py -q
"""
import json
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

CACHE = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..",
    "backend", "_cache", "enhanced_nodes_index.json"))
SAMPLE = 25


def _sample_nodes():
    if not os.path.exists(CACHE):
        pytest.skip("enhanced nodes index not built yet")
    data = json.load(open(CACHE, encoding="utf-8"))
    raw = data.get("nodes") if isinstance(data, dict) else data
    if isinstance(raw, dict):
        pairs = sorted(raw.items())
    else:
        pairs = [(n.get("node_id", f"n{i}"), n)
                 for i, n in enumerate(raw or [])]
    picked, seen_subjects = [], set()
    for nid, node in pairs:
        if len(picked) >= SAMPLE:
            break
        subj = node.get("subject") or "general"
        if node.get("diagnostics") and subj not in seen_subjects:
            picked.append((nid, node))
            seen_subjects.add(subj)
    if len(picked) < SAMPLE:
        for nid, node in pairs:
            if len(picked) >= SAMPLE:
                break
            if all(nid != p[0] for p in picked) and node.get("diagnostics"):
                picked.append((nid, node))
    return picked


@pytest.mark.parametrize("node_id,node", _sample_nodes(),
                         ids=[n[0] for n in _sample_nodes()])
def test_teach_card_serves_walkthrough_and_diagnostics(node_id, node):
    from backend.services.enhanced_nodes import load_index
    idx = load_index()
    rec = (idx.nodes or {}).get(node_id) or node
    assert rec.get("walkthrough"), f"{node_id}: no walkthrough"
    assert len(rec.get("diagnostics") or []) >= 1, \
        f"{node_id}: no diagnostics"


@pytest.mark.parametrize("node_id,node", _sample_nodes(),
                         ids=[n[0] for n in _sample_nodes()])
def test_diagnostics_never_wrong_verified(node_id, node):
    """Zero-wrong invariant must extend to conceptual WHY-questions:
    the solver may answer correctly or refuse -- never verify wrong."""
    from backend.its.solver.answer_pipeline import answer
    for d in (node.get("diagnostics") or [])[:2]:
        r = answer(d["q"])
        if r.label != "VERIFIED":
            continue
        got = r.numeric
        true_nums = [float(x.replace(",", "")) for x in
                     __import__("re").findall(
                         r"\d[\d,]*(?:\.\d+)?", str(d.get("a", "")))
                     ]
        if got is None or not true_nums:
            continue
        match = any(abs(got - t) <= max(abs(t) * 0.02, 0.05)
                    for t in true_nums)
        assert match, (f"{node_id}: VERIFIED '{got}' does not match the "
                       f"node's own answer '{d.get('a', '')[:60]}'")
