import json, re, glob, sys, time
from backend.its.solver.catalog_executor import execute_concept
from backend.its.solver.input_normalizer import normalize_input

def ev(exp):
    s = str(exp).strip()
    if re.fullmatch(r"-?\d+\s*/\s*\d+", s):
        a, b = s.split('/'); return float(a) / float(b)
    m = re.findall(r'-?[\d.]+', s)
    return float(m[0]) if m else None

cls = sys.argv[1] if len(sys.argv) > 1 else '7'
lo = int(sys.argv[2]) if len(sys.argv) > 2 else 0
hi = int(sys.argv[3]) if len(sys.argv) > 3 else 999
files = sorted(glob.glob(
    f'backend/its/questions/generated/catalog_class{cls}_maths_*.json'))
tot_ok = tot = 0
t0 = time.time()
for f in files[lo:hi]:
    d = json.load(open(f, encoding='utf8'))
    ok = miss = 0
    for c in d['concepts']:
        for qq in (c.get('questions') or []):
            if qq.get('self_check'):
                continue  # text/tutor questions are not compute items
            e = ev(qq.get('a', ''))
            if e is None:
                continue
            try:
                r = execute_concept(c, {}, normalize_input(str(qq.get('q', ''))))
                good = r.ok and r.value is not None and abs(r.value - e) < 0.05
            except Exception:
                r = None
                good = False
            ok += good
            miss += not good
            if not good:
                print('MISS', c['id'], '|', str(qq.get('q'))[:55],
                      '->', getattr(r, 'value', None), 'exp',
                      str(qq.get('a'))[:14], flush=True)
    print(f.split('maths_')[-1], f'{ok}/{ok+miss}', flush=True)
    tot_ok += ok
    tot += ok + miss
print(f'CLASS{cls} TOTAL:', tot_ok, '/', tot, 'in',
      round(time.time() - t0), 's', flush=True)
