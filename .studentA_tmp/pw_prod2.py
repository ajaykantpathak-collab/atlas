"""PROD-5 signup, PROD-7 fonts, PROD-8 play/junior, PROD-9 numbers, PROD-11 mobile — :3001."""
import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
EMAIL = f'prod.verify.{int(time.time())}@dreamapp.in'
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:120]}') if m.type=='error' else None)

    # PROD-5 fresh signup
    page.goto('http://localhost:3001/signup', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(4000)
    try:
        page.locator('input:visible').nth(0).fill('Prod Verify')
        page.locator('input:visible').nth(1).fill(EMAIL)
        page.locator('input:visible').nth(2).fill('demo123')
        page.locator('select:visible').first.select_option(index=6)  # Class 6
        page.locator('button[type="submit"]').first.click()
        page.wait_for_timeout(8000)
        note('PROD-5 signup url: ' + page.url)
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        stuck = 'Loading your command center' in body
        greeting = bool(re.search(r'Good (evening|morning|afternoon), Prod', body))
        note(f'  dashboard stuck_loading={stuck} personalized_greeting={greeting} | ' + body[:200])
        page.screenshot(path=r'D:/platform/.studentA_tmp/prod_signup.png', full_page=False)
    except Exception as e:
        note('PROD-5 ERR: ' + str(e)[:150])

    # PROD-7 fonts on /dashboard (whatever state) and /practice
    for route in ['/dashboard','/practice']:
        page.goto(f'http://localhost:3001{route}', wait_until='domcontentloaded', timeout=120000)
        page.wait_for_timeout(4000)
        fonts = page.evaluate("() => { const els = document.querySelectorAll('h1, body, p, button'); const set = new Set(); els.forEach(e => set.add(getComputedStyle(e).fontFamily)); return Array.from(set).slice(0,4); }")
        jakarta = page.evaluate("() => document.fonts && Array.from(document.fonts).filter(f=>f.family.includes('Jakarta')).length")
        note(f'PROD-7 {route} fontFamilies: {fonts} | Jakarta fonts loaded: {jakarta}')

    # PROD-8 /play and /junior
    page.goto('http://localhost:3001/play', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(6000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    cards = page.locator('a[href*="/play/"], [class*="card"]').count()
    note(f'PROD-8 /play: text="{body[:180]}" | card-ish nodes={cards}')
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_play.png', full_page=False)
    # open a c1 game if link exists
    hrefs = page.evaluate("() => Array.from(document.querySelectorAll('a[href]')).map(a=>a.getAttribute('href')).filter(h=>h.includes('/play/'))")
    note('  play hrefs: ' + json.dumps(hrefs[:6]))
    if hrefs:
        page.goto('http://localhost:3001'+hrefs[0], wait_until='domcontentloaded', timeout=120000)
        page.wait_for_timeout(6000)
        b1 = re.sub(r'\s+',' ', page.inner_text('body'))
        note('  game view: ' + b1[:220])
        # try to advance 2 slides: click primary button
        for step in range(2):
            clicked = False
            for sel in ['button:has-text("Start")','button:has-text("Next")','button:has-text("Continue")','button:has-text("Play")','[role="button"]']:
                try:
                    page.locator(sel).first.click(timeout=2500)
                    clicked=True; page.wait_for_timeout(2500); break
                except Exception: pass
            if not clicked: break
        note('  after 2 interactions: ' + re.sub(r'\s+',' ', page.inner_text('body'))[:200])
        page.screenshot(path=r'D:/platform/.studentA_tmp/prod_game.png', full_page=False)
    # junior
    jcon=[]
    page.on('console', lambda m: jcon.append(m.text[:120]) if m.type=='error' else None)
    page.goto('http://localhost:3001/junior', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(7000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note(f'PROD-8 /junior: len={len(body)} console_errors={len(jcon)} | ' + body[:160])
    note('  junior console: ' + ' || '.join(jcon[:5]))
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_junior.png', full_page=False)

    # PROD-9 my-world vs dashboard numbers
    page.goto('http://localhost:3001/dashboard', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(6000)
    dash = re.sub(r'\s+',' ', page.inner_text('body'))
    dash_nums = dict(re.findall(r'(Total XP|Level \d+|LV ?\d+|Day Streak \d+|\d+ Days)', dash)) if dash else {}
    m1 = re.search(r'(LV ?\d+)', dash); m2 = re.search(r'Total XP ([\d,]+)', dash); m3 = re.search(r'(\d+) Days', dash)
    note(f'PROD-9 dashboard: {m1.group(1) if m1 else "?"} XP={m2.group(1) if m2 else "?"} streak={m3.group(1) if m3 else "?"}')
    page.goto('http://localhost:3001/my-world', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(9000)
    mw = re.sub(r'\s+',' ', page.inner_text('body'))
    g1 = re.search(r'(\d+) / 9,099 stars', mw); g2 = re.search(r'GALAXY LEVEL (\d+)|(\d+) GALAXY LEVEL', mw); g3 = re.search(r'(\d+) DAY STREAK|(\d+) day streak', mw); g4 = re.search(r'(\d+)/\d+ badges|(\d+) BADGES', mw)
    note(f'PROD-9 my-world: stars={g1.group(1) if g1 else "?"} level={g2.group(1) or g2.group(2) if g2 else "?"} streak={g3.group(1) or g3.group(2) if g3 else "?"}')
    note('  my-world text: ' + mw[:260])
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_myworld.png', full_page=False)

    # PROD-11 mobile 390px
    mp = ctx.new_page()
    mp.set_viewport_size({'width':390,'height':844})
    for route in ['/learn','/practice']:
        mp.goto(f'http://localhost:3001{route}', wait_until='domcontentloaded', timeout=120000)
        mp.wait_for_timeout(5000)
        scroll = mp.evaluate("() => ({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2})")
        note(f'PROD-11 {route} @390px: scrollWidth={scroll["sw"]} clientWidth={scroll["cw"]} horizontal_overflow={scroll["overflow"]}')
        mp.screenshot(path=rf'D:/platform/.studentA_tmp/prod_mobile_{route.strip("/")}.png', full_page=False)
    note('PROD console tail: ' + ' || '.join(console[:8]))
    ctx.close(); b.close()
print('EMAIL:', EMAIL)
