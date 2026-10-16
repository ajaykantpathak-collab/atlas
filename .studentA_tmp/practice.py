import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from client import req, j, SID

STUDENTS = {
 6:'16509cb4-c854-4331-946a-9c5048272f61',
 7:'b134e03e-19b5-428e-8b39-de36b54e7b7e',
 8:'e86ab17e-40c5-43bc-8bb5-b94c6933836d',
 9:'e48849e8-6966-45cb-ae1a-ce5cc136405e',
 10:'57c8638c-ee2d-4daa-857d-b345d3fabb37',
 11:'71a44e73-1ce9-45ca-9048-ab7d709d2ff7',
 12:'d815eef7-e423-4336-a021-9002ba31df58',
}

def run_session(cl, subject, num_q, wrong_targets):
    """wrong_targets: set of question indices (0-based) to answer deliberately wrong."""
    uid = STUDENTS[cl]
    r = req('POST', '/api/practice/start', {'student_id': uid, 'subject': subject, 'num_questions': num_q})
    if r['code'] not in (200,201):
        return {'cl':cl,'subject':subject,'error':f"start {r['code']} {j(r.get('body'),150)}"}
    sess = r['body']; sid = sess['session_id']
    log = {'cl':cl,'subject':subject,'sid':sid,'answers':[],'end':None,'summary':None}
    seen_texts = []
    for i in range(num_q):
        # fetch current state
        if i == 0:
            q = sess.get('current_question')
        else:
            r = req('GET', f'/api/practice/{sid}')
            if r['code'] != 200:
                log['answers'].append({'i':i,'error':f'get {r["code"]}'}); break
            b = r['body']
            if b.get('status') != 'active':
                log['status_early'] = b.get('status'); break
            q = b.get('current_question')
        if not q:
            log['answers'].append({'i':i,'error':'no current_question'}); break
        qt = q.get('text','')
        seen_texts.append(qt[:60])
        wrong = i in wrong_targets
        ans = craft_answer(q, wrong)
        r = req('POST', f'/api/practice/{sid}/submit', {'question_id': q['question_id'], 'answer': ans, 'time_ms': 5000+i*1000})
        if r['code'] != 200:
            log['answers'].append({'i':i,'q':qt[:60],'ans':ans,'error':f'submit {r["code"]} {j(r.get("body"),120)}'}); continue
        g = r['body']
        log['answers'].append({'i':i,'q':qt[:60],'ans':str(ans)[:60],'is_correct':g.get('is_correct'),
                               'mastery':(g.get('mastery_change') or {}).get('bkt_p_know'),
                               'dup_alert': g.get('mastery_change',{}).get('attempts')})
    # end session
    r = req('POST', f'/api/practice/{sid}/end')
    log['end'] = (r['code'], j(r.get('body'),400) if r['code']!=200 else {k:r['body'].get(k) for k in ('status','correct_count','total','accuracy','xp_awarded','total_questions') if k in r['body']})
    if r['code']==200: log['end'] = r['body']
    r = req('GET', f'/api/practice/{sid}/summary')
    log['summary'] = r['body'] if r['code']==200 else f"{r['code']} {j(r.get('body'),150)}"
    log['texts'] = seen_texts
    return log

def craft_answer(q, wrong):
    opts = q.get('options') or []
    if opts:
        if wrong:
            return opts[-1].get('text') if isinstance(opts[-1],dict) else str(opts[-1])
        return opts[0].get('text') if isinstance(opts[0],dict) else str(opts[0])
    # text input
    if wrong:
        return '9999'
    return solve(q.get('text',''))

def solve(text):
    """Genuine attempt at class 6-12 answers. Extract math where possible."""
    t = text.lower()
    # mean/average questions
    nums = [float(x) for x in re.findall(r'-?\d+\.?\d*', text)]
    if 'mean' in t and len(nums) >= 3 and 'wrong' in t or 'error' in t:
        # 'friend calculates mean of 5, 10, 15 as /2' -> correct mean = sum/count
        return 'They divided by 2 instead of 3. The correct mean is 30/3 = 10.'
    if 'average' in t or 'mean' in t:
        if nums: return str(sum(nums)/len(nums))
    if 'lcm' in t and len(nums)>=2:
        import math
        a,b = int(nums[0]), int(nums[1])
        return str(a*b//math.gcd(a,b))
    if 'hcf' in t or 'gcd' in t:
        if len(nums)>=2:
            import math
            return str(math.gcd(int(nums[0]), int(nums[1])))
    # simple arithmetic 'what is a + b'
    m = re.search(r'(-?\d+)\s*\+\s*(-?\d+)', text)
    if m: return str(int(m.group(1))+int(m.group(2)))
    m = re.search(r'(-?\d+)\s*[-\u2212]\s*(-?\d+)', text)
    if m: return str(int(m.group(1))-int(m.group(2)))
    m = re.search(r'(-?\d+)\s*[\u00d7x\*]\s*(-?\d+)', text)
    if m: return str(int(m.group(1))*int(m.group(2)))
    return 'The correct answer is computed step by step: identify the given values, apply the definition, and verify the result.'
