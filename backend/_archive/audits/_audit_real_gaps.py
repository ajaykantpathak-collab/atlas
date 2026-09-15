"""Check which generators actually work vs are broken, focusing on grades 6-12."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Group by module and check which have at least one working adapter
from collections import defaultdict
module_status = defaultdict(lambda: {'ok': [], 'empty': [], 'broken': []})

for qtype in reg.list_question_gen_types():
    mod = qtype.split(':')[0] if ':' in qtype else qtype
    gen_name = qtype.split(':')[1] if ':' in qtype else qtype
    
    # Skip data/model classes
    if gen_name in ('Question', 'QuestionSet', 'QuestionBank', 'GeneratedQuestion',
                    'QuestionNode', 'VarGen', 'SolverResult', 'Step', 'NodeID',
                    'BioQuestionBank', 'GSTQuestion', 'QuestionPaper'):
        continue
    
    adapter = adapters.get_adapter(qtype)
    if adapter is None:
        module_status[mod]['broken'].append(gen_name)
    else:
        qs = adapter.generate(seed=42, count=1, difficulty=0.5)
        if qs:
            module_status[mod]['ok'].append(gen_name)
        else:
            module_status[mod]['empty'].append(gen_name)

# Show modules with NO working generators (all broken or empty)
print("=== MODULES WITH NO WORKING GENERATORS (Grades 6-12) ===\n")
critical = []
for mod in sorted(module_status.keys()):
    # Filter to grades 6-12
    import re
    m = re.match(r'class(\d+)_', mod)
    if not m or int(m.group(1)) < 6:
        continue
    status = module_status[mod]
    if not status['ok']:
        critical.append(mod)
        print(f"  {mod}:")
        print(f"    OK: {status['ok']}")
        print(f"    EMPTY: {status['empty']}")
        print(f"    BROKEN: {status['broken']}")

print(f"\nTotal critical modules: {len(critical)}")

# Also check grade 5 english specifically
print("\n=== GRADE 5 ENGLISH ===")
mod = 'class5_english_questions'
if mod in module_status:
    status = module_status[mod]
    print(f"  OK: {status['ok']}")
    print(f"  EMPTY: {status['empty']}")
    print(f"  BROKEN: {status['broken']}")
