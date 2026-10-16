"""Fresh signup via real UI -> onboarding -> first dashboard -> empty states."""
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
    page.wait_for_timeout(2000)
    # find signup toggle
    try:
        page.get_by_text(re.compile('sign up|create account|register|new here', re.I)).first.click()
        page.wait_for_timeout(2500)
        note('signup form url: ' + page.url)
    except Exception as e:
        note('no signup toggle found: ' + str(e)[:100])
        page.screenshot(path=r'D:/platform/.studentA_tmp/firstrun_0_login.png')
    page.screenshot(path=r'D:/platform/.studentA_tmp/firstrun_1_signupform.png')
    inputs = page.locator('input:visible')
    note(f'signup inputs: {inputs.count()}')
    for i in range(inputs.count()):
        note(f'  input[{i}]: type={inputs.nth(i).get_attribute("type")} ph={inputs.nth(i).get_attribute("placeholder")}')
    # fill form
    try:
        inputs.nth(0).fill('Fresh Run')
        inputs.nth(1).fill(EMAIL)
        inputs.nth(2).fill('demo123')
        page.screenshot(path=r'D:/platform/.studentA_tmp/firstrun_2_filled.png')
        page.locator('button[type="submit"]').first.click()
        page.wait_for_timeout(6000)
        note('after submit url: ' + page.url)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        note('POST-SIGNUP PAGE: ' + body[:700])
        page.screenshot(path=r'D:/platform/.studentA_tmp/firstrun_3_aftersubmit.png', full_page=True)
    except Exception as e:
        note('signup fill fail: ' + str(e)[:150])
    errs=[c for c in console if c]
    note('console errors: ' + ' || '.join(errs[:6]))
    note('failing requests: ' + ' || '.join(failing[:8]))
    ctx.close(); b.close()
print('EMAIL:', EMAIL)
