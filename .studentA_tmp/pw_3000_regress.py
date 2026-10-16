"""Re-verify blockers on :3000 (dev build with fixes)."""
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
    # login on :3000
    page.goto('http://localhost:3000/login', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(3000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(6000)
    note('login -> ' + page.url)

    # A) /practice: text input present? answer flows?
    page.goto('http://localhost:3000/practice', wait_until='domcontentloaded', timeout=180000)
    page.wait_for_timeout(5000)
    try:
        page.get_by_text(re.compile('Start Practice', re.I)).first.click(timeout=8000)
        page.wait_for_timeout(10000)
    except Exception as e:
        note('start click err: ' + str(e)[:100])
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('PRACTICE :3000: ' + body[:380])
    chips = re.search(r'(Ch\d+|Chapter \d+|मध्यम|medium|Medium)', body)
    note('chip text: ' + (chips.group(0) if chips else 'none'))
    inps = page.locator('input:visible, textarea:visible')
    n = inps.count()
    note(f'answer inputs: {n}')
    if n:
        inps.first.fill('10')
        page.get_by_text(re.compile('Submit', re.I)).first.click(timeout=6000)
        page.wait_for_timeout(3500)
        body2 = re.sub(r'\s+',' ', page.inner_text('body'))
        note('AFTER SUBMIT: ' + body2[:320])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3000_practice.png', full_page=False)

    # B) /exam: Start Exam
    page.goto('http://localhost:3000/exam', wait_until='domcontentloaded', timeout=180000)
    page.wait_for_timeout(4000)
    page.get_by_text(re.compile('^Mathematics$', re.I)).first.click()
    page.wait_for_timeout(2000)
    page.get_by_text(re.compile('Start Exam', re.I)).first.click()
    page.wait_for_timeout(5000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    crashed = 'Something went wrong' in body
    note(f'EXAM :3000: crashed={crashed} | ' + body[:300])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3000_exam.png', full_page=False)
    note('failing: ' + ' || '.join(failing[:6]))
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
