import sys, json, re, time
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
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:200]}'))
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    page.goto('http://localhost/my-world', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(10000)
    # class filter chips
    for chip in ['CLASS 6','CLASS 8','CLASS 10','ALL']:
        try:
            page.get_by_text(re.compile(f'^{chip}$', re.I)).first.click()
            page.wait_for_timeout(2500)
            note(f'chip {chip}: clicked ok')
        except Exception as e:
            note(f'chip {chip}: ERR {str(e)[:60]}')
    # try clicking a star/canvas area
    stars = page.locator('canvas')
    note('canvas count: ' + str(stars.count()))
    if stars.count():
        box = stars.first.bounding_box()
        note(f'canvas box: {box}')
        # click center of canvas
        if box:
            page.mouse.click(box['x']+box['width']/2, box['y']+box['height']/2)
            page.wait_for_timeout(2500)
            body = re.sub(r'\s+',' ', page.inner_text('body'))
            m = re.search(r'(MASTERED|TOPIC|NODE|c\d+_[a-z]+|detail|panel)', body, re.I)
            note('after canvas click, notable: ' + (m.group(0) if m else 'no detail panel text'))
            page.screenshot(path=r'D:/platform/.studentA_tmp/shot_myworld_starclick.png')
    # badges row interaction
    try:
        page.get_by_text('Math Master').first.click()
        page.wait_for_timeout(2000)
        note('badge click: ' + re.sub(r'\s+',' ', page.inner_text('body'))[-260:])
    except Exception as e:
        note('badge click err: ' + str(e)[:80])
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
