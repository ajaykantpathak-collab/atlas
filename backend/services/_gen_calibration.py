"""Send real misconception + diagnostic data to Fable for agent parameter calibration.
Fable analyzes actual student misconception patterns and returns calibrated parameters
for each of the 6 specialized agents.
"""
import urllib.request, json, ssl, os, time

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "claude-opus-4-6"

# Load calibration data
with open(r"D:\platform\cbse_data\agent_calibration_data.json", "r", encoding="utf-8") as f:
    samples = json.load(f)

print(f"Loaded {len(samples)} representative samples from {len(set(s['subject'] for s in samples))} subjects")

# Group by subject for the prompt
by_subject = {}
for s in samples:
    subj = s["subject"]
    if subj not in by_subject:
        by_subject[subj] = []
    by_subject[subj].append(s)

# Build the prompt with real data
prompt = f"""You are calibrating a K-12 learning platform's 6 specialized AI agents using REAL curriculum data.

Below are {len(samples)} representative samples from {len(by_subject)} subjects. Each sample contains:
- Real misconceptions students have (from CBSE/ICSE enrichment data)
- Real diagnostic questions teachers use
- Cognitive levels (remember/understand/apply/analyze/evaluate/create)

SAMPLES (JSON):
{json.dumps(samples[:80], ensure_ascii=False, indent=1)}

Based on this REAL data, calibrate the parameters for these 6 agents:

1. **EthicsBot** (safety, scope enforcement, answer-leak prevention):
   - hint_cap_per_question: How many hints before blocking? (based on misconception complexity)
   - attempt_before_hint: Should this be strict or flexible?
   - scope_strictness: How strict about staying within scope_boundary?
   - answer_leak_threshold: At what mastery level can full answers be shown?

2. **AssessmentBot** (question selection, difficulty):
   - difficulty_offset_by_cognitive_level: Map cognitive_level -> difficulty adjustment
   - question_type_by_mastery: Map mastery range -> question type (diagnostic/recall/application/synthesis)
   - irt_disciscrimination_target: What discrimination parameter to target?

3. **ScaffoldBot** (hint levels, scaffolding):
   - hint_level_thresholds: Map mastery+frustration -> hint level (0=none, 1=nudge, 2=partial, 3=full worked example)
   - max_hints_before_redirect: When to stop hinting and redirect to prerequisite?
   - scaffold_escalation_rate: How fast to escalate hints?

4. **FeedbackBot** (error correction, misconception addressing):
   - feedback_type_by_error_match: When error matches known misconception vs novel error
   - misconception_addressal_priority: How to prioritize which misconception to address first
   - positive_feedback_ratio: Ratio of positive to constructive feedback

5. **MotivatorBot** (encouragement, challenge):
   - frustration_threshold: At what frustration level to intervene?
   - boredom_threshold: At what boredom level to increase challenge?
   - celebration_frequency: How often to celebrate achievements?
   - empathy_vs_challenge_balance: When to empathize vs when to push harder?

6. **TutorBot** (content delivery, format selection):
   - format_by_learning_style: Map learning style -> content format
   - prerequisite_check_depth: How deep to check prerequisites before teaching?
   - explanation_depth_by_mastery: Map mastery -> explanation detail level

For EACH agent, output:
1. The calibrated parameter values (as a JSON object)
2. A brief rationale explaining WHY these values were chosen based on the data
3. Subject-specific overrides where the data shows different patterns (e.g., physics might need different scaffolding than English literature)

Output as a single JSON object with this structure:
{{
  "ethics_bot": {{"params": {{...}}, "rationale": "...", "subject_overrides": {{...}}}},
  "assessment_bot": {{"params": {{...}}, "rationale": "...", "subject_overrides": {{...}}}},
  "scaffold_bot": {{"params": {{...}}, "rationale": "...", "subject_overrides": {{...}}}},
  "feedback_bot": {{"params": {{...}}, "rationale": "...", "subject_overrides": {{...}}}},
  "motivator_bot": {{"params": {{...}}, "rationale": "...", "subject_overrides": {{...}}}},
  "tutor_bot": {{"params": {{...}}, "rationale": "...", "subject_overrides": {{...}}}},
  "cross_agent_rules": [
    "rules that apply across multiple agents based on patterns in the data"
  ]
}}

Be specific and data-driven. Reference actual patterns you see in the misconception and diagnostic data."""

print(f"\nPrompt size: {len(prompt)} chars")
print(f"Sending to Fable (claude-opus-4-6)...")

ctx = ssl.create_default_context()
body = json.dumps({
    "model": MODEL,
    "max_tokens": 16000,
    "system": "You are an expert AI education researcher specializing in adaptive learning systems. You analyze real student misconception data and calibrate pedagogical AI agents. Output only valid JSON.",
    "messages": [{"role": "user", "content": prompt}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

t0 = time.time()
with urllib.request.urlopen(req, timeout=300, context=ctx) as resp:
    data = json.loads(resp.read().decode("utf-8"))
    text = ""
    for block in data.get("content", []):
        if block.get("type") == "text":
            text = block.get("text", "")
            break
    usage = data.get("usage", {})
    elapsed = time.time() - t0
    
    # Strip markdown if present
    if text.strip().startswith("```"):
        lines = text.strip().split("\n")
        lines = [l for l in lines if not l.strip().startswith("```")]
        text = "\n".join(lines)
    
    print(f"\nResponse received: {len(text)} chars, {elapsed:.1f}s")
    print(f"Tokens: {usage}")
    
    # Try to parse as JSON
    try:
        calibration = json.loads(text)
        out_path = r"D:\platform\backend\services\agent_calibration.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(calibration, f, ensure_ascii=False, indent=2)
        print(f"\nVALID JSON saved to: {out_path}")
        print(f"File size: {os.path.getsize(out_path)} bytes")
        
        # Print summary
        for agent_name, agent_data in calibration.items():
            if isinstance(agent_data, dict) and "params" in agent_data:
                params = agent_data["params"]
                rationale = agent_data.get("rationale", "")[:100]
                overrides = agent_data.get("subject_overrides", {})
                print(f"\n  {agent_name}:")
                print(f"    params: {json.dumps(params)[:200]}")
                print(f"    rationale: {rationale}...")
                if overrides:
                    print(f"    subject_overrides: {list(overrides.keys())}")
            elif agent_name == "cross_agent_rules":
                rules = agent_data if isinstance(agent_data, list) else []
                print(f"\n  cross_agent_rules: {len(rules)} rules")
                for r in rules[:3]:
                    print(f"    - {str(r)[:100]}")
    except json.JSONDecodeError as e:
        print(f"\nJSON parse error: {e}")
        # Save raw text for inspection
        raw_path = r"D:\platform\backend\services\agent_calibration_raw.txt"
        with open(raw_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Raw text saved to: {raw_path}")
        print(f"First 500 chars: {text[:500]}")
