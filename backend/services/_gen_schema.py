"""Generate the intelligence layer DB schema using Fable API."""
import urllib.request, json, ssl, os

KEY = os.environ.get("CLAUDE_REASONING_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = os.environ.get("CLAUDE_REASONING_URL", "https://api.claudeopus.pro/v1/messages")

PROMPT = """Generate a complete Python file `intelligence_schema.py` for a K-12 learning platform's self-evolving intelligence layer.

This file defines SQLAlchemy 2.0 ORM models (using DeclarativeBase, Mapped, mapped_column) for the following tables. Use async-compatible SQLAlchemy. Use JSONB for flexible fields. Use UUID where appropriate.

The file must follow these conventions (from existing codebase):
- `from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship`
- `from sqlalchemy import String, Float, Integer, Boolean, Text, DateTime, ForeignKey, Index, Enum as SAEnum`
- `from sqlalchemy.dialects.postgresql import JSONB, UUID as PGUUID, ARRAY`
- `from datetime import datetime, timezone`
- `from enum import Enum`
- `class Base(DeclarativeBase): pass`
- All models inherit from Base
- Use `Mapped[type]` and `mapped_column()` syntax
- Timestamps use `datetime.now(timezone.utc)`

TABLES TO DEFINE:

1. **EnrichmentNode** — Parsed enrichment data from 18,074 marker files
   - id: Integer PK
   - node_id: String(100) unique indexed (e.g., "c11_phy_cbse_010")
   - subject: String(50) indexed
   - class_level: Integer indexed
   - board: String(10)
   - chapter: Text
   - topic: Text
   - title: Text
   - definition: Text
   - text_walkthrough: Text
   - cognitive_level: String(50) (remember, understand, apply, analyze, evaluate, create)
   - mastery_criteria: Text
   - scope_boundary: Text
   - common_misconceptions: JSONB (array of {misconception, explanation, correction})
   - diagnostic_question: JSONB ({question, answer, level})
   - on_failure: Text (remediation strategy)
   - prerequisite_node_ids: ARRAY(Text)
   - prerequisite_reasons: JSONB
   - forward_node_ids: ARRAY(Text)
   - cross_subject_prereqs: ARRAY(Text)
   - cross_subject_reasons: JSONB
   - concept_tags: ARRAY(Text)
   - difficulty: String(20)
   - estimated_time: Integer
   - source_marker: String(200) (which marker file this came from)
   - parsed_at: DateTime

2. **InteractionOutcome** — Every student interaction logged
   - id: PGUUID PK default gen_random_uuid()
   - student_id: String(100) indexed
   - session_id: PGUUID indexed
   - timestamp: DateTime indexed default now
   - subject: String(50) indexed
   - chapter: Text
   - concept: String(100) indexed (node_id)
   - grade_level: Integer
   - interaction_type: String(50) (question_attempt, hint_request, simulation, socratic_turn, navigation)
   - question_id: String(100) nullable
   - response: JSONB nullable
   - is_correct: Boolean nullable
   - partial_score: Float nullable (0-1)
   - time_to_respond_ms: Integer nullable
   - hints_used: Integer default 0
   - hint_sequence: ARRAY(Text) default []
   - error_type: String(100) nullable
   - teaching_strategy: String(100) nullable
   - strategy_sequence: ARRAY(Text) default []
   - misconceptions_detected: ARRAY(Text) default []
   - knowledge_state_before: JSONB nullable
   - knowledge_state_after: JSONB nullable
   - language: String(10) default 'en'
   - device_type: String(20) nullable
   - engagement_score: Float nullable (0-1)
   - frustration_signals: Boolean default False
   - mastery_achieved: Boolean default False
   - confidence_rating: Integer nullable (1-5, student self-rating)
   - next_item_correct: Boolean nullable (did they get the NEXT question right without help?)
   - orchestrator_rule_used: String(200) nullable
   - agent_used: String(100) nullable
   - created_at: DateTime default now

3. **Misconception** — Discovered + pre-built misconceptions
   - id: Integer PK
   - misconception_key: String(200) unique (concept:error_pattern_hash)
   - subject: String(50) indexed
   - concept: String(100) indexed (node_id)
   - grade_level: Integer
   - name_en: Text
   - description_en: Text
   - remediation_approach_en: Text
   - name_hi: Text nullable
   - description_hi: Text nullable
   - remediation_approach_hi: Text nullable
   - occurrence_count: Integer default 1
   - student_count: Integer default 1
   - confidence_score: Float (0-1)
   - recommended_strategy: String(100) nullable
   - first_discovered: DateTime default now
   - last_seen: DateTime default now
   - is_verified: Boolean default False
   - source: String(50) (enrichment, discovered, cisce_pupil_data)

4. **ConceptDependency** — Learned + specified dependencies
   - id: Integer PK
   - source_concept: String(100) indexed (prerequisite)
   - target_concept: String(100) indexed (depends on source)
   - subject: String(50)
   - grade_level: Integer
   - strength: Float (0-1)
   - confidence: Float (0-1)
   - support_count: Integer default 0
   - dependency_type: String(50) (prerequisite, cross_subject, learned)
   - reason: Text nullable
   - discovery_method: String(50) (specified, mined, claude_discovered)
   - discovered_at: DateTime default now
   - last_validated: DateTime nullable
   - is_verified: Boolean default False
   - Unique constraint on (source_concept, target_concept, subject)

5. **TeachingStrategyOutcome** — Strategy effectiveness tracking
   - id: Integer PK
   - strategy_name: String(100) indexed
   - subject: String(50) indexed
   - concept: String(100) indexed
   - grade_level: Integer
   - student_count: Integer
   - total_interactions: Integer
   - observation_window_days: Integer
   - avg_knowledge_gain: Float
   - avg_time_to_mastery: Float nullable
   - mastery_rate: Float (0-1)
   - retention_rate: Float nullable
   - engagement_score: Float (0-1)
   - error_reduction_rate: Float nullable
   - next_item_correctness_rate: Float nullable
   - baseline_strategy: String(100) nullable
   - lift_vs_baseline: Float nullable
   - confidence_interval: Float nullable
   - is_significant: Boolean nullable
   - observation_start: DateTime
   - observation_end: DateTime
   - last_updated: DateTime default now

6. **ContentGapFlag** — Content gap detection
   - id: Integer PK
   - subject: String(50) indexed
   - concept: String(100) indexed (node_id)
   - grade_level: Integer
   - avg_error_rate: Float
   - remediation_attempts: Integer default 0
   - affected_student_count: Integer
   - evidence_snapshot: JSONB nullable
   - severity: String(20) (low, medium, high, critical)
   - gap_type: String(50) (missing_content, insufficient_practice, prerequisite_gap, poor_explanation)
   - recommended_action: Text nullable
   - flagged_at: DateTime default now
   - resolved: Boolean default False
   - resolved_at: DateTime nullable

7. **LearningStyleProfile** — Per-student learning style
   - student_id: String(100) PK
   - visual_preference: Float default 0.5
   - auditory_preference: Float default 0.5
   - kinesthetic_preference: Float default 0.5
   - reading_preference: Float default 0.5
   - working_memory_capacity: Float default 0.5
   - processing_speed: Float default 0.5
   - attention_span_minutes: Float default 15.0
   - error_recovery_speed: Float default 0.5
   - strategy_effectiveness: JSONB default {} (strategy_name -> effectiveness_score)
   - best_performing_strategies: ARRAY(Text) default []
   - worst_performing_strategies: ARRAY(Text) default []
   - optimal_session_length_minutes: Float default 20.0
   - preferred_difficulty: Float default 0.5
   - preferred_pace: String(20) default 'medium'
   - optimal_hint_timing: String(30) default 'after_first_error'
   - avg_session_duration_minutes: Float default 20.0
   - dropout_rate: Float default 0.0
   - repeat_visit_rate: Float default 0.0
   - total_interactions: Integer default 0
   - profile_confidence: Float default 0.0 (0-1)
   - last_updated: DateTime default now

8. **SocraticSession** — AI tutoring session memory
   - session_id: PGUUID PK default gen_random_uuid()
   - student_id: String(100) indexed
   - started_at: DateTime default now
   - ended_at: DateTime nullable
   - concept: String(100) indexed
   - subject: String(50)
   - grade_level: Integer
   - language: String(10) default 'en'
   - turns: JSONB default [] (array of {role, content, timestamp, metadata})
   - turn_count: Integer default 0
   - mastery_achieved: Boolean nullable
   - misconceptions_identified: ARRAY(Text) default []
   - hints_used: Integer default 0
   - session_effectiveness: Float nullable
   - orchestrator_rules_used: ARRAY(Text) default []
   - agents_used: ARRAY(Text) default []

9. **OrchestratorRule** — Dynamic rules for the deterministic orchestrator
   - id: Integer PK
   - rule_name: String(200) unique
   - description: Text
   - condition: JSONB (structured condition: {field, operator, value})
   - action: JSONB (structured action: {agent, parameters})
   - priority: Integer default 100 (lower = higher priority)
   - is_active: Boolean default True
   - source: String(50) (initial, meta_brain, ab_test_winner)
   - created_at: DateTime default now
   - last_updated: DateTime default now
   - effectiveness_score: Float default 0.5
   - times_triggered: Integer default 0
   - ab_test_variant: String(20) nullable (control, variant_a, variant_b)

10. **ClaudeReasoningCache** — Cache for Claude API responses
    - cache_key: String(200) PK
    - prompt_hash: String(64)
    - response: JSONB
    - created_at: DateTime default now
    - hit_count: Integer default 1
    - last_used: DateTime default now
    - language: String(10) nullable
    - model: String(50) default 'fable'

11. **AgentParameter** — Tunable parameters for specialized agents
    - id: Integer PK
    - agent_name: String(100) indexed
    - parameter_name: String(100)
    - parameter_value: Float
    - subject: String(50) nullable (null = all subjects)
    - concept: String(100) nullable (null = all concepts)
    - last_calibrated: DateTime default now
    - calibration_count: Integer default 0
    - effectiveness_score: Float default 0.5
    - Unique constraint on (agent_name, parameter_name, subject, concept)

Add proper indexes on all frequently-queried fields. Add a `__tablename__` to each model. Use clear Python class names (EnrichmentNode, InteractionOutcome, Misconception, ConceptDependency, TeachingStrategyOutcome, ContentGapFlag, LearningStyleProfile, SocraticSession, OrchestratorRule, ClaudeReasoningCache, AgentParameter).

Output ONLY the Python code, no markdown fences, no explanations."""

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

print("Generating intelligence_schema.py...")
try:
    with urllib.request.urlopen(req, timeout=300, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        text = ""
        for block in data.get("content", []):
            if block.get("type") == "text":
                text = block.get("text", "")
                break
        # Strip markdown fences if present
        if text.startswith("```"):
            lines = text.split("\n")
            lines = [l for l in lines if not l.strip().startswith("```")]
            text = "\n".join(lines)
        usage = data.get("usage", {})
        print(f"Tokens: {usage}")
        print(f"Generated {len(text)} chars, {text.count(chr(10))} lines")
        out_path = r"D:\platform\backend\services\intelligence_schema.py"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"SAVED to {out_path}")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()[:500]}")
except Exception as e:
    print(f"ERROR: {str(e)[:500]}")
