"""Fix the last 2 broken files - simpler prompts to avoid truncation."""
import urllib.request, json, ssl, ast, os

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
OUT_DIR = r"D:\platform\backend\services"

def gen(filename, prompt, max_tokens=10000):
    ctx = ssl.create_default_context()
    body = json.dumps({
        "model": "fable",
        "max_tokens": max_tokens,
        "system": "You are an expert Python engineer. Output ONLY valid Python code. Keep it concise but complete. No markdown fences.",
        "messages": [{"role": "user", "content": prompt}]
    }).encode("utf-8")
    req = urllib.request.Request(URL, data=body, method="POST")
    req.add_header("x-api-key", KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("anthropic-version", "2023-06-01")
    print(f"Generating {filename}...")
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
        path = os.path.join(OUT_DIR, filename)
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        try:
            ast.parse(text)
            print(f"  OK: {len(text)} chars, {text.count(chr(10))} lines, {usage.get('output_tokens',0)} tokens")
        except SyntaxError as e:
            print(f"  SYNTAX ERROR: line {e.lineno}: {e.msg}")

# decomposition_engine - simpler, no API call, pure logic
gen("decomposition_engine.py", """Generate `decomposition_engine.py` — breaks JEE/NEET problems into sub-problems. Keep it CONCISE (under 400 lines).

1. SubProblem dataclass: sub_problem_id, description, concept, strategy, inputs (dict), output_symbol, dependencies (list[str]), solver_type (str)

2. DecompositionPlan dataclass: sub_problems (list[SubProblem]), execution_order (list[str]), synthesis_steps (list[str]), estimated_difficulty (str)

3. DecompositionEngine class:
   - decompose(self, parsed_problem: dict, available_strategies: list) -> DecompositionPlan
   - identify_sub_problems(self, problem: dict) -> list[SubProblem] — rule-based decomposition using problem's concepts list
   - order_sub_problems(self, sub_problems: list) -> list[str] — topological sort based on dependencies
   - plan_synthesis(self, sub_problems: list, original_problem: dict) -> list[str]

4. Rule-based decomposition heuristics (NO API calls, pure logic):
   - If "equilibrium" in concepts -> sub_problems: force_analysis, equilibrium_equation, solve
   - If "circuit" in concepts -> sub_problems: label_currents, kirchhoff_voltage, solve_system
   - If "projectile" in concepts -> sub_problems: horizontal_motion, vertical_motion, combine
   - If "organic_reaction" in concepts -> sub_problems: identify_substrate, identify_reagent, predict_mechanism, determine_product
   - If "integration" in concepts -> sub_problems: identify_type, apply_technique, evaluate
   - Default: one sub_problem per concept

5. topological_sort implementation using Kahn's algorithm
6. Pure Python, no external deps, no API calls. Output ONLY Python code.""")

# verification_engine - simpler, avoid dimensional vectors that cause truncation
gen("verification_engine.py", """Generate `verification_engine.py` — 5-layer answer verification for JEE/NEET. Keep it CONCISE (under 300 lines).

1. VerificationResult dataclass: passed (bool), layers_checked (list[str]), layer_results (dict[str, bool]), confidence (float), issues (list[str]), corrections (list[str])

2. VerificationEngine class:
   - verify(self, problem: dict, solution: dict) -> VerificationResult — runs all 5 layers
   - check_dimensions(self, formula: str, expected_units: str) -> bool — basic dimensional check using a simple units dict
   - check_limiting_cases(self, solution: dict, problem: dict) -> bool — check if setting params to 0 gives expected result
   - check_magnitude(self, answer: float, expected_range: tuple) -> bool — sanity check
   - check_self_consistency(self, solutions: list) -> bool — compare multiple solutions
   - check_format(self, answer: str, exam_type: str) -> bool — check answer format

3. Simple units dict (keep SMALL): {"m": "length", "kg": "mass", "s": "time", "A": "current", "K": "temperature", "N": "kg*m/s^2", "J": "kg*m^2/s^2", "W": "kg*m^2/s^3", "V": "kg*m^2/(A*s^3)", "C": "A*s"}

4. Confidence = weighted average: dimensional(30%), limiting(20%), magnitude(20%), consistency(20%), format(10%). If dimensional fails, confidence=0.

5. Pure Python. Try import sympy for simplify, fallback to basic string checks. Output ONLY Python code.""")
