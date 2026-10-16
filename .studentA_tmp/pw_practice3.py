import sys, json, time, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

logs = []
def note(s):
    print(s); logs.append(s)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    console = []
    page.on('console', lambda m: console.append(f'{m.type}: {m.text[:250]}'))
    page.on('pageerror', lambda e: console.append(f'PAGEERROR: {str(e)[:300]}'))
    responses = []
    def on_resp(r):
        if '/api/practice' in r.url:
            try: body = r.text()[:300]
            except Exception: body = '<no body>'
            responses.append(f'{r.status} {r.request.method} {r.url.replace("http://localhost","")} :: {body}')
    page.on('response', on_resp)
    page.goto('http://localhost/practice', wait_until='networkidle', timeout=45000)
    page.wait_for_timeout(1500)
    page.get_by_text('Start Practice').first.click()
    page.wait_for_timeout(5000)
    # find input
    inp = page.locator('input[type="text"], input[type="number"], input:not([type])')
    n = inp.count
    note(f'text inputs visible: {n}')
    if n:
        inp.first.fill('38.25')
        note('typed 38.25 (correct answer)')
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_before_submit.png')
    page.get_by_text('Submit Answer').first.click()
    page.wait_for_timeout(4000)
    note('BODY AFTER SUBMIT:\n' + page.inner_text('body')[:1500])
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_after_submit.png', full_page=True)
    note('NETWORK:'); [note('  '+r) for r in responses[:14]]
    note('CONSOLE: ' + ' || '.join(console[:10]))
    ctx.close(); b.close()
open(r'D:/platform/.studentA_tmp/pw_practice3.log','w').write('\n'.join(logs))
