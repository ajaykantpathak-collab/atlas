"""R3 sweep B: item 5 fresh signup -> dashboard renders new student."""
import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
EMAIL = f'ship.check.{int(time.time())}@dreamapp.in'
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.on('response', lambda r: failing.append(f'{r.status} {r.request.method} {r.url[:80]}') if r.status>=400 else None)
    page.goto('http://localhost:3001/signup', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(3500)
    page.locator('input:visible').nth(0).fill('Ship Check')
    page.locator('input:visible').nth(1).fill(EMAIL)
    page.locator('input:visible').nth(2).fill('demo123')
    page.locator('select:visible').first.select_option(label='Class 6')
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(9000)
    note('ITEM5 after signup url: ' + page.url)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    greeting = bool(re.search(r'Good (evening|morning|afternoon), Ship|Ship Check', body))
    stuck = 'Loading your command center' in body
    cls = re.search(r'CLASS \d+', body)
    note(f'  personalized={greeting} stuck_loading={stuck} class_chip={cls.group(0) if cls else "none"}')
    note('  dashboard: ' + body[:400])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_signup_dashboard.png', full_page=False)
    # navigate away and back to prove session persists
    page.goto('http://localhost:3001/dashboard', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(6000)
    body2 = re.sub(r'\s+',' ', page.inner_text('body'))
    note(f'  reload dashboard: personalized={bool(re.search(r"Ship Check|Good (evening|morning|afternoon), Ship", body2))} | ' + body2[:200])
    note('failing: ' + ' || '.join(failing[:6]))
    note('console: ' + ' || '.join(console[:5]))
    ctx.close(); b.close()
print('EMAIL:', EMAIL)
