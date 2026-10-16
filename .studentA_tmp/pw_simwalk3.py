"""Sim walker v3: track green/not-green per pick; slide 0 answered deliberately wrong."""
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
NAV = re.compile(r'^(previous|next|back|begin|skip|hint|exit|menu|replay|fullscreen|try again|dashboard)', re.I)

def opts_on(page):
    btns = page.locator('button:visible')
    out = []
    for i in range(btns.count()):
        try: t = btns.nth(i).inner_text().strip()
        except Exception: continue
        if len(t) > 15 and not NAV.search(t) and not t.startswith('\U0001f50a'):
            out.append((i, t))
    return out

def cont_btn(page):
    btns = page.locator('button:visible')
    for i in range(btns.count()):
        try: t = btns.nth(i).inner_text().strip()
        except Exception: continue
        if 0 < len(t) <= 40 and not NAV.search(t) and not t.startswith('\U0001f50a') and len(t) <= 35:
            return i, t
    return None, None

def color_of(page, idx):
    try:
        cls = page.locator('button:visible').nth(idx).get_attribute('class') or ''
        bg = page.locator('button:visible').nth(idx).evaluate("e => getComputedStyle(e).backgroundColor")
        return f"{cls[:60]}|{bg}"
    except Exception:
        return '?'

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
    for step in range(16):
        try: body = re.sub(r'\s+',' ', page.inner_text('body'))
        except Exception: break
        opts = opts_on(page)
        st = {'step':step, 'q': body[:0]}
        qm = re.search(r'QUESTION!|Challenge|Quick check|Think', body, re.I)
        st['is_question'] = bool(qm)
        st['question'] = ''
        if qm:
            seg = body[qm.start():qm.start()+220]
            st['question'] = seg[:160]
        if opts:
            st['options'] = [t[:60] for _,t in opts]
            # strategy: step 0 -> pick option 0 (usually wrong); else pick last (usually right)
            pick_idx = 0 if step == 0 else len(opts)-1
            i, t = opts[pick_idx]
            st['picked'] = t[:70]
            st['intended'] = 'WRONG' if step == 0 else 'CORRECT'
            try:
                page.locator('button:visible').nth(i).click(timeout=4000)
                page.wait_for_timeout(2000)
                st['color_after'] = color_of(page, i)
                st['green'] = 'rgb(16, 185, 129)' in st['color_after'] or 'emerald' in st['color_after'] or 'green' in st['color_after'].lower()
            except Exception as e:
                st['click_err'] = str(e)[:80]
        ci, ct = cont_btn(page)
        if ci is not None:
            st['cont'] = ct[:40]
            try:
                page.locator('button:visible').nth(ci).click(timeout=3000)
                page.wait_for_timeout(2200)
            except Exception as e:
                st['cont_err'] = str(e)[:80]
        else:
            rec['anomalies'].append(f'no continue at step {step}; tail={body[-160:]}')
            rec['steps'].append(st); break
        rec['steps'].append(st)
        try: new = re.sub(r'\s+',' ', page.inner_text('body'))[:500]
        except Exception: break
        if new == last:
            rec['anomalies'].append(f'no-change at step {step}')
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
        for s in rec.get('steps', [])[:10]:
            g = s.get('green')
            print('   s%d %s picked="%s" green=%s cont="%s"' % (s['step'], s.get('intended',''), str(s.get('picked'))[:40], g, str(s.get('cont'))[:25]))
    ctx.close(); b.close()
json.dump(out, open(r'D:/platform/.studentA_tmp/simwalk3_results.json','w'), indent=1, ensure_ascii=False)
