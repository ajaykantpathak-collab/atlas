import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    page.goto('http://localhost/study-tools', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(3500)
    btns = page.locator('button:has-text("Open tool")')
    for i in range(1, btns.count()):  # skip flashcards (done)
        btns.nth(i).click()
        page.wait_for_timeout(4000)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        # strip nav
        m = re.search(r'(Reset|Search|Term|Formula|Mistake|Example|Application)(.{0,320})', body[150:])
        note(f'--- TOOL {i+1}: ' + body[:120])
        note('    content: ' + (m.group(0)[:300] if m else body[200:500]))
        page.screenshot(path=rf'D:/platform/.studentA_tmp/shot_tool{i+1}.png', full_page=False)
        page.goto('http://localhost/study-tools', wait_until='domcontentloaded', timeout=45000)
        page.wait_for_timeout(2500)
    ctx.close(); b.close()
