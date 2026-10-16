import sys; sys.path.insert(0, r'D:/platform/.studentA_tmp')
from client import req, j, SID
import json

NODES = {
 6: ['c6_math_ch01_001','c6_math_ch01_002','c6_physics_ch01_001'],
 7: ['c7_math_ch01_001','c7_math_ch01_002','c7_physics_ch01_001'],
 8: ['c8_math_ch10_1','c8_math_ch10_2','c8_physics_ch01_001'],
}
# verify class 7/8 physics node ids exist first
for cl, nodes in NODES.items():
    for nid in list(nodes):
        r = req('GET', f'/api/content/nodes/{nid}')
        if r['code'] != 200:
            print(f'[c{cl}] DETAIL FAIL {nid}: {r["code"]} {j(r.get("body"),150)}')
            # find replacement: first physics node of that class
            rr = req('GET', f'/api/nodes/by-class-subject?class={cl}&subject=phy&limit=3')
            alts = [n['node_id'] for n in rr['body'].get('nodes',[]) if n['node_id'] not in nodes]
            if alts:
                nodes[nodes.index(nid)] = alts[0]
                print(f'[c{cl}] replaced with {alts[0]}')
    print(f'--- CLASS {cl} nodes: {nodes}')
    for nid in nodes:
        out = {'node': nid}
        r = req('GET', f'/api/content/nodes/{nid}')
        out['detail'] = r['code']
        if r['code']==200:
            b=r['body']
            out['title'] = (b.get('title') or b.get('node',{}).get('title','?'))[:40] if isinstance(b,dict) else '?'
        r = req('GET', f'/api/content/nodes/{nid}/content')
        out['content'] = r['code']
        r = req('GET', f'/api/content/nodes/{nid}/enrichment')
        out['enrich_code'] = r['code']
        if r['code']==200:
            b = r['body']
            if isinstance(b,dict):
                fields = {k: (len(v) if isinstance(v,(str,list,dict)) else v) for k,v in b.items()}
                empt = [k for k,v in fields.items() if v in (0,None,'',[],{})]
                out['enrich_fields'] = len(fields); out['enrich_empty'] = empt
            else: out['enrich_shape'] = type(b).__name__
        r = req('GET', f'/api/tutor-graph/teach?node_id={nid}')
        out['teach'] = r['code']
        qid = None
        if r['code']==200 and isinstance(r['body'],dict):
            tb = r['body']
            # look for a question id anywhere
            def find_q(o):
                if isinstance(o,dict):
                    for k,v in o.items():
                        if k in ('question_id','id','qid') and isinstance(v,str): return v
                        f=find_q(v)
                        if f: return f
                if isinstance(o,list):
                    for v in o:
                        f=find_q(v)
                        if f: return f
                return None
            qid = find_q(tb)
            out['teach_keys'] = list(tb.keys())[:10]
            out['teach_qid'] = qid
        else:
            out['teach_body'] = j(r.get('body'),200)
        r = req('GET', f'/api/content/nodes/{nid}/questions?limit=5')
        out['questions'] = r['code']
        if r['code']==200:
            b=r['body']
            qs = b if isinstance(b,list) else b.get('questions',[]) if isinstance(b,dict) else []
            out['n_questions'] = len(qs)
            if qs and qid is None:
                q0=qs[0]; qid = q0.get('id') or q0.get('question_id')
                out['q0_keys']=list(q0.keys())[:12]
        if qid:
            r = req('POST', '/api/tutor-graph/submit', {'student_id':SID,'question_id':qid,'answer':'4'})
            out['submit'] = r['code']
            if r['code']>=400: out['submit_body']=j(r.get('body'),200)
        else:
            out['submit'] = 'SKIPPED_NO_QID'
        print(json.dumps(out, ensure_ascii=False))
