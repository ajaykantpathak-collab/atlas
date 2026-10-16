"""R3 sweep A: item 2 practice + item 9 numbers as demo."""
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
    page.on('response', lambda r: failing.append(f'{r.status} {r.request.method} {r.url[:80]}') if r.status>=400 else None)
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(7000)
    note('R3 login -> ' + page.url + (' | FAILING: '+str(failing[:3]) if failing else ' | clean'))

    # ITEM 2: practice
    page.goto('http://localhost:3001/practice', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(5000)
    body0 = re.sub(r'\s+',' ', page.inner_text('body'))
    st0 = re.search(r'(\d+)\s*Days', body0); m0 = re.search(r'Mathematics\s*(\d+)%', body0)
    note(f'ITEM2 pre-start: streak={st0.group(1) if st0 else "?"} Days mastery={m0.group(1) if m0 else "?"}%')
    page.get_by_text(re.compile('Start Practice', re.I)).first.click(timeout=10000)
    page.wait_for_timeout(9000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    q_of = re.search(r'Question \d+ of \d+', body)
    chips = re.search(r'(Ch\d+|Chapter \d+)', body)
    diff = re.search(r'(मध्यम|Easy|Medium|Hard)', body)
    ta = page.locator('textarea:visible'); inp = page.locator('input:visible')
    note(f'ITEM2 in-session: "{q_of.group(0) if q_of else "NO"}" chip="{chips.group(1) if chips else "?"}" diff="{diff.group(1) if diff else "?"}" textareas={ta.count()} inputs={inp.count()}')
    note('  question: ' + body[:340])
    ok_submit = False
    if ta.count():
        ta.first.fill('Working it out step by step: the result is 42.')
        page.get_by_text(re.compile('Submit', re.I)).first.click(timeout=6000)
        page.wait_for_timeout(4000)
        body2 = re.sub(r'\s+',' ', page.inner_text('body'))
        graded = re.search(r'(Correct|Not quite|correct answer|Explanation|streak)', body2, re.I)
        advanced = re.search(r'Question \d+ of \d+', body2)
        ok_submit = bool(graded or advanced)
        note(f'  SUBMIT: graded_feedback={bool(graded)} advanced={bool(advanced)} | ' + body2[:240])
        # continue to Q2 if continue button
        for lbl in ['Continue','Next','Got it','Try Again']:
            try:
                page.get_by_text(re.compile(lbl, re.I)).first.click(timeout=1800)
                page.wait_for_timeout(2500); break
            except Exception: pass
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_practice.png', full_page=False)

    # ITEM 9a: dashboard numbers
    page.goto('http://localhost:3001/dashboard', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(7000)
    dash = re.sub(r'\s+',' ', page.inner_text('body'))
    lv = re.search(r'LV ?(\d+)', dash); xp = re.search(r'Total XP ([\d,]+)', dash)
    st = re.search(r'Day Streak\s*(\d+)|(\d+)\s*Day Streak', dash)
    streak_d = next((g for g in (st.group(1), st.group(2)) if g), '?') if st else '?'
    note(f'ITEM9 dashboard: level={lv.group(1) if lv else "?"} xp={xp.group(1) if xp else "?"} streak={streak_d}')
    note('  dash: ' + dash[:240])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_dashboard.png', full_page=False)

    # ITEM 9b: my-world numbers
    page.goto('http://localhost:3001/my-world', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(10000)
    mw = re.sub(r'\s+',' ', page.inner_text('body'))
    stars = re.search(r'(\d+) / 9,099 stars', mw)
    gl = re.search(r'(\d+)\s*GALAXY LEVEL|GALAXY LEVEL\s*(\d+)', mw)
    gs = re.search(r'(\d+)\s*DAY STREAK|(\d+)\s*day streak', mw)
    gb = re.search(r'(\d+)\s*BADGES EARNED|(\d+) /\d+ badges|(\d+)/10 badges', mw)
    note(f'ITEM9 my-world: stars={stars.group(1) if stars else "?"} galaxy_level={next((g for g in gl.groups() if g), "?") if gl else "?"} day_streak={next((g for g in gs.groups() if g), "?") if gs else "?"} badges={next((g for g in gb.groups() if g), "?") if gb else "?"}')
    note('  my-world: ' + mw[:340])
    page.screenshot(path=r'D:/platform/.studentA_tmp/r3_myworld.png', full_page=False)
    note('failing: ' + ' || '.join(failing[:6]))
    note('console: ' + ' || '.join(console[:6]))
    ctx.close(); b.close()
