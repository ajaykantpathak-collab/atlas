"""
Categorize ALL subjects in one go (per subject, all classes).
For each subject: send all CBSE + all CISCE nodes → get BOTH, CBSE_ONLY, CISCE_ONLY.
"""
import asyncio
import aiohttp
import ssl
import json
import re
from pathlib import Path
from collections import defaultdict

API_KEYS = [
    "sk-ant-co-QsK1rhxdfRWZ65OJ5cVxaAZ5ISNUY0lK",
    "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna",
]
API_URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-5"
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
CISCE_INDEX = Path(r"D:\platform\content\index\node_index.json")
OUTPUT_DIR = Path(r"D:\platform\cisce_merge_output")
OUTPUT_DIR.mkdir(exist_ok=True)

# Subject name mapping CBSE ↔ CISCE
SUBJECT_MAP = {
    "maths": ["maths", "appmath"],
    "physics": ["physics"],
    "chemistry": ["chemistry"],
    "biology": ["biology", "biotech"],
    "english": ["english"],
    "hindi": ["hindi"],
    "history_civics": ["histciv", "hist", "history_civics"],
    "geography": ["geo", "geography"],
    "economics": ["econ", "economics", "econapp"],
    "accounts": ["acc", "accounts"],
    "business_studies": ["bs", "comm", "commstud", "commapp", "business_studies"],
    "computer_science": ["cs", "computer_science"],
    "psychology": ["psy", "psychology"],
    "sociology": ["soc", "sociology"],
    "political_science": ["pol", "political_science"],
    "home_science": ["home", "home_science"],
    "legal_studies": ["legal", "legal_studies"],
    "science": ["sci", "science", "evs"],
    "ai": ["ai"],
    "applied_maths": ["appmath"],
    "biotech": ["biotech"],
    "massmedia": ["massmedia"],
}

# Concurrency
CONCURRENCY = 10
semaphore = asyncio.Semaphore(CONCURRENCY)
import time


def load_cbse_nodes():
    """Load all CBSE nodes grouped by subject."""
    by_subject = defaultdict(list)
    for result_file in CBSE_OUTPUT.glob("*_result.json"):
        if result_file.stat().st_size < 500:
            continue
        try:
            data = json.loads(result_file.read_text(encoding="utf-8"))
            subject = data.get("subject", "unknown")
            for chunk in data.get("results", []):
                for node in chunk.get("nodes", []):
                    by_subject[subject].append({
                        "node_id": node.get("node_id", ""),
                        "topic": node.get("topic", ""),
                        "class_level": node.get("class_level", "?"),
                    })
        except:
            pass
    return by_subject


def load_cisce_nodes():
    """Load all CISCE nodes grouped by subject."""
    data = json.loads(CISCE_INDEX.read_text(encoding="utf-8"))
    by_subject = defaultdict(list)
    for item in data:
        subj = item.get("subject", "unknown")
        cls = item.get("class", "?")
        if isinstance(cls, int) and cls >= 6:
            by_subject[subj].append({
                "node_id": item.get("node_id", ""),
                "title": item.get("title", ""),
                "class": cls,
                "syllabus": item.get("syllabus", "")[:150],
            })
    return by_subject


def build_prompt(cbse_nodes, cisce_nodes, subject):
    cbse_list = []
    for n in cbse_nodes:
        cbse_list.append(f"{n['node_id']} | c{n['class_level']} | {n['topic']}")
    cbse_text = "\n".join(cbse_list)

    cisce_list = []
    for n in cisce_nodes:
        cisce_list.append(f"{n['node_id']} | c{n['class']} | {n['title']}\n  {n['syllabus']}")
    cisce_text = "\n".join(cisce_list)

    return f"""You are comparing CBSE and CISCE curricula for {subject} (classes 6-12).

CBSE has {len(cbse_nodes)} granular atomic nodes.
CISCE has {len(cisce_nodes)} nodes.

TASK: Categorize EVERY node into exactly ONE of three categories.
Match by concept across class boundaries.

Output THREE sections — JUST LISTS OF IDs, no mappings:

## BOTH
CBSE node IDs that have a CISCE equivalent (same concept exists in CISCE).
One node_id per line. Only CBSE IDs here.

## CBSE_ONLY
CBSE node IDs that have NO CISCE equivalent (concept not taught in CISCE at all).
One node_id per line.

## CISCE_ONLY
CISCE node IDs that have NO CBSE equivalent (concept not taught in CBSE at all).
One node_id per line.

Rules:
- Match by concept, not exact wording
- Match across class boundaries (CISCE class 8 can match CBSE class 7)
- Be generous: substantially same concept = BOTH
- Every CBSE node goes in EITHER BOTH or CBSE_ONLY
- Every CISCE node goes in EITHER BOTH (if its concept is in CBSE) or CISCE_ONLY
- In BOTH section: list the CBSE node IDs that have a matching CISCE concept
- In CISCE_ONLY: list CISCE node IDs with no CBSE match
- Keep output COMPACT — just IDs, one per line, no explanations

CBSE {subject.upper()} NODES ({len(cbse_nodes)}):
{cbse_text}

CISCE {subject.upper()} NODES ({len(cisce_nodes)}):
{cisce_text}
"""


async def call_claude(session, prompt, retries=5):
    body = {"model": MODEL, "max_tokens": 128000,
            "messages": [{"role": "user", "content": prompt}]}
    for attempt in range(retries):
        # Use key 1 (key 0 is rate-limited), fall back to key 0
        key = API_KEYS[1] if attempt % 2 == 0 else API_KEYS[0]
        headers = {"x-api-key": key, "Content-Type": "application/json",
                   "anthropic-version": "2023-06-01"}
        try:
            async with session.post(API_URL, json=body, headers=headers, ssl=CTX,
                                     timeout=aiohttp.ClientTimeout(total=900)) as resp:
                data = await resp.json()
                if resp.status == 200:
                    text = ""
                    for block in data.get("content", []):
                        if block["type"] == "text":
                            text = block["text"]
                            break
                    if text.strip():
                        if "rate limit" in text.lower():
                            print(f"      rate limit on key {'1' if attempt % 2 == 0 else '0'}, switching")
                            await asyncio.sleep(30 * (attempt + 1))
                            continue
                        return text
                    await asyncio.sleep(30 * (attempt + 1))
                elif resp.status == 429:
                    print(f"      429 on key {'1' if attempt % 2 == 0 else '0'}, switching key")
                    await asyncio.sleep(15 * (attempt + 1))
                else:
                    print(f"      error {resp.status}: {str(data)[:200]}")
                    await asyncio.sleep(15 * (attempt + 1))
        except Exception as e:
            print(f"      retry {attempt+1}: {str(e)[:150]}")
            await asyncio.sleep(15 * (attempt + 1))
    return None


def parse_response(text):
    section = None
    both = []
    cbse_only = []
    cisce_only = []

    for line in text.split("\n"):
        line = line.strip()
        if line == "## BOTH":
            section = "both"
            continue
        elif line == "## CBSE_ONLY":
            section = "cbse_only"
            continue
        elif line == "## CISCE_ONLY":
            section = "cisce_only"
            continue
        if line.startswith("```") or not line:
            continue

        if section == "both" and re.match(r'c\d+', line):
            # CBSE node IDs that have CISCE equivalent
            both.append(line)
        elif section == "cbse_only" and re.match(r'c\d+', line):
            cbse_only.append(line)
        elif section == "cisce_only" and re.match(r'c\d+', line):
            cisce_only.append(line)

    return {"both": both, "cbse_only": cbse_only, "cisce_only": cisce_only}


async def process_subject(session, subject, cbse_nodes, cisce_nodes):
    async with semaphore:
        safe = subject.replace(" ", "_").replace("/", "_")
        print(f"\n  [{subject}] CBSE={len(cbse_nodes)}, CISCE={len(cisce_nodes)}")

        prompt = build_prompt(cbse_nodes, cisce_nodes, subject)
        print(f"    prompt: {len(prompt)} chars (~{len(prompt)//4} tokens)")

        response = await call_claude(session, prompt)
        if not response:
            print(f"    ✗ no response")
            return None

        # Save raw markdown
        (OUTPUT_DIR / f"{safe}_categorization.md").write_text(response, encoding="utf-8")

        # Parse
        parsed = parse_response(response)
        print(f"    ✓ both={len(parsed['both'])}, cbse_only={len(parsed['cbse_only'])}, cisce_only={len(parsed['cisce_only'])}")
        return {"both_count": len(parsed["both"]), "cbse_only_count": len(parsed["cbse_only"]), "cisce_only_count": len(parsed["cisce_only"])}


async def main():
    print("=== FULL CATEGORIZATION — ALL SUBJECTS ===\n")

    # Load all nodes
    print("Loading CBSE nodes...")
    cbse_by_subj = load_cbse_nodes()
    total_cbse = sum(len(v) for v in cbse_by_subj.values())
    print(f"  Total CBSE: {total_cbse} nodes across {len(cbse_by_subj)} subjects")

    print("Loading CISCE nodes...")
    cisce_by_subj = load_cisce_nodes()
    total_cisce = sum(len(v) for v in cisce_by_subj.values())
    print(f"  Total CISCE: {total_cisce} nodes across {len(cisce_by_subj)} subjects")

    # Build subject pairs — match CBSE subjects to CISCE subjects
    # For each CBSE subject, find matching CISCE subjects
    subjects_to_process = []

    # Skip subjects that won't match (language/literature subjects)
    SKIP_SUBJECTS = {"English Literature", "Hindi", "english", "hindi"}
    # Only rerun subjects that failed or were truncated
    RERUN_ONLY = {"maths", "economics", "physics"}

    for cbse_subj, cbse_nodes in cbse_by_subj.items():
        if cbse_subj in SKIP_SUBJECTS:
            print(f"  [{cbse_subj}] skipped — language subject, no cross-board concept matching")
            continue
        if RERUN_ONLY and cbse_subj not in RERUN_ONLY:
            continue
        # Find matching CISCE subjects
        cisce_subj_keys = SUBJECT_MAP.get(cbse_subj, [cbse_subj])
        cisce_nodes = []
        for ck in cisce_subj_keys:
            cisce_nodes.extend(cisce_by_subj.get(ck, []))

        if cisce_nodes:
            subjects_to_process.append((cbse_subj, cbse_nodes, cisce_nodes))
        else:
            # No CISCE equivalent — all CBSE nodes are CBSE-only
            print(f"  [{cbse_subj}] CBSE={len(cbse_nodes)}, CISCE=0 → all CBSE-only")

    print(f"\nSubjects to process: {len(subjects_to_process)}")
    print(f"Concurrency: {CONCURRENCY}, 3s gap between launches")

    session_holder = [None]
    all_configs = [(s, cn, csn) for s, cn, csn in subjects_to_process]

    results = []
    pending = set()

    async with aiohttp.ClientSession() as session:
        session_holder[0] = session
        for idx, (subj, cbse_n, cisce_n) in enumerate(all_configs):
            # Wait if at concurrency limit
            while len(pending) >= CONCURRENCY:
                done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
                for d in done:
                    results.append(d.result())

            # Launch with 3s gap
            task = asyncio.create_task(process_subject(session, subj, cbse_n, cisce_n))
            pending.add(task)
            print(f"  Launched [{subj}] ({idx+1}/{len(all_configs)})")
            await asyncio.sleep(3)

        # Wait for remaining
        if pending:
            done, _ = await asyncio.wait(pending)
            for d in done:
                results.append(d.result())

    # Summary
    print(f"\n{'='*60}")
    print(f"  FULL CATEGORIZATION SUMMARY")
    print(f"{'='*60}")

    total_both = 0
    total_cbse_only = 0
    total_cisce_only = 0

    for (subject, cbse_nodes, cisce_nodes), result in zip(subjects_to_process, results):
        if result:
            total_both += len(result["both"])
            total_cbse_only += len(result["cbse_only"])
            total_cisce_only += len(result["cisce_only"])
            print(f"  {subject:25s} | both={len(result['both']):5d} | cbse_only={len(result['cbse_only']):5d} | cisce_only={len(result['cisce_only']):5d}")

    print(f"  {'TOTAL':25s} | both={total_both:5d} | cbse_only={total_cbse_only:5d} | cisce_only={total_cisce_only:5d}")
    print(f"{'='*60}")
    print(f"  Output: {OUTPUT_DIR}/*_categorization.md")


if __name__ == "__main__":
    asyncio.run(main())
