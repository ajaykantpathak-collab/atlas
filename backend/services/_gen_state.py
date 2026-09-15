"""Direct Fable API call to generate state_4d_builder.py"""
import urllib.request, json, ssl, os, ast

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"

PROMPT = """Generate a complete Python file `state_4d_builder.py` - builds a 4-dimensional student state vector from interaction history.

Based on 2026 research on 4D personalization for intelligent tutoring systems. Traditional systems adapt to knowledge level only. This builds cognitive + affective + behavioral + temporal dimensions.

The service accepts a list of interaction records (dicts with fields: student_id, concept, interaction_type, is_correct, partial_score, time_to_respond_ms, hints_used, confidence_rating, engagement_score, frustration_signals, timestamp, teaching_strategy, error_type, mastery_achieved, next_item_correct).

REQUIREMENTS:

1. **StudentState4D dataclass** with 4 dimensions:

   COGNITIVE:
   - mastery_probability: float (0-1) per current concept
   - ability_theta: float (IRT estimate, default 0.0)
   - knowledge_gaps: list[str] (concept IDs where mastery < 0.4)
   - strong_concepts: list[str] (mastery > 0.7)
   - prerequisite_gaps: list[str]
   - transfer_ability: float (0-1, estimated from cross-concept performance)
   - mastery_bucket: str ("low" <0.4, "medium" 0.4-0.7, "high" >0.7)

   AFFECTIVE:
   - frustration_level: float (0-1) - from rapid wrong answers, hint abuse, long pauses + wrong
   - confidence_level: float (0-1) - from confidence ratings mapped to 0-1
   - motivation_level: float (0-1) - from session length, return rate, engagement trends
   - confusion_level: float (0-1) - from many hints, low next-item correctness, high response time
   - boredom_level: float (0-1) - from very fast correct answers, declining session length
   - affective_bucket: str ("positive", "neutral", "negative")

   BEHAVIORAL:
   - hint_dependency: float (0-1) - how often hints used
   - attempt_pattern: str ("persistent", "quick_giver", "strategic")
   - avg_response_time_ms: float
   - error_pattern_tendency: dict[str, float] - {error_type: frequency}
   - learning_speed: float (0-1) - how fast mastery improves
   - preferred_difficulty: float (0-1)
   - hint_dependency_bucket: str ("independent", "moderate", "dependent")

   TEMPORAL:
   - time_of_day_performance: dict[int, float] - {hour: accuracy}
   - session_length_preference: float (minutes)
   - spacing_effectiveness: float (0-1)
   - fatigue_factor: float (0-1) - performance degradation within session
   - days_since_last_interaction: int
   - optimal_review_time: str (ISO datetime estimate)
   - temporal_bucket: str ("fresh", "recent", "stale")

2. **State4DBuilder class**:
   - build_state(student_id, concept, interactions: list[dict], mastery_map: dict = None) -> StudentState4D
   - Uses simple statistics (averages, rates, trends, linear regression for trends)
   - Falls back to defaults for new students (no interactions)
   - Pure Python, no numpy required (but can use it if available)

3. **Frustration detection algorithm**:
   - rapid_wrong: 3+ wrong answers in <30 seconds each
   - hint_abuse: >3 hints per question on 2+ questions
   - pause_then_wrong: >60s response time followed by wrong answer
   - repeated_attempts: 4+ attempts on same question/concept
   - Score = weighted sum of signals, clamped 0-1

4. **Learning speed estimation**:
   - Compare mastery_before and mastery_after across interactions
   - avg_improvement = mean(mastery_after - mastery_before)
   - learning_speed = clamp(avg_improvement * 10, 0, 1)

5. **Fatigue factor**:
   - Split session into quarters
   - Compare accuracy in first quarter vs last quarter
   - fatigue = 1 - (last_quarter_accuracy / first_quarter_accuracy), clamped 0-1

6. **get_state_summary()** method:
   - Returns compact dict for orchestrator: {mastery_bucket, affective_bucket, hint_dependency_bucket, temporal_bucket, optimal_strategy_hint}
   - optimal_strategy_hint: str based on combined state (e.g., "high_mastery_low_frustration -> challenge", "low_mastery_high_frustration -> support_and_scaffold", "low_mastery_high_hint_dependency -> prerequisite_review")

7. **CalibrationResult dataclass**:
   - calibration_score: float (0=perfect, 1=worst)
   - bias: str ("overconfident", "underconfident", "well_calibrated")
   - bias_magnitude: float
   - Uses ECE (Expected Calibration Error) formula

Use dataclasses. Pure Python. Logging but never crash. Output ONLY Python code, no markdown fences."""

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

print("Calling Fable for state_4d_builder.py...")
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
    out_path = r"D:\platform\backend\services\state_4d_builder.py"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    ast.parse(text)
    print(f"VALID PYTHON: {len(text)} chars, {text.count(chr(10))} lines")
    print(f"SAVED to {out_path}")
