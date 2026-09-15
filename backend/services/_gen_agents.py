"""Generate specialized_agents.py via Fable API"""
import urllib.request, json, ssl, ast

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"

PROMPT = """Generate `specialized_agents.py` — 6 specialized pedagogical agents for an ES-LLMs tutoring architecture.

Based on AIED 2026 research: separate decision-making from wording. Each agent proposes an action based on student state. The orchestrator (separate file) selects which action to take. Claude only renders the chosen action in natural language.

REQUIREMENTS:

1. **AgentAction dataclass**:
   - agent_name: str
   - action_type: str (assess, scaffold, feedback, motivate, tutor, ethics_check)
   - content_payload: dict (structured data for the renderer)
   - priority: int (lower = higher priority)
   - rationale: str (why this action was chosen)
   - constraints_checked: list[str] (which pedagogical constraints were verified)

2. **BaseAgent class**:
   - propose_action(self, student_state, teaching_context, interaction_history) -> AgentAction
   - Each agent has tunable parameters stored in AgentParameter table

3. **EthicsBot** (priority 10 — highest, safety first):
   - Checks: is content within scope_boundary? Is student asking for direct answers (gaming)? Is content age-appropriate?
   - Actions: allow, block_with_explanation, redirect_to_safe_content
   - Enforces: "attempt before hint" — if student hasn't attempted, block hint requests
   - Enforces: hint cap (max 3 hints per question)

4. **AssessmentBot** (priority 20):
   - Decides: should we test understanding? What type of question?
   - Question types: diagnostic_question (from enrichment), recall, application, synthesis
   - Selects question based on mastery level (low=recall, medium=application, high=synthesis)
   - Uses IRT to pick optimal difficulty

5. **ScaffoldBot** (priority 30):
   - Decides hint level: minimal (nudge), medium (partial worked example), full (complete worked example)
   - Level selection based on: mastery, frustration, hint_dependency, attempt_number
   - Parameters: hint_level_thresholds (tunable by Meta-Brain)
   - Enforces: never give the full answer directly

6. **FeedbackBot** (priority 40):
   - Decides feedback type: correction, socratic_question, worked_example, misconception_addressal
   - If error matches known misconception → address that specific misconception
   - If error is new → classify and log for Meta-Brain
   - Feedback format: positive_first, then constructive

7. **MotivatorBot** (priority 50):
   - Decides: encouragement, challenge, celebration, empathy
   - Based on: affective state (frustration, boredom, confidence), streak data, mastery trends
   - Frustrated student → empathy + reduce difficulty
   - Bored student → challenge + increase novelty
   - Achieving student → celebration + introduce harder concept

8. **TutorBot** (priority 60):
   - Decides: what to teach next, in what format
   - Formats: text_explanation, walkthrough, simulation, visual_diagram, socratic_dialogue
   - Based on: learning style (visual/auditory/kinesthetic/reading), mastery, prerequisites
   - If prerequisite gap detected → redirect to prerequisite first

9. **AgentEnsemble class**:
   - run_all_agents(student_state, teaching_context, interaction_history) -> list[AgentAction]
   - Runs all 6 agents, returns their proposed actions
   - The orchestrator (separate file) picks the winning action

10. All agents use the 4D student state (from state_4d_builder.py) and Graph-RAG teaching context (from graph_rag_retriever.py). They receive these as dicts, not typed objects, for flexibility.

11. Pure Python. No external deps. Dataclasses for all results. Logging but never crash.

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

print("Calling Fable for specialized_agents.py...")
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
    out_path = r"D:\platform\backend\services\specialized_agents.py"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    ast.parse(text)
    print(f"VALID: {len(text)} chars, {text.count(chr(10))} lines")
