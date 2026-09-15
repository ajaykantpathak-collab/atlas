import json, os, glob, re
executor_src = open('backend/its/solver/catalog_executor.py', encoding='utf-8').read()
all_kernels = set(re.findall(r'"(c7m\d+\.\d+\.\d+)"', executor_src))

files = sorted(glob.glob('backend/its/competency/catalog_class7_maths_ch*_*.json'))
print('Concepts with solution_type=compute, NO kernel, NO compute fields:')
count = 0
for f in files:
    d = json.load(open(f, encoding='utf-8'))
    for c in d.get('concepts',[]):
        cid = c.get('id','')
        if c.get('solution_type') != 'compute':
            continue
        if cid in all_kernels:
            continue  # kernel handles it
        has_compute = any('compute' in s for s in c.get('solution_steps',[]))
        if not has_compute:
            count += 1
            print('  %s: %s' % (cid, c['title']))
            print('    formula:', c.get('formula',''))
print()
print('Total needing compute fields:', count)
