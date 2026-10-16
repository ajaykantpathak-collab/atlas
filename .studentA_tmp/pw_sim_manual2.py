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
    page.wait_for_timeout(4000)
    for step in range(8):
        btns = page.locator('button:visible')
        print(f'--- STEP {step}: {btns.count()} buttons')
        for i in range(min(btns.count(), 14)):
            t = btns.nth(i).inner_text().strip().replace('\n',' / ')
            print(f'  btn[{i}]: "{t[:85]}"')
        # also non-button clickables
        divs = page.locator('[role="button"], .cursor-pointer')
        print('  clickable divs:', divs.count())
        for i in range(min(divs.count(), 8)):
            t = divs.nth(i).inner_text().strip().replace('\n',' / ')[:70]
            print(f'  div[{i}]: "{t}"')
        page.screenshot(path=rf'D:/platform/.studentA_tmp/simdbg_step{step}.png')
        # click the option-looking thing: try div first, then buttons not nav
        clicked = False
        for i in range(divs.count()):
            t = divs.nth(i).inner_text().strip()
            if 10 < len(t) < 200:
                divs.nth(i).click()
                clicked = True
                print(f'  >> clicked div[{i}]: "{t[:60]}"')
                break
        if not clicked:
            for i in range(btns.count()):
                t = btns.nth(i).inner_text().strip()
                if re.search(r'next|continue|onward|got it', t, re.I):
                    btns.nth(i).click(); clicked = True
                    print(f'  >> clicked btn[{i}]: "{t[:60]}"')
                    break
        if not clicked:
            print('  STUCK'); break
        page.wait_for_timeout(2500)
    ctx.close(); b.close()
