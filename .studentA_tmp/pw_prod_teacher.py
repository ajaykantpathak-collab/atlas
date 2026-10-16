import sys, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    page.goto('http://localhost:3001/teacher-overview', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(6000)
    print('url after wait:', page.url)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    print('body:', body[:300])
    print('redirected_to_login:', '/login' in page.url)
    print('shows_login_prompt:', bool(re.search(r'sign in|log in', body, re.I)))
    print('shows_teacher_data:', bool(re.search(r'Rajesh|My Classes|Class 10', body)))
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_teacher_loggedout.png')
    ctx.close(); b.close()
