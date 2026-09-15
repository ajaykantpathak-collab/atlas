"""Test question generation across all subjects/classes - READ ONLY."""
import sys, os, random, importlib
from pathlib import Path

sys.path.insert(0, os.path.dirname(__file__))

solver_dir = Path("D:/platform/backend/solvers")
results = []

for subj_dir in sorted(solver_dir.iterdir()):
    if not subj_dir.is_dir() or subj_dir.name.startswith("_") or subj_dir.name.startswith("core"):
        continue
    subj = subj_dir.name
    for qf in sorted(subj_dir.glob("*_questions.py")):
        cls = qf.stem.replace("_questions", "").replace("class", "C")
        mod_name = qf.stem
        try:
            mod = importlib.import_module(f"solvers.{subj}.{mod_name}")
            # Find generator functions
            gens = [a for a in dir(mod) if a.startswith("gen_") and callable(getattr(mod, a))]
            if not gens:
                # Look for generate_questions or similar
                gens = [a for a in dir(mod) if "generate" in a.lower() and callable(getattr(mod, a))]
            if not gens:
                results.append((subj, cls, 0, "NO GEN FUNCTIONS", ""))
                continue

            # Try calling first generator with different signatures
            fn = getattr(mod, gens[0])
            import inspect
            sig = inspect.signature(fn)
            params = list(sig.parameters.keys())

            q = None
            try:
                if not params:
                    q = fn()
                elif params == ["seed"]:
                    q = fn(seed=42)
                elif "rng" in params and "count" in params:
                    q = fn(rng=random.Random(42), count=1)
                elif "rng" in params:
                    q = fn(rng=random.Random(42))
                elif "seed" in params:
                    q = fn(seed=42)
                elif "count" in params:
                    q = fn(count=1)
                else:
                    q = fn(42)
            except Exception as e:
                results.append((subj, cls, len(gens), f"CALL ERR: {str(e)[:60]}", ""))
                continue

            # Extract question text
            text = ""
            if isinstance(q, list) and q:
                item = q[0]
                if isinstance(item, dict):
                    text = item.get("question", item.get("text", ""))
                else:
                    text = str(item)
            elif isinstance(q, dict):
                text = q.get("question", q.get("text", ""))
            else:
                text = str(q)

            text = str(text)[:80]
            results.append((subj, cls, len(gens), "OK", text))
        except Exception as e:
            results.append((subj, cls, 0, f"IMPORT ERR: {str(e)[:60]}", ""))

# Print results
print(f"{'Subject':<12} {'Class':<6} {'#Gens':>6} {'Status':<30} Sample")
print("-" * 120)
ok = 0
fail = 0
no_gen = 0
for subj, cls, ngen, status, sample in sorted(results):
    marker = ""
    if status == "OK":
        ok += 1
        marker = "OK"
    elif status.startswith("NO GEN"):
        no_gen += 1
        marker = "NOGEN"
    else:
        fail += 1
        marker = "FAIL"
    print(f"  {subj:<12} {cls:<6} {ngen:>6} {status:<30} {sample[:50]}")

print()
print(f"TOTAL: {len(results)} files | OK: {ok} | NO GEN: {no_gen} | FAIL: {fail}")
