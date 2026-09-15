import sys; sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
reg = SolverRegistry(); reg.initialize()

# class12_psy
entry = reg._question_gens.get('class12_psy_questions')
lst = entry.registry.get('c12_psy_001')
print(f'class12_psy c12_psy_001: type={type(lst).__name__}, len={len(lst)}')
if lst:
    item = lst[0]
    print(f'  item type: {type(item).__name__}')
    if isinstance(item, dict):
        print(f'  keys: {list(item.keys())[:10]}')
        qt = item.get('question_text') or item.get('question') or item.get('text') or 'NOT FOUND'
        print(f'  question: {str(qt)[:60]}')
    else:
        attrs = [a for a in dir(item) if not a.startswith('_') and not callable(getattr(item,a))]
        print(f'  attrs: {attrs[:10]}')

# class11_maths
entry = reg._question_gens.get('class11_maths_questions')
lst = entry.registry.get('c11_math_001')
print(f'\nclass11_maths c11_math_001: type={type(lst).__name__}, len={len(lst)}')
if lst:
    item = lst[0]
    print(f'  item type: {type(item).__name__}')
    if isinstance(item, dict):
        print(f'  keys: {list(item.keys())[:10]}')
        qt = item.get('question_text') or item.get('question') or item.get('text') or 'NOT FOUND'
        print(f'  question: {str(qt)[:60]}')
    else:
        attrs = [a for a in dir(item) if not a.startswith('_') and not callable(getattr(item,a))]
        print(f'  attrs: {attrs[:10]}')
