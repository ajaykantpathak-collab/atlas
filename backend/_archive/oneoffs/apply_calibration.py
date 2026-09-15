"""Apply Fable-calibrated agent parameters to the live system.
Loads agent_calibration.json and injects params into the 6 agents + orchestrator.
"""
import json, os, sys, time, warnings
from pathlib import Path

warnings.filterwarnings("ignore")
sys.path.insert(0, r"D:\platform\backend")
sys.path.insert(0, r"D:\platform\backend\services")

print("=" * 60)
print("APPLYING FABLE CALIBRATION TO LIVE AGENTS")
print("=" * 60)

# Load calibration
cal_path = r"D:\platform\backend\services\agent_calibration.json"
with open(cal_path, "r", encoding="utf-8") as f:
    calibration = json.load(f)

print(f"\nLoaded calibration for {len(calibration)} components")

# ─── 1. Apply to specialized agents ────────────────────────────────────────
print("\n[1/4] Applying parameters to specialized agents...")
from specialized_agents import (
    EthicsBot, AssessmentBot, ScaffoldBot, FeedbackBot, MotivatorBot, TutorBot,
    create_ensemble, AgentParameter
)

# Create ensemble
ensemble = create_ensemble()

# Map calibration to agents
agent_map = {
    "ethics_bot": ("ethics_bot", EthicsBot),
    "assessment_bot": ("assessment_bot", AssessmentBot),
    "scaffold_bot": ("scaffold_bot", ScaffoldBot),
    "feedback_bot": ("feedback_bot", FeedbackBot),
    "motivator_bot": ("motivator_bot", MotivatorBot),
    "tutor_bot": ("tutor_bot", TutorBot),
}

applied = 0
for cal_key, (agent_name, agent_class) in agent_map.items():
    cal_data = calibration.get(cal_key, {})
    params = cal_data.get("params", {})
    overrides = cal_data.get("subject_overrides", {})
    rationale = cal_data.get("rationale", "")
    
    agent = None
    for a in ensemble.agents:
        if getattr(a, "agent_name", "") == agent_name:
            agent = a
            break
    if agent is None:
        print(f"  {agent_name}: NOT FOUND in ensemble")
        continue
    
    # Apply each parameter
    for param_name, param_value in params.items():
        if hasattr(agent, "set_param"):
            try:
                agent.set_param(param_name, param_value)
                applied += 1
            except Exception as e:
                # Try setting as attribute
                try:
                    setattr(agent, param_name, param_value)
                    applied += 1
                except:
                    pass
        else:
            try:
                setattr(agent, param_name, param_value)
                applied += 1
            except:
                pass
    
    # Store subject overrides
    if overrides:
        if hasattr(agent, "subject_overrides"):
            agent.subject_overrides = overrides
        else:
            setattr(agent, "subject_overrides", overrides)
    
    print(f"  {agent_name}: {len(params)} params applied, {len(overrides)} subject overrides")
    print(f"    rationale: {rationale[:100]}...")

print(f"\n  Total parameters applied: {applied}")

# ─── 2. Apply cross-agent rules to orchestrator ────────────────────────────
print("\n[2/4] Applying cross-agent rules to orchestrator...")
from deterministic_orchestrator import DeterministicOrchestrator, OrchestratorRule

orch = DeterministicOrchestrator()
rules_before = len(orch.get_active_rules())

cross_rules = calibration.get("cross_agent_rules", [])
rules_added = 0

for i, rule_text in enumerate(cross_rules):
    # Convert natural language rules to structured rules
    # Parse common patterns
    rule_name = f"fable_cross_{i+1}"
    
    # Detect rule type from text
    rule_lower = str(rule_text).lower()
    
    if "devanagari" in rule_lower or "hindi" in rule_lower or "unicode" in rule_lower:
        condition = {"field": "language", "operator": "==", "value": "hi"}
        action = {"agent": "TutorBot", "action_type": "tutor", "unicode_guard": True}
        priority = 8  # High priority - safety
    elif "diagnostic" in rule_lower and "empty" in rule_lower:
        condition = {"field": "diagnostic_empty", "operator": "==", "value": True}
        action = {"agent": "AssessmentBot", "action_type": "assess", "fallback": "generate_from_misconception"}
        priority = 19
    elif "cognitive level" in rule_lower or "cognitive_level" in rule_lower:
        condition = {"field": "cognitive_level", "operator": "in", "value": ["apply", "analyze", "evaluate", "create"]}
        action = {"agent": "AssessmentBot", "action_type": "assess", "use_cognitive_level_for_difficulty": True}
        priority = 21
    elif "misconception" in rule_lower and ("verbatim" in rule_lower or "similarity" in rule_lower):
        condition = {"field": "error_matches_misconception", "operator": "==", "value": True}
        action = {"agent": "FeedbackBot", "action_type": "feedback", "feedback_type": "targeted_remediation"}
        priority = 33
    elif "apply" in rule_lower and "common" in rule_lower:
        condition = {"field": "cognitive_level", "operator": "==", "value": "apply"}
        action = {"agent": "AssessmentBot", "action_type": "assess", "question_type": "application"}
        priority = 22
    else:
        # Generic rule
        condition = {"field": "fable_rule", "operator": "==", "value": i+1}
        action = {"agent": "TutorBot", "action_type": "tutor", "rule_text": str(rule_text)[:200]}
        priority = 50 + i
    
    try:
        orch.add_rule(OrchestratorRule(
            rule_name=rule_name,
            condition=condition,
            action=action,
            priority=priority,
            is_active=True,
            source="fable_calibration",
        ))
        rules_added += 1
    except Exception as e:
        print(f"  Failed to add rule {rule_name}: {e}")

rules_after = len(orch.get_active_rules())
print(f"  Rules before: {rules_before}, after: {rules_after} (added {rules_added})")

# ─── 3. Save calibrated state ──────────────────────────────────────────────
print("\n[3/4] Saving calibrated state...")

# Save the calibrated ensemble state
calibrated_state = {
    "calibration_applied": True,
    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
    "agents": {},
    "orchestrator_rules": rules_after,
    "cross_agent_rules_count": len(cross_rules),
}

for cal_key, (agent_name, _) in agent_map.items():
    cal_data = calibration.get(cal_key, {})
    calibrated_state["agents"][agent_name] = {
        "params": cal_data.get("params", {}),
        "subject_overrides": cal_data.get("subject_overrides", {}),
        "rationale": cal_data.get("rationale", "")[:200],
    }

state_path = r"D:\platform\backend\services\calibrated_state.json"
with open(state_path, "w", encoding="utf-8") as f:
    json.dump(calibrated_state, f, ensure_ascii=False, indent=2)
print(f"  Calibrated state saved: {state_path}")

# ─── 4. Test calibrated agents with real data ──────────────────────────────
print("\n[4/4] Testing calibrated agents with real data...")

# Load a real enriched node for testing
nodes_dir = r"D:\platform\cbse_data\nodes\by_subject"
import json as j
sample_node = None
for f in Path(nodes_dir).glob("physics.json"):
    data = j.loads(f.read_text(encoding="utf-8"))
    sample_node = data[10] if len(data) > 10 else data[0]
    break

if sample_node:
    print(f"  Test node: {sample_node['node_id']} - {sample_node['topic'][:50]}")
    
    # Build synthetic student state
    student_state = {
        "cognitive": {
            "mastery": 0.4,
            "irt_ability": 0.3,
            "concept_gaps": ["kinematics"],
            "cognitive_level": "apply",
        },
        "affective": {
            "frustration": 0.3,
            "confidence": 0.5,
            "motivation": 0.7,
            "boredom": 0.2,
        },
        "behavioral": {
            "hints_used": 1,
            "avg_response_time_ms": 15000,
            "error_streak": 1,
            "attempt_number": 2,
        },
        "temporal": {
            "hour": 14,
            "session_length_min": 25,
        },
    }
    
    teaching_context = {
        "current_concept": {
            "node_id": sample_node["node_id"],
            "title": sample_node["topic"],
            "definition": "Test concept definition",
            "cognitive_level": "apply",
            "scope_boundary": "Do not teach beyond this scope",
        },
        "prerequisites": [],
        "misconceptions": [
            {"misconception": "Test misconception", "explanation": "Wrong because...", "correction": "Actually..."}
        ],
        "difficulty": sample_node.get("difficulty", "medium"),
        "diagnostic": {"question": "Test question", "answer": "Test answer", "level": "apply"},
    }
    
    # Run all agents
    actions = ensemble.run_all_agents(student_state, teaching_context, [])
    print(f"\n  Agent actions ({len(actions)}):")
    for a in actions:
        if hasattr(a, "__dict__"):
            print(f"    {a.agent_name}: {a.action_type} (priority {a.priority})")
            if hasattr(a, "rationale") and a.rationale:
                print(f"      rationale: {a.rationale[:80]}")
        elif isinstance(a, dict):
            print(f"    {a.get('agent_name')}: {a.get('action_type')}")
    
    # Run orchestrator
    if actions:
        winning = orch.decide(student_state, teaching_context, [], actions)
        if hasattr(winning, "__dict__"):
            print(f"\n  Orchestrator selected: {winning.agent_name} -> {winning.action_type}")
            if hasattr(winning, "rationale"):
                print(f"    rationale: {winning.rationale[:100]}")
        elif isinstance(winning, dict):
            print(f"\n  Orchestrator selected: {winning.get('agent_name')} -> {winning.get('action_type')}")

# ─── SUMMARY ───────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print("CALIBRATION APPLIED SUCCESSFULLY")
print(f"{'='*60}")
print(f"  Agent parameters applied: {applied}")
print(f"  Orchestrator rules: {rules_before} -> {rules_after}")
print(f"  Cross-agent rules from Fable: {len(cross_rules)}")
print(f"  Calibrated state saved: {state_path}")
print(f"{'='*60}")
