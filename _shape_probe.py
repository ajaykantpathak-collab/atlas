import json
import os

for p in (r'frontend\components\sims_v2\CISCE_SIM_MAP.json',
          r'frontend\components\sims_v2\SIM_INDEX.json',
          r'frontend\components\sims_v2\SIM_FILE_MAP.json'):
    d = json.load(open(p, encoding='utf-8'))
    name = os.path.basename(p)
    print(name, '|', type(d).__name__, '| len', len(d))
    if isinstance(d, dict):
        k = next(iter(d))
        print('  key:', repr(k), '| val:', str(d[k])[:100])
    else:
        print('  item0:', str(d[0])[:150])

pf = r'_cisce_build\simw12\cisce_sim_map_w12_part.json'
d = json.load(open(pf, encoding='utf-8'))
print('w12 part |', type(d).__name__, '| len', len(d))
if isinstance(d, dict):
    k = next(iter(d))
    print('  key:', repr(k), '| val:', str(d[k])[:150])
else:
    print('  item0:', str(d[0])[:150])
