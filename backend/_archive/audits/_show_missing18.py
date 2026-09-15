import json
from pathlib import Path
out = Path(r'D:\platform\cbse_coverage_output')
missing = ['fess101','fess102','fess103','fess104','fess105','fess106','fess107','fess108','fess109','fess110','fess111','kegy101','kegy102','kegy103','kegy105','kegy106','kegy107','keww101']
for m in missing:
    result = out / f'{m}_result.json'
    if result.exists():
        data = json.loads(result.read_text(encoding='utf-8'))
        grade = data.get('grade')
        subj = data.get('subject')
        csubj = data.get('cbse_subject')
        title = data.get('title', '')[:50]
        print(f'  {m}: grade={grade}, subj={subj}, cbse={csubj}, title={title}')
