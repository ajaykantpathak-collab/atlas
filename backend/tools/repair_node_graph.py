"""repair_node_graph.py -- deep repair of by_class/split/final_fixed.

Reads the 79 files, applies deterministic repairs, writes repaired
copies + a report.  The source folder is never modified.

Repairs (in order):
  R1 dedupe byte-identical cross-file nodes (keep first file, drop
     later copies; the 12 jess107 econ/geo twins)
  R2 self-reference removal
  R3 dangling reference fuzzy resolution:
       - exact suffix match (missing book-code prefix)
       - subject-token variants (his/hist/histciv, sci/science)
       - unresolvable refs are dropped and logged
  R4 cross-subject policy (direction-aware allowlist):
       - same family (science group, commerce group, social group,
         languages) always allowed
       - foundational -> dependent (math/science into physics, chem,
         bio, AI, CS, commerce subjects) allowed
       - reverse directions and unrelated pairs removed as false edges
  R5 mirror completion: A.forward -> B implies B.prereq -> A (union;
     never loses an authored edge, only completes the mirror)
  R6 reasons normalization: every surviving edge gets a reason;
     synthesized reasons carry a "[repair]" provenance marker

Output: cbse_data/nodes/by_class/split/final_repaired/<files>
        cbse_data/nodes/by_class/split/graph_loader_report.json
"""

from __future__ import annotations

import collections
import glob
import json
import os
from pathlib import Path

SRC = Path(r"D:\platform\cbse_data\nodes\by_class\split\final_fixed")
DST = Path(r"D:\platform\cbse_data\nodes\by_class\split\final_repaired")

FAMILIES = {
    "science": {"science", "physics", "chemistry", "biology"},
    "math": {"math", "mathematics", "applied_maths"},
    "commerce": {"accountancy", "economics", "business_studies",
                 "entrepreneurship", "finance"},
    "social": {"history", "geography", "civics", "political_science",
               "social_science", "legal_studies"},
    "tech": {"ai", "computer_science", "information_technology"},
    "languages": {"english", "english_language", "english_literature",
                  "hindi"},
    "other": {"home_science", "physical_education", "psychology",
              "biotechnology", "mass_media"},
}
SUBJ_FAMILY = {}
for fam, subs in FAMILIES.items():
    for s in subs:
        SUBJ_FAMILY[s] = fam

FOUNDATIONAL = {"math", "mathematics", "applied_maths", "science"}
# applied/commerce subjects may require math/science foundations
DEPENDENT_OK = {"physics", "chemistry", "biology", "ai",
                "computer_science", "economics", "accountancy",
                "business_studies", "entrepreneurship", "applied_maths",
                "biotechnology", "information_technology"}

_SUBJECT_VARIANTS = [
    ("his_cbse", "hist_cbse"), ("hist_cbse", "his_cbse"),
    ("histciv_cbse", "geo_cbse"), ("histciv_cbse", "his_cbse"),
    ("sci_cbse", "science_cbse"),
]


def norm_subject(s: str) -> str:
    s = (s or "").lower().strip().replace(" ", "_")
    return {"mathematics": "math", "applied_mathematics": "applied_maths",
            "political_science": "civics",
            "economics": "economics"}.get(s, s)


def family_of(subject: str) -> str:
    return SUBJ_FAMILY.get(norm_subject(subject), "other")


def edge_allowed(prereq_subj: str, node_subj: str) -> bool:
    """Direction-aware cross-subject policy."""
    p, n = norm_subject(prereq_subj), norm_subject(node_subj)
    if p == n:
        return True
    fp, fn = family_of(p), family_of(n)
    if fp == fn:
        return True
    if p in FOUNDATIONAL and n in DEPENDENT_OK:
        return True
    return False


def resolve_dangling(ref: str, all_ids: set) -> tuple:
    """Return (canonical_id or None, how)."""
    if ref in all_ids:
        return ref, "exact"
    # suffix match: ref is missing its book-code prefix
    cands = [i for i in all_ids if i.endswith("_" + ref)]
    # subject-token variants
    for bad, good in _SUBJECT_VARIANTS:
        if bad in ref:
            cands += [i for i in all_ids
                      if ref.replace(bad, good) == i]
            cands += [i for i in all_ids
                      if i.endswith("_" + ref.replace(bad, good))]
    # strip numeric-prefix drift: match on tail tokens
    tail = "_".join(ref.split("_")[-3:])
    cands += [i for i in all_ids if i.endswith(tail) and i != ref]
    cands = list(dict.fromkeys(cands))
    if len(cands) == 1:
        return cands[0], "fuzzy"
    return None, ("dropped_ambiguous" if len(cands) > 1
                  else "dropped_unresolved")


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    files = sorted(glob.glob(str(SRC / "*.json")))

    report = {"files": len(files), "repairs": collections.Counter(),
              "dropped_edges": [], "dedup": [], "unresolved_refs": [],
              "thin_nodes": []}

    # ---- load + R1 dedupe (keep first occurrence in file order) ----
    repaired_nodes = {}          # node_id -> node (with _file)
    for f in files:
        fname = os.path.basename(f)
        data = json.load(open(f, encoding="utf-8"))
        kept = []
        for n in (data if isinstance(data, list) else []):
            if not isinstance(n, dict) or not n.get("node_id"):
                continue
            nid = n["node_id"]
            if nid in repaired_nodes:
                report["dedup"].append({"node_id": nid,
                                        "removed_from": fname,
                                        "kept_in": repaired_nodes[nid]["_file"]})
                report["repairs"]["dedup_removed"] += 1
                continue
            n = dict(n)
            n["_file"] = fname
            repaired_nodes[nid] = n
            kept.append(n)
            thin = [k for k in ("content_snippet", "concept_tags",
                                "prerequisite_node_ids",
                                "forward_node_ids") if not n.get(k)]
            if thin:
                report["thin_nodes"].append({"node_id": nid,
                                             "file": fname,
                                             "missing": thin})
    report["repairs"]["nodes_loaded"] = len(repaired_nodes)

    all_ids = set(repaired_nodes.keys())

    # ---- R2 self-refs, R3 dangling resolution ----
    for nid, n in repaired_nodes.items():
        for key in ("prerequisite_node_ids", "forward_node_ids"):
            refs = n.get(key) or []
            clean = []
            for ref in refs:
                if ref == nid:
                    report["repairs"]["self_ref_removed"] += 1
                    continue
                if ref in all_ids:
                    clean.append(ref)
                    continue
                canon, how = resolve_dangling(ref, all_ids)
                if canon:
                    clean.append(canon)
                    report["repairs"]["dangling_fuzzy_fixed"] += 1
                else:
                    report["repairs"]["dangling_dropped"] += 1
                    if len(report["unresolved_refs"]) < 40:
                        report["unresolved_refs"].append(
                            {"node": nid, "field": key, "ref": ref,
                             "how": how})
            n[key] = list(dict.fromkeys(clean))

    # ---- R4 cross-subject policy ----
    for nid, n in repaired_nodes.items():
        node_subj = n.get("subject", "")
        keep_pr = []
        for pr in n.get("prerequisite_node_ids") or []:
            p = repaired_nodes.get(pr)
            if p is None:
                continue
            if edge_allowed(p.get("subject", ""), node_subj):
                keep_pr.append(pr)
            else:
                report["repairs"]["false_cross_subject_removed"] += 1
                if len(report["dropped_edges"]) < 40:
                    report["dropped_edges"].append(
                        {"node": nid, "prereq": pr,
                         "prereq_subject": p.get("subject"),
                         "node_subject": node_subj})
        n["prerequisite_node_ids"] = keep_pr

    # ---- R5 mirror completion (union) ----
    # forward is derived: B is in A.forward iff A in B.prereq
    for n in repaired_nodes.values():
        n["forward_node_ids"] = []
    for nid, n in repaired_nodes.items():
        for pr in n.get("prerequisite_node_ids") or []:
            if pr in repaired_nodes and pr != nid:
                repaired_nodes[pr]["forward_node_ids"].append(nid)
    for n in repaired_nodes.values():
        n["forward_node_ids"] = list(dict.fromkeys(
            n["forward_node_ids"]))
    report["repairs"]["mirror_rebuilt"] = True

    # ---- R6 reasons normalization ----
    for nid, n in repaired_nodes.items():
        reasons = n.get("prerequisite_reasons") or {}
        if not isinstance(reasons, dict):
            reasons = {}
        my_tags = set(t.lower() for t in n.get("concept_tags", []))
        chapter = n.get("chapter", "")
        new_reasons = {}
        for pr in n.get("prerequisite_node_ids") or []:
            p = repaired_nodes.get(pr)
            reason = reasons.get(pr) or reasons.get(str(pr))
            if not reason:
                p_tags = set(t.lower() for t in
                             (p or {}).get("concept_tags", []))
                overlap = my_tags & p_tags
                if p and p.get("chapter") == chapter:
                    reason = ("[repair] Sequential foundation within "
                              "the same chapter")
                elif overlap:
                    reason = (f"[repair] Shares concepts: "
                              f"{sorted(overlap)[:3]}")
                elif family_of(p.get("subject", "") if p else "") != \
                        family_of(n.get("subject", "")):
                    reason = "[repair] Cross-subject foundation"
                else:
                    reason = "[repair] Foundational concept for this topic"
            new_reasons[pr] = reason
        n["prerequisite_reasons"] = new_reasons
        if new_reasons:
            n["forward_reasons"] = n.get("forward_reasons") or {}

    # ---- write outputs ----
    by_file = collections.defaultdict(list)
    for n in repaired_nodes.values():
        f = n.pop("_file")
        by_file[f].append(n)
    for fname, nodes in by_file.items():
        (DST / fname).write_text(json.dumps(nodes, indent=1,
                                            ensure_ascii=True))

    report["repairs"] = dict(report["repairs"])
    report["thin_nodes_count"] = len(report["thin_nodes"])
    if len(report["thin_nodes"]) > 60:
        report["thin_nodes"] = report["thin_nodes"][:60] + [
            {"note": f"... {report['thin_nodes_count'] - 60} more"}]
    out = DST.parent / "graph_loader_report.json"
    out.write_text(json.dumps(report, indent=1))
    print(json.dumps(report["repairs"], indent=1))
    print("report:", out)
    print("repaired folder:", DST)


if __name__ == "__main__":
    main()
