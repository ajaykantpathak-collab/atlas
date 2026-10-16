import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    page.goto('http://localhost/sims-v2/v3_c6_math_ch01_p1', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(5000)
    # dump ALL buttons with text
    btns = page.locator('button:visible')
    print('visible buttons:', btns.count())
    for i in range(btns.count()):
        t = btns.nth(i).inner_text().strip().replace('\n',' / ')
        print(f'  btn[{i}]: "{t[:90]}"')
    page.screenshot(path=r'D:/platform/.studentA_tmp/simdbg_1.png')
    ctx.close(); b.close()
