import sys, json, time, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

SIMS = []
for cl in [6,7,8,9,10,11,12]:
    base = [f'v3_c{cl}_math_ch01_p1', f'v3_c{cl}_math_ch01_p2', f'v3_c{cl}_math_ch01_p3']
    SIMS += [(cl, s) for s in base]

logs=[]; results=[]
def note(s): print(s); logs.append(s)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)[:200]))
    console = []
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:120]}') if m.type=='error' else None)
    for cl, sim in SIMS:
        url = f'http://localhost/sims-v2/{sim}'
        try:
            page.goto(url, wait_until='domcontentloaded', timeout=40000)
            page.wait_for_timeout(9000)  # let sim boot
            body = page.inner_text('body')
            still_loading = 'loading your simulation' in body.lower()
            canvas = page.locator('canvas').count()
            iframe = page.locator('iframe').count()
            # error indicators
            err_text = [l for l in body.split('\n') if re.search(r'error|not found|failed|404', l, re.I)][:3]
            # any interactive hint
            btns = page.locator('button').count()
            ok = (canvas>0 or iframe>0) and not still_loading
            results.append({'cl':cl,'sim':sim,'canvas':canvas,'iframe':iframe,'still_loading':still_loading,'errors':err_text,'btns':btns,'pageerrors':errors[-3:] if errors else []})
            note(f"c{cl} {sim}: canvas={canvas} iframe={iframe} loading={still_loading} btns={btns} err={err_text[:1]} pageerr={len(errors)}")
            if cl==6 and sim.endswith('p1'):
                page.screenshot(path=r'D:/platform/.studentA_tmp/shot_sim_c6.png')
            if cl==10 and sim.endswith('p1'):
                page.screenshot(path=r'D:/platform/.studentA_tmp/shot_sim_c10.png')
        except Exception as e:
            results.append({'cl':cl,'sim':sim,'exception':str(e)[:150]})
            note(f"c{cl} {sim}: EXCEPTION {str(e)[:120]}")
    ctx.close(); b.close()
json.dump(results, open(r'D:/platform/.studentA_tmp/sims_results.json','w'), indent=1)
open(r'D:/platform/.studentA_tmp/pw_sims.log','w').write('\n'.join(logs))
