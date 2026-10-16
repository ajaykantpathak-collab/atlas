"""PROD-1 exam + PROD-2 practice on :3001."""
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
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(6000)
    note('login -> ' + page.url)

    # PROD-1: exam
    page.goto('http://localhost:3001/exam', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(6000)
    try:
        page.get_by_text(re.compile('^Mathematics$', re.I)).first.click(timeout=15000)
        page.wait_for_timeout(2500)
        page.get_by_text(re.compile('Start Exam', re.I)).first.click(timeout=15000)
        page.wait_for_timeout(6000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        crashed = 'Something went wrong' in body
        q_visible = bool(re.search(r'binary operation|Section A|Attempted', body, re.I))
        note(f'PROD-1 EXAM: crashed={crashed} question_rendered={q_visible}')
        note('  exam view: ' + body[:280])
        page.screenshot(path=r'D:/platform/.studentA_tmp/prod_exam.png', full_page=False)
    except Exception as e:
        note('PROD-1 exam ERR: ' + str(e)[:160])
        page.screenshot(path=r'D:/platform/.studentA_tmp/prod_exam_err.png', full_page=True)

    # PROD-2: practice
    page.goto('http://localhost:3001/practice', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(5000)
    body0 = re.sub(r'\s+',' ', page.inner_text('body'))
    streak_m = re.search(r'(\d+) Days', body0)
    note(f'PROD-2 practice pre-start streak: {streak_m.group(1) if streak_m else "?"} | mastery: ' + (re.search(r'(\d+)%', body0).group(0) if re.search(r'(\d+)%', body0) else '?'))
    try:
        page.get_by_text(re.compile('Start Practice', re.I)).first.click(timeout=10000)
        page.wait_for_timeout(8000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        q_of = re.search(r'Question \d+ of \d+', body)
        chips = re.search(r'(Ch\d+|Chapter \d+)', body)
        diff = re.search(r'(मध्यम|Easy|Medium|Hard|easy|medium|hard)', body)
        inps = page.locator('textarea:visible, input:visible').count()
        note(f'PROD-2 practice: "{q_of.group(0) if q_of else "NO Q-of-N"}" | chip="{chips.group(0) if chips else "?"}" | diff="{diff.group(0) if diff else "?"}" | inputs={inps}')
        note('  question area: ' + body[:350])
        if inps:
            page.locator('textarea:visible, input:visible').first.fill('42')
            page.get_by_text(re.compile('Submit', re.I)).first.click(timeout=6000)
            page.wait_for_timeout(3500)
            body2 = re.sub(r'\s+',' ', page.inner_text('body'))
            note('  after submit: ' + body2[:280])
        page.screenshot(path=r'D:/platform/.studentA_tmp/prod_practice.png', full_page=False)
    except Exception as e:
        note('PROD-2 practice ERR: ' + str(e)[:160])
        page.screenshot(path=r'D:/platform/.studentA_tmp/prod_practice_err.png', full_page=True)
    note('failing: ' + ' || '.join(failing[:6]))
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
