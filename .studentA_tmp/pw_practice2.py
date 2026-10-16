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
            try: body = r.text()[:400]
            except Exception: body = '<no body>'
            responses.append(f'{r.status} {r.request.method} {r.url} :: {body}')
    page.on('response', on_resp)
    # seed token in localStorage to simulate logged-in student (find storage key first)
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=45000)
    page.evaluate("""() => { localStorage.setItem('token','TOKEN_PLACEHOLDER'); }""")
    page.goto('http://localhost/practice', wait_until='networkidle', timeout=45000)
    page.wait_for_timeout(2000)
    # click Start
    try:
        page.get_by_text('Start Practice').first.click()
        note('clicked Start Practice')
    except Exception as e:
        note('start click failed: ' + str(e)[:150])
    page.wait_for_timeout(6000)
    note('BODY AFTER START:\n' + page.inner_text('body')[:1800])
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_practice_q.png', full_page=True)
    note('NETWORK:'); [note('  '+r) for r in responses[:12]]
    note('CONSOLE: ' + ' || '.join(console[:12]))
    ctx.close(); b.close()
open(r'D:/platform/.studentA_tmp/pw_practice2.log','w').write('\n'.join(logs))
