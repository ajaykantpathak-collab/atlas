import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    page.goto('http://localhost/sims-v2/v3_c6_math_ch01_p1', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    page.get_by_text('Begin the mission').first.click()
    page.wait_for_timeout(3500)
    print('Q: ', re.sub(r'\s+',' ', page.inner_text('body'))[:350])
    # click option 4 (the correct estimation answer)
    page.get_by_text('They counted a small sample area').first.click()
    page.wait_for_timeout(3000)
    print('AFTER ANSWER: ', re.sub(r'\s+',' ', page.inner_text('body'))[:500])
    btns = page.locator('button:visible')
    print('buttons now:', btns.count())
    for i in range(btns.count()):
        print(f'  btn[{i}]: "{btns.nth(i).inner_text().strip()[:80]}"')
    page.screenshot(path=r'D:/platform/.studentA_tmp/sim_peek_after_answer.png')
    ctx.close(); b.close()
