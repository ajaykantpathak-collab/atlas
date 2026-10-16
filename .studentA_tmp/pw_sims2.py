import sys, json, time, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

SIMS = []
for cl in [6,7,8,9,10,11,12]:
    SIMS += [(cl, s) for s in [f'v3_c{cl}_math_ch01_p1', f'v3_c{cl}_math_ch01_p2', f'v3_c{cl}_math_ch01_p3']]

logs=[]; results=[]
def note(s): print(s); logs.append(s)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)[:250]))
    console = []
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:150]}') if m.type=='error' else None)
    for cl, sim in SIMS:
        url = f'http://localhost/sims-v2/{sim}'
        rec = {'cl':cl,'sim':sim}
        try:
            page.goto(url, wait_until='domcontentloaded', timeout=40000)
            page.wait_for_timeout(4000)
            # click begin
            try:
                page.get_by_text(re.compile('Begin the mission', re.I)).first.click(timeout=6000)
                page.wait_for_timeout(9000)
                rec['clicked_begin'] = True
            except Exception as e:
                rec['clicked_begin'] = f'no button: {str(e)[:80]}'
            body = page.inner_text('body')
            rec['canvas'] = page.locator('canvas').count()
            rec['iframe'] = page.locator('iframe').count()
            rec['still_loading'] = 'loading your simulation' in body.lower()
            rec['has_error_text'] = bool(re.search(r'something went wrong|error occurred|failed to load|not available', body, re.I))
            rec['body_head'] = re.sub(r'\s+',' ', body)[:180]
            rec['pageerrors_tail'] = errors[-2:]
            ok = (rec['canvas']>0 or rec['iframe']>0) and not rec['has_error_text']
            rec['boot_ok'] = ok
            if not ok:
                rec['console_tail'] = console[-5:]
            if cl in (6,10) and sim.endswith('p1'):
                page.screenshot(path=rf'D:/platform/.studentA_tmp/shot_simboot_c{cl}.png')
        except Exception as e:
            rec['exception'] = str(e)[:150]
        results.append(rec)
        note(f"c{cl} {sim}: begin={rec.get('clicked_begin')} canvas={rec.get('canvas')} iframe={rec.get('iframe')} err_text={rec.get('has_error_text')} load={rec.get('still_loading')} OK={rec.get('boot_ok')}")
        if not rec.get('boot_ok'):
            note('   body: ' + str(rec.get('body_head'))[:170])
    ctx.close(); b.close()
json.dump(results, open(r'D:/platform/.studentA_tmp/sims_results2.json','w'), indent=1)
