"""Generate ALL remaining intelligence layer + JEE solver files in parallel via Fable API."""
import urllib.request, json, ssl, ast, threading, time, os

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
OUT_DIR = r"D:\platform\backend\services"

FILES = {
    "concept_graph_traverser.py": """Generate `concept_graph_traverser.py` — a structural knowledge graph traverser for a K-12 learning platform. NO embeddings, NO semantic similarity, NO RAG. Pure graph traversal.

Loads parsed enrichment data from D:\\platform\\cbse_data\\enrichment_parsed.json (if exists) or directly from node JSON files at D:\\platform\\cbse_data\\nodes\\by_subject\\*.json.

REQUIREMENTS:
1. ConceptGraphTraverser class:
   - __init__(self, nodes_dir, enrichment_json_path=None) — loads all nodes into memory, builds adjacency lists
   - get_concept(self, node_id) -> dict (all fields for this node)
   - get_prerequisites(self, node_id, depth=3) -> list[dict] — BFS traversal up to depth levels, each with {node_id, title, subject, mastery_status, is_blocking}
   - get_forward_concepts(self, node_id) -> list[dict] — what this concept unlocks
   - get_cross_subject_links(self, node_id) -> list[dict] — {node_id, subject, topic, reason}
   - get_misconceptions(self, node_id, include_prereqs=False) -> list[dict] — {misconception, explanation, correction}
   - get_diagnostic_question(self, node_id) -> dict — {question, answer, level}
   - get_on_failure_strategy(self, node_id) -> str
   - get_teaching_context(self, node_id, student_mastery_map=None) -> dict — compact context for orchestrator
   - get_prerequisite_chain(self, node_id) -> list[str] — full chain from root to current
   - find_root_cause(self, node_id, student_mastery_map) -> str — traces back through prereqs to find the first unmastered one
   - get_related_by_tags(self, node_id) -> list[dict] — concepts sharing same concept_tags
   - LRU cache on all methods (@functools.lru_cache(maxsize=1000))
   - If node not found, return empty result with warning. Never crash.
2. TeachingContext dataclass with all fields.
3. Pure Python, no external deps. Output ONLY Python code, no markdown fences.""",

    "deterministic_orchestrator.py": """Generate `deterministic_orchestrator.py` — a rules-based decision engine for an ES-LLMs tutoring architecture.

Based on AIED 2026 research: the orchestrator is DETERMINISTIC (no LLM calls). It evaluates student state + teaching context, runs through prioritized rules, and selects which specialized agent's action to execute. Rules are stored in OrchestratorRule table and can be updated by the Meta-Brain nightly.

REQUIREMENTS:
1. OrchestratorRule dataclass:
   - rule_name: str, condition: dict, action: dict, priority: int, is_active: bool, source: str
2. DeterministicOrchestrator class:
   - __init__(self) — loads default rules (hardcoded initial set)
   - add_rule(self, rule: OrchestratorRule) — adds a new rule (from Meta-Brain)
   - deactivate_rule(self, rule_name: str) — disables a rule
   - decide(self, student_state: dict, teaching_context: dict, interaction_history: list, proposed_actions: list) -> AgentAction
   - The decide() method:
     a. Sort rules by priority (lower = higher priority)
     b. For each active rule, check if condition matches student_state
     c. First matching rule wins (subsumption architecture from robotics)
     d. Return the action from the matching rule
   - get_active_rules() -> list[OrchestratorRule]
   - update_rule_effectiveness(self, rule_name, outcome_score) — tracks how often each rule leads to good outcomes
3. DEFAULT RULES (initial set, will be refined by Meta-Brain):
   - "ethics_first": if student hasn't attempted -> block hints (priority 10)
   - "hint_cap": if hints_used >= 3 -> no more hints, redirect to prerequisite (priority 15)
   - "prerequisite_gap": if any prerequisite mastery < 0.4 -> redirect to prerequisite (priority 20)
   - "high_frustration": if frustration_level > 0.7 -> use empathy + reduce difficulty (priority 25)
   - "boredom_detected": if boredom_level > 0.6 -> increase challenge (priority 30)
   - "low_mastery_2_failures": if mastery < 0.4 and failures >= 2 -> scaffold level 2 (priority 40)
   - "medium_mastery": if 0.4 <= mastery < 0.7 -> assessment with application question (priority 50)
   - "high_mastery": if mastery >= 0.7 -> challenge with synthesis question (priority 60)
   - "overconfident_wrong": if confidence > 0.7 and is_correct=False -> address misconception directly (priority 35)
   - "late_night_support": if hour > 20 and mastery < 0.3 -> increase scaffolding (priority 45)
   - "default_tutor": fallback -> use TutorBot with text explanation (priority 100)
4. Each rule's condition is a dict like: {"field": "mastery", "operator": "<", "value": 0.4}
5. evaluate_condition(condition, student_state) -> bool — supports operators: <, >, <=, >=, ==, !=, in, not_in, and, or
6. Pure Python. No external deps. Output ONLY Python code, no markdown fences.""",

    "meta_brain.py": """Generate `meta_brain.py` — the nightly self-improvement engine for a K-12 learning platform.

This is the META-BRAIN that calibrates the entire system. It runs 7 jobs nightly, mining patterns from interaction logs and updating rules, agent parameters, misconceptions, and content gaps.

REQUIREMENTS:
1. MetaBrain class with 7 job methods:
   - run_all_jobs(interactions: list, enrichment_data: dict) -> MetaBrainReport
   - Each job returns a JobResult with: job_name, findings, updates_made, tokens_used

2. Job 1: mine_strategy_effectiveness(interactions)
   - Group by (teaching_strategy, concept)
   - Calculate: mastery_gain, next_item_correctness_rate, engagement_score
   - Compare strategies for same concept
   - Return: which strategies work best for which concepts
   - Output: recommended strategy changes

3. Job 2: calibrate_agents(interactions)
   - Analyze ScaffoldBot: which hint levels lead to best outcomes?
   - Analyze AssessmentBot: which question types have best discrimination?
   - Analyze FeedbackBot: which feedback types lead to mastery?
   - Return: parameter adjustments for each agent

4. Job 3: discover_misconceptions(interactions)
   - Cluster errors by (concept, error_type, response_pattern)
   - Find clusters with >= 3 students making same error
   - Check if error matches existing misconception in enrichment data
   - If new -> flag for Claude classification (return list of novel patterns)
   - Return: new misconceptions discovered, existing ones confirmed

5. Job 4: discover_rules(interactions)
   - Find patterns: "when X condition, Y strategy works better"
   - Compare outcomes: students who got strategy A vs strategy B for same conditions
   - If statistically significant difference -> propose new orchestrator rule
   - Return: proposed rules for A/B testing

6. Job 5: discover_cross_subject_dependencies(interactions)
   - Find: students who fail concept A in subject X also fail concept B in subject Y
   - Calculate correlation
   - If correlation > 0.5 and sample >= 10 -> propose cross-subject dependency
   - Return: proposed dependencies

7. Job 6: detect_content_gaps(interactions)
   - Find concepts with > 70% failure rate across multiple students
   - Classify gap: missing_content, insufficient_practice, prerequisite_gap, poor_explanation
   - Return: content gap flags with severity

8. Job 7: update_confidence_calibration(interactions)
   - Per student: compare confidence ratings to actual accuracy
   - Detect systemic overconfidence/underconfidence patterns
   - Return: calibration updates

9. MetaBrainReport dataclass:
   - job_results: list[JobResult]
   - total_findings: int
   - rules_proposed: int
   - misconceptions_discovered: int
   - content_gaps_found: int
   - strategy_updates: int
   - summary: str (human-readable summary)

10. Statistical methods: use simple statistics (mean, std, correlation) — pure Python, no numpy required.
11. All jobs are read-only on existing data. They produce recommendations, never modify data directly.
12. Pure Python. No external deps. Output ONLY Python code, no markdown fences.""",

    "rule_ab_tester.py": """Generate `rule_ab_tester.py` — A/B testing for orchestrator rules proposed by the Meta-Brain.

REQUIREMENTS:
1. ABTest dataclass:
   - test_name: str, control_rule: str, variant_rule: str, status: str (running, completed, inconclusive)
   - start_date: str, end_date: str
   - control_interactions: int, variant_interactions: int
   - control_mastery_gain: float, variant_mastery_gain: float
   - control_next_item_correctness: float, variant_next_item_correctness: float
   - winner: str (control, variant, none)
   - confidence_level: float

2. RuleABTester class:
   - create_test(test_name, control_rule, variant_rule, min_sample_size=30) -> ABTest
   - assign_student(test_name, student_id) -> str ("control" or "variant") — random assignment, sticky per student
   - record_outcome(test_name, variant, mastery_gain, next_item_correct) — accumulates data
   - check_significance(test_name) -> dict — t-test or simple comparison
   - declare_winner(test_name) -> str — if significant, returns winner
   - get_active_tests() -> list[ABTest]
   - get_completed_tests() -> list[ABTest]
   - auto_check_all() -> checks all running tests, declares winners where significant

3. Significance check:
   - Simple: if |control_metric - variant_metric| > 0.1 and both have >= min_sample_size -> significant
   - More rigorous: Welch's t-test (pure Python implementation)
   - p < 0.05 -> significant

4. Storage: in-memory + JSON file (D:\\platform\\cbse_data\\ab_tests.json)
5. Pure Python. No external deps. Output ONLY Python code, no markdown fences.""",

    "claude_renderer.py": """Generate `claude_renderer.py` — the single Claude API call that converts a structured pedagogical action into natural language.

Based on ES-LLMs architecture: the orchestrator decides WHAT to do, Claude only renders HOW to say it. Stateless prompts, minimal tokens.

REQUIREMENTS:
1. ClaudeRenderer class:
   - __init__(self, api_key, api_url, model="fable")
   - render(self, agent_action: dict, student_state: dict, teaching_context: dict, language="en") -> str
   - The render method:
     a. Builds a compact, stateless prompt from the action + context
     b. Calls Claude API (urllib.request)
     c. Returns natural language response
     d. Caches response (key = hash of prompt)
     e. Falls back to template if API fails

2. Prompt construction:
   - System: "You are a K-12 tutor. Convert the given pedagogical action into natural language. Never give direct answers. Be encouraging but precise. Match the student's level."
   - User: JSON with {action_type, content_payload, student_mastery_bucket, affective_state, concept_title, language}
   - Max 300 tokens output
   - Temperature 0.7

3. Caching:
   - In-memory LRU cache (1000 entries)
   - Optional: ClaudeReasoningCache table for persistent cache
   - Cache key = hash of (action_type + content_payload + mastery_bucket + language)

4. Fallback templates (if API fails):
   - assess: "Let's check your understanding. {question}"
   - scaffold: "Here's a hint: {hint}"
   - feedback: "Not quite. {feedback} Let's try again."
   - motivate: "{encouragement}"
   - tutor: "Let me explain. {explanation}"
   - redirect: "Before we continue, let's review {prerequisite_concept} first."

5. Token tracking: log input_tokens, output_tokens for each call
6. Timeout: 10 seconds, fall back to template on timeout
7. Pure Python (urllib.request). No external deps. Output ONLY Python code, no markdown fences.""",

    "socratic_pipeline_v3.py": """Generate `socratic_pipeline_v3.py` — the integrated tutoring pipeline that wires together all intelligence components.

This replaces the old socratic_pipeline.py template-based system. It uses: 4D state builder, concept graph traverser, specialized agents, deterministic orchestrator, Claude renderer, interaction capture, confidence calibrator.

REQUIREMENTS:
1. SocraticPipelineV3 class:
   - __init__(self, enrichment_data, nodes_data) — loads all components
   - process_interaction(self, student_id, query, node_id, mastery_map, interaction_history, language="en") -> SocraticResponse

2. process_interaction flow:
   a. Build 4D student state (state_4d_builder)
   b. Get teaching context from concept graph (concept_graph_traverser)
   c. Run all 6 specialized agents -> get proposed actions
   d. Orchestrator decides winning action (deterministic_orchestrator)
   e. Claude renderer converts action to natural language (claude_renderer)
   f. Log interaction (interaction_capture)
   g. Return SocraticResponse

3. SocraticResponse dataclass:
   - text: str (the natural language response)
   - action_type: str (assess, scaffold, feedback, motivate, tutor, redirect)
   - agent_used: str
   - rule_used: str
   - mastery_before: float
   - mastery_after: float (updated by BKT)
   - misconceptions_addressed: list[str]
   - hint_level: int
   - confidence_nudge: str
   - latency_ms: int
   - claude_called: bool (False if cache hit)
   - tokens_used: int

4. PCR (Progressive Context Revelation) safety:
   - mastery < 0.4: context only, no answer chunks, no direct solutions
   - mastery 0.4-0.7: prerequisite-first, hints, structure, partial info
   - mastery > 0.7: full reveal allowed
   - The orchestrator enforces this, but pipeline double-checks

5. Answer-leak prevention:
   - After rendering, scan response for answer keywords from diagnostic_question
   - If answer detected and mastery < 0.7 -> strip answer, replace with question
   - Log any leak attempts

6. Fallback: if any component fails, fall back to simple template response
7. The pipeline should work WITHOUT a database (all in-memory) for dev/testing
8. Import all components lazily (try/except) so missing components don't crash the pipeline
9. Pure Python. Output ONLY Python code, no markdown fences.""",

    "problem_parser.py": """Generate `problem_parser.py` — parses JEE/NEET competitive exam problems into structured form.

NOT RAG. This is pure problem decomposition — extract givens, unknowns, concepts, constraints from a problem statement.

REQUIREMENTS:
1. ParsedProblem dataclass:
   - raw_text: str
   - subject: str (physics, chemistry, mathematics, biology)
   - exam_type: str (jee_main, jee_advanced, neet)
   - givens: list[dict] — {quantity, value, unit, symbol}
   - unknowns: list[dict] — {quantity, symbol, unit}
   - concepts: list[str] — which of the 200 core JEE concepts are involved
   - constraints: list[str] — physical/mathematical constraints
   - diagrams: list[str] — description of any diagrams needed
   - difficulty: str (easy, medium, hard, very_hard)
   - estimated_steps: int

2. ProblemParser class:
   - parse(self, problem_text, subject=None) -> ParsedProblem
   - Uses Claude API (fable model) to extract structure from problem text
   - Falls back to regex-based extraction for common patterns if API fails
   - extract_givens(text) -> list[dict] — find "mass = 5kg", "velocity = 10 m/s" etc.
   - extract_unknowns(text) -> list[dict] — find "find the...", "calculate...", "determine..."
   - identify_concepts(text, subject) -> list[str] — which concepts are involved
   - classify_difficulty(text) -> str — based on number of concepts, steps, novelty

3. Concept identification:
   - Physics: mechanics, electromagnetism, optics, thermodynamics, modern physics, waves
   - Chemistry: organic, inorganic, physical — sub-categories
   - Math: algebra, calculus, coordinate geometry, trigonometry, probability
   - Biology: genetics, physiology, ecology, cell biology

4. Pure Python + urllib.request for API. Output ONLY Python code, no markdown fences.""",

    "strategy_library.py": """Generate `strategy_library.py` — a library of 50+ problem-solving strategies for JEE/NEET.

NOT RAG. This is a strategy library — when you see pattern X, use approach Y. Strategies are domain-specific heuristics, not retrieved content.

REQUIREMENTS:
1. Strategy dataclass:
   - strategy_id: str
   - name: str
   - subject: str (physics, chemistry, math, biology)
   - topic: str (e.g., "rotational_motion", "organic_chemistry", "calculus")
   - trigger_pattern: str — when to use this strategy
   - approach: str — step-by-step approach
   - formulas: list[str] — key formulas involved
   - common_pitfalls: list[str]
   - example: str

2. StrategyLibrary class:
   - __init__(self) — loads all 50+ strategies
   - get_strategies_for_concepts(self, concepts: list[str], subject: str) -> list[Strategy]
   - get_strategy_by_id(self, strategy_id) -> Strategy
   - get_strategies_by_topic(self, topic: str) -> list[Strategy]
   - add_strategy(self, strategy: Strategy) — for system expansion

3. Include 50+ strategies covering:
   PHYSICS (20):
   - Free body diagram approach
   - Energy conservation method
   - Momentum conservation
   - Lagrangian method for constrained systems
   - Gauss's law for symmetric charge distributions
   - Kirchhoff's laws for circuits
   - Magnetic force on moving charge
   - Lens/mirror formula with sign convention
   - Doppler effect (source/observer moving)
   - Thermodynamic process identification
   - SHM equation setup
   - Wave equation derivation
   - Photoelectric effect analysis
   - Nuclear reaction balancing
   - Projectile motion decomposition
   - Rotational dynamics (torque + moment of inertia)
   - Fluid mechanics (Bernoulli + continuity)
   - Capacitor circuit analysis
   - Magnetic field due to current configurations
   - Interference and diffraction patterns

   CHEMISTRY (15):
   - Electrophile/nucleophile identification
   - Reaction mechanism prediction
   - Mole concept stoichiometry
   - Equilibrium constant setup
   - Nernst equation for electrochemistry
   - Hybridization determination
   - Isomerism identification
   - Named reaction recognition
   - Thermodynamic spontaneity (Gibbs)
   - Rate law determination
   - Buffer solution analysis
   - Coordination compound analysis
   - Aromaticity check (Huckel's rule)
   - Functional group transformation
   - pH calculation methods

   MATH (10):
   - Limits: L'Hopital vs direct substitution vs factoring
   - Integration by parts (ILATE rule)
   - Definite integral properties (king's rule, etc.)
   - Differential equation identification (linear/homogeneous/exact)
   - Coordinate geometry: locus problems
   - Probability: Bayes theorem vs direct
   - Complex numbers: Euler form vs algebraic
   - Matrices: eigenvalue approach vs direct
   - Sequences: AP/GP/HP identification
   - Trigonometric substitution strategy

   BIOLOGY (5):
   - Genetic cross analysis (Punnett square)
   - Physiological pathway tracing
   - Ecological interaction identification
   - Cell structure function mapping
   - Evolution mechanism identification

4. Each strategy should be a concrete, actionable heuristic — not generic advice.
5. Pure Python. Output ONLY Python code, no markdown fences.""",

    "decomposition_engine.py": """Generate `decomposition_engine.py` — breaks JEE/NEET problems into solvable sub-problems.

NOT RAG. This is problem decomposition — take a complex problem, break it into pieces that can each be solved independently, then synthesize.

REQUIREMENTS:
1. SubProblem dataclass:
   - sub_problem_id: str
   - description: str
   - concept: str
   - strategy: str (from strategy_library)
   - inputs: dict (known quantities)
   - output_symbol: str (what this sub-problem computes)
   - dependencies: list[str] (other sub-problem IDs that must be solved first)
   - solver_type: str (sympy, numerical, claude_reasoning, physics_formula)

2. DecompositionPlan dataclass:
   - sub_problems: list[SubProblem]
   - execution_order: list[str] (topological sort of sub-problem IDs)
   - synthesis_steps: list[str] (how to combine sub-solutions)
   - estimated_difficulty: str

3. DecompositionEngine class:
   - decompose(self, parsed_problem: dict, available_strategies: list) -> DecompositionPlan
   - Uses Claude API (fable) to reason about decomposition
   - Falls back to rule-based decomposition for common patterns
   - identify_sub_problems(problem) -> list[SubProblem]
   - order_sub_problems(sub_problems) -> list[str] (topological sort)
   - plan_synthesis(sub_problems, original_problem) -> list[str]

4. Decomposition heuristics:
   - If problem has "equilibrium" + "multiple forces" -> decompose into: force analysis, equilibrium equation, solve
   - If problem has "circuit" + "multiple loops" -> decompose into: label currents, Kirchhoff voltage law per loop, solve system
   - If problem has "organic reaction" + "reagent" -> decompose into: identify substrate, identify reagent role, predict mechanism, determine product
   - If problem has "integration" + "limits" + "parameter" -> decompose into: identify integral type, apply technique, evaluate, check properties

5. The engine should handle multi-concept problems (3-5 concepts combined).
6. Pure Python + urllib.request for API. Output ONLY Python code, no markdown fences.""",

    "symbolic_solver.py": """Generate `symbolic_solver.py` — solves sub-problems using SymPy + numerical methods.

NOT RAG. This is actual computation — symbolic math, equation solving, numerical methods.

REQUIREMENTS:
1. SolverResult dataclass:
   - sub_problem_id: str
   - success: bool
   - symbolic_result: str (SymPy expression as string)
   - numerical_result: float (if applicable)
   - steps: list[str] (step-by-step solution)
   - units: str (if applicable)
   - error: str (if failed)

2. SymbolicSolver class:
   - solve_sub_problem(self, sub_problem: dict) -> SolverResult
   - solve_equation(self, equation: str, variable: str) -> SolverResult
   - solve_system(self, equations: list[str], variables: list[str]) -> SolverResult
   - differentiate(self, expression: str, variable: str) -> SolverResult
   - integrate(self, expression: str, variable: str, limits=None) -> SolverResult
   - simplify(self, expression: str) -> SolverResult
   - solve_physics(self, formula: str, known: dict, unknown: str) -> SolverResult
   - solve_chemistry(self, reaction: str, known: dict) -> SolverResult

3. Use SymPy for symbolic math:
   - from sympy import symbols, solve, Eq, simplify, diff, integrate, Symbol, Rational, sqrt, pi
   - Handle units (convert to SI, solve, convert back)
   - Handle vector quantities (decompose into components)

4. Physics formula solver:
   - Known formulas: F=ma, F=qvB, F=-kx, v=u+at, s=ut+0.5at^2, E=mc^2, etc.
   - Given known quantities, solve for unknown
   - Handle vector components (sin/cos for inclined planes, etc.)

5. Numerical fallback:
   - If SymPy can't solve symbolically, use scipy.optimize.fsolve
   - If scipy not available, use simple Newton-Raphson implementation

6. Step-by-step output:
   - Show formula used
   - Show substitution of values
   - Show intermediate steps
   - Show final answer with units

7. Error handling: if solver fails, return SolverResult with success=False and error message
8. Try to import sympy, if not available, use pure Python fallback for basic operations
9. Output ONLY Python code, no markdown fences.""",

    "verification_engine.py": """Generate `verification_engine.py` — 5-layer answer verification for JEE/NEET problems.

NOT RAG. This is verification — check if the computed answer is actually correct using multiple independent methods.

REQUIREMENTS:
1. VerificationResult dataclass:
   - passed: bool
   - layers_checked: list[str]
   - layer_results: dict[str, bool]
   - confidence: float (0-1)
   - issues: list[str]
   - corrections: list[str]

2. VerificationEngine class:
   - verify(self, problem: dict, solution: dict) -> VerificationResult
   - Runs all 5 verification layers

3. Layer 1: Dimensional Analysis
   - check_dimensions(formula, expected_units) -> bool
   - Verify all equations are dimensionally consistent
   - Verify final answer has correct units
   - Common physics units: m, kg, s, A, K, mol

4. Layer 2: Limiting Cases
   - check_limiting_cases(solution, problem) -> bool
   - Set parameters to 0: does answer make sense?
   - Set parameters to infinity: does answer approach expected limit?
   - Set friction to 0: does pure mechanics answer emerge?
   - Set mass to 0: does kinematic answer emerge?

5. Layer 3: Numerical Sanity Check
   - check_magnitude(answer, expected_range) -> bool
   - Velocity of car should be 0-100 m/s, not 10^6 m/s
   - Energy should be positive
   - Probability should be 0-1
   - Angle should be 0-360 or 0-2pi

6. Layer 4: Self-Consistency
   - solve_multiple_ways(problem) -> list[str] — solve using different strategies
   - compare_solutions(solutions) -> bool — do they agree?
   - If 2+ methods agree -> high confidence
   - If methods disagree -> flag issue

7. Layer 5: Format Check
   - check_format(answer, exam_type) -> bool
   - JEE Advanced: numerical answers need specific precision
   - JEE Main: MCQ format
   - NEET: MCQ format
   - Check significant figures

8. Overall confidence = weighted average of layer results:
   - Dimensional: 30% weight (if fails, confidence = 0)
   - Limiting cases: 20%
   - Numerical sanity: 20%
   - Self-consistency: 20%
   - Format: 10%

9. Pure Python. Try to import sympy for dimensional analysis, fallback to string-based. Output ONLY Python code, no markdown fences.""",

    "self_play_generator.py": """Generate `self_play_generator.py` — generates novel JEE/NEET problems by combining concepts.

NOT RAG. This is problem GENERATION — create new problems that don't exist in any database, verify they're solvable, add to library.

REQUIREMENTS:
1. GeneratedProblem dataclass:
   - problem_id: str
   - problem_text: str
   - subject: str
   - concepts: list[str]
   - difficulty: str
   - solution: dict (computed solution)
   - verification: dict (verification result)
   - is_valid: bool
   - generation_method: str

2. SelfPlayGenerator class:
   - __init__(self, strategy_library, symbolic_solver, verification_engine)
   - generate(self, subject, difficulty, num_concepts=3) -> GeneratedProblem
   - generate_batch(self, count, subject=None) -> list[GeneratedProblem]
   - validate(self, problem) -> bool — solve + verify, return True if valid

3. Generation strategies:
   a. CONCEPT COMBINATION: Pick 3-5 random concepts from different topics, force a combination
   b. PARAMETER VARIATION: Take existing problem, change parameters, verify still solvable
   c. CONSTRAINT ADDITION: Take simple problem, add a constraint (friction, air resistance, etc.)
   d. CONTEXT SWITCH: Take physics problem, change context (mechanics -> electromagnetism)
   e. DIFFICULTY ESCALATION: Take medium problem, add a twist that makes it hard

4. Uses Claude API (fable) to generate problem text, then:
   - Parse it (problem_parser)
   - Decompose it (decomposition_engine)
   - Solve it (symbolic_solver)
   - Verify it (verification_engine)
   - If all pass -> valid problem, add to library
   - If solver can't solve -> analyze why, improve solver or discard problem

5. Problem library:
   - Save valid problems to D:\\platform\\cbse_data\\generated_problems.json
   - Track which problems stumped the solver (for improvement)
   - Track success rate by subject, difficulty, concept count

6. Self-improvement loop:
   - If generator creates a problem the solver can't solve:
     a. Log the failure
     b. Analyze what strategy was missing
     c. Propose new strategy for strategy_library
     d. Next generation attempt uses the new strategy

7. Pure Python + urllib.request for API. Output ONLY Python code, no markdown fences.""",

    "explanation_generator.py": """Generate `explanation_generator.py` — generates JEE-style step-by-step explanations for solved problems.

REQUIREMENTS:
1. Explanation dataclass:
   - problem_id: str
   - steps: list[ExplanationStep]
   - final_answer: str
   - key_insights: list[str]
   - time_estimate: int (minutes)
   - difficulty_rating: str

2. ExplanationStep dataclass:
   - step_number: int
   - title: str
   - content: str
   - formula_used: str (if any)
   - computation: str (if any)
   - insight: str (why this step matters)

3. ExplanationGenerator class:
   - generate(self, problem: dict, decomposition: dict, solutions: list, verification: dict) -> Explanation
   - Uses Claude API (fable) to write clear explanations
   - Falls back to template-based explanation if API fails

4. Explanation style (JEE/NEET standard):
   - Start with "Given:" section listing all known quantities
   - "To find:" section listing unknowns
   - "Approach:" section explaining the strategy
   - Numbered steps with formulas, substitutions, computations
   - Box the final answer
   - Add "Key Insight" callouts for non-obvious steps
   - Add "Common Mistake" warnings for typical errors

5. Bilingual support:
   - Can generate in English or Hindi (language parameter)
   - Technical terms stay in English, explanation in Hindi

6. Adapt to student level:
   - For struggling student: more detailed steps, simpler language
   - For advanced student: concise steps, focus on insights
   - Uses 4D student state to calibrate explanation depth

7. Pure Python + urllib.request for API. Output ONLY Python code, no markdown fences.""",

    "jee_neet_solver.py": """Generate `jee_neet_solver.py` — the main orchestrator for JEE/NEET competitive exam problem solving.

This is the ENTRY POINT for solving competitive exam problems. It wires together: problem_parser, strategy_library, decomposition_engine, symbolic_solver, verification_engine, explanation_generator.

NOT RAG. Pure reasoning + computation pipeline.

REQUIREMENTS:
1. JEENEETSolver class:
   - __init__(self) — loads all components
   - solve(self, problem_text, subject=None, exam_type=None, student_state=None) -> SolveResult
   - solve_batch(self, problems: list) -> list[SolveResult]

2. SolveResult dataclass:
   - problem_text: str
   - parsed_problem: dict
   - decomposition_plan: dict
   - sub_solutions: list[dict]
   - final_answer: str
   - verification_result: dict
   - explanation: dict
   - confidence: float (0-1)
   - solved: bool
   - solving_time_ms: int
   - strategies_used: list[str]
   - concepts_tested: list[str]
   - error: str (if failed)

3. solve() flow:
   a. Parse problem (problem_parser) -> ParsedProblem
   b. Identify concepts -> get strategies (strategy_library)
   c. Decompose into sub-problems (decomposition_engine)
   d. Solve each sub-problem in order (symbolic_solver)
   e. Synthesize sub-solutions into final answer
   f. Verify answer (verification_engine) — all 5 layers
   g. If confidence < 0.7: retry with different strategy
   h. If confidence >= 0.7: generate explanation (explanation_generator)
   i. Return SolveResult

4. Retry logic:
   - If verification fails, try alternative strategy from strategy_library
   - Max 3 retries with different strategies
   - If all fail, return solved=False with analysis of why

5. Logging:
   - Log every solve attempt with: problem, strategy used, success/failure, time, confidence
   - Save to D:\\platform\\cbse_data\\solve_log.json
   - Track success rate by subject, difficulty, concept count

6. Integration with K-12 intelligence layer:
   - If student_state provided, calibrate explanation depth
   - Log interaction to interaction_capture
   - Update mastery if student attempts the problem

7. CLI mode:
   - python jee_neet_solver.py --solve "problem text" --subject physics
   - python jee_neet_solver.py --batch problems.json
   - python jee_neet_solver.py --stats

8. Pure Python. All components imported lazily. Output ONLY Python code, no markdown fences.""",
}

def generate_file(filename, prompt, results):
    try:
        ctx = ssl.create_default_context()
        body = json.dumps({
            "model": "fable",
            "max_tokens": 16000,
            "system": "You are an expert Python engineer. Output only valid Python code, no markdown fences, no explanations.",
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
            # Verify
            try:
                ast.parse(text)
                valid = True
            except:
                valid = False
            out_path = os.path.join(OUT_DIR, filename)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(text)
            results[filename] = {
                "status": "OK" if valid else "SYNTAX_ERROR",
                "chars": len(text),
                "lines": text.count("\n"),
                "tokens_in": usage.get("input_tokens", 0),
                "tokens_out": usage.get("output_tokens", 0),
                "elapsed_s": round(elapsed, 1),
            }
            print(f"DONE {filename}: {len(text)} chars, {usage.get('output_tokens',0)} tokens, {elapsed:.1f}s")
    except Exception as e:
        results[filename] = {"status": "ERROR", "error": str(e)[:200]}
        print(f"FAIL {filename}: {str(e)[:200]}")

# Launch all in parallel
results = {}
threads = []
for filename, prompt in FILES.items():
    t = threading.Thread(target=generate_file, args=(filename, prompt, results))
    t.start()
    threads.append(t)
    print(f"Launched: {filename}")

print(f"\n{len(threads)} Fable API calls launched in parallel. Waiting...")
for t in threads:
    t.join()

print("\n=== RESULTS ===")
total_in = 0
total_out = 0
ok = 0
fail = 0
for f, r in sorted(results.items()):
    status = r.get("status", "?")
    if status == "OK":
        ok += 1
        ti = r.get("tokens_in", 0)
        to = r.get("tokens_out", 0)
        total_in += ti
        total_out += to
        print(f"  OK   {f}: {r['lines']} lines, {r['chars']} chars, {to} tokens, {r['elapsed_s']}s")
    else:
        fail += 1
        print(f"  FAIL {f}: {r.get('error', status)}")

print(f"\nSummary: {ok} OK, {fail} FAIL")
print(f"Total tokens: {total_in} in, {total_out} out, {total_in+total_out} total")
