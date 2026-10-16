"""Sim walker v4: proper continue keywords, input handling, deeper walk."""
import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

SIMS = [
 (6,  'v3_c6_math_ch01_p1'), (6,  'v3_c6_math_ch01_p2'),
 (8,  'v3_c8_math_ch01_p1'), (8,  'v3_c8_math_ch02_p1'),
 (10, 'v3_c10_math_ch01_p1'), (10, 'v3_c10_math_ch02_p1'),
 (10, 'v3_c10_bio_ch01_p1'), (10, 'v3_c10_chem_ch01_p1'),
 (12, 'v3_c12_math_ch01_p1'), (12, 'v3_c12_math_ch02_p1'),
]
CONT = re.compile(r"(let's learn|let's play|continue|next|got it|check|onward|reveal|try|see|show|go|start|begin|move|yes|no)", re.I)
NAV = re.compile(r'^(previous|next|back|skip|hint|exit|menu|replay|fullscreen|dashboard)', re.I)

def opts_on(page):
    btns = page.locator('button:visible')
    out = []
    for i in range(btns.count()):
        try: t = btns.nth(i).inner_text().strip()
        except Exception: continue
        if len(t) > 15 and not NAV.search(t) and not t.startswith('\U0001f50a'):
            out.append((i, t))
    return out

def cont_on(page):
    btns = page.locator('button:visible')
    for i in range(btns.count()):
        try: t = btns.nth(i).inner_text().strip()
        except Exception: continue
        if CONT.search(t) and len(t) <= 40 and not t.startswith('\U0001f50a'):
            return i, t
    return None, None

def walk(page, cl, sim):
    rec = {'cl':cl,'sim':sim,'steps':[],'anomalies':[],'boot':None}
    try:
        page.goto(f'http://localhost/sims-v2/{sim}', wait_until='domcontentloaded', timeout=45000)
    except Exception as e:
        rec['boot'] = f'goto-fail {str(e)[:70]}'; return rec
    page.wait_for_timeout(4000)
    try: body = page.inner_text('body')
    except Exception: return rec
    if 'wandered off' in body:
        rec['boot'] = 'DEAD'; return rec
    try:
        page.get_by_text(re.compile('Begin the mission', re.I)).first.click(timeout=8000)
    except Exception:
        rec['boot'] = 'no-begin'; return rec
    rec['boot'] = 'ok'
    page.wait_for_timeout(2500)
    last = ''
    for step in range(20):
        try: body = re.sub(r'\s+',' ', page.inner_text('body'))
        except Exception: break
        opts = opts_on(page)
        st = {'step':step}
        qm = re.search(r'QUESTION!(.{0,200})|Challenge(.{0,200})|Quick check(.{0,200})', body, re.I)
        st['question'] = (qm.group(0)[:150] if qm else '')
        if opts:
            st['options'] = [t[:55] for _,t in opts]
            pick_idx = 0 if step == 0 else len(opts)-1
            i, t = opts[pick_idx]
            st['picked'] = t[:60]; st['intended'] = 'WRONG' if step == 0 else 'CORRECT'
            try:
                page.locator('button:visible').nth(i).click(timeout=4000)
                page.wait_for_timeout(1800)
                cls = page.locator('button:visible').nth(i).get_attribute('class') or ''
                st['cls_after'] = cls[:70]
                st['green'] = bool(re.search(r'emerald|green', cls, re.I))
            except Exception as e:
                st['click_err'] = str(e)[:80]
        # inputs: type a plausible answer then Check
        inp = page.locator('input:visible, textarea:visible')
        if inp.count() and not opts:
            try:
                inp.first.fill('42')
                st['filled_input'] = True
            except Exception: pass
        ci, ct = cont_on(page)
        if ci is not None:
            st['cont'] = ct[:30]
            try:
                page.locator('button:visible').nth(ci).click(timeout=3000)
                page.wait_for_timeout(2000)
            except Exception as e:
                st['cont_err'] = str(e)[:70]
        else:
            rec['anomalies'].append(f'no-continue step {step}; tail: {body[-150:]}')
            rec['steps'].append(st); break
        rec['steps'].append(st)
        try: new = re.sub(r'\s+',' ', page.inner_text('body'))[:400]
        except Exception: break
        if new == last:
            rec['anomalies'].append(f'no-change step {step}')
            break
        last = new
    return rec

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    out = []
    for cl, sim in SIMS:
        try: rec = walk(page, cl, sim)
        except Exception as e:
            rec = {'cl':cl,'sim':sim,'boot':f'EXC {str(e)[:100]}'}
        out.append(rec)
        print(f"== c{cl} {sim}: boot={rec.get('boot')} steps={len(rec.get('steps',[]))} anom={rec.get('anomalies',[])[:1]}")
        for s in rec.get('steps', [])[:12]:
            print('   s%-2d %-7s q="%s" pick="%s" green=%s cont="%s"' % (
                s['step'], str(s.get('intended','')), str(s.get('question'))[:40],
                str(s.get('picked'))[:35], s.get('green'), str(s.get('cont'))[:22]))
    ctx.close(); b.close()
json.dump(out, open(r'D:/platform/.studentA_tmp/simwalk4_results.json','w'), indent=1, ensure_ascii=False)
