import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':1000})
    page = ctx.new_page()
    console=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:150]}') if m.type=='error' else None)
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:200]}'))
    page.goto('http://localhost/exam', wait_until='networkidle', timeout=45000)
    page.wait_for_timeout(2500)
    note('EXAM PAGE:\n' + page.inner_text('body')[:1200])
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_exam.png', full_page=True)
    note('CONSOLE: ' + ' || '.join(console[:10]))
    ctx.close(); b.close()
