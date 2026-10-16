import sys; sys.path.insert(0, r'D:/platform/.studentA_tmp')
from client import req, j, SID
import json

NODES = {
 6: ['c6_math_ch01_001','c6_math_ch01_002','c6_physics_ch01_001'],
 7: ['c7_math_ch01_001','c7_math_ch01_002','c7_physics_ch01_001'],
 8: ['c8_math_ch10_1','c8_math_ch10_2','c8_physics_ch01_001'],
}
results = []
for cl, nodes in NODES.items():
    print(f'===== CLASS {cl} =====')
    for nid in nodes:
        out = {'node': nid}
        # 1. detail via nodes/node (what UI uses)
        r = req('GET', f'/api/nodes/node?node_id={nid}')
        out['detail'] = r['code']
        title = None
        if r['code']==200 and isinstance(r['body'],dict): title = r['body'].get('title','')[:45]
        out['title'] = title
        # raw node id check: detail response fields
        # 2. enrichment
        r = req('GET', f'/api/content/nodes/{nid}/enrichment')
        out['enrichment'] = r['code']
        # 3. teach
        r = req('GET', f'/api/tutor-graph/teach?node_id={nid}')
        out['teach'] = r['code']
        if r['code']==200 and isinstance(r['body'],dict):
            out['teach_diag_q'] = bool(r['body'].get('diagnostic',{}).get('question'))
        # 4. mastery before
        r = req('GET', f'/api/progress/mastery/{nid}')
        out['mastery_before'] = r['body'] if r['code']==200 else r['code']
        # 5. questions
        r = req('GET', f'/api/content/nodes/{nid}/questions?limit=5')
        out['questions'] = r['code']
        qid = None
        if r['code']==200:
            b=r['body']; qs = b if isinstance(b,list) else (b.get('questions') if isinstance(b,dict) else None) or []
            out['nq'] = len(qs)
            if qs: qid = qs[0].get('id')
        # 6. submit quiz answer
        if qid:
            r = req('POST', '/api/tutor-graph/submit', {'student_id':SID,'question_id':qid,'answer':'42'})
            out['submit'] = f"{r['code']} {j(r.get('body'),80)}"
        else:
            out['submit'] = 'NO_QID'
        results.append(out)
        print(json.dumps(out, ensure_ascii=False))
json.dump(results, open(r'D:/platform/.studentA_tmp/j1_results.json','w'), indent=1)
