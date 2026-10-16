import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:140]}') if m.type=='error' else None)
    page.on('response', lambda r: failing.append(f'{r.status} {r.request.method} {r.url[:90]}') if r.status>=400 else None)
    page.goto('http://localhost:3000/login', wait_until='domcontentloaded', timeout=120000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(5000)
    page.goto('http://localhost:3000/exam', wait_until='domcontentloaded', timeout=180000)
    page.wait_for_timeout(6000)
    note('exam page text: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:300])
    try:
        page.get_by_text(re.compile('^Mathematics$', re.I)).first.click(timeout=15000)
        page.wait_for_timeout(3000)
        page.get_by_text(re.compile('Start Exam', re.I)).first.click(timeout=15000)
        page.wait_for_timeout(6000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        crashed = 'Something went wrong' in body
        note(f'EXAM :3000 Start: crashed={crashed}')
        note('after start: ' + body[:400])
        page.screenshot(path=r'D:/platform/.studentA_tmp/r3000_exam.png', full_page=False)
    except Exception as e:
        note('exam flow err: ' + str(e)[:150])
        page.screenshot(path=r'D:/platform/.studentA_tmp/r3000_exam_err.png', full_page=True)
    note('failing: ' + ' || '.join(failing[:6]))
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
