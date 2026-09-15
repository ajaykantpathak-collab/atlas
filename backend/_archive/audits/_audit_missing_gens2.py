"""Identify all missing class/subject generators for CBSE grades 6-12."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry(); reg.initialize()

# Get all registered module names
registered_modules = set()
for qtype in reg.list_question_gen_types():
    mod = qtype.split(':')[0] if ':' in qtype else qtype
    registered_modules.add(mod)

# Expected class/subject combinations for CBSE grades 6-12
# Based on CBSE subjects per grade
expected = {
    6:  ['english', 'hindi', 'maths', 'science', 'social_science'],
    7:  ['english', 'hindi', 'maths', 'science', 'social_science', 'geography', 'history'],
    8:  ['english', 'hindi', 'maths', 'science', 'social_science', 'civics', 'geography', 'history'],
    9:  ['english', 'hindi', 'maths', 'science', 'social_science', 'civics', 'economics', 'geography', 'history', 'ai'],
    10: ['english', 'hindi', 'maths', 'science', 'social_science', 'civics', 'economics', 'history', 'ai'],
    11: ['english', 'hindi', 'maths', 'physics', 'chemistry', 'biology', 'accountancy', 'business_studies',
         'economics', 'geography', 'history', 'political_science', 'sociology', 'psychology',
         'home_science', 'biotechnology', 'informatics_practices', 'ai', 'applied_maths', 'legal_studies'],
    12: ['english', 'hindi', 'maths', 'physics', 'chemistry', 'biology', 'accountancy', 'business_studies',
         'economics', 'geography', 'history', 'political_science', 'sociology', 'psychology',
         'home_science', 'biotechnology', 'informatics_practices', 'ai', 'applied_maths', 'legal_studies'],
}

print("=== MISSING GENERATORS (Grades 6-12) ===\n")
missing = []
for grade in sorted(expected.keys()):
    for subj in expected[grade]:
        # Try different module name patterns
        candidates = [
            f"class{grade}_{subj}_questions",
            f"class{grade}_{subj.replace('_', '')}_questions",
            # Also check common abbreviations
            f"class{grade}_{subj}_q",
        ]
        found = any(c in registered_modules for c in candidates)
        # Also check if any module contains both grade and subject
        if not found:
            # Fuzzy match: check if any module has both the grade number and subject
            for mod in registered_modules:
                if f"class{grade}" in mod and subj.replace('_', '') in mod.replace('_', ''):
                    found = True
                    break
        if not found:
            missing.append((grade, subj))
            print(f"  Grade {grade} {subj}: MISSING")

print(f"\nTotal missing: {len(missing)}")

# Also check which existing generators have broken adapters
from services.question_adapter import AdapterRegistry
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

print("\n=== GENERATORS WITH BROKEN ADAPTERS ===\n")
broken = []
for qtype in reg.list_question_gen_types():
    adapter = adapters.get_adapter(qtype)
    if adapter is None:
        # Only report if it's a class or function (not a data class)
        mod_name = qtype.split(':')[0] if ':' in qtype else qtype
        gen_name = qtype.split(':')[1] if ':' in qtype else qtype
        # Skip known non-generator symbols
        if gen_name in ('Question', 'QuestionSet', 'QuestionBank', 'GeneratedQuestion',
                        'QuestionNode', 'VarGen', 'SolverResult', 'Step', 'NodeID',
                        'BioQuestionBank', 'GSTQuestion'):
            continue
        broken.append(qtype)

print(f"Broken adapters (excluding data classes): {len(broken)}")
for b in broken[:20]:
    print(f"  {b}")
if len(broken) > 20:
    print(f"  ... and {len(broken)-20} more")
