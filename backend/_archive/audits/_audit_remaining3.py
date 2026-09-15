"""Check all remaining broken/empty generators for grades 6-12."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry
from collections import defaultdict

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Skip data/model classes
SKIP = {'Question', 'QuestionSet', 'QuestionBank', 'GeneratedQuestion',
        'QuestionNode', 'VarGen', 'SolverResult', 'Step', 'NodeID',
        'BioQuestionBank', 'GSTQuestion', 'QuestionPaper', 'QuestionGenerator',
        'DeterministicQuestionGenerator'}

module_status = defaultdict(lambda: {'ok': 0, 'empty': [], 'broken': []})

for qtype in reg.list_question_gen_types():
    mod = qtype.split(':')[0] if ':' in qtype else qtype
    gen_name = qtype.split(':')[1] if ':' in qtype else qtype
    if gen_name in SKIP:
        continue
    
    import re
    m = re.match(r'class(\d+)_', mod)
    if not m or int(m.group(1)) < 5:
        continue
    
    adapter = adapters.get_adapter(qtype)
    if adapter is None:
        module_status[mod]['broken'].append(gen_name)
    else:
        try:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                module_status[mod]['ok'] += 1
            else:
                module_status[mod]['empty'].append(gen_name)
        except:
            module_status[mod]['empty'].append(gen_name)

print("=== REMAINING ISSUES (Grades 5-12) ===\n")
for mod in sorted(module_status.keys()):
    status = module_status[mod]
    if status['ok'] == 0 and (status['empty'] or status['broken']):
        print(f"  {mod}: OK={status['ok']}, EMPTY={status['empty']}, BROKEN={status['broken']}")
    elif status['empty'] or status['broken']:
        print(f"  {mod}: OK={status['ok']}, EMPTY={len(status['empty'])}, BROKEN={len(status['broken'])}")
        if status['empty']:
            print(f"    empty: {status['empty'][:5]}")
        if status['broken']:
            print(f"    broken: {status['broken'][:5]}")
