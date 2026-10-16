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
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:250]}'))
    responses=[]
    def on_resp(r):
        if '/api/' in r.url and r.request.method in ('POST','GET') and ('exam' in r.url or 'submit' in r.url):
            try: bd=r.text()[:200]
            except Exception: bd='<nb>'
            responses.append(f'{r.status} {r.request.method} {r.url.replace("http://localhost","")} :: {bd}')
    page.on('response', on_resp)
    page.goto('http://localhost/exam', wait_until='networkidle', timeout=45000)
    page.wait_for_timeout(2000)
    page.get_by_text(re.compile('^Mathematics$', re.I)).first.click()
    page.wait_for_timeout(2000)
    page.get_by_text(re.compile('Start Exam', re.I)).first.click()
    page.wait_for_timeout(3000)
    note('IN EXAM:\n' + page.inner_text('body')[:1500])
    # answer first few MCQs: click option buttons
    for i in range(3):
        opts = page.locator('button:has-text("A"), [role="radio"], label').count
        # click first visible option-ish element
        try:
            page.locator('button').nth(3).click()
            page.wait_for_timeout(300)
        except Exception as e: break
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_exam_live.png')
    note('NETWORK:'); [note('  '+r) for r in responses[:10]]
    note('CONSOLE: ' + ' || '.join(console[:10]))
    ctx.close(); b.close()
