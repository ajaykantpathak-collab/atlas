import sys, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.goto('http://localhost:3001/play', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(3500)
    page.get_by_text(re.compile('^Class 1$', re.I)).first.click(); page.wait_for_timeout(2500)
    page.get_by_text(re.compile('Maths', re.I)).first.click(); page.wait_for_timeout(3000)
    page.get_by_text(re.compile('^Addition$', re.I)).first.click(timeout=6000)
    page.wait_for_timeout(5000)
    note('game url: ' + page.url)
    note('game view: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:400])
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_game1.png')
    for step in range(2):
        clicked=False
        for sel in ['button:has-text("Start")','button:has-text("Next")','button:has-text("Continue")','button:has-text("Play")','button:has-text("Go")','button:has-text("Try")']:
            try:
                page.locator(sel).first.click(timeout=1800); clicked=True; page.wait_for_timeout(2500); break
            except Exception: continue
        if not clicked:
            # click any visible button that isn't nav
            btns = page.locator('button:visible')
            for i in range(btns.count()):
                t = btns.nth(i).inner_text().strip()
                if t and len(t) < 40:
                    btns.nth(i).click(); clicked=True; page.wait_for_timeout(2500)
                    note(f'  fallback clicked btn[{i}]: "{t[:30]}"')
                    break
        note(f'slide{step+1}: clicked={clicked} | ' + re.sub(r'\s+',' ', page.inner_text('body'))[:200])
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_game2.png')
    note('console: ' + ' || '.join(console[:5]))
    ctx.close(); b.close()
