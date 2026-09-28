"""
Phase 2: Prerequisite & Cross-Subject Reconciliation
=====================================================
After Phase 1 generates all CBSE nodes, this script:

1. Collects ALL generated CBSE nodes into a master index
   (node_id → topic, subject, class_level, content_snippet)

2. Sends the index to Claude in batches (per subject, all classes)
   Claude gets: all node IDs + topics for one subject across all classes
   Claude returns: properly mapped prerequisites, cross-class links, depth, reasons

3. For cross-subject links: send nodes from related subjects together
   (e.g. physics + maths, chemistry + physics, biology + chemistry)

4. Updates the node JSON files with corrected prerequisite/forward/cross-subject IDs

Usage:
  python cbse_phase2_reconcile.py --dry-run          # show plan
  python cbse_phase2_reconcile.py --subject physics   # one subject
  python cbse_phase2_reconcile.py                     # all subjects
"""
import asyncio
import aiohttp
import json
import ssl
import re
import os
import argparse
from pathlib import Path
from collections import defaultdict

# === CONFIG (same as Phase 1) ===
API_KEY = os.environ.get("CLAUDE_API_KEY", "<redacted>")
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
MAX_TOKENS = 128000

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
PHASE2_DIR = Path(r"D:\platform\cbse_coverage_output\phase2")
PHASE2_DIR.mkdir(parents=True, exist_ok=True)

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

WORKERS = 10


def collect_all_nodes():
    """Collect all CBSE nodes from Phase 1 results into a master index."""
    all_nodes = []
    by_subject = defaultdict(list)

    for f in sorted(OUTPUT_DIR.glob("*_result.json")):
        data = json.loads(f.read_text(encoding="utf-8"))
        subject = data["subject"]
        grade = data["grade"]
        chapter = data["chapter"]

        for chunk in data.get("results", []):
            if "_error" in chunk:
                continue
            for node in chunk.get("nodes", []):
                node["_chapter_source"] = chapter
                all_nodes.append(node)
                by_subject[subject].append(node)

    return all_nodes, by_subject


def build_node_index(nodes):
    """Build compact index: node_id | topic | class | content_snippet (truncated)."""
    lines = []
    for n in nodes:
        nid = n.get("node_id", "?")
        topic = n.get("topic", "?")[:80]
        cls = n.get("class_level", "?")
        snippet = n.get("content_snippet", "")[:100]
        lines.append(f"  {nid} | C{cls} | {topic} | {snippet}")
    return "\n".join(lines)


async def call_claude(session, prompt, system_prompt=None, retries=3):
    """Call Claude API async."""
    body = {
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "messages": [{"role": "user", "content": prompt}],
    }
    if system_prompt:
        body["system"] = system_prompt

    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
    }

    for attempt in range(retries):
        try:
            async with session.post(API_URL, json=body, headers=headers, ssl=CTX,
                                     timeout=aiohttp.ClientTimeout(total=600)) as resp:
                data = await resp.json()
                if resp.status == 200:
                    for block in data.get("content", []):
                        if block["type"] == "text":
                            return block["text"]
                    return ""
                else:
                    print(f"    API error {resp.status}: {str(data)[:200]}")
                    await asyncio.sleep(15 * (attempt + 1))
        except Exception as e:
            print(f"    retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


def build_phase2_prompt(subject, subject_nodes, all_subjects_index):
    """Build prompt for Phase 2: reconcile prerequisites for one subject across all classes."""
    # This subject's nodes (all classes)
    my_nodes_text = build_node_index(subject_nodes)

    # Other subjects' node IDs + topics (for cross-subject matching)
    # Only include subjects that might have genuine cross-subject links
    related_subjects = {
        "physics": ["maths", "chemistry"],
        "chemistry": ["physics", "maths", "biology"],
        "biology": ["chemistry", "biotech"],
        "maths": ["physics", "computer_science"],
        "computer_science": ["maths"],
        "biotech": ["biology", "chemistry"],
        "accounts": ["maths", "economics", "business_studies"],
        "economics": ["maths", "accounts"],
        "business_studies": ["accounts", "economics"],
        "geography": ["hist", "economics", "political_science"],
        "hist": ["geography", "political_science", "sociology"],
        "political_science": ["hist", "sociology"],
        "psychology": ["biology", "sociology"],
        "sociology": ["political_science", "psychology", "hist"],
        "home_science": ["biology", "chemistry"],
    }

    related = related_subjects.get(subject, [])
    other_index = ""
    for subj, nodes in all_subjects_index.items():
        if subj == subject or subj not in related:
            continue
        # Just node IDs + topics for cross-subject matching
        other_index += f"\n--- {subj} ---\n"
        other_index += build_node_index(nodes[:200])  # limit to avoid token overflow
        other_index += "\n"

    return f"""You are an educational curriculum expert. I have a set of CBSE curriculum nodes
for {subject} across all classes (1-12). I need you to properly map:

1. CROSS-CHAPTER PREREQUISITES: Which nodes in earlier chapters are prerequisites for nodes in later chapters?
2. CROSS-CLASS PREREQUISITES: Which nodes in earlier classes (e.g. class 10) are prerequisites for nodes in later classes (e.g. class 12)?
3. CROSS-SUBJECT LINKS: Which nodes from OTHER subjects are genuine prerequisites for nodes in this subject?
4. DEPTH: For each node, specify the teaching depth (what to cover, what to skip, level of detail)
5. FORWARD LINKS: What downstream nodes does each node enable?

HERE ARE ALL {subject.upper()} NODES (all classes):
{my_nodes_text}

NODES FROM RELATED SUBJECTS (for cross-subject matching):
{other_index}

For each node, return its mapped prerequisites and links. Return a JSON array:
[
  {{
    "node_id": "c12_phy_cbse_001",
    "prerequisite_node_ids": ["c11_phy_cbse_045", "c12_phy_cbse_000"],
    "prerequisite_reasons": {{
      "c11_phy_cbse_045": "Student needs understanding of electrostatic fields from Class 11 before studying electric charges in Class 12",
      "c12_phy_cbse_000": "Basic charge properties must be understood before quantisation and conservation"
    }},
    "forward_node_ids": ["c12_phy_cbse_003", "c12_phy_cbse_006"],
    "forward_reasons": {{
      "c12_phy_cbse_003": "Coulomb's law builds on charge concept to describe inter-charge forces",
      "c12_phy_cbse_006": "Electric field concept extends charge to field effects in space"
    }},
    "cross_subject_prereqs": ["c11_math_cbse_020"],
    "cross_subject_reasons": {{
      "c11_math_cbse_020": "Vector addition from Class 11 Maths is needed to calculate net force using superposition principle"
    }},
    "depth": "intermediate",
    "scope_constraints": ["Teach: types of charges, quantisation, conservation", "Skip: quark-level charge structure", "Level: conceptual + numerical"]
  }}
]

RULES:
- Only map prerequisites that are GENUINE conceptual dependencies — if node A is truly needed before understanding node B
- Use REAL node IDs from the lists above. Do NOT invent node IDs.
- Each prerequisite MUST have a specific reason explaining the conceptual dependency
- Do NOT use templated reasons like "provides foundation" or "is essential for"
- Cross-subject links only when there is a genuine dependency (e.g. Physics needs Maths vectors, Chemistry needs Physics atomic structure)
- If a node has no genuine prerequisites, set is_root=true and leave arrays empty
- depth: "basic" | "intermediate" | "advanced"
- scope_constraints: specific to this topic — what to teach, what to skip, what level
- Return ONLY the JSON array, no other text"""


async def process_subject(session, subject, subject_nodes, all_subjects_index, semaphore, dry_run=False):
    """Process one subject: reconcile all prerequisites."""
    async with semaphore:
        print(f"  [{subject}] {len(subject_nodes)} nodes across all classes...")

        if dry_run:
            return {"subject": subject, "node_count": len(subject_nodes)}

        # Check if too many nodes for one call — split by class if needed
        # Estimate: each node ~200 chars in index, 128K tokens = 512K chars
        # So ~2500 nodes max per call
        if len(subject_nodes) > 2500:
            # Split by class
            by_class = defaultdict(list)
            for n in subject_nodes:
                by_class[n.get("class_level", 0)].append(n)

            all_results = []
            for cls in sorted(by_class.keys()):
                cls_nodes = by_class[cls]
                print(f"    Class {cls}: {len(cls_nodes)} nodes")
                prompt = build_phase2_prompt(f"{subject} (class {cls})", cls_nodes, all_subjects_index)
                response = await call_claude(session, prompt)
                if response:
                    try:
                        clean = re.sub(r'^```json\s*', '', response.strip())
                        clean = re.sub(r'\s*```\s*$', '', clean)
                        result = json.loads(clean)
                        all_results.extend(result)
                        print(f"    ✓ Class {cls} done")
                    except json.JSONDecodeError as e:
                        print(f"    ✗ JSON error for class {cls}: {e}")
                        (PHASE2_DIR / f"{subject}_class{cls}_raw.txt").write_text(response, encoding="utf-8")
        else:
            prompt = build_phase2_prompt(subject, subject_nodes, all_subjects_index)
            response = await call_claude(session, prompt)
            all_results = []
            if response:
                try:
                    clean = re.sub(r'^```json\s*', '', response.strip())
                    clean = re.sub(r'\s*```\s*$', '', clean)
                    all_results = json.loads(clean)
                    print(f"    ✓ {subject} done ({len(all_results)} mappings)")
                except json.JSONDecodeError as e:
                    print(f"    ✗ JSON error: {e}")
                    (PHASE2_DIR / f"{subject}_raw.txt").write_text(response, encoding="utf-8")

        # Save results
        out_path = PHASE2_DIR / f"{subject}_reconciled.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump({
                "subject": subject,
                "node_count": len(subject_nodes),
                "mappings": all_results,
            }, f, indent=2, ensure_ascii=False)

        return {"subject": subject, "node_count": len(subject_nodes), "mappings": len(all_results)}


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--subject", type=str, default="", help="Process specific subject only")
    parser.add_argument("--dry-run", action="store_true", help="Show plan without calling API")
    parser.add_argument("--workers", type=int, default=WORKERS, help="Parallel workers")
    args = parser.parse_args()

    print(f"\n=== PHASE 2: PREREQUISITE RECONCILIATION ===")
    print(f"Workers: {args.workers}")
    print(f"Dry run: {args.dry_run}")
    print()

    # Collect all nodes from Phase 1
    print("Collecting all Phase 1 nodes...")
    all_nodes, by_subject = collect_all_nodes()
    print(f"Total nodes: {len(all_nodes)}")
    print(f"Subjects: {len(by_subject)}")

    print("\n=== NODES BY SUBJECT ===")
    for subj in sorted(by_subject.keys()):
        nodes = by_subject[subj]
        classes = sorted(set(n.get("class_level", 0) for n in nodes))
        print(f"  {subj}: {len(nodes)} nodes (classes {classes})")

    # Filter by subject if specified
    subjects_to_process = by_subject
    if args.subject:
        subjects_to_process = {k: v for k, v in by_subject.items() if args.subject.lower() in k.lower()}
        print(f"\nFiltered to: {list(subjects_to_process.keys())}")

    if args.dry_run:
        print("\n=== DRY RUN ===")
        for subj, nodes in subjects_to_process.items():
            print(f"  {subj}: {len(nodes)} nodes → 1 Claude call")
        return

    print(f"\n=== STARTING ({len(subjects_to_process)} subjects, {args.workers} workers) ===")

    semaphore = asyncio.Semaphore(args.workers)
    connector = aiohttp.TCPConnector(ssl=CTX, limit=args.workers)

    async with aiohttp.ClientSession(connector=connector) as session:
        tasks = [
            process_subject(session, subj, nodes, by_subject, semaphore, args.dry_run)
            for subj, nodes in subjects_to_process.items()
        ]
        results = await asyncio.gather(*tasks)

    print(f"\n=== SUMMARY ===")
    for r in results:
        if r:
            mappings = r.get("mappings", "?")
            print(f"  {r['subject']}: {r['node_count']} nodes, {mappings} mappings")

    print(f"\nResults saved to: {PHASE2_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
