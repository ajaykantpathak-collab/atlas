import sys, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    page.goto('http://localhost/lumen', wait_until='domcontentloaded', timeout=30000)
    page.wait_for_timeout(4000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    print('LUMEN PAGE:', body[:600])
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_lumen.png')
    # auth state check on lumen
    ls = page.evaluate("() => Object.keys(localStorage).join(',')")
    print('localStorage:', ls)
    ctx.close(); b.close()
