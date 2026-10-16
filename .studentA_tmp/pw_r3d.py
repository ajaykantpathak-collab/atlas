"""R3 sweep C: item 6 password reset UI round-trip on :3001."""
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
    console=[]; failing=[]; api=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.on('response', lambda r: (failing.append(f'{r.status} {r.url[:80]}') if r.status>=400 else None))
    page.on('response', lambda r: api.append(f'{r.status} {r.url[:80]} :: {r.text()[:120]}') if '/api/auth/forgot' in r.url or '/api/auth/reset' in r.url else None)
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(2500)
    page.get_by_text(re.compile('Forgot password', re.I)).first.click()
    page.wait_for_timeout(2500)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('forgot view: ' + body[:300])
    # fill email
    em = page.locator('input[type="email"]:visible, input:visible')
    filled = False
    for i in range(em.count()):
        t = em.nth(i).get_attribute('type')
        if t in ('email','text'):
            em.nth(i).fill(EMAIL); filled=True; break
    note(f'email filled: {filled}')
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_forgot.png')
    # submit
    try:
        page.locator('button[type="submit"]:visible, button:has-text("Send"), button:has-text("Reset")').first.click(timeout=6000)
        page.wait_for_timeout(4000)
    except Exception as e:
        note('submit err: ' + str(e)[:100])
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('after forgot submit: ' + body[:500])
    note('API: ' + ' || '.join(api[:3]))
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_forgot_sent.png', full_page=True)
    # look for reset token / link in page
    tok = re.search(r'reset[_-]?token["\s:=]+([A-Za-z0-9_\-]{16,})', body) or re.search(r'(/reset[^"\s<]+|token=([A-Za-z0-9_\-]{16,}))', body)
    note('token/link in UI: ' + (tok.group(0)[:80] if tok else 'NOT DISPLAYED — checking response json'))
    if not tok and api:
        m = re.search(r'"reset_token":"([^"]+)"', ' || '.join(api))
        note('token from API response: ' + (m.group(1) if m else 'none'))
    ctx.close(); b.close()
