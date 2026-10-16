import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    page.goto('http://localhost/sims-v2/v3_c8_math_ch01_p1', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    page.get_by_text('Begin the mission').first.click(); page.wait_for_timeout(2200)
    for step in range(12):
        body = re.sub(r'\s+',' ', page.inner_text('body'))
        mission = re.search(r'MISSION · \d+/\d+ (.{0,240})', body)
        opts = []
        btns = page.locator('button:visible')
        for i in range(btns.count()):
            t = btns.nth(i).inner_text().strip()
            if len(t) > 15 and not re.match(r'^(previous|next|back)', t, re.I) and not t.startswith('\U0001f50a'):
                opts.append((i,t))
        print(f'--- STEP {step}: mission="{mission.group(1)[:150] if mission else "?"}"')
        print('    opts:', [o[1][:50] for o in opts])
        # sliders
        sl = page.locator('input[type=range]')
        if sl.count():
            vals = [sl.nth(k).input_value() for k in range(sl.count())]
            print('    sliders:', vals)
            # set all sliders to 5 (the mission said "balance both sides at 5" style)
            for k in range(sl.count()):
                sl.nth(k).evaluate("(e,v) => { const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set; s.call(e,v); e.dispatchEvent(new Event('input',{bubbles:true})); }", '5')
            page.wait_for_timeout(300)
        # text inputs (non-range)
        ti = page.locator('input[type=text]:visible, input[type=number]:visible, textarea:visible')
        if ti.count():
            print('    text inputs:', ti.count(), '-> fill 16')
            ti.first.fill('16')
        if opts:
            i,t = opts[-1]
            print('    pick:', t[:70])
            btns.nth(i).click(); page.wait_for_timeout(1800)
        try:
            page.get_by_text('Check').first.click(timeout=2000)
            page.wait_for_timeout(2000)
        except Exception: pass
        after = re.sub(r'\s+',' ', page.inner_text('body'))
        fb = re.search(r'(Not yet[^.]*|Correct[^.]*|Exactly[^.]*|Well done[^.]*|Try again[^.]*)', after, re.I)
        print('    feedback:', fb.group(0)[:80] if fb else '(none)')
        # continue
        clicked = False
        for label in ["Let's learn","Let's Play","Continue","Next","Got it","Onward"]:
            try:
                page.get_by_text(re.compile(label, re.I)).first.click(timeout=1500)
                clicked = True; page.wait_for_timeout(2200); break
            except Exception: continue
        if not clicked:
            print('    STUCK — no continue'); 
            page.screenshot(path=rf'D:/platform/.studentA_tmp/c8_stuck_{step}.png')
            break
    page.screenshot(path=r'D:/platform/.studentA_tmp/c8_final.png')
    ctx.close(); b.close()
