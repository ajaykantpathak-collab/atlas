"""Regression watch: /practice text input + /exam Start after fixes."""
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
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:150]}') if m.type=='error' else None)
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:200]}'))
    # login
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)

    # A) /practice: start a session, check text input exists
    page.goto('http://localhost/practice', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    try:
        page.get_by_text(re.compile('Start Practice', re.I)).first.click(timeout=6000)
        page.wait_for_timeout(6000)
    except Exception as e:
        note('practice start click: ' + str(e)[:100])
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('PRACTICE QUESTION STATE: ' + body[:420])
    inps = page.locator('input:visible, textarea:visible')
    n = inps.count()
    note(f'answer inputs visible: {n}')
    if n:
        try:
            inps.first.fill('10')
            note('filled 10 into input')
            sub = page.get_by_text(re.compile('Submit', re.I)).first
            sub.click(timeout=5000)
            page.wait_for_timeout(3000)
            body2 = re.sub(r'\s+',' ', page.inner_text('body'))
            note('AFTER SUBMIT: ' + body2[:400])
        except Exception as e:
            note('fill/submit err: ' + str(e)[:120])
    page.screenshot(path=r'D:/platform/.studentA_tmp/regress_practice.png', full_page=False)

    # B) /exam: Start Exam still crashes?
    page.goto('http://localhost/exam', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(3000)
    try:
        page.get_by_text(re.compile('^Mathematics$', re.I)).first.click()
        page.wait_for_timeout(2000)
        page.get_by_text(re.compile('Start Exam', re.I)).first.click()
        page.wait_for_timeout(4000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        crashed = 'Something went wrong' in body
        note(f'EXAM START: crashed={crashed} | ' + body[:250])
        page.screenshot(path=r'D:/platform/.studentA_tmp/regress_exam.png', full_page=False)
    except Exception as e:
        note('exam flow err: ' + str(e)[:120])
    errs = [c for c in console if c.startswith('PAGEERROR') or '401' in c or '500' in c]
    note('console: ' + ' || '.join(errs[:6]))
    ctx.close(); b.close()
