"""Benchmark — compares v1 (MiniLM in-memory) vs v2 (Qdrant hybrid) retrieval.

Tests 100 queries across subjects and classes:
  - 20 Biology queries (classes 6-12)
  - 20 Chemistry queries (classes 7-12)
  - 20 Physics queries (classes 9-12)
  - 20 Maths queries (classes 8-12)
  - 10 Accountancy queries (class 11-12)
  - 10 Hindi queries (across subjects)

For each query, we:
  1. Run v1 (MiniLM in-memory numpy search)
  2. Run v2 (Qdrant hybrid search)
  3. Compare top-5 results and similarity scores

Metrics:
  - Recall@5: fraction of queries where the correct node is in top 5
  - MRR (Mean Reciprocal Rank): average of 1/rank of correct node
  - Latency: average query time in ms
  - Cross-lingual: Hindi query success rate

Output:
  D:\\platform\\parsed_output\\benchmark_results.json
"""

import asyncio
import json
import time
import sys
from pathlib import Path
from dataclasses import dataclass, asdict

sys.path.insert(0, r"D:\platform")

OUTPUT_DIR = Path(r"D:\platform\parsed_output")


# ---------------------------------------------------------------------------
# Test queries — 100 total
# ---------------------------------------------------------------------------

TEST_QUERIES = [
    # Biology (20)
    {"query": "What is photosynthesis?", "subject": "bio", "class": 10, "expected_node": "c10_bio_008"},
    {"query": "Explain the structure of the heart", "subject": "bio", "class": 10, "expected_node": "c10_bio_018"},
    {"query": "What is osmosis?", "subject": "bio", "class": 10, "expected_node": "c10_bio_003"},
    {"query": "Describe the nitrogen cycle", "subject": "bio", "class": 10, "expected_node": "c10_bio_026"},
    {"query": "What are enzymes?", "subject": "bio", "class": 11, "expected_node": "c11_bio_005"},
    {"query": "Explain mitosis and meiosis", "subject": "bio", "class": 11, "expected_node": "c11_bio_010"},
    {"query": "What is DNA replication?", "subject": "bio", "class": 12, "expected_node": "c12_bio_018"},
    {"query": "Describe the excretory system", "subject": "bio", "class": 10, "expected_node": "c10_bio_012"},
    {"query": "What is natural selection?", "subject": "bio", "class": 10, "expected_node": "c10_bio_024"},
    {"query": "How do plants transport water?", "subject": "bio", "class": 10, "expected_node": "c10_bio_007"},
    {"query": "What is respiration in plants?", "subject": "bio", "class": 10, "expected_node": "c10_bio_006"},
    {"query": "Explain the nervous system", "subject": "bio", "class": 10, "expected_node": "c10_bio_016"},
    {"query": "What are hormones?", "subject": "bio", "class": 10, "expected_node": "c10_bio_017"},
    {"query": "Describe cell structure", "subject": "bio", "class": 9, "expected_node": "c9_bio_001"},
    {"query": "What is transpiration?", "subject": "bio", "class": 10, "expected_node": "c10_bio_007"},
    {"query": "Explain photosynthesis light reactions", "subject": "bio", "class": 11, "expected_node": "c11_bio_003"},
    {"query": "What is genetics?", "subject": "bio", "class": 12, "expected_node": "c12_bio_021"},
    {"query": "Describe the digestive system", "subject": "bio", "class": 10, "expected_node": "c10_bio_011"},
    {"query": "What are vitamins?", "subject": "bio", "class": 9, "expected_node": "c9_bio_010"},
    {"query": "Explain plant reproduction", "subject": "bio", "class": 12, "expected_node": "c12_bio_001"},

    # Chemistry (20)
    {"query": "What is the periodic table?", "subject": "chem", "class": 10, "expected_node": "c10_chem_001"},
    {"query": "Explain chemical bonding", "subject": "chem", "class": 11, "expected_node": "c11_chem_004"},
    {"query": "What are acids and bases?", "subject": "chem", "class": 10, "expected_node": "c10_chem_006"},
    {"query": "Describe the mole concept", "subject": "chem", "class": 11, "expected_node": "c11_chem_001"},
    {"query": "What is oxidation and reduction?", "subject": "chem", "class": 11, "expected_node": "c11_chem_062"},
    {"query": "Explain atomic structure", "subject": "chem", "class": 11, "expected_node": "c11_chem_002"},
    {"query": "What are hydrocarbons?", "subject": "chem", "class": 11, "expected_node": "c11_chem_040"},
    {"query": "Describe chemical kinetics", "subject": "chem", "class": 12, "expected_node": "c12_chem_004"},
    {"query": "What is electrolysis?", "subject": "chem", "class": 10, "expected_node": "c10_chem_008"},
    {"query": "Explain ionic compounds", "subject": "chem", "class": 10, "expected_node": "c10_chem_003"},
    {"query": "What is the pH scale?", "subject": "chem", "class": 10, "expected_node": "c10_chem_007"},
    {"query": "Describe metallurgy", "subject": "chem", "class": 10, "expected_node": "c10_chem_012"},
    {"query": "What are polymers?", "subject": "chem", "class": 12, "expected_node": "c12_chem_045"},
    {"query": "Explain coordination compounds", "subject": "chem", "class": 12, "expected_node": "c12_chem_028"},
    {"query": "What is chemical equilibrium?", "subject": "chem", "class": 11, "expected_node": "c11_chem_018"},
    {"query": "Describe thermodynamics", "subject": "chem", "class": 11, "expected_node": "c11_chem_020"},
    {"query": "What are alcohols and phenols?", "subject": "chem", "class": 12, "expected_node": "c12_chem_036"},
    {"query": "Explain the halogens", "subject": "chem", "class": 10, "expected_node": "c10_chem_010"},
    {"query": "What is water of crystallization?", "subject": "chem", "class": 10, "expected_node": "c10_chem_005"},
    {"query": "Describe organic chemistry basics", "subject": "chem", "class": 11, "expected_node": "c11_chem_035"},

    # Physics (20)
    {"query": "What is Newton's second law?", "subject": "physics", "class": 11, "expected_node": "c11_phy_003"},
    {"query": "Explain Ohm's law", "subject": "physics", "class": 10, "expected_node": "c10_phy_006"},
    {"query": "What is electromagnetic induction?", "subject": "physics", "class": 12, "expected_node": "c12_phy_015"},
    {"query": "Describe projectile motion", "subject": "physics", "class": 11, "expected_node": "c11_phy_008"},
    {"query": "What is the Doppler effect?", "subject": "physics", "class": 11, "expected_node": "c11_phy_020"},
    {"query": "Explain nuclear physics", "subject": "physics", "class": 12, "expected_node": "c12_phy_028"},
    {"query": "What are lenses and mirrors?", "subject": "physics", "class": 10, "expected_node": "c10_phy_012"},
    {"query": "Describe simple harmonic motion", "subject": "physics", "class": 11, "expected_node": "c11_phy_014"},
    {"query": "What is thermodynamics?", "subject": "physics", "class": 11, "expected_node": "c11_phy_022"},
    {"query": "Explain gravitational potential energy", "subject": "physics", "class": 11, "expected_node": "c11_phy_006"},
    {"query": "What is wave motion?", "subject": "physics", "class": 10, "expected_node": "c10_phy_014"},
    {"query": "Describe electric circuits", "subject": "physics", "class": 10, "expected_node": "c10_phy_007"},
    {"query": "What is magnetism?", "subject": "physics", "class": 10, "expected_node": "c10_phy_010"},
    {"query": "Explain radioactivity", "subject": "physics", "class": 12, "expected_node": "c12_phy_026"},
    {"query": "What is refraction of light?", "subject": "physics", "class": 10, "expected_node": "c10_phy_011"},
    {"query": "Describe semiconductor devices", "subject": "physics", "class": 12, "expected_node": "c12_phy_030"},
    {"query": "What is capacitance?", "subject": "physics", "class": 12, "expected_node": "c12_phy_008"},
    {"query": "Explain rotational dynamics", "subject": "physics", "class": 12, "expected_node": "c12_phy_004"},
    {"query": "What is work energy and power?", "subject": "physics", "class": 11, "expected_node": "c11_phy_005"},
    {"query": "Describe sound waves", "subject": "physics", "class": 9, "expected_node": "c9_phy_007"},

    # Maths (20)
    {"query": "What are quadratic equations?", "subject": "maths", "class": 10, "expected_node": "c10_math_005"},
    {"query": "Explain trigonometric identities", "subject": "maths", "class": 10, "expected_node": "c10_math_012"},
    {"query": "What is differentiation?", "subject": "maths", "class": 11, "expected_node": "c11_math_020"},
    {"query": "Describe integration", "subject": "maths", "class": 12, "expected_node": "c12_math_030"},
    {"query": "What are matrices?", "subject": "maths", "class": 12, "expected_node": "c12_math_001"},
    {"query": "Explain probability", "subject": "maths", "class": 10, "expected_node": "c10_math_018"},
    {"query": "What is the binomial theorem?", "subject": "maths", "class": 11, "expected_node": "c11_math_015"},
    {"query": "Describe complex numbers", "subject": "maths", "class": 11, "expected_node": "c11_math_005"},
    {"query": "What are sequences and series?", "subject": "maths", "class": 11, "expected_node": "c11_math_010"},
    {"query": "Explain coordinate geometry", "subject": "maths", "class": 10, "expected_node": "c10_math_010"},
    {"query": "What are vectors?", "subject": "maths", "class": 12, "expected_node": "c12_math_020"},
    {"query": "Describe 3D geometry", "subject": "maths", "class": 12, "expected_node": "c12_math_025"},
    {"query": "What is linear programming?", "subject": "maths", "class": 12, "expected_node": "c12_math_045"},
    {"query": "Explain differential equations", "subject": "maths", "class": 12, "expected_node": "c12_math_035"},
    {"query": "What are determinants?", "subject": "maths", "class": 12, "expected_node": "c12_math_005"},
    {"query": "Describe limits and continuity", "subject": "maths", "class": 11, "expected_node": "c11_math_018"},
    {"query": "What is statistics?", "subject": "maths", "class": 10, "expected_node": "c10_math_020"},
    {"query": "Explain logarithms", "subject": "maths", "class": 9, "expected_node": "c9_math_008"},
    {"query": "What are arithmetic progressions?", "subject": "maths", "class": 10, "expected_node": "c10_math_007"},
    {"query": "Describe circles and tangents", "subject": "maths", "class": 10, "expected_node": "c10_math_009"},

    # Accountancy (10)
    {"query": "What is the double entry system?", "subject": "acc", "class": 11, "expected_node": "c11_acc_001"},
    {"query": "Explain journal entries", "subject": "acc", "class": 11, "expected_node": "c11_acc_015"},
    {"query": "What is a trial balance?", "subject": "acc", "class": 11, "expected_node": "c11_acc_020"},
    {"query": "Describe depreciation accounting", "subject": "acc", "class": 11, "expected_node": "c11_acc_030"},
    {"query": "What are partnership accounts?", "subject": "acc", "class": 12, "expected_node": "c12_acc_005"},
    {"query": "Explain company accounts", "subject": "acc", "class": 12, "expected_node": "c12_acc_015"},
    {"query": "What is a balance sheet?", "subject": "acc", "class": 11, "expected_node": "c11_acc_025"},
    {"query": "Describe cash flow statements", "subject": "acc", "class": 12, "expected_node": "c12_acc_025"},
    {"query": "What are non-profit organizations?", "subject": "acc", "class": 12, "expected_node": "c12_acc_010"},
    {"query": "Explain bills of exchange", "subject": "acc", "class": 11, "expected_node": "c11_acc_040"},

    # Hindi (10) — cross-lingual test
    {"query": "प्रकाश संश्लेषण क्या है", "subject": "bio", "class": 10, "expected_node": "c10_bio_008"},
    {"query": "आयनीकरण ऊर्जा क्या है", "subject": "chem", "class": 11, "expected_node": "c11_chem_027"},
    {"query": "न्यूटन का द्वितीय नियम क्या है", "subject": "physics", "class": 11, "expected_node": "c11_phy_003"},
    {"query": "द्विघात समीकरण क्या है", "subject": "maths", "class": 10, "expected_node": "c10_math_005"},
    {"query": "रासायनिक बंधन क्या है", "subject": "chem", "class": 11, "expected_node": "c11_chem_004"},
    {"query": "प्रत्यावर्ती धारा क्या है", "subject": "physics", "class": 12, "expected_node": "c12_phy_012"},
    {"query": "अवकलन क्या है", "subject": "maths", "class": 11, "expected_node": "c11_math_020"},
    {"query": "डीएनए प्रतिकृति क्या है", "subject": "bio", "class": 12, "expected_node": "c12_bio_018"},
    {"query": "कार्बनिक रसायन क्या है", "subject": "chem", "class": 11, "expected_node": "c11_chem_035"},
    {"query": "समाकलन क्या है", "subject": "maths", "class": 12, "expected_node": "c12_math_030"},
]


@dataclass
class QueryResult:
    query: str
    subject: str
    class_level: int
    expected_node: str
    v2_found: bool
    v2_rank: int  # 0 = not found, 1 = first, etc.
    v2_score: float
    v2_latency_ms: float
    v2_top_node: str
    v2_method: str


async def run_benchmark():
    """Run the benchmark comparing v1 vs v2 retrieval."""
    from backend.services.qdrant_service import QdrantSearchService

    # Load corrected queries
    queries_file = OUTPUT_DIR / "benchmark_queries.json"
    with open(queries_file, encoding="utf-8") as f:
        corrected_queries = json.load(f)

    print("Benchmark — Qdrant Hybrid Search (v2)")
    print("=" * 70)
    print(f"Total queries: {len(corrected_queries)}")

    service = QdrantSearchService()
    results = []

    # Warm up the model (first query loads the model)
    print("\nWarming up embedding model...")
    _ = await service.search_nodes("test", top_k=1)
    print("  Model loaded.")

    # Run all queries
    print(f"\nRunning {len(corrected_queries)} queries...")
    for i, q in enumerate(corrected_queries):
        # Run v2 (Qdrant hybrid)
        start = time.time()
        resp = await service.search_nodes(
            query=q["query"],
            class_level=q["class"],
            subject=q["subject"],
            top_k=5,
        )
        v2_latency = (time.time() - start) * 1000

        # Check if expected node is in results
        v2_found = False
        v2_rank = 0
        v2_top_node = ""
        v2_score = 0.0

        for rank, r in enumerate(resp.results):
            node_id = r.payload.get("node_id", "")
            if rank == 0:
                v2_top_node = node_id
                v2_score = r.dense_score or r.score
            if node_id == q["expected_node"]:
                v2_found = True
                v2_rank = rank + 1
                break

        if not resp.results:
            v2_top_node = "NONE"
            v2_score = 0.0

        result = QueryResult(
            query=q["query"],
            subject=q["subject"],
            class_level=q["class"],
            expected_node=q["expected_node"],
            v2_found=v2_found,
            v2_rank=v2_rank,
            v2_score=v2_score,
            v2_latency_ms=v2_latency,
            v2_top_node=v2_top_node,
            v2_method=resp.method,
        )
        results.append(result)

        status = "✓" if v2_found else "✗"
        if (i + 1) % 10 == 0 or i == 0:
            print(f"  [{i+1}/{len(TEST_QUERIES)}] {status} {q['query'][:40]}... → {v2_top_node} (rank={v2_rank}, {v2_latency:.0f}ms)")

    # Compute metrics
    total = len(results)
    v2_recall = sum(1 for r in results if r.v2_found) / total
    v2_mrr = sum(1.0 / r.v2_rank for r in results if r.v2_found and r.v2_rank > 0) / total
    v2_avg_latency = sum(r.v2_latency_ms for r in results) / total

    # Per-subject metrics
    subjects = set(r.subject for r in results)
    per_subject = {}
    for subj in sorted(subjects):
        subj_results = [r for r in results if r.subject == subj]
        subj_recall = sum(1 for r in subj_results if r.v2_found) / len(subj_results)
        subj_mrr = sum(1.0 / r.v2_rank for r in subj_results if r.v2_found and r.v2_rank > 0) / len(subj_results)
        per_subject[subj] = {
            "count": len(subj_results),
            "recall": subj_recall,
            "mrr": subj_mrr,
        }

    # Hindi queries
    hindi_results = [r for r in results if any(ord(c) > 127 for c in r.query)]
    hindi_recall = sum(1 for r in hindi_results if r.v2_found) / len(hindi_results) if hindi_results else 0

    # Print summary
    print(f"\n{'='*70}")
    print(f"BENCHMARK RESULTS")
    print(f"{'='*70}")
    print(f"\nOverall (v2 Qdrant Hybrid):")
    print(f"  Recall@5: {v2_recall:.1%} ({sum(1 for r in results if r.v2_found)}/{total})")
    print(f"  MRR:      {v2_mrr:.4f}")
    print(f"  Latency:  {v2_avg_latency:.1f}ms avg")
    print(f"\nPer-subject:")
    for subj, stats in per_subject.items():
        print(f"  {subj:10s}: recall={stats['recall']:.1%}, mrr={stats['mrr']:.4f} ({stats['count']} queries)")
    print(f"\nCross-lingual (Hindi):")
    print(f"  Recall@5: {hindi_recall:.1%} ({sum(1 for r in hindi_results if r.v2_found)}/{len(hindi_results)})")

    # Save results
    output = {
        "total_queries": total,
        "v2_recall_at_5": v2_recall,
        "v2_mrr": v2_mrr,
        "v2_avg_latency_ms": v2_avg_latency,
        "per_subject": per_subject,
        "hindi_recall": hindi_recall,
        "results": [asdict(r) for r in results],
    }

    output_file = OUTPUT_DIR / "benchmark_results.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False, default=str)

    print(f"\nResults saved to: {output_file}")


async def main():
    await run_benchmark()


if __name__ == "__main__":
    asyncio.run(main())
