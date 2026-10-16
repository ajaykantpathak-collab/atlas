import sys, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    page.goto('http://localhost:3001/play', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(4000)
    # click Class 1 then Maths
    try:
        page.get_by_text(re.compile('^Class 1$', re.I)).first.click(timeout=6000)
        page.wait_for_timeout(3000)
        note('after Class 1: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:220])
    except Exception as e:
        note('class1 click err: ' + str(e)[:80])
    try:
        page.get_by_text(re.compile('Maths', re.I)).first.click(timeout=6000)
        page.wait_for_timeout(4000)
        note('after Maths: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:300])
    except Exception as e:
        note('maths click err: ' + str(e)[:80])
    # open first game
    try:
        page.locator('a[href*="/play/"], [class*="cursor-pointer"], button:has-text("Play"), button:has-text("Start")').first.click(timeout=5000)
        page.wait_for_timeout(5000)
        note('game url: ' + page.url)
        note('game view: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:350])
    except Exception as e:
        note('game open err: ' + str(e)[:100])
    # 2 slides deep
    for step in range(2):
        clicked=False
        for sel in ['button:has-text("Start")','button:has-text("Next")','button:has-text("Continue")','button:has-text("Play")']:
            try:
                page.locator(sel).first.click(timeout=2000); clicked=True; page.wait_for_timeout(2500); break
            except Exception: continue
        note(f'slide+{step+1} clicked={clicked}: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:180])
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_play_game.png', full_page=False)
    ctx.close(); b.close()
