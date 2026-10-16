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
    page.wait_for_timeout(2500)
    # pick correct option (last)
    btns = page.locator('button:visible')
    opts = [(i, btns.nth(i).inner_text().strip()) for i in range(btns.count()) if len(btns.nth(i).inner_text().strip()) > 15]
    print('opts:', [o[1][:40] for o in opts])
    page.locator('button:visible').nth(opts[-1][0]).click()
    page.wait_for_timeout(2000)
    page.get_by_text("Let's learn").first.click()
    page.wait_for_timeout(2500)
    print('AFTER LEARN:', re.sub(r'\s+',' ', page.inner_text('body'))[:420])
    page.screenshot(path=r'D:/platform/.studentA_tmp/chal_learn.png')
    # try Let's Play
    try:
        page.get_by_text("Let's Play").first.click()
        page.wait_for_timeout(2500)
    except Exception as e:
        print('no Let\'s Play:', str(e)[:80])
    print('CHALLENGE STATE:', re.sub(r'\s+',' ', page.inner_text('body'))[:520])
    btns = page.locator('button:visible')
    for i in range(btns.count()):
        print(f'  btn[{i}]: "{btns.nth(i).inner_text().strip()[:60]}"')
    inps = page.locator('input:visible, textarea:visible')
    print('inputs:', inps.count())
    if inps.count():
        inps.first.fill('42')
    page.screenshot(path=r'D:/platform/.studentA_tmp/chal_before_check.png')
    try:
        page.get_by_text('Check').first.click()
        page.wait_for_timeout(2500)
    except Exception as e:
        print('check fail:', str(e)[:80])
    after = re.sub(r'\s+',' ', page.inner_text('body'))
    print('AFTER CHECK:', after[:520])
    page.screenshot(path=r'D:/platform/.studentA_tmp/chal_after_check.png')
    ctx.close(); b.close()
