import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from client import req, j

STUDENTS = {
 6:'16509cb4-c854-4331-946a-9c5048272f61',
 7:'b134e03e-19b5-428e-8b39-de36b54e7b7e',
 8:'e86ab17e-40c5-43bc-8bb5-b94c6933836d',
 9:'e48849e8-6966-45cb-ae1a-ce5cc136405e',
 10:'57c8638c-ee2d-4daa-857d-b345d3fabb37',
 11:'71a44e73-1ce9-45ca-9048-ab7d709d2ff7',
 12:'d815eef7-e423-4336-a021-9002ba31df58',
}

def run_session(cl, subject, num_q, wrong_idx, learn=True):
    uid = STUDENTS[cl]
    r = req('POST', '/api/practice/start', {'student_id': uid, 'subject': subject, 'num_questions': num_q})
    if r['code'] not in (200,201):
        return {'cl':cl,'subject':subject,'error':f"start {r['code']} {j(r.get('body'),150)}"}
    sess = r['body']; sid = sess['session_id']
    learned = {}
    answers_log = []
    texts_seen = []
    for i in range(num_q):
        if i == 0:
            q = sess.get('current_question')
        else:
            r = req('GET', f'/api/practice/{sid}')
            if r['code'] != 200:
                answers_log.append({'i':i,'error':f'get {r["code"]} {j(r.get("body"),80)}'}); break
            b = r['body']
            if b.get('status') != 'active': break
            q = b.get('current_question')
        if not q: break
        key = re.sub(r'\W+','', q.get('text',''))[:60]
        texts_seen.append(q.get('text','')[:55])
        if i in wrong_idx:
            ans = '9999'
        elif learn and key in learned:
            ans = learned[key]
        else:
            ans = best_guess(q)
        r = req('POST', f'/api/practice/{sid}/submit', {'question_id': q['question_id'], 'answer': ans, 'time_ms': 4000+i*1000})
        if r['code'] != 200:
            answers_log.append({'i':i,'q':texts_seen[-1],'ans':str(ans)[:40],'error':f'submit {r["code"]} {j(r.get("body"),100)}'}); continue
        g = r['body']
        if not g.get('is_correct') and g.get('correct_answer') and key not in learned:
            learned[key] = g['correct_answer']
        answers_log.append({'i':i,'q':texts_seen[-1],'ans':str(ans)[:40],'is_correct':g.get('is_correct'),
                            'p_know':(g.get('mastery_change') or {}).get('bkt_p_know')})
    # end (may 400 if auto-ended)
    r = req('POST', f'/api/practice/{sid}/end')
    end_code = r['code']
    r = req('GET', f'/api/practice/{sid}/summary')
    summary = r['body'] if r['code']==200 else {'err': r['code'], 'detail': j(r.get('body'),120)}
    return {'cl':cl,'subject':subject,'sid':sid,'end_status':end_code,
            'correct': sum(1 for a in answers_log if a.get('is_correct')),
            'attempted': sum(1 for a in answers_log if 'error' not in a),
            'answers': answers_log, 'summary': summary, 'texts': texts_seen}

def best_guess(q):
    opts = q.get('options') or []
    if opts:
        return opts[0].get('text') if isinstance(opts[0],dict) else str(opts[0])
    t = q.get('text','')
    tl = t.lower()
    import math
    nums = [float(x) for x in re.findall(r'-?\d+\.?\d*', t)]
    # word problems
    m = re.search(r'bought .*?(\d+\.?\d*)', t)
    if 'left' in tl and 'bought' in tl and len(nums)>=3:
        return str(nums[0]-nums[1]-nums[2])
    if 'mean' in tl or 'average' in tl:
        if 'wrong' in tl or 'error' in tl or 'fix' in tl:
            vals = re.findall(r'(\d+\.?\d*),\s*(\d+\.?\d*),?\s*(?:and\s*)?(\d+\.?\d*)?', t)
            if vals and vals[0][0] and vals[0][1] and vals[0][2]:
                s = float(vals[0][0])+float(vals[0][1])+float(vals[0][2])
                return f'Divided by the wrong count. The correct mean is {s:g}/3 = {s/3:g}.'
        if len(nums)>=2: return str(sum(nums)/len(nums))
    if 'perimeter' in tl and len(nums)>=2:
        return str(2*(nums[0]+nums[1]))
    if 'area' in tl and 'rectangle' in tl and len(nums)>=2:
        return str(nums[0]*nums[1])
    if 'volume' in tl and len(nums)>=3:
        return str(nums[0]*nums[1]*nums[2])
    if 'lcm' in tl and len(nums)>=2: return str(int(nums[0])*int(nums[1])//math.gcd(int(nums[0]),int(nums[1])))
    if ('hcf' in tl or 'gcd' in tl) and len(nums)>=2: return str(math.gcd(int(nums[0]),int(nums[1])))
    if 'profit' in tl and len(nums)>=2: return str(nums[0]-nums[1])
    if 'simple interest' in tl and len(nums)>=3: return str(nums[0]*nums[1]*nums[2]/100)
    if 'fraction' in tl and 'equivalent' in tl: return 'Multiply numerator and denominator by the same number.'
    m = re.search(r'(-?\d+)\s*\+\s*(-?\d+)', t)
    if m: return str(int(m.group(1))+int(m.group(2)))
    m = re.search(r'(-?\d+)\s*[\u00d7x\*]\s*(-?\d+)', t)
    if m: return str(int(m.group(1))*int(m.group(2)))
    # generic conceptual fallback
    fb = [
      'It is the process of identifying the given quantities, applying the relevant rule or definition, and computing the result step by step.',
      'The answer is found by applying the definition to the given values and verifying the calculation.',
      'Break the problem into steps: list the knowns, use the formula or rule, then simplify to get the final value.',
    ]
    import random
    return fb[len(t) % len(fb)]

# persistent learned-answer store across sessions
import os
MEM = r'D:/platform/.studentA_tmp/learned.json'
def load_mem():
    try: return json.load(open(MEM))
    except Exception: return {}
def save_mem(m): json.dump(m, open(MEM,'w'), ensure_ascii=False)

def run_session2(cl, subject, num_q, wrong_idx):
    uid = STUDENTS[cl]
    mem = load_mem()
    r = req('POST', '/api/practice/start', {'student_id': uid, 'subject': subject, 'num_questions': num_q})
    if r['code'] not in (200,201):
        return {'cl':cl,'subject':subject,'error':f"start {r['code']} {j(r.get('body'),150)}"}
    sess = r['body']; sid = sess['session_id']
    answers_log = []; texts_seen = []
    for i in range(num_q):
        if i == 0: q = sess.get('current_question')
        else:
            r = req('GET', f'/api/practice/{sid}')
            if r['code'] != 200:
                answers_log.append({'i':i,'error':f'get {r["code"]}'}); break
            b = r['body']
            if b.get('status') != 'active': break
            q = b.get('current_question')
        if not q: break
        key = re.sub(r'\W+','', q.get('text',''))[:60]
        texts_seen.append(q.get('text','')[:55])
        if i in wrong_idx: ans = '9999'
        elif key in mem: ans = mem[key]
        else: ans = best_guess(q)
        r = req('POST', f'/api/practice/{sid}/submit', {'question_id': q['question_id'], 'answer': ans, 'time_ms': 3000+i*700})
        if r['code'] >= 500:
            answers_log.append({'i':i,'q':texts_seen[-1],'error':f'submit {r["code"]}'}); continue
        if r['code'] != 200:
            answers_log.append({'i':i,'q':texts_seen[-1],'error':f'submit {r["code"]} {j(r.get("body"),80)}'}); continue
        g = r['body']
        if not g.get('is_correct') and g.get('correct_answer'):
            mem[key] = g['correct_answer']
        answers_log.append({'i':i,'q':texts_seen[-1],'ans':str(ans)[:35],'is_correct':g.get('is_correct')})
    save_mem(mem)
    req('POST', f'/api/practice/{sid}/end')
    r = req('GET', f'/api/practice/{sid}/summary')
    summary = r['body'] if r['code']==200 else {'err': r['code']}
    return {'cl':cl,'subject':subject,'sid':sid,
            'correct': sum(1 for a in answers_log if a.get('is_correct')),
            'attempted': sum(1 for a in answers_log if 'error' not in a),
            'answers': answers_log, 'summary': summary}
