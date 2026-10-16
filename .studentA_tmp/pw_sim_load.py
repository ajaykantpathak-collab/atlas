import sys, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    for sim in ['v3_c6_chem_ch01_p1','v3_c6_sci_ch01_p1','v3_c8_sci_ch01_p1']:
        page.goto(f'http://localhost/sims-v2/{sim}', wait_until='domcontentloaded', timeout=45000)
        page.wait_for_timeout(12000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        stuck = 'loading your simulation' in body
        title = '· Part' in body
        print(f'{sim}: stuck_loading={stuck} has_title={title} | {body[:130]}')
        if stuck:
            page.screenshot(path=rf'D:/platform/.studentA_tmp/stuck_{sim}.png')
    ctx.close(); b.close()
