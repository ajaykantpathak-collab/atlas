import sys; sys.path.insert(0, '.')
from cbse_coverage_pipeline import get_chapters_for_grade, MAX_TEXT_CHARS
from pathlib import Path

chapters = get_chapters_for_grade(12)

# Sort by size descending
chapters.sort(key=lambda c: c['size'], reverse=True)

print("=== Largest class 12 chapters ===")
for ch in chapters[:15]:
    size_kb = ch['size'] // 1024
    tokens = ch['size'] // 4
    print(f"  {ch['file']}: {size_kb}KB (~{tokens//1000}K tokens) — {ch['cisce_subject']} — {ch['title'][:40]}")

print(f"\nMAX_TEXT_CHARS = {MAX_TEXT_CHARS} ({MAX_TEXT_CHARS//1024}KB, {MAX_TEXT_CHARS//4//1000}K tokens)")
print(f"Chapters exceeding limit: {sum(1 for c in chapters if c['size'] > MAX_TEXT_CHARS)}")

# But the real issue is: book text + our nodes + prompt + response must fit in 128K
# Response max_tokens = 16000
# So input can be at most 128000 - 16000 = 112000 tokens
# Book text + nodes + prompt template must be < 112K tokens

# Check overlap subjects — book text + our nodes
print("\n=== Overlap subjects: book text + nodes estimate ===")
from collections import defaultdict
from neo4j import GraphDatabase
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "dream_neo4j_2024"))

subj_chapters = defaultdict(list)
for ch in chapters:
    if ch['cisce_subject'] not in ('English Literature', 'Hindi', None):
        subj_chapters[ch['cisce_subject']].append(ch)

for subj, chs in sorted(subj_chapters.items()):
    total_book = sum(c['size'] for c in chs)
    # Get node count
    grade = chs[0]['grade']
    with driver.session() as session:
        result = session.run(
            "MATCH (n:KnowledgeNode) WHERE n.class_level = $cls AND n.subject = $subj "
            "RETURN count(n) as cnt", cls=grade, subj=subj
        )
        node_count = result.single()["cnt"]

    # Estimate: each node ~100 chars in prompt, book text chars/4 = tokens
    book_tokens = total_book // 4
    node_tokens = node_count * 100 // 4  # ~100 chars per node line
    total_input = book_tokens + node_tokens + 500  # +500 for prompt template
    largest_ch = max(c['size'] for c in chs) // 4

    flag = " *** LARGE" if largest_ch > 50000 else ""
    print(f"  {subj}: {len(chs)} chapters, {total_book//1024}KB book, {node_count} nodes, "
          f"largest chapter ~{largest_ch//1000}K tokens{flag}")

driver.close()
