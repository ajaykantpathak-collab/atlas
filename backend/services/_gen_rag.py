"""Generate graph_rag_retriever.py via Fable API"""
import urllib.request, json, ssl, ast

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"

PROMPT = """Generate `graph_rag_retriever.py` — a Graph-RAG retriever for a K-12 learning platform.

Based on 2026 LearnerCompass research. Unlike standard semantic RAG, Graph-RAG traverses the knowledge graph to retrieve structured context.

The service loads parsed enrichment data (from enrichment_parser.py output JSON at D:\\platform\\cbse_data\\enrichment_parsed.json) and node JSON files (from D:\\platform\\cbse_data\\nodes\\by_subject\\*.json).

REQUIREMENTS:

1. **GraphRAGRetriever class**:
   - __init__(self, enrichment_json_path, nodes_dir) — loads all data into memory
   - retrieve(self, node_id, depth=3) -> GraphRAGResult
   - get_teaching_context(self, node_id, student_mastery_map=None) -> dict
   - get_prerequisite_chain(self, node_id, depth=3) -> list[str]
   - get_misconception_set(self, node_id, include_prereqs=True) -> list[dict]
   - get_cross_subject_links(self, node_id) -> list[dict]

2. **GraphRAGResult dataclass**:
   - current_concept: dict (all enrichment fields for this node)
   - prerequisites: list[dict] (each with node_id, title, mastery_status if mastery_map provided)
   - forward_concepts: list[dict]
   - misconceptions: list[dict]
   - cross_subject_links: list[dict]
   - on_failure_strategy: str
   - concept_tags: list[str]
   - difficulty: str
   - estimated_time: int

3. **get_teaching_context()** returns compact dict:
   {
     "current_concept": {node_id, title, definition, walkthrough, diagnostic_question, mastery_criteria, scope_boundary, cognitive_level},
     "prerequisites": [{node_id, title, mastery_status, is_blocking}],
     "forward_concepts": [{node_id, title}],
     "misconceptions": [{misconception, explanation, correction}],
     "cross_subject_links": [{node_id, subject, topic, reason}],
     "on_failure_strategy": str,
     "concept_tags": [str],
     "difficulty": str,
     "estimated_time": int
   }

4. **Prerequisite traversal**: BFS up to depth levels. For each prereq, check if it has prereqs too (recursive). Mark is_blocking=True if mastery_map shows prereq mastery < 0.4.

5. **LRU cache**: @functools.lru_cache(maxsize=1000) on retrieve()

6. **Fallback**: If enrichment_parsed.json doesn't exist, load directly from marker files using simple parsing.

7. **Error handling**: If node_id not found, return empty result with warning log. Never crash.

Output ONLY Python code, no markdown fences."""

ctx = ssl.create_default_context()
body = json.dumps({
    "model": "fable",
    "max_tokens": 16000,
    "system": "You are an expert Python engineer. Output only valid Python code, no markdown fences.",
    "messages": [{"role": "user", "content": PROMPT}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

print("Calling Fable for graph_rag_retriever.py...")
with urllib.request.urlopen(req, timeout=300, context=ctx) as resp:
    data = json.loads(resp.read().decode("utf-8"))
    text = ""
    for block in data.get("content", []):
        if block.get("type") == "text":
            text = block.get("text", "")
            break
    if text.startswith("```"):
        lines = text.split("\n")
        lines = [l for l in lines if not l.strip().startswith("```")]
        text = "\n".join(lines)
    usage = data.get("usage", {})
    print(f"Tokens: {usage}")
    out_path = r"D:\platform\backend\services\graph_rag_retriever.py"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    ast.parse(text)
    print(f"VALID: {len(text)} chars, {text.count(chr(10))} lines")
