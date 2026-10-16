import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    # A) c10 bio misgrade check
    page.goto('http://localhost/sims-v2/v3_c10_bio_ch01_p1', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    page.get_by_text('Begin the mission').first.click()
    page.wait_for_timeout(3000)
    print('BIO Q:', re.sub(r'\s+',' ', page.inner_text('body'))[:400])
    page.get_by_text('Being broken into molecules your cells a').first.click()
    page.wait_for_timeout(2000)
    cls = page.get_by_text('Being broken into molecules your cells a').first.get_attribute('class')
    print('BIO picked-wrong class:', cls)
    page.screenshot(path=r'D:/platform/.studentA_tmp/bio_wrongpick.png')
    ctx.close(); b.close()
