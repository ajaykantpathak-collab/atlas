import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:160]}'))
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:250]}'))
    # login as student (demo) then visit teacher page
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(4000)
    page.goto('http://localhost/teacher-overview', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(6000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('TEACHER-OVERVIEW (as student demo): ' + body[:1200])
    errs = [c for c in console if c.startswith('error') or c.startswith('PAGEERROR')]
    note('errors: ' + ' || '.join(errs[:6]))
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_teacher_as_student.png', full_page=True)
    ctx.close(); b.close()
