import json
from pathlib import Path

f = Path(r'D:\platform\cbse_data\nodes\by_subject\accounts.json')
data = json.loads(f.read_text(encoding='utf-8'))
print(f'Type: {type(data)}')
if isinstance(data, dict):
    print(f'Keys: {list(data.keys())[:10]}')
    for k, v in list(data.items())[:3]:
        print(f'  {k}: type={type(v).__name__}', end='')
        if isinstance(v, list):
            print(f' len={len(v)}')
            if v and isinstance(v[0], dict):
                print(f'    First item keys: {list(v[0].keys())[:5]}')
                nid = v[0].get('node_id', 'N/A')
                print(f'    First item node_id: {nid}')
        elif isinstance(v, dict):
            print(f' keys={list(v.keys())[:5]}')
        else:
            print(f' value={str(v)[:50]}')
elif isinstance(data, list):
    print(f'Length: {len(data)}')
    if data and isinstance(data[0], dict):
        print(f'First item keys: {list(data[0].keys())[:5]}')

# Now load ALL node IDs properly
print('\n=== Loading all node IDs ===')
NODES_DIR = Path(r'D:\platform\cbse_data\nodes\by_subject')
all_ids = set()
for f in NODES_DIR.glob('*.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict):
                    nid = item.get('node_id', '')
                    if nid:
                        all_ids.add(nid)
        elif isinstance(data, dict):
            for k, v in data.items():
                if isinstance(v, list):
                    for item in v:
                        if isinstance(item, dict):
                            nid = item.get('node_id', '')
                            if nid:
                                all_ids.add(nid)
                elif isinstance(v, dict):
                    for k2, v2 in v.items():
                        if isinstance(v2, list):
                            for item in v2:
                                if isinstance(item, dict):
                                    nid = item.get('node_id', '')
                                    if nid:
                                        all_ids.add(nid)
    except Exception as e:
        print(f'  Error in {f.name}: {e}')

print(f'Unique node IDs: {len(all_ids)}')

# Sample some IDs
import random
sample = random.sample(list(all_ids), 10)
print(f'Sample IDs: {sample}')

# Check accounts specifically
acc_ids = [x for x in all_ids if 'acc' in x]
print(f'Accounts IDs: {len(acc_ids)}')
if acc_ids:
    print(f'  Sample: {acc_ids[:5]}')
