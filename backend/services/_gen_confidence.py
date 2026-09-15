"""Generate confidence_calibrator.py via Fable API"""
import urllib.request, json, ssl, ast

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"

PROMPT = """Generate `confidence_calibrator.py` — a confidence calibration service for a K-12 learning platform.

Based on 2026 IRT+BKT research. After each answer, students rate confidence 1-5. The system detects metacognitive bias.

REQUIREMENTS:

1. **CalibrationResult dataclass**:
   - calibration_score: float (0=perfect, 1=worst) — uses ECE
   - bias: str ("overconfident", "underconfident", "well_calibrated")
   - bias_magnitude: float
   - per_concept_calibration: dict[str, float]
   - sample_size: int

2. **ConfidenceCalibrator class**:
   - record_confidence(student_id, concept, confidence_rating (1-5), is_correct) -> stores pair
   - get_calibration(student_id) -> CalibrationResult
   - get_confidence_nudge(student_id, concept) -> str (motivational message based on bias)
   - get_optimal_challenge_level(student_id, concept, mastery) -> float (adjusted difficulty)
   - get_class_calibration(student_ids: list) -> CalibrationResult (aggregate)
   - Uses ECE (Expected Calibration Error) formula:
     Bin confidence into 5 bins (1->0.1, 2->0.3, 3->0.5, 4->0.7, 5->0.9)
     ECE = sum(|avg_confidence - avg_accuracy| * (bin_count/total_count))
   - Storage: in-memory dict + JSON file fallback (D:\\platform\\cbse_data\\confidence_data.json)
   - Pure Python, no external deps
   - Logging but never crash

3. **get_optimal_challenge_level()**:
   - Overconfident: difficulty = IRT_optimal + 0.2 (push harder)
   - Underconfident: difficulty = IRT_optimal - 0.15 (build confidence)
   - Well-calibrated: difficulty = IRT_optimal
   - Clamp to [0, 1]

4. **get_confidence_nudge()**:
   - Overconfident + wrong: "You rated yourself confident but got this wrong. Let's review why."
   - Underconfident + right: "You got this right! You know more than you think."
   - Well-calibrated: "" (empty string, no nudge)

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

print("Calling Fable for confidence_calibrator.py...")
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
    out_path = r"D:\platform\backend\services\confidence_calibrator.py"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    ast.parse(text)
    print(f"VALID: {len(text)} chars, {text.count(chr(10))} lines")
