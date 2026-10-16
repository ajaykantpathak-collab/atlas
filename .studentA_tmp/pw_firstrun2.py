import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
EMAIL = f'fresh.run.{int(time.time())}@dreamapp.in'
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.on('response', lambda r: failing.append(f'{r.status} {r.request.method} {r.url.replace("http://localhost","")[:80]}') if r.status>=400 else None)
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.wait_for_timeout(1500)
    page.get_by_text('Start your map free').first.click()
    page.wait_for_timeout(2500)
    note('signup url: ' + page.url)
    inputs = page.locator('input:visible, select:visible')
    note(f'signup fields: {inputs.count()}')
    for i in range(inputs.count()):
        tag = inputs.nth(i).evaluate('e=>e.tagName')
        note(f'  field[{i}]: {tag} type={inputs.nth(i).get_attribute("type")} ph={inputs.nth(i).get_attribute("placeholder")}')
    page.screenshot(path=r'D:/platform/.studentA_tmp/fr_signup_form.png', full_page=True)
    # fill: name/email/password typically
    try:
        inputs.nth(0).fill('Fresh Run')
        inputs.nth(1).fill(EMAIL)
        inputs.nth(2).fill('demo123')
    except Exception as e:
        note('fill err: ' + str(e)[:100])
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(6000)
    note('after signup url: ' + page.url)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('POST-SIGNUP: ' + body[:800])
    page.screenshot(path=r'D:/platform/.studentA_tmp/fr_after_signup.png', full_page=True)
    note('failing: ' + ' || '.join(failing[:8]))
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
print('EMAIL:', EMAIL)
