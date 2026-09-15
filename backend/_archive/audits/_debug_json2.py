import re, json
from pathlib import Path
text = Path(r'D:\platform\cbse_coverage_output\gees202_chunk1_raw.txt').read_text(encoding='utf-8', errors='replace')
m = re.search(r'<<<JSON_START>>+\s*(.*?)\s*<<<JSON_END>>+', text, re.DOTALL)
clean = m.group(1)
clean = re.sub(r',\s*([}\]])', r'\1', clean)
clean = re.sub(r'"\s*\n\s*"', '",\n"', clean)
clean = re.sub(r'([}\]])\s+"', r'\1, "', clean)
try:
    json.loads(clean)
    print('OK')
except json.JSONDecodeError as e:
    print(f'Error at pos {e.pos}: {e.msg}')
    ctx = clean[max(0,e.pos-120):e.pos+120]
    print(f'Context: ...{ctx}...')
