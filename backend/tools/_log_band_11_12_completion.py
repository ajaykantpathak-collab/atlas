#!/usr/bin/env python3
"""Merge the band_11_12_completion entry into REF_REPAIR_LOG.json."""
import json
import os

LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "..", "its", "competency", "REF_REPAIR_LOG.json")
CS = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                  "..", "_cache", "band_11_12_repair_changeset.json")

cs = json.load(open(CS, encoding="utf-8"))
spot = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                   "..", "_cache", "spotcheck_10.json"),
                      encoding="utf-8"))

entry = {
    "generated_at": "2026-09-14",
    "agent": "graph-completion band c11_/c12_ (classes 11-12, post red-team)",
    "band": "c11_*/c12_ non-comp node files (6,423 files; _comp companions "
            "excluded per loader contract)",
    "inherited_state_verified": {
        "cycles_scc_gt1": 0,
        "multi_node_scc_nodes": 0,
        "prereq_edges_intra_band": 33033,
        "prereq_edges_cross_band_to_c6_c10": 9115,
        "missing_forward_mirror_intra": 0,
        "orphan_forward_intra": 0,
        "orphan_forward_cross": 0,
        "prereq_edges_without_reason": 0,
        "self_loops": 0,
        "duplicate_list_tokens": 0,
        "note": "The prior red-team agent had already finished the symmetry "
                "repair (0 missing mirrors, 0 orphan forwards found on "
                "verification) and cycle removal before dying; this pass "
                "verified it from md truth rather than redoing it.",
    },
    "repairs_performed": {
        "na_placeholder_cleanup_completed": {
            "files": 5,
            "op": "cleared residual 'N/A — <prose>' LEADS_TO value lines "
                  "(chapter-terminal English nodes; prose never parsed as "
                  "graph ids)",
            "files_list": ["c12_eng_f_cbse_10_015", "c12_eng_f_cbse_13_015",
                           "c12_eng_k_cbse_11_015", "c12_eng_k_cbse_14_015",
                           "c12_eng_v_cbse_06_015"],
        },
        "duplicate_section_surgery": {
            "files": 1,
            "file": "c12_hist_cbse_04_001",
            "op": "removed duplicate first CROSS_SUBJECT_PREREQS ('N/A, N/A') "
                  "+ its leaked generation-reasoning CROSS_SUBJECT_REASONS "
                  "block (1,989 chars, 'wait, this is wrong subject...'); the "
                  "real sections (c9_hist_ch3_8, c7_hist_ch05_001, "
                  "c9_hist_ch3_10) are now the loader-visible first "
                  "occurrence and load as edges",
        },
        "stale_reason_lines_removed": 141,
        "stale_reason_files_touched": 105,
        "stale_reason_kinds": {"nonexistent_id_reason": 121,
                               "literal_none_reason": 20},
        "changeset": "backend/_cache/band_11_12_repair_changeset.json",
        "backup": "backend/_cache/band_11_12_backup_before_completion/ (111 "
                  "pre-repair files)",
    },
    "bulk_operations_note":
        "Residual N/A cleanup and stale reason-line removal (147 line "
        "operations across 111 files) were applied with a byte-safe UTF-8 "
        "section-scoped script (pure whole-line deletions / in-line clears, "
        "no text inserted): every surviving line is byte-identical to before, "
        "CRLF/LF per-file endings and all Devanagari content verified intact, "
        "and the full band was re-parsed and re-verified afterwards.",
    "correctness_spot_check": {
        "method": "10 random intra-band PREREQUISITE_OF edges (seed "
                  "20260914); both nodes' DEFINITION + SCOPE_BOUNDARY read "
                  "by hand; question asked: could the student learn the "
                  "target without the source?",
        "fakes_found": 0,
        "verdict": "10/10 valid, each with an authored mechanism reason; "
                   "weakest edge kept: c12_acc_cbse_03_001 -> "
                   "c11_acc_cbse_01_011 (distant foundational accounting "
                   "equation edge with authored mechanism — same "
                   "keep-convention as the c6-c8 band audit)",
        "sample": [e["edge"] for e in spot],
    },
    "final_metrics": {
        "cycles_scc_gt1": 0,
        "prereq_to_forward_symmetry_pct_intra_band": 100.0,
        "orphan_forward_entries": 0,
        "na_tokens_in_reference_sections": 0,
        "prereq_edges_without_reason": 0,
        "prereq_reason_lines_without_edge": 0,
        "self_loops": 0,
        "dangling_refs": 8243,
    },
    "remaining_risks": [
        "8,243 dangling tokens remain inside LEADS_TO/BUILDS_ON prose "
        "(legacy generation, never parse as graph ids; loader counts them as "
        "skipped). Same documented left-in-place convention as the c6-c8 "
        "band ('loader ignores prose'). Zero dangling ids in "
        "PREREQUISITE_NODE_IDS / FORWARD_NODE_IDS / CROSS_SUBJECT_PREREQS.",
        "9,115 PREREQUISITE_OF edges point from c11/c12 nodes down to c6-c10 "
        "nodes whose files carry no FORWARD mirror; mirroring them would "
        "require editing files outside this band's scope (bands 6-8/9-10 own "
        "those files). Intra-band symmetry, which is what the band can "
        "repair, is 100%.",
        "A generator process was concurrently writing c12_*_comp.md "
        "companions during this pass; comp files carry no reference "
        "sections, enter no graph edges, and were excluded everywhere.",
    ],
}

log = json.load(open(LOG, encoding="utf-8"))
assert "band_11_12_completion" not in log, "key already present"
log["band_11_12_completion"] = entry
json.dump(log, open(LOG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("REF_REPAIR_LOG.json keys:", list(log.keys()))
print("band_11_12_completion written.")
