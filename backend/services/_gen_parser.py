"""Direct Fable API call to generate enrichment_parser.py"""
import urllib.request, json, ssl, os, ast

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"

PROMPT = """Generate a complete Python file `enrichment_parser.py` that parses enrichment marker files and node JSON files into structured data.

INPUT FILES:
1. Marker files at D:\\platform\\cbse_data\\enrichment\\*.marker (1276 files)
   Format per file (multiple nodes per file):
   --- NODE c11_phy_cbse_010 ---
   TITLE: Acceleration from Velocity-Time Graphs
   DEFINITION: |
     multi-line text indented
   COGNITIVE_LEVEL: apply
   MASTERY_CRITERIA: |
     multi-line text
   SCOPE_BOUNDARY: |
     multi-line text
   TEXT_WALKTHROUGH: |
     multi-line text
   DIAGNOSTIC_QUESTION:
     Q: question text
     A: answer text
     LEVEL: application
   COMMON_MISCONCEPTION: |
     Misconception 1: "quote" explanation
     Misconception 2: "quote" explanation
   ON_FAILURE: |
     remediation text

2. Node JSON files at D:\\platform\\cbse_data\\nodes\\by_subject\\*.json
   Each file has array of nodes with fields: node_id, topic, content_snippet, subject, class_level, board, chapter, chapter_name, difficulty, estimated_time, is_root, concept_tags, scope_constraints, prerequisite_node_ids, prerequisite_reasons, forward_node_ids, forward_reasons, cross_subject_prereqs, cross_subject_reasons, source_file

REQUIREMENTS:
1. Parse all marker files - extract: node_id, title, definition, text_walkthrough, cognitive_level, mastery_criteria, scope_boundary, diagnostic_question (Q/A/level), common_misconceptions (list of {misconception, explanation}), on_failure
2. Parse all node JSON files - extract all fields
3. Merge by node_id (marker data enriches node data)
4. Handle malformed markers (some have typos: COMMON_MISCONEPTION, DEFINUTION, DEFINENCE, SCOBE_BOUNDARY, etc. - fuzzy match field names)
5. Parse YAML-style multi-line values (text after | that is indented)
6. Parse misconceptions into structured format: [{misconception: str, explanation: str}]
7. Parse diagnostic questions into: {question: str, answer: str, level: str}
8. Output to JSON file: D:\\platform\\cbse_data\\enrichment_parsed.json
9. CLI: python enrichment_parser.py --parse (parses all, saves JSON)
10. CLI: python enrichment_parser.py --query NODE_ID (loads JSON, prints node)
11. CLI: python enrichment_parser.py --stats (prints coverage stats)
12. Robust error handling - log failures, never crash
13. Progress logging every 100 files
14. Return parsed data as list of dicts with all merged fields

Output ONLY Python code, no markdown fences."""

ctx = ssl.create_default_context()
body = json.dumps({
    "model": "fable",
    "max_tokens": 16000,
    "system": "You are an expert Python engineer. Output only valid Python code, no markdown fences, no explanations.",
    "messages": [{"role": "user", "content": PROMPT}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

print("Calling Fable for enrichment_parser.py...")
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
    out_path = r"D:\platform\backend\services\enrichment_parser.py"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    # Verify
    ast.parse(text)
    print(f"VALID PYTHON: {len(text)} chars, {text.count(chr(10))} lines")
    print(f"SAVED to {out_path}")
