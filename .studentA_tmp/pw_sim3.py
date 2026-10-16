import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    console=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:150]}') if m.type=='error' else None)
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:200]}'))
    page.goto('http://localhost/sims-v2/v3_c10_math_ch01_p1', wait_until='domcontentloaded', timeout=40000)
    page.wait_for_timeout(4000)
    page.get_by_text(re.compile('Begin the mission', re.I)).first.click()
    page.wait_for_timeout(4000)
    # click the (correct) third option
    page.get_by_text(re.compile('unique prime factorisation', re.I)).first.click()
    page.wait_for_timeout(3500)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('AFTER ANSWER: ' + body[:700])
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_sim_answer.png')
    note('CONSOLE: ' + ' || '.join(console[:8]))
    ctx.close(); b.close()
