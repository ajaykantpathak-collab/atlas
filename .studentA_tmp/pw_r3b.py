import sys, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(7000)
    page.goto('http://localhost:3001/dashboard', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(7000)
    body = page.inner_text('body')
    i = body.find('Day Streak')
    print('DASHBOARD STREAK CONTEXT:', re.sub(r'\s+',' ', body[max(0,i-60):i+40]))
    i2 = body.find('Total XP')
    print('XP CONTEXT:', re.sub(r'\s+',' ', body[i2:i2+60]))
    # achievements API status
    resp = []
    page.on('response', lambda r: resp.append(f'{r.status} {r.url[:70]}') if 'achievements' in r.url else None)
    page.goto('http://localhost:3001/achievements', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(6000)
    print('ACHIEVEMENTS PAGE responses:', resp[:4])
    print('ACH PAGE TEXT:', re.sub(r'\s+',' ', page.inner_text('body'))[:220])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_achievements.png')
    ctx.close(); b.close()
