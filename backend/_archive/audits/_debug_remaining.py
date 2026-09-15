import sys; sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Check grade 1 maths
entry = reg._question_gens.get('class1_maths_questions')
if entry:
    print("=== class1_maths_questions ===")
    for qt in entry.registry:
        namespaced = f"class1_maths_questions:{qt}"
        adapter = adapters.get_adapter(namespaced)
        obj = entry.registry[qt]
        status = "OK" if adapter else "FAIL"
        print(f"  {qt}: type={type(obj).__name__}, adapter={status}")
        if adapter:
            try:
                qs = adapter.generate(seed=42, count=1, difficulty=0.5)
                if qs:
                    print(f"    -> {str(qs[0].get('question_text',''))[:60]}")
                else:
                    print(f"    -> EMPTY")
            except Exception as e:
                print(f"    -> ERROR: {e}")

# Check grade 11 chem
print()
entry = reg._question_gens.get('class11_chem_questions')
if entry:
    print("=== class11_chem_questions (first 5) ===")
    for qt in list(entry.registry.keys())[:5]:
        namespaced = f"class11_chem_questions:{qt}"
        adapter = adapters.get_adapter(namespaced)
        status = "OK" if adapter else "FAIL"
        print(f"  {qt}: adapter={status}")
        if adapter:
            try:
                qs = adapter.generate(seed=42, count=1, difficulty=0.5)
                if qs:
                    print(f"    -> {str(qs[0].get('question_text',''))[:60]}")
                else:
                    print(f"    -> EMPTY")
            except Exception as e:
                print(f"    -> ERROR: {e}")

# Check grade 4 bio
print()
entry = reg._question_gens.get('class4_bio_questions')
if entry:
    print("=== class4_bio_questions ===")
    for qt in entry.registry:
        namespaced = f"class4_bio_questions:{qt}"
        adapter = adapters.get_adapter(namespaced)
        obj = entry.registry[qt]
        status = "OK" if adapter else "FAIL"
        print(f"  {qt}: type={type(obj).__name__}, adapter={status}")
        if adapter:
            try:
                qs = adapter.generate(seed=42, count=1, difficulty=0.5)
                if qs:
                    print(f"    -> {str(qs[0].get('question_text',''))[:60]}")
                else:
                    print(f"    -> EMPTY")
            except Exception as e:
                print(f"    -> ERROR: {e}")
