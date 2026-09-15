"""Regenerate the 6 failed/empty files with higher token limits."""
import urllib.request, json, ssl, ast, threading, time, os

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
OUT_DIR = r"D:\platform\backend\services"

FILES = {
    "socratic_pipeline_v3.py": (12000, """Generate `socratic_pipeline_v3.py` — the integrated tutoring pipeline.

Wires together: state_4d_builder, concept_graph_traverser, specialized_agents, deterministic_orchestrator, claude_renderer, interaction_capture.

1. SocraticPipelineV3 class:
   - __init__(self, enrichment_data=None, nodes_data=None)
   - process_interaction(self, student_id, query, node_id, mastery_map, interaction_history, language="en") -> dict

2. process_interaction flow:
   a. Build 4D student state from interaction_history
   b. Get teaching context from concept graph traverser
   c. Run all 6 specialized agents -> proposed actions
   d. Orchestrator decides winning action
   e. Claude renderer converts action to natural language
   f. Log interaction
   g. Return response dict

3. Response dict: {text, action_type, agent_used, rule_used, mastery_before, mastery_after, misconceptions_addressed, hint_level, confidence_nudge, latency_ms, claude_called, tokens_used}

4. PCR safety: mastery<0.4 = context only, 0.4-0.7 = hints/partial, >0.7 = full
5. Answer-leak prevention: scan response for answer keywords, strip if mastery<0.7
6. Fallback to template if any component fails
7. All imports lazy (try/except)
8. Pure Python. Output ONLY Python code, no markdown fences."""),
    
    "problem_parser.py": (12000, """Generate `problem_parser.py` — parses JEE/NEET problems into structured form.

1. ParsedProblem dataclass: raw_text, subject, exam_type, givens (list of {quantity, value, unit, symbol}), unknowns (list of {quantity, symbol, unit}), concepts (list[str]), constraints (list[str]), difficulty, estimated_steps

2. ProblemParser class:
   - parse(self, problem_text, subject=None) -> ParsedProblem
   - Uses Claude API (urllib.request) to extract structure
   - Falls back to regex for common patterns
   - extract_givens(text) -> list[dict]
   - extract_unknowns(text) -> list[dict]
   - identify_concepts(text, subject) -> list[str]
   - classify_difficulty(text) -> str

3. Concept identification for physics, chemistry, math, biology
4. API: URL=https://api.claudeopus.pro/v1/messages, KEY=sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna, MODEL=fable
5. Pure Python + urllib.request. Output ONLY Python code, no markdown fences."""),
    
    "strategy_library.py": (14000, """Generate `strategy_library.py` — a library of problem-solving strategies for JEE/NEET.

1. Strategy dataclass: strategy_id, name, subject, topic, trigger_pattern, approach, formulas (list), common_pitfalls (list), example

2. StrategyLibrary class:
   - __init__(self) — loads all strategies
   - get_strategies_for_concepts(self, concepts, subject) -> list[Strategy]
   - get_strategy_by_id(self, strategy_id) -> Strategy
   - get_strategies_by_topic(self, topic) -> list[Strategy]
   - add_strategy(self, strategy)

3. Include exactly 40 strategies (keep it concise to fit in tokens):
   PHYSICS (15): free body diagram, energy conservation, momentum conservation, projectile decomposition, rotational dynamics, Gauss law, Kirchhoff laws, magnetic force, lens formula, Doppler effect, thermodynamics, SHM, wave equation, photoelectric, nuclear reactions
   CHEMISTRY (10): electrophile/nucleophile, reaction mechanism, mole concept, equilibrium, Nernst equation, hybridization, isomerism, thermodynamic spontaneity, rate law, buffer solution
   MATH (10): limits L'Hopital, integration by parts, definite integral properties, differential equations, coordinate geometry locus, probability Bayes, complex numbers Euler, matrices eigenvalue, sequences AP/GP/HP, trigonometric substitution
   BIOLOGY (5): genetic cross, physiological pathway, ecological interaction, cell structure function, evolution mechanism

4. Each strategy: 2-3 lines of approach, 1-2 formulas, 1 pitfall. Keep CONCISE.
5. Pure Python. Output ONLY Python code, no markdown fences."""),
    
    "decomposition_engine.py": (12000, """Generate `decomposition_engine.py` — breaks JEE/NEET problems into sub-problems.

1. SubProblem dataclass: sub_problem_id, description, concept, strategy, inputs (dict), output_symbol, dependencies (list), solver_type

2. DecompositionPlan dataclass: sub_problems (list), execution_order (list), synthesis_steps (list), estimated_difficulty

3. DecompositionEngine class:
   - decompose(self, parsed_problem, available_strategies) -> DecompositionPlan
   - Uses Claude API (urllib.request, model=fable, key=sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna, url=https://api.claudeopus.pro/v1/messages)
   - identify_sub_problems(problem) -> list[SubProblem]
   - order_sub_problems(sub_problems) -> list (topological sort)
   - plan_synthesis(sub_problems, original_problem) -> list[str]

4. Decomposition heuristics for physics, chemistry, math
5. Pure Python + urllib.request. Output ONLY Python code, no markdown fences."""),
    
    "verification_engine.py": (12000, """Generate `verification_engine.py` — 5-layer answer verification for JEE/NEET.

1. VerificationResult dataclass: passed, layers_checked (list), layer_results (dict), confidence (float), issues (list), corrections (list)

2. VerificationEngine class:
   - verify(self, problem, solution) -> VerificationResult
   - check_dimensions(formula, expected_units) -> bool
   - check_limiting_cases(solution, problem) -> bool
   - check_magnitude(answer, expected_range) -> bool
   - solve_multiple_ways(problem) -> list (solve using different strategies)
   - compare_solutions(solutions) -> bool
   - check_format(answer, exam_type) -> bool

3. 5 layers: dimensional analysis (30%), limiting cases (20%), numerical sanity (20%), self-consistency (20%), format check (10%)
4. Overall confidence = weighted average
5. Dimension vectors for: m, kg, s, A, K, mol
6. Pure Python. Try import sympy, fallback to string-based. Output ONLY Python code, no markdown fences."""),
    
    "self_play_generator.py": (14000, """Generate `self_play_generator.py` — generates novel JEE/NEET problems.

1. GeneratedProblem dataclass: problem_id, problem_text, subject, concepts (list), difficulty, solution (dict), verification (dict), is_valid, generation_method

2. SelfPlayGenerator class:
   - __init__(self, strategy_library=None, symbolic_solver=None, verification_engine=None)
   - generate(self, subject, difficulty, num_concepts=3) -> GeneratedProblem
   - generate_batch(self, count, subject=None) -> list[GeneratedProblem]
   - validate(self, problem) -> bool

3. Generation strategies: concept_combination, parameter_variation, constraint_addition, context_switch, difficulty_escalation
4. Uses Claude API (urllib.request, model=fable, key=sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna, url=https://api.claudeopus.pro/v1/messages)
5. Save valid problems to D:\\platform\\cbse_data\\generated_problems.json
6. Track success rate by subject/difficulty
7. Keep CONCISE to fit tokens. Pure Python. Output ONLY Python code, no markdown fences."""),
}

def generate_file(filename, max_tokens, prompt, results):
    try:
        ctx = ssl.create_default_context()
        body = json.dumps({
            "model": "fable",
            "max_tokens": max_tokens,
            "system": "You are an expert Python engineer. Output only valid Python code, no markdown fences, no explanations. Keep code concise but complete.",
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
            if text.startswith("```"):
                lines = text.split("\n")
                lines = [l for l in lines if not l.strip().startswith("```")]
                text = "\n".join(lines)
            usage = data.get("usage", {})
            elapsed = time.time() - t0
            try:
                ast.parse(text)
                valid = True
            except SyntaxError as e:
                valid = False
                err = f"line {e.lineno}: {e.msg}"
            out_path = os.path.join(OUT_DIR, filename)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(text)
            results[filename] = {
                "status": "OK" if valid else "SYNTAX_ERROR",
                "chars": len(text),
                "lines": text.count("\n"),
                "tokens_out": usage.get("output_tokens", 0),
                "elapsed_s": round(elapsed, 1),
                "error": err if not valid else None,
            }
            print(f"DONE {filename}: {len(text)} chars, {usage.get('output_tokens',0)} tokens, {elapsed:.1f}s {'VALID' if valid else 'SYNTAX_ERROR: '+err}")
    except Exception as e:
        results[filename] = {"status": "ERROR", "error": str(e)[:200]}
        print(f"FAIL {filename}: {str(e)[:200]}")

results = {}
threads = []
for filename, (max_tokens, prompt) in FILES.items():
    t = threading.Thread(target=generate_file, args=(filename, max_tokens, prompt, results))
    t.start()
    threads.append(t)
    print(f"Launched: {filename} (max {max_tokens} tokens)")

print(f"\n{len(threads)} Fable calls launched. Waiting...")
for t in threads:
    t.join()

print("\n=== RESULTS ===")
ok = sum(1 for r in results.values() if r.get("status") == "OK")
fail = sum(1 for r in results.values() if r.get("status") != "OK")
total_out = sum(r.get("tokens_out", 0) for r in results.values())
for f, r in sorted(results.items()):
    s = r.get("status")
    if s == "OK":
        print(f"  OK   {f}: {r['lines']} lines, {r['tokens_out']} tokens")
    else:
        print(f"  FAIL {f}: {r.get('error', s)}")
print(f"\n{ok} OK, {fail} FAIL, {total_out} output tokens")
