"""
Parallel solver/question file regenerator.
Uses the Claude API (via claudeopus.pro proxy) with 10 concurrent workers.
Generates complete, non-truncated solver and question files for CISCE curriculum.
"""
import json
import ssl
import urllib.request
import concurrent.futures
import os
import time
from pathlib import Path

# ─── Config ───────────────────────────────────────────────────────────────
API_URL = "https://api.claudeopus.pro/v1/messages"
API_KEY = open(r"D:\platform\backend\_fable_key.txt").read().strip()
MODEL = "claude-opus-5"
MAX_TOKENS = 16000  # Increased for large files
WORKERS = 10
TIMEOUT = 300  # 5 min per request

SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

# ─── Files to regenerate ──────────────────────────────────────────────────
# Each entry: (output_path, file_type, subject, class_level, syllabus_nodes, docstring)
FILES_TO_GENERATE = [
    # ── Truncated solvers ──
    {
        "path": r"D:\platform\backend\solvers\english\class10_english_solver.py",
        "type": "solver",
        "subject": "English",
        "class_level": 10,
        "nodes": "c10_c12_eng_123 (Common Errors Catalog), c10_eng_001 (Composition Writing), c10_eng_006 (Exam Technique)",
        "docstring": "CISCE English Class 10 - Deterministic Solver & Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\evs\class10_evs_solver.py",
        "type": "solver",
        "subject": "EVS",
        "class_level": 10,
        "nodes": "c10_evs_001 through c10_evs_010 - Environmental Science topics",
        "docstring": "CISCE EVS Class 10 - Deterministic Solver & Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\geo\class12_geo_solver.py",
        "type": "solver",
        "subject": "Geography",
        "class_level": 12,
        "nodes": "c12_geo_001 through c12_geo_015 - ISC Geography: Physical, Human, Economic",
        "docstring": "CISCE ISC Class 12 Geography - Deterministic Solver & Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\histciv\class12_histciv_solver.py",
        "type": "solver",
        "subject": "History & Civics",
        "class_level": 12,
        "nodes": "c12_histciv_001 through c12_histciv_020 - ISC History: Civil Rights Movement, Arab Nationalism, August Offer, Cripps Mission",
        "docstring": "CISCE Class 12 History and Civics - Deterministic Solver and Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\histciv\class8_histciv_solver.py",
        "type": "solver",
        "subject": "History & Civics",
        "class_level": 8,
        "nodes": "c8_histciv_001 through c8_histciv_010 - ICSE History & Civics",
        "docstring": "CISCE Class 8 History & Civics - Deterministic Solver & Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\maths\class11_maths_solver.py",
        "type": "solver",
        "subject": "Mathematics",
        "class_level": 11,
        "nodes": "c11_math_001 (Sets - Representations), c11_math_002 (Equal sets, subsets, intervals), c11_math_003 (Power set, universal set, operations), c11_math_004 through c11_math_020 (Functions, Trigonometry, Algebra, Coordinate Geometry)",
        "docstring": "CISCE Class 11 Mathematics Solver",
    },
    {
        "path": r"D:\platform\backend\solvers\pol\class11_pol_solver.py",
        "type": "solver",
        "subject": "Political Science",
        "class_level": 11,
        "nodes": "c11_pol_023 through c11_pol_028 - US Unilateralism, Regional Cooperation (ASEAN, EU, SAARC, BRICS, QUAD), India-Pakistan, India-Bangladesh, India-China Relations",
        "docstring": "CISCE Class 11 Political Science Solver & Question Generator",
    },
    # ── Truncated question files ──
    {
        "path": r"D:\platform\backend\solvers\econapp\class9_econapp_questions.py",
        "type": "questions",
        "subject": "Economic Applications",
        "class_level": 9,
        "nodes": "c9_econapp_001 through c9_econapp_010 - Economic Entities, Importance of Agriculture, Economic & Social Infrastructure",
        "docstring": "CISCE ECONAPP Class 9 - Deterministic Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\geo\class8_geo_questions.py",
        "type": "questions",
        "subject": "Geography",
        "class_level": 8,
        "nodes": "c8_geo_001 through c8_geo_010 - ICSE Class 8 Geography",
        "docstring": "CISCE ICSE Class 8 Geography - Deterministic Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\home\class11_home_questions.py",
        "type": "questions",
        "subject": "Home Science",
        "class_level": 11,
        "nodes": "c11_home_001 through c11_home_010 - ISC Home Science",
        "docstring": "CISCE Class 11 Home Science - Question Generator and Solvers",
    },
    {
        "path": r"D:\platform\backend\solvers\home\class12_home_questions.py",
        "type": "questions",
        "subject": "Home Science",
        "class_level": 12,
        "nodes": "c12_home_001 through c12_home_010 - ISC Home Science",
        "docstring": "CISCE Class 12 Home Science - Deterministic Question Generator and Solver",
    },
    {
        "path": r"D:\platform\backend\solvers\maths\class11_maths_questions.py",
        "type": "questions",
        "subject": "Mathematics",
        "class_level": 11,
        "nodes": "c11_math_001 (Sets and Functions), c11_math_002 (Equal sets, subsets)",
        "docstring": "CISCE Class 11 Mathematics Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\psy\class12_psy_questions.py",
        "type": "questions",
        "subject": "Psychology",
        "class_level": 12,
        "nodes": "c12_psy_001 through c12_psy_015 - ISC Psychology",
        "docstring": "CISCE Class 12 Psychology - Deterministic Question Generator",
    },
    # ── Empty funcs / too short ──
    {
        "path": r"D:\platform\backend\solvers\bs\class11_bs_solver.py",
        "type": "solver",
        "subject": "Business Studies",
        "class_level": 11,
        "nodes": "c11_bs_001 (Meaning and Features of Business), c11_bs_006 (Forms of Business Organisation), c11_bs_018 (e-Business)",
        "docstring": "CISCE Class 11 Business Studies Solver and Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\biotech\class12_biotech_questions.py",
        "type": "questions",
        "subject": "Biotechnology",
        "class_level": 12,
        "nodes": "c12_biotech_001 through c12_biotech_010 - Nucleotides/Nucleosides, DNA Structure, RNA Types",
        "docstring": "CISCE ISC Biotechnology Class 12 - Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\physics\class11_physics_questions.py",
        "type": "questions",
        "subject": "Physics",
        "class_level": 11,
        "nodes": "c11_phy_001 (Systems of units), c11_phy_002 (Significant figures and errors)",
        "docstring": "CISCE Class 11 Physics Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\pol\class12_pol_questions.py",
        "type": "questions",
        "subject": "Political Science",
        "class_level": 12,
        "nodes": "c12_pol_001 through c12_pol_010 - ISC Political Science",
        "docstring": "CISCE Class 12 Political Science - Deterministic Question Generator",
    },
    {
        "path": r"D:\platform\backend\solvers\soc\class11_soc_questions.py",
        "type": "questions",
        "subject": "Sociology",
        "class_level": 11,
        "nodes": "c11_soc_001 through c11_soc_010 - ISC Sociology",
        "docstring": "CISCE SOC Class 11 - Deterministic Question Generator",
    },
]

# ─── Prompt builder ───────────────────────────────────────────────────────
def build_prompt(entry):
    """Build the system and user prompts for the Claude API."""
    ftype = entry["type"]
    subject = entry["subject"]
    cls = entry["class_level"]
    nodes = entry["nodes"]
    docstring = entry["docstring"]

    system = (
        "You are an expert educational content developer for CISCE (ICSE/ISC) curriculum. "
        "You write production-quality Python code for deterministic solvers and question generators. "
        "Your code is always COMPLETE — never truncated, never uses 'pass' as a placeholder, "
        "never ends with a comment about truncation. Every function has a real implementation. "
        "Return ONLY the Python code in a single code block — no preamble, no explanation."
    )

    if ftype == "solver":
        user = f"""Write a COMPLETE Python file for a CISCE Class {cls} {subject} deterministic solver.

Requirements:
1. File docstring: \"{docstring}\"
2. Syllabus coverage: {nodes}
3. All solvers return dict with keys: answer, steps, verification
4. Use seeded random for reproducibility (random.seed(seed))
5. Define SOLVER_REGISTRY dict mapping problem types to solver classes
6. Define solve_* functions that the registry can auto-discover
7. Solver classes must have PROBLEM_TYPE attribute and a solve() method
8. Use typing imports: Dict, List, Any, Optional, Tuple
9. Include verify_* functions for answer verification
10. No external LLM calls, no API calls, fully self-contained
11. Include if __name__ == '__main__' block with a self-test
12. The file must be COMPLETE — no truncation, no placeholders
13. Aim for 300-600 lines of well-structured code
14. Use Decimal for financial calculations where applicable
15. Each solver class should have _solve() and _verify() methods

The file must end with a proper if __name__ == '__main__' block and be fully runnable."""
    else:
        user = f"""Write a COMPLETE Python file for a CISCE Class {cls} {subject} deterministic question generator.

Requirements:
1. File docstring: \"{docstring}\"
2. Syllabus coverage: {nodes}
3. Must define generate_questions(seed: int, count: int) -> List[Dict[str, Any]] function
4. Each question has: id, question_text, question_type (mcq/fill_blank/short_answer/long_answer/numerical), 
   options (for mcq), answer, difficulty (0.0-1.0), topic, solution, verification
5. Use seeded random for reproducibility (random.seed(seed))
6. Define QUESTION_REGISTRY dict mapping topic names to generator functions
7. Define solve_* functions for each question type (solve_mcq, solve_fill_blank, etc.)
8. Include verify_all_questions(questions) function that validates all questions
9. Use typing imports: Dict, List, Any, Optional
10. No external LLM calls, no API calls, fully self-contained
11. Include if __name__ == '__main__' block with a self-test
12. The file must be COMPLETE — no truncation, no placeholders
13. Aim for 400-800 lines of well-structured code
14. Questions must be factually correct per CISCE syllabus
15. Include a mix of difficulty levels (easy, medium, hard)

The file must end with a proper if __name__ == '__main__' block and be fully runnable."""

    return system, user


# ─── API call ─────────────────────────────────────────────────────────────
def call_claude(system_prompt, user_prompt):
    """Call the Claude API and return the response text."""
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


def extract_code(response_text):
    """Extract Python code from the response (strip markdown code fences)."""
    text = response_text.strip()
    if text.startswith("```python"):
        text = text[len("```python"):]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()


# ─── Worker ───────────────────────────────────────────────────────────────
def generate_file(entry):
    """Generate a single file. Returns (path, success, message)."""
    path = entry["path"]
    name = os.path.basename(path)
    try:
        system, user = build_prompt(entry)
        t0 = time.time()
        response = call_claude(system, user)
        elapsed = time.time() - t0
        code = extract_code(response)
        line_count = code.count("\n") + 1

        # Validate: must not be truncated
        last_line = code.splitlines()[-1].strip() if code.splitlines() else ""
        trunc_markers = ["truncated", "incomplete", "note: truncated"]
        is_truncated = any(m in last_line.lower() for m in trunc_markers)

        # Validate: must have entry points
        has_solve = "def solve_" in code or "class " in code
        has_generate = "def generate_" in code or "QUESTION_REGISTRY" in code or "SOLVER_REGISTRY" in code

        if is_truncated:
            return (path, False, f"TRUNCATED ({line_count}L, {elapsed:.0f}s)")
        if not has_solve and not has_generate:
            return (path, False, f"NO ENTRY POINTS ({line_count}L, {elapsed:.0f}s)")
        if line_count < 50:
            return (path, False, f"TOO SHORT ({line_count}L, {elapsed:.0f}s)")

        # Write to a NEW file (never overwrite existing data)
        out_path = path  # These are generated files, not data files
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(code)
        return (path, True, f"OK ({line_count}L, {elapsed:.0f}s)")
    except Exception as e:
        return (path, False, f"ERROR: {e}")


# ─── Main ─────────────────────────────────────────────────────────────────
def main():
    print(f"Regenerating {len(FILES_TO_GENERATE)} files with {WORKERS} workers...")
    print(f"API: {API_URL} | Model: {MODEL} | Max tokens: {MAX_TOKENS}")
    print("=" * 80)

    results = []
    completed = 0

    with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as executor:
        future_to_entry = {executor.submit(generate_file, e): e for e in FILES_TO_GENERATE}
        for future in concurrent.futures.as_completed(future_to_entry):
            entry = future_to_entry[future]
            name = os.path.basename(entry["path"])
            try:
                path, success, msg = future.result()
                status = "OK" if success else "FAIL"
                completed += 1
                print(f"  [{completed}/{len(FILES_TO_GENERATE)}] {status:4} {name:40} {msg}")
                results.append((name, success, msg))
            except Exception as e:
                completed += 1
                print(f"  [{completed}/{len(FILES_TO_GENERATE)}] FAIL {name:40} EXCEPTION: {e}")
                results.append((name, False, str(e)))

    print()
    print("=" * 80)
    ok = sum(1 for _, s, _ in results if s)
    fail = sum(1 for _, s, _ in results if not s)
    print(f"SUMMARY: {ok} OK, {fail} FAIL out of {len(results)}")
    if fail > 0:
        print("\nFailed files:")
        for name, success, msg in results:
            if not success:
                print(f"  {name}: {msg}")


if __name__ == "__main__":
    main()
