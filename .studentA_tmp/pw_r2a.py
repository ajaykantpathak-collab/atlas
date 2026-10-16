"""R2-A: practice full check + dashboard + my-world as demo on :3001."""
import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:140]}') if m.type=='error' else None)
    page.on('response', lambda r: failing.append(f'{r.status} {r.request.method} {r.url[:90]}') if r.status>=400 else None)
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(6000)
    note('login -> ' + page.url + (f' | FAILING: {failing[:3]}' if failing else ' | clean'))

    # ITEM 2: practice
    page.goto('http://localhost:3001/practice', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(5000)
    body0 = re.sub(r'\s+',' ', page.inner_text('body'))
    streak = re.search(r'(\d+)\s*Days', body0)
    mastery = re.search(r'Mathematics\s*(\d+)%', body0)
    note(f'ITEM2 pre-start: streak={streak.group(1) if streak else "?"} Days, mastery={mastery.group(1) if mastery else "?"}%')
    page.get_by_text(re.compile('Start Practice', re.I)).first.click(timeout=10000)
    page.wait_for_timeout(8000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    q_of = re.search(r'Question \d+ of \d+', body)
    chips = re.search(r'(Ch\d+|Chapter \d+)', body)
    diff = re.search(r'(मध्यम|Easy|Medium|Hard)', body)
    ta = page.locator('textarea:visible')
    inp = page.locator('input:visible')
    note(f'ITEM2 in-session: "{q_of.group(0) if q_of else "NO"}" | chip="{chips.group(1) if chips else "?"}" | diff="{diff.group(1) if diff else "?"}" | textareas={ta.count()} inputs={inp.count()}')
    note('  question: ' + body[:330])
    if ta.count():
        ta.first.fill('The answer computed step by step is 42.')
        page.get_by_text(re.compile('Submit', re.I)).first.click(timeout=6000)
        page.wait_for_timeout(3500)
        body2 = re.sub(r'\s+',' ', page.inner_text('body'))
        fb = re.search(r'(Correct|Not quite|is_correct|mastery|Explanation)[^:]{0,120}', body2, re.I)
        note(f'  SUBMIT WORKED: {bool(fb)} | ' + body2[:250])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r2_practice.png', full_page=False)

    # ITEM 9a: dashboard numbers
    page.goto('http://localhost:3001/dashboard', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(7000)
    dash = re.sub(r'\s+',' ', page.inner_text('body'))
    lv = re.search(r'LV ?(\d+)', dash); xp = re.search(r'Total XP ([\d,]+)', dash); st = re.search(r'(\d+)\s*Day Streak|Day Streak\s*(\d+)|(\d+) Days', dash)
    note(f'ITEM9 dashboard: level={lv.group(1) if lv else "?"} xp={xp.group(1) if xp else "?"} streak={next((g for g in (st.group(1),st.group(2),st.group(3)) if g), "?") if st else "?"}')
    note('  dash: ' + dash[:220])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r2_dashboard.png', full_page=False)

    # ITEM 9b: my-world numbers
    page.goto('http://localhost:3001/my-world', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(9000)
    mw = re.sub(r'\s+',' ', page.inner_text('body'))
    stars = re.search(r'(\d+) / 9,099 stars', mw)
    glevel = re.search(r'GALAXY LEVEL\s*\n?\s*(\d+)|(\d+)\s*GALAXY LEVEL', mw)
    gstreak = re.search(r'(\d+)\s*DAY STREAK|(\d+)\s*day streak', mw)
    gbadges = re.search(r'(\d+)\s*BADGES EARNED|(\d+)/\d+ badges', mw)
    note(f'ITEM9 my-world: stars={stars.group(1) if stars else "?"} galaxy_level={next((g for g in glevel.groups() if g), "?") if glevel else "?"} day_streak={next((g for g in gstreak.groups() if g), "?") if gstreak else "?"} badges={next((g for g in gbadges.groups() if g), "?") if gbadges else "?"}')
    note('  my-world: ' + mw[:300])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r2_myworld.png', full_page=False)
    note('failing: ' + ' || '.join(failing[:6]))
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
