"""Regenerate the 2 failed solver files."""
import json
import ssl
import urllib.request
import time
import os

API_URL = "https://api.claudeopus.pro/v1/messages"
API_KEY = open(r"D:\platform\backend\_fable_key.txt").read().strip()
MODEL = "claude-opus-5"
MAX_TOKENS = 16000
TIMEOUT = 300

SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

def call_claude(system_prompt, user_prompt):
    payload = json.dumps({
        "model": MODEL,
        "max_tokens": MAX_TOKENS,
        "system": system_prompt,
        "messages": [{"role": "user", "content": user_prompt}],
    }).encode("utf-8")
    req = urllib.request.Request(API_URL, data=payload)
    req.add_header("Content-Type", "application/json")
    req.add_header("x-api-key", API_KEY)
    req.add_header("anthropic-version", "2023-06-01")
    with urllib.request.urlopen(req, timeout=TIMEOUT, context=SSL_CTX) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        for block in data.get("content", []):
            if block.get("type") == "text":
                return block["text"]
        return json.dumps(data, indent=2)

def extract_code(text):
    text = text.strip()
    if text.startswith("```python"):
        text = text[9:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()

# File 1: class11_pol_solver.py
system1 = "You are an expert educational content developer for CISCE curriculum. Write production-quality Python code. Return ONLY Python code in a single code block — no explanation."
user1 = """Write a COMPLETE Python file: CISCE Class 11 Political Science Solver & Question Generator.

Syllabus: c11_pol_023 through c11_pol_028 - US Unilateralism (Iraq, Afghanistan), Regional Cooperation (ASEAN, EU, SAARC, BRICS, QUAD), India-Pakistan Relations, India-Bangladesh & India-China Relations

Requirements:
1. File docstring: "CISCE Class 11 Political Science Solver & Question Generator"
2. All solvers return dict: {answer, steps, verification}
3. Define SOLVER_REGISTRY dict mapping problem types to solver classes
4. Solver classes with PROBLEM_TYPE attribute, solve() method, _solve() and _verify()
5. Define solve_* functions for auto-discovery
6. Use seeded random (random.seed)
7. typing imports: Dict, List, Any, Optional, Tuple
8. No external LLM calls
9. if __name__ == '__main__' block with self-test
10. COMPLETE file, 300-600 lines, no truncation, no placeholders
11. Include question generation: generate_questions(seed, count) -> List[Dict]
12. Each question: id, question_text, question_type (mcq/short_answer/long_answer), options, answer, difficulty, topic, solution, verification
13. QUESTION_REGISTRY dict
14. verify_all_questions function

The file MUST end with if __name__ == '__main__' block. Must be fully runnable."""

# File 2: class12_biotech_questions.py
system2 = system1
user2 = """Write a COMPLETE Python file: CISCE ISC Biotechnology Class 12 Question Generator.

Syllabus: Nucleotides/Nucleosides, DNA Structure (Watson-Crick, Chargaff, Hershey-Chase), RNA Types (mRNA, tRNA, rRNA)

Requirements:
1. File docstring: "CISCE ISC Biotechnology Class 12 - Question Generator"
2. MUST define: generate_questions(seed: int, count: int) -> List[Dict[str, Any]]
3. MUST define: solve_mcq(params: Dict) -> Dict
4. MUST define: solve_fill_blank(params: Dict) -> Dict
5. MUST define: solve_short_answer(params: Dict) -> Dict
6. MUST define: QUESTION_REGISTRY dict mapping topic names to generator functions
7. MUST define: verify_all_questions(questions: List[Dict]) -> Dict
8. Each question: id, question_text, question_type, options (for mcq), answer, difficulty (0.0-1.0), topic, solution, verification
9. Use seeded random (random.seed)
10. typing imports: Dict, List, Any, Optional
11. No external LLM calls
12. if __name__ == '__main__' block with self-test
13. COMPLETE file, 400-800 lines, no truncation
14. Mix of difficulty levels

The file MUST have solve_* functions and generate_questions function. MUST end with if __name__ == '__main__'."""

files = [
    (r"D:\platform\backend\solvers\pol\class11_pol_solver.py", system1, user1),
    (r"D:\platform\backend\solvers\biotech\class12_biotech_questions.py", system2, user2),
]

for path, sys_p, usr_p in files:
    name = os.path.basename(path)
    print(f"Generating {name}...", flush=True)
    t0 = time.time()
    try:
        resp = call_claude(sys_p, usr_p)
        code = extract_code(resp)
        lines = code.count("\n") + 1
        has_solve = "def solve_" in code
        has_gen = "def generate_" in code or "SOLVER_REGISTRY" in code or "QUESTION_REGISTRY" in code
        elapsed = time.time() - t0
        if lines < 50:
            print(f"  FAIL: TOO SHORT ({lines}L, {elapsed:.0f}s)")
        elif not has_solve and not has_gen:
            print(f"  FAIL: NO ENTRY POINTS ({lines}L, {elapsed:.0f}s)")
        else:
            with open(path, "w", encoding="utf-8") as f:
                f.write(code)
            print(f"  OK ({lines}L, {elapsed:.0f}s)")
    except Exception as e:
        print(f"  ERROR: {e}")
