import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':1000})
    page = ctx.new_page()
    for paper in ['Physics','Chemistry','Mathematics']:
        console=[]
        page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:120]}'))
        page.goto('http://localhost/exam', wait_until='networkidle', timeout=45000)
        page.wait_for_timeout(1500)
        page.get_by_text(re.compile(f'^{paper}$', re.I)).first.click()
        page.wait_for_timeout(1500)
        try:
            page.get_by_text(re.compile('Start Exam', re.I)).first.click()
            page.wait_for_timeout(2500)
            body = page.inner_text('body')[:200].replace('\n',' ')
            crashed = 'Something went wrong' in body
            note(f'{paper}: crashed={crashed} | {body[:120]}')
        except Exception as e:
            note(f'{paper}: exception {str(e)[:100]}')
        page.screenshot(path=rf'D:/platform/.studentA_tmp/shot_exam_{paper}.png')
    ctx.close(); b.close()
