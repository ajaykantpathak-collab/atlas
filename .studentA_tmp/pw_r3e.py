import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
EMAIL = 'ship.check.1789685609@dreamapp.in'
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.on('response', lambda r: failing.append(f'{r.status} {r.url[:80]}') if r.status>=400 else None)
    # get a FRESH token via UI forgot
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(2000)
    page.get_by_text(re.compile('Forgot password', re.I)).first.click(); page.wait_for_timeout(2000)
    em = page.locator('input[type="email"]:visible, input:visible').first
    em.fill(EMAIL)
    page.locator('button[type="submit"]:visible, button:has-text("Send"), button:has-text("Reset")').first.click(timeout=6000)
    page.wait_for_timeout(4000)
    tok = None
    for r in page.context.request_history if hasattr(page.context,'request_history') else []:
        pass
    # capture from response via listener replays: simplest — re-fetch via page.evaluate fetch
    tok = page.evaluate("""async (email) => {
        const r = await fetch('/api/auth/forgot-password', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email})});
        const j = await r.json(); return j.reset_token || null;
    }""", EMAIL)
    note('fresh token: ' + (tok or 'NONE'))
    # go to reset UI with token
    for route in [f'/reset-password?token={tok}', f'/reset?token={tok}']:
        page.goto(f'http://localhost:3001{route}', wait_until='domcontentloaded', timeout=120000)
        page.wait_for_timeout(3500)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        if '404' not in body[:60] and 'could not be found' not in body:
            note(f'reset UI at {route.split("?")[0]}: ' + body[:300])
            page.screenshot(path=r'D:/platform/.studentA_tmp/r3_reset_ui.png')
            inps = page.locator('input:visible')
            note(f'  inputs: {inps.count()}')
            if inps.count() >= 1:
                inps.nth(0).fill('finalpw789')
                if inps.count() >= 2: inps.nth(1).fill('finalpw789')
                page.locator('button[type="submit"]:visible, button:has-text("Reset"), button:has-text("Save")').first.click(timeout=6000)
                page.wait_for_timeout(4500)
                body2 = re.sub(r'\s+',' ', page.inner_text('body'))
                note('  after reset submit: ' + body2[:300])
                page.screenshot(path=r'D:/platform/.studentA_tmp/r3_reset_done.png')
            break
    # login with new password via UI
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.fill('input[type="email"]', EMAIL)
    page.fill('input[type="password"]', 'finalpw789')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(6000)
    note('login NEW pw -> ' + page.url + (f' {"SUCCESS" if "/dashboard" in page.url or "/login" not in page.url else "FAIL"}'))
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_newpw_login.png')
    note('failing: ' + ' || '.join(failing[:5]))
    ctx.close(); b.close()
