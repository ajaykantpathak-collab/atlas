import sys, json, time, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright

logs = []
def note(s):
    print(s); logs.append(s)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    console = []
    page.on('console', lambda m: console.append(f'{m.type}: {m.text[:200]}'))
    page.on('pageerror', lambda e: console.append(f'PAGEERROR: {str(e)[:300]}'))
    # 1. login via real UI
    page.goto('http://localhost/login', wait_until='networkidle', timeout=45000)
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_login.png')
    note('LOGIN PAGE url=' + page.url + ' title=' + page.title())
    # fill email/password — inspect inputs
    inputs = page.locator('input')
    n = inputs.count()
    note(f'inputs on login page: {n}')
    for i in range(n):
        note(f'  input{i}: type={inputs.nth(i).get_attribute("type")} name={inputs.nth(i).get_attribute("name")} ph={inputs.nth(i).get_attribute("placeholder")}')
    try:
        inputs.nth(0).fill('demo@dreamapp.in')
        inputs.nth(1).fill('demo123')
        page.get_by_role('button').filter(has_text=re.compile('log in|sign in|login', re.I)).first.click()
        page.wait_for_load_state('networkidle', timeout=30000)
        note('after submit url=' + page.url)
    except Exception as e:
        note('login form attempt failed: ' + str(e)[:200])
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_after_login.png')
    # 2. practice page
    page.goto('http://localhost/practice', wait_until='networkidle', timeout=45000)
    page.wait_for_timeout(3000)
    body = page.inner_text('body')[:1500]
    note('PRACTICE PAGE body text:\n' + body)
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_practice.png', full_page=True)
    note('CONSOLE: ' + ' || '.join(console[:15]))
    ctx.close(); b.close()
