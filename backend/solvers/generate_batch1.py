"""
Batch 1: Backend Foundation + Core Solver
Generates 10 components in parallel via Fable-5 API calls.
API key read from environment variable (SECURITY FIX).
"""
import json, time, urllib.request, ssl, os, sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# SECURITY: Read API key from environment, never inline
API_KEY = os.environ.get('CLAUDE_API_KEY') or os.environ.get('ANTHROPIC_API_KEY')
if not API_KEY:
    print('ERROR: Set CLAUDE_API_KEY environment variable first')
    sys.exit(1)

API_URL = 'https://api.claudeopus.pro/v1/messages'
MODEL_CRITICAL = 'claude-fable-5'    # Fable-5 for critical code
MODEL_CONTENT = 'claude-opus-5'      # Opus for content/mappings
MAX_TOKENS = 64000

OUT_DIR = Path(r'D:\platform\backend')
OUT_DIR.mkdir(parents=True, exist_ok=True)

def call_claude(prompt, system_prompt=None, model=MODEL_CRITICAL, max_tokens=MAX_TOKENS):
    body = {'model': model, 'max_tokens': max_tokens,
            'messages': [{'role': 'user', 'content': prompt}]}
    if system_prompt:
        body['system'] = system_prompt
    payload = json.dumps(body).encode()
    for attempt in range(3):
        try:
            req = urllib.request.Request(API_URL, data=payload)
            req.add_header('x-api-key', API_KEY)
            req.add_header('Content-Type', 'application/json')
            req.add_header('anthropic-version', '2023-06-01')
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            resp = urllib.request.urlopen(req, timeout=600, context=ctx)
            data = json.loads(resp.read())
            for block in data['content']:
                if block['type'] == 'text':
                    return block['text']
            return ''
        except Exception as e:
            print('  Retry %d: %s' % (attempt + 1, str(e)[:80]), flush=True)
            time.sleep(5)
    return None

SYSTEM = """You are a world-class backend engineer building a K-12 learning platform for Indian students (CISCE/ICSE/ISC).

TECH STACK: FastAPI, async SQLAlchemy (PostgreSQL), Pydantic v2, SymPy, SciPy, NumPy, chempy, pint.

EXISTING CODE (D:\\platform\\backend\\):
- solvers/: 37 solver .py files (16 solver_*.py + 16 question_gen_*.py + core_calculus_engine/)
  Each solver has its OWN SolverResult dataclass with DIFFERENT fields. This must be unified.
- services/: 26 v2 services (knowledge_tracing.py, irt_feedback_loop.py, socratic_engine_v2.py, etc.)
  Most are NOT wired to any API router. This must be fixed.
- content_parsers/: parsers for CISCE curriculum data

RULES:
- Write ADDITIVE code only. Never break existing files.
- Use Pydantic v2 schemas for all API request/response models.
- All routers under /api/ prefix.
- JWT auth via Bearer token.
- Service layer pattern: routers call services, services call database.
- UUID primary keys with gen_random_uuid().
- Always include created_at and updated_at timestamps.
- Error responses: {"detail": "error message"}
- Must work offline-capable (no network calls for core solver computation).
- Must be fast: solve <2s, generate <500ms.
- Deterministic computation only (SymPy/SciPy). No LLM in solve path.
- Hinglish comments where helpful for Indian developer context.

OUTPUT FORMAT (CRITICAL):
You MUST respond with a single JSON object. No markdown, no code fences, no prose outside JSON.
The JSON must have exactly this structure:
{"code": "<full Python file content as a string>", "explanation": "<brief summary of what was built>"}

The "code" field must contain the COMPLETE Python file content — every line, no truncation, no placeholders.
The "code" string must be valid Python that passes `python -m py_compile`.
Do NOT wrap the code in markdown fences inside the JSON.
Escape all special characters properly for JSON (newlines as \\n, quotes as \\", backslashes as \\\\).
Do NOT include any text before or after the JSON object."""

# === BATCH 1 TASKS (10 parallel) ===

TASKS = [
    {
        'name': 'base_solver_result',
        'model': MODEL_CRITICAL,
        'out': 'solvers/base.py',
        'prompt': """GOAL: Create a shared SolverResult base module that ALL 37 existing solvers can adopt without breaking.

STUDENT CONTEXT: Class 9-12 ISC student, 16 years old, Android 11 phone with 2GB RAM, 3G network. Needs step-by-step solutions in <2 seconds. Solutions must show: rule applied, formula, before->after transformation, 1-sentence explanation in Hinglish.

EXISTING CODE: 
- solver_maths_c12.py has: Step(label, rule_applied, expression, explanation) + SolverResult(success, answer, steps, error, metadata)
- solver_physics_c12.py has: StepBuilder fluent API with law/formula/sub/comp/unit/verify/conclusion
- solver_chem_c12.py has different fields entirely
- All 37 solvers have INCOMPATIBLE result shapes

CONSTRAINTS:
- Must be backward compatible (existing solvers can adopt incrementally)
- Must support: success, answer, steps, error, metadata, verification_status, verification_details, unit, misconception_tags, solve_time_ms, seed
- Must serialize to JSON for API (but we prefer YAML for stored artifacts)
- Must support to_dict() and to_yaml() methods
- Steps must have: label, rule, formula, before, after, explanation, optional visual_hint

SUCCESS CRITERIA: Any solver can return this result shape and the API can serialize it without knowing which solver produced it.

WHAT NOT TO BUILD: Don't rewrite the solvers themselves. Just build the base module + a migration helper that existing solvers can import.

Write to: D:\\platform\\backend\\solvers\\base.py""",
    },
    {
        'name': 'latex_sympy_bridge',
        'model': MODEL_CRITICAL,
        'out': 'solvers/latex_sympy_bridge.py',
        'prompt': """GOAL: Bidirectional LaTeX <-> SymPy conversion so students type math naturally (via MathLive) and the backend understands it.

STUDENT CONTEXT: Student types "\\frac{x^2+1}{x-1}" in MathLive -> backend receives "(x**2+1)/(x-1)". Solver returns "x**3/3" -> student sees "x^3/3".

CONSTRAINTS:
- Must handle: fractions, exponents, roots, integrals, matrices, Greek letters, absolute values, piecewise functions, trig functions, logarithms, limits
- Must be fast (<10ms per conversion)
- Must handle edge cases: implicit multiplication (2x -> 2*x), nested fractions, superscripts/subscripts
- Must work offline (no API calls)
- Use sympy.latex() for SymPy->LaTeX
- Use sympy.parsing.latex.parse_latex() for LaTeX->SymPy (with antlr4-python3-runtime)

SUCCESS CRITERIA: 
- latex_to_sympy("\\frac{x^2+1}{x-1}") returns SymPy expression (x**2+1)/(x-1)
- sympy_to_latex(sp.Symbol('x')**3) returns "x^{3}"
- Round-trip: LaTeX -> SymPy -> LaTeX preserves meaning

WHAT NOT TO BUILD: No UI components. No MathLive integration (that's frontend). Just the Python bridge.

Write to: D:\\platform\\backend\\solvers\\latex_sympy_bridge.py""",
    },
    {
        'name': 'solver_registry',
        'model': MODEL_CRITICAL,
        'out': 'solvers/registry.py',
        'prompt': """GOAL: A plugin registry where dropping a new solver_*.py file makes it automatically available to the API. Zero manual wiring.

EXISTING CODE: 
- 16 solver files in D:\\platform\\backend\\solvers\\ (solver_maths_c11.py, solver_physics_c12.py, etc.)
- Each has a SOLVER_REGISTRY dict mapping problem_type -> solver_function
- 16 question_gen_*.py files with QUESTION_REGISTRY dicts
- YAML files: step_types_*.yaml, problem_types_*.yaml, node_mapping_*.yaml

CONSTRAINTS:
- Auto-discover new solvers via filesystem scan + importlib
- Handle solvers that fail to import gracefully (log error, skip, don't crash registry)
- Support versioning (each solver declares its version)
- Support solver dependencies (calculus engine needed by maths solver)
- Must be thread-safe (multiple API requests can call solvers concurrently)
- Cache imported solvers (don't re-import on every request)

SUCCESS CRITERIA: Drop solver_newsubject.py -> immediately available via API. No restart needed (or clean restart).

WHAT NOT TO BUILD: Don't write the solvers. Just the registry/discovery system.

Write to: D:\\platform\\backend\\solvers\\registry.py""",
    },
    {
        'name': 'fastapi_app',
        'model': MODEL_CRITICAL,
        'out': 'app.py',
        'prompt': """GOAL: A single FastAPI app that mounts all routers with proper middleware, error handling, and OpenAPI docs.

EXISTING CODE:
- D:\\platform\\backend\\api\\ has: __init__.py, content.py, dashboard.py, graph.py, mastery.py, nodes.py, questions.py, sim.py, story.py, subskills.py, tutor.py
- D:\\platform\\backend\\services\\ has 26 v2 services (most NOT wired to routers)
- D:\\dream_app\\backend\\ has the old app (routers for auth, content, solver, tutor, etc.)

CONSTRAINTS:
- Pydantic v2 schemas for all request/response models
- OpenAPI docs at /docs (complete and usable)
- CORS middleware (allow frontend origin)
- JWT auth middleware (Bearer token)
- Error handling: no stack traces to frontend, human-readable errors
- WebSocket support for real-time features (tutor, mastery updates)
- Health check at /health
- All routers under /api/ prefix
- Must be async (async def for all endpoints)

ROUTER MOUNTING:
- /api/solver -> solver router (solve, types, generate)
- /api/practice -> practice router (session, submit, feedback)  
- /api/tutor -> tutor router (chat, context)
- /api/mastery -> mastery router (student, parent, teacher views)
- /api/content -> content router (subjects, topics, lessons, search)
- /api/auth -> auth router (login, register, refresh)
- /api/diagnostic -> diagnostic router (start, submit, report)
- /api/exam -> exam router (simulate, grade, report)

SUCCESS CRITERIA: Frontend can call any endpoint and get a typed response. API docs at /docs are complete.

WHAT NOT TO BUILD: Don't write the routers themselves (separate tasks). Just the app shell with middleware, error handling, and router mounting points.

Write to: D:\\platform\\backend\\app.py""",
    },
    {
        'name': 'database_models',
        'model': MODEL_CRITICAL,
        'out': 'database.py',
        'prompt': """GOAL: Database setup + SQLAlchemy models for the core platform schema.

STUDENT CONTEXT: Platform serves Classes 1-12, multiple subjects, thousands of students. Must track: students, their mastery per topic, their practice sessions, their attempts, their tutor sessions, their diagnostic results.

CONSTRAINTS:
- Async SQLAlchemy with PostgreSQL
- UUID primary keys with gen_random_uuid()
- JSON columns for flexible data (solver results, tutor messages, etc.)
- Always include created_at and updated_at timestamps
- Use connection pooling
- Support migrations (Alembic-friendly schema)

MODELS NEEDED:
- Student (id, name, class, subjects, language_pref, created_at, updated_at)
- Parent (id, name, phone, whatsapp_number, student_ids)
- Teacher (id, name, school, subjects, class_ids)
- Topic/Node (id, subject, class, chapter, node_id_from_cisce, prerequisites[])
- Attempt (id, student_id, topic_id, question_seed, answer, correct, time_ms, created_at)
- Mastery (id, student_id, topic_id, bkt_p_know, irt_theta, afm_rate, last_review, next_review, updated_at)
- PracticeSession (id, student_id, topic_ids, started_at, ended_at, questions_answered)
- TutorSession (id, student_id, topic_id, messages_json, started_at, ended_at)
- DiagnosticResult (id, student_id, subject, questions_json, gaps_json, remediation_json, created_at)
- SolverExecution (id, student_id, solver_name, problem_type, input_json, result_json, time_ms, created_at)

SUCCESS CRITERIA: Can create all tables, insert records, query mastery for a student across all topics.

WHAT NOT TO BUILD: Don't write migrations. Don't write the services that USE these models. Just the models + database connection setup.

Write to: D:\\platform\\backend\\database.py""",
    },
    {
        'name': 'solver_router',
        'model': MODEL_CRITICAL,
        'out': 'api/solver.py',
        'prompt': """GOAL: Solver API router that lets frontend list problem types, render forms, solve, and generate questions.

STUDENT CONTEXT: Student opens solver page -> sees list of available problem types (grouped by subject) -> picks one -> gets input form -> enters values -> gets step-by-step solution in <2s.

EXISTING CODE:
- solvers/registry.py (auto-discovers solvers) - being built in parallel
- solvers/base.py (shared SolverResult) - being built in parallel
- solvers/latex_sympy_bridge.py (LaTeX<->SymPy) - being built in parallel
- YAML files define problem types and their input fields

ENDPOINTS:
- GET /api/solver/types -> list all available problem types (grouped by subject, with form definitions from YAML)
- GET /api/solver/types/{problem_type} -> get form definition for one problem type
- POST /api/solver/solve -> solve a problem (input: problem_type, values dict, seed; output: SolverResult with steps)
- POST /api/solver/generate -> generate a new question (input: problem_type, seed, difficulty; output: question text + expected answer)
- GET /api/solver/health -> check which solvers are loaded and healthy

CONSTRAINTS:
- Solve must return in <2 seconds
- Generate must return in <500ms
- Handle malformed input gracefully (422 with helpful error message)
- Stream steps progressively if possible (Server-Sent Events or WebSocket)
- Cache generated questions (same seed = same question)
- Must be async

SUCCESS CRITERIA: Frontend calls POST /api/solver/solve with {"problem_type": "derivative", "values": {"expr": "x*sin(x)"}} -> gets back SolverResult with 4 steps showing product rule application.

WHAT NOT TO BUILD: Don't write the solvers themselves. Don't write the frontend. Just the router.

Write to: D:\\platform\\backend\\api\\solver.py""",
    },
    {
        'name': 'auth_service',
        'model': MODEL_CRITICAL,
        'out': 'services/auth_service.py',
        'prompt': """GOAL: JWT authentication service for students, parents, and teachers.

STUDENT CONTEXT: Student opens app for first time -> can try WITHOUT login (friction kills conversion). After 3 uses, gentle prompt to create account. Parent and teacher have separate auth flows.

CONSTRAINTS:
- JWT with refresh tokens
- Bearer token auth
- Roles: student, parent, teacher, admin
- Parents linked to students (multiple children)
- Teachers linked to classes (multiple classes)
- Phone number as primary identifier (India uses phone, not email)
- OTP verification via WhatsApp (not SMS - SMS delivery is unreliable in India)
- Guest mode: 3 uses without login, then require phone number
- Must be async
- Password hashing with bcrypt

ENDPOINTS (in auth router):
- POST /api/auth/guest -> create guest session (returns temp token)
- POST /api/auth/register -> register with phone number
- POST /api/auth/verify-otp -> verify OTP and get tokens
- POST /api/auth/login -> login with phone + OTP
- POST /api/auth/refresh -> refresh access token
- GET /api/auth/me -> get current user profile

SUCCESS CRITERIA: Student can use app 3 times without login. On 4th use, prompted for phone number. OTP sent via WhatsApp. Verified. Full access.

WHAT NOT TO BUILD: Don't write the WhatsApp integration itself (separate task). Just the auth service with a pluggable OTP sender interface.

Write to: D:\\platform\\backend\\services\\auth_service.py""",
    },
    {
        'name': 'photo_input_pipeline',
        'model': MODEL_CRITICAL,
        'out': 'services/photo_input.py',
        'prompt': """GOAL: Backend pipeline that receives a photo of a math problem and returns LaTeX + identified problem type.

STUDENT CONTEXT: Class 11 student photographs a calculus problem from their ML Agarwal textbook. The photo may be: slightly tilted, have poor lighting, have handwritten annotations, have multiple problems on the page. Student expects: problem identified + solution in <5 seconds.

CONSTRAINTS:
- OCR runs ON-DEVICE (frontend sends LaTeX, not image) OR backend processes if device can't
- For backend processing: use Tesseract (text) + Pix2Tex (math) 
- Must handle: fractions, exponents, roots, integrals, matrices, Greek letters
- Must identify problem type (derivative, integral, equation, etc.) from the LaTeX
- Must crop to the specific problem if multiple are detected
- Must return confidence score
- Must handle failure gracefully ("couldn't read the problem, try typing it")
- Must be fast (<3s for backend processing)

PIPELINE:
1. Receive image (base64 or multipart upload)
2. Preprocess: deskew, denoise, binarize
3. OCR: Tesseract for text, Pix2Tex for math expressions
4. Combine: merge text + math into LaTeX
5. Classify: identify problem type from LaTeX patterns
6. Return: {latex, problem_type, confidence, alternatives[]}

SUCCESS CRITERIA: Photo of "Find the derivative of x*sin(x)" -> returns {"latex": "\\frac{d}{dx}[x \\sin(x)]", "problem_type": "derivative", "confidence": 0.92}

WHAT NOT TO BUILD: Don't write the frontend camera component. Don't write the solver. Just the backend processing pipeline.

Write to: D:\\platform\\backend\\services\\photo_input.py""",
    },
    {
        'name': 'mastery_sync_service',
        'model': MODEL_CRITICAL,
        'out': 'services/mastery_sync.py',
        'prompt': """GOAL: Every learning action (solve, practice, diagnostic) updates mastery in real-time using BKT (primary display) + IRT (backend) + AFM (learning rate).

EXISTING CODE:
- D:\\platform\\backend\\services\\knowledge_tracing.py (has BKT, IRT, AFM implementations - USE THIS, don't rewrite)
- D:\\platform\\backend\\services\\irt_feedback_loop.py (IRT sync - USE THIS)

CONSTRAINTS:
- Must be fast (<100ms per update)
- Must handle concurrent updates (student solves while practice session runs)
- BKT is the PRIMARY display metric (what student/parent sees)
- IRT is used for question selection (backend)
- AFM tracks learning rate (for analytics)
- Must produce mastery dashboard data efficiently
- Must handle offline: queue updates and sync when online
- Must be async

METHODS:
- update_on_attempt(student_id, topic_id, correct, time_ms) -> update BKT/IRT/AFM
- get_mastery(student_id, topic_id) -> {bkt_p_know, irt_theta, afm_rate, last_review, next_review}
- get_mastery_by_subject(student_id, subject) -> aggregated mastery across all topics in subject
- get_review_schedule(student_id) -> topics due for review (SM-2 based)
- sync_offline_queue(student_id, queued_updates[]) -> process queued updates

SUCCESS CRITERIA: Student solves a problem correctly -> mastery bar moves in real-time on their screen. Parent sees updated mastery within minutes.

WHAT NOT TO BUILD: Don't rewrite BKT/IRT/AFM. Import from knowledge_tracing.py. Don't write the dashboard. Just the sync service.

Write to: D:\\platform\\backend\\services\\mastery_sync.py""",
    },
    {
        'name': 'config_settings',
        'model': MODEL_CRITICAL,
        'out': 'config.py',
        'prompt': """GOAL: Centralized configuration for the platform using Pydantic Settings.

STUDENT CONTEXT: Platform must work in production with real students. Config includes: database URL, JWT secret, Claude API key (for tutor only), WhatsApp bot token, Qdrant URL, Neo4j URL, feature flags.

CONSTRAINTS:
- Use pydantic-settings (BaseSettings)
- Read from environment variables with sensible defaults
- Never expose secrets in logs or error messages
- Support development and production modes
- Feature flags for: photo_input, whatsapp_bot, voice_input, offline_mode, socratic_teacher
- Rate limits: solver (100/min), tutor (20/min), practice (60/min)
- CORS origins configurable

SETTINGS:
- DATABASE_URL, DATABASE_ECHO
- JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE
- CLAUDE_API_KEY (for tutor only, read from env)
- CLAUDE_MODEL_TUTOR (default: claude-opus-5)
- WHATSAPP_BOT_TOKEN, WHATSAPP_PHONE_NUMBER_ID
- QDRANT_URL, QDRANT_COLLECTION
- NEO4J_URL, NEO4J_USER, NEO4J_PASSWORD
- REDIS_URL (for caching and rate limiting)
- FEATURE_FLAGS: photo_input, whatsapp_bot, voice_input, offline_mode, socratic_teacher, achievements
- RATE_LIMITS: solver, tutor, practice, generate
- CORS_ORIGINS

SUCCESS CRITERIA: App starts with `python -m backend.app` and reads all config from environment. Missing required config = clear error message.

Write to: D:\\platform\\backend\\config.py""",
    },
]

def extract_code(response):
    """Try JSON first, then fall back to stripping markdown fences, then raw response."""
    import re
    # Attempt 1: parse as JSON
    try:
        # Find the outermost JSON object
        start = response.find('{')
        end = response.rfind('}')
        if start != -1 and end != -1 and end > start:
            obj = json.loads(response[start:end+1])
            if 'code' in obj:
                return obj['code'], 'json'
    except (json.JSONDecodeError, ValueError):
        pass
    # Attempt 2: strip markdown code fences
    fence_match = re.search(r'```(?:python)?\s*\n(.*?)```', response, re.DOTALL)
    if fence_match:
        return fence_match.group(1).strip(), 'fence'
    # Attempt 3: raw response (last resort — save everything)
    return response, 'raw'

def run_task(task):
    name = task['name']
    model = task['model']
    out_path = OUT_DIR / task['out']
    out_path.parent.mkdir(parents=True, exist_ok=True)
    print('[START] %s [model=%s]' % (name, model), flush=True)
    response = call_claude(task['prompt'], SYSTEM, model=model)
    if not response:
        print('[FAIL] %s: no response' % name, flush=True)
        return (name, 'fail', 0)
    # ALWAYS save raw response first (nothing is lost)
    raw_path = out_path.with_suffix(out_path.suffix + '.raw')
    raw_path.write_text(response, encoding='utf-8')
    # Extract code
    code, method = extract_code(response)
    out_path.write_text(code, encoding='utf-8')
    # Syntax check if Python
    if out_path.suffix == '.py':
        import py_compile
        try:
            py_compile.compile(str(out_path), doraise=True)
            print('[OK] %s: %d lines, syntax OK (extract=%s)' % (name, len(code.splitlines()), method), flush=True)
            return (name, 'ok', len(code.splitlines()))
        except py_compile.PyCompileError as e:
            print('[SYNTAX_FAIL] %s: %s (extract=%s, raw saved)' % (name, str(e)[:80], method), flush=True)
            return (name, 'syntax_fail', len(code.splitlines()))
    else:
        print('[OK] %s: %d lines (extract=%s)' % (name, len(code.splitlines()), method), flush=True)
        return (name, 'ok', len(code.splitlines()))

def main():
    print('=== BATCH 1: Backend Foundation (10 parallel tasks) ===', flush=True)
    results = []
    with ThreadPoolExecutor(max_workers=10) as ex:
        futures = {ex.submit(run_task, t): t['name'] for t in TASKS}
        for f in as_completed(futures):
            results.append(f.result())
    print('\n=== COMPLETE: %d OK, %d FAIL ===' % (
        sum(1 for _, s, _ in results if s == 'ok'),
        sum(1 for _, s, _ in results if s != 'ok')
    ), flush=True)
    fails = [n for n, s, _ in results if s != 'ok']
    if fails:
        print('FAILURES:', flush=True)
        for f in fails:
            print('  %s' % f, flush=True)

if __name__ == '__main__':
    main()
