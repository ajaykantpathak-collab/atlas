"""Robust sim walker: click best-judged-correct option, capture feedback per slide."""
import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

SIMS = [
 (6,  'v3_c6_math_ch01_p1'),
 (6,  'v3_c6_math_ch01_p2'),
 (8,  'v3_c8_math_ch01_p1'),
 (8,  'v3_c8_math_ch02_p1'),
 (10, 'v3_c10_math_ch01_p1'),
 (10, 'v3_c10_math_ch02_p1'),
 (10, 'v3_c10_bio_ch01_p1'),
 (10, 'v3_c10_chem_ch01_p1'),
 (12, 'v3_c12_math_ch01_p1'),
 (12, 'v3_c12_math_ch02_p1'),
 (12, 'v3_c12_physics_ch01_p1'),
 (12, 'v3_c12_chemistry_ch01_p1'),
]

NAV = re.compile(r'^(previous|next|back|begin|skip|hint|exit|menu|sound|replay|volume|fullscreen|continue|try again|dashboard|\U0001f50a)', re.I)

def opts_on(page):
    btns = page.locator('button:visible')
    out = []
    for i in range(btns.count()):
        try: t = btns.nth(i).inner_text().strip()
        except Exception: continue
        if len(t) > 15 and not NAV.search(t) and not t.startswith('\U0001f50a'):
            out.append((i, t))
    return out

def feedback_of(after):
    m = re.search(r'(Not quite|Try again|Not exactly|Oops|Actually[^.]{0,120}|Correct[!.”"]?|Exactly[!.]?|Well done| spot on|That.s right)', after, re.I)
    return m.group(0)[:100] if m else None

def walk(page, cl, sim):
    rec = {'cl':cl,'sim':sim,'slides':[],'anomalies':[],'boot':None}
    try:
        page.goto(f'http://localhost/sims-v2/{sim}', wait_until='domcontentloaded', timeout=45000)
    except Exception as e:
        rec['boot'] = f'goto-fail {str(e)[:80]}'; return rec
    page.wait_for_timeout(4000)
    try:
        body = page.inner_text('body')
    except Exception as e:
        rec['boot'] = f'body-fail {str(e)[:80]}'; return rec
    if 'wandered off' in body:
        rec['boot'] = 'DEAD'; return rec
    try:
        page.get_by_text(re.compile('Begin the mission', re.I)).first.click(timeout=8000)
    except Exception:
        rec['boot'] = 'no-begin'; return rec
    rec['boot'] = 'ok'
    page.wait_for_timeout(2500)
    last_core = ''
    for step in range(14):
        try: body = re.sub(r'\s+',' ', page.inner_text('body'))
        except Exception: break
        opts = opts_on(page)
        slide = {'step':step, 'n_opts':len(opts)}
        if opts:
            # choose best-judged correct: prefer options with quantitative/explanatory content
            slide['options'] = [t[:70] for _,t in opts]
            i, t = opts[-1]  # default last (often the thorough/correct one)
            slide['picked'] = t[:70]
            try:
                page.locator('button:visible').nth(i).click(timeout=4000)
                page.wait_for_timeout(2400)
                after = re.sub(r'\s+',' ', page.inner_text('body'))
                slide['feedback'] = feedback_of(after)
                slide['advanced'] = after[:400] != body[:400]
            except Exception as e:
                slide['click_err'] = str(e)[:90]
        else:
            # continue-style
            adv = False
            for label in ['Continue','Next','Got it','Onward','Reveal','Let’s see',"Let's see",'Check']:
                try:
                    page.get_by_text(re.compile(f'^{label}', re.I)).first.click(timeout=1500)
                    adv = True; page.wait_for_timeout(2200); break
                except Exception: pass
            slide['advance_type'] = 'continue' if adv else 'none'
            slide['advanced'] = adv
            if not adv:
                rec['anomalies'].append(f'stuck step {step}; body tail: {body[-220:]}')
                rec['slides'].append(slide); break
        rec['slides'].append(slide)
        try:
            new_core = re.sub(r'\s+',' ', page.inner_text('body'))[:500]
        except Exception: break
        if new_core == last_core:
            rec['anomalies'].append(f'no-change loop at step {step}')
            break
        last_core = new_core
    return rec

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    out = []
    for cl, sim in SIMS:
        try:
            rec = walk(page, cl, sim)
        except Exception as e:
            rec = {'cl':cl,'sim':sim,'boot':f'EXC {str(e)[:120]}'}
        out.append(rec)
        print(f"== c{cl} {sim}: boot={rec.get('boot')} slides={len(rec.get('slides',[]))} anom={rec.get('anomalies',[])[:1]}")
        for s in rec.get('slides', []):
            print('   s%d opts=%d picked="%s" fb="%s" adv=%s' % (s['step'], s.get('n_opts',0), str(s.get('picked'))[:45], str(s.get('feedback'))[:45], s.get('advanced')))
    ctx.close(); b.close()
json.dump(out, open(r'D:/platform/.studentA_tmp/simwalk2_results.json','w'), indent=1, ensure_ascii=False)
