"""Direct Fable API call to generate interaction_capture.py"""
import urllib.request, json, ssl, os, ast

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"

PROMPT = """Generate a complete Python file `interaction_capture.py` - a service that logs every student interaction for a K-12 learning platform's self-improving intelligence system.

Based on 2026 research: every interaction must be logged with enough detail for nightly mining jobs to discover patterns, misconceptions, and strategy effectiveness.

REQUIREMENTS:

1. **SimpleInteractionCapture class** (works without DB, stores in memory + JSON file):
   - capture(student_id, session_id, subject, concept, grade_level, interaction_type, **kwargs) -> interaction_id
   - Interaction types: question_attempt, hint_request, simulation, socratic_turn, navigation
   - kwargs include: question_id, response (dict), is_correct, partial_score, time_to_respond_ms, hints_used, hint_sequence, error_type, teaching_strategy, strategy_sequence, misconceptions_detected, knowledge_state_before, knowledge_state_after, language, device_type, engagement_score, frustration_signals, mastery_achieved, confidence_rating, orchestrator_rule_used, agent_used
   - Auto-generates UUID and timestamp
   - Stores in memory list + appends to JSON file (D:\\platform\\cbse_data\\interactions.json)
   - Has get_interactions(student_id, concept=None, time_range=None) method
   - Has get_recent(student_id, limit=10) method

2. **NextItemCorrectnessTracker class**:
   - After a tutoring interaction, when student answers NEXT question without help, update previous interaction's next_item_correct field
   - track_next_item(student_id, concept, is_correct_without_help) -> updates the most recent socratic_turn/hint_request interaction for this concept

3. **InteractionSummary class** (for quick stats):
   - get_student_stats(student_id) -> {total_interactions, accuracy, avg_time, hints_per_question, frustration_rate, mastery_rate}
   - get_concept_stats(concept) -> {total_attempts, error_rate, avg_hints, common_errors, avg_time}
   - get_strategy_stats(strategy_name) -> {usage_count, avg_mastery_gain, next_item_correctness_rate}

4. **BatchOperations**:
   - batch_capture(interactions_list) -> captures multiple at once
   - export_to_json(filepath) -> exports all interactions
   - import_from_json(filepath) -> loads interactions

5. **FrustrationDetector** (from 2026 4D personalization research):
   - detect_frustration(interactions_list) -> float (0-1)
   - Signals: rapid wrong answers (<10s apart), hint abuse (>3 hints per question), long pause then wrong answer, repeated attempts on same question, declining engagement_score

6. Use dataclasses for InteractionRecord. Use uuid.uuid4() for IDs. Use datetime for timestamps. Pure Python, no external deps. Logging but never crash.

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

print("Calling Fable for interaction_capture.py...")
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
    out_path = r"D:\platform\backend\services\interaction_capture.py"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    ast.parse(text)
    print(f"VALID PYTHON: {len(text)} chars, {text.count(chr(10))} lines")
    print(f"SAVED to {out_path}")
