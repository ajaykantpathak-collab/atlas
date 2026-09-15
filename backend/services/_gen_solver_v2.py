"""Send the solver chain to Fable for deep reasoning improvement.
Fable will rewrite the symbolic solver to actually solve physics/math/chemistry problems.
"""
import urllib.request, json, ssl, os, ast, time

KEY = "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna"
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

PROMPT = """Rewrite `symbolic_solver.py` to ACTUALLY SOLVE JEE/NEET problems. The current version is a stub that returns "Unknown sub-problem type". 

The solver must handle these solver_type values from the decomposition engine:
- "physics_formula": Solve physics problems using formulas (F=ma, v=u+at, etc.)
- "sympy": Solve symbolic math equations
- "numerical": Solve numerically with Newton-Raphson
- "claude_reasoning": Fall back to reasoning (but we want to minimize this)
- "generic": Try to parse and solve generically

REQUIREMENTS:

1. **SolverResult dataclass**: sub_problem_id, success (bool), symbolic_result (str), numerical_result (float|None), steps (list[str]), units (str), error (str)

2. **SymbolicSolver class**:
   - solve_sub_problem(self, sub_problem: dict) -> SolverResult
     - Reads solver_type from sub_problem
     - Dispatches to the right solver
     - Returns result with steps
   
   - solve_physics(self, inputs: dict, output_symbol: str, concept: str) -> SolverResult
     - Physics formula database:
       * mechanics: F=ma, v=u+at, s=ut+0.5at^2, F=mg*sin(theta)-mu*mg*cos(theta), a=g*(sin(theta)-mu*cos(theta))
       * energy: KE=0.5mv^2, PE=mgh, W=Fd, conservation
       * momentum: p=mv, conservation
       * circular: a=v^2/r, F=mv^2/r, T=2*pi*r/v
       * gravitation: F=Gm1m2/r^2, g=GM/r^2
       * electrostatics: F=kq1q2/r^2, E=kq/r^2, V=kq/r
       * current: V=IR, P=VI, R=rho*L/A
       * magnetism: F=qvB, r=mv/(qB)
       * optics: 1/f=1/u+1/v, m=-v/u
       * shm: T=2*pi*sqrt(m/k), T=2*pi*sqrt(L/g)
       * waves: v=f*lambda, v=sqrt(T/mu)
       * thermodynamics: PV=nRT, Q=mCT, efficiency=1-T2/T1
       * modern: E=hf, lambda=h/p, KE=hv-phi
     - Given inputs dict (e.g. {"mass":2, "angle":30, "friction":0.5, "g":10})
     - Identify which formula applies based on concept + output_symbol
     - Substitute values, compute result
     - Return with steps showing formula, substitution, and answer

   - solve_equation(self, equation: str, variable: str) -> SolverResult
     - Use sympy if available: from sympy import symbols, solve, Eq, Symbol, simplify, Rational, sqrt, pi, sin, cos, tan
     - Parse equation string like "x + 5 = 10" or "a = 10 * (sin(30) - 0.5 * cos(30))"
     - Solve for variable
     - Return symbolic + numerical result
   
   - solve_system(self, equations: list[str], variables: list[str]) -> SolverResult
     - Solve system of equations using sympy
   
   - differentiate(self, expression: str, variable: str) -> SolverResult
     - Use sympy.diff
   
   - integrate(self, expression: str, variable: str, limits=None) -> SolverResult
     - Use sympy.integrate

   - solve_chemistry(self, reaction: str, known: dict) -> SolverResult
     - Balance equations
     - Mole calculations
     - Concentration calculations

3. **Physics formula solver** (the most important):
   When solve_physics is called with inputs and output_symbol:
   a. Look up the concept (e.g. "mechanics")
   b. Look up what's being solved (output_symbol, e.g. "a" for acceleration)
   c. Select the right formula
   d. Extract values from inputs dict
   e. Compute: substitute and evaluate
   f. Format steps: "Formula: a = g(sin θ - μ cos θ)", "Substitution: a = 10(sin 30° - 0.5 cos 30°)", "Answer: a = 10(0.5 - 0.433) = 0.67 m/s²"
   
   Example: inputs={"mass":2, "angle":30, "friction":0.5, "g":10}, output="a", concept="mechanics"
   → Formula: a = g(sin θ - μ cos θ)
   → a = 10(sin 30° - 0.5 × cos 30°)
   → a = 10(0.5 - 0.5 × 0.866)
   → a = 10(0.5 - 0.433)
   → a = 0.67 m/s²

4. **Numerical fallback**: If sympy can't solve, use simple numerical methods (Newton-Raphson implemented in pure Python)

5. **Step-by-step output**: Every solve must return steps list showing the work

6. Try to import sympy. If not available, use math module (sin, cos, tan, sqrt, pi, log, exp) for numerical evaluation.

7. Pure Python + optional sympy. Output ONLY Python code, no markdown fences."""

ctx = ssl.create_default_context()
body = json.dumps({
    "model": MODEL,
    "max_tokens": 16000,
    "system": "You are an expert Python engineer specializing in symbolic math and physics computation. Output only valid Python code, no markdown fences.",
    "messages": [{"role": "user", "content": PROMPT}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

print("Sending solver chain to Fable for deep reasoning improvement...")
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
        print(f"SYNTAX ERROR: line {e.lineno}: {e.msg}")
    
    out_path = r"D:\platform\backend\services\symbolic_solver.py"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    
    print(f"Tokens: {usage}")
    print(f"Elapsed: {elapsed:.1f}s")
    print(f"Valid Python: {valid}")
    print(f"Saved: {out_path} ({len(text)} chars, {text.count(chr(10))} lines)")
