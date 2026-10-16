import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    for route in ['/games','/profile']:
        console=[]; failing=[]
        def on_console(m):
            if m.type=='error': console.append(m.text[:140])
        def on_resp(r):
            if r.status >= 400: failing.append(f'{r.status} {r.request.method} {r.url.replace("http://localhost","")}')
        page.on('console', on_console); page.on('response', on_resp)
        page.goto(f'http://localhost{route}', wait_until='domcontentloaded', timeout=30000)
        page.wait_for_timeout(5000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        print(f'== {route}: failing requests:')
        for f in failing[:10]: print('   ', f)
        print('   console:', console[:6])
        print('   page:', body[:200])
        page.screenshot(path=rf'D:/platform/.studentA_tmp/shot_{route.strip("/")}.png')
        page.remove_listener('console', on_console); page.remove_listener('response', on_resp)
    ctx.close(); b.close()
