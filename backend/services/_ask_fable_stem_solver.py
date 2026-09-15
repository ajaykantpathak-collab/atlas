"""
Ask Fable (via Claude API, model 'fable') to design a real solution for
parsing and solving ANY STEM problem (class 6 to JEE Advanced/NEET) without
adding a new solver per question type.

States our limitations honestly and asks Fable for the architecture + tools.
"""
import urllib.request, json, ssl, time, os, sys

# ── API config (read from env, fall back to known key only if env missing) ──
KEY = os.environ.get("FABLE_API_KEY", "sk-ant-co-gIEUzRWw_mtUpxKk668B1lzJe3XntCna")
URL = "https://api.claudeopus.pro/v1/messages"
MODEL = "fable"

prompt = """\
I am building a K-12 learning platform (CBSE + CISCE, classes 1-12, plus JEE Advanced and NEET prep).
I need to solve ANY STEM problem (physics, chemistry, mathematics, biology) from free-text question input
WITHOUT writing a new solver for every question type.

# MY CURRENT LIMITATIONS (be honest)

1. PARSER IS UNRELIABLE
   - I use regex + keyword extraction to pull quantities, units, target from problem text.
   - It breaks on implicit values: "starts from rest" (u=0), "smooth surface" (mu=0),
     "light string" (massless), "reaches twice the initial velocity" (v=2u),
     "just before hitting the ground" (h=0).
   - Regex cannot infer. It grabs "60kg" and "3m" but cannot understand "starts from rest" means u=0.

2. SOLVER REQUIRES ADDING FORMULAS BY HAND
   - I have a hardcoded Python dict of ~50 physics formulas. Every new concept = edit Python.
   - I have 37 per-class per-subject solver files (class6_maths_solver.py, class12_chem_solver.py, etc).
     Each has hardcoded methods. New topic = new file = new method.
   - This does not scale. I want ONE solver that handles any STEM problem.

3. COMPUTE ENGINE IS GOOD BUT ISOLATED
   - I have a hybrid calculus engine: SymEngine -> SymPy -> Giac (subprocess) -> scipy -> fallback.
   - It handles calculus generally (differentiate, integrate, limits, ODEs) with step-by-step + verification.
   - But it is NOT wired into the main solver chain. The main chain uses the hardcoded formula dict instead.

4. NO PAID APIs AT SCALE
   - Wolfram Alpha API: free tier is non-commercial only, step-by-step solutions are paid.
   - Cannot use Wolfram at million-user scale.
   - Mathpix: paid.
   - Need FREE, open-source, self-hostable solutions.

5. LLM DEPENDENCY CONCERNS
   - I do NOT want LLM in the default solving path (cost + latency + unreliability at scale).
   - LLM is acceptable ONLY as a last-resort fallback for novel/unparseable problems.
   - The default path must be deterministic: parse -> select formula -> compute -> verify -> explain.

6. COMPETENCY QUESTIONS
   - CBSE NEP 2020: ~40% of board exams are competency-based.
   - These are prose-heavy: "A 60kg student climbs 3m of stairs in 5s. Another walks 100m on flat ground.
     Who expended more power? Justify with calculation and explain the physics principle."
   - They need scenario comprehension + calculation + written justification.
   - I do not want LLM doing the calculation. I want deterministic compute.
   - But the comprehension (extracting quantities from prose) and justification (writing the explanation)
     may need language understanding.

# WHAT I HAVE FOUND (real tools)

- quantulum3: Python library, extracts quantities + units from free text. Uses GloVe vectors for
  unit disambiguation. Free, open source. Handles "2 liters", "60kg", "30 deg", ranges, uncertainties.
  BUT: does not understand physics context ("starts from rest" is not a quantity).

- InAnYan/physics_solver: spaCy NER + SymPy, no LLM. Proves rule-based NER works for basic physics
  word problems. BUT: limited to basic problems (no forces, energy, complex dynamics).
  Uses spacy_pat_match_dsl for custom NER rules.

- Physics Reasoner (arxiv 2412.13791): 122-formula KB + checklists + LLM for analysis only.
  Compute is deterministic (Python code). LLM does problem analysis + formula retrieval.
  SOTA on SciBench. Open source.

- quinex: Transformer-based quantity extraction from scientific text. Open source, local models.
  Domain-agnostic. Links units to QUDT ontology.

- MWPToolkit: Open-source framework for math word problem solvers. 17 solvers implemented.
  Research-oriented, not production.

# WHAT I NEED FROM YOU

Design a COMPLETE, HONEST, PRODUCTION-READY architecture that:

1. Parses ANY STEM word problem (class 6 to JEE Advanced) into a canonical structured form
   (quantities with units, target, constraints, concept tags) — WITHOUT adding a parser per question type.
   - Use real tools (quantulum3, spaCy, etc.) where they work.
   - Be honest about where deterministic parsing fails and what the fallback is.
   - Handle implicit values ("starts from rest", "smooth surface", "light string").

2. Solves ANY STEM problem from the structured form — WITHOUT adding a solver per formula.
   - Use a declarative formula knowledge base (data, not code) + dimensional analysis for selection.
   - Use my existing compute cascade (SymEngine -> SymPy -> Giac -> scipy) for computation.
   - Handle multi-step problems (chain formulas, decompose into sub-problems).
   - Handle chemistry (stoichiometry, equilibrium, electrochemistry) and biology where formulas don't apply.

3. Handles competency questions (prose-heavy, need comprehension + calculation + justification).
   - Where does LLM fit? Where is it deterministic?
   - Be specific about the split.

4. Verifies answers (back-substitution, dimensional check, sanity bounds).

5. Generates step-by-step explanations.

6. Falls back to LLM (Fable/Claude) ONLY when deterministic path fails. Be specific about when.

# OUTPUT FORMAT

Give me:
A. ARCHITECTURE DIAGRAM (text-based, showing the full pipeline)
B. COMPONENT LIST (each component: name, what it does, what tools/libraries it uses, deterministic or LLM)
C. DATA STRUCTURES (the canonical problem IR, formula KB schema, step schema)
D. IMPLICIT VALUE HANDLING (how to handle "starts from rest", "smooth surface", etc. — be specific)
E. COMPETENCY QUESTION FLOW (step by step, where LLM fits)
F. FALLBACK POLICY (when does LLM get invoked, what does it do, what does it NOT do)
G. WHAT WILL FAIL (be honest — which problem types will this architecture NOT handle well?)
H. INTEGRATION PLAN (how to wire this into an existing FastAPI backend with 37 legacy solvers)

Be brutally honest. Do not propose things that sound good but don't work in practice.
If a problem type cannot be solved deterministically, say so. If LLM is truly needed somewhere, say where and why.
I would rather have an honest architecture with known limitations than a fake one that claims to handle everything.

Output as structured markdown. Be specific. Reference real tools by name.
"""

print(f"Prompt size: {len(prompt)} chars")
print(f"Sending to {URL} model={MODEL}...")
print("=" * 70)

ctx = ssl.create_default_context()
body = json.dumps({
    "model": MODEL,
    "max_tokens": 16000,
    "system": (
        "You are a senior systems architect specializing in educational technology, "
        "symbolic computation, and NLP. You design production STEM solver systems "
        "that scale to millions of users. You are brutally honest about limitations. "
        "You prefer deterministic, open-source, self-hostable solutions over paid APIs "
        "and LLM dependencies. You reference real tools and libraries by name. "
        "Output structured markdown."
    ),
    "messages": [{"role": "user", "content": prompt}]
}).encode("utf-8")

req = urllib.request.Request(URL, data=body, method="POST")
req.add_header("x-api-key", KEY)
req.add_header("Content-Type", "application/json")
req.add_header("anthropic-version", "2023-06-01")

t0 = time.time()
try:
    with urllib.request.urlopen(req, timeout=600, context=ctx) as resp:
        raw = resp.read().decode("utf-8")
        data = json.loads(raw)
        text = ""
        for block in data.get("content", []):
            if block.get("type") == "text":
                text += block.get("text", "")
        usage = data.get("usage", {})
        elapsed = time.time() - t0

        print(f"\nResponse received in {elapsed:.1f}s")
        print(f"Input tokens: {usage.get('input_tokens', '?')}")
        print(f"Output tokens: {usage.get('output_tokens', '?')}")
        print("=" * 70)
        print(text)

        # Save to file
        out_path = r"D:\platform\backend\services\fable_stem_solver_design.md"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(f"# Fable STEM Solver Architecture Design\n\n")
            f.write(f"_Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}_\n")
            f.write(f"_Model: {MODEL} | Input tokens: {usage.get('input_tokens', '?')} | "
                    f"Output tokens: {usage.get('output_tokens', '?')} | Time: {elapsed:.1f}s_\n\n")
            f.write("---\n\n")
            f.write(text)
        print(f"\n\nSaved to: {out_path}")

except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.reason}")
    print(e.read().decode("utf-8")[:2000])
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
