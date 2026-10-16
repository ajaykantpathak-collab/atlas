import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    page.goto('http://localhost/sims-v2/v3_c6_math_ch01_p1', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    page.get_by_text('Begin the mission').first.click(); page.wait_for_timeout(2500)
    btns = page.locator('button:visible')
    opts = [(i, btns.nth(i).inner_text().strip()) for i in range(btns.count()) if len(btns.nth(i).inner_text().strip()) > 15]
    page.locator('button:visible').nth(opts[-1][0]).click(); page.wait_for_timeout(1800)
    page.get_by_text("Let's learn").first.click(); page.wait_for_timeout(2200)
    page.get_by_text("Let's Play").first.click(); page.wait_for_timeout(2500)
    print('CHALLENGE:', re.sub(r'\s+',' ', page.inner_text('body'))[:600])
    page.screenshot(path=r'D:/platform/.studentA_tmp/chal_state.png')
    # slider?
    sl = page.locator('input[type=range]')
    print('sliders:', sl.count())
    if sl.count():
        sl.first.evaluate("e => { const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set; setter.call(e,'7'); e.dispatchEvent(new Event('input',{bubbles:true})); e.dispatchEvent(new Event('change',{bubbles:true})); }")
        page.wait_for_timeout(500)
    btns = page.locator('button:visible')
    for i in range(btns.count()):
        print(f'  btn[{i}]: "{btns.nth(i).inner_text().strip()[:50]}"')
    page.get_by_text('Check').first.click(); page.wait_for_timeout(2500)
    print('AFTER CHECK:', re.sub(r'\s+',' ', page.inner_text('body'))[:600])
    page.screenshot(path=r'D:/platform/.studentA_tmp/chal_after_check.png')
    ctx.close(); b.close()
