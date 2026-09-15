"""
Post-process CBSE coverage results.
After all chapters for a grade are done, aggregate results per subject+class:
- A node is "both" (CBSE+CISCE) if ANY chapter covers it
- A node is "CISCE-only" if NO chapter covers it
- Missing nodes from any chapter = new CBSE nodes
- Verification results aggregated across chapters

Then write to Neo4j:
- Update existing nodes: set board = "both" or "CISCE"
- Create new CBSE nodes
- Store verification results
- Store diagrams
"""
import json
from pathlib import Path
from collections import defaultdict
from neo4j import GraphDatabase

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "dream_neo4j_2024"


def aggregate_results(grade):
    """Aggregate all chapter results for a grade, per subject."""
    results = defaultdict(lambda: {
        "covered_nodes": {},  # node_id → {verification, correction, book_ref, chapters}
        "extra_nodes": set(),  # node_ids not covered by any chapter (yet)
        "missing_nodes": {},  # node_id → full node object
        "diagrams": [],
        "chapter_summaries": [],
        "our_nodes_count": 0,
    })

    for result_file in sorted(OUTPUT_DIR.glob("*_result.json")):
        data = json.loads(result_file.read_text(encoding="utf-8"))
        if data.get("grade") != grade:
            continue

        subject = data["subject"]
        subj_data = results[subject]
        subj_data["our_nodes_count"] = data.get("our_nodes_count", 0)

        for chunk in data.get("results", []):
            if "_error" in chunk:
                continue

            # Covered nodes — tag as "both"
            for cov in chunk.get("covered", []):
                nid = cov["node_id"]
                if nid not in subj_data["covered_nodes"]:
                    subj_data["covered_nodes"][nid] = {
                        "board": "both",
                        "verifications": [],
                        "corrections": [],
                        "book_references": [],
                        "chapters": [],
                    }
                v = subj_data["covered_nodes"][nid]
                v["verifications"].append(cov.get("verification", "unknown"))
                if cov.get("correction"):
                    v["corrections"].append(cov["correction"])
                if cov.get("book_reference"):
                    v["book_references"].append(cov["book_reference"])
                v["chapters"].append(data["chapter"])

            # Extra nodes — per-chapter, but we'll resolve after all chapters
            for ext in chunk.get("extra", []):
                if isinstance(ext, dict):
                    subj_data["extra_nodes"].add(ext["node_id"])
                else:
                    subj_data["extra_nodes"].add(ext)

            # Missing nodes — new CBSE nodes
            for miss in chunk.get("missing", []):
                nid = miss["node_id"]
                if nid not in subj_data["missing_nodes"]:
                    subj_data["missing_nodes"][nid] = miss

            # Diagrams
            for diag in chunk.get("diagrams", []):
                diag["_chapter"] = data["chapter"]
                subj_data["diagrams"].append(diag)

            # Summary
            if chunk.get("chapter_summary"):
                subj_data["chapter_summaries"].append({
                    "chapter": data["chapter"],
                    "summary": chunk["chapter_summary"],
                })

    # Now resolve extra nodes: a node is truly CISCE-only if it's in extra
    # but NOT in covered_nodes
    for subject, data in results.items():
        truly_extra = data["extra_nodes"] - set(data["covered_nodes"].keys())
        data["truly_cisce_only"] = truly_extra
        data["both_count"] = len(data["covered_nodes"])
        data["cisce_only_count"] = len(truly_extra)
        data["cbse_new_count"] = len(data["missing_nodes"])
        data["diagram_count"] = len(data["diagrams"])

    return results


def print_summary(results, grade):
    """Print aggregation summary."""
    print(f"\n=== CLASS {grade} AGGREGATED RESULTS ===\n")
    total_both = 0
    total_cisce = 0
    total_cbse = 0
    total_diagrams = 0
    total_verifications = 0
    total_corrections = 0

    for subject in sorted(results.keys()):
        data = results[subject]
        both = data["both_count"]
        cisce = data["cisce_only_count"]
        cbse = data["cbse_new_count"]
        diags = data["diagram_count"]
        corrections = sum(1 for v in data["covered_nodes"].values() if v["corrections"])
        verifications = both

        total_both += both
        total_cisce += cisce
        total_cbse += cbse
        total_diagrams += diags
        total_verifications += verifications
        total_corrections += corrections

        print(f"  {subject}:")
        print(f"    Both (CBSE+CISCE): {both}")
        print(f"    CISCE-only: {cisce}")
        print(f"    New CBSE nodes: {cbse}")
        print(f"    Diagrams: {diags}")
        print(f"    Verifications: {verifications} ({corrections} need correction)")
        print()

    print(f"  TOTALS:")
    print(f"    Both: {total_both}")
    print(f"    CISCE-only: {total_cisce}")
    print(f"    New CBSE: {total_cbse}")
    print(f"    Diagrams: {total_diagrams}")
    print(f"    Verifications: {total_verifications} ({total_corrections} need correction)")


def save_aggregated(results, grade):
    """Save aggregated results to JSON."""
    out = OUTPUT_DIR / f"_aggregated_grade{grade}.json"
    serializable = {}
    for subject, data in results.items():
        serializable[subject] = {
            "both_count": data["both_count"],
            "cisce_only_count": data["cisce_only_count"],
            "cbse_new_count": data["cbse_new_count"],
            "diagram_count": data["diagram_count"],
            "covered_nodes": data["covered_nodes"],
            "truly_cisce_only": list(data["truly_cisce_only"]),
            "missing_nodes": data["missing_nodes"],
            "diagrams": data["diagrams"],
            "chapter_summaries": data["chapter_summaries"],
        }
    out.write_text(json.dumps(serializable, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nAggregated results saved to {out}")


if __name__ == "__main__":
    import sys
    grade = int(sys.argv[1]) if len(sys.argv) > 1 else 12
    results = aggregate_results(grade)
    print_summary(results, grade)
    save_aggregated(results, grade)
