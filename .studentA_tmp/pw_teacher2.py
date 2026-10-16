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
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(3500)
    page.goto('http://localhost/teacher-overview', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(5000)
    # click into Class 10 A
    try:
        page.get_by_text('Class 10 A').first.click()
        page.wait_for_timeout(5000)
        note('CLASS DRILLDOWN: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:1000])
        page.screenshot(path=r'D:/platform/.studentA_tmp/shot_teacher_class.png', full_page=True)
    except Exception as e:
        note('drilldown fail: ' + str(e)[:150])
    # analytics tab
    try:
        page.get_by_text(re.compile('^Analytics$', re.I)).first.click()
        page.wait_for_timeout(5000)
        note('ANALYTICS TAB: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:900])
        page.screenshot(path=r'D:/platform/.studentA_tmp/shot_teacher_analytics.png', full_page=True)
    except Exception as e:
        note('analytics fail: ' + str(e)[:150])
    errs = [c for c in console if c.startswith('error') or c.startswith('PAGEERROR')]
    note('errors: ' + ' || '.join(errs[:8]))
    ctx.close(); b.close()
